import { ComponentsManager, WAjaxTools, WRender } from "./WDevCore/WModules/WComponentsTools.js";
import { WCssClass } from "./WDevCore/WModules/WStyledRender.js";

import DocumentView from "./Modules/DocumentView.js";
//REPORTS 
import { dataTestFact } from './DATA/data.js'
//COMPONENTS
import { } from "./WDevCore/WComponents/WAppNavigator.JS";
import { WTableDynamicComp } from "./WDevCore/WComponents/WTableDynamic.js";
import { WTableComponent } from "./WDevCore/WComponents/WTableComponent.js";
import { WCardCarousel } from "./WDevCore/WComponents/WCardCarousel.JS";
import { ColumChart } from "./WDevCore/WComponents/WChartJSComponents.js";
//DOCUMENTACION
import { WTestView } from "./WDevCore/WComponents/TestView.js";
//import { BasicTableDoc } from "./Modules/BasicTableDoc.js";
//import { DinamicTableDoc } from "./Modules/DinamicTableDoc.js";
//import { SlideDoc } from "./Modules/SlideDoc.js";
//import { ChartDocs } from "./Modules/ChartDocs.js";
//COMPONENTES ESPECIFICOS
import { CMComponent } from "./Views/CMComponent.js";

const DOMManager = new ComponentsManager();

class MasterDomClass extends ComponentsManager {
    constructor() {
        super();
        this.props = { className: "App" }
        this.children = [
            new headerClass(),
            new AsideClass(),
            new MainClass(),
            new FooterClass(),
            this.MasterStyle
        ];
    }
    MasterStyle = {
        type: "w-style",
        props: {
            ClassList: [
                new WCssClass(".App", {
                    display: "grid",
                    "grid-template-columns": "250px calc(100% - 250px)",
                    "grid-template-rows": "70px calc(100vh - 120px) 50px"
                }), new WCssClass(".AppHeader", {
                    "grid-column": "1/3",
                    "background-color": "#eee",
                    "border-bottom": "solid #4da6ff 10px"
                }), new WCssClass(".AppAside", {
                    "border-right": "solid #999999 1px"
                }), new WCssClass(".AppMain", {
                    overflow: "auto",
                    display: "block",
                    "grid-column": "2/3",
                }), new WCssClass(".AppFooter", {
                    "grid-column": "1/3",
                    "background-color": "#eee",
                    "border-top": "solid #4da6ff 5px"
                }), new WCssClass("body", {
                    padding: "0px",
                    margin: "0px",
                    "font-family": "Arial, Helvetica, sans-serif"
                }),
            ], MediaQuery: [{
                condicion: "(max-width: 900px)",
                ClassList: [
                    new WCssClass(`.App`, {
                        display: "grid",
                        "grid-template-columns": "0px calc(100% - 0px)",
                        "grid-template-rows": "70px calc(100vh - 120px) 50px"
                    }), new WCssClass(".AppAside", {
                        overflow: "hidden"
                    }),
                ]
            }, {
                condicion: "(max-width: 600px)",
                ClassList: [
                    new WCssClass(`.App`, {
                        display: "grid",
                        "grid-template-columns": "100%",
                        "grid-template-rows": "70px auto calc(100vh - 120px) 50px"
                    }), new WCssClass(".AppHeader", {
                        "grid-column": "1/auto",
                        "background-color": "#eee",
                        "border-bottom": "solid #4da6ff 10px",
                    }), new WCssClass(".AppFooter", {
                        "grid-column": "1/auto",
                        "background-color": "#eee",
                        "border-top": "solid #4da6ff 5px"
                    }),
                ]
            }]
        }
    };
}
class headerClass {
    constructor() {
        this.type = "header";
        this.props = { className: "AppHeader" }
        this.children = [
            this.Style,
            { type: 'img', props: { src: "./Media/logo.png" } },
        ];
    }
    Style = {
        type: "w-style",
        props: {
            ClassList: [
                new WCssClass(".AppHeader", {
                    display: "flex",
                    "justify-content": "right",
                    "align-items": "center",
                    padding: "0px 40px"
                }), new WCssClass(".AppHeader img", {
                    display: "block",
                    height: "100%"
                }),
            ]
        }
    };
}
class AsideClass {
    constructor() {
        this.type = "aside";
        this.props = { className: "AppAside" }
        this.children = [this.#WNav, this.WNavComponents];
    }
    #WNav = {
        type: "w-app-navigator",
        props: {
            Direction: "column", id: "AppNav",
            title: "Documentación",
            Elements: [
                {
                    name: "Inicio", url: "#",
                    action: (ev) => { this.Navigate("Inicio", "1_WExpDev_intro.pdf", "Inicio") }
                }, {
                    name: "Estructrura del Proyecto", url: "#",
                    action: (ev) => { this.Navigate("Estructura", "2_WExpDev_estructura.pdf", "Title") }
                }, {
                    name: "WebComponents", url: "#",
                    action: (ev) => { this.Navigate("WebComponents", "3_WExpDev_webcomponents.pdf", "Title") }
                }, {
                    name: "Renderizado Estructurado", url: "#",
                    action: (ev) => { this.Navigate("Renderizado", "4_WExpDev_renderizadoestructurado.pdf", "Title") }
                }, {
                    name: "ES6 Modules", url: "#",
                    action: (ev) => { this.Navigate("ES6", "5_WExpDev_es6modules.pdf", "Title") }
                }, {
                    name: "CSS in JS", url: "#",
                    action: (ev) => { this.Navigate("css_in_js", "6_WExpDev_css_js.pdf", "Title") }
                }, {
                    name: "Peticiones con FETCH", url: "#",
                    action: (ev) => { this.Navigate("fetch", "7_WExpDev_peticionesAjax.pdf", "Title") }
                }, {
                    name: "Interfaces dinámicas OPA", url: "#",
                    action: (ev) => { this.Navigate("opa", "8_WExpDev_opApp.pdf", "Title") }
                },
            ]
        }
    }
    Navigate = async (name = "Intro", pdf, title) => {
        const DocURL = "./Media/DOCS/" + pdf;
        const PDF2 = WRender.createElement({
            type: "object", props: {
                type: "application/pdf",
                data: DocURL
            }
        });
        const iframe = WRender.createElement({
            type: "iframe", props: {
                src: DocURL
            }
        });
        //console.log(PDF2.data)
        //let blob = await fetch(DocURL).then(r => r.blob());
        //console.log(blob)
        //this.convertToBase64(blob);
        DOMManager.NavigateFunction(name, new DocumentView({ id: name }, PDF2, title), "AppMain");
    }
    convertToBase64(PDF) {
        var fileToLoad = PDF;
        // FileReader function for read the file.
        var fileReader = new FileReader();
        var base64;
        // Onload of file read the file content
        fileReader.onload = function (fileLoadedEvent) {
            base64 = fileLoadedEvent.target.result;
            // Print data in console
            console.log(base64);
        };
        // Convert data to base64
        fileReader.readAsDataURL(fileToLoad);
    }
    //NAV COMPONENTS
    //NAV TABLES
    WNavTables = [{
        name: "Tablas Básica", url: "#",
        action: (ev) => {
            DOMManager.NavigateFunction("BasicTables", new BasicTableDoc({ id: "BasicTables" }), "AppMain");
        }
    }, {
        name: "Tablas Dinámica", url: "#",
        action: (ev) => {
            DOMManager.NavigateFunction("DinamicTableDoc", new DinamicTableDoc({ id: "DinamicTableDoc" }), "AppMain");
        }
    }];

    WNavComponents = {
        type: "w-app-navigator",
        props: {
            Direction: "column",
            title: "Componentes",
            Elements: [{
                name: "Modal / POP-UP", url: "#", action: async (ev) => {
                    const { ModalDocs } = await import("./Modules/ModalDoc.js");
                    DOMManager.NavigateFunction("ModalDocs", new ModalDocs({ id: "ModalDocs" }), "AppMain");
                }
            }, {
                name: "Tablas", url: "#", SubNav: {
                    Elements: this.WNavTables
                }
            }, {
                name: "Chart", url: "#", action: async (ev) => {
                    DOMManager.NavigateFunction("ChartDocs", new ChartDocs({ id: "ChartDocs" }), "AppMain");
                }
            }, {
                name: "Slide", url: "#", action: async (ev) => {
                    DOMManager.NavigateFunction("SlideDoc", new SlideDoc({ id: "SlideDoc" }), "AppMain");
                }
            }, {
                name: "LineChart", url: "#", action: async (ev) => {
                    DOMManager.NavigateFunction("SlideDoc", new ColumChart({
                        Dataset: dataTestFact, 
                        Colors: ["#ff6699", "#ffbb99", "#adebad"],
                        TypeChart: "Line",
                        ColumnLabelDisplay: 0,
                        AttNameEval: "empresa",
                        EvalValue: "total",
                        groupParams: ["mes"]
                    }), "AppMain");
                }
            },]
        }
    }
}
class MainClass {
    constructor() {
        this.type = "main";
        this.props = { className: "AppMain", id: "AppMain" }
        this.children = [
            //new CMComponent(),
            //COLUMN CHART LINEAL
           /*  new ColumChart({
                Dataset: dataTestFact, 
                Colors: ["#ff6699", "#ffbb99", "#adebad"],
                TypeChart: "Line",
                ColumnLabelDisplay: 0,
                AttNameEval: "empresa",
                EvalValue: "total",
                groupParams: ["mes"]
            }) */
            //TEST
            //new WTestView()
            // new WTestView({
            //     Title: "TEST",
            //     Descripcion: "Desc",
            //     GeneralResp: ["SI", "NO"],
            //     //Type: "Modal",
            //     //AllRequire: false,
            //     Questions: [ {
            //         Id: 1, Descripcion: "Name", Value: null,
            //         QuestionType: "Open"
            //     },{
            //             Id: 2, Descripcion: "desc 1", Value: null,
            //             QuestionType: "MultiSelect",
            //         }, {
            //             Id: 3, Descripcion: "desc 1", Value: null,
            //             QuestionType: "MultiSelect",
            //             Resps: [
            //                 { id: 1, desc: "SI", value: "SI" },
            //                 { id: 2, desc: "NO", value: "NO" },
            //                 { id: 3, desc: "N/A", value: "N/A" }
            //             ]
            //         }, {
            //             Id: 4, Descripcion: "desc 1", Value: null,
            //             QuestionType: "Likert/Category",
            //             Resps: [
            //                 { id: 1, desc: "SI", value: "SI" },
            //                 { id: 2, desc: "NO", value: "NO" },
            //                 { id: 3, desc: "N/A", value: "N/A" }
            //             ]
            //         },{
            //             Id: 1, Descripcion: "Number", Value: null,
            //             QuestionType: "Number"
            //         },
            //     ]
            // })
            //TABLA BASICA
            // new WTableComponent({
            //     Dataset: dataTestFact,
            //     DisplayData: ["servicio", "empresa", "tipo", "metodo_pago", "total"],
            //     maxElementByPage: 5,
            //     paginate: true,
            //     //ModelObject: {"servicio":"", "empresa":"", "tipo":"", "metodo_pago":"", "total": 0},
            //     Options: {
            //         Search: true,  UrlSearch:"api_route",
            //         Add: true, UrlAdd: "api_route",                    
            //         Edit: true, UrlUpdate: "api_route",                    
            //         Delete: true, UrlDelete: "api_route",
            //         Show: true, 
            //         Select: true,
            //         UserActions: [{ name: "Log...", Function: (TableElement) => { console.log(TableElement); } }]
            //     }
            // }),
            //TABLA DINAMICA
            // new WTableDynamicComp({ 
            //     Dataset: dataTestFact,
            //     EvalValue: "total",
            //     AttNameEval: "mes",
            //     groupParams: ["cuarto","año"],
            //     //DisplayFilts: [],//filtros
            //     //ParamsForOptions: ["cuarto"]//parametros de agrupacion
            // }), 
            // CARROSEL DE IMAGENES
            //new WCardCarousel(dataTestFact)
            //Chart


        ];
    }
}
class FooterClass {
    constructor() {
        this.type = "footer";
        this.props = { className: "AppFooter" }
        this.children = [this.Style,
        { type: 'label', props: { innerText: "Derechos reservados - " } },
        {
            type: 'a', props: {
                innerText: "- https://github.com/Wilber1987/WExpDev.git",
                href: "https://github.com/Wilber1987/WExpDev.git", target: "_blank"
            }
        }
        ];
    }
    Style = {
        type: "w-style",
        props: {
            ClassList: [
                new WCssClass(".AppFooter", {
                    display: "flex",
                    "justify-content": "center",
                    "align-items": "center",
                })
            ]
        }
    };
}
class MyNavigator extends ComponentsManager {
    constructor(props) {
        super();
        this.props = props;
    }
    type = "div";
    children = [{
        type: "ul",
        children: [{
            type: "li",
            props: {
                onclick: () => {
                    this._DispalNav("MyLateralNav", "SlideLeft");
                }
            },
            children: [{ type: "a", props: { href: "#" }, children: ["Perfil"] }]
        },
        {
            type: "li",
            props: {
                onclick: () => {
                    this._DispalNav("MyLateralNav", "SlideLeft");
                }
            },
            children: [{ type: "a", props: { href: "#" }, children: ["Notificaciones"] }]
        },
        {
            type: "li",
            props: {
                onclick: () => {
                    this._DispalNav("MyLateralNav", "SlideLeft");
                }
            },
            children: [{ type: "a", props: { href: "#" }, children: ["Mensajes"] }]
        },
        {
            type: "li",
            props: {
                onclick: () => {
                    this._DispalNav("MyLateralNav", "SlideLeft");
                }
            },
            children: [{ type: "a", props: { href: "#" }, children: ["Cerrar Sesión"] }]
        },
        ]
    }];
}
class FooterNavigator extends ComponentsManager {
    constructor(props) {
        super();
        this.props = props;
    }
    type = "div";
    children = [{
        type: "ul",
        children: [{
            type: "li",
            props: {
                onclick: async () => {
                    const { Modules } = await
                        import("./Modules/Modules.js");
                    this.NavigateFunction("Modules", new Modules({ class: "DivContainer", id: "Modules", Foros: Foros }));
                }
            },
            children: [{
                type: "button",
                props: {
                    type: "button",
                    style: `background: url('./Media/icons/modules2.png') no-repeat;background-size: 100% 100%;`
                }
            }]
        },
        {
            type: "li",
            props: {
                onclick: async () => {
                    const { ForosView } = await
                        import("./Modules/ForosView.js");
                    let MyModules = await WAjaxTools.PostRequest("http://localhost:6601/" + 'api/User/PostTakeUsers', { IdUsers: 1 });
                    // let OModules = await WAjaxTools.PostRequest("http://localhost:6601/" + 'api/module/PostModules', { IdUsers: 1 });
                    this.NavigateFunction("ForosView", new ForosView({
                        class: "DivContainer DivSection", id: "ForosView", Users: MyModules
                    }));
                }
            },
            children: [{
                type: "button",
                props: {
                    type: "button",
                    style: `background: url('./Media/icons/foro2.png') no-repeat;background-size: 100% 100%;`
                }
            }]
        },
        {
            type: "li",
            props: {
                onclick: async () => {
                    const { ReportView } = await
                        import("./Modules/ReportView.js");
                    this.NavigateFunction("ReportView", new ReportView({ class: "DivContainer DivSection", id: "ReportView" }));
                }
            },
            children: [{
                type: "button",
                props: {
                    type: "button",
                    style: `background: url('./Media/icons/bar.png') no-repeat;background-size: 100% 100%;`
                }
            }]
        }
        ]
    }];
}
export { MasterDomClass };