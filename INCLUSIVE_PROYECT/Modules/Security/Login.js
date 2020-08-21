class MyLogin{    
    constructor(props, Navegando){
        this.type = "div";
        this.props = props;  
        this.MyLoginData ={
            user: null,
            pass: null
        }   
    } 
    children= [
        { type: 'h1', props: {id:"", class: ""} ,
            children: ["My Login"]
        },
        { type: 'label', props: {id:"", class: ""} ,
            children: ["Usuario"]
        },
        { type: 'input', props: {id:"txtUsua", class: "", placeholder: "usuario", type: "text",onchange: ()=>{
                    const control = document.querySelector("#txtUsua");
                    this.MyLoginData.user = control.value;
                }
            } 
        },
        { type: 'label', props: {id:"", class: ""} ,
            children: ["Contraseña"]
        },
        { 
            type: 'input', props: {id:"txtpass", class: "", placeholder: "password", type: "password", onchange: ()=>{
                    const control = document.querySelector("#txtpass");
                    this.MyLoginData.pass = control.value;
                }
            }
        },
        { 
            type: 'input', props: { class: "BtnPrimary", 
                placeholder: "password", type: "button", value: "Ok", onclick: async ()=>{                   
                     /*
                     const response = await fetch("/", {
                         method: "POST",
                         body: JSON.stringify(login)
                     });*/
                    //console.log(this.MyLoginData);
                    const response = "true"
                    if(response == "true"){
                        localStorage.setItem("user", this.MyLoginData.user);
                        localStorage.setItem("pass", this.MyLoginData.pass);
                        Navegando();
                    }
                    else{                       
                        console.log("error...");
                    }  
                }
            }
        }    
    ]
}
export {MyLogin}

