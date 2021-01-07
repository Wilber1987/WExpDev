import { WRender, DomComponent } from "../WModules/WComponentsTools.js";
import { WCssClass } from "../WModules/WStyledRender.js";
class WAppNavigator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    attributeChangedCallBack() {
        this.DrawAppNavigator();
    }
    connectedCallback() {
        if (this.innerHTML != "") {
            return;
        }
        if (this.id == undefined) {
            const Rand = Math.random();
            this.id = "Menu" + Rand;
        }
        this.DrawAppNavigator();
    }
    DrawAppNavigator() {
        if (this.Elements == undefined) {
            this.Elements = [];
        }
        const Nav = { type: "nav", children: [] };
        this.Elements.forEach((element, Index) => {
            if (element.url == undefined) {
                element.url = "#" + this.id;
            }
            const elementNav = {
                type: "a",
                props: {class: "elementNav", innerText: element.name, href: element.url }
            }
            elementNav.props.onclick = (ev)=>{               
                this.shadowRoot.querySelectorAll(".elementNavActive").forEach(elementNavActive => {
                    elementNavActive.className = "elementNav";
                });
                ev.target.className = "elementNavActive";
                if (element.action != undefined) {
                    element.action(ev);
                }
            }             
            if (element.SubNav != undefined) {
                elementNav.href = null;
                const SubMenuId = "SubMenu" + Index + this.id;
                const SubNav = {
                    type: "nav",
                    props: {
                        id: SubMenuId,
                        innerText: element.name,
                        href: element.url,
                        className: "UnDisplayMenu"
                    },
                    children: []
                }
                if (element.SubNav.Elements != undefined) {
                    element.SubNav.Elements.forEach(SubElement => {
                        SubNav.children.push({
                            type: "a",
                            props: { innerText: SubElement.name, href: SubElement.url }
                        });
                    });
                }
                elementNav.props.onclick = () => {
                    const MenuSelected = this.querySelector("#" + SubMenuId);
                    if (MenuSelected.className == "UnDisplayMenu") {
                        MenuSelected.className == "DisplayMenu"
                    } else {
                        MenuSelected.className == "UnDisplayMenu"
                    }
                }
                Nav.children.push(SubNav);
            }
            Nav.children.push(elementNav);
        });
        this.shadowRoot.append(WRender.createElement(this.Style()));
        this.shadowRoot.append(WRender.createElement(Nav));
    }
    Style() {
        const style = this.querySelector("#NavStyle" + this.id);
        if (style) {
            style.parentNode.removeChild(style);
        }
        let navDirection = "row";
        if (this.Direction == "column") {
            navDirection = "column";
        }
        const Style = {
            type: "w-style",
            props: {
                id: "NavStyle" + this.id,
                ClassList: [
                    new WCssClass(`nav`, {
                        display: "flex",
                        "flex-direction": navDirection,
                        padding: "10px",
                    }), new WCssClass(`.elementNav`, {
                        "text-decoration": "none",
                        color: "#444444",
                        padding: "10px",
                        "border-bottom": "solid 1px #eee",
                        transition: "all 0.6s"
                    }),  new WCssClass(`.elementNavActive`, {                        
                        "text-decoration": "none",
                        color: "#444444",
                        padding: "10px",
                        "border-bottom": "solid 1px #4da6ff",
                        transition: "all 0.6s"
                    }), new WCssClass(`.elementNav:hover`, {
                        "border-bottom": "solid 1px #444444"                     
                    }), 
                    //Estilos de submenu
                    new WCssClass(` UnDisplayMenu`, {
                        overflow: "hidden",
                        "max-height": "0px"
                    }), new WCssClass(` DisplayMenu`, {
                        overflow: "hidden",
                        "max-height": "1000px"
                    }),
                ],
                MediaQuery: [{
                    condicion: "(max-width: 800px)",
                    ClassList: []
                }, ]
            }
        }
        return Style;
    }
}
customElements.define("w-app-navigator", WAppNavigator);