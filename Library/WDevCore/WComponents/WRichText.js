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
        { commandName: "backColor", icon: "", commandOptions: null },
        { commandName: "bold", icon: "", commandOptions: null },
        { commandName: "createLink", icon: "", commandOptions: null },
        { commandName: "copy", icon: "", commandOptions: null },
        { commandName: "cut", icon: "", commandOptions: null },
        { commandName: "defaultParagraphSeparator", icon: "", commandOptions: null },
        { commandName: "delete", icon: "", commandOptions: null },
        { commandName: "fontName", icon: "", commandOptions: null },
        { commandName: "fontSize", icon: "", commandOptions: null },
        { commandName: "foreColor", icon: "", commandOptions: null },
        { commandName: "formatBlock", icon: "", commandOptions: null },
        { commandName: "forwardDelete", icon: "", commandOptions: null },
        { commandName: "insertHorizontalRule", icon: "", commandOptions: null },
        { commandName: "insertHTML", icon: "", commandOptions: null },
        { commandName: "insertImage", icon: "", commandOptions: null },
        { commandName: "insertLineBreak", icon: "", commandOptions: null },
        { commandName: "insertOrderedList", icon: "", commandOptions: null },
        { commandName: "insertParagraph", icon: "", commandOptions: null },
        { commandName: "insertText", icon: "", commandOptions: null },
        { commandName: "insertUnorderedList", icon: "", commandOptions: null },
        { commandName: "justifyCenter", icon: "", commandOptions: null },
        { commandName: "justifyFull", icon: "", commandOptions: null },
        { commandName: "justifyLeft", icon: "", commandOptions: null },
        { commandName: "justifyRight", icon: "", commandOptions: null },
        { commandName: "outdent", icon: "", commandOptions: null },
        { commandName: "paste", icon: "", commandOptions: null },
        { commandName: "redo", icon: "", commandOptions: null },
        { commandName: "selectAll", icon: "", commandOptions: null },
        { commandName: "strikethrough", icon: "", commandOptions: null },
        { commandName: "styleWithCss", icon: "", commandOptions: null },
        { commandName: "subscript", icon: "", commandOptions: null },
        { commandName: "superscript", icon: "", commandOptions: null },
        { commandName: "undo", icon: "", commandOptions: null },
        { commandName: "unlink", icon: "", commandOptions: null },
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