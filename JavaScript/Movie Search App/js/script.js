
var page = 1;
var APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=';

var imagePath = 'https://image.tmdb.org/t/p/w1280';

var searchApi = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';

var movieData = async(url) => {
    var getData = await fetch(url);
    var getData = await getData.json();
    displayMovies(getData.results);
}

movieData(APIURL+1);


var displayMovies = (movies) => {
    var allMovies = '';

    movies.forEach((value, index) => {
        allMovies += `
            <div class="movie">
                <div class="movie-image">
                    <img src="${ imagePath + value.poster_path }"/>
                </div>
                <div class="movie-content">
                    <h2>${ value.title }</h2>
                    <p>${ value.overview }</p>
                </div>
            </div>`;
    })

    document.getElementById('movies-data').innerHTML = allMovies;
}

document.getElementById('search').addEventListener('keyup', (event) => {
    if(event.target.value){
        movieData(searchApi+event.target.value);
    } else {
        movieData(APIURL+1);
    }
    
});


document.querySelector('.previous').addEventListener('click', () => {
    if(page > 1){
        page--;
        movieData(APIURL+page);
    }
})

document.querySelector('.next').addEventListener('click', () => {
    page++;
    movieData(APIURL+page);
})