const apiKey = 'e8ad7288aafe45a2654c370953748b4a';  // Substitua com sua chave da API
const upcomingApiURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=pt-BR&page=1`;
const topRatedApiURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=pt-BR&page=1`;

const upcomingMoviesElement = document.getElementById('upcoming-movies');
const topRatedMoviesElement = document.getElementById('top-rated-movies');

// Função para buscar e exibir filmes
async function fetchMovies(url, container) {
  console.log('Fetching movies from:', url); // Para verificar a URL
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log('Data fetched:', data); // Para verificar os dados retornados

    // Limpa o container antes de adicionar novos filmes
    container.innerHTML = ''; 

    data.results.forEach(movie => {
      const movieCard = `
        <li>
          <div class="movie-card">
            <a href="./movie-details.html?id=${movie.id}">
              <figure class="card-banner">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster">
              </figure>
            </a>
            <div class="title-wrapper">
              <h3 class="card-title">${movie.title}</h3>
              <time datetime="${movie.release_date}">${new Date(movie.release_date).toLocaleDateString('pt-BR')}</time>
            </div>
            <div class="card-meta">
              <div class="badge badge-outline">${movie.original_language.toUpperCase()}</div>
              <div class="duration">
                <ion-icon name="time-outline"></ion-icon>
                <time>${movie.runtime || 'N/A'} min</time>
              </div>
              <div class="rating">
                <ion-icon name="star"></ion-icon>
                <data>${movie.vote_average}</data>
              </div>
            </div>
          </div>
        </li>
      `;
      container.innerHTML += movieCard;
    });
  } catch (error) {
    console.error('Erro ao carregar os filmes:', error);
  }
}

// Chama as funções ao carregar a página
window.onload = () => {
  fetchMovies(upcomingApiURL, upcomingMoviesElement);
  fetchMovies(topRatedApiURL, topRatedMoviesElement);
};
