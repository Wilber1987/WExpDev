function CreateStringNode(string){
    let node = document.createRange().createContextualFragment(string);
    return node;
}

class ChartConfig{
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

function DrawGroupChart(Config){
    var Config = new ChartConfig(Config);
    var ChartContainer = GetObj(Config.ContainerName);  
    ChartContainer.className = "WChartContainer";
    ChartContainer.innerHTML = "";  
    var SectionTitle = CreateStringNode(`<h3>${Config.Title}</h3>`);
    var SectionLabels = document.createElement('section');
    SectionLabels.className = "SectionLabels"
    var SectionLabelGroup = document.createElement('section');
    SectionLabelGroup.className = "SectionLabelGroup";
      
    var index = 0
    Config.GroupLabelsData.forEach(element => { 
            SectionLabels.appendChild(CreateStringNode(
                `<label><span style="background:${Config.Colors[index]}"></span>${element.Descripcion}</label>`
            ));
            index ++;
    })  
    var SectionBars = document.createElement('section');
    SectionBars.className="SectionBars";
        Config.GroupDataset.forEach(elementGroup => {
        var groupBars = document.createElement("groupBar");
        groupBars.className = "groupBars";
        groupBars.style.height =  Config.ContainerSize + "px !important";
        var index = 0;        
        Config.GroupLabelsData.forEach(elementLabelData => {           
            Config.Datasets.forEach(element => {
                if (element[Config.AttNameG1] == elementGroup[Config.AttNameG1] && element[Config.AttNameEval] == elementLabelData.id_) {                               
                    var Bars = CreateStringNode(`
                    <Bars class="Bars" style="height:${element.cantidad}px;background:${Config.Colors[index]}">
                        <label>
                            ${element.cantidad}
                        </labe>
                    </Bars>`) 
                    groupBars.appendChild(Bars);                                  
                }                           
            })
            index ++;            
        });        
        SectionBars.append(groupBars);
        SectionLabelGroup.append(CreateStringNode(`       
            <label class="groupLabels">
                ${elementGroup[Config.AttNameG1]}
            </labe>`) 
        )                  
    })   
    ChartContainer.append(SectionTitle,SectionLabels,SectionBars,SectionLabelGroup);
}

function DrawOneGroupChart(Config){
    var Config = new ChartConfig(Config);
    var ChartContainer = GetObj(Config.ContainerName);  
    
    ChartContainer.className = "WChartContainer";
    ChartContainer.innerHTML = "";  
    var SectionTitle = CreateStringNode(`<h3>${Config.Title}</h3>`);
    var SectionLabels = document.createElement('section');
    SectionLabels.className = "SectionLabels"
    var SectionLabelGroup = document.createElement('section');
    SectionLabelGroup.className = "SectionLabelGroup";
    

    var index = 0
    Config.GroupLabelsData.forEach(element => { 
            SectionLabels.appendChild(CreateStringNode(
                `<label><span style="background:${Config.Colors[index]}"></span>${element.Descripcion}</label>`
            ));
            index ++;
    })  
    var SectionBars = document.createElement('section');
    SectionBars.className="SectionBars";
    SectionBars.style.height = Config.ContainerSize + "px";
    var MaxVal = MaxValue(Config.GroupDataTotals);
    SectionBars.append(DrawBackgroundChart(MaxVal)); 

    Config.GroupDataset.forEach(elementGroup => {
        var groupBars = document.createElement("groupBar");
        groupBars.className = "groupBars";
        groupBars.style.height =  Config.ContainerSize + "px !important";

        var ContainerBars = document.createElement("ContainerBar");
        ContainerBars.className = "ContainerBars";

        var index = 0;      
        var pasado = null;
        var contador = 0;  
        Config.GroupLabelsData.forEach(elementLabelData => {           
            Config.Datasets.forEach(element => {
                if (element[Config.AttNameG1] == elementGroup[Config.AttNameG1] 
                    && element[Config.AttNameEval] == elementLabelData.id_) {
                   //CalcularTotal
                   var Size = Config.ContainerSize ;                         
                   //var Maxcantidad = getTotal(element, Config.GroupDataTotals);                            
                   var BarSize = (element.cantidad/MaxVal); //% de tamaño
                   var labelCol = element.cantidad;
                   if (Config.ColumnLabelDisplay == 1) {
                       //dibujar el valor en porcentaje
                       //console.log(Config.GroupDataTotals)
                       var total = FindInTotal(element, Config.GroupDataTotals,Config);
                       labelCol = Math.round((labelCol / total.cantidad) * 100)+'%';                                
                   }
                   if (Config.ColumnLabelDisplay == 2) {
                       if (contador == 0) {
                           //pasado = element.cantidad;
                       }else{                                  
                           var pasado = FindPasado(element,Config.Datasets, Config)
                           if (pasado == 0) {
                               var divisor = 1;
                             } else {
                               var divisor = pasado;
                             }
                           labelCol =  labelCol+' ('+ Math.round(( (((element.cantidad - pasado) / divisor) * 100) + Number.EPSILON) * 100) / 100  + "%)";
                       }
                   }        
                   console.log(Size);
                   console.log(BarSize);                                    
                   var Bars = CreateStringNode(`
                   <Bars class="Bars" style="height:${Size * BarSize}px;background:${Config.Colors[index]}">
                       <label>
                           ${labelCol}
                       </labe>
                   </Bars>`) 
                   ContainerBars.appendChild(Bars);
                }                           
            })
            index ++;  
            groupBars.append(ContainerBars);
            contador++;
        });        
        SectionBars.append(groupBars);
        SectionLabelGroup.append(CreateStringNode(`       
            <label class="groupLabels">
                ${elementGroup[Config.AttNameG1]}
            </labe>`)
        )                  
    })   
    ChartContainer.append(SectionTitle,SectionLabels,SectionBars,SectionLabelGroup);
}

function DrawDoubleGroupChart(Config){
   //var Config = new ChartConfig(Config);
    var ChartContainer = GetObj(Config.ContainerName);  
    ChartContainer.className = "WChartContainer";
    ChartContainer.innerHTML = "";  
    var SectionTitle = CreateStringNode(`<h3>${Config.Title}</h3>`);
    var SectionLabels = document.createElement('section');
    SectionLabels.className = "SectionLabels"
    var SectionLabelGroup = document.createElement('section');
    SectionLabelGroup.className = "SectionLabelGroup";    
    var SectionLabelSecondGroup = document.createElement('section');
    SectionLabelSecondGroup.className = "SectionLabelSecondGroup";
      
    var index = 0
    Config.GroupLabelsData.forEach(element => { 
            SectionLabels.appendChild(CreateStringNode(
                `<label><span style="background:${Config.Colors[index]}"></span>${element.Descripcion}</label>`
            ));
            index ++;
    }) 
    
    var SectionBars = document.createElement('section');
    SectionBars.className="SectionBars";
    var MaxVal = MaxValue(Config.GroupDataTotals);
    SectionBars.append(DrawBackgroundChart(MaxVal)); 
    SectionBars.style.height = Config.ContainerSize + "px";
    var pasado = null;
    var contador = 0;
    Config.GroupDataset.forEach(elementGroup => {//RECORREMOS EL TIEMPO PRIMERA AGRUPACION
       // console.log(elementGroup)
        var groupBars = document.createElement("groupBar"); 
         groupBars.className = "groupBars";
         groupBars.style.height =  Config.ContainerSize + "px !important";
        //groupBars.style.height =  Config.ContainerSize + "px !important";
      
        var groupLabels = document.createElement("groupLabels");
        groupLabels.className = "groupLabels";

        Config.SecondGroupDataset.forEach(elementSecondGroup => {//RECORREMOS la categoria SEGUNDA AGRUPACION 
            //console.log(Config.AttNameG2) 
            //console.log(elementSecondGroup)
                          
            var ContainerBars = document.createElement("ContainerBar");
            ContainerBars.className = "ContainerBars";
            var index = 0; 
            Config.GroupLabelsData.forEach(elementLabelData => {  //RECORREMOS LOS STAKS    
                //console.log(elementLabelData)     
                Config.Datasets.forEach(element => {//RECORREMOS EL DTA EN BUSCA DEL TIEMPO Y EL STAK
                    //console.log("elemento -"+element[Config.AttNameG1]+ " - "+element[Config.AttNameG2]+" - "+ element[Config.AttNameEval])
                    //console.log("filtros - " +elementGroup[Config.AttNameG1] + " - " + elementSecondGroup[Config.AttNameG2] + " - " + elementLabelData.id_) 

                    if (element[Config.AttNameG1] == elementGroup[Config.AttNameG1]
                        && element[Config.AttNameEval] == elementLabelData.id_ 
                        && element[Config.AttNameG2] == elementSecondGroup[Config.AttNameG2]) {  
                        //console.log(element)     
                        //CalcularTotal
                        var Size = Config.ContainerSize;                         
                        //var Maxcantidad = getTotal(element, Config.GroupDataTotals);                            
                        var BarSize = (element.cantidad/MaxVal); //% de tamaño
                        var labelCol = element.cantidad;
                        if (Config.ColumnLabelDisplay == 1) {
                            //dibujar el valor en porcentaje
                            var total = FindInTotal(element, Config.GroupDataTotals,Config);
                            //console.log("totyal: "+total.cantidad)
                            labelCol = Math.round((labelCol / total.cantidad) * 100)+'%';                                
                        }
                        if (Config.ColumnLabelDisplay == 2) {
                            if (contador == 0) {
                                //pasado = element.cantidad;
                            }else{                                  
                                //console.log("pasado: "+ pasado + " actual:  "+element.cantidad + " año: "+ element[Config.AttNameG1] + " categ "+ element[Config.AttNameG2]+ " categ2 "+ element[Config.AttNameG3])                                       
                                var pasado = FindPasado(element,Config.Datasets, Config)
                                if (pasado == 0) {
                                    var divisor = 1;
                                  } else {
                                    var divisor = pasado;
                                  }
                                labelCol =  labelCol+' ('+ Math.round(( (((element.cantidad - pasado) / divisor) * 100) + Number.EPSILON) * 100) / 100  + "%)";
                            }

                        }
                                                   
                        var Bars = CreateStringNode(`
                        <Bars class="Bars" style="height:${Size * BarSize}px;background:${Config.Colors[index]}">
                            <label>
                                ${labelCol}
                            </labe>
                        </Bars>`) 
                        ContainerBars.appendChild(Bars);                                  
                    }                           
                }) //FIN DATA
                index ++;  
                groupBars.append(ContainerBars); 
                       
            });//FIN STAKS
            
            groupLabels.append(CreateStringNode(`       
                <label class="groupLabels">
                    ${elementSecondGroup[Config.AttNameG2]}
                </labe>`) 
            )  
        }); //fin segunda agrupacion
        SectionBars.append(groupBars);
        SectionLabelSecondGroup.append(groupLabels);
        SectionLabelGroup.append(CreateStringNode(`       
            <label class="groupLabels">
                ${elementGroup[Config.AttNameG1]}
            </labe>`) 
        )    
        contador++;              
    })   
    ChartContainer.append(SectionTitle,
            SectionLabels,
            SectionBars,
            SectionLabelSecondGroup,
            SectionLabelGroup
        );
}

function DrawThreeGroupChart(Config){
    var Config = new ChartConfig(Config);
    var ChartContainer = GetObj(Config.ContainerName); 
    ChartContainer.className = "WChartContainer";
    ChartContainer.innerHTML = "";  
    var SectionTitle = CreateStringNode(`<h3>${Config.Title}</h3>`);
    var SectionLabels = document.createElement('section');
    SectionLabels.className = "SectionLabels"
    
    // var SectionLabelGroup = document.createElement('section');
    // SectionLabelGroup.className = "SectionLabelGroup";    
    
    // var SectionLabelSecondGroup = document.createElement('section');
    // SectionLabelSecondGroup.className = "SectionLabelSecondGroup";
    
    // var SectionLabelThreeGroup = document.createElement('section');
    // SectionLabelThreeGroup.className = "SectionLabelThreeGroup";     

    var index = 0
    Config.GroupLabelsData.forEach(element => { 
            SectionLabels.appendChild(CreateStringNode(
                `<label><span style="background:${Config.Colors[index]}"></span>${element.Descripcion}</label>`
            ));
            index ++;
    })  
    var SectionBars = document.createElement('section');
    SectionBars.className="SectionBars";
    SectionBars.style.minHeight = Config.ContainerSize + "px";
    //tomar maxvalue
    var MaxVal = MaxValue(Config.GroupDataTotals);

    SectionBars.append(DrawBackgroundChart(MaxVal)); 

    var pasado = null;
    var contador = 0;
    Config.GroupDataset.forEach(elementGroup => {//RECORREMOS EL TIEMPO PRIMERA AGRUPACION        
        var GroupSection = document.createElement("GroupSection");        
        GroupSection.className = "GroupSection";

        var groupBars = document.createElement("groupBar");

        groupBars.className = "groupBars";
        groupBars.append(DrawBackgroundLine(MaxVal)); 

        //cajon barras
        //cajoin de lkabels 1
        //cajon de labels 2
        //cajon de labels 3

        //groupBars.style.height =  Config.ContainerSize + "px !important";
        
        
        var groupLabels = document.createElement("groupLabels");        
        groupLabels.className = "groupLabels ElementG1";

        var groupLabelsTwo = document.createElement("groupLabelsTwo");
        groupLabelsTwo.className = "groupLabels ElementG2"; 

        var groupLabelsThree = document.createElement("groupLabelsThree");
        groupLabelsThree.className = "groupLabels ElementG3";

        
        GroupSection.append(groupBars,groupLabelsThree,groupLabelsTwo,groupLabels);
        

        Config.SecondGroupDataset.forEach(elementSecondGroup => {//RECORREMOS la categoria SEGUNDA AGRUPACION
            //var groupLabelT = document.createElement("groupLabelT");
            //groupLabelT.className = "groupLabels";
            Config.ThreeGroupDataset.forEach(elementThreeGroup => {//RECORREMOS la categoria tercera AGRUPACION
                
                var ContainerBars = document.createElement("ContainerBar");
                ContainerBars.className = "ContainerBars";
                var index = 0;                
                Config.GroupLabelsData.forEach(elementLabelData => {  //RECORREMOS LOS STAKS         
                    
                    Config.Datasets.forEach(element => {//RECORREMOS EL DTA EN BUSCA DEL TIEMPO Y EL STAK
                        if (element[Config.AttNameG1] == elementGroup[Config.AttNameG1]
                            && element[Config.AttNameEval] == elementLabelData.id_ 
                            && element[Config.AttNameG2] == elementSecondGroup[Config.AttNameG2]
                            && element[Config.AttNameG3] == elementThreeGroup[Config.AttNameG3]) { 
                            //CalcularTotal
                            var Size = Config.ContainerSize;                         
                            var BarSize = (element.cantidad/MaxVal); //% de tamaño
                            var labelCol = element.cantidad;
                            if (Config.ColumnLabelDisplay == 1) {
                                //dibujar el valor en porcentaje
                                var total = FindInTotal(element, Config.GroupDataTotals,Config);
                                labelCol = Math.round((labelCol / total.cantidad) * 100)+'%';                                
                            }
                            if (Config.ColumnLabelDisplay == 2) {
                                if (contador == 0) {
                                }else{                                  
                                    var pasado = FindPasado(element,Config.Datasets, Config)
                                    if (pasado == 0) {
                                        var divisor = 1;
                                      } else {
                                        var divisor = pasado;
                                      }
                                    labelCol =  labelCol+' ('+ Math.round(( (((element.cantidad - pasado) / divisor) * 100) + Number.EPSILON) * 100) / 100  + "%)";
                                }
                            }                                                       
                            var Bars = CreateStringNode(`
                            <Bars class="Bars" style="height:${Size * BarSize}px;background:${Config.Colors[index]}">
                                <label>
                                    ${labelCol}
                                </labe>
                            </Bars>`) 
                            ContainerBars.appendChild(Bars); 
                            
                        }    
                    }) //FIN DATA
                    index ++;  
                    groupBars.append(ContainerBars); 
                        
                });//FIN STAKS
                 groupLabelsThree.append(CreateStringNode(`       
                     <label class="">
                         ${elementThreeGroup[Config.AttNameG3]}
                   </label>`) 
                    )  
            }); //fin tercera agrupacion            
            groupLabelsTwo.append(CreateStringNode(`       
            <label class="">
               ${elementSecondGroup[Config.AttNameG2]}
            </label>`) 
            )               
            
        }); //fin segunda agrupacion
        groupLabels.append(CreateStringNode(`       
        <label class="">
           ${elementGroup[Config.AttNameG1]}
        </labe>`) 
        )   
        //groupBars.append(groupLabels);   
        SectionBars.append(GroupSection);
        // SectionLabelSecondGroup.append(groupLabels);  
        // SectionLabelThreeGroup.append(groupLabelsThree);
        // SectionLabelGroup.append(CreateStringNode(`       
        //     <label class="groupLabels">
        //         ${elementGroup[Config.AttNameG1]}
        //     </labe>`) 
        // )   
        //console.log("contador: "+contador)
        contador++;
    })   
    ChartContainer.append(SectionTitle,
            SectionLabels,
            SectionBars
            /*SectionLabelThreeGroup,
            SectionLabelSecondGroup,
            SectionLabelGroup*/
        );
}

function DrawBackgroundChart(value, size = 600){
    //console.log(value)
    var countLine = 0;
    var val = 0;
    if (value > 1000) {
        var countLine = parseInt(value / 1000)
        var value = parseInt(value / 1000) * 1000 + 1000;
        val = 1000;
    }else if (value > 100) {
        var countLine = parseInt(value / 100)
        var value = parseInt(value / 100) * 100 + 100 ;
        val = 100;    
    }else if (value > 0) {
        var countLine = parseInt(value / 10)
        var value = parseInt(value / 10) * 10 + 10;
        val = 10;        
    }
    var ContainerLine = document.createElement('section');
    ContainerLine.className = "BackGrounLineX";
    var valueLabel = 0;
    
    for (let index = 0; index < countLine; index++) {
        valueLabel = valueLabel + val;
        ContainerLine.appendChild(CreateStringNode(
            `<path class="CharLineXNumber"><label>${valueLabel}</label></path>`
        ));        
    }
    return ContainerLine;
}
function DrawBackgroundLine(value, size = 600){
    //console.log(value)
    var countLine = 0;
    var val = 0;
    if (value > 1000) {
        var countLine = parseInt(value / 1000)
        var value = parseInt(value / 1000) * 1000 + 1000;
        val = 1000;
    }else if (value > 100) {
        var countLine = parseInt(value / 100)
        var value = parseInt(value / 100) * 100 + 100 ;
        val = 100;    
    }else if (value > 0) {
        var countLine = parseInt(value / 10)
        var value = parseInt(value / 10) * 10 + 10;
        val = 10;        
    }
    var ContainerLine = document.createElement('section');
    ContainerLine.className = "BackGrounLineX";
    var valueLabel = 0;
    
    for (let index = 0; index < countLine; index++) {
        valueLabel = valueLabel + val;
        ContainerLine.appendChild(CreateStringNode(
            `<path class="CharLineX"></path>`
        ));        
    }
    return ContainerLine;
}


function MaxValue(DataArry){
    var Maxvalue = 0;   
     for (let index = 0; index < DataArry.length; index++) {
         if (parseInt(DataArry[index]['cantidad']) > Maxvalue) {
             Maxvalue = DataArry[index]['cantidad'];
         }
    }
    return Maxvalue;
}

function FindInTotal(Elemento, list, Config) {
    var FindElement = false;  
        for (let index = 0; index < list.length; index++) {
            if (list[index][Config.AttNameG3]) {                
                if (list[index][Config.AttNameG1] == Elemento[Config.AttNameG1] && 
                    list[index][Config.AttNameG2] == Elemento[Config.AttNameG2] && 
                    list[index][Config.AttNameG3] == Elemento[Config.AttNameG3]) {                    
                    FindElement = list[index];
                }  
            }else if (list[index][Config.AttNameG2]) {
                if (list[index][Config.AttNameG1] == Elemento[Config.AttNameG1] &&
                     list[index][Config.AttNameG2] == Elemento[Config.AttNameG2]) {
                    FindElement = list[index];                                
                }  
            }else{
                if (list[index][Config.AttNameG1] == Elemento[Config.AttNameG1]) {
                    FindElement = list[index];                                
                }
            }                          
        }    
    return FindElement;
} 
function FindPasado(Elemento, list, Config) {
    var FindElement = {cantidad: 0}; 
        for (let index = 0; index < list.length; index++) {
            if (list[index][Config.AttNameG3]) {  
                if (list[index][Config.AttNameG1] < Elemento[Config.AttNameG1] &&
                     list[index][Config.AttNameG2] == Elemento[Config.AttNameG2] &&
                      list[index][Config.AttNameG3] == Elemento[Config.AttNameG3] && 
                      list[index][Config.AttNameEval] == Elemento[Config.AttNameEval]) {                    
                    FindElement = list[index];
                }  
            }else if (list[index][Config.AttNameG2]) {
                if (list[index][Config.AttNameG1] < Elemento[Config.AttNameG1] && 
                    list[index][Config.AttNameG2] == Elemento[Config.AttNameG2] &&
                     list[index][Config.AttNameEval] == Elemento[Config.AttNameEval]) {
                    FindElement = list[index];                                
                }  
            }else{
                if (list[index][Config.AttNameG1] < Elemento[Config.AttNameG1] &&
                     list[index][Config.AttNameEval] == Elemento[Config.AttNameEval]) {
                    FindElement = list[index];                                
                }
            }                          
        }
    return FindElement.cantidad;
}