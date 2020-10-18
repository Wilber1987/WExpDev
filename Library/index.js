//getAbsolutePath();
WImports.importarStyle("Styles/AppStyles.css", Url_Path);

//var modules = null;

const OnLoad = async() => {
    const { WRender } = await
    import ("./WDevCore/WModules/WComponentsTools.js");
    const modules = await
    import ("./MasterDomClass.js");
    const BodyComponents = new modules.MasterDomClass();
    root.appendChild(WRender.createElement(BodyComponents));
}

function StartModuleList(modules) {
    var Table = CreateTable({
        TableId: "TableData",
        className: "CardStyleComponent"
    });
    let ApiUrlUpdate = "";
    let ApiUrlCreate = "";
    let ApiUrlDelete = "";
    let ApiUrlSelect = "";

    var ConfigTable = {
        Table: Table,
        CardStyle: true,
        TableContainer: false,
        Options: {
            Search: true,
            ApiSelect: {
                //ApiUrlSelect: ApiUrlSelect,
                //ResponseName: "name"
            },
            Show: true,
            ShowOptions: {
                FormName: false,
                Actions: {
                    btnInput: {
                        value: "Add Build",
                        className: "BtnSuccess",
                        onclick: "AddBuild()"
                    }
                }
            },
            Edit: true,
            EditOptions: {
                FormName: false,
                // ApiUrlUpdate: ApiUrlUpdate
            },
            Select: false
        },
    };
    DrawTable(modules.Modules, ConfigTable);
    Container.appendChild(Table);
}

window.onload = OnLoad;