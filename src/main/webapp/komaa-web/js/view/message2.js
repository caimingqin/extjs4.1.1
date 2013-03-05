var WEB_SOCKET_SWF_LOCATION = "web-socket/WebSocketMain.swf";
//var WEB_SOCKET_SWF_LOCATION = "web-socket/WebSocketMainInsecure.swf";


WEB_SOCKET_DEBUG = true;

var Console = {};

Console.log = (function(message) {
    var console = document.getElementById('console');
    var p = document.createElement('p');
    p.style.wordWrap = 'break-word'; 
    p.innerHTML = message;
    console.appendChild(p);
    while (console.childNodes.length > 25) {
        console.removeChild(console.firstChild);
    }
    console.scrollTop = console.scrollHeight;
});


  // Write your code in the same way as for native WebSocket:
  var ws = new WebSocket("ws://1.232.123.197:8080/komma/messageHandler.shtml");


  ws.onopen = function() {
//    ws.send("Hello");  // Sends a message.
            Console.log('Info: WebSocket connection opened.');
        document.getElementById('chat').onkeydown = function(event) {
            if (event.keyCode == 13) {
                sendMessage();
            }
        };
  };
  ws.onmessage = function(message) {
        Console.log(message.data);

  };
  ws.onclose = function() {
        document.getElementById('chat').onkeydown = null;
        Console.log('Info: WebSocket closed.');
  }; 

  function sendMessage(){
    var message = document.getElementById('chat').value;
    if (message != '') {
        ws.send(message);
        document.getElementById('chat').value = '';
    }
  };