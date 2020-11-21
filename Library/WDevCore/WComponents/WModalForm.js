import { WRender, WAjaxTools, DomComponent } from "../WModules/WComponentsTools.js";
import { WCssClass } from "../WModules/WStyledRender.js";
let photoB64;
class WModalForm extends HTMLElement {
    constructor() {
        super();
        //this.id = "TempModal";
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
    DrawComponent = async () => {
        if (this.id == undefined || this.id == "") {
            this.id = "TempModal";
        }
        this.append(WRender.createElement(this.FormStyle()));
        this.className = "ModalContent";
        this.Modal = { type: "div", props: { class: "ContainerForm" }, children: [] };
        this.Modal.children.push(this.DrawModalHead());
        if (this.ObjectModal) {
            this.Modal.children.push(this.ObjectModal);
            if (this.ObjectOptions.SaveFunction != undefined) {
                this.Modal.children.push(this.SaveOptions());
            }
        } else if (this.ObjectDetail) {
            this.Modal.children.push(this.ShowFormDetail());
        } else if (this.ObjectModel) {
            if (this.ObjectOptions == undefined) {
                this.ObjectOptions = { AddObject: false, Url: undefined };
            }
            this.Modal.children.push(this.CrudForm(this.ObjectModel, this.ObjectOptions));
            if (this.ObjectOptions.AddObject == true) {
                this.Modal.children.push(this.SaveOptions({}));
            } else {
                this.Modal.children.push(this.SaveOptions(this.EditObject));
            }
        }
        this.append(WRender.createElement(this.Modal));
        DomComponent.modalFunction(this.id)
    }
    DrawModalHead() {
        const InputClose = {
            type: 'button', props: {
                class: 'Btn', type: "button", onclick: () => {
                    DomComponent.modalFunction(this.id);
                    setTimeout(() => {
                        this.parentNode.removeChild(this);
                    }, 1000);
                }
            },
            children: ['◄ Back']
        };
        const Section = { type: 'h2', children: [InputClose] };
        return Section;
    }
    ShowFormDetail(Object = this.ObjectDetail) {
        const Form = { type: 'divForm', children: [] };
        for (const prop in Object) {
            Form.children.push({
                type: "div", props: { class: "ModalElement" }, children: [
                    { type: "h3", props: { innerText: prop } },
                    { type: "p", props: { innerHTML: Object[prop] } }
                ]
            });
        }
        return Form;
    }
    CrudForm(Object = {}, ObjectOptions) {
        if (this.AddItemsFromApi != undefined) {
            var Config = {
                MasterDetailTable: true,
                SearchItemsFromApi: this.AddItemsFromApi,
                selectedItems: this.Dataset,
                Options: {
                    Search: true, Select: true,
                }
            }
            return {
                type: "w-table",
                props: {
                    id: "SearchTable" + this.id,
                    TableConfig: Config
                }
            };
        }
        const Form = { type: 'divForm', children: [] };
        for (const prop in Object) {
            const ControlContainer = {
                type: "div", props: { class: "ModalElement" }, children: [prop]
            }
            let ControlTagName = "input";
            let InputType = typeof Object[prop];
            let InputValue = "";
            if (typeof Object[prop] === "string" && Object[prop].length >= 50) {
                ControlTagName = "textarea";
                InputType = "";
            } else if (typeof Object[prop] === "object" && Object[prop] != null) {
                ControlTagName = "select";
            }           
            if (ObjectOptions.AddObject == true) {
                InputValue = "";
            } else {
                InputValue = this.EditObject[prop];
            }
            //DEFINICION DE TIPO
            if (InputType == "object" && InputValue != null) {
                InputType = "";
                console.log(Object[prop])
                for (const key in Object[prop]) {
                    let OValue, ODisplay;
                    if (typeof Object[prop][key] === "object") {
                        OValue = Object[prop][key]["id"];
                        ODisplay = Object[prop][key]["desc"];
                    } else {
                        OValue = Object[prop][key];
                        ODisplay = Object[prop][key];
                    }
                    InputControl.children.push({
                        type: "option", props: {
                            value: OValue, innerText: ODisplay
                        }
                    })
                }
            } else if (prop.includes("date") || prop.includes("fecha") || prop.includes("time")) {
                InputType = "date";
            } else if (prop.includes("img") || prop.includes("pic")
                || prop.includes("Pict") || prop.includes("image")
                || prop.includes("Photo")) {
                ControlContainer.children.push({
                    type: "img", props: {
                        src: "data:image/png;base64," + InputValue,
                        class: "imgPhoto", height: 100, width: 100
                    }
                })
                InputType = "file";
                ControlTagName = "input";
            }
            const InputControl = {
                type: ControlTagName, props: {
                    id: "ControlValue" + prop, value: null
                }, children: []
            }
            if (InputType != "") {
                InputControl.props.type = InputType;
            }
            InputControl.props.value = InputValue;
            ControlContainer.children.push(InputControl)
            Form.children.push(ControlContainer);
        }
        return Form;
    }
    SaveOptions(Object = {}) {
        const InputSave = {
            type: 'button', props: {
                class: 'Btn', type: "button", onclick: async () => {
                    if (this.AddItemsFromApi == undefined) {
                        for (const prop in this.ObjectModel) {
                            const ControlValue = this.querySelector("#ControlValue" + prop);
                            if (ControlValue.value.length < 1) {
                                ControlValue.style.border = "red solid 1px";
                                return;
                            }
                            if (ControlValue.type == "date") {
                                Object[prop] = ControlValue.value;
                            } else if (ControlValue.type == "file") {
                                await this.SelectedFile(ControlValue.files[0]);
                                await setTimeout(() => {
                                    // Object[prop] = ControlValue.value;
                                    Object[prop] = photoB64.toString();
                                    //console.log(this.MyLoginData);
                                }, 1000);

                            } else if (parseFloat(ControlValue.value).toString() != "NaN") {
                                Object[prop] = parseFloat(ControlValue.value);
                            } else {
                                Object[prop] = ControlValue.value;
                            }
                        }
                    }
                    if (this.ObjectOptions.SaveFunction != undefined) {
                        this.ObjectOptions.SaveFunction(Object);
                    }
                    if (this.ObjectOptions.Url != undefined) {
                        const response = await WAjaxTools.PostRequest(this.ObjectOptions.Url, Object);
                        console.log(response);
                    }
                    //console.log(Object);
                    DomComponent.modalFunction(this.id);
                    setTimeout(() => {
                        this.parentNode.removeChild(this);
                    }, 1000);

                }
            }, children: ['Guardar']
        };
        return { type: 'div', props: { class: "DivSaveOptions" }, children: [InputSave] };
    }
    FormStyle() {
        const Style = {
            type: "w-style",
            props: {
                ClassList: [
                    new WCssClass("w-modal-form divForm", {
                        display: "flex", "flex-wrap": "wrap"
                    }), new WCssClass("w-modal-form divForm div", {
                        width: "calc(50% - 10px)", margin: "5px"
                    }), new WCssClass(`w-modal-form input[type=text],
                                        w-modal-form input[type=string],
                                        w-modal-form input[type=number], 
                                        w-modal-form input[type=date],
                                        w-modal-form select`, {
                        padding: "8px", border: "none", "border-bottom": "3px solid #999999",
                        width: "calc(100% - 16px)", "font-size": "15px",
                    }), new WCssClass(`w-modal-form input:active,
                                        w-modal-form input:focus,
                                        w-modal-form select:focus,
                                        w-modal-form select:focus`, {
                        "border-bottom": "3px solid #0099cc", outline: "none",
                    }), new WCssClass(`w-modal-form .DivSaveOptions`, {
                        "margin-top": "10px",
                        "margin-bottom": "10px",
                    }), new WCssClass(`w-modal-form h1, 
                            w-modal-form h3,
                            w-modal-form h4,w-modal-form h5`, {
                        display: "block", padding: "10px", "text-align": "center"
                    }),
                ]
            }
        }
        return Style;
    }
    async SelectedFile(value, obj) {
        var reader = new FileReader();
        reader.onloadend = function (e) {
            photoB64 = e.target.result.split("base64,")[1];
        }
        //Aqui comienza a leer el archivo para posteriormente ejecutar la función onloadend
        reader.readAsDataURL(value);
    }
}
customElements.define("w-modal-form", WModalForm);