var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
    _generateBasicFiles: function(props) { //copy files
        this.log('-------start to generate files--------')

        if (props.grunt) {
            this.directory(props.jslib + '_app', 'app');
            this.directory('assets', 'assets');

            this.copy('README.md', 'README.md');

            this.copy('package.json', 'package.json');
            this.copy(props.jslib + '_bower.json', 'bower.json');
            this.copy('Gruntfile.js', 'Gruntfile.js');
        } else {
            this.directory('simple-admin', 'app');
        }

    },
    prompting: function() {
        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the ' + chalk.red('generator-ymt-admin') + ' generator!'
        ));

        var prompts = [{
            type: 'list',
            name: 'jslib',
            message: 'choose a framework or library you need?(default jquery)',
            choices: ['jquery', 'angular'],
            default: 'jquery'
        }, {
            type: 'confirm',
            name: 'grunt',
            message: 'do you need grunt?(default no)',
            default: false
        }, {
            type: 'list',
            name: 'theme',
            message: 'which theme do you like?(default theme blue)',
            choices: ['blue', 'purple', 'yellow', 'green'],
            default: 'blue' //
        }];

        return this.prompt(prompts).then(function(props) {
            // To access props later use this.props.jslib;
            this.props = props;
            this._generateBasicFiles(this.props);
        }.bind(this));
    },

    writing: function() {
        //templates
        if (this.props.grunt) {
            this.fs.copyTpl(
                this.templatePath(this.props.jslib + '_index.html'),
                this.destinationPath('app/index.html'), { style: this.props.theme }
            );
        } else {
            this.fs.copyTpl(
                this.templatePath('simple_index.html'),
                this.destinationPath('app/index.html'), { style: this.props.theme }
            );
        }

    },

    install: function() {
        if (this.props.grunt) {
            this.installDependencies();
        }
        this.log('finished!')
    }
});
