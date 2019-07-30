"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dewstrings_1 = require("dewstrings");
var filesystem = require("fs");
var ncp = require("ncp");
var rl = require("readline");
var rimarf = require("rimraf");
dewstrings_1.default();
var DewNativescriptAppManager = /** @class */ (function () {
    function DewNativescriptAppManager(project) {
        this._basePackageName = "package.json";
        this._baseResources = "App_Resources";
        this._packageName = "{0}_package.json";
        this._project = "";
        this._resources = "App_Resources_{0}";
        this._view = '<Frame defaultPage="{0}_views/home/home-page"></Frame>';
        this._dir = "./";
        this._project = project;
    }
    DewNativescriptAppManager.prototype.RestoreState = function () {
        filesystem.renameSync(this._dir + this._basePackageName, this._dir + this._packageName);
        filesystem.renameSync(this._dir + "app/" + this._baseResources, this._dir + "app/" + this._resources);
        this._packageName = "{0}_package.json";
        this._project = "";
        this._resources = "App_Resources_{0}/";
        this._view = '<Frame defaultPage="{0}/home/home-page"></Frame>';
    };
    DewNativescriptAppManager.prototype.Duplicate = function () {
        this.ConfigureSetup()
            .DuplicatePackageJson()
            .ViewFolder()
            .DuplicateResources();
    };
    DewNativescriptAppManager.prototype.WorkWith = function () {
        if (!filesystem.existsSync(this._dir + this._basePackageName)) {
            this.ConfigureSetup()
                .SetPackageJson()
                .SetPackageResources()
                .SetHome().ViewFolder();
        }
        else {
            console.error("Already working with a project, restore it before continue");
        }
    };
    DewNativescriptAppManager.prototype.ShowHelp = function () {
        console.log("command APPNAME -option");
        console.log("options: ");
        console.log("--workwith or -w : Select the current APPNAME as project to work with");
        console.log("--restore or -r : Take the current Work With project and restore it with APPNAME");
        console.log("--new or -n : Duplicate a project with APPNAME name (you must select Work With before)");
        console.log("--delete or -d : Delete a project with APPNAME");
    };
    DewNativescriptAppManager.prototype.DuplicateResources = function () {
        ncp.ncp(this._dir + "app/" + this._baseResources, this._dir + "app/" + this._resources, function (err) {
            if (err)
                return console.log(err);
        });
        return this;
    };
    DewNativescriptAppManager.prototype.ViewFolder = function () {
        if (!filesystem.existsSync(this._dir + "app/{0}_views".format([this._project]))) {
            filesystem.mkdirSync(this._dir + "app/{0}_views".format([this._project]));
        }
        return this;
    };
    DewNativescriptAppManager.prototype.DuplicatePackageJson = function () {
        var json = JSON.parse(filesystem
            .readFileSync(this._dir + this._basePackageName, { encoding: "utf8" })
            .toString());
        var id = json.nativescript.id;
        json.nativescript.id = id.replace(/\.[A-z0-9]*$/g, "." + this._project);
        filesystem.writeFileSync(this._dir + this._packageName, JSON.stringify(json));
        return this;
    };
    DewNativescriptAppManager.prototype.SetPackageJson = function () {
        filesystem.renameSync(this._dir + this._packageName, this._dir + this._basePackageName);
        return this;
    };
    DewNativescriptAppManager.prototype.SetPackageResources = function () {
        filesystem.renameSync(this._dir + "app/" + this._resources, this._dir + "app/" + this._baseResources);
        return this;
    };
    DewNativescriptAppManager.prototype.SetHome = function () {
        filesystem.unlinkSync(this._dir + "app/" + "app-root.xml");
        filesystem.writeFileSync(this._dir + "app/" + "app-root.xml", this._view);
        return this;
    };
    DewNativescriptAppManager.prototype.RemovePlatforms = function () {
        rimarf(this._dir + "platforms/", {}, function () { });
        return this;
    };
    DewNativescriptAppManager.prototype.ConfigureSetup = function () {
        this._view = this._view.format([this._project]);
        this._resources = this._resources.format([this._project]);
        this._packageName = this._packageName.format([this._project]);
        return this;
    };
    DewNativescriptAppManager.prototype.Remove = function () {
        this.RemovePlatforms()
            .RemovePackageJson()
            .RemoveResources();
        return this;
    };
    DewNativescriptAppManager.prototype.RemoveResources = function () {
        rimarf(this._dir + "app/" + this._resources, {}, function () { });
        return this;
    };
    DewNativescriptAppManager.prototype.RemovePackageJson = function () {
        rimarf(this._dir + this._packageName, {}, function () { });
        return this;
    };
    DewNativescriptAppManager.prototype.RemoveProject = function () {
        var self = this;
        var r = rl.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        r.question("Do you really do? y/n" + "\n", function (answer) {
            r.close();
            if (answer.toLowerCase() === "y")
                self.Remove();
        });
    };
    return DewNativescriptAppManager;
}());
exports.DewNativescriptAppManager = DewNativescriptAppManager;
