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
  const text = e.target.value.trim();
  if (text === '') {
    countryInfo.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }
  fetchCountries(text)
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (data.length < 10 && data.length > 1) {
        createCountryList(data);
      }
      countryInfo.insertAdjacentHTML('beforeend', createCountryMarkUp(data));
    })
    .catch(error =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
  // fetchCountries(text).then(console.log);
}

function createCountryMarkUp(country) {
  return `<img src='${country.flags.svg}' alt='flag' />
  <h2 class='country-name'>${country.name.official}</h2>
  <ul class='country-info__list'>
    <li class='country-info__item'>
      <p class='capital-name'><span class='subtitle'>Capital: </span>
        ${country.capital}</p>
    </li>
    <li class='country-info__item'>
      <p class='population'><span class='subtitle'>Population: </span>
        ${country.population}</p>
    </li>
    <li class='country-info__item'>
      <p class='languages'><span class='subtitle'>Languages: </span>
        ${country.languages}</p>
    </li>
  </ul>`;
}

function createCountryList(countries) {
  countries.map(country => {
    return `<li class="country-item">{country.name}</li>;`;
  });
}
