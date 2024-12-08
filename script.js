function getData() {
  fetch('data.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erreur réseau');
      }
      return response.json();
    })
    .then((data) => {
      afficherNav(data);
      afficherHeader(data);
      afficherBoutonsGroupes(data);
      AfficherExperts(data); // rappelle toi tjrs c'est pour appeler les fonctions
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des données :", error);
    });
}


getData();

function afficherNav(data) {
  if (!data || !data.magCAN) {
    console.error("Erreur : Les données pour 'magCAN' sont manquantes.");
    return;
  }

  let magCAN = data.magCAN;
  let titreMag = magCAN.titreMag || "Titre";
  let abonnement = magCAN.boutonAbonner || "S'abonner";
  let categories = magCAN.categoriesCAN || [];

  let categoriesList = "";

  categories.forEach((categorie) => {
    categoriesList += `<li>${categorie.nomCategorie}</li>`;
  });

  let nav = `
    <div class="logo">
      <div class="shapes">
        <div class="triangle"></div>
        <div class="circle"></div>
        <div class="rectangle"></div>
      </div>
      <span class="logo-text">${titreMag}</span>
    </div>
    <ul>
      ${categoriesList}
    </ul>
    <button class="subscribe-button">${abonnement}</button>
  `;

  let conteneur = document.getElementById("nav");
  if (conteneur) {
    conteneur.innerHTML = nav; // Remplace le contenu pour éviter les doublons
  } else {
    console.error("Erreur : Le conteneur 'nav' est introuvable.");
  }
}

function afficherHeader(data) {
  if (!data || !data.magCAN || !data.magCAN.articleVedette) {
    console.error("Erreur : Les données pour 'articleVedette' sont manquantes.");
    return;
  }

  let articleVedette = data.magCAN.articleVedette; 
  let titre = articleVedette.titrePrincipal; 
  let resume = articleVedette.resume;
  let date = articleVedette.datePublication; 

  document.getElementById("titre").textContent = titre;
  document.getElementById("resume").textContent = resume;
  document.getElementById("datePublication").textContent = `Publié le : ${date}`;
}



function AfficherExperts(data) {
  if (!data || !data.magCAN || !data.magCAN.expertsCAN) {
    console.error("Erreur : Les données pour 'expertsCAN' sont manquantes.");
    return;
  }

  
  let experts = data.magCAN.expertsCAN;

  
  let expertsContainer = document.getElementById("experts-container");
  if (!expertsContainer) {
    console.error("Erreur : Le conteneur 'experts-container' est introuvable.");
    return;
  }

  
  experts.forEach((expert) => {
    let CarteExpert = document.createElement("div");
    CarteExpert.className = "expert-card";
    CarteExpert.innerHTML = `
      <h3>${expert.prenomExpert || "Nom inconnu"}</h3>
      <p>${expert.expertise || "Expertise non spécifiée"}</p>
    `;
    expertsContainer.appendChild(CarteExpert);
  });
}

