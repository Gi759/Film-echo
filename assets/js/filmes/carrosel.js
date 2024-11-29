const apiKey = 'e8ad7288aafe45a2654c370953748b4a';
const movieCarousel = document.querySelector('.movie-carousel');
let currentMovieIndex = 0;
let movies = [];

// Função para mostrar o filme atual com transição suave
function showMovie(movie) {
  // Cria um novo item do filme com transição suave
  const movieItem = document.createElement('div');
  movieItem.classList.add('movie-item', 'entering'); // Adiciona a classe 'entering' para animação inicial
  movieItem.style.backgroundImage = `url('https://image.tmdb.org/t/p/w1280${movie.backdrop_path}')`;
  movieItem.style.width = '100%'; // Garante que ocupa 100% do tamanho do container
  movieItem.style.height = '100%'; // Ajusta a altura dinamicamente

  // Adiciona as informações sobre o filme
  movieItem.innerHTML = `
    <div class="movie-info">
      <h3 class="movie-title">${movie.title}</h3>
      <p class="movie-synopsis">${movie.overview}</p>
      <button class="btn trailer" onclick="window.open('https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title)}+trailer')">
        Assista o Trailer
      </button>
    </div>
  `;

  movieCarousel.appendChild(movieItem);

  // Remove a classe 'entering' após a transição para iniciar o efeito de fade in
  setTimeout(() => {
    movieItem.classList.remove('entering');
    movieItem.classList.add('active'); // Agora o filme atual está ativo
  }, 100);

  // Remover o filme anterior com transição
  if (movieCarousel.children.length > 1) {
    const previousMovie = movieCarousel.children[0];
    previousMovie.classList.add('exiting'); // Adiciona a classe 'exiting' para fade out
    setTimeout(() => previousMovie.remove(), 500); // Remove o filme anterior após a transição
  }
}

// Função para mudar de filme a cada 5 segundos
function changeMovie() {
  currentMovieIndex = (currentMovieIndex + 1) % movies.length;
  showMovie(movies[currentMovieIndex]);
}

// Requisição para pegar os filmes populares da semana
fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&region=BR`)
  .then(response => response.json())
  .then(data => {
    movies = data.results.slice(0, 10); // Mostrando 10 filmes populares
    showMovie(movies[currentMovieIndex]); // Mostrar o primeiro filme
    setInterval(changeMovie, 5000); // Trocar a cada 5 segundos
  })
  .catch(error => console.error('Erro ao buscar filmes:', error));