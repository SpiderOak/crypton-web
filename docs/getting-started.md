---
layout: docs
title: Getting Started
---

# Getting Started

If you already have the dependencies installed, you can skip to Installing Crypton.

This guide assumes you are running Linux, specifically Ubuntu. There are alternate ways to install Crypton's dependencies on other platforms, but the installation of the Crypton server is the same.

Work is underway to transition to a Docker-based development environment, which will drastically improve the following process. This is the manual way:

## Installing node

````bash
curl -sL https://deb.nodesource.com/setup | bash -
sudo apt-get install nodejs
````

## Installing PostgreSQL

````bash
sudo apt-get install postgresql
# it should now be running, no need to start it if everything went well
````

## Installing Redis

````bash
wget http://download.redis.io/releases/redis-stable.tar.gz
tar xzf redis-stable.tar.gz
cd redis-stable
make && make install
````

## Installing Crypton

````bash
git clone https://github.com/SpiderOak/crypton.git
cd crypton/server
npm link
````

## Preparing the database

````bash
sudo -u postgres psql postgres
````

## Running the tests

````bash
cd crypton
make
````

## Running the Diary example

````bash
cd crypton/client/examples/diary
crypton-server
````

and open your browser to [https://localhost:1025](https://localhost:1025)

[Start learning about accounts &rarr;](/docs/concepts/accounts.html)
