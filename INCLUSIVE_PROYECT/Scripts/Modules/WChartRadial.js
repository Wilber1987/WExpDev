function CreateStringNode(string) {
    let node = document.createRange().createContextualFragment(string);
    return node;
}

class RadialChart extends HTMLElement{
    constructor(props){
        super();        
    }    
    attributeChangedCallBack(){
        this.DrawChart();
    }
    connectedCallback(){    
        this.DrawChart();
    }
    DrawChart(){
        this.ChartInstance = new ChartConfig(this.data);
        let ChartFragment = document.createElement("div");      
        ChartFragment.className = "WChartContainer";
        ChartFragment.append(this._AddSectionTitle(this.ChartInstance.Title));
        ChartFragment.append(this._AddSectionlabels(this.ChartInstance.GroupLabelsData, this.ChartInstance.Colors));
        let GroupsData = [
            this.ChartInstance.Datasets
        ];
        ChartFragment.append(this._AddSectionData(GroupsData, this.ChartInstance));
        this.append(ChartFragment);
    }   
    _AddSectionTitle(Title){                      
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
     _AddSectionData(Groups, Config){
        //const DataSet = Groups[0];
        const DataSet = [
            {
                cantidad: 20,
                time: 2020
            },
            {
                cantidad: 80,
                time: 2020
            }
        ];
        let Chart = document.createElement('section');
        Chart.className = "SectionRadialChart";
       // let Chart = document.createDocumentFragment();
        Chart.append(CreateStringNode(`
                <circle class="RadialDataBackground">100%</circle>
         `));
        DataSet.forEach(element => {
            Chart.append(CreateStringNode(`
                <circle class="RadialData">Value %</circle>
            `));
        });       
        return Chart; 

     }
}
customElements.define("radial-chart", RadialChart);