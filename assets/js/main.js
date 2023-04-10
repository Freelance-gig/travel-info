import countryJson from '../data.json' assert {type: 'json'};
// https://rapidapi.com/richardarthur228/api/country-facts/ 
// https://rapidapi.com/traveltables/api/cost-of-living-and-prices/ 
const navBtn = document.querySelector('.mobile-nav-toggle')
const nav = document.querySelector('.nav');
const closeBtn = document.querySelector('.close-nav');
const africaContainer = document.querySelector('.africa-container')
const asiaContainer = document.querySelector('.asia-container')
const europeContainer = document.querySelector('.europe-container')
const oceaniaContainer = document.querySelector('.oceania-container')
const americaContainer = document.querySelector('.america-container')
const selectRegion = document.querySelector('#select-region')
const countryFactsUrl = 'https://country-facts.p.rapidapi.com'
const localStore = localStorage.getItem("countryFacts")

console.log(selectRegion)
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
{/* <div>
<h2> Africa </h2>
<div  class="africa-container country__container">
    
</div>
<button class="btn btn-secondary"> More </button>
</div> */}
renderCountryFacts(africaContainer, countryJson.africa)
// renderCountryFacts(asiaContainer, countryJson.asia)
// renderCountryFacts(europeContainer, countryJson.europe)
// renderCountryFacts(oceaniaContainer, countryJson.oceania)
// renderCountryFacts(americaContainer, countryJson.america)


