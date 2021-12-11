import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    BASE_URL: 'https://restcountries.com/v3.1',
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info')
};

export function fetchCountries(name) {
    return fetch(`${refs.BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`).then(response => {      
        if (!response.ok) {
            refs.countryInfo.innerHTML = "";
            refs.countryList.innerHTML = "";
            throw Notify.failure('Oops, there is no country with that name.');
        }
        return response.json();
    });
}
