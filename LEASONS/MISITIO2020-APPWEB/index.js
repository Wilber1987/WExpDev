//Articles2 = [];
function loadDOM() {
    let ArticleCont = document.createElement("article-container");
    ArticleCont.ArticlesListProp = ArticlesList;
    ArticleCont.AutoresListProp = AutoresList;
    MainContainer.append(ArticleCont);
    let frag = document.createDocumentFragment();
    AutoresList.forEach(autor => {
        const AutorCardElement = document.createElement("autor-card-w");
        AutorCardElement.AutorProp = autor;
        frag.append(AutorCardElement);
    });
    MyAside.append(frag);
}
window.addEventListener("load", () => {
    loadDOM();
    console.log("ya cargue");
});