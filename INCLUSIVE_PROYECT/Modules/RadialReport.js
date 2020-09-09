//import {createElement}  from "../Scripts/Modules/WComponents.js";
//import("../Scripts/Modules/WChartRadial.js"); 
class RadialReport{    
    constructor(props){
        this.type = "div";
        this.props = props; 
        
        this.children= [
            { type: 'h1', props: {id:"", class: ""} ,
                children: ["Bar report Chart"]
            },
            { type: 'section', props: {id:"", class: ""} ,
               children: [ this.StartReport() ]
            }     
        ]
    }    
    StartReport = () => {   
        const DataSet = [
            {cantidad: 20,time: 2020,},
            {cantidad: 80,time: 2020, },
            {cantidad: 90,time: 2020,}
        ]; 
        var CharConfig = {
            ContainerName: "MyChart",
            Title: "MyChart",
            GroupLabelsData: [{ id_: "Fresa", Descripcion: "Severa" },
                        { id_: "Naranja", Descripcion: "Moderada" },
                        { id_: "Verde", Descripcion: "Sin sintomas" }],           
            Datasets: DataSet,
            Colors: ["#ff6699", "#ffbb99", "#adebad"],
            ContainerSize: 400,
            ColumnLabelDisplay: 0,
            AttNameEval: "estado",
            AttNameG1: "time",
            AttNameG2: "categ2",
            AttNameG3: "categ",
            EvalValue: "cantidad",
        };
        return createElement({type: 'w-radial-chart',  props : { data: CharConfig }});        
    }
    
}
//export {RadialReport}

