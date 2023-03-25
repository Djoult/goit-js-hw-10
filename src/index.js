import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetch-countries';
// import countryCardTemplate from './templates/country-card.hbs';
const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener(
  'input',
  debounce(handleCountryInput, DEBOUNCE_DELAY)
);
// fetchCountries('Ukraine');
function handleCountryInput(e) {
  // e.preventDefault();
  const query = e.target.value.trim();
  if (query === '') {
    clearMarkUp();
    return;
  }
  fetchCountries(query)
    .then(data => {
      console.log(data[0].name);
      if (data.length > 10) {
        clearMarkUp();
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (data.length <= 10 && data.length > 1) {
        clearMarkUp();
        createCountriesList(data);
        return;
      }
      clearMarkUp();
      createCountry(data);
    })
    .catch(() => {
      clearMarkUp();
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });

  // fetchCountries(text).then(console.log);
}

function createCountriesList(countries) {
  countries.map(({ flags, name }) => {
    countryList.insertAdjacentHTML(
      'beforeend',
      `
        <li class="country-list__item">
          <img width="30"
            class="country-flag"
            src="${flags.svg}"
            alt="flag of ${name.official}"
          >
          <p class="country-name">${name.official}</p>
        </li>
      `
    );
  });
}

function createCountry(country) {
  country.map(({ name, flags, capital, population, languages }) => {
    countryInfo.insertAdjacentHTML(
      'beforeend',
      `<div class="country__wrapper"><img src='${
        flags.svg
      }' class="country-flag" width ="50" alt='flag of ${name.official}' />
  <h2 class='country-name'>${name.official}</h2></div>
  <ul class='country-info__list'>
    <li class='country-info__item'>
      <p class='capital-name'><span class='subtitle'>Capital: </span>
        ${capital}</p>
    </li>
    <li class='country-info__item'>
      <p class='population'><span class='subtitle'>Population: </span>
        ${population}</p>
    </li>
    <li class='country-info__item'>
      <p class='languages'><span class='subtitle'>Languages: </span>
        ${Object.values(languages)}</p>
    </li>
  </ul>
      `
    );
  });
}

function clearMarkUp() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
}
