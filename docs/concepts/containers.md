---
layout: docs
title: Containers
---

# Containers

Each account may have Containers which store data.

## Theory

Containers are stored on the backend as incremental changes, internally called container records, similar to a git commit. Every delta between versions is stored encrypted with a per-container symmetric key, `containerSessionKey`. Container session keys are encrypted with their account's public key to create a `containerSessionKeyShare`.

When interacting with the server, for example when requesting old container records, the container's name is put through an HMAC keyed by the account's `containerNameHmacKey`. This means the server doesn't know the plaintext name of the container.

All container operations are executed through [Transactions](/docs/concepts/transactions.html).

This is hopefully all hidden from the developer, with the aim of creating a very simple way to store and retreive data in manner that the server doesn't know anything about it.

## Creating a container

````javascript
var containerName = 'hit counter';

session.create(
  containerName,
  function (err, container) {
    if (err) {
      alert(err);
      return;
    }

    doSomethingWith(container);
  }
);
````

Behind the scenes, Crypton is:

* running the container name through an HMAC
* making sure the container doesn't already exist
* generating a container session key
* enrypting the container session key with the user's public key
* creating an initial container record
* encrypting the initial container record with the session key
* saving all these parts to the server with a [Transaction](/docs/concepts/transactions.html)

## Loading an existing container

In a real application, you should attempt to load a container before attempting to create it. We are working to simplify this into one command. For now:

````javascript
session.load(
  containerName,
  function (err, container) {
    if (err) {
      alert(err);
      return;
    }

    doSomethingWith(container);
  }
);
````

Behind the scenes, Crypton is:

* running the container name through an HMAC
* downloading all container records for the container
* decrypting the container's session key
* decrypting each record with the session key
* rebuilding the container state with decrypted record deltas

## Manipulating a container

The meat of a container is in its `keys` member. This may change in the future.

````
function doSomethingWith (container) {
  if (!container.keys['count']) {
    container.keys['count'] = 1;
  } else {
    container.keys['count']++;
  }

  container.save(function (err) {
    if (err) {
      alert(err);
    }
  });
}
````

Behind the scenes, Crypton is:

* syncing the container with the server
* generating a delta from the last known version
* encrypting that delta with the session key
* saving the new container record with a [Transaction](/docs/concepts/transactions.html)

## Sharing a container with a [Peer](/docs/concepts/peers.html)

Assuming you have a trusted Peer object, you can do the following:

````javascript
container.share(peer, function (err) {
  if (err) {
    alert(err);
  }
});
````

Behind the scenes, Crypton is:

* encrypting the container's session key to the peer's public key
* creating a [Message](/docs/concepts/messages.html) for the peer to inform them of this
* saving these to the server with a [Transaction](/docs/concepts/transactions.html)

[Get a peer &rarr;](/docs/concepts/peers.html)
