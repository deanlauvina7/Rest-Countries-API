// selectors
const countriesEl = document.getElementById('countries');
const toggleBtn = document.getElementById('toggle');
const filterBtn = document.getElementById('filter');
const regionFilters = document.querySelectorAll('li');
const searchEl = document.getElementById('search');


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
    countriesEl.appendChild(countryEl);
  });
};

// toggle theme 
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// show and hide the filters
filterBtn.addEventListener('click', () => {
  filterBtn.classList.toggle('open');
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
    const countryRegion = document.querySelectorAll('.country-region');

    countryRegion.forEach(region => {
      if (region.innerText.toLowerCase().includes(filter.innerText.toLowerCase())) {
        region.parentElement.parentElement.style.display = 'block';
      } else {
        region.parentElement.parentElement.style.display = 'none';
      }
    });
  });
});