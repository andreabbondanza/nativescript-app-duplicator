export declare class DewNativescriptAppManager {
    private _basePackageName;
    private _baseResources;
    private _packageName;
    private _project;
    private _resources;
    private _view;
    private _dir;
    constructor(project: string);
    RestoreState(): void;
    Duplicate(): void;
    WorkWith(): void;
    ShowHelp(): void;
    private DuplicateResources;
    private ViewFolder;
    private DuplicatePackageJson;
    private SetPackageJson;
    private SetPackageResources;
    private SetHome;
    private RemovePlatforms;
    ConfigureSetup(): DewNativescriptAppManager;
    private Remove;
    private RemoveResources;
    private RemovePackageJson;
    RemoveProject(): void;
}
