class Article extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.DrawComponent();
    }
    DrawComponent() {       
        this.className = "Article";
        let ArtTitle = document.createElement("h2");
        ArtTitle.innerText = this.article.titulo;
        let ArtLink = document.createElement("a");
        ArtLink.innerText = "Leer...";
        ArtLink.href = "#";
        ArtLink.onclick = ()=>{
            //alert(this.article.contenido);
            this.querySelector(".ArtContenido").style.display = "block";
        }
        let AutorName = document.createElement("label");
        AutorName.innerText = `${this.Autor.Nombres}(${this.Autor.Pais})`;
        //contenido
        let ArtContenido = this.DrawViewComponent();
        
        this.append(ArtTitle, AutorName, ArtLink, ArtContenido);
    }
    DrawViewComponent(){        
        let ArtContenido = document.createElement("div");
        let Title = document.createElement("h1");
        Title.innerText = this.article.titulo;
        let ClouseBtn = document.createElement("a");
        ClouseBtn.href = "#";
        ClouseBtn.innerText = "X";
        ClouseBtn.onclick = ()=>{
            this.querySelector(".ArtContenido").style.display = "none";
        }

        ArtContenido.append(ClouseBtn,Title, this.article.contenido);
        ArtContenido.className = "ArtContenido";

        return ArtContenido;
    }
}
customElements.define("article-w", Article);