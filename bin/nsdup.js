#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var appManager_1 = require("../lib/appManager");
if (process.argv[3] === "--restore" || process.argv[3] === "-r") {
    try {
        new appManager_1.DewNativescriptAppManager(process.argv[2]).ConfigureSetup().RestoreState();
    }
    catch (err) {
        console.error("No default state to restore");
    }
}
console.log(process.cwd());
if (process.argv[3] === "--workwith" || process.argv[3] === "-ww") {
    new appManager_1.DewNativescriptAppManager(process.argv[2]).ConfigureSetup().WorkWith();
}
if (process.argv[3] === "--new" || process.argv[3] === "-n") {
    try {
        new appManager_1.DewNativescriptAppManager(process.argv[2]).ConfigureSetup().Duplicate();
    }
    catch (err) {
        console.error("Unable to find a base project to duplicate, you should apply a work with before use this feature");
    }
}
if (process.argv[3] === "--delete" || process.argv[3] === "-d") {
    new appManager_1.DewNativescriptAppManager(process.argv[2]).ConfigureSetup().RemoveProject();
}
if (process.argv[3] === "--help" || process.argv[3] === "-h") {
    new appManager_1.DewNativescriptAppManager(process.argv[2]).ShowHelp();
}
