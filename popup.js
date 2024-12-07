document.addEventListener('DOMContentLoaded', function() {
  const connectButton = document.getElementById('connectButton');

  if (connectButton) {
    connectButton.addEventListener('click', function() {
      chrome.runtime.sendMessage({action: "connectToTor"}, function(response) {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
        } else {
          console.log('Respuesta del background script:', response);
        }
      });
    });
  } else {
    console.error('El botón de conexión no existe');
  }
});
