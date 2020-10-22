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
        this.GroupsData = [
            ArrayFunctions.ArryUnique(this.TableConfig.Datasets, this.TableConfig.AttNameEval),
            ArrayFunctions.ArryUnique(this.TableConfig.Datasets, this.TableConfig.AttNameG1),
            ArrayFunctions.ArryUnique(this.TableConfig.Datasets, this.TableConfig.AttNameG2),
            ArrayFunctions.ArryUnique(this.TableConfig.Datasets, this.TableConfig.AttNameG3)
        ];
        this.GroupsData2 = [];
        this.groupParams = [this.AttNameG3, this.AttNameG2, this.AttNameG1];
        this.groupParams.forEach(groupParam => {
            this.GroupsData2.push(ArrayFunctions.ArryUnique(this.TableConfig.Datasets, groupParam))
        });
        console.log(this.GroupsData2);
        let table = { type: "table", props: { class: this.TableClass }, children: [] };
        //table.children.push(this.DrawGroupTH(this.ChargeGroup(this.GroupsData2)));
        let div = this.DrawGroupDiv(this.ChargeGroup(this.GroupsData2))
        console.log(div)
        table.children.push(div);
        //table.children.push(this.DrawGroupTBody());        
        this.append(WRender.createElement(WTableStyle));
        this.append(WRender.createElement(table));
    }
    DrawGroupTHead = () => {
        let thead = { type: "thead", props: {}, children: [] };
        const element = this.Dataset[0];
        let trGroup1 = { type: "tr", children: [] }
        let trGroup2 = { type: "tr", children: [] }
        let trGroup3 = { type: "tr", children: [] }
        thead.children.push(trGroup1);
        trGroup1.children.push({
            type: "th", children: [this.TableConfig.AttNameEval]
        });
        this.GroupsData[1].forEach(elementG1 => {
            trGroup1.children.push({
                type: "th", children: [elementG1[this.TableConfig.AttNameG1]]
            });
        });
        return thead;
    }
    DrawGroupTBody = () => {
        let tbody = { type: "tbody", props: {}, children: [] };
        this.GroupsData[0].forEach(element => {
            let tr = { type: "tr", children: [] };
            tr.children.push({
                type: "td", children: [element[this.TableConfig.AttNameEval].toString()]
            });
            this.GroupsData[1].forEach(elementG1 => {
                let value = this.Dataset.find(a =>
                    a[this.AttNameG1] == elementG1[this.AttNameG1]
                    && a[this.AttNameEval] == element[this.AttNameEval]
                );
                console.log(value)
                if (typeof value === "undefined") {
                    value = {}
                    value[this.EvalValue] = "n/a"
                }
                tr.children.push({
                    type: "td", children: [value[this.EvalValue].toString()]
                });
            });
            tbody.children.push(tr);
        });
        return tbody;
    }
    CreateGroupsArray(DataGroups, Dataset) {
        let NewGroupData = [];
        DataGroups.forEach(GroupValue => {
            NewGroupData.push(ArrayFunctions.ArryUnique(Dataset, GroupValue));
        });
        return NewGroupData;
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
    DrawGroupTH = (Groups, ParentLength = 1, thead = { type: "thead", props: {}, children: [] }) => {
        console.log(Groups);
        let trGroup = { type: "tr", children: [] };
        for (let index = 0; index < ParentLength; index++) {
            Groups.data.forEach((Group) => {
                trGroup.children.push({
                    type: "th", props: { colspan: 1 }, children: [Group[this.AttNameG1]]
                });
            });
        }
        thead.children.push(trGroup);
        if (Groups.children != null) {
            thead = this.DrawGroupTH(Groups.children, (Groups.data.length * ParentLength), thead);
        } else {
            //console.log(thead);
        }
        return thead;
    }
    //no table
    DrawGroupDiv = (Groups, div = { type: "div", props: { class: "TContainer" }, children: [] }, arrayP = {}) => {
        Groups.data.forEach((Group, index = 0) => {
            let trGroup = { type: "div", props: { class: "TContainerBlock" }, children: [] };
            trGroup.children.push({ type: "Tlabel", children: ["cajon"] });
            arrayP[Groups.groupParam] = Group[Groups.groupParam];
            if (Groups.children != null) {
                if (Groups.children.children == null) {
                    trGroup.props.class = "flexChild";
                }
                this.DrawGroupDiv(Groups.children, trGroup, arrayP);
            } else {
                const DataEval = ArrayFunctions.ArryUnique(this.TableConfig.Datasets, this.AttNameEval);
                DataEval.forEach(Eval => {
                    arrayP[this.AttNameEval] = Eval[this.AttNameEval];
                    trGroup.children.push({ type: "TData", children: [this.FindData(arrayP)] });
                });
            }
            div.children.push(trGroup);
            index++;
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
        if(node != null){
            return node[this.EvalValue];
        }else {
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
            new WCssClass("w-table .WTable", {
                "font-family": "Verdana, sans-serif",
                width: "100%",
            }),
            new WCssClass("w-table .WTable td", {
                padding: "5px"
            }),
            //flexcajones
            new WCssClass("w-table .TContainer", {
                padding: "0px",
                display: "block",
                border: "solid 1px #000",
                "overflow-y": "hiden",
                "overflow-x": "scroll"
            }),
            new WCssClass("w-table .TContainerBlock", {
                display: "block",
                border: "solid 1px #000",
                float: "left"
            }),
            new WCssClass("w-table .TContainerBlock Tlabel", {
                display: "block",
                border: "solid 1px #000",
                padding: "5px"
            }), new WCssClass("w-table .TContainerBlock div", {
                display: "block",
                border: "solid 1px #000",
                float: "left"
            }),
            new WCssClass("w-table .flexChild", {
                padding: "0px",
                display: "flex",
                "flex-direction": "column",
                border: "solid 1px #000",
            }),
            new WCssClass("w-table TData", {
                display: "block",
                padding: "5px"
            }),
        ]
    }
}
customElements.define("w-table", WTableComponent);