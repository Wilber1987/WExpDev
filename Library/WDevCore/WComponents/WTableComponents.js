import { WRender, ArrayFunctions } from "../WModules/WComponentsTools.js";
import { WCssClass } from "../WModules/WStyledRender.js";
class WTableComponent extends HTMLElement {
    constructor() {
        super();
        this.TableClass = "WTable";
    }
    connectedCallback() {
        //console.log(this.TableConfig);
        this.Dataset = this.TableConfig.Datasets;
        this.Colors = ["#ff6699", "#ffbb99", "#adebad"];
        this.AttNameEval = this.TableConfig.AttNameEval;
        this.AttNameG1 = this.TableConfig.AttNameG1;
        this.AttNameG2 = this.TableConfig.AttNameG2;
        this.AttNameG3 = this.TableConfig.AttNameG3;
        this.EvalValue = this.TableConfig.EvalValue;

        if (typeof this.Dataset === "undefined" || this.Dataset.length == 0) {
            return;
        }
        if (this.TableConfig.TableClass) {
            this.TableClass = this.TableConfig.TableClass;
        }
        //this.DrawTable();  
        this.DrawGroupTable();
    }
    //BASIC TABLE----------------------
    DrawTable() {
        let table = { type: "table", props: { class: this.TableClass }, children: [] };
        table.children.push(this.DrawTHead());
        table.children.push(this.DrawTBody());
        this.append(WRender.createElement(WTableStyle));
        this.append(WRender.createElement(table));
    }
    DrawTHead = () => {
        let thead = { type: "thead", props: {}, children: [] };
        const element = this.Dataset[0];
        let tr = { type: "tr", children: [] }
        thead.children.push(tr);
        for (const prop in element) {
            tr.children.push({
                type: "th", children: [prop]
            });
        }
        return thead;
    }
    DrawTBody = () => {
        let tbody = { type: "tbody", props: {}, children: [] };
        this.Dataset.forEach(element => {
            let tr = { type: "tr", children: [] }
            for (const prop in element) {
                tr.children.push({
                    type: "td", children: [element[prop].toString()]
                });
            }
            tbody.children.push(tr);
        });
        return tbody;
    }
    //GROUP TABLE
    DrawGroupTable() {
        this.GroupsData = [];
        if (!this.groupParams) {
            this.groupParams = [
                this.AttNameG3
                , this.AttNameG2
                , this.AttNameG1
            ];
        }
        this.EvalArray = ArrayFunctions.ArryUnique(this.TableConfig.Datasets, this.AttNameEval);
        this.groupParams.forEach(groupParam => {
            this.GroupsData.push(ArrayFunctions.ArryUnique(this.TableConfig.Datasets, groupParam))
        });
        let table = { type: "div", props: { class: this.TableClass }, children: [] };
        let div = this.DrawGroupDiv(this.ChargeGroup(this.GroupsData))
        table.children.push(div);
        this.append(WRender.createElement(this.TableOptions()));
        this.append(WRender.createElement(WTableStyle));
        this.append(WRender.createElement(table));
    }
    //no table
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
        div.children.push({ type: "Tlabel", children: ["cajon"] });
        this.EvalArray.forEach(evalValue => {
            div.children.push({ type: "TData", children: [evalValue[this.AttNameEval]] });
        });
        return div;
    }
    DrawGroupDiv = (Groups, div = { type: "div", props: { class: "TContainer" }, children: [this.AttEval()] }, arrayP = {}) => {
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
                this.EvalArray.forEach(Eval => {
                    arrayP[this.AttNameEval] = Eval[this.AttNameEval];
                    dataGroup.children.push({ type: "TData", children: [this.FindData(arrayP)] });
                });
            }
            div.children.push(trGroup);
        });
        return div;
    }
    FindData(arrayP) {
        let val = false;
        let node = null;
        this.TableConfig.Datasets.forEach(Data => {
            val = this.compareObj(arrayP, Data)
            if (val == true) {
                node = Data
                return;
            }
        });
        if (node != null) {
            return node[this.EvalValue];
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
    /////////////////////////////////////////////////////////  
    TableOptions = () => {
        let divAtt = {
            type: "div", props: {
                class: "TableOptionsAtribs", id: this.id + "ListAtribs",
                ondrop: this.drop, ondragover: this.allowDrop
            }, children: [{
                type: "label", props: { innerText: "Parametros", class: "titleParam" }
            }]
        };
        let model = this.Dataset[0];
        for (const props in model) {
            divAtt.children.push({
                type: "label", children: [props], props: {
                    id: props, class: "labelParam",
                    draggable: true, ondragstart: this.drag
                }
            });
        }
        let divEvalAttib = {
            type: "div", props: {
                class: "TableOptionsAtribs", id: this.id + "ListEval" ,
                ondrop: this.drop, ondragover: this.allowDrop
            }, children: [{
                type: "label", props: { innerText: "Evaluación", class: "titleParam" }
            }]
        };
        let divEvalValue = {
            type: "div", props: {
                class: "TableOptionsAtribs", id: this.id + "ListValue" ,
                ondrop: this.drop, ondragover: this.allowDrop
            }, children: [{
                type: "label", props: { innerText: "Valor", class: "titleParam" }
            }]
        };
        let divEvalGroups = {
            type: "div", props: {
                class: "TableOptionsAtribs", id: this.id + "ListGroups" ,
                ondrop: this.drop, ondragover: this.allowDrop
            }, children: [{
                type: "label", props: { innerText: "Agrupaciones", class: "titleParam" }
            }]
        };
        return { type: "div", props: { class: "TableOptions" }, 
            children: [divAtt, divEvalAttib, divEvalValue, divEvalGroups] };
    }
    allowDrop(ev) {        
        ev.preventDefault();
    }
    drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }
    drop(ev) {
        console.log(this)
        ev.preventDefault();      
        var data = ev.dataTransfer.getData("text");
        let target =  ev.target;       
        if (target.className == "TableOptionsAtribs") { 
            //console.log(target.children.length)    
            //console.log(target.id)
            if (target.id.includes("ListEval") && target.children.length == 2) {
                console.log("entro1")             
            } else if (target.id.includes("ListValue") && target.children.length == 2) {
                console.log("entro2") 
            } else {
                target.appendChild(document.getElementById(data));
            }
        } else{
            alert("error")
        }       
    }
}
const WTableStyle = {
    type: "w-style",
    props: {
        ClassList: [
            new WCssClass("w-table .WTable", {
                "font-family": "Verdana, sans-serif",
                width: "100%",
                "align-items": "flex-end",
                border: "solid 1px #000",
                "overflow-y": "hidden",
                "overflow-x": "scroll"
            }),
            new WCssClass("w-table .WTable td", {
                padding: "5px"
            }),
            //flexcajones
            new WCssClass("w-table .TContainer", {
                padding: "0px",
                display: "flex",
            }),
            new WCssClass("w-table .TContainerBlock", {
                "border-right": "1px solid #000"
            }), new WCssClass(" w-table .TContainerBlockL", {
                display: "flex",
                "flex-direction": "column",
                "justify-content": "flex-end",
                "border-right": "1px solid #000"
            }),
            new WCssClass("w-table  Tlabel", {
                display: "block",
                padding: "5px",
                "border-bottom": "1px solid #000"
            }), new WCssClass("w-table .TContainerBlockData .Cajon", {
                overflow: "hidden",
                display: "flex",
                "flex-direction": "column"

            }),
            new WCssClass("w-table .flexChild", {
                padding: "0px",
            }),
            new WCssClass("w-table TData", {
                padding: "5px"
            }),
            new WCssClass("w-table .Cajon", {
                display: "flex"
            }),
            new WCssClass("w-table .TableOptions", {
                display: "flex",
            }),
            new WCssClass("w-table .TableOptionsAtribs", {
                display: "flex",
                width: "100%",
                "flex-direction": "column",
                border: "1px solid #000",
                "padding-bottom": "20px",
                "background-color": "#efefef"                
            }), 
            new WCssClass("w-table .titleParam", {
                display: "block",                
                padding: "10px",               
                "border-bottom": "1px solid #000",
                "margin-bottom": "10px"
            }),
            new WCssClass("w-table .labelParam", {
                display: "block",                
                padding: "10px",
                "background-color": "#fff",cursor:"pointer"
            }),
        ]
    }
}
customElements.define("w-table", WTableComponent);