import { WCssClass } from "../WDevCore/WModules/WStyledRender.js";
import "../WDevCore/WComponents/WSlide.js";
import "../WDevCore/WComponents/WRichText.js";
import "../WDevCore/WComponents/WTableComponents.js";
class Modules {
    constructor(props) {
        this.type = "div";
        this.props = props;
        this.props.style = "padding: 10px";
        this.children = [
            new TableCont(),    
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
            //console.log(foro)
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
class TableCont {
    constructor() {
        this.type = "div";
        this.children = [];
        let TableList = [];
        TableList.push({id_: 1, content: "des", cant: 3,  AttNameG1: "g1", AttNameG1: "g2", AttNameG1: "g3" });
        TableList.push({id_: 1, content: "des", cant: 3,  AttNameG1: "g1", AttNameG1: "g1", AttNameG1: "g3" });
        TableList.push({id_: 1, content: "des", cant: 3,  AttNameG1: "g2", AttNameG1: "g2", AttNameG1: "g3" });
        TableList.push({id_: 1, content: "des", cant: 3,  AttNameG1: "g2", AttNameG1: "g2", AttNameG1: "g3" });
        TableList.push({id_: 1, content: "des", cant: 3,  AttNameG1: "g1", AttNameG1: "g1", AttNameG1: "g3" });
        //TABLE CONFIG
        var result = {
            "datos": [{
                    "cantidad": 21,
                    "estado": "Naranja",
                    "time": "julio 2012",
                    "categ2": "Moderado",
                    "categ": "Ekisde"
                },
                {
                    "cantidad": 2,
                    "estado": "Naranja",
                    "time": "julio 2019",
                    "categ2": "Severo",
                    "categ": "Nic"
                },
                {
                    "cantidad": 14,
                    "estado": "Fresa",
                    "time": "julio 2019",
                    "categ2": "Severo",
                    "categ": "Galaxia"
                },
                {
                    "cantidad": 17,
                    "estado": "Fresa",
                    "time": "julio 2019",
                    "categ2": "Moderado",
                    "categ": "Nic2"
                },
                {
                    "cantidad": 36,
                    "estado": "Naranja",
                    "time": "julio 2012",
                    "categ2": "Moderado",
                    "categ": "Galaxia"
                },
                {
                    "cantidad": 19,
                    "estado": "Naranja",
                    "time": "julio 2019",
                    "categ2": "Moderado",
                    "categ": "Nic2"
                },
                {
                    "cantidad": 13,
                    "estado": "Fresa",
                    "time": "julio 2019",
                    "categ2": "Moderado",
                    "categ": "Canal2"
                },
                {
                    "cantidad": 16,
                    "estado": "Verde",
                    "time": "julio 2019",
                    "categ2": "Moderado",
                    "categ": "Galaxia"
                },
                {
                    "cantidad": 16,
                    "estado": "Fresa",
                    "time": "julio 2019",
                    "categ2": "Moderado",
                    "categ": "Nic3"
                },
                {
                    "cantidad": 15,
                    "estado": "Naranja",
                    "time": "julio 2019",
                    "categ2": "Moderado",
                    "categ": "Canal2"
                },
                {
                    "cantidad": 31,
                    "estado": "Fresa",
                    "time": "julio 2019",
                    "categ2": "Moderado",
                    "categ": "La Castellana"
                }
            ],
        };
        var Config = {     
            Datasets: result.datos,
            Colors: ["#ff6699", "#ffbb99", "#adebad"],
            AttNameEval: "estado",
            AttNameG1: "time",
            AttNameG2: "categ2",
            AttNameG3: "categ",
            EvalValue: "cantidad",
        };
        this.children.push({
            type: 'h2',
            props: { innerText: "Table........."},
        })
        this.children.push({
            type: "w-table",
            props: {
                id: "table", TableConfig: Config
            }
        })
    }
}
export {Modules}