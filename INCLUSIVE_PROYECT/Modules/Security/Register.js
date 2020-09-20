//import {DomComponent}  from "../../MasterDomClass.js";
class MyRegister{    
    constructor(props, Navegando){
        this.type = "div";
        this.props = props;
        this.MyLoginData = {
            Name: null,
            Username: null,
            Password: null,
            Password2: null,
            Mail: null
        };
        this.Navegando = Navegando;
    }      
    children= [
        { type: 'h1', props: {id:"", class: ""} ,
            children: ["My Login"]
        },
        {type: "divControl", children:[
                { type: 'label', props: {id:"", class: ""} , children: ["Usuario"] },
                { type: 'input', props: {id:"txtName", class: "", placeholder: "usuario", type: "text",
                    onchange: ()=>{
                            const control = document.querySelector("#txtName");
                            this.MyLoginData.Name = control.value;
                        }
                    } 
                }
            ]
        }, 
        {type: "divControl", children:[
            { type: 'label', props: {id:"", class: ""} , children: ["Username"] },
            { type: 'input', props: {id:"txtUsername", class: "", placeholder: "usuario", type: "text",
                    onchange: ()=>{
                            const control = document.querySelector("#txtUsername");
                            this.MyLoginData.Username = control.value;
                        }
                    } 
                }
            ]
        }, 
        {type: "divControl", children:[
                { type: 'label', props: {id:"", class: ""} , children: ["Contraseña"]},
                { 
                    type: 'input', props: {id:"txtpass1", class: "", placeholder: "password", type: "password", 
                        onchange: ()=>{
                            const control = document.querySelector("#txtpass1");
                            this.MyLoginData.Password = control.value;
                        }
                    }
                }                
            ]
        },
        {type: "divControl", children:[
            { type: 'label', props: {id:"", class: ""} , children: ["Confirmar Contraseña"]},
                { 
                    type: 'input', props: {id:"txtpass2", class: "", placeholder: "password", type: "password", 
                        onchange: ()=>{
                            const control = document.querySelector("#txtpass2");
                            this.MyLoginData.Password2 = control.value;
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
             type: "button", value: "Ok", 
                    onclick: async ()=>{  
                        if (this.MyLoginData.Password != this.MyLoginData.Password2) {
                            const control = document.querySelector("#txtpass1");
                            control.style.border = "red solid 2px";
                            const control2 = document.querySelector("#txtpass2");
                            control2.style.border = "red solid 2px";
                            return;
                        }                 
                        let response = await PostRequest(Url_Path + 'api/User/PostRegister', this.MyLoginData); 
                        if(response == true){
                            localStorage.setItem("Username", this.MyLoginData.Username);
                            localStorage.setItem("Password", this.MyLoginData.Password);                           
                            this.Navegando();
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
//export {MyRegister}