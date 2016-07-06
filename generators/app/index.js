'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
  prompting: function () {
    var prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'Project name'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.props
    );
    
    this.fs.copy(
      this.templatePath('tsconfig.json'),
      this.destinationPath('tsconfig.json')
    );
    
    this.fs.copyTpl(
      this.templatePath('app.ts'),
      this.destinationPath('app.ts'),
      this.props
    );
  },

  install: function () {
    this.npmInstall(['nconf']);
    this.installDependencies();
  }
});
