import { WRender } from "../WModules/WComponentsTools.js";
import { WCssClass } from "../WModules/WStyledRender.js";
class WRichText extends HTMLElement {
    constructor() {
        super();
        this.value = "";
    }
    attributeChangedCallBack() {
        this.DrawSlide();
    }
    connectedCallback() {
        if (this.innerHTML != "") {
            return;
        }
        this.DrawComponent();
    }
    DrawComponent = async() => {
        this.append(WRender.createElement(WRichTextStyle))
        this.DrawOptions();
        this.append(WRender.createElement({
            type: "div",
            props: { contentEditable: true, class: "WREditor" },
            events: {
                input: () => {
                    this.value = this.querySelector(".WREditor").innerHTML;
                }
            },
            children: []
        }));
    }
    DrawOptions() {
        const OptionsSection = {
            type: "section",
            props: { class: "WOptionsSection" },
            children: []
        }
        OptionsSection.children.push({
            type: "button",
            props: {
                type: "button",
                class: "ROption",
                innerText: "B",
                onclick: () => {
                    console.log("clixk")
                    document.execCommand("bold");
                }
            }
        })
        OptionsSection.children.push({
            type: "button",
            props: {
                type: "button",
                class: "ROption",
                innerText: "B",
                onclick: () => {
                    document.execCommand("bold");
                }
            }
        })
        this.append(WRender.createElement(OptionsSection));
    }
}

const WRichTextStyle = {
    type: "w-style",
    props: {
        ClassList: [
            new WCssClass("w-rich-text .WREditor", {
                height: "200px",
                border: "solid 1px #000",
                display: "block",
                margin: 0,
                padding: "10px"
            }),
            new WCssClass("w-rich-text .WOptionsSection", {
                height: "50px",
                border: "solid 1px #000",
                display: "block",
                margin: 0
            }),
            new WCssClass("w-rich-text .ROption", {
                border: "solid 1px #000",
                padding: "5px",
                margin: "5px"
            }),
        ]
    }
}
customElements.define("w-rich-text", WRichText);