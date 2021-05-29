const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const movieContainer = document.getElementById("movie-container");
const searchInput = document.getElementById("search-box");
const searchBtn = document.getElementById("search-btn");
// showValue();

searchBtn.addEventListener("click", () => showValue(searchInput.value))
searchInput.addEventListener('keypress', function (e) {
    if (e.key === "Enter") {
        showValue(searchInput.value)
    }
});

showMovies(APIURL);

function showValue(value) {

    value ? showMovies(SEARCHAPI + value) : alert("Enter text to search.");



}



async function getMovie(url) {

    const res = await fetch(url);
    const movieData = await res.json();

    return movieData;
}


function showMovies(url) {
    // console.log("Entered show movies")
    movieContainer.innerHTML = "";
    const movie = getMovie(url);
    movie.then((movie) => {
        movie.results.forEach(element => {

            let imgPath = IMGPATH + element.poster_path

            movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");

            element.poster_path !== null ? imgPath : imgPath = element.title;

            movieCard.innerHTML = `
              <img src="${imgPath}" alt="${element.title}">
              <div class="movie-info">
                  <h3>${element.title}</h3>
                  <span class="tag ${setTagColour(element.vote_average)}"> ${element.vote_average} </span>
              </div>
              <div class="overview">
              <h2>Overview : </h2>
              <p>${element.overview} </p>
              </div>
              `;
            movieContainer.appendChild(movieCard);

        });
    })



}
const setTagColour = (vote) => {

    if (vote >= 8) {
        return "green";
    } else if (vote >= 6) {
        return "orange";
    } else {
        return "red";
    }
}