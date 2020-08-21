function importarScript(name, UrlPath = "") {
    var s = document.createElement("script");
    s.src = UrlPath + name;   
    document.querySelector("head").appendChild(s);
}
function importarScriptModule(name, UrlPath = "") {
    var s = document.createElement("script");
    s.src = UrlPath + name;
    s.type = "module";
    document.querySelector("head").appendChild(s);
}
function importarStyle(name, UrlPath) {
    var s = document.createElement("link");
    s.href = UrlPath + name;
    s.rel = "stylesheet";
    document.querySelector("head").appendChild(s);
}
function getAbsolutePath() {
    let pathName = "";
    if (document.getElementById("URLPath")) {
        pathName = document.getElementById("URLPath").value;
    }
    return pathName;
}
function awaitFunction() { 
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(0);
      }, 0);
    });
}
var Url_Path = getAbsolutePath();

 importarStyle("Scripts/StyleModules/StyleModules.css", Url_Path);
 importarStyle("Scripts/StyleModules/WchartStyle.css", Url_Path);
 importarStyle("Scripts/StyleModules/MultiSelectStyle.css", Url_Path);

// //APP CONFIG
// importarScript("databaseScripts/Modules.js", Url_Path);
// importarScript("MasterDomClass.js", Url_Path);
 importarStyle("Styles/AppStyles.css", Url_Path);
//var modules = null;

const OnLoad =  async () => { 
    const {createElement} = await import("./Scripts/Modules/WComponents.js");
    const modules = await import("./MasterDomClass.js");
    const BodyComponents = new modules.MasterDomClass();
    root.appendChild(createElement(BodyComponents));
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