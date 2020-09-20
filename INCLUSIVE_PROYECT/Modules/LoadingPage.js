//import {DomComponent}  from "../MasterDomClass.js";
class Loading{    
    constructor(props, Navegando){
        this.type = "div";
        this.props = props; 
        this.children= [
            { type: 'section', props: { class: ""} ,
               children: [ { type: "div", props: {
                   //src: "Media/img/Marca2.png", 
                   id: "IconSection", class: "IconSection"}} ]
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
        this.props.inst = new DomComponent();
        this.children = [            
            { type: 'button', props: { class: "BtnPrimary", type:"button", onclick:async ()=>{                   
                    const login ={
                        Username: localStorage.getItem("Username"),
                        Password: localStorage.getItem("Password")
                    }
                    let response = await PostRequest(Url_Path + 'api/User/PostLogin', login);                      
                    if(response == true){
                         Navegando();                         
                    }
                    else{   
                        document.getElementById("IconSection").style.width = "200px";
                        document.getElementById("IconSection").style.height = "120px";
                        localStorage.setItem("Username", "");
                        localStorage.setItem("Password", "");     
                        //console.log(Navegando);       
                        this.props.inst.NavigateFunction("MyLogin", new MyLogin({class: "DivContainer", id: "MyLogin"}, Navegando), "LoginForm");
                    }  
                }
            } ,children: ["Login"]},
            { type: 'button', props: { class: "BtnPrimary", type:"button", onclick:async ()=>{
                    document.getElementById("IconSection").style.width = "200px";
                    document.getElementById("IconSection").style.height = "120px";                    
                    this.props.inst.NavigateFunction("MyRegister", new MyRegister({class: "DivContainer", id: "MyRegister"},  Navegando) , "LoginForm");                                      
                }
            } ,children: ["Register"]},
        ] 
    }
}
//export {Loading}
