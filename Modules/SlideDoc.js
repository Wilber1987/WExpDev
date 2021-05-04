import { WCssClass } from "../WDevCore/WModules/WStyledRender.js";
import "../WDevCore/WComponents/WSlide.js";
import "../WDevCore/WComponents/WAppNavigator.js";
import { ComponentsManager, WAjaxTools, WRender } from "../WDevCore/WModules/WComponentsTools.js";
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
                content: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet perferendis fugiat accusamus placeat autem aliquam sed eligendi eum pariatur, numquam non similique est quas fuga repellendus iste maxime architecto cumque. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet perferendis  fugiat accusamus placeat autem aliquam sed eligendi eum pariatur, numquam non similique est quas fuga repellendus iste maxime architecto cumque. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet perferendis  fugiat accusamus placeat autem aliquam sed eligendi eum pariatur, numquam non similique est quas fuga repellendus iste maxime architecto cumque. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet perferendis  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet perferendis fugiat accusamus placeat autem aliquam sed eligendi eum pariatur, numquam non similique est quas fuga repellendus iste maxime architecto cumque. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet perferendis fugiat accusamus placeat autem aliquam sed eligendi eum pariatur, numquam  non similique est quas fuga repellendus iste maxime architecto cumque.Lorem
                `
            }
        })
    }
}

class SlideDoc extends ComponentsManager {
    constructor(props) {
        super();
        this.type = "div";
        this.props = props;
        this.props.class = "DocCont";
        this.props.style = "padding: 10px";
        const NavigateElements = [{
            name: "Implementación",
            action: () => {
                this.NavigateFunction("SlideVideos", new SlideVideos(), "ModulesDetail");
            }
        }, {
            name: "Paginación",
            action: () => {
                this.NavigateFunction("Slide", new Slide(), "ModulesDetail");
            }
        }];
        const Nav = {
            type: "w-app-navigator",            
            props: {
                id: "TableNav",
                title: "Tabla Básica",
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
export {SlideDoc}