const apiKey = 'e8ad7288aafe45a2654c370953748b4a';
const popularMoviesURL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`;
const searchBar = document.getElementById('searchBar');
const moviesList = document.getElementById('movies-list');
const carousel = document.getElementById('carousel');

// Função para buscar filmes populares
async function fetchMovies(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

// Função para exibir o carrossel
async function displayCarouselMovies() {
  const movies = await fetchMovies(popularMoviesURL);
  carousel.innerHTML = movies.map(movie => `
    <div class="movie-card">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>${movie.overview}</p>
    </div>
  `).join('');
}

// Função para listar todos os filmes em ordem alfabética
async function displayMoviesList() {
  const movies = await fetchMovies(popularMoviesURL);
  const sortedMovies = movies.sort((a, b) => a.title.localeCompare(b.title));
  moviesList.innerHTML = sortedMovies.map(movie => `
    <li>
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
    </li>
  `).join('');
}

// Função para buscar filmes com base no input
searchBar.addEventListener('input', async (e) => {
  const query = e.target.value;
  const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=pt-BR`;
  const movies = await fetchMovies(searchURL);
  moviesList.innerHTML = movies.map(movie => `
    <li>
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
    </li>
  `).join('');
});

// Função para inicializar a página
async function init() {
  await displayCarouselMovies();
  await displayMoviesList();
}

init();
