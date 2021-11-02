import { WRender, WArrayF, ComponentsManager, WAjaxTools } from '../WDevCore/WModules/WComponentsTools.js';
import { WCssClass } from '../WDevCore/WModules/WStyledRender.js';
const DOMManager = new ComponentsManager();
class WTestConfig {
    Title = "Title";
    Descripcion = "descripcion....";
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
        this.MainTestContainer = WRender.Create({ class: "MainTestContainer" });
        this.MainTestContainer.append(WRender.CreateStringNode(`<h3>${this.Config.Title}</h3>`));
        this.MainTestContainer.append(WRender.CreateStringNode(`<p>${this.Config.Descripcion}</p>`));
        this.MainTestContainer.append(this.DrawTest(this.Config.Questions));
        this.shadowRoot.append(this.MainTestContainer);
    }
    connectedCallback() {
        this.DrawComponent();
    }
    DrawComponent = () => { }
    DrawTest = (QuestionsList) => {
        const ContainerQuestions = WRender.Create({ class: "ContainerQuestions" });
        QuestionsList.forEach(Question => {
            const RespContainer = WRender.Create({ class: "RespContainer" });
            console.log(Question);
            let InputType
            switch (Question.QuestionType) {
                case "Number": case "Open":
                    console.log(Question.QuestionType);
                    InputType = Question.QuestionType == "Number" ? "number" : "text";
                    RespContainer.append(WRender.Create({
                        tagName: 'input', type: InputType, id: "Control" + Question.Id,
                        onchange: (ev) => { Question.Value = ev.target.value; }
                    }));
                    break;
                case "MultiSelect": case "Likert/Category":
                    InputType = Question.QuestionType == "MultiSelect" ? "checkbox" : "radio";
                    Question.Resps.forEach(Resp => {
                        
                        RespContainer.append(WRender.Create([
                            { tagName: 'label', innerText: Resp, htmlFor: "Control" + Question.Id + Resp },
                            {
                                tagName: 'input', type: InputType, id: "Control" + Question.Id + Resp, name: "Resp" + Question.Id,
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
                class: "QuestionControl", children: [Question.Descripcion, RespContainer]
            });
            ContainerQuestions.append(QuestionControl);
        });
        return ContainerQuestions;
    }
}
customElements.define('w-test', WTestView);
export { WTestView }