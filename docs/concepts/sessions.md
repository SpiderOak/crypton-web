---
layout: docs
title: Sessions
---

# Sessions

Session objects are required to interact with [Transaction](/docs/concepts/transactions.html)-based classes, like [Containers](/docs/concepts/containers.html) and [Messages](/docs/concetps/messages.html). You get a session object from a successful authorization.

## Logging in

Continued from the [previous example](/docs/concepts/accounts.html), here is an example of authorizing with a backend server:

````javascript
function login (username, password) {
  crypton.authorize(
    username,
    password,
    function (err, session) {
      if (err) {
        alert(err);
        return;
      }

      // store the session object somewhere in the scope
      window.session = session;
      startApplication();
    }
  );
}
````

Behind the scenes, Crypton will:

* go through [SRP](https://en.wikipedia.org/wiki/Secure_Remote_Password_protocol) to prove the user knows the password
* receive the encrypted keyring for the account
* derive the wrapping key from the password
* decrypt the keyring
* get a session from the server

[Create a container &rarr;](/docs/concepts/containers.html)
