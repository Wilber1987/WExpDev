import {DomComponent}  from "../MasterDomClass.js";
class Loading{    
    constructor(props, Navegando){
        this.type = "div";
        this.props = props; 
        this.children= [
            { type: 'section', props: { class: ""} ,
               children: [ { type: "img", props: {src: "./Media/img/Marca2.png", id: "IconSection"}} ]
            },
            { type: 'h1', props: { class: ""} , children: ["InclusiveApp"] },
            new LoginOptions({id: "LoginOptions"}, Navegando),
            { type: 'div', props: {id:"LoginForm", class: "LoginForm"}},
            //animacion de fondo
            {type :"ul",  props:{ class: "cuadrados" }, children :[ 
                {type: "li"},  {type: "li"},  {type: "li"},  {type: "li"},  {type: "li"},  {type: "li"},  {type: "li"},
                {type: "li"},  {type: "li"},  {type: "li"},  {type: "li"},  {type: "li"},  {type: "li"},  {type: "li"}
            ]}                 
        ]                
    }         
}
class LoginOptions{
    constructor(props, Navegando){
        this.type = "div";
        this.props = props;
        this.children = [            
            { type: 'button', props: { class: "BtnPrimary", type:"button", onclick:()=>{
                    document.getElementById("IconSection").style.width = "200px";
                    const login ={
                        user: localStorage.getItem("user"),
                        pass: localStorage.getItem("pass")
                    }
                     /*
                     const response = await fetch("/", {
                         method: "POST",
                         body: JSON.stringify(login)
                     });*/
                    const response = "false"
                    if(response == "true"){
                         Navegando();                         
                    }
                    else{
                         const inst = new DomComponent();
                         inst.NavigateFunction("MyLogin", "./Modules/Security/Login.js", {class: "LoginForm"} , "LoginForm");
                    }  
                }
            } ,children: ["Login"]},
            { type: 'button', props: { class: "BtnPrimary", type:"button", onclick:async ()=>{
                    document.getElementById("IconSection").style.width = "200px";
                    const inst = new DomComponent();
                    inst.NavigateFunction("MyRegister", "./Modules/Security/Register.js", {class: "LoginForm"} , "LoginForm");                                      
                }
            } ,children: ["Register"]},
        ] 
    }

}
export {Loading}
