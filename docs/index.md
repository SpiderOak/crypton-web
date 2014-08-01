---
layout: docs
title: Documentation
---

Crypton is a unique way to build applications, primarily because it makes it simple to store data with a server in such a way that the server doesn't know what that data is.

Working with it is not dissimilar to using a "Backend as a Service". Crypton-based applications are developed completely on the client, and the server acts as a "dumb pipe" to store and retreive data. There are some exceptions to the dumb pipe rule, such as users must prove that they know an account's password before their [encrypted keyring](/docs/concepts/accounts.html) is sent to them. However, these considerations are abstracted out and application developers need not worry about them.

Other than being developed completely on the client, Crypton makes no assumptions about how  you structure an application - you can use whichever frontend framework you please. At its core, Crypton is merely a vehicle to store data. This is done through [Containers](/docs/concepts/containers.html), which act more or less like an object database similar to [ZODB](http://www.zodb.org/en/latest/).

There is a problem with doing cryptography in a web browser, where an end user cannot (or will not) verify the entirety of code sent to them upon loading a page - a service operator can therefore inject malicious code into a previously verified page. Because of this, we can only recommend Crypton for use in packaged applications, such as with Cordova or node-webkit. For more information, see our [security model](/docs/security/model.html).

Though we have undergone [two audits](/docs/security/audits.html), Crypton has changed in the meantime and we are waiting to begin a supplementary audit on the latest code. Use at your own risk.

[Get started &rarr;](/docs/getting-started.html)
