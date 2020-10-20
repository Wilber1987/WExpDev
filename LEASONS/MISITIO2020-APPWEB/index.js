//Articles2 = [];
function loadDOM() {
    let ArticleCont = document.createElement("article-container");
    ArticleCont.Articles = Articles;
    ArticleCont.Autores = Autores;
    MainContainer.append(ArticleCont);
}
window.addEventListener("load", () => {
    loadDOM();
    console.log("ya cargue");
});