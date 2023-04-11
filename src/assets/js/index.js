import '../css/reset.css';
import '../css/utility.css';
import '../css/main.css';

import countryJson from '../data.json' assert {type: 'json'};
import cityJson from '../cities_data.json' assert {type: 'json'};

const navBtn = document.querySelector('.mobile-nav-toggle');
const nav = document.querySelector('.nav');
const closeBtn = document.querySelector('.close-nav');
const africaContainer = document.querySelector('.africa-container');
const asiaContainer = document.querySelector('.asia-container');
const europeContainer = document.querySelector('.europe-container');
const oceaniaContainer = document.querySelector('.oceania-container');
const americaContainer = document.querySelector('.america-container');
const selectRegion = document.querySelector('#select-region');
const selectCountry = document.querySelector('#select-country');
const selectCity = document.querySelector('#select-city');
const searchCity = document.querySelector('#search-city')
const countryFactsUrl = 'https://country-facts.p.rapidapi.com'
const localStore = localStorage.getItem("countryFacts")

navBtn.addEventListener('click', ()=>{
    nav.classList.add('nav-open');
})

closeBtn.addEventListener('click', () => {
    nav.classList.remove('nav-open');
})

async function fetchData(url) {
    const response = await fetch(url, {
        headers: {
        }
    });
    const jsonData = await response.json();
    return jsonData
}



// const africanCountries = fetchData(`${countryFactsUrl}/region/africa`)
// console.log(africanCountries)
// console.log(africanCountries)

// if (localStore === null) {
//     const setLocalStorage = async () => {
        
//     const oceaniaCountries = await fetchData(`${countryFactsUrl}/region/oceania`)
//     const asianCountries = await fetchData(`${countryFactsUrl}/region/asia`)
//     const europeanCountries = await fetchData(`${countryFactsUrl}/region/europe`)
//     const africanCountries = await fetchData(`${countryFactsUrl}/region/africa`)
//     const americaCountries = await fetchData(`${countryFactsUrl}/region/america`)
//     // console.log(africanCountries)
//     localStorage.setItem("countryFacts", JSON.stringify({
//         america: americaCountries,
//         oceania: oceaniaCountries,
//         africa: africanCountries,
//         europe: europeanCountries,
//         asia: asianCountries
//     })  
//     )
//     }
//     setLocalStorage()
// }

const renderCountryFacts = (container, data) => {
    data.slice(0, 4).forEach(element => {
        container.innerHTML += `
        <div class="card__container">
            <img src=${element.flag} alt="team-logo" class='card__flag'/>
            
            <div class="card__data">
                <h2> ${element.name.official} </h2>
                <span> capital ${element.capital[0]} </span>
                <span> population ${element.population} </span>
            </div>
        </div> 
        `
    });     
}

const getRegions = (data) => {
    return Object.keys(data)
}

const getCountries = (region) => {
    return countryJson[region]
}

const getCountryCities = (country) => {
    return cityJson.cities.filter((element) => element.country_name === country  )
}

const renderSelectOptions = (data, selectContainer) => {
    selectContainer.innerText = null;
    let option = document.createElement('option');
    option.setAttribute('value', "")
    let optionText = document.createTextNode('--Please choose an option--');
    option.appendChild(optionText);
    selectContainer.appendChild(option);

    data.forEach((element) => {
        let option = document.createElement('option');
        option.setAttribute('value', element)
        let optionText = document.createTextNode(element);
        option.appendChild(optionText);
        selectContainer.appendChild(option);
    })
}
{/* <div>
<h2> Africa </h2>
<div  class="africa-container country__container">
    
</div>
<button class="btn btn-secondary"> More </button>
</div> */}
// renderCountryFacts(asiaContainer, countryJson.asia)
// renderCountryFacts(europeContainer, countryJson.europe)
// renderCountryFacts(oceaniaContainer, countryJson.oceania)
// renderCountryFacts(americaContainer, countryJson.america)
const regionList = getRegions(countryJson)


renderCountryFacts(africaContainer, countryJson.africa)
renderSelectOptions(regionList, selectRegion);

let countryList = [];
let cityList = [];
let regionValue= '';
let countryValue ='';
let cityValue = '';
let city = {};
selectRegion.addEventListener('change', () => {
    regionValue = selectRegion.value;
    countryList = getCountries(regionValue).map((element) => element.name.common)
    renderSelectOptions(countryList, selectCountry)
})

selectCountry.addEventListener('change', () => {
    countryValue = selectCountry.value;
    cityList = getCountryCities(countryValue).map((element) => element.city_name)
    renderSelectOptions(cityList, selectCity)
})

selectCity.addEventListener('change', () => {
    cityValue = selectCity.value;
    [city] = getCountryCities(countryValue).filter((element) => element.city_name === cityValue)
    console.log(city)
})

searchCity.addEventListener('click', () =>{
    window.location.href = `./detail.html?city_name=${cityValue.split(" ").join("_")}&country_name=${countryValue.split(" ").join("_")}&lat=${city.lat}&lng=${city.lng}`;
})