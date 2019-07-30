# nativescript-app-duplicator
A tool to manage duplicated app in same project


## What mean this package

Sometimes in our business we have two o more app than are the same but with differents UI. Instead of create more project, this tools helps you to manage multiples app with one project for {N}.

### Install
Use it with npx
```bash
npm install -g npx
```
then
```bash
npm install nativescript-app-duplicator
```

## How it works

In first place, this plugin works with webpack flow for {N} and every commands needs a project "state" to work. Lets see commands

```bash
npx ns-dup [APPNAME] [--option]
```

Options than require APPNAME:
- --workwith or -w: set the project state to "Working on APPNAME"
- --restore or -r: restore APPNAME on state "not working" and set "Neutral state"
- --new or -n: needs to be in state "WOKRING", it will duplicate the WORKING project with APPNAME namew
- --delete or -d: delete APPNAME project


Not require APPNAME:
- --help or -h: show options

## Starting a new project

After you've created a new project with {N} cli, you have to enter in a multiproject state, so you must execute

```bash
npx ns-dup [FIRST_PROJECT_NAME] --restore
```

## STATES

### Working state

When a project is in a "working state" it means that you can work on it, the other project will not be affected ƒrom your changes on it.

### Neutral state

No project are in working state

### Phisically meaing of states

#### Projects structure

app

|- App_Resources_[PROJECT NAME]

|-..

..

[PROJECT NAME]_package.json

--

The duplicator renames resources and package.json to works with {N} CLI