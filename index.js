let productInLS = JSON.parse(localStorage.getItem("article"));

//Cameras

if (window.location.pathname == "/ThibaultSalagnac_5_23022021/index.html"
) {
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
        catalogueDiv.innerHTML = "<div class=\"card mb-4 box-shadow\"><div class=\"embed-responsive embed-responsive-16by9\"><img class=\"card-img-top embed-responsive-item\" src=\"" + value[i].imageUrl + "\" alt=\"Card image cap\"></div><div class=\"card-body\"><h4 class=\"card-title\">"+ value[i].name +"</h4><p class=\"card-text\">"+ value[i].description +"</p><div class=\"d-flex justify-content-between align-items-center\"><a href=\"./product.html?"+ value[i]._id +"\" type=\"button\" class=\"btn btn-sm btn-outline-secondary stretched-link\">Détails</a><small class=\"text-muted\">"+ value[i].price / 100 + "€" +"</small></div></div></div>";
        catalogue.appendChild(catalogueDiv);
      }

    })

    .catch(function(err) {
      console.log("Echec de la requete");
      // Une erreur est survenue
    });
} 

//Camera selectionner

else if (window.location.pathname == "/ThibaultSalagnac_5_23022021/product.html") {
  fetch("http://localhost:3000/api/cameras")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })

  .then(function(value){
    console.table(value);
    for (let i in value){
      if ("?" + value[i]._id == window.location.search){
        // card du produit selectionner
        const productDiv = document.createElement("div");
        productDiv.classList.add("card","mb-4","box-shadow");
        productDiv.innerHTML = "<img class=\"card-img-top\" src=\"" + value[i].imageUrl + "\" alt=\"Un article du magasin\"><div class=\"card-body\"><h4 class=\"card-title\">"+ value[i].name +"</h4><p class=\"card-text\">"+ value[i].description +"</p><div class=\"d-flex justify-content-between align-items-center flex-column-reverse flex-sm-row\"><div class=\"btn-group pt-3 pt-sm-0\"><button id=\"addCart\" type=\"button\" class=\"btn btn-success\">Ajouter au Panier</button><select id=\"select\" class=\"form-select mr-3 rounded-right\" aria-label=\"Optique pour appareil photo\"><option id=\"option\" selected>Optiques</option></select></div><small class=\"text-muted\">"+ value[i].price / 100 + "€" +"</small></div></div>";
        product.appendChild(productDiv);
        // menu deroulant des options
        const eltOption = document.getElementById("option");
        for (let j in value[i].lenses){
        eltOption.insertAdjacentHTML("afterend", "<option value=\""+ (parseInt(value[i].lenses.length) - j - 1) +"\">"+ value[i].lenses[j] +"</option>");
        }
      }
    }

    addCart.addEventListener("click", function(event) {
      event.preventDefault();
      if(productInLS){
        for (let i in value){
          if ("?" + value[i]._id == window.location.search){
            productInLS.push(value[i]);

            //let index = productInLS.length;
            //productInLS[index].lenses = value[i].lenses[document.getElementById("select").options.selectedIndex];
           
            localStorage.setItem("article", JSON.stringify(productInLS));
            alert("Article ajouter au panier");
          } else console.log("Not this one");
        }
      } else {
        productInLS = [];
        for (let i in value){
          if ("?" + value[i]._id == window.location.search){
            productInLS.push(value[i]);
      
            //productInLS[0].lenses = value[i].lenses[document.getElementById("select").options.selectedIndex];
            
            localStorage.setItem("article", JSON.stringify(productInLS));
            alert("Article ajouter au panier");
          } else console.log("Not this one");
        }
      }
    })
  })

  .catch(function(err) {
    console.log("Echec de la requete");
    // Une erreur est survenue
  });

} else {
  alert("error !");
}

//----------LocalStorage------------
//----------------------------------

