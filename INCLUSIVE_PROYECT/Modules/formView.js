class FormView extends HTMLElement{
    constructor(props){
        super();        
    }
    attributeChangedCallBack(){
        this.DrawChart();
    }
    connectedCallback(){           
        if (this.innerHTML != "") {            
            return;
        }
        this.DrawForm();
    }
    DrawForm = async () =>{         
        const url =  Url_Path + 'api/Form/GetForm?idform=' + this.idform[0];
        this.data = await GetRequest(url);        
        let frag = {type: "div", children:[]}
        this.data[1].forEach(preg => {
            let pregSection = {
                type: "div", props: {id:`section${preg.IdQuestion}`}, children:[
                    {type:"h4", children:[preg.Description]}
                ]
            }
            let OptionSections = {
                type: "div", props: {}, children:[]
            }            
            const pregsOptions = this.data[2].filter(
                p => p.IdQuestion == preg.IdQuestion);
            let typeOption = preg.pregType;
            if (preg.IdType == 1) {
                //NO IMPLEMENTED                                
            }
            //-----------------------------------
            console.log(this.data[2]);
            console.log(pregsOptions);
            pregsOptions.forEach(pregOption => {                
                OptionSections.children.push(
                    {type: "div", props: {}, children:[
                        {type: "label", props: {
                            for: `preg${preg.IdQuestion}_${pregOption.IdQuestionOption}`
                        },children:[pregOption.OptionDesc]},
                        {type: "input", props: {
                            type: typeOption, 
                            id: `preg${preg.IdQuestion}_${pregOption.IdQuestionOption}`,
                            name:  `preg${preg.IdQuestion}`,
                            value: pregOption.Value
                        }}
                    ]}
                )
            });
            //-------------------------------------
            pregSection.children.push(OptionSections);
            frag.children.push(pregSection);
        }); 
        this.append(createElement(frag));
    }
}
customElements.define("w-form-view", FormView);
