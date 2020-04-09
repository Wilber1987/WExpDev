function dContainer(container) {
  // console.log(container)
  if (container.firstElementChild.style.display == 'block') {
    container.firstElementChild.style.display = 'none'
  }
  else if (container.firstElementChild.style.display == 'none') {
    container.firstElementChild.style.display = 'block'
  }
  //last
  if (container.lastElementChild.style.display == 'block') {
    container.lastElementChild.style.display = 'none'
  }
  else if (container.lastElementChild.style.display == 'none') {
    container.lastElementChild.style.display = 'block'
  }
}

function filtrarDatos(Canvas, datos, url, estadoColores, backgroud) {
  console.log("filtrar")
  //console.log("result.datos")

  $.post(url, datos, function (result) {
    //CONFIGURACION DEL GRAFICO ----- IGNORAR
    Chart.defaults.groupableBar = Chart.helpers.clone(Chart.defaults.bar);
    Chart.defaults.global.tooltips.enabled = false;

    var helpers = Chart.helpers;
    Chart.controllers.groupableBar = Chart.controllers.bar.extend({
      calculateBarX: function (index, datasetIndex) {
        // position the bars based on the stack index
        var stackIndex = this.getMeta().stackIndex;
        return Chart.controllers.bar.prototype.calculateBarX.apply(this, [
          index,
          stackIndex
        ]);
      },
      hideOtherStacks: function (datasetIndex) {
        var meta = this.getMeta();
        var stackIndex = meta.stackIndex;
        this.hiddens = [];
        for (var i = 0; i < datasetIndex; i++) {
          var dsMeta = this.chart.getDatasetMeta(i);
          if (dsMeta.stackIndex !== stackIndex) {
            this.hiddens.push(dsMeta.hidden);
            dsMeta.hidden = true;
          }
        }
      },
      unhideOtherStacks: function (datasetIndex) {
        var meta = this.getMeta();
        var stackIndex = meta.stackIndex;

        for (var i = 0; i < datasetIndex; i++) {
          var dsMeta = this.chart.getDatasetMeta(i);
          if (dsMeta.stackIndex !== stackIndex) {
            dsMeta.hidden = this.hiddens.unshift();
          }
        }
      },

      calculateBarY: function (index, datasetIndex) {
        this.hideOtherStacks(datasetIndex);
        var barY = Chart.controllers.bar.prototype.calculateBarY.apply(this, [
          index,
          datasetIndex
        ]);
        this.unhideOtherStacks(datasetIndex);
        return barY;
      },

      calculateBarBase: function (datasetIndex, index) {
        this.hideOtherStacks(datasetIndex);
        var barBase = Chart.controllers.bar.prototype.calculateBarBase.apply(
          this,
          [datasetIndex, index]
        );
        this.unhideOtherStacks(datasetIndex);
        return barBase;
      },

      getBarCount: function () {
        var stacks = [];
        // put the stack index in the dataset meta
        Chart.helpers.each(
          this.chart.data.datasets,
          function (dataset, datasetIndex) {
            var meta = this.chart.getDatasetMeta(datasetIndex);
            if (meta.bar && this.chart.isDatasetVisible(datasetIndex)) {
              var stackIndex = stacks.indexOf(dataset.stack);
              if (stackIndex === -1) {
                stackIndex = stacks.length;
                stacks.push(dataset.stack);
              }
              meta.stackIndex = stackIndex;
            }
          },
          this
        );

        this.getMeta().stacks = stacks;
        return stacks.length;
      }
    });
    //FIN ------ > CONFIGURACION DEL GRAFICO ----- IGNORAR
    var data = { labels: [], datasets: [] };
    // var estadoColores = ["Verde", "Naranja", "Fresa"];
    // var backgroud = ["#00e6cd", "#fffa58", "#ff8cc7"];
    // var stack = 0;
    // var stacksARRAY = ["SALUD", "Comerciante"];

    //dibujarTabla(result,estadoColores,Table);

    for (let years = 0; years < result.Labels.length; years++) {
      const element = result.Labels[years];
      data.labels.push(element.time);
    }
    var Labels = data.labels;
    console.log(data.labels)
    //COLORES-> SERIES
    for (let index = 0; index < estadoColores.length; index++) {
      const estado = estadoColores[index];
      //CATEGORIAS EMPRESAS/SECTORES....
      if (result.Labels2.length != 0) {
        for (let k = 0; k < result.Labels2.length; k++) {
          const categoria2 = result.Labels2[k];
          //CAT-SERIE UN OBJETO
          var objeto = {
            label: estado.Descripcion,
            backgroundColor: backgroud[index], //"rgba(99,132,255,0.2)",
            data: [],
            stack: ""
          };
          // STACK EMPRESAS/SECTORES....
          objeto.stack = categoria2.categ;
          // SE CREAN LOS DATOS DE CADA LABEL TRIMES, ANOS, MESES
          for (let j = 0; j < result.Labels.length; j++) {
            const time = result.Labels[j];
            //POR CADA LABEL SE BUSCA EL DATO EN EL RESULT.DATOS
            var obj = FindElementInListTest(
              categoria2,
              result.datos,
              estado.id_,
              time
            );
            if (obj) {
              // SI EL DATO ES ENCONTRADO HACEMOS PUSH DE ESE DATO
              objeto.data.push(obj.cantidad);
            } else {
              // SI NO HACEMOS PUSH DE UN DATO 0
              objeto.data.push(0);
            }
          }
          data.datasets.push(objeto);
        }
      } else {
        var objeto = {
          label: estado.Descripcion,
          backgroundColor: backgroud[index], //"rgba(99,132,255,0.2)",
          data: [],
          stack: ""
        };
        // STACK EMPRESAS/SECTORES....
        objeto.stack = 0;
        // SE CREAN LOS DATOS DE CADA LABEL TRIMES, ANOS, MESES
        for (let j = 0; j < result.Labels.length; j++) {
          const time = result.Labels[j];
          //POR CADA LABEL SE BUSCA EL DATO EN EL RESULT.DATOS
          var obj = FindElementInList(result.datos, estado.id_, time);
          if (obj) {
            // SI EL DATO ES ENCONTRADO HACEMOS PUSH DE ESE DATO
            objeto.data.push(obj.cantidad);
          } else {
            // SI NO HACEMOS PUSH DE UN DATO 0
            objeto.data.push(0);
          }
        }
        data.datasets.push(objeto);
      }
    }
    console.log(data.datasets)

    var auxiliar = [];
    var estadoInicial = "";
    var bandera = false;
    for (let index = 0; index < data.datasets.length; index++) {
      //ordenamos los elementos primeros elementos para que la grafica dibuje correctamente los labels superiores
      const element = data.datasets[index];
      if (element.label != estadoInicial) {
        auxiliar.push(element);
        estadoInicial = element.label;
      }
    }
    for (let index = 0; index < data.datasets.length; index++) {
      //terminamos de insertar los elementos restantes en el array
      const element = data.datasets[index];
      var obj = FindElementIn(element, auxiliar);
      if (obj) {
        //objeto.data.push(obj.cantidad);
      } else {
        auxiliar.push(element);
      }
    }
    data.datasets = auxiliar;
    //console.log(data.datasets)

    var TypeBar = "groupableBar";
    if (Labels.length > 4) {
      TypeBar = "horizontalBar";
    }

    var myChart = GetObj(Canvas);
    if (myChart) {
      var ContainerChar = GetObj(Canvas + "Cont");
      ContainerChar.removeChild(myChart);
      var myChart = document.createElement("canvas");
      myChart.id = Canvas;
      myChart.className = "MyCharCM";
      // myChart.style.width = "100%";
      // myChart.style.height = "350px";
      ContainerChar.append(myChart);
    }
   
    var ctx = document.getElementById(Canvas).getContext("2d");
   // console.log(ctx)
    myChart = new Chart(ctx, {
      type: TypeBar,
      data: data,
      options: {
        legend: {
          onClick: null,
          tooltips: {
            enabled: false
          },
          labels: {
            generateLabels: function (chart) {
              return Chart.defaults.global.legend.labels.generateLabels
                .apply(this, [chart])
                .filter(function (item, i) {
                  return i <= 2;
                });
            }
          }
        },
        responsive: true,
        scales: {
          xAxes: [
            {
              ticks: {
                padding: 19
              },
              stacked: true
            }
          ]
        },
        hover: { animationDuration: 0 },
        animation: {
          onComplete: function () {
            var chartInstance = this.chart;
            var ctx = chartInstance.ctx;
            ctx.textAlign = "left";
            ctx.font = "10px Open Sans";
            ctx.fillStyle = "#fff";

            var ctxLabel = chartInstance.ctx;
            ctxLabel.textAlign = "left";
            ctxLabel.font = "9px Open Sans";
            ctxLabel.fillStyle = "#000";

            Chart.helpers.each(
              this.data.datasets.forEach(function (dataset, i) {               
                var meta = chartInstance.controller.getDatasetMeta(i);
                if (result.Labels2 != 0) {
                  label = dataset.stack;
                } else {
                  label = "";
                }

                var bandera = true;
                Chart.helpers.each(
                  meta.data.forEach(function (bar, index) {
                    data = dataset.data[index];
                    // console.log(data)
                    if (data != 0) {
                      //ctx.fillStyle = "#fff";
                      ctx.font = "12px  Montserrat-Medium";
                      var anchoBarra = bar._model.width;
                      var canvas = document.getElementById(Canvas);
                      var context = canvas.getContext("2d");
                      var maxWidth = anchoBarra * 0.8; //400;
                      var lineHeight = 9;
                      var x = bar._model.x - anchoBarra / 2 + anchoBarra * 0.1;
                      var y = bar._chart.height - 40;
                      context.font = "9px Montserrat-Medium";
                      context.fillStyle = "black";
                      var texto = label;
                      texto = texto.substring(0, 10);
                      if (datos.selectPorcentaje == 1) {
                        Elemento = {
                          stack: dataset.stack,
                          label: Labels[index]
                        };
                        var total = FindTotal(Elemento, result.totales);
                        data = Math.round((data / total.cantidad) * 100);
                        if (Labels.length > 4) {
                          //var x = bar._model.base;//0 +(40);
                          //var y = bar._model.y;
                          texto = texto.substring(0, 10);
                          ctx.fillText(
                            texto + " " + data + "%",
                            bar._model.base + 5,
                            bar._model.y
                          );
                        } else {
                          ctx.fillText(
                            data + "%",
                            bar._model.x - 15,
                            bar._model.y + 10
                          );
                          wrapText(context, texto, x, y, maxWidth, lineHeight);
                        }
                      } else if (datos.selectPorcentaje == 2) {
                        if (Labels.length > 4) {
                          texto = texto.substring(0, 10);
                          ctx.fillText(
                            texto + " - " + data,
                            bar._model.base + 5,
                            bar._model.y
                          );
                        } else {
                          ctx.fillText(
                            data,
                            bar._model.x - 15,
                            bar._model.y + 10
                          );
                          wrapText(context, texto, x, y, maxWidth, lineHeight);
                        }
                      }
                    }
                  }),
                  this
                );
                bandera = true;
              }),
              this
            );
          }
        }
      },
      pointLabelFontFamily: "Montserrat-Medium",
      scaleFontFamily: "Montserrat-Medium"
    });
   // console.log(myChart)
    //mandar a cargar la tabla
    if (datos.tableName) {
      if (datos.Analisis == 0) {
        dibujarTabla(estadoColores, datos.tableName, result)
      } else {
        dibujarTabla2(estadoColores, datos.tableName, result)
      }
    }
  });
}

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
          var numero =  FindElementTable(result.Datasets, elementTime[result.AttNameG1], element.id_,ArrayCategElement, result,ArrayCategElement3);
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
}/**********END CONSTRUCCION DE TABLA2***********/



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
        var numero =  FindElementTable(config.Datasets, elementTime[config.AttNameG1], element.id_,null, config,null);
        //var numero = sumarElement(config.Datasets, elementTime[config.AttNameG1], element.id_,null, config,null);
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
  } /**********END CONSTRUCCION DE TABLA1***********/
  
  function FindElementTable(list,elementTime, element, ArrayCategElement, Config, ArrayCategElement3) {    

    var FindElement = {cantidad: 0}; 
        for (let index = 0; index < list.length; index++) {
         
            if (list[index][Config.AttNameG3]) { 
              
                if (list[index][Config.AttNameG1] ==elementTime  &&
                     list[index][Config.AttNameG2] == ArrayCategElement &&
                      list[index][Config.AttNameG3] == ArrayCategElement3 && 
                      list[index][Config.AttNameEval] == element ) {                    
                    FindElement = list[index];
                }  
            }else if (list[index][Config.AttNameG2]) {          
           //   console.log(list[index][Config.AttNameG1]+" == "+elementTime+" && "+list[index][Config.AttNameG2]+" == "+ArrayCategElement+" && "+list[index][Config.AttNameEval]+" == "+element);
                if (list[index][Config.AttNameG1] == elementTime && 
                    list[index][Config.AttNameG2] == ArrayCategElement  &&
                     list[index][Config.AttNameEval] == element) {
                    FindElement = list[index];                                
                }  
            }else{                           
             // console.log(list[index][Config.AttNameG1]+" == "+elementTime+" && "+list[index][Config.AttNameEval]+" == "+element)
               
             console.log(list[index][Config.AttNameG1])
             console.log(elementTime)
             if (list[index][Config.AttNameG1] == elementTime &&
                     list[index][Config.AttNameEval] == element) {
                    FindElement = list[index];                                
                }
            }                          
        }
    return FindElement.cantidad;
}


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
  
  
    for (let z = 0; z < arregloCategoria.length; z++) {//estados
      const element = arregloCategoria[z];
      var trD = document.createElement("tr");
      var td = document.createElement("td");
      td.innerHTML = element.Descripcion;
      td.style = "font-weight:bold !important";
      trD.append(td);
      var pasado = null;
      for (let index = 0; index < ArrayCateg.length; index++) {//categ
        const ArrayCategElement = ArrayCateg[index][config.AttNameG2];
        //console.log(ArrayCateg[index])
       //console.log(config)
        for (let index = 0; index < config.GroupDataset.length; index++) {//tiempo
          const elementTime = config.GroupDataset[index];
          var td = document.createElement("td");
          //var numero = sumarElement(result.datos, elementTime[config.AttNameG1], element.id_, ArrayCategElement);
          //var total = sumarTotal(result.datos, elementTime[config.AttNameG1], ArrayCategElement);
          //sumarElement(config.Datasets, elementTime[config.AttNameG1], element.id_,ArrayCategElement, config,null);
          var numero =  FindElementTable(config.Datasets, elementTime[config.AttNameG1], element.id_,ArrayCategElement, config,null);
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
      const ArrayCategElement = ArrayCateg[index][config.AttNameG2];
      //console.log(ArrayCategElement)
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
  
  } /**********END CONSTRUCCION DE TABLA2***********/




  
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
function wrapText(context, text, x, y, maxWidth, lineHeight) {
  var words = text.split(' ');
  var line = '';

  for (var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var metrics = context.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    }
    else {
      line = testLine;
    }
  }
  context.fillStyle = "#000";
  context.fillText(line, x, y);

}

