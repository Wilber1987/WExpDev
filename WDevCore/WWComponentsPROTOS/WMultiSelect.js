import { WRender, WArrayF, ComponentsManager, WAjaxTools } from "../WModules/WComponentsTools.js";
import { WCssClass } from "../WModules/WStyledRender.js";
class ConfigMS {
    Dataset = [ "Option1", "Option2" , "Option3" ];
}
class MultiSelect extends HTMLElement{
    constructor(Config = (new ConfigMS())){
        super();
        this.Config = Config;
        this.attachShadow({ mode: 'open' });
        this.SelectedItems = [];       
        WRender.SetStyle(this, {
            display: "block"
        });
        this.LabelMultiselect = WRender.Create({ className: "LabelMultiselect"});
        this.OptionsContainer = WRender.Create({ className: "OptionsContainer"});
         
    }
    attributeChangedCallBack() {
        this.Draw();
    }
    connectedCallback() {
        if (this.shadowRoot.innerHTML != "") {            
            return;
        }        
        this.Draw();
    }   
    Draw = ()=>{
        this.Dataset = this.Config.Datase ?? []; 
        this.MultiSelect = this.Config.MultiSelect ?? true; 
        this.Dataset.forEach(element  => {
            const OType = this.Config.MultiSelect == true ? "checkbox": "radio";
            const Option = WRender.Create({ tagName: OType, className: "LabelMultiselect"});
        });
    }
}
customElements.define("w-multi-select", MultiSelect);
export { MultiSelect }