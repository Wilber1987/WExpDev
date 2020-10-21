function DisplayAcordeon(value, SectionId, size = null) {
    console.log(value)
    if (size == null) {
        size = "500px";
    }
    // var ventanaM = document.getElementById(idModal);
    var acc = document.getElementsByClassName("GroupFormAcordeon");
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
class WAjaxTools {
    constructor() {}
    static PostRequest = async(Url, Data = {}) => {
        try {
            let response = await fetch(Url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(Data)
            });
            if (response.status == 404 || response.status == 500) {
                console.log("ocurrio un error: " + response.status);
                if (typeof responseLocal !== "undefined" && typeof responseLocal !== "null" && responseLocal != "") {
                    return this.LocalData(Url);
                } else {
                    return [];
                }
            } else {
                response = response.json();
                localStorage.setItem(Url, JSON.stringify(response));
                return response;
            }
        } catch (error) {
            if (error == "TypeError: Failed to fetch") {
                return this.LocalData(Url);
            }
        }
    }
    static GetRequest = async(Url) => {
        try {
            let response = await fetch(Url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            if (response.status == 404 || response.status == 500) {
                console.log("ocurrio un error: " + response.status);
                if (typeof responseLocal !== "undefined" && typeof responseLocal !== "null" && responseLocal != "") {
                    return this.LocalData(Url);
                } else {
                    return [];
                }
            } else {
                response = await response.json();
                localStorage.setItem(Url, JSON.stringify(response));
                return response;
            }
        } catch (error) {
            if (error == "TypeError: Failed to fetch") {
                return this.LocalData(Url);
            }
        }
    }
    LocalData = (Url) => {
        let responseLocal = localStorage.getItem(Url);
        return JSON.parse(responseLocal);
    }
}
class WRender {
    static CreateStringNode = (string) => {
        let node = document.createRange().createContextualFragment(string);
        return node;
    }
    static createElement = (Node) => {
        //console.log(Node)
        if (typeof Node === "undefined") {
            return document.createTextNode("");
        }
        if (typeof Node === "string") {
            return document.createTextNode(Node);
        }
        if (Node.type == "documentFragment") {
            return CreateStringNode(Node.stringFragment);
        }
        if (Node.tagName) {
            return Node;
        }
        const element = document.createElement(Node.type);
        if (Node.props) {
            for (const prop in Node.props) {
                if (prop == "class") {
                    element.className = Node.props[prop];
                } else {
                    element[prop] = Node.props[prop];
                }
            }
        }
        if (Node.children) {
            Node.children.forEach(Child => {
                element.appendChild(this.createElement(Child));
            });
        }
        if (typeof Node.events !== 'undefined' || Node.events != null) {
            //console.log(Node.events)
            for (const event in Node.events) {
                if (typeof Node.events[event] !== 'undefined') {
                    if (!event.includes("Params")) {
                        element.addEventListener(event, 
                           // () => {
                            //console.log(Node.events)
                            Node.events[event]//(Node.events[event + "Params"])
                        //}
                        );
                    }
                }
            }
        }
        return element;
    }
    static createElementNS = (node) => {
        if (typeof node === 'string') {
            return document.createTextNode(node)
        }
        const SVGN = "http:\/\/www.w3.org/2000/svg";
        const element = document.createElementNS(SVGN, node.type)
        if (node.props) {
            for (const prop in node.props) {
                if (typeof node.props[prop] === "function") {
                    element[prop] = node.props[prop];
                } else if (typeof node.props[prop] === 'object') {
                    element[prop] = node.props[prop];
                } else {
                    try {
                        element.setAttributeNS(null, prop, node.props[prop])
                    } catch (error) {
                        console.log(error);
                        element.setAttributeNS(SVGN, prop, node.props[prop]);
                    }
                }
            }
        }
        if (node.children) {
            node.children
                .map(this.createElementNS)
                .forEach(child => element.appendChild(child))
        }
        return element;
    }
}
class DomComponent {
    constructor() {
        this.NavForm = [];
        this.type = "form";
        this.props = {
            class: "MyForm"
        };
    }
    NavigateFunction = async(IdComponent, ComponentsInstance, ContainerName = "ContainerNavigate") => {
        //console.log(this.NavForm);
        const ContainerNavigate = document.querySelector("#" + ContainerName);
        let Nodes = ContainerNavigate.querySelectorAll(".DivContainer");
        Nodes.forEach((node) => {
            if (node.id != IdComponent) {
                this.NavForm[node.id] = node;
                if (ContainerNavigate.querySelector("#" + node.id)) {
                    ContainerNavigate.removeChild(node);
                }
            }
        });
        if (!ContainerNavigate.querySelector("#" + IdComponent)) {
            if (typeof this.NavForm[IdComponent] != "undefined") {
                ContainerNavigate.append(this.NavForm[IdComponent]);
                return;
            }
            ContainerNavigate.append(WRender.createElement(ComponentsInstance));
            return;
        }
    }
    ModalNavigateFunction = async(IdComponent, ComponentsInstance, ContainerName = "ContainerNavigate") => {
        const ContainerNavigate = document.querySelector("#" + ContainerName);
        if (!ContainerNavigate.querySelector("#" + IdComponent)) {
            if (typeof this.NavForm[IdComponent] != "undefined") {
                ContainerNavigate.append(this.NavForm[IdComponent]);
                setTimeout(
                    () => {
                        this.modalFunction(this.NavForm[IdComponent].id);
                    }, 100
                );
                return;
            }
            this.NavForm[IdComponent] = WRender.createElement(ComponentsInstance);
            ContainerNavigate.append(this.NavForm[IdComponent]);
            setTimeout(
                () => {
                    this.modalFunction(this.NavForm[IdComponent].id);
                }, 100
            );
            return;
        } else {
            this.NavForm[IdComponent] = ContainerNavigate.querySelector("#" + IdComponent);
            this.modalFunction(this.NavForm[IdComponent].id);
            setTimeout(
                () => {
                    ContainerNavigate.removeChild(this.NavForm[IdComponent]);
                }, 1000
            );
        }
    }
    _DispalNav(NavContainerId, NavAnimation) {
        let NavContainer = document.querySelector("#" + NavContainerId);
        let Nav = NavContainer.querySelector("ul");
        NavContainer.style.transition = "all 1s";
        Nav.style.transition = "all 1s";
        Nav.style.webkitTransform = "translateX(-100%)";
        if (NavContainer.style.opacity == 0) {
            NavContainer.style.pointerEvents = "all";
            NavContainer.style.opacity = 1;
            if (NavAnimation == "SlideLeft") {
                Nav.style.webkitTransform = "translateX(0%)";
            }
            if (NavAnimation == "SlideRight") {
                Nav.style.webkitTransform = "translateX(0%)";
            }
        } else {
            NavContainer.style.pointerEvents = "none";
            NavContainer.style.opacity = 0;
            if (NavAnimation == "SlideLeft") {
                Nav.style.webkitTransform = "translateX(-100%)";
            }
            if (NavAnimation == "SlideRight") {
                Nav.style.webkitTransform = "translateX(+100%)";
            }
        }
    }
    static modalFunction(DivModal) {
        var ventanaM = document.getElementById(DivModal);
        if (ventanaM.style.opacity == 0) {
            ventanaM.style.transition = "all ease 1s";
            ventanaM.style.display = "block";
            setTimeout(() => {
                ventanaM.style.opacity = 1;
            }, 100);
        } else {
            ventanaM.style.transition = "all ease 1s";
            ventanaM.style.opacity = 0;
            setTimeout(() => {
                ventanaM.style.display = "none";
            }, 1000);
        }
    }
}
class ArrayFunctions {
    static orderByDate(Arry, type) {
        var meses = [
            "enero", "febrero", "marzo",
            "abril", "mayo", "junio", "julio",
            "agosto", "septiembre", "octubre",
            "noviembre", "diciembre"
        ];
        if (type == 1) {
            Arry.sort((a, b) => a.time - b.time);
        } else if (type == 2) {
            Arry.forEach(element => {
                if (element.time.includes("diciembre")) {
                    var Year = new Date(Date.parse(element.time)).getFullYear();
                    element.time = Date.parse(Year + " December");
                } else element.time = Date.parse(element.time);
            });
            Arry.sort((a, b) => a.time - b.time);

            Arry.forEach(element => {
                var fecha = new Date(element.time);
                element.time = meses[fecha.getMonth()] + " " + fecha.getFullYear();
            });

        } else {
            var Array2 = [];
            Arry.forEach(element => {
                var object = {
                    cuarter: null,
                    year: null
                };
                object.cuarter = element.time.substring(1, 0);
                object.year = element.time.substring(element.time.length, 14);
                Array2.push(object);
            })
            Array2.sort((a, b) => a.year - b.year);
            var Array3 = [];
            Array2.forEach(element => {
                var object = Arry.find(x => x.time.substring(1, 0).includes(element.cuarter) &&
                    x.time.includes(element.year));
                Array3.push(object);
            });
            Arry = Array3;
        }
        return Arry;
    }
    static ArryUnique(DataArray, param, param2 = null, param3 = null) {
        if (typeof param3 !== 'undefined' && param3 != null && param3 != "") {
            let DataArraySR = DataArray.filter((ActalValue, ActualIndex, Array) => {
                return Array.findIndex(ArryValue =>
                    (JSON.stringify(ArryValue[param3]) ===
                        JSON.stringify(ActalValue[param3])) &&
                    (JSON.stringify(ArryValue[param2]) ===
                        JSON.stringify(ActalValue[param2])) &&
                    (JSON.stringify(ArryValue[param]) ===
                        JSON.stringify(ActalValue[param]))
                ) === ActualIndex
            });
            return DataArraySR;
        } else if (typeof param2 !== 'undefined' && param2 != null && param2 != "") {
            let DataArraySR = DataArray.filter((ActalValue, ActualIndex, Array) => {
                return Array.findIndex(ArryValue =>
                    (JSON.stringify(ArryValue[param2]) ===
                        JSON.stringify(ActalValue[param2])) &&
                    (JSON.stringify(ArryValue[param]) ===
                        JSON.stringify(ActalValue[param]))
                ) === ActualIndex
            });
            return DataArraySR;
        } else if (typeof param !== 'undefined' && param != null && param != "") {
            let DataArraySR = DataArray.filter((ActalValue, ActualIndex, Array) => {
                return Array.findIndex(ArryValue => JSON.stringify(ArryValue[param]) ===
                    JSON.stringify(ActalValue[param])) === ActualIndex
            });
            return DataArraySR;
        }
        return null;
    }
    static DataTotals(Config) {
        let UniqueTotals = this.ArryUnique(Config.Datasets, Config.AttNameG1, Config.AttNameG2, Config.AttNameG3);
        let Totals = [];
        if (typeof Config.AttNameG3 !== 'undefined' && Config.AttNameG3 != null && Config.AttNameG3 != "") {
            UniqueTotals.forEach(element => {
                let suma = 0;
                Config.Datasets.forEach(elementGroup => {

                    if (element[Config.AttNameG1] == elementGroup[Config.AttNameG1] &&
                        element[Config.AttNameG2] == elementGroup[Config.AttNameG2] &&
                        element[Config.AttNameG3] == elementGroup[Config.AttNameG3]) {
                        suma = suma + parseFloat(elementGroup[Config.EvalValue]);
                    }
                });
                let NewObj = {};
                NewObj[Config.AttNameG1] = element[Config.AttNameG1];
                NewObj[Config.AttNameG2] = element[Config.AttNameG2];
                NewObj[Config.AttNameG3] = element[Config.AttNameG3];
                NewObj[Config.EvalValue] = suma;
                Totals.push(NewObj);
            });
        } else if (typeof Config.AttNameG2 !== 'undefined' && Config.AttNameG2 != null && Config.AttNameG2 != "") {
            UniqueTotals.forEach(element => {
                let suma = 0;
                Config.Datasets.forEach(elementGroup => {

                    if (element[Config.AttNameG1] == elementGroup[Config.AttNameG1] &&
                        element[Config.AttNameG2] == elementGroup[Config.AttNameG2]) {
                        suma = suma + parseFloat(elementGroup[Config.EvalValue]);
                    }
                });
                let NewObj = {};
                NewObj[Config.AttNameG1] = element[Config.AttNameG1];
                NewObj[Config.AttNameG2] = element[Config.AttNameG2];
                NewObj[Config.EvalValue] = suma;
                Totals.push(NewObj);
            });
        } else if (typeof Config.AttNameG1 !== 'undefined' && Config.AttNameG1 != null && Config.AttNameG1 != "") {
            UniqueTotals.forEach(element => {
                let suma = 0;
                Config.Datasets.forEach(elementGroup => {

                    if (element[Config.AttNameG1] == elementGroup[Config.AttNameG1]) {
                        suma = suma + parseFloat(elementGroup[Config.EvalValue]);
                    }
                });
                let NewObj = {};
                NewObj[Config.AttNameG1] = element[Config.AttNameG1];
                NewObj[Config.EvalValue] = suma;
                Totals.push(NewObj);
            });
        }
        return Totals;
    }
    static MaxValue(DataArry, Config) {
        var Maxvalue = 0;
        for (let index = 0; index < DataArry.length; index++) {
            if (parseInt(DataArry[index][Config.EvalValue]) > Maxvalue) {
                Maxvalue = DataArry[index][Config.EvalValue];
            }
        }
        return Maxvalue;
    }
    static FindInTotal(Elemento, list, Config) {
            var FindElement = false;
            for (let index = 0; index < list.length; index++) {
                if (list[index][Config.AttNameG3]) {
                    if (list[index][Config.AttNameG1] == Elemento[Config.AttNameG1] &&
                        list[index][Config.AttNameG2] == Elemento[Config.AttNameG2] &&
                        list[index][Config.AttNameG3] == Elemento[Config.AttNameG3]) {
                        FindElement = list[index];
                    }
                } else if (list[index][Config.AttNameG2]) {
                    if (list[index][Config.AttNameG1] == Elemento[Config.AttNameG1] &&
                        list[index][Config.AttNameG2] == Elemento[Config.AttNameG2]) {
                        FindElement = list[index];
                    }
                } else {
                    if (list[index][Config.AttNameG1] == Elemento[Config.AttNameG1]) {
                        FindElement = list[index];
                    }
                }
            }
            return FindElement;
        }
        //reparar
    static SumValue(DataArry, Config) {
        var Maxvalue = 0;
        for (let index = 0; index < DataArry.length; index++) {
            Maxvalue = Maxvalue + parseFloat(DataArry[index][Config.EvalValue]);
        }
        return Maxvalue;
    }
}

export { WAjaxTools, WRender, DomComponent, ArrayFunctions }