import { WCssClass } from "../WDevCore/WModules/WStyledRender.js";
import "../WDevCore/WComponents/WSlide.js";
import "../WDevCore/WComponents/WRichText.js";
import "../WDevCore/WComponents/WTableComponents.js";
import "../WDevCore/WComponents/WAppNavigator.js";
import { ComponentsManager, WAjaxTools, WRender } from "../WDevCore/WModules/WComponentsTools.js";
//DEFINICION DE TABLAS
const Data = [
    { id: 1, Category: "Category 3", Type: "Type 1", Time: "2020-01-01", Value: 35 },
    { id: 2, Category: "Category 1", Type: "Type 2", Time: "2020-03-01", Value: 200 },
    { id: 3, Category: "Category 2", Type: "Type 2", Time: "2020-02-01", Value: 50 },
    { id: 4, Category: "Category 1", Type: "Type 3", Time: "2020-01-01", Value: 105 },
    { id: 5, Category: "Category 1", Type: "Type 3", Time: "2020-01-01", Value: 39 },
    { id: 6, Category: "Category 2", Type: "Type 4", Time: "2020-02-01", Value: 180 },
    { id: 7, Category: "Category 1", Type: "Type 4", Time: "2020-01-01", Value: 100 },
    { id: 8, Category: "Category 2", Type: "Type 1", Time: "2020-02-01", Value: 70 },
    { id: 9, Category: "Category 1", Type: "Type 1", Time: "2020-01-01", Value: 35 },
    { id: 10, Category: "Category 3", Type: "Type 5", Time: "2020-03-01", Value: 98 },
    { id: 11, Category: "Category 1", Type: "Type 3", Time: "2020-02-01", Value: 40 },
];
class ModalDocs extends ComponentsManager {
    constructor(props) {
        super();
        this.type = "div";
        this.props = props;
        this.props.class = "DocCont";
        this.props.style = "padding: 10px";
        const NavigateElements = [{
            name: "Implementación",
            action: () => {
                this.NavigateFunction("BasicModal", new BasicModal(), "ModulesDetail");
            }
        },
        ];
        const Nav = {
            type: "w-app-navigator",
            props: {
                id: "TableNav",
                Elements: NavigateElements
            }
        };
        const DivContainer = {
            type: "div",
            props: { id: "ModulesDetail" }
        };
        const Style = {
            type: "w-style",
            props: {
                ClassList: [
                    new WCssClass(`.DocCont img`, {
                        width: "100%"
                    }),
                ],
                MediaQuery: [{
                    condicion: "(max-width: 800px)",
                    ClassList: []
                },]
            }
        }
        this.children = [
            { type: "h2", props: { innerText: "Ventanas Modales / POP-Ups" } },
            Nav,
            DivContainer,
            Style
        ]
    }
}

class BasicModal {
    constructor() {
        this.type = "div";
        this.children = [];
        this.children.push({
            type: "div",
            props: {
                style: "padding: 10px",
                innerHTML: `
                <div contenteditable="true"><p class="MsoNormal" style="font-family: Arial, Helvetica, sans-serif;">En caso de no querer tener a disposición las opciones de paginación es posible deshabilitarla usando el atributo paginate:false dentro de TableConfig</p><div style="color: rgb(212, 212, 212); background-color: rgb(30, 30, 30); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><br><div>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #4fc1ff;">Wtable</span>.<span style="color: #9cdcfe;">TableConfig</span>&nbsp;=&nbsp;{&nbsp;<span style="color: #9cdcfe;">Datasets</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #4fc1ff;">Data</span>,&nbsp;<span style="color: #9cdcfe;">paginate</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #569cd6;">false</span>};</div><br></div><p class="MsoNormal"><o:p></o:p></p><p class="MsoNormal"><o:p></o:p></p></div>
                `
            }
        });       
    }
}


export { ModalDocs }