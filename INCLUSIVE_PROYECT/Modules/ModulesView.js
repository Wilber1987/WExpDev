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
            data.sections.forEach((element, index = 0) => {
                let DefaultMinSize = "0px";
                let DefaultMaxSize = "0px";
                let DefaultDisplay = "none";
                if (index == 0) {
                    DefaultMinSize = "300px";
                    DefaultMaxSize = "800px";
                    DefaultDisplay = "block";
                }
                let obj = { type: "section", props: {}, children:[
                    {type: "label", props: {class: "labelAcordeon",onclick:()=>{
                        let elementId = element.IdSection + this.props.id;   
                        DisplayUniqAcorden(elementId)
                    }}, children: [element.Title]}
                ]};
                let view = { type: "p", props: {
                    class:"SectionElement WScroll",
                    id: element.IdSection + this.props.id,                   
                    style: `display: ${DefaultDisplay}; max-height: ${DefaultMaxSize}; min-height:${DefaultMinSize} `
                }, children:[]};
                //view.events = {};                
                if (element.Type == "video" || element.Type == "googleForm") {
                    view.type = "iframe";                 
                    view.props.src = element.UrlContent;
                }else if (element.Type == "pdf") {                   
                    // view.type = "embed";
                    // view.props.src = element.UrlContent;
                    // view.props.type="application/pdf";
                    //view.type = "a";
                    
                   /* view.props.href = "#";
                    view.props.onclick = ()=>{
                        window.open(
                            element.UrlContent,
                            "_blank",  'location=no'
                        );
                    } */
                   // view.children.push("Ver PDF"); 
                   
                   //PRUEBA CANVAS
                   view.type = "div";
                   /*view.children.push({
                       type:"input", props: {type:"file", }
                   })*/
                   const params = {
                       id: element.IdSection + this.props.id,
                       url: element.UrlContent 
                   }             
                    view.events = { load: this.getPdf, loadParams: params};
                   // view.props.onload = this.getPdf;
                    //FIN PRUEBA
                }else if (element.Type == "game") {
                    view.type = "canvas";
                    //view.props.id = "canvas";
                    view.events = {};
                    view.children.push(
                        {type:"script", props: {
                                src: element.UrlContent,
                                type:"application/javascript"
                            }
                        });                                      
                }else if (element.Type == "flash") {
                    view.type = "object";                  
                    view.props.type = "application/x-shockwave-flash";
                    view.props.data = element.UrlContent;
                    view.events = {};                    
                    view.children.push({type:"h1", props: {name:"movie", value:element.UrlContent}});  
                    view.children.push({type:"h2", props: {name:"menu", value:"false"}}); 
                    view.children.push({type:"h3", props: {name:"quality", value:"high"}}); 
                }else if (element.Type == "test"){
                    view.type = "w-form-view";
                   // console.log(element.UrlContent)
                    view.props.idform = [parseInt(element.UrlContent)];
                    //view.children.push("Esto es un test");
                }else if (element.Type == "img"){
                    view.type = "label";
                    view.children.push("Esto es una imagen");
                }else {
                    view.type = "article";
                    view.children.push(element.UrlContent);
                }
                obj.children.push(view);
                Sections.push(obj);
                index ++;
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
    getPdf = async (obj)=>{
        //console.log(obj);  
        const canvas = await DrawCanvasPdf(obj.url);
        //console.log(canvas);     
        let v = document.getElementById(obj.id);
        //console.log(v);
        v.append(canvas);         
    }      
   
}
//export {ModulesView}