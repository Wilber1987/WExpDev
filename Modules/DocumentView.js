import {WCssClass} from "../WDevCore/WModules/WStyledRender.js"
export default class DocumentView {
    constructor(props, PDF, title) {
        this.type = "section";
        this.props = props;
        this.props.className = "DocumentView",
        this.children = [
            { type: 'label', props: { innerText: title } },
            PDF, 
            this.Style
        ];
    }
    Style = {
        type: "w-style",
        props: {
            ClassList: [
                new WCssClass(".DocumentView", {  
                    display: "grid",
                    height: "100%",
                    "grid-template-columns": "100%",
                    "grid-template-rows": "50px calc(100% - 50px)"                           
                }),new WCssClass(".DocumentView label", {  
                    display: "flex",
                    height: "100%",
                   "font-size": "20px",
                   "justify-content": "center",
                   "align-items": "center"                          
                }),new WCssClass(".DocumentView embed, .DocumentView object", {  
                    display: "block",
                    width: "100%",
                    height: "100%"                           
                }),
            ]
        }
    };
}

