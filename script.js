let productInLS = JSON.parse(localStorage.getItem("article"));
let selected;
let totalPrice = 0;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");
const orderId = urlParams.get("orderId");

function getSelectValue(){
  selected = document.getElementById("select").value;
}

//Cameras

function getAllProduct() {
  fetch("http://localhost:3000/api/cameras")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })

  .then(function(value) {
    for(let i in value) {
      //card de chaque produit
      const catalogueDiv = document.createElement("div");
      catalogueDiv.classList.add("col-md-4");
      catalogueDiv.innerHTML = `
      <div class="card mb-4 box-shadow">
        <div class="embed-responsive embed-responsive-16by9">
          <img class="card-img-top embed-responsive-item" src="` + value[i].imageUrl + `" alt="Card image cap">
        </div>
        <div class="card-body">
          <h4 class="card-title">`+ value[i].name +`</h4>
          <p class="card-text">`+ value[i].description +`</p>
          <div class="d-flex justify-content-between align-items-center">
            <a href="./product.html?id=`+ value[i]._id +`" type="button" class="btn btn-sm btn-outline-secondary stretched-link">Détails</a>
            <small class="text-muted">`+ value[i].price / 100 + "€" +`</small>
          </div>
        </div>
      </div>
      `;
      catalogue.appendChild(catalogueDiv);
    }

  })

  .catch(function(err) {
    console.log("Echec de la requete");
  });
}

//Camera selectionner
function getProduct() {
  fetch("http://localhost:3000/api/cameras/"+ id)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })

  .then(function(value){
    const productDiv = document.createElement("div");
    productDiv.classList.add("card","mb-4","box-shadow");
    productDiv.innerHTML = `
    <img class="card-img-top" src="` + value.imageUrl + `" alt="Un article du magasin">
     <div class="card-body">
      <h4 class="card-title">` + value.name + `</h4>
      <p class="card-text">`+ value.description +`</p>
      <div class="d-flex justify-content-between align-items-center flex-column-reverse flex-sm-row">
        <div class="btn-group pt-3 pt-sm-0">
          <button id="addCart" type="button" class="btn btn-success">Ajouter au Panier</button>
            <select id="select" onchange="getSelectValue();" class="form-select mr-3 rounded-right" aria-label="Optique pour appareil photo">
              <option id="option" value"null">Optiques</option>
            </select>
        </div>
          <small class="text-muted">`+ value.price / 100 + "€" +`</small>
      </div>
    </div>
    `;
    product.appendChild(productDiv);
    // menu deroulant des options
    const eltOption = document.getElementById("option");
      for (let j in value.lenses){
    eltOption.insertAdjacentHTML("afterend", "<option value="+ value.lenses[j] + ">"+ value.lenses[j] +"</option>");
    }

    // Bouton d'ajout au panier
    addCart.addEventListener("click", function(event) {
      event.preventDefault();
      if(productInLS){
        productInLS.push(value);
        let index = productInLS.length - 1;
        productInLS[index].lenses = selected;
        localStorage.setItem("article", JSON.stringify(productInLS));
        document
          .getElementById("addCart")
          .setAttribute("disabled","");
        alert("Article ajouter au panier");
      }else{
        productInLS = [];
        productInLS.push(value);
        productInLS[0].lenses = selected;
        localStorage.setItem("article", JSON.stringify(productInLS));
        document
          .getElementById("addCart")
          .setAttribute("disabled","")
        alert("Article ajouter au panier");
      }
    })
  })

  .catch(function(err) {
    console.log("Echec de la requete");
  });
}

// Panier
function getCart() {
  let value = JSON.parse(localStorage.getItem("article"))
  let price = 0;
  for(let i in value){
    const cartDiv = document.createElement("div");
    cartDiv.classList.add("col-md-6", "col-lg-4");
    cartDiv.innerHTML = `
    <div class="card mb-4 box-shadow">
      <div class="embed-responsive embed-responsive-16by9">
        <img class="card-img-top embed-responsive-item" src="` + value[i].imageUrl + `" alt="Card image cap">
      </div>
      <div class="card-body">
        <h4 class="card-title">`+ value[i].name +`</h4>
        <p class="card-text">`+ value[i].description +`</p>
        <div class="d-flex justify-content-between align-items-center">
          <p id="optique" class="text-muted">Optique : `+ value[i].lenses +`</p>
          <small class="text-muted">`+ value[i].price / 100 + "€" +`</small>
        </div>
      </div>
    </div>
    `;
    cart.appendChild(cartDiv);
    price = price + value[i].price;
  }

  totalPrice = price/100 ;

  document
    .getElementById("price")
    .textContent = totalPrice + " €";

  document
    .getElementById("totalArticle")
    .textContent = totalPrice + " €";

}

// Bouton d'envois du formulaire

function save() {
  // Recuperation du formulaire
  const contact = {
    lastName : document.getElementById("lastName").value,
    firstName : document.getElementById("firstName").value,
    address : document.getElementById("adresse").value,
    city : document.getElementById("city").value,
    email : document.getElementById("email").value
  };
  // Verification du panier
  if(productInLS){
    // Verification des inputs
    if(isContactValid(contact)){
      // Stockage de la commande
      sessionStorage.setItem("contact", JSON.stringify(contact));
      sessionStorage.setItem("totalPrice", JSON.stringify(totalPrice));
      let products = [];
      const value = JSON.parse(localStorage.getItem("article"))
      for(let i in value){
        products.push(value[i]._id);
      }
      // Envoie au serveur de la commande
      const data = {contact, products};
      fetch("http://localhost:3000/api/cameras/order", {
        method: "POST",
        headers: {
          "Accept": "application/json", 
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      .then(function(res) {
        if (res.ok) {
          return res.json();
        }
      })

      .then(function(value) {
        // Redirection vers la page de confirmation
        window.location.replace("http://127.0.0.1:5500/ThibaultSalagnac_5_23022021/confirm.html?orderId="+ value.orderId);
      });
    } 
  } else {
    alert("Votre panier est vide");
  }
}

// Validation du formulaire de contact

function isContactValid(value){

    if(value.lastName === "") {
      document
        .getElementById("error")
        .innerText = "Veuillez renseigner votre Nom.";
      return(false);
    }

    else if(value.firstName === "") {
      document
        .getElementById("error")
        .textContent = "Veuillez renseigner votre Prenom.";
      return(false);
    }

    else if(value.address === "") {
      document
        .getElementById("error")
        .textContent = "Veuillez renseigner votre Adresse.";
      return(false);
    }

    else if(value.city === "") {
      document
        .getElementById("error")
        .textContent = "Veuillez renseigner votre Ville.";
      return(false);
    }

    else if(value.email === "") {
      document
        .getElementById("error")
        .textContent = "Veuillez renseigner votre Email.";
      return(false);
    }

    else if(document.getElementById("email2").value === "") {
      document
        .getElementById("error")
        .textContent = "Veuillez confirmer votre Email.";
      return(false);
    }

    else if(document.getElementById("email2").value !== value.email) {
      document
        .getElementById("error")
        .textContent = "Les emails ne correspondent pas.";
      return(false);
      }

    else if(value.email !== "") {
      document
        .getElementById("error")
        .textContent = "Email incorrecte";
      return(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value.email));
    }

    else {
      alert("Une ERREUR inattendue c'est produite , veuillez reessayer");
      return(false)
    }

  }

// Page de confirmation de la commande
function getConfirm() {
  document.getElementById("price").textContent =  sessionStorage.getItem("totalPrice") + " €";
  document.getElementById("orderId").textContent = orderId;
}