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
    var SectionTitle = CreateStringNode(`<h3>${Config.Title}</h3>`)
    var SectionLabels = CreateStringNode(`<section></section>`)
    Config.GroupLabelsData.forEach(element => {   
        for (const prop in element) {
            SectionLabels.append(CreateStringNode(
                `<div>${element[prop]}</div>`
            )); 
        }          
    })    
    ChartContainer.append(SectionTitle,SectionLabels);

}