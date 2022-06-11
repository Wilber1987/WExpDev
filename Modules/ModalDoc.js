import { WCssClass } from "../WDevCore/WModules/WStyledRender.js";
import { ComponentsManager, WAjaxTools, WRender } from "../WDevCore/WModules/WComponentsTools.js";
import { WModalForm } from "../WDevCore/WComponents/WModalForm.js";
//DEFINICION DE TABLAS
const MyObject = {
    id: 1,
    Category: 2,
    Type: "Type 1",
    Time: "2020-01-01",
    Value: 35
};
const ObjModel = {
    id: 1,
    Category: [{id: 1, desc: "value 1"}, {id: 2, desc: "value 2"}],
    Type: "Type 1",
    Time: "2020-01-01",
    Value: 35
};
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
        }, {
            name: "Detalles de un objeto JSON",
            action: () => {
                this.NavigateFunction("BasicModalD", new BasicModalObjectDetail(), "ModulesDetail");
            }
        },
        ];
        const Nav = {
            type: "w-app-navigator",
            props: {
                id: "TableNav",
                title: "Ventanas Modales / POP-Ups",
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
                innerHTML: `<div contenteditable="true"><p class="MsoNormal" style="font-family: Arial, Helvetica, sans-serif;">WModalForm es un componente diseñado para existir solamente mientras este se encuentre abierto, el se define al momento de conectarse al DOM y una vez cerrado el se autodestruye, Para la implementación del componente w-modal-form&nbsp;se debe importar el contenido WModalForm.js, ubicado dentro de WDevCore -&gt; WComponents o realizar la referencia de este archivo en el head de nuestro documento HTML, luego crear&nbsp; el elemento HTML w-modal-form y realizar un append dentro del DOM.<br></p><p class="MsoNormal" style="font-family: Arial, Helvetica, sans-serif;">utilizando JavaScript:&nbsp;</p><div style="color: rgb(212, 212, 212); background-color: rgb(30, 30, 30); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><span style="color: #c586c0;">     </span></div><div style="color: rgb(212, 212, 212); background-color: rgb(30, 30, 30); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><span style="color: #c586c0;">      import</span>&nbsp;<span style="color: #ce9178;">".WDevCore/WComponents/WModalForm.js"</span>;</div><div style="color: rgb(212, 212, 212); background-color: rgb(30, 30, 30); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><br></div><p class="MsoNormal" style="font-family: Arial, Helvetica, sans-serif;">o importar directamente el objeto WModalForm</p><div style="color: rgb(212, 212, 212); background-color: rgb(30, 30, 30); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><span style="color: #c586c0;"><br></span></div><div style="color: rgb(212, 212, 212); background-color: rgb(30, 30, 30); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><span style="color: #c586c0;">import</span> { <span style="color: #9cdcfe;">WModalForm</span> } <span style="color: #c586c0;">from</span> <span style="color: #ce9178;">"../WDevCore/WComponents/WModalForm.js"</span>;</div><div style="color: rgb(212, 212, 212); background-color: rgb(30, 30, 30); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><br></div><p class="MsoNormal" style="font-family: Arial, Helvetica, sans-serif;">En el caso de usar referencia por medio de HTML utilizar la propiedad src de la etiqueta script, con type="module":</p><div style="color: rgb(212, 212, 212); background-color: rgb(30, 30, 30); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><div>&nbsp;&nbsp;&nbsp;</div><div>    &nbsp;<span style="color: #808080;">&lt;</span><span style="color: #569cd6;">script</span>&nbsp;<span style="color: #9cdcfe;">src</span>=<span style="color: #ce9178;">"./WDevCore/WComponents/WModalForm.js"</span>&nbsp;<span style="color: #9cdcfe;">type</span>=<span style="color: #ce9178;">"module"</span><span style="color: #808080;">&gt;&lt;/</span><span style="color: #569cd6;">script</span><span style="color: #808080;">&gt;</span></div><div><span style="color: #808080;"><br></span></div><div></div></div><p class="MsoNormal" style="font-family: Arial, Helvetica, sans-serif;">Para su definición por medio de JavaScript:&nbsp;</p><div style="color: rgb(212, 212, 212); background-color: rgb(30, 30, 30); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><div>&nbsp;&nbsp;&nbsp;&nbsp;</div><div><span style="color: #569cd6;">    const</span>&nbsp;<span style="color: #4fc1ff;">Modal</span>&nbsp;=&nbsp;<span style="color: #9cdcfe;">document</span>.<span style="color: #dcdcaa;">createElement</span>(<span style="color: #ce9178;">"w-modal-form"</span>);</div><div>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #4fc1ff;">Modal</span>.<span style="color: #9cdcfe;">ObjectModal</span>&nbsp;=&nbsp;<span style="color: #ce9178;">"Mensaje..."</span></div><div>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">document</span>.<span style="color: #dcdcaa;">querySelector</span>(<span style="color: #ce9178;">"body"</span>).<span style="color: #dcdcaa;">append</span>(<span style="color: #4fc1ff;">Modal</span>);</div><div><br></div></div><p class="MsoNormal" style="font-family: Arial, Helvetica, sans-serif;">Tambien es posible utilizar su definión de clase(Recomendado):</p><div style="color: rgb(212, 212, 212); background-color: rgb(30, 30, 30); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><div></div><div>&nbsp; &nbsp; &nbsp; &nbsp;</div><div> <span style="color: #9cdcfe;">document</span>.<span style="color: #dcdcaa;">querySelector</span>(<span style="color: #ce9178;">"body"</span>).<span style="color: #dcdcaa;">append</span>(<span style="color: #569cd6;">new</span> <span style="color: #4ec9b0;">WModalForm</span>({ <span style="color: #9cdcfe;">ObjectModal</span><span style="color: #9cdcfe;">:</span> <span style="color: #ce9178;">"Mensaje..."</span> }));</div><div><br></div></div><p class="MsoNormal" style="font-family: Arial, Helvetica, sans-serif;">Utilizando WRender:</p><div style="color: rgb(212, 212, 212); background-color: rgb(30, 30, 30); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><br><div>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">document</span>.<span style="color: #dcdcaa;">querySelector</span>(<span style="color: #ce9178;">"body"</span>).<span style="color: #dcdcaa;">append</span>(</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #4ec9b0;">WRender</span>.<span style="color: #dcdcaa;">createElement</span>({&nbsp;<span style="color: rgb(156, 220, 254);">type</span><span style="color: rgb(156, 220, 254);">:</span>&nbsp;<span style="color: rgb(206, 145, 120);">"w-modal-form"</span>,&nbsp;<span style="color: rgb(156, 220, 254);">props</span><span style="color: rgb(156, 220, 254);">:</span>&nbsp;{&nbsp;<span style="color: rgb(156, 220, 254);">ObjectModal</span><span style="color: rgb(156, 220, 254);">:</span>&nbsp;<span style="color: rgb(206, 145, 120);">"Mensaje..."</span>}&nbsp;})</div><div>&nbsp;&nbsp;&nbsp;&nbsp;);</div><br></div><p class="MsoNormal" style="font-family: Arial, Helvetica, sans-serif;"><br></p><p class="MsoNormal"><o:p></o:p></p><p class="MsoNormal"><o:p></o:p></p></div>`
            }
        });
        this.children.push({
            type: "div", props: { style: "display: flex;justify-content: center;" },
            children: [{
                type: "input", props: {
                    type: "button", value: "Test", class: "Btn", onclick: (ev) => {
                        ev.target.parentNode.append(new WModalForm({ ObjectModal: "Mensaje..." }));
                    }
                }
            }]
        });
        
    }
}
class BasicModalObjectDetail {
    constructor() {
        this.type = "div";
        this.children = [];
        this.children.push({
            type: "div",
            props: {
                style: "padding: 10px",
                innerHTML: `
                <div contenteditable="true"><p class="MsoNormal" style="font-family: Arial, Helvetica, sans-serif;">Es posible visualizar el detalle de un objeto JSON, crearlo o editarlo utilizando WModalForm</p><p class="MsoNormal" style="font-family: Arial, Helvetica, sans-serif;">Visualizar objeto utilizando JavaScript:&nbsp;</p><div style="color: rgb(212, 212, 212); background-color: rgb(30, 30, 30); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><div><span style="color: #569cd6;">    </span></div><div><span style="color: #569cd6;">    const</span>&nbsp;<span style="color: #4fc1ff;">MyObject</span>&nbsp;=&nbsp;{</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">id</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #b5cea8;">1</span>,</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">Category</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"Category&nbsp;3"</span>,</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">Type</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"Type&nbsp;1"</span>,</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">Time</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"2020-01-01"</span>,</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">Value</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #b5cea8;">35</span></div><div>&nbsp;&nbsp;&nbsp;&nbsp;};</div><div>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">document</span>.<span style="color: #dcdcaa;">querySelector</span>(<span style="color: #ce9178;">"body"</span>).<span style="color: #dcdcaa;">append</span>(</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #4ec9b0;">WRender</span>.<span style="color: #dcdcaa;">createElement</span>({</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">type</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"w-modal-form"</span>,</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">props</span><span style="color: #9cdcfe;">:</span>&nbsp;{</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">ObjectDetail</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: rgb(79, 193, 255);">MyObject</span></div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})</div><div>&nbsp;&nbsp;&nbsp;&nbsp;);</div><div><br></div></div><p class="MsoNormal" style="font-family: Arial, Helvetica, sans-serif;">Editar objeto utilizando JavaScript:</p><div style="color: rgb(212, 212, 212); background-color: rgb(30, 30, 30); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><div>&nbsp;&nbsp;&nbsp;&nbsp;</div><div><span style="color: #9cdcfe;">    document</span>.<span style="color: #dcdcaa;">querySelector</span>(<span style="color: #ce9178;">"body"</span>).<span style="color: #dcdcaa;">append</span>(</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #4ec9b0;">WRender</span>.<span style="color: #dcdcaa;">createElement</span>({</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">type</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"w-modal-form"</span>,</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">props</span><span style="color: #9cdcfe;">:</span>&nbsp;{</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">EditObject</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #4fc1ff;">MyObject</span></div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})</div><div>&nbsp;&nbsp;&nbsp;&nbsp;);</div><div><br></div></div><p class="MsoNormal" style="font-family: Arial, Helvetica, sans-serif;">así mismo es posible enviar los datos directamente a un server utilizando una petición FETCH:</p><div style="color: rgb(212, 212, 212); background-color: rgb(30, 30, 30); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><div><span style="color: #9cdcfe;"><br></span></div><div><span style="color: #9cdcfe;">   document</span>.<span style="color: #dcdcaa;">querySelector</span>(<span style="color: #ce9178;">"body"</span>).<span style="color: #dcdcaa;">append</span>(</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #4ec9b0;">WRender</span>.<span style="color: #dcdcaa;">createElement</span>({</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">type</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"w-modal-form"</span>,</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">props</span><span style="color: #9cdcfe;">:</span>&nbsp;{</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">EditObject</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #4fc1ff;">MyObject</span>,</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">ObjectOptions</span><span style="color: #9cdcfe;">:</span>&nbsp;{</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">Url</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"url...."</span>,</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})</div><div>&nbsp;&nbsp;&nbsp;&nbsp;);</div><div><br></div></div><p class="MsoNormal" style="font-family: Arial, Helvetica, sans-serif;">También es posible enviar realizar tareas con ese objeto por medio de una función especificada por el usuario.&nbsp;</p><div style="color: rgb(212, 212, 212); background-color: rgb(30, 30, 30); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><div><span style="color: #9cdcfe;"><br></span></div><div><span style="color: #9cdcfe;">    document</span>.<span style="color: #dcdcaa;">querySelector</span>(<span style="color: #ce9178;">"body"</span>).<span style="color: #dcdcaa;">append</span>(</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #4ec9b0;">WRender</span>.<span style="color: #dcdcaa;">createElement</span>({</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">type</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"w-modal-form"</span>,</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">props</span><span style="color: #9cdcfe;">:</span>&nbsp;{</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">EditObject</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #4fc1ff;">MyObject</span>,</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">ObjectOptions</span><span style="color: #9cdcfe;">:</span>&nbsp;{</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #dcdcaa;">SaveFunction</span><span style="color: #9cdcfe;">:</span>&nbsp;(<span style="color: #9cdcfe;">obj</span>)&nbsp;<span style="color: #569cd6;">=&gt;</span>&nbsp;{</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">console</span>.<span style="color: #dcdcaa;">log</span>(<span style="color: #9cdcfe;">obj</span>);&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})</div><div>&nbsp;&nbsp;&nbsp;&nbsp;);</div><div><br></div></div><p class="MsoNormal" style="font-family: Arial, Helvetica, sans-serif;">Crear objeto utilizando JavaScript:&nbsp;<br></p><div style="color: rgb(212, 212, 212); background-color: rgb(30, 30, 30); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><div>&nbsp;&nbsp;&nbsp;&nbsp;</div><div><span style="color: #9cdcfe;">    document</span>.<span style="color: #dcdcaa;">querySelector</span>(<span style="color: #ce9178;">"body"</span>).<span style="color: #dcdcaa;">append</span>(</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #4ec9b0;">WRender</span>.<span style="color: #dcdcaa;">createElement</span>({</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">type</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"w-modal-form"</span>,</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">props</span><span style="color: #9cdcfe;">:</span>&nbsp;{</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">ModelObject</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: rgb(79, 193, 255);">MyObject</span>,&nbsp;</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">ObjectOptions</span><span style="color: #9cdcfe;">:</span>&nbsp;{</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">AddObject</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #569cd6;">true</span>,</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #dcdcaa;">SaveFunction</span><span style="color: #9cdcfe;">:</span>&nbsp;(<span style="color: #9cdcfe;">obj</span>)&nbsp;<span style="color: #569cd6;">=&gt;</span>&nbsp;{</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">console</span>.<span style="color: #dcdcaa;">log</span>(<span style="color: #9cdcfe;">obj</span>);</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})</div><div>&nbsp;&nbsp;&nbsp;&nbsp;);</div><br></div><p class="MsoNormal" style="font-family: Arial, Helvetica, sans-serif;">Es posible realizar cualquier tarea con el objeto dentro del SaveFunction, incluso enviarlo a un server por medio de una petición.&nbsp;&nbsp;</p><p class="MsoNormal"><o:p></o:p></p><p class="MsoNormal"><o:p></o:p></p></div>
                `
            }
        });        
        this.children.push({
            type: "div", props: { style: "display: flex;justify-content: center;" },
            children: [{
                type: "input", props: {
                    type: "button", value: "Detail", class: "Btn", onclick: (ev) => {
                        ev.target.parentNode.append(new WModalForm( {                                
                            ObjectDetail: MyObject
                        }));
                    }
                }
            },{
                type: "input", props: {
                    type: "button", value: "Add", class: "Btn", onclick: (ev) => {
                        ev.target.parentNode.append(new WModalForm({
                            ModelObject: MyObject, 
                            ObjectOptions: {
                                AddObject: true,
                                SaveFunction: (AddObject) => {
                                   console.log(AddObject);
                                }
                            }
                        }));
                    }
                }
            },{
                type: "input", props: {
                    type: "button", value: "Edit", class: "Btn", onclick: (ev) => {
                        ev.target.parentNode.append(new WModalForm({
                            EditObject: MyObject
                        }));
                    }
                }
            }]
        });

        this.children.push({
            type: "div",
            props: {
                style: "padding: 10px",
                innerHTML: `<h3>Object Model</h3>
                <div contenteditable="true"><p class="MsoNormal" style="font-family: Arial, Helvetica, sans-serif;">En algunas ocasiones es posible que se desee editar o crear objetos utilizando listas desplegables para algunos atributos del objeto por lo que se debe hacer uso del ModelObject tanto para la edición como creación de objetos.&nbsp;</p><div style="color: rgb(212, 212, 212); background-color: rgb(30, 30, 30); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><div><span style="color: #569cd6;"><br></span></div><div><span style="color: #569cd6;">  const</span>&nbsp;<span style="color: #4fc1ff;">ObjModel</span>&nbsp;=&nbsp;{</div><div>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">id</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #b5cea8;">1</span>,</div><div>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">Category</span><span style="color: #9cdcfe;">:</span>&nbsp;[{<span style="color: #9cdcfe;">id</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #b5cea8;">1</span>,&nbsp;<span style="color: #9cdcfe;">desc</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"value&nbsp;1"</span>},&nbsp;{<span style="color: #9cdcfe;">id</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #b5cea8;">2</span>,&nbsp;<span style="color: #9cdcfe;">desc</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"value&nbsp;2"</span>}],</div><div>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">Type</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"Type&nbsp;1"</span>,</div><div>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">Time</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"2020-01-01"</span>,</div><div>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">Value</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #b5cea8;">35</span></div><div>   };</div><div><br></div></div><p class="MsoNormal" style="font-family: Arial, Helvetica, sans-serif;">Dentro de la configuración del modal de edición, se debe utilizar de la siguiente manera:</p><div style="color: rgb(212, 212, 212); background-color: rgb(30, 30, 30); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><div><span style="color: #9cdcfe;">  </span></div><div><span style="color: #9cdcfe;">    document</span>.<span style="color: #dcdcaa;">querySelector</span>(<span style="color: #ce9178;">"body"</span>).<span style="color: #dcdcaa;">append</span>(</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #4ec9b0;">WRender</span>.<span style="color: #dcdcaa;">createElement</span>({</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">type</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"w-modal-form"</span>,</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">props</span><span style="color: #9cdcfe;">:</span>&nbsp;{</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">EditObject</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #4fc1ff;">MyObject</span>,</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">ModelObject</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #4fc1ff;">ObjModel</span>,</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">ObjectOptions</span><span style="color: #9cdcfe;">:</span>&nbsp;{</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #dcdcaa;">SaveFunction</span><span style="color: #9cdcfe;">:</span>&nbsp;(<span style="color: #9cdcfe;">obj</span>)&nbsp;<span style="color: #569cd6;">=&gt;</span>&nbsp;{</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">console</span>.<span style="color: #dcdcaa;">log</span>(<span style="color: #9cdcfe;">obj</span>);&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})</div><div>&nbsp;&nbsp;&nbsp;&nbsp;);</div><div><br></div></div><p class="MsoNormal" style="font-family: Arial, Helvetica, sans-serif;">En el caso de la creación de nuevos objetos, se realiza de la misma forma como se plasmo anteriormente, sin embargo se debe utilizar un modelo adecuado.&nbsp;</p><div style="color: rgb(212, 212, 212); background-color: rgb(30, 30, 30); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><div><span style="color: #9cdcfe;"><br></span></div><div><span style="color: #9cdcfe;">    document</span>.<span style="color: #dcdcaa;">querySelector</span>(<span style="color: #ce9178;">"body"</span>).<span style="color: #dcdcaa;">append</span>(</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #4ec9b0;">WRender</span>.<span style="color: #dcdcaa;">createElement</span>({</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">type</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"w-modal-form"</span>,</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">props</span><span style="color: #9cdcfe;">:</span>&nbsp;{</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">ModelObject</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: rgb(79, 193, 255);">ObjModel</span>,&nbsp;</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">ObjectOptions</span><span style="color: #9cdcfe;">:</span>&nbsp;{</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">AddObject</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #569cd6;">true</span>,</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #dcdcaa;">SaveFunction</span><span style="color: #9cdcfe;">:</span>&nbsp;(<span style="color: #9cdcfe;">NewObject</span>)&nbsp;<span style="color: #569cd6;">=&gt;</span>&nbsp;{</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">console</span>.<span style="color: #dcdcaa;">log</span>(<span style="color: rgb(156, 220, 254);">NewObject</span>);</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})</div><div>&nbsp;&nbsp;&nbsp;&nbsp;);</div><div><br></div></div><p class="MsoNormal"><o:p></o:p></p><p class="MsoNormal"><o:p></o:p></p></div>
                `
            }
        });        
        this.children.push({
            type: "div", props: { style: "display: flex;justify-content: center;" },
            children: [{
                type: "input", props: {
                    type: "button", value: "Add", class: "Btn", onclick: (ev) => {
                        ev.target.parentNode.append(new WModalForm({
                            ModelObject: new Tbl_InvestigatorProfile(), 
                            ObjectOptions: {
                                AddObject: true,
                                SaveFunction: (AddObject) => {
                                   console.log(AddObject);
                                }
                            }
                        }));
                    }
                }
            },{
                type: "input", props: {
                    type: "button", value: "Edit", class: "Btn", onclick: (ev) => {
                        ev.target.parentNode.append(new WModalForm({
                            EditObject: MyObject,
                            ModelObject: ObjModel,
                            ObjectOptions: {
                                SaveFunction: (obj) => {
                                    console.log(obj);                        
                                }
                            }
                        }));
                    }
                }
            }]
        });
    }
}
export { ModalDocs }
class Tbl_InvestigatorProfile {
	constructor(props) {
		for (const prop in props) {
			this[prop] = props[prop];
		}
	}
	Id_Investigador = { type: "number", primary: true };
	Nombres = { type: "text" };
	Apellidos = { type: "text" };
	FechaNac = { type: "date" };
	IdUser = { type: "number" };
	Sexo = { type: "text" };
	Foto = { type: "text" };
	DNI = { type: "text" };
	Correo_institucional = { type: "text" };
	Id_Pais_Origen = { type: "number" };
	Id_Institucion = { type: "number" };
	Indice_H = { type: "text" };
	Estado = { type: "Select", Dataset: ["Activo", "Inactivo"] };
}