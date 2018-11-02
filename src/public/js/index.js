window.onload = function() {
	axios.post('/verify', { page: 'index' }).then(res => {
		console.log(res);
	}).catch(error => {
		console.log(error);
	});
};