---
layout: post
title: "Realm - My Notes"
author: "Shani"
categories: journal
tags: [Realm,100 Days Of Code,log, notes]
image: laptoplog.jpg
---

### Getting Started with Realm

I first followed the instructions from "Getting started with Realm Platform Developer Edition". The platform is a next-generation data layer for applications and provides realtime data synchronization of Realm databases. 


```
$ curl -s https://raw.githubusercontent.com/realm/realm-object-server/master/install.sh | bash
👉   Installing Realm Object Server...
👉   Installing/Using NodeJS LTS...
👉   Using Node.js v8.9.4
👉   Upgrading npm...
👉   Installing realm-object-server...

🎉    Realm Object Server is now installed!

When using Realm Object Server, remember to load the proper Node.js version
into your shell:

    nvm use v8.9.4

Here are some quick-start commands:

    ros start            # Start ROS with defaults
    ros init my-ros      # Initialize a new custom ROS project
    ros help             # Print usage information
```

Once installed, it comes with a command-line interface. The following creates a Typescript-based Node project:

```
ros init my-app
```
It then asks you to agree to terms and services with your email and if you want to receive product updates about critical bug fixes.

I (un)fortunately had issues with the simple set up and had to do it manually. I had to install nvm and make sure I was using the correct Node.js version in my shell. [Realm Object Server, hard-knocks way](https://realm.io/docs/realm-object-server/latest/#install-realm-object-server)
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.4/install.sh | bash

nvm install --lts

npm install -g node-gyp

npm install -g realm-object-server
```

Start the server with the following, after going into the directory, my-app:
```
cd my-app
npm start
```
The Realm Object Server will run locally on port 9080.

### Administering the Realm server

Download the Realm Studio to [administer your server](https://realm.io/docs/get-started/installation/developer-edition/#administering-realm-object-server). 

### First Demo App Experience with Realm