const API_KEY = "6ae8ece92fdd423395f9865452104c1a"
const url = "https://newsapi.org/v2/everything?q="



async function fetchData(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data = await res.json()
    return data
}
fetchData("all").then(data => renderMain(data.articles))

//menu btn
let mobilemenu = document.querySelector(".mobile")
let menuBtn = document.querySelector(".menuBtn")
let menuBtnDisplay = true;

menuBtn.addEventListener("click",()=>{
    mobilemenu.classList.toggle("hidden")
})


//render news 
function renderMain(arr){
    let mainHTML = ''
    for(let i = getRandomInt(0,25) ; i < arr.length ;i++){
        if(arr[i].urlToImage){
        mainHTML += ` <div class="card">
                        <a href=${arr[i].url}>
                        <img src=${arr[i].urlToImage} lazy="loading" />
                        <h4>${arr[i].title}</h4>
                        <div class="publishbyDate">
                            <p>${arr[i].source.name}</p>
                            <span>•</span>
                            <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
                        </div>
                        <div class="desc">
                           ${arr[i].description}
                        </div>
                        </a>
                     </div>
        `
        }
    }

    document.querySelector("main").innerHTML = mainHTML
}


const searchBtn = document.getElementById("searchForm")
const searchBtnMobile = document.getElementById("searchFormMobile")
const searchInputMobile = document.getElementById("searchInputMobile") 
const searchInput = document.getElementById("searchInput")

searchBtn.addEventListener("submit",async(e)=>{
    e.preventDefault()
    console.log(searchInput.value)

    const data = await fetchData(searchInput.value)
    renderMain(data.articles)

})
searchBtnMobile.addEventListener("submit",async(e)=>{
    e.preventDefault()
    const data = await fetchData(searchInputMobile.value)
    renderMain(data.articles)
})


async function Search(query){
    const data = await fetchData(query)
    renderMain(data.articles)
}




function fetchNews() {
    // Replace 'YOUR_API_KEY' with your actual API key
    const apiKey = '499d03534f224e8890dcd1f95376001c';
    const newsList = document.getElementById('newsList');

    // Make a request to the News API
    fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            // Clear existing news articles
            newsList.innerHTML = '';

            // Iterate through the articles and display them
            data.articles.forEach(article => {
                const listItem = document.createElement('li');
                listItem.textContent = article.title;
                newsList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching news:', error);
        });
}

// Initial fetch of news articles
fetchNews();

// Add a click event listener to the refresh button
document.getElementById('refreshButton').addEventListener('click', fetchNews);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

