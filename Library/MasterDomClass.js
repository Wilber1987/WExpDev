import { createElement } from "./Scripts/Modules/WComponents.js";

class DomComponent {
    constructor(){        
    }
    type = "form";
    props = { class: "MyForm" };   
}
class MasterDomClass extends DomComponent{    
    constructor(props){     
        super();
        if (props) {
            this.props = props;  
        } 
    }   
    header = new headerClass();
    footer = new footerClass();
    children= [
        this.header,        
        { type: 'nav', props: {id:"NavContainer", class: "Menu"} ,
            children: [ new MyNavigator(
                {class: "MyNav", id: "MyLateralNav", style: "opacity: 0; pointer-events: none"}
            )]
        },
        { type: 'main', children: [
            { type: 'section', props: {id:"ContainerNavigate"}},
            { type: 'section', props: {id:"Container"}}
        ] },
        this.footer,
    ]
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
    children = [
        {type: 'button', 
        props: {
            id:"ViewMenu",
            type: "button",
            onclick: ()=> {
                this._DispalNav("ViewMenu","MyLateralNav", "SlideLeft")
            }
        },
        children: ['Nav']
        } 
    ];
    _DispalNav(BTNId, NavContainerId, NavAnimation){
        let CallBTN = document.querySelector("#"+BTNId);    
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
            }
        }else {
            NavContainer.style.pointerEvents = "none";
            NavContainer.style.opacity = 0;
            if (NavAnimation == "SlideLeft") {
                Nav.style.webkitTransform =  "translateX(-100%)";         
            }
        }                   
    }
}
class MyNavigator{   
    constructor(props){
        this.props = props;
    }
    type= "div";
    children = [{type: "ul",
        children: [            
            {type: "li", props:{onclick: ()=>{

                console.log("navegando");
                this.NavigateFunction("MyLogin", "./Modules/Security/Login.js");

            }}, children: [{type:"a", props:{href:"#"}, children: ["Menu 1"]}]},
            {type: "li", props:{onclick:  ()=>{

                console.log("navegando login");
                this.NavigateFunction("MyRegister", "./Modules/Security/Register.js");
                        
            }}, children: [{type:"a", props:{href:"#"}, children: ["Menu 1"]}]},
            {type: "li", props:{onclick: ()=>{
                console.log("navegando");
                
            }}, children: [{type:"a", props:{href:"#"}, children: ["Menu 1"]}]},
            {type: "li", props:{onclick: ()=>{
                console.log("navegando");

            }}, children: [{type:"a", props:{href:"#"}, children: ["Menu 1"]}]},
        ]    
    }];  
    NavigateFunction =  async (IdComponent, Path)=>{
        const MyComponent = await import(Path);
        const ComponentsInstance = new MyComponent[IdComponent]({id:IdComponent});
        const ContainerNavigate = document.querySelector("#ContainerNavigate");
        if (!ContainerNavigate.querySelector("#"+IdComponent)) {
            ContainerNavigate.append(createElement(ComponentsInstance));
        }      
    }    
}
export {MasterDomClass};