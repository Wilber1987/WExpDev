class DomComponent {
    constructor(){        
    }
    type = "form";
    props = { class: "MyForm" };   
}

class MasterDomClass extends DomComponent{    
    constructor(props){     
        super();
        if (props) {
            this.props = props;  
        } 
    }   
    header = new headerClass();
    footer = new footerClass();
    children= [
        this.header,        
        { type: 'nav', props: {id:"NavContainer", class: "Menu"} },
        { type: 'main', children: [{ type: 'section', props: {id:"Container"}}] },
        this.footer,
    ]
}

class footerClass extends DomComponent {
    constructor(props){     
        super();
        if (props) {
            this.props = props;  
        } else {
            this.type = "footer";
            this.props.class = "myFooter";
        }            
    }  
    children = [
        {type: 'label', children:["Contactenos"]},
        {type: 'label', children:["- 8807-8386"]}
    ];
}

class headerClass extends DomComponent {
    constructor(){     
        super();
        this.type = "header";
        this.props.class = "";                 
    }  
    children = [
        {type: 'button', 
        props: {
            id:"ViewMenu",
            type: "button",
            onclick: function(){
                 console.log("pruebaFun");
            }},
        children: ['Nav']
        } 
    ];
}
