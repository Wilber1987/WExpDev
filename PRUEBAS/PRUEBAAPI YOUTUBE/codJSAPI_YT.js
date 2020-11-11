var nextPageToken = "";
// Resultados por pagina
var resPorPagina = 5;
// Paginas a mostrar
var paginas = 1;
var key = "AIzaSyAA3IzIXETWZ_K2p8LQssMqx-3ssWhvdoA";
var idCanal = "UCvLhPXU--RrE_hwh9hOmQ6A";
var Url = "https://www.googleapis.com/youtube/v3/search?key=" + key + "&channelId=" + idCanal + "&part=snippet,id&order=date&maxResults=" + resPorPagina;
const loadVids = async () => {
    try {
        let response = await fetch(Url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        response = await response.json();
        console.log(typeof response.items)
        //------------------------------------------------------
        let vids = document.createElement("w-slidervids");
        vids.items = response.items;
        videoContainer.append(vids);
        //return response;
        
    } catch (error) {
        if (error == "TypeError: Failed to fetch") {
            //return this.LocalData(Url);
        }
    }
}

//import { WRender } from "..//WComponentsTools.js";
class WSliderVids extends HTMLElement {
    constructor() {
        super();
    }
    attributeChangedCallBack() {
        this.DrawStyle();
    }
    connectedCallback() {
        if (this.innerHTML != "") {
            return;
        }
        this.DrawStyle();
    }
    DrawStyle() {
        for (var k in this.items) {
            var tituloVideo=this.items[k]["snippet"].title;
            var urlVideo= "https://www.youtube.com/embed/" + this.items[k]["id"].videoId;
            var fechaVideo=this.items[k]["snippet"].publishedAt;
            let embed = document.createElement("embed");
            embed.src = urlVideo;
            this.append(embed);            
        }       
    }   
}
customElements.define("w-slidervids", WSliderVids);
loadVids()
