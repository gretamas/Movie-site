const key = "bddee6b8";
const movieSearchBox = document.querySelector('.movie-search__input');
const typeSelect = document.getElementById("category");
const button = document.querySelector("button");
const resultGrid = document.querySelector('.result-grid');

button.addEventListener("click", () => {
    const searchTerm = movieSearchBox.value;
    const type = typeSelect.value;
    searchMovies(searchTerm, type, 1); 
});

function searchMovies(searchTerm, type, page) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `https://omdbapi.com/?s=${searchTerm}&page=${page}&type=${type}&apikey=${key}`);
    xhr.send();

    xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            const movies = JSON.parse(xhr.response);
            if (movies.Response === "True") {
                loadMovies(movies);
            } else {
                console.error("Error: ", movies.Error);
            }
        } else {
            console.error("Request failed with status: ", xhr.status);
        }
    });
}

function loadMovies(movies) {
    console.log(movies);
    displayMovies(movies);
    displayPageNumbers(movies.totalResults);
}

function displayMovies(movies) {
    const resultGrid = document.getElementById('result-grid');
    resultGrid.innerHTML = "";
    
    movies.Search.forEach(movie => {
        const movieContainer = document.createElement("div");
        //movieDescription= `${movieTitle} (${movieYear})`;
        movieContainer.classList.add("movie-container");
        const movieDescription = document.createElement("div");
        movieDescription.classList.add("movie-container__description");
        const movieYear = document.createElement("h3");
        movieYear.textContent=movie.Year;
        const movieTitle = document.createElement("h2");
        movieTitle.textContent=movie.Title;
        const moviePoster = document.createElement('img');
        moviePoster.classList.add("movie-container__poster");
        if(movie.Poster === "N/A"){
            moviePoster.src = "not-found.jpeg";
        }else{
            moviePoster.src = movie.Poster;
        }
        movieContainer.appendChild(moviePoster);
        movieDescription.appendChild(movieTitle);
        movieDescription.appendChild(movieYear);
        movieContainer.appendChild(movieDescription);
        resultGrid.appendChild(movieContainer);

    });

    
}

function displayPageNumbers(totalResults) {
    const totalPages = Math.ceil(totalResults / 10); 
    const pageNumberContainer = document.querySelector(".page-number");
    pageNumberContainer.style.cssText=`display: flex;
    justify-content: center;
    margin-top: 20px;`

    pageNumberContainer.innerHTML = ""; 

    for (let i = 1; i <= totalPages; i++) {
        const pageNumberButton = document.createElement("button");
        pageNumberButton.classList.add("page-number__box");
        pageNumberButton.textContent = i;
        pageNumberButton.addEventListener("click", () => {
            const searchTerm = movieSearchBox.value;
            const type = typeSelect.value;
            searchMovies(searchTerm, type, i);
        });
        pageNumberContainer.appendChild(pageNumberButton);
    }
}













