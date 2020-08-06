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


var result = {
    "datos": [{
            "cantidad": 21,
            "estado": "Naranja",
            "time": "julio 2019",
            "categ2": "Moderado",
            "categ": "Ekisde"
        },
        {
            "cantidad": 2,
            "estado": "Naranja",
            "time": "julio 2019",
            "categ2": "Moderado",
            "categ": "Nic"
        },
        {
            "cantidad": 14,
            "estado": "Fresa",
            "time": "julio 2019",
            "categ2": "Moderado",
            "categ": "Galaxia"
        },
        {
            "cantidad": 17,
            "estado": "Fresa",
            "time": "julio 2019",
            "categ2": "Moderado",
            "categ": "Nic2"
        },
        {
            "cantidad": 36,
            "estado": "Naranja",
            "time": "julio 2019",
            "categ2": "Moderado",
            "categ": "Galaxia"
        },
        {
            "cantidad": 19,
            "estado": "Naranja",
            "time": "julio 2019",
            "categ2": "Moderado",
            "categ": "Nic2"
        },
        {
            "cantidad": 13,
            "estado": "Fresa",
            "time": "julio 2019",
            "categ2": "Moderado",
            "categ": "Canal2"
        },
        {
            "cantidad": 16,
            "estado": "Verde",
            "time": "julio 2019",
            "categ2": "Moderado",
            "categ": "Galaxia"
        },
        {
            "cantidad": 16,
            "estado": "Fresa",
            "time": "julio 2019",
            "categ2": "Moderado",
            "categ": "Nic3"
        },
        {
            "cantidad": 15,
            "estado": "Naranja",
            "time": "julio 2019",
            "categ2": "Moderado",
            "categ": "Canal2"
        },
        {
            "cantidad": 31,
            "estado": "Fresa",
            "time": "julio 2019",
            "categ2": "Moderado",
            "categ": "La Castellana"
        },
        {
            "cantidad": 24,
            "estado": "Naranja",
            "time": "julio 2019",
            "categ2": "Moderado",
            "categ": "Nic3"
        },
        {
            "cantidad": 14,
            "estado": "Fresa",
            "time": "julio 2019",
            "categ2": "Moderado",
            "categ": "parmalat"
        },
        {
            "cantidad": 22,
            "estado": "Fresa",
            "time": "julio 2019",
            "categ2": "Moderado",
            "categ": "Canal3"
        },
        {
            "cantidad": 34,
            "estado": "Naranja",
            "time": "julio 2019",
            "categ2": "Moderado",
            "categ": "La Castellana"
        },
        {
            "cantidad": 13,
            "estado": "Naranja",
            "time": "julio 2019",
            "categ2": "Moderado",
            "categ": "parmalat"
        },
        {
            "cantidad": 23,
            "estado": "Naranja",
            "time": "julio 2019",
            "categ2": "Moderado",
            "categ": "Canal3"
        },
        {
            "cantidad": 2,
            "estado": "Verde",
            "time": "julio 2019",
            "categ2": "Moderado",
            "categ": "La Castellana"
        },
        {
            "cantidad": 2,
            "estado": "Fresa",
            "time": "julio 2019",
            "categ2": "Moderado",
            "categ": "Psicovitalem"
        },
        {
            "cantidad": 18,
            "estado": "Fresa",
            "time": "julio 2019",
            "categ2": "Moderado",
            "categ": "Ekisde"
        },
        {
            "cantidad": 1,
            "estado": "Fresa",
            "time": "julio 2019",
            "categ2": "Moderado",
            "categ": "Nic"
        },
        {
            "cantidad": 1,
            "estado": "Naranja",
            "time": "noviembre 2019",
            "categ2": "Moderado",
            "categ": "Canal3"
        },
        {
            "cantidad": 22,
            "estado": "Fresa",
            "time": "enero 2020",
            "categ2": "Moderado",
            "categ": "Canal3"
        },
        {
            "cantidad": 34,
            "estado": "Naranja",
            "time": "enero 2020",
            "categ2": "Moderado",
            "categ": "La Castellana"
        },
        {
            "cantidad": 14,
            "estado": "Fresa",
            "time": "enero 2020",
            "categ2": "Moderado",
            "categ": "parmalat"
        },
        {
            "cantidad": 23,
            "estado": "Naranja",
            "time": "enero 2020",
            "categ2": "Moderado",
            "categ": "Canal3"
        },
        {
            "cantidad": 2,
            "estado": "Verde",
            "time": "enero 2020",
            "categ2": "Moderado",
            "categ": "La Castellana"
        },
        {
            "cantidad": 13,
            "estado": "Naranja",
            "time": "enero 2020",
            "categ2": "Moderado",
            "categ": "parmalat"
        },
        {
            "cantidad": 2,
            "estado": "Fresa",
            "time": "enero 2020",
            "categ2": "Moderado",
            "categ": "Psicovitalem"
        },
        {
            "cantidad": 18,
            "estado": "Fresa",
            "time": "enero 2020",
            "categ2": "Moderado",
            "categ": "Ekisde"
        },
        {
            "cantidad": 1,
            "estado": "Fresa",
            "time": "enero 2020",
            "categ2": "Moderado",
            "categ": "Nic"
        },
        {
            "cantidad": 21,
            "estado": "Naranja",
            "time": "enero 2020",
            "categ2": "Moderado",
            "categ": "Ekisde"
        },
        {
            "cantidad": 2,
            "estado": "Naranja",
            "time": "enero 2020",
            "categ2": "Moderado",
            "categ": "Nic"
        },
        {
            "cantidad": 14,
            "estado": "Fresa",
            "time": "enero 2020",
            "categ2": "Moderado",
            "categ": "Galaxia"
        },
        {
            "cantidad": 17,
            "estado": "Fresa",
            "time": "enero 2020",
            "categ2": "Moderado",
            "categ": "Nic2"
        },
        {
            "cantidad": 36,
            "estado": "Naranja",
            "time": "enero 2020",
            "categ2": "Moderado",
            "categ": "Galaxia"
        },
        {
            "cantidad": 19,
            "estado": "Naranja",
            "time": "enero 2020",
            "categ2": "Moderado",
            "categ": "Nic2"
        },
        {
            "cantidad": 13,
            "estado": "Fresa",
            "time": "enero 2020",
            "categ2": "Moderado",
            "categ": "Canal2"
        },
        {
            "cantidad": 16,
            "estado": "Verde",
            "time": "enero 2020",
            "categ2": "Moderado",
            "categ": "Galaxia"
        },
        {
            "cantidad": 16,
            "estado": "Fresa",
            "time": "enero 2020",
            "categ2": "Moderado",
            "categ": "Nic3"
        },
        {
            "cantidad": 15,
            "estado": "Naranja",
            "time": "enero 2020",
            "categ2": "Moderado",
            "categ": "Canal2"
        },
        {
            "cantidad": 31,
            "estado": "Fresa",
            "time": "enero 2020",
            "categ2": "Moderado",
            "categ": "La Castellana"
        },
        {
            "cantidad": 24,
            "estado": "Naranja",
            "time": "enero 2020",
            "categ2": "Moderado",
            "categ": "Nic3"
        },
        {
            "cantidad": 40,
            "estado": "Naranja",
            "time": "julio 2019",
            "categ2": "Severo",
            "categ": "Galaxia"
        },
        {
            "cantidad": 25,
            "estado": "Fresa",
            "time": "julio 2019",
            "categ2": "Severo",
            "categ": "Nic3"
        },
        {
            "cantidad": 15,
            "estado": "Verde",
            "time": "julio 2019",
            "categ2": "Severo",
            "categ": "Galaxia"
        },
        {
            "cantidad": 16,
            "estado": "Naranja",
            "time": "julio 2019",
            "categ2": "Severo",
            "categ": "Nic3"
        },
        {
            "cantidad": 15,
            "estado": "Fresa",
            "time": "julio 2019",
            "categ2": "Severo",
            "categ": "Canal2"
        },
        {
            "cantidad": 8,
            "estado": "Naranja",
            "time": "julio 2019",
            "categ2": "Severo",
            "categ": "Canal2"
        },
        {
            "cantidad": 34,
            "estado": "Fresa",
            "time": "julio 2019",
            "categ2": "Severo",
            "categ": "La Castellana"
        },
        {
            "cantidad": 21,
            "estado": "Fresa",
            "time": "julio 2019",
            "categ2": "Severo",
            "categ": "parmalat"
        },
        {
            "cantidad": 21,
            "estado": "Fresa",
            "time": "julio 2019",
            "categ2": "Severo",
            "categ": "Canal3"
        },
        {
            "cantidad": 45,
            "estado": "Naranja",
            "time": "julio 2019",
            "categ2": "Severo",
            "categ": "La Castellana"
        },
        {
            "cantidad": 26,
            "estado": "Naranja",
            "time": "julio 2019",
            "categ2": "Severo",
            "categ": "parmalat"
        },
        {
            "cantidad": 18,
            "estado": "Naranja",
            "time": "julio 2019",
            "categ2": "Severo",
            "categ": "Canal3"
        },
        {
            "cantidad": 6,
            "estado": "Verde",
            "time": "julio 2019",
            "categ2": "Severo",
            "categ": "La Castellana"
        },
        {
            "cantidad": 12,
            "estado": "Fresa",
            "time": "julio 2019",
            "categ2": "Severo",
            "categ": "Ekisde"
        },
        {
            "cantidad": 1,
            "estado": "Fresa",
            "time": "julio 2019",
            "categ2": "Severo",
            "categ": "Nic"
        },
        {
            "cantidad": 22,
            "estado": "Naranja",
            "time": "julio 2019",
            "categ2": "Severo",
            "categ": "Ekisde"
        },
        {
            "cantidad": 25,
            "estado": "Fresa",
            "time": "julio 2019",
            "categ2": "Severo",
            "categ": "Nic2"
        },
        {
            "cantidad": 18,
            "estado": "Fresa",
            "time": "julio 2019",
            "categ2": "Severo",
            "categ": "Galaxia"
        },
        {
            "cantidad": 19,
            "estado": "Naranja",
            "time": "julio 2019",
            "categ2": "Severo",
            "categ": "Nic2"
        },
        {
            "cantidad": 21,
            "estado": "Fresa",
            "time": "enero 2020",
            "categ2": "Severo",
            "categ": "Canal3"
        },
        {
            "cantidad": 45,
            "estado": "Naranja",
            "time": "enero 2020",
            "categ2": "Severo",
            "categ": "La Castellana"
        },
        {
            "cantidad": 26,
            "estado": "Naranja",
            "time": "enero 2020",
            "categ2": "Severo",
            "categ": "parmalat"
        },
        {
            "cantidad": 18,
            "estado": "Naranja",
            "time": "enero 2020",
            "categ2": "Severo",
            "categ": "Canal3"
        },
        {
            "cantidad": 6,
            "estado": "Verde",
            "time": "enero 2020",
            "categ2": "Severo",
            "categ": "La Castellana"
        },
        {
            "cantidad": 12,
            "estado": "Fresa",
            "time": "enero 2020",
            "categ2": "Severo",
            "categ": "Ekisde"
        },
        {
            "cantidad": 1,
            "estado": "Fresa",
            "time": "enero 2020",
            "categ2": "Severo",
            "categ": "Nic"
        },
        {
            "cantidad": 22,
            "estado": "Naranja",
            "time": "enero 2020",
            "categ2": "Severo",
            "categ": "Ekisde"
        },
        {
            "cantidad": 25,
            "estado": "Fresa",
            "time": "enero 2020",
            "categ2": "Severo",
            "categ": "Nic2"
        },
        {
            "cantidad": 18,
            "estado": "Fresa",
            "time": "enero 2020",
            "categ2": "Severo",
            "categ": "Galaxia"
        },
        {
            "cantidad": 19,
            "estado": "Naranja",
            "time": "enero 2020",
            "categ2": "Severo",
            "categ": "Nic2"
        },
        {
            "cantidad": 40,
            "estado": "Naranja",
            "time": "enero 2020",
            "categ2": "Severo",
            "categ": "Galaxia"
        },
        {
            "cantidad": 25,
            "estado": "Fresa",
            "time": "enero 2020",
            "categ2": "Severo",
            "categ": "Nic3"
        },
        {
            "cantidad": 15,
            "estado": "Fresa",
            "time": "enero 2020",
            "categ2": "Severo",
            "categ": "Canal2"
        },
        {
            "cantidad": 15,
            "estado": "Verde",
            "time": "enero 2020",
            "categ2": "Severo",
            "categ": "Galaxia"
        },
        {
            "cantidad": 16,
            "estado": "Naranja",
            "time": "enero 2020",
            "categ2": "Severo",
            "categ": "Nic3"
        },
        {
            "cantidad": 8,
            "estado": "Naranja",
            "time": "enero 2020",
            "categ2": "Severo",
            "categ": "Canal2"
        },
        {
            "cantidad": 34,
            "estado": "Fresa",
            "time": "enero 2020",
            "categ2": "Severo",
            "categ": "La Castellana"
        },
        {
            "cantidad": 21,
            "estado": "Fresa",
            "time": "enero 2020",
            "categ2": "Severo",
            "categ": "parmalat"
        }
    ],
};
const DataSet = [
    {cantidad: 20,time: 2020,},
    {cantidad: 80,time: 2020, },
    {cantidad: 90,time: 2020,}
];  
var backgroud = ["#ff6699", "#ffbb99", "#adebad"];
var estadoColores = [{
        id_: "Fresa",
        Descripcion: "Severa"
    },
    {
        id_: "Naranja",
        Descripcion: "Moderada"
    },
    {
        id_: "Verde",
        Descripcion: "Sin sintomas"
    }
];
var CharConfig = {
    ContainerName: "MyChart",
    Title: "MyChart",
    GroupLabelsData: estadoColores,
    GroupDataset: result.Labels,
    //Datasets: result.datos,
    Colors: backgroud,
    ContainerSize: 400,
    ColumnLabelDisplay: 0,
    AttNameEval: "estado",
    AttNameG1: "time",
    AttNameG2: "categ2",
    AttNameG3: "categ",
    EvalValue: "cantidad",
};


var Url_Path = getAbsolutePath();
// //scripts
//importarScript("Scripts/Modules/WComponents.js", Url_Path);
// importarScript("Scripts/Modules/WNavComponents.js", Url_Path);
// importarScript("Scripts/Modules/WComponentsTools.js", Url_Path);
// importarScript("Scripts/Modules/WChartJSComponent.js", Url_Path);
// importarScript("Scripts/Modules/WChartRadial.js", Url_Path);
// importarScript("Scripts/Modules/WMultiSelect.js", Url_Path);
// //estilos
 importarStyle("Scripts/StyleModules/StyleModules.css", Url_Path);
 importarStyle("Scripts/StyleModules/WchartStyle.css", Url_Path);
 importarStyle("Scripts/StyleModules/MultiSelectStyle.css", Url_Path);

// //APP CONFIG
// importarScript("databaseScripts/Modules.js", Url_Path);
// importarScript("MasterDomClass.js", Url_Path);
 importarStyle("Styles/AppStyles.css", Url_Path);
//var modules = null;
const Multiselect = [
    {descripcion: "item 1aaa", id: 1},
    {descripcion: "item 2", id: 2},
    {descripcion: "item 3", id: 3},
    {descripcion: "item 4", id: 4},
];
const GroupMultiselect = {
    Group1:[
        {descripcion: "item 1", id: 1},
        {descripcion: "item 2", id: 2},
        {descripcion: "item 3", id: 3},
        {descripcion: "itvem 4", id: 4},
    ], Group2:[
        {descripcion: "item 1", id: 1},
        {descripcion: "item 2", id: 2},
        {descripcion: "itefm 3", id: 3},
        {descripcion: "item 4", id: 4},
    ], Group3:[
        {descripcion: "itrem 1", id: 1},
        {descripcion: "item 2", id: 2},
        {descripcion: "item 3", id: 3},
        {descripcion: "item 4", id: 4},
    ],
};
const OnLoad =  async () => { 
    const {createElement} = await import("./Scripts/Modules/WComponents.js");
    const modules = await import("./MasterDomClass.js"); 
    await import("./Scripts/Modules/WChartRadial.js"); 
    await import("./Scripts/Modules/WMultiSelect.js"); 
    await import("./Scripts/Modules/WMultiSelect.js"); 
    await import("./Scripts/Modules/WChartJSComponent.js"); 
    const BodyComponents = new modules.MasterDomClass();
    root.appendChild(createElement(BodyComponents));   
    //MULTI SELECT---------------------------------------------------------------------  
    Container.appendChild(createElement({type:"h1",children:["Multiselect"]}));  
    await awaitFunction(); 
    CharConfig.Datasets =  Multiselect;
    CharConfig.search = true;
    Container.appendChild(createElement({type: 'w-multi-select',
        props : {id: "MyMultiselect",
        data: CharConfig }}));  
    //GROUP MULTI SELECT----------------------------------------------------------------  
    Container.appendChild(createElement({type:"h1",children:["Multiselect agrupado"]}));  
    await awaitFunction();  
    CharConfig.Datasets = GroupMultiselect;
    CharConfig.search = true;
    CharConfig.groupMultiSelect = true;     
    Container.appendChild(createElement({type: 'w-multi-select',
        props : {id: "MyGroupMultiselect",
        data: CharConfig }}));  
    //RADIAL CHART--------------------------------------------------------------------
    Container.appendChild(createElement({type:"h1",children:["Radial Chart"]}));    
    await awaitFunction();
    CharConfig.Datasets =  DataSet;       
    Container.appendChild(createElement({
        type: 'w-radial-chart',
        props: {
            data: CharConfig
        }
    }));   
    //COLUM CHART----------------------------------------------------------------------
    Container.appendChild(createElement({type:"h1",children:["BarChar Agrupado"]}));
    await awaitFunction();
    CharConfig.Datasets = result.datos;      
    Container.appendChild(createElement({type: 'w-colum-chart',  props : { data: CharConfig }}));   
    //tabla dinamica estilizada  
    Container.appendChild(createElement({type:"h1",children:["Tabla Dinamica"]}));
    //StartModuleList(modules); 
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
    // let xhr
    // if (window.XMLHttpRequest) xhr = new XMLHttpRequest()
    // else xhr = new ActiveXObject("Microsoft.XMLHTTP")   
    // xhr.open('GET', ApiUrlSelect)
    // xhr.addEventListener('load', (data) => {
    //     const dataJSON = JSON.parse(data.target.response); 
    //     console.log(dataJSON.Modules);
    //     DrawTable(dataJSON.Modules, Config)
    //     Container.appendChild(Table);       
    // })
    // xhr.send() 
}



window.onload = OnLoad; 