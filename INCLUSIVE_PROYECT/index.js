import MasterDom from "./Scripts/MasterScripts.js";

//console.log(MasterDomClass);
window.onload = OnLoad;
function OnLoad() {        
    const BodyComponents = new MasterDom.MasterDomClass();
    root.appendChild(createElement(BodyComponents)); 
}

function get() {
     let xhr
     if (window.XMLHttpRequest) xhr = new XMLHttpRequest()
     else xhr = new ActiveXObject("Microsoft.XMLHTTP")   
     xhr.open('GET', ApiUrlSelect)
     xhr.addEventListener('load', (data) => {
         const dataJSON = JSON.parse(data.target.response); 
         console.log(dataJSON.Modules);
         DrawTable(dataJSON.Modules, Config)
         Container.appendChild(Table);       
     })
     xhr.send() 
}
