import { WRender } from "../WDevCore/WModules/WComponentsTools.js";
import "../WDevCore/WWDeprecateComponents/WChartJSComponent.js";
class BarReport {
    constructor(props) {
        this.type = "div";
        this.props = props;
        this.children = [{
                type: 'h1',
                props: { id: "", class: "" },
                children: ["Bar report Chart"]
            },
            {
                type: 'section',
                props: { id: "", class: "" },
                children: [this.StartReport()]
            }
        ]
    }
    StartReport = () => {
        var result = {
            "datos": [{
                    "cantidad": 21,
                    "estado": "Naranja",
                    "time": "julio 2019",
                    "categ2": "Moderado",
                    "categ": "Ekisde"
                },
                {
                    "cantidad": 2,
                    "estado": "Naranja",
                    "time": "julio 2019",
                    "categ2": "Moderado",
                    "categ": "Nic"
                },
                {
                    "cantidad": 14,
                    "estado": "Fresa",
                    "time": "julio 2019",
                    "categ2": "Moderado",
                    "categ": "Galaxia"
                },
                {
                    "cantidad": 17,
                    "estado": "Fresa",
                    "time": "julio 2019",
                    "categ2": "Moderado",
                    "categ": "Nic2"
                },
                {
                    "cantidad": 36,
                    "estado": "Naranja",
                    "time": "julio 2019",
                    "categ2": "Moderado",
                    "categ": "Galaxia"
                },
                {
                    "cantidad": 19,
                    "estado": "Naranja",
                    "time": "julio 2019",
                    "categ2": "Moderado",
                    "categ": "Nic2"
                },
                {
                    "cantidad": 13,
                    "estado": "Fresa",
                    "time": "julio 2019",
                    "categ2": "Moderado",
                    "categ": "Canal2"
                },
                {
                    "cantidad": 16,
                    "estado": "Verde",
                    "time": "julio 2019",
                    "categ2": "Moderado",
                    "categ": "Galaxia"
                },
                {
                    "cantidad": 16,
                    "estado": "Fresa",
                    "time": "julio 2019",
                    "categ2": "Moderado",
                    "categ": "Nic3"
                },
                {
                    "cantidad": 15,
                    "estado": "Naranja",
                    "time": "julio 2019",
                    "categ2": "Moderado",
                    "categ": "Canal2"
                },
                {
                    "cantidad": 31,
                    "estado": "Fresa",
                    "time": "julio 2019",
                    "categ2": "Moderado",
                    "categ": "La Castellana"
                }
            ],
        };
        var CharConfig = {
            ContainerName: "MyChart",
            Title: "MyChart",
            GroupLabelsData: [{ id_: "Fresa", Descripcion: "Severa" },
                { id_: "Naranja", Descripcion: "Moderada" },
                { id_: "Verde", Descripcion: "Sin sintomas" }
            ],
            GroupDataset: result.Labels,
            Datasets: result.datos,
            Colors: ["#ff6699", "#ffbb99", "#adebad"],
            ContainerSize: 400,
            ColumnLabelDisplay: 0,
            AttNameEval: "estado",
            AttNameG1: "time",
            AttNameG2: "categ2",
            AttNameG3: "categ",
            EvalValue: "cantidad",
        };
        //await import("../Scripts/Modules/WChartJSComponent.js"); 
        return WRender.createElement({ type: 'w-colum-chart', props: { data: CharConfig } });
    }
}
class RadialReport {
    constructor(props) {
        this.type = "div";
        this.props = props;

        this.children = [{
                type: 'h1',
                props: { id: "", class: "" },
                children: ["Bar report Chart"]
            },
            {
                type: 'section',
                props: { id: "", class: "" },
                children: [this.StartReport()]
            }
        ]
    }
    StartReport = () => {
        const DataSet = [
            { cantidad: 20, time: 2020, },
            { cantidad: 80, time: 2020, },
            { cantidad: 90, time: 2020, }
        ];
        var CharConfig = {
            ContainerName: "MyChart",
            Title: "MyChart",
            GroupLabelsData: [{ id_: "Fresa", Descripcion: "Severa" },
                { id_: "Naranja", Descripcion: "Moderada" },
                { id_: "Verde", Descripcion: "Sin sintomas" }
            ],
            Datasets: DataSet,
            Colors: ["#ff6699", "#ffbb99", "#adebad"],
            ContainerSize: 400,
            ColumnLabelDisplay: 0,
            AttNameEval: "estado",
            AttNameG1: "time",
            AttNameG2: "categ2",
            AttNameG3: "categ",
            EvalValue: "cantidad",
        };
        return WRender.createElement({ type: 'w-radial-chart', props: { data: CharConfig } });
    }

}
class ReportView {
    constructor(props) {
        this.type = "div";
        this.props = props;
        this.children = [{
                type: 'h2',
                props: { id: "", class: "" },
                children: ["Reports"]
            },
            {
                type: 'section',
                props: { id: "", class: "" },
                children: [
                    new BarReport({ class: "", id: "BarReport" }),
                    new RadialReport({ class: "", id: "RadialReport" })
                ]
            }
        ]
    }
}

export { ReportView }