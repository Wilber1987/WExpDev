import { WRender, WArrayF } from "../WModules/WComponentsTools.js";
import { WCssClass } from "../WModules/WStyledRender.js";
import "./WTableComponents.js";
const TableId = "tableReport"

//facturas de empresa ligadas al usuario y y por sesiones de empresa
class WReportList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        if (this.shadowRoot.innerHTML != "") {
            return;
        }        
        this.DrawReport();
    }
    DrawReport = async () => {
        this.shadowRoot.innerHTML = "";
        this.shadowRoot.append(WRender.createElement(this.style));
        if (this.Dataset != undefined && this.Dataset.__proto__ == Array.prototype) {
            const codes = WArrayF.ArrayUnique(this.Dataset, this.groupParam);   
            codes.forEach(code => {
                const header = {
                    type: 'div', props: { id: '', class: "header" }, children: [
                    ]
                };
                const body = {
                    type: 'div', props: { id: '', class: "body" }, children: [
                    ]
                }; 
                if (this.header != undefined && this.header.__proto__ == Array.prototype) {                   
                    this.header.forEach(prop => {
                        header.children.push({
                            type: 'div', props: { id: '' }, children: [
                                prop.replace("_", " ") + ": ", code[prop]
                            ]
                        })
                    });
                }                
                this.Dataset.forEach(element => {
                    if (element[this.groupParam] == code[this.groupParam]) {                        
                        if (this.body != undefined && this.body.__proto__ == Array.prototype) {
                            this.body.forEach(prop => {
                                body.children.push({
                                    type: 'div', props: { id: '' }, children: [
                                        element[prop.leyend] + ": ", element[prop.value]
                                    ]
                                })
                            });
                        }
                        if (this.body == undefined && this.header == undefined) {
                            for (const prop in element) {
                                body.children.push({
                                    type: 'div', props: { id: '' }, children: [
                                        prop.replace("_", " ") + ": ", element[prop]
                                    ]
                                })
                            }                            
                        }
                    }
                });
                this.shadowRoot.append(WRender.createElement({
                    type: 'div', props: { id: '', class: "fact" }, children: [
                        header, body
                    ]
                }))
            });
        } else {
            this.shadowRoot.innerHTML = "define un array list"
        }
    }
    style = {
        type: 'w-style', props: {
            id: '', ClassList: [
                new WCssClass(`.fact`, {
                    border: 'solid 1px #999',
                    "border-radius": "0.2cm",
                    margin: "10px",
                }),new WCssClass(`.header`, {
                    display: "flex",
                    "flex-wrap": "wrap",
                    padding: "10px", 
                    "background-color": "#80bfff",
                }),new WCssClass(`.body`, {
                    display: "flex",
                    "flex-wrap": "wrap",
                    padding: "10px",
                }), new WCssClass(`.body div, .header div`, {
                    margin: "5px"
                }), 
            ], MediaQuery: [{
                condicion: '(max-width: 600px)',
                ClassList: []
            },
            ]
        }
    };
}
customElements.define("w-report-list", WReportList);
class WReportView {
    constructor(props , Config) {
        this.type = "div";
        this.props = props;
        this.props.className = "reportV"
        const ControlOptions = {
            type: 'div', props: { id: 'optionsContainter', class: "OptionContainer" }, children: [
            ]
        }
        for (const prop in Config.Dataset[0]) {            
            if ((typeof Config.Dataset[0][prop] != "number" 
            && !prop.toUpperCase().includes("FECHA") 
            && !prop.toUpperCase().includes("DATE") )
            || prop.toUpperCase().includes("AÑO") 
            || prop.toUpperCase().includes("YEAR")) {
                const select = {type:'select', props: {id: prop}, children:[
                    { type:'option', props: { innerText:'Seleccione', value: ''} }
                ]}            
                const SelectData = WArrayF.ArrayUnique(Config.Dataset, prop);
                SelectData.forEach(data => {
                    select.children.push({
                        type:'option', props: {innerText: data[prop], value: data[prop]}
                    });        
                });
                select.props.onchange = async (ev)=>{
                    let SelectFlag = false;
                    const Container =  document.getElementById(props.id);
                    Container.querySelectorAll("#optionsContainter select").forEach(select => {
                        if (select.id != ev.target.id) {
                            if (select.value != "") {
                                console.log("valor: ",select.value);
                                SelectFlag = true;
                            }
                        }
                    });
                    const table = Container.querySelector("w-table");   
                    const wreport = Container.querySelector("w-report-list");              
                    const DFilt =  Config.Dataset.filter( obj => {
                        let flagObj = true;
                        Container.querySelectorAll("#optionsContainter select").forEach(select => {  
                            if (select.value == "") {
                                return
                            }
                            if ( obj[select.id] == select.value) {
                                if (flagObj) {
                                    flagObj = true;
                                } 
                            } else {
                                flagObj = false;
                            }
                        });
                        return flagObj;
                    });  
                    console.log(DFilt);             
                    wreport.Dataset = DFilt;
                    wreport.DrawReport();
                    table.Dataset = DFilt;
                    table.DefineTable(DFilt);

                }
                ControlOptions.children.push([prop, select]);
            }
        }    
        ControlOptions.children.push([{ type:'input', 
        props: { id: '', type:'button', class: 'className', value: 'Imprimir', onclick: async ()=>{
            const ficha = document.getElementById(this.props.id);
            const WTable = document.querySelector("w-table");
            const PrintHeader = "<h1>hola</h1>";
            const WStyles = WTable.shadowRoot.querySelectorAll("w-style");
            const Table = WTable.shadowRoot.querySelector("#MainTable" + WTable.id); 
            const GeneralStyle = `<style>* {
                -webkit-print-color-adjust: exact !important;
            }</style>`;
            Table.append(WRender.CreateStringNode(GeneralStyle));    
            WStyles.forEach(style => {
                Table.append(style.cloneNode(true));
            });       
            const Chart = WTable.shadowRoot.querySelector("w-colum-chart").shadowRoot;
            Chart.append(WRender.CreateStringNode(GeneralStyle));  
            this.Export2Doc(WRender.CreateStringNode(`<div>${PrintHeader + Table.innerHTML + Chart.innerHTML}</div>` ));          
            const ventimp = window.open(' ', 'popimpr');           
            //console.log(PrintHeader + Table.innerHTML + Chart.innerHTML );
            // encoding the string
            //const result = window.btoa(PrintHeader + Table.innerHTML + Chart.innerHTML);
            //console.log(result);
            // const link = WRender.createElement({ type:'a', 
            // props: {  href:  "data:application/pdf;base64,"+ result }});
            // link.download = 'file.pdf';
            // link.dispatchEvent(new MouseEvent('click'));
            
            ventimp.document.write( PrintHeader + Table.innerHTML + Chart.innerHTML );
            ventimp.document.close();
            ventimp.print();
            ventimp.close();
           
        }}}])    
        this.children = [ControlOptions];
        var ConfigG3 = {
            Datasets: Config.Dataset,            
            Colors: ["#ff6699", "#ffbb99", "#adebad"],
            Dinamic: true,
            AddChart: true,
        };
        this.children.push({
            type: "w-table",
            props: {
                id: TableId,
                TableConfig: ConfigG3
            }
        }),
        this.children.push({
            type: 'w-report-list', props: { id: '', 
            Dataset: Config.Dataset, 
            groupParam: Config.GroupParam,
            header:Config.headerGroup, body: Config.bodyGroup 
        }})
        this.children.push(this.style);
    }
    style = { type: 'w-style', props: {id: '', ClassList: [
            new WCssClass( `.reportV`, {
                margin: '10px',
            }), new WCssClass( `.OptionContainer`, {
                display: "flex",
                "flex-wrap": "wrap",
                "margin-bottom": "10px"
            }),new WCssClass(`.OptionContainer div`, {               
                display: "grid",
                "grid-template-rows": "20px 30px",
                "grid-template-columns": "200px",
                margin: "5px",
                "font-size": "12px",
            }), new WCssClass(
                `.OptionContainer input, .OptionContainer select`, {
                    "grid-row": "2/3",
                    margin: "0px",
                    padding: "5px 10px"
                }),
        ], MediaQuery: [ {condicion: '(max-width: 600px)',
            ClassList: []},
        ]}
    };
    Export2Doc(element, filename = 'file'){
        var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
        var postHtml = "</body></html>";
        var html = preHtml+element.innerHTML+postHtml;
    
        var blob = new Blob(['ufeff', html], {
            type: 'application/msword'
        });
        
        // Specify link url
        var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
        
        // Specify file name
        filename = filename?filename+'.doc':'document.doc';
        
        // Create download link element
        var downloadLink = document.createElement("a");
    
        document.body.appendChild(downloadLink);
        
        if(navigator.msSaveOrOpenBlob ){
            navigator.msSaveOrOpenBlob(blob, filename);
        }else{
            // Create a link to the file
            downloadLink.href = url;
            
            // Setting the file name
            downloadLink.download = filename;
            
            //triggering the function
            downloadLink.click();
        }
        
        document.body.removeChild(downloadLink);
    }
}
const MasterStyle = {
    type: "w-style",
    props: {
        ClassList: [
            new WCssClass(".App", {
                display: "grid",
                "grid-template-columns": "250px calc(100% - 250px)",
                "grid-template-rows": "70px calc(100vh - 120px) 50px"
            })
        ], MediaQuery: [{
            condicion: "(max-width: 600px)",
            ClassList: [
                new WCssClass(`.App`, {
                    display: "grid",
                    "grid-template-columns": "100%",
                    "grid-template-rows": "70px auto calc(100vh - 120px) 50px"
                })
            ]
        }
        ]
    }
};

export { WReportView }
