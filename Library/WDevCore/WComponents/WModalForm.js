import { WRender, WAjaxTools, DomComponent } from "../WModules/WComponentsTools.js";
import { WCssClass } from "../WModules/WStyledRender.js";
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
                this.Modal.children.push(this.SaveOptions(this.ObjectModel));
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
        const Form = { type: 'divForm', children: [] };
        for (const prop in Object) {
            const ControlContainer = {
                type: "div", props: { class: "ModalElement" }, children: [prop]
            }
            let ControlTagName = "input";
            let InputType = typeof Object[prop];
            let InputValue = Object[prop];
            if (ObjectOptions.AddObject == true) {
                InputValue = "";
            }
            if (prop.includes("date") || prop.includes("fecha")) {
                InputType = "date";
            } else if (prop.includes("image") || prop.includes("img")) {
                InputType = "file";
            }
            if (Object[prop].length >= 50) {
                ControlTagName = "textarea";
            }
            ControlContainer.children.push({
                type: ControlTagName, props: {
                    type: InputType, id: "ControlValue" + prop, value: InputValue
                }
            })
            Form.children.push(ControlContainer);
        }
        return Form;
    }
    SaveOptions(Object = {}) {
        const InputSave = {
            type: 'button', props: {
                class: 'Btn', type: "button", onclick: async () => {
                    for (const prop in this.ObjectModel) {
                        const ControlValue = this.querySelector("#ControlValue" + prop);
                        if (ControlValue.value.length < 1) {
                            ControlValue.style.border = "red solid 1px";
                            return;
                        }
                        if (parseFloat(ControlValue.value).toString() != "NaN") {
                            Object[prop] = parseFloat(ControlValue.value);                            
                        }else{
                            Object[prop] = ControlValue.value;
                        }                       
                    }
                    if (this.ObjectOptions.SaveFunction != undefined) {
                        this.ObjectOptions.SaveFunction(Object);
                    }
                    if (this.ObjectOptions.Url != undefined) {
                        const response = await WAjaxTools.PostRequest(Url, Object);
                        console.log(response);
                    }
                    DomComponent.modalFunction(this.id);
                    setTimeout(() => {
                        this.parentNode.removeChild(this);
                    }, 1000);

                }
            }, children: ['Guardar']
        };
        return { type: 'div', children: [InputSave] };
    }
    FormStyle() {
        const Style = {
            type: "w-style",
            props: {
                ClassList: [
                    new WCssClass("w-table divForm", {
                        display: "flex", "flex-wrap": "wrap"
                    }), new WCssClass("w-table divForm div", {
                        width: "calc(50% - 10px)", margin: "5px"
                    })
                ]
            }
        }
        return Style;
    }
}
customElements.define("w-modal-form", WModalForm);