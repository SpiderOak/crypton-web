---
layout: docs
title: Messages
---

# Messages

<p style="color: red;">
  Messaging is still experimental. The API is likely to change.
</p>

Users can send messages to peers. They are delivered in realtime if the peer is online. Every session has an `inbox` object where messages can be found.

A message consists of headers and a payload. Headers are for small metacontent to be searched (on the client). Both headers and payloads are encrypted and signed.

## Sending a message

````javascript
var headers = {};
var payload = {
  body: 'What\'s up?'
};

peer.sendMessage(
  headers,
  payload,
  function (err, messageId) {
    if (err) {
      alert(err);
    }
  }
);
````

Behind the scenes, Crypton is:

* encrypting the headers and payload objects and signing them
* executing a [Transaction](/docs/concepts/transactions.html) to save the message
* if the peer has a WebSocket connection, notifying them

## Getting a message

Messages may arrive in realtime and can be watched for:

````javascript
session.on('message', function (message) {
  console.log(message);
  alert('got a message from: ' + message.fromUsername);
});
````

Behind the scenes, Crypton is:

* receiving a message over WebSockets
* decrypting and verifying the signature of the message
* emitting an event

If the event is not picked up, the message will remain the the session's `inbox`.

## Loading old messages

````javascript
session.inbox.poll(function (err, newMessages) {
  if (err) {
    alert(err);
    return;
  }

  var allMessages = session.inbox.list();
  console.log(allMessages);
});
````

Behind the scenes, Crypton is:

* downloading all nondeleted messages
* decrypting and verifying their headers and payloads

## Get a specific message

````javascript
session.inbox.get(
  messageId,
  function (err, message) {
    if (err) {
      alert(err);
      return;
    }

    console.log(message);
  }
);
````

Behind the scenes, Crypton is:

* downloading the requested message
* decrypting its headers and payload objects and verifying them

## Delete a message

````javascript
session.inbox.delete(
  messageId,
  function (err) {
    if (err) {
      alert(err);
      return;
    }
  }
);
````

Behind the scenes, Crypton is:

* executing a [Transaction](/docs/concepts/transactions.html) to delete the message

## Deleteing all messages

````javascript
session.inbox.clear(
  function (err) {
    if (err) {
      alert(err);
      return;
    }
  }
);
````

Behind the scenes, Crypton is:

* executing a [Transaction](/docs/concepts/transactions.html) to delete all messages

[Make your own transaction &rarr;](/docs/concepts/transactions.html)
