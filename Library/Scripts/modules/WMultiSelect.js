function CreateStringNode(string) {
    let node = document.createRange().createContextualFragment(string);
    return node;
}  
//import MultiSelectConfig from "./WChartJSComponent";

class MultiSelectConfig {
    constructor(Config) {
        this.ContainerName = Config.ContainerName;
        this.Title = Config.Title;
        this.AttNameEval = Config.AttNameEval;
        this.EvalValue = Config.EvalValue;        
        this.GroupLabelsData = Config.GroupLabelsData;//series
        this.Datasets = Config.Datasets; //datos 
        this.search = Config.search;
    }
}
class MultiSelect extends HTMLElement{
    constructor(){
        super();
    }
    attributeChangedCallBack() {
        this.Draw();
    }
    connectedCallback() {
        this.Draw();
    }
    selectedItems = [];
    Draw(){
        //console.log("multiselect...");
        this.MultiSelectInstance = new MultiSelectConfig(this.data);
        let SelectFragment = document.createElement("div");
        SelectFragment.className = "DisplaySelect";
        this.LabelSelect = createElement({
            type: "label", props:{class:"selectLabel"},
            children:[this.MultiSelectInstance.Title]
        });
        this._DrawSelecteds();
        SelectFragment.append(this.LabelSelect);
        if (this.MultiSelectInstance.search) {
            SelectFragment.append(createElement({
                type: "div", props:{class: "SearchContainer"},
                children:[{
                    type: "input", props: {
                        type: "text",
                        placeholder: "Search lement",
                        onchange: ()=>{ this._filter()}
                    }
                }]
            }));
        }
        this.MultiSelectTable = document.createElement("table");        
        this.MultiSelectTable.className = "DisplaySelectC"; 
        SelectFragment.append(this._AddSectionData(this.MultiSelectInstance));              
        this.append(SelectFragment);
    }
    _AddSectionData(Config, ArrayFilt = null) {
        let  DataSet = [];
        if (ArrayFilt == null) {
            DataSet = Config.Datasets; 
        }else {
            DataSet = ArrayFilt; 
        }      
        this.MultiSelectTable.innerHTML = "";               
        var index = 0;
        DataSet.forEach((element) => {  
            let filtObject =  this.selectedItems.filter(param => param == element); 
            let checked = null
            if (filtObject.length != 0) {
                console.log(filtObject)
                checked = true;
            } 
            var Row = createElement({
                type: "tr",
                props: {},
                children: [
                    {type: "label",
                        children:[
                            element.descripcion,
                            {
                                type:"input",                              
                                props:{ type: "checkbox",
                                id: "radio_" + element.id,
                                checked: checked,
                                onchange: ()=>{ 
                                    this._SelectElement(element, "radio_" + element.id)
                                }}
                            },
                            { type:"span" }
                        ]
                    }
                ]
            }); 
            this.MultiSelectTable.append(Row);
            index++;
        });       
        var index = 0;    
        return this.MultiSelectTable;
    }
    _SelectElement(Value, ControlId){       
        let Control = this.querySelector(`#${ControlId}`);    
        //console.log(Control.checked)    
        if (Control.checked == true) {
           let filtObject =  this.selectedItems.filter(param => param == Value);
            if (filtObject.length == 0) {
               this.selectedItems.push(Value);
            }             
        }else {
            let filtObject = this.selectedItems.indexOf(
                    this.selectedItems.find(param => param == Value)
                );
            if (filtObject >= 0) {
               this.selectedItems.splice(filtObject, 1);
            }
        }
        this._DrawSelecteds();
        //console.log( this.selectedItems)         
    }
    _filter(){
        let inputSearch = this.querySelector(".SearchContainer input");        
        if (inputSearch.value != "") {           
            var ListArray = this.MultiSelectInstance.Datasets.filter(function (element) {                  
                for (var key in element) {
                    if (element[key].toString().includes(inputSearch.value)) { return element;  }
                }
            });   
            //console.log(ListArray);
            this._AddSectionData(this.MultiSelectInstance, ListArray)
       }else{
            //console.log(this.MultiSelectInstance.Datasets);
            this._AddSectionData(this.MultiSelectInstance)
       }
    }
    _DrawSelecteds(){
        let Selecteds = "";        
        this.selectedItems.forEach((element, index = 0) => {
            Selecteds += element.descripcion;
            if(index < this.selectedItems.length -1){
                Selecteds += ", ";
            }             
        });
        if (Selecteds != "") {
            this.LabelSelect.innerText = `${this.MultiSelectInstance.Title} (${Selecteds})`;            
        }else{
            this.LabelSelect.innerText = `${this.MultiSelectInstance.Title}`; 
        }       
    }
}
customElements.define("w-multi-select", MultiSelect);