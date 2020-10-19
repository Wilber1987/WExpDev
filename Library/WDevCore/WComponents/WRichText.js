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
        this.Commands.forEach(command => {
            OptionsSection.children.push({
                type: "button",
                props: {
                    type: "button",
                    class: "ROption",
                    innerText: command.commandName,
                    onclick: () => {
                        document.execCommand(command.commandName);
                    }
                }
            })
        });
        this.append(WRender.createElement(OptionsSection));
    }
    Commands = [
        { commandName: "backColor", icon: "", type: "button", commandOptions: null },
        { commandName: "bold", icon: "", type: "button", commandOptions: null },
        { commandName: "createLink", icon: "", type: "button", commandOptions: null },
        { commandName: "copy", icon: "", type: "button", commandOptions: null },
        { commandName: "cut", icon: "", type: "button", commandOptions: null },
        { commandName: "defaultParagraphSeparator", icon: "", type: "button", commandOptions: null },
        { commandName: "delete", icon: "", type: "button", commandOptions: null },
        { commandName: "fontName", icon: "", type: "button", commandOptions: null },
        { commandName: "fontSize", icon: "", type: "button", commandOptions: null },
        { commandName: "foreColor", icon: "", type: "button", commandOptions: null },
        { commandName: "formatBlock", icon: "", type: "button", commandOptions: null },
        { commandName: "forwardDelete", icon: "", type: "button", commandOptions: null },
        { commandName: "insertHorizontalRule", icon: "", type: "button", commandOptions: null },
        { commandName: "insertHTML", icon: "", type: "button", commandOptions: null },
        { commandName: "insertImage", icon: "", type: "button", commandOptions: null },
        { commandName: "insertLineBreak", icon: "", type: "button", commandOptions: null },
        { commandName: "insertOrderedList", icon: "", type: "button", commandOptions: null },
        { commandName: "insertParagraph", icon: "", type: "button", commandOptions: null },
        { commandName: "insertText", icon: "", type: "button", commandOptions: null },
        { commandName: "insertUnorderedList", icon: "", type: "button", commandOptions: null },
        { commandName: "justifyCenter", icon: "", type: "button", commandOptions: null },
        { commandName: "justifyFull", icon: "", type: "button", commandOptions: null },
        { commandName: "justifyLeft", icon: "", type: "button", commandOptions: null },
        { commandName: "justifyRight", icon: "", type: "button", commandOptions: null },
        { commandName: "outdent", icon: "", type: "button", commandOptions: null },
        { commandName: "paste", icon: "", type: "button", commandOptions: null },
        { commandName: "redo", icon: "", type: "button", commandOptions: null },
        { commandName: "selectAll", icon: "", type: "button", commandOptions: null },
        { commandName: "strikethrough", icon: "", type: "button", commandOptions: null },
        { commandName: "styleWithCss", icon: "", type: "button", commandOptions: null },
        { commandName: "subscript", icon: "", type: "button", commandOptions: null },
        { commandName: "superscript", icon: "", type: "button", commandOptions: null },
        { commandName: "undo", icon: "", type: "button", commandOptions: null },
        { commandName: "unlink", icon: "", type: "button", commandOptions: null },
    ];
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