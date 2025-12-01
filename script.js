
// script.js
// Full frontend logic with backend integration

const API_BASE_URL = "https://final-project-backend-production-83f0.up.railway.app";

document.addEventListener('DOMContentLoaded', () => {
  // Toggle forms within each table-section when a .crud-btn is clicked
  document.querySelectorAll('.crud-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      if (!targetId) return;

      const section = btn.closest('.table-section') || document;
      section.querySelectorAll('.crud-form').forEach(f => f.style.display = 'none');

      const escaped = typeof CSS !== 'undefined' && CSS.escape ? CSS.escape(targetId) : targetId;
      const target = section.querySelector(`#${escaped}`);
      if (target) target.style.display = 'block';
    });
  });

  // Attach submit handlers to each .crud-form's primary button
  document.querySelectorAll('.crud-form').forEach(formEl => {
    const btn = formEl.querySelector('button');
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      handleCrudFormSubmission(formEl);
    });
  });
});

// Simple email regex for basic validation
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Format digits-only 10-digit phone to XXX-XXX-XXXX
function formatPhoneDigits(digits) {
  return digits.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
}

// Validate phone: returns true if valid (10 digits), false otherwise
function hasValidPhone(value) {
  if (value == null) return false;
  const digits = String(value).replace(/\D/g, '');
  return digits.length === 10;
}

// Main form submission handler
function handleCrudFormSubmission(formEl) {
  const outputEl = formEl.querySelector('.output');

  const rawInputs = Array.from(formEl.querySelectorAll('input'));
  const inputs = rawInputs.filter(inp => {
    const t = (inp.type || '').toLowerCase();
    return t !== 'button' && t !== 'submit' && t !== 'hidden' && !inp.disabled;
  });

  const errors = [];

  // -------------------------
  // REQUIRED-FIELD LOGIC
  // -------------------------
  const dataInputs = inputs;
  const isSingleFieldForm = dataInputs.length === 1;

  dataInputs.forEach(inp => {
    const val = String(inp.value || '').trim();
    const idName = ((inp.id || '') + ' ' + (inp.name || '')).toLowerCase();
    const label = inp.name || inp.id || inp.placeholder || 'field';

    let isRequired = false;

    if (isSingleFieldForm) isRequired = true;
    if (idName.includes('patientid') || idName.includes('patient_id') || idName === 'patientid') isRequired = true;
    if (idName.includes('phone')) isRequired = true;

    if (isRequired && val === '') errors.push(`${label} is required.`);
  });

  // TYPE-SPECIFIC VALIDATIONS
  inputs.forEach(inp => {
    const val = String(inp.value || '').trim();
    if (val === '') return;

    const type = (inp.type || '').toLowerCase();
    const keyLabel = inp.name || inp.id || inp.placeholder || 'field';

    if (type === 'email' && !isValidEmail(val)) errors.push(`${keyLabel} must be a valid email address.`);

    const idName = ((inp.id || '') + ' ' + (inp.name || '')).toLowerCase();
    if (idName.includes('phone') && !hasValidPhone(val)) errors.push(`${keyLabel} must contain exactly 10 digits.`);
  });

  if (errors.length > 0) {
    const message = errors.join(' ');
    if (outputEl) {
      outputEl.textContent = 'Error: ' + message;
      outputEl.style.color = 'red';
    }
    alert(message);
    return;
  }

  // Format phone numbers
  inputs.forEach(inp => {
    const idName = ((inp.id || '') + ' ' + (inp.name || '')).toLowerCase();
    if (idName.includes('phone')) {
      const digits = String(inp.value || '').replace(/\D/g, '');
      if (digits.length === 10) inp.value = formatPhoneDigits(digits);
    }
  });

  // Serialize input data
  const data = {};
  inputs.forEach(inp => {
    const key = inp.name || inp.id || inp.placeholder || 'field';
    data[key] = inp.value;
  });

  // Determine endpoint and HTTP method based on form ID
  let endpoint = '';
  let method = 'POST'; // default
  const formId = formEl.id.toLowerCase();

  if (formId.includes('doctor-create')) endpoint = '/doctor/create';
  else if (formId.includes('doctor-update')) { endpoint = '/doctor/update'; method = 'PUT'; }
  else if (formId.includes('doctor-delete')) { endpoint = '/doctor/delete'; method = 'DELETE'; }
  else if (formId.includes('patient-create')) endpoint = '/patient/create';
  else if (formId.includes('patient-update')) { endpoint = '/patient/update'; method = 'PUT'; }
  else if (formId.includes('patient-delete')) { endpoint = '/patient/delete'; method = 'DELETE'; }
  else if (formId.includes('order-create')) endpoint = '/order/create';
  else if (formId.includes('order-update')) { endpoint = '/order/update'; method = 'PUT'; }
  else if (formId.includes('order-delete')) { endpoint = '/order/delete'; method = 'DELETE'; }
  else if (formId.includes('product-create')) endpoint = '/product/create';
  else if (formId.includes('product-update')) { endpoint = '/product/update'; method = 'PUT'; }
  else if (formId.includes('product-delete')) { endpoint = '/product/delete'; method = 'DELETE'; }
  else if (formId.includes('kit-create')) endpoint = '/kit/create';
  else if (formId.includes('kit-update')) { endpoint = '/kit/update'; method = 'PUT'; }
  else if (formId.includes('kit-delete')) { endpoint = '/kit/delete'; method = 'DELETE'; }
  else if (formId.includes('office-read') || formId.includes('office-delete')) endpoint = '/office';
  else if (formId.includes('communication-read')) endpoint = '/communication';
  else if (formId.includes('admin-read') || formId.includes('admin-delete')) endpoint = '/admin';
  else if (formId.includes('order-detail-create')) endpoint = '/order-details/create';
  else if (formId.includes('order-detail-read')) endpoint = '/order-details';
  else {
    console.warn('No endpoint mapped for this form.');
    return;
  }

  // Make the fetch request
  fetch(`${API_BASE_URL}${endpoint}`, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: method === 'GET' ? null : JSON.stringify(data)
  })
  .then(res => res.json())
  .then(result => {
    if (outputEl) {
      outputEl.style.color = 'green';
      outputEl.textContent = 'Success: ' + JSON.stringify(result);
    } else {
      console.log('Success:', result);
    }
  })
  .catch(err => {
    console.error('Error:', err);
    if (outputEl) {
      outputEl.style.color = 'red';
      outputEl.textContent = 'Error: ' + err.message;
    } else {
      alert('Error: ' + err.message);
    }
  });
}


