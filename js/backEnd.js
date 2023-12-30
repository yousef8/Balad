import { worldNewsKey, emailKey, serviceId, templateId } from "./apiKeys.js"

(function () {
  emailjs.init(emailKey);
})();

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

function addNews(news) {
  let newsRow = document.getElementById("news-row")
  newsRow.innerHTML += `
        <div class="col-md-3 col-sm-6">
          <div class="news-box">
            <div class="new-thumb"> <img src="${news.image}" alt="">
            </div>
            <div class="new-txt">
              <ul class="news-meta">
                <li>${news.publish_date}</li>
              </ul>
              <h6><a href="${news.url}">${news.title}</a></h6>
              <p>${news.text.slice(0, 101)}...</p>
            </div>
            <div class="news-box-f"> <img
                src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
                alt="">${news.author}<a href="${news.url}"><i class="fas fa-arrow-right"></i></a>
            </div>
          </div>
        </div>`

}

async function bindCountryNews(country) {
  let res = await fetch(`https://api.worldnewsapi.com/search-news?api-key=${worldNewsKey}&source-countries=${country.cca2}`)
  res = await res.json()
  let news = res.news

  let newsRow = document.getElementById("news-row")
  newsRow.innerHTML = ``
  news.forEach((e) => {
    addNews(e)
  })

}

async function bindCountryData(name) {
  let country = await getCountry(name)
  bindCountryInfo(country[0])
  bindCountryFacts(country[0])
  await bindCountryNews(country[0])
}

//---------------------------Driving Code----------------------------------------------
populateCountries()

let selectBox = document.getElementById("select-box")
selectBox.addEventListener("change", (ev) => bindCountryData(ev.target.value))

let contactForm = document.getElementById("contact-form")
contactForm.addEventListener("submit", (ev) => {
  ev.preventDefault();
  emailjs.sendForm(serviceId, templateId, ev.target)
    .then(function (res) {
      console.log('SUCCESS!', res.status, res.text);
    }, function (error) {
      console.log('FAILED...', error);
    });
  ev.target.reset()
})