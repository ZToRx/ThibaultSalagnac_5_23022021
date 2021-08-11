let productInLS = JSON.parse(localStorage.getItem("article"));
let selected;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id")

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
    console.table(value);

    for(let i in value) {
      //card de chaque pruduit
      const catalogueDiv = document.createElement("div");
      catalogueDiv.classList.add("col-md-4");
      catalogueDiv.innerHTML = "<div class=\"card mb-4 box-shadow\"><div class=\"embed-responsive embed-responsive-16by9\"><img class=\"card-img-top embed-responsive-item\" src=\"" + value[i].imageUrl + "\" alt=\"Card image cap\"></div><div class=\"card-body\"><h4 class=\"card-title\">"+ value[i].name +"</h4><p class=\"card-text\">"+ value[i].description +"</p><div class=\"d-flex justify-content-between align-items-center\"><a href=\"./product.html?id="+ value[i]._id +"\" type=\"button\" class=\"btn btn-sm btn-outline-secondary stretched-link\">Détails</a><small class=\"text-muted\">"+ value[i].price / 100 + "€" +"</small></div></div></div>";
      catalogue.appendChild(catalogueDiv);
    }

  })

  .catch(function(err) {
    console.log("Echec de la requete");
    // Une erreur est survenue
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
    console.table(value);
    // card du produit selectionner
    const productDiv = document.createElement("div");
    productDiv.classList.add("card","mb-4","box-shadow");
    productDiv.innerHTML = "<img class=\"card-img-top\" src=\"" + value.imageUrl + "\" alt=\"Un article du magasin\"><div class=\"card-body\"><h4 class=\"card-title\">"+ value.name +"</h4><p class=\"card-text\">"+ value.description +"</p><div class=\"d-flex justify-content-between align-items-center flex-column-reverse flex-sm-row\"><div class=\"btn-group pt-3 pt-sm-0\"><button id=\"addCart\" type=\"button\" class=\"btn btn-success\">Ajouter au Panier</button><select id=\"select\" onchange=\"getSelectValue();\" class=\"form-select mr-3 rounded-right\" aria-label=\"Optique pour appareil photo\"><option id=\"option\" value\"null\">Optiques</option></select></div><small class=\"text-muted\">"+ value.price / 100 + "€" +"</small></div></div>";
    product.appendChild(productDiv);
    // menu deroulant des options
    const eltOption = document.getElementById("option");
      for (let j in value.lenses){
    eltOption.insertAdjacentHTML("afterend", "<option value=\""+ value.lenses[j] +"\">"+ value.lenses[j] +"</option>");
    }

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
    // Une erreur est survenue
  });
}

function getCart() {
  let value = JSON.parse(localStorage.getItem("article"))
  let price = 0;
  console.log(value)
  for(let i in value){
    const cartDiv = document.createElement("div");
    cartDiv.classList.add("col-md-6", "col-lg-4");
    cartDiv.innerHTML = "<div class=\"card mb-4 box-shadow\"><div class=\"embed-responsive embed-responsive-16by9\"><img class=\"card-img-top embed-responsive-item\" src=\"" + value[i].imageUrl + "\" alt=\"Card image cap\"></div><div class=\"card-body\"><h4 class=\"card-title\">"+ value[i].name +"</h4><p class=\"card-text\">"+ value[i].description +"</p><div class=\"d-flex justify-content-between align-items-center\"><p id=\"optique\" class=\"text-muted\">Optique : "+ value[i].lenses +"</p><small class=\"text-muted\">"+ value[i].price / 100 + "€" +"</small></div></div></div>";
    cart.appendChild(cartDiv);
    price = price + value[i].price;
  }
  document
    .getElementById("price")
    .textContent = price/100 + " €";
  document
    .getElementById("totalArticle")
    .textContent = price/100 + " €";

  function send(e) {
    e.preventDefault();
    fetch("https://mockbin.com/request", {
      method: "POST",
      headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
      },
      body: localStorage.getItem("article")
    })

    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })

    .then(function(value) {
        console.log(value.postData.text);
    });

  }
  
  document
    .getElementById("form")
    .addEventListener("submit", send);
  
}
