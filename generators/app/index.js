'use strict';
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    // The name `constructor` is important here
    constructor: function () {
        // Calling the super constructor is important so our generator is correctly set up
        generators.Base.apply(this, arguments);
        console.log("constructor here");

        // Next, add your custom code
        this.option('coffee'); // This method adds support for a `--coffee` flag
    },
    initializing:{//checking current project state, getting configs, etc
        init1:function(){
            console.log("init1");
        },
        init2:function(){
            console.log("init2");
        }
    },
    prompting: function () {//Where you prompt users for options
        var done = this.async();
        this.prompt({
            type    : 'input',
            name    : 'name',
            message : 'Your project name',
            default : this.appname // Default to current folder name
        }, function (answers) {
            this.log(answers.name);
            done();
        }.bind(this));
    },
    configuring:function(){//creating .editorconfig files and other metadata files
    },
    default:function(){//If the method name doesn't match a priority, it will be pushed to this group.
    },
    writing:function(){//Where you write the generator specific files (routes, controllers, etc)
    },
    conflicts:function(){//Where conflicts are handled (used internally)
    },
    install:function(){//Where installation are run (npm, bower)
    },
    end:function(){//Called last, cleanup, say good bye, etc
    }
});