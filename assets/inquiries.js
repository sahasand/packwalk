(() => {
  'use strict';
  const endpoint = 'https://earnest-minnow-363.convex.site/inquiries';
  document.querySelectorAll('.inquiry-form').forEach(form => {
    const fields = form.querySelector('.form-fields');
    const button = form.querySelector('.form-submit');
    const error = form.querySelector('.form-error');
    const success = form.querySelector('.form-success');
    const originalButton = button.innerHTML;
    let pending = false;
    let lastPayload = '';
    let requestId;
    // Without crypto support, retain the visible email fallback instead of a broken form.
    if (!window.crypto?.randomUUID) return;
    button.disabled = false;
    form.querySelector('.form-loading-note').hidden = true;
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (pending || !form.reportValidity()) return;
      const values = new FormData(form);
      const payload = { role: form.dataset.role, adult: values.has('adult'), consent: values.has('consent') };
      ['email', 'neighbourhood', 'schedule', 'duration', 'rate', 'notes', 'website'].forEach(key => {
        if (values.has(key)) payload[key] = values.get(key).trim();
      });
      const serialized = JSON.stringify(payload);
      if (serialized !== lastPayload) { requestId = crypto.randomUUID(); lastPayload = serialized; }
      payload.requestId = requestId;
      pending = true;
      button.disabled = true;
      button.textContent = 'Sending…';
      form.setAttribute('aria-busy', 'true');
      error.hidden = true;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 20000);
      try {
        const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal: controller.signal });
        const result = await response.json();
        if (!response.ok || result.success !== true || result.reference !== requestId) throw new Error(result.error || 'We could not confirm your request. Please try again.');
        form.querySelector('.success-detail').textContent = `Thanks. We’ve saved your ${payload.role === 'owner' ? 'walking request' : 'availability'} and your contact email: ${payload.email}.`;
        form.querySelector('.form-reference').textContent = `Your reference: ${result.reference.slice(0, 8)}`;
        fields.hidden = true;
        success.hidden = false;
        success.focus();
      } catch (failure) {
        error.textContent = failure.name === 'AbortError' || failure instanceof TypeError
          ? 'We couldn’t confirm your request. Your details are still here. Check your connection and try again, or email hello@packwalk.ca.'
          : failure.message;
        error.hidden = false;
      } finally {
        clearTimeout(timeout);
        pending = false;
        button.disabled = false;
        button.innerHTML = originalButton;
        form.removeAttribute('aria-busy');
      }
    });
  });
})();
