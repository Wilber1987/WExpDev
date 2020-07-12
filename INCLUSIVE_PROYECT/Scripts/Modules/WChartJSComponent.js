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
        // this.ChartInstance.GroupDataset =  orderByDate(this.ChartInstance.GroupDataset,
        //                                                  sessionStorage.getItem('type'));        
        let ChartFragment = document.createElement("div");
        ChartFragment.className = "WChartContainer";
        ChartFragment.append(this._AddSectionTitle(this.ChartInstance.Title));
        ChartFragment.append(this._AddSectionlabels(this.ChartInstance.GroupLabelsData, this.ChartInstance.Colors));
        let GroupsData = [
            this.ChartInstance.Datasets,
            ArryUnique(this.ChartInstance.Datasets, this.ChartInstance.AttNameG1),
            ArryUnique(this.ChartInstance.Datasets, this.ChartInstance.AttNameG2),
            ArryUnique(this.ChartInstance.Datasets, this.ChartInstance.AttNameG3)
        ];
        let GroupsNames = [
            this.ChartInstance.AttNameEval,
            this.ChartInstance.AttNameG1,
            this.ChartInstance.AttNameG2,
            this.ChartInstance.AttNameG3
        ];

       

        //ChartFragment.append(this._AddSectionBars(this.ChartInstance.GroupLabelsData, this.ChartInstance.Colors));
       
       
        if (typeof this.ChartInstance.AttNameG3 !== "undefined") {
            console.log("Drawing data... att3");   
        }else if(typeof this.ChartInstance.AttNameG2 !== "undefined"){
            console.log("Drawing data... att2"); 
        }else if(typeof this.ChartInstance.AttNameG1 !== "undefined"){
            console.log("Drawing data... att1");             
        }else{
            console.log("Drawing data... is imposible!!"); 
        }
        this.append(ChartFragment);
    }   
    _AddSectionTitle(Title){       
       // var Title = 
                    /* sessionStorage.getItem('Title') + ' - ' 
                    +sessionStorage.getItem('Indicador') 
                    +ChartContainer.name;*/                       
        var SectionTitle = CreateStringNode(`<h3 style="font-size:18px; margin:0px">${Title}</h3>`);
        return SectionTitle;
    }
    _AddSectionlabels(GroupLabelsData, Colors){
        var SectionLabels = document.createElement('section');
        var index = 0
        var style = "";        
        if (GroupLabelsData.length > 7) {
            style = "font-size:8px;"
        }
        SectionLabels.className = "SectionLabels"
        GroupLabelsData.forEach(element => {
            SectionLabels.appendChild(CreateStringNode(
                `<label style="${style}"><span style="background:${Colors[index]}">
                </span>${element.Descripcion}</label>`
            ));
            index++;
        })
        return SectionLabels;
    }
    _AddSectionBars(Groups, GroupsNames, Data){  
        const GroupDataset = Groups[0];
        const SecondGroupDataset  = Groups[0];
        const ThreeGroupDataset  = Groups[0];        
        GroupDataset.forEach(elementGroup => {
            var GroupSection = document.createElement("GroupSection");
                GroupSection.className = "GroupSection";            
            var groupBars = document.createElement("groupBar");
                groupBars.className = "groupBars";
            if (SecondGroupDataset != null) {                
                groupBars.append(DrawBackgroundLine(MaxVal,null, ColumnLabelDisplay)); 
                if (ThreeGroupDataset != null) {
                
                }
                else{
                    
                }                
            }
            else{
                
            }    
        })
    }
    
    DrawGroupChart(Config, ContainerBars, elementLabelData){
        Config.GroupLabelsData.forEach(elementLabelData => {  //RECORREMOS LOS STAKS 
            Config.Datasets.forEach(element => {//RECORREMOS EL DTA EN BUSCA DEL TIEMPO Y EL STAK
                if (element[Config.AttNameG1] == elementGroup[Config.AttNameG1]
                    && element[Config.AttNameEval] == elementLabelData.id_
                    && element[Config.AttNameG2] == elementSecondGroup[Config.AttNameG2]
                    && element[Config.AttNameG3] == elementThreeGroup[Config.AttNameG3]) {
                    //CalcularTotal
                    var Size = Config.ContainerSize;
                    var Size = 220;
                    var BarSize = (element.cantidad / MaxVal); //% de tamaño
                    var labelCol = element.cantidad;
                    var styleP="";
                    if (Config.ColumnLabelDisplay == 1) {
                        //dibujar el valor en porcentaje
                        styleP = ";flex-grow: 1;"
                        var total = FindInTotal(element, Config.GroupDataTotals, Config);
                        var multiplier = Math.pow(10, 1 || 0);
                        var number = labelCol / total.cantidad * 100
                        number = Math.round(number * multiplier) / multiplier
                        labelCol = number + '%';
                    }               
                    var Bars = CreateStringNode(`
                    <Bars class="Bars" style="${styleP}height:${Size * BarSize}px;background:${Config.Colors[index]}">
                        <label>
                            ${labelCol}
                        </labe>
                    </Bars>`)
                    ContainerBars.appendChild(Bars);
                }
            }) //FIN DATA
        });
    }
}


function orderByDate(Arry, type){ 
    //console.log(type)  
    if (type == 1) {
        Arry.sort((a, b) => a.time - b.time);        
    }else if(type == 2){    
        Arry.forEach(element => {
            if(element.time.includes("diciembre")){         
                var Year = new Date(Date.parse(element.time)).getFullYear();
                element.time = Date.parse(Year + " December");               
            }
            else element.time = Date.parse(element.time);  
        }); 
        Arry.sort((a, b) => a.time - b.time);
    
        Arry.forEach(element => {        
            var fecha = new Date(element.time);       
            element.time = meses[fecha.getMonth()] + " " + fecha.getFullYear();
        });   
       
    }else{   
        var Array2 = [];
        Arry.forEach(element => {
           var object={
               cuarter: null,
               year:null
           };
           object.cuarter = element.time.substring( 1, 0 );     
           object.year = element.time.substring( element.time.length, 14 );          
           Array2.push(object);
        })
        Array2.sort((a, b) => a.year - b.year);        
        var Array3 = [];
        Array2.forEach(element => {
            var object = Arry.find(x => x.time.substring( 1, 0 ).includes(element.cuarter) 
                        && x.time.includes(element.year));
            Array3.push(object);
        });       
        Arry = Array3; 
    }
    return Arry;
}
function ArryUnique(DataArray, param){
    if (typeof param !== 'undefined' && param != null && param != "") {        
        let DataArraySR = DataArray.filter((ActalValue, ActualIndex, Array) =>
            {
                return Array.findIndex(ArryValue => JSON.stringify(ArryValue[param])
                === JSON.stringify(ActalValue[param])) === ActualIndex
            }
        );
        console.log(DataArraySR)
        return DataArraySR;
    }
    return null;    
}
var meses = [
    "enero", "febrero", "marzo",
    "abril", "mayo", "junio", "julio",
    "agosto", "septiembre", "octubre",
    "noviembre", "diciembre"
  ]

customElements.define("colum-chart", ColumChart);
