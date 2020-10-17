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
    static CreateStringNode = async(string) => {
        let node = document.createRange().createContextualFragment(string);
        return node;
    }
    static createElement = async(Node) => {
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
            Node.children.map(createElement)
                .forEach(Child => element.appendChild(Child));
        }
        if (typeof Node.events !== 'undefined' || Node.events != null) {
            for (const event in Node.events) {
                if (typeof Node.events[event] !== 'undefined') {
                    if (!event.includes("Params")) {
                        element.addEventListener(event,
                            Node.events[event](Node.events[event + "Params"])
                        );
                    }
                }
            }
        }
        return element;
    }
    static createElementNS = async(node) => {
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
                .map(createElementNS)
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
            ContainerNavigate.append(createElement(ComponentsInstance));
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
            this.NavForm[IdComponent] = createElement(ComponentsInstance);
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


if (typeof module !== 'undefined' && module.exports) {
    console.log(module)
    console.log(module.exports)
}
export { WAjaxTools, WRender, DomComponent }