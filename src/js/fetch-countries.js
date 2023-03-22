export { fetchCountries };
const BASE_URL = 'https://restcountries.com/v3.1/name/';
const searchParams = new URLSearchParams({
  fields: 'name,flags,capital,population,languages',
});
function fetchCountries(name) {
  return fetch(`${BASE_URL}${name}?${searchParams}`).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
      // Oops, there is no country with that name
    }
    return res.json();
  });
}
