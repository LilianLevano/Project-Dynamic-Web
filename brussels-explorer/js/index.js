"use strict";

const fetchData = async () => {
  try {
    const res = await fetch(
      "https://opendata.brussels.be/api/explore/v2.1/catalog/datasets/bruxelles_lieux_culturels/records?limit=20",
    );
    if (!res.ok) {
      throw new Error("could not fetch");
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {}
};

let inputFiltervalue = document.getElementById("input-filter-postcode").value;

inputFiltervalue = Number(inputFiltervalue);

const filterbutton = document.getElementById("filter");


filterbutton.addEventListener("click", async () => {

  const data = await fetchData();
  
  data.results.forEach((element) => {

    if (inputFiltervalue === element.code_postal) {
      console.log(element);
    }
  });

});
    

const updateMainList = (arrayResults) =>{
    const sectionCardContainer = document.getElementById('table-container')
    sectionCardContainer.innerHTML = "";

    for(let locatie of arrayResults){


        const lat = locatie.coordonnees_geographiques.lat;
        const lon = locatie.coordonnees_geographiques.lon;

        const card = document.createElement('article')
        card.classList.add('card')



        const iframe = document.createElement('iframe')
        iframe.src = `https://www.google.com/maps?q=&layer=c&cbll=${lat},${lon}&cbp=11,0,0,0,0&output=svembed`

            iframe.setAttribute("allow", "accelerometer; gyroscope");
            iframe.setAttribute("allowfullscreen", "true");

            iframe.width = "450";
            iframe.height = "350";
            iframe.style.border = "0";

        card.appendChild(iframe)



        const divInformatieText = document.createElement('div')
        divInformatieText.classList.add('informatie-text')

        
        const beschrijvingLocatie = document.createElement('h2')
        beschrijvingLocatie.textContent = locatie.beschrijving 
        divInformatieText.appendChild(beschrijvingLocatie)

        const adres = document.createElement('p')
        adres.textContent = locatie.adres + ", "
        divInformatieText.appendChild(adres)

        const postCode = document.createElement('span')
        postCode.textContent = locatie.code_postal
        adres.appendChild(postCode)

        const plaats = document.createElement('p')
        plaats.textContent = locatie.plaats
        divInformatieText.appendChild(plaats)

        const geolocatie = document.createElement('p')
        geolocatie.textContent = locatie.coordonnees_geographiques.lat + ", " + locatie.coordonnees_geographiques.lat
        divInformatieText.appendChild(geolocatie)

        card.appendChild(divInformatieText)

        const iframeMaps = document.createElement('iframe')
        iframeMaps.src = `https://www.google.com/maps?q=${lat},${lon}&output=embed`
        
                    iframeMaps.setAttribute("allowfullscreen", "true");
                    iframeMaps.setAttribute("lazy", "true");

            iframeMaps.width = "300";
            iframeMaps.height = "250";
            iframeMaps.style.border = "0";
        
        card.appendChild(iframeMaps)

        sectionCardContainer.appendChild(card)

    }
}


document.addEventListener('DOMContentLoaded', async ()=>{
    
    const data = await fetchData();
    const arrayResults = data.results 

    updateMainList(arrayResults);

    
    
  
    


})