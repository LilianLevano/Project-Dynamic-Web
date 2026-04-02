# Project Dynamic Web - BrusselsExplorer

Personen die aan dit project hebben gewerkt: Lilian Levano, Bilal Benhammou

## Projectbeschrijving en functionaliteiten  

Ontdekkingstocht door Brussel – Een interactieve webapplicatie voor het verkennen van culturele locaties in Brussel met behulp van open data.

Dit project is gemaakt in het kader van het vak Dynamic Web aan Erasmus Hogeschool Brussel. Het is een groepsproject waarbij we een volledig functionele, dynamische webapplicatie hebben gebouwd die gebruikmaakt van echte overheidsdata.

## Gebruikte API's met links

Open Data van Stad Brussel, dataset van Culturele plaatsen gelegen op het grondgebied van de Stad Brussel
Link naar API: https://opendata.brussels.be/explore/dataset/bruxelles_lieux_culturels/information/

## Implementatie van technische vereisten  

| Technische vereiste                                      | Lijn nummer |
|----------------------------------------------------------|-------------|
| Elementen selecteren                                     |#63          |
| Elementen manipuleren                                    |#71          |
| Events aan elementen koppelen                            |#129         |
| Gebruik van constanten                                   |#90          |
| Template literals                                        |#19, #145    |
| Iteratie over arrays                                     |#53-56, #93-#202|
| Array methodes                                           |#267          |
| Arrow functions                                          |#87           |
| Conditional (ternary) operator                           |#24-28        |
| Callback functions                                       |#405 (#290)   |
| Promises                                                 |    /         |
| Async & Await                                            |#434 + #436   |
| Observer API                                             |#372-392      |
| Fetch om data op te halen                                |#22           |
| JSON manipuleren en weergeven                            |#163, #167, #171,...|
| Formulier validatie                                      |#414         |
| Gebruik van LocalStorage                                 |#435, #129-141|
| Basis HTML layout                                        |             |
| Basis CSS                                                |             |
| Gebruiksvriendelijke elementen                           |             |

## Installatiehandleiding 

1. Clone deze Git Repository op een eigen folder.
2. Zet deze eigen folder op een server (bv. Live Server met VS-Code)
3. Open index.html

## Screenshots van de applicatie    (Bilal)

![home pagina](/brussels-explorer/images/screenshots_readme/homepage.png)

## Gebruikte bronnen          (Samen)

ChatGPT om CSS gerelateerde problemen op te lossen en problemen die vanuit concepten komen die we niet in de les hebben behandeld (bijvoorbeeld WebGL). 
- https://chatgpt.com/share/69ce71f5-aedc-8389-82aa-fae332f9ce58
- https://chatgpt.com/share/69ce720d-771c-8385-a2df-b5cafc041092
- https://chatgpt.com/share/69ce72d1-75ac-8395-b661-700861224aef --> De API stuurt een link naar Google Street View die we niet in Iframes kunnen gebruiken, waardoor we een link moest zoeken die we wel konden gebruiken waar we de geolocalisatie gebruiken, wat voor veel WebGL errors en warnings zorgde.

Unsplash voor de background header (https://unsplash.com/fr/photos/portail-en-beton-brun-m39OKAexaqo)

Google Icons and Fonts voor de verschillende SVG's en Fonts.

## Taakverdeling 

| Dag       | Lilian                                                                 | Bilal                                                                 | Samen                                      |
|-----------|------------------------------------------------------------------------|----------------------------------------------------------------------|-------------------------------------------|
| Dinsdag   | Basis HTML en CSS aanleggen (met placeholder)                         | API mogelijkheden opzoeken (hoe werkt de url, ...)                  | User stories / backlog <br> Opmaak website brainstormen                   |
| Woensdag  | Verwerk data in de lijst <br> Zoekmethode opstellen <br> Taalsysteem                  | Fetch API + JSON <br> Filter optie <br> Responsive design           | Github samen leren (voormiddag), Observer API bespreken en aanmaken           |
| Donderdag | Favoriete locaties (localStorage) <br> Formulier validatie            | Responsive design <br> Sorteer mogelijkheid <br> Foutmeldingen       | Commentaar, backlog afwerken, README <br> Samen denken op hoe we de code clean kunnen maken    |
| Vrijdag   |                                                                        |                                                                      | README afmaken, laatste details checken                            |
