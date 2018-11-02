window.onload = function(){
	console.log('start page...');
	const upload = document.querySelector('#upload');
	upload.onchange = function(){
		const imgDiv = document.querySelector('#img-div');
		const imgObj = imgDiv.querySelectorAll('img')[0];
		if(this.files.length > 0){
			document.querySelector('#upload-name').value = this.files[0].name;
			var tempUrl = window.URL.createObjectURL(this.files[0]);
			imgObj.src = tempUrl;
			imgDiv.style.display = 'block';
		}else{
			document.querySelector('#upload-name').value = '';
			imgObj.src = '#';
			imgDiv.style.display = 'none';
		}
	};
};