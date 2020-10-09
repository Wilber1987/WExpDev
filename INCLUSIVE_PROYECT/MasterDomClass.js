//import { createElement } from "./Scripts/Modules/WComponents.js";
//import { Loading } from "./Modules/LoadingPage.js";
class DomComponent {
    constructor(){
        this.NavForm = [];    
        this.modules = [
            {   id: "Module1",             
                title: "Programacion Logaritmica 1",
                desc: "Prueba la nueva tecnología PowerShell multiplataforma https://aka.ms/pscore6",
                categ: "Programs"
            }, {    
                id: "Module2",             
                title: "Programacion Logaritmica 2",
                desc: "Prueba la nueva tecnología PowerShell multiplataforma https://aka.ms/pscore6",
                categ: "Programs"
            }
        ]     
    }
    type = "form";
    props = { class: "MyForm" };   
    NavigateFunction =  async (IdComponent, ComponentsInstance, ContainerName = "ContainerNavigate" )=>{ 
        console.log(this.NavForm);
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
            //const MyComponent = await import(Path);        
            //props.id = IdComponent;
            //props.class = "DivContainer";
            //const ComponentsInstance = new MyComponent[IdComponent](props);               
            ContainerNavigate.append(createElement(ComponentsInstance));
            return;
        }   
    } 
    ModalNavigateFunction =  async (IdComponent, ComponentsInstance, props = {}, ContainerName = "ContainerNavigate" )=>{ 
        const ContainerNavigate = document.querySelector("#"+ContainerName);        
        if (!ContainerNavigate.querySelector("#"+IdComponent)) {
            if (typeof this.NavForm[IdComponent] != "undefined") {
                ContainerNavigate.append(this.NavForm[IdComponent]); 
                setTimeout(
                    ()=>{  modalFunction( this.NavForm[IdComponent].id); }, 100
                );                           
                return;
            }   
            this.NavForm[IdComponent] = createElement(ComponentsInstance);         
            ContainerNavigate.append(this.NavForm[IdComponent]);
            setTimeout(
                ()=>{  modalFunction(this.NavForm[IdComponent].id); }, 100
            );
            return;
        } else {
            this.NavForm[IdComponent] = ContainerNavigate.querySelector("#"+IdComponent);
            modalFunction( this.NavForm[IdComponent].id);
            setTimeout(
                ()=>{  ContainerNavigate.removeChild(this.NavForm[IdComponent]); }, 1000
            );
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
        this.MainComponent = new Loading({id:"Load", class:"LoadingPage DivContainer"}, async ()=>{ 
            //TAKE MODULESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS           
            let MyModules = await PostRequest(Url_Path + 'api/module/PostMyModules', { IdUsers: 1 });         
            let OModules = await PostRequest(Url_Path + 'api/module/PostModules', { IdUsers: 1 }); 
            //console.log(MyModules);
           // console.log(OModules);
            this.NavigateFunction("Modules",new Modules({
                class: "DivContainer", id: "Modules", MyModules: MyModules,   modules: OModules
            }));           
        });
        this.header = new headerClass();       
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
        ]
    } 
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
                class: "btnMenu",
                onclick: ()=> {
                    this._DispalNav("MyLateralNav", "SlideLeft")
                }
            },
            children: ['']
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
            children: ['']
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
                    this.NavigateFunction("Modules",new Modules({class: "DivContainer", id: "Modules", modules: this.modules}));
                    //this.NavigateFunction("MyLogin", "./Modules/Security/Login.js");
                    this._DispalNav("MyLateralNav", "SlideLeft");
                }
            }, children: [{type:"a", props:{href:"#"}, children: ["Modulos"]}]},
            {type: "li", props:{
                onclick:  ()=>{
                    this.NavigateFunction("BarReport", new BarReport({class: "DivContainer", id: "BarReport"}));  
                    this._DispalNav("MyLateralNav", "SlideLeft");                   
                }
            }, children: [{type:"a", props:{href:"#"}, children: ["Bar Report"]}]},
            {type: "li", props:{
                onclick: ()=>{
                    this.NavigateFunction("RadialReport",new RadialReport({class: "DivContainer", id: "RadialReport"}));  
                    this._DispalNav("MyLateralNav", "SlideLeft");          
                }
            }, children: [{type:"a", props:{href:"#"}, children: ["Radial Report"]}]},
            {type: "li", props:{
                onclick: ()=>{
                    this.NavigateFunction("MultiSelectControls", new MultiSelectControls({class: "DivContainer", id: "MultiSelectControls"}));
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

//export {MasterDomClass, DomComponent};