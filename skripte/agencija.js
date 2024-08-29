var url  = "https://turistickeagencije-13cb6-default-rtdb.europe-west1.firebasedatabase.app"

var destinacijeLista = []
var slikeDestinacije = []
var destinacija = {}

var agencijaId = getParamValue("id")
var response = new XMLHttpRequest() 
var response1 = new XMLHttpRequest()
getAgencija()

function getAgencija(){
    response.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                var agencija = JSON.parse(response.responseText)
                loadAgencija(agencija)
                var destinacijaTemp = agencija.destinacije //key od grupe destinacija

                response1.onreadystatechange = function(){
                    if(this.readyState == 4){
                        if(this.status == 200){
                            var destinacijeTemp = JSON.parse(response1.responseText)
                            for(var dest in destinacijeTemp){
                                destinacijeLista.push(destinacijeTemp[dest], dest, destinacijaTemp)
                                loadCardsDestination(destinacijeTemp[dest], dest, destinacijaTemp, "")
                            }
                        }
                        else{
                            window.location.href = "/stranice/greska.html"

                        }
                    }
                }
                response1.open("GET", url + "/destinacije/" + destinacijaTemp + ".json")
                response1.send()

            }
            else{
                window.location.href = "/stranice/greska.html"
            }
        }
    }
    response.open("GET", url + "/agencije/"+agencijaId+".json")
    response.send()
}

function loadAgencija(a){
    let mainDiv = document.getElementById("main_agencija")
    mainDiv.innerHTML =
    "<div class=\"justify-content-center row\">" +
        "<h1 class=\"text-center text-danger pt-2 col-12\">" + a.naziv +"</h1>" + 
        "<hr class=\"border-danger border-2\">" +
        "<h5 class=\"text-center text-danger pb-2 col-12\">Sa Vama od 2011</h4>" +
        "<img src=\""+ a.logo+"\" referrerPolicy = \"no-referrer\" alt=\""+a.naziv+"\" class=\"col-8 pb-3 rounded-5\" style=\"height: 70vmin; width: 110vmin;\">" +
        "<div class=\"col-6\">" +
            "<div class=\"card text-center border-3 border-danger\">" +
                "<div class=\"card-header bg-danger fs-3\">" +
                    "Information" +
                "</div>" +
                "<ul class=\"list-group list-group-flush\">" +
                    
                    "<li class=\"list-group-item bg-danger-subtle border-bottom-5 border-danger\"><i class=\"bi bi-envelope-at px-3\"></i>"+a.email+"</li>"+
                    "<li class=\"list-group-item bg-danger-subtle border-bottom-5  border-danger\"><i class=\"bi bi-telephone px-3\"></i>"+a.brojTelefona+"</li>"+
                    "<li class=\"list-group-item bg-danger-subtle border-bottom-5  border-danger\"><i class=\"bi bi-geo-alt px-3\"></i>"+a.adresa+"</li>"+
                "</ul>"+
            "</div>"+
        "</div>"+
    "</div>"
    

}

function loadCardsDestination(d,id, id1, marking){

    let card = document.getElementById("kartica_destinacije")

    let div1 = document.createElement("div")
    div1.className = "card col-md-3 col-sm-12 text-center mt-3"
    div1.style.width = "18rem"

    let div12 = document.createElement("div")
    div12.className = "card-body d-flex flex-column justify-content-center"
    let naziv = document.createElement("h5")
    naziv.className = "card-title"
    let naslovTemp = d.naziv
    let naslov = document.createElement("p")
    if(marking != ""){
        for(let i = 0; i<naslovTemp.length;i++){
            if(naslovTemp[i] === marking.charAt(0)){
                var mark = document.createElement("mark")
                mark.innerText = marking
                naslov.append(mark)
                i += marking.length -1
                
            }
            else{
                naslov.append(naslovTemp[i])
            }
        }
        naziv.appendChild(naslov)
    }
    else{
        naziv.innerText = naslovTemp
    }
    
    let slika = document.createElement("img")
    slika.style.height = "30vmin"
    slika.className = "card-img-top w-100"
    slika.referrerPolicy = "no-referrer"
    slika.src = d.slike[0]
    slika.alt = d.naziv
    let link = document.createElement("a")
    link.className = "btn btn-outline-danger mt-2"
    link.innerText = "Vidi jos"
    link.onclick = goToDestinacija
    link.setAttribute("data-id",id)
    link.setAttribute("data-id1",id1)

    div12.appendChild(naziv)
    div12.appendChild(slika)
    div12.appendChild(link)

    div1.appendChild(div12)

    card.appendChild(div1)

}

function goToDestinacija(){
    let btn = this
    let destinacijaId = btn.getAttribute("data-id")
    let destinacijaId1 = btn.getAttribute("data-id1")
    window.location.href = "/stranice/destinacija.html?id=" + destinacijaId1 + "/"+destinacijaId
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

  let searchBtn1 = document.getElementById("searchDestinacija1")
  searchBtn1.addEventListener("click", function(){
      search(document.getElementById("nazivDestinacije1").value,document.getElementById("tip1").value, document.getElementById("prevoz1").value)
  })

  let searchBtn2 = document.getElementById("searchDestinacija2")
  searchBtn2.addEventListener("click", function(){
      search(document.getElementById("nazivDestinacije2").value,document.getElementById("tip2").value, document.getElementById("prevoz2").value)
  })

  function search(nazivD, tipD, prevozD){
    let destinacijeZaDodavanje = []
    for(let i = 0; i< destinacijeLista.length;i+=3){
        if(destinacijeLista[i].naziv.includes(nazivD) && tipD === "" && prevozD === ""){
            
            destinacijeZaDodavanje.push(destinacijeLista[i], destinacijeLista[i+1],destinacijeLista[i+2])
        }
        else if(nazivD === "" && destinacijeLista[i].tip.includes(tipD) && prevozD === ""){
            destinacijeZaDodavanje.push(destinacijeLista[i], destinacijeLista[i+1],destinacijeLista[i+2])
        }
        else if(nazivD === "" && tipD==="" && destinacijeLista[i].prevoz.includes(prevozD)){
            destinacijeZaDodavanje.push(destinacijeLista[i], destinacijeLista[i+1],destinacijeLista[i+2])
        }
        else if(destinacijeLista[i].naziv.includes(nazivD)&& destinacijeLista[i].tip.includes(tipD) && prevozD === ""){
            destinacijeZaDodavanje.push(destinacijeLista[i], destinacijeLista[i+1],destinacijeLista[i+2])
        }
        else if(destinacijeLista[i].naziv.includes(nazivD) && tipD === "" && destinacijeLista[i].prevoz.includes(prevozD)){
            destinacijeZaDodavanje.push(destinacijeLista[i], destinacijeLista[i+1],destinacijeLista[i+2])
        }
        else if(nazivD === "" && destinacijeLista[i].tip.includes(tipD) && destinacijeLista[i].prevoz.includes(prevozD) ){
            destinacijeZaDodavanje.push(destinacijeLista[i], destinacijeLista[i+1],destinacijeLista[i+2])
        }
        else if(destinacijeLista[i].naziv.includes(nazivD)  && destinacijeLista[i].tip.includes(tipD) && destinacijeLista[i].prevoz.includes(prevozD) ){
            destinacijeZaDodavanje.push(destinacijeLista[i], destinacijeLista[i+1],destinacijeLista[i+2])
        }
    }
    if(destinacijeZaDodavanje.length > 0){
        let ocisti = document.getElementById("kartica_destinacije")
        ocisti.innerHTML = ""
        for(let i = 0;i<destinacijeZaDodavanje.length;i+=3){
            loadCardsDestination(destinacijeZaDodavanje[i],destinacijeZaDodavanje[i+1],destinacijeZaDodavanje[i+2],nazivD)
        }
    }
    else{
        let dodaj = document.getElementById("kartica_destinacije")
        dodaj.innerHTML = "<p class= \"text-danger fs-3 text-center mt-2\">Nema rezultata</p>"
    }
  }