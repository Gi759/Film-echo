const apiKey = 'e8ad7288aafe45a2654c370953748b4a';

const upcomingMoviesURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=pt-BR&region=BR`;
const popularMoviesURL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=pt-BR&region=BR`;

// Função para buscar detalhes do filme (incluindo duração)
async function fetchMovieDetails(movieId) {
  const movieDetailsURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR&region=BR`;
  try {
    const response = await fetch(movieDetailsURL);
    const data = await response.json();
    return data.runtime;
  } catch (error) {
    console.error('Erro ao buscar detalhes do filme:', error);
    return null;
  }
}

// Função para buscar filmes
async function fetchMovies(url, callback) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    callback(data.results.slice(0, 20));
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
  }
}

// Filtra os filmes com lançamento a partir de dezembro de 2024
function filterUpcomingMovies(movies) {
  return movies.filter(movie => {
    const releaseDate = new Date(movie.release_date);
    return releaseDate.getFullYear() > 2024 || 
           (releaseDate.getFullYear() === 2024 && releaseDate.getMonth() >= 10);
  });
}

// Função para exibir filmes (incluindo duração)
async function displayMovies(movies, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  for (const movie of movies) {
    const runtime = await fetchMovieDetails(movie.id);

    const movieCard = `
      <li>
        <div class="movie-card">
          <a href="./movie-details.html?id=${movie.id}">
            <figure class="card-banner">
              <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}">
            </figure>
          </a>
          <div class="title-wrapper">
            <a href="./movie-details.html?id=${movie.id}" class="card-title">${movie.title}</a>
            <time datetime="${movie.release_date}">${movie.release_date}</time>
          </div>
          <div class="card-meta">
            <div class="badge badge-outline">${movie.original_language}</div>
            <div class="badge badge-outline">${runtime ? runtime + ' min' : 'Duração Indisponível'}</div>
          </div>
        </div>
      </li>
    `;
    container.innerHTML += movieCard;
  }
}

// Exibe os filmes na página
fetchMovies(upcomingMoviesURL, movies => displayMovies(filterUpcomingMovies(movies), 'movies-list'));
fetchMovies(popularMoviesURL, movies => displayMovies(movies, 'popular-movies-list'));
