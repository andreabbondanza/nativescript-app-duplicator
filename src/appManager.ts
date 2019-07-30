import init from "dewstrings";
import * as filesystem from "fs";
import * as ncp from "ncp";
import * as rl from "readline";
import * as rimarf from "rimraf";

init();

export class DewNativescriptAppManager
{
  private _basePackageName: string = "package.json";
  private _baseResources: string = "App_Resources";
  private _packageName: string = "{0}_package.json";
  private _project: string = "";
  private _resources: string = "App_Resources_{0}";
  private _view: string = '<Frame defaultPage="{0}_views/home/home-page"></Frame>';
  private _dir: string = "./";
  public constructor(project: string)
  {
    this._project = project;
  }
  public RestoreState()
  {
    filesystem.renameSync(
      this._dir + this._basePackageName,
      this._dir + this._packageName
    );
    filesystem.renameSync(
      this._dir + "app/" + this._baseResources,
      this._dir + "app/" + this._resources
    );
    this._packageName = "{0}_package.json";
    this._project = "";
    this._resources = "App_Resources_{0}/";
    this._view = '<Frame defaultPage="{0}/home/home-page"></Frame>';
  }

  public Duplicate()
  {
    this.ConfigureSetup()
      .DuplicatePackageJson()
      .ViewFolder()
      .DuplicateResources();
  }

  public WorkWith()
  {
    if (!filesystem.existsSync(this._dir + this._basePackageName))
    {
      this.ConfigureSetup()
        .SetPackageJson()
        .SetPackageResources()
        .SetHome().ViewFolder();
    } else
    {
      console.error(
        "Already working with a project, restore it before continue"
      );
    }
  }
  public ShowHelp()
  {
    console.log("command APPNAME -option");
    console.log("options: ");
    console.log(
      "--workwith or -w : Select the current APPNAME as project to work with"
    );
    console.log(
      "--restore or -r : Take the current Work With project and restore it with APPNAME"
    );
    console.log(
      "--new or -n : Duplicate a project with APPNAME name (you must select Work With before)"
    );
    console.log("--delete or -d : Delete a project with APPNAME");
  }
  private DuplicateResources(): DewNativescriptAppManager
  {
    ncp.ncp(
      this._dir + "app/" + this._baseResources,
      this._dir + "app/" + this._resources,
      (err) =>
      {
        if (err) return console.log(err);
      }
    );
    return this;
  }
  private ViewFolder(): DewNativescriptAppManager
  {
    if (!filesystem.existsSync(this._dir + "{0}_views".format([this._project])))
    {
      filesystem.mkdirSync(this._dir + "{0}_views".format([this._project]));
    }
    return this;
  }
  private DuplicatePackageJson(): DewNativescriptAppManager
  {
    const json = JSON.parse(
      filesystem
        .readFileSync(this._dir + this._basePackageName, { encoding: "utf8" })
        .toString()
    );
    const id: string = json.nativescript.id;
    json.nativescript.id = id.replace(/\.[A-z0-9]*$/g, "." + this._project);
    filesystem.writeFileSync(
      this._dir + this._packageName,
      JSON.stringify(json)
    );
    return this;
  }

  private SetPackageJson(): DewNativescriptAppManager
  {
    filesystem.renameSync(
      this._dir + this._packageName,
      this._dir + this._basePackageName
    );
    return this;
  }

  private SetPackageResources(): DewNativescriptAppManager
  {
    filesystem.renameSync(
      this._dir + "app/" + this._resources,
      this._dir + "app/" + this._baseResources
    );
    return this;
  }

  private SetHome(): DewNativescriptAppManager
  {
    filesystem.unlinkSync(this._dir + "app/" + "app-root.xml");
    filesystem.writeFileSync(this._dir + "app/" + "app-root.xml", this._view);
    return this;
  }

  private RemovePlatforms(): DewNativescriptAppManager
  {
    rimarf(this._dir + "platforms/", {}, () => { });
    return this;
  }

  public ConfigureSetup(): DewNativescriptAppManager
  {
    this._view = this._view.format([this._project]);
    this._resources = this._resources.format([this._project]);
    this._packageName = this._packageName.format([this._project]);
    return this;
  }

  private Remove(): DewNativescriptAppManager
  {
    this.RemovePlatforms()
      .RemovePackageJson()
      .RemoveResources();
    return this;
  }

  private RemoveResources(): DewNativescriptAppManager
  {
    rimarf(this._dir + "app/" + this._resources, {}, () => { });
    return this;
  }

  private RemovePackageJson(): DewNativescriptAppManager
  {
    rimarf(this._dir + this._packageName, {}, () => { });
    return this;
  }

  public RemoveProject()
  {
    const self = this;
    const r = rl.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    r.question("Do you really do? y/n" + "\n", function (answer: string)
    {
      r.close();
      if (answer.toLowerCase() === "y") self.Remove();
    });
  }
}
