function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}
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
    /*if (document.getElementById("URLPath")) {
        pathName = document.getElementById("URLPath").value;
    }*/
    return pathName;
}
function awaitFunction() { 
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(0);
      }, 0);
    });
}
var Url_Path = "http://localhost:6601/"; //getAbsolutePath();

/*
importarStyle("Scripts/StyleModules/StyleModules.css", Url_Path);
importarStyle("Scripts/StyleModules/WchartStyle.css", Url_Path);
importarStyle("Scripts/StyleModules/MultiSelectStyle.css", Url_Path);
importarScript("Scripts/modules/WChartJSComponent.js", Url_Path);
importarScript("Scripts/modules/WChartRadial.js", Url_Path);

// //APP CONFIG
 //importarScript("databaseScripts/Modules.js", Url_Path);
 importarScript("MasterDomClass.js", Url_Path);
 importarScript("Scripts/modules/WComponents.js", Url_Path);
 importarScript("Modules/Modules.js", Url_Path);
 importarScript("Modules/ModulesView.js", Url_Path);
 importarScript("Modules/LoadingPage.js", Url_Path);
 importarScript("Modules/MultiSelectControls.js", Url_Path);
 importarScript("Modules/RadialReport.js", Url_Path);
 importarScript("Modules/BarReport.js", Url_Path);
 importarScript("Modules/Security/Login.js", Url_Path);
 importarScript("Modules/Security/Register.js", Url_Path);
 */
 //PLUGING

 //importarScript("MasterDomClass.js", Url_Path);
 //importarStyle("Styles/AppStyles.css", Url_Path);
 //importarStyle("Styles/MyStyle.css", Url_Path);
var modules = null;
const Load = async () => {
    let response = await fetch(Url_Path + 'api/movie/GetMyMovies', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    response = await response.json();
    console.log(response)   
}
function find() {
    fetch(Url_Path + 'api/module/GetModules', {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: "Some text here" })
    });
}
function find2() {
    let response =  fetch(Url_Path + 'api/module/PostMyModules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ User: 1 })
    });
   // response =  response.json();
}
function find3() {
    fetch(Url_Path +'api/products/PostTakeProducts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ obj: "Some text here" })
    });
}

const OnLoad =  async () => {     
    const BodyComponents = new MasterDomClass();
    BodyRoot.appendChild(createElement(BodyComponents));
}
//document.addEventListener('deviceready', onDeviceReady, false);
document.addEventListener('deviceready', OnLoad, false);
window.addEventListener('load', OnLoad, false);