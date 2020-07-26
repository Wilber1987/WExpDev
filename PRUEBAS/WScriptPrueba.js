//CARROSEL
function GetObj(id) {
  var Obj = document.getElementById(id)
  return Obj;
}

function autoplay(ContainerId) {
  var Container = GetObj(ContainerId).getElementsByTagName('div');
  //var Container2 = GetObj(ContainerId).getElementsByClassName('card_entrenamiento_fecha');
 //console.log(Container.length)
  // for (let index = 0; index < Container2.length; index++) {
  //   const element = Container2[index];
  //   element.style.display='inline-block';
  //   element.style.margin = '10px';   
    
  // } 
  //console.log(Container)
  if (Container.length > 1) {
      interval = setInterval(function() {
          myFunctionNext(ContainerId);
      }, 15000);
  }
  if (Container.length == 1) {
    //console.log(Container[0])
      // Container[0].style.display = 'block';
      // Container[0].style.margin = 'auto';
  }  
}

function myFunctionNext(ContainerId) {
  var slider = GetObj(ContainerId);
  var LastCard = slider.lastElementChild;
  var firstCard = slider.firstElementChild;
  var widthAnimation = firstCard.offsetWidth + 10;
  //console.log(widthAnimation)
  slider.animate(
      [{ transform: "translateY(0px)" }, { transform: "translateX(-"+widthAnimation+"px)" }], {
          duration: 1000
      }
  );
  setTimeout(function() {
      LastCard.parentNode.insertBefore(firstCard, LastCard.nextSibling);
  }, 1000);
}

function myFunctionPrev(ContainerId) {
  var slider = GetObj(ContainerId);
  var firstCard = slider.firstElementChild;
  var LastCard = slider.lastElementChild;
  var widthAnimation = firstCard.offsetWidth + 10;
  slider.animate(
      [{ transform: "translateY(0px)" }, { transform: "translateX(+"+widthAnimation+"px)" }], {
          duration: 1000
      }
  );
  setTimeout(function() {
      slider.insertBefore(LastCard, slider.firstChild);
  }, 1000);
}

//correr en el cocumet reddy
            // var slider = document.getElementById(ContainerId);
            // var LastCard = slider.lastChild;
            // slider.style.marginLeft = "-240px";
            // slider.insertBefore(LastCard, slider.firstChild);
            //autoplay();

function ClearInputElement(GroupID) {
  // DEFINIMOS EL GRUPO QUE CONTIENE NUESTROS ELEMENTOS
  var Group = document.getElementById(GroupID),
    //CREAMOS UN ARREGLO DE ELEMENTOS QUE CONTENGAN A LOS DIV QUE EXISTEN
    //DENTRO DEL GRUPO, PARA PODER ACCEDER A LOS INPUT TIPO TEXT
    //RECORDEMOS QUE EN NUESTRO DISEÑO CADA INPUT ESTA CONTENIDO POR UN DIV
    GroupChildren = Group.getElementsByTagName("div");
  //CREAMOS UNA VARIABLE PARA ALMACENAR Y REPRECENTAR A CADA DIV DEL GRUPO
  //ESTA VARIABLE TOMARA EL VALOR DEL DIV DE FORMA TEMPORAL CADA VEZ QUE EL CICLO ACCEDA A SU VALOR
  var e;
  //CICLO FOR PARA RECORRER EL ARREGLO DE ELEMNTOS DIV
  for (var i = 0; i < GroupChildren.length; i++) {
    //LE DAMOS A ELMENTO DIV EL VALOR DEL ELMENTO QUE ESTA RECORREINDO EL FOR
    e = GroupChildren[i];
    //VERIFICAMOS POR MEDIO DE UN IF SI EL INPUT QUE ESTA DENTRO DEL DIV ES ESPECIFICAMENTE DE UN TIPO
    //COMPLETAMENTE COMPATIBLE CON LOS DATOS QUE QUEREMOS GUARDAR EN ESTO HAY QUE TENER EN CUENTA LOS TIPOS DE ETIQUETAS QUE ESTAMOS UTILIZANDO
    //PARA ESTE EJEMPLO SIMPLEMENTE CONFIRMAREMOS QUE INPUT SEA DIFERENTE DE BOTON

    if (e.getElementsByTagName("input")[0]) {
      //console.log('limpio');
      if (e.getElementsByTagName("input")[0].type != "button") {
        //POSTERIORMENTE SI SE A CUMPLIDO LA CONDICION PROCEDEMOS A PONER EN VACIO EL VALUE DEL INPUT SELECCIONADO
        e.getElementsByTagName("input")[0].value = "";
      }
      if ((e.getElementsByTagName("input")[0].type != "text") == "input") {
        e.getElementsByTagName("input")[0].value = "";
      }
    }
  }
}

function modalFunction(DivModal) {
  //Crearemos una variable que tome el valor de el elmento del documento sea igual
  //al valor del parametro enviado en este caso DivModal
  var ventanaM = document.getElementById(DivModal);

  //por medio de una condicional definiremos cual es el estado de una de las propiedades del elemento, en este particular lo haremos por medio de la opacidad y proseguiremos a cambiar esos valos res de las propiedades
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

function DisplayAcordeon(value, SectionId,size = null) {
  if (size==null) {
    size='500px';
  }
  // var ventanaM = document.getElementById(idModal);
  var acc = document.getElementsByClassName("GrupFormAcordeon");
  for (var i = 0; i < acc.length; i++) {
    ventanaM = acc[i];

    if (ventanaM.id != SectionId) {
      //  if (ventanaM.style.height != "300px") {
      ventanaM.style.transition = "all ease 1s";
      ventanaM.style.height = "0px";

      //ventanaM.style.overflow = "scroll";
    } else {
      ventanaM.style.transition = "all ease 1s";
      ventanaM.style.height = size;
      //ventanaM.style.oveflow = "hidden";
    }
  }
  // alert(value);
  // if (value == true) {
  //     ventanaM.style.transition = "all ease 1s";
  //     ventanaM.style.height = "250px";
  // } else {
  //     ventanaM.style.transition = "all ease 1s";
  //     ventanaM.style.height = "0px";
  // }
}

//PRUEBAS JSON******************************************

var StoreList = [];

function GetList(StoreListName, storeControlId) {
  var Lista = document.getElementById(storeControlId);

  if (Lista.value == "") {
    StoreList = [];
    //console.log("lista vacia");
  } else {
    StoreList = JSON.parse(Lista.value);
    //return StoreList;
  }
  //y retornamos la lista una vez que hemos recibido los datos
  return StoreList;
}

function ClearList(StoreListName) {
  localStorage.setItem(StoreListName, "");
}

function SaveList(Olist, StoreListName, storeControlId) {
  var datos = document.getElementById(storeControlId);
  datos.value = JSON.stringify(Olist);
  //console.log(datos.value);
}

function DrawTable(
  TableName,
  parameter,
  StoreListName,
  storeControlId,
  editBtn,
  GroupDataId,
  delBtn,
  selectBtn,
  storeControlIdSelect,
  TableNameSelected
) {
  //alert(storeControlId);
  /*como notaran esta funcion sigue la misma logica de dibujar tabla, pero coin la diferencia que
    especifica los datos que quiero filtrar de la lista
    */
  var list = GetList(StoreListName, storeControlId);
  //console.log(list);
  if (parameter != "") {
    list = StoreList.filter(list => list.Name == parameter);
  }

  //console.log(list);
  tbody = document.querySelector("#" + TableName + " tbody");
  tbody.innerHTML = "";
  for (var i = 0; i < list.length; i++) {
    var row = tbody.insertRow(i);
    for (var Propiedad in list[i]) {
      if (Propiedad.includes("id_")) {
        //
      } else {
        var TdForRow = document.createElement("td");
        TdForRow.innerHTML = list[i][Propiedad];
        row.appendChild(TdForRow);
      }
    }

    if (delBtn == 1 || editBtn == 1 || selectBtn == 1) {
      var tdForInput = document.createElement("td");
      if (delBtn == 1) {
        // var InputForRT = document.createElement("Input");
        // InputForRT.type = "Button";
        // InputForRT.value = "Eliminar ";
        // InputForRT.className = "BTNForm colorFormR";
        var InputForRT = document.createElement("I");
        InputForRT.className = "btn_grid_opcion fas fa-trash-alt";
        InputForRT.style.cursor = "pointer";
        InputForRT.style.margin = "5px";
        InputForRT.setAttribute(
          "onClick",
          "DeleteElement('" +
            i.toString() +
            "','" +
            StoreListName +
            "','" +
            TableName +
            "','" +
            storeControlId +
            "','" +
            editBtn +
            "','" +
            delBtn +
            "')"
        );
        tdForInput.appendChild(InputForRT);
      }
      if (editBtn == 1) {
        
        //var InputForRTEdit = document.createElement("input");
        //InputForRTEdit.type = "Button";
        //InputForRTEdit.value = "Editar ";
        var InputForRTEdit = document.createElement("I");
        InputForRTEdit.className = "btn_grid_opcion fas fa-edit";
        InputForRTEdit.style.cursor = "pointer";
        InputForRTEdit.style.margin = "5px";
        InputForRTEdit.setAttribute(
          "onClick",
          "EditElement(this,'" +
            i.toString() +
            "','" +
            StoreListName +
            "','" +
            GroupDataId +
            "')"
        );
        tdForInput.appendChild(InputForRTEdit);
      }

      if (selectBtn == 1) {
        //reparar
         var InputForRTSelect = document.createElement("Input");
         InputForRTSelect.type = "checkbox";
         InputForRTSelect.value = "Select ";
         InputForRTSelect.className = "BTNForm colorFormA";
        
        InputForRTSelect.setAttribute(
          "onchange",
          "SelectElement('" +
            i.toString() +
            "','" +
            StoreListName +
            "','" +
            storeControlId +
            "','" +
            storeControlIdSelect +
            "','" +
            TableNameSelected +
            "',this)"
        );
        tdForInput.appendChild(InputForRTSelect);
      }
      row.appendChild(tdForInput);
    }
    tbody.appendChild(row);
  }
}

//verificar si funciona con o sin btns, y el grupo de datos

function DeleteElement(
  IndexElement,
  StoreListName,
  TableName,
  storeControlId,
  editBtn,
  delBtn,
  GroupDataId
) {
  //console.log(IndexElement);
  StoreList = GetList(StoreListName, storeControlId);
  StoreList.splice(IndexElement, 1);
  SaveList(StoreList, StoreList, storeControlId);
  DrawTable(
    TableName,
    "",
    StoreListName,
    storeControlId,
    editBtn,
    GroupDataId,
    delBtn
  );
}

//REVISAR Y AUTOMITIZAR ESTA FUNCION..................................................................
// function SelectElement(IndexElement, storeControlIdSelected , storeControlId) {
//         //sessionStorage.setItem("Index", IndexElement);
//         var ListElements = JSON.parse(document.getElementById(storeControlId).value);
//         //console.log(ListElements);
//         var Element = ListElements[IndexElement];
//         var list = [];
//         //var list= JSON.parse(document.getElementById(storeControlIdSelected).value);
//         if(document.getElementById("dataSelectedUsers").value != "") {
//             list = JSON.parse(document.getElementById("dataSelectedUsers").value);
//         }
//         list.push(Element['nickname']);
//         SaveList(list, "", "dataSelectedUsers");
//         DrawTable('TableDataUsersSelected','','','dataSelectedUsers',0,'',1,0)
//     }
function SelectElement(
  IndexElement,
  storeControlIdSelected,
  storeControlId,
  storeControlIdSelect,
  TableNameSelected,
  e
) {
  var ListElements = JSON.parse(document.getElementById(storeControlId).value);
  var elementSeleccionado = ListElements[IndexElement];

  var FindElement = false;
  if (e.checked == true) {
    var list = [];
    if (document.getElementById(storeControlIdSelect).value != "") {
      list = JSON.parse(document.getElementById(storeControlIdSelect).value);
      //if (FindElementInList(list, storeControlIdSelected, ListElements, IndexElement) == true) {
      for (let index = 0; index < list.length; index++) {
        if (list[index]["id_"] == ListElements[IndexElement]["id_"]) {
          FindElement = true;
        }
      }
    }
    if (FindElement == false) {
      list.push(elementSeleccionado);
      SaveList(list, "", storeControlIdSelect);
      DrawTable(TableNameSelected, "", "", storeControlIdSelect, 0, "", 1, 0);
    } else {
      alert("elemento ya esta en lista");
    }
  } else {
    var list2 = [];
    //if (document.getElementById(storeControlIdSelect).value != "") {
    list2 = JSON.parse(document.getElementById(storeControlIdSelect).value);
    //console.log(document.getElementById(storeControlIdSelect).value);
    //console.log(list2);

    for (let index = 0; index < list2.length; index++) {
      if (list2[index]["id_"] == ListElements[IndexElement]["id_"]) {
        list2.splice(index, 1);
      }
    }
    SaveList(list2, "", storeControlIdSelect);
    DrawTable(TableNameSelected, "", "", storeControlIdSelect, 0, "", 1, 0);
   // console.log(list2);

    //}
  }
}
//funcion customizada
function FindElementInList(
  list,
  storeControlIdSelected,
  ListElements,
  IndexElement
) {
  var FindElement = false;

  //console.log();
  if (storeControlIdSelected == "dataSelectedUsers") {
    for (let index = 0; index < list.length; index++) {
      if (
        list[index]["id_usuario"] == ListElements[IndexElement]["id_usuario"]
      ) {
        FindElement = true;
      }
    }
  }
  if (storeControlIdSelected == "dataSelectedEmp") {
    for (let index = 0; index < list.length; index++) {
      if (
        list[index]["id_empresa"] == ListElements[IndexElement]["id_empresa"]
      ) {
        FindElement = true;
      }
    }
  }
  if (storeControlIdSelected == "dataSelectedSector") {
    for (let index = 0; index < list.length; index++) {
      if (list[index]["id_sector"] == ListElements[IndexElement]["id_sector"]) {
        FindElement = true;
      }
    }
  }
  return FindElement;
}

function EditElement(tdRow, IndexElement, StoreListName, GroupDataId) {
  sessionStorage.setItem("Index", IndexElement);
  var td = tdRow.parentNode;
  var tr = td.parentNode;

  var Data = document.getElementById(GroupDataId).getElementsByTagName("div");
  for (let index = 0; index < tr.getElementsByTagName("td").length; index++) {
   // console.log(Data[index])
   // console.log(index)
    if (Data[index]) {      
      if (Data[index].getElementsByTagName("input")[0]) {
        if (Data[index].getElementsByTagName("input")[0].type != "button") {
          Data[index].getElementsByTagName(
            "input"
          )[0].value = tr.getElementsByTagName("td")[index].innerHTML;
        }
      }
      if (Data[index].getElementsByTagName("textarea")[0]) {      
          Data[index].getElementsByTagName(
            "textarea"
          )[0].innerText = tr.getElementsByTagName("td")[index].innerHTML;     
      }
      if (Data[index].getElementsByTagName("select")[0]) {
        var aTags = Data[index]
          .getElementsByTagName("select")[0]
          .getElementsByTagName("option");
        var searchText = tr.getElementsByTagName("td")[index].innerHTML;
        var found;
        for (var i = 0; i < aTags.length; i++) {
          if (aTags[i].textContent == searchText) {
            //console.log('encontrado');
            found = aTags[i].value;
            Data[index].getElementsByTagName("select")[0].value = found;
            // found.setAttribute('selected','true');
            break;
          }
        }
      }      
    }    
  }
  
  modalFunction("divModal_1");

  //definir nombres genericos
  var btnNew = document.getElementById("btnAgPreg_Data");
  var btnUpdate = document.getElementById("btnUpPreg_Data");
  btnNew.style.display = "none";
  btnUpdate.style.display = "inline-block";
  
}

function AddItem(
  newData,
  tblName,
  GroupDataId,
  StoreListName,
  editBtn,
  delBtn,
  storeControlId
) {
  StoreList = GetList(StoreListName, storeControlId);
  StoreList.push(newData);
  SaveList(StoreList, "", storeControlId);
  //console.log("lista");
  //console.log(Lista);

  //DrawTable(tblName, "", StoreListName, storeControlId, editBtn, GroupDataId, delBtn);
  /*por ultimo mandamos  y a limpiar los inputs con la funcion que habiamos 
    creado anteriormente ClearInputElement y se encuentra
    dentro de MyScript.js */
  ClearInputElement(GroupDataId);
}

function UpdateElement(
  updateElement,
  tblName,
  GroupDataId,
  StoreListName,
  editBtn,
  delBtn,
  storeControlId
) {
  indexElement = sessionStorage.getItem("Index");
  //console.log(indexElement);
  var Data = document.getElementById(GroupDataId).getElementsByTagName("div");
  //creacion del objeto producto y asignacion de sus valores
  //recordemos que debemos respetar la estructura del formulario, donde cada input debe estar contenido en un div

  StoreList = GetList(StoreListName, storeControlId);
  //console.log(StoreList);
  for (let index = 0; index < Object.keys(updateElement).length; index++) {
    prop = Object.keys(updateElement)[index];
    //console.log(prop);

    //console.log('la propiedad:  ' + StoreList[indexElement][prop]);
    StoreList[indexElement][prop] = Object.values(updateElement)[index];
  }

  SaveList(StoreList, "", storeControlId);
  DrawTable(
    tblName,
    "",
    StoreListName,
    storeControlId,
    editBtn,
    GroupDataId,
    delBtn
  );
  // StoreList
}

function inicializar(id) {
  $("#" + id).DataTable({
    autoWidth: false,
    //"info": false,
    //"sort": false,
    order: [[0, "asc"]],
    pagingType: "full_numbers",
    language: {
      info: "Registro _START_ a _END_ de _TOTAL_ Registros",
      infoEmpty: "Registro 0 a 0 de 0 deshueses",
      zeroRecords: "No se encontro coincidencia",
      infoFiltered: "(filtrado de _MAX_ registros en total)",
      emptyTable: '<i class="fa fa-folder-open "></i>',
      lengthMenu: "_MENU_ ",
      search: "Buscar:",
      loadingRecords: "...",
      paginate: {
        first: "Primera",
        last: "Última ",
        next: "Siguiente",
        previous: "Anterior"
      }
    }
  });
}
