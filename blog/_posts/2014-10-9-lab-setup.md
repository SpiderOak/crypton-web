---
layout: blog
title: HITB Lab Setup
author: cam
---

At our Hack in the Box lab session, we will be

1. giving a quick presentation on what Crypton is and can do
2. walking through using Crypton APIs
3. and building a Crypton-powered application together

We have a server running at [https://nulltxt.se:2015](https://nulltxt.se:1025) with Crypton serving up
the lab template. This should be sufficient for joining in.

If you'd like to run your own Crypton server, the following steps should make it easy.
It can take a bit of time to download the docker images if you haven't pulled them yet, so it's
recommended to do this ahead of time.

## Boot up a VM

If you aren't on Linux, boot up a VM (or do your own thing, but YMMV). This assumes you are on Ubuntu 14.04.

## Install Docker

````bash
sudo apt-get update
sudo apt-get install docker.io
sudo ln -sf /usr/bin/docker.io /usr/local/bin/docker
````

## Start Redis

````bash
sudo docker run --name crypton-redis -d redis
````

## Start Postgres

````bash
sudo docker run --name crypton-postgres -d postgres
````

## Initialize the database

````bash
sudo docker run --link crypton-redis:redis --link crypton-postgres:db -it spideroak/crypton -d db:init
````

## Start the Crypton server

````bash
sudo docker run --link crypton-redis:redis --link crypton-postgres:db -p 1025:1025 -it spideroak/crypton
# or run it in the background
sudo docker run --link crypton-redis:redis --link crypton-postgres:db -p 1025:1025 -d spideroak/crypton
````

## Forward port 1025

If you don't want to work inside the VM, you can forward port 1025 of your machine to the VM.
If you are using VirtualBox, you can find this in `Machine -> Settings -> Network -> Port Forwarding`, which should look like this:

![VirtualBox port forwarding](/images/vbpf.png)

## Confirm it's working

Depending on which system you chose to work in, you should get the following output for a curl:

````bash
~ [ curl -k https://localhost:1025/
{
  "success": true,
  "data": {
    "server": "crypton"
  }
}
````

The SSL certificate that comes with Crypton is purposefully expired, so the `-k` flag is necessary.

## Open up the walkthrough

````
git clone git@github.com:daviddahl/crypton-live-code.git
cd crypton-live-code
open index.html
````

## Point your client to your server

In a `<script>` in `index.html`, put the following:

````javascript
crypton.host = 'localhost';
// or the ip of your VM if you didn't forward the port
````
