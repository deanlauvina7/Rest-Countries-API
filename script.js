// selectors
const countriesEl = document.getElementById('countries');
const toggleBtn = document.getElementById('toggle');
const filterBtn = document.getElementById('filter');
const regionFilters = document.querySelectorAll('li');
const searchEl = document.getElementById('search');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close');


// functions
getCountries();

async function getCountries() {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const countries = await res.json();

  displayCountries(countries);
};

function displayCountries(countries) {
  countriesEl.innerHTML = '';
  countries.forEach(country => {
    const countryEl = document.createElement('div');
    countryEl.classList.add('card');
    countryEl.innerHTML = `
      <div>
        <img src="${country.flag}" alt="${country.name}">
      </div>
      <div class="card-body">
        <h2 class="country-name">${country.name}</h2>
        <p><strong>Population: </strong>${country.population}</p>
        <p class="country-region"><strong>Region: </strong>${country.region}</p>
        <p><strong>Capital: </strong>${country.capital}</p>
              </div>
  `;

    countryEl.addEventListener('click', () => {
      modal.style.display = 'flex';
      showCountryDetails(country);
    });

    countriesEl.appendChild(countryEl);
  });
};

function showCountryDetails(country) {
  const modalBody = modal.querySelector('.modal-body');
  const modalImg = modal.querySelector('img');

  modalImg.src = country.flag;
  modalImg.alt = country.name;

  modalBody.innerHTML = `  
  <h2>${country.name}</h2>
    <p><strong>Native Name: </strong>${country.nativeName}</p>
    <p><strong>Population: </strong>${country.population}</p>
    <p class="country-region"><strong>Region: </strong>${country.region}</p>
    <p class="country-region"><strong>Sub Region: </strong>${country.subregion}</p>
    <p><strong>Capital: </strong>${country.capital}</p>
    <p><strong>Top Level Domain: </strong>${country.topLevelDomain[0]}</p>
    <p><strong>Currencies: </strong>${country.currencies.map(currency => currency.code)}</p>
    <p><strong>Languages: </strong>${country.languages.map(language => language.name)}</p>
    `;
}

// buttons
toggleBtn.addEventListener('click', () => {
  // toggle theme 
  document.body.classList.toggle('dark');
});

filterBtn.addEventListener('click', () => {
  // show and hide the filters
  filterBtn.classList.toggle('open');
});

closeBtn.addEventListener('click', () => {
  // close modal button
  modal.style.display = 'none';
});

// search for a country
searchEl.addEventListener('input', (e) => {
  const val = e.target.value;
  const countryName = document.querySelectorAll('.country-name');

  countryName.forEach(name => {
    if (name.innerText.toLowerCase().includes(val.toLowerCase())) {
      name.parentElement.parentElement.style.display = 'block';
    } else {
      name.parentElement.parentElement.style.display = 'none';
    }
  });
});

// filter out countries by part of world
regionFilters.forEach(filter => {
  filter.addEventListener('click', () => {
    const value = filter.innerText;
    const countryRegion = document.querySelectorAll('.country-region');

    countryRegion.forEach(region => {
      if (region.innerText.includes(value) || value === 'All') {

        region.parentElement.parentElement.style.display = 'block';
      } else {
        region.parentElement.parentElement.style.display = 'none';
      }
    });
  });
});