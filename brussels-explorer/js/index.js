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

document.addEventListener("DOMContentLoaded", async () => {
  const data = await fetchData();
  console.log(data);
});
