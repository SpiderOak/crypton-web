---
layout: docs
title: Peers
---

# Peers

Peers are pared-down accounts which are accessible to other accounts, containing the peer's public keys. 

## Theory

A peer is untrusted by default. A malicious server operator may alter a request for a peer's public keys. Therefore, before any operations with the peer object, it is recommended to have users verify their fingerprints out-of-band. A per-account internal container called the `trustStateContainer` contains the fingerprints of all trusted peers and is checked for inconsistencies when a peer is loaded.

## Getting a peer object

````javascript
var username = prompt('Who do you want to talk to?');

session.getPeer(username, function (err, peer) {
  if (err) {
    alert(err);
    return;
  }

  talkTo(peer);
});
````

Behind the scenes, Crypton is:

* requesting the peer's public keys from the server
* generating a fingerprint from those public keys

This means that a malicious server operator can build a network graph of peers. We are looking for ways to avoid this.

## Verifying a peer

You can easily check if a peer is already trusted:

````javascript
if (peer.trusted) {
  alert('yay!');
}
````

Otherwise, you should display the fingerprint to the user and encourage them to verify with their peer out of band:

````javascript
alert('Your fingerprint is: ' + session.account.fingerprint);
alert('Verify peer has fingerprint: ' + peer.fingerprint);
````

We are working on improved user experience for fingerprint verification. For now application developers are left to their own devices.

## Trusting a peer

````javascript
var shouldTrust = confirm('Do the fingerprints match?');

if (shouldTrust) {
  peer.trust(function (err) {
    if (err) {
      alert(err);
      return;
    }

    talkTo(peer);
  });
}
````

Behind the scenes, Crypton is:

* saving their fingerprint to an internal `trustStateContainer`

[Send a message to a peer &rarr;](/docs/concepts/messages.html)
