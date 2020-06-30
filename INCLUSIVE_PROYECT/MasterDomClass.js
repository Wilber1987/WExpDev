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
    children= [
        { type: 'header',
            children:[
                {type: 'button', props: {id:"ViewMenu", type: "button",
                onclick: function(){alert("hola")}}, children: ['Nav']}
            ]}, 
        { type: 'nav', props: {id:"NavContainer", class: "Menu"} },
        { type: 'main', children: [{ type: 'section', props: {id:"Container"}}] },
        { type: 'footer'},
    ]
}
