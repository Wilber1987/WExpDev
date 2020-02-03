function importarScript(nombre, callback) {
    var s = document.createElement("script");
    s.src = nombre;
    document.querySelector("head").appendChild(s);
}
window.onload = OnLoad;
importarScript("scripts/modules/WComponents.js");


function OnLoad() { 
    //functions
}