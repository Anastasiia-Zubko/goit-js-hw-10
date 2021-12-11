import './css/styles.css';
import { fetchCountries } from "./fetchCountries.js";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { debounce } from 'lodash';

const refs = {
    DEBOUNCE_DELAY: 300,
    searchBox: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info')
};

refs.searchBox.addEventListener("input", debounce( (e) => {
        const countryName = (e.target.value).trim();
        fetchCountries(countryName)
        .then((receivedCountries) => renderCountries(receivedCountries))
        .catch((error) => console.log(error));
}, refs.DEBOUNCE_DELAY));

function renderCountries(receivedCountries) {
    if (receivedCountries.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
        refs.countryList.innerHTML = "";
        refs.countryInfo.innerHTML = "";
    }  else if (receivedCountries.length > 1) {
        listOfCountries(receivedCountries);
    } else if (receivedCountries.length === 1) {
        countryInfo(receivedCountries);
    }
}
function listOfCountries(receivedData) {
    const markup = receivedData
        .map(({flags, name}) => { 
            return `<li>
                    <h3><img class="picture" src="${flags.svg}" alt="Flag" width = "30px">${name.official}</h3>
                </li>`;
        })
        .join("");
    refs.countryInfo.innerHTML = "";
    refs.countryList.innerHTML = markup;
}
function countryInfo(receivedData) {
    const markup = receivedData.map(({ flags, name, capital, population, languages }) => {
            return `
            <h1><img class="picture" src="${flags.svg}" alt="Flag" width = "30px" >${name.official}</h1>
            <p><b>Capital</b>: ${capital}</p>
            <p><b>Population</b>: ${population}</p>
            <p><b>Languages</b>: ${Object.values(languages)}</p>
            `;
        }).join("");
    refs.countryList.innerHTML = "";
    refs.countryInfo.innerHTML = markup;
}