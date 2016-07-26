'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
  prompting: function () {
    var prompts = [{
      type: "input",
      name: "projectName",
      message: "Project name (no spaces)",
      validate: function (title) {
        if (title.indexOf(" ") > 0) {
          return "Project name must not have spaces";
        }

        if (title.trim() === "") {
          return "Project name must not be empty";
        }

        return true;
      }
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath(".vscode"),
      this.destinationPath(".vscode")
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.props
    );
    
    this.fs.copy(
      this.templatePath('tsconfig.json'),
      this.destinationPath('tsconfig.json')
    );
    
    this.fs.copy(
      this.templatePath('app.ts'),
      this.destinationPath('app.ts')
    );
  },

  install: function () {
    this.npmInstall(['nconf']);
    this.installDependencies();
  }
});
