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
importarScript("Scripts/Modules/WChartRadial.js", Url_Path);
//estilos
importarStyle("Scripts/StyleModules/StyleModules.css", Url_Path);
importarStyle("Scripts/StyleModules/WchartStyle.css", Url_Path);

//APP CONFIG
importarScript("databaseScripts/Modules.js", Url_Path);
importarScript("MasterDomClass.js", Url_Path);
importarStyle("Styles/AppStyles.css", Url_Path);
//var modules = null;


function OnLoad() {
    prueba()
    var modules = new Modules(); 
    const BodyComponents = new MasterDomClass();
    root.appendChild(createElement(BodyComponents));   
    StarDOM();
    //Container.appendChild(createElement({type: 'colum-chart',  props : { data: CharConfig }})); 
    Container.appendChild(createElement({type: 'radial-chart',  props : { data: CharConfig }})); 
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
    {"cantidad":21,"estado":"Fresa","time":"enero 2020","categ2":"Severo","categ":"parmalat"}],
  };


  function prueba() {
     var  url = "https://cuidardelosmios.psicovitalem.com/prebeta/DataChats";
     var array  = [{"id_conversacion":"7DE76D99-1371-86EE-DE61-171F7186C3BD","dni":"03251116C","agente":"psicologo1","fecha":"2020-07-16 18:17:36","emisor_mensaje":"agente","mensaje":"¡Hola Nacho !, Soy tu psicólog@ en línea, ¿Cómo puedo ayudarte?","hora":"18:17:36"},
     {"id_conversacion":"7DE76D99-1371-86EE-DE61-171F7186C3BD","dni":"03251116C","agente":"psicologo1","fecha":"2020-07-16 18:18:06","emisor_mensaje":"usuario","mensaje":"Hola, esta es otra prueba del chat","hora":"18:18:06"},
     {"id_conversacion":"7DE76D99-1371-86EE-DE61-171F7186C3BD","dni":"03251116C","agente":"psicologo1","fecha":"2020-07-16 18:19:09","emisor_mensaje":"usuario","mensaje":"Se recibe?","hora":"18:19:09"},
     {"id_conversacion":"7DE76D99-1371-86EE-DE61-171F7186C3BD","dni":"03251116C","agente":"psicologo1","fecha":"2020-07-16 18:19:46","emisor_mensaje":"agente","mensaje":"buenas tardes","hora":"18:19:46"},
     {"id_conversacion":"7DE76D99-1371-86EE-DE61-171F7186C3BD","dni":"03251116C","agente":"psicologo1","fecha":"2020-07-16 18:19:49","emisor_mensaje":"agente","mensaje":"aki esta","hora":"18:19:49"},
     {"id_conversacion":"7DE76D99-1371-86EE-DE61-171F7186C3BD","dni":"03251116C","agente":"psicologo1","fecha":"2020-07-16 18:20:05","emisor_mensaje":"usuario","mensaje":"Perfecto","hora":"18:20:05"},
     {"id_conversacion":"7DE76D99-1371-86EE-DE61-171F7186C3BD","dni":"03251116C","agente":"psicologo1","fecha":"2020-07-16 18:20:13","emisor_mensaje":"agente","mensaje":"voy a cerrar","hora":"18:20:13"},
     {"id_conversacion":"7DE76D99-1371-86EE-DE61-171F7186C3BD","dni":"03251116C","agente":"psicologo1","fecha":"2020-07-16 18:20:17","emisor_mensaje":"usuario","mensaje":"oK","hora":"18:20:17"},
     {"id_conversacion":"7DE76D99-1371-86EE-DE61-171F7186C3BD","dni":"03251116C","agente":"psicologo1","fecha":"2020-07-16 18:20:17","emisor_mensaje":"agente","mensaje":"el chat","hora":"18:20:17"}];
        //var url  = "{{URL::action('ApiCallcenterController@DataChats')}}";            
            data ={
                array :array,
                token : 'fa2dfd20-340f-11ea-81e3-833b317c03bf'
            }  



    //var url =  url = Config.Options.EditOptions.ApiUrlUpdate;
    var xhr = new XMLHttpRequest(); xhr.open("POST", url, true); 
    //xhr.setRequestHeader("Content-Type",  'multipart/form-data');//application/json
    //xhr.setRequestHeader("Content-Type",  'application/json');//application/json
    //xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.onreadystatechange = function(data) { 
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) 
        {        
            var dataJson = JSON.parse(data.target.response); 
            console.log(dataJson)
            //DrawTable(ArrayList, Config, TableId);
        } 
    } 
    xhr.send(JSON.stringify(data));
            
  

    // let xhr
    // if (window.XMLHttpRequest) xhr = new XMLHttpRequest()
    // else xhr = new ActiveXObject("Microsoft.XMLHTTP")   
    
    // xhr.open('POST', url)
    // //xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    // xhr.addEventListener('load', (data) => {
    //    // const dataJSON = JSON.parse(data.target.response); 
    //     console.log("exito");              
    // })
    // xhr.send() 



}



var backgroud = ["#ff6699", "#ffbb99", "#adebad"];
var estadoColores = [
    { id_: "Fresa", Descripcion: "Severa" },
    { id_: "Naranja", Descripcion: "Moderada" },
    { id_: "Verde", Descripcion: "Sin sintomas" }
  ];
var CharConfig = {
    ContainerName: "MyChart",
    Title: "MyChart",
    GroupLabelsData: estadoColores,
    GroupDataset: result.Labels,
    Datasets: result.datos,
    Colors: backgroud,
    ContainerSize: 400,
    ColumnLabelDisplay: 0,
    AttNameEval: "estado",
    AttNameG1: "time",
    AttNameG2: "categ2",
    AttNameG3: "categ",
    EvalValue: "cantidad"
  };

