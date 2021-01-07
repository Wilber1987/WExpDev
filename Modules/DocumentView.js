export default class DocumentView {
    constructor(props) {
        this.type = "section";
        this.props = props;
        this.children = [
            { type: 'label', props: { innerText: "WExpDev" } },
        ];
    }
}