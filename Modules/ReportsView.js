import { WRender } from "../WDevCore/WModules/WComponentsTools.js";
import "../WDevCore/WComponents/WChartJSComponent.js";
import { WCssClass } from "../WDevCore/WModules/WStyledRender.js";
import { cpagos, fact, detfact, psi} from "../DATA/data.js";
const ControlOptions = [
    {type:'input', props: {id: '', type:'date'}},
    {type:'input', props: {id: '', type:'date'}},
    {type:'select', props: {id: 'txt_empresa'}, children:[
        {type:'option', props: {innerText:'Select Option', value: 'Select Option'}}
    ]},
    {type:'select', props: {id: 'txt_psicologo'}, children:[
        {type:'option', props: {innerText:'Select Option', value: 'Select Option'}}
    ]},
    {type:'select', props: {id: 'txt_user'}, children:[
        {type:'option', props: {innerText:'Select Option', value: 'Select Option'}}
    ]},
    {type:'input', props: {id: '', type:'button', value: 'filtrardatos', onclick: async ()=>{
        //code.....
        console.log(filt);
        table.Dataset = filt;
        table.DrawTable();

    }}},
    {type:'input', props: {id: '', type:'button', value: 'imprimir la lista de los datos', onclick: async ()=>{
        //code.....
        
    }}}
]
const dataTestFact = [
    {
        servicio: "llamadas", estado: "cancelada", 
        value: 200, tipo: "costo operativo",
        mes_: "enero", cuarto: "1er", año: 2020, metodo_pago: "stripe"
    },{
        servicio: "llamadas", estado: "cancelada", 
        value: 200, tipo: "total",
        mes_: "febrero", cuarto: "1er", año: 2020, metodo_pago: "cheque"
    },{
        servicio: "llamadas", estado: "cancelada", 
        value: 200, tipo: "costo operativo",
        mes_: "enero", cuarto: "1er", año: 2020, metodo_pago: "cheque"
    },{
        servicio: "Citas", estado: "cancelada", 
        value: 200, tipo: "total",
        mes_: "enero", cuarto: "1er", año: 2020, metodo_pago: "stripe"
    },{
        servicio: "Citas", estado: "cancelada", 
            value: 200, tipo: "costo operativo",
        mes_: "febrero", cuarto: "1er", año: 2020, metodo_pago: "stripe"
    },{
        servicio: "Citas", estado: "cancelada", 
        value: 200, tipo: "total",
        mes_: "marzo", cuarto: "1er", año: 2020, metodo_pago: "stripe"
    }
]
//facturas de empresa ligadas al usuario y y por sesiones de empresa
//array data en bruto
const dataTestFactEmpresas = [
    {
        servicio: "llamadas", estado: "pendiente", 
        value: 200, tipo: "costo operativo",
        mes_: "enero", cuarto: "1er", año: 2020, metodo_pago: "stripe", empresa: "psi"
    },{
        servicio: "llamadas", estado: "pendiente", 
        value: 200, tipo: "total",
        mes_: "febrero", cuarto: "1er", año: 2020, metodo_pago: "cheque", empresa: "renfe"
    },{
        servicio: "llamadas", estado: "pendiente", 
        value: 200, tipo: "costo operativo",
        mes_: "enero", cuarto: "1er", año: 2020, metodo_pago: "cheque", empresa: "psi"
    },{
        servicio: "Citas", estado: "cancelada", 
        value: 200, tipo: "total",
        mes_: "enero", cuarto: "1er", año: 2020, metodo_pago: "stripe", empresa: "renfe"
    },{
        servicio: "Citas", estado: "cancelada", 
            value: 200, tipo: "costo operativo",
        mes_: "febrero", cuarto: "1er", año: 2020, metodo_pago: "stripe", empresa: "salud24"
    },{
        servicio: "Citas", estado: "cancelada", 
        value: 200, tipo: "total",
        mes_: "marzo", cuarto: "1er", año: 2020, metodo_pago: "stripe", empresa: "salud24"
    }
]
const filt = dataTestFact.filter(x => x.tipo == "costo operativo");
const dataTestFactUsers = [
    {
        servicio: "llamadas", estado: "pendiente", 
        value: 200, tipo: "costo operativo",
        mes_: "enero", cuarto: "1er", año: 2020, metodo_pago: "stripe", empresa: "psi"
    },{
        servicio: "llamadas", estado: "pendiente", 
        value: 200, tipo: "total",
        mes_: "febrero", cuarto: "1er", año: 2020, metodo_pago: "cheque", empresa: "renfe"
    },{
        servicio: "llamadas", estado: "pendiente", 
        value: 200, tipo: "costo operativo",
        mes_: "enero", cuarto: "1er", año: 2020, metodo_pago: "cheque", empresa: "psi"
    },{
        servicio: "Citas", estado: "cancelada", 
        value: 200, tipo: "total",
        mes_: "enero", cuarto: "1er", año: 2020, metodo_pago: "stripe", empresa: "renfe"
    },{
        servicio: "Citas", estado: "cancelada", 
            value: 200, tipo: "costo operativo",
        mes_: "febrero", cuarto: "1er", año: 2020, metodo_pago: "stripe", empresa: "salud24"
    },{
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
];
class ReportView{
    constructor(props) {
        this.type = "div";
        this.props = props;
        this.children = [ControlOptions];
        console.log(cpagos);
        var ConfigG3 = {
            Datasets: dataTestFact,
            /*DATOS DE LA TABLA*/
            Colors: ["#ff6699", "#ffbb99", "#adebad"],
            /*COLORES DEFINIDOS PARA EL GRAFICO(SI NO SE DEFINE SE SELECCIONAN DE FORMA DINAMICA)*
            /*MAXIMO DE AGRUPACIONES ESTATICAS 3 CON UN VALOR EVALUADO*/
            Dinamic: true,
            /*DEFINE LA TABLA DINAMICA*/
            AddChart: true,
            /*DEFINE UN GRAFICO DE BARRAS ESTAQUEADO si hay grupos  o es dinamica*/
            //paginate: false,
            Options: {
                
            },
        };
        this.children.push({
            type: "w-table",
            props: {
                id: "table",
                TableConfig: ConfigG3
            }
        })
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