import { WRender } from "../WDevCore/WModules/WComponentsTools";

const Data = [
    { id: 1, Category: "Category 3", Type: "Type 1", Time: "2020-01-01", Value: 35 },
    { id: 2, Category: "Category 1", Type: "Type 2", Time: "2020-03-01", Value: 200 },
    { id: 3, Category: "Category 2", Type: "Type 2", Time: "2020-02-01", Value: 50 },
    { id: 4, Category: "Category 1", Type: "Type 3", Time: "2020-01-01", Value: 105 },
    { id: 5, Category: "Category 1", Type: "Type 3", Time: "2020-01-01", Value: 39 },
    { id: 6, Category: "Category 2", Type: "Type 4", Time: "2020-02-01", Value: 180 },
    { id: 7, Category: "Category 1", Type: "Type 4", Time: "2020-01-01", Value: 100 },
    { id: 8, Category: "Category 2", Type: "Type 1", Time: "2020-02-01", Value: 70 },
    { id: 9, Category: "Category 1", Type: "Type 1", Time: "2020-01-01", Value: 35 },
    { id: 10, Category: "Category 3", Type: "Type 5", Time: "2020-03-01", Value: 98 },
    { id: 11, Category: "Category 1", Type: "Type 3", Time: "2020-02-01", Value: 40 },
];

    const MyObject = {
        id: 1,
        Category: "Category 3",
        Type: "Type 1",
        Time: "2020-01-01",
        Value: 35
    };

    document.querySelector("body").append(
        WRender.createElement({
            type: "w-modal-form",
            props: {
                EditObject: MyObject,
                ObjectOptions: {
                    SaveFunction: (Object) => {
                       console.log(Object)
                    }
                }
            }
        })
    );

    document.querySelector("body").append(
        WRender.createElement({
            type: "w-modal-form",
            props: {
                ObjectModel: this.ModelObject, 
                ObjectOptions: {
                    AddObject: true,
                    SaveFunction: (AddObject) => {
                       console.log(AddObject);
                    }
                }
            }
        })
    );


    const Modal = document.createElement("w-modal-form");
    Modal.ObjectModal = "Mensaje..."
    document.querySelector("body").append(Modal);

    document.querySelector("body").append(
        WRender.createElement({
            type: "w-modal-form",
            props: { ObjectModal: "Mensaje..."}
        })
    );



    this.shadowRoot.append(WRender.createElement({
        type: "w-modal-form",
        props: {
            ObjectModel: this.ModelObject,
            AddItemsFromApi: this.AddItemsFromApi,
            Dataset: this.Dataset,
            ObjectOptions: {
                Url: this.Options.UrlAdd,
                AddObject: true,
                SaveFunction: (NewObject) => {
                    if (this.AddItemsFromApi == null) {
                        this.Dataset.push(NewObject);
                    }
                    this.DrawTable();
                }
            }
        }
    }));
    this.shadowRoot.append(WRender.createElement({
        type: "w-modal-form",
        props: {
            ObjectModel: this.ModelObject,
            EditObject: element,
            ObjectOptions: {
                Url: this.Options.UrlUpdate,
                SaveFunction: () => {
                    this.DrawTable();
                }
            }
        }
    }));
    const ObjModel = {
        id: 1,
        Category: [{id: 1, desc: "value 1"}, {id: 2, desc: "value 2"}],
        Type: "Type 1",
        Time: "2020-01-01",
        Value: 35
    };
    document.querySelector("body").append(
        WRender.createElement({
            type: "w-modal-form",
            props: {
                EditObject: MyObject,
                ObjectModel: ObjModel,
                ObjectOptions: {
                    SaveFunction: (obj) => {
                        console.log(obj);                        
                    }
                }
            }
        })
    );