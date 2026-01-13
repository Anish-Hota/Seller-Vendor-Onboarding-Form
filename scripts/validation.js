const existingEmails = new Set(['test@example.com', 'vendor@demo.com']);
function checkBusinessType(value) {
    if (!value) return 'You must select a business type';
    return '';
}
function checkBusinessName(value) {
    if (!value) return 'Business name cannot be empty';
    if (value.length < 3) return 'Business name should have at least 3 characters';
    if (value.length > 100) return 'Business name cannot exceed 100 characters';
    return '';
}
function checkBusinessRegistration(value, businessType) {
    const typesNeedingRegistration = ['partnership', 'private-limited', 'public-limited', 'llp'];
    if (typesNeedingRegistration.includes(businessType)) {
        if (!value) return 'Registration number is mandatory for this business type';
        if (value.length < 5) return 'Enter a valid registration number';
    }
    return '';
}
function checkPanNumber(value) {
    if (!value) return 'PAN number is required';
    const panFormat = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panFormat.test(value.toUpperCase())) {
        return 'Invalid PAN format. Expected format: ABCDE1234F';
    }
    return '';
}
function checkOperatingSince(value) {
    if (!value) return 'Operating since date is required';
    const opDate = new Date(value);
    const currentDate = new Date();
    if (opDate > currentDate) return 'Operating date cannot be in the future';
    return '';
}
function checkCategories() {
    const checkedBoxes = document.querySelectorAll('input[name="categories"]:checked');
    if (checkedBoxes.length === 0) return 'Select at least one business category';
    return '';
}
function checkMonthlySales(value) {
    if (!value) return 'Please select monthly sales estimate';
    return '';
}
function checkOwnerName(value) {
    if (!value) return 'Owner name is mandatory';
    if (value.length < 2) return 'Enter a valid name';
    return '';
}
function checkOwnerEmail(value) {
    if (!value) return 'Email address is required';
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailFormat.test(value)) return 'Enter a valid email address';
    if (existingEmails.has(value.toLowerCase())) {
        return 'This email is already in use. Try a different one';
    }
    return '';
}
function checkOwnerPhone(value) {
    if (!value) return 'Phone number is required';
    const phoneFormat = /^[0-9]{10}$/;
    if (!phoneFormat.test(value)) return 'Phone number should be exactly 10 digits';
    if (value[0] < '6') return 'Mobile number should start with 6, 7, 8, or 9';
    return '';
}
function checkOwnerDob(value) {
    if (!value) return 'Date of birth is required';
    const birthDate = new Date(value);
    const currentDate = new Date();
    let calculatedAge = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();
    const dayDifference = currentDate.getDate() - birthDate.getDate();
    
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        calculatedAge--;
    }
    
    if (calculatedAge < 18) return 'Owner must be at least 18 years old';
    if (calculatedAge > 100) return 'Please verify the date of birth';
    return '';
}
function checkBusinessAddress(value) {
    if (!value) return 'Business address is required';
    if (value.length < 10) return 'Please provide a complete address';
    return '';
}
function checkBusinessPincode(value) {
    if (!value) return 'Pincode is required';
    const pincodeFormat = /^[0-9]{6}$/;
    if (!pincodeFormat.test(value)) return 'Pincode should be exactly 6 digits';
    return '';
}
function checkAccountHolder(value) {
    if (!value) return 'Account holder name is required';
    if (value.length < 3) return 'Enter a valid account holder name';
    return '';
}
function checkBankName(value) {
    if (!value) return 'Please select a bank';
    return '';
}
function checkAccountNumber(value) {
    if (!value) return 'Account number is required';
    const accPattern = /^[0-9]{10,18}$/;
    if (!accPattern.test(value)) return 'Account number must be 10-18 digits';
    return '';
}
function checkIfscCode(value) {
    if (!value) return 'IFSC code is required';
    const ifscPattern = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    if (!ifscPattern.test(value.toUpperCase())) {
        return 'Invalid IFSC format. Expected: ABCD0123456';
    }
    return '';
}
function checkTaxStatus(value) {
    if (!value) return 'Please select tax registration status';
    return '';
}
function checkGstNumber(value, taxStatus) {
    if (taxStatus === 'registered') {
        if (!value) return 'GST number is required for registered businesses';
        const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        if (!gstPattern.test(value.toUpperCase())) {
            return 'Invalid GST format. Expected: 22AAAAA0000A1Z5';
        }
    }
    return '';
}
function checkStoreName(value) {
    if (!value) return 'Store name is required';
    if (value.length < 5) return 'Store name must be at least 5 characters';
    if (value.length > 50) return 'Store name cannot exceed 50 characters';
    const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    if (existingStoreNames.has(slug)) {
        return 'This store name is already taken. Try a different name';
    }
    return '';
}
function checkStoreDescription(value) {
    if (!value) return 'Store description is required';
    if (value.length < 10) return 'Description should be at least 10 characters';
    if (value.length > 500) return 'Description cannot exceed 500 characters';
    return '';
}
function checkStoreSlug(value) {
    if (!value) return 'Store URL slug is required';
    const slugPattern = /^[a-z0-9-]+$/;
    if (!slugPattern.test(value)) return 'Slug can only contain lowercase letters, numbers, and hyphens';
    if (value.length < 3) return 'Slug must be at least 3 characters';
    return '';
}
function checkCurrency(value) {
    if (!value) return 'Please select a currency';
    return '';
}
function validateInputField(field) {
    const fieldName = field.name || field.id;
    let fieldValue = field.value;
    let errorMsg = '';
    
    switch (fieldName) {
        case 'businessType':
            const selectedType = document.querySelector('input[name="businessType"]:checked');
            fieldValue = selectedType ? selectedType.value : '';
            errorMsg = checkBusinessType(fieldValue);
            break;
        case 'businessName':
            errorMsg = checkBusinessName(fieldValue);
            break;
        case 'businessRegistration':
            const currentBusinessType = document.querySelector('input[name="businessType"]:checked')?.value;
            errorMsg = checkBusinessRegistration(fieldValue, currentBusinessType);
            break;
        case 'panNumber':
            field.value = fieldValue.toUpperCase();
            errorMsg = checkPanNumber(field.value);
            break;
        case 'operatingSince':
            errorMsg = checkOperatingSince(fieldValue);
            break;
        case 'categories':
            errorMsg = checkCategories();
            break;
        case 'monthlySales':
            errorMsg = checkMonthlySales(fieldValue);
            break;
        case 'ownerName':
            errorMsg = checkOwnerName(fieldValue);
            break;
        case 'ownerEmail':
            errorMsg = checkOwnerEmail(fieldValue);
            break;
        case 'ownerPhone':
            errorMsg = checkOwnerPhone(fieldValue);
            break;
        case 'ownerDob':
            errorMsg = checkOwnerDob(fieldValue);
            break;
        case 'businessAddress':
            errorMsg = checkBusinessAddress(fieldValue);
            break;
        case 'businessPincode':
            errorMsg = checkBusinessPincode(fieldValue);
            break;
        case 'accountHolder':
            errorMsg = checkAccountHolder(fieldValue);
            break;
        case 'bankName':
            errorMsg = checkBankName(fieldValue);
            break;
        case 'accountNumber':
            errorMsg = checkAccountNumber(fieldValue);
            break;
        case 'ifscCode':
            field.value = fieldValue.toUpperCase();
            errorMsg = checkIfscCode(field.value);
            break;
        case 'taxStatus':
            const selectedTax = document.querySelector('input[name="taxStatus"]:checked');
            fieldValue = selectedTax ? selectedTax.value : '';
            errorMsg = checkTaxStatus(fieldValue);
            break;
        case 'gstNumber':
            field.value = fieldValue.toUpperCase();
            const currentTaxStatus = document.querySelector('input[name="taxStatus"]:checked')?.value;
            errorMsg = checkGstNumber(field.value, currentTaxStatus);
            break;
    }
    
    if (errorMsg) {
        showErrorMessage(field, errorMsg);
        return false;
    } else {
        clearErrorMessage(field);
        if (fieldValue || field.checked) setFieldValid(field);
        return true;
    }
}