window.onload = function() {
	console.log('... user');
};

function check(form) {
	const errorItem = document.querySelector('.error-item');
	errorItem.style.display = 'none';
	if (!form.username.value || !form.password.value) {
		errorItem.style.display = 'block';
		return false;
	}
	return true;
}