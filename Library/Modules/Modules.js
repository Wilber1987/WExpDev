import { WCssClass } from "../WDevCore/WModules/WStyledRender.js";
import "../WDevCore/WComponents/WSlide.js";
import "../WDevCore/WComponents/WRichText.js";
import "../WDevCore/WComponents/WTableComponents.js";
import { WAjaxTools, WRender } from "../WDevCore/WModules/WComponentsTools.js";

class Modules {
    constructor(props) {
        this.type = "div";
        this.props = props;
        this.props.style = "padding: 10px";
        this.children = [
            //{ type: "w-slidev" },
            new TableCont(),
            //  Ritch     
            new RichText(),
            //  SLIDE           
            //new Slide(),
            {
                type: 'h2',
                props: {
                    id: "",
                    class: ""
                },
                children: ["Noticias"]
            },
            {
                type: 'section',
                props: {
                    id: "",
                    class: ""
                },
                children: this.DisplayForos(this.props.Foros)
            },
        ]
    }
    DisplayForos = (Foros) => {
        let ForosElements = [];
        Foros.forEach(foro => {
            //console.log(foro)
            ForosElements.push({
                type: "article",
                props: {
                    class: "Articles"
                },
                children: [{
                    type: "label",
                    props: {
                        innerText: foro.title
                    }
                },
                //{type: "label", props: {innerText: foro.date}},
                {
                    type: "a",
                    props: {
                        innerText: "ver...",
                        href: "#"
                    }
                }
                ]
            })
        });
        ForosElements.push(this.Styles());
        return ForosElements;
    }
    Styles = () => {
        const Style = {
            type: "w-style",
            props: {
                ClassList: [
                    new WCssClass(`#${this.props.id} .Articles`, {
                        display: "flex",
                        border: "1px solid #808080",
                        "border-radius": "0.2cm",
                        "align-items": "center",
                        padding: "15px",
                        margin: "5px"
                    }),
                    new WCssClass(`#${this.props.id} .Articles label`, {
                        width: "100%",
                    })
                ]
            }
        }
        return Style;
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
    DrawStyle = async () => {
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
                "kind": "youtube#searchResult", "etag": "BFZh2U7iCDyEgHXOQRE3IoGWc10",
                "id": { "kind": "youtube#video", "videoId": "z2NUvTg5Hvs" }, "snippet":
                {
                    "publishedAt": "2020-10-21T16:32:15Z",
                    "channelId": "UCvLhPXU--RrE_hwh9hOmQ6A",
                    "title": "APLICACIONES WEB   INTRODUCCION WEBCOMPONENTS   P15",
                    "description": "",
                    "thumbnails": {
                        "default":
                        {
                            "url": "https://i.ytimg.com/vi/z2NUvTg5Hvs/default.jpg",
                            "width": 120, "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/z2NUvTg5Hvs/mqdefault.jpg",
                            "width": 320, "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/z2NUvTg5Hvs/hqdefault.jpg",
                            "width": 480, "height": 360
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
        var Config = {
            Datasets: result.datos, /*DATOS DE LA TABLA*/
            Colors: ["#ff6699", "#ffbb99", "#adebad"],/*COLORES DEFINIDOS PARA EL GRAFICO(SI NO SE DEFINE SE SELECCIONAN DE FORMA DINAMICA)*/
            /*PARAMETROS DE EVALUACION SOLO SI NO ES DINAMICA Y SE QUIEREN DATOS AGRUPADOS)*/
            //AttNameEval: "estado",
            //AttNameG1: "time",
            //AttNameG2: "categ2",
            //AttNameG3: "categ",            
            //EvalValue: "cantidad",
            /*MAXIMO DE AGRUPACIONES ESTATICAS 3 CON UN VALOR EVALUADO*/
            Dinamic: true,/*DEFINE LA TABLA DINAMICA*/
            AddChart: true,/*DEFINE UN GRAFICO DE BARRAS ESTAQUEADO si hay grupos  o es dinamica*/
            //paginate: false,
            Options: {
                Search: true,
                Show: true,
                Edit: true, //UrlUpdate: "",
                Select: true,
                Add: true,
            },
        };
        this.children.push({
            type: 'h2',
            props: { innerText: "Table........." },
        })
        this.children.push({
            type: "w-table",
            props: {
                id: "table",
                TableConfig: Config
            }
        })
        var Config2 = {
            MasterDetailTable: true,
            AddItemsFromApi: {
                Active: true,
                ApiUrl: "http://localhost:8080/wexpdev/MYPROYECT/Api/CatForm2.php/?function=Get",
                Function: async (Param)=>{//ESTA FUNCION DEBE SER ASYNCRONA
                    /*SINO SE DEFINE UNA FUNCION DE RETORNO SE
                     EJECUTA UNA FUNCION POST QUE RECIBE UN
                     PARAMETRO LLAMADPO "Param" Y SE ENVIA UNA
                     PETICION POST */
                    console.log("function async");
                    const ApiUrl = "http://localhost:8080/wexpdev/MYPROYECT/Api/CatForm2.php/?function=Get";
                    const Dataset = await WAjaxTools.PostRequest(
                        ApiUrl,
                        { tablename: "cat_areas", Param: Param }
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
        })

    }
}
export { Modules }