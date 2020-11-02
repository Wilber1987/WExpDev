//Articles2 = [];
function loadDOM() {
    let ArticleCont = document.createElement("article-container");
    ArticleCont.Articles = Articles;
   // ArticleCont.Pepito = Articles;
    ArticleCont.Autores = Maria;
    MainContainer.append(ArticleCont);
}
window.addEventListener("load", () => {
    loadDOM();
    console.log("ya cargue");
});