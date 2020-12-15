class WModalForm extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        console.log("Componente conectado");
        this.DrawComponent();
    }
    DrawComponent() {
        const modal = document.createElement("div");
        modal.className = "Container";
        const modalStyle = document.createElement("style");
        modalStyle.innerHTML = `
            .modalContainer{
                position: fixed;
                top: 0;
                left: 0;
                bottom: 0;
                right:0;
                background: rgba(0,0,0,0.5);
                display: block;                
                transition: all 1s;
                opacity: 0;
            }
            .Container{
                background: #fff;
                padding: 20px;
                border-radius: 0.3cm;
                display: block;
                margin: auto;
                margin-top: 20px;
                min-height: 100px;
                width: 80%;
            }
            /*Estilos de encabezado*/
            .ModalHeader{
                position: relative;                
                margin-bottom: 10px;
            }
            .ModalHeader button{
                position: absolute;
                right: 0;
                border-radius: 50%;
                color: #fff;
                background: #8B0005;
                border: none;
                padding: 4px 8px;
            }
            .ModalHeader h2{
                color: #444444;
                font-family: arial;
                margin: 0px;
                display: inline-block;
            }

            /*Estilos de pie de pagina*/
            .Modalfooter{
                display: flex;
                height: 40px;
                justify-content: center;
                aling-itens; center;
                margin-top: 10px;
            }
            .Modalfooter button{               
                border-radius: 0.2cm;
                color: #fff;
                background:  #3399ff;
                border: none;
                padding: 10px;

            }
           
        `;
        modal.append(this.DrawHeader(), this.contain, this.DrawFooter());
        this.className = "modalContainer";
        this.append(modalStyle);
        this.append(modal);
        setTimeout(() => {
            this.style.opacity = "1";
        }, 100);
    }
    DrawHeader() {
        const header = document.createElement("section");    
        header.className = "ModalHeader";    
        const closeBTN = document.createElement("button");
        closeBTN.innerText = "x";
        closeBTN.onclick = () => {
            this.style.opacity = "0";
            setTimeout(() => {
                this.parentNode.removeChild(this);
            }, 1000);
        } 
        const title = document.createElement("h2");
        title.innerText = this.title;    
        header.append(title, closeBTN);   
        return header;
    }
    DrawFooter() {
        const footer = document.createElement("section");    
        footer.className = "Modalfooter";    
        const OkBTN = document.createElement("button");
        OkBTN.innerText = "Aceptar";
        OkBTN.onclick = () => {
            if (this.Function != undefined) {
                this.Function(this.data);
            }
            this.style.opacity = "0";
            setTimeout(() => {
                this.parentNode.removeChild(this);
            }, 1000);
        }   
        footer.append(OkBTN);   
        return footer;
    }
}
customElements.define("w-modal-form", WModalForm);