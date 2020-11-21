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
        this.className = "ModalContentWModal";
        this.Modal = { type: "div", props: { class: "ContainerFormWModal" }, children: [] };
        this.Modal.children.push(this.DrawModalHead());
        if (this.ObjectModal) {//AGREGA UN OBJETO AL MODAL ENVIDO DESDE LA CONFIGURACION
            this.Modal.children.push(this.ObjectModal);
            if (this.ObjectOptions.SaveFunction != undefined) {
                this.Modal.children.push(this.SaveOptions());
            }
        } else if (this.ObjectDetail) {// MUESTRA EL DETALLE DE UN OBJETO EN UNA LISTA
            this.Modal.children.push(this.ShowFormDetail());
        } else if (this.ObjectModel) {//AGREGA FORMULARIO CRUD A LA VISTA
            if (this.ObjectOptions == undefined) {
                this.ObjectOptions = { AddObject: false, Url: undefined };
            }                       
            if (this.ObjectOptions.AddObject == true) {//AGREGA NUEVO OBJETO
                const NewObject = {};
                this.Modal.children.push(this.CrudForm(NewObject, this.ObjectOptions));
                this.Modal.children.push(this.SaveOptions(NewObject));
            } else {//EDITA UN OBJETO EXISTENTE
                if (this.ObjectModel == undefined) {
                    //verifica que el modelo exista,
                    //sino es asi le asigna el valor de un objeto existente
                    this.ObjectModel = this.EditObject;
                }
                this.Modal.children.push(this.CrudForm(this.EditObject, this.ObjectOptions));
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
        const Model = this.ObjectModel;        
        const Form = { type: 'divForm', children: [] };
        for (const prop in Model) {
            const ControlContainer = {
                type: "div", props: { class: "ModalElement" }, children: []
            }
            let ControlTagName = "input";
            let InputType = typeof Model[prop];
            let InputValue = "";
            if (typeof Model[prop] === "string" && Model[prop].length >= 50) {
                ControlTagName = "textarea";
                InputType = "";
            } else if (typeof Model[prop] === "object" && Model[prop] != null) {
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
                //console.log(Object[prop])
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
                        class: "imgPhotoWModal", id: "imgControl" + prop + this.id , 
                    }
                })
                InputType = "file";
                ControlTagName = "input";
            }
            const InputControl = {
                type: ControlTagName, props: {
                    id: "ControlValue" + prop, value: null,
                    onchange:async (ev)=>{//evento de actualizacion del componente
                        if (ev.target.type == "file") {
                            await this.SelectedFile(ev.target.files[0]);
                            await setTimeout(() => {
                                Object[prop] = photoB64.toString();
                                this.querySelector("#imgControl" + prop + this.id).src 
                                            = "data:image/png;base64," + Object[prop];
                            }, 1000);                            
                        }else{                            
                            Object[prop] = ev.target.value;
                        }
                    }
                }, children: []
            }
            if (InputType != "") {
                InputControl.props.type = InputType;
                InputControl.props.placeholder = prop + "..."
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
                    new WCssClass("w-modal-form", {
                        "opacity": "0",  
                        display: "none",                      
                        "background-color": "rgba(0, 0, 0, 0.5) !important",
                        "width": "100%",
                        "position": "fixed !important",
                        "top": "0px !important",
                        "left": "0px !important",
                        "bottom": "0px !important",
                        "transition": "all linear 1s",
                        "box-shadow": "0 0px 1px 0px #000",
                        "z-index": "200 !important",
                        "overflow-y": "auto",
                        "padding-bottom": "50px",
                    }),
                    new WCssClass("w-modal-form .ContainerFormWModal", {
                        "display": "block",
                        "overflow": "hidden",
                        "margin": "auto",
                        "margin-top": "50px",
                        "background-color": "#fff",
                        "width": "70%",
                        "max-height": "800px",
                        "overflow-y": "auto",
                        "min-height": "200px",
                        "border-radius": "5px",
                        "position": "relative",
                    }),new WCssClass("w-modal-form .ContainerFormWModal h2", {
                        "padding": "10px",
                        "margin": "0px",
                        "background": "#09f",
                    }), new WCssClass("w-modal-form divForm", {
                        display: "flex", "flex-wrap": "wrap",
                        padding:"20px"
                    }),new WCssClass("w-modal-form divForm div", {
                        width: "calc(50% - 10px)", margin: "5px"
                    }), new WCssClass(`w-modal-form input[type=text],
                                        w-modal-form input[type=string],
                                        w-modal-form input[type=number], 
                                        w-modal-form input[type=date],
                                        w-modal-form select`, {
                        padding: "8px", border: "none", "border-bottom": "3px solid #999999",
                        width: "calc(100% - 16px)", "font-size": "15px", transition: "all 0.7s"
                    }), new WCssClass(`w-modal-form input:active,
                                        w-modal-form input:focus,
                                        w-modal-form select:focus`, {
                        "border-bottom": "3px solid #0099cc", outline: "none",
                    }), new WCssClass(`w-modal-form .DivSaveOptions`, {
                        "margin-top": "10px",
                        "margin-bottom": "10px", padding: "20px"
                    }), new WCssClass(`w-modal-form .imgPhotoWModal`, {
                        margin: "10px auto", display: "block", width: "80%", 
                        height: "auto", "border-radius": "50%",
                        "box-shadow": "0 0px 2px 0px #000", 
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
    async SelectedFile(value) {
        var reader = new FileReader();
        reader.onloadend = function (e) {
            photoB64 = e.target.result.split("base64,")[1];
        }
        //Aqui comienza a leer el archivo para posteriormente ejecutar la función onloadend
        reader.readAsDataURL(value);
    }
}
customElements.define("w-modal-form", WModalForm);