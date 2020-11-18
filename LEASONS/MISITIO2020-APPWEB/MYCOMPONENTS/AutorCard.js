class AutorCard extends HTMLElement {
    constructor() {
        super();        
    }
    connectedCallback() {
        this.DrawComponent();
        this.className = "AutorCardCssClass";   
    }
    DrawComponent() {
        let img = document.createElement("img");
        img.src = "./MEDIA/PHOTOS/" + this.AutorProp.Photo;
        let DataAutor = document.createElement("div");
        DataAutor.className = "DataAutorCssClass";
        //nombre
        let AutorNombre = document.createElement("label");
        AutorNombre.innerText = "Nombres: "+ this.AutorProp.Nombres;
        //pais
        let AutorPais = document.createElement("label");
        AutorPais.innerText = "Pais: "+this.AutorProp.Pais;
        //fecha nac
        let AutorFechaNac = document.createElement("label");
        AutorFechaNac.innerText = "Fecha Nacimiento: "+this.AutorProp.FechaNac;
        //especialidad
        let AutorEspecialidad = document.createElement("label");
        AutorEspecialidad.innerText ="Especialidad: "+ this.AutorProp.Especialidad;        
        DataAutor.append(AutorNombre,  AutorPais, AutorFechaNac, AutorEspecialidad);
        let franjaAzul = document.createElement("section");
        franjaAzul.className = "franjaAzul";
        franjaAzul.innerHTML = "Autor Card..."
        let DataCard = document.createElement("section");
        DataCard.className = "DataCardCssClass";
        DataCard.append(img, DataAutor);
        this.append(franjaAzul, DataCard);
    }
   
}
customElements.define("autor-card-w", AutorCard);