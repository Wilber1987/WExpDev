import { WRender, ArrayFunctions } from "../WModules/WComponentsTools.js";
import { WCssClass } from "../WModules/WStyledRender.js"

class ChartConfig {
    constructor(Config) {
        this.ContainerName = Config.ContainerName;
        this.Title = Config.Title;
        this.AttNameEval = Config.AttNameEval;
        this.EvalValue = Config.EvalValue;
        this.AttNameG1 = Config.AttNameG1;
        this.AttNameG2 = Config.AttNameG2;
        this.AttNameG3 = Config.AttNameG3;
        this.GroupLabelsData = Config.GroupLabelsData; //series
        this.Datasets = Config.Datasets; //datos        
        this.Colors = Config.Colors;
        this.GroupDataTotals = Config.GroupDataTotals;
        this.ContainerSize = Config.ContainerSize;
        this.ColumnLabelDisplay = Config.ColumnLabelDisplay;
    }
}
class ColumChart extends HTMLElement {
    constructor(props) {
            super();
        }
        /*
            PARA CONVERTIRLO EN GRAFICO DE BARRAS NO STAKED
            1. modificar el flex direccion de Conteinerbars
            2. modificar ancho de containerbars y label(la agrupada), en base a la cantidad de series/staks usar anchos fijos
            3. modificar el alto y ancho de la bar
        */
    attributeChangedCallBack() {
        this.DrawChart();
    }
    connectedCallback() {
        if (this.innerHTML != "") {
            return;
        }
        this.DrawChart();
    }
    DrawChart() {
        this.ChartInstance = new ChartConfig(this.data);
        // this.ChartInstance.GroupDataset =  orderByDate(this.ChartInstance.GroupDataset,
        //  sessionStorage.getItem('type'));        
        this.Totals = ArrayFunctions.DataTotals(this.ChartInstance);
        this.MaxVal = ArrayFunctions.MaxValue(this.Totals, this.ChartInstance);
        let ChartFragment = document.createElement("div");
        ChartFragment.className = "WChartContainer";
        ChartFragment.append(this._AddSectionTitle(this.ChartInstance.Title));
        ChartFragment.append(this._AddSectionlabels(this.ChartInstance.GroupLabelsData, this.ChartInstance.Colors));

        let GroupsData = [
            this.ChartInstance.Datasets,
            ArrayFunctions.ArryUnique(this.ChartInstance.Datasets, this.ChartInstance.AttNameG1),
            ArrayFunctions.ArryUnique(this.ChartInstance.Datasets, this.ChartInstance.AttNameG2),
            ArrayFunctions.ArryUnique(this.ChartInstance.Datasets, this.ChartInstance.AttNameG3)
        ];
        ChartFragment.append(this._AddSectionBars(GroupsData, this.ChartInstance));
        ChartFragment.append(this._AddSectionLabelsGroups(this.ChartInstance));
        this.append(ChartFragment);
    }
    _AddSectionTitle(Title) {
        // var Title = 
        /* sessionStorage.getItem('Title') + ' - ' 
        +sessionStorage.getItem('Indicador') 
        +ChartContainer.name;*/
        var SectionTitle = WRender.CreateStringNode(`<h3 style="font-size:18px; margin:0px">${Title}</h3>`);
        return SectionTitle;
    }
    _AddSectionlabels(GroupLabelsData, Colors) {
        var SectionLabels = document.createElement('section');
        var index = 0
        var style = "";
        if (GroupLabelsData.length > 7) {
            style = "font-size:8px;"
        }
        SectionLabels.className = "SectionLabels"
        GroupLabelsData.forEach(element => {
            SectionLabels.appendChild(WRender.CreateStringNode(
                `<label style="${style}"><span style="background:${Colors[index]}">
                </span>${element.Descripcion}</label>`
            ));
            index++;
        })
        return SectionLabels;
    }
    _AddSectionBars(Groups, Config) {
        //console.log(Config)  
        const DataSet = Groups[0];
        const GroupDataset = Groups[1];
        const SecondGroupDataset = Groups[2];
        const ThreeGroupDataset = Groups[3];
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
            } else {
                groupLabels = document.createElement("groupLabels");
                groupLabels.className = "groupLabels";
            }
            if (SecondGroupDataset != null) {
                if (count == 0) {
                    groupLabelsTwo = document.createElement("groupLabelsTwo");
                    groupLabelsTwo.className = "groupLabels ElementG2";
                } else {
                    groupLabelsTwo = document.createElement("groupLabelsTwo");
                    groupLabelsTwo.className = "groupLabels";
                }
            }
            if (ThreeGroupDataset != null) {
                if (count == 0) {
                    groupLabelsThree = document.createElement("groupLabelsThree");
                    groupLabelsThree.className = "groupLabels ElementG3";
                } else {
                    groupLabelsThree = document.createElement("groupLabelsThree");
                    groupLabelsThree.className = "groupLabels";
                }
            }
            //CONSTRUCCCION DE DATOS   
            if (SecondGroupDataset != null) {
                SecondGroupDataset.forEach(elementSecondGroup => { //RECORREMOS la categoria SEGUNDA AGRUPACION                     
                    if (ThreeGroupDataset != null) {
                        ThreeGroupDataset.forEach(elementThreeGroup => { //RECORREMOS la categoria tercera AGRUPACION
                            var ContainerBars = document.createElement("ContainerBar");
                            ContainerBars.className = "ContainerBars";
                            this._DrawGroupChart(Config, ContainerBars, elementGroup, elementSecondGroup, elementThreeGroup);
                            groupBars.append(ContainerBars);
                            groupBars.append(this._DrawBackgroundLine(this.MaxVal, null, Config.ColumnLabelDisplay));
                            groupLabelsThree.append(WRender.CreateStringNode(`       
                                <label class="">
                                    ${elementThreeGroup[Config.AttNameG3]}
                                </label>`));
                        });

                    } else {
                        var ContainerBars = document.createElement("ContainerBar");
                        ContainerBars.className = "ContainerBars";
                        this._DrawGroupChart(Config, ContainerBars, elementGroup, elementSecondGroup);
                        groupBars.append(ContainerBars);
                        groupBars.append(this._DrawBackgroundLine(this.MaxVal, null, Config.ColumnLabelDisplay));
                    }
                    groupLabelsTwo.append(WRender.CreateStringNode(`       
                            <label class="">
                                ${elementSecondGroup[Config.AttNameG2]}
                            </label>`));
                })
            } else {
                var ContainerBars = document.createElement("ContainerBar");
                ContainerBars.className = "ContainerBars";
                this._DrawGroupChart(Config, ContainerBars, elementGroup);
                groupBars.append(ContainerBars);
                groupBars.append(this._DrawBackgroundLine(this.MaxVal, null, Config.ColumnLabelDisplay));
            }
            groupLabels.append(WRender.CreateStringNode(`       
                <label class="">
                    ${elementGroup[Config.AttNameG1]}
                </labe>`));
            count++;
            GroupSection.append(groupBars, groupLabelsThree, groupLabelsTwo, groupLabels);

            SectionBars.append(GroupSection);
        })
        SectionBars.append(this._DrawBackgroundChart(this.MaxVal, null, Config.ColumnLabelDisplay));
        return SectionBars;
    }
    _DrawGroupChart(Config, ContainerBars, elementGroup = null, elementSecondGroup = null, elementThreeGroup = null) {
        //console.log(Config)
        let index = 0;
        Config.GroupLabelsData.forEach(elementLabelData => { //RECORREMOS LOS STAKS 
            Config.Datasets.forEach(element => { //RECORREMOS EL DTA EN BUSCA DEL TIEMPO Y EL STAK
                    let bar = null;
                    if (elementThreeGroup != null) {
                        if (element[Config.AttNameG1] == elementGroup[Config.AttNameG1] &&
                            element[Config.AttNameEval] == elementLabelData.id_ &&
                            element[Config.AttNameG2] == elementSecondGroup[Config.AttNameG2] &&
                            element[Config.AttNameG3] == elementThreeGroup[Config.AttNameG3]) {
                            bar = this._DrawBar(element, Config, index);
                        }
                    } else if (elementSecondGroup != null) {
                        if (element[Config.AttNameG1] == elementGroup[Config.AttNameG1] &&
                            element[Config.AttNameEval] == elementLabelData.id_ &&
                            element[Config.AttNameG2] == elementSecondGroup[Config.AttNameG2]) {
                            bar = this._DrawBar(element, Config, index);
                        }
                    } else if (elementGroup != null) {
                        if (element[Config.AttNameG1] == elementGroup[Config.AttNameG1] &&
                            element[Config.AttNameEval] == elementLabelData.id_) {
                            bar = this._DrawBar(element, Config, index);
                        }
                    }
                    if (bar != null) {
                        ContainerBars.appendChild(bar);
                    }
                }) //FIN DATA
            index++;

        });
    }
    _DrawBackgroundChart(value, size = 600, ValP) {
        var countLine = 0;
        var val = 0;
        var countLine = 0;
        var val = parseInt(value / 10);
        //%
        countLine = 10
        if (ValP == 1) {
            countLine = 10
                //var value = parseInt(value / 10) * 10 + 10;
            val = 10;
        }
        var ContainerLine = document.createElement('section');
        ContainerLine.className = "BackGrounLineX";
        var valueLabel = 0;

        for (let index = 0; index < countLine; index++) {
            if (ValP == 1) {
                valueLabel = valueLabel + val;
                ContainerLine.appendChild(WRender.CreateStringNode(
                    `<path class="CharLineXNumber"><label>${valueLabel}%</label></path>`
                ));
            } else {
                valueLabel = valueLabel + val;
                ContainerLine.appendChild(WRender.CreateStringNode(
                    `<path class="CharLineXNumber"><label>${valueLabel.toFixed(1)}</label></path>`
                ));
            }

        }
        return ContainerLine;
    }
    _DrawBackgroundLine(value, size = 600, ValP) {
        //console.log(value)
        var countLine = 0;
        var val = parseInt(value / 10);
        //%
        countLine = 10
        if (ValP == 1) {
            countLine = 10
                //var value = parseInt(value / 10) * 10 + 10;
            val = 10;
        }
        var ContainerLine = document.createElement('section');
        ContainerLine.className = "BackGrounLineX";
        var valueLabel = 0;

        for (let index = 0; index < countLine; index++) {
            if (ValP == 1) {
                valueLabel = valueLabel + val;
                ContainerLine.appendChild(WRender.CreateStringNode(
                    `<path class="CharLineX"></path>`
                ));
            } else {
                valueLabel = valueLabel + val;
                ContainerLine.appendChild(WRender.CreateStringNode(
                    `<path class="CharLineX"></path>`
                ));
            }
        }
        return ContainerLine;
    }
    _DrawBar(element, Config, index) {
        var Size = Config.ContainerSize;
        var Size = 220;
        var BarSize = (element[Config.EvalValue] / this.MaxVal); //% de tamaño
        var labelCol = element[Config.EvalValue];
        var styleP = "";
        if (Config.ColumnLabelDisplay == 1) {
            //dibujar el valor en porcentaje
            styleP = ";flex-grow: 1;"
            var total = ArrayFunctions.FindInTotal(element, this.Totals, Config);
            var multiplier = Math.pow(10, 1 || 0);
            var number = labelCol / total[Config.EvalValue] * 100
            number = Math.round(number * multiplier) / multiplier
            labelCol = number + '%';
        }
        var Bars = WRender.CreateStringNode(`
            <Bars class="Bars" style="${styleP}height:${Size * BarSize}px;background:${Config.Colors[index]}">
                <label>
                    ${labelCol}
                </labe>
            </Bars>`);
        return Bars;
    }
    _AddSectionLabelsGroups(Config) {
        var SectionLabelGroup = document.createElement('section');
        SectionLabelGroup.className = "SectionLabelGroup";
        var color1 = " #70ad47";
        var AttNameG1 = sessionStorage.getItem('AttNameG1');
        SectionLabelGroup.appendChild(WRender.CreateStringNode(
            `<label><span style="background:${color1}"></span>${Config.AttNameG1}</label>`
        ));
        if (Config.AttNameG2) {
            var color1 = " #5b9bd5";
            var AttNameG1 = sessionStorage.getItem('AttNameG2');
            SectionLabelGroup.appendChild(WRender.CreateStringNode(
                `<label><span style="background:${color1}"></span>${Config.AttNameG2}</label>`
            ));
        }
        if (Config.AttNameG3) {
            var color1 = " #ffc000";
            var AttNameG1 = sessionStorage.getItem('AttNameG3');
            SectionLabelGroup.appendChild(WRender.CreateStringNode(
                `<label><span style="background:${color1}"></span>${Config.AttNameG3}</label>`
            ));
        }


        return SectionLabelGroup;
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
    DrawChart = async() => {
        //const { WRender.createElementNS } = await
        //import ("../WModules/WComponents.js");
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
        ChartFragment.append(this._AddSectionData(this.ChartInstance, WRender.createElementNS));
        this.append(ChartFragment);
    }
    _AddSectionTitle(Title) {
        var SectionTitle = WRender.CreateStringNode(
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
                WRender.CreateStringNode(
                    `<label style="${style}"><span style="background:${Colors[index]}">
                   </span>${element.Descripcion}
            </label>`
                )
            );
            index++;
        });
        return SectionLabels;
    }
    _AddSectionData(Config) {
        const DataSet = Config.Datasets;
        let SectionChart = document.createElement("section");
        SectionChart.className = "SectionRadialChart";
        var Chart = WRender.createElementNS({
            type: "svg",
            props: {
                viewBox: "0 0 120 120",
            }
        });
        Chart.setAttribute("class", "RadialChart");
        var total = ArrayFunctions.SumValue(DataSet, Config);
        var index = 0;
        var porcentajeF = 0;
        DataSet.forEach((element) => {
            let porcentaje = parseInt((element[Config.EvalValue] / total) * 100);
            let color = element.color;
            if (Config.Colors) {
                color = Config.Colors[index];
            }
            let Circle = WRender.createElementNS({
                type: "circle",
                props: {
                    class: "circle",
                    cx: 60,
                    cy: 60,
                    r: 54,
                    "stroke-width": "50",
                    stroke: color,
                    //"stroke-linecap": "round"
                },
            });
            //texto
            let degs = (360 * porcentajeF) / 100;
            let degs2 = (((360 * porcentaje) / 100) / 2) - 12;
            let TextSVG = WRender.createElementNS({
                type: "text",
                class: "circleText",
                props: {
                    x: 0,
                    y: 0,
                    fill: "#fff",
                    //"transform-origin": "60px 60px",
                    "dominant-baseline": "middle",
                    "text-anchor": "middle",
                    "font-size": "6",
                    transform: `translate(0,0),rotate(-${degs + (degs2)})`,
                }
            })
            if (Config.ColumnLabelDisplay == 0) {
                TextSVG.append(document.createTextNode(porcentaje + "%"));
            } else {
                TextSVG.append(document.createTextNode(element[Config.EvalValue]));
            }
            let g = WRender.createElementNS({
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
            } else {
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

customElements.define("w-radial-chart", RadialChart);
customElements.define("w-colum-chart", ColumChart);

