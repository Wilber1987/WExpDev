import {DomComponent}  from "../../MasterDomClass.js";
class MyRegister{    
    constructor(props, Navegando){
        this.type = "div";
        this.props = props;
        this.MyLoginData = {
            user: null,
            pass: null,
            pass2: null,
            mail: null
        };
    }      
    children= [
        { type: 'h1', props: {id:"", class: ""} ,
            children: ["My Login"]
        },
        {type: "divControl", children:[
                { type: 'label', props: {id:"", class: ""} , children: ["Usuario"] },
                { type: 'input', props: {id:"txtUsua", class: "", placeholder: "usuario", type: "text",onchange: ()=>{
                            const control = document.querySelector("#txtUsua");
                            this.MyLoginData.user = control.value;
                        }
                    } 
                }
            ]
        }, 
        {type: "divControl", children:[
                { type: 'label', props: {id:"", class: ""} , children: ["Contraseña"]},
                { 
                    type: 'input', props: {id:"txtpass1", class: "", placeholder: "password", type: "password", onchange: ()=>{
                            const control = document.querySelector("#txtpass1");
                            this.MyLoginData.pass = control.value;
                        }
                    }
                }                
            ]
        },
        {type: "divControl", children:[
            { type: 'label', props: {id:"", class: ""} , children: ["Confirmar Contraseña"]},
                { 
                    type: 'input', props: {id:"txtpass", class: "", placeholder: "password", type: "password", onchange: ()=>{
                            const control = document.querySelector("#txtpass2");
                            this.MyLoginData.pass2 = control.value;
                        }
                    }
                }                
            ]
        },
        {type: "divControl", children:[
            { type: 'label', props: {id:"", class: ""} , children: ["Correo"]},
                { 
                    type: 'input', props: {id:"txtMail", class: "", placeholder: "Example: mail@mail.com", type: "password", 
                        onchange: ()=>{
                            const control = document.querySelector("#txtMail");
                            this.MyLoginData.Mail = control.value;
                        }
                    }
                }                
            ]
        },
        {type: "divControl", children:[
            { type: 'input', props: { class: "BtnPrimary", 
                placeholder: "password", type: "button", value: "Ok", onclick: async ()=>{                   
                        /*
                        const response = await fetch("/", {
                            method: "POST",
                            body: JSON.stringify(login)
                        });*/
                        const response = "true"
                        if(response == "true"){
                            //localStorage.setItem("user", this.MyLoginData.user);
                            //localStorage.setItem("pass", this.MyLoginData.pass);
                            //Navegando();
                            const inst = new DomComponent();
                            inst.NavigateFunction("Modules", "./Modules/Modules.js");
                           // inst.NavigateFunction("MyLogin", "./Modules/Security/Login.js", {class: "LoginForm"} , "LoginForm");
                        }
                        else{                       
                            console.log("error...");
                        }  
                    }
                }
            }   
        ]}
    ]
}
export {MyRegister}