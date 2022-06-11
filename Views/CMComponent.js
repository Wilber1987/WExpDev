import { WRender, WArrayF, ComponentsManager, WAjaxTools } from "../WDevCore/WModules/WComponentsTools.js";
import { WTableComponent } from "../WDevCore/WComponents/WTableComponent.js";
import { WTableDynamicComp } from "../WDevCore/WComponents/WTableDynamic.js";
import { ColumChart } from "../WDevCore/WComponents/WChartJSComponents.js";
import { WCssClass } from '../WDevCore/WModules/WStyledRender.js';
import { WFilterOptions } from "../WDevCore/WComponents/WFilterControls.js";
import { WModalForm } from "../WDevCore/WComponents/WModalForm.js";
import { StyleScrolls, StylesControlsV1 } from "../WDevCore/StyleModules/WStyleComponents.JS";
import { dataTestFact } from '../DATA/data.js';

//proto
import { MultiSelect } from "../WDevCore/WComponents/WMultiSelect.js";

class CMConfig {
    Url = "./Views/API/TakeData.php?function=Report"
    KpiTable = "tblseguimientousuario";
    KpiParam = "estado_final";
    KpiParamExclude = ["N/D"];
    KpiParamInclude = Estados ?? [];
}
class CMComponent extends HTMLElement {
    constructor(Config = (new CMConfig())) {
        super();
        this.Config = Config;
        WRender.SetStyle(this, {
            display: "grid",
            gridTemplateColumns: "50% 50%",
            gridTemplateRows: "50px 50px auto",
        });
        this.attachShadow({ mode: 'open' });
        this.postRequest = {};
        this.FilterControl = new WFilterOptions({
            Dataset: [new Model()],
            FilterFunction: (DFilt) => {
                this.DefineTable(DFilt);
            }
        });
        //Options
        this.TimeDrop = WRender.Create({
            tagName: "select", onchange: async () => { }, children: [
                { tagName: "option", value: "year", innerText: "Años" },
                { tagName: "option", value: "mes", innerText: "Meses" },
                { tagName: "option", value: "trimestre", innerText: "Trimestre" }
            ]
        });
        this.TimeOptions = WRender.Create({
            className: "TimeOptions", children: [
                { tagName: "input", type: "date", value: (new Date()).toISO(), onchange: async () => { } },
                { tagName: "input", type: "date", value: (new Date()).toISO(), onchange: async () => { } },
                this.TimeDrop, {
                    tagName: "select", onchange: async () => { }, children: [
                        { tagName: "option", value: "%", innerText: "%" },
                        { tagName: "option", value: "Total", innerText: "Total" },
                    ]
                }
            ]
        });
        this.FilterOptions = WRender.createElement({
            type: 'div', props: { class: 'FilterOptions' }, children: [
                {//filters
                    type: 'button', props: {
                        class: 'CMBTn', innerText: '', onclick: async () => {
                            this.shadowRoot.append(new WModalForm({
                                title: "Filtros",
                                ObjectModal: this.FilterControl,
                                StyleForm: "columnX3",
                                ObjectOptions: {
                                    SaveFunction: (NewObject) => { }
                                }
                            }));
                        }
                    }, children: [{ type: 'img', props: { src: this.Icons.filter, srcset: this.Icons.filter } }]
                }, {//Data
                    type: 'button', props: {
                        class: 'CMBTn', innerText: '', onclick: async () => {
                            this.TableRefres();
                        }
                    }, children: [{ type: 'img', props: { src: this.Icons.config, srcset: this.Icons.dataset } }]
                }, {//Print
                    type: 'button', props: {
                        class: 'CMBTn', innerText: '', onclick: async () => {
                            const MainTable = this.MainTable.innerHTML + this.TableStyle.innerHTML;
                            const MainChart = this.ChartContainer.querySelector("w-colum-chart");
                            const PrintNode = MainTable + MainChart.shadowRoot.innerHTML;
                            //console.log(PrintNode);
                            const ventimp = window.open(' ', 'popimpr');
                            ventimp.document.write(PrintNode);
                            ventimp.document.close();
                            ventimp.print();
                            ventimp.close();
                        }
                    }, children: [{ type: 'img', props: { src: this.Icons.config, srcset: this.Icons.printI } }]
                }
            ]
        });
        this.BasicDrop = WRender.Create({
            tagName: "select", onchange: async () => { },
            children: EvaluacionBasica.map(x => {
                return { tagName: "option", value: x.id_, innerText: x.Descripcion };
            })
        });
        this.EvaluationOptions = WRender.Create({
            className: "EvaluationOptions", children: [
                this.BasicDrop
            ]
        });
        this.SpecifictMultiselect = new MultiSelect({
            Dataset: TiposEstados,
            MultiSelect: false
        });
        this.AnaliticOptions = WRender.Create({
            className: "EvaluationOptions", children: [
                this.SpecifictMultiselect
            ]
        });
        this.shadowRoot.append(WRender.createElement(StyleScrolls));
        this.shadowRoot.append(WRender.createElement(StylesControlsV1));
        this.shadowRoot.append(WRender.createElement(this.FStyle()));
        //Body
        this.shadowRoot.append(
            this.TimeOptions,
            this.EvaluationOptions,
            this.FilterOptions,
            this.AnaliticOptions
        );
    }
    connectedCallback() { this.DraCMComponent(); }
    TakeData = async () => {
        const response = await WAjaxTools.PostRequest(this.Config.Url, {
            KpiTable: this.Config.KpiTable,//NOMBRE DE LA TABLA PRINCIPAL
            KpiParam: this.Config.KpiParam,//NOMBRE DEL PARAMETRO PRINCIPAL A EVALUAR
            KpiParamInclude: this.Config.KpiParamInclude,//LISTA DE VALORES INCLUIDOS
            KpiParamExclude: this.Config.KpiParamExclude,//LISTA DE VALORES EXCLUIDOS
            fecha1: "2019-01-01",
            fecha2: (new Date()).toISO(),
            Basic: this.BasicDrop.value,
            Dimencion: this.SpecifictMultiselect.NameSelected,
            DIMSelect: this.SpecifictMultiselect.FieldName,
            DIMCondicion: this.SpecifictMultiselect.selectedItems,
            DIMSubSelect: this.SpecifictMultiselect.SubOptionsFieldName,
            Time: this.TimeDrop.value,
        });
        return response;
    }
    DraCMComponent = async () => {
        const response = await this.TakeData();
        this.Table = new WTableDynamicComp({
            Dataset: response,
            EvalValue: "EvalValue",
            AttNameEval: "estado_final",
            groupParams: this.TakeGroups(),
            DisplayOptions: true,
            //DisplayFilts: [],//filtros
            //ParamsForOptions: ["cuarto"]//parametros de agrupacion
        })
        WRender.SetStyle(this.Table, {
            gridColumn: "1/3"
        })
        //this.Table.DefineTable();
        this.shadowRoot.append(this.Table);
    }
    TableRefres = async () => {
        this.shadowRoot.removeChild(this.Table);
        this.DraCMComponent();
        return;
    }
    TakeGroups = () => {
        const groupParams = [this.TimeDrop.value];
        if (this.BasicDrop.value != "") {
            groupParams.push(this.BasicDrop.value)
            //groupParams.push('Basic');
        }
        if (this.SpecifictMultiselect.NameSelected != "") {
            //groupParams.push(this.SpecifictMultiselect.NameSelected)
            groupParams.push('DIMValue');
        }
        console.log(groupParams);
        return groupParams;
    }
    FStyle() {
        const WTableStyle = {
            type: "w-style",
            props: {
                id: "TableStyleDinamic" + this.id,
                ClassList: [
                    new WCssClass(`.CMBTn`, {
                        "font-weight": "bold",
                        "border": "none",
                        "padding": "5px",
                        "margin": "2px",
                        "text-align": "center",
                        "display": "inline-block",
                        "font-size": "12px",
                        "cursor": "pointer",
                        "background-color": "#4894aa",
                        "color": "#fff",
                        "border-radius": "0.2cm",
                        width: 30,
                        height: 30,
                        "background-color": "#4894aa",
                        "font-family": "monospace"
                    }), new WCssClass(`.TimeOptions`, {
                        display: "flex",
                    }), new WCssClass(`.CMBTn img`, {
                        width: 20,
                        height: 20,
                        filter: "invert(100%)"
                    })
                ],
                MediaQuery: [{
                    condicion: "(max-width: 600px)",
                    ClassList: [
                    ]
                }]
            }
        }
        return WTableStyle;
    }
    Icons = {
        printI: "data:image/svg+xml;base64," + "PHN2ZyBpZD0iTGF5ZXIiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUxMiA1MTIiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtNDE0IDgwaC0zMTZjLTUuNTIzIDAtMTAtNC40NzctMTAtMTB2LTI2YzAtMjQuMzAxIDE5LjY5OS00NCA0NC00NGgyNDhjMjQuMzAxIDAgNDQgMTkuNjk5IDQ0IDQ0djI2YzAgNS41MjMtNC40NzcgMTAtMTAgMTB6Ii8+PHBhdGggZD0ibTQ1OCAxMTJoLTQwNGMtMjkuNzc2IDAtNTQgMjQuMjI0LTU0IDU0djE4OGMwIDI5Ljc3NiAyNC4yMjQgNTQgNTQgNTRoMzR2LTgwYzAtMzkuNzAxIDMyLjI5OS03MiA3Mi03MmgxOTJjMzkuNzAxIDAgNzIgMzIuMjk5IDcyIDcydjgwaDM0YzI5Ljc3NiAwIDU0LTI0LjIyNCA1NC01NHYtMTg4YzAtMjkuNzc2LTI0LjIyNC01NC01NC01NHptLTM2MS45OCAxMjBjLTEzLjI1NSAwLTI0LjAwNS0xMC43NDUtMjQuMDA1LTI0czEwLjc0LTI0IDIzLjk5NS0yNGguMDFjMTMuMjU1IDAgMjQgMTAuNzQ1IDI0IDI0cy0xMC43NDUgMjQtMjQgMjR6Ii8+PHBhdGggZD0ibTM1MiAzMDRoLTE5MmMtMTMuMjU1IDAtMjQgMTAuNzQ1LTI0IDI0djgwIDMyYzAgMTMuMjU1IDEwLjc0NSAyNCAyNCAyNGgxOTJjMTMuMjU1IDAgMjQtMTAuNzQ1IDI0LTI0di0zMi04MGMwLTEzLjI1NS0xMC43NDUtMjQtMjQtMjR6Ii8+PC9zdmc+",
        dataset: "data:image/svg+xml;base64," + "PHN2ZyBoZWlnaHQ9IjUxMnB0IiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMnB0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im00OTcgMzMxaC00NXYtNDVjMC04LjI4NTE1Ni02LjcxNDg0NC0xNS0xNS0xNWgtMTY2di0zMGg0NWM4LjI4NTE1NiAwIDE1LTYuNzE0ODQ0IDE1LTE1cy02LjcxNDg0NC0xNS0xNS0xNWgtNDV2LTMwaDEwNWM4LjI4NTE1NiAwIDE1LTYuNzE0ODQ0IDE1LTE1di0xNTFjMC04LjI4NTE1Ni02LjcxNDg0NC0xNS0xNS0xNWgtMjQwYy04LjI4NTE1NiAwLTE1IDYuNzE0ODQ0LTE1IDE1djE1MWMwIDguMjg1MTU2IDYuNzE0ODQ0IDE1IDE1IDE1aDEwNXYzMGgtNDVjLTguMjg1MTU2IDAtMTUgNi43MTQ4NDQtMTUgMTVzNi43MTQ4NDQgMTUgMTUgMTVoNDV2MzBoLTE2NmMtOC4yODUxNTYgMC0xNSA2LjcxNDg0NC0xNSAxNXY0NWgtNDVjLTguMjg1MTU2IDAtMTUgNi43MTQ4NDQtMTUgMTV2MTUxYzAgOC4yODUxNTYgNi43MTQ4NDQgMTUgMTUgMTVoMTIwYzguMjg1MTU2IDAgMTUtNi43MTQ4NDQgMTUtMTV2LTE1MWMwLTguMjg1MTU2LTYuNzE0ODQ0LTE1LTE1LTE1aC00NXYtMzBoMTUxdjMwaC00NWMtOC4yODUxNTYgMC0xNSA2LjcxNDg0NC0xNSAxNXYxNTFjMCA4LjI4NTE1NiA2LjcxNDg0NCAxNSAxNSAxNWgxMjBjOC4yODUxNTYgMCAxNS02LjcxNDg0NCAxNS0xNXYtMTUxYzAtOC4yODUxNTYtNi43MTQ4NDQtMTUtMTUtMTVoLTQ1di0zMGgxNTF2MzBoLTQ1Yy04LjI4NTE1NiAwLTE1IDYuNzE0ODQ0LTE1IDE1djE1MWMwIDguMjg1MTU2IDYuNzE0ODQ0IDE1IDE1IDE1aDEyMGM4LjI4NTE1NiAwIDE1LTYuNzE0ODQ0IDE1LTE1di0xNTFjMC04LjI4NTE1Ni02LjcxNDg0NC0xNS0xNS0xNXptLTM0Ni0zMDFoMjEwdjEyMWgtMjEwem0tMzEgNDUyaC05MHYtMTIxaDkwem0xODEgMGgtOTB2LTEyMWg5MHptMTgxIDBoLTkwdi0xMjFoOTB6bTAgMCIvPjxwYXRoIGQ9Im00NTIgNDM2YzAgOC4yODUxNTYtNi43MTQ4NDQgMTUtMTUgMTVzLTE1LTYuNzE0ODQ0LTE1LTE1IDYuNzE0ODQ0LTE1IDE1LTE1IDE1IDYuNzE0ODQ0IDE1IDE1em0wIDAiLz48cGF0aCBkPSJtMjcxIDQzNmMwIDguMjg1MTU2LTYuNzE0ODQ0IDE1LTE1IDE1cy0xNS02LjcxNDg0NC0xNS0xNSA2LjcxNDg0NC0xNSAxNS0xNSAxNSA2LjcxNDg0NCAxNSAxNXptMCAwIi8+PHBhdGggZD0ibTkwIDQzNmMwIDguMjg1MTU2LTYuNzE0ODQ0IDE1LTE1IDE1cy0xNS02LjcxNDg0NC0xNS0xNSA2LjcxNDg0NC0xNSAxNS0xNSAxNSA2LjcxNDg0NCAxNSAxNXptMCAwIi8+PC9zdmc+",
        filter: "data:image/svg+xml;base64," + "PHN2ZyBoZWlnaHQ9IjUxMXB0IiB2aWV3Qm94PSIwIDAgNTExIDUxMS45OTk4MiIgd2lkdGg9IjUxMXB0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im00OTIuNDc2NTYyIDBoLTQ3MS45NzY1NjJjLTExLjA0Njg3NSAwLTIwIDguOTUzMTI1LTIwIDIwIDAgNTUuNjk1MzEyIDIzLjg3NSAxMDguODY3MTg4IDY1LjUwMzkwNiAxNDUuODcxMDk0bDg3LjU4OTg0NCA3Ny44NTE1NjJjMTUuMTg3NSAxMy41IDIzLjg5ODQzOCAzMi44OTg0MzggMjMuODk4NDM4IDUzLjIyMjY1NnYxOTUuMDMxMjVjMCAxNS45Mzc1IDE3LjgxMjUgMjUuNDkyMTg4IDMxLjA4OTg0MyAxNi42MzY3MTlsMTE3Ljk5NjA5NC03OC42NjAxNTZjNS41NjI1LTMuNzEwOTM3IDguOTA2MjUtOS45NTMxMjUgOC45MDYyNS0xNi42NDA2MjV2LTExNi4zNjcxODhjMC0yMC4zMjQyMTggOC43MTA5MzctMzkuNzIyNjU2IDIzLjg5ODQzNy01My4yMjI2NTZsODcuNTg1OTM4LTc3Ljg1MTU2MmM0MS42Mjg5MDYtMzcuMDAzOTA2IDY1LjUwMzkwNi05MC4xNzU3ODIgNjUuNTAzOTA2LTE0NS44NzEwOTQgMC0xMS4wNDY4NzUtOC45NTMxMjUtMjAtMTkuOTk2MDk0LTIwem0tNzIuMDgyMDMxIDEzNS45NzI2NTYtODcuNTg1OTM3IDc3Ljg1NTQ2OWMtMjMuNzE4NzUgMjEuMDg1OTM3LTM3LjMyNDIxOSA1MS4zNzg5MDYtMzcuMzI0MjE5IDgzLjExMzI4MXYxMDUuNjY3OTY5bC03Ny45OTYwOTQgNTEuOTk2MDk0di0xNTcuNjYwMTU3YzAtMzEuNzM4MjgxLTEzLjYwNTQ2OS02Mi4wMzEyNS0zNy4zMjQyMTktODMuMTE3MTg3bC04Ny41ODU5MzctNzcuODUxNTYzYy0yOC4wNzAzMTMtMjQuOTU3MDMxLTQ1Ljk4ODI4MS01OS4xNTIzNDMtNTAuNzg1MTU2LTk1Ljk4MDQ2OGg0MjkuMzg2NzE5Yy00Ljc5Njg3NiAzNi44MjgxMjUtMjIuNzEwOTM4IDcxLjAyMzQzNy01MC43ODUxNTcgOTUuOTc2NTYyem0wIDAiLz48L3N2Zz4=",
        config: "data:image/svg+xml;base64," + "PHN2ZyBoZWlnaHQ9IjUxMnB0IiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMnB0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im00OTkuOTUzMTI1IDE5Ny43MDMxMjUtMzkuMzUxNTYzLTguNTU0Njg3Yy0zLjQyMTg3NC0xMC40NzY1NjMtNy42NjAxNTYtMjAuNjk1MzEzLTEyLjY2NDA2Mi0zMC41MzkwNjNsMjEuNzg1MTU2LTMzLjg4NjcxOWMzLjg5MDYyNS02LjA1NDY4NyAzLjAzNTE1Ni0xNC4wMDM5MDYtMi4wNTA3ODEtMTkuMDg5ODQ0bC02MS4zMDQ2ODctNjEuMzA0Njg3Yy01LjA4NTkzOC01LjA4NTkzNy0xMy4wMzUxNTctNS45NDE0MDYtMTkuMDg5ODQ0LTIuMDUwNzgxbC0zMy44ODY3MTkgMjEuNzg1MTU2Yy05Ljg0Mzc1LTUuMDAzOTA2LTIwLjA2MjUtOS4yNDIxODgtMzAuNTM5MDYzLTEyLjY2NDA2MmwtOC41NTQ2ODctMzkuMzUxNTYzYy0xLjUyNzM0NC03LjAzMTI1LTcuNzUzOTA2LTEyLjA0Njg3NS0xNC45NDkyMTktMTIuMDQ2ODc1aC04Ni42OTUzMTJjLTcuMTk1MzEzIDAtMTMuNDIxODc1IDUuMDE1NjI1LTE0Ljk0OTIxOSAxMi4wNDY4NzVsLTguNTU0Njg3IDM5LjM1MTU2M2MtMTAuNDc2NTYzIDMuNDIxODc0LTIwLjY5NTMxMyA3LjY2MDE1Ni0zMC41MzkwNjMgMTIuNjY0MDYybC0zMy44ODY3MTktMjEuNzg1MTU2Yy02LjA1NDY4Ny0zLjg5MDYyNS0xNC4wMDM5MDYtMy4wMzUxNTYtMTkuMDg5ODQ0IDIuMDUwNzgxbC02MS4zMDQ2ODcgNjEuMzA0Njg3Yy01LjA4NTkzNyA1LjA4NTkzOC01Ljk0MTQwNiAxMy4wMzUxNTctMi4wNTA3ODEgMTkuMDg5ODQ0bDIxLjc4NTE1NiAzMy44ODY3MTljLTUuMDAzOTA2IDkuODQzNzUtOS4yNDIxODggMjAuMDYyNS0xMi42NjQwNjIgMzAuNTM5MDYzbC0zOS4zNTE1NjMgOC41NTQ2ODdjLTcuMDMxMjUgMS41MzEyNS0xMi4wNDY4NzUgNy43NTM5MDYtMTIuMDQ2ODc1IDE0Ljk0OTIxOXY4Ni42OTUzMTJjMCA3LjE5NTMxMyA1LjAxNTYyNSAxMy40MTc5NjkgMTIuMDQ2ODc1IDE0Ljk0OTIxOWwzOS4zNTE1NjMgOC41NTQ2ODdjMy40MjE4NzQgMTAuNDc2NTYzIDcuNjYwMTU2IDIwLjY5NTMxMyAxMi42NjQwNjIgMzAuNTM5MDYzbC0yMS43ODUxNTYgMzMuODg2NzE5Yy0zLjg5MDYyNSA2LjA1NDY4Ny0zLjAzNTE1NiAxNC4wMDM5MDYgMi4wNTA3ODEgMTkuMDg5ODQ0bDYxLjMwNDY4NyA2MS4zMDQ2ODdjNS4wODU5MzggNS4wODU5MzcgMTMuMDM1MTU3IDUuOTQxNDA2IDE5LjA4OTg0NCAyLjA1MDc4MWwzMy44ODY3MTktMjEuNzg1MTU2YzkuODQzNzUgNS4wMDM5MDYgMjAuMDYyNSA5LjI0MjE4OCAzMC41MzkwNjMgMTIuNjY0MDYybDguNTU0Njg3IDM5LjM1MTU2M2MxLjUyNzM0NCA3LjAzMTI1IDcuNzUzOTA2IDEyLjA0Njg3NSAxNC45NDkyMTkgMTIuMDQ2ODc1aDg2LjY5NTMxMmM3LjE5NTMxMyAwIDEzLjQyMTg3NS01LjAxNTYyNSAxNC45NDkyMTktMTIuMDQ2ODc1bDguNTU0Njg3LTM5LjM1MTU2M2MxMC40NzY1NjMtMy40MjE4NzQgMjAuNjk1MzEzLTcuNjYwMTU2IDMwLjUzOTA2My0xMi42NjQwNjJsMzMuODg2NzE5IDIxLjc4NTE1NmM2LjA1NDY4NyAzLjg5MDYyNSAxNC4wMDM5MDYgMy4wMzkwNjMgMTkuMDg5ODQ0LTIuMDUwNzgxbDYxLjMwNDY4Ny02MS4zMDQ2ODdjNS4wODU5MzctNS4wODU5MzggNS45NDE0MDYtMTMuMDM1MTU3IDIuMDUwNzgxLTE5LjA4OTg0NGwtMjEuNzg1MTU2LTMzLjg4NjcxOWM1LjAwMzkwNi05Ljg0Mzc1IDkuMjQyMTg4LTIwLjA2MjUgMTIuNjY0MDYyLTMwLjUzOTA2M2wzOS4zNTE1NjMtOC41NTQ2ODdjNy4wMzEyNS0xLjUzMTI1IDEyLjA0Njg3NS03Ljc1MzkwNiAxMi4wNDY4NzUtMTQuOTQ5MjE5di04Ni42OTUzMTJjMC03LjE5NTMxMy01LjAxNTYyNS0xMy40MTc5NjktMTIuMDQ2ODc1LTE0Ljk0OTIxOXptLTE1Mi4xNjAxNTYgNTguMjk2ODc1YzAgNTAuNjEzMjgxLTQxLjE3OTY4OCA5MS43OTI5NjktOTEuNzkyOTY5IDkxLjc5Mjk2OXMtOTEuNzkyOTY5LTQxLjE3OTY4OC05MS43OTI5NjktOTEuNzkyOTY5IDQxLjE3OTY4OC05MS43OTI5NjkgOTEuNzkyOTY5LTkxLjc5Mjk2OSA5MS43OTI5NjkgNDEuMTc5Njg4IDkxLjc5Mjk2OSA5MS43OTI5Njl6bTAgMCIvPjwvc3ZnPg==",
    }
}
customElements.define('w-cm-component', CMComponent);
export { CMComponent }
class Model {
    constructor() { }
    //Filtros
    Sector = [];
    Holding = [];
    Empresa = [];
    Departamento = [];
    Centro = [];
    Comunidad = [];
    Provincia = [];
    Sexo = [
        { "id_": "Masculino", "descripcion": "Masculino" },
        { "id_": "Femenino", "descripcion": "Femenino" },
    ];
    Edad = [
        { "id_": "18 a 28", "descripcion": "18 a 28" },
        { "id_": "29 a 39", "descripcion": "29 a 39" },
        { "id_": "40 a 50", "descripcion": "40 a 50" },
        { "id_": "51 a 61", "descripcion": "51 a 61" },
        { "id_": "Más de 61", "descripcion": "Más de 61" }
    ];
    Cargo = [
        { "id_": "Directivo", "descripcion": "Directivo" },
        { "id_": "Técnico", "descripcion": "Técnico" },
    ];
    Turno = [
        { "id_": "Matutino", "descripcion": "Matutino" },
        { "id_": "Nocturno", "descripcion": "Nocturno" },
    ];
    Contrato = [
        { "id_": "Indefinido", "descripcion": "Indefinido" },
        { "id_": "Temporal", "descripcion": "Temporal" },
        { "id_": "Obra o servicio", "descripcion": "Obra o servicio" },
        { "id_": "Formación y prácticas", "descripcion": "Formación y prácticas" }
    ];
    Antiguedad = [
        { "id_": "Menos de 1 año", "descripcion": "Menos de 1 año" },
        { "id_": "De 1 a 3 años", "descripcion": "De 1 a 3 años" },
        { "id_": "De 4 a 6 años", "descripcion": "De 4 a 6 años" },
        { "id_": "De 7 a 10 años", "descripcion": "De 7 a 10 años" },
        { "id_": "Más de 10 años", "descripcion": "Más de 10 años" }
    ];
    InicioActividad = new Date();
    FinActividad = new Date();
    //ESTADOS
}
const Estados = [
    { id_: "Fresa", Descripcion: "Severa" },
    { id_: "Naranja", Descripcion: "Moderada" },
    { id_: "Verde", Descripcion: "Sin sintomas" }
];
const TipoEvolucion = [
    { id_: "Positiva", Descripcion: "Evolución positiva" },
    { id_: "Negativa", Descripcion: "Evolución negativa" }
];
const TipoEvolucionPositiva = [
    { id_: "Verde", Descripcion: "Sin síntomas" },
    { id_: "Naranja", Descripcion: "Moderado" }
];
const TipoEvolucionNegativa = [
    { id_: "Fresa", Descripcion: "Severa" },
    { id_: "Naranja", Descripcion: "Moderado" }
];
const RepitenTest = [
    { id_: "2", Descripcion: "Dos" },
    { id_: "3", Descripcion: "Tres" },
    { id_: "4", Descripcion: "Cuatro" },
    { id_: "5", Descripcion: "Más de Cuatro" }
];
const RealizanEncuestas = [
    { id_: "0", Descripcion: "Realizan encuestas" }, { id_: "1", Descripcion: "No realizan encuestas" }
];
const Servicios = [
    { id_: "Áreas", Descripcion: "Áreas" },
    { id_: "Llamadas", Descripcion: "Llamadas" },
    { id_: "Chat", Descripcion: "Chat" },
    { id_: "Psicológo", Descripcion: "Psicológo" },
    { id_: "Talleres", Descripcion: "Talleres" },
    { id_: "Test", Descripcion: "Test" },
    { id_: "Foro", Descripcion: "Foro" }
];
const Areas = [
    { id_: "1", Descripcion: "Psicoemocional" },
    { id_: "2", Descripcion: "Familia" },
    { id_: "3", Descripcion: "Nutrición" }
];
const Seguimientos = [
    { id_: "Nuevo", Descripcion: "Nuevos" },
    { id_: "Activo", Descripcion: "Activos" },
    { id_: "Inactivo", Descripcion: "Inactivos" },
    { id_: "Recuperado", Descripcion: "Recuperados" }
];
const Absentismos = [
    { id_: "1", Descripcion: "Absentismo" },
    { id_: "2", Descripcion: "Asistencia" }
];
const TiposAbsentismos = [
    {
        name: "tbl_absentismo",
        FieldName: "absentismo",
        SubOptions: Absentismos,
        SubOptionsFieldName: "absentismo",
        id_: "Enfermedad común", Descripcion: "Enfermedad común"
    },
    {
        name: "tbl_absentismo",
        FieldName: "absentismo",
        SubOptions: Absentismos,
        SubOptionsFieldName: "absentismo",
        id_: "Accidente laboral", Descripcion: "Accidente laboral"
    },
    {
        name: "tbl_absentismo",
        FieldName: "absentismo",
        SubOptions: Absentismos,
        SubOptionsFieldName: "absentismo",
        id_: "Maternidad/paternidad", Descripcion: "Maternidad/paternidad"
    },
    {
        name: "tbl_absentismo",
        FieldName: "absentismo",
        SubOptions: Absentismos,
        SubOptionsFieldName: "absentismo",
        id_: "Asuntos propios", Descripcion: "Asuntos propios"
    },
    {
        name: "tbl_absentismo",
        FieldName: "absentismo",
        SubOptions: Absentismos,
        SubOptionsFieldName: "absentismo",
        id_: "Otros", Descripcion: "Otros"
    }
];
const TiposEstados = [
    //Deportes------------->
    {
        name: "log_estados_psicoemocionales",
        FieldName: "area_psicoemocional",
        SubOptions: Estados,
        SubOptionsFieldName: "estado_final",
        id_test: 1, Test: "Deportes", id_: "Autoconfianza", Descripcion: "Autoconfianza",
    },
    {
        name: "log_estados_psicoemocionales",
        FieldName: "area_psicoemocional",
        SubOptions: Estados,
        SubOptionsFieldName: "estado_final",
        id_test: 1, Test: "Deportes", id_: "Control de la energía negativa", Descripcion: "Control de la energía negativa",
    },
    {
        name: "log_estados_psicoemocionales",
        FieldName: "area_psicoemocional",
        SubOptions: Estados,
        SubOptionsFieldName: "estado_final",
        id_test: 1, Test: "Deportes", id_: "Control de la atención", Descripcion: "Control de la atención",
    },
    {
        name: "log_estados_psicoemocionales",
        FieldName: "area_psicoemocional",
        SubOptions: Estados,
        SubOptionsFieldName: "estado_final",
        id_test: 1, Test: "Deportes", id_: "Control de la visualización y de las imágenes", Descripcion: "Control de la visualización y de las imágenes",
    },
    {
        name: "log_estados_psicoemocionales",
        FieldName: "area_psicoemocional",
        SubOptions: Estados,
        SubOptionsFieldName: "estado_final",
        id_test: 1, Test: "Deportes", id_: "Nivel motivacional", Descripcion: "Nivel motivacional",
    },
    {
        name: "log_estados_psicoemocionales",
        FieldName: "area_psicoemocional",
        SubOptions: Estados,
        SubOptionsFieldName: "estado_final",
        id_test: 1, Test: "Deportes", id_: "Energía positiva", Descripcion: "Energía positiva",
    },
    {
        name: "log_estados_psicoemocionales",
        FieldName: "area_psicoemocional",
        SubOptions: Estados,
        SubOptionsFieldName: "estado_final",
        id_test: 1, Test: "Deportes", id_: "Control de la actitud", Descripcion: "Control de la actitud",
    },
    //--------------->
    {
        name: "log_estados_psicoemocionales",
        FieldName: "area_psicoemocional",
        SubOptions: Estados,
        SubOptionsFieldName: "estado_final",
        id_test: 2, Test: "Ansiedad", id_: 'Ansiedad', Descripcion: 'Ansiedad',
    },
    {
        name: "log_estados_psicoemocionales",
        FieldName: "area_psicoemocional",
        SubOptions: Estados,
        SubOptionsFieldName: "estado_final",
        id_test: 3, Test: "Estrés", id_: 'Estrés', Descripcion: 'Estrés',
    },
    {
        name: "log_estados_psicoemocionales",
        FieldName: "area_psicoemocional",
        SubOptions: Estados,
        SubOptionsFieldName: "estado_final",
        id_test: 2, Test: "Estado de ánimo bajo", id_: 'Estado de ánimo bajo', Descripcion: 'Estado de ánimo bajo',
    },
    //--------------->
    {
        name: "log_estados_psicoemocionales",
        FieldName: "area_psicoemocional",
        SubOptions: Estados,
        SubOptionsFieldName: "estado_final",
        id_test: 4, Test: "Bienestar", id_: 'Bienestar Psicológico', Descripcion: 'Bienestar Psicológico',
    },
    {
        name: "log_estados_psicoemocionales",
        FieldName: "area_psicoemocional",
        SubOptions: Estados,
        SubOptionsFieldName: "estado_final",
        id_test: 4, Test: "Bienestar", id_: 'Autoaceptación', Descripcion: 'Autoaceptación',
    },
    {
        name: "log_estados_psicoemocionales",
        FieldName: "area_psicoemocional",
        SubOptions: Estados,
        SubOptionsFieldName: "estado_final",
        id_test: 4, Test: "Bienestar", id_: 'Relaciones positivas', Descripcion: 'Relaciones positivas',
    },
    {
        name: "log_estados_psicoemocionales",
        FieldName: "area_psicoemocional",
        SubOptions: Estados,
        SubOptionsFieldName: "estado_final",
        id_test: 4, Test: "Bienestar", id_: 'Autonomía', Descripcion: 'Autonomía',
    },
    {
        name: "log_estados_psicoemocionales",
        FieldName: "area_psicoemocional",
        SubOptions: Estados,
        SubOptionsFieldName: "estado_final",
        id_test: 4, Test: "Bienestar", id_: 'Dominio del entorno', Descripcion: 'Dominio del entorno',
    },
    {
        name: "log_estados_psicoemocionales",
        FieldName: "area_psicoemocional",
        SubOptions: Estados,
        SubOptionsFieldName: "estado_final",
        id_test: 4, Test: "Bienestar", id_: 'Crecimiento personal', Descripcion: 'Crecimiento personal',
    },
    {
        name: "log_estados_psicoemocionales",
        FieldName: "area_psicoemocional",
        SubOptions: Estados,
        SubOptionsFieldName: "estado_final",
        id_test: 4, Test: "Bienestar", id_: 'Propósito de vida', Descripcion: 'Propósito de vida'
    },
    //SATISFACCIONLABORAL
    {
        name: "log_estados_psicoemocionales",
        FieldName: "area_psicoemocional",
        SubOptions: Estados,
        SubOptionsFieldName: "estado_final",
        id_test: 5, Test: "SatisLaboralIgualdad", id_: "Política", Descripcion: "Política de la empresa"
    },
    {
        name: "log_estados_psicoemocionales",
        FieldName: "area_psicoemocional",
        SubOptions: Estados,
        SubOptionsFieldName: "estado_final",
        id_test: 5, Test: "SatisLaboralIgualdad", id_: "Sueldo", Descripcion: "Sueldo"
    },
    {
        name: "log_estados_psicoemocionales",
        FieldName: "area_psicoemocional",
        SubOptions: Estados,
        SubOptionsFieldName: "estado_final",
        id_test: 5, Test: "SatisLaboralIgualdad", id_: "Relaciones con el jefe", Descripcion: "Relaciones con el jefe"
    },
    {
        name: "log_estados_psicoemocionales",
        FieldName: "area_psicoemocional",
        SubOptions: Estados,
        SubOptionsFieldName: "estado_final",
        id_test: 5, Test: "SatisLaboralIgualdad", id_: "Condiciones de trabajo", Descripcion: "Condiciones de trabajo"
    },
    {
        name: "log_estados_psicoemocionales",
        FieldName: "area_psicoemocional",
        SubOptions: Estados,
        SubOptionsFieldName: "estado_final",
        id_test: 5, Test: "SatisLaboralIgualdad", id_: "Relaciones con los compañeros", Descripcion: "Relaciones con los compañeros"
    },
    {
        name: "log_estados_psicoemocionales",
        FieldName: "area_psicoemocional",
        SubOptions: Estados,
        SubOptionsFieldName: "estado_final",
        id_test: 5, Test: "SatisLaboralIgualdad", id_: "Vida personal", Descripcion: "Vida personal"
    },
    {
        name: "log_estados_psicoemocionales",
        FieldName: "area_psicoemocional",
        SubOptions: Estados,
        SubOptionsFieldName: "estado_final",
        id_test: 5, Test: "SatisLaboralIgualdad", id_: "Status", Descripcion: "Status"
    },
    {
        name: "log_estados_psicoemocionales",
        FieldName: "area_psicoemocional",
        SubOptions: Estados,
        SubOptionsFieldName: "estado_final",
        id_test: 5, Test: "SatisLaboralIgualdad", id_: "Supervisión", Descripcion: "Supervisión"
    },
    {
        name: "log_estados_psicoemocionales",
        FieldName: "area_psicoemocional",
        SubOptions: Estados,
        SubOptionsFieldName: "estado_final",
        id_test: 5, Test: "SatisLaboralIgualdad", id_: "Seguridad", Descripcion: "Seguridad"
    },
    {
        name: "log_estados_psicoemocionales",
        FieldName: "area_psicoemocional",
        SubOptions: Estados,
        SubOptionsFieldName: "estado_final",
        id_test: 5, Test: "SatisLaboralIgualdad", id_: "Responsabilidad", Descripcion: "Responsabilidad otorgada"
    },
    {
        name: "log_estados_psicoemocionales",
        FieldName: "area_psicoemocional",
        SubOptions: Estados,
        SubOptionsFieldName: "estado_final",
        id_test: 5, Test: "SatisLaboralIgualdad", id_: "Trabajo en sí mismo", Descripcion: "Trabajo en sí mismo"
    },
    {
        name: "log_estados_psicoemocionales",
        FieldName: "area_psicoemocional",
        SubOptions: Estados,
        SubOptionsFieldName: "estado_final",
        id_test: 5, Test: "SatisLaboralIgualdad", id_: "Crecimiento y promoción", Descripcion: "Crecimiento y promoción"
    },
    {
        name: "log_estados_psicoemocionales",
        FieldName: "area_psicoemocional",
        SubOptions: Estados,
        SubOptionsFieldName: "estado_final",
        id_test: 5, Test: "SatisLaboralIgualdad", id_: "Reconocimiento", Descripcion: "Reconocimiento otorgado"
    },
    {
        name: "log_estados_psicoemocionales",
        FieldName: "area_psicoemocional",
        SubOptions: Estados,
        SubOptionsFieldName: "estado_final",
        id_test: 5, Test: "SatisLaboralIgualdad", id_: "Igualdad", Descripcion: "Políticas de Igualdad"
    },
    {
        name: "log_estados_psicoemocionales",
        FieldName: "area_psicoemocional",
        SubOptions: Estados,
        SubOptionsFieldName: "estado_final",
        id_test: 5, Test: "SatisLaboralIgualdad", id_: "Logro", Descripcion: "Logro alcanzado"
    }
];
const EvaluacionBasica = [
    { id_: "", Descripcion: "Análisis básico" },
    { id_: "sector", Descripcion: "Sector" },
    { id_: "id_empresa", Descripcion: "Empresa" },
    { id_: "centro", Descripcion: "Centro" },
    { id_: "departamento_area", Descripcion: "Departamento/área" },
    { id_: "edad_etiqueta", Descripcion: "Edad" },
    { id_: "cargo", Descripcion: "Cargo" },
    { id_: "antiguedad_etiqueta", Descripcion: "Años en la empresa" },
    { id_: "turno", Descripcion: "Turno" },
    { id_: "contrato", Descripcion: "Tipo de contrato" },
    { id_: "genero", Descripcion: "Sexo" },
]