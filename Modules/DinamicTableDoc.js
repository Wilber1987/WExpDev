import { WCssClass } from "../WDevCore/WModules/WStyledRender.js";
import "../WDevCore/WDeprecateComponents/WTableComponents.js";
import "../WDevCore/WComponents/WAppNavigator.js";
import { dataTestFact } from '../DATA/data.js'
import { ComponentsManager, WAjaxTools, WRender } from "../WDevCore/WModules/WComponentsTools.js";

const Data = dataTestFact;
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
            Dataset: Data,
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
            Dataset: Data,
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
            Dataset: Data,
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
            Dataset: Data,
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
            Dataset: Data,
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
            Dataset: Data,
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
            Dataset: Data,
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
            Dataset: Data,
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