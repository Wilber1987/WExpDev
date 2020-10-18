class ForosView {
    constructor(props) {
        this.type = "div";
        this.props = props;
        this.children = [];
        this.children.push({
            type: 'h3',
            props: { id: "", class: "" },
            children: ["Mis Módulos"]
        });
    }
    StartModuleList = () => {}
}
export { ForosView }