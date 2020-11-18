class ArticleContainer extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        if (this.innerHTML == "") {
            this.OptionsArticles();
            this.FillContainer();
        }
    }
    OptionsArticles() {
        let Div = document.createElement("div");
        //TXT DE BUSQUEDA 
        let inputText = document.createElement("input");
        inputText.type = "text";
        inputText.id = "InputSearch" + this.id;
        inputText.className = "txtSearch";
        inputText.placeholder = "Buscar...";
        inputText.onchange = () => {
            const txt = this.querySelector("#InputSearch" + this.id);
            const ArticlesF = this.Articles.filter(
                A => A.titulo.includes(txt.value)
                    || A.contenido.includes(txt.value)
                    || A.autor == txt.value
            );
            this.removeChild(this.querySelector("#Container" + this.id));
            this.FillContainer(ArticlesF);
        }
        //BOTON DE NUEVO
        let inputBTN = document.createElement("input");
        inputBTN.type = "button";
        inputBTN.id = "InputNuevo" + this.id;
        inputBTN.className = "BTN";
        inputBTN.value = "Nuevo..."
        inputBTN.onclick = () => {
            this.querySelector(".ViewNewArt").style.display = "block";
        }
        Div.style.display = "flex";
        Div.append(inputText, inputBTN);
        this.append(Div);
        this.append(this.ViewNewArticle());
    }
    ViewNewArticle() {
        let View = document.createElement("div");
        let Title = document.createElement("h1");
        Title.innerText = "NUEVO ARTICULO";
        let ClouseBtn = document.createElement("a");
        ClouseBtn.href = "#";
        ClouseBtn.innerText = "X";
        ClouseBtn.onclick = () => {
            this.querySelector(".ViewNewArt").style.display = "none";
        }
        //formulario
        let inputTitulo = document.createElement("input");
        inputTitulo.type = "text";
        let Contenido = document.createElement("textarea");
        let inputFecha = document.createElement("input");
        inputFecha.type = "date";
        let select = document.createElement("select");
        this.AutoresListProp.forEach(element => {
            let option = document.createElement("option");
            option.value = element.IdAutor;
            option.innerText = element.Nombres + " - " + element.Pais;
            select.append(option)
        });
        //botion de guardar
        let inputBTN = document.createElement("input");
        inputBTN.type = "button";
        inputBTN.id = "InputGuardar" + this.id;
        inputBTN.className = "BTN";
        inputBTN.value = "Guardar"
        inputBTN.onclick = () => {
            this.ArticlesListProp.push({
                titulo: inputTitulo.value,
                contenido: Contenido.value,
                fecha: inputFecha.value,
                autor: select.value
            });
            this.removeChild(this.querySelector("#Container" + this.id));
            this.FillContainer();
            this.querySelector(".ViewNewArt").style.display = "none";
            inputTitulo.value = "";
            Contenido.value = "";
        }
        //fin formulario
        View.append(ClouseBtn,
            Title,
            inputTitulo,
            Contenido,
            inputFecha,
            select,
            inputBTN);

        View.className = "ViewNewArt";
        //this.append(View)
        return View;
    }
    FillContainer(ListArticles = this.ArticlesListProp) {
        let Frag = document.createElement("div");
        Frag.id = "Container" + this.id;
        ListArticles.forEach(ar => {
            //console.log(ar)
            const AutorFiltrado = this.AutoresListProp.find(a => a.IdAutor == ar.autor);
            let ArticleElement = document.createElement("article-w");
            ArticleElement.Autor = AutorFiltrado;
            ArticleElement.article = ar;
            Frag.append(ArticleElement);
        });
        this.append(Frag);
    }
}
customElements.define("article-container", ArticleContainer);