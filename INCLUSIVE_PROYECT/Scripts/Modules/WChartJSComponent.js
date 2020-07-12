class ChartConfig {
    constructor(Config) {
        this.ContainerName = Config.ContainerName;
        this.Title = Config.Title;
        this.GroupDataset = Config.GroupDataset;//primera agrupacion
        this.AttNameG1 = Config.AttNameG1;
        this.SecondGroupDataset = Config.SecondGroupDataset;//segunda agrupacion
        this.AttNameG2 = Config.AttNameG2;
        this.ThreeGroupDataset = Config.ThreeGroupDataset;//triple agrupacion
        this.AttNameG3 = Config.AttNameG3;
        this.GroupLabelsData = Config.GroupLabelsData;//series
        this.Datasets = Config.Datasets; //datos
        this.AttNameEval = Config.AttNameEval;
        this.Colors = Config.Colors;
        this.GroupDataTotals = Config.GroupDataTotals;
        this.ContainerSize = Config.ContainerSize;
        this.ColumnLabelDisplay = Config.ColumnLabelDisplay;
    }
}

class ColumChart extends HTMLElement{
    constructor(props){
        super();        
    }
    attributeChangedCallBack(){
        this.DrawChart();
    }
    connectedCallback(){    
        //this.innerHTML =`<h1>hola</h1>`;  
        this.DrawChart();
    }
    DrawChart(){
        this.ChartInstance = new ChartConfig(this.data);
        //console.log("Drawing...");   
        //console.log(this.ChartInstance);   
        if (typeof this.ChartInstance.AttNameG3 !== "undefined") {
            console.log("Drawing data... att3");   
        }else if(typeof this.ChartInstance.AttNameG2 !== "undefined"){
            console.log("Drawing data... att2"); 
        }else if(typeof this.ChartInstance.AttNameG1 !== "undefined"){
            console.log("Drawing data... att1");             
        }else{
            console.log("Drawing data... is imposible!!"); 
        }
    }   
    DrawGroupChart(){
        
    }
}
customElements.define("colum-chart", ColumChart);
