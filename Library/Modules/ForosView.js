class ForosView {
    constructor(props) {
        this.type = "div";
        this.props = props;
        this.children = [];
        this.children.push({
            type: 'h2',
            props: { innerText: "Table DINAMIC MULTIOPTIONS........." },
        })
        var Config = {
            Datasets: props.Users, /*DATOS DE LA TABLA*/
            Options: {
                Search: true,
                Show: true,
                Edit: true, UrlUpdate: "http://localhost:6601/" + 'api/User/PostUpdateUser',
                Select: true,
                Add: true, UrlAdd: "http://localhost:6601/" + 'api/User/PostRegister'           
            },
        };
        this.children.push({
            type: "w-table",
            props: {
                id: "table",
                TableConfig: Config
            }
        })
    }
    StartModuleList = () => {
        //let response = await AjaxTools.PostRequest(Url_Path + 'api/User/PostRegister', this.MyLoginData);
        //"http://localhost:6601/" + 'api/User/PostTakeUsers'
    }
}
export { ForosView }