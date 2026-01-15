const form = document.getElementById('vendorForm');
const regGroup = document.getElementById('registrationGroup');
const regInput = document.getElementById('businessRegistration');
const gstGroup = document.getElementById('gstGroup');
const gstInput = document.getElementById('gstNumber');
const submitBtn = document.getElementById('submitBtn');
const vendorTableBody = document.getElementById('vendorTableBody');
const vendorCountEl = document.getElementById('vendorCount');

let vendors = [];

document.addEventListener('DOMContentLoaded', () => {
    console.log('=== DAY 1: ADD Functionality ===');
    
    const today = new Date();
    const maxDob = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    document.getElementById('ownerDob').max = maxDob.toISOString().split('T')[0];
    document.getElementById('operatingSince').max = today.toISOString().split('T')[0];
    
    setupListeners();
    setupCharCounter();
});

function setupListeners() {
    // Business Type Conditional Logic
    document.querySelectorAll('input[name="businessType"]').forEach(r => {
        r.addEventListener('change', (e) => {
            const needs = ['partnership', 'private-limited', 'public-limited', 'llp'].includes(e.target.value);
            regGroup.style.display = needs ? 'block' : 'none';
            regInput.required = needs;
            if (!needs) { 
                regInput.value = ''; 
                clearErrorMessage(regInput); 
            }
            validateInputField(e.target);
        });
    });
    
    // Tax Status Conditional Logic
    document.querySelectorAll('input[name="taxStatus"]').forEach(r => {
        r.addEventListener('change', (e) => {
            const isReg = e.target.value === 'registered';
            gstGroup.style.display = isReg ? 'block' : 'none';
            gstInput.required = isReg;
            if (!isReg) { 
                gstInput.value = ''; 
                clearErrorMessage(gstInput); 
            }
            validateInputField(e.target);
        });
    });
    
    // Real-time Validation
    form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="date"], select, textarea').forEach(i => {
        i.addEventListener('blur', () => { 
            if (i.value || i.required) validateInputField(i); 
        });
        i.addEventListener('input', () => { 
            if (i.closest('.form_group').classList.contains('error')) validateInputField(i); 
        });
    });
    
    // Categories Validation
    document.querySelectorAll('input[name="categories"]').forEach(c => {
        c.addEventListener('change', () => validateInputField(c));
    });
    
    // Form Submit - ADD ONLY
    form.addEventListener('submit', handleSubmit);
    
    // Form Reset
    form.addEventListener('reset', handleReset);
    
    // Prevent Enter Key Submit
    form.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') e.preventDefault();
    });
}

function handleSubmit(e) {
    e.preventDefault();
    
    let valid = true;
    
    // Validate all fields
    [...form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="date"], select, textarea')]
        .forEach(i => { if (!validateInputField(i)) valid = false; });
    
    // Validate radio groups
    ['businessType', 'taxStatus', 'currency'].forEach(n => {
        if (!validateInputField(document.querySelector(`input[name="${n}"]`))) valid = false;
    });
    
    // Validate categories
    if (!validateInputField(document.querySelector('input[name="categories"]'))) valid = false;
    
    // Validate checkboxes
    ['shippingPolicy', 'returnPolicy', 'qualityAssurance', 'termsConditions'].forEach(id => {
        if (!validateInputField(document.getElementById(id))) valid = false;
    });
    
    if (valid) {
        // DAY 1: ONLY ADD NEW VENDOR
        const formData = new FormData(form);
        const vendorData = {};
        
        for (let [key, value] of formData.entries()) {
            if (key === 'categories') {
                vendorData[key] = vendorData[key] || [];
                vendorData[key].push(value);
            } else {
                vendorData[key] = value;
            }
        }
        
        // Add new vendor to array
        vendors.push(vendorData);
        console.log('✅ Vendor Added:', vendorData);
        showSuccessMessage('Vendor registered successfully!');
        
        // Render table and reset form
        renderTable();
        form.reset();
        handleReset();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        const err = document.querySelector('.form_group.error');
        if (err) err.scrollIntoView({ behavior: 'smooth', block: 'center' });
        alert('Please correct errors before submitting.');
    }
}

function handleReset() {
    form.querySelectorAll('.form_group').forEach(g => g.classList.remove('error', 'valid'));
    regGroup.style.display = 'none';
    gstGroup.style.display = 'none';
}

function renderTable() {
    vendorTableBody.innerHTML = '';
    
    if (vendors.length === 0) {
        vendorTableBody.innerHTML = `
            <tr class="empty_row">
                <td colspan="24" class="empty_message">
                    <div class="empty_state">
                        <p>No vendors registered yet</p>
                        <small>Fill the form to add your first vendor</small>
                    </div>
                </td>
            </tr>
        `;
        vendorCountEl.textContent = '0 vendors';
        return;
    }
    
    vendors.forEach((vendor, index) => {
        const row = document.createElement('tr');
        
        // Format categories array to display nicely
        const categories = Array.isArray(vendor.categories) 
            ? vendor.categories.join(', ') 
            : vendor.categories || 'N/A';
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${vendor.businessType || 'N/A'}</td>
            <td>${vendor.businessName || 'N/A'}</td>
            <td>${vendor.businessRegistration || 'N/A'}</td>
            <td>${vendor.panNumber || 'N/A'}</td>
            <td>${vendor.operatingSince || 'N/A'}</td>
            <td>${categories}</td>
            <td>${vendor.monthlySales || 'N/A'}</td>
            <td>${vendor.ownerName || 'N/A'}</td>
            <td>${vendor.ownerEmail || 'N/A'}</td>
            <td>${vendor.ownerPhone || 'N/A'}</td>
            <td>${vendor.ownerDob || 'N/A'}</td>
            <td>${vendor.businessAddress || 'N/A'}</td>
            <td>${vendor.businessPincode || 'N/A'}</td>
            <td>${vendor.warehouseLocation || 'N/A'}</td>
            <td>${vendor.accountHolder || 'N/A'}</td>
            <td>${vendor.bankName || 'N/A'}</td>
            <td>${vendor.accountNumber || 'N/A'}</td>
            <td>${vendor.ifscCode || 'N/A'}</td>
            <td>${vendor.taxStatus || 'N/A'}</td>
            <td>${vendor.gstNumber || 'N/A'}</td>
            <td>${vendor.storeName || 'N/A'}</td>
            <td>${vendor.currency || 'N/A'}</td>
            <td>
                <button class="action_btn edit_btn" disabled title="Coming in Day 2">Edit</button>
                <button class="action_btn delete_btn" disabled title="Coming in Day 3">Delete</button>
            </td>
        `;
        vendorTableBody.appendChild(row);
    });
    
    vendorCountEl.textContent = `${vendors.length} vendor${vendors.length !== 1 ? 's' : ''}`;
}

function showSuccessMessage(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 8px 20px rgba(72, 187, 120, 0.3);
        z-index: 1000;
        font-weight: 500;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function setupCharCounter() {
    const storeDescTextarea = document.getElementById('storeDescription');
    const charCounter = document.querySelector('.char_counter');
    
    storeDescTextarea.addEventListener('input', () => {
        const length = storeDescTextarea.value.length;
        charCounter.textContent = `${length} / 500 characters`;
    });
}