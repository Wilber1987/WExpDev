import { WRender, WArrayF } from "../WModules/WComponentsTools.js";
import { WCssClass } from "../WModules/WStyledRender.js";
import "./WTableComponents.js";
const TableId = "tableReport"

//facturas de empresa ligadas al usuario y y por sesiones de empresa
class WReportList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        if (this.shadowRoot.innerHTML != "") {
            return;
        }        
        this.DrawReport();
    }
    DrawReport = async () => {
        this.shadowRoot.innerHTML = "";
        this.shadowRoot.append(WRender.createElement(this.style));
        if (this.Dataset != undefined && this.Dataset.__proto__ == Array.prototype) {
            const codes = WArrayF.ArrayUnique(this.Dataset, this.groupParam);   
            codes.forEach(code => {
                const header = {
                    type: 'div', props: { id: '', class: "header" }, children: [
                    ]
                };
                const body = {
                    type: 'div', props: { id: '', class: "body" }, children: [
                    ]
                }; 
                if (this.header != undefined && this.header.__proto__ == Array.prototype) {                   
                    this.header.forEach(prop => {
                        header.children.push({
                            type: 'div', props: { id: '' }, children: [
                                prop.replace("_", " ") + ": ", code[prop]
                            ]
                        })
                    });
                }                
                this.Dataset.forEach(element => {
                    if (element[this.groupParam] == code[this.groupParam]) {                        
                        if (this.body != undefined && this.body.__proto__ == Array.prototype) {
                            this.body.forEach(prop => {
                                body.children.push({
                                    type: 'div', props: { id: '' }, children: [
                                        element[prop.leyend] + ": ", element[prop.value]
                                    ]
                                })
                            });
                        }
                        if (this.body == undefined && this.header == undefined) {
                            for (const prop in element) {
                                body.children.push({
                                    type: 'div', props: { id: '' }, children: [
                                        prop.replace("_", " ") + ": ", element[prop]
                                    ]
                                })
                            }                            
                        }
                    }
                });
                this.shadowRoot.append(WRender.createElement({
                    type: 'div', props: { id: '', class: "fact" }, children: [
                        header, body
                    ]
                }))
            });
        } else {
            this.shadowRoot.innerHTML = "define un array list"
        }
    }
    style = {
        type: 'w-style', props: {
            id: '', ClassList: [
                new WCssClass(`.fact`, {
                    border: 'solid 1px #999',
                    "border-radius": "0.2cm",
                    margin: "10px",
                }),new WCssClass(`.header`, {
                    display: "flex",
                    "flex-wrap": "wrap",
                    padding: "10px", 
                    "background-color": "#80bfff",
                }),new WCssClass(`.body`, {
                    display: "flex",
                    "flex-wrap": "wrap",
                    padding: "10px",
                }), new WCssClass(`.body div, .header div`, {
                    margin: "5px"
                }), 
            ], MediaQuery: [{
                condicion: '(max-width: 600px)',
                ClassList: []
            },
            ]
        }
    };
}
customElements.define("w-report-list", WReportList);
class WReportView {
    constructor(props , Config) {
        this.type = "div";
        this.props = props;
        this.props.className = "reportV"
        const ControlOptions = {
            type: 'div', props: { id: 'optionsContainter', class: "OptionContainer" }, children: [
            ]
        }
        for (const prop in Config.Dataset[0]) {            
            if ((typeof Config.Dataset[0][prop] != "number" 
            && !prop.toUpperCase().includes("FECHA") 
            && !prop.toUpperCase().includes("DATE") )
            || prop.toUpperCase().includes("AÑO") 
            || prop.toUpperCase().includes("YEAR")) {
                const select = {type:'select', props: {id: prop}, children:[
                    { type:'option', props: { innerText:'Seleccione', value: ''} }
                ]}            
                const SelectData = WArrayF.ArrayUnique(Config.Dataset, prop);
                SelectData.forEach(data => {
                    select.children.push({
                        type:'option', props: {innerText: data[prop], value: data[prop]}
                    });        
                });
                select.props.onchange = async (ev)=>{
                    let SelectFlag = false;
                    const Container =  document.getElementById(props.id);
                    Container.querySelectorAll("#optionsContainter select").forEach(select => {
                        if (select.id != ev.target.id) {
                            if (select.value != "") {
                                console.log("valor: ",select.value);
                                SelectFlag = true;
                            }
                        }
                    });
                    const table = Container.querySelector("w-table");   
                    const wreport = Container.querySelector("w-report-list");              
                    const DFilt =  Config.Dataset.filter( obj => {
                        let flagObj = true;
                        Container.querySelectorAll("#optionsContainter select").forEach(select => {  
                            if (select.value == "") {
                                return
                            }
                            if ( obj[select.id] == select.value) {
                                if (flagObj) {
                                    flagObj = true;
                                } 
                            } else {
                                flagObj = false;
                            }
                        });
                        return flagObj;
                    });  
                    console.log(DFilt);             
                    wreport.Dataset = DFilt;
                    wreport.DrawReport();
                    table.Dataset = DFilt;
                    table.DefineTable(DFilt);

                }
                ControlOptions.children.push([prop, select]);
            }
        }        
        this.children = [ControlOptions];
        var ConfigG3 = {
            Datasets: Config.Dataset,
            //TypeChart: "staked",            
            /*DATOS DE LA TABLA*/
            Colors: ["#ff6699", "#ffbb99", "#adebad"],
            /*COLORES DEFINIDOS PARA EL GRAFICO(SI NO SE DEFINE SE SELECCIONAN DE FORMA DINAMICA)*
            /*MAXIMO DE AGRUPACIONES ESTATICAS 3 CON UN VALOR EVALUADO*/
            Dinamic: true,
            /*DEFINE LA TABLA DINAMICA*/
            AddChart: true,
            /*DEFINE UN GRAFICO DE BARRAS ESTAQUEADO si hay grupos  o es dinamica*/
            //paginate: false,
        };
        this.children.push({
            type: "w-table",
            props: {
                id: TableId,
                TableConfig: ConfigG3
            }
        }),
        this.children.push({
            type: 'w-report-list', props: { id: '', 
            Dataset: Config.Dataset, 
            groupParam: Config.GroupParam,
            header:Config.headerGroup, body: Config.bodyGroup 
        }})
        this.children.push(this.style);
    }
    style = { type: 'w-style', props: {id: '', ClassList: [
            new WCssClass( `.reportV`, {
                margin: '10px',
            }), new WCssClass( `.OptionContainer`, {
                display: "flex",
                "flex-wrap": "wrap"
            }),new WCssClass(`.OptionContainer div`, {               
                display: "grid",
                "grid-template-rows": "20px 35px",
                "grid-template-columns": "220px",
                margin: "10px",
            }), new WCssClass(
                `.OptionContainer input, .OptionContainer select`, {
                    "grid-row": "2/3",
                    margin: "0px",
                    padding: "5px 10px"
                }),
        ], MediaQuery: [ {condicion: '(max-width: 600px)',
            ClassList: []},
        ]}
    };
}
const MasterStyle = {
    type: "w-style",
    props: {
        ClassList: [
            new WCssClass(".App", {
                display: "grid",
                "grid-template-columns": "250px calc(100% - 250px)",
                "grid-template-rows": "70px calc(100vh - 120px) 50px"
            })
        ], MediaQuery: [{
            condicion: "(max-width: 600px)",
            ClassList: [
                new WCssClass(`.App`, {
                    display: "grid",
                    "grid-template-columns": "100%",
                    "grid-template-rows": "70px auto calc(100vh - 120px) 50px"
                })
            ]
        }
        ]
    }
};

export { WReportView }
