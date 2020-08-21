import {CreateTable, DrawTable}  from "../Scripts/Modules/WComponents.js";
class Modules{    
    constructor(props){
        this.type = "div";
        this.props = props; 
        this.children= [
            { type: 'h1', props: {id:"", class: ""} ,
                children: ["Modules"]
            },
            { type: 'section', props: {id:"", class: ""} ,
               children: [ this.StartModuleList(this.props.modules) ]
            }  
        ]                
    } 
    StartModuleList = (modules) => {
       
        var Table = CreateTable({
            TableId: "TableData",
            className: "CardStyleComponent"
        });       
        let ApiUrlUpdate = "";
        let ApiUrlCreate = "";
        let ApiUrlDelete = "";
        let ApiUrlSelect = "";
    
        var ConfigTable = {
            Table: Table,
            CardStyle: true,
            TableContainer: false,
            Options: {
                Search: true,
                ApiSelect: {
                    //ApiUrlSelect: ApiUrlSelect,
                    //ResponseName: "name"
                },
                Show: true,
                ShowOptions: {
                    FormName: false,
                    Actions: {
                        btnInput: {
                            value: "Add Build",
                            className: "BtnSuccess",
                            onclick: "AddBuild()"
                        }
                    }
                },
                Edit: true,
                EditOptions: {
                    FormName: false,
                   // ApiUrlUpdate: ApiUrlUpdate
                },
                Select: false
            },
        };
        DrawTable(modules, ConfigTable);
        //console.log(Table)
        return Table;        
    }   
}
export {Modules}

