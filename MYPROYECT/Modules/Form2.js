class Form2{
    constructor(props, structure = []){
        this.type  = "form"
        this.props = props; 
        this.props.DataForm = {};
        this.children.push(props.id); 
        structure.forEach(element => {    
            this.props.DataForm[element.Field] = null;          
            let field = {};
            field.type = "input";
            field.props = {};
            field.props.id = element.Field;
            if (element.Type.includes("int")) {
                field.props.type = "number";
            } else if (element.Type.includes("varchar")) {
                field.props.type = "text";
            } else if (element.Type.includes("date")) {
                field.props.type = "date";
            } 
            field.props.onchange = ()=>{
                this.AsignarValor(element.Field);
            }      
            let div = {type: "div", props: {class: "divForm"},
            children:[
                 element.Field, field
            ]}
            this.children.push(div);
        });
        this.children.push(
        {
            type:"buttom", props: {type:"button", onclick:()=>{
                   this.Guardar();
                }
            }, children: ["Guardar"]
        });
    }
    children= [];
    AsignarValor = (idControl)=>{
        this.props.DataForm[idControl] = document.getElementById(idControl).value;
    }    
    Guardar = ()=>{
        console.log("Guardando");
        console.log(this.props.DataForm);
    }
}
export {Form2}
