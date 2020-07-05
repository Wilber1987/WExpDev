function DrawNav(List, Config) {    
    const NavContainer = document.createElement("div");
    NavContainer.className = Config.className;
    NavContainer.style.pointerEvents = "none";
    NavContainer.style.transition = "all 1s";
    NavContainer.style.opacity = 0;
    const ul = document.createElement("ul");   
    for (const Prop in List) {
        if (typeof List[Prop] === "string") {
            const li = document.createElement("li");
            li.append(CreateStringNode(
                `<a href="${Config.Path + List[Prop]}">${Prop}</a>`
            ));  
            ul.append(li);  
        }                  
    }
    if (Config.Animation) {
        if (Config.Animation == "SlideLeft") {
            ul.style.transition = "all 1s";
            ul.style.webkitTransform =  "translateX(-100%)";         
        }
    }
    if (Config.CallBTN) {        
        GetObj(Config.CallBTN).addEventListener("click",function () {          
            if (NavContainer.style.opacity == 0) {
                NavContainer.style.pointerEvents = "all";
                NavContainer.style.opacity = 1;
                if (Config.Animation == "SlideLeft") {                   
                    ul.style.webkitTransform =  "translateX(0%)";         
                }
            }else {
                NavContainer.style.pointerEvents = "none";
                NavContainer.style.opacity = 0;
                if (Config.Animation == "SlideLeft") {
                    ul.style.webkitTransform =  "translateX(-100%)";         
                }
            }
        });        
    }
    NavContainer.append(ul);
    return NavContainer;
}

