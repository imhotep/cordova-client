cordova-client
==============

Cordova client allows you to create, build and emulate Cordova projects.

Cordova client uses the platform specific scripts for creating, building and emulating projects. Your projects have to be created using either the platform specific create script or the cordova client master script.

Cordova client supports iOS and Android for now. More platforms will be added soon!

Cordova client requires:

- [nodejs](http://nodejs.org/)
- [iOS SDK](http://developer.apple.com)
- [Android SDK](http://developer.android.com)

Cordova client has been tested on Windows, Linux and Mas OS X.


Using cordova client
====================

config.js
---------

Cordova projects can be defined in _config.js_. Cordova client will use that file by default if no command line arguments are provided. Command-line arguments always override the settings in _config.js_
    
Sample config.js

    config = {};
    
    // point this to your phonegap distribution
    config.dist = '~/Downloads/phonegap-phonegap-41e05fc';

    // define your cordova projects and target platforms
    config.platforms = {};
    config.platforms.ios = {
        directory: './ios-example',
        package: 'org.example.mypackage',
        project_name: 'iOSExample'
    };

    config.platforms.android = {
        directory: './android-example',
        package: 'org.example.mypackage',
        project_name: 'androidExample'
    };

    module.exports = config;


Creating projects
-----------------

    cordova create [platform:[directory]:[package_name]:[project_name]]...

<!-- -->
- platform: choose between ios, android (required)
- directory: path to your new Cordova based project
- package_name: following reverse-domain style convention
- project_name: Cordova based project name

When called with no arguments _cordova create_ will generate projects based on the _config.js_ configuration file.


Project actions
---------------

    cordova debug [directory]...
    cordova clean [directory]...
    cordova emulate [directory]...

if called with no arguments, the actions above will run inside the projects that are defined in the _config.js_ configuration file.

Examples:
=========

Creating projects 
-----------------

    cordova create

Will generate the projects that are defined in the _config.js_ configuration file

    cordova create ios:./my-ios-project:com.example.myiospackage:CordovaExample android:./my-android-project:com.example.myandroidpackage:CordovaActivity

Will generate an iOS project and an android project with the given parameters.

Project actions 
---------------
    
    cordova debug

Will build the projects defined in the _config.js_ configuration file.

    cordova debug ./ios-example

Will only build the project inside ./ios-example
    
    cordova clean

Will clean the projects defined in the _config.js_ configuration file.

    cordova clean ./ios-example

Will only clean the project inside ./ios-example 
