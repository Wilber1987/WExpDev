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
                        padding: "10px",
                        transition: "all 1s"
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
            trGroup.children.push({ type: "Tlabel", children: [WArrayF.Capitalize(Group[Groups.groupParam])] });
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
            //this.MainTable.style.display = "flex";
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
            if (props == this.EvalValue) {
                divEvalValue.children.push(LabelP);
            } else if (props == this.AttNameEval) {
                divEvalAttib.children.push(LabelP);
            } else if (this.groupParams.find(x => x == props)) {
                divEvalGroups.children.push(LabelP);
            } else {
                divAtt.children.push(LabelP);
            }
        }
        const TOpcion = WRender.createElement({
            type: "div",
            props: { class: "TableOptions", id: "TableOptions" + this.id }
        });
        const divBTNS = WRender.createElement({
            type: 'div', props: { id: '', class: 'TableOptionsBTN' }, children: [
                {
                    type: 'input', props: {
                        style: 'transform: rotate(90deg)', type: 'button', class: 'BtnTableSR', value: '>', onclick: async (ev) => {
                            if (TOpcion.className == "TableOptions") {
                                ev.target.style["transform"] = "inherit";                                
                                TOpcion.className = "TableOptionsInact";
                                this.style.gridTemplateColumns = "calc(100% - 70px) 70px";
                            } else {
                                ev.target.style["transform"] = "rotate(90deg)";                                
                                TOpcion.className = "TableOptions";
                                this.style.gridTemplateColumns = "calc(100% - 350px) 350px";
                            }
                        }
                    }
                }, {
                    type: 'button', props: {
                         class: 'BtnTableSR', innerText: '', onclick: async () => {
                            //code.....
                        }
                    }, children: [ { type:'img', props: { src: this.Icons.filter , srcset: this.Icons.filter }} ]
                },  {
                    type: 'button', props: {
                         class: 'BtnTableSR', innerText: '', onclick: async () => {
                            //code.....
                        }
                    }, children: [ { type:'img', props: { src: this.Icons.config , srcset: this.Icons.config }} ]
                }
            ]
        });
        TOpcion.append(WRender.createElement(divBTNS),
            WRender.createElement(divAtt),
            WRender.createElement({
                type: 'div', props: {
                    class: 'TableOptionsAtribs OptionsAtribsGroup'
                }, children: [divEvalAttib, divEvalGroups, divEvalValue]
            }))
        return TOpcion;
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
                        transition: "all 1s"
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
                        "grid-template-rows": "50px 70% auto",
                        "box-shadow": "0 0 2px 0 rgba(0,0,0,50%)"
                    }), new WCssClass(`.TableOptions .TableOptionsBTN`, {
                        "grid-column": "1/3",
                        padding: 10,
                        "background-color": "#fff",
                    }), new WCssClass(`.TableOptions .TableOptionsAtribs`, {
                        display: "flex",
                        width: "100%",
                        "grid-row": "2/3",
                        "flex-direction": "column",
                        //"padding-bottom": "20px",
                        "background-color": "#fff",
                        "box-shadow": "0 0 2px 0 rgba(0,0,0,30%)",
                        height: "100%"
                    }), new WCssClass(`.TableOptions .OptionsAtribsGroup`, {
                        display: 'flex',
                        overflow: "hidden",
                        "flex-direction": "column",
                    }),
                    //OPTIONS INACT
                    new WCssClass(`.TableOptionsInact`, {
                        display: "grid",
                        "grid-gap": 10,
                        "background-color": "#eee",
                        padding: 10,
                        transition: "all 1s",
                        overflow: "hidden",
                        "grid-column": "2/3",
                        "grid-row": "1/3",
                        "grid-template-columns": "98%",
                        "grid-template-rows": "50px 70% auto",
                        "box-shadow": "0 0 2px 0 rgba(0,0,0,50%)"
                    }),   new WCssClass(`.TableOptionsInact .TableOptionsBTN`, {
                        "grid-column": "1/2",
                        "grid-row": "1/4",
                        display: "flex",
                        "flex-direction": "column",                        
                        padding: 10,
                        "background-color": "#fff",
                    }), new WCssClass(`.TableOptionsInact .TableOptionsAtribs`, {
                        display: "none"                       
                    }), //BOTONES
                    new WCssClass(`.Btn,.BtnTable, .BtnTableA, .BtnTableS, .BtnTableSR`, {
                        "font-weight": "bold",
                        "border": "none",
                        "padding": "5px",
                        "margin": "2px",
                        "text-align": "center",
                        "display": "inline-block",                        
                        "font-size": "12px",
                        "cursor": "pointer",
                        "background-color": "#4894aa",
                        "color": "#fff",
                        "border-radius": "0.2cm"
                    }), new WCssClass(`.BtnTableSR`, {
                        width:30,
                        height: 30,
                        "background-color": "#4894aa",
                        "font-family": "monospace"
                    }), new WCssClass(`.BtnTableSR img`, {
                        width:20,
                        height: 20,
                        filter: "invert(100%)"
                    }),//---------------------------------------->
                    new WCssClass(`.titleParam`, {
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
    Icons = {
        filter: "data:image/svg+xml;base64," + "PHN2ZyBoZWlnaHQ9IjUxMXB0IiB2aWV3Qm94PSIwIDAgNTExIDUxMS45OTk4MiIgd2lkdGg9IjUxMXB0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im00OTIuNDc2NTYyIDBoLTQ3MS45NzY1NjJjLTExLjA0Njg3NSAwLTIwIDguOTUzMTI1LTIwIDIwIDAgNTUuNjk1MzEyIDIzLjg3NSAxMDguODY3MTg4IDY1LjUwMzkwNiAxNDUuODcxMDk0bDg3LjU4OTg0NCA3Ny44NTE1NjJjMTUuMTg3NSAxMy41IDIzLjg5ODQzOCAzMi44OTg0MzggMjMuODk4NDM4IDUzLjIyMjY1NnYxOTUuMDMxMjVjMCAxNS45Mzc1IDE3LjgxMjUgMjUuNDkyMTg4IDMxLjA4OTg0MyAxNi42MzY3MTlsMTE3Ljk5NjA5NC03OC42NjAxNTZjNS41NjI1LTMuNzEwOTM3IDguOTA2MjUtOS45NTMxMjUgOC45MDYyNS0xNi42NDA2MjV2LTExNi4zNjcxODhjMC0yMC4zMjQyMTggOC43MTA5MzctMzkuNzIyNjU2IDIzLjg5ODQzNy01My4yMjI2NTZsODcuNTg1OTM4LTc3Ljg1MTU2MmM0MS42Mjg5MDYtMzcuMDAzOTA2IDY1LjUwMzkwNi05MC4xNzU3ODIgNjUuNTAzOTA2LTE0NS44NzEwOTQgMC0xMS4wNDY4NzUtOC45NTMxMjUtMjAtMTkuOTk2MDk0LTIwem0tNzIuMDgyMDMxIDEzNS45NzI2NTYtODcuNTg1OTM3IDc3Ljg1NTQ2OWMtMjMuNzE4NzUgMjEuMDg1OTM3LTM3LjMyNDIxOSA1MS4zNzg5MDYtMzcuMzI0MjE5IDgzLjExMzI4MXYxMDUuNjY3OTY5bC03Ny45OTYwOTQgNTEuOTk2MDk0di0xNTcuNjYwMTU3YzAtMzEuNzM4MjgxLTEzLjYwNTQ2OS02Mi4wMzEyNS0zNy4zMjQyMTktODMuMTE3MTg3bC04Ny41ODU5MzctNzcuODUxNTYzYy0yOC4wNzAzMTMtMjQuOTU3MDMxLTQ1Ljk4ODI4MS01OS4xNTIzNDMtNTAuNzg1MTU2LTk1Ljk4MDQ2OGg0MjkuMzg2NzE5Yy00Ljc5Njg3NiAzNi44MjgxMjUtMjIuNzEwOTM4IDcxLjAyMzQzNy01MC43ODUxNTcgOTUuOTc2NTYyem0wIDAiLz48L3N2Zz4=",
        config: "data:image/svg+xml;base64," +  "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgNTEyLjAwMiA1MTIuMDAyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIuMDAyIDUxMi4wMDI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHBhdGggc3R5bGU9ImZpbGw6IzQ1NUE2NDsiIGQ9Ik00OTYuNjQ3LDMxMi4xMDdsLTQ3LjA2MS0zNi44YzEuNDU5LTEyLjg0NCwxLjQ1OS0yNS44MTIsMC0zOC42NTZsNDcuMTA0LTM2LjgyMQoJYzguODI3LTcuMTA5LDExLjE4Ni0xOS41NzUsNS41NjgtMjkuNDE5bC00OC45Ni04NC42MjljLTUuNjM5LTkuOTA2LTE3LjY0OS0xNC4yMzItMjguMzA5LTEwLjE5N2wtNTUuNDY3LDIyLjMxNQoJYy0xMC40MjMtNy41NjItMjEuNTg4LTE0LjA0NS0zMy4zMjMtMTkuMzQ5bC04LjUxMi01OC45MjNjLTEuNTM1LTExLjMxMi0xMS4yNC0xOS43Mi0yMi42NTYtMTkuNjI3aC05OC4xMzMKCWMtMTEuMzIxLTAuMDY4LTIwLjk0OCw4LjI0Ni0yMi41MjgsMTkuNDU2bC04LjUzMyw1OS4wOTNjLTExLjY5OSw1LjM1NS0yMi44NDYsMTEuODQzLTMzLjI4LDE5LjM3MUw4Ni45NCw3NS41NjMKCWMtMTAuNTUtNC4xNTktMjIuNTQ5LDAuMTE1LTI4LjA5NiwxMC4wMDVMOS44NDEsMTcwLjM0N2MtNS43NjksOS44Ni0zLjM5NCwyMi40NjMsNS41NjgsMjkuNTQ3bDQ3LjA2MSwzNi44CgljLTEuNDczLDEyLjg0My0xLjQ3MywyNS44MTMsMCwzOC42NTZsLTQ3LjEwNCwzNi44Yy04Ljg0Miw3LjA5OS0xMS4yMTIsMTkuNTcyLTUuNTg5LDI5LjQxOWw0OC45MzksODQuNjUxCgljNS42MzIsOS45MTMsMTcuNjQ5LDE0LjI0MiwyOC4zMDksMTAuMTk3bDU1LjQ2Ny0yMi4zMTVjMTAuNDMyLDcuNTY2LDIxLjYwNCwxNC4wNTYsMzMuMzQ0LDE5LjM3MWw4LjUzMyw1OC44OAoJYzEuNTAyLDExLjI4MiwxMS4xNDcsMTkuNjk0LDIyLjUyOCwxOS42NDhoOTguMTMzYzExLjM0MiwwLjA5MSwyMS04LjIyNiwyMi41OTItMTkuNDU2bDguNTMzLTU5LjA5MwoJYzExLjY5OC01LjM1NywyMi44NDQtMTEuODQ1LDMzLjI4LTE5LjM3MWw1NS42OCwyMi4zNzljMTAuNTUsNC4xNDksMjIuNTQzLTAuMTIyLDI4LjA5Ni0xMC4wMDVsNDkuMTUyLTg1LjEyCglDNTA3Ljg2NiwzMzEuNTA1LDUwNS40NDcsMzE5LjEzOSw0OTYuNjQ3LDMxMi4xMDd6IE0yNTUuOTY0LDM2Mi42NjdjLTU4LjkxLDAtMTA2LjY2Ny00Ny43NTYtMTA2LjY2Ny0xMDYuNjY3CglzNDcuNzU2LTEwNi42NjcsMTA2LjY2Ny0xMDYuNjY3czEwNi42NjcsNDcuNzU2LDEwNi42NjcsMTA2LjY2N0MzNjIuNTYsMzE0Ljg4MiwzMTQuODQ1LDM2Mi41OTcsMjU1Ljk2NCwzNjIuNjY3eiIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K",

    }
}
customElements.define("w-table-dynamic", WTableDynamicComp);
export { WTableDynamicComp }