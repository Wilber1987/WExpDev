import { WRender } from "../WModules/WComponentsTools.js";
import { WCssClass } from "../WModules/WStyledRender.js";
class WSlide extends HTMLElement {
    constructor() {
        super();
        //console.log(this)
        this.slideIndex = 1;
    }
    attributeChangedCallBack() {
        this.DrawSlide();
    }
    connectedCallback() {
        if (this.innerHTML != "") {
            return;
        }
        this.append(WRender.createElement(this.SlideStyle()))
        this.DrawSlide();
        this.showSlides(this.slideIndex);
    }
    TakeArray = () => {
        let Slides = [];
        if (typeof this.content === "string") {
            let NumSlides = this.content.length / 300;
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
        } else if (typeof this.content === "object" && this.content.length > 0) {
            Slides = this.content;
        }
        return Slides;
    }
    TakeSlide = (element) => {
        const slide = {
            type: "div", props: {}, children: []
        }
        if (this.slideType == "videos") {
            const embed = { type: "div", props: {}, children: [] }
            embed.type = "embed";
            embed.props.frameborder = 0;
            embed.props.allowfullscreen = true;
            embed.props.src = element.url;
            slide.props.class = "videoSlide";
            const content = {
                type: "div", props: { class: "content" }, children: [
                    { type: "h2", props: { innerText: element.title } },
                    { type: "p", props: { innerText: element.description } },
                ]
            }
            slide.children.push(embed);
            slide.children.push({
                type: "div", props: { class: "videoSlideInfo" },
                children: [
                    content,
                    { type: "div", props: { class: "bg" } },
                    { type: "div", props: { class: "bg bg2" } },
                    { type: "div", props: { class: "bg bg3" } },                    
                ]
            });
        } else if (this.slideType == "images") {
            slide.type = "img";
            slide.props.src = element.url;
        } else {
            slide.type = "p";
            slide.props.class = "pText";
            slide.children.push(element);
        }
        return slide;
    }
    DrawSlide = async () => {
        let frag = { type: "div", props: { class: "slideshow-container" }, children: [] }
        let dotContainer = { type: "div", props: { class: "dot-container" }, children: [] }
        let Slides = this.TakeArray();

        Slides.forEach((element, index = 1) => {
            const slide = this.TakeSlide(element);
            frag.children.push({
                type: "div",
                props: { class: "mySlides" },
                children: [slide]
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
    DrawForm = async () => {
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
    SlideStyle = () => {
        let Id = "#" + this.id + ".";
        if (typeof this.id === "undefined" || this.id == "") {
            Id = "";
        }
        const WSlideStyle = {
            type: "w-style",
            props: {
                ClassList: [
                    new WCssClass(Id + "w-slide", {
                        position: "relative",
                        width: "100%",
                        display: "block"
                    }),
                    new WCssClass(Id + "w-slide .slideshow-container", {
                        "box-sizing": "border-box",
                        "position": "relative",
                        "background": "#f1f1f1f1",
                        "font-family": "Verdana, sans-serif",
                        margin: 0
                    }),
                    new WCssClass(Id + "w-slide .mySlides", {
                        "display": "none",
                        //"padding": "20px 50px",
                        "height": "350px",
                        "overflow-y": "auto",
                        "overflow-x": "hidden",
                        "text-align": "justify",
                        "white-space": "pre-wrap",
                    }),
                    new WCssClass(Id + "w-slide .prev, " + Id + "w-slide .next", {
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
                    new WCssClass(Id + "w-slide .next", {
                        "position": "absolute",
                        "right": "0",
                        "border-radius": "3px 0 0 3px",
                    }),
                    new WCssClass(Id + "w-slide .prev", {
                        "position": "absolute",
                        "left": "0",
                        "border-radius": "3px 0 0 3px",
                    }),
                    new WCssClass(Id + "w-slide .prev:hover," + Id + "w-slide .next:hover", {
                        "background-color": "rgba(0,0,0,0.8)",
                        "color": "white",
                    }),
                    new WCssClass(Id + "w-slide .dot-container", {
                        "text-align": "center",
                        "padding": "20px",
                        "background": "rgba(0,0,0,0.3)",
                        width: "calc(100% - 0px)",
                        position: "absolute",
                        bottom: "0px"
                    }),
                    new WCssClass(Id + "w-slide .dot", {
                        "cursor": " pointer",
                        "height": " 20px",
                        "width": " 20px",
                        "margin": " 0 2px",
                        "background-color": " #bbb",
                        "border-radius": " 50%",
                        "display": " inline-block",
                        "transition": " background-color 0.6s ease",
                    }),
                    new WCssClass(Id + "w-slide .active, " + Id + "w-slide .dot:hover", {
                        "background-color": "#717171"
                    }),
                    new WCssClass(Id + "w-slide .videoSlide", {
                        width: "100%",
                        height: "99%",
                        margin: "0px",
                        padding: "0px",
                        // display: "flex",
                        position: "relative"
                    }),
                    new WCssClass(Id + "w-slide embed", {
                        width: "650px",
                        height: "99%",
                        margin: "0px",
                        padding: "0px",
                    }),
                    new WCssClass(Id + "w-slide .videoSlideInfo", {
                        width: "calc(100% - 650px)",
                        height: "99%",
                        margin: "0px",
                        padding: "0px",
                        display: "flex",
                        "flex-direction": "column",
                        "justify-content": "center",
                        "align-items": "center",
                        //background: "#cacaca",
                        //background: "radial-gradient(circle, rgba(230,230,231,1) 51%, rgba(186,186,186,1) 100%)",
                        
                        color: "#3e3e3e",
                        position: "absolute",
                        right: 0,
                        top: 0,
                        overflow: "hidden",
                        //"border-radius": "-50%"
                    }),
                    new WCssClass(Id + "w-slide p", {
                        width: "100%",
                        //"padding": "20px 50px",
                    }), new WCssClass(Id + "w-slide h2", {
                        width: "80%",
                        "text-align": "center",
                        // background: "#072857",
                        "border-radius": "0.3cm",
                        padding: "10px",
                        color: "#1e5799"
                    }),
                    //ANIMATION
                    new WCssClass(Id + "w-slide .bg", {
                        animation: "slide 3s ease-in-out infinite alternate",
                        "background-image": "linear-gradient(-60deg, #6c3 50%, #09f 50%)",
                        bottom: "0",
                        left: "-50%",
                        opacity: ".5",
                        position: "absolute",                       
                        right: "-50%",
                        top: "0",
                        "z-index": "0",
                    }), new WCssClass(Id + "w-slide .bg2", {
                        "animation-direction": "alternate-reverse",
                        "animation-duration": "4s",
                    }), new WCssClass(Id + "w-slide .bg3", {
                        "animation-duration": "5s",
                    }), new WCssClass(Id + "w-slide .content", {
                        "background-color":"rgba(255,255,255,.8)",
                        "border-radius":".25em",
                        "box-shadow":"0 0 .25em rgba(0,0,0,.25)",
                        "box-sizing":"border-box",
                        display: "flex",
                        width: "80%",
                        "flex-direction": "column",
                        "justify-content": "center",
                        "align-items": "center",
                        "z-index": 1,                        
                    }),

                ], KeyFrame: {
                    animate: "slide", ClassList: [
                        new WCssClass("0%", {
                            transform: "translateX(-25%)"
                        }), new WCssClass("100%", {
                            transform: "translateX(25%)"
                        })
                    ]
                }
            }
        }
        return WSlideStyle;
    }
}

customElements.define("w-slide", WSlide);