//import {CreateTable, DrawTable}  from "../Scripts/Modules/WComponents.js";
class ModulesView{    
    constructor(data){
        this.type = "div";
        this.props = {class:"ModalContent", id: data.id}; 
        this.children= [];       
        if (data.sections) {
            let InputClose = { 
                type:'button', props:{class: 'Btn', type:"button", onclick: ()=>{                      
                        instModules.ModalNavigateFunction( data.id,this,
                          {class: "LoginForm"}, data.id
                        );
                    } 
                },
                children:['◄ Back']
            };   
            let Sections = [ 
                { type: 'h2', props: {id:"", class: ""}, children: [InputClose,"- " ,data.title]}
            ];
            data.sections.forEach(element => {
                let obj = { type: "section", props: {}, children:[
                    {type: "label", props: {onclick:()=>{
                        let SectionElement = GetObj(element.idSection + this.props.id);       
                        if (SectionElement.style.display == "none") {
                            SectionElement.style.display = "block";                         
                            setTimeout(()=>{                               
                                SectionElement.style.maxHeight = "800px"; 
                                SectionElement.style.minHeight = "360px";                              
                            }, 100);                            
                        }else {
                            SectionElement.style.maxHeight = "0px";  
                            SectionElement.style.minHeight = "0px";                          
                            setTimeout(()=>{                              
                                SectionElement.style.display = "none";                               
                            }, 1000); 
                        }
                    }}, children: [element.titleSection]}
                ]};
                let view = { type: "p", props: {
                    class:"SectionElement WScroll",
                    id: element.idSection + this.props.id,
                    style: "display: none;"
                }, children:[]};
                if (element.type == "video") {
                    view.type = "iframe";                 
                    view.props.src = element.contenido;
                }else if (element.type == "pdf") {                   
                    // view.type = "embed";
                    // view.props.src = element.contenido;
                    // view.props.type="application/pdf";
                    view.type = "a";
                    view.props.href = "#";
                    view.props.onclick = ()=>{
                        window.open(
                            element.contenido,
                            "_blank",  'location=no'
                        );
                    } 
                    view.children.push("Ver PDF");
                }else if (element.type == "game") {
                    view.type = "canvas";
                    //view.props.id = "canvas";
                    view.events = {};
                    view.children.push(
                        {type:"script", props: {
                                src: element.contenido,
                                type:"application/javascript"
                            }
                        });                                      
                }else if (element.type == "flash") {
                    view.type = "object";                  
                    view.props.type = "application/x-shockwave-flash";
                    view.props.data = element.contenido;
                    view.events = {};                    
                    view.children.push({type:"h1", props: {name:"movie", value:element.contenido}});  
                    view.children.push({type:"h2", props: {name:"menu", value:"false"}}); 
                    view.children.push({type:"h3", props: {name:"quality", value:"high"}}); 
                }else if (element.type == "test"){
                    view.type = "label";
                    view.children.push("Esto es un test");
                }else {
                    view.type = "article";
                    view.children.push(element.contenido);
                }
                obj.children.push(view);
                Sections.push(obj);
            });
            this.children.push({
                type: "div", props: {class:"ContainerForm WScroll"},
                children: Sections                
            });
        } else {            
            this.children.push( { type: 'section', props: {id:"", class: ""} ,
                children: ["No hay secciones en este módulo"]
            });
        }                 
                   
    }    
}
//export {ModulesView}