//Articles2 = [];
function loadDOM() {  
    //console.log("ejecutando loadDOM")
    let Frag = document.createDocumentFragment();
    //console.table(Articles);
    Articles.forEach(article =>{
        let ElementArticle = document.createElement("article");
        ElementArticle.className = "Article";
        let ArtTitle = document.createElement("h2");
        ArtTitle.innerText =  article.titulo;
        let ArtLink = document.createElement("a");
        ArtLink.innerText = "Leer...";
        ArtLink.href = "#";
        //datos del autor
        let Autor = Autores.find(a => a.IdAutor == article.autor);
        let AutorName = document.createElement("label");
        AutorName.innerText = `${Autor.Nombres}(${Autor.Pais})`;

        ElementArticle.append(ArtTitle,AutorName, ArtLink);
        Frag.append(ElementArticle);
    });
    
    MainContainer.append(Frag);
}
window.addEventListener("load", ()=>{
    loadDOM();
    console.log("ya cargue");
});