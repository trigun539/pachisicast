var applicationID = '418A6791';
var namespace = 'urn:x-cast:com.edwinmike.pachisicast';
var session = null;

/**
 * Call initialization for Cast
 */
if (!chrome.cast || !chrome.cast.isAvailable) {
  setTimeout(initializeCastApi, 1000);
}

/**
 * initialization
 */
function initializeCastApi() {
  var sessionRequest = new chrome.cast.SessionRequest(applicationID);
  var apiConfig = new chrome.cast.ApiConfig(sessionRequest,
    sessionListener,
    receiverListener);

  chrome.cast.initialize(apiConfig, onInitSuccess, onError);
};

/**
 * initialization success callback
 */
function onInitSuccess() {
  console.log("onInitSuccess");
}

/**
 * initialization error callback
 */
function onError(message) {
  console.log("onError: ", message);
}

/**
 * generic success callback
 */
function onSuccess(message) {
  console.log('onSuccess: ', message);
}

/**
 * callback on success for stopping app
 */
function onStopAppSuccess() {
  console.log('onStopAppSuccess');
}

/**
 * session listener during initialization
 */
function sessionListener(e) {
  console.log('sessionListener:', e);
  session = e;
  session.addUpdateListener(sessionUpdateListener);  
  session.addMessageListener(namespace, receiverMessage);
}

/**
 * listener for session updates
 */
function sessionUpdateListener(isAlive) {
  var message = isAlive ? 'Session Updated' : 'Session Removed';
  message += ': ' + session.sessionId;
  console.log(message);
  if (!isAlive) {
    session = null;
  }
};

/**
 * utility function to log messages from the receiver
 * @param {string} namespace The namespace of the message
 * @param {string} message A message string
 */
function receiverMessage(namespace, message) {
  console.log('Receiver Message: ', message);
	var messageObject = JSON.parse( message );
 
  switch (messageObject.action){ 
  	case 'started':
  	  Pachisicast.gameStarted();
  	  break;
  	case 'roll':
  	  Pachisicast.yourTurnToRoll();
  	  break;
  	case 'rollResult':
  	  Pachisicast.showRollResult(messageObject);
  	  break;
    case 'successFail':
      Pachisicast.parseSuccessFail(messageObject); 
      break;
    default:
      break;
  }
};

/**
 * receiver listener during initialization
 */
function receiverListener(e) {
  if( e === 'available' ) {
    console.log("receiver found");
  }
  else {
    console.log("receiver list empty");
  }
}

/**
 * stop app/session
 */
function stopApp() {
  session.stop(onStopAppSuccess, onError);
}

/**
 * send a message to the receiver using the custom namespace
 * receiver CastMessageBus message handler will be invoked
 * @param {string} message A message string
 */
function sendMessage(message) {
  if (session!=null) {
    session.sendMessage(namespace, message, onSuccess.bind(this, "Message sent: " + message), onError);
  }
  else {
    chrome.cast.requestSession(function(e) {
        session = e;
        session.addUpdateListener(sessionUpdateListener);
        session.addMessageListener(namespace, receiverMessage);
        session.sendMessage(namespace, message, onSuccess.bind(this, "Message sent: " + message), onError);
      }, onError);
  }
}

// Roll Function
function rollNeeded(){
  console.log('Its my turn');
}

 