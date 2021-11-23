import { WRender, WArrayF, ComponentsManager, WAjaxTools } from "../WModules/WComponentsTools.js";
import { WCssClass } from "../WModules/WStyledRender.js";
class ConfigMS {
    Dataset = ["Option1", "Option2", "Option3"];
}
class MultiSelect extends HTMLElement {
    constructor(Config = (new ConfigMS())) {
        super();
        this.Config = Config;
        this.attachShadow({ mode: 'open' });
        this.selectedItems = [];
        WRender.SetStyle(this, {
            display: "block",
            position: "relative",
        });
        this.LabelMultiselect = WRender.Create({ className: "LabelMultiselect", innerText: "MultiSelect" });
        this.OptionsContainer = WRender.Create({ className: "OptionsContainer" });
        this.shadowRoot.append(this.LabelMultiselect, this.OptionsContainer);
    }
    connectedCallback() {
        this.LabelMultiselect.innerHTML = "";
        this.OptionsContainer.innerHTML = "";
        this.Draw();
        this.DrawLabel();
    }
    Draw = () => {
        //console.log(this.Config.Dataset);
        this.Dataset = this.Config.Dataset ?? [];
        this.MultiSelect = this.Config.MultiSelect ?? true;
        this.Dataset.forEach(element => {
            //console.log(element);
            const OType = this.MultiSelect == true ? "checkbox" : "radio";
            const OptionLabel = WRender.Create({
                tagName: "label", htmlFor: "OType" + element.id_,
                innerText: element.Descripcion, className: "OptionLabel"
            });
            const Option = WRender.Create({
                tagName: "input",
                id: "OType" + element.id_,
                type: OType,
                name: "MultiSelect",
                checked: WArrayF.FindInArray(element, this.selectedItems),
                className: "Option", onchange: (ev) => {
                    this.selectedItems = OType == "checkbox" ? this.selectedItems : [];
                    const control = ev.target;
                    const index = this.selectedItems.indexOf(element);
                    if (index == -1 && control.checked == true) {
                        if (WArrayF.FindInArray(element, this.selectedItems) == false) {
                            this.selectedItems.push(element);
                        } else {
                            console.log("Item Existente")
                        }
                    } else {
                        this.selectedItems.splice(index, 1)
                    }
                    this.DrawLabel();
                }
            });
            this.OptionsContainer.append(WRender.Create([OptionLabel, Option]));
        });
    }
    DrawLabel = () => {
        this.LabelMultiselect.innerHTML = "Selecteds: "
        this.selectedItems.forEach(element => {
            this.LabelMultiselect.append(WRender.Create({
                tagName: "label",
                innerText: element.Descripcion,
                children: [ {tagName: "button", innerText: "x", onclick: ()=>{
                    const index = this.selectedItems.indexOf(element);
                    this.selectedItems.splice(index, 1);
                    this.DrawLabel();
                    this.shadowRoot.querySelector("#OType" + element.id_).checked = false;
                }}]
            }));
        });
    }
}
customElements.define("w-multi-select", MultiSelect);
export { MultiSelect }