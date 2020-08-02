function CreateStringNode(string) {
    let node = document.createRange().createContextualFragment(string);
    return node;
}  
class MultiSelectConfig {
    constructor(Config) {
        this.ContainerName = Config.ContainerName;
        this.Title = Config.Title;
        this.AttNameEval = Config.AttNameEval;
        this.EvalValue = Config.EvalValue;        
        this.GroupLabelsData = Config.GroupLabelsData;//series
        this.Datasets = Config.Datasets; //datos 
        this.search = Config.search;
        this.groupMultiSelect = Config.groupMultiSelect;
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
    //PSTYLE PROPS
    SearchMargin = "0px";  
    //DATA CONTROLS AND ARRAYS  
    selectedItems = [];
    GroupTables = {};
    GroupLabels = {};
    GroupSelectedsItems = {};
    Draw(){
        //console.log("multiselect...");
        this.MultiSelectInstance = new MultiSelectConfig(this.data);
        this.SelectFragment = document.createElement("div");
        this.SelectFragment.className = "DisplaySelect";
        if ( this.MultiSelectInstance.groupMultiSelect == true) {            
            this._DrawGroupMultiSelect();
        }else {
            this._DrawMultiselect();
        }       
    }
    _DrawMultiselect(){        
        this.LabelSelect = createElement({
            type: "label", props:{class:"selectLabel", title: this.MultiSelectInstance.Title},
            children:[this.MultiSelectInstance.Title]
        });
        this._DrawSelecteds(this.LabelSelect, this.selectedItems);
        this.SelectFragment.append(this.LabelSelect);
        if (this.MultiSelectInstance.search) {
            this.SearchMargin = "40px";           
            this.SelectFragment.append(createElement({
                type: "div", props:{class: "SearchContainer"},
                children:[{
                    type: "input", props: {
                        type: "text",
                        placeholder: "Search Element",
                        onchange: ()=>{ this._filter(this.MultiSelectTable,
                            this.LabelSelect,
                            this.selectedItems,
                            this.MultiSelectInstance.Datasets)}
                    }
                }]
            }));
        }
        this.MultiSelectTable = document.createElement("table"); 
        this.MultiSelectTable.style.marginTop = this.SearchMargin;       
        this.MultiSelectTable.className = "DisplaySelectC"; 
        this.SelectFragment.append(
            this._AddSectionData(this.MultiSelectInstance.Datasets,
            this.MultiSelectTable, 
            this.selectedItems,
            this.LabelSelect)
        );              
        this.append(this.SelectFragment);
    }
    _DrawGroupMultiSelect(){   
        this.SelectFragment.className = "MultiGroupSelect";
        const ArrayGroup = this.MultiSelectInstance.Datasets;
        for (const GroupName in ArrayGroup) {  
            //const Array = ArrayGroup[GroupName];
            //PREPARANDO LA DATA.............
            this.GroupTables[GroupName +"Table"] = createElement({
                type: "table", 
                props: {
                    id: GroupName +"Table", class: "DisplaySelectC",
                    style: "position:relative; opacity:1; pointer-events: all"
                }
            });            
            this.GroupSelectedsItems[GroupName] = [];
            //DESIGN.....
            this.GroupLabels[GroupName + "Label"] = createElement({
                type: "label", props:{
                    class:"selectLabel", id: GroupName + "Label", title: GroupName,
                    //onclick: ()=>{ console.log("click")  }
                },
                children:[GroupName]
            });
            if (this.MultiSelectInstance.autoselectAll) {
                this.GroupLabels[GroupName + "Label"].className = "LabelAutoselect";
            }
            //select all
            this.GroupLabels[GroupName + "Label"].append(createElement({
                type:"input",                              
                props:{ type: "checkbox",
                    id: "radio_" + GroupName,                
                    onchange: ()=>{ 
                        this._DisplayContainer( GroupName + "Container", "38px")   
                        if (this.MultiSelectInstance.autoselectAll) {
                            this._SelectGroupMultiselect(
                                "radio_" + GroupName,
                                this.GroupTables[GroupName +"Table"],
                                this.GroupSelectedsItems[GroupName], 
                                this.GroupLabels[GroupName + "Label"]
                            );
                        }     
                    }
                }
            }))            
            this.GroupLabels[GroupName + "Label"].append(createElement({type: "span"}));
            //fin select all
            this._DrawSelecteds(this.GroupLabels[GroupName + "Label"], this.GroupSelectedsItems[GroupName]);           
            let DisplaySelectGroup = createElement({
                type:"div", props :{
                    class: "DisplaySelectGroup",
                    id: GroupName + "Container",
                    style: "max-height:38px"
                }
            });
            DisplaySelectGroup.append(this.GroupLabels[GroupName + "Label"]);
            if (this.MultiSelectInstance.search) {
                //this.SearchMargin = "40px";
                DisplaySelectGroup.append(createElement({
                    type: "div", props:{class: "SearchContainer",
                    style:"max-height:initial; position: relative; opacity:1; pointer-events:all"},
                    children:[{
                        type: "input", props: {
                           type: "text",
                           placeholder: "Search Element",                          
                           onchange: ()=>{ this._filter(this.GroupTables[GroupName +"Table"],
                            this.GroupLabels[GroupName + "Label"],
                            this.GroupSelectedsItems[GroupName],
                            ArrayGroup[GroupName])}
                        }
                    }]
               }));
            }
            this.GroupTables[GroupName +"Table"].style.marginTop = this.SearchMargin; 
            DisplaySelectGroup.append(                
                this._AddSectionData(ArrayGroup[GroupName],
                    this.GroupTables[GroupName +"Table"], 
                    this.GroupSelectedsItems[GroupName],
                    this.GroupLabels[GroupName + "Label"]
                )
            )
            this.SelectFragment.append(
                DisplaySelectGroup
            );              
        }
        this.append(this.SelectFragment);
    }
    _AddSectionData(ArrayGroup, Table, SelectedsItems, label, ArrayFilt = null) {
        let  DataSet = [];
        if (ArrayFilt == null) {
            DataSet = ArrayGroup; 
        }else {
            DataSet = ArrayFilt; 
        }      
        Table.innerHTML = "";               
        var index = 0;
        DataSet.forEach((element) => {  
            let filtObject =  SelectedsItems.filter(param => param == element); 
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
                                props:{ type: "checkbox", elementValue: element,
                                id: "radio_" + element.id + label.id,
                                checked: checked,
                                onchange: ()=>{ 
                                    this._SelectElement(element, "radio_" + element.id + label.id, SelectedsItems, label)
                                }}
                            },
                            { type:"span" }
                        ]
                    }
                ]
            }); 
            Table.append(Row);
            index++;
        });       
        var index = 0;    
        return Table;
    }
    _SelectElement(Value, ControlId, SelectedsItems, label){ 
        let Control = this.querySelector(`#${ControlId}`);    
       // console.log(Control)
        //console.log(Control.checked)    
        if (Control.checked == true) {
           let filtObject = SelectedsItems.filter(param => param == Value);
            if (filtObject.length == 0) {
              SelectedsItems.push(Value);
            }             
        }else {
            let filtObject =SelectedsItems.indexOf(
                   SelectedsItems.find(param => param == Value)
                );
            if (filtObject >= 0) {
              SelectedsItems.splice(filtObject, 1);
            }
        }
        this._DrawSelecteds(label,SelectedsItems);
        //console.log(SelectedsItems)         
    }
    _filter(Table, Label, selectedItems, ArrayGroup){
        //console.log(Table)
        let inputSearch = this.querySelector(".SearchContainer input"); 
        //console.log(inputSearch.value)       
        if (inputSearch.value != "") {           
            var ListArray = ArrayGroup.filter(function (element) {                  
                for (var key in element) {
                    if (element[key].toString().includes(inputSearch.value)) { return element;  }
                }
            });   
            //console.log(ListArray);
            //console.log(Table)
            this._AddSectionData(ArrayGroup, Table, selectedItems, Label, ListArray)
       }else{
            //console.log(this.MultiSelectInstance.Datasets);
            this._AddSectionData(ArrayGroup, Table, selectedItems, Label)
       }
    }
    _DrawSelecteds(Label, SelectedsItems){
        //console.log(Label)
        let Selecteds = "";        
        SelectedsItems.forEach((element, index = 0) => {            
            Selecteds += element.descripcion.toString();
            if(index < SelectedsItems.length -1){
                Selecteds += ", ";
            }             
        });
        let labelSel = "";
        if (Selecteds != "") {        
            labelSel = `${Label.title} (${Selecteds})`;            
        }else{            
            labelSel = `${Label.title}`; 
        }               
        let fChild = Label.firstChild;
        Label.insertBefore( document.createTextNode(labelSel), fChild);
        Label.removeChild(fChild);
    }
    _DisplayContainer(objId, size = null, maxSize = null) {
        if (size == null) {
          size = "50px";
        }
        if (maxSize == null) {
          maxSize = "500px";
        }
        let container = this.querySelector("#"+objId);
        //console.log(container)
        if (container.style.maxHeight == size || container.offsetHeight == parseInt(size.replace("px", ""))) {
          container.style.transition = "all ease 1s";
          container.style.maxHeight = maxSize;          
        } else {       
          container.style.transition = "all ease 1s";
          container.style.maxHeight = size;         
        }
    }
    _SelectGroupMultiselect(CheckGroupId, GroupTables, SelectedsItems, label){
        let checks = GroupTables.querySelectorAll("input[type=checkbox]");
        let CheckGroup = document.getElementById(CheckGroupId).checked;
        checks.forEach(check => {           
            if (CheckGroup == true) {
                check.checked = true; 
            }else {
                check.checked = false;
            }
            this._SelectElement(
                    check.elementValue,
                    check.id,
                    SelectedsItems,
                    label
                );            
        });        
    }
}
customElements.define("w-multi-select", MultiSelect);