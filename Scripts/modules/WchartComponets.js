function CreateStringNode(string){
    let node = document.createRange().createContextualFragment(string);
    return node;
}

class ChartConfig{
    constructor(Config) {
        this.ContainerName = Config.ContainerName;
        this.Title = Config.Title;
        this.GroupDataset = Config.GroupDataset;//primera agrupacion
        this.SecondGroupDataset = Config.SecondGroupDataset;//segunda agrupacion
        this.GroupLabelsData = Config.GroupLabelsData;//series
        this.Datasets = Config.Datasets; //datos
        this.Colors = Config.Colors;      
    }
}

function DrawGroupChart(Config){
    var Config = new ChartConfig(Config);
    var ChartContainer = GetObj(Config.ContainerName);  
    ChartContainer.className = "WChartContainer";  
    var SectionTitle = CreateStringNode(`<h3>${Config.Title}</h3>`);
    var SectionLabels = document.createElement('section');
    SectionLabels.className = "SectionLabels"
    var SectionLabelGroup = document.createElement('section');
    SectionLabelGroup.className = "SectionLabelGroup";
      
    var index = 0
    Config.GroupLabelsData.forEach(element => { 
            SectionLabels.appendChild(CreateStringNode(
                `<label><span style="background:${Config.Colors[index]}"></span>${element}</label>`
            ));
            index ++;
    })  
    var SectionBars = document.createElement('section');
    SectionBars.className="SectionBars";
        Config.GroupDataset.forEach(elementGroup => {
        var groupBars = document.createElement("groupBar");
        groupBars.className = "groupBars";
        var index = 0;        
        Config.GroupLabelsData.forEach(elementLabelData => {           
            Config.Datasets.forEach(element => {
                if (element.time == elementGroup.time && element.estado == elementLabelData) {                               
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
                ${elementGroup.time}
            </labe>`) 
        )                  
    })   
    ChartContainer.append(SectionTitle,SectionLabels,SectionBars,SectionLabelGroup);
}

function DrawStakedGroupChart(Config){
    var Config = new ChartConfig(Config);
    var ChartContainer = GetObj(Config.ContainerName);  
    ChartContainer.className = "WChartContainer";  
    var SectionTitle = CreateStringNode(`<h3>${Config.Title}</h3>`);
    var SectionLabels = document.createElement('section');
    SectionLabels.className = "SectionLabels"
    var SectionLabelGroup = document.createElement('section');
    SectionLabelGroup.className = "SectionLabelGroup";
      
    var index = 0
    Config.GroupLabelsData.forEach(element => { 
            SectionLabels.appendChild(CreateStringNode(
                `<label><span style="background:${Config.Colors[index]}"></span>${element}</label>`
            ));
            index ++;
    })  
    var SectionBars = document.createElement('section');
    SectionBars.className="SectionBars";
        Config.GroupDataset.forEach(elementGroup => {
        var groupBars = document.createElement("groupBar");
        groupBars.className = "groupBars";

        var ContainerBars = document.createElement("ContainerBar");
        ContainerBars.className = "ContainerBars";

        var index = 0;        
        Config.GroupLabelsData.forEach(elementLabelData => {           
            Config.Datasets.forEach(element => {
                if (element.time == elementGroup.time && element.estado == elementLabelData) {                               
                    var Bars = CreateStringNode(`
                    <Bars class="Bars" style="height:${element.cantidad}px;background:${Config.Colors[index]}">
                        <label>
                            ${element.cantidad}
                        </labe>
                    </Bars>`) 
                    ContainerBars.appendChild(Bars);                                  
                }                           
            })
            index ++;  
            groupBars.append(ContainerBars);          
        });        
        SectionBars.append(groupBars);
        SectionLabelGroup.append(CreateStringNode(`       
            <label class="groupLabels">
                ${elementGroup.time}
            </labe>`) 
        )                  
    })   
    ChartContainer.append(SectionTitle,SectionLabels,SectionBars,SectionLabelGroup);
}

function DrawDoubleGroupChart(Config){
    var Config = new ChartConfig(Config);
    var ChartContainer = GetObj(Config.ContainerName);  
    ChartContainer.className = "WChartContainer";  
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
                `<label><span style="background:${Config.Colors[index]}"></span>${element}</label>`
            ));
            index ++;
    })  
    var SectionBars = document.createElement('section');
    SectionBars.className="SectionBars";
    Config.GroupDataset.forEach(elementGroup => {//RECORREMOS EL TIEMPO PRIMERA AGRUPACION
        var groupBars = document.createElement("groupBar");
        groupBars.className = "groupBars";
        var groupLabels = document.createElement("groupLabels");
        groupLabels.className = "groupLabels";

        Config.SecondGroupDataset.forEach(elementSecondGroup => {//RECORREMOS la categoria SEGUNDA AGRUPACION
            
            var ContainerBars = document.createElement("ContainerBar");
            ContainerBars.className = "ContainerBars";
            var index = 0; 
            Config.GroupLabelsData.forEach(elementLabelData => {  //RECORREMOS LOS STAKS         
                Config.Datasets.forEach(element => {//RECORREMOS EL DTA EN BUSCA DEL TIEMPO Y EL STAK
                    
                    if (element.time == elementGroup.time
                        && element.estado == elementLabelData 
                        && element.categ == elementSecondGroup.categ) {                               
                        var Bars = CreateStringNode(`
                        <Bars class="Bars" style="height:${element.cantidad}px;background:${Config.Colors[index]}">
                            <label>
                                ${element.cantidad}
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
                    ${elementSecondGroup.categ}
                </labe>`) 
            )  
        }); //fin segunda agrupacion
        SectionBars.append(groupBars);
        SectionLabelSecondGroup.append(groupLabels);
        SectionLabelGroup.append(CreateStringNode(`       
            <label class="groupLabels">
                ${elementGroup.time}
            </labe>`) 
        )                  
    })   
    ChartContainer.append(SectionTitle,
            SectionLabels,
            SectionBars,
            SectionLabelSecondGroup,
            SectionLabelGroup
        );
}