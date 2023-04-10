// https://rapidapi.com/richardarthur228/api/country-facts/ 
// https://rapidapi.com/traveltables/api/cost-of-living-and-prices/ 
const navBtn = document.querySelector('.mobile-nav-toggle')
const nav = document.querySelector('.nav');
const closeBtn = document.querySelector('.close-nav');

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

const localStore = localStorage.getItem("countryFacts")

const countryFactsUrl = 'https://country-facts.p.rapidapi.com'

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
console.log('%RAPID_KEY%')