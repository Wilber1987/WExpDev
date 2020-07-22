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
        ChartFragment.append(this._AddSectionData2(GroupsData, this.ChartInstance));
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
        var oGrafico = [
            {nombre:"vitamina A", cantidad:"40",color:"#0140CA"},
            {nombre:"vitamina B", cantidad:"12",color:"#DD1812"},
            {nombre:"vitamina C", cantidad:"6",color:"#16A6FE"},
            {nombre:"vitamina D", cantidad:"200",color:"#6ab150"},
            {nombre:"vitamina E", cantidad:"35",color:"#000"}
        ];
        let SectionChart = document.createElement('section');
        SectionChart.className = "SectionRadialChart";

        let Chart = document.createElement('Chart');
        Chart.className = "RadialData";
        
        var total = SumValue(oGrafico);        
        console.log(total)
        var index = 0;
        let styleChart = "";
        let porcentajeF = 0;
        oGrafico.forEach(element => {           
            var porcentaje = parseInt((element.cantidad/total)*100);           
            var color = element.color; 
            if (index == 0) {
                styleChart += `${color} ${porcentaje}%,`;
                porcentajeF = porcentajeF + porcentaje; 
            }else if (index > 0 && index < (oGrafico.length -1)) {
                styleChart += `${color}  ${porcentajeF}% ${porcentaje + porcentajeF}%,`;
                porcentajeF = porcentajeF + porcentaje; 
            }else if (index < (oGrafico.length)) {
                styleChart += `${color} ${porcentajeF}%`;
                //porcentajeF = porcentajeF + porcentaje; 
            }
            console.log(styleChart)                    
            index ++;                
        }); 
        Chart.setAttribute("style","background-image:conic-gradient("+ styleChart +");");
        SectionChart.append(Chart);    
        return SectionChart; 

     }   
     _AddSectionData2(Groups, Config){     
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
        var oGrafico = [
            {nombre:"vitamina A", cantidad:"40",color:"#0140CA"},
            {nombre:"vitamina B", cantidad:"12",color:"#DD1812"},
            {nombre:"vitamina C", cantidad:"6",color:"#16A6FE"},
            {nombre:"vitamina D", cantidad:"200",color:"#6ab150"},
            {nombre:"vitamina E", cantidad:"35",color:"#000"}
        ];
        let SectionChart = document.createElement('section');
        SectionChart.className = "SectionRadialChart";
        let Chart = document.createElement('svg');
        Chart.style.transform = "rotate(-90deg);";
        Chart.className = "RadialDataBackground";
        Chart.setAttribute("height","200");
        Chart.setAttribute("width","200");
        //Chart.className = "RadialData";        
        var total = SumValue(oGrafico);        
        console.log(total)
        var index = 0;
        Chart.append(CreateStringNode(`
            <circle class="progress__meter" cx="60" cy="60" r="54" stroke-width="12" />
        `))
        oGrafico.forEach(element => {           
            let porcentaje = parseInt((element.cantidad/total)*100);   
            let Circle = createElement({
                type: "circle",
                props:{
                    class:"circle",
                    cx:60, cy:60, r: 54, "stroke-width":"12"
                },
            }); 
            Circle.style["stroke"] = element.color;
            Circle.style["stroke-linecap"] = "round";
            this.progressInitial(porcentaje, Circle);    
            Chart.append(Circle);  
            index ++;                
        });
        SectionChart.append(Chart);    
        return SectionChart; 
    }
    progressInitial(value, circle) {
        let RADIUS = 54;
        let CIRCUMFERENCE = 2 * Math.PI * RADIUS;
        circle.style.strokeDasharray = CIRCUMFERENCE;
        let progress = value / 100;
        let dashoffset = CIRCUMFERENCE * (1 - progress);            
        console.log('progress:', value + '%', '|', 'offset:', dashoffset)            
        circle.style.strokeDashoffset = dashoffset;
    }  
}
//reparar
function SumValue(DataArry) {
    var Maxvalue = 0;
    for (let index = 0; index < DataArry.length; index++) {        
        if (parseInt(DataArry[index]['cantidad']) > Maxvalue) {
            Maxvalue = Maxvalue + parseFloat(DataArry[index]['cantidad']);
        }
    }    
    return Maxvalue;  
}
customElements.define("radial-chart", RadialChart);