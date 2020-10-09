//import {DomComponent}  from "../../MasterDomClass.js";
class MyLogin{    
    constructor(props, Navegando){
        this.type = "div";
        this.props = props;  
        this.MyLoginData ={
            user: null,
            pass: null
        }   
        this.Navegando = Navegando;
    } 
    children= [
        { type: 'h1', props: {id:"", class: ""} ,
            children: ["My Login"]
        },
        {
            type: "divControl", children:[
                { type: 'label', props: {id:"", class: ""} , children: ["Usuario"] },
                { type: 'input', props: {id:"txtUsua", class: "", placeholder: "usuario", type: "text",onchange: ()=>{
                            const control = document.querySelector("#txtUsua");
                            this.MyLoginData.Username = control.value;
                        }
                    } 
                }
            ]
        }, 
        {type: "divControl", children:[
                { type: 'label', props: {id:"", class: ""} , children: ["Contraseña"]},
                { 
                    type: 'input', props: {id:"txtpass", class: "", placeholder: "password", type: "password", onchange: ()=>{
                            const control = document.querySelector("#txtpass");
                            this.MyLoginData.Password = control.value;
                        }
                    }
                }                
            ]
        },
        {type: "divControl", children:[
            { type: 'input', props: { class: "BtnPrimary", 
                placeholder: "password", type: "button", value: "Ok", onclick: async ()=>{                         
                        let response = await PostRequest(Url_Path + 'api/User/PostLogin', this.MyLoginData); 
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
//export {MyLogin}

