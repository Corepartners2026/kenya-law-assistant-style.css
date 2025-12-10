// Wait for DOMContentLoaded then attempt to initialize the webchat
document.addEventListener('DOMContentLoaded', function () {
  var attempts = 0;
  var maxAttempts = 60; // try for ~9 seconds (150ms * 60)
  var intervalMs = 150;

  function tryInit() {
    attempts++;
    // Typical injector exposes window.botpressWebChat or similar
    var webchat = window.botpressWebChat || window.botpressWebchat || window.bpwebchat;
    if (webchat && typeof webchat.init === 'function') {
      try {
        webchat.init({
          container: '#kenya-law-assistant-container',
          botName: 'Kenya Law Assistant',
          // Customize options as required by your bot/deployment:
          // host: 'https://your-bot-host.example', botId: 'LECH8PCK'
        });
      } catch (err) {
        // initialization error logged for debugging
        console.error('Kenya Law Assistant initialization failed:', err);
      }
      return;
    }

    if (attempts < maxAttempts) {
      setTimeout(tryInit, intervalMs);
    } else {
      console.warn('Kenya Law Assistant: webchat injector not detected after retries.');
      // Optionally reveal a fallback link for manual opening
      var link = document.getElementById('open-chat-link');
      if (link) {
        link.addEventListener('click', function (e) {
          e.preventDefault();
          alert('Chat initialization failed. Please check console or network settings.');
        });
        link.style.display = 'inline';
      }
    }
  }

  tryInit();
});
