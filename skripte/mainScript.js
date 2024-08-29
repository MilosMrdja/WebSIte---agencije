let url = "https://turistickeagencije-13cb6-default-rtdb.europe-west1.firebasedatabase.app"

var agencijeIDs = []
var agencijeLista = []
var destinacijeLista = []
var agencija = {}
var div = document.getElementById("glavni_div")

var response = new XMLHttpRequest();
getAgencije()
function getAgencije() {
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
                                            destinacijeLista.push(dest)
                                            agencijeLista.push(agencije[ag])
                                            agencijeIDs.push(ag)
                                            createCard(agencije[ag], ag, "");
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



function createCard(agencija, id, marking) {
    var card = document.createElement("div")
    card.className = "card mt-3 col-md-3 col-sm-11 mx-1"
    card.style.maxWidth = "540px"
    var cardTitle = document.createElement("h5")
    cardTitle.className = "card-title text-danger text-center pt-3"
    let nazivTemp = agencija.naziv
    let naslov = document.createElement("p")
    if(marking != ""){
        for(let i = 0; i<nazivTemp.length;i++){
            if(nazivTemp[i] === marking.charAt(0)){
                var mark = document.createElement("mark")
                
                mark.innerText = marking
                
                naslov.append(mark)
                i += marking.length -1
            }
            
            else{
                
                naslov.append(nazivTemp[i])
            }
        }
        
        
        cardTitle.appendChild(naslov)
    }
    else{
        cardTitle.innerText = nazivTemp
    }
    card.appendChild(cardTitle)
    var card1 = document.createElement("div")
    card1.className = "row g-0 justify-content-evenly align-self-center"
    var card12 = document.createElement("div")
    card12.className = "col-lg-6 col-md-12 align-self-center d-flex justify-content-center px-2 py-2"
    var cardImg = document.createElement("img")
    cardImg.referrerPolicy = "no-referrer"
    cardImg.src = agencija.logo
    cardImg.className = "img-fluid rounded-start"
    cardImg.style.height = "20vmin"
    cardImg.style.width = "35vmin"
    card12.appendChild(cardImg)
    card1.appendChild(card12)

    var card13 = document.createElement("div")
    card13.className = "col-lg-6 col-md-12"
    var card21 = document.createElement("div")
    card21.className = "card-body text-center"
    var contact = document.createElement("p")
    contact.innerText = "Contact: "
    card21.appendChild(contact)
    var tel = document.createElement("p")
    tel.innerText = agencija.brojTelefona
    card21.appendChild(tel)
    var link = document.createElement("a")
    link.onclick = goToAgencija
    link.setAttribute("data-id", id)
    link.href = "#"
    link.innerText = "Destinacije"
    link.className = "btn btn-outline-danger"

    card21.appendChild(link)
    card13.appendChild(card21)
    card1.appendChild(card13)

    card.appendChild(card1)
    div.append(card)

}

function goToAgencija() {
    var btn = this
    var agencijaId = btn.getAttribute("data-id")
    window.location.href = "/stranice/agencija.html?id=" + agencijaId
}



function search(nazivA, destinacija) {
    let agencijeZaUcitavanje = []
    let IDsAGencijaZaUcitacanje = []
    let i = 0
    for (i = 0; i < agencijeLista.length; i++) {
        if (destinacija === "") {
            if (agencijeLista[i].naziv.includes(nazivA) == true) {
                agencijeZaUcitavanje.push(agencijeLista[i])
                IDsAGencijaZaUcitacanje.push(agencijeIDs[i])
            }
        }
        else {

            for (let n in destinacijeLista[i]) {

                if (destinacijeLista[i][n].naziv.includes(destinacija) && nazivA === "") {
                    if (agencijeZaUcitavanje.includes(agencijeLista[i]) == false) {
                        agencijeZaUcitavanje.push(agencijeLista[i])
                        IDsAGencijaZaUcitacanje.push(agencijeIDs[i])

                    }
                }
                else if (destinacijeLista[i][n].naziv.includes(destinacija) && agencijeLista[i].naziv.includes(nazivA)) {
                    if (agencijeZaUcitavanje.includes(agencijeLista[i]) == false) {
                        agencijeZaUcitavanje.push(agencijeLista[i])
                        IDsAGencijaZaUcitacanje.push(agencijeIDs[i])

                    }
                }
            }
        }
    }

    if (agencijeZaUcitavanje.length > 0) {
        let ocisti = document.getElementById("glavni_div")
        ocisti.innerHTML = ""
        for (i = 0; i < agencijeZaUcitavanje.length; i++) {
            createCard(agencijeZaUcitavanje[i], IDsAGencijaZaUcitacanje[i],nazivA)
        }
    }
    else{
        let dodaj = document.getElementById("glavni_div")
        dodaj.innerHTML = "<p class= \"text-danger fs-1 text-center mt-5\">Nema rezultata</p>"
    }
    

}

let searchBtn1 = document.getElementById("searchAgencija1")
searchBtn1.addEventListener("click", function(){
    search(document.getElementById("nazivAgencije1").value,document.getElementById("destinacijaAgencije1").value)
})

let searchBtn2 = document.getElementById("searchAgencija2")
searchBtn2.addEventListener("click", function(){
    search(document.getElementById("nazivAgencije2").value,document.getElementById("destinacijaAgencije2").value)
})