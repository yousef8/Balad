async function populateCountries() {
  let selectOpt = document.getElementById("select-options")

  let res = await fetch("https://restcountries.com/v3.1/all?fields=name")
  let countries = await res.json()
  countries.forEach(elem => {
    selectOpt.innerHTML += `<option value="${elem.name.common}">${elem.name.common}</option>`
  });
}

async function getCountry(name) {
  let res = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
  let country = res.json()
  return country
}

function bindCountryInfo(country) {
  let flag = document.getElementById("flag")
  flag.src = country.flags.svg

  let coatOfArms = document.getElementById("coat-of-arms")
  coatOfArms.src = country.coatOfArms.svg

  let unStatus = document.getElementById("un-status")
  if (country.unMember) {
    unStatus.innerHTML = `
    <a href="aboutus.html#">United Nations
        <i class="fas fa-check"></i>
    </a>`

  } else {
    unStatus.innerHTML = `
    <a href="aboutus.html#">United Nations
        <i class="fas fa-times"></i>
    </a>`
  }

  let independentStatus = document.getElementById("independent-status")
  if (country.independent) {
    independentStatus.innerHTML = `
    <a href="#">Independent
      <i class="fas fa-check"></i>
    </a>`
  } else {
    independentStatus.innerHTML = `
    <a href="#">Independent
      <i class="fas fa-times"></i>
    </a>`

  }

}

function bindCountryFacts(country) {
  let population = document.getElementById("population")
  population.innerHTML = country.population.toLocaleString("en-US");

  let continent = document.getElementById("continent")
  continent.innerHTML = country.region

  let startOfWeek = document.getElementById("start-of-week")
  startOfWeek.innerHTML = country.startOfWeek.charAt(0).toUpperCase() + country.startOfWeek.slice(1)

  let timeZone = document.getElementById("time-zone")
  timeZone.innerHTML = country.timezones[0]

  let capital = document.getElementById("capital")
  capital.innerHTML = country.capital[0]
}

async function bindCountryData(name) {
  let country = await getCountry(name)
  bindCountryInfo(country[0])
  bindCountryFacts(country[0])
}

//---------------------------Driving Code----------------------------------------------
populateCountries()

let selectBox = document.getElementById("select-box")
selectBox.addEventListener("change", (ev) => bindCountryData(ev.target.value))