function CreateStringNode(string){
    let node = document.createRange().createContextualFragment(string);
    return node;
}

class ChartConfig{
    constructor(Config) {
        this.ContainerName = Config.ContainerName;
        this.Title = Config.Title;
        this.GroupDataset = Config.GroupDataset;
        this.GroupLabelsData = Config.GroupLabelsData;
        this.Datasets = Config.Datasets;       
    }
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
    //labels data son las series
    Config.GroupLabelsData.forEach(element => {   
        for (const prop in element) {
            SectionLabels.appendChild(CreateStringNode(
                `<div>${element[prop]}</div>`
            )); 
        }          
    })    
    var SectionBars = document.createElement('section');
    SectionBars.className="SectionBars";
        Config.GroupDataset.forEach(elementGroup => {
        var groupBars = document.createElement("groupBar");
        groupBars.className = "groupBars";
        Config.Datasets.forEach(element => {
            if (element.time == elementGroup.time) {                
                var Bars = CreateStringNode(`
                <Bars class="Bars" style="height:${element.cantidad}px">
                    <label>
                        ${element.cantidad}
                    </labe>
                </Bars>`) 
                groupBars.appendChild(Bars);                                  
            }      
            console.log(groupBars)                      
        })
        SectionBars.append(groupBars);
        SectionLabelGroup.append(CreateStringNode(`       
            <label class="groupLabels">
                ${elementGroup.time}
            </labe>`)
        )                  
    })   
    ChartContainer.append(SectionTitle,SectionLabels,SectionBars,SectionLabelGroup);
}