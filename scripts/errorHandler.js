function showErrorMessage(element, message) {
    const parentGroup = element.closest('.form_group');
    parentGroup.classList.add('error');
    parentGroup.classList.remove('valid');
    const errorSpan = parentGroup.querySelector('.error-message');
    if (errorSpan) {
        errorSpan.textContent = message;
    }
}
function clearErrorMessage(element) {
    const parentGroup = element.closest('.form_group');
    parentGroup.classList.remove('error');
    const errorSpan = parentGroup.querySelector('.error-message');
    if (errorSpan) {
        errorSpan.textContent = '';
    }
}
function setFieldValid(element) {
    const parentGroup = element.closest('.form_group');
    parentGroup.classList.remove('error');
    parentGroup.classList.add('valid');
}