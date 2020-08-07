class MyLogin{    
    constructor(props){
        this.props = props;  
    }      
    children= [
        { type: 'h1', props: {id:"", class: ""} ,
            children: ["My Login"]
        },
        { type: 'h4', props: {id:"", class: ""} ,
            children: ["Usuario"]
        },
        { type: 'h4', props: {id:"", class: ""} ,
            children: ["Contraseña"]
        },       
    ]
}
export {MyLogin}

