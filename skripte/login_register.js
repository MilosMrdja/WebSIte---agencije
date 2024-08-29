function setLoginKorisnika(){
    let btn = document.getElementById("loginBtn")
    btn.addEventListener("click",function(){
        if(validacijaKorisnikLogin()==true){
            btn.setAttribute("data-bs-dismiss","modal")
            btn.click()
        }
    })
}

function validacijaKorisnikLogin(){
    let temp1 = document.getElementById("validacijaKorIme")
    let flag1 = false
    let temp2 = document.getElementById("validacijaLozinka")
    let flag2 = false

    if(document.getElementById("korImeLogin").value === ""){
        temp1.style.color = "red"
        temp1.innerText = "Polje 'Korisnicko ime' ne sme biti prazno"
        flag1 = false
    }
    else{
        temp1.style.color = "green"
        temp1.innerText = "Validno"
        flag1 = true
    }
    if(document.getElementById("lozinkaLogin").value === ""){
        temp2.style.color = "red"
        temp2.innerText = "Polje 'Lozinka' ne sme biti prazno"
        flag2 = false
    }
    else{
        temp2.style.color = "green"
        temp2.innerText = "Validno"
        flag2 = true
    }
    if(flag1 == true && flag2==true){
        return true
    }
    return false
}

function setAddKorisnika(){
    let btn = document.getElementById("registracijaBtn")
    btn.addEventListener("click",function(){
        let imeR = document.getElementById("imeR").value
        let prezimeR = document.getElementById("prezimeR").value
        let telefonR = document.getElementById("telefonR").value
        let emailR = document.getElementById("emailR").value
        let korImeR = document.getElementById("korisnickoImeR").value
        let lozinkaR = document.getElementById("lozinkaR").value
        let adresaR = document.getElementById("adresaR").value
        let rodjenjeR = document.getElementById("datumRodjenjaR").value

        if(validacijaKorisnikReg(imeR,prezimeR,telefonR, emailR, korImeR, lozinkaR, adresaR, rodjenjeR)==true){
            let korisnikAdd = {}
            korisnikAdd.ime = imeR
            korisnikAdd.prezime = prezimeR
            korisnikAdd.adresa = adresaR
            korisnikAdd.email = emailR
            korisnikAdd.korisnickoIme = korImeR
            korisnikAdd.lozinka = lozinkaR
            korisnikAdd.datumRodjenja = rodjenjeR
            korisnikAdd.telefon = telefonR
            dodajKorisnika(korisnikAdd)
        }
    })
}

function dodajKorisnika(korisnik){
    let postRequest = new XMLHttpRequest();

    postRequest.onreadystatechange = function (e) {
      if (this.readyState == 4) {
        if (this.status == 200) {
            location.reload()
          
        } else {
          window.location.href = "/stranice/greska.html"
        }
      }
    };
  
    postRequest.open("POST", url + "/korisnici.json")
    postRequest.send(JSON.stringify(korisnik))
}
function validacijaKorisnikReg(imeR,prezimeR,telefonR, emailR, korImeR, lozinkaR, adresaR, rodjenjeR){
    let temp1 = document.getElementById("validacija10")
    let flag1 = false
    let temp2 = document.getElementById("validacija20")
    let flag2 = false
    let temp3 = document.getElementById("validacija30")
    let flag3 = false
    let temp4 = document.getElementById("validacija40")
    let flag4 = false
    let temp5 = document.getElementById("validacija50")
    let flag5 = false
    let temp6 = document.getElementById("validacija60")
    let flag6 = false
    let temp7 = document.getElementById("validacija70")
    let flag7 = false
    let temp8 = document.getElementById("validacija80")
    let flag8 = false

    if(imeR == ""){
        temp1.style.color = "red"
        temp1.innerText = "Polje 'Ime' ne sme biti prazno"
        flag1 = false
    }
    else{
        temp1.style.color = "green"
        temp1.innerText = "Validno"
        flag1 = true
    }
    if(prezimeR == ""){
        temp2.style.color = "red"
        temp2.innerText = "Polje 'Prezime' ne sme biti prazno"
        flag2 = false
    }
    else{
        temp2.style.color = "green"
        temp2.innerText = "Validno"
        flag2 = true
    }
    let brojRegex = /^\d{9}$/
    if(brojRegex.test(telefonR) == false){
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
    if(emailRegex.test(emailR)==false){
        temp4.style.color = "red"
        temp4.innerText = "Polje 'Email' je prazno ili se format ne poklapa"
        flag4 = false
    }
    else{
        temp4.style.color = "green"
        temp4.innerText = "Validno"
        flag4 = true
    }
    if(korImeR == ""){
        temp5.style.color = "red"
        temp5.innerText = "Polje 'Korisnicko ime' ne sme biti prazno"
        flag5 = false
    }
    else{
        temp5.style.color = "green"
        temp5.innerText = "Validno"
        flag5 = true
    }
    if(lozinkaR == ""){
        temp6.style.color = "red"
        temp6.innerText = "Polje 'Lozinka' ne sme biti prazno"
        flag6 = false
    }
    else{
        temp6.style.color = "green"
        temp6.innerText = "Validno"
        flag6 = true
    }
    if(adresaR == ""){
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
    if(rodjenje.test(rodjenjeR)==false){
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

