class ChartConfig{
    constructor(Config) {
        this.ContainerName = Config.ContainerName;
        this.Title = Config.Title;
        this.GroupDataset = Config.GroupDataset;//primera agrupacion
        this.SecondGroupDataset = Config.SecondGroupDataset;//segunda agrupacion
        this.ThreeGroupDataset = Config.ThreeGroupDataset;//triple agrupacion
        this.GroupLabelsData = Config.GroupLabelsData;//series
        this.Datasets = Config.Datasets; //datos
        this.Colors = Config.Colors;  
        this.GroupDataTotals = Config.GroupDataTotals;
        this.ContainerSize = Config.ContainerSize;
        this.ColumnLabelDisplay = Config.ColumnLabelDisplay;
    }
}