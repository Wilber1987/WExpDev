import { WCssClass } from "../WDevCore/WModules/WStyledRender.js";
import "../WDevCore/WComponents/WSlide.js";
import "../WDevCore/WComponents/WRichText.js";
class Modules {
    constructor(props) {
        this.type = "div";
        this.props = props;
        this.props.style = "padding: 10px";
        this.children = [
            //  Ritch           
            new RichText(),
            //  SLIDE           
            new Slide(),
            {
                type: 'h2',
                props: {
                    id: "",
                    class: ""
                },
                children: ["Noticias"]
            },
            {
                type: 'section',
                props: {
                    id: "",
                    class: ""
                },
                children: this.DisplayForos(this.props.Foros)
            },
        ]
    }
    DisplayForos = (Foros) => {
        let ForosElements = [];
        Foros.forEach(foro => {
            console.log(foro)
            ForosElements.push({
                type: "article",
                props: {
                    class: "Articles"
                },
                children: [{
                        type: "label",
                        props: {
                            innerText: foro.title
                        }
                    },
                    //{type: "label", props: {innerText: foro.date}},
                    {
                        type: "a",
                        props: {
                            innerText: "ver...",
                            href: "#"
                        }
                    }
                ]
            })
        });
        ForosElements.push(this.Styles());
        return ForosElements;
    }
    Styles = () => {
        const Style = {
            type: "w-style",
            props: {
                ClassList: [
                    new WCssClass(`#${this.props.id} .Articles`, {
                        display: "flex",
                        border: "1px solid #808080",
                        "border-radius": "0.2cm",
                        "align-items": "center",
                        padding: "15px",
                        margin: "5px"
                    }),
                    new WCssClass(`#${this.props.id} .Articles label`, {
                        width: "100%",
                    })
                ]
            }
        }
        return Style;
    }
}
class Slide {
    constructor() {
        this.type = "div";
        this.children = [];
        this.children.push({
            type: 'h2',
            props: {
                id: "",
                class: "",
                innerText: "Slide......"
            },
        })
        this.children.push({
            type: "w-slide",
            props: {
                content: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet perferendis 
                    fugiat accusamus placeat autem aliquam sed eligendi eum pariatur, numquam
                    non similique est quas fuga repellendus iste maxime architecto cumque.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet perferendis 
                    fugiat accusamus placeat autem aliquam sed eligendi eum pariatur, numquam
                    non similique est quas fuga repellendus iste maxime architecto cumque.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet perferendis 
                    fugiat accusamus placeat autem aliquam sed eligendi eum pariatur, numquam
                    non similique est quas fuga repellendus iste maxime architecto cumque.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet perferendis 
                    fugiat accusamus placeat autem aliquam sed eligendi eum pariatur, numquam
                    non similique est quas fuga repellendus iste maxime architecto cumque.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet perferendis 
                    fugiat accusamus placeat autem aliquam sed eligendi eum pariatur, numquam
                    non similique est quas fuga repellendus iste maxime architecto cumque.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet perferendis 
                    fugiat accusamus placeat autem aliquam sed eligendi eum pariatur, numquam
                    non similique est quas fuga repellendus iste maxime architecto cumque.Lorem,
                    ipsum dolor sit amet consectetur adipisicing elit. Amet perferendis 
                    fugiat accusamus placeat autem aliquam sed eligendi eum pariatur, numquam
                    non similique est quas fuga repellendus iste maxime architecto cumque.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet perferendis 
                    fugiat accusamus placeat autem aliquam sed eligendi eum pariatur, numquam
                    non similique est quas fuga repellendus iste maxime architecto cumque.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet perferendis 
                    fugiat accusamus placeat autem aliquam sed eligendi eum pariatur, numquam
                    non similique est quas fuga repellendus iste maxime architecto cumque.
                    `
            }
        })
    }
}
class RichText {
    constructor() {
        this.type = "div";
        this.children = [];
        this.children.push({
            type: 'h2',
            props: {
                id: "",
                class: "",
                innerText: "RithText......"
            },
        })
        this.children.push({
            type: "w-rich-text",
            props: {
                id: "txtRitch"
            }
        })
    }
}
export {
    Modules
}