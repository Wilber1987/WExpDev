import { WCssClass } from "../WDevCore/WModules/WStyledRender.js";
import "../WDevCore/WComponents/WSlide.js";
import "../WDevCore/WWComponentsPROTOS/WRichText.js";
import "../WDevCore/WWDeprecateComponents/WTableComponents.js";
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
class Modules extends ComponentsManager {
    constructor(props) {
        super();       
        this.type = "div";
        this.props = props;
        this.props.style = "padding: 10px";
        const NavigateElements = [{
            name: "Basic Table",
            action: () => {
                this.NavigateFunction("BasicTable", new BasicTable(), "ModulesDetail");
            }
        }, {
            name: "Actions Table",
            action: () => {
                this.NavigateFunction("BasicTable", new ActionsTable(), "ModulesDetail");
            }
        }, {
            name: "Dinamic Table",
            action: () => {
                this.NavigateFunction("BasicTable", new DinamicTable(), "ModulesDetail");
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
        this.children = [
            { type: "h2", props: { innerText: "Table Component" } },
            Nav, DivContainer
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
            //#region TABLA BASICA
            //DOCUMENTACION
        this.children.push({
            type: "div",
            props: {
                style: "padding: 10px",
                innerHTML: `
                <style>
                    .codeSection {padding: 10px; background: eee; font-size: 12px }
                </style>
                Para la implementacion del componente w-table se debe crear
                el elemento html w-table. <br>
                <section class="codeSection">               
                    <hr>
                    //vanilla js<br>                    
                    const Wtable = document.createElement("w-table");<br>
                    <hr>
                    //Datos JSON <br> 
                    const Data = ${JSON.stringify(Data)}<br>
                    <hr>
                    //Definicion de la configuracion de la tabla<br>  
                    Wtable.TableConfig = {
                        Datasets: Data, /*DATOS DE LA TABLA*/ 
                    }<br>
                </section>
            `
            }
        });
        //FIN DOCUMENTACION  
        var Config = {
            Datasets: Data,
            /*DATOS DE LA TABLA*/
        };
        this.children.push({
                type: "w-table",
                props: {
                    id: "table",
                    TableConfig: Config
                }
            })
            //#endregion  
            //#region TABLA BASICA CON BUSQUEDA
            //DOCUMENTACION
        this.children.push({
            type: "div",
            props: {
                style: "padding: 10px",
                innerHTML: `
                <style>
                    .codeSection {padding: 10px; background: eee; font-size: 12px }
                </style>
               Es posible implementar opciones de busqueda. <br>
                <section class="codeSection">               
                    <hr>
                    //vanilla js <br>    
                    Wtable.TableConfig = {
                        Datasets: Data,
                        Options: {
                            Search: true,
                        }  
                    };<br>
                </section>
                En caso que se desee implementar opciones de busqueda por medio de una 
                api, se debe utilizar la propiedad UrlSearch:"api_route" junto a la 
                propiedad Search dentro del TableConfig.
                <br>
                Esto permitira que al momento de hacer el filtrado, de no encontrarse el
                resultado dentro del arreglo de datos originales, realice una petición a
                la api en busca de las councidencias. 
                <section class="codeSection">               
                <hr>
                //vanilla js <br>    
                Wtable.TableConfig = {
                    Datasets: Data,
                    Options: {
                        Search: true,
                        UrlUpdate: "https://route.....",
                    }  
                };<br>
            </section>
            `
            }
        });
        //FIN DOCUMENTACION 
        this.children.push({
                type: "w-table",
                props: {
                    id: "tableSearch",
                    TableConfig: {
                        Datasets: Data,
                        /*DATOS DE LA TABLA*/
                        Options: {
                            Search: true,
                        }
                    }
                }
            })
            //#endregion       
            //#region TABLA BASICA CON BUSQUEDA SIN PAGINACION 
            //DOCUMENTACION
        this.children.push({
            type: "div",
            props: {
                style: "padding: 10px",
                innerHTML: `
                <style>
                    .codeSection {padding: 10px; background: eee; font-size: 12px }
                </style>
               En caso de no querer tener a disposición las opciones de paginación 
               es posible deshabilitarla usando el atributo paginate:false dentro de TableConfig<br>
                <section class="codeSection">               
                    <hr>
                    //vanilla js <br>    
                    Wtable.TableConfig = {
                        Datasets: Data,
                        paginate: false,
                        Options: {
                            Search: true,
                        }  
                    };<br>
                </section>
            `
            }
        });
        //FIN DOCUMENTACION 
        this.children.push({
                type: "w-table",
                props: {
                    id: "tableNoPaginate",
                    TableConfig: {
                        Datasets: Data,
                        /*DATOS DE LA TABLA*/
                        paginate: false,
                        Options: {
                            Search: true,
                        }
                    }
                }
            })
            //#endregion    
            //#region TABLA BASICA CON  EDICIÓN 
            //DOCUMENTACION
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
        //FIN DOCUMENTACION 
        this.children.push({
                type: "w-table",
                props: {
                    id: "tableNoPaginate",
                    TableConfig: {
                        Datasets: Data,
                        /*DATOS DE LA TABLA*/
                        Options: {
                            Edit: true,
                        }
                    }
                }
            })
            //#endregion    
    }
}

class SlideVideos extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        if (this.innerHTML != "") {
            return;
        }
        this.DrawStyle();
    }
    DrawStyle = async() => {
        var nextPageToken = "";
        // Resultados por pagina
        var resPorPagina = 5;
        // Paginas a mostrar
        var paginas = 1;
        var key = "AIzaSyAA3IzIXETWZ_K2p8LQssMqx-3ssWhvdoA";
        var idCanal = "UCvLhPXU--RrE_hwh9hOmQ6A";
        var Url = "https://www.googleapis.com/youtube/v3/search?key=" +
            key + "&channelId=" +
            idCanal + "&part=snippet,id&order=date&maxResults=" +
            resPorPagina;
        const ArrayVideos = [];
        //const response = await WAjaxTools.GetRequest(Url);
        const response = {
            "kind": "youtube#searchListResponse",
            "etag": "EFAG4Qk6miE5PCQJjfQwlVeUTUA",
            "nextPageToken": "CAUQAA",
            "regionCode": "NI",
            "pageInfo": { "totalResults": 69, "resultsPerPage": 5 },
            "items": [{
                "kind": "youtube#searchResult",
                "etag": "BFZh2U7iCDyEgHXOQRE3IoGWc10",
                "id": { "kind": "youtube#video", "videoId": "z2NUvTg5Hvs" },
                "snippet": {
                    "publishedAt": "2020-10-21T16:32:15Z",
                    "channelId": "UCvLhPXU--RrE_hwh9hOmQ6A",
                    "title": "APLICACIONES WEB   INTRODUCCION WEBCOMPONENTS   P15",
                    "description": "",
                    "thumbnails": {
                        "default": {
                            "url": "https://i.ytimg.com/vi/z2NUvTg5Hvs/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/z2NUvTg5Hvs/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/z2NUvTg5Hvs/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        }
                    },
                    "channelTitle": "Wilber Jose Matus Gonzalez",
                    "liveBroadcastContent": "none",
                    "publishTime": "2020-10-21T16:32:15Z"
                }
            }, { "kind": "youtube#searchResult", "etag": "iwfLqonX2K4Q4AHxRgsE6k4-V0M", "id": { "kind": "youtube#video", "videoId": "FN5R-LFER_A" }, "snippet": { "publishedAt": "2020-10-17T15:48:50Z", "channelId": "UCvLhPXU--RrE_hwh9hOmQ6A", "title": "APLICACIONES WEB - INTRODUCCION A LA POO CON JS - P14", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/FN5R-LFER_A/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/FN5R-LFER_A/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/FN5R-LFER_A/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "Wilber Jose Matus Gonzalez", "liveBroadcastContent": "none", "publishTime": "2020-10-17T15:48:50Z" } }, { "kind": "youtube#searchResult", "etag": "x96KiNPTMHtVAjL37L48XR36erQ", "id": { "kind": "youtube#video", "videoId": "0stpVI9T1XI" }, "snippet": { "publishedAt": "2020-10-16T20:56:49Z", "channelId": "UCvLhPXU--RrE_hwh9hOmQ6A", "title": "APLICACIONES WEB  - DOM DINAMICO - P13", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/0stpVI9T1XI/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/0stpVI9T1XI/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/0stpVI9T1XI/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "Wilber Jose Matus Gonzalez", "liveBroadcastContent": "none", "publishTime": "2020-10-16T20:56:49Z" } }, { "kind": "youtube#searchResult", "etag": "SeadfhrXt5g60Sdwl3RzwS5Czis", "id": { "kind": "youtube#video", "videoId": "eqcqdY9PhuM" }, "snippet": { "publishedAt": "2020-10-16T20:51:34Z", "channelId": "UCvLhPXU--RrE_hwh9hOmQ6A", "title": "APLICACIONES WEB - DOM DINAMICO- P12", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/eqcqdY9PhuM/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/eqcqdY9PhuM/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/eqcqdY9PhuM/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "Wilber Jose Matus Gonzalez", "liveBroadcastContent": "none", "publishTime": "2020-10-16T20:51:34Z" } }, { "kind": "youtube#searchResult", "etag": "fJ6o-ttTwDa3wd3Cf57ZOS9LKSY", "id": { "kind": "youtube#video", "videoId": "BfhdQd-iwqE" }, "snippet": { "publishedAt": "2020-10-16T20:44:50Z", "channelId": "UCvLhPXU--RrE_hwh9hOmQ6A", "title": "APLICACIONES WEB - ESTRUCTURAS JSON Y ARREGLOS - P11", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/BfhdQd-iwqE/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/BfhdQd-iwqE/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/BfhdQd-iwqE/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "Wilber Jose Matus Gonzalez", "liveBroadcastContent": "none", "publishTime": "2020-10-16T20:44:50Z" } }]
        }
        for (var k in response.items) {
            var tituloVideo = response.items[k]["snippet"].title;
            var imagen = response.items[k]["snippet"].thumbnails.high.url;
            var options = "?rel=0&showinfo=0&autohide=1";
            var urlVideo = "https://www.youtube.com/embed/" + response.items[k]["id"].videoId + options;
            var fechaVideo = response.items[k]["snippet"].publishedAt;
            ArrayVideos.push({
                title: tituloVideo,
                description: response.items[k]["snippet"].description,
                url: urlVideo,
                image: imagen,
            })
        }
        this.append(WRender.createElement({
            type: "w-slide",
            props: {
                slideType: "videos",
                content: ArrayVideos
            }
        }))
    }
}
customElements.define("w-slidev", SlideVideos);
class Slide {
    constructor() {
        this.type = "div";
        this.children = [];
        this.children.push({
            type: 'h2',
            props: {
                id: "",
                class: "",
                innerText: "Slide......"
            },
        })
        this.children.push({
            type: "w-slide",
            props: {
                content: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet perferendis 
                    fugiat accusamus placeat autem aliquam sed eligendi eum pariatur, numquam
                    non similique est quas fuga repellendus iste maxime architecto cumque.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet perferendis 
                    fugiat accusamus placeat autem aliquam sed eligendi eum pariatur, numquam
                    non similique est quas fuga repellendus iste maxime architecto cumque.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet perferendis 
                    fugiat accusamus placeat autem aliquam sed eligendi eum pariatur, numquam
                    non similique est quas fuga repellendus iste maxime architecto cumque.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet perferendis 
                    fugiat accusamus placeat autem aliquam sed eligendi eum pariatur, numquam
                    non similique est quas fuga repellendus iste maxime architecto cumque.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet perferendis 
                    fugiat accusamus placeat autem aliquam sed eligendi eum pariatur, numquam
                    non similique est quas fuga repellendus iste maxime architecto cumque.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet perferendis 
                    fugiat accusamus placeat autem aliquam sed eligendi eum pariatur, numquam
                    non similique est quas fuga repellendus iste maxime architecto cumque.Lorem,
                    ipsum dolor sit amet consectetur adipisicing elit. Amet perferendis 
                    fugiat accusamus placeat autem aliquam sed eligendi eum pariatur, numquam
                    non similique est quas fuga repellendus iste maxime architecto cumque.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet perferendis 
                    fugiat accusamus placeat autem aliquam sed eligendi eum pariatur, numquam
                    non similique est quas fuga repellendus iste maxime architecto cumque.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet perferendis 
                    fugiat accusamus placeat autem aliquam sed eligendi eum pariatur, numquam
                    non similique est quas fuga repellendus iste maxime architecto cumque.
                    `
            }
        })
    }
}
class RichText {
    constructor() {
        this.type = "div";
        this.children = [];
        this.children.push({
            type: 'h2',
            props: {
                id: "",
                class: "",
                innerText: "RithText......"
            },
        })
        this.children.push({
            type: "w-rich-text",
            props: {
                id: "txtRitch"
            }
        })
    }
}
class TableCont {
    constructor() {
        this.type = "div";
        this.children = [];
        let TableList = [];
        TableList.push({ id_: 1, content: "des", cant: 3, AttNameG1: "g1", AttNameG2: "g2", fecha: "2020-01-01" });
        TableList.push({ id_: 1, content: "des", cant: 3, AttNameG1: "g1", AttNameG2: "g1", fecha: "2020-01-01" });
        TableList.push({ id_: 1, content: "des", cant: 3, AttNameG1: "g2", AttNameG2: "g2", fecha: "2020-01-01" });
        TableList.push({ id_: 1, content: "des", cant: 3, AttNameG1: "g2", AttNameG2: "g2", fecha: "2020-01-01" });
        TableList.push({ id_: 1, content: "des", cant: 3, AttNameG1: "g1", AttNameG2: "g1", fecha: "2020-01-01" });
        //TABLE CONFIG
        var result = {
            "datos": [{
                    "cantidad": 21,
                    "estado": "Naranja",
                    "time": "julio 2012",
                    "categ2": "Moderado",
                    "categ": "Ekisde",
                },
                {
                    "cantidad": 2,
                    "estado": "Naranja",
                    "time": "julio 2019",
                    "categ2": "Severo",
                    "categ": "Nic"
                },
                {
                    "cantidad": 14,
                    "estado": "Fresa",
                    "time": "julio 2019",
                    "categ2": "Severo",
                    "categ": "Galaxia"
                },
                {
                    "cantidad": 17,
                    "estado": "Fresa",
                    "time": "julio 2019",
                    "categ2": "Moderado",
                    "categ": "Nic2"
                },
                {
                    "cantidad": 36,
                    "estado": "Naranja",
                    "time": "julio 2012",
                    "categ2": "Moderado",
                    "categ": "Galaxia"
                },
                {
                    "cantidad": 19,
                    "estado": "Naranja",
                    "time": "julio 2019",
                    "categ2": "Moderado",
                    "categ": "Nic2"
                },
                {
                    "cantidad": 13,
                    "estado": "Fresa",
                    "time": "julio 2019",
                    "categ2": "Moderado",
                    "categ": "Canal2"
                },
                {
                    "cantidad": 16,
                    "estado": "Verde",
                    "time": "julio 2019",
                    "categ2": "Moderado",
                    "categ": "Galaxia"
                },
                {
                    "cantidad": 16,
                    "estado": "Fresa",
                    "time": "julio 2019",
                    "categ2": "Moderado",
                    "categ": "Nic3"
                },
                {
                    "cantidad": 15,
                    "estado": "Naranja",
                    "time": "julio 2019",
                    "categ2": "Moderado",
                    "categ": "Canal2"
                },
                {
                    "cantidad": 31,
                    "estado": "Fresa",
                    "time": "julio 2019",
                    "categ2": "Moderado",
                    "categ": "La Castellana"
                }
            ],
        };
        var ConfigCards = {
            Datasets: result.datos,
            /*DATOS DE LA TABLA*/
            paginate: false,
            Options: {
                Search: true,
                Show: true,
                Edit: true, //UrlUpdate: "",
                Select: true,
                // Add: true,
                Delete: true,
                UserActions: [{
                    name: "Reservar",
                    Function: (Param) => {
                        alert("reserva");
                        console.log(Param)
                    }
                }]
            },
            StyleType: "Cards"
        };
        /*
        this.children.push({
            type: 'h2',
            props: { innerText: "Table CardStyles........" },
        })
        this.children.push({
            type: "w-table",
            props: {
                id: "tableConfigCards",
                TableConfig: ConfigCards
            }
        })*/
        this.children.push({
            type: 'h2',
            props: { innerText: "Table DINAMIC MULTIOPTIONS........." },
        })
        var Config = {
            Datasets: result.datos,
            /*DATOS DE LA TABLA*/
            Colors: ["#ff6699", "#ffbb99", "#adebad"],
            /*COLORES DEFINIDOS PARA EL GRAFICO(SI NO SE DEFINE SE SELECCIONAN DE FORMA DINAMICA)*/
            /*PARAMETROS DE EVALUACION SOLO SI NO ES DINAMICA Y SE QUIEREN DATOS AGRUPADOS)*/
            //AttNameEval: "estado",
            //AttNameG1: "time",
            //AttNameG2: "categ2",
            //AttNameG3: "categ",            
            //EvalValue: "cantidad",
            /*MAXIMO DE AGRUPACIONES ESTATICAS 3 CON UN VALOR EVALUADO*/
            Dinamic: true,
            /*DEFINE LA TABLA DINAMICA*/
            AddChart: true,
            /*DEFINE UN GRAFICO DE BARRAS ESTAQUEADO si hay grupos  o es dinamica*/
            //paginate: false,
            Options: {
                Search: true, //UrlSearch
                Show: true,
                Edit: true, //UrlUpdate: "",
                Select: true,
                Add: true, //UrlAdd
                Delete: true,// UrlDelete
                /* UserActions: [{name: "Reservar", Function: (Param)=>{
                     alert("reserva");
                     console.log(Param)
                 }}]*/
            },
        };
        this.children.push({
                type: "w-table",
                props: {
                    id: "table",
                    TableConfig: Config
                }
            })
            /*
            this.children.push({
                type: 'h2',
                props: { innerText: "Table MDETAIL........." },
            })       
            var Config2 = {
                MasterDetailTable: true,
                AddItemsFromApi: {
                    Active: true,
                    ApiUrl: "http://localhost:3020/wexpdev/MYPROYECT/Api/CatForm2.php/?function=GetPrueba",
                    Function: async (Param)=>{//ESTA FUNCION DEBE SER ASYNCRONA
                        // SINO SE DEFINE UNA FUNCION DE RETORNO SE
                        //  EJECUTA UNA FUNCION POST QUE RECIBE UN
                        //  PARAMETRO LLAMADPO "Param" Y SE ENVIA UNA
                        //  PETICION POST 
                        console.log("function async");
                        const ApiUrl = "http://localhost:3020/wexpdev/MYPROYECT/Api/CatForm2.php/?function=Get";
                        const Dataset = await WAjaxTools.PostRequest(
                            ApiUrl,
                            { tablename: "usuarios", Param: Param }
                        );
                        return Dataset.data;
                    }
                },
                ModelObject: {
                    id_: 1,
                    content: "des",
                    cant: 3,
                    AttNameG1: "g1",
                    CATEG: ["value1", "value2"],
                    CATEG2: [{ id: "1", desc: "val1" }, { id: "2", desc: "val2" }],
                    fecha: "2020-01-01"
                },

            }
            this.children.push({
                type: "w-table",
                props: {
                    id: "table2",
                    TableConfig: Config2
                }
            })*/

    }
}
export { Modules }