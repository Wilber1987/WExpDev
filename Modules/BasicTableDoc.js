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
class BasicTableDoc extends ComponentsManager {
    constructor(props) {
        super();
        this.type = "div";
        this.props = props;
        this.props.class = "DocCont";
        this.props.style = "padding: 10px";
        const NavigateElements = [{
            name: "Basic Table",
            action: () => {
                this.NavigateFunction("BasicTable", new BasicTable(), "ModulesDetail");
            }
        }, {
            name: "Paginación",
            action: () => {
                this.NavigateFunction("paginate", new BasicTablePaginate(), "ModulesDetail");
            }
        },{
            name: "Busqueda y filtrado",
            action: () => {
                this.NavigateFunction("BasicTableS", new BasicTableSearch(), "ModulesDetail");
            }
        }, {
            name: "Detalles de elementos",
            action: () => {
                this.NavigateFunction("BasicTableD", new BasicTableDetail(), "ModulesDetail");
            }
        },
        {
            name: "Edición de elementos",
            action: () => {
                this.NavigateFunction("BasicTableE", new BasicTableEdit(), "ModulesDetail");
            }
        }, {
            name: "Eliminación de elementos",
            action: () => {
                this.NavigateFunction("BasicTableD", new BasicTableDelete(), "ModulesDetail");
            }
        }, {
            name: "Opciones de Customizadas",
            action: () => {
                this.NavigateFunction("BasicTableA", new BasicTableUserA(), "ModulesDetail");
            }
        }];
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
            { type: "h2", props: { innerText: "Tabla Básica" } },
            Nav,
            DivContainer,
            Style
        ]
    }
}
class BasicTable {
    constructor() {
        this.type = "div";
        this.children = [];
        this.children.push({
            type: 'h3',
            props: { innerText: "Basic Table" },
        })
        this.children.push({
            type: "div",
            props: {
                style: "padding: 10px",
                innerHTML:`
                    <div contenteditable="true" style="min-height: 400px;"><p class="MsoNormal" style="font-family: Arial, Helvetica, sans-serif;">Partiendo de una estructura de datos JSON crearemos una tabla utilizando w-table.<o:p></o:p></p><div style="color: rgb(212, 212, 212); background-color: rgb(30, 30, 30); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><div><div style="line-height: 19px;"><br><div>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #569cd6;">const</span>&nbsp;<span style="color: #4fc1ff;">Data</span>&nbsp;=&nbsp;[</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<span style="color: #9cdcfe;">id</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #b5cea8;">1</span>,&nbsp;<span style="color: #9cdcfe;">Category</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"Category&nbsp;3"</span>,&nbsp;<span style="color: #9cdcfe;">Type</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"Type&nbsp;1"</span>,&nbsp;<span style="color: #9cdcfe;">Time</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"2020-01-01"</span>,&nbsp;<span style="color: #9cdcfe;">Value</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #b5cea8;">35</span>&nbsp;},</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<span style="color: #9cdcfe;">id</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #b5cea8;">2</span>,&nbsp;<span style="color: #9cdcfe;">Category</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"Category&nbsp;1"</span>,&nbsp;<span style="color: #9cdcfe;">Type</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"Type&nbsp;2"</span>,&nbsp;<span style="color: #9cdcfe;">Time</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"2020-03-01"</span>,&nbsp;<span style="color: #9cdcfe;">Value</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #b5cea8;">200</span>&nbsp;},</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<span style="color: #9cdcfe;">id</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #b5cea8;">3</span>,&nbsp;<span style="color: #9cdcfe;">Category</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"Category&nbsp;2"</span>,&nbsp;<span style="color: #9cdcfe;">Type</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"Type&nbsp;2"</span>,&nbsp;<span style="color: #9cdcfe;">Time</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"2020-02-01"</span>,&nbsp;<span style="color: #9cdcfe;">Value</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #b5cea8;">50</span>&nbsp;},</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<span style="color: #9cdcfe;">id</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #b5cea8;">4</span>,&nbsp;<span style="color: #9cdcfe;">Category</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"Category&nbsp;1"</span>,&nbsp;<span style="color: #9cdcfe;">Type</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"Type&nbsp;3"</span>,&nbsp;<span style="color: #9cdcfe;">Time</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"2020-01-01"</span>,&nbsp;<span style="color: #9cdcfe;">Value</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #b5cea8;">105</span>&nbsp;},</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<span style="color: #9cdcfe;">id</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #b5cea8;">5</span>,&nbsp;<span style="color: #9cdcfe;">Category</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"Category&nbsp;1"</span>,&nbsp;<span style="color: #9cdcfe;">Type</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"Type&nbsp;3"</span>,&nbsp;<span style="color: #9cdcfe;">Time</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"2020-01-01"</span>,&nbsp;<span style="color: #9cdcfe;">Value</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #b5cea8;">39</span>&nbsp;},</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<span style="color: #9cdcfe;">id</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #b5cea8;">6</span>,&nbsp;<span style="color: #9cdcfe;">Category</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"Category&nbsp;2"</span>,&nbsp;<span style="color: #9cdcfe;">Type</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"Type&nbsp;4"</span>,&nbsp;<span style="color: #9cdcfe;">Time</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"2020-02-01"</span>,&nbsp;<span style="color: #9cdcfe;">Value</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #b5cea8;">180</span>&nbsp;},</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<span style="color: #9cdcfe;">id</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #b5cea8;">7</span>,&nbsp;<span style="color: #9cdcfe;">Category</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"Category&nbsp;1"</span>,&nbsp;<span style="color: #9cdcfe;">Type</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"Type&nbsp;4"</span>,&nbsp;<span style="color: #9cdcfe;">Time</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"2020-01-01"</span>,&nbsp;<span style="color: #9cdcfe;">Value</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #b5cea8;">100</span>&nbsp;},</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<span style="color: #9cdcfe;">id</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #b5cea8;">8</span>,&nbsp;<span style="color: #9cdcfe;">Category</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"Category&nbsp;2"</span>,&nbsp;<span style="color: #9cdcfe;">Type</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"Type&nbsp;1"</span>,&nbsp;<span style="color: #9cdcfe;">Time</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"2020-02-01"</span>,&nbsp;<span style="color: #9cdcfe;">Value</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #b5cea8;">70</span>&nbsp;},</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<span style="color: #9cdcfe;">id</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #b5cea8;">9</span>,&nbsp;<span style="color: #9cdcfe;">Category</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"Category&nbsp;1"</span>,&nbsp;<span style="color: #9cdcfe;">Type</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"Type&nbsp;1"</span>,&nbsp;<span style="color: #9cdcfe;">Time</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"2020-01-01"</span>,&nbsp;<span style="color: #9cdcfe;">Value</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #b5cea8;">35</span>&nbsp;},</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<span style="color: #9cdcfe;">id</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #b5cea8;">10</span>,&nbsp;<span style="color: #9cdcfe;">Category</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"Category&nbsp;3"</span>,&nbsp;<span style="color: #9cdcfe;">Type</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"Type&nbsp;5"</span>,&nbsp;<span style="color: #9cdcfe;">Time</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"2020-03-01"</span>,&nbsp;<span style="color: #9cdcfe;">Value</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #b5cea8;">98</span>&nbsp;},</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<span style="color: #9cdcfe;">id</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #b5cea8;">11</span>,&nbsp;<span style="color: #9cdcfe;">Category</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"Category&nbsp;1"</span>,&nbsp;<span style="color: #9cdcfe;">Type</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"Type&nbsp;3"</span>,&nbsp;<span style="color: #9cdcfe;">Time</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"2020-02-01"</span>,&nbsp;<span style="color: #9cdcfe;">Value</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #b5cea8;">40</span>&nbsp;},</div><div>&nbsp;&nbsp;&nbsp;&nbsp;];</div><br></div></div></div><p class="MsoNormal" style="font-family: Arial, Helvetica, sans-serif;">Para la implementación del componente w-table se debe crear el elemento HTML w-table.</p><div style="color: rgb(212, 212, 212); background-color: rgb(30, 30, 30); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><span style="color: #569cd6;"><br></span></div><div style="color: rgb(212, 212, 212); background-color: rgb(30, 30, 30); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><span style="color: #569cd6;">    const</span>&nbsp;<span style="color: #4fc1ff;">Wtable</span>&nbsp;=&nbsp;<span style="color: #9cdcfe;">document</span>.<span style="color: #dcdcaa;">createElement</span>(<span style="color: #ce9178;">"w-table"</span>);</div><div style="color: rgb(212, 212, 212); background-color: rgb(30, 30, 30); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><br></div><p class="MsoNormal" style="font-family: Arial, Helvetica, sans-serif;"><o:p></o:p></p><p class="MsoNormal" style="font-family: Arial, Helvetica, sans-serif;"><o:p>&nbsp;</o:p>y asignarle a la propiedad TableConfig como un objeto estructurado que posee el atributo Datasets a la cual le asignamos como valor la variable Data.</p><div style="color: rgb(212, 212, 212); background-color: rgb(30, 30, 30); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><div><span style="color: #4fc1ff;">   </span></div><div><span style="color: #4fc1ff;">   Wtable</span>.<span style="color: #9cdcfe;">TableConfig</span>&nbsp;=&nbsp;{</div><div>&nbsp;&nbsp;&nbsp;  &nbsp;<span style="color: #9cdcfe;">Datasets</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #4fc1ff;">Data</span>,</div><div>   }</div><div><br></div></div><p class="MsoNormal" style="font-family: Arial, Helvetica, sans-serif;"><o:p></o:p></p><p class="MsoNormal" style="font-family: Arial, Helvetica, sans-serif;"><o:p>&nbsp;</o:p>También se puede utilizar la función créate element del WRender, la cual quedaría así:</p><div style="color: rgb(212, 212, 212); background-color: rgb(30, 30, 30); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><br><div>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #569cd6;">const</span>&nbsp;<span style="color: #4fc1ff;">Wtable</span>&nbsp;=&nbsp;<span style="color: #4ec9b0;">WRender</span>.<span style="color: #dcdcaa;">createElement</span>({</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">type</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"w-table"</span>,&nbsp;<span style="color: #9cdcfe;">props</span><span style="color: #9cdcfe;">:</span>&nbsp;{&nbsp;<span style="color: #9cdcfe;">id</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"table"</span>,&nbsp;<span style="color: #9cdcfe;">TableConfig</span><span style="color: #9cdcfe;">:</span>&nbsp;{&nbsp;<span style="color: #9cdcfe;">Datasets</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #4fc1ff;">Data</span>&nbsp;}&nbsp;}</div><div>&nbsp;&nbsp;&nbsp;&nbsp;});</div><br></div><p class="MsoNormal" style="font-family: Arial, Helvetica, sans-serif;"><br></p><p class="MsoNormal" style="font-family: Arial, Helvetica, sans-serif;"><br></p><p class="MsoNormal"><o:p></o:p></p><p class="MsoNormal"><o:p></o:p></p></div>
                `
            }
        }
        );
        var Config = {
            Datasets: Data,
        };
        this.children.push({
            type: "w-table",
            props: {
                id: "table",
                TableConfig: Config
            }
        })
    }
}
class BasicTablePaginate {
    constructor() {
        this.type = "div";
        this.children = []; 
        this.children.push({
            type: "div",
            props: {
                style: "padding: 10px",
                innerHTML: `
                <div contenteditable="true" style="min-height: 400px;"><p class="MsoNormal" style="font-family: Arial, Helvetica, sans-serif;">En caso de no querer tener a disposición las opciones de paginación es posible deshabilitarla usando el atributo paginate:false dentro de TableConfig</p><div style="color: rgb(212, 212, 212); background-color: rgb(30, 30, 30); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><br><div>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #4fc1ff;">Wtable</span>.<span style="color: #9cdcfe;">TableConfig</span>&nbsp;=&nbsp;{&nbsp;<span style="color: #9cdcfe;">Datasets</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #4fc1ff;">Data</span>,&nbsp;<span style="color: #9cdcfe;">paginate</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #569cd6;">false</span>};</div><br></div><p class="MsoNormal"><o:p></o:p></p><p class="MsoNormal"><o:p></o:p></p></div>
                `
            }
        });
        this.children.push({
            type: "w-table",
            props: {
                id: "tableNoPaginate",
                TableConfig: {
                    Datasets: Data,
                    paginate: false,
                    Options: {
                        Search: true,
                    }
                }
            }
        })
    }
}
class BasicTableSearch {
    constructor() {
        this.type = "div";
        this.children = [];
        this.children.push({
            type: 'h3',
            props: { innerText: "Tabla con opciones de busqueda" },
        })
        this.children.push({
            type: "div",
            props: {
                style: "padding: 10px",
                innerHTML: `
                    <div contenteditable="true" style="min-height: 400px;"><p class="MsoNormal" style="font-family: Arial, Helvetica, sans-serif;"><font face="Calibri, sans-serif"><span style="font-size: 11pt;">Es posible implementar opciones de&nbsp;</span><span style="font-size: 14.6667px;">búsqueda</span><span style="font-size: 11pt;">.&nbsp;</span></font></p><div style="color: rgb(212, 212, 212); background-color: rgb(30, 30, 30); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><br><div>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #4fc1ff;">Wtable</span>.<span style="color: #9cdcfe;">TableConfig</span>&nbsp;=&nbsp;{</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">Datasets</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #4fc1ff;">Data</span>,</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">Options</span><span style="color: #9cdcfe;">:</span>&nbsp;{</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">Search</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #569cd6;">true</span>,</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</div><div>&nbsp;&nbsp;&nbsp;&nbsp;}</div><br><br></div><p class="MsoNormal" style="font-family: Arial, Helvetica, sans-serif;">En caso que se desee implementar opciones de búsqueda por medio de una api, se debe utilizar la propiedad UrlSearch:"api_route" junto a la propiedad Search dentro del TableConfig -&gt;Options, esto permitirá que al momento de hacer el filtrado, de no encontrarse el resultado dentro del arreglo de datos originales, realice una petición a la api en busca de las coincidencias.<br></p><div style="color: rgb(212, 212, 212); background-color: rgb(30, 30, 30); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><br><div><span style="color: #4fc1ff;">Wtable</span>.<span style="color: #9cdcfe;">TableConfig</span>&nbsp;=&nbsp;{</div><div>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">Datasets</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #4fc1ff;">Data</span>,</div><div>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">Options</span><span style="color: #9cdcfe;">:</span>&nbsp;{</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">Search</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #569cd6;">true</span>,</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">UrlUpdate</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"https://route....."</span>,</div><div>&nbsp;&nbsp;&nbsp;&nbsp;}</div><div>};</div><br></div><p class="MsoNormal"><o:p></o:p></p><p class="MsoNormal"><o:p></o:p></p></div>
                `
            }
        });
        this.children.push({
            type: "w-table",
            props: {
                id: "tableSearch",
                TableConfig: {
                    Datasets: Data,
                    Options: {
                        Search: true,
                    }
                }
            }
        })      

    }
}
class BasicTableEdit {
    constructor() {
        this.type = "div";
        this.children = [];
        this.children.push({
            type: 'h3',
            props: { innerText: "Tabla con opciones de edición" },
        })
        this.children.push({
            type: "div",
            props: {
                style: "padding: 10px",
                innerHTML: `
                    <div contenteditable="true" style="min-height: 400px;"><p class="MsoNormal" style="font-family: Arial, Helvetica, sans-serif;">Para habilitar las opciones de edición de registro usar la propiedad Edit=true dentro de TableConfig-&gt;Options.&nbsp;</p><div style="color: rgb(212, 212, 212); background-color: rgb(30, 30, 30); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><span style="color: #4fc1ff;"><br></span></div><div style="color: rgb(212, 212, 212); background-color: rgb(30, 30, 30); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><span style="color: #4fc1ff;">    Wtable</span>.<span style="color: #9cdcfe;">TableConfig</span>&nbsp;=&nbsp;{&nbsp;<span style="color: #9cdcfe;">Datasets</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #4fc1ff;">Data</span>,&nbsp;<span style="color: #9cdcfe;">Options</span><span style="color: #9cdcfe;">:</span>&nbsp;{&nbsp;<span style="color: #9cdcfe;">Edit</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #569cd6;">true</span>,&nbsp;}&nbsp;};</div><div style="color: rgb(212, 212, 212); background-color: rgb(30, 30, 30); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><br></div><p class="MsoNormal" style="font-family: Arial, Helvetica, sans-serif;">Para habilitar la actualización por medio de una Api usar la propiedad UrlUpdate junto a la propiedad Edit=true</p><div style="color: rgb(212, 212, 212); background-color: rgb(30, 30, 30); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><br><div><span style="color: #4fc1ff;">Wtable</span>.<span style="color: #9cdcfe;">TableConfig</span>&nbsp;=&nbsp;{</div><div>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">Datasets</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #4fc1ff;">Data</span>,&nbsp;<span style="color: #9cdcfe;">Options</span><span style="color: #9cdcfe;">:</span>&nbsp;{</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">Edit</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #569cd6;">true</span>,&nbsp;<span style="color: #9cdcfe;">UrlUpdate</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"https//url....."</span></div><div>&nbsp;&nbsp;&nbsp;&nbsp;}</div><div>};</div><br></div><p class="MsoNormal"><o:p></o:p></p><p class="MsoNormal"><o:p></o:p></p></div>
                `
            }
        });
        this.children.push({
            type: "w-table",
            props: {
                id: "tableNoPaginate",
                TableConfig: {
                    Datasets: Data,
                    Options: {
                        Edit: true,
                    }
                }
            }
        })
    }
}
class BasicTableDelete {
    constructor() {
        this.type = "div";
        this.children = [];
        this.children.push({
            type: 'h3',
            props: { innerText: "Tabla con opciones de eliminación" },
        })
        this.children.push({
            type: "div",
            props: {
                style: "padding: 10px",
                innerHTML: `
                    <div contenteditable="true" style="min-height: 400px;"><p class="MsoNormal" style="font-family: Arial, Helvetica, sans-serif;">Para habilitar las opciones de eliminación de registro usar la propiedad Delete=true dentro de TableConfig-&gt;Options.&nbsp;</p><div style="color: rgb(212, 212, 212); background-color: rgb(30, 30, 30); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><span style="color: #4fc1ff;"><br></span></div><div style="color: rgb(212, 212, 212); background-color: rgb(30, 30, 30); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><span style="color: #4fc1ff;">    Wtable</span>.<span style="color: #9cdcfe;">TableConfig</span>&nbsp;=&nbsp;{&nbsp;<span style="color: #9cdcfe;">Datasets</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #4fc1ff;">Data</span>,&nbsp;<span style="color: #9cdcfe;">Options</span><span style="color: #9cdcfe;">:</span>&nbsp;{&nbsp;<span style="color: #9cdcfe;">Delete</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #569cd6;">true</span>,&nbsp;}&nbsp;};</div><div style="color: rgb(212, 212, 212); background-color: rgb(30, 30, 30); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><br></div><p class="MsoNormal" style="font-family: Arial, Helvetica, sans-serif;">Para habilitar la eliminar por medio de una Api usar la propiedad UrlDelete junto a la propiedad Delete=true</p><div style="color: rgb(212, 212, 212); background-color: rgb(30, 30, 30); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><div><div style="line-height: 19px;"><br><div>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #4fc1ff;">Wtable</span>.<span style="color: #9cdcfe;">TableConfig</span>&nbsp;=&nbsp;{</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">Datasets</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #4fc1ff;">Data</span>,&nbsp;<span style="color: #9cdcfe;">Options</span><span style="color: #9cdcfe;">:</span>&nbsp;{</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #9cdcfe;">Delete</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #569cd6;">true</span>,&nbsp;<span style="color: #9cdcfe;">UrlDelete</span><span style="color: #9cdcfe;">:</span>&nbsp;<span style="color: #ce9178;">"https//url....."</span></div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</div><div>&nbsp;&nbsp;&nbsp;&nbsp;};</div></div></div><br></div><p class="MsoNormal"><o:p></o:p></p><p class="MsoNormal"><o:p></o:p></p></div>
                `
            }
        });
        this.children.push({
            type: "w-table",
            props: {
                id: "tableNoPaginate",
                TableConfig: {
                    Datasets: Data,
                    Options: {
                        Delete: true,
                    }
                }
            }
        })
    }
}
class BasicTableDetail {
    constructor() {
        this.type = "div";
        this.children = [];
        this.children.push({
            type: 'h3',
            props: { innerText: "Tabla con visualizacion de detalles" },
        })
        this.children.push({
            type: "div",
            props: {
                style: "padding: 10px",
                innerHTML: `
                        <style>
                            .codeSection {padding: 10px; background: eee; font-size: 12px }
                        </style>
                       Para habilitar las opciones de edición de registro usar la
                         propiedad Edit=true dentro de TableConfig<br>
                        <section class="codeSection">               
                            <hr>
                            //vanilla js <br>    
                            Wtable.TableConfig = {
                                Datasets: Data,
                                Options: {
                                    Edit: true,
                                }  
                            };<br>
                        </section>
                        Para habilitar la actualización por medio de una Api usar la propiedad 
                        UrlUpdate junto a la propiedad Edit=true<br>
                        <section class="codeSection">               
                            <hr>
                            //vanilla js <br>    
                            Wtable.TableConfig = {
                                Datasets: Data,
                                Options: {
                                    Edit: true,
                                    UrlUpdate: "https//url....."
                                }  
                            };<br>
                        </section>
                    `
            }
        });
        this.children.push({
            type: "w-table",
            props: {
                id: "tableNoPaginate",
                TableConfig: {
                    Datasets: Data,
                    Options: {
                        Show: true,
                    }
                }
            }
        })
    }
}
class BasicTableUserA {
    constructor() {
        this.type = "div";
        this.children = [];
        this.children.push({
            type: 'h3',
            props: { innerText: "Tabla con opciones customizadas" },
        })
        this.children.push({
            type: "div",
            props: {
                style: "padding: 10px",
                innerHTML: `
                        <style>
                            .codeSection {padding: 10px; background: eee; font-size: 12px }
                        </style>
                       Para habilitar las opciones de edición de registro usar la
                         propiedad Edit=true dentro de TableConfig<br>
                        <section class="codeSection">               
                            <hr>
                            //vanilla js <br>    
                            Wtable.TableConfig = {
                                Datasets: Data,
                                Options: {
                                    Edit: true,
                                }  
                            };<br>
                        </section>
                        Para habilitar la actualización por medio de una Api usar la propiedad 
                        UrlUpdate junto a la propiedad Edit=true<br>
                        <section class="codeSection">               
                            <hr>
                            //vanilla js <br>    
                            Wtable.TableConfig = {
                                Datasets: Data,
                                Options: {
                                    Edit: true,
                                    UrlUpdate: "https//url....."
                                }  
                            };<br>
                        </section>
                    `
            }
        });
        this.children.push({
            type: "w-table",
            props: {
                id: "tableNoPaginate",
                TableConfig: {
                    Datasets: Data,
                    Options: {
                        UserActions: [{
                            name: "Reservar",
                            Function: (Param) => {
                                alert("reserva");
                                console.log(Param)
                            }
                        }]
                    }
                }
            }
        })
    }
}

export { BasicTableDoc }