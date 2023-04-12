import '../css/reset.css';
import '../css/utility.css';
import '../css/main.css';

import countryJson from "../data.json" assert {type: 'json' } ;
const selectRegion = document.querySelector('#select-region');
const selectCountry = document.querySelector('#select-country');
const selectCity = document.querySelector('#select-city');
const searchCity = document.querySelector('#search-city');
const moreBtn = document.querySelector('.btn-more');
const tabContainer = document.querySelector('.tab-container');
const tabList = document.querySelectorAll('ul.nav-tabs > li')
const countryFactsUrl = 'https://country-facts.p.rapidapi.com'
const citiesUrl = 'https://cost-of-living-and-prices.p.rapidapi.com/cities'
const countryRapidKey = process.env.COUNTRY_RAPID_KEY
const countryRapidHost = process.env.COUNTRY_RAPID_HOST
const cityRapidKey = process.env.COST_RAPID_KEY
const cityRapidHost = process.env.COST_RAPID_HOST

const fetchData = async(url, key, host) => {
    const response = await fetch(url, {
        headers: {
            "X-RapidAPI-Key": key,
            "X-RapidAPI-Host": host
        }
    });
    const jsonData = await response.json();
    return jsonData
}

const getSiblings = (e) => {
    let siblings = [];
    if (!e.parentNode) {
        return siblings
    }
    let sibling = e.parentNode.firstElementChild;
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== e) {
            siblings.push(sibling)
        }
        sibling = sibling.nextElementSibling
    }
    return siblings
}
let hey;
const getCountryJson = async() => {
    let countryJson = JSON.parse(localStorage.getItem("countryJson"));
    if (!countryJson) {
        console.log(hey)
        const oceaniaCountries = await fetchData(`${countryFactsUrl}/region/oceania`, countryRapidKey, countryRapidHost)
        const asianCountries = await fetchData(`${countryFactsUrl}/region/asia`, countryRapidKey, countryRapidHost)
        const europeanCountries = await fetchData(`${countryFactsUrl}/region/europe`, countryRapidKey, countryRapidHost)
        const africanCountries = await fetchData(`${countryFactsUrl}/region/africa`, countryRapidKey, countryRapidHost)
        const americaCountries = await fetchData(`${countryFactsUrl}/region/america`, countryRapidKey, countryRapidHost)
        let countries = JSON.stringify({
            america: await americaCountries,
            asia: await asianCountries,
            europe: await europeanCountries,
            oceania: await oceaniaCountries,
            africa: await africanCountries
        })
        localStorage.setItem("countryJson", await countries)
        hey =  JSON.parse(localStorage.getItem("countryJson"));

        return countries;
    }
    hey = countryJson;
    return countryJson;
}
    

const getCityJson = async() => {
    let cityJson = JSON.parse(localStorage.getItem("cityJson"));
    if (!cityJson) {
        let cities = await fetchData(citiesUrl, cityRapidKey, cityRapidHost)
        localStorage.setItem("cityJson", JSON.stringify(await cities))
        return cities
    }
    return cityJson;
}

// const countryJson = getCountryJson().then((data) => {
//     console.log(data)
//     return JSON.stringify(data);    
// });
// console.log(countryJson)
// console.log(h)
const cityJson = getCityJson();


let countryList = [];
let cityList = [];
let regionValue= '';
let countryValue ='';
let cityValue = '';
let city = {};

const renderCountryFacts = (container, data) => {
    container.innerHTML = ''
    data.slice(0, 4).forEach((element) => {
        container.innerHTML += `
        <a href="./detail.html?city_name=${element.capital[0].split(" ").join("_")}&country_name=${element.name.official.split(" ").join("_")}&lat=${element.latlng[0]}&lng=${element.latlng[1]}">
            <div class="card__container">
                <div class="flex">
                    <img src=${element.flag} alt="team-logo" class='card__flag'/>
                    <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30">
                        <path d="m480 722 146-146-146-146-42 42 74 74H330v60h182l-74 74 42 42Zm0 254q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z"/>
                    </svg>
                </div>
                <div class="card__data">
                <span class="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30">
                        <path d="m438 615 192-192-43-43-149 149-65-65-43 43 108 108Zm42 282q133-121 196.5-219.5T740 504q0-118-75.5-193T480 236q-109 0-184.5 75T220 504q0 75 65 173.5T480 897Zm0 79Q319 839 239.5 721.5T160 504q0-150 96.5-239T480 176q127 0 223.5 89T800 504q0 100-79.5 217.5T480 976Zm0-472Z"/>
                    </svg>
                    <h2> ${element.capital[0]}, </h2>
                    <h3> ${element.name.official} </h3>
                </span>
                    <span class="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30">
                        <path d="M0 816v-53q0-38.567 41.5-62.784Q83 676 150.376 676q12.165 0 23.395.5Q185 677 196 678.652q-8 17.348-12 35.165T180 751v65H0Zm240 0v-65q0-32 17.5-58.5T307 646q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-19.861-3.5-37.431Q773 696 765 678.727q11-1.727 22.171-2.227 11.172-.5 22.829-.5 67.5 0 108.75 23.768T960 763v53H780Zm-480-60h360v-6q0-37-50.5-60.5T480 666q-79 0-129.5 23.5T300 751v5ZM149.567 646Q121 646 100.5 625.438 80 604.875 80 576q0-29 20.562-49.5Q121.125 506 150 506q29 0 49.5 20.5t20.5 49.933Q220 605 199.5 625.5T149.567 646Zm660 0Q781 646 760.5 625.438 740 604.875 740 576q0-29 20.562-49.5Q781.125 506 810 506q29 0 49.5 20.5t20.5 49.933Q880 605 859.5 625.5T809.567 646ZM480 576q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600 456q0 50-34.5 85T480 576Zm.351-60Q506 516 523 498.649t17-43Q540 430 522.851 413t-42.5-17Q455 396 437.5 413.149t-17.5 42.5Q420 481 437.351 498.5t43 17.5ZM480 756Zm0-300Z"/>
                    </svg>
                        <h3> ${element.population} </h3> <span> People </span>
                    </span>
                </div>
            </div> 
        </a>
        `
    });     
}

const getRegions = (data) => {
    return Object.keys(data)
}

const getCountries = (countries, region) => {
    return countries[region]
}

const getCountryCities = (citiesData ,country) => {
    return citiesData.cities.filter((element) => element.country_name === country  )
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

const tabClick  = (e) => {
    let clickedTab = e.currentTarget;
    let siblings = getSiblings(clickedTab);
    siblings.forEach((element) => element.classList.remove("active"));
    clickedTab.classList.add("active");
    e.preventDefault();
    renderCountryFacts(tabContainer, countryJson[clickedTab.dataset.name])
};

const regionList = getRegions(countryJson)
renderSelectOptions(regionList, selectRegion);

selectRegion.addEventListener('change', () => {
    regionValue = selectRegion.value;
    countryList = getCountries(countryJson, regionValue).map((element) => element.name.common)
    renderSelectOptions(countryList, selectCountry)
})

selectCountry.addEventListener('change', () => {
    countryValue = selectCountry.value;
    cityList = getCountryCities(cityJson, countryValue).map((element) => element.city_name)
    renderSelectOptions(cityList, selectCity)
})

selectCity.addEventListener('change', () => {
    cityValue = selectCity.value;
    [city] = getCountryCities(cityJson, countryValue).filter((element) => element.city_name === cityValue)
})

searchCity.addEventListener('click', () =>{
    window.location.href = `./detail.html?city_name=${cityValue.split(" ").join("_")}&country_name=${countryValue.split(" ").join("_")}&lat=${city.lat}&lng=${city.lng}`;
})

const [currentTab] = Array.from(tabList).filter((tab) => {
    return tab.classList.contains("active")
})


renderCountryFacts(tabContainer, countryJson[currentTab.dataset.name])
Array.from(tabList).forEach((tab) => {
    tab.addEventListener("click", tabClick)
})

moreBtn.addEventListener('click', (e) => {
    let btn = e.currentTarget
    btn.dataset.clicked = !(btn.dataset.clicked === 'true')
    if (btn.dataset.clicked === 'true') {
        let div = document.createElement("div");
        let text = document.createTextNode('--Please choose an option--');
        div.appendChild(text);
        btn.parentNode.prepend(div)
    }    
})
