import { WRender, ArrayFunctions } from "../WModules/WComponentsTools.js";
import { WCssClass } from "../WModules/WStyledRender.js";
class WTableComponent extends HTMLElement {
    constructor(){
        super();     
        this.TableClass = "WTable";   
    }    
    connectedCallback(){
        //console.log(this.TableConfig);
        this.Dataset = this.TableConfig.Datasets;  
            this.Colors = ["#ff6699", "#ffbb99", "#adebad"];
            this.AttNameEval = "estado";
            this.AttNameG1 = "time";
            this.AttNameG2 = "categ2";
            this.AttNameG3 = "categ";
            this.EvalValue = "cantidad";
       
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
    DrawTable(){        
        let table = {type: "table", props: { class: this.TableClass }, children: []}; 
        table.children.push(this.DrawTHead()); 
        table.children.push(this.DrawTBody());
        this.append(WRender.createElement(WTableStyle)); 
        this.append(WRender.createElement(table)); 
    }
    DrawTHead = ()=> {                
        let thead = {type: "thead", props: {}, children: []};        
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
    DrawTBody = ()=> {                
        let tbody = {type: "tbody", props: {}, children: []};
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
    DrawGroupTable(){             
        this.GroupsData = [
            ArrayFunctions.ArryUnique(this.TableConfig.Datasets, this.TableConfig.AttNameEval),
            ArrayFunctions.ArryUnique(this.TableConfig.Datasets, this.TableConfig.AttNameG1),
            ArrayFunctions.ArryUnique(this.TableConfig.Datasets, this.TableConfig.AttNameG2),
            ArrayFunctions.ArryUnique(this.TableConfig.Datasets, this.TableConfig.AttNameG3)
        ]; 
        this.GroupsData2 = [          
            ArrayFunctions.ArryUnique(this.TableConfig.Datasets, this.TableConfig.AttNameG3),
            ArrayFunctions.ArryUnique(this.TableConfig.Datasets, this.TableConfig.AttNameG2),
            ArrayFunctions.ArryUnique(this.TableConfig.Datasets, this.TableConfig.AttNameG1)
        ]; 
        //console.log(this.GroupsData2);            
        let table = {type: "table", props: { class: this.TableClass }, children: []};         
        table.children.push(this.DrawGroupTH(this.ChargeGroup(this.GroupsData2))); 
        table.children.push(this.DrawGroupTBody());
        this.append(WRender.createElement(WTableStyle)); 
        this.append(WRender.createElement(table));            
    }
    DrawGroupTHead = ()=> {                
        let thead = {type: "thead", props: {}, children: []};        
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
                type: "th", children: [ elementG1[this.TableConfig.AttNameG1] ]
            });    
        });             
        return thead;
    } 
    DrawGroupTBody = ()=> {                
        let tbody = {type: "tbody", props: {}, children: []};
        this.GroupsData[0].forEach(element => {
            let tr = { type: "tr", children: [] };
            tr.children.push({
                type: "td", children: [element[this.TableConfig.AttNameEval].toString()]
            });              
            this.GroupsData[1].forEach(elementG1 => {   
                const value = this.Dataset.find( a =>
                    a[this.AttNameG1] == elementG1[this.AttNameG1] 
                    && a[this.AttNameEval] == element[this.AttNameEval]   
                ); 
                tr.children.push({
                    type: "td", children: [ value[this.EvalValue].toString() ]
                });                
            });  
            tbody.children.push(tr);
        });        
        return tbody;
    }
    ChargeGroup = (Groups, inicio = 0)=>{      
        if (!Groups[inicio]) {
            return null;
        }
        let ObjGroup = {
            data: Groups[inicio],
            children : this.ChargeGroup(Groups, inicio + 1)
        }     
        return ObjGroup;
    }   
    DrawGroupTH = (Groups)=> {
        console.log(Groups.data.length);                       
        let thead = {type: "thead", props: {}, children: []};        
        Groups.data.forEach((Group, index = Group.length )=> {
            let trGroup = { type: "tr", children: [] };
            //console.log(Group) 
            Group.data.forEach(element => {
                trGroup.children.push({
                    type: "th", props: {colspan : index},  children: [element[this.AttNameG1]]
                });
            });
            index--;
            thead.children.push(trGroup); 
        });  
        return thead;
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
            })
        ]
    }
}
customElements.define("w-table", WTableComponent);