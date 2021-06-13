import { WRender, WArrayF, ComponentsManager, WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
import "../WDevCore/WComponents/WChartJSComponent.js";
import { WCssClass } from "../WDevCore/WModules/WStyledRender.js";
import { cpagos, fact, detfact, psi } from "../DATA/data.js";
const TableId = "tableReport"
const dataTestFact = [
    {
        id: 1, servicio: "llamadas", estado: "cancelada",
        value: 200, tipo: "subtotal",
        mes: "enero", cuarto: "1er", año: 2020, metodo_pago: "stripe"
    }, {
        id: 1, servicio: "llamadas", estado: "cancelada",
        value: 20, tipo: "impuesto",
        mes: "enero", cuarto: "1er", año: 2020, metodo_pago: "stripe"
    }, {
        id: 1, servicio: "llamadas", estado: "cancelada",
        value: 220, tipo: "total",
        mes: "enero", cuarto: "1er", año: 2020, metodo_pago: "stripe"
    }, {
        id: 1, servicio: "llamadas", estado: "cancelada",
        value: 120, tipo: "costo operativo",
        mes: "enero", cuarto: "1er", año: 2020, metodo_pago: "stripe"
    }, {
        id: 1, servicio: "llamadas", estado: "cancelada",
        value: 80, tipo: "beneficio",
        mes: "enero", cuarto: "1er", año: 2020, metodo_pago: "stripe"
    }, {
        id: 2, servicio: "llamadas", estado: "cancelada",
        value: 200, tipo: "subtotal",
        mes: "enero", cuarto: "1er", año: 2020, metodo_pago: "cheque"
    }, {
        id: 2, servicio: "llamadas", estado: "cancelada",
        value: 20, tipo: "impuesto",
        mes: "enero", cuarto: "1er", año: 2020, metodo_pago: "cheque"
    }, {
        id: 2, servicio: "llamadas", estado: "cancelada",
        value: 220, tipo: "total",
        mes: "enero", cuarto: "1er", año: 2020, metodo_pago: "cheque"
    }, {
        id: 2, servicio: "llamadas", estado: "cancelada",
        value: 120, tipo: "costo operativo",
        mes: "enero", cuarto: "1er", año: 2020, metodo_pago: "cheque"
    }, {
        id: 2, servicio: "llamadas", estado: "cancelada",
        value: 80, tipo: "beneficio",
        mes: "enero", cuarto: "1er", año: 2020, metodo_pago: "cheque"
    },
    {
        id: 3, servicio: "llamadas", estado: "cancelada",
        value: 200, tipo: "subtotal",
        mes: "enero", cuarto: "1er", año: 2020, metodo_pago: "stripe"
    }, {
        id: 3, servicio: "llamadas", estado: "cancelada",
        value: 20, tipo: "impuesto",
        mes: "enero", cuarto: "1er", año: 2020, metodo_pago: "stripe"
    }, {
        id: 3, servicio: "llamadas", estado: "cancelada",
        value: 220, tipo: "total",
        mes: "enero", cuarto: "1er", año: 2020, metodo_pago: "stripe"
    }, {
        id: 3, servicio: "llamadas", estado: "cancelada",
        value: 120, tipo: "costo operativo",
        mes: "enero", cuarto: "1er", año: 2020, metodo_pago: "stripe"
    }, {
        id: 3, servicio: "llamadas", estado: "cancelada",
        value: 80, tipo: "beneficio",
        mes: "enero", cuarto: "1er", año: 2020, metodo_pago: "stripe"
    }, {
        id: 4, servicio: "llamadas", estado: "cancelada",
        value: 200, tipo: "subtotal",
        mes: "enero", cuarto: "1er", año: 2020, metodo_pago: "stripe"
    }, {
        id: 4, servicio: "llamadas", estado: "cancelada",
        value: 20, tipo: "impuesto",
        mes: "enero", cuarto: "1er", año: 2020, metodo_pago: "stripe"
    }, {
        id: 4, servicio: "llamadas", estado: "cancelada",
        value: 220, tipo: "total",
        mes: "enero", cuarto: "1er", año: 2020, metodo_pago: "stripe"
    }, {
        id: 4, servicio: "llamadas", estado: "cancelada",
        value: 120, tipo: "costo operativo",
        mes: "enero", cuarto: "1er", año: 2020, metodo_pago: "stripe"
    }, {
        id: 4, servicio: "llamadas", estado: "cancelada",
        value: 80, tipo: "beneficio",
        mes: "enero", cuarto: "1er", año: 2020, metodo_pago: "stripe"
    }, {
        id: 5, servicio: "llamadas", estado: "cancelada",
        value: 200, tipo: "subtotal",
        mes: "febrero", cuarto: "1er", año: 2020, metodo_pago: "stripe"
    }, {
        id: 5, servicio: "llamadas", estado: "cancelada",
        value: 20, tipo: "impuesto",
        mes: "febrero", cuarto: "1er", año: 2020, metodo_pago: "stripe"
    }, {
        id: 5, servicio: "llamadas", estado: "cancelada",
        value: 220, tipo: "total",
        mes: "febrero", cuarto: "1er", año: 2020, metodo_pago: "stripe"
    }, {
        id: 5, servicio: "llamadas", estado: "cancelada",
        value: 120, tipo: "costo operativo",
        mes: "febrero", cuarto: "1er", año: 2020, metodo_pago: "stripe"
    }, {
        id: 5, servicio: "llamadas", estado: "cancelada",
        value: 80, tipo: "beneficio",
        mes: "febrero", cuarto: "1er", año: 2020, metodo_pago: "stripe"
    }, {
        id: 6, servicio: "llamadas", estado: "cancelada",
        value: 200, tipo: "subtotal",
        mes: "febrero", cuarto: "1er", año: 2020, metodo_pago: "stripe"
    }, {
        id: 6, servicio: "llamadas", estado: "cancelada",
        value: 20, tipo: "impuesto",
        mes: "febrero", cuarto: "1er", año: 2020, metodo_pago: "stripe"
    }, {
        id: 6, servicio: "llamadas", estado: "cancelada",
        value: 220, tipo: "total",
        mes: "febrero", cuarto: "1er", año: 2020, metodo_pago: "stripe"
    }, {
        id: 6, servicio: "llamadas", estado: "cancelada",
        value: 120, tipo: "costo operativo",
        mes: "febrero", cuarto: "1er", año: 2020, metodo_pago: "stripe"
    }, {
        id: 6, servicio: "llamadas", estado: "cancelada",
        value: 80, tipo: "beneficio",
        mes: "febrero", cuarto: "1er", año: 2020, metodo_pago: "stripe"
    },
];

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
            const codes = WArrayF.ArryUnique(this.Dataset, "id");
            codes.forEach(code => {
                const header = {
                    type: 'div', props: { id: '', class: "header" }, children: [
                        "Factura número: " + code.id, "Estado: " + code.estado
                    ]
                };
                const body = {
                    type: 'div', props: { id: '', class: "body" }, children: [
                    ]
                };
                this.Dataset.forEach(element => {
                    if (element.id == code.id) {
                        body.children.push({
                            type: 'div', props: { id: '' }, children: [
                                element.tipo + ":", element.value
                            ]
                        })
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
                    padding: "10px"
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
class ReportView {
    constructor(props) {
        this.type = "div";
        this.props = props;
        const ControlOptions = {
            type: 'div', props: { id: 'optionsContainter', class: "options" }, children: [
                [{ type: 'input', props: { id: 'date1', type: 'date' } }],
                [{ type: 'input', props: { id: 'date2', type: 'date' } }],
            ]
        }
        for (const prop in dataTestFact[0]) {
            const select = {type:'select', props: {id: prop}, children:[
                { type:'option', props: { innerText:'Seleccione', value: ''} }
            ]}
            const SelectData = WArrayF.ArryUnique(dataTestFact, prop);
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
        this.children.push({ type: 'w-report-list', props: { id: '', Dataset: dataTestFact } })
    }
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

export { ReportView }

const dataTestFactUsers = [
    {
        servicio: "llamadas", estado: "pendiente",
        value: 200, tipo: "costo operativo",
        mes_: "enero", cuarto: "1er", año: 2020, metodo_pago: "stripe", empresa: "psi"
    }, {
        servicio: "llamadas", estado: "pendiente",
        value: 200, tipo: "total",
        mes_: "febrero", cuarto: "1er", año: 2020, metodo_pago: "cheque", empresa: "renfe"
    }, {
        servicio: "llamadas", estado: "pendiente",
        value: 200, tipo: "costo operativo",
        mes_: "enero", cuarto: "1er", año: 2020, metodo_pago: "cheque", empresa: "psi"
    }, {
        servicio: "Citas", estado: "cancelada",
        value: 200, tipo: "total",
        mes_: "enero", cuarto: "1er", año: 2020, metodo_pago: "stripe", empresa: "renfe"
    }, {
        servicio: "Citas", estado: "cancelada",
        value: 200, tipo: "costo operativo",
        mes_: "febrero", cuarto: "1er", año: 2020, metodo_pago: "stripe", empresa: "salud24"
    }, {
        servicio: "Citas", estado: "cancelada",
        value: 200, tipo: "total",
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