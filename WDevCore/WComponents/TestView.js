import { WRender, WArrayF, ComponentsManager, WAjaxTools } from '../WModules/WComponentsTools.js';
import { WCssClass } from '../WModules/WStyledRender.js';
import { StyleScrolls, StylesControlsV1 } from "../StyleModules/WStyleComponents.JS";

const DOMManager = new ComponentsManager();
class WTestConfig {
    Title = "Title";
    Descripcion = "descripcion....";
    AllRequire = true;
    GeneralResp = ["SI", "NO", "N/A"];
    Questions = [{
        Id: 1, Descripcion: "desc 1", Value: null,
        QuestionType: "Open" ??
            "MultiSelect" ??
            "Likert/Category" ??
            "Number",
        Resps: ["SI", "NO", "N/A"] ?? [
            { id: 1, desc: "SI", value: "SI" },
            { id: 2, desc: "NO", value: "NO" },
            { id: 3, desc: "N/A", value: "N/A" }]
    }];
}
class WTestView extends HTMLElement {
    constructor(Config = (new WTestConfig())) {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.Config = Config;
        this.Config.GeneralResp = this.Config.GeneralResp ?? [];
        this.MainTestContainer = WRender.Create({ class: "MainTestContainer" });
        this.MainTestContainer.append(WRender.CreateStringNode(`<h3>${this.Config.Title}</h3>`));
        this.MainTestContainer.append(WRender.CreateStringNode(`<p>${this.Config.Descripcion}</p>`));
        this.MainTestContainer.append(this.DrawTest(this.Config.Questions));
        this.Config.AllRequire = this.Config.AllRequire ?? true;
        this.shadowRoot.append(this.MainTestContainer);
        this.shadowRoot.append(this.MainOptions());
        this.shadowRoot.append(WRender.Create(this.style));
        this.shadowRoot.append(WRender.createElement(StyleScrolls));
        this.shadowRoot.append(WRender.createElement(StylesControlsV1));
    }
    connectedCallback() {
        this.DrawComponent();
    }
    DrawComponent = () => { }
    DrawTest = (QuestionsList) => {
        const ContainerQuestions = WRender.Create({ class: "ContainerQuestions" });
        QuestionsList.forEach((Question, index) => {
            Question.id = Question.id ?? index;
            const RespContainer = WRender.Create({ class: "RespContainer" });
            let InputType;
            switch (Question.QuestionType) {
                case "Number": case "Open":
                    InputType = Question.QuestionType == "Number" ? "number" : "text";
                    RespContainer.append(WRender.Create({
                        tagName: 'input', type: InputType, id: "Control" + Question.Id,
                        onchange: (ev) => { Question.Value = ev.target.value; }
                    }));
                    break;
                case "MultiSelect": case "Likert/Category":
                    InputType = Question.QuestionType == "MultiSelect" ? "checkbox" : "radio";
                    Question.Resps = Question.Resps ?? this.Config.GeneralResp;
                    Question.Resps.forEach(Resp => {
                        const RespVal = Resp.__proto__ == Object.prototype ? Resp.id : Resp;
                        const RespText = Resp.__proto__ == Object.prototype ? Resp.desc : Resp;
                        RespContainer.append(WRender.Create([
                            { tagName: 'label', innerText: RespText, htmlFor: "Control" + Question.Id + RespVal },
                            {
                                tagName: 'input', type: InputType, id: "Control" + Question.Id + RespVal, name: "Resp" + Question.Id,
                                value: Resp, onchange: (ev) => {
                                    if (Question.QuestionType == "MultiSelect") {
                                        Question.MultiValues = Question.MultiValues ?? [];
                                        const control = ev.target;
                                        const index = Question.MultiValues.indexOf(Resp);
                                        if (index == -1 && control.checked == true) {
                                            if (WArrayF.FindInArray(Resp, Question.MultiValues) == false) {
                                                Question.MultiValues.push(Resp)
                                            } else {
                                                console.log("Item Existente")
                                            }
                                        } else {
                                            Question.MultiValues.splice(index, 1)
                                        }
                                        Question.Value = Question.MultiValues;

                                    } else Question.Value = ev.target.value;
                                }
                            }
                        ]))
                    });
                    break;
            }
            const QuestionControl = WRender.Create({
                id: "Question" + Question.id,
                class: "QuestionControl",
                children: [{ tagName: "label", class: "DescQuestion", innerText: Question.Descripcion + ":" }, RespContainer]
            });
            ContainerQuestions.append(QuestionControl);
        });
        return ContainerQuestions;
    }
    MainOptions = () => {
        const ContainerOptions = WRender.Create({ class: "ContainerOptions" });
        ContainerOptions.appendChild(WRender.Create({
            tagName: "button", innerText: "Save", className: "BtnPrimary",
            onclick: async () => {
                if (this.Config.AllRequire == true) {
                    let flag = true;
                    this.Config.Questions.forEach(Question => {
                        if (Question.Value == null || Question.Value == undefined) {
                            flag = false;
                            const ContainerQ = this.shadowRoot.querySelector("#Question" + Question.id);
                            WRender.SetStyle(ContainerQ, { boxShadow: "0 0 2px 0 rgb(255, 0, 0)" });
                        }
                    });
                    if (!flag && this.Config.AllRequire == true) {
                        console.log("Test no finalizado");
                        return;
                    }
                }
                if (this.Config.Function != undefined && this.Config.Function.__proto__ == Function.prototype) {
                    this.Config.Function(Question);
                }
            }
        }))
        return ContainerOptions;
    }
    style = {
        tagName: 'w-style', ClassList: [
            new WCssClass(`.MainTestContainer`, {
                display: "flex",
                "justify-content": "center",
                "flex-direction": "column",
                padding: 20
            }), new WCssClass(`.MainTestContainer h3`, {
                "text-align": "center",
                padding: 20,
                margin: 0,
                "border-bottom": "solid 3px #888"
            }), new WCssClass(`.QuestionControl`, {
                padding: 10,
                margin: 10,
                "box-shadow": "0 0 2px 0 rgb(0,0,0,70%)",
                "border-radius": 5,
                display: 'flex',
                "align-items": "center"
            }), new WCssClass(`.QuestionControl:nth-child(odd)`, {
                "background-color": "#f5f4f4",
            }), new WCssClass(`.QuestionControl .DescQuestion`, {
                padding: "5px 20px",
                "min-width": "200px"
            }), new WCssClass(`.RespContainer, .RespContainer div`, {
                display: 'flex',
                "align-items": "center",
                width: "100%"
            }), new WCssClass(`.RespContainer label, .RespContainer input`, {
                cursor: "pointer",
                padding: "5px 20px",
            }), new WCssClass(`.RespContainer input`, {
                height: 20,
                "min-width": 20,
                "color": "#000"
            }),
            //OPTIONS
            new WCssClass(`.ContainerOptions`, {
                padding: 10,
                margin: 10,
                "box-shadow": "0 0 2px 0 rgb(0,0,0,50%)",
                "border-radius": 5,
                display: 'flex',
                "align-items": "center",
                "justify-content": "center"
            }),
        ], MediaQuery: [{
            condicion: '(max-width: 600px)',
            ClassList: [
                new WCssClass(`.QuestionControl:nth-child(odd)`, {
                    "background-color": "inherit",
                }), new WCssClass(`.QuestionControl, .RespContainer`, {
                    display: 'flex',
                    "align-items": "flex-start",
                    "flex-direction": "column",
                }), new WCssClass(`.RespContainer div`, {
                    "justify-content": "space-between"
                }), new WCssClass(`.RespContainer div:nth-child(odd)`, {
                    "background-color": "#f5f4f4",
                }), new WCssClass(`.RespContainer label`, {
                    width: "100%",
                    padding: 10,
                }), new WCssClass(`.RespContainer input`, {
                    "min-width": 80,
                    padding: 10,
                }),
            ]
        },
        ]
    };
}
customElements.define('w-test', WTestView);
export { WTestView }