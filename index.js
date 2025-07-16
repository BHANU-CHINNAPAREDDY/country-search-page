let userSearchEl = document.getElementById('searchInput');
let spinnerEl = document.getElementById('spinner');
let resultCountriesEl = document.getElementById('resultCountries');
// spinnerEl.classList.remove('d-none');

let countriesList = null;
function createAndAppendCountry(country){
    let {name, flag, population} = country;

    let container = document.createElement('div');
    container.classList.add('col-12', 'col-md-6', 'col-lg-4');
    resultCountriesEl.appendChild(container);

    let countryContainer = document.createElement('div');
    countryContainer.classList.add('d-flex','flex-row','country-container', 'p-2');
    container.appendChild(countryContainer);

    let flagEl = document.createElement('img');
    flagEl.classList.add('country-img')
    flagEl.src = flag;
    flagEl.alt = name;
    countryContainer.appendChild(flagEl);

    let nameContainer = document.createElement('div');
    nameContainer.classList.add('d-flex', 'flex-column', 'justify-content-center', 'country-text-container','ml-1');
    countryContainer.appendChild(nameContainer);
    let countryName = document.createElement('h1');
    countryName.classList.add('country-name');
    countryName.textContent = name;
    nameContainer.appendChild(countryName);

    let countryPopulation = document.createElement('h2');
    countryPopulation.textContent = population;
    countryPopulation.classList.add('country-population')
    nameContainer.appendChild(countryPopulation);
}

function displayCountries(countries){
    spinnerEl.classList.toggle('d-none');
    for (let country of countries){
        createAndAppendCountry(country);
    }
    // createAndAppendCountry(countries[0]);
    // createAndAppendCountry(countries[1]);
}

function getCountriesData(){
    spinnerEl.classList.toggle('d-none');
    let url ="https://apis.ccbp.in/countries-data";
    options={
        method:"GET"
    }
    fetch(url, options)
    .then(response=>response.json())
    .then((countries)=>{
        countriesList = countries;
        // console.log(typeof(countriesList));
        displayCountries(countriesList);
    });
}
function searchCountries(event){
    spinnerEl.classList.toggle('d-none');
    resultCountriesEl.innerHTML="";
    let userSearch = userSearchEl.value.trim().toLowerCase();
    let resultantCountries = countriesList.filter(country=>country.name.toLowerCase().includes(userSearch));
    displayCountries(resultantCountries);
}
userSearchEl.addEventListener('input', searchCountries);

getCountriesData();
