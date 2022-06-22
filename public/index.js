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

let subscribedTopics = new Set();
let currentTopic = '';

document.getElementById('subscribe-topic').addEventListener('keyup', e => {
	currentTopic = e.target.value;
	if (currentTopic.trim() === '') {
		document.getElementById('subscribe-topic').className =
			'uk-input uk-form-danger';
	} else {
		document.getElementById('subscribe-topic').className = 'uk-input';
	}
});

document.getElementById('subscribe-form').addEventListener('submit', e => {
	e.preventDefault();
	if (currentTopic.trim() !== '') {
		if (subscribedTopics.has(currentTopic.trim()))
			UIkit.notification('Already subscribed to this topic!', 'danger');
		else {
			subscribedTopics.add(currentTopic.trim());
			document.getElementById('no-subscribe').className =
				'uk-text-lead hide';
			const container = document.createElement('div');
			container.id = `subscribed-topic-${encodeURIComponent(
				currentTopic.trim()
			)}`;
			container.className = 'subscribe-topic-messages';
			container.innerHTML = `<div class="subscribe-topic-messages-header">
            <span class="uk-text-lead">Topic: ${currentTopic.trim()}</span>
            <span uk-icon="close" onclick="unsubscribe('${encodeURIComponent(
				currentTopic.trim()
			)}')"></span>
            </div>
            <span class="uk-text-emphasis">Messages:</span>
            <div id="messages-${encodeURIComponent(
				currentTopic.trim()
			)}" class="subscribe-topic-messages-content">
            </div>`;
			document
				.querySelector('.subscribe-container')
				.appendChild(container);
			UIkit.notification(
				`Successfully subscribed to ${currentTopic.trim()}`,
				'success'
			);
		}
	} else {
		UIkit.notification('Topic cannot be empty!', 'danger');
	}
});

function unsubscribe(encodedTopic) {
	document.getElementById(`subscribed-topic-${encodedTopic}`).remove();
	subscribedTopics.delete(decodeURIComponent(encodedTopic));
	if (subscribedTopics.size === 0)
		document.getElementById('no-subscribe').className = 'uk-text-lead';
	UIkit.notification(
		'Unsubscribed from ' + decodeURIComponent(encodedTopic),
		'success'
	);
}
