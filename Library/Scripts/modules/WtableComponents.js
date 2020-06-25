// class ChartConfig {
//   constructor(Config) {
//     this.ContainerName = Config.ContainerName;
//     this.Title = Config.Title;
//     this.GroupDataset = Config.GroupDataset; //primera agrupacion
//     this.SecondGroupDataset = Config.SecondGroupDataset; //segunda agrupacion
//     this.ThreeGroupDataset = Config.ThreeGroupDataset; //triple agrupacion
//     this.GroupLabelsData = Config.GroupLabelsData; //series
//     this.Datasets = Config.Datasets; //datos
//     this.Colors = Config.Colors;
//     this.GroupDataTotals = Config.GroupDataTotals;
//     this.ContainerSize = Config.ContainerSize;
//     this.ColumnLabelDisplay = Config.ColumnLabelDisplay;
//   }
// }

function dibujarTabla3(tableID, result) {
  var arregloCategoria = result.GroupLabelsData;
  /**********CONSTRUCCION DE TABLA***********/

  //var ArrayCateg = result.SecondGroupDataset;

  var myThead = GetObj(tableID).querySelector("thead");
  myThead.innerHTML = "";
  var tr = document.createElement("tr");
  var tr2 = document.createElement("tr");
  var tr0 = document.createElement("tr");

  var tr3 = document.createElement("tr");

  myThead.append(tr3, tr0, tr, tr2);
  var th3 = document.createElement("th");
  th3.innerHTML = "A. Especifico";

  var th0 = document.createElement("th");
  th0.innerHTML = "A. Basico";
  var th = document.createElement("th");
  th.innerHTML = "Evolución";
  var th2 = document.createElement("th");
  th2.innerHTML = "";
  th2.style = "font-weight:bold !important";
  tr0.append(th0);
  tr.append(th);
  tr2.append(th2);
  tr3.append(th3);

  //CONSTRUIR CABECERA
  var ArrayCateg2 = result.SecondGroupDataset; //SEGUNDA AGRUPACION
  var ArrayCateg3 = result.ThreeGroupDataset; //tercera AGRUPACION
  //console.log(ArrayCateg3)
  for (let index3 = 0; index3 < ArrayCateg3.length; index3++) {
    const ArrayCategElement3 = ArrayCateg3[index3][result.AttNameG3];
    //alert(ArrayCategElement3)
    for (let index = 0; index < ArrayCateg2.length; index++) {
      const ArrayCategElement = ArrayCateg2[index][result.AttNameG2];
      //console.log(ArrayCategElement)
      var colSpan = 0;
      for (let z = 0; z < result.GroupDataset.length; z++) {
        const element = result.GroupDataset[z];
        var th = document.createElement("th");
        th.innerHTML = element[result.AttNameG1];
        th.setAttribute("colspan", "2");
        tr.append(th);
        var th2 = document.createElement("th");
        th2.innerHTML = "total";
        tr2.append(th2);
        var th3 = document.createElement("th");
        th3.innerHTML = "%";
        tr2.append(th3);
        if (z > 0) {
          th.setAttribute("colspan", "3");
          var th2 = document.createElement("th");
          th2.innerHTML = "Incre.";
          tr2.append(th2);
          colSpan = colSpan + 3;
        } else {
          colSpan = colSpan + 2;
        }
      }

      var thCateg = document.createElement("th");
      thCateg.setAttribute("colspan", colSpan);
      thCateg.innerHTML = ArrayCategElement;
      tr0.append(thCateg);
    }

    var thCateg3 = document.createElement("th");
    thCateg3.setAttribute("colspan", colSpan * 2);
    thCateg3.innerHTML = ArrayCategElement3;
    tr3.append(thCateg3);
  }

  //CONSTRUIR BODY
  var myTbody = GetObj(tableID).querySelector("tbody");
  myTbody.innerHTML = "";

  for (let z = 0; z < arregloCategoria.length; z++) {
    //console.log(arregloCategoria)
    const element = arregloCategoria[z];
    var trD = document.createElement("tr");
    var td = document.createElement("td");
    td.innerHTML = element.Descripcion;
    td.style = "font-weight:bold !important";
    trD.append(td);
    var pasado = null;
    //console.log(arregloCategoria)
    for (let index3 = 0; index3 < ArrayCateg3.length; index3++) {
      const ArrayCategElement3 = ArrayCateg3[index3][result.AttNameG3];

      for (let index = 0; index < ArrayCateg2.length; index++) {
        const ArrayCategElement = ArrayCateg2[index][result.AttNameG2]; //ArrayCateg[index].categ;

        for (let index = 0; index < result.GroupDataset.length; index++) {
          const elementTime = result.GroupDataset[index];
          //console.log(result)
          var td = document.createElement("td");
          var numero = sumarElement(
            result.Datasets,
            elementTime[result.AttNameG1],
            element.id_,
            ArrayCategElement,
            result,
            ArrayCategElement3
          );
          var total = sumarTotal(
            result.GroupDataTotals,
            elementTime[result.AttNameG1],
            ArrayCategElement,
            ArrayCategElement3,
            result
          );
          td.innerHTML = numero; ///****
          trD.append(td);
          var td = document.createElement("td");
          td.innerHTML = Math.round((numero / total) * 100) + "%";
          trD.append(td);
          if (index > 0) {
            var tdIn = document.createElement("td");
            if (pasado == 0) {
              var divisor = 1;
            } else {
              divisor = pasado;
            }
            tdIn.innerHTML =
              Math.round(((numero - pasado) / divisor) * 100) + "%";
            trD.append(tdIn);
          }
          pasado = Math.round(numero);
        }
      }
    }
    myTbody.append(trD);
  }

  //CONSTRUIR FOOTER
  var trT = document.createElement("tr");
  var tdT = document.createElement("td");
  tdT.innerHTML = "Totales";
  tdT.style = "font-weight:bold !important";
  trT.append(tdT);
  myTbody.append(trT);
  pasado = null;
  for (let index = 0; index < ArrayCateg2.length; index++) {
    const ArrayCategElement = ArrayCateg2[index][result.AttNameG2];

    for (let index3 = 0; index3 < ArrayCateg3.length; index3++) {
      //terer grupo
      const ArrayCategElement3 = ArrayCateg3[index3][result.AttNameG3];

      for (let z = 0; z < result.GroupDataset.length; z++) {
        const elementTime = result.GroupDataset[z];
        //console.log(ArrayCategElement)
        var total = sumarTotal(
          result.Datasets,
          elementTime[result.AttNameG1],
          ArrayCategElement,
          ArrayCategElement3,
          result
        );
        var td = document.createElement("td");
        td.innerHTML = Math.round(total);
        trT.append(td);
        var td = document.createElement("td");
        td.innerHTML = "100%";
        trT.append(td);
        if (z > 0) {
          var tdIn = document.createElement("td");
          if (pasado == 0) {
            var divisor = 1;
          } else {
            divisor = pasado;
          }

          tdIn.innerHTML = Math.round(((total - pasado) / divisor) * 100) + "%";
          trT.append(tdIn);
        }
        pasado = total;
      }
    } //end tercer grupo
  }
}


function sumarElement(
  list,
  time,
  categoria,
  categ = null,
  result,
  categ3 = null
) {
  var total = 0;
  for (let index = 0; index < list.length; index++) {
    if (categ3 != null) {
      if (
        list[index][result.AttNameG1] == time &&
        list[index][result.AttNameG2] == categ &&
        list[index][result.AttNameG3] == categ3 &&
        list[index][result.AttNameEval] == categoria
      ) {
        total = total + list[index]["cantidad"];
      }
    } else if (categ != null) {
      if (
        list[index][result.AttNameG1] == time &&
        list[index][result.AttNameG2] == categ &&
        list[index][result.AttNameEval] == categoria
      ) {
        total = total + list[index]["cantidad"];
      }
    } else {
      if (
        list[index][result.AttNameG1] == time &&
        list[index][result.AttNameEval] == categoria
      ) {
        total = total + list[index]["cantidad"];
      }
    }
  }
  return total;
}

function sumarTotal(list, time, categ = null, categ3 = null, result) {
  var total = 0;
  for (let index = 0; index < list.length; index++) {
    if (categ3 != null) {
      if (
        list[index][result.AttNameG1] == time &&
        list[index][result.AttNameG2] == categ &&
        list[index][result.AttNameG3] == categ3
      ) {
        total = total + list[index]["cantidad"];
      }
    } else if (categ != null) {
      if (
        list[index][result.AttNameG1] == time &&
        list[index][result.AttNameG2] == categ
      ) {
        total = total + list[index]["cantidad"];
      }
    } else {
      if (list[index][result.AttNameG1] == time) {
        total = total + list[index]["cantidad"];
      }
    }
  }
  return total;
}

function dibujarTabla(tableID, config) {
    /**********CONSTRUCCION DE TABLA***********/
    var arregloCategoria = config.GroupLabelsData;
    var myThead = GetObj(tableID).querySelector("thead");
    myThead.innerHTML = "";
  
    var tr = document.createElement("tr");
    var tr2 = document.createElement("tr");
    myThead.append(tr, tr2);
    var th = document.createElement("th");
    th.innerHTML = "Evolución";
    var th2 = document.createElement("th");
    th2.innerHTML = "";
    th2.style = "font-weight:bold !important";
    tr.append(th);
    tr2.append(th2);
  
    for (let z = 0; z < config.GroupDataset.length; z++) {
      const element = config.GroupDataset[z];
      var th = document.createElement("th");
      th.innerHTML = element[config.AttNameG1];
      th.setAttribute("colspan", "2");
      tr.append(th);
  
      var th2 = document.createElement("th");
      th2.innerHTML = "total";
      tr2.append(th2);
      var th3 = document.createElement("th");
      th3.innerHTML = "%";
      tr2.append(th3);
      if (z > 0) {
        th.setAttribute("colspan", "3");
        var th2 = document.createElement("th");
        th2.innerHTML = "Incre.";
        tr2.append(th2);
      }
    }
    var myTbody = GetObj(tableID).querySelector("tbody");
    myTbody.innerHTML = "";
    for (let z = 0; z < arregloCategoria.length; z++) {
      const element = arregloCategoria[z];
      var trD = document.createElement("tr");
      var td = document.createElement("td");
      td.innerHTML = element.Descripcion;
      td.style = "font-weight:bold !important";
      trD.append(td);
  
      var pasado = null;
      for (let index = 0; index < config.GroupDataset.length; index++) {
        const elementTime = config.GroupDataset[index];
        var td = document.createElement("td");
        var numero = sumarElement(config.Datasets, elementTime[config.AttNameG1], element.id_,null, config,null);
        //var numero = sumarElement(config.Datasets, elementTime[config.AttNameG1], element.id_, ArrayCategElement,config, ArrayCategElement3);              
  
        var total = sumarTotal(config.Datasets, elementTime[config.AttNameG1],null,null,config);
        //var total = sumarTotal(config.GroupDataTotals, elementTime[config.AttNameG1],ArrayCategElement ,ArrayCategElement3, config);
  
        td.innerHTML = numero;
        trD.append(td);
        var td = document.createElement("td");
        td.innerHTML = Math.round((numero / total) * 100) + "%";
        trD.append(td);
        if (index > 0) {
          //console.log(pasado)
          //console.log(numero)
          var tdIn = document.createElement("td");
          if (pasado == 0) {
            var divisor = 1;
          } else {
            divisor = pasado;
          }
          tdIn.innerHTML = Math.round(((numero - pasado) / divisor) * 100) + "%";//dibuja incremental
          //console.log(tdIn.innerHTML)
          trD.append(tdIn);
        }
        pasado = Math.round(numero);
      }
  
      myTbody.append(trD);
    }
    var trT = document.createElement("tr");
    var tdT = document.createElement("td");
    tdT.innerHTML = "Totales";
    tdT.style = "font-weight:bold !important";
    trT.append(tdT);
    myTbody.append(trT);
    pasado = null;
    for (let z = 0; z < config.GroupDataset.length; z++) {
      const elementTime = config.GroupDataset[z];
      //var total = sumarTotal(config.Datasets, elementTime[config.AttNameG1]);
      var total = sumarTotal(config.Datasets, elementTime[config.AttNameG1],null,null,config);
      var td = document.createElement("td");
      td.innerHTML = Math.round(total);
      trT.append(td);
      var td = document.createElement("td");
      td.innerHTML = "100%";
      trT.append(td);
      if (z > 0) {
        var tdIn = document.createElement("td");
        tdIn.innerHTML = Math.round(((total - pasado) / pasado) * 100) + "%";
        trT.append(tdIn);
      }
      pasado = total;
    }
  } /**********END CONSTRUCCION DE TABLA***********/
  
  function dibujarTabla2(tableID, config) {
    /**********CONSTRUCCION DE TABLA***********/
    var arregloCategoria = config.GroupLabelsData;    
    var ArrayCateg = config.SecondGroupDataset;

    var myThead = GetObj(tableID).querySelector("thead");
    myThead.innerHTML = "";
    var tr = document.createElement("tr");
    var tr2 = document.createElement("tr");
    var tr0 = document.createElement("tr");
    myThead.append(tr0, tr, tr2);
    var th0 = document.createElement("th");
    th0.innerHTML = "Análisis";
    var th = document.createElement("th");
    th.innerHTML = "Evolución";
    var th2 = document.createElement("th");
    th2.innerHTML = "";
    th2.style = "font-weight:bold !important";
    tr0.append(th0);
    tr.append(th);
    tr2.append(th2);
  
    //CONSTRUIR CABECERA 
    for (let index = 0; index < ArrayCateg.length; index++) {
      const ArrayCategElement = ArrayCateg[index][config.AttNameG2];
      var colSpan = 0;
      for (let z = 0; z < config.GroupDataset.length; z++) {
        const element = config.GroupDataset[z];
        var th = document.createElement("th");
        th.innerHTML = element[config.AttNameG1];
        th.setAttribute("colspan", "2");
        tr.append(th);
        var th2 = document.createElement("th");
        th2.innerHTML = "total";
        tr2.append(th2);
        var th3 = document.createElement("th");
        th3.innerHTML = "%";
        tr2.append(th3);
        if (z > 0) {
          th.setAttribute("colspan", "3");
          var th2 = document.createElement("th");
          th2.innerHTML = "Incre.";
          tr2.append(th2);
          colSpan = colSpan + 3;
        } else {
          colSpan = colSpan + 2;
        }
      }
      var thCateg = document.createElement("th");
      thCateg.setAttribute("colspan", colSpan);
      thCateg.innerHTML = ArrayCategElement;
      tr0.append(thCateg);
    }
  
    //CONSTRUIR BODY    
    var myTbody = GetObj(tableID).querySelector("tbody");
    myTbody.innerHTML = "";
  
  
    for (let z = 0; z < arregloCategoria.length; z++) {
      const element = arregloCategoria[z];
      var trD = document.createElement("tr");
      var td = document.createElement("td");
      td.innerHTML = element.Descripcion;
      td.style = "font-weight:bold !important";
      trD.append(td);
      var pasado = null;
      for (let index = 0; index < ArrayCateg.length; index++) {
        const ArrayCategElement = ArrayCateg[index][config.ArrayCateg2];
        for (let index = 0; index < config.GroupDataset.length; index++) {
          const elementTime = config.GroupDataset[index];
          var td = document.createElement("td");
          //var numero = sumarElement(result.datos, elementTime[config.AttNameG1], element.id_, ArrayCategElement);
          //var total = sumarTotal(result.datos, elementTime[config.AttNameG1], ArrayCategElement);
  
          var numero = sumarElement(config.Datasets, elementTime[config.AttNameG1], element.id_,ArrayCategElement, config,null);
          var total = sumarTotal(config.Datasets, elementTime[config.AttNameG1],ArrayCategElement,null,config);
  
  
          td.innerHTML = numero;
          trD.append(td);
          var td = document.createElement("td");
          td.innerHTML = Math.round((numero / total) * 100) + "%";
          trD.append(td);
          if (index > 0) {
            //console.log(pasado)
            //console.log(numero)
            var tdIn = document.createElement("td");
            if (pasado == 0) {
              var divisor = 1;
            } else {
              divisor = pasado;
            }
            tdIn.innerHTML = Math.round(((numero - pasado) / divisor) * 100) + "%";
            //console.log(tdIn.innerHTML)
            trD.append(tdIn);
          }
          pasado = Math.round(numero);
        }
      }
      myTbody.append(trD);
    }
  
    //CONSTRUIR FOOTER
    var trT = document.createElement("tr");
    var tdT = document.createElement("td");
    tdT.innerHTML = "Totales";
    tdT.style = "font-weight:bold !important";
    trT.append(tdT);
    myTbody.append(trT);
    pasado = null;
    for (let index = 0; index < ArrayCateg.length; index++) {
      const ArrayCategElement = ArrayCateg[index][config.ArrayCateg2];
      for (let z = 0; z < config.GroupDataset.length; z++) {
        const elementTime = config.GroupDataset[z];
        //var total = sumarTotal(config.Datasets, elementTime[config.AttNameG1], ArrayCategElement);
        var total = sumarTotal(config.Datasets, elementTime[config.AttNameG1],ArrayCategElement,null,config);
        
        var td = document.createElement("td");
        td.innerHTML = Math.round(total);
        trT.append(td);
        var td = document.createElement("td");
        td.innerHTML = "100%";
        trT.append(td);
        if (z > 0) {
          var tdIn = document.createElement("td");
          tdIn.innerHTML = Math.round(((total - pasado) / pasado) * 100) + "%";
          trT.append(tdIn);
        }
        pasado = total;
      }
    }
  
  } /**********END CONSTRUCCION DE TABLA***********/
  