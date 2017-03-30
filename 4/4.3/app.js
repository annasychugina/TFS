var randomButtonElement = document.getElementById('randomize');
var randomUserElement = document.getElementById('user');
var errorElement = document.getElementById('error');

randomButtonElement.onclick = function () {
	return new Promise((resolve, reject) => {
		fetch('https://api.github.com/users')
			.then(
				response => {
					if (response.status != 200) {
						reject(new Error('Ошибка ' + response.status));
					} else {
						resolve(response.json());
					}
				})
	})
		.then(data => {
			var user = data[Math.floor(Math.random() * data.length)];
			loadImage(user.avatar_url, function() {
				hideError();
				drawUser(user)
			});
		})
		.catch(error => showError(error))
};

function showError(err) {
	errorElement.textContent = err;
	errorElement.classList.remove('hidden');
	randomUserElement.classList.add('hidden');
}

function hideError() {
	errorElement.classList.add('hidden');
	randomUserElement.classList.remove('hidden');
}


function loadImage(imageUrl, successCallback, errorCallback) {
	var img = new Image();

	img.onload = function () {
		successCallback(img);
	};

	img.onerror = function () {
		errorCallback(new Error('Что-то пошло не так'));
	};
	img.src = imageUrl;
}

function drawUser(data) {
	var img = randomUserElement.querySelector('img');
	var link = randomUserElement.querySelector('a');
	img.src = data.avatar_url;
	img.alt = data.login;
	link.href = data.html_url;
	link.textContent = data.login;
}
