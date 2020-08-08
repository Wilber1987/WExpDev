class MyLogin{    
    constructor(props){
        this.type = "div";
        this.props = props;     
    } 
    children= [
        { type: 'h1', props: {id:"", class: ""} ,
            children: ["My Login"]
        },
        { type: 'h4', props: {id:"", class: ""} ,
            children: ["Usuario"]
        },
        { type: 'input', props: {id:"txtUsua", class: "", placeholder: "usuario", type: "text"} ,
            children: []
        },
        { type: 'h4', props: {id:"", class: ""} ,
            children: ["Contraseña"]
        },
        { type: 'input', props: {id:"txtpass", class: "", placeholder: "password", type: "text"} ,
            children: []
        }     
    ]
}
export {MyLogin}

