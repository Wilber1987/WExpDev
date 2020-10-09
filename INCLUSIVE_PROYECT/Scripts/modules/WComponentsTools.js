function DisplayAcordeon(value, SectionId, size = null) {
    console.log(value)
    if (size == null) {
      size = "500px";
    }
    // var ventanaM = document.getElementById(idModal);
    var acc = document.getElementsByClassName("GroupFormAcordeon");
    for (var i = 0; i < acc.length; i++) {
      ventanaM = acc[i];  
      if (ventanaM.id != SectionId) {
        //  if (ventanaM.style.height != "300px") {
        ventanaM.style.transition = "all ease 1s";
        ventanaM.style.height = "0px";
        //ventanaM.style.overflow = "scroll";
      } else {
        ventanaM.style.transition = "all ease 1s";
        ventanaM.style.height = size;
        //ventanaM.style.oveflow = "hidden";
      }
    }
  }
  function DisplayUniqAcorden(elementId){
      let SectionElement = GetObj(elementId);       
      if (SectionElement.style.display == "none") {
          SectionElement.style.display = "block";         
          setTimeout(()=>{               
              SectionElement.style.maxHeight = "800px"; 
              SectionElement.style.minHeight = "300px";              
          }, 100);                            
      }else {
          SectionElement.style.maxHeight = "0px";  
          SectionElement.style.minHeight = "0px";        
          setTimeout(()=>{            
              SectionElement.style.display = "none";             
          }, 1000); 
      }
  }


  //AJAXTOOLS----------------------------------------

const PostRequest = async (Url, Data = {})=>{   
    let response = await fetch(Url , {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(Data)
    });     
    if (response.status == 404 || response.status ==  500) {
      console.log("ocurrio un error: " + response.status);
      let responseLocal = localStorage.getItem(Url);
      if (typeof responseLocal !== "undefined" && typeof responseLocal !== "null" && responseLocal != "") {
        return JSON.parse(responseLocal); 
      }else{
        return [];
      }  
    }
    else {
      response = await response.json();
      localStorage.setItem(Url, JSON.stringify(response));
      return response;
    }
}

const GetRequest = async (Url)=>{  
  let response = await fetch(Url , {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
  });     
  if (response.status == 404 || response.status ==  500) {
    console.log("ocurrio un error: " + response.status);
    let responseLocal = localStorage.getItem(Url);
    if (typeof responseLocal !== "undefined" && typeof responseLocal !== "null" && responseLocal != "") {
      return JSON.parse(responseLocal); 
    }else{
      return [];
    }  
  }
  else {
    response = await response.json();
    localStorage.setItem(Url, JSON.stringify(response));
    return response;
  }
}


  