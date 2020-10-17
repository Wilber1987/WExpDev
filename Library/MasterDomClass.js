import { DomComponent } from "./WDevCore/WModules/WComponentsTools.js"

class MasterDomClass extends DomComponent {
    constructor() {
        super();
        this.MainComponent = "Contenedor primario"; //new Modules({id:"Modules", class:"DivContainer", modules: this.modules});
        this.header = new headerClass();
        this.footer = new footerClass();
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
            this.footer,
        ]
    }
}
class footerClass extends DomComponent {
    constructor(props) {
        super();
        if (props) {
            this.props = props;
        } else {
            this.type = "footer";
            this.props.class = "myFooter";
        }
    }
    children = [
        { type: 'label', children: ["Contactenos"] },
        { type: 'label', children: ["- 8807-8386"] }
    ];
}
class headerClass extends DomComponent {
    constructor() {
        super();
        this.type = "header";
        this.props.class = "";
    }
    SecurityNavigator = new SecurityNavigator({
        class: "LoginNav",
        id: "LoginNav",
        style: "opacity: 0; pointer-events: none;"
    });
    children = [{
            type: 'button',
            props: {
                id: "ViewMenu",
                type: "button",
                onclick: () => {
                    this._DispalNav("MyLateralNav", "SlideLeft")
                }
            },
            children: ['Nav']
        }, {
            type: 'button',
            props: {
                id: "LoginBtn",
                class: "LoginBtn",
                type: "button",
                onclick: () => {
                    this._DispalNav("LoginNav", "SlideRight")
                }
            },
            children: ['Login']
        },
        this.SecurityNavigator
    ];

}
class MyNavigator extends DomComponent {
    constructor(props) {
        super();
        this.props = props;
        this.NavForm = [];
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
                children: [{ type: "a", props: { href: "#" }, children: ["Modulos"] }]
            },
            {
                type: "li",
                props: {
                    onclick: () => {
                        this._DispalNav("MyLateralNav", "SlideLeft");
                    }
                },
                children: [{ type: "a", props: { href: "#" }, children: ["Bar Report"] }]
            },
            {
                type: "li",
                props: {
                    onclick: () => {
                        this._DispalNav("MyLateralNav", "SlideLeft");
                    }
                },
                children: [{ type: "a", props: { href: "#" }, children: ["Radial Report"] }]
            },
            {
                type: "li",
                props: {
                    onclick: () => {
                        this._DispalNav("MyLateralNav", "SlideLeft");
                    }
                },
                children: [{ type: "a", props: { href: "#" }, children: ["MultiSelect"] }]
            },
        ]
    }];
}
class SecurityNavigator extends DomComponent {
    constructor(props) {
        super();
        this.props = props;
        this.NavForm = [];
    }
    type = "div";
    children = [{
        type: "ul",
        children: [{
                type: "li",
                props: {
                    onclick: () => {
                        this._DispalNav("LoginNav", "SlideRight")
                    }
                },
                children: ["Login"]
            },
            {
                type: "li",
                props: {
                    onclick: () => {
                        this._DispalNav("LoginNav", "SlideRight")
                    }
                },
                children: ["Register"]
            },
            {
                type: "li",
                props: {
                    onclick: () => {
                        console.log("navegando");
                        this._DispalNav("LoginNav", "SlideRight")
                    }
                },
                children: ["Perfil"]
            },
            {
                type: "li",
                props: {
                    onclick: () => {
                        console.log("navegando");
                        this._DispalNav("LoginNav", "SlideRight")
                    }
                },
                children: ["Logout"]
            },
        ]
    }];
}
export { MasterDomClass };