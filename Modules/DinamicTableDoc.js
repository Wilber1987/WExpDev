import { WCssClass } from "../WDevCore/WModules/WStyledRender.js";
import "../WDevCore/WComponents/WTableComponents.js";
import "../WDevCore/WComponents/WAppNavigator.js";
import { ComponentsManager, WAjaxTools, WRender } from "../WDevCore/WModules/WComponentsTools.js";

const Data = [
    { id: 1, Category: "Category 3", Stock: "Stock 2", Type: "Type 1", Time: "2020-01-01", Value: 35 },
    { id: 12, Category: "Category 3", Stock: "Stock 2", Type: "Type 1", Time: "2020-01-01", Value: 35 },
    { id: 2, Category: "Category 1", Stock: "Stock 2", Type: "Type 2", Time: "2020-03-01", Value: 200 },
    { id: 3, Category: "Category 2", Stock: "Stock 2", Type: "Type 2", Time: "2020-02-01", Value: 50 },
    { id: 4, Category: "Category 1", Stock: "Stock 2", Type: "Type 3", Time: "2020-01-01", Value: 105 },
    { id: 5, Category: "Category 1", Stock: "Stock 2", Type: "Type 3", Time: "2020-01-01", Value: 39 },
    { id: 6, Category: "Category 2", Stock: "Stock 1", Type: "Type 4", Time: "2020-02-01", Value: 180 },
    { id: 7, Category: "Category 1", Stock: "Stock 1", Type: "Type 4", Time: "2020-01-01", Value: 100 },
    { id: 8, Category: "Category 2", Stock: "Stock 1", Type: "Type 1", Time: "2020-02-01", Value: 70 },
    { id: 9, Category: "Category 1", Stock: "Stock 1", Type: "Type 1", Time: "2020-01-01", Value: 35 },
    { id: 10, Category: "Category 3", Stock: "Stock 1", Type: "Type 5", Time: "2020-03-01", Value: 98 },
    { id: 11, Category: "Category 1", Stock: "Stock 1", Type: "Type 3", Time: "2020-02-01", Value: 40 },
];
class DinamicTableDoc extends ComponentsManager {
    constructor(props) {
        super();
        this.type = "div";
        this.props = props;
        this.props.class = "DocCont";
        this.props.style = "padding: 10px";
        const NavigateElements = [{
            name: "Group Tables",
            action: () => {
                this.NavigateFunction("GroupTables", new GroupTables(), "ModulesDetail");
            }
        },{
            name: "Group Tables Chart",
            action: () => {
                this.NavigateFunction("GroupTablesChart", new GroupTablesChart(), "ModulesDetail");
            }
        },{
            name: "Dinamic Table",
            action: () => {
                this.NavigateFunction("DinamicTable", new DinamicTable(), "ModulesDetail");
            }
        }];
        const Nav = {
            type: "w-app-navigator",            
            props: {
                id: "TableNav",
                title: "Tabla Básica",
                Elements: NavigateElements
            }
        };
        const DivContainer = {
            type: "div",
            props: { id: "ModulesDetail" }
        };
        const Style = {
            type: "w-style",
            props: {
                ClassList: [
                    new WCssClass(`.DocCont img`, {
                        width: "100%"
                    }),
                ],
                MediaQuery: [{
                    condicion: "(max-width: 800px)",
                    ClassList: []
                },]
            }
        }
        this.children = [
            Nav,
            DivContainer,
            Style
        ]
    }
}
class GroupTables {
    constructor() {
        this.type = "div";
        this.children = [];
        this.children.push({
            type: 'h3',
            props: { innerText: "Group Table" },
        })
        this.children.push({
            type: "div",
            props: {
                style: "padding: 10px",
                innerHTML:`
                `
            }
        }
        );        
        var ConfigG1 = {
            Datasets: Data,
            /*DATOS DE LA TABLA*/
            Colors: ["#ff6699", "#ffbb99", "#adebad"],
            /*COLORES DEFINIDOS PARA EL GRAFICO(SI NO SE DEFINE SE SELECCIONAN DE FORMA DINAMICA)*/
            /*PARAMETROS DE EVALUACION SOLO SI NO ES DINAMICA Y SE QUIEREN DATOS AGRUPADOS)*/
            AttNameEval: "Type",
            AttNameG1: "Category",
            //AttNameG2: "categ2",
            //AttNameG3: "categ",            
            EvalValue: "Value",
            /*MAXIMO DE AGRUPACIONES ESTATICAS 3 CON UN VALOR EVALUADO*/
            //Dinamic: true,
            /*DEFINE LA TABLA DINAMICA*/
            //AddChart: true,
            /*DEFINE UN GRAFICO DE BARRAS ESTAQUEADO si hay grupos  o es dinamica*/
            //paginate: false,
            Options: {
                Search: true, //UrlSearch
                Show: true,
                Edit: true, //UrlUpdate: "",
                Select: true,
                Add: true, //UrlAdd
                Delete: true,// UrlDelete
                /* UserActions: [{name: "Reservar", Function: (Param)=>{
                     alert("reserva");
                     console.log(Param)
                 }}]*/
            },
        };
       
        this.children.push({
            type: "w-table",
            props: {
                id: "table",
                TableConfig: ConfigG1
            }
        })
        this.children.push({
            type: 'h3',
            props: { innerText: "Double Group Table" },
        })
        var ConfigG2 = {
            Datasets: Data,
            /*DATOS DE LA TABLA*/
            Colors: ["#ff6699", "#ffbb99", "#adebad"],
            /*COLORES DEFINIDOS PARA EL GRAFICO(SI NO SE DEFINE SE SELECCIONAN DE FORMA DINAMICA)*/
            /*PARAMETROS DE EVALUACION SOLO SI NO ES DINAMICA Y SE QUIEREN DATOS AGRUPADOS)*/
            AttNameEval: "Type",
            AttNameG1: "Category",
            AttNameG2: "Time",
            //AttNameG3: "categ",            
            EvalValue: "Value",
            /*MAXIMO DE AGRUPACIONES ESTATICAS 3 CON UN VALOR EVALUADO*/
            //Dinamic: true,
            /*DEFINE LA TABLA DINAMICA*/
            //AddChart: true,
            /*DEFINE UN GRAFICO DE BARRAS ESTAQUEADO si hay grupos  o es dinamica*/
            //paginate: false,
            Options: {
                Search: true, //UrlSearch
                Show: true,
                Edit: true, //UrlUpdate: "",
                Select: true,
                Add: true, //UrlAdd
                Delete: true,// UrlDelete
                /* UserActions: [{name: "Reservar", Function: (Param)=>{
                     alert("reserva");
                     console.log(Param)
                 }}]*/
            },
        };

        this.children.push({
            type: "w-table",
            props: {
                id: "table",
                TableConfig: ConfigG2
            }
        })
        this.children.push({
            type: 'h3',
            props: { innerText: "3 Group Table" },
        })
        var ConfigG3 = {
            Datasets: Data,
            /*DATOS DE LA TABLA*/
            Colors: ["#ff6699", "#ffbb99", "#adebad"],
            /*COLORES DEFINIDOS PARA EL GRAFICO(SI NO SE DEFINE SE SELECCIONAN DE FORMA DINAMICA)*/
            /*PARAMETROS DE EVALUACION SOLO SI NO ES DINAMICA Y SE QUIEREN DATOS AGRUPADOS)*/
            AttNameEval: "Type",
            AttNameG1: "Category",
            AttNameG2: "Time",
            AttNameG3: "Stock",            
            EvalValue: "Value",
            /*MAXIMO DE AGRUPACIONES ESTATICAS 3 CON UN VALOR EVALUADO*/
            //Dinamic: true,
            /*DEFINE LA TABLA DINAMICA*/
            //AddChart: true,
            /*DEFINE UN GRAFICO DE BARRAS ESTAQUEADO si hay grupos  o es dinamica*/
            //paginate: false,
            Options: {
                Search: true, //UrlSearch
                Show: true,
                Edit: true, //UrlUpdate: "",
                Select: true,
                Add: true, //UrlAdd
                Delete: true,// UrlDelete
                /* UserActions: [{name: "Reservar", Function: (Param)=>{
                     alert("reserva");
                     console.log(Param)
                 }}]*/
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
class GroupTablesChart {
    constructor() {
        this.type = "div";
        this.children = [];
        this.children.push({
            type: 'h3',
            props: { innerText: "Group Table" },
        })
        this.children.push({
            type: "div",
            props: {
                style: "padding: 10px",
                innerHTML:`
                `
            }
        }
        );        
        var ConfigG1 = {
            Datasets: Data,
            /*DATOS DE LA TABLA*/
            Colors: ["#ff6699", "#ffbb99", "#adebad"],
            /*COLORES DEFINIDOS PARA EL GRAFICO(SI NO SE DEFINE SE SELECCIONAN DE FORMA DINAMICA)*/
            /*PARAMETROS DE EVALUACION SOLO SI NO ES DINAMICA Y SE QUIEREN DATOS AGRUPADOS)*/
            AttNameEval: "Type",
            AttNameG1: "Category",
            //AttNameG2: "categ2",
            //AttNameG3: "categ",            
            EvalValue: "Value",
            /*MAXIMO DE AGRUPACIONES ESTATICAS 3 CON UN VALOR EVALUADO*/
            //Dinamic: true,
            /*DEFINE LA TABLA DINAMICA*/
            AddChart: true,
            /*DEFINE UN GRAFICO DE BARRAS ESTAQUEADO si hay grupos  o es dinamica*/
            //paginate: false,
            Options: {
                Search: true, //UrlSearch
                Show: true,
                Edit: true, //UrlUpdate: "",
                Select: true,
                Add: true, //UrlAdd
                Delete: true,// UrlDelete
                /* UserActions: [{name: "Reservar", Function: (Param)=>{
                     alert("reserva");
                     console.log(Param)
                 }}]*/
            },
        };
       
        this.children.push({
            type: "w-table",
            props: {
                id: "table",
                TableConfig: ConfigG1
            }
        })
        this.children.push({
            type: 'h3',
            props: { innerText: "Double Group Table" },
        })
        var ConfigG2 = {
            Datasets: Data,
            /*DATOS DE LA TABLA*/
            Colors: ["#ff6699", "#ffbb99", "#adebad"],
            /*COLORES DEFINIDOS PARA EL GRAFICO(SI NO SE DEFINE SE SELECCIONAN DE FORMA DINAMICA)*/
            /*PARAMETROS DE EVALUACION SOLO SI NO ES DINAMICA Y SE QUIEREN DATOS AGRUPADOS)*/
            AttNameEval: "Type",
            AttNameG1: "Category",
            AttNameG2: "Time",
            //AttNameG3: "categ",            
            EvalValue: "Value",
            /*MAXIMO DE AGRUPACIONES ESTATICAS 3 CON UN VALOR EVALUADO*/
            //Dinamic: true,
            /*DEFINE LA TABLA DINAMICA*/
            AddChart: true,
            /*DEFINE UN GRAFICO DE BARRAS ESTAQUEADO si hay grupos  o es dinamica*/
            //paginate: false,
            Options: {
                Search: true, //UrlSearch
                Show: true,
                Edit: true, //UrlUpdate: "",
                Select: true,
                Add: true, //UrlAdd
                Delete: true,// UrlDelete
                /* UserActions: [{name: "Reservar", Function: (Param)=>{
                     alert("reserva");
                     console.log(Param)
                 }}]*/
            },
        };

        this.children.push({
            type: "w-table",
            props: {
                id: "table",
                TableConfig: ConfigG2
            }
        })
        this.children.push({
            type: 'h3',
            props: { innerText: "3 Group Table" },
        })
        var ConfigG3 = {
            Datasets: Data,
            /*DATOS DE LA TABLA*/
            Colors: ["#ff6699", "#ffbb99", "#adebad"],
            /*COLORES DEFINIDOS PARA EL GRAFICO(SI NO SE DEFINE SE SELECCIONAN DE FORMA DINAMICA)*/
            /*PARAMETROS DE EVALUACION SOLO SI NO ES DINAMICA Y SE QUIEREN DATOS AGRUPADOS)*/
            AttNameEval: "Type",
            AttNameG1: "Category",
            AttNameG2: "Time",
            AttNameG3: "Stock",            
            EvalValue: "Value",
            /*MAXIMO DE AGRUPACIONES ESTATICAS 3 CON UN VALOR EVALUADO*/
            //Dinamic: true,
            /*DEFINE LA TABLA DINAMICA*/
            AddChart: true,
            /*DEFINE UN GRAFICO DE BARRAS ESTAQUEADO si hay grupos  o es dinamica*/
            //paginate: false,
            Options: {
                Search: true, //UrlSearch
                Show: true,
                Edit: true, //UrlUpdate: "",
                Select: true,
                Add: true, //UrlAdd
                Delete: true,// UrlDelete
                /* UserActions: [{name: "Reservar", Function: (Param)=>{
                     alert("reserva");
                     console.log(Param)
                 }}]*/
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
class DinamicTable {
    constructor() {
        this.type = "div";
        this.children = [];
        this.children.push({
            type: 'h3',
            props: { innerText: "Dinamic Table" },
        })
        this.children.push({
            type: "div",
            props: {
                style: "padding: 10px",
                innerHTML:`
                `
            }
        }
        );
        this.children.push({
            type: 'h3',
            props: { innerText: "3 Group Table" },
        })
        var ConfigG3 = {
            Datasets: Data,
            /*DATOS DE LA TABLA*/
            Colors: ["#ff6699", "#ffbb99", "#adebad"],
            /*COLORES DEFINIDOS PARA EL GRAFICO(SI NO SE DEFINE SE SELECCIONAN DE FORMA DINAMICA)*
            /*MAXIMO DE AGRUPACIONES ESTATICAS 3 CON UN VALOR EVALUADO*/
            Dinamic: true,
            /*DEFINE LA TABLA DINAMICA*/
            //AddChart: true,
            /*DEFINE UN GRAFICO DE BARRAS ESTAQUEADO si hay grupos  o es dinamica*/
            //paginate: false,
            Options: {
                Search: true, //UrlSearch
                Show: true,
                Edit: true, //UrlUpdate: "",
                Select: true,
                Add: true, //UrlAdd
                Delete: true,// UrlDelete
            },
        };

        this.children.push({
            type: "w-table",
            props: {
                id: "table1",
                TableConfig: ConfigG3
            }
        })

        this.children.push({
            type: 'h3',
            props: { innerText: "Dinamic Table" },
        })
        this.children.push({
            type: "div",
            props: {
                style: "padding: 10px",
                innerHTML:`
                `
            }
        }
        );
        this.children.push({
            type: 'h3',
            props: { innerText: "Dinamic Table Chart" },
        })
        var ConfigG3 = {
            Datasets: Data,
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
                Search: true, //UrlSearch
                Show: true,
                Edit: true, //UrlUpdate: "",
                Select: true,
                Add: true, //UrlAdd
                Delete: true,// UrlDelete
            },
        };

        this.children.push({
            type: "w-table",
            props: {
                id: "table2",
                TableConfig: ConfigG3
            }
        })
    }
}

export {DinamicTableDoc}