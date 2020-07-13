class ChartConfig {
    constructor(Config) {
        this.ContainerName = Config.ContainerName;
        this.Title = Config.Title;
        this.EvalValue = Config.EvalValue;
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
        
        this.Totals = DataTotals(this.ChartInstance);
        console.log(this.Totals)  
        this.MaxVal = MaxValue(this.Totals); 
        console.log(this.MaxVal)  
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
        ChartFragment.append(this._AddSectionBars(GroupsData, this.ChartInstance));
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
    _AddSectionBars(Groups, Config){
        //console.log(Config)  
        const DataSet = Groups[0];
        const GroupDataset = Groups[1];
        const SecondGroupDataset  = Groups[2];
        const ThreeGroupDataset  = Groups[3];     
        let SectionBars = document.createElement('section');
        SectionBars.className = "SectionBars";
        var count = 0;        
        GroupDataset.forEach(elementGroup => {
            var GroupSection = document.createElement("GroupSection");
                GroupSection.className = "GroupSection";            
            var groupBars = document.createElement("groupBar");
                groupBars.className = "groupBars";           

            var groupLabels = document.createElement("span"); 
            var groupLabelsTwo = document.createElement("span"); 
            var groupLabelsThree = document.createElement("span");
            if (count == 0) {
                groupLabels = document.createElement("groupLabels");
                groupLabels.className = "groupLabels ElementG1";
            }else{
                groupLabels = document.createElement("groupLabels");
                groupLabels.className = "groupLabels";
            }             
            if (SecondGroupDataset != null) {
                if (count == 0) {                  
                    groupLabelsTwo = document.createElement("groupLabelsTwo");
                    groupLabelsTwo.className = "groupLabels ElementG2";
                }else{     
                    groupLabelsTwo = document.createElement("groupLabelsTwo");
                    groupLabelsTwo.className = "groupLabels";
                }
            }  
            if (ThreeGroupDataset != null) {   
                if (count == 0) {  
                    groupLabelsThree = document.createElement("groupLabelsThree");
                    groupLabelsThree.className = "groupLabels ElementG3";
                }else{                                                
                    groupLabelsThree = document.createElement("groupLabelsThree");
                    groupLabelsThree.className = "groupLabels";
                }  
            }  
            //CONSTRUCCCION DE DATOS   
            if (SecondGroupDataset != null) {  
                SecondGroupDataset.forEach(elementSecondGroup => {//RECORREMOS la categoria SEGUNDA AGRUPACION                     
                    if (ThreeGroupDataset != null) { 
                        ThreeGroupDataset.forEach(elementThreeGroup => {//RECORREMOS la categoria tercera AGRUPACION
                            var ContainerBars = document.createElement("ContainerBar");
                            ContainerBars.className = "ContainerBars";
                            this._DrawGroupChart(Config, ContainerBars, elementGroup, elementSecondGroup, elementThreeGroup);                        
                            groupBars.append(ContainerBars);
                            groupLabelsThree.append(CreateStringNode(`       
                                <label class="">
                                    ${elementThreeGroup[Config.AttNameG3]}
                                </label>`)
                            );
                        });      
                                                          
                    }
                    else{
                        var ContainerBars = document.createElement("ContainerBar");
                        ContainerBars.className = "ContainerBars";
                        this._DrawGroupChart(Config, ContainerBars, elementGroup, elementSecondGroup);                        
                        groupBars.append(ContainerBars);
                    } 
                    groupLabelsTwo.append(CreateStringNode(`       
                            <label class="">
                                ${elementSecondGroup[Config.AttNameG2]}
                            </label>`)
                    );
                })     
            }
            else{
                var ContainerBars = document.createElement("ContainerBar");
                ContainerBars.className = "ContainerBars";
                this._DrawGroupChart(Config, ContainerBars, elementGroup); 
                groupBars.append(ContainerBars);               
            } 
            groupLabels.append(CreateStringNode(`       
                <label class="">
                    ${elementGroup[Config.AttNameG1]}
                </labe>`)
            );
            count++;
            GroupSection.append(groupBars,groupLabelsThree, groupLabelsTwo, groupLabels);  
            SectionBars.append(GroupSection);
        })
        return SectionBars;
    }    
    _DrawGroupChart(Config, ContainerBars,  elementGroup = null, elementSecondGroup = null, elementThreeGroup = null ){
        //console.log(Config)
        let index = 0;
        Config.GroupLabelsData.forEach(elementLabelData => {  //RECORREMOS LOS STAKS 
            Config.Datasets.forEach(element => {//RECORREMOS EL DTA EN BUSCA DEL TIEMPO Y EL STAK
                let bar = null;               
                if (elementThreeGroup != null) {                  
                    if (element[Config.AttNameG1] == elementGroup[Config.AttNameG1]
                        && element[Config.AttNameEval] == elementLabelData.id_
                        && element[Config.AttNameG2] == elementSecondGroup[Config.AttNameG2]
                        && element[Config.AttNameG3] == elementThreeGroup[Config.AttNameG3]) {
                        bar =  this._DrawBar(element, Config, index);
                    }                    
                } else  if (elementSecondGroup != null) {               
                    if (element[Config.AttNameG1] == elementGroup[Config.AttNameG1]
                        && element[Config.AttNameEval] == elementLabelData.id_
                        && element[Config.AttNameG2] == elementSecondGroup[Config.AttNameG2]) {
                        bar =  this._DrawBar(element, Config, index);
                    }
                } else  if (elementGroup != null) {                 
                    if (element[Config.AttNameG1] == elementGroup[Config.AttNameG1]
                        && element[Config.AttNameEval] == elementLabelData.id_) {
                        bar =  this._DrawBar(element, Config, index);
                    }
                }       
                if (bar != null) {
                    ContainerBars.appendChild(bar);                    
                }  
            }) //FIN DATA
            index ++;
           
        });
    }
    _DrawBar(element, Config, index){       
        var Size = Config.ContainerSize;
        var Size = 220;
        var BarSize = (element.cantidad / this.MaxVal); //% de tamaño
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
            </Bars>`);
        return Bars;                   
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
function ArryUnique(DataArray, param, param2 = null, param3 = null){
    
    if (typeof param3 !== 'undefined' && param3 != null && param3 != "") {        
        let DataArraySR = DataArray.filter((ActalValue, ActualIndex, Array) =>
            {
                return Array.findIndex(ArryValue => 
                    (JSON.stringify(ArryValue[param3])
                    === JSON.stringify(ActalValue[param3]))
                    &&
                    (JSON.stringify(ArryValue[param2])
                    === JSON.stringify(ActalValue[param2]))
                    &&
                    (JSON.stringify(ArryValue[param])
                    === JSON.stringify(ActalValue[param]))
                ) === ActualIndex
            }
        );        
        return DataArraySR;
    } else if (typeof param2 !== 'undefined' && param2 != null && param2 != "") {        
        let DataArraySR = DataArray.filter((ActalValue, ActualIndex, Array) =>
            {
                return Array.findIndex(ArryValue =>                    
                    (JSON.stringify(ArryValue[param2])
                    === JSON.stringify(ActalValue[param2]))
                    &&
                    (JSON.stringify(ArryValue[param])
                    === JSON.stringify(ActalValue[param]))
                ) === ActualIndex
            }
        );
        return DataArraySR;
    }else if (typeof param !== 'undefined' && param != null && param != "") {        
        let DataArraySR = DataArray.filter((ActalValue, ActualIndex, Array) =>
            {
                return Array.findIndex(ArryValue => JSON.stringify(ArryValue[param])
                === JSON.stringify(ActalValue[param])) === ActualIndex
            }
        );
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
function DataTotals(Config) {
    let UniqueTotals = ArryUnique(Config.Datasets, Config.AttNameG1, Config.AttNameG2, Config.AttNameG3);    
    let Totals = [];
    if (typeof Config.AttNameG3 !== 'undefined' && Config.AttNameG3 != null && Config.AttNameG3 != ""){    
        UniqueTotals.forEach(element => {
            let suma = 0;
            Config.Datasets.forEach(elementGroup => {
                
                if (element[Config.AttNameG1] == elementGroup[Config.AttNameG1]                  
                   && element[Config.AttNameG2] == elementGroup[Config.AttNameG2]
                   && element[Config.AttNameG3] == elementGroup[Config.AttNameG3]) {                   
                    suma = suma + parseFloat(elementGroup[Config.EvalValue]);                    
                }   
            });
            let NewObj = {};
            NewObj[Config.AttNameG1] = element[Config.AttNameG1];
            NewObj[Config.AttNameG2] = element[Config.AttNameG2];
            NewObj[Config.AttNameG3] = element[Config.AttNameG3];
            NewObj[Config.EvalValue] = suma;
            Totals.push(NewObj);
        });
    }else if (typeof Config.AttNameG2 !== 'undefined' && Config.AttNameG2 != null && Config.AttNameG2 != ""){  
        UniqueTotals.forEach(element => {
            let suma = 0;
            Config.Datasets.forEach(elementGroup => {
                
                if (element[Config.AttNameG1] == elementGroup[Config.AttNameG1]                  
                   && element[Config.AttNameG2] == elementGroup[Config.AttNameG2]) {                   
                    suma = suma + parseFloat(elementGroup[Config.EvalValue]);                    
                }   
            });
            let NewObj = {};
            NewObj[Config.AttNameG1] = element[Config.AttNameG1];
            NewObj[Config.AttNameG2] = element[Config.AttNameG2];
            NewObj[Config.EvalValue] = suma;
            Totals.push(NewObj);
        });
    }else if (typeof Config.AttNameG1 !== 'undefined' && Config.AttNameG1 != null && Config.AttNameG1 != ""){  
        UniqueTotals.forEach(element => {
            let suma = 0;
            Config.Datasets.forEach(elementGroup => {
                
                if (element[Config.AttNameG1] == elementGroup[Config.AttNameG1]) {                   
                    suma = suma + parseFloat(elementGroup[Config.EvalValue]);                    
                }   
            });
            let NewObj = {};
            NewObj[Config.AttNameG1] = element[Config.AttNameG1];
            NewObj[Config.EvalValue] = suma;
            Totals.push(NewObj);
        });
    }  
    return Totals;
}
function MaxValue(DataArry) {
    var Maxvalue = 0;
    for (let index = 0; index < DataArry.length; index++) {        
        if (parseInt(DataArry[index]['cantidad']) > Maxvalue) {
            Maxvalue = DataArry[index]['cantidad'];
        }
    }    
    return Maxvalue;  
}

customElements.define("colum-chart", ColumChart);
