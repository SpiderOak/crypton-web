---
layout: docs
title: Transactions
---

# Transactions

Transactions are structures to make atomic changes to the database. Developers need not worry about them unless they are trying to do several things at a time and require atomicity.

## Transaction chunks

Transactions have `chunks` which are just different actions that can be executed. A list of chunk types at the time of writing this:

````javascript
var types = [
  'addAccount',
  'setBaseKeyring',
  'addContainer',
  'deleteContainer',
  'addContainerSessionKey',
  'addContainerSessionKeyShare',
  'addContainerRecord',
  'addMessage',
  'deleteMessage'
];
````

## Creating a transaction

````javascript
new crypton.Transaction(session, function (err, tx) {
  if (err) {
    alert(err);
    return;
  }

  doStuffWithTransaction(tx);
});
````

Behind the scenes, Crypton is:

* creating a new row in the transaction table
* getting a transaction id

## Adding to a transaction

You may only add predefined chunks to a transaction.

````javascript
function doStuffWithTransaction (tx) {
  var chunk = {
    type: 'addContainer',
    containerNameHmac: 'foo'
  };

  tx.save(chunk, function (err) {
    if (err) {
      alert(err);
    }
  });
}
````

Behind the scenes, Crypton is:

* verifying the contents of the chunk
* creating a new record in the appropriate table

## Aborting a transaction

````javascript
tx.abort(function (err) {
  if (err) {
    alert(err);
  }
});
````

Behind the scenes, Crypton is:

* marking the transaction row as aborted

## Comitting a transaction

````javascript
tx.commit(function (err) {
  if (err) {
    alert(err);
  }
});
````

Behind the scenes, Crypton is:

* requesting a commit on the transaction
* pulling chunks from all appropriate tables
* creating temporary tables
* creating temporary tables for changes
* calculating changes
* running through logic to validate every chunk
* committing changes to the database
