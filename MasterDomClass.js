import { ComponentsManager, WAjaxTools, WRender } from "./WDevCore/WModules/WComponentsTools.js";
import { WCssClass } from "./WDevCore/WModules/WStyledRender.js";
import { BasicTableDoc } from "./Modules/BasicTableDoc.js";
import { DinamicTableDoc } from "./Modules/DinamicTableDoc.js";
import { SlideDoc } from "./Modules/SlideDoc.js";
import { ChartDocs } from "./Modules/ChartDocs.js";
import DocumentView from "./Modules/DocumentView.js";
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
                    overflow: "auto"
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
            }
            ]
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
                    action: (ev) => { this.Navigate("Inicio", "1_WExpDev_intro.pdf", ev.target.innerText) }
                }, {
                    name: "Estructrura del Proyecto", url: "#",
                    action: (ev) => { this.Navigate("Estructura", "2_WExpDev_estructura.pdf", ev.target.innerText) }
                }, {
                    name: "WebComponents", url: "#",
                    action: (ev) => { this.Navigate("WebComponents", "3_WExpDev_webcomponents.pdf", ev.target.innerText) }
                }, {
                    name: "Renderizado Estructurado", url: "#",
                    action: (ev) => { this.Navigate("Renderizado", "4_WExpDev_renderizadoestructurado.pdf", ev.target.innerText) }
                }, {
                    name: "ES6 Modules", url: "#",
                    action: (ev) => { this.Navigate("ES6", "5_WExpDev_es6modules.pdf", ev.target.innerText) }
                }, {
                    name: "CSS in JS", url: "#",
                    action: (ev) => { this.Navigate("css_in_js", "6_WExpDev_css_js.pdf", ev.target.innerText) }
                }, {
                    name: "Peticiones con FETCH", url: "#",
                    action: (ev) => { this.Navigate("fetch", "7_WExpDev_peticionesAjax.pdf", ev.target.innerText) }
                }, {
                    name: "Interfaces dinámicas OPA", url: "#",
                    action: (ev) => { this.Navigate("opa", "8_WExpDev_opApp.pdf", ev.target.innerText) }
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
                name: "Modal / POP-UP", url: "#", action: async (ev)=>{
                    const {ModalDocs}  = await import("./Modules/ModalDoc.js"); 
                    DOMManager.NavigateFunction("ModalDocs", new ModalDocs({ id: "ModalDocs" }), "AppMain");       
                }
            }, {
                name: "Tablas", url: "#", SubNav: {
                    Elements: this.WNavTables
                }
            },{
                name: "Chart", url: "#", action: async (ev)=>{
                    DOMManager.NavigateFunction("ChartDocs", new ChartDocs({ id: "ChartDocs" }), "AppMain");       
                }
            },{
                name: "Slide", url: "#", action: async (ev)=>{
                    DOMManager.NavigateFunction("SlideDoc", new SlideDoc({ id: "SlideDoc" }), "AppMain");       
                }
            },]
        }
    }
}
class MainClass {
    constructor() {
        this.type = "main";
        this.props = { className: "AppMain", id: "AppMain" }
        this.children = [];
    }
}
class FooterClass {
    constructor() {
        this.type = "footer";
        this.props = { className: "AppFooter" }
        this.children = [this.Style, 
            {  type: 'label', props: { innerText: "Derechos reservados - " } },
            {  type: 'a', props: { 
                innerText: "- https://github.com/Wilber1987/WExpDev.git", 
                href: "https://github.com/Wilber1987/WExpDev.git", target: "_blank"
            }}
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