//TABLAS -------------------------------------->
function GetObj(id) {
    var Obj = document.getElementById(id)
    return Obj;
  }

var ArrayList = [];
class ConfigTable{
    constructor(Config) {
        this.Name = Config.Name;
        this.Options = Config.Options;
        this.Del = Config.Del;
        this.Edit = Config.Edit;
        this.Select = Config.Select;
        this.FormName = Config.FormName;
    }
}
function CreateInput(Data) {
    var InputForRT = document.createElement("input");
    InputForRT.className = Data.class;
    InputForRT.type = Data.type;
    InputForRT.value = Data.value;
    InputForRT.index = Data.value;
    return InputForRT;
}
function DrawTable(List, Config) {
    ArrayList = List;
    var Config = new ConfigTable(Config);
    tbody = document.querySelector("#" + Config.Name + " tbody");
    tbody.innerHTML = "";
    for (var i = 0; i < ArrayList.length; i++) {
        var row = tbody.insertRow(i);
        for (var Propiedad in ArrayList[i]) {
          if (Propiedad.includes("id_")) {
          } else {
            var TdForRow = document.createElement("td");
            TdForRow.innerHTML = ArrayList[i][Propiedad];
            row.appendChild(TdForRow);
          }
        }
        if (Config.Options) {
            var tdForInput = document.createElement("td");
            if (Config.Del) {
                var InputForRT = CreateInput({type:'button',value:'Del'}); 
                var DelData = {
                    Index:i,
                    Config:Config
                }
                InputForRT.setAttribute("onclick","DeleteElement("+JSON.stringify(DelData) +")");                              
                tdForInput.appendChild(InputForRT);            
           }
           if (Config.Edit) {               
                var InputForRT = CreateInput({type:'button',value:'Edit'});
                var EditData = {
                    Index:i,
                    Config:Config,
                    DataElement:ArrayList[i]
                }
                InputForRT.setAttribute("onclick","EditElement("+JSON.stringify(EditData) +")");
                tdForInput.appendChild(InputForRT);                           
            }
            if (Config.Select) {
                var InputForRT = CreateInput({type:'button',value:'Select'});
                InputForRT.addEventListener('click',function(e) {
                    
                })    
                tdForInput.appendChild(InputForRT);               
            }
           row.appendChild(tdForInput);
        }
    }
}
function DeleteElement(Data) {
    ArrayList.splice(Data.Index, 1);  
    DrawTable(ArrayList, Config);
}

function EditElement(Data) {  
    var Form;
    if (Data.Config.FormName) {
        Form = document.getElementById(Data.Config.FormName).querySelectorAll(".FormControl"); 
        if(Data.Config.FormName){
            var UpdateData = {
                Index:Data.Index,
                Config:Data.Config,
                DataElement:Data.DataElement
            }           
            var control = GetObj(Data.Config.FormName).querySelector(".BtnUpdate");
            control.setAttribute("onclick","UpdateElement("+JSON.stringify(UpdateData) +");");
        }   
        var index = 0;
        for (var Propiedad in Data.DataElement) {
            
            if (Form[index].tagName == "INPUT" || Form[index].tagName == "input") {
                console.log(Form[index].tagName)      
                if (Form[index].type != "button") {
                    Form[index].value = Data.DataElement[Propiedad];
                }
            } 
            if (Form[index].tagName == "TEXTAREA" || Form[index].tagName == "textarea") { 
                Form[index].innerText = Data.DataElement[Propiedad];                
            } 
            if (Form[index].tagName == "SELECT" || Form[index].tagName == "select") { 
                var aTags = Form[index].getElementsByTagName("option");
                var searchText = Data.DataElement[index];
                var found;
                for (var i = 0; i < aTags.length; i++) {
                    if (aTags[i].textContent == searchText) {
                      found = aTags[i].value;
                      Form[index].value = found;
                      break;
                    }
                  }
            } 
            index++;
        } 
        modalFunction(Data.Config.FormName)      
    }else{
        CreateForm(Data);
    }      
}
function CreateForm(Data) {
    if (GetObj('TempForm')) {
        return;
    }
    var FormContainer = document.createElement('div');
    FormContainer.className = 'ModalContent';
    FormContainer.id = "TempForm";
    var Form = document.createElement('div');
    Form.className = 'Container';
    var Header = document.createElement('div');
    var ControlContainer = document.createElement('div');
    ControlContainer.className = 'GrupForm';   
    for (var Prop in Data.DataElement) {
        var DivContainer = document.createElement('div');
        var ControlLabel = document.createElement('label');
        ControlLabel.innerText = Prop;
        var ControlInput = document.createElement('input');
        ControlInput.id = Prop;
        ControlInput.value = Data.DataElement[Prop];
        ControlInput.className = 'FormControl';
        if (Prop.includes("id_")) {
            DivContainer.hidden = true;
        }
        DivContainer.append(ControlLabel,ControlInput);
        ControlContainer.append(DivContainer);
    }
    var ActionsContainer = document.createElement('div');
    ActionsContainer.className = 'GrupForm';
    var InputSave = CreateInput({type:'button',value:'Guardar'});
    var UpdateData = {
        Index:Data.Index,
        Config:Data.Config,
        DataElement:Data.DataElement
    }
    InputSave.setAttribute("onclick","UpdateElement("+JSON.stringify(UpdateData) +");");
    ActionsContainer.appendChild(InputSave);
    Form.append(Header,ControlContainer,ActionsContainer);
    FormContainer.append(Form);
    document.body.append(FormContainer);
    setTimeout(function(){ modalFunction('TempForm');},100);    
}

function UpdateElement(Data) {   
    for (let index = 0; index < Object.keys(Data.DataElement).length; index++) {
      prop = Object.keys(Data.DataElement)[index];
      ArrayList[Data.Index][prop] = GetObj(prop).value;
    }    
    DrawTable(ArrayList,Data.Config);
    if (Data.Config.FormName) {
        modalFunction(Data.Config.FormName)
    } else{
        modalFunction("TempForm")
        setTimeout(function(){ 
            document.body.removeChild(GetObj("TempForm"));
        }, 1000);        
    }  
}
//MODALES-------------------------------->
function modalFunction(DivModal) {    
    var ventanaM = document.getElementById(DivModal);     
    if (ventanaM.style.opacity == 0) {
      ventanaM.style.transition = "all ease 1s";
      ventanaM.style.opacity = 1;
      ventanaM.style.pointerEvents = "all";
    } else {
      ventanaM.style.transition = "all ease 1s";
      ventanaM.style.opacity = 0;
      ventanaM.style.pointerEvents = "none";
    }
  }