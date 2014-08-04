---
layout: docs
title: Accounts
---

# Accounts

Each user of a Crypton application must have an Account. Accounts consist of an id number, creation time, username, and a keyring.

## Keyrings

Crypton's database stores an encrypted set of keys for each user, called their Keyring. Here's a simplified version of what it looks like:

````sql
CREATE TABLE base_keyring (
  base_keyring_id int8 primary key,
  account_id int8 references account,
  creation_time timestamp default current_timestamp,
  srp_verifier bytea,
  srp_salt bytea,
  keypair_salt bytea,
  keypair_mac_salt bytea,
  keypair bytea,
  keypair_mac bytea,
  pubkey bytea,
  container_name_hmac_key bytea,
  hmac_key bytea,
  sign_key_pub bytea,
  sign_key_private_mac_salt bytea,
  sign_key_private_ciphertext bytea,
  sign_key_private_mac bytea,
  deletion_time timestamp
);
````

Upon successful authorization, the encrypted keyring is sent to the user and "unwrapped" with a key derived from their password.

Because the keyring is primarily wrapped with a password-derived key, it is imperative you either require or implore your users to choose a strong passphrase.

## Creating accounts

Here is an example of generating an account:

````javascript
var username = prompt('Username?');
var password = prompt('Password?');

crypton.generateAccount(
  username,
  password,
  function done (err, account) {
    if (err) {
      alert(err);
      return;
    }

    login(username, password);
  }
);
````

Behind the scenes, Crypton is:

* making sure the server has version parity with the client
* making sure the username is available
* generating a keyring
* encrypting that keyring
* creating a [Transaction](/docs/concepts/transactions.html) to save the account
* committing the transaction

You can also pass a 4th argument into `generateAccount` if you wish to only generate the account and not save it (useful for testing):

````
crypton.generateAccount(
  username,
  password,
  function (err, account) {
    console.log(arguments);
  }, {
    save: false
  }
);
````

[Get a session &rarr;](/docs/concepts/sessions.html)
