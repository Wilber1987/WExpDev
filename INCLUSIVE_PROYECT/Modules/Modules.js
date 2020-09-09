//import {CreateTable, DrawTable}  from "../Scripts/Modules/WComponents.js";
const instModules = new DomComponent();
class Modules{    
    constructor(props){
        this.type = "div";
        this.props = props; 
        this.children= [];
        this.children.push(
            { type: 'h3', props: {id:"", class: ""} ,
                children: ["Mis Módulos"]
            }
        );
        if (this.props.modules) {
            this.children.push( { type: 'div', props: {id:"", class: "SliderContainer"} ,
                children: [
                    {
                        type: "div", props: {id:"GrupFormCardCarrocel", class: "GrupFormCardCarrocel"},
                        children: this.StartModuleList(this.props.modules)
                    },
                    { type: "div", props: {id:"", class: "btn-prev",
                     onclick:()=>{ myFunctionPrev('GrupFormCardCarrocel')} }, children: ["<"]},
                    { type: "div", props: {id:"", class: "btn-next", 
                     onclick:()=>{ myFunctionNext('GrupFormCardCarrocel')} }, children: [">"]}
                ]
            });
        }  else {            
            this.events = { load:  
                console.log("recuperando modulos....")               
            }
        } 
        this.children.push(
            { type: 'h3', props: {id:"", class: ""} ,
                children: ["Modulos Recomendados"]
            }
        );          
        this.children.push( { type: 'section', props: {id:"Modulos recomendados...", class: ""} ,
            children: ["No hay nuevos módulos"]
        });             
    } 
    StartModuleList = (modules) => {  
        let ApiUrlUpdate = "";
        let ApiUrlCreate = "";
        let ApiUrlDelete = "";
        let ApiUrlSelect = "";   
        
        let Cards = [];
        modules.forEach(element => {
            Cards.push(
                {type: "div", props:{ class: "cardForm"},
                children:[
                    {type: "label",props:{ class: "labelCard"},children:[element.title]},
                    {type: "p",props:{ class: "pCard"}, children:[element.desc]}, 
                    {type: "div", props:{id:element.id+"Container"}, children:[
                        {type: "button", props:{class: "BtnSecundary", type: "button", onclick: async ()=>{
                            //MODELO
                            let ModuleModel = {
                                id: "module1"+element.id,
                                title: "Mi Modulo - " + element.id,
                                sections: [
                                    {
                                        idSection:1,
                                        titleSection: "Seccion1",
                                        type: "video", contenido: "https://www.youtube.com/embed/VKWCFeE0XRk"
                                    },
                                    {
                                        idSection:2,
                                        titleSection: "Seccion2",
                                        type: "pdf", contenido: "https://scielo.conicyt.cl/pdf/rchnut/v42n2/art14.pdf"//"./Media/video/Prueba.pdf"
                                    },
                                    {
                                        idSection:3,
                                        titleSection: "Seccion3",
                                        type: "descripcion", contenido: "Hola mundo....."
                                    },
                                    {
                                        idSection:4,
                                        titleSection: "Seccion4",
                                        type: "game", contenido: "./Media/games/game.js"
                                    },
                                    {
                                        idSection:5,
                                        titleSection: "Seccion5",
                                        type: "game", contenido: "./Media/games/pokemon.js"
                                    }, 
                                    {
                                        idSection:6,
                                        titleSection: "Seccion6",
                                        type: "flash", contenido: "./Media/games/Ley775.swf"
                                    }
                                ]
                            }                            
                            //inst.NavigateFunction("Modules", "./Modules/Modules.js");
                            instModules.ModalNavigateFunction(element.id+"Container",
                                new ModulesView(ModuleModel),  {class: "LoginForm"}, element.id+"Container"
                            );
                           // modalFunction(ModuleModel.id);
                        }}, children:["Go!"]},
                    ]},                  
                ]}
            );
        });

        //DrawTable(modules, ConfigTable);
        console.log(Cards)
        return Cards;        
    }   
}
//export {Modules}

