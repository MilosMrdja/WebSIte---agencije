let url = "https://turistickeagencije-13cb6-default-rtdb.europe-west1.firebasedatabase.app"

var destinacijaID = getParamValue("id")
var response = new XMLHttpRequest() 
getDestinacije()

function getDestinacije(){
    response.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                var destinacija = JSON.parse(response.responseText)
                loadDestination(destinacija)
            }
            else{
                window.location.href = "/stranice/greska.html"

            }
        }
    }
    response.open("GET", url + "/destinacije/" + destinacijaID + ".json")
    response.send()
}

function refresh(){
    window.location.reload()
}

function loadDestination(d){
    let naziv = document.getElementById("naziv")
    naziv.innerText = d.naziv
    let editDest = document.getElementById("editDesti")
    editDest.setAttribute("data-bs-toggle", "modal")
    editDest.setAttribute("data-bs-target", "#editDestinacije")
    editDest.setAttribute("naziv",d.naziv)
    editDest.setAttribute("cena",d.cena)
    editDest.setAttribute("osobe",d.maxOsoba)
    editDest.setAttribute("prevoz",d.prevoz)
    editDest.setAttribute("tip",d.tip)
    editDest.setAttribute("slika",d.slike[0])
    editDest.setAttribute("opis",d.opis)
    editDest.onclick = setEditDestinacije
    let olovka = document.createElement("i")
    olovka.className = "bi bi-pencil-square"
    editDest.appendChild(olovka)
    var karosel = document.getElementById("karosel")
    
    
    for(var i=0; i< d.slike.length;i++){
        let div = document.createElement("div")
        div.className = "carousel-item"
        if(i==0){
            div.className = "carousel-item active"
        }
        let img = document.createElement("img")
        img.src = d.slike[i]
        img.alt = d.naziv
        img.className = "d-block w-100"
        img.referrerPolicy = "no-referrer"
        
        img.style.height = "50vmin"
        div.appendChild(img)
        karosel.appendChild(div)
        

    }

    let info = document.getElementById("info")
    let opis = document.createElement("li")
    opis.className = "list-group-item bg-danger-subtle border-bottom-5 border-danger"
    opis.innerText = d.opis
    info.appendChild(opis)

    let vrsta = document.createElement("li")
    vrsta.className = "list-group-item bg-danger-subtle border-bottom-5  border-danger"
    
    let prevoz = document.createElement("i")
    if("avion" === d.prevoz){
        prevoz.className = "bi bi-airplane px-3"
    }
    else if("autobus" === d.prevoz){
        prevoz.className = "bi bi-bus-front px-3"
    }
    else{
        prevoz.className = "bi bi-car-front-fill px-3"
        vrsta.innerText =  d.tip + " (sopstveni)"
    }
    vrsta.innerText = d.tip
    vrsta.appendChild(prevoz)
    
    let cena = document.createElement("li")
    cena.className = "list-group-item bg-danger-subtle border-bottom-5 border-danger"
    cena.innerText = d.cena
    let cenaTemp = document.createElement("i")
    cenaTemp.className = "bi bi-tags px-3"
    cena.appendChild(cenaTemp)

    let osobe = document.createElement("li")
    osobe.className = "list-group-item bg-danger-subtle border-bottom-5 border-danger"
    osobe.innerText = d.maxOsoba
    let osobeTemp = document.createElement("i")
    osobeTemp.className = "bi bi-people px-3"
    osobe.appendChild(osobeTemp)
    

    info.appendChild(vrsta)
    info.appendChild(cena)
    info.appendChild(osobe)

}

function getParamValue(name) {
    let location = decodeURI(window.location.toString());
    let index = location.indexOf("?") + 1;
    let subs = location.substring(index, location.length);
    let splitted = subs.split("&");
  
    for (i = 0; i < splitted.length; i++) {
      let s = splitted[i].split("=");
      let pName = s[0];
      let pValue = s[1];
      if (pName == name) {
        return pValue;
      }
    }
  }

function setEditDestinacije(){
    let naziv = document.getElementById("nazivAddDest")
    naziv.setAttribute("value",this.getAttribute("naziv"))

    let cena = document.getElementById("cenaAddDest")
    cena.setAttribute("value", this.getAttribute("cena"))

    let osobe = document.getElementById("osobaAddDest")
    osobe.setAttribute("value",this.getAttribute("osobe"))

    let tempPrevoz = this.getAttribute("prevoz")
    let prevoz = document.getElementById("prevozDest")
    if(tempPrevoz === "avion"){
        prevoz.innerHTML = "<option>avion</option>"+
        "<option>autobus</option>"+
        "<option>sopstveni</option>"
    }
    else if(tempPrevoz == "autobus"){
        prevoz.innerHTML = "<option value=\"2\">autobus</option>"+
        "<option value=\"1\">avion</option>"+
        "<option value=\"3\">sopstveni</option>"
    }
    else{
        prevoz.innerHTML = "<option value=\"3\">sopstveni</option>"+
        "<option value=\"2\">autobus</option>"+
        "<option value=\"1\">avion</option>"
        
    }

    let tempTip = this.getAttribute("tip")
    let tip = document.getElementById("tipDest")
    if(tempTip === "Letovanje"){
        tip.innerHTML = "<option value=\"1\">Letovanje</option>"+
        "<option value=\"2\">Gradovi Evrope</option>"+
        "<option value=\"3\">Zimovanje</option>"
    }
    else if(tempTip === "Gradovi Evrope"){
        tip.innerHTML = "<option value=\"2\">Gradovi Evrope</option>"+
        "<option value=\"1\">Letovanje</option>"+
        "<option value=\"3\">Zimovanje</option>"
    }
    else{
        tip.innerHTML = "<option value=\"3\">Zimovanje</option>"+
        "<option value=\"2\">Gradovi Evrope</option>"+
        "<option value=\"1\">Letovanje</option>"
        
    }
    let slika = document.getElementById("slikaAddDest")
    slika.setAttribute("value", this.getAttribute("slika"))

    let opis = document.getElementById("opsiDest")
    opis.append(this.getAttribute("opis"))

    let btn = document.getElementById("editDestinacijeBtn")
    btn.addEventListener("click",function(){
        if(validacijaDestinacije() == true){
            btn.setAttribute("data-bs-dismiss","modal")
            btn.click()
            refresh()
        }
    })

}

function validacijaDestinacije(){
    let temp1 = document.getElementById("validacija01")
  let flag1 = false
  let temp2 = document.getElementById("validacija02")
  let flag2 = false
  let temp3 = document.getElementById("validacija03")
  let flag3 = false
  //uvek ce biti validno jer se tako dodaje u js kao popunjena opcija i koju god da odaberemo bice ok
  let flag4 = true
  let flag5 = true
  let temp4 = document.getElementById("validacija04")
  temp4.style.color = "green"
  temp4.innerText = "Validno"
  let temp5 = document.getElementById("validacija05")
  temp5.style.color = "green"
  temp5.innerText = "Validno"
  let temp6 = document.getElementById("validacija06")
  let flag6 = false
  let temp7 = document.getElementById("validacija07")
  let flag7 = false
  if(document.getElementById("nazivAddDest").value === ""){
    temp1.style.color = "red"
    temp1.innerText = "Polje 'Naziv' ne sme biti prazno"
    flag1 = false
  }
  else{
    temp1.style.color = "green"
    temp1.innerText = "Validno"
    flag1 = true
  }
  if(document.getElementById("cenaAddDest").value === ""){
    temp2.style.color = "red"
    temp2.innerText = "Polje 'Cena' ne sme biti prazno"
    flag2 = false
  }
  else{
    temp2.style.color = "green"
    temp2.innerText = "Validno"
    flag2 = true
  }
  if(document.getElementById("osobaAddDest").value === ""){
    temp3.style.color = "red"
    temp3.innerText = "Polje 'Max osoba' ne sme biti prazno"
    flag3 = false
  }
  else{
    temp3.style.color = "green"
    temp3.innerText = "Validno"
    flag3 = true
  }

  
  if(document.getElementById("slikaAddDest").value === ""){
    temp6.style.color = "red"
    temp6.innerText = "Polje 'Logo' ne sme biti prazno"
    flag6 = false
  }
  else{
    temp6.style.color = "green"
    temp6.innerText = "Validno"
    flag6 = true
  }
  if(document.getElementById("opsiDest").value === ""){
    temp7.style.color = "red"
    temp7.innerText = "Polje 'Opis' ne sme biti prazno"
    flag7 = false
  }
  else{
    temp7.style.color = "green"
    temp7.innerText = "Validno"
    flag7 = true
  }
  if(flag1==true && flag2==true && flag3==true && flag4==true && flag5==true && flag6==true && flag7==true){
    return true
  }
  return false
}

