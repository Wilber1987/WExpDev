//CARROSEL
function GetObj(id) {
  var Obj = document.getElementById(id);
  return Obj;
}

function autoplay(ContainerId) {
  var Container = GetObj(ContainerId).getElementsByTagName("div");
  //var Container2 = GetObj(ContainerId).getElementsByClassName('card_entrenamiento_fecha');
  //console.log(Container.length)
  // for (let index = 0; index < Container2.length; index++) {
  //   const element = Container2[index];
  //   element.style.display='inline-block';
  //   element.style.margin = '10px';

  // }
  //console.log(Container)
  if (Container.length > 1) {
    setTimeout(function() {
      myFunctionNext(ContainerId);
      autoplay(ContainerId);
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
  //console.log(widthAnimation)\
  slider.style.transition =  "all 1s";
  slider.style.webkitTransform =  "translateX(-" + widthAnimation + "px)";



  // slider.animate(
  //   [
  //     { '-webkit-transform' : "translateY(0px)" },
  //     { '-webkit-transform' : "translateX(-" + widthAnimation + "px)" }
  //   ],
  //   {
  //     duration: 1000
  //   }
  // );
  setTimeout(function() {
    slider.style.transition =  "none";
    slider.style.webkitTransform =  "translateX(-" + 0 + "px)";
    LastCard.parentNode.insertBefore(firstCard, LastCard.nextSibling);
  }, 1000);
}

function myFunctionPrev(ContainerId) {
  var slider = GetObj(ContainerId);
  var firstCard = slider.firstElementChild;
  var LastCard = slider.lastElementChild;
  var widthAnimation = firstCard.offsetWidth + 10;
//dfffffffffffffffffffffffffffffffffffffffffffffffffffffffffff

  slider.style.transition =  "all 1s";
  slider.style.webkitTransform =  "translateX(+" + widthAnimation + "px)";

  // slider.animate(
  //   [
  //     { '-webkit-transform': "translateY(0px)" },
  //     { '-webkit-transform': "translateX(+" + widthAnimation + "px)" }
  //   ],
  //   {
  //     duration: 1000
  //   }
  // );
  setTimeout(function() {
    slider.style.transition =  "none";
    slider.style.webkitTransform =  "translateX(+" + 0 + "px)";
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
    if (e.getElementsByTagName("textarea")[0]) {
      //console.log( e.getElementsByTagName("textarea")[0].innerText);
      e.getElementsByTagName("textarea")[0].value = "";
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

function DisplayAcordeon(value, SectionId, size = null) {
  if (size == null) {
    size = "500px";
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
}
function DisplayTab(value, SectionId, size = null) {
  if (size == null) {
    size = "500px";
  }
  //console.log(value);
  var acc = document.querySelectorAll("input[name="+value.name+"]");
  for (let index = 0; index < acc.length; index++) {
    const element = acc[index];
    element.parentNode.className = "";
  }
  //console.log(value.parentNode)
  value.parentNode.className = "ActiveTap";
  // var ventanaM = document.getElementById(idModal);
  var acc = document.getElementsByClassName("WTab");
  for (var i = 0; i < acc.length; i++) {
    ventanaM = acc[i];
    if (ventanaM.id != SectionId) {
      //  if (ventanaM.style.height != "300px") {
      ventanaM.style.transition = "all ease 1s";
      ventanaM.style.display = "none";
     
      //ventanaM.style.overflow = "scroll";
    } else {
      ventanaM.style.transition = "all ease 1s";
      ventanaM.style.display = "block";
      //value.parentNode.className = "ActiveTap";
      //ventanaM.style.height = size;
      //ventanaM.style.oveflow = "hidden";
    }
  }
}
function DisplayAcordeonF(value, SectionId, size = null) {
  //console.log("DisplayAcordeonF: " + SectionId);
  if (size == null) {
    size = "500px";
  }
  // var ventanaM = document.getElementById(idModal);
  var acc = document.getElementsByClassName("GrupFormAcordeon");
  for (var i = 0; i < acc.length; i++) {
    ventanaM = acc[i];

    //alert(ventanaM.id+" != "+SectionId)
    if (ventanaM.id != SectionId) {
      //  if (ventanaM.style.height != "300px") {
      ventanaM.style.transition = "all ease 1s";
      ventanaM.style.maxHeight = "0px";
      ventanaM.style.minHeight = "0px";
      //console.log(SectionId)
      //ventanaM.style.overflow = "scroll";
    } else {
      ventanaM.style.transition = "all ease 1s";
      ventanaM.style.maxHeight = "4000px";
      ventanaM.style.minHeight = "600px";
      //ventanaM.style.oveflow = "hidden";
    }
  }
}

function DisplayContainer(objId, size = null, maxSize = null) {
  if (size == null) {
    size = "50px";
  }
  if (maxSize == null) {
    maxSize = "500px";
  }
  container = GetObj(objId);
  //console.log(container.offsetHeight  +" + "+ parseInt(size.replace('px','')))
  if (
    container.style.maxHeight == size ||
    container.offsetHeight == parseInt(size.replace("px", ""))
  ) {
    container.style.transition = "all ease 1s";
    container.style.maxHeight = maxSize;
    //setTimeout(function () {
    container.style.overflow = "inherit";
    //},1000)
  } else {
    container.style.transition = "all ease 1s";
    container.style.maxHeight = size;
    container.style.overflow = "hidden";
    //console.log(container.style.overflow);
  }
}

//PRUEBAS JSON******************************************

var StoreList = [];

function GetList(StoreListName, storeControlId) {
  //console.log(storeControlId)
  var Lista = document.getElementById(storeControlId);
  //console.log(Lista)
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
        //console.log( tr.getElementsByTagName("td")[index].innerHTML)
        Data[index].getElementsByTagName(
          "textarea"
        )[0].value = tr.getElementsByTagName("td")[index].innerHTML;
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
  if (document.getElementById("btnAgPreg_Data")) {
    var btnNew = document.getElementById("btnAgPreg_Data");    
    btnNew.style.display = "none";
  }
  if (document.getElementById("btnUpPreg_Data")) {  
    var btnUpdate = document.getElementById("btnUpPreg_Data");
    btnUpdate.style.display = "inline-block";
  }
  
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
      zeroRecords: "No se encontró coincidencia",
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

//select
function DrawSelect(
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
  //console.log(list);
  for (var i = 0; i < list.length; i++) {
    var row = tbody.insertRow(i);
    var TdForRow = document.createElement("td");
    var LabelTd = document.createElement("label");
    LabelTd.for = list[i].id_ + "radio" + storeControlIdSelect;
    //LabelTd.innerText =
    for (var Propiedad in list[i]) {
      //console.log('....')
      if (Propiedad.includes("id_")) {
        //
      } else {
        //TdForRow.setAttribute("for",list[i].id_ +"radio")
        LabelTd.innerHTML = LabelTd.innerHTML + list[i][Propiedad];
        // `<label for="${list[i].id_}radio${storeControlIdSelect}">
        //     ${list[i][Propiedad]}
        // </label><span></span>`;
      }
    }
    row.appendChild(TdForRow);

    if (delBtn == 1 || editBtn == 1 || selectBtn == 1) {
      var tdForInput = document.createElement("td");
      if (selectBtn == 1) {
        //reparar
        var InputForRTSelect = document.createElement("Input");
        InputForRTSelect.type = "checkbox";
        //InputForRTSelect.checked = true;
        InputForRTSelect.setAttribute(
          "id",
          list[i].id_ + "radio" + storeControlIdSelect
        );
        InputForRTSelect.value = "Select";
        InputForRTSelect.className = "BTNForm colorFormA";

        InputForRTSelect.setAttribute(
          "onchange",
          "SelectMElement('" +
            i.toString() +
            "','" +
            StoreListName +
            "','" +
            storeControlId +
            "','" +
            storeControlIdSelect +
            "','" +
            "',this);" //filtrar los datos de los informes
        );
        //tdForInput.appendChild(InputForRTSelect);
        //tdForInput.append(document.createElement("span"));
        //tdForInput.style= "display: none";

        LabelTd.append(InputForRTSelect);
        LabelTd.append(document.createElement("span"));
        TdForRow.append(LabelTd);
      }
      //row.appendChild(tdForInput);
    }
    tbody.appendChild(row);
  }
  //console.log(storeControlIdSelect)
  reCheck(storeControlIdSelect);
}

function SelectMElement(
  IndexElement,
  storeControlIdSelected,
  storeControlId,
  storeControlIdSelect,
  TableNameSelected,
  e
) {
  // console.log(storeControlId + ' - '+ storeControlIdSelect)
  var ListElements = JSON.parse(document.getElementById(storeControlId).value);
  var elementSeleccionado = ListElements[IndexElement];
  //console.log(elementSeleccionado)
  var FindElement = false;
  if (e.checked == true) {
    var list = [];
    if (document.getElementById(storeControlIdSelect).value != "") {
      list = JSON.parse(document.getElementById(storeControlIdSelect).value);
      for (let index = 0; index < list.length; index++) {
        // console.log(list)
        // console.log(ListElements)
        if (list[index]["id_"] == elementSeleccionado.id_) {
          FindElement = true;
        }
      }
    }
    if (FindElement == false) {
      list.push(elementSeleccionado.id_);
      SaveList(list, "", storeControlIdSelect);
    } else {
      alert("elemento ya esta en lista");
    }
  } else {
    var list2 = [];
    //if (document.getElemeid_ntById(storeControlIdSelect).value != "") {
    list2 = JSON.parse(document.getElementById(storeControlIdSelect).value);
    for (let index = 0; index < list2.length; index++) {
      if (list2[index] == elementSeleccionado.id_) {
        list2.splice(index, 1);
      }
    }
    SaveList(list2, "", storeControlIdSelect);
  }
}
function reCheck(Selecteds) {
  //console.log(Selecteds)
  SelectedsObjs = JSON.parse(GetObj(Selecteds).value);
  //alert(Selecteds)
  var objSlice = SelectedsObjs.slice();
  for (let i = 0; i < SelectedsObjs.length; i++) {
    const Selected = SelectedsObjs[i];
    var control = document.getElementById(Selected + "radio" + Selecteds);
    // console.log("indice "+i+" id "+Selected+"radio"+Selecteds+" - "+control)
    if (control) {
      control.setAttribute("checked", "true");
    } else {
      for (let index = 0; index < objSlice.length; index++) {
        const element = objSlice[index];
        if (element == Selected) {
          objSlice.splice(index, 1);
        }
      }
    }
  }
  SaveList(objSlice, "", Selecteds);
}

function DrawMultiSelect(IdElement) {
  //Getconsole.log(GetObj(IdElement).value)
  if (GetObj(IdElement).type != "hidden") {
    console.log("no es hidden");
    return;
  }

  if (GetObj(IdElement + "Container")) {
    var divC = GetObj(IdElement + "Container");
    divC.className = "DivCM5 DisplaySelect";
    DrawSelect(
      "table_" + IdElement,
      "",
      "",
      IdElement + "Datos",
      0,
      "",
      0,
      1,
      IdElement
    );
    //console.log(divC);
  } else {
    var divC = document.createElement("div");
    divC.className = "DivCM5 DisplaySelect";
    divC.id = IdElement + "Container";
    var Container = GetObj(IdElement).parentNode;
    Container.append(divC);

    var LabelDiv = document.createElement("div");
    LabelDiv.className = "LabelSelectC";
    LabelDiv.innerHTML = IdElement;
    var divCDisplay = document.createElement("div");
    divCDisplay.className = "DisplaySelectC";
    divC.append(LabelDiv, divCDisplay);
    var tableSelect = document.createElement("Table");
    tableSelect.className = "TableSelectC";
    tableSelect.id = "table_" + IdElement;
    var tbody = document.createElement("tbody");
    tableSelect.append(tbody);
    divCDisplay.append(tableSelect);
    DrawSelect(
      tableSelect.id,
      "",
      "",
      IdElement + "Datos",
      0,
      "",
      0,
      1,
      IdElement
    );
  }
}
function DrawMultiSelect(IdElement, selectControl) {
  //recibe el id del elemento que contiene los datos y el select donde los va a dibujar


  //console.log(selectControl)
  if (GetObj(selectControl).type != "hidden") {
    // console.log("no es hidden");
    return;
  }
  if (GetObj(selectControl).id == "CentroValorVista") {
    //var Container = GetObj(selectControl).parentNode;
   // console.log(selectControl +" - "+IdElement);

    var control = GetObj(selectControl);   
    var controlDatos =  GetObj(IdElement);
    control.id = "CentroValorVista" + control.parentNode.id;
    controlDatos.id = "CentroValorVista" + control.parentNode.id + "Datos";
    selectControl = control.id;
    IdElement =   controlDatos.id;

  }
 // else{
  if (GetObj(IdElement + "Container")) {
      var divC = GetObj(IdElement + "Container");
      divC.className = "DivCM5 DisplaySelect";
      DrawSelect("table_" + IdElement, "","", IdElement, 0, "",0, 1,selectControl);    
      AsignarEvents(selectControl, "table_" + IdElement);
      //console.log(divC);
    } else {
      var divC = document.createElement("div");
      divC.className = "DivCM5 DisplaySelect";
      divC.id = IdElement + "Container";
      var Container = GetObj(selectControl).parentNode;
      Container.append(divC);

      var LabelDiv = document.createElement("div");
      LabelDiv.className = "LabelSelectC";
      LabelDiv.innerHTML = GetObj(selectControl).name;
      var divCDisplay = document.createElement("div");
      divCDisplay.className = "DisplaySelectC";
      divC.append(LabelDiv, divCDisplay);
      var tableSelect = document.createElement("Table");
      tableSelect.className = "TableSelectC TableMultiSelect";
      tableSelect.id = "table_" + IdElement;
      var tbody = document.createElement("tbody");
      tableSelect.append(tbody);
      divCDisplay.append(tableSelect);
      DrawSelect(tableSelect.id, "", "", IdElement, 0, "", 0, 1, selectControl);
      AsignarEvents(selectControl, "table_" + IdElement);
      var selects = tableSelect.querySelectorAll("input[type=checkbox]");
     
    }  
 // }

 
}

function DrawMenuMultiSelect(IdElement) {
  //console.log("DrawMenuMultiSelect: "+IdElement)//
  if (!GetObj(IdElement)){
    return null;
  }
  if (GetObj(IdElement + "Container")) {
    var divC = GetObj(IdElement + "Container");
    divC.className = "DivCM5 DisplaySelect";
    DrawSelect(
      "table_" + IdElement,
      "",
      "",
      IdElement + "Datos",
      0,
      "",
      0,
      1,
      IdElement
    );
    //console.log(divC);
  } else {
    var divC = document.createElement("div");
    divC.className = "DivCM5 DisplaySelect";
    divC.id = IdElement + "Container";
    var Container = GetObj(IdElement).parentNode;
    Container.append(divC);
    var divCDisplay = document.createElement("div");
    divCDisplay.className = "";
    divC.append(divCDisplay);
    var tableSelect = document.createElement("Table");
    tableSelect.className = "MenuTableSelectC";
    tableSelect.id = "table_" + IdElement;
    var tbody = document.createElement("tbody");
    tableSelect.append(tbody);
    divCDisplay.append(tableSelect);
    DrawSelect(
      tableSelect.id,
      "",
      "",
      IdElement + "Datos",
      0,
      "",
      0,
      1,
      IdElement
    );
    var selects = tableSelect.querySelectorAll("input[type=checkbox]");
    for (let index = 0; index < selects.length; index++) {
      const element = selects[index];
      element.checked = true;
      SelectMElement(index.toString(), "" , IdElement + "Datos" ,IdElement,'',element);            
    }
  }
}
function DrawGroupMultiSelect(IdElement) {
  // console.log(IdElement)
  if (GetObj(IdElement + "Container")) {
    var divC = GetObj(IdElement + "Container");
    divC.className = "DisplaySelectGroup";
    DrawSelect(
      "table_" + IdElement, "", "", IdElement + "Datos",  0, "",  0, 1, IdElement );
    //console.log(divC);
  } else {
    var divC = document.createElement("div");
    divC.className = "DisplaySelectGroup";
    divC.id = IdElement + "Container";
    var Container = GetObj(IdElement).parentNode;
    Container.append(divC);
    var LabelDiv = document.createElement("label");
    LabelDiv.className = "LabelSelectC";
    LabelDiv.innerText = GetObj(IdElement).name;
    LabelDiv.setAttribute( "for", IdElement + "ContainerCheck");  
    var InputForRTSelect = document.createElement("Input");
        InputForRTSelect.type = "checkbox";
        //InputForRTSelect.checked = true;
        InputForRTSelect.setAttribute(
          "id",
          IdElement + "ContainerCheck"
        );
        InputForRTSelect.value = "Select";
        InputForRTSelect.className = "BTNForm colorFormA";
        InputForRTSelect.setAttribute(
          "onchange",
          "DisplayContainer('"+IdElement+"Container','38px');SelectGroupMultiselect(this,"+IdElement+");"
        );
    LabelDiv.append(InputForRTSelect);
    LabelDiv.append(document.createElement("span"));   
    var divCDisplay = document.createElement("div");
    divCDisplay.className = "";
    divC.append(LabelDiv, divCDisplay);
    var tableSelect = document.createElement("Table");
    tableSelect.className = "TableSelectC";
    tableSelect.id = "table_" + IdElement;
    var tbody = document.createElement("tbody");
    tableSelect.append(tbody);
    divCDisplay.append(tableSelect);
    DrawSelect( tableSelect.id, "","", IdElement + "Datos", 0, "", 0,1, IdElement);
  }
  var selects = tableSelect.querySelectorAll("input[type=checkbox]");
  for (let index = 0; index < selects.length; index++) {
    const element = selects[index]; 
    element.addEventListener('change', function (e) {
      var containerGroupId = element.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id;
      var containerGroup = element.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
      var containerSelect = containerGroup.querySelectorAll('.DisplaySelectGroup');
      AutoDisplayGroupMultiselect(containerGroupId, containerSelect);
    })       
  }
}

function SelectGroupMultiselect(element, elementId){
      var containerGroupId = element.parentNode.parentNode.id;
      var containerGroup = element.parentNode.parentNode.parentNode;
      var containerSelect = containerGroup.querySelectorAll('.DisplaySelectGroup');    
      var checks = element.parentNode.parentNode.querySelectorAll('table input[type=checkbox]');     
      for (let index3 = 0; index3 < checks.length; index3++) {
        const check = checks[index3];
        if (element.checked == true) {
          check.checked = true; 
        }else {
          check.checked = false;
        }
        SelectMElement(index3.toString(), "" , elementId.id + "Datos" ,elementId.id,'',check);       
      }
      AutoDisplayGroupMultiselect(containerGroupId, containerSelect);

}

function AutoDisplayGroupMultiselect(containerGroupId, containerSelect) { 
  for (let index2 = 0; index2 < containerSelect.length; index2++) {
    const elementMultiSelect = containerSelect[index2];
    if(elementMultiSelect.id != containerGroupId){
      var checks = elementMultiSelect.querySelectorAll("input[type=checkbox]");
      for (let index3 = 0; index3 < checks.length; index3++) {
        const check = checks[index3];
        check.checked = false; 
      }
      var hidden = GetObj(elementMultiSelect.id.replace("Container", ""));
      hidden.value = "[]";
      elementMultiSelect.style = "transition: all 1s ease 0s; max-height: 38px; overflow: hidden;";
    }        
  }  
}