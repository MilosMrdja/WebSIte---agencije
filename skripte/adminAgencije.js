let url = "https://turistickeagencije-13cb6-default-rtdb.europe-west1.firebasedatabase.app"


// var response = new XMLHttpRequest()
// var response1 = new XMLHttpRequest()
var destinacije = []
var brojac = 0
var AddedDest = 0
getAdminAgencije()

function getAdminAgencije() {
    return new Promise((resolve, reject) => {
      const response = new XMLHttpRequest();
  
      response.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            const agencije = JSON.parse(response.responseText);
            const promises = [];
  
            for (const ag in agencije) {
              promises.push(
                new Promise((resolve1, reject1) => {
                  const response1 = new XMLHttpRequest();
                  response1.onreadystatechange = function () {
                    if (this.readyState == 4) {
                      if (this.status == 200) {
                        const dest = JSON.parse(response1.responseText);
                        loadAdminAgencije(agencije[ag], ++brojac,dest,agencije[ag].destinacije,ag);
                        resolve1();
                      } else {
                        //reject1(new Error("Failed to fetch destination data"));
                        window.location.href = "/stranice/greska.html"

                      }
                    }
                  };
  
                  response1.open("GET", url + "/destinacije/" + agencije[ag].destinacije + ".json");
                  response1.send();
                })
              );
            }
  
            Promise.all(promises)
              .then(() => {
                resolve();
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            // reject(new Error("Failed to fetch agencije data"));
            window.location.href = "/stranice/greska.html"

          }
        }
      };
  
      response.open("GET", url + "/agencije.json");
      response.send();
    });
  }
  

function loadAdminAgencije(a, b, d, idD, idA) {
    var tabela = document.getElementById("tabela")
    var red = document.createElement("tr")

    let h = document.createElement("th")
    h.className = "text-danger"
    h.scope = "row"
    h.innerText = b
    red.appendChild(h)

    let naziv = document.createElement("td")
    naziv.innerText = a.naziv
    red.appendChild(naziv)

    let adresa = document.createElement("td")
    adresa.innerText = a.adresa
    red.appendChild(adresa)

    let god = document.createElement("td")
    god.innerText = a.godina
    red.appendChild(god)

    let slikaTemp = document.createElement("td")
    let slika = document.createElement("img")
    slika.src = a.logo
    slika.alt = a.naziv
    slika.style.height = "5vmin"
    slika.style.width = "5vmin"
    slika.referrerPolicy = "no-referrer"
    slikaTemp.appendChild(slika)
    red.appendChild(slikaTemp)

    let broj = document.createElement("td")
    broj.innerText = a.brojTelefona
    red.appendChild(broj)

    let email = document.createElement("td")
    email.innerText = a.email
    red.appendChild(email)

    let destTemp = document.createElement("td")


    for (var d1 in d) {
        var div = document.createElement("div")
        var link = document.createElement("a")
        link.href = "#"
        link.style.color = "red"
        link.setAttribute("data-bs-toggle", "modal")
        link.setAttribute("data-bs-target", "#brisanjeDestinacijePotvrda")
        link.setAttribute("brisanjeDestinacijeId", idD+"/"+d1)
        link.onclick = setBrisanjeDestinacije
        var ikonica = document.createElement("i")
        ikonica.className = "bi bi-trash3"
        link.appendChild(ikonica)
        div.appendChild(link)
        div.append(d[d1].naziv)


        destTemp.appendChild(div)

    }
    red.appendChild(destTemp)

    let edit = document.createElement("td")
    let divEdit = document.createElement("div")
    divEdit.className = "text-center"
    let linkEdit = document.createElement("a")
    linkEdit.href = "#"
    linkEdit.style.color = "red"
    linkEdit.setAttribute("data-bs-toggle", "modal")
    linkEdit.setAttribute("data-bs-target", "#editAgencije")
    linkEdit.setAttribute("editAgencijeId", idA)
    linkEdit.setAttribute("naziv", a.naziv)
    linkEdit.setAttribute("adresa", a.adresa)
    linkEdit.setAttribute("brojTelefona", a.brojTelefona)
    linkEdit.setAttribute("email", a.email)
    linkEdit.setAttribute("logo",a.logo)
    linkEdit.setAttribute("godina", a.godina)
    linkEdit.setAttribute("destinacije",a.destinacije)
    linkEdit.onclick = setEditAgencije
    var ikonica = document.createElement("i")
    ikonica.className = "bi bi-pencil-square"
    linkEdit.appendChild(ikonica)
    divEdit.appendChild(linkEdit)
    edit.appendChild(divEdit)
    red.appendChild(edit)

    let deleteAg = document.createElement("td")
    let divDeleteAg = document.createElement("div")
    divDeleteAg.className = "text-center"
    let linkDeleteAg = document.createElement("a") 
    linkDeleteAg.href = "#"
    linkDeleteAg.style.color = "red"
    linkDeleteAg.setAttribute("data-bs-toggle", "modal")
    linkDeleteAg.setAttribute("data-bs-target", "#brisanjeAgencijePotvrda")
    linkDeleteAg.setAttribute("delAgId", idA)
    linkDeleteAg.onclick = setDeleteAgencija
    let kanta = document.createElement("i")
    kanta.className = ("bi bi-trash3")
    linkDeleteAg.appendChild(kanta)
    divDeleteAg.appendChild(linkDeleteAg)
    deleteAg.appendChild(divDeleteAg)
    red.appendChild(deleteAg)

    
    let addDest = document.createElement("td")
    let divAddDest = document.createElement("div")
    divAddDest.className = "text-center"
    let linkAddDest = document.createElement("a")
    linkAddDest.href = "#"
    linkAddDest.style.color = "red"
    linkAddDest.setAttribute("data-bs-toggle", "modal")
    linkAddDest.setAttribute("data-bs-target", "#addDestinacije")
    linkAddDest.setAttribute("grupaDestId",idD)
    linkAddDest.onclick = setAddDestinacije
    let plus = document.createElement("i")
    plus.className = "bi bi-plus-circle"
    linkAddDest.appendChild(plus)
    divAddDest.appendChild(linkAddDest)
    addDest.appendChild(divAddDest)
    red.appendChild(addDest)

    tabela.appendChild(red)

}

function setBrisanjeDestinacije(){
  let id = this.getAttribute("brisanjeDestinacijeId")
  let btn = document.getElementById("brisanjeDestinacijeBtn")
  btn.addEventListener("click",function(){
    obrisiDestinaciju(id)
  })
}

function obrisiDestinaciju(id){
  let rq = new XMLHttpRequest()

  rq.onreadystatechange = function(){
    if(this.readyState == 4){
      if(this.status == 200){
        window.location.reload()
      }
      else{
        window.location.href = "/stranice/greska.html"

      }
    }
  }
  rq.open("DELETE", url + "/destinacije/" + id + ".json")
  rq.send()
}

function refresh(){
  window.location.reload()
}

function setEditAgencije(){
  let id = this.getAttribute("editAgencijeId")

  let dest = this.getAttribute("destinacije")

  let naziv = document.getElementById("nazivEditAgencija")
  naziv.setAttribute("value",this.getAttribute("naziv"))

  let adresa = document.getElementById("adresaEditAgencija")
  adresa.setAttribute("value",this.getAttribute("adresa"))

  let brojA = document.getElementById("brojEditAgencija")
  brojA.setAttribute("value",this.getAttribute("brojTelefona"))

  let email = document.getElementById("emailEditAgencija")
  email.setAttribute("value",this.getAttribute("email"))

  let logo = document.getElementById("logoEditAgencija")
  logo.setAttribute("value",this.getAttribute("logo"))

  let god = document.getElementById("godEditAgencija")
  god.setAttribute("value",this.getAttribute("godina"))

  let btn = document.getElementById("editAgencijeBtn")
  btn.addEventListener("click",function(){
    let temp1 = document.getElementById("validacija1")
    let flag1 = false
    let temp2 = document.getElementById("validacija2")
    let flag2 = false
    let temp3 = document.getElementById("validacija3")
    let flag3 = false
    let temp4 = document.getElementById("validacija4")
    let flag4 = false
    let temp5 = document.getElementById("validacija5")
    let flag5 = false
    let temp6 = document.getElementById("validacija6")
    let flag6= false
    let naziv = document.getElementById("nazivEditAgencija").value
    let adresa = document.getElementById("adresaEditAgencija").value
    let broj = document.getElementById("brojEditAgencija").value
    let logo  = document.getElementById("logoEditAgencija").value
    let god = document.getElementById("godEditAgencija").value
    if(naziv === ""){
      temp1.innerText = "Polje 'Naziv' ne sme biti prazno"
      temp1.style.color = "red"
      flag1 = false
    }
    else{
      temp1.innerText = "Validno"
      temp1.style.color="green"
      flag1 = true
    }
    if(adresa === ""){
      temp2.innerText = "Polje 'Adresa' ne sme biti prazno"
      temp2.style.color = "red"
      flag2 = false
    }
    else{
      temp2.innerText = "Validno"
      temp2.style.color="green"
      flag2 = true
    }
    let patern = /^\d{3}\/\d{4}-\d+$/
    if(patern.test(broj)===false){
      temp3.innerText = "Polje 'Broj telefona' je prazno ili se format ne poklapa"
      temp3.style.color = "red"
      flag3 = false
    }
    else{
      temp3.innerText = "Validno"
      temp3.style.color="green"
      flag3 = true
    }
    let e = document.getElementById("emailEditAgencija").value
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if(emailRegex.test(e)==false){
      temp4.innerText = "Polje 'Email' je prazno ili se format ne poklapa"
      temp4.style.color = "red"
      flag4 = false
    }
    else{
      temp4.innerText = "Validno"
      temp4.style.color="green"
      flag4 = true
    }
    if(logo === ""){
      temp5.innerText = "Polje 'Logo' ne sme biti prazno"
      temp5.style.color = "red"
      flag5 = false
    }
    else{
      temp5.innerText = "Validno"
      temp5.style.color="green"
      flag5 = true
    }
    if(god != ""){
      if(Number(god) > 2023 || Number(god) < 1000){
        temp6.innerText = "Polje 'Godina osnivanja' ne moze biti u buducnosti ili pre 1000-te"
        temp6.style.color = "red"
        flag6 = false
      }
      else{
        temp6.innerText = "Validno"
        temp6.style.color="green"
        flag6 = true
      }
    }
    else{
      temp6.innerText = "Polje 'Godina osnivanja' ne sme biti prazno"
      temp6.style.color = "red"
      flag6 = false
    }

    if(flag1==true && flag2==true && flag3==true && flag4==true && flag5==true && flag6==true){
      
      agencija = {}
      agencija.naziv = naziv
      agencija.adresa = adresa
      agencija.brojTelefona = broj
      agencija.email = e
      agencija.logo = logo
      agencija.godina = god
      agencija.destinacije = dest
      izmeniAgenciju(id,agencija)
    }
  })
}
function izmeniAgenciju(id,agencijaEdit){
  let putRequest = new XMLHttpRequest();

  putRequest.onreadystatechange = function (e) {
    if (this.readyState == 4) {
      if (this.status == 200) {
        window.location.reload()
      } else {
        window.location.href = "/stranice/greska.html"
      }
    }
  };

  putRequest.open("PUT", url + "/agencije/" + id + ".json")
  putRequest.send(JSON.stringify(agencijaEdit))
}

function setDeleteAgencija(){
  let id = this.getAttribute("delAgId")
  let btn = document.getElementById("brisanjeAgencijeBtn")
  btn.addEventListener("click",function(){
    obrisiAgenciju(id)
  })
}

function obrisiAgenciju(id){
  let rq = new XMLHttpRequest()

  rq.onreadystatechange = function(){
    if(this.readyState == 4){
      if(this.status == 200){
        window.location.reload()
      }
      else{
        window.location.href = "/stranice/greska.html"

      }
    }
  }
  rq.open("DELETE", url + "/agencije/" + id + ".json")
  rq.send()
}

function setAddDestinacije(){
  let idDestinacijaAdd = this.getAttribute("grupaDestId")
  let btn = document.getElementById("AddDestinacijeBtn")
  btn.addEventListener("click",function(){
    let nazivD = document.getElementById("nazivAddDest").value
    let cenaD = document.getElementById("cenaAddDest").value
    let odobaD = document.getElementById("osobaAddDest").value

    let select = document.getElementById("prevozDest")
    let opcija = select.options[select.selectedIndex].value

    let select1 = document.getElementById("tipDest")
    let opcija1 = select1.options[select1.selectedIndex].value

    let slikaD = []
    slikaD.push(document.getElementById("slikaAddDest").value)
    let opsiD = document.getElementById("opsiDest").value

    if(validirajDestinaciju(nazivD,cenaD,odobaD,opcija,opcija1,slikaD,opsiD) == true){
      
      let opcijaD = ""
      let opcija1D = ""
      let addDest = {}
      if(opcija === "1"){
        opcijaD = "avion"
      }
      else if(opcija === "2"){
        opcijaD = "autobus"
      }
      else{
        opcijaD = "sopstveni"
      }

      if(opcija1 ==="1"){
        opcija1D = "Letovanje"
      }
      else if(opcija1 === "2"){
        opcija1D = "Gradovi Evrope"
      }
      else{
        opcija1D = "Zimovanje"
      }
      addDest.naziv = nazivD
      addDest.cena = cenaD
      addDest.slike = slikaD
      addDest.prevoz = opcijaD
      addDest.tip = opcija1D
      addDest.maxOsoba = odobaD
      addDest.opis = opsiD
      dodajDestinaciju(addDest,idDestinacijaAdd)
    }
  })
}
function dodajDestinaciju(addDest, idDest){
  let postRequest = new XMLHttpRequest();

  postRequest.onreadystatechange = function (e) {
    if (this.readyState == 4) {
      if (this.status == 200) {
        window.location.reload()
      } else {
        window.location.href = "/stranice/greska.html"
      }
    }
  };

  postRequest.open("POST", url + "/destinacije/"+idDest+".json")
  postRequest.send(JSON.stringify(addDest))
}

function validirajDestinaciju(nazivD,cenaD,odobaD,opcija,opcija1,slikaD,opsiD){
  let temp1 = document.getElementById("validacija01")
  let flag1 = false
  let temp2 = document.getElementById("validacija02")
  let flag2 = false
  let temp3 = document.getElementById("validacija03")
  let flag3 = false
  let temp4 = document.getElementById("validacija04")
  let flag4 = false
  let temp5 = document.getElementById("validacija05")
  let flag5 = false
  let temp6 = document.getElementById("validacija06")
  let flag6 = false
  let temp7 = document.getElementById("validacija07")
  let flag7 = false
  if(nazivD === ""){
    temp1.style.color = "red"
    temp1.innerText = "Polje 'Naziv' ne sme biti prazno"
    flag1 = false
  }
  else{
    temp1.style.color = "green"
    temp1.innerText = "Validno"
    flag1 = true
  }
  if(cenaD != ""){
    if(Number(cenaD) > 0){
      temp2.style.color = "green"
      temp2.innerText = "Validno"
      flag2 = true
    }
    else{
      temp2.style.color = "red"
      temp2.innerText = "Polje 'Cena' ne sme biti manje do nule"
      flag2 = false
    }

  }
  else{
    temp2.style.color = "red"
    temp2.innerText = "Polje 'Cena' ne sme biti prazno"
    flag2 = false
  }

  if(odobaD != ""){
    if(Number(odobaD) > 0){
      temp3.style.color = "green"
      temp3.innerText = "Validno"
      flag3 = true
    }
    else{
      temp3.style.color = "red"
      temp3.innerText = "Polje 'Max osoba' ne sme biti manja od nule"
      flag3 = false
    }
  }
  else{
    temp3.style.color = "red"
    temp3.innerText = "Polje 'Max osoba' ne sme biti prazno"
    flag3 = false
  }

  if(opcija !== "1" && opcija !== "2" && opcija !== "3"){
    temp4.style.color = "red"
    temp4.innerText = "Polje 'Prevoz' ne sme biti prazno"
    flag4 = false
  }
  else{
    temp4.style.color = "green"
    temp4.innerText = "Validno"
    flag4 = true
  }

  if(opcija1 !== "1" && opcija1 !== "2" && opcija1 !== "3"){
    temp5.style.color = "red"
    temp5.innerText = "Polje 'Tip' ne sme biti prazno"
    flag5 = false
  }
  else{
    temp5.style.color = "green"
    temp5.innerText = "Validno"
    flag5 = true
  }
  if(slikaD[0] === ""){
    temp6.style.color = "red"
    temp6.innerText = "Polje 'Logo' ne sme biti prazno"
    flag6 = false
  }
  else{
    temp6.style.color = "green"
    temp6.innerText = "Validno"
    flag6 = true
  }
  if(opsiD === ""){
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

