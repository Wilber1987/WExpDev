import { WRender, WArrayF, ComponentsManager, WAjaxTools } from "../WModules/WComponentsTools.js";
import { WCssClass } from "../WModules/WStyledRender.js";
import "./WChartJSComponent.js";
import "./WModalForm.js";
class WTableDynamicComp extends HTMLElement {
    constructor(TableConfig = {}) {
        super();
        this.TableClass = "WTable WScroll";
        this.Dataset = [];
        this.TableConfig = TableConfig;
        this.groupParams = this.TableConfig.groupParams ?? [];
        this.EvalValue = this.TableConfig.EvalValue ?? null;
        this.AttNameEval = this.TableConfig.AttNameEval ?? null;
        this.attachShadow({ mode: "open" });

        this.MainTable = WRender.createElement({ type: "table", props: { class: this.TableClass, id: "MainTable" + this.id }, children: [] });
        this.divTableContainer = WRender.createElement({
            type: "div", props: { class: "tableContainer" },
            children: [this.MainTable]
        });
        this.ChartContainer = WRender.createElement({
            type: "div",
            props: { id: "Chart" + this.id, className: "CharttableReport" },
        });
        this.shadowRoot.append(this.divTableContainer);
        this.shadowRoot.append(this.ChartContainer);
    }
    connectedCallback() {
        if (this.MainTable.innerHTML != "") {
            return;
        }
        //PAGINACION
        if (this.TableConfig.maxElementByPage == undefined) {
            this.maxElementByPage = 10;
        } else {
            this.maxElementByPage = this.TableConfig.maxElementByPage;
        }
        this.AddItemsFromApi = this.TableConfig.AddItemsFromApi;
        this.SearchItemsFromApi = this.TableConfig.SearchItemsFromApi;
        //this.TableConfig.MasterDetailTable = true
        if (typeof this.TableConfig.Dataset === "undefined" || this.TableConfig.Dataset.length == 0) {
            this.innerHTML = "Defina un Dataset en formato JSON";
            return;
        }
        this.Dataset = this.TableConfig.Dataset;
        this.Colors = ["#ff6699", "#ffbb99", "#adebad"];
        this.AttNameEval = this.TableConfig.AttNameEval;
        this.EvalValue = this.TableConfig.EvalValue;
        this.Options = this.TableConfig.Options;
        if (this.TableConfig.TableClass) {
            this.TableClass = this.TableConfig.TableClass + " WScroll";
        }
        this.RunTable();
    }
    RunTable() {
        this.GroupsData = [];
        this.ProcessData = [];
        this.EvalArray = WArrayF.ArrayUnique(this.TableConfig.Dataset, this.AttNameEval);
        this.className = "DinamicContainer";
        this.append(WRender.createElement({
            type: 'w-style', props: {
                id: '', ClassList: [
                    new WCssClass(`.DinamicContainer`, {
                        overflow: "hidden",
                        height: "700px",
                        display: "grid",
                        border: "solid 1px #d1cfcf",
                        "border-radius": "0.2cm",
                        "grid-template-columns": "calc(100% - 350px) 350px",
                        "grid-template-rows": "300px  calc(100% - 300px)",
                        "font-size": "12px",
                        "grid-gap": "5px",
                        padding: "10px"
                    }),
                ]
            }
        }));
        this.shadowRoot.append(WRender.createElement(this.TableStyleDinamic()));
        this.shadowRoot.append(WRender.createElement(this.TableOptions()));
        this.ChartContainer.innerHTML = "";
        this.DrawGroupTable(this.Dataset);
        this.ChartContainer.append(WRender.createElement(this.DrawChart()));
        return;
    }
    //FIN BASIOC TABLE-------------------------------------------------------------------
    //#region TABLA DINAMICA-------------------------------------------------------------
    DrawGroupTable(Dataset) {
        this.groupParams.forEach(groupParam => {
            this.GroupsData.push(WArrayF.ArrayUnique(Dataset, groupParam))
        });
        let div = this.DrawGroupDiv(this.ChargeGroup(this.GroupsData))
        this.MainTable.append(WRender.createElement(div));
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
        div.children.push({ type: "Tlabel", children: [WArrayF.Capitalize(this.AttNameEval)] });
        if (this.EvalArray != null) {
            this.EvalArray.forEach(evalValue => {
                div.children.push({ type: "TData", children: [WArrayF.Capitalize(evalValue[this.AttNameEval])] });
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
            trGroup.children.push({ type: "Tlabel", children: [WArrayF.Capitalize(Group[Groups.groupParam])]});
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
    DefineTable(Dataset = this.Dataset) {
        this.ProcessData = [];
        this.TableConfig.Dataset = Dataset;
        if (this.EvalValue == null) {
            this.MainTable.innerHTML = "Agregue un Value";
        } else {
            this.EvalArray = WArrayF.ArrayUnique(Dataset, this.AttNameEval);
            this.MainTable.innerHTML = "";
            this.GroupsData = [];
            this.MainTable.style.display = "flex";
            this.DrawGroupTable(Dataset);
        }
        this.ChartContainer.innerHTML = "";
        this.ChartContainer.append(WRender.createElement(this.DrawChart()));
    }
    TableOptions = () => {
        if (this.shadowRoot.querySelector("#TableOptionstable")) {
            return "";
        }
        const allowDrop = (ev) => { ev.preventDefault(); }
        const drag = (ev) => { ev.dataTransfer.setData("text", ev.target.id); }
        let divAtt = {
            type: "div",
            props: {
                class: "TableOptionsAtribs",
                id: this.id + "ListAtribs",
                ondrop: this.drop,
                ondragover: allowDrop
            },
            children: [{
                type: "label",
                props: { innerText: "Parametros", class: "titleParam" }
            }]
        };
        let model = this.Dataset[0];        
        let divEvalAttib = {
            type: "div",
            props: {
                class: "TableOptionsAtribs",
                style: "height: 35%",
                id: this.id + "ListEval",
                ondrop: this.drop,
                ondragover: allowDrop
            },
            children: [{
                type: "label",
                props: { innerText: "Filas", class: "titleParam" }
            }]
        };
        let divEvalGroups = {
            type: "div",
            props: {
                class: "TableOptionsAtribs",
                id: this.id + "ListGroups",
                ondrop: this.drop,
                ondragover: allowDrop
            },
            children: [{
                type: "label",
                props: { innerText: "Columnas", class: "titleParam" },
                children: []
            }]
        };
        let select = {
            type: "select",
            props: {
                id: "Select" + this.id,
                class: "titleParam",
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
                class: "TableOptionsAtribs",
                id: this.id + "ListValue",
                ondrop: this.drop,
                ondragover: allowDrop
            }, children: [select]
        };
        for (const props in model) {
            const LabelP = {
                type: "label",
                children: [WArrayF.Capitalize(props)],
                props: {
                    id: props + this.id, name: props, class: "labelParam", draggable: true, ondragstart: drag
                }
            }
            divAtt.children.push(LabelP);
        }
        return {
            type: "div",
            props: { class: "TableOptions", id: "TableOptions" + this.id },
            children: [divAtt, {
                type: 'div', props: {
                    class: 'TableOptionsAtribs OptionsAtribsGroup'
                }, children: [divEvalAttib, divEvalGroups, divEvalValue]
            }]
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
            if (this.TableConfig.TypeChart == undefined) {// bar or staked
                this.TableConfig.TypeChart = "bar";
            }
            var CharConfig = {
                ContainerName: "MyChart",
                Title: "MyChart",
                TypeChart: this.TableConfig.TypeChart,
                GroupLabelsData: GroupLabelsData,
                GroupDataset: this.EvalArray,
                Dataset: this.ProcessData,
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
        this.TableConfig.Dataset.forEach(Data => {
            val = WArrayF.compareObj(arrayP, Data)
            if (val == true) {
                nodes.push(Data)
            }
        });
        if (nodes.length != []) {
            let Operations = this.shadowRoot.querySelector("#Select" + this.id);
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
    drop = (ev) => {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        let target = ev.target;
        let control = this.shadowRoot.querySelector("#" + data);
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
                this.AttNameEval = this.shadowRoot.querySelector("#" + data).name;
                this.EvalArray = WArrayF.ArrayUnique(this.TableConfig.Dataset, this.AttNameEval);
                let find = this.groupParams.find(a => a == this.shadowRoot.querySelector("#" + data).name);
                if (find) {
                    this.groupParams.splice(this.groupParams.indexOf(find), 1);
                }
            } else if (target.id.includes("ListValue")) {
                if (target.children.length == 2) {
                    //console.log("entro1");
                    return;
                }
                this.EvalValue = this.shadowRoot.querySelector("#" + data).name;
                let find = this.groupParams.find(a => a == this.shadowRoot.querySelector("#" + data).name);
                if (find) {
                    this.groupParams.splice(this.groupParams.indexOf(find), 1);
                }
            } else if (target.id.includes("ListGroups")) {
                if (target.children.length == 4) {
                    console.log("Grupos excedidos");
                    return;
                }
                let find = this.groupParams.find(a => a == this.shadowRoot.querySelector("#" + data).name);
                if (!find) {
                    this.groupParams.push(this.shadowRoot.querySelector("#" + data).name);
                }
            } else if (target.id.includes("ListAtribs")) {
                let find = this.groupParams.find(a => a == this.shadowRoot.querySelector("#" + data).name);
                if (find) {
                    this.groupParams.splice(this.groupParams.indexOf(find), 1);
                }
            }
            target.appendChild(this.shadowRoot.querySelector("#" + data));
            if (OriginalParent.includes("ListEval")) {
                this.AttNameEval = null;
                this.EvalArray = null;
            }
            if (OriginalParent.includes("ListValue")) {
                this.EvalValue = null;
            }
            if (OriginalParent.includes("ListGroups")) {
                this.groupParams = [];
                const Parent = this.shadowRoot.querySelector("#" + OriginalParent);
                Parent.querySelectorAll(".labelParam").forEach(element => {
                    this.groupParams.push(element.name);
                });
            }
            this.DefineTable();
        } else {
            console.log("error")
        }
    }
    //#endregion FIN TABLA DINAMICA---------------------------------------------------------------------------
    //ESTILOS-------------------------------------------------------###################
    TableStyleDinamic() {
        const style = this.shadowRoot.querySelector("#TableStyleDinamic" + this.id);
        if (style) {
            style.parentNode.removeChild(style);
        }
        const WTableStyle = {
            type: "w-style",
            props: {
                id: "TableStyleDinamic" + this.id,
                ClassList: [
                    //ESTILO DE LA TABLA BASICA----------------------------tableContainer                    
                    new WCssClass(`*`, {
                        "font-family": 'arial',
                    }), new WCssClass(`.tableContainer`, {
                        overflow: "auto",
                        "grid-row": "1/2",
                    }), new WCssClass(`.WTable`, {
                        "font-family": "Verdana, sans-serif",
                        width: "100%",
                        "border-collapse": "collapse",
                        "font-size": "12px",
                        position: "relative"
                    }),
                    //FIN ESTILO TABLA BASICAA------------------------------
                    //#region flexcajones TABLA DINAMICA----------------------------
                    new WCssClass(`.TContainer`, {
                        padding: "0px",
                        display: "flex",
                        "flex-grow": 1,
                        "box-shadow": "0 0 2px 0 rgba(0,0,0,50%)"
                    }), new WCssClass(`.TContainerBlock`, {
                        width: "100%"
                    }), new WCssClass(" .TContainerBlockL", {
                        display: "flex",
                        "flex-direction": "column",
                        "justify-content": "flex-end",
                        "background-color": "rgb(236, 235, 235)",
                        "font-weight": "bold",
                    }), new WCssClass(" .TContainerBlockData", {
                        width: "100%"
                    }), new WCssClass(` Tlabel`, {
                        display: "block",
                        "border-bottom": "1px solid #126e8d",
                        "overflow-y": "hidden",
                        "white-space": "nowrap",
                        "overflow": "hidden",
                        "text-overflow": "ellipsis",
                        "min-width": "60px",
                        "background-color": "#eee",
                        padding: "0.5rem",
                        "text-align": "left",
                        "font-weight": "bold",
                        color: "#126e8d"
                        //border: "1px rgb(185, 185, 185) solid",
                    }), new WCssClass(`.TContainerBlockData .Cajon`, {
                        overflow: "hidden",
                        display: "flex",
                        "flex-direction": "column",
                    }), new WCssClass(`.flexChild`, {
                        padding: "0px",
                        width: "100%"
                    }), new WCssClass(`TData`, {
                        "overflow-y": "hidden",
                        "white-space": "nowrap",
                        "overflow": "hidden",
                        "text-overflow": "ellipsis",
                        "min-width": "60px",
                        padding: "0.5rem",
                        "text-align": "left",
                        //border: "1px #ccc solid"
                    }), new WCssClass(`TDataTotal`, {
                        "overflow-y": "hidden",
                        "white-space": "nowrap",
                        "overflow": "hidden",
                        "text-overflow": "ellipsis",
                        "min-width": "60px",
                        "border-top": "solid 1px #ccc",
                        //"border-bottom": "solid 1px #ccc",
                        padding: "0.5rem",
                        "text-align": "left",
                        "font-weight": "bold",
                        //border: "1px #ccc solid",
                    }), new WCssClass(`.Cajon`, {
                        display: "flex"
                    }),
                    //#endregion
                    //tABLA DINAMICA OPCIONES ------------------------------
                    new WCssClass(`.TableOptions`, {
                        display: "grid",
                        "grid-gap": 10,
                        "background-color": "#eee",
                        padding: 10,
                        transition: "all 1s",
                        overflow: "hidden",
                        "grid-column": "2/3",
                        "grid-row": "1/3",
                        "grid-template-columns": "49% 49%",
                        "grid-template-rows": "70% 38%",
                        "box-shadow": "0 0 2px 0 rgba(0,0,0,50%)"
                    }), new WCssClass(`.TableOptionsAtribs`, {
                        display: "flex",
                        width: "100%",
                        "flex-direction": "column",
                        //"padding-bottom": "20px",
                        "background-color": "#fff",
                        "box-shadow": "0 0 2px 0 rgba(0,0,0,30%)",
                        height: "100%"
                    }), new WCssClass(`.OptionsAtribsGroup`, {
                        display: 'flex',
                        overflow: "hidden",
                        "flex-direction": "column",
                    }), new WCssClass(`.titleParam`, {
                        display: "flex",
                        "background-color": "#cee4f3",
                        color: "#126e8d",
                        "margin-bottom": "10px",
                        cursor: "pointer",
                        "text-align": "center",
                        position: "relative",
                        height: "30px",
                        "min-height": "30px",
                        "max-height": "30px",
                        "align-items": "center",
                        "justify-content": "center",
                    }), new WCssClass(`select.titleParam, select.titleParam:focus, select.titleParam:active`, {
                        cursor: "pointer",
                        "background-color": "#cee4f3",
                        border: "none",
                        color: "#126e8d",
                        outline: "none", padding: "5px",
                        "outline-width": "0",
                        margin: "0px",
                        font: "400 12px Arial",
                        "margin-bottom": "10px",
                    }), new WCssClass(`.labelParam`, {
                        display: "block",
                        padding: "5px",
                        "background-color": "#fff",
                        cursor: "pointer",
                        "border-bottom": "solid 2px #efefef"
                    }), new WCssClass(`.CharttableReport`, {
                        "grid-row": "2/3",
                        "grid-column": "1/2"
                    }),

                ],
                MediaQuery: [{
                    condicion: "(max-width: 600px)",
                    ClassList: [
                    ]
                }]
            }
        }
        return WTableStyle;
    }
}
customElements.define("w-table-dynamic", WTableDynamicComp);
export { WTableDynamicComp }