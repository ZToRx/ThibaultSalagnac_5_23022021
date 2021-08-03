
// Oursons

fetch("http://localhost:3000/api/teddies")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.table(value);

    for(let i in value) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("col-md-4")
        newDiv.innerHTML = "<div class=\"card mb-4 box-shadow\"><div class=\"embed-responsive embed-responsive-16by9\"><img class=\"card-img-top embed-responsive-item\" src=\"" + value[i].imageUrl + "\" alt=\"Card image cap\"></div><div class=\"card-body\"><h4 class=\"card-title\">"+ value[i].name +"</h4><p class=\"card-text\">"+ value[i].description +"</p><div class=\"d-flex justify-content-between align-items-center\"><a href=\"./product.html\" type=\"button\" class=\"btn btn-sm btn-outline-secondary stretched-link\">Détails</a><small class=\"text-muted\">"+ value[i].price / 100 + "€" +"</small></div></div></div>";
        catalogue.appendChild(newDiv)
}
  })
  .catch(function(err) {
    // Une erreur est survenue
  });

//Cameras

  fetch("http://localhost:3000/api/cameras")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.table(value);

    for(let i in value) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("col-md-4")
        newDiv.innerHTML = "<div class=\"card mb-4 box-shadow\"><div class=\"embed-responsive embed-responsive-16by9\"><img class=\"card-img-top embed-responsive-item\" src=\"" + value[i].imageUrl + "\" alt=\"Card image cap\"></div><div class=\"card-body\"><h4 class=\"card-title\">"+ value[i].name +"</h4><p class=\"card-text\">"+ value[i].description +"</p><div class=\"d-flex justify-content-between align-items-center\"><a href=\"./product.html\" type=\"button\" class=\"btn btn-sm btn-outline-secondary stretched-link\">Détails</a><small class=\"text-muted\">"+ value[i].price / 100 + "€" +"</small></div></div></div>";
        catalogue.appendChild(newDiv)
}
  })
  .catch(function(err) {
    // Une erreur est survenue
  });

//Meubles

fetch("http://localhost:3000/api/furniture")
.then(function(res) {
  if (res.ok) {
    return res.json();
  }
})
.then(function(value) {
  console.table(value);

  for(let i in value) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("col-md-4")
    newDiv.innerHTML = "<div class=\"card mb-4 box-shadow\"><div class=\"embed-responsive embed-responsive-16by9\"><img class=\"card-img-top embed-responsive-item\" src=\"" + value[i].imageUrl + "\" alt=\"Card image cap\"></div><div class=\"card-body\"><h4 class=\"card-title\">"+ value[i].name +"</h4><p class=\"card-text\">"+ value[i].description +"</p><div class=\"d-flex justify-content-between align-items-center\"><a href=\"./product.html\" type=\"button\" class=\"btn btn-sm btn-outline-secondary stretched-link\">Détails</a><small class=\"text-muted\">"+ value[i].price / 100 + "€" +"</small></div></div></div>";
    catalogue.appendChild(newDiv)
}
})
.catch(function(err) {
  // Une erreur est survenue
});