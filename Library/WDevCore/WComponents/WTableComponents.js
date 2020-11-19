import { WRender, WArrayF, DomComponent, WAjaxTools } from "../WModules/WComponentsTools.js";
import { WCssClass } from "../WModules/WStyledRender.js";
import "./WChartJSComponent.js";
import "./WModalForm.js";
class WTableComponent extends HTMLElement {
    constructor() {
        super();
        this.TableClass = "WTable WScroll";
        this.Dataset = [];
        this.selectedItems = [];
        this.ModelObject = {};
        this.paginate = true;
    }
    connectedCallback() {
        this.innerHTML = "";
        this.append(WRender.createElement(WTableStyle));
        this.AddItemsFromApi = this.TableConfig.AddItemsFromApi;
        this.SearchItemsFromApi = this.TableConfig.SearchItemsFromApi;
        if (this.TableConfig != undefined && this.TableConfig.MasterDetailTable == true) {
            this.Dataset = [];
            if (this.TableConfig.Options) {
                this.Options = this.TableConfig.Options;
            } else {
                this.Options = {
                    //TH OPTIONS
                    Search: true,
                    Add: true,
                    //TBODY OPTIONS
                    Edit: true,
                    Show: true,
                    //Select: true,                
                    //Delete: true,
                };
            }
            if (this.TableConfig.ModelObject) {
                this.ModelObject = this.TableConfig.ModelObject;
            }
            if (this.TableConfig.selectedItems == undefined) {
                this.selectedItems = [];
            } else {
                this.selectedItems = this.TableConfig.selectedItems;
            }
            this.DrawTable();
            return;
        } else if (typeof this.TableConfig.Datasets === "undefined" || this.TableConfig.Datasets.length == 0) {
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
        if (this.TableConfig.paginate != undefined) {
            this.paginate = this.TableConfig.paginate;
        }
        if (this.TableConfig.TableClass) {
            this.TableClass = this.TableConfig.TableClass + " WScroll";
        }
        this.RunTable();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log('Custom attributes changed.' + oldValue + "  -  " + newValue);
    }
    static get observedAttributes() {
        //return ["id", "Dataset"];
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
    DefineObjectModel(Dataset = this.Dataset) {
        if (this.TableConfig.ModelObject == undefined) {
            for (const prop in Dataset[0]) {
                this.ModelObject[prop] = Dataset[0][prop];
            }
        } else {
            this.ModelObject = this.TableConfig.ModelObject;
        }
    }
    DrawTable(Dataset = this.Dataset) {
        this.DefineObjectModel(Dataset);
        let table = this.querySelector("#MainTable" + this.id);
        this.append(WRender.createElement(this.DrawHeadOptions()));
        this.maxElementByPage = 5;
        if (typeof table === "undefined" || table == null) {
            table = { type: "table", props: { class: this.TableClass, id: "MainTable" + this.id }, children: [] };
            table.children.push(this.DrawTHead());
            const tbody = this.DrawTBody(Dataset);
            if (this.paginate == true && Dataset.length > this.maxElementByPage) {
                tbody.children.forEach(tb => {
                    table.children.push(tb);
                });
            } else {
                table.children.push(tbody);
            }
            let divTableCntainer = { type: "div", props: { class: "tableContainer" }, children: [table] }
            this.append(WRender.createElement(divTableCntainer));
            if (this.paginate == true) {
                this.append(WRender.createElement({
                    type: "div", props: { class: "tfooter" },
                    children: this.DrawTFooter(tbody.children)
                }));
            }
        } else {
            table.style.display = "table";
            table.innerHTML = "";
            table.append(WRender.createElement(this.DrawTHead()));
            const tbody = this.DrawTBody(Dataset);
            if (this.paginate == true && Dataset.length > this.maxElementByPage) {
                tbody.children.forEach(tb => {
                    table.append(WRender.createElement(tb));
                });
            } else {
                table.append(WRender.createElement(tbody));
            }
            let footer = this.querySelector(".tfooter");
            if (typeof footer !== "undefined" && footer != null) {
                footer.innerHTML = "";
                if (this.paginate == true) {
                    this.DrawTFooter(tbody.children).forEach(element => {
                        footer.append(WRender.createElement(element));
                    });
                }
            }
        }
    }
    DrawTHead = (element = this.ModelObject) => {
        const thead = { type: "thead", props: {}, children: [] };
        //const element = this.Dataset[0];
        let tr = { type: "tr", children: [] }
        for (const prop in element) {
            tr.children.push({
                type: "th",
                children: [prop]
            });
        }
        if (this.Options != undefined) {
            const Options = { type: "th", props: { class: "" }, children: ["Options"] };
            if (this.Options.Show != undefined
                || this.Options.Show != undefined
                || this.Options.Show != undefined) {
                tr.children.push(Options);
            }
        }
        thead.children.push(tr);
        return thead;
    }
    DrawHeadOptions() {
        if (this.querySelector(".thOptions")) {
            this.querySelector(".thOptions").style.display = "flex";
            return "";
        }
        if (this.Options != undefined) {
            if (this.Options.Search != undefined || this.Options.Add != undefined) {
                const trOptions = { type: "div", props: { class: "thOptions" }, children: [] }
                if (this.Options.Search != undefined) {
                    const InputOptions = {
                        type: "input", props: {
                            class: "txtControl", type: "text", placeholder: "Search...",
                            onchange: async (ev) => {
                                if (this.SearchItemsFromApi != undefined) {
                                    if (this.SearchItemsFromApi.Function != undefined) {
                                        const Dataset = await this.SearchItemsFromApi.Function(ev.target.value);
                                        this.DrawTable(Dataset);
                                    } else {
                                        const Dataset = await WAjaxTools.PostRequest(
                                            this.SearchItemsFromApi.ApiUrl,
                                            { Param: ev.target.value }
                                        );
                                        this.DrawTable(Dataset.data);
                                    }
                                } else {
                                    const Dataset = this.Dataset.filter((element) => {
                                        for (const prop in element) {
                                            if (element[prop].toString().includes(ev.target.value)) {
                                                return element;
                                            }
                                        }
                                    })
                                    this.DrawTable(Dataset);
                                }
                            }
                        }
                    }
                    trOptions.children.push(InputOptions);
                }
                if (this.Options.Add != undefined) {
                    const BtnOptions = {
                        type: "button", props: {
                            class: "Btn", type: "button", innerText: "Add+",
                            onclick: async () => {
                                this.append(WRender.createElement({
                                    type: "w-modal-form", props: {
                                        ObjectModel: this.ModelObject,
                                        AddItemsFromApi: this.AddItemsFromApi,
                                        Dataset: this.Dataset,
                                        ObjectOptions: {
                                            AddObject: true,
                                            SaveFunction: (NewObject) => {
                                                if (this.AddItemsFromApi == null) {
                                                    this.Dataset.push(NewObject);
                                                }
                                                this.DrawTable();
                                            }
                                        }
                                    }
                                }));
                            }
                        }
                    }
                    trOptions.children.push(BtnOptions);
                }
                return trOptions;
            }
        }
        return "";
    }
    DrawTBody = (Dataset = this.Dataset) => {
        let tbody = { type: "tbody", props: {}, children: [] };
        this.numPage = 1;
        if (this.paginate == true && Dataset.length > this.maxElementByPage) {
            this.numPage = Dataset.length / this.maxElementByPage;
            for (let index = 0; index < this.numPage; index++) {
                let tBodyStyle = "display:none";
                if (index == 0) {
                    tBodyStyle = "display:table-row-group";
                }
                tbody.children.push({ type: "tbody", props: { class: "tbodyChild", style: tBodyStyle }, children: [] });
            }
        }
        tbody.children.push(this.MediaStyleResponsive())
        let page = 0;
        Dataset.forEach((element) => {
            let tr = { type: "tr", children: [] };
            for (const prop in element) {
                let value = "";
                //console.log(element[prop])
                if (element[prop] != null) {
                    value = element[prop].toString();
                }
                tr.children.push({
                    type: "td",
                    children: [value]
                });
            }
            if (this.Options != undefined) {
                const Options = { type: "td", props: { class: "tdAction" }, children: [] };
                if (this.Options.Show != undefined && this.Options.Show == true) {
                    Options.children.push({
                        type: "button", props: {
                            class: "BtnTable", type: "button", innerText: "Show", onclick: async () => {
                                this.append(WRender.createElement({
                                    type: "w-modal-form", props: {
                                        ObjectDetail: element
                                    }
                                }));
                            }
                        }
                    })
                }
                if (this.Options.Edit != undefined && this.Options.Edit == true) {
                    Options.children.push({
                        type: "button", props: {
                            class: "BtnTableS", type: "button", innerText: "Edit", onclick: async () => {
                                this.append(WRender.createElement({
                                    type: "w-modal-form", props: {
                                        ObjectModel: this.ModelObject,
                                        EditObject: element,
                                        ObjectOptions: {
                                            SaveFunction: () => {
                                                this.DrawTable();
                                            }
                                        }
                                    }
                                }));
                            }
                        }
                    })
                }
                if (this.Options.Delete != undefined && this.Options.Delete == true) {
                    Options.children.push({
                        type: "button", props: {
                            class: "BtnTableA", type: "button", innerText: "Delete",
                            onclick: async () => {
                                this.append(WRender.createElement({
                                    type: "w-modal-form", props: {
                                        id: "Alert" + this.id,
                                        ObjectModal: { type: "h5", children: ["¿Esta seguro de eliminar este elemento?"] },
                                        ObjectOptions: {
                                            SaveFunction: () => {
                                                const index = Dataset.indexOf(element);
                                                if (WArrayF.FindInArray(element, Dataset) == true) {
                                                    ;
                                                    Dataset.splice(index, 1);
                                                    this.DrawTable();
                                                } else { console.log("No Object") }
                                            }
                                        }
                                    }
                                }));
                            }
                        }
                    })
                }
                if (this.Options.Select != undefined && this.Options.Select == true) {
                    let Checked = WArrayF.FindInArray(element, this.selectedItems);
                    Options.children.push({
                        type: "input", props: {
                            class: "Btn", type: "checkbox", innerText: "Select", checked: Checked,
                            onclick: async (ev) => {
                                const control = ev.target;
                                const index = this.selectedItems.indexOf(element);
                                if (index == -1 && control.checked == true) {
                                    if (WArrayF.FindInArray(element, this.selectedItems) == false) {
                                        this.selectedItems.push(element)
                                    } else {
                                        console.log("Item Existente")
                                    }
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
            if (this.numPage > 1 && tbody.children[page]) {
                tbody.children[page].children.push(tr);
                if (tbody.children[page].children.length == this.maxElementByPage) {
                    //console.log(this.maxElementByPage)
                    page++;
                }
            } else {
                //console.log("no page")
                tbody.children.push(tr);
            }
        });
        if (tbody.children.length == 0) {
            tbody.children.push({ type: "h5", props: { innerText: "No hay elementos en la tabla" } });
        }
        return tbody;
    }
    DrawTFooter(tbody) {
        let tfooter = [];
        this.ActualPage = 0;
        const SelectPage = (index) => {
            let bodys = this.querySelectorAll("#MainTable" + this.id + " tbody");
            bodys.forEach((body, indexBody) => {
                if (indexBody == index) {
                    body.style.display = "table-row-group";
                } else {
                    body.style.display = "none";
                }
            });
            let buttons = this.querySelectorAll(".tfooter a");
            buttons.forEach((button, indexBtn) => {
                if (indexBtn == index) {
                    button.className = "paginateBTN paginateBTNActive";
                } else {
                    button.className = "paginateBTN";
                }
            });
        }
        /*if (tbody.length == 0) {
            return tfooter;
        }*/
        tfooter.push({
            type: "label",
            props: {
                innerText: "Previous", class: "pagBTN", onclick: () => {
                    this.ActualPage = this.ActualPage - 1;
                    if (this.ActualPage < 0) {
                        this.ActualPage = tbody.length - 1;
                    }
                    SelectPage(this.ActualPage);
                }
            }
        });
        for (let index = 0; index < this.numPage; index++) {
            let btnClass = "paginateBTN";
            if (index == 0) {
                btnClass = "paginateBTN paginateBTNActive";
            }
            tfooter.push({
                type: "a",
                props: {
                    innerText: index + 1, class: btnClass, onclick: () => {
                        SelectPage(index);
                    }
                }
            });
        }
        tfooter.push({
            type: "label",
            props: {
                innerText: "Next", class: "pagBTN", onclick: () => {
                    this.ActualPage = this.ActualPage + 1;
                    if (this.ActualPage > tbody.length - 1) {
                        this.ActualPage = 0;
                    }
                    SelectPage(this.ActualPage);
                }
            }
        });
        return tfooter;
    }
    //FIN BASIOC TABLE-------------------------------------------------------------------
    DrawGroupTable() {
        this.groupParams.forEach(groupParam => {
            this.GroupsData.push(WArrayF.ArryUnique(this.TableConfig.Datasets, groupParam))
        });
        this.table = { type: "div", props: { id: "MainTable" + this.id, class: this.TableClass }, children: [] };
        let div = this.DrawGroupDiv(this.ChargeGroup(this.GroupsData))
        this.table.children.push(div);
        let divTableCntainer = { type: "div", props: { class: "tableContainer" }, children: [this.table] };
        this.append(WRender.createElement(div));
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
    DefineTable(Dataset = this.Dataset) {
        this.ProcessData = [];
        let table = this.querySelector("#MainTable" + this.id);
        let footer = this.querySelector(".tfooter");
        if (typeof footer !== "undefined" && footer != null) {
            footer.innerHTML = "";
        }
        let thOptions = this.querySelector(".thOptions");
        if (typeof thOptions !== "undefined" && thOptions != null) {
            thOptions.style.display = "none"
        }
        if (this.EvalValue == null) {
            //table.innerHTML = "Agregue un Value";
            this.DrawTable(Dataset);
        } else {
            table.innerHTML = "";
            this.GroupsData = [];
            table.style.display = "flex";
            //console.log(Dataset)
            //console.log(this.Dataset)
            this.groupParams.forEach(groupParam => {
                this.GroupsData.push(WArrayF.ArryUnique(Dataset, groupParam))
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
                    let find = this.groupParams.find(a => a == document.getElementById(data).innerText);
                    if (!find) {
                        this.groupParams.push(document.getElementById(data).innerText);
                    }
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
                if (OriginalParent.includes("ListGroups")) {
                    this.groupParams = [];
                    const Parent = this.querySelector("#" + OriginalParent);
                    Parent.querySelectorAll(".labelParam").forEach(element => {
                        this.groupParams.push(element.innerText);
                    });
                }
                this.DefineTable();
            } else {
                console.log("error")
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
            val = WArrayF.compareObj(arrayP, Data)
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
    MediaStyleResponsive() {
        const ClassList = [];
        let index = 1;
        for (const prop in this.ModelObject) {
            ClassList.push(new WCssClass(`#${this.id} td:nth-of-type(${index}):before`, {
                content: `"${prop}:"`,
                "margin-right": "10px"
            }))
            index++;
        }
        return {
            type: "w-style",
            props: { MediaQuery: {
                condicion: "max-width: 600px", ClassList: ClassList
            }}
        }
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
                "border-radius": "0.2cm",
                "min-height": "50px",
            }),
            //ESTILO DE LA TABLA BASICA----------------------------tableContainer
            new WCssClass("w-table .tableContainer", {
                overflow: "auto"
            }), new WCssClass("w-table .WTable", {
                "font-family": "Verdana, sans-serif",
                width: "100%",
                "border-collapse": "collapse",
                "border-top": "solid 1px #999999",
                position: "relative"
            }), new WCssClass("w-table .WTable th", {
                padding: "0.5rem",
                "text-align": "left",
                border: "1px #ccc solid"
            }), new WCssClass("w-table .WTable td", {
                padding: "0.25rem",
                "text-align": "left",
                border: "1px #ccc solid"
            }), new WCssClass("w-table .WTable .tdAction", {
                "text-align": "center",
                "width": "250px",
            }), new WCssClass("w-table .WTable tbody tr:nth-child(odd)", {
                "background-color": "#eee"
            }), new WCssClass("w-table .thOptions", {
                display: "flex",
                width: "100%", overflow: "hidden"
            }), new WCssClass("w-table input[type=text], w-table input[type=string], w-table input[type=number], w-table input[type=date]", {
                padding: "8px", border: "none", "border-bottom": "2px solid #999999",
                width: "calc(100% - 16px)", "font-size": "15px", height: "20px"
            }), new WCssClass("w-table input:active, w-table input:focus", {
                "border-bottom": "2px solid #0099cc", outline: "none",
            }), new WCssClass("w-table input[type=button]", {
                cursor: "pointer", width: "calc(100% - 0px)", height: "initial"
            }),
            //FIN ESTILO TABLA BASICAA------------------------------
            //flexcajones TABLA DINAMICA----------------------------
            new WCssClass("w-table .TContainer", {
                padding: "0px",
                display: "flex",
                "flex-grow": 1,
            }), new WCssClass("w-table .TContainerBlock", {
                width: "100%"
            }), new WCssClass(" w-table .TContainerBlockL", {
                display: "flex",
                "flex-direction": "column",
                "justify-content": "flex-end",
                "background-color": "rgb(236, 235, 235)",
                "font-weight": "bold",
            }), new WCssClass(" w-table .TContainerBlockData", {
                width: "100%"
            }), new WCssClass("w-table  Tlabel", {
                display: "block",
                //padding: "5px",
                "border-bottom": "1px solid #000",
                //height: "30px",
                "overflow-y": "hidden",
                "white-space": "nowrap",
                "overflow": "hidden",
                "text-overflow": "ellipsis",
                "min-width": "60px",
                "background-color": "#d4d4d4",
                color: "#000",
                padding: "0.5rem",
                "text-align": "left",
                "font-weight": "bold",
                border: "1px rgb(185, 185, 185) solid",
            }), new WCssClass("w-table .TContainerBlockData .Cajon", {
                overflow: "hidden",
                display: "flex",
                "flex-direction": "column",
            }), new WCssClass("w-table .flexChild", {
                padding: "0px",
                width: "100%"
            }), new WCssClass("w-table TData", {
                //padding: "5px",
                //height: "30px",
                "overflow-y": "hidden",
                "white-space": "nowrap",
                "overflow": "hidden",
                "text-overflow": "ellipsis",
                "min-width": "60px",
                padding: "0.5rem",
                "text-align": "left",
                border: "1px #ccc solid"
            }), new WCssClass("w-table TDataTotal", {
                "overflow-y": "hidden",
                "white-space": "nowrap",
                "overflow": "hidden",
                "text-overflow": "ellipsis",
                "min-width": "60px",
                "border-top": "solid 1px #000",
                "border-bottom": "solid 1px #000",
                padding: "0.5rem",
                "text-align": "left",
                "font-weight": "bold",
                border: "1px #ccc solid",
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
                height: "40px"
            }), new WCssClass("w-table .labelParam", {
                display: "block",
                padding: "10px",
                "background-color": "#fff",
                cursor: "pointer",
                border: "solid 3px #efefef"
            }), new WCssClass("w-table .btn", {
                "margin-left": "10px",
                cursor: "pointer",
                display: "inline-block",
                "font-weight": "bold",
                position: "absolute",
                transform: "rotate(90deg)"
            }), new WCssClass("w-table .txtControl", {
                "display": "block",
                "width": "100%",
                "padding": ".375rem .75rem",
                "font-size": "1rem",
                "line-height": "1.5",
                "color": "#495057",
                "background-color": "#fff",
                "background-clip": "padding-box",
                "border": "1px solid #ced4da !important",
                "border-radius": ".25rem",
                "transition": "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
            }),
            //PAGINACIONM
            new WCssClass("w-table .paginateBTN", {
                display: "inline-block",
                padding: "8px",
                "background-color": "#09f",
                color: "#fff",
                "margin": "5px",
                cursor: "pointer",
                "border-radius": "0.2cm",
                "font-weight": "bold",
                transition: "all 0.6s"
            }), new WCssClass("w-table .pagBTN", {
                display: "inline-block",
                padding: "8px",
                "background-color": "rgb(3, 106, 175)",
                color: "#fff",
                "margin": "5px",
                cursor: "pointer",
                "border-radius": "0.2cm",
                "font-weight": "bold",
                transition: "all 0.6s",
                width: "80px",
                "text-align": "center",
            }), new WCssClass("w-table .paginateBTNActive", {
                "background-color": "rgb(3, 106, 175)",
            }), new WCssClass("w-table .tfooter", {
                display: "flex",
                border: "1px rgb(185, 185, 185) solid",
                "justify-content": "flex-end",
                "padding-left": "20px",
                "padding-right": "20px",
            }), new WCssClass("w-table h5", {
                padding: "0.25rem",
                "padding-left": "20px",
                "padding-right": "20px",
                margin: "0px",
            }), new WCssClass("w-table .BtnTable, .BtnTableA, .BtnTableS", {
                "font-weight": "bold",
                "border": "none",
                "padding": "10px",
                "text-align": "center",
                "display": "inline-block",
                "min-width": "50px",
                "cursor": "pointer",
                "background-color": "#09f",
                "color": "#fff",
                "border-right": "rgb(3, 106, 175) 5px solid",
            }), new WCssClass("w-table .BtnTableS", {
                "background-color": "#106705",
                "border-right": "#0a3e03 5px solid"
            }), new WCssClass("w-table .BtnTableA", {
                "background-color": "#af0909",
                "border-right": "#670505 5px solid"
            }),
        ], MediaQuery: {
            condicion: "max-width: 600px", ClassList: [
                new WCssClass("w-table divForm div", {
                    width: "calc(100% - 10px)", margin: "5px"
                }), new WCssClass("w-table .WTable", {
                    display: "block !important", //width: "100%"
                }), new WCssClass("w-table .WTable tbody", {
                    display: "block !important", //width: "100%"
                }), new WCssClass("w-table .WTable thead", {
                    display: "none !important", //width: "100%"
                }), new WCssClass("w-table .WTable tr", {
                    display: "block !important", border: "5px solid #808080"
                }), new WCssClass("w-table .WTable td", {
                    display: "flex !important",
                    //width: "100%"
                }), new WCssClass("w-table .WTable .tdAction", {
                    display: "flex !important", width: "calc(98% - 0.25rem)", "justify-content": "center", "align-items": "center"
                }),

            ]
        }
    }
}
customElements.define("w-table", WTableComponent);