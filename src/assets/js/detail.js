import '../css/reset.css';
import '../css/utility.css';
import '../css/main.css';
import Chart from 'chart.js/auto';
import pricesJson from '../prices_data.json' assert {type: 'json'};

const navBtn = document.querySelector('.mobile-nav-toggle');
const nav = document.querySelector('.nav');
const closeBtn = document.querySelector('.close-nav');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const detailInfo = document.querySelector('.detail-info')
const cityName = urlParams.get('city_name')
const countryName = urlParams.get('country_name')
const cityLat = urlParams.get('lat')
const cityLng = urlParams.get('lng')

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
const cityPricesUrl = `https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=${cityName}&country_name=${countryName}`
// const cityPrices = fetchData(`${cityPricesUrl}`)
// console.log(cityPrices);

console.log('hey');
(async function() {
    const data = pricesJson.prices
  
    new Chart(
      document.getElementById('acquisitions'),
      {
        type: 'bar',
        data: {
          labels: data.map(row => row.category_name),
          datasets: [
            {
              label: 'Avg Prices of goods',
              data: data.map(row => row.avg)
            }
          ]
        }
      }
    );
  })();

  detailInfo.innerHTML +=  `
    <h3> Location </h3>
    <span> ${cityName}, ${countryName} </span>

    <h3> Longitude </h3>
    <span> ${cityLng} </span>

    <h3> Latitute </h3>
    <span> ${cityLat} </span>
  `;