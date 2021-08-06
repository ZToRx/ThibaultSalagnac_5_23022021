
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
          const catalogueDiv = document.createElement("div");
          catalogueDiv.classList.add("col-md-4");
          catalogueDiv.innerHTML = "<div class=\"card mb-4 box-shadow\"><div class=\"embed-responsive embed-responsive-16by9\"><img class=\"card-img-top embed-responsive-item\" src=\"" + value[i].imageUrl + "\" alt=\"Card image cap\"></div><div class=\"card-body\"><h4 class=\"card-title\">"+ value[i].name +"</h4><p class=\"card-text\">"+ value[i].description +"</p><div class=\"d-flex justify-content-between align-items-center\"><a href=\"./product.html?"+ value[i]._id +"\" type=\"button\" class=\"btn btn-sm btn-outline-secondary stretched-link\">Détails</a><small class=\"text-muted\">"+ value[i].price / 100 + "€" +"</small></div></div></div>";
          catalogue.appendChild(catalogueDiv);
      }

    })

    .catch(function(err) {
      // Une erreur est survenue
    });
} 
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
      const productDiv = document.createElement("div");
      productDiv.classList.add("card","mb-4","box-shadow");
      productDiv.innerHTML = "<img class=\"card-img-top\" src=\"" + value[i].imageUrl + "\" alt=\"Un article du magasin\"><div class=\"card-body\"><h4 class=\"card-title\">"+ value[i].name +"</h4><p class=\"card-text\">"+ value[i].description +"</p><div class=\"d-flex justify-content-between align-items-center flex-column-reverse flex-sm-row\"><div class=\"btn-group pt-3 pt-sm-0\"><button type=\"button\" class=\"btn btn-success\">Ajouter au Panier</button><select class=\"form-select mr-3 rounded-right\" aria-label=\"Default select example\"><option id=\"option\" selected>Optiques</option></select></div><small class=\"text-muted\">"+ value[i].price / 100 + "€" +"</small></div></div>";
      product.appendChild(productDiv);
      const eltOption = document.getElementById("option");
      for (let j in value[i].lenses){
      eltOption.insertAdjacentHTML("afterend", "<option value=\""+ j +"\">"+ value[i].lenses[j] +"</option>");
      }
    }
    }
  })
//<option value=\"1\">"+ value[i].lenses[0] +"</option><option value=\"2\">"+ value[i].lenses[1] +"</option><option value=\"3\">"+ value[i].lenses[2] +"</option>
  .catch(function(err) {
    // Une erreur est survenue
  });
} 
else {
  alert("error !");
}

