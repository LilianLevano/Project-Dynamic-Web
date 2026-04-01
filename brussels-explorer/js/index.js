"use strict";

const fetchData = async () => {
  try {

    let taal;

    if(localStorage.getItem('taal') == "fr"){
      taal = "fr"
    }else{
      taal = "nl"
    }

    const url = `https://opendata.brussels.be/api/explore/v2.1/catalog/datasets/bruxelles_lieux_culturels/records?limit=30&lang=${taal}`

    const res = await fetch(
      url,
    );

    !res.ok
      ? (() => {
          throw new Error("Could not fetch");
        })()
      : null;

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

// sfg 


let data = await fetchData();
if (!data) {
  throw new Error("No data available");
}
let allLocations = data.results;


const checkLanguage = () =>{

  const language = localStorage.getItem('taal')

  const labelForInputFilterPostcode = document.getElementById('label-input-filter-postcode')
  const titelWebpagina = document.getElementById('title-main-page')
  const buttonFilter = document.getElementById('filter')
  const searchButton = document.getElementById('search-button')

  if(language == "fr"){
    labelForInputFilterPostcode.textContent = "Code Postale:"
    titelWebpagina.textContent = "Découvrez Bruxelles"
    buttonFilter.textContent = "Filtrer"
    searchButton.textContent = "Recherchez une location"
  }else{
    labelForInputFilterPostcode.textContent = "Post-code:"
    titelWebpagina.textContent = "Brussel Ontdekken"
    buttonFilter.textContent = "Filtreren"
    searchButton.textContent = "Een locatie opzoeken"
  }

}

checkLanguage();

// functie om de lijst van locaties op de main pagina up te daten. Het wordt bij het laden van de site automatisch opgeroept.

const updateMainList = (arrayResults) => {
  const sectionCardContainer = document.getElementById("table-container");
  sectionCardContainer.innerHTML = "";

  for (let locatie of arrayResults) {
    const lat = locatie.coordonnees_geographiques.lat;
    const lon = locatie.coordonnees_geographiques.lon;

    const card = document.createElement("article");
    card.classList.add("card");

    const iframe = document.createElement("iframe");
    // zet de echte source in dataset.src om ervoor te zorgen dat die op een lazy manier worden geladen met een observer
    iframe.dataset.src = `https://www.google.com/maps?q=&layer=c&cbll=${lat},${lon}&cbp=11,0,0,0,0&output=svembed`;

    iframe.setAttribute("allow", "accelerometer; gyroscope");
    iframe.setAttribute("allowfullscreen", "true");

    iframe.width = "450";
    iframe.height = "350";
    iframe.style.border = "0";

    iframe.classList.add("lazy-iframe");

    card.appendChild(iframe);

    const divInformatieText = document.createElement("div");
    divInformatieText.classList.add("informatie-text");

    const beschrijvingLocatie = document.createElement("h2");
    beschrijvingLocatie.textContent = locatie.beschrijving || locatie.description;
    divInformatieText.appendChild(beschrijvingLocatie);

    const adres = document.createElement("p");
    adres.textContent = locatie.adres || locatie.adresse + ", ";
    divInformatieText.appendChild(adres);

    const postCode = document.createElement("span");
    postCode.textContent = locatie.code_postal;
    adres.appendChild(postCode);

    const plaats = document.createElement("p");
    plaats.textContent = locatie.plaats || locatie.lieu;
    divInformatieText.appendChild(plaats);

    const geolocatie = document.createElement("p");
    geolocatie.textContent = `${lat}, ${lon}`;

    divInformatieText.appendChild(geolocatie);

    card.appendChild(divInformatieText);

    const iframeMaps = document.createElement("iframe");
    iframeMaps.dataset.src = `https://www.google.com/maps?q=${lat},${lon}&output=embed`;

    iframeMaps.setAttribute("allowfullscreen", "true");

    iframeMaps.width = "300";
    iframeMaps.height = "250";
    iframeMaps.style.border = "0";
    iframeMaps.classList.add("lazy-iframe");

    card.appendChild(iframeMaps);

    sectionCardContainer.appendChild(card);

    observer.observe(iframe); // een observer wordt toegevoegd aan elke iframe wanneer het gemaakt wordt
    observer.observe(iframeMaps);
  }
};

// functie om de search cover aan te maken.
// deze functie doet een callback naar een andere functie, namelijk die om de lijst van locaties hiervan up te daten.
const makeSearchCover = (callback) => {
  const searchCover = document.createElement("section");
  searchCover.classList.add("search-cover");
  document.body.appendChild(searchCover);

  const article = document.createElement("article");
  article.classList.add("card-search");

  const ns = "http://www.w3.org/2000/svg";

  // maak de svg
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("xmlns", ns);
  svg.setAttribute("height", "40px");
  svg.setAttribute("width", "40px");
  svg.setAttribute("viewBox", "0 -960 960 960");
  svg.setAttribute("fill", "#000000");
  svg.classList.add("close-search");

  // zet de path van de svg
  const path = document.createElementNS(ns, "path");
  path.setAttribute(
    "d",
    "m251.33-204.67-46.66-46.66L433.33-480 204.67-708.67l46.66-46.66L480-526.67l228.67-228.66 46.66 46.66L526.67-480l228.66 228.67-46.66 46.66L480-433.33 251.33-204.67Z",
  );

  // voeg de element path aan de svg toe
  svg.appendChild(path);

  svg.addEventListener("click", () => {
    searchCover.remove();
 
  });

  article.appendChild(svg);

  const svgForSearchBar = document.createElementNS(ns, "svg");
  svgForSearchBar.setAttribute("xmlns", ns);
  svgForSearchBar.setAttribute("height", "40px");
  svgForSearchBar.setAttribute("width", "40px");
  svgForSearchBar.setAttribute("fill", "#000000");
  svgForSearchBar.setAttribute("viewBox", "0 -960 960 960");

  const pathForSearchBar = document.createElementNS(ns, "path");
  pathForSearchBar.setAttribute(
    "d",
    "M792-120.67 532.67-380q-30 25.33-69.67 39.67Q423.33-326 378.67-326q-108.34 0-183.5-75.17Q120-476.33 120-583.33t75.17-182.17q75.16-75.17 182.83-75.17 107 0 181.83 75.17 74.84 75.17 74.84 182.17 0 43.33-14 83-14 39.66-40.67 73l260 258.66-48 48Zm-414-272q79 0 134.5-55.83T568-583.33q0-79-55.5-134.84Q457-774 378-774q-79.67 0-135.5 55.83-55.83 55.84-55.83 134.84T242.5-448.5q55.83 55.83 135.5 55.83Z",
  );

  svgForSearchBar.appendChild(pathForSearchBar);

  const label = document.createElement("label");

  label.setAttribute("for", "search-bar");
  label.appendChild(svgForSearchBar);

  const input = document.createElement("input");
  input.type = "search";
  input.id = "search-bar";


    
  input.addEventListener('input',() =>{

    const newArrayLocations = allLocations.filter(location => location.beschrijving.toLowerCase().includes(input.value.toLowerCase()))    // array method, filtert alle objecten waarvan de beschrijving niet gelijk is aan input
    updateLijstInSearchCover(newArrayLocations)
  })

  article.appendChild(label);
  article.appendChild(input);

  const section = document.createElement("section");
  section.id = "container-search-items";

  article.appendChild(section);

  searchCover.appendChild(article);

  callback();



};

//functie om de locaties in de seach lijst up te daten.
const updateLijstInSearchCover = (arrayLocations) => {
  const container = document.getElementById('container-search-items')
  container.innerHTML="";

  for(let locatie of arrayLocations){
        const lat = locatie.coordonnees_geographiques.lat;
        const lon = locatie.coordonnees_geographiques.lon;

    const card = document.createElement("article");
    card.classList.add("card");

    const iframe = document.createElement("iframe");
    // zet de echte source in dataset.src om ervoor te zorgen dat die op een lazy manier worden geladen met een observer
    iframe.dataset.src = `https://www.google.com/maps?q=&layer=c&cbll=${lat},${lon}&cbp=11,0,0,0,0&output=svembed`;

    iframe.setAttribute("allow", "accelerometer; gyroscope");
    iframe.setAttribute("allowfullscreen", "true");

    iframe.width = "350";
    iframe.height = "250";
    iframe.style.border = "0";

    iframe.classList.add("lazy-iframe");

    card.appendChild(iframe);

    const divInformatieText = document.createElement("div");
    divInformatieText.classList.add("informatie-text");

    const beschrijvingLocatie = document.createElement("h2");
    beschrijvingLocatie.textContent = locatie.beschrijving || locatie.description;
    divInformatieText.appendChild(beschrijvingLocatie);

    const adres = document.createElement("p");
    adres.textContent = locatie.adres || locatie.adresse + ", ";
    divInformatieText.appendChild(adres);

    const postCode = document.createElement("span");
    postCode.textContent = locatie.code_postal;
    adres.appendChild(postCode);

    const plaats = document.createElement("p");
    plaats.textContent = locatie.plaats || locatie.lieu;
    divInformatieText.appendChild(plaats);

    const geolocatie = document.createElement("p");
    geolocatie.textContent = `${lat}, ${lon}`;

    divInformatieText.appendChild(geolocatie);

    card.appendChild(divInformatieText);


    container.appendChild(card);

    observer.observe(iframe); // een observer wordt toegevoegd aan elke iframe wanneer het gemaakt wordt
    
  }


}

const checkLocalStorage = () =>{

  if(localStorage.getItem('taal') === null){
    localStorage.setItem('taal', 'nl')
  }

  if(localStorage.getItem('favorites') === null){
    localStorage.setItem('favorites', JSON.stringify([]))
  }

}

// een observer om ervoor te zorgen dat alle iframes enkel geladen en actief zijn wanneer ze in beeld treden.
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // voor elke item die we in de observer hebben gezet
    const iframe = entry.target;

    if (entry.isIntersecting) {
      // als de element in beeld is
      if (!iframe.hasAttribute("src")) {
        iframe.src = iframe.dataset.src; // zetten we de bron in datasrc in src
      }
    } else {
      iframe.removeAttribute("src"); // als de element buiten beeld valt removen we de hele attribute om bugs te vermijden
    }
  });
}, {threshold: 0.1,   // laad wanneer 10% van de iframe zichtbaar is
  rootMargin: "200px"}); //laad de iframe wanneer het 200px van de beeld is

updateMainList(allLocations); // laad de main pagina met alle objecten


const buttonResetFilter = document.getElementById("reset-filter");
buttonResetFilter.addEventListener("click", () => {

  const inputFilter = document.getElementById("input-filter-postcode");
  inputFilter.value = "";
  updateMainList(allLocations);
});



const buttonOpzoeken = document.getElementById("search-button");
buttonOpzoeken.addEventListener("click", () => {

  makeSearchCover(() => updateLijstInSearchCover(allLocations)) 
  
});




let inputFiltervalue = document.getElementById("input-filter-postcode");
const filterbutton = document.getElementById("filter");

filterbutton.addEventListener("click", () => {
  let input = inputFiltervalue.value;

  const resultList = [];

  for (let element of allLocations) {
    if (input == element.code_postal) {
      resultList.push(element);
    }
  }

  updateMainList(resultList);
});



const buttonTalen = document.querySelectorAll('.language-button')

for(let button of buttonTalen){
  button.addEventListener('click', async ()=>{
    localStorage.setItem('taal', button.value)
    data = await fetchData();
    allLocations = data.results;
    updateMainList(allLocations)
    checkLanguage();

    
  })
}

