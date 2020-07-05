function importarScript(name, UrlPath = "") {    
    var s = document.createElement("script");
    s.src = UrlPath + name;
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
    return  pathName;  
}
window.onload = OnLoad;

var Url_Path = getAbsolutePath();
importarScript("Scripts/Modules/WComponents.js", Url_Path);
importarScript("Scripts/Modules/WNavComponents.js", Url_Path);
importarScript("Scripts/Modules/WComponentsTools.js", Url_Path);
importarStyle("Scripts/StyleModules/StyleModules.css", Url_Path);
//APP CONFIG
importarScript("databaseScripts/Modules.js", Url_Path);
importarScript("MasterDomClass.js", Url_Path);
importarStyle("Styles/AppStyles.css", Url_Path);
var modules = null;


// const BodyComponents = {
//     type: 'form',
//     props: { class: 'section', id: 'FormContainer' },
//     children: [
//         { type: 'header',
//          children: [{ type: 'button', props: {id:"ViewMenu"},children: ['Nav']}]
//         }, 
//         { type: 'nav', props: {id:"NavContainer", class: "Menu"} },
//         { type: 'main', children: [{ type: 'section', props: {id:"Container"}}] },
//         { type: 'footer'}, 
//     ]    
// }

// const x = {
//     type: 'ul',
//     props: { class: 'list' },
//     children: [{
//       type: 'li',
//       children: [ 'list item 1' ]
//     }, {
//       type: 'li',
//       children: [ 'list item 2' ]
//     }]
// }


function OnLoad() {
    modules = new Modules(); 
    const BodyComponents = new MasterDomClass();
    root.appendChild(createElement(BodyComponents)); 
    StarDOM();
    StartModuleList();       
}
function StartModuleList(){
    var Table = CreateTable({TableId:"TableData", className : "CardStyleComponent"});
    let ApiUrlUpdate =  "http://localhost/INCLUSIVE_PROYECT/PhpApi/ApiSWGetModules.php";
    let ApiUrlCreate =  "http://localhost/INCLUSIVE_PROYECT/PhpApi/ApiSWGetModules.php";
    let ApiUrlDelete =  "http://localhost/INCLUSIVE_PROYECT/PhpApi/ApiSWGetModules.php";
    let ApiUrlSelect =  "http://localhost/INCLUSIVE_PROYECT/PhpApi/ApiSWGetModules.php";

    var Config = {
        Table: Table,
        CardStyle: true, 
        TableContainer: false,
        Options: {
            Search: true,
            ApiSelect: {ApiUrlSelect : ApiUrlSelect, ResponseName: "Monsters"},            
            Show: true, 
            ShowOptions:{FormName: false, Actions:{btnInput:{value:"Add Build", className:"BtnSuccess", onclick:"AddBuild()"}}
            } ,
            Edit: false,
            EditOptions:{FormName: false, ApiUrlUpdate: ApiUrlUpdate},
            Select: false
        },
    };
    DrawTable(modules.Modules, Config);
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
function StarDOM(){
    const Path= Url_Path;  
    var MenuNavList = {
             
        Home: "index.html",
        Perfil: "Modules/Config/Perfil.html", 
        Settings: "Modules/Config/Settings.html"        
    }
    const Nav = DrawNav(MenuNavList, 
        {Path: Path, className:"MyNav", CallBTN: "ViewMenu", Animation: "SlideLeft"});

    NavContainer.appendChild(Nav);
}




// console.log(h('ul', x.props, x.children))
  


