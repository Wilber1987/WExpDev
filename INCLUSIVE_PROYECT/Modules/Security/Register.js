class MyRegister{    
    constructor(props){
        this.type = "div";
        this.props = props;  
    }      
    children= [
        { type: 'h1', props: {id:"", class: ""} ,
            children: ["My Register"]
        },
        { type: 'h4', props: {id:"", class: ""} ,
            children: ["Usuario"]
        },
        { type: 'h4', props: {id:"", class: ""} ,
            children: ["Contraseña"]
        },  
        { type: 'h4', props: {id:"", class: ""} ,
            children: ["Contraseña"]
        },  
        { type: 'h4', props: {id:"", class: ""} ,
            children: ["Correo"]
        }
    ]
}
export {MyRegister}