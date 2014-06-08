Grandma's Recipes
=================

##Introduction
This is just a simple repository to hold a small project I'm working on to
preserve my grandmother's colleciton of recipes. Probably not incredibly
interesting to most people and probably not something where I'm going to follow
every best practice.

My sister actually already compiled many of my grandmother's recipes and made a
website for them. However that was many years ago and she made the website with
iWeb. Apple ceased development of iWeb in 2011 and support for newer operating
systems has dwindled. Additionally the actual structure of that website wasn't
very pretty. Each recipe had its own (autogenerated) HTML, its own CSS and its
own Javascript. Eventually it got to a point where adding new recipes to the
existing site simply wasn't feasible.

So the main goal of this project is to move the recipes to a new website that
uses more modern frameworks like ember. The templating this implies should
remove almost all of the duplication, which in turn should make it easy to
continue to add recipes. Additionally separating out the recipes themselves
from the website logic should make it easier to move to other frameworks in the
future should something terrible happen to ember.

##Getting Started
###Requirements
* git
* node
* npm
* bower
* grunt (cli)

###Installing on Ubuntu (server)
```bash
sudo apt-get install git nodejs-legacy npm
git clone https://github.com/mgroshans/grandmas-recipes.git
cd grandmas-recipes
sudo npm -g install bower
sudo npm -g install grunt-cli
npm install
bower install
grunt
node server.js
```