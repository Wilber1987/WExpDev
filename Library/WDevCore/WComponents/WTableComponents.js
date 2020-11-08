import { WRender, WArrayF, DomComponent, WAjaxTools } from "../WModules/WComponentsTools.js";
import { WCssClass } from "../WModules/WStyledRender.js";
import "./WChartJSComponent.js";
class WTableComponent extends HTMLElement {
    constructor() {
        super();
        this.TableClass = "WTable WScroll";
        this.Dataset = [];
        this.selectedItems = [];
        this.ModelObject = {};
    }
    connectedCallback() {
        this.innerHTML = "";
        if (typeof this.TableConfig.Datasets === "undefined" || this.TableConfig.Datasets.length == 0) {
            this.innerHTML = "Defina un Dataset en formato JSON";
            return;
        }
        this.Dataset = this.TableConfig.Datasets;
        this.Colors = ["#ff6699", "#ffbb99", "#adebad"];
        this.AttNameEval = this.TableConfig.AttNameEval;
        this.AttNameG1 = this.TableConfig.AttNameG1;
        this.AttNameG2 = this.TableConfig.AttNameG2;
        this.AttNameG3 = this.TableConfig.AttNameG3;
        this.EvalValue = this.TableConfig.EvalValue;
        this.Options = this.TableConfig.Options;
        if (this.TableConfig.TableClass) {
            this.TableClass = this.TableConfig.TableClass + " WScroll";
        }
        this.append(WRender.createElement(WTableStyle));
        this.RunTable()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('Custom square element attributes changed.');
        //updateStyle(this);
    }
    static get observedAttributes() {
        return this.Dataset;
    }

    RunTable() {
        this.GroupsData = [];
        this.ProcessData = [];
        this.EvalArray = WArrayF.ArryUnique(this.TableConfig.Datasets, this.AttNameEval);
        if (this.TableConfig.Dinamic == true) {
            this.AttNameEval = null;
            this.EvalValue = null;
            this.groupParams = [];
            this.EvalArray = [];
            this.append(WRender.createElement(this.TableOptions()));
            this.DrawTable();
            if (this.TableConfig.AddChart == true) {
                let ChartContainer = { type: "div", props: { id: "Chart" + this.id }, children: [this.DrawChart()] }
                this.append(WRender.createElement(ChartContainer));
            }
            return;
        }
        if (!this.groupParams || typeof this.groupParams !== "object") {
            this.groupParams = [];
            if (this.AttNameG1) {
                this.groupParams.push(this.AttNameG1)
            }
            if (this.AttNameG2) {
                this.groupParams.push(this.AttNameG2)
            }
            if (this.AttNameG3) {
                this.groupParams.push(this.AttNameG3)
            }
            if (this.groupParams.length > 0 && this.AttNameEval !== undefined && this.EvalValue !== undefined) {
                this.DrawGroupTable();
                if (this.TableConfig.AddChart == true) {
                    let ChartContainer = { type: "div", props: { id: "Chart" + this.id }, children: [this.DrawChart()] }
                    this.append(WRender.createElement(ChartContainer));
                }
            } else {
                this.DrawTable();
            }
            return;
        }
    }
    //BASIC TABLE-----------------------------------------------------------------------
    DrawTable(Dataset = this.Dataset) {
        let table = this.querySelector("#MainTable" + this.id);
        if (typeof table === "undefined" || table == null) {
            table = { type: "table", props: { class: this.TableClass, id: "MainTable" + this.id }, children: [] };
            table.children.push(this.DrawTHead());
            table.children.push(this.DrawTBody());
            this.append(WRender.createElement(table));
        } else {
            table.innerHTML = "";
            table.append(WRender.createElement(this.DrawTHead()), WRender.createElement(this.DrawTBody(Dataset)))
        }
    }
    DrawTHead = () => {
        const thead = { type: "thead", props: {}, children: [] };
        const element = this.Dataset[0];
        let tr = { type: "tr", children: [] }

        for (const prop in element) {
            tr.children.push({
                type: "th",
                children: [prop]
            });
            this.ModelObject[prop] = element[prop];
        }
        if (this.Options != undefined) {            
            if (this.Options.Search != undefined || this.Options.Add != undefined) {
                const trOptions = { type: "div", props:{class: "thOptions"}, children: [] }
                if (this.Options.Search != undefined) {
                    const InputOptions = {
                        type: "input", props: {
                            class: "", type: "text",  onchange: async (ev) => { 
                                const Dataset = this.Dataset.filter((element)=>{
                                    for (const prop in element) {
                                        if (element[prop].toString().includes(ev.target.value)) {
                                            return element;                                            
                                        }                                        
                                    }
                                })                               
                                let table = this.querySelector("#MainTable" + this.id);
                                table.removeChild(this.querySelector("tbody"));
                                table.append(WRender.createElement(this.DrawTBody(Dataset)));
                            }
                        }
                    }
                    trOptions.children.push(InputOptions);                }
                if (this.Options.Add != undefined) {
                    const BtnOptions = {
                        type: "button", props: {
                            class: "Btn", type: "button", innerText: "Add+", onclick: async () => {    
                                this.CrudForm(this.ModelObject, {AddObject: true});                    
                            }
                        }
                    }
                    trOptions.children.push(BtnOptions);
                }
                thead.children.push(trOptions);
            }
        }
        thead.children.push(tr);
        return thead;
    }
    DrawTBody = (Dataset = this.Dataset) => {
        let tbody = { type: "tbody", props: {}, children: [] };
        Dataset.forEach(element => {
            let tr = { type: "tr", children: [] };
            for (const prop in element) {
                tr.children.push({
                    type: "td",
                    children: [element[prop].toString()]
                });
            }
            if (this.Options != undefined) {
                const Options = { type: "td", children: [] };
                if (this.Options.Show != undefined && this.Options.Show == true) {
                    Options.children.push({
                        type: "button", props: {
                            class: "Btn", type: "button", innerText: "Show", onclick: async () => {
                                this.ShowForm(element);
                            }
                        }
                    })
                }
                if (this.Options.Edit != undefined && this.Options.Edit == true) {
                    Options.children.push({
                        type: "button", props: {
                            class: "Btn", type: "button", innerText: "Edit", onclick: async () => {                                
                                this.CrudForm(element);
                            }
                        }
                    })
                }
                if (this.Options.Select != undefined && this.Options.Select == true) {
                    Options.children.push({
                        type: "input", props: {
                            class: "Btn", type: "checkbox", innerText: "Select",
                            onclick: async (ev) => {
                                const control = ev.target;
                                const index = this.selectedItems.indexOf(element);
                                if (index == -1 && control.checked == true) {
                                    this.selectedItems.push(element)
                                }
                                else {
                                    this.selectedItems.splice(index, 1)
                                }
                            }
                        }
                    })
                }
                tr.children.push(Options);
            }
            tbody.children.push(tr);
        });
        return tbody;
    }
    ShowForm(Object) {
        const Modal = { type: "div", props: { class: "ModalContent", id: "TempModal" }, children: [] };
        const Form = { type: "div", props: { class: "ContainerForm" }, children: [] };
        const InputClose = {
            type: 'button', props: {
                class: 'Btn', type: "button", onclick: () => {
                    DomComponent.modalFunction(Modal.props.id);
                    setTimeout(() => {
                        this.removeChild(this.querySelector("#" + Modal.props.id))
                    }, 1000);
                }
            },
            children: ['◄ Back']
        };
        const Section = { type: 'h2', children: [InputClose, "- Object Detail"] };
        Form.children.push(Section);
        for (const prop in Object) {
            Form.children.push({
                type: "div", props: { class: "ModalElement" }, children: [
                    { type: "h3", props: { innerText: prop } },
                    { type: "p", props: { innerHTML: Object[prop] } }
                ]
            });
        }
        Modal.children.push(Form);
        this.append(WRender.createElement(Modal));
        DomComponent.modalFunction(Modal.props.id);
    }
    CrudForm(Object = {}, ObjectOptions = { AddObject: false, Url: undefined }) {       
        const Modal = { type: "div", props: { class: "ModalContent", id: "TempModal" }, children: [] };
        const Form = { type: "div", props: { class: "ContainerForm" }, children: [] };
        const InputClose = {
            type: 'button', props: {
                class: 'Btn', type: "button", onclick: () => {
                    DomComponent.modalFunction(Modal.props.id);
                    setTimeout(() => {
                        this.removeChild(this.querySelector("#" + Modal.props.id))
                    }, 1000);
                }
            }, children: ['◄ Back']
        };
        const Section = { type: 'h2', children: [InputClose, "- Object Detail"] };
        Form.children.push(Section);
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
        const InputSave = {
            type: 'button', props: {
                class: 'Btn', type: "button", onclick: async () => {
                    for (const prop in this.ModelObject) {
                        const ControlValue = this.querySelector("#ControlValue" + prop);                        
                        if (ControlValue.value.length < 1) {
                            ControlValue.style.border = "red solid 1px";
                            return;
                        }
                        Object[prop] = ControlValue.value;                        
                    }
                    if (ObjectOptions.AddObject == true) {
                        const NewObject = {};
                        for (const prop in Object) {
                            NewObject[prop] = Object[prop];
                        }
                        this.Dataset.push(NewObject);
                    }
                    this.DefineTable();
                    DomComponent.modalFunction(Modal.props.id);
                    setTimeout(() => {
                        this.removeChild(this.querySelector("#" + Modal.props.id))
                    }, 1000);
                    if (ObjectOptions.Url != undefined) {
                        const response = await WAjaxTools.PostRequest(Url, Object);
                        console.log(response);
                    }
                }
            }, children: ['Guardar']
        };
        const OptionsSection = { type: 'div', children: [InputSave] };
        Form.children.push(OptionsSection);
        Modal.children.push(Form);
        this.append(WRender.createElement(Modal));
        DomComponent.modalFunction(Modal.props.id);
    }
    //FIN BASIOC TABLE-------------------------------------------------------------------

    DrawGroupTable() {
        this.groupParams.forEach(groupParam => {
            this.GroupsData.push(WArrayF.ArryUnique(this.TableConfig.Datasets, groupParam))
        });
        this.table = { type: "div", props: { id: "MainTable" + this.id, class: this.TableClass }, children: [] };
        let div = this.DrawGroupDiv(this.ChargeGroup(this.GroupsData))
        this.table.children.push(div);
        this.append(WRender.createElement(this.table));
    }
    ChargeGroup = (Groups, inicio = 0) => {
        if (!Groups[inicio]) {
            return null;
        }
        let ObjGroup = {
            data: Groups[inicio],
            groupParam: this.groupParams[inicio],
            children: this.ChargeGroup(Groups, inicio + 1)
        }
        return ObjGroup;
    }
    AttEval = () => {
        let div = { type: "div", props: { class: "TContainerBlockL" }, children: [] };
        div.children.push({ type: "Tlabel", children: [this.AttNameEval] });
        //console.log(this.EvalArray)
        if (this.EvalArray != null) {
            this.EvalArray.forEach(evalValue => {
                div.children.push({ type: "TData", children: [evalValue[this.AttNameEval]] });
            });
            div.children.push({ type: "TDataTotal", children: ["Total"] });
        }
        return div;
    }
    DrawGroupDiv = (Groups, div = { type: "div", props: { class: "TContainer" }, children: [this.AttEval()] }, arrayP = {}) => {
        //console.log(Groups)
        if (Groups == null) {
            return "";
        }
        Groups.data.forEach((Group) => {
            let trGroup = { type: "div", props: { class: "TContainerBlock" }, children: [] };
            trGroup.children.push({ type: "Tlabel", children: [Group[Groups.groupParam]] });
            /////
            let dataGroup = { type: "div", props: { class: "Cajon" }, children: [] };
            trGroup.children.push(dataGroup);
            arrayP[Groups.groupParam] = Group[Groups.groupParam];
            if (Groups.children != null) {
                if (Groups.children.children == null) {
                    trGroup.props.class = "flexChild";
                }
                this.DrawGroupDiv(Groups.children, dataGroup, arrayP);
            } else {
                trGroup.props.class = "TContainerBlockData";
                //let dataGroupeV = { type: "div", props: { class: "Cajon" }, children: [] };
                if (this.EvalArray != null) {
                    this.EvalArray.forEach(Eval => {
                        arrayP[this.AttNameEval] = Eval[this.AttNameEval];
                        const Data = this.FindData(arrayP)
                        dataGroup.children.push({ type: "TData", children: [Data] });
                        let NewObject = {};
                        for (const prop in arrayP) {
                            NewObject[prop] = arrayP[prop];
                        }
                        if (parseFloat(Data).toString() != "NaN") {
                            NewObject[this.EvalValue] = Data;
                            this.ProcessData.push(NewObject)
                        }
                    });
                    let sum = 0;
                    dataGroup.children.forEach(element => {
                        //console.log(element.children[0])
                        const value = parseFloat(element.children[0]);
                        if (typeof value === "number" && value.toString() != "NaN") {
                            sum = sum + value;
                        }
                    });
                    dataGroup.children.push({ type: "TDataTotal", children: [sum] });
                }
            }
            div.children.push(trGroup);
        });
        return div;
    }
    DefineTable(Dataset = this.Datasets) {
        this.ProcessData = [];
        let table = this.querySelector("#MainTable" + this.id);
        if (this.EvalValue == null) {
            //table.innerHTML = "Agregue un Value";
            this.DrawTable(Dataset);
        } else {
            table.innerHTML = "";
            this.GroupsData = [];
            this.groupParams.forEach(groupParam => {
                this.GroupsData.push(WArrayF.ArryUnique(this.Datasets, groupParam))
            });
            let div = this.DrawGroupDiv(this.ChargeGroup(this.GroupsData))
            table.append(WRender.createElement(div));
        }
        if (this.TableConfig.AddChart == true && this.EvalValue != null) {
            let ChartContainer = this.querySelector("#Chart" + this.id);
            ChartContainer.innerHTML = "";
            ChartContainer.append(WRender.createElement(this.DrawChart()));
        }
    }
    TableOptions = () => {
        const drop = (ev) => {
            ev.preventDefault();
            var data = ev.dataTransfer.getData("text");
            let target = ev.target;
            let control = this.querySelector("#" + data);
            //console.log(control.parentNode);
            const OriginalParent = control.parentNode.id;
            if (control == null) {
                console.log("error", target.parentNode.id, "TableOptions" + this.id)
                return;
            }
            if (target.className == "TableOptionsAtribs") {
                if (target.id.includes("ListEval")) {
                    if (target.children.length == 2) {
                        console.log("entro1");
                        return;
                    }
                    this.AttNameEval = document.getElementById(data).innerText;
                    this.EvalArray = WArrayF.ArryUnique(this.TableConfig.Datasets, this.AttNameEval);
                    let find = this.groupParams.find(a => a == document.getElementById(data).innerText);
                    if (find) {
                        this.groupParams.splice(this.groupParams.indexOf(find), 1);
                    }
                } else if (target.id.includes("ListValue")) {
                    if (target.children.length == 2) {
                        console.log("entro1");
                        return;
                    }
                    this.EvalValue = document.getElementById(data).innerText;
                    let find = this.groupParams.find(a => a == document.getElementById(data).innerText);
                    if (find) {
                        this.groupParams.splice(this.groupParams.indexOf(find), 1);
                    }
                } else if (target.id.includes("ListGroups")) {
                    this.groupParams.push(document.getElementById(data).innerText);
                } else if (target.id.includes("ListAtribs")) {
                    let find = this.groupParams.find(a => a == document.getElementById(data).innerText);
                    if (find) {
                        this.groupParams.splice(this.groupParams.indexOf(find), 1);
                    }
                }
                target.appendChild(document.getElementById(data));
                if (OriginalParent.includes("ListEval")) {
                    this.AttNameEval = null;
                    this.EvalArray = null;
                }
                if (OriginalParent.includes("ListValue")) {
                    this.EvalValue = null;
                }
                this.DefineTable();
            } else {
                alert("error")
            }
        }
        const allowDrop = (ev) => { ev.preventDefault(); }
        const drag = (ev) => { ev.dataTransfer.setData("text", ev.target.id); }
        let divAtt = {
            type: "div", props: {
                class: "TableOptionsAtribs", id: this.id + "ListAtribs",
                ondrop: drop, ondragover: allowDrop
            },
            children: [{
                type: "label", props: { innerText: "Parametros", class: "titleParam" }
            }]
        };
        let model = this.Dataset[0];
        for (const props in model) {
            divAtt.children.push({
                type: "label", children: [props],
                props: {
                    id: props + this.id, class: "labelParam", draggable: true, ondragstart: drag
                }
            });
        }
        let divEvalAttib = {
            type: "div",
            props: {
                class: "TableOptionsAtribs", id: this.id + "ListEval",
                ondrop: drop, ondragover: allowDrop
            }, children: [{
                type: "label", props: { innerText: "Evaluación", class: "titleParam" }
            }]
        };
        let select = {
            type: "select",
            props: {
                id: "Select" + this.id, class: "titleParam",
                onchange: () => { this.DefineTable(); }
            },
            children: [
                { type: "option", props: { innerText: "Value - Suma", value: "sum" } },
                { type: "option", props: { innerText: "Value - Count", value: "count" } }
            ]
        }
        let divEvalValue = {
            type: "div",
            props: {
                class: "TableOptionsAtribs", id: this.id + "ListValue",
                ondrop: drop, ondragover: allowDrop
            },
            children: [select]
        };
        let divEvalGroups = {
            type: "div",
            props: {
                class: "TableOptionsAtribs", id: this.id + "ListGroups",
                ondrop: drop, ondragover: allowDrop
            },
            children: [{
                type: "label", props: { innerText: "Agrupaciones", class: "titleParam" },
                children: [{
                    type: "label", props: {
                        innerText: "»", class: "btn", onclick: () => {
                            DomComponent.DisplayAcorden("TableOptions" + this.id, 38);
                        }
                    }
                }]
            }]
        };
        return {
            type: "div",
            props: { class: "TableOptions", id: "TableOptions" + this.id },
            children: [divAtt, divEvalAttib, divEvalValue, divEvalGroups]
        };
    }
    DrawChart() {
        if (this.groupParams.length > 0 && this.EvalArray != null) {
            let GroupLabelsData = [];
            this.EvalArray.forEach(element => {
                GroupLabelsData.push({
                    id_: element[this.AttNameEval],
                    Descripcion: element[this.AttNameEval]
                });
            });
            var CharConfig = {
                ContainerName: "MyChart",
                Title: "MyChart",
                GroupLabelsData: GroupLabelsData,
                GroupDataset: this.EvalArray,
                Datasets: this.ProcessData,
                Colors: this.Colors,
                ContainerSize: 400,
                ColumnLabelDisplay: 0,
                AttNameEval: this.AttNameEval,
                AttNameG1: this.groupParams[0],
                AttNameG2: this.groupParams[1],
                AttNameG3: this.groupParams[2],
                EvalValue: this.EvalValue,
            };
            return { type: 'w-colum-chart', props: { data: CharConfig } };
        }
        return "No hay agrupaciones";
    }
    FindData(arrayP) {
        let val = false;
        let nodes = [];
        this.TableConfig.Datasets.forEach(Data => {
            val = this.compareObj(arrayP, Data)
            if (val == true) {
                nodes.push(Data)
            }
        });
        if (nodes.length != []) {
            let Operations = this.querySelector("#Select" + this.id);
            let value = "fail!";
            if (Operations != null) {
                if (Operations.value == "sum") {
                    value = WArrayF.SumValAtt(nodes, this.EvalValue);
                } else if (Operations.value == "count") {
                    value = nodes.length;
                }
            } else {
                value = WArrayF.SumValAtt(nodes, this.EvalValue);
            }
            return value;
        } else {
            return "n/a";
        }
    }
    compareObj(arrayP, Data) {
        let val = true;
        for (const prop in arrayP) {
            if (arrayP[prop] !== Data[prop]) {
                val = false;
                break;
            }
        }
        return val;
    }
}
const WTableStyle = {
    type: "w-style",
    props: {
        ClassList: [
            //ESTILOS GENERALES-----------------------------------
            new WCssClass("w-table", {
                border: "#999999 2px solid",
                overflow: "hidden",
                display: "block",
                "border-radius": "0.2cm"
            }),
            //ESTILO DE LA TABLA BASICA----------------------------
            new WCssClass("w-table .WTable", {
                "font-family": "Verdana, sans-serif",
                width: "100%",
                "align-items": "flex-end",
                "overflow-y": "hidden",
                "overflow-x": "auto",
                "min-height": "200px",
                background: "#ebebf0",
                "border-top": "solid 1px #999999"
            }),new WCssClass("w-table .WTable td", {
                padding: "5px"
            }), new WCssClass("w-table .thOptions", {
                display: "flex", "background-color": "#fff",
                width:"100%"
            }),
            //FIN ESTILO TABLA BASICAA------------------------------
            //flexcajones TABLA DINAMICA----------------------------
            new WCssClass("w-table .TContainer", {
                padding: "0px",
                display: "flex",
            }), new WCssClass("w-table .TContainerBlock", {
                "border-right": "1px solid #000"
            }), new WCssClass(" w-table .TContainerBlockL", {
                display: "flex",
                "flex-direction": "column",
                "justify-content": "flex-end",
                "border-right": "1px solid #000"
            }), new WCssClass(" w-table .TContainerBlockData", {
                width: "100%"
            }), new WCssClass("w-table  Tlabel", {
                display: "block",
                padding: "5px",
                "border-bottom": "1px solid #000",
                height: "30px",
                "overflow-y": "hidden",
                "white-space": "nowrap",
                "overflow": "hidden",
                "text-overflow": "ellipsis",
                "min-width": "60px",
                "background-color": "#717183",
                color: "#fff"
            }), new WCssClass("w-table .TContainerBlockData .Cajon", {
                overflow: "hidden",
                display: "flex",
                "flex-direction": "column",
            }), new WCssClass("w-table .flexChild", {
                padding: "0px",
                width: "100%"
            }), new WCssClass("w-table TData", {
                padding: "5px",
                height: "30px",
                "overflow-y": "hidden",
                "white-space": "nowrap",
                "overflow": "hidden",
                "text-overflow": "ellipsis",
                "min-width": "60px"
            }), new WCssClass("w-table TDataTotal", {
                padding: "5px",
                height: "30px",
                "overflow-y": "hidden",
                "white-space": "nowrap",
                "overflow": "hidden",
                "text-overflow": "ellipsis",
                "min-width": "60px",
                "border-top": "solid 1px #000",
                "border-bottom": "solid 1px #000",
            }), new WCssClass("w-table .Cajon", {
                display: "flex"
            }),
            //tABLA DINAMICA OPCIONES ------------------------------
            new WCssClass("w-table .TableOptions", {
                display: "flex",
                transition: "all 1s",
                "max-height": "38px",
                overflow: "hidden",
            }), new WCssClass("w-table .TableOptionsAtribs", {
                display: "flex",
                width: "100%",
                "flex-direction": "column",
                "padding-bottom": "20px",
                "background-color": "#efefef"
            }), new WCssClass("w-table .titleParam", {
                display: "block",
                padding: "10px",
                "border-bottom": "1px solid #000",
                "margin-bottom": "10px",
                cursor: "pointer",
                "font-size": "16px",
                "text-align": "center",
                position: "relative"
            }), new WCssClass("w-table select.titleParam, w-table select.titleParam:focus, w-table select.titleParam:active", {
                cursor: "pointer",
                "background-color": "#efefef",
                border: "none",
                "border-bottom": "1px solid #000",
                outline: "none",
                "outline-width": "0",
            }), new WCssClass("w-table .labelParam", {
                display: "block",
                padding: "10px",
                "background-color": "#fff",
                cursor: "pointer",
                border: "solid 1px #999999"
            }), new WCssClass("w-table .btn", {
                "margin-left": "10px",
                cursor: "pointer",
                display: "inline-block",
                "font-weight": "bold",
                position: "absolute",
                transform: "rotate(90deg)"
            }),

        ]
    }
}
customElements.define("w-table", WTableComponent);