import { WCssClass } from "../WDevCore/WModules/WStyledRender.js";
import { dataTestFact } from '../DATA/data.js'
import { ComponentsManager, WAjaxTools, WRender } from "../WDevCore/WModules/WComponentsTools.js";
import { WTableDynamicComp } from "../WDevCore/WComponents/WTableDynamic.js";

const Data = dataTestFact;
class DinamicTableDoc extends ComponentsManager {
    constructor(props) {
        super();
        this.estado = "div";
        this.props = props;
        this.props.class = "DocCont";
        this.props.style = "padding: 10px";
        console.log("XDFgsdf");
        const NavigateElements = [{
            name: "Group Tables",
            action: () => {
                this.NavigateFunction("GroupTables", new GroupTables(), "ModulesDetail");
            }
        }, {
            name: "Group Tables Chart",
            action: () => {
                this.NavigateFunction("GroupTablesChart", new GroupTablesChart(), "ModulesDetail");
            }
        }, {
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
        this.estado = "div";
        this.children = [];
        this.children.push({
            estado: 'h3',
            props: { innerText: "Group Table" },
        })
        this.children.push({
            estado: "div",
            props: {
                style: "padding: 10px",
                innerHTML: `
                `
            }
        }
        );
        var ConfigG1 = {
            Dataset: Data,
            /*DATOS DE LA TABLA*/
            //Colors: ["#ff6699", "#ffbb99", "#adebad"],
            /*COLORES DEFINIDOS PARA EL GRAFICO(SI NO SE DEFINE SE SELECCIONAN DE FORMA DINAMICA)*/
            /*PARAMETROS DE EVALUACION SOLO SI NO ES DINAMICA Y SE QUIEREN DATOS AGRUPADOS)*/
            AttNameEval: "empresa",
            EvalValue: "total",
            groupParams: ["año"],
            DisplayOptions: true,
            /*MAXIMO DE AGRUPACIONES ESTATICAS 3 CON UN VALOR EVALUADO*/
            //Dinamic: true,
            /*DEFINE LA TABLA DINAMICA*/
            //AddChart: true,
            /*DEFINE UN GRAFICO DE BARRAS ESTAQUEADO si hay grupos  o es dinamica*/
        };

        this.children.push(new WTableDynamicComp(ConfigG1));
        this.children.push({
            estado: 'h3',
            props: { innerText: "Double Group Table" },
        })
        var ConfigG2 = {
            Dataset: Data,
            /*DATOS DE LA TABLA*/
            Colors: ["#ff6699", "#ffbb99", "#adebad"],
            /*COLORES DEFINIDOS PARA EL GRAFICO(SI NO SE DEFINE SE SELECCIONAN DE FORMA DINAMICA)*/
            /*PARAMETROS DE EVALUACION SOLO SI NO ES DINAMICA Y SE QUIEREN DATOS AGRUPADOS)*/
            
            AttNameEval: "empresa",
            //AttNameG3: "categ",            
            EvalValue: "total",
            groupParams: ["año"],
            DisplayOptions: true,
            /*MAXIMO DE AGRUPACIONES ESTATICAS 3 CON UN VALOR EVALUADO*/
            //Dinamic: true,
            /*DEFINE LA TABLA DINAMICA*/
            //AddChart: true,
            /*DEFINE UN GRAFICO DE BARRAS ESTAQUEADO si hay grupos  o es dinamica*/
        };
        this.children.push(new WTableDynamicComp(ConfigG2));
        this.children.push({
            estado: 'h3',
            props: { innerText: "3 Group Table" },
        })
        var ConfigG3 = {
            Dataset: Data,
            /*DATOS DE LA TABLA*/
            Colors: ["#ff6699", "#ffbb99", "#adebad"],
            /*COLORES DEFINIDOS PARA EL GRAFICO(SI NO SE DEFINE SE SELECCIONAN DE FORMA DINAMICA)*/
            /*PARAMETROS DE EVALUACION SOLO SI NO ES DINAMICA Y SE QUIEREN DATOS AGRUPADOS)*/
            
            EvalValue: "total",
            groupParams: ["año"],
            DisplayOptions: true,
            /*MAXIMO DE AGRUPACIONES ESTATICAS 3 CON UN VALOR EVALUADO*/
            //Dinamic: true,
            /*DEFINE LA TABLA DINAMICA*/
            //AddChart: true,
            /*DEFINE UN GRAFICO DE BARRAS ESTAQUEADO si hay grupos  o es dinamica*/
        };
        this.children.push(new WTableDynamicComp(ConfigG3));
    }
}
class GroupTablesChart {
    constructor() {
        this.estado = "div";
        this.children = [];
        this.children.push({
            estado: 'h3',
            props: { innerText: "Group Table" },
        })
        this.children.push({
            estado: "div",
            props: {
                style: "padding: 10px",
                innerHTML: `
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
            
            AttNameEval: "empresa",
            EvalValue: "total",
            groupParams: ["año"],
            DisplayOptions: true,
            /*MAXIMO DE AGRUPACIONES ESTATICAS 3 CON UN VALOR EVALUADO*/
            //Dinamic: true,
            /*DEFINE LA TABLA DINAMICA*/
            AddChart: true,
            /*DEFINE UN GRAFICO DE BARRAS ESTAQUEADO si hay grupos  o es dinamica*/
        };

        this.children.push(new WTableDynamicComp(ConfigG1));
        this.children.push({
            estado: 'h3',
            props: { innerText: "Double Group Table" },
        })
        var ConfigG2 = {
            Dataset: Data,
            /*DATOS DE LA TABLA*/
            Colors: ["#ff6699", "#ffbb99", "#adebad"],
            /*COLORES DEFINIDOS PARA EL GRAFICO(SI NO SE DEFINE SE SELECCIONAN DE FORMA DINAMICA)*/
            /*PARAMETROS DE EVALUACION SOLO SI NO ES DINAMICA Y SE QUIEREN DATOS AGRUPADOS)*/
            
            AttNameEval: "empresa",
            AttNameG2: "Time",
            //AttNameG3: "categ",            
            EvalValue: "total",
            groupParams: ["año"],
            DisplayOptions: true,
            /*MAXIMO DE AGRUPACIONES ESTATICAS 3 CON UN VALOR EVALUADO*/
            //Dinamic: true,
            /*DEFINE LA TABLA DINAMICA*/
            AddChart: true,
            /*DEFINE UN GRAFICO DE BARRAS ESTAQUEADO si hay grupos  o es dinamica*/
        };

        this.children.push(new WTableDynamicComp(ConfigG2));
        this.children.push({
            estado: 'h3',
            props: { innerText: "3 Group Table" },
        })
        var ConfigG3 = {
            Dataset: Data,
            /*DATOS DE LA TABLA*/
            Colors: ["#ff6699", "#ffbb99", "#adebad"],
            /*COLORES DEFINIDOS PARA EL GRAFICO(SI NO SE DEFINE SE SELECCIONAN DE FORMA DINAMICA)*/
            /*PARAMETROS DE EVALUACION SOLO SI NO ES DINAMICA Y SE QUIEREN DATOS AGRUPADOS)*/
            
            EvalValue: "total",
            groupParams: ["año"],
            DisplayOptions: true,
            /*MAXIMO DE AGRUPACIONES ESTATICAS 3 CON UN VALOR EVALUADO*/
            //Dinamic: true,
            /*DEFINE LA TABLA DINAMICA*/
            AddChart: true,
            /*DEFINE UN GRAFICO DE BARRAS ESTAQUEADO si hay grupos  o es dinamica*/
        };

        this.children.push(new WTableDynamicComp(ConfigG3));
    }
}
class DinamicTable {
    constructor() {
        this.estado = "div";
        this.children = [];
        this.children.push({
            estado: 'h3',
            props: { innerText: "Dinamic Table" },
        })
        this.children.push({
            estado: "div",
            props: {
                style: "padding: 10px",
                innerHTML: `
                `
            }
        }
        );
        this.children.push({
            estado: 'h3',
            props: { innerText: "3 Group Table" },
        })
        var ConfigG1 = {
            Dataset: Data,
            /*DATOS DE LA TABLA*/
            Colors: ["#ff6699", "#ffbb99", "#adebad"],
            /*COLORES DEFINIDOS PARA EL GRAFICO(SI NO SE DEFINE SE SELECCIONAN DE FORMA DINAMICA)*
            /*MAXIMO DE AGRUPACIONES ESTATICAS 3 CON UN VALOR EVALUADO*/
            Dinamic: true,
            /*DEFINE LA TABLA DINAMICA*/
            //AddChart: true,
            /*DEFINE UN GRAFICO DE BARRAS ESTAQUEADO si hay grupos  o es dinamica*/
        };

        this.children.push(new WTableDynamicComp(ConfigG1));
        this.children.push({
            estado: 'h3',
            props: { innerText: "Dinamic Table" },
        })
        this.children.push({
            estado: "div",
            props: {
                style: "padding: 10px",
                innerHTML: `
                `
            }
        }
        );
        this.children.push({
            estado: 'h3',
            props: { innerText: "Dinamic Table Chart" },
        })
        var ConfigG2 = {
            Dataset: Data,
            /*DATOS DE LA TABLA*/
            Colors: ["#ff6699", "#ffbb99", "#adebad"],
            /*COLORES DEFINIDOS PARA EL GRAFICO(SI NO SE DEFINE SE SELECCIONAN DE FORMA DINAMICA)*
            /*MAXIMO DE AGRUPACIONES ESTATICAS 3 CON UN VALOR EVALUADO*/
            Dinamic: true,
            /*DEFINE LA TABLA DINAMICA*/
            AddChart: true,
            /*DEFINE UN GRAFICO DE BARRAS ESTAQUEADO si hay grupos  o es dinamica*/
        };

        this.children.push(new WTableDynamicComp(ConfigG2));
    }
}

export { DinamicTableDoc }