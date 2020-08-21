import { createElement } from "./Scripts/Modules/WComponents.js";
import { Loading } from "./Modules/LoadingPage.js";
class DomComponent {
    constructor(){
        this.NavForm = [];    
        this.modules = [
            { 
                cantidad: 21,
                estado: "Naranja",
                time: "julio 2019",
                categ2: "Moderado",
                categ: "Ekisde"
            },{
                cantidad: 2,
                estado: "Naranja",
                time: "julio 2019",
                categ2: "Moderado",
                categ: "Nic"
            },{
                cantidad: 14,
                estado: "Fresa",
                time: "julio 2019",
                categ2: "Moderado",
                categ: "Galaxia"
            },{
                cantidad: 17,
                estado: "Fresa",
                time: "julio 2019",
                categ2: "Moderado",
                categ: "Nic2"
            }
        ]     
    }
    type = "form";
    props = { class: "MyForm" };   
    NavigateFunction =  async (IdComponent, Path, props = {}, ContainerName = "ContainerNavigate" )=>{ 
        const ContainerNavigate = document.querySelector("#"+ContainerName);
        let Nodes = ContainerNavigate.querySelectorAll(".DivContainer");        
        Nodes.forEach((node) => {
            if (node.id != IdComponent) {                                  
                this.NavForm[node.id] = node;
                if (ContainerNavigate.querySelector("#"+node.id)) {
                    ContainerNavigate.removeChild(node);
                }  
            }  
        });
        if (!ContainerNavigate.querySelector("#"+IdComponent)) {
            //console.log(this.NavForm);
            if (typeof this.NavForm[IdComponent] != "undefined") {
                ContainerNavigate.append(this.NavForm[IdComponent]);                            
                return;
            }
            const MyComponent = await import(Path);        
            props.id = IdComponent;
            props.class = "DivContainer";
            const ComponentsInstance = new MyComponent[IdComponent](props);               
            ContainerNavigate.append(createElement(ComponentsInstance));
            return;
        }   
    } 
    _DispalNav(NavContainerId, NavAnimation){          
        let NavContainer = document.querySelector("#"+NavContainerId);
        let Nav = NavContainer.querySelector("ul"); 
        NavContainer.style.transition = "all 1s";
        Nav.style.transition = "all 1s";
        Nav.style.webkitTransform =  "translateX(-100%)"; 
        if (NavContainer.style.opacity == 0) {
            NavContainer.style.pointerEvents = "all";
            NavContainer.style.opacity = 1;
            if (NavAnimation == "SlideLeft") {                   
                Nav.style.webkitTransform =  "translateX(0%)";         
            }if (NavAnimation == "SlideRight") {                   
                Nav.style.webkitTransform =  "translateX(0%)";         
            }
        }else {
            NavContainer.style.pointerEvents = "none";
            NavContainer.style.opacity = 0;
            if (NavAnimation == "SlideLeft") {
                Nav.style.webkitTransform =  "translateX(-100%)";         
            }if (NavAnimation == "SlideRight") {                   
                Nav.style.webkitTransform =  "translateX(+100%)";         
            }
        }                   
    }  
    AjaxRequest =  async  (url = null, data = {}) =>{
        if (url == null) {
            return [];
        }        
        let response = await fetch(url, data);
        response = await response.json();
        return response;
    }    
}
class MasterDomClass extends DomComponent{    
    constructor(){     
        super();         
        this.MainComponent = new Loading({id:"Load", class:"LoadingPage DivContainer"}, ()=>{
            this.NavigateFunction("Modules", "./Modules/Modules.js", {modules: this.modules});
        });
        this.header = new headerClass();
        this.footer = new footerClass();
        this.children= [
            this.header,        
            { type: 'nav', props: {id:"NavContainer", class: "Menu"} ,
                children: [ new MyNavigator(
                    {class: "MyNav", id: "MyLateralNav", style: "opacity: 0; pointer-events: none"}                
                )]
            },
            { type: 'main', children: [
                { type: 'section', props: {id:"ContainerNavigate"},
                    children: [this.MainComponent]
                },
                { type: 'section', props: {id:"Container"}}
            ] },
            this.footer,
        ]
    } 
}
class footerClass extends DomComponent {
    constructor(props){     
        super();
        if (props) {
            this.props = props;  
        } else {
            this.type = "footer";
            this.props.class = "myFooter";
        }            
    }  
    children = [
        {type: 'label', children:["Contactenos"]},
        {type: 'label', children:["- 8807-8386"]}
    ];
}
class headerClass extends DomComponent {
    constructor(){     
        super();
        this.type = "header";
        this.props.class = "";                 
    }  
    SecurityNavigator = new SecurityNavigator(
        {class: "LoginNav", 
        id: "LoginNav", 
        style: "opacity: 0; pointer-events: none;"}
    );
    children = [
        {
            type: 'button', 
            props: {
                id:"ViewMenu",
                type: "button",
                onclick: ()=> {
                    this._DispalNav("MyLateralNav", "SlideLeft")
                }
            },
            children: ['Nav']
        },{
            type: 'button', 
            props: {
                id:"LoginBtn",
                class:"LoginBtn",
                type: "button",
                onclick: ()=> {
                    this._DispalNav("LoginNav", "SlideRight")
                }
            },
            children: ['Login']
        },
        this.SecurityNavigator
    ];
   
}
class MyNavigator extends DomComponent{   
    constructor(props){
        super();
        this.props = props;         
    }
    type= "div";
    children = [{type: "ul",
        children: [            
            {type: "li", props:{
                onclick: ()=>{
                    this.NavigateFunction("Modules", "./Modules/Modules.js", {modules: this.modules});
                    //this.NavigateFunction("MyLogin", "./Modules/Security/Login.js");
                    this._DispalNav("MyLateralNav", "SlideLeft");
                }
            }, children: [{type:"a", props:{href:"#"}, children: ["Modulos"]}]},
            {type: "li", props:{
                onclick:  ()=>{
                    this.NavigateFunction("BarReport", "./Modules/BarReport.js");  
                    this._DispalNav("MyLateralNav", "SlideLeft");                   
                }
            }, children: [{type:"a", props:{href:"#"}, children: ["Bar Report"]}]},
            {type: "li", props:{
                onclick: ()=>{
                    this.NavigateFunction("RadialReport", "./Modules/RadialReport.js");  
                    this._DispalNav("MyLateralNav", "SlideLeft");          
                }
            }, children: [{type:"a", props:{href:"#"}, children: ["Radial Report"]}]},
            {type: "li", props:{
                onclick: ()=>{
                    this.NavigateFunction("MultiSelectControls", "./Modules/MultiSelectControls.js");
                    this._DispalNav("MyLateralNav", "SlideLeft");
                }
            }, children: [{type:"a", props:{href:"#"}, children: ["MultiSelect"]}]},
        ]    
    }];      
}
class SecurityNavigator extends DomComponent{   
    constructor(props){
        super();
        this.props = props;
    }
    type= "div";
    children = [{type: "ul",
        children: [            
            {type: "li", props:{
                onclick: ()=>{
                    //this.NavigateFunction("MyLogin", "./Modules/Security/Login.js");
                    this._DispalNav("LoginNav", "SlideRight")
                }
            }, children: ["Login"]},
            {type: "li", props:{
                onclick:  ()=>{
                    //this.NavigateFunction("MyRegister", "./Modules/Security/Register.js");  
                    this._DispalNav("LoginNav", "SlideRight")           
                }
            }, children: ["Register"]},
            {type: "li", props:{
                onclick: ()=>{
                    console.log("navegando");   
                    this._DispalNav("LoginNav", "SlideRight")             
                }
            }, children:["Perfil"]},
            {type: "li", props:{
                onclick: ()=>{
                    console.log("navegando");
                    this._DispalNav("LoginNav", "SlideRight")
                }
            }, children: ["Logout"]},
        ]    
    }];      
}

export {MasterDomClass, DomComponent};