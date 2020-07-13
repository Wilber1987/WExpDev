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
//scripts
importarScript("Scripts/Modules/WComponents.js", Url_Path);
importarScript("Scripts/Modules/WNavComponents.js", Url_Path);
importarScript("Scripts/Modules/WComponentsTools.js", Url_Path);
importarScript("Scripts/Modules/WChartJSComponent.js", Url_Path);
//estilos
importarStyle("Scripts/StyleModules/StyleModules.css", Url_Path);
importarStyle("Scripts/StyleModules/WchartStyle.css", Url_Path);

//APP CONFIG
importarScript("databaseScripts/Modules.js", Url_Path);
importarScript("MasterDomClass.js", Url_Path);
importarStyle("Styles/AppStyles.css", Url_Path);
//var modules = null;


function OnLoad() {
    var modules = new Modules(); 
    const BodyComponents = new MasterDomClass();
    root.appendChild(createElement(BodyComponents));   
   // root.appendChild(createElement({type: 'colum-chart',  props : { data: ["CharConfig"] }})); 
    StarDOM();
    Container.appendChild(createElement({type: 'colum-chart',  props : { data: CharConfig }})); 
    //StartModuleList(modules); 

}
function StartModuleList(modules){
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

result =
    {"datos":[{"cantidad":21,"estado":"Naranja","time":"julio 2019","categ2":"Moderado","categ":"Ekisde"},
    {"cantidad":2,"estado":"Naranja","time":"julio 2019","categ2":"Moderado","categ":"Nic"},
    {"cantidad":14,"estado":"Fresa","time":"julio 2019","categ2":"Moderado","categ":"Galaxia"},
    {"cantidad":17,"estado":"Fresa","time":"julio 2019","categ2":"Moderado","categ":"Nic2"},
    {"cantidad":36,"estado":"Naranja","time":"julio 2019","categ2":"Moderado","categ":"Galaxia"},
    {"cantidad":19,"estado":"Naranja","time":"julio 2019","categ2":"Moderado","categ":"Nic2"},
    {"cantidad":13,"estado":"Fresa","time":"julio 2019","categ2":"Moderado","categ":"Canal2"},
    {"cantidad":16,"estado":"Verde","time":"julio 2019","categ2":"Moderado","categ":"Galaxia"},
    {"cantidad":16,"estado":"Fresa","time":"julio 2019","categ2":"Moderado","categ":"Nic3"},
    {"cantidad":15,"estado":"Naranja","time":"julio 2019","categ2":"Moderado","categ":"Canal2"},
    {"cantidad":31,"estado":"Fresa","time":"julio 2019","categ2":"Moderado","categ":"La Castellana"},
    {"cantidad":24,"estado":"Naranja","time":"julio 2019","categ2":"Moderado","categ":"Nic3"},
    {"cantidad":14,"estado":"Fresa","time":"julio 2019","categ2":"Moderado","categ":"parmalat"},
    {"cantidad":22,"estado":"Fresa","time":"julio 2019","categ2":"Moderado","categ":"Canal3"},
    {"cantidad":34,"estado":"Naranja","time":"julio 2019","categ2":"Moderado","categ":"La Castellana"},
    {"cantidad":13,"estado":"Naranja","time":"julio 2019","categ2":"Moderado","categ":"parmalat"},
    {"cantidad":23,"estado":"Naranja","time":"julio 2019","categ2":"Moderado","categ":"Canal3"},
    {"cantidad":2,"estado":"Verde","time":"julio 2019","categ2":"Moderado","categ":"La Castellana"},
    {"cantidad":2,"estado":"Fresa","time":"julio 2019","categ2":"Moderado","categ":"Psicovitalem"},
    {"cantidad":18,"estado":"Fresa","time":"julio 2019","categ2":"Moderado","categ":"Ekisde"},
    {"cantidad":1,"estado":"Fresa","time":"julio 2019","categ2":"Moderado","categ":"Nic"},
    {"cantidad":1,"estado":"Naranja","time":"noviembre 2019","categ2":"Moderado","categ":"Canal3"},
    {"cantidad":22,"estado":"Fresa","time":"enero 2020","categ2":"Moderado","categ":"Canal3"},
    {"cantidad":34,"estado":"Naranja","time":"enero 2020","categ2":"Moderado","categ":"La Castellana"},
    {"cantidad":14,"estado":"Fresa","time":"enero 2020","categ2":"Moderado","categ":"parmalat"},
    {"cantidad":23,"estado":"Naranja","time":"enero 2020","categ2":"Moderado","categ":"Canal3"},
    {"cantidad":2,"estado":"Verde","time":"enero 2020","categ2":"Moderado","categ":"La Castellana"},
    {"cantidad":13,"estado":"Naranja","time":"enero 2020","categ2":"Moderado","categ":"parmalat"},
    {"cantidad":2,"estado":"Fresa","time":"enero 2020","categ2":"Moderado","categ":"Psicovitalem"},
    {"cantidad":18,"estado":"Fresa","time":"enero 2020","categ2":"Moderado","categ":"Ekisde"},
    {"cantidad":1,"estado":"Fresa","time":"enero 2020","categ2":"Moderado","categ":"Nic"},
    {"cantidad":21,"estado":"Naranja","time":"enero 2020","categ2":"Moderado","categ":"Ekisde"},
    {"cantidad":2,"estado":"Naranja","time":"enero 2020","categ2":"Moderado","categ":"Nic"},
    {"cantidad":14,"estado":"Fresa","time":"enero 2020","categ2":"Moderado","categ":"Galaxia"},
    {"cantidad":17,"estado":"Fresa","time":"enero 2020","categ2":"Moderado","categ":"Nic2"},
    {"cantidad":36,"estado":"Naranja","time":"enero 2020","categ2":"Moderado","categ":"Galaxia"},
    {"cantidad":19,"estado":"Naranja","time":"enero 2020","categ2":"Moderado","categ":"Nic2"},
    {"cantidad":13,"estado":"Fresa","time":"enero 2020","categ2":"Moderado","categ":"Canal2"},
    {"cantidad":16,"estado":"Verde","time":"enero 2020","categ2":"Moderado","categ":"Galaxia"},
    {"cantidad":16,"estado":"Fresa","time":"enero 2020","categ2":"Moderado","categ":"Nic3"},
    {"cantidad":15,"estado":"Naranja","time":"enero 2020","categ2":"Moderado","categ":"Canal2"},
    {"cantidad":31,"estado":"Fresa","time":"enero 2020","categ2":"Moderado","categ":"La Castellana"},
    {"cantidad":24,"estado":"Naranja","time":"enero 2020","categ2":"Moderado","categ":"Nic3"},
    {"cantidad":40,"estado":"Naranja","time":"julio 2019","categ2":"Severo","categ":"Galaxia"},
    {"cantidad":25,"estado":"Fresa","time":"julio 2019","categ2":"Severo","categ":"Nic3"},
    {"cantidad":15,"estado":"Verde","time":"julio 2019","categ2":"Severo","categ":"Galaxia"},
    {"cantidad":16,"estado":"Naranja","time":"julio 2019","categ2":"Severo","categ":"Nic3"},
    {"cantidad":15,"estado":"Fresa","time":"julio 2019","categ2":"Severo","categ":"Canal2"},
    {"cantidad":8,"estado":"Naranja","time":"julio 2019","categ2":"Severo","categ":"Canal2"},
    {"cantidad":34,"estado":"Fresa","time":"julio 2019","categ2":"Severo","categ":"La Castellana"},
    {"cantidad":21,"estado":"Fresa","time":"julio 2019","categ2":"Severo","categ":"parmalat"},
    {"cantidad":21,"estado":"Fresa","time":"julio 2019","categ2":"Severo","categ":"Canal3"},
    {"cantidad":45,"estado":"Naranja","time":"julio 2019","categ2":"Severo","categ":"La Castellana"},
    {"cantidad":26,"estado":"Naranja","time":"julio 2019","categ2":"Severo","categ":"parmalat"},
    {"cantidad":18,"estado":"Naranja","time":"julio 2019","categ2":"Severo","categ":"Canal3"},
    {"cantidad":6,"estado":"Verde","time":"julio 2019","categ2":"Severo","categ":"La Castellana"},
    {"cantidad":12,"estado":"Fresa","time":"julio 2019","categ2":"Severo","categ":"Ekisde"},
    {"cantidad":1,"estado":"Fresa","time":"julio 2019","categ2":"Severo","categ":"Nic"},
    {"cantidad":22,"estado":"Naranja","time":"julio 2019","categ2":"Severo","categ":"Ekisde"},
    {"cantidad":25,"estado":"Fresa","time":"julio 2019","categ2":"Severo","categ":"Nic2"},
    {"cantidad":18,"estado":"Fresa","time":"julio 2019","categ2":"Severo","categ":"Galaxia"},
    {"cantidad":19,"estado":"Naranja","time":"julio 2019","categ2":"Severo","categ":"Nic2"},
    {"cantidad":21,"estado":"Fresa","time":"enero 2020","categ2":"Severo","categ":"Canal3"},
    {"cantidad":45,"estado":"Naranja","time":"enero 2020","categ2":"Severo","categ":"La Castellana"},
    {"cantidad":26,"estado":"Naranja","time":"enero 2020","categ2":"Severo","categ":"parmalat"},
    {"cantidad":18,"estado":"Naranja","time":"enero 2020","categ2":"Severo","categ":"Canal3"},
    {"cantidad":6,"estado":"Verde","time":"enero 2020","categ2":"Severo","categ":"La Castellana"},
    {"cantidad":12,"estado":"Fresa","time":"enero 2020","categ2":"Severo","categ":"Ekisde"},
    {"cantidad":1,"estado":"Fresa","time":"enero 2020","categ2":"Severo","categ":"Nic"},
    {"cantidad":22,"estado":"Naranja","time":"enero 2020","categ2":"Severo","categ":"Ekisde"},
    {"cantidad":25,"estado":"Fresa","time":"enero 2020","categ2":"Severo","categ":"Nic2"},
    {"cantidad":18,"estado":"Fresa","time":"enero 2020","categ2":"Severo","categ":"Galaxia"},
    {"cantidad":19,"estado":"Naranja","time":"enero 2020","categ2":"Severo","categ":"Nic2"},
    {"cantidad":40,"estado":"Naranja","time":"enero 2020","categ2":"Severo","categ":"Galaxia"},
    {"cantidad":25,"estado":"Fresa","time":"enero 2020","categ2":"Severo","categ":"Nic3"},
    {"cantidad":15,"estado":"Fresa","time":"enero 2020","categ2":"Severo","categ":"Canal2"},
    {"cantidad":15,"estado":"Verde","time":"enero 2020","categ2":"Severo","categ":"Galaxia"},
    {"cantidad":16,"estado":"Naranja","time":"enero 2020","categ2":"Severo","categ":"Nic3"},
    {"cantidad":8,"estado":"Naranja","time":"enero 2020","categ2":"Severo","categ":"Canal2"},
    {"cantidad":34,"estado":"Fresa","time":"enero 2020","categ2":"Severo","categ":"La Castellana"},
    {"cantidad":21,"estado":"Fresa","time":"enero 2020","categ2":"Severo","categ":"parmalat"}],"Labels":[{"time":"marzo 2020"},
    {"time":"enero 2018"},
    {"time":"marzo 2018"},
    {"time":"mayo 2018"},
    {"time":"julio 2018"},
    {"time":"septiembre 2018"},
    {"time":"noviembre 2018"},
    {"time":"diciembre 2018"},
    {"time":"enero 2019"},
    {"time":"marzo 2019"},
    {"time":"mayo 2019"},
    {"time":"julio 2019"},
    {"time":"septiembre 2019"},
    {"time":"noviembre 2019"},
    {"time":"diciembre 2019"},
    {"time":"enero 2020"}],"Labels2":[{"categ2":"Bajo"},
    {"categ2":"Moderado"},
    {"categ2":"Severo"}],"Labels3":[{"categ":"Ekisde"},
    {"categ":"Nic"},
    {"categ":"Galaxia"},
    {"categ":"Nic2"},
    {"categ":"Canal2"},
    {"categ":"Nic3"},
    {"categ":"La Castellana"},
    {"categ":"parmalat"},
    {"categ":"Canal3"},
    {"categ":"Psicovitalem"}],
    "totales":[{"cantidad":28,"estado":"Fresa","time":"julio 2019","categ2":"Moderado","categ":"Canal2"},
    {"cantidad":27,"estado":"Fresa","time":"julio 2019","categ2":"Moderado","categ":"parmalat"},
    {"cantidad":45,"estado":"Fresa","time":"julio 2019","categ2":"Moderado","categ":"Canal3"},
    {"cantidad":2,"estado":"Fresa","time":"julio 2019","categ2":"Moderado","categ":"Psicovitalem"},
    {"cantidad":39,"estado":"Naranja","time":"julio 2019","categ2":"Moderado","categ":"Ekisde"},
    {"cantidad":66,"estado":"Naranja","time":"julio 2019","categ2":"Moderado","categ":"Galaxia"},
    {"cantidad":67,"estado":"Fresa","time":"julio 2019","categ2":"Moderado","categ":"La Castellana"},
    {"cantidad":3,"estado":"Naranja","time":"julio 2019","categ2":"Moderado","categ":"Nic"},
    {"cantidad":36,"estado":"Naranja","time":"julio 2019","categ2":"Moderado","categ":"Nic2"},
    {"cantidad":40,"estado":"Fresa","time":"julio 2019","categ2":"Moderado","categ":"Nic3"},
    {"cantidad":1,"estado":"Naranja","time":"noviembre 2019","categ2":"Moderado","categ":"Canal3"},
    {"cantidad":39,"estado":"Fresa","time":"enero 2020","categ2":"Moderado","categ":"Ekisde"},
    {"cantidad":66,"estado":"Verde","time":"enero 2020","categ2":"Moderado","categ":"Galaxia"},
    {"cantidad":67,"estado":"Naranja","time":"enero 2020","categ2":"Moderado","categ":"La Castellana"},
    {"cantidad":3,"estado":"Fresa","time":"enero 2020","categ2":"Moderado","categ":"Nic"},
    {"cantidad":36,"estado":"Naranja","time":"enero 2020","categ2":"Moderado","categ":"Nic2"},
    {"cantidad":40,"estado":"Naranja","time":"enero 2020","categ2":"Moderado","categ":"Nic3"},
    {"cantidad":28,"estado":"Naranja","time":"enero 2020","categ2":"Moderado","categ":"Canal2"},
    {"cantidad":27,"estado":"Naranja","time":"enero 2020","categ2":"Moderado","categ":"parmalat"},
    {"cantidad":45,"estado":"Fresa","time":"enero 2020","categ2":"Moderado","categ":"Canal3"},
    {"cantidad":2,"estado":"Fresa","time":"enero 2020","categ2":"Moderado","categ":"Psicovitalem"},
    {"cantidad":39,"estado":"Fresa","time":"julio 2019","categ2":"Severo","categ":"Canal3"},
    {"cantidad":34,"estado":"Fresa","time":"julio 2019","categ2":"Severo","categ":"Ekisde"},
    {"cantidad":73,"estado":"Naranja","time":"julio 2019","categ2":"Severo","categ":"Galaxia"},
    {"cantidad":85,"estado":"Fresa","time":"julio 2019","categ2":"Severo","categ":"La Castellana"},
    {"cantidad":1,"estado":"Fresa","time":"julio 2019","categ2":"Severo","categ":"Nic"},
    {"cantidad":44,"estado":"Naranja","time":"julio 2019","categ2":"Severo","categ":"Nic2"},
    {"cantidad":41,"estado":"Fresa","time":"julio 2019","categ2":"Severo","categ":"Nic3"},
    {"cantidad":23,"estado":"Fresa","time":"julio 2019","categ2":"Severo","categ":"Canal2"},
    {"cantidad":47,"estado":"Naranja","time":"julio 2019","categ2":"Severo","categ":"parmalat"},
    {"cantidad":34,"estado":"Naranja","time":"enero 2020","categ2":"Severo","categ":"Ekisde"},
    {"cantidad":73,"estado":"Naranja","time":"enero 2020","categ2":"Severo","categ":"Galaxia"},
    {"cantidad":85,"estado":"Verde","time":"enero 2020","categ2":"Severo","categ":"La Castellana"},
    {"cantidad":1,"estado":"Fresa","time":"enero 2020","categ2":"Severo","categ":"Nic"},
    {"cantidad":44,"estado":"Fresa","time":"enero 2020","categ2":"Severo","categ":"Nic2"},
    {"cantidad":41,"estado":"Fresa","time":"enero 2020","categ2":"Severo","categ":"Nic3"},
    {"cantidad":23,"estado":"Fresa","time":"enero 2020","categ2":"Severo","categ":"Canal2"},
    {"cantidad":47,"estado":"Fresa","time":"enero 2020","categ2":"Severo","categ":"parmalat"},
    {"cantidad":39,"estado":"Fresa","time":"enero 2020","categ2":"Severo","categ":"Canal3"}],"Data":[{"cantidad":21,"estado":"Naranja","time":"julio 2019","categ2":"Moderado","categ":"Ekisde"},
    {"cantidad":2,"estado":"Naranja","time":"julio 2019","categ2":"Moderado","categ":"Nic"},
    {"cantidad":14,"estado":"Fresa","time":"julio 2019","categ2":"Moderado","categ":"Galaxia"},
    {"cantidad":17,"estado":"Fresa","time":"julio 2019","categ2":"Moderado","categ":"Nic2"},
    {"cantidad":36,"estado":"Naranja","time":"julio 2019","categ2":"Moderado","categ":"Galaxia"},
    {"cantidad":19,"estado":"Naranja","time":"julio 2019","categ2":"Moderado","categ":"Nic2"},
    {"cantidad":13,"estado":"Fresa","time":"julio 2019","categ2":"Moderado","categ":"Canal2"},
    {"cantidad":16,"estado":"Verde","time":"julio 2019","categ2":"Moderado","categ":"Galaxia"},
    {"cantidad":16,"estado":"Fresa","time":"julio 2019","categ2":"Moderado","categ":"Nic3"},
    {"cantidad":15,"estado":"Naranja","time":"julio 2019","categ2":"Moderado","categ":"Canal2"},
    {"cantidad":31,"estado":"Fresa","time":"julio 2019","categ2":"Moderado","categ":"La Castellana"},
    {"cantidad":24,"estado":"Naranja","time":"julio 2019","categ2":"Moderado","categ":"Nic3"},
    {"cantidad":14,"estado":"Fresa","time":"julio 2019","categ2":"Moderado","categ":"parmalat"},
    {"cantidad":22,"estado":"Fresa","time":"julio 2019","categ2":"Moderado","categ":"Canal3"},
    {"cantidad":34,"estado":"Naranja","time":"julio 2019","categ2":"Moderado","categ":"La Castellana"},
    {"cantidad":13,"estado":"Naranja","time":"julio 2019","categ2":"Moderado","categ":"parmalat"},
    {"cantidad":23,"estado":"Naranja","time":"julio 2019","categ2":"Moderado","categ":"Canal3"},
    {"cantidad":2,"estado":"Verde","time":"julio 2019","categ2":"Moderado","categ":"La Castellana"},
    {"cantidad":2,"estado":"Fresa","time":"julio 2019","categ2":"Moderado","categ":"Psicovitalem"},
    {"cantidad":18,"estado":"Fresa","time":"julio 2019","categ2":"Moderado","categ":"Ekisde"},
    {"cantidad":1,"estado":"Fresa","time":"julio 2019","categ2":"Moderado","categ":"Nic"},
    {"cantidad":1,"estado":"Naranja","time":"noviembre 2019","categ2":"Moderado","categ":"Canal3"},
    {"cantidad":22,"estado":"Fresa","time":"enero 2020","categ2":"Moderado","categ":"Canal3"},
    {"cantidad":34,"estado":"Naranja","time":"enero 2020","categ2":"Moderado","categ":"La Castellana"},
    {"cantidad":14,"estado":"Fresa","time":"enero 2020","categ2":"Moderado","categ":"parmalat"},
    {"cantidad":23,"estado":"Naranja","time":"enero 2020","categ2":"Moderado","categ":"Canal3"},
    {"cantidad":2,"estado":"Verde","time":"enero 2020","categ2":"Moderado","categ":"La Castellana"},
    {"cantidad":13,"estado":"Naranja","time":"enero 2020","categ2":"Moderado","categ":"parmalat"},
    {"cantidad":2,"estado":"Fresa","time":"enero 2020","categ2":"Moderado","categ":"Psicovitalem"},
    {"cantidad":18,"estado":"Fresa","time":"enero 2020","categ2":"Moderado","categ":"Ekisde"},
    {"cantidad":1,"estado":"Fresa","time":"enero 2020","categ2":"Moderado","categ":"Nic"},
    {"cantidad":21,"estado":"Naranja","time":"enero 2020","categ2":"Moderado","categ":"Ekisde"},
    {"cantidad":2,"estado":"Naranja","time":"enero 2020","categ2":"Moderado","categ":"Nic"},
    {"cantidad":14,"estado":"Fresa","time":"enero 2020","categ2":"Moderado","categ":"Galaxia"},
    {"cantidad":17,"estado":"Fresa","time":"enero 2020","categ2":"Moderado","categ":"Nic2"},
    {"cantidad":36,"estado":"Naranja","time":"enero 2020","categ2":"Moderado","categ":"Galaxia"},
    {"cantidad":19,"estado":"Naranja","time":"enero 2020","categ2":"Moderado","categ":"Nic2"},
    {"cantidad":13,"estado":"Fresa","time":"enero 2020","categ2":"Moderado","categ":"Canal2"},
    {"cantidad":16,"estado":"Verde","time":"enero 2020","categ2":"Moderado","categ":"Galaxia"},
    {"cantidad":16,"estado":"Fresa","time":"enero 2020","categ2":"Moderado","categ":"Nic3"},
    {"cantidad":15,"estado":"Naranja","time":"enero 2020","categ2":"Moderado","categ":"Canal2"},
    {"cantidad":31,"estado":"Fresa","time":"enero 2020","categ2":"Moderado","categ":"La Castellana"},
    {"cantidad":24,"estado":"Naranja","time":"enero 2020","categ2":"Moderado","categ":"Nic3"},
    {"cantidad":40,"estado":"Naranja","time":"julio 2019","categ2":"Severo","categ":"Galaxia"},
    {"cantidad":25,"estado":"Fresa","time":"julio 2019","categ2":"Severo","categ":"Nic3"},
    {"cantidad":15,"estado":"Verde","time":"julio 2019","categ2":"Severo","categ":"Galaxia"},
    {"cantidad":16,"estado":"Naranja","time":"julio 2019","categ2":"Severo","categ":"Nic3"},
    {"cantidad":15,"estado":"Fresa","time":"julio 2019","categ2":"Severo","categ":"Canal2"},
    {"cantidad":8,"estado":"Naranja","time":"julio 2019","categ2":"Severo","categ":"Canal2"},
    {"cantidad":34,"estado":"Fresa","time":"julio 2019","categ2":"Severo","categ":"La Castellana"},
    {"cantidad":21,"estado":"Fresa","time":"julio 2019","categ2":"Severo","categ":"parmalat"},
    {"cantidad":21,"estado":"Fresa","time":"julio 2019","categ2":"Severo","categ":"Canal3"},
    {"cantidad":45,"estado":"Naranja","time":"julio 2019","categ2":"Severo","categ":"La Castellana"},
    {"cantidad":26,"estado":"Naranja","time":"julio 2019","categ2":"Severo","categ":"parmalat"},
    {"cantidad":18,"estado":"Naranja","time":"julio 2019","categ2":"Severo","categ":"Canal3"},
    {"cantidad":6,"estado":"Verde","time":"julio 2019","categ2":"Severo","categ":"La Castellana"},
    {"cantidad":12,"estado":"Fresa","time":"julio 2019","categ2":"Severo","categ":"Ekisde"},
    {"cantidad":1,"estado":"Fresa","time":"julio 2019","categ2":"Severo","categ":"Nic"},
    {"cantidad":22,"estado":"Naranja","time":"julio 2019","categ2":"Severo","categ":"Ekisde"},
    {"cantidad":25,"estado":"Fresa","time":"julio 2019","categ2":"Severo","categ":"Nic2"},
    {"cantidad":18,"estado":"Fresa","time":"julio 2019","categ2":"Severo","categ":"Galaxia"},
    {"cantidad":19,"estado":"Naranja","time":"julio 2019","categ2":"Severo","categ":"Nic2"},
    {"cantidad":21,"estado":"Fresa","time":"enero 2020","categ2":"Severo","categ":"Canal3"},
    {"cantidad":45,"estado":"Naranja","time":"enero 2020","categ2":"Severo","categ":"La Castellana"},
    {"cantidad":26,"estado":"Naranja","time":"enero 2020","categ2":"Severo","categ":"parmalat"},
    {"cantidad":18,"estado":"Naranja","time":"enero 2020","categ2":"Severo","categ":"Canal3"},
    {"cantidad":6,"estado":"Verde","time":"enero 2020","categ2":"Severo","categ":"La Castellana"},
    {"cantidad":12,"estado":"Fresa","time":"enero 2020","categ2":"Severo","categ":"Ekisde"},
    {"cantidad":1,"estado":"Fresa","time":"enero 2020","categ2":"Severo","categ":"Nic"},
    {"cantidad":22,"estado":"Naranja","time":"enero 2020","categ2":"Severo","categ":"Ekisde"},
    {"cantidad":25,"estado":"Fresa","time":"enero 2020","categ2":"Severo","categ":"Nic2"},
    {"cantidad":18,"estado":"Fresa","time":"enero 2020","categ2":"Severo","categ":"Galaxia"},
    {"cantidad":19,"estado":"Naranja","time":"enero 2020","categ2":"Severo","categ":"Nic2"},
    {"cantidad":40,"estado":"Naranja","time":"enero 2020","categ2":"Severo","categ":"Galaxia"},
    {"cantidad":25,"estado":"Fresa","time":"enero 2020","categ2":"Severo","categ":"Nic3"},
    {"cantidad":15,"estado":"Fresa","time":"enero 2020","categ2":"Severo","categ":"Canal2"},
    {"cantidad":15,"estado":"Verde","time":"enero 2020","categ2":"Severo","categ":"Galaxia"},
    {"cantidad":16,"estado":"Naranja","time":"enero 2020","categ2":"Severo","categ":"Nic3"},
    {"cantidad":8,"estado":"Naranja","time":"enero 2020","categ2":"Severo","categ":"Canal2"},
    {"cantidad":34,"estado":"Fresa","time":"enero 2020","categ2":"Severo","categ":"La Castellana"},
    {"cantidad":21,"estado":"Fresa","time":"enero 2020","categ2":"Severo","categ":"parmalat"}]};



var backgroud = ["#ff6699", "#ffbb99", "#adebad"];
var estadoColores = [
    { id_: "Fresa", Descripcion: "Severa" },
    { id_: "Naranja", Descripcion: "Moderada" },
    { id_: "Verde", Descripcion: "Sin sintomas" }
  ];
var CharConfig = {
    //configuracion del grafico
    ContainerName: "MyChart",
    Title: "MyChart",
    GroupLabelsData: estadoColores,
    GroupDataset: result.Labels,
    Datasets: result.datos,
    Colors: backgroud,
    SecondGroupDataset: null,
    ThreeGroupDataset: null,
    GroupDataTotals: result.totales,
    ContainerSize: 400,
    ColumnLabelDisplay: 0,
    AttNameEval: "estado",
    AttNameG1: "time",
    AttNameG2: "categ2",
    AttNameG3: "categ",
    EvalValue: "cantidad"
  };

