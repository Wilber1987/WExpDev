import { WRender, WArrayF, ComponentsManager, WAjaxTools } from "../WModules/WComponentsTools.js";
import "./WChartJSComponent.js";
import { WCssClass } from "../WModules/WStyledRender.js";
import { cpagos, fact, detfact, psi } from "../../DATA/data.js";
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
                                prop + ":", code[prop]
                            ]
                        })
                    });
                }  
                this.Dataset.forEach(element => {
                    if (element.id == code.id) {                        
                        if (this.body != undefined && this.body.__proto__ == Array.prototype) {
                            this.body.forEach(prop => {
                                body.children.push({
                                    type: 'div', props: { id: '' }, children: [
                                        element[prop.leyend] + ":", element[prop.value]
                                    ]
                                })
                            });
                        }
                        if (this.body == undefined && this.header == undefined) {
                            for (const prop in element) {
                                body.children.push({
                                    type: 'div', props: { id: '' }, children: [
                                        prop + ":", element[prop]
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
    constructor(props , dataTestFact) {
        this.type = "div";
        this.props = props;
        this.props.className = "reportV"
        const ControlOptions = {
            type: 'div', props: { id: 'optionsContainter', class: "OptionContainer" }, children: [
                ["Desde", { type: 'input', props: { id: 'date1', type: 'date' } }],
                ["Hasta", { type: 'input', props: { id: 'date2', type: 'date' } }],
            ]
        }
        for (const prop in dataTestFact[0]) {            
            if (typeof dataTestFact[0][prop] != "number" 
            || prop.toUpperCase().includes("AÑO") 
            || prop.toUpperCase().includes("YEAR")) {
                const select = {type:'select', props: {id: prop}, children:[
                    { type:'option', props: { innerText:'Seleccione', value: ''} }
                ]}            
                const SelectData = WArrayF.ArrayUnique(dataTestFact, prop);
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
                    const DFilt =  dataTestFact.filter( obj => {
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
                    wreport.Dataset = DFilt;
                    wreport.DrawReport();
                    table.Dataset = DFilt;
                    table.DrawTable();

                }
                ControlOptions.children.push([prop, select]);
            }
        }        
        this.children = [ControlOptions];
        var ConfigG3 = {
            Datasets: dataTestFact,
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
            Dataset: dataTestFact, 
            groupParam: "id",
            header: ["id", "servicio", "estado", "mes"], body: [ { leyend: "tipo" , value: "value" } ]
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

const dataTestFactUsers = [
    {
        servicio: "llamadas", estado: "pendiente",
        value: 200, empresa: "psico",tipo:  "costo operativo",
        mes_: "enero", cuarto: "1er", año: 2020, metodo_pago: "stripe", empresa: "psi"
    }, {
        servicio: "llamadas", estado: "pendiente",
        value: 200, empresa: "psico",tipo:  "total",
        mes_: "febrero", cuarto: "1er", año: 2020, metodo_pago: "cheque", empresa: "renfe"
    }, {
        servicio: "llamadas", estado: "pendiente",
        value: 200, empresa: "psico",tipo:  "costo operativo",
        mes_: "enero", cuarto: "1er", año: 2020, metodo_pago: "cheque", empresa: "psi"
    }, {
        servicio: "Citas", estado: "cancelada",
        value: 200, empresa: "psico",tipo:  "total",
        mes_: "enero", cuarto: "1er", año: 2020, metodo_pago: "stripe", empresa: "renfe"
    }, {
        servicio: "Citas", estado: "cancelada",
        value: 200, empresa: "psico",tipo:  "costo operativo",
        mes_: "febrero", cuarto: "1er", año: 2020, metodo_pago: "stripe", empresa: "salud24"
    }, {
        servicio: "Citas", estado: "cancelada",
        value: 200, empresa: "psico",tipo:  "total",
        mes_: "marzo", cuarto: "1er", año: 2020, metodo_pago: "stripe", empresa: "salud24"
    }
]
const Data = [
    { id: 1, Category: "Category 3", Stock: "Stock 2", Type: "Type 1", Time: "2020-01-01", mes_: "febrero", Value: 35 },
    { id: 12, Category: "Category 3", Stock: "Stock 2", Type: "Type 1", Time: "2020-01-01", mes_: "enero", Value: 35 },
    { id: 2, Category: "Category 1", Stock: "Stock 2", Type: "Type 2", Time: "2020-03-01", mes_: "enero", Value: 200 },
    { id: 3, Category: "Category 2", Stock: "Stock 2", Type: "Type 2", Time: "2020-02-01", mes_: "enero", Value: 50 },
    { id: 4, Category: "Category 1", Stock: "Stock 2", Type: "Type 3", Time: "2020-01-01", mes_: "febrero", Value: 105 },
    { id: 5, Category: "Category 1", Stock: "Stock 2", Type: "Type 3", Time: "2020-01-01", mes_: "febrero", Value: 39 },
    { id: 6, Category: "Category 2", Stock: "Stock 1", Type: "Type 4", Time: "2020-02-01", mes_: "febrero", Value: 180 },
    { id: 7, Category: "Category 1", Stock: "Stock 1", Type: "Type 4", Time: "2020-01-01", mes_: "abril", Value: 100 },
    { id: 8, Category: "Category 2", Stock: "Stock 1", Type: "Type 1", Time: "2020-02-01", mes_: "abril", Value: 70 },
    { id: 9, Category: "Category 1", Stock: "Stock 1", Type: "Type 1", Time: "2020-01-01", mes_: "abril", Value: 35 },
    { id: 10, Category: "Category 3", Stock: "Stock 1", Type: "Type 5", Time: "2020-03-01", mes_: "abril", Value: 98 },
    { id: 11, Category: "Category 1", Stock: "Stock 1", Type: "Type 3", Time: "2020-02-01", mes_: "febrero", Value: 40 },
    { id: 1, Category: "Category 3", Stock: "Stock 2", Type: "Type 1", Time: "2020-01-01", mes_: "febrero", Value: 35 },
    { id: 12, Category: "Category 3", Stock: "Stock 2", Type: "Type 1", Time: "2021-01-01", mes_: "enero", Value: 35 },
    { id: 2, Category: "Category 1", Stock: "Stock 2", Type: "Type 2", Time: "2021-03-01", mes_: "enero", Value: 200 },
    { id: 3, Category: "Category 2", Stock: "Stock 2", Type: "Type 2", Time: "2021-02-01", mes_: "enero", Value: 50 },
    { id: 4, Category: "Category 1", Stock: "Stock 2", Type: "Type 3", Time: "2021-01-01", mes_: "febrero", Value: 105 },
    { id: 5, Category: "Category 1", Stock: "Stock 2", Type: "Type 3", Time: "2021-01-01", mes_: "febrero", Value: 39 },
    { id: 6, Category: "Category 2", Stock: "Stock 1", Type: "Type 4", Time: "2021-02-01", mes_: "febrero", Value: 180 },
    { id: 7, Category: "Category 1", Stock: "Stock 1", Type: "Type 4", Time: "2021-01-01", mes_: "abril", Value: 100 },
    { id: 8, Category: "Category 2", Stock: "Stock 1", Type: "Type 1", Time: "2021-02-01", mes_: "abril", Value: 70 },
    { id: 9, Category: "Category 1", Stock: "Stock 1", Type: "Type 1", Time: "2021-01-01", mes_: "abril", Value: 35 },
    { id: 10, Category: "Category 3", Stock: "Stock 1", Type: "Type 5", Time: "2021-03-01", mes_: "abril", Value: 98 },
    { id: 11, Category: "Category 1", Stock: "Stock 1", Type: "Type 3", Time: "2021-02-01", mes_: "febrero", Value: 40 },

    { id: 6, Category: "Category 4", Stock: "Stock 1", Type: "Type 4", Time: "2021-02-01", mes_: "febrero", Value: 180 },
    { id: 7, Category: "Category 4", Stock: "Stock 1", Type: "Type 4", Time: "2021-01-01", mes_: "abril", Value: 100 },
    { id: 8, Category: "Category 5", Stock: "Stock 1", Type: "Type 1", Time: "2021-02-01", mes_: "abril", Value: 70 },
    { id: 9, Category: "Category 5", Stock: "Stock 1", Type: "Type 1", Time: "2021-01-01", mes_: "abril", Value: 35 },
    { id: 10, Category: "Category 3", Stock: "Stock 1", Type: "Type 5", Time: "2021-03-01", mes_: "abril", Value: 98 },
    { id: 11, Category: "Category 1", Stock: "Stock 1", Type: "Type 3", Time: "2021-02-01", mes_: "febrero", Value: 40 },
    { id: 6, Category: "Category 4", Stock: "Stock 2", Type: "Type 4", Time: "2021-02-01", mes_: "febrero", Value: 180 },
    { id: 7, Category: "Category 4", Stock: "Stock 2", Type: "Type 4", Time: "2021-01-01", mes_: "abril", Value: 100 },
    { id: 8, Category: "Category 5", Stock: "Stock 2", Type: "Type 1", Time: "2021-02-01", mes_: "abril", Value: 70 },
    { id: 9, Category: "Category 5", Stock: "Stock 2", Type: "Type 1", Time: "2021-01-01", mes_: "abril", Value: 35 },
    { id: 10, Category: "Category 3", Stock: "Stock 2", Type: "Type 5", Time: "2021-03-01", mes_: "abril", Value: 98 },
    { id: 11, Category: "Category 1", Stock: "Stock 2", Type: "Type 3", Time: "2021-02-01", mes_: "febrero", Value: 40 },
];