import { DomComponent, WAjaxTools } from "./WDevCore/WModules/WComponentsTools.js";
import { WCssClass } from "./WDevCore/WModules/WStyledRender.js";
import { Modules } from "./Modules/Modules.js";

class MasterDomClass extends DomComponent {
    constructor() {
        super();
        this.props = { className: "App" }   
        this.children = [ new headerClass(),new AsideClass(), new MainClass(), new FooterClass(), MasterStyle]
    }
}
class headerClass {
    constructor() {
        this.type = "header";
        this.props = { className : "AppHeader"}
        this.children = [{ type: 'label', props: { innerText: "WExpDev" } }];
    }    
}
class AsideClass {
    constructor() {
        this.type = "header";
        this.props = { className : "AppAside"}
        this.children = [{ type: 'label', props: { innerText: "WExpDev" } }];
    }    
}
class MainClass {
    constructor() {
        this.type = "header";
        this.props = { className : "AppMain", id: "AppMain"}
        this.children = [{ type: 'label', props: { innerText: "WExpDev" } }];
    }    
}
class FooterClass {
    constructor() {
        this.type = "header";
        this.props = { className : "AppFooter"}
        this.children = [{ type: 'label', props: { innerText: "WExpDev" } }];
    }    
}
const MasterStyle = {
    type: "w-style",
    props:{
        ClassList: [
            new WCssClass(".App", {
                display: "grid",
                "grid-template-columns": "200px calc(100% - 200px)",
                "grid-template-rows": "70px calc(100vh - 120px) 50px"
            }), new WCssClass(".AppHeader", {
                "grid-column": "1/3", "background-color": "#eee"
            }),
        ]
    }
};
class MyNavigator extends DomComponent {
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
class FooterNavigator extends DomComponent {
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
                    onclick: async() => {
                        const { Modules } = await
                        import ("./Modules/Modules.js");
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
                    onclick: async() => {
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
                    onclick: async() => {
                        const { ReportView } = await
                        import ("./Modules/ReportView.js");
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