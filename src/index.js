import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetch-countries';
// import countryCardTemplate from './templates/country-card.hbs';
const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
searchBox.addEventListener(
  'input',
  debounce(handleCountryInput, DEBOUNCE_DELAY)
);
fetchCountries('Ukraine');
function handleCountryInput(e) {
  // e.preventDefault();
  const text = e.target.value.trim();
  fetchCountries(text).then(console.log);
  // fetchCountries(text).then(console.log);
}
