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
  } catch (error) {}
};

fetchData();
