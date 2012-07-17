#!/usr/bin/env node

var config = require('./config.js'),
    fs = require('fs'),
    util = require('util'),
    spawn = require('child_process').spawn;

var actions = ['create', 'debug', 'clean', 'emulate'];
var action = 'create';

function usage(code) {
    console.error("usage:  cordova create [platform:[directory]:[package_name]:[project_name]]...");
    console.error("\tcordova build [directory]...");
    console.error("\tcordova clean [directory]...");
    console.error("\tcordova emulate [directory]...");
    process.exit(code);
}

function createProject(platform, options) {
    // if used with the cordova distribution
    var dist = __dirname + '/../lib/' + platform;
    if(!fs.existsSync(dist)) {
        dist = config.dist; 
        if(!fs.existsSync(dist)) {
            console.error('Could not find Cordova distribution directory');
            console.error('Point config.dist to your phonegap distribution path in config.js');
            process.exit(3);
        }
    }
    //console.log(util.format("%s/lib/%s/bin/create ", dist, platform) + options.join(' '));
    spawn(util.format("%s/lib/%s/bin/create", dist, platform), options, function(code) {
        if(code != 0) {
            console.error("An error occurred while creating project");
        } else {
            console.log(platform+" project successfully created");
        }
    });
}

function runProjectAction(action, directory) {
    // console.log(util.format("%s/cordova/debug ", directory));
    spawn(util.format("%s/cordova/%s", directory, action), [], function(code) {
        if(code != 0) {
            console.error("An error occurred while building project");
        }
    });
}

function processArguments() {
    var platforms = config.platforms;
    process.argv.forEach(function(val, index, array) {
        // XXX remove this
        // console.log(index + ': '+ val);
        
        // action is required: create, build, emulate, clean...
        if(index == 2) {
            if(actions.indexOf(val) == -1) {
                usage(2);
            }
            action = val;
            if(array.length == 3) {
                if(action == 'create') {
                    var platform;
                    for(platform in platforms) {
                        var options = [
                            platforms[platform].directory,
                            platforms[platform].package,
                            platforms[platform].name
                        ];
                        createProject(platform, options);
                    }
                } else {
                    var platform;
                    for(platform in platforms) {
                        runProjectAction(action, platforms[platform].directory);
                    }
                }
            } 
        }
        // other arguments such as: platform:directory:package:project_name
        // OR directory... only in the case of an existing cordova project
        if(index > 2) {
            var options = val.split(':');

            var platform = options[0];
            // if it is not a platform we consider it to be a directory
            if(platforms[platform] === undefined && action != 'create') {
                directory = platform;
                runProjectAction(action, directory);
            } 
            if(platforms[platform] !== undefined && action == 'create') {
                createProject(platform, options.slice(1));
            }
        }
    });
}

if(process.argv.length < 3) {
    usage(1);
} else {
    processArguments();
}
