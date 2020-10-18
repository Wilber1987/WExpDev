import { DomComponent } from "./WDevCore/WModules/WComponentsTools.js";
import { Modules } from "./Modules/Modules.js";
const Foros = [{
    title: "Foro de prueba 1",
    date: "2020-01-01"
}, {
    title: "Foro de prueba 2",
    date: "2020-01-01"
}, {
    title: "Foro de prueba 3",
    date: "2020-01-01"
}];
class MasterDomClass extends DomComponent {
    constructor() {
        super();
        this.MainComponent = new Modules({ class: "DivContainer", id: "Modules", Foros: Foros });
        this.header = new headerClass();
        this.children = [
            this.header,
            {
                type: 'nav',
                props: { id: "NavContainer", class: "Menu" },
                children: [new MyNavigator({ class: "MyNav", id: "MyLateralNav", style: "opacity: 0; pointer-events: none" })]
            },
            {
                type: 'main',
                children: [{
                        type: 'section',
                        props: { id: "ContainerNavigate" },
                        children: [this.MainComponent]
                    },
                    { type: 'section', props: { id: "Container" } }
                ]
            },
            new FooterNavigator({
                class: "FooterNav",
                id: "FooterNav",
                style: ""
            })
        ]
    }
}
class headerClass extends DomComponent {
    constructor() {
        super();
        this.type = "header";
        this.props.class = "";
    }
    children = [{
        type: 'button',
        props: {
            id: "ViewMenu",
            type: "button",
            class: "btnMenu",
            onclick: () => {
                this._DispalNav("MyLateralNav", "SlideLeft")
            }
        },
        children: ['']
    }, { type: 'label', props: { innerText: "My Inclusive APP" } }];

}
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
                        import ("./Modules/ForosView.js");
                        this.NavigateFunction("ForosView", new ForosView({ class: "DivContainer DivSection", id: "ForosView" }));
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