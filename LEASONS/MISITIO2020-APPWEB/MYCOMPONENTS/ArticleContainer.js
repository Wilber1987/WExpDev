class ArticleContainer extends HTMLElement{
    constructor(){
        super();
    }
    connectedCallback(){    
        this.FillContainer();
    }
    FillContainer(){        
        let Frag = document.createDocumentFragment();     
        this.Articles.forEach(article =>{
            let Autor = this.Autores.find(a => a.IdAutor == article.autor);
            let ArticleElement = document.createElement("article-w");
            ArticleElement.Autor = Autor;
            ArticleElement.article = article;
            Frag.append(ArticleElement);
        });
        this.append(Frag);  
    }
}
customElements.define("article-container", ArticleContainer);