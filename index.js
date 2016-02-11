#!/usr/bin/env node

'use strict';

var inquirer = require('inquirer');
var shell = require('shelljs');
var resp = shell.exec('git for-each-ref --sort=-committerdate refs/heads/', {silent:true});
var cutMap = resp.output.split('\n').map(function(cut){
    return cut.split('heads/')[1];
});

inquirer.prompt([
  {
    type: 'list',
    name: 'branch',
    message: 'Choose branch to jump',
    choices: cutMap.slice(0, 7)
  }
], function( answers ) {
    var command = ' git checkout ' + answers.branch;
    shell.exec(command);
});