import { WRender } from "./WDevCore/WModules/WComponentsTools.js";
import { WCssClass } from "./WDevCore/WModules/WStyledRender.js";
import "./WDevCore/WComponents/WTableComponents.js";
const OnLoad = async () => {
    const CM = WRender.createElement({
        type: "w-cmkpi", props: {
            Indicadores: Indicadores,
            id: "MyCM"
        }
    })
    root.append(CM);
}
window.onload = OnLoad;
//INDICADORES ---------------------------------------------->
let Menu = [];
let Indicadores = [
    "Ansiedad",
    "Estrés",
    "Estado de ánimo bajo",
    "Bienestar Psicológico",
    "Satisfacción Laboral e Igualdad"
];
Indicadores.forEach(element => {
    Menu.push({
        Indicador: element,
        IndicadoresEspecificos: [
            { name: "Estado global", options: [{ id_: "Verde", Descripcion: "Sin síntomas" }, { id_: "Naranja", Descripcion: "Moderado" }] },
            { name: "Sintomatología", options: [{ id_: "Verde", Descripcion: "Sin síntomas" }, { id_: "Naranja", Descripcion: "Moderado" }] },
            { name: "Solicitud de psicólogo ", options: [{ id_: "Verde", Descripcion: "Sin síntomas" }, { id_: "Naranja", Descripcion: "Moderado" }] },
            { name: "Uso de servicios", options: [{ id_: "Verde", Descripcion: "Sin síntomas" }, { id_: "Naranja", Descripcion: "Moderado" }] },
            { name: "Absentismo laboral", options: [{ id_: "Verde", Descripcion: "Sin síntomas" }, { id_: "Naranja", Descripcion: "Moderado" }] },
            { name: "Cambio de estado", options: [{ id_: "Positiva", Descripcion: "Evolución positiva" }, { id_: "Negativa", Descripcion: "Evolución negativa" }] },
            { name: "Evolución positiva", options: [{ id_: "Verde", Descripcion: "Sin síntomas" }, { id_: "Naranja", Descripcion: "Moderado" }] },
            { name: "Evolución negativa", options: [{ id_: "Verde", Descripcion: "Sin síntomas" }, { id_: "Naranja", Descripcion: "Moderado" }] },
        ]
    })
});
class CMMaster extends HTMLElement {
    constructor() {
        super();
    }
    attributeChangedCallBack() {

    }
    connectedCallback() {
        if (this.innerHTML != "") {
            return;
        }
        this.DrawCM();
    }
    DrawCM() {
        this.append(this.DrawMenu());
        this.KPIContainer = WRender.createElement({
            type: "aside", props: { class: "panel_izquierdo_cm", id: "CMaster" + this.id }
        });
        this.append(this.KPIContainer);
    }
    DrawMenu() {
        const Menu = { type: "aside", props: { class: "panel_izquierdo_cm" }, children: [] };
        const ULMenu = { type: "ul", props: { class: "NavCm" }, children: [] };
        this.Indicadores.forEach(Indicador => {
            const li = { type: "li", children: [] };
            const label = {
                type: "label", props: { class: "Wbtn_", for: "Input" + Indicador }, children: [
                    Indicador,
                    { type: "input", props: { name: "Opcion", type: "radio", id: "Input" + Indicador } }
                ]
            };
            li.children.push(label);
            ULMenu.children.push(li);
        });
        Menu.children.push(ULMenu);
        this.Menu = WRender.createElement(Menu);
        return this.Menu;
    }
    DrawKPI() {
    }
    DrawModalFilters() {
    }
    ChargeData() {
    }
}
customElements.define("w-cmkpi", CMMaster);