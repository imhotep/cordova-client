# cordova-client

> The command line tool to build, deploy and manage [Cordova](http://cordova.io)-based applications.

# Requirements

* [nodejs](http://nodejs.org/)
* SDKs for every platform you wish to support
  - [BlackBerry WebWorks SDK](http://developer.blackberry.com)
  - [iOS SDK](http://developer.apple.com)
  - [Android SDK](http://developer.android.com) - **NOTE** This tool
    will not work unless you have the absolute latest updates for all
    Android SDK components. Also you will need the SDK's `tools` and `platform-tools` directories on your __system path__ otherwise Android support will fail.

cordova-client has been tested on Mas OS X and Linux.

If you are using cordova-client for building iOS applications, you will need to run the latest Mac OS with the latest XCode (4.5+) and XCode Command Line Tools.

In it's prototype stages, cordova-client only works with Cordova
v2.2.0rc1.

# Install

```
npm install -g cordova
```

**NOTE**: on Mac OS X, you may want to change the owner of the cordova directory that npm installs to. This will allow you to run cordova as local user without requiring root permissions. Assuming your node_modules directory is in `/usr/local/lib/`, you can do this by running: `sudo chown -R <username> /usr/local/lib/node_modules/cordova`

# Getting Started

cordova-client has a single global `create` command that creates new cordova projects into a specified directory. Once you create a project, `cd` into it and you can execute a variety of project-level commands. Completely inspired by git's interface.

## Global Command

- `create <directory> [<id> [<name>]]` create a new cordova project with optional name and id (package name, reverse-domain style)

<a name="project_commands" />
## Project Commands

- `platform [ls | list]` list all platforms the project will build to
- `platform add <platform> [<platform> ...]` add one (or more) platforms as a build target for the project
- `platform [rm | remove] <platform> [<platform> ...]` removes one (or more) platforms as a build target for the project
- `plugin [ls | list]` list all plugins added to the project
- `plugin add <path-to-plugin> [<path-to-plugin> ...]` add one (or more) plugins to the project
- `plugin [rm | remove] <plugin-name> [<plugin-name> ...]` remove one (or more) added plugins
- `build [<platform> [<platform> [...]]]` compile the app and deploy to a connected + compatible device. With no parameters builds for all platforms added to the project, otherwise builds for the specified platforms
- `emulate [<platform> [<platform> [...]]]` launch emulators and deploy app to them. With no parameters emulates for all platforms added to the project, otherwise emulates for the specified platforms


# Project Directory Structure
A Cordova application built with cordova-client will have the following
directory structure:

    myApp/
    |-.cordova/
    |- platforms/
    |- plugins/
    `- www/

## .cordova/
This directory identifies a tree as a cordova project. Simple configuration information is stored in here (such as BlackBerry environment variables).

Commands other than `create` operate against the project directory itself, rather than the current directory - a search up the current directory's parents is made to find the project directory. Thus, any command (other than `create`) can be used from any subdirectory whose parent is a cordova project directory (same as git).

## platforms/
Platforms added to your application will have the native
 application project structures laid out within this directory.

## plugins/
Any added plugins will be extracted or copied into this directory.

## www/
Contains the project's web artifacts, such as .html, .css and .js files. These are your main application assets. The config.xml file within this directory is very important; read on to the next section!

### Your Blanket: www/config.xml 

This file is what you should be editing to modify your application's metadata. Any time you run any cordova-client commands, the tool will look at the contents of `config.xml` and use all relevant info from this file to define native application information. cordova-client supports changing your application's data via the following elements inside the `config.xml` file:

- The user-facing name can be modified via the contents of the `<name>` element.
- The package name (AKA bundle identifier or application id) can be modified via the `id` attribute from the top-level `<widget>` element.

# Hooks

Projects created by cordova-client have `before` and `after` hooks for each [project command](#project_commands). There are two types of hooks: project-specific ones and module-level ones.

## Project-specific Hooks

These are located under the `.cordova/hooks` directory in the root of your cordova project. Any scripts you add to these directories will be executed before and after the appropriate commands. Useful for integrating your own build systems or integrating with version control systems. __Remember__: make your scripts executable.

## Module-level Hooks

If you are using cordova-client as a module within a larger node application, you can also use the standard `EventEmitter` methods to attach to the events. The events include `before_build`, `before_docs`, `before_emulate`, `before_platform_add`, `before_platform_ls`, `before_platform_rm`, `before_plugin_add`, `before_plugin_ls` and `before_plugin_rm`. Additionally, there are `after_` flavours of all the above events.

# Examples

## Creating a new cordova project
This example shows how to create a project from scratch named KewlApp with iOS and Android platform support, and includes a plugin named Kewlio. The project will live in ~/MyProjects/KewlApp

    cordova create ~/KewlApp KewlApp
    cd ~/KewlApp
    cordova platform add ios android
    cordova plugin add http://example.org/Kewlio-1.2.3.tar.gz
    cordova build 

The directory structure of KewlApp now looks like this:

    KewlApp/
    |- .cordova/
    |- platforms/
       |- android/
       |  `- …
       `- ios/
          `- …
    |- plugins/
       `- Kewlio/
    `- www/
       `- index.html

# Contributing

## Running Tests

    npm test

## TO-DO + Issues

Please check [cordova-client on GitHub](http://github.com/filmaj/cordova-client). If you find issues with this tool, please be so kind as to include relevant information needed to debug issues such as:

- Your operating system and version
- The application name, directory location, and identifier used with `create`
- Which mobile SDKs you have installed, and which version. Related to this: which Xcode version if you are submitting issues related to iOS
- Any error stack traces you received

## Contributors

Thanks to everyone for contributing! For a list of people involved, please see the `package.json` file.
