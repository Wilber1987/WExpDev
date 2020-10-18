import { WRender } from "../WModules/WComponentsTools.js";
import { WCssClass } from "../WModules/WStyledRender.js";
class WSlide extends HTMLElement {
    constructor() {
        super();
        console.log(this)
        this.slideIndex = 1;
    }
    attributeChangedCallBack() {
        this.DrawSlide();
    }
    connectedCallback() {
        if (this.innerHTML != "") {
            return;
        }

        if (typeof this.content !== "string") {
            this.append("Este componente solo soporta textos por contenido");
            return;
        }
        this.DrawSlide();
        this.showSlides(this.slideIndex);
    }
    DrawSlide = async() => {
        let frag = { type: "div", props: { class: "slideshow-container" }, children: [WSlideStyle] }
        let dotContainer = { type: "div", props: { class: "dot-container" }, children: [] }

        let NumSlides = this.content.length / 300;
        let Slides = [];
        let inicio = 0;
        let fin = 300;
        for (let index = 0; index < NumSlides; index++) {
            var cadena = this.content.slice(inicio, fin);
            inicio = inicio + 300;
            fin = fin + 300;
            if (index > 0) {
                cadena = "..." + cadena;
            }
            if (index < NumSlides - 1) {
                if (cadena.charAt(cadena.length - 1).includes(" ")) {
                    cadena = cadena.slice(0, -1);
                }
                cadena = cadena + "...";
            }
            Slides.push(cadena);
        }
        Slides.forEach((element, index = 1) => {
            frag.children.push({
                type: "div",
                props: { class: "mySlides" },
                children: [
                    { type: "p", children: [element] }
                ]
            });
            dotContainer.children.push({
                type: "span",
                props: {
                    class: "dot",
                    onclick: () => {
                        this.currentSlide(index);
                    }
                }
            });
            index++;
        });
        frag.children.push({
            type: "a",
            props: { class: "prev", onclick: () => { this.plusSlides(-1); } },
            children: ["❮"]
        });
        frag.children.push({
            type: "a",
            props: { class: "next", onclick: () => { this.plusSlides(1); } },
            children: ["❯"]
        });
        this.append(WRender.createElement(frag), WRender.createElement(dotContainer));
    }
    DrawForm = async() => {
        const url = Url_Path + 'api/Form/GetForm?idform=' + this.idform[0];
        this.data = await GetRequest(url);
        let frag = { type: "div", props: { class: "slideshow-container" }, children: [FormStyle] }
        let dotContainer = { type: "div", props: { class: "dot-container" }, children: [] }
        this.data[1].forEach((preg, index = 1) => {
            let pregSection = {
                type: "div",
                props: { id: `section${preg.IdQuestion}`, class: "mySlides" },
                children: [
                    { type: "h4", children: [preg.Description] }
                ]
            }
            let OptionSections = {
                type: "div",
                props: { class: "sectionResp" },
                children: []
            }
            const pregsOptions = this.data[2].filter(
                p => p.IdQuestion == preg.IdQuestion);
            let typeOption = preg.pregType;
            if (preg.IdType == 1) {
                //NO IMPLEMENTED                                
            }
            pregsOptions.forEach(pregOption => {
                OptionSections.children.push({
                    type: "div",
                    props: { class: "divOption" },
                    children: [{
                            type: "label",
                            props: {
                                for: `preg${preg.IdQuestion}_${pregOption.IdQuestionOption}`
                            },
                            children: [pregOption.OptionDesc]
                        },
                        {
                            type: "input",
                            props: {
                                type: typeOption,
                                id: `preg${preg.IdQuestion}_${pregOption.IdQuestionOption}`,
                                name: `preg${preg.IdQuestion}`,
                                value: pregOption.Value
                            }
                        }
                    ]
                })
            });
            //-------------------------------------
            pregSection.children.push(OptionSections);
            frag.children.push(pregSection);

            dotContainer.children.push({
                type: "span",
                props: {
                    class: "dot",
                    onclick: () => {
                        this.currentSlide(index);
                    }
                }
            });
            index++;
        });
        frag.children.push({
            type: "a",
            props: { class: "prev", onclick: () => { this.plusSlides(-1); } },
            children: ["❮"]
        });
        frag.children.push({
            type: "a",
            props: { class: "next", onclick: () => { this.plusSlides(1); } },
            children: ["❯"]
        });
        this.append(createElement(frag), createElement(dotContainer));
        this.showSlides(this.slideIndex);
    }
    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }
    currentSlide(n) {
        this.showSlides(this.slideIndex = n);
    }
    showSlides = (n) => {
        var i;
        var slides = this.getElementsByClassName("mySlides");
        var dots = this.getElementsByClassName("dot");
        if (n > slides.length) { this.slideIndex = 1 }
        if (n < 1) { this.slideIndex = slides.length }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[this.slideIndex - 1].style.display = "block";
        dots[this.slideIndex - 1].className += " active";
    }
}

const WSlideStyle = {
    type: "w-style",
    props: {
        ClassList: [
            new WCssClass("w-slide .slideshow-container", {
                "box-sizing": "border-box",
                "position": "relative",
                "background": "#f1f1f1f1",
                "font-family": "Verdana, sans-serif",
                margin: 0
            }),
            new WCssClass("w-slide .mySlides", {
                "display": "none",
                "padding": "20px 50px",
                "height": "280px",
                "overflow-y": "auto",
                "overflow-x": "hidden",
                "text-align": "justify",
                "white-space": "pre-wrap",
            }),
            new WCssClass("w-slide .prev, w-slide .next", {
                "cursor": "pointer",
                "position": "absolute",
                "top": "50%",
                "width": "auto",
                "margin-top": "-30px",
                "padding": "16px",
                "color": "#888",
                "font-weight": "bold",
                "font-size": "20px",
                "border-radius": "0 3px 3px 0",
                "user-select": "none",
            }),
            new WCssClass("w-slide .next", {
                "position": "absolute",
                "right": "0",
                "border-radius": "3px 0 0 3px",
            }),
            new WCssClass("w-slide .prev", {
                "position": "absolute",
                "left": "0",
                "border-radius": "3px 0 0 3px",
            }),
            new WCssClass("w-slide .prev:hover, w-slide .next:hover", {
                "background-color": "rgba(0,0,0,0.8)",
                "color": "white",
            }),
            new WCssClass("w-slide .dot-container", {
                "text-align": "center",
                "padding": "20px",
                "background": "#ddd",
            }),
            new WCssClass("w-slide .dot", {
                "cursor": " pointer",
                "height": " 15px",
                "width": " 15px",
                "margin": " 0 2px",
                "background-color": " #bbb",
                "border-radius": " 50%",
                "display": " inline-block",
                "transition": " background-color 0.6s ease",
            }),
            new WCssClass("w-slide .active,w-slide .dot:hover", {
                "background-color": "#717171"
            })
        ]
    }
}
customElements.define("w-slide", WSlide);