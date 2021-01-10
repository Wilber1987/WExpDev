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

const Wtable = document.createElement("w-table");

Wtable.TableConfig = {
    Datasets: Data,
}


    const Wtable = WRender.createElement({
        type: "w-table", props: { id: "table", TableConfig: { Datasets: Data } }
    });

    Wtable.TableConfig = { Datasets: Data, paginate: false};

//2

    Wtable.TableConfig = {
        Datasets: Data,
        Options: {
            Search: true,
        }
    }


Wtable.TableConfig = {
    Datasets: Data,
    Options: {
        Search: true,
        UrlUpdate: "https://route.....",
    }
};





Wtable.TableConfig = { Datasets: Data, paginate: false, Options: { Search: true, } };

Wtable.TableConfig = { Datasets: Data, Options: { Edit: true, } };

Wtable.TableConfig = {
    Datasets: Data, Options: {
        Edit: true, UrlUpdate: "https//url....."
    }
};

    Wtable.TableConfig = {
        Datasets: Data,
        Options: {
            Show: true,
        }
    };