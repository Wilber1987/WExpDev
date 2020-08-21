import {DomComponent}  from "../MasterDomClass.js";
class Loading{    
    constructor(props, Navegando){
        this.type = "div";
        this.props = props; 
        this.children= [
            { type: 'section', props: { class: ""} ,
               children: [ { type: "img", props: {src: "./Media/img/Marca2.png"}} ]
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
                         inst.NavigateFunction("MyLogin", "./Modules/Security/Login.js", {class: "form"} , "LoginForm");
                    }  
                }
            } 
            ,children: ["Login"]},
            { type: 'button', props: { class: "BtnPrimary", type:"button", onclick:async ()=>{
                    const inst = new DomComponent();
                    inst.NavigateFunction("MyRegister", "./Modules/Security/Register.js", {class: "form"} , "LoginForm");                                      
                }
            } 
            ,children: ["Register"]},
        ] 
    }

}
export {Loading}
