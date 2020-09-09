//import {createElement}  from "../Scripts/Modules/WComponents.js";
//import("../Scripts/Modules/WMultiSelect.js"); 
class MultiSelectControls{    
    constructor(props){
        this.type = "div";
        this.props = props; 
        
        this.children= [
            { type: 'h1', props: {id:"", class: ""} ,
                children: ["MULTI SELECTS"]
            },
            { type: 'section', props: {id:"", class: ""} ,
               children: [ this.StarMultiSelect(), this.StarGroupMultiSelect() ]
            }     
        ]
    }    
  
    StarMultiSelect = () => {       
        const Multiselect = [
            {descripcion: "item 1aaa", id: 1},
            {descripcion: "item 2", id: 2},
            {descripcion: "item 3", id: 3},
            {descripcion: "item 4", id: 4},
        ];        
        var CharConfig = {
            ContainerName: "MyChart",
            Title: "MyChart",
            GroupLabelsData: [{ id_: "Fresa", Descripcion: "Severa" },
                        { id_: "Naranja", Descripcion: "Moderada" },
                        { id_: "Verde", Descripcion: "Sin sintomas" }],           
            //Datasets: DataSet,
            Colors: ["#ff6699", "#ffbb99", "#adebad"],
            ContainerSize: 400,
            ColumnLabelDisplay: 0,
            AttNameEval: "estado",
            AttNameG1: "time",
            AttNameG2: "categ2",
            AttNameG3: "categ",
            EvalValue: "cantidad",
        };
        let fragment = document.createElement("div");
         //MULTI SELECT---------------------------------------------------------------------  
        fragment.appendChild(createElement({type:"h1",children:["Multiselect"]}));        
        CharConfig.Datasets =  Multiselect;
        CharConfig.search = true;
        fragment.appendChild(createElement({type: 'w-multi-select',
            props : {id: "MyMultiselect",
            data: CharConfig }})); 
            
        return fragment; 
          
    }
    StarGroupMultiSelect = () => {         
        const GroupMultiselect = {
            Group1:[
                {descripcion: "item 1", id: 1},
                {descripcion: "item 2", id: 2},
                {descripcion: "item 3", id: 3},
                {descripcion: "itvem 4", id: 4},
            ], Group2:[
                {descripcion: "item 1", id: 1},
                {descripcion: "item 2", id: 2},
                {descripcion: "itefm 3", id: 3},
                {descripcion: "item 4", id: 4},
            ], Group3:[
                {descripcion: "itrem 1", id: 1},
                {descripcion: "item 2", id: 2},
                {descripcion: "item 3", id: 3},
                {descripcion: "item 4", id: 4},
            ],
        };     
        var CharConfig = {
            ContainerName: "MyChart",
            Title: "MyChart",
            GroupLabelsData: [{ id_: "Fresa", Descripcion: "Severa" },
                        { id_: "Naranja", Descripcion: "Moderada" },
                        { id_: "Verde", Descripcion: "Sin sintomas" }],           
            //Datasets: DataSet,
            Colors: ["#ff6699", "#ffbb99", "#adebad"],
            ContainerSize: 400,
            ColumnLabelDisplay: 0,
            AttNameEval: "estado",
            AttNameG1: "time",
            AttNameG2: "categ2",
            AttNameG3: "categ",
            EvalValue: "cantidad",
        };
        let fragment = document.createElement("div");        
        //GROUP MULTI SELECT----------------------------------------------------------------  
        fragment.appendChild(createElement({type:"h1",children:["Multiselect agrupado"]}));
        CharConfig.Datasets = GroupMultiselect;
        CharConfig.search = true;
        CharConfig.groupMultiSelect = true;     
        fragment.appendChild(createElement({type: 'w-multi-select',
            props : {id: "MyGroupMultiselect",
            data: CharConfig }})); 
        
        return fragment;        
    }
    
}
//export {MultiSelectControls}