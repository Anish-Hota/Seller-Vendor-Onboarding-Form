
const form = document.getElementById('vendorForm');
const success = document.getElementById('successMessage');
const regGroup = document.getElementById('registrationGroup');
const regInput = document.getElementById('businessRegistration');
const gstGroup = document.getElementById('gstGroup');
const gstInput = document.getElementById('gstNumber');

document.addEventListener('DOMContentLoaded', () => {
    console.log('Vendor Form Day 2 Initialized');
    const today = new Date();
    const maxDob = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    document.getElementById('ownerDob').max = maxDob.toISOString().split('T')[0];
    document.getElementById('operatingSince').max = today.toISOString().split('T')[0];
    setupListeners();
});

function setupListeners() {
    document.querySelectorAll('input[name="businessType"]').forEach(r => {
        r.addEventListener('change', (e) => {
            const needs = ['partnership', 'private-limited', 'public-limited', 'llp'].includes(e.target.value);
            regGroup.style.display = needs ? 'block' : 'none';
            regInput.required = needs;
            if (!needs) { regInput.value = ''; clearErrorMessage(regInput); }
            validateInputField(e.target);
        });
    });
    
    document.querySelectorAll('input[name="taxStatus"]').forEach(r => {
        r.addEventListener('change', (e) => {
            const isReg = e.target.value === 'registered';
            gstGroup.style.display = isReg ? 'block' : 'none';
            gstInput.required = isReg;
            if (!isReg) { gstInput.value = ''; clearErrorMessage(gstInput); }
            validateInputField(e.target);
        });
    });
    form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="date"], select').forEach(i => {
        i.addEventListener('blur', () => { if (i.value || i.required) validateInputField(i); });
        i.addEventListener('input', () => { 
            if (i.closest('.form_group').classList.contains('error')) validateInputField(i); 
        });
    });
    document.querySelectorAll('input[name="categories"]').forEach(c => {
        c.addEventListener('change', () => validateInputField(c));
    });
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;
        
        [...form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="date"], select')]
            .forEach(i => { if (!validateInputField(i)) valid = false; });
        
        ['businessType', 'taxStatus'].forEach(n => {
            if (!validateInputField(document.querySelector(`input[name="${n}"]`))) valid = false;
        });
        
        if (!validateInputField(document.querySelector('input[name="categories"]'))) valid = false;
        
        if (valid) {
            const fd = new FormData(form);
            const data = {};
            for (let [k, v] of fd.entries()) {
                data[k] = data[k] ? (Array.isArray(data[k]) ? [...data[k], v] : [data[k], v]) : v;
            }
            console.log('Submitted:', data);
            form.style.display = 'none';
            success.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const err = document.querySelector('.form_group.error');
            if (err) err.scrollIntoView({ behavior: 'smooth', block: 'center' });
            alert('Please correct errors before submitting.');
        }
    });
    form.addEventListener('reset', () => {
        form.querySelectorAll('.form_group').forEach(g => g.classList.remove('error', 'valid'));
        regGroup.style.display = 'none';
        gstGroup.style.display = 'none';
        success.style.display = 'none';
        form.style.display = 'block';
    });
    form.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') e.preventDefault();
    });
}