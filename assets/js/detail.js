const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const cityName = urlParams.get('city_name')
const countryName = urlParams.get('country_name')

async function fetchData(url) {
    const response = await fetch(url, {
        headers: {
            
        }
    });
    const jsonData = await response.json();
    return jsonData
}


const cityPricesUrl = `https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=${cityName}&country_name=${countryName}`

// const cityPrices = fetchData(`${cityPricesUrl}`)
// console.log(cityPrices);