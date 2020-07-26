function CreateStringNode(string) {
    let node = document.createRange().createContextualFragment(string);
    return node;
  }
  
  class RadialChart extends HTMLElement {
    constructor(props) {
      super();
    }
    attributeChangedCallBack() {
      this.DrawChart();
    }
    connectedCallback() {
      this.DrawChart();
    }
    DrawChart() {
      this.ChartInstance = new ChartConfig(this.data);
      let ChartFragment = document.createElement("div");
      ChartFragment.className = "WChartContainer";
      ChartFragment.append(this._AddSectionTitle(this.ChartInstance.Title));
      ChartFragment.append(
        this._AddSectionlabels(
          this.ChartInstance.GroupLabelsData,
          this.ChartInstance.Colors
        )
      );     
      ChartFragment.append(this._AddSectionData(this.ChartInstance));
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
                   </span>${element.Descripcion}</label>`
          )
        );
        index++;
      });
      return SectionLabels;
    }
    _AddSectionData2(Groups, Config) {
      const DataSet = [
        {
          cantidad: 20,
          time: 2020,
        },
        {
          cantidad: 80,
          time: 2020,
        },
      ];
      var oGrafico = [
        { nombre: "vitamina A", cantidad: "40", color: "#0140CA" },
        { nombre: "vitamina B", cantidad: "12", color: "#DD1812" },
        { nombre: "vitamina C", cantidad: "6", color: "#16A6FE" },
        { nombre: "vitamina D", cantidad: "200", color: "#6ab150" },
        { nombre: "vitamina E", cantidad: "35", color: "#000" },
      ];
      let SectionChart = document.createElement("section");
      SectionChart.className = "SectionRadialChart";
  
      let Chart = document.createElement("Chart");
      Chart.className = "RadialData";
  
      var total = SumValue(oGrafico);
      console.log(total);
      var index = 0;
      let styleChart = "";
      let porcentajeF = 0;
      oGrafico.forEach((element) => {
        var porcentaje = parseInt((element.cantidad / total) * 100);
        var color = element.color;
        if (index == 0) {
          styleChart += `${color} ${porcentaje}%,`;
          porcentajeF = porcentajeF + porcentaje;
        } else if (index > 0 && index < oGrafico.length - 1) {
          styleChart += `${color}  ${porcentajeF}% ${porcentaje + porcentajeF}%,`;
          porcentajeF = porcentajeF + porcentaje;
        } else if (index < oGrafico.length) {
          styleChart += `${color} ${porcentajeF}%`;
          //porcentajeF = porcentajeF + porcentaje;
        }
        console.log(styleChart);
        index++;
      });
      Chart.setAttribute(
        "style",
        "background-image:conic-gradient(" + styleChart + ");"
      );
      SectionChart.append(Chart);
      return SectionChart;
    }
    _AddSectionData(Config) {
        //const DataSet = Config.Datasets;     
        const DataSet = [
            {cantidad: 20,time: 2020,},
            {cantidad: 80,time: 2020, },
            {cantidad: 90,time: 2020,}
          ];        
        let SectionChart = document.createElement("section");
        SectionChart.className = "SectionRadialChart";
        var Chart = createElementNS({
            type: "svg",
            props: {
                viewBox: "0 0 120 120", 
            }
        });   
        Chart.setAttribute("class", "RadialChart");
        var total = SumValue(DataSet);    
        var index = 0;
        var porcentajeF = 0;
        DataSet.forEach((element) => {
            let porcentaje = parseInt((element.cantidad / total) * 100);
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
            let TextSVG = createElementNS({
                type: "text",
                class: "circleText",
                props: { x: 60, y: 60, fill: "red",
                 "transform-origin": "60px 60px",
                 "dominant-baseline": "middle",
                 "text-anchor": "middle"},
                children:[]
            })
            TextSVG.append(document.createTextNode(element.cantidad));
            let g = createElementNS({
                type: "g",
                props: { x: 60, y: 60,  "transform-origin": "60px 60px"}
            });
            g.style.transform = "rotate(" + (360 * porcentajeF) / 100 + "deg)";
            g.append(TextSVG)            
            
            //Text.style.transform = "rotate(10deg)";
           
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
  function SumValue(DataArry) {
        var Maxvalue = 0;
        for (let index = 0; index < DataArry.length; index++) {
        Maxvalue = Maxvalue + parseFloat(DataArry[index]["cantidad"]);
        }
        return Maxvalue;
  }
  customElements.define("radial-chart", RadialChart);