let publishTopic = '';
let publishMessage = '';

function validate() {
	return publishTopic.trim() !== '' && publishMessage.trim() !== '';
}

document.getElementById('publish-topic').addEventListener('keyup', e => {
	publishTopic = e.target.value;
	if (publishTopic.trim() === '') {
		document.getElementById('publish-topic').className =
			'uk-input uk-form-danger';
	} else {
		document.getElementById('publish-topic').className = 'uk-input';
	}
});

document.getElementById('publish-message').addEventListener('keyup', e => {
	publishMessage = e.target.value;
	if (publishMessage.trim() === '') {
		document.getElementById('publish-message').className =
			'uk-textarea uk-form-danger';
	} else {
		document.getElementById('publish-message').className = 'uk-textarea';
	}
});

document.getElementById('publish-form').addEventListener('submit', e => {
	e.preventDefault();
	if (validate()) {
		// TODO: Add websocket publish
	} else {
		if (publishTopic.trim() === '')
			UIkit.notification('Topic cannot be empty!', 'danger');
		else UIkit.notification('Message cannot be empty!', 'danger');
	}
});
