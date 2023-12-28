async function populateCountries() {
  let selectOpt = document.getElementById("select-options")
  let selectBox = document.getElementById("select-box")

  let res = await fetch("https://restcountries.com/v3.1/all?fields=name")
  let countries = await res.json()
  countries.forEach(elem => {
    selectOpt.innerHTML += `<option value="${elem.name.common}">${elem.name.common}</option>`
  });
}

populateCountries()