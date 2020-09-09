
//import {createElementNS} from "./Scripts/Modules/WComponents.js";
function CreateStringNode(string) {
    let node = document.createRange().createContextualFragment(string);
    return node;
}
class RadialChartConfig {
  constructor(Config) {
      this.ContainerName = Config.ContainerName;
      this.Title = Config.Title;
      this.AttNameEval = Config.AttNameEval;
      this.EvalValue = Config.EvalValue;
      this.AttNameG1 = Config.AttNameG1;
      this.AttNameG2 = Config.AttNameG2;
      this.AttNameG3 = Config.AttNameG3;
      this.GroupLabelsData = Config.GroupLabelsData;//series
      this.Datasets = Config.Datasets; //datos        
      this.Colors = Config.Colors;
      this.GroupDataTotals = Config.GroupDataTotals;
      this.ContainerSize = Config.ContainerSize;
      this.ColumnLabelDisplay = Config.ColumnLabelDisplay;
  }
}

class RadialChart extends HTMLElement {
    constructor(props) {
      super();
    }
    attributeChangedCallBack() {
      this.DrawChart();
    }
    connectedCallback() {     
      if (this.innerHTML != "") {        
          return;
      }
      this.DrawChart();
    }
   // DrawChart() {
    DrawChart =  async () =>{
     // const {createElementNS} = await import("./WComponents.js");
      this.ChartInstance = new RadialChartConfig(this.data);
      let ChartFragment = document.createElement("div");
      ChartFragment.className = "WChartContainer";
      ChartFragment.append(this._AddSectionTitle(this.ChartInstance.Title));
      ChartFragment.append(
        this._AddSectionlabels(
          this.ChartInstance.GroupLabelsData,
          this.ChartInstance.Colors
        )
      );     
      ChartFragment.append(this._AddSectionData(this.ChartInstance, createElementNS));
      this.append(ChartFragment);
    }
    _AddSectionTitle(Title) {
      var SectionTitle = CreateStringNode(
        `<h3 style="font-size:18px; margin:0px">${Title}</h3>`
      );
      return SectionTitle;
    }
    _AddSectionlabels(GroupLabelsData, Colors) {
      var SectionLabels = document.createElement("section");
      var index = 0;
      var style = "";
      if (GroupLabelsData.length > 7) {
        style = "font-size:8px;";
      }
      SectionLabels.className = "SectionLabels";
      GroupLabelsData.forEach((element) => {
        SectionLabels.appendChild(
          CreateStringNode(
            `<label style="${style}"><span style="background:${Colors[index]}">
                   </span>${element.Descripcion}
            </label>`
          )
        );
        index++;
      });
      return SectionLabels;
    }   
    _AddSectionData(Config, createElementNS) {     
        const DataSet = Config.Datasets; 
        let SectionChart = document.createElement("section");
        SectionChart.className = "SectionRadialChart";
        var Chart = createElementNS({
            type: "svg",
            props: {
                viewBox: "0 0 120 120", 
            }
        });   
        Chart.setAttribute("class", "RadialChart");
        var total = SumValue(DataSet, Config);    
        var index = 0;
        var porcentajeF = 0;
        DataSet.forEach((element) => {
            let porcentaje = parseInt((element[Config.EvalValue] / total) * 100);
            let color = element.color;
            if (Config.Colors) {              
                color = Config.Colors[index]; 
            }
            let Circle = createElementNS({
                type: "circle",
                props: {
                    class: "circle",
                    cx: 60, cy: 60,  r: 54,
                    "stroke-width": "50",
                    stroke: color,
                    //"stroke-linecap": "round"
                },
            }); 
            //texto
            let degs = (360 * porcentajeF) / 100;
            let degs2 = (((360 * porcentaje) / 100) /2) - 12;            
            let TextSVG = createElementNS({
                type: "text",
                class: "circleText",
                props: { 
                  x: 0, y: 0, fill: "#fff",
                 //"transform-origin": "60px 60px",
                 "dominant-baseline": "middle",
                 "text-anchor": "middle",
                 "font-size":"6",
                 transform:`translate(0,0),rotate(-${degs + (degs2)})`,
                }
            })          
            if (Config.ColumnLabelDisplay == 0) {
              TextSVG.append(document.createTextNode(porcentaje + "%"));      
            }else {
              TextSVG.append(document.createTextNode(element[Config.EvalValue]));
            }                 
            let g = createElementNS({
                type: "g",
                props: {
                    transform: `translate(100, 70), rotate(${degs + (degs2)})`,
                    "transform-origin": "-40px -10px"
                }
            });          
            g.append(TextSVG); 
            Circle.style.transform = "rotate(" + (360 * porcentajeF) / 100 + "deg)";
            porcentajeF = porcentajeF + porcentaje;
            if (index == DataSet.length - 1) {
                this.progressInitial(porcentaje, Circle, 4);
            }else{
                this.progressInitial(porcentaje, Circle);
            }            
            Chart.append(Circle);
            Chart.append(g)
            index++;
        });
        SectionChart.append(Chart);
        var index = 0;    
        return SectionChart;
    }
    progressInitial(value, circle, val = 0) {
        let RADIUS = 54;
        let Perimetro = 2 * Math.PI * RADIUS;
        circle.style.strokeDasharray = Perimetro;
        let progress = value / 100;
        let dashoffset = (Perimetro * (1 - progress)) - val;
        //console.log("progress:", value + "%", "|", "offset:", dashoffset);
        //console.log("perimetro:", Perimetro + "%", "|", "offset:", dashoffset);
        circle.style.strokeDashoffset = dashoffset;
    }
  }
  //reparar
  function SumValue(DataArry, Config) {
        var Maxvalue = 0;
        for (let index = 0; index < DataArry.length; index++) {
        Maxvalue = Maxvalue + parseFloat(DataArry[index][Config.EvalValue]);
        }
        return Maxvalue;
  }
//var Radial = 
customElements.define("w-radial-chart", RadialChart);
//export {Radial};
