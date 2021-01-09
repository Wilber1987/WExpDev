const OnLoad = async() => {
    const { WRender } = await import ("./WDevCore/WModules/WComponentsTools.js");
    const modules = await import ("./MasterDomClass.js");
    const BodyComponents = new modules.MasterDomClass();
    root.appendChild(WRender.createElement(BodyComponents));
}

window.onload = OnLoad;