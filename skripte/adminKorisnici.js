let url = "https://turistickeagencije-13cb6-default-rtdb.europe-west1.firebasedatabase.app"

var response = new XMLHttpRequest()
var brojac = 0
getKorisnici()

function getKorisnici(){
    response.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                var korisnici = JSON.parse(response.responseText)
                for(var k in korisnici){
                    loadKorisnici(korisnici[k], ++brojac,k)
                }
            }
            else{
                window.location.href = "/stranice/greska.html"

            }
        }
    }
    response.open("GET",url+"/korisnici.json");
    response.send()
}

function refresh(){
    window.location.reload()
}

function loadKorisnici(k,b, idK){
    let tabela = document.getElementById("tabelaKorisnici")
    let red = document.createElement("tr")
    let th = document.createElement("th")
    th.scope = "row"
    th.className = "text-danger"
    th.innerText = b
    red.appendChild(th)

    let korisnickoIme = document.createElement("td")
    korisnickoIme.innerText = k.korisnickoIme
    red.appendChild(korisnickoIme)

    let lozinka = document.createElement("td")
    lozinka.innerText = k.lozinka
    red.appendChild(lozinka)

    let ime = document.createElement("td")
    ime.innerText = k.ime
    red.appendChild(ime)

    let prezime = document.createElement("td")
    prezime.innerText = k.prezime
    red.appendChild(prezime)

    let email = document.createElement("td")
    email.innerText = k.email
    red.appendChild(email)

    let datumRodjenja = document.createElement("td")
    datumRodjenja.innerText = k.datumRodjenja
    red.appendChild(datumRodjenja)
    
    let adresa = document.createElement("td")
    adresa.innerText = k.adresa
    red.appendChild(adresa)

    let telefon = document.createElement("td")
    telefon.innerText = k.telefon
    red.appendChild(telefon)

    let editK = document.createElement("td")
    let divEditK = document.createElement("div")
    divEditK.className = "text-center"
    let linkEditK = document.createElement("a")
    linkEditK.href = "#"
    linkEditK.style.color = "red"
    linkEditK.setAttribute("data-bs-toggle","modal")
    linkEditK.setAttribute("data-bs-target", "#editKorisinika")
    linkEditK.setAttribute("ime", k.ime)
    linkEditK.setAttribute("prezime", k.prezime)
    linkEditK.setAttribute("telefon", k.telefon)
    linkEditK.setAttribute("email", k.email)
    linkEditK.setAttribute("korisnicko_ime", k.korisnickoIme)
    linkEditK.setAttribute("lozinka", k.lozinka)
    linkEditK.setAttribute("adresa", k.adresa)
    linkEditK.setAttribute("datumRodjenja", k.datumRodjenja)
    linkEditK.setAttribute("editKorisnikId", idK)
    linkEditK.onclick = setEditKorisnik
    let olovka = document.createElement("i")
    olovka.className = "bi bi-pencil-square"
    linkEditK.appendChild(olovka)
    divEditK.appendChild(linkEditK)
    editK.appendChild(divEditK)
    red.appendChild(editK)

    let delK = document.createElement("td")
    let divDelK = document.createElement("div")
    divDelK.className = "text-center"
    let linkDelK = document.createElement("a")
    linkDelK.href = "#"
    linkDelK.style.color = "red"
    linkDelK.setAttribute("data-bs-toggle","modal")
    linkDelK.setAttribute("data-bs-target", "#deleteKorisnika")
    linkDelK.setAttribute("delKorisnikaId", idK)
    linkDelK.onclick = setDelKorisnika
    let kanta = document.createElement("i")
    kanta.className = "bi bi-trash3"
    linkDelK.appendChild(kanta)
    divDelK.appendChild(linkDelK)
    delK.appendChild(divDelK)
    red.appendChild(delK)


    tabela.appendChild(red)
}

function setEditKorisnik(){
    let id = this.getAttribute("editKorisnikId")

    let ime = document.getElementById("imeKorisnik")
    ime.setAttribute("value",this.getAttribute("ime"))

    let prezime = document.getElementById("prezimeKorisnik")
    prezime.setAttribute("value",this.getAttribute("prezime"))

    let telefon = document.getElementById("telefonKorisnik")
    telefon.setAttribute("value",this.getAttribute("telefon"))

    let email = document.getElementById("emailKorisnik")
    email.setAttribute("value",this.getAttribute("email"))

    let korIme = document.getElementById("korisnickoImeKorisnik")
    korIme.setAttribute("value",this.getAttribute("korisnicko_ime"))

    let lozinka = document.getElementById("lozinkaKorisnik")
    lozinka.setAttribute("value",this.getAttribute("lozinka"))

    let adresa = document.getElementById("adresaKorisnik")
    adresa.setAttribute("value",this.getAttribute("adresa"))

    let datumRodjenja = document.getElementById("datumRodjenjaKorisnik")
    datumRodjenja.setAttribute("value",this.getAttribute("datumRodjenja"))


    let btn = document.getElementById("editKorisniciBtn")
    btn.addEventListener("click",function(){
        let imeK = document.getElementById("imeKorisnik").value
        let prezimeK = document.getElementById("prezimeKorisnik").value
        let brojK = document.getElementById("telefonKorisnik").value
        let emailK = document.getElementById("emailKorisnik").value
        let koriImeK = document.getElementById("korisnickoImeKorisnik").value
        let passK = document.getElementById("lozinkaKorisnik").value
        let adresaK = document.getElementById("adresaKorisnik").value
        let rodjK = document.getElementById("datumRodjenjaKorisnik").value


        if(validacijaKorisnika(imeK,prezimeK,brojK,emailK,koriImeK,passK,adresaK,rodjK)==true){
            btn.setAttribute("data-bs-dismiss","modal")
            btn.click()
            korisnikEdit = {}
            korisnikEdit.ime = imeK
            korisnikEdit.prezime = prezimeK
            korisnikEdit.telefon = brojK
            korisnikEdit.adresa = adresaK
            korisnikEdit.email = emailK
            korisnikEdit.korisnickoIme = koriImeK
            korisnikEdit.lozinka = passK
            korisnikEdit.datumRodjenja = rodjK
            izmeniKorisnika(id, korisnikEdit)
        }
    })

}

function izmeniKorisnika(id,korisnikEdit){
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
  
    putRequest.open("PUT", url + "/korisnici/" + id + ".json");
    putRequest.send(JSON.stringify(korisnikEdit));
}

function validacijaKorisnika(imeK,prezimeK,brojK,emailK,koriImeK,passK,adresaK,rodjK){
    let temp1 = document.getElementById("validacija1")
    let flag1 = false
    let temp2 = document.getElementById("validacija2")
    let flag2 = false
    let temp3 = document.getElementById("validacija3")
    let flag3 = true
    let temp4 = document.getElementById("validacija4")
    let flag4 = false
    let temp5 = document.getElementById("validacija5")
    let flag5 = false
    let temp6 = document.getElementById("validacija6")
    let flag6 = false
    let temp7 = document.getElementById("validacija7")
    let flag7 = false
    let temp8 = document.getElementById("validacija8")
    let flag8 = false

    if(imeK == ""){
        temp1.style.color = "red"
        temp1.innerText = "Polje 'Ime' ne sme biti prazno"
        flag1 = false
    }
    else{
        temp1.style.color = "green"
        temp1.innerText = "Validno"
        flag1 = true
    }
    if(prezimeK == ""){
        temp2.style.color = "red"
        temp2.innerText = "Polje 'Prezime' ne sme biti prazno"
        flag2 = false
    }
    else{
        temp2.style.color = "green"
        temp2.innerText = "Validno"
        flag2 = true
    }
    let bRegex = /^\d{9}$/
    if(bRegex.test(brojK)==false){
        temp3.style.color = "red"
        temp3.innerText = "Polje 'Broj telefona' je prazno ili se format ne poklapa"
        flag3 = false
    }
    else{
        temp3.style.color = "green"
        temp3.innerText = "Validno"
        flag3 = true
    }
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if(emailRegex.test(emailK)==false){
        temp4.style.color = "red"
        temp4.innerText = "Polje 'Email' je prazno ili se format ne poklapa"
        flag4 = false
    }
    else{
        temp4.style.color = "green"
        temp4.innerText = "Validno"
        flag4 = true
    }
    if(koriImeK == ""){
        temp5.style.color = "red"
        temp5.innerText = "Polje 'Korisnicko ime' ne sme biti prazno"
        flag5 = false
    }
    else{
        temp5.style.color = "green"
        temp5.innerText = "Validno"
        flag5 = true
    }
    if(passK == ""){
        temp6.style.color = "red"
        temp6.innerText = "Polje 'Lozinka' ne sme biti prazno"
        flag6 = false
    }
    else{
        temp6.style.color = "green"
        temp6.innerText = "Validno"
        flag6 = true
    }
    if(adresaK == ""){
        temp7.style.color = "red"
        temp7.innerText = "Polje 'Adresa' ne sme biti prazno"
        flag7 = false
    }
    else{
        temp7.style.color = "green"
        temp7.innerText = "Validno"
        flag7 = true
    }
    let rodjenje = /^(19\d\d|200\d|201[0-9]|202[0-3])-(0[1-5]|0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
    if(rodjenje.test(rodjK)==false){
        temp8.style.color = "red"
        temp8.innerText = "Polje 'Datum rodjenja' je prazno ili se format ne poklapa"
        flag8 = false
    }
    else{
        temp8.style.color = "green"
        temp8.innerText = "Validno"
        flag8 = true
    }
    if(flag1==true && flag2==true && flag3==true && flag4==true && flag5==true && flag6==true && flag7==true && flag8==true){
        return true
    }
    return false

}

function setDelKorisnika(){
    let id = this.getAttribute("delKorisnikaId")
    let btn = document.getElementById("deleteKorisnikaBtn")
    btn.addEventListener("click",function(){
        obrisiKorisnika(id)
    })
}
function obrisiKorisnika(id){
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
    rq.open("DELETE", url + "/korisnici/" + id + ".json")
    rq.send()
}



