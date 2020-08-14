function Render(Node) {
    //console.log(Node)
    if (typeof Node === "undefined") {
        return document.createTextNode("");
    }
    if (typeof Node === "string") {
        return document.createTextNode(Node);
    } 
    if (Node.tagName) {
        return Node;
    }   
    const element = document.createElement(Node.type);
    if (Node.props) {
        for (const prop in Node.props) {
            if (typeof Node.props[prop] === "function" 
                || typeof Node.props[prop] === "object" ) {
                element[prop] = Node.props[prop];
            }else {
                element.setAttribute(prop,Node.props[prop])
            }
        }
    }
    if (Node.children) {
        Node.children.map(Render)
        .forEach(Child => element.appendChild(Child));
    }
    return element;
}
export {Render}