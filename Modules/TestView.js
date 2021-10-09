import { WRender, WArrayF, ComponentsManager, WAjaxTools } from '../WDevCore/WModules/WComponentsTools.js';
import { WCssClass } from '../WDevCore/WModules/WStyledRender.js';
const DOMManager = new ComponentsManager();
class WTestConfig {
    Title = "Title";
    Descripcion = "descripcion....";
    Questions = [{ Id: 1, Descripcion: "desc 1", Value: null, Resps: ["SI", "NO", "N/A"] }];
}
class WTestView extends HTMLElement {
    constructor(Config = (new WTestConfig())) {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.Config = Config;
        this.MainTestContainer = WRender.createElement({
            type: "div", props: { class: "MainTestContainer" }
        });
        this.MainTestContainer.append(WRender.CreateStringNode(`<h3>${this.Config.Title}</h3>`));
        this.MainTestContainer.append(WRender.CreateStringNode(`<p>${this.Config.Descripcion}</p>`));
        this.MainTestContainer.append(this.DrawTest(this.Config.Questions));
        this.shadowRoot.append(this.MainTestContainer);
    }
    connectedCallback() {
        this.DrawComponent();
    }
    DrawComponent = () => { }
    DrawTest = (Questions) => {
        const ContainerQuestions = WRender.createElement({
            type: "div", props: { class: "ContainerQuestions" }
        });
        Questions.forEach(element => {
            const RespContainer = WRender.createElement({ type: "div", props: { class: "RespContainer" } });
            element.Resps.forEach(Resp => {
                RespContainer.append(WRender.createElement([
                    { type: 'label', props: { innerText: Resp, htmlFor: "Control" + element.Id + Resp } },
                    {
                        type: 'input', props: {
                            type: 'radio', id: "Control" + element.Id + Resp, name: "Resp" + element.Id,
                            value: Resp, onchange: (ev)=>{
                                element.Value = ev.target.value;
                            }
                        }
                    }
                ]))
            });
            const QuestionControl = WRender.createElement({
                type: "div", props: { class: "QuestionControl" }, children: [
                    element.Descripcion, RespContainer
                ]
            });
            ContainerQuestions.append(QuestionControl);
        });
        return ContainerQuestions;
    }
}
customElements.define('w-test', WTestView);
export { WTestView }