const apiKey = 'e8ad7288aafe45a2654c370953748b4a';
const apiBaseURL = 'https://api.themoviedb.org/3';
const imageBaseURL = 'https://image.tmdb.org/t/p/w500';


// Elementos do DOM
const movieCarousel = document.querySelector('.movie-carousel');
const moviesGrid = document.getElementById('movies-grid');
const genreList = document.getElementById('genre-list');
const hamburgerBtn = document.getElementById('hamburger-btn');

// Variáveis de controle
let currentPage = 1; // Página inicial
let totalPages = 0; // Total de páginas disponíveis
let currentGenre = 'all'; // Gênero atual (todos os filmes)
let movies = []; // Armazena os filmes populares
let currentMovieIndex = 0; // Controle do índice para o carrossel de filmes

// Configurar o botão "Carregar Mais"
const loadMoreBtn = document.createElement('button');
loadMoreBtn.textContent = 'Carregar Mais';
loadMoreBtn.classList.add('filter-btn');
loadMoreBtn.addEventListener('click', () => {
  currentPage++;
  fetchMovies(); // Carregar próxima página de filmes
});

// Alternar visibilidade do menu hambúrguer
hamburgerBtn.addEventListener('click', () => {
  genreList.classList.toggle('hidden');
});

// Função para buscar gêneros de filmes
async function fetchGenres() {
  try {
    const response = await fetch(`${apiBaseURL}/genre/movie/list?api_key=${apiKey}&language=pt-BR`);
    const data = await response.json();
    displayGenres(data.genres);
  } catch (error) {
    console.error('Erro ao buscar gêneros:', error);
  }
}

// Exibir gêneros no menu hambúrguer
function displayGenres(genres) {
  genres.forEach(genre => {
    const genreItem = document.createElement('li');
    genreItem.innerHTML = `<button class="filter-btn" data-genre="${genre.id}">${genre.name}</button>`;
    genreList.appendChild(genreItem);

    // Adicionar evento de clique para filtrar filmes
    genreItem.querySelector('button').addEventListener('click', () => {
      currentGenre = genre.id; // Atualiza o gênero atual
      currentPage = 1; // Reinicia a páginação
      fetchMovies(); // Carrega filmes do gênero selecionado
      genreList.classList.add('hidden'); // Fecha o menu após clicar
    });
  });
}

// Função para buscar filmes
async function fetchMovies() {
  try {
    const endpoint = currentGenre === 'all'
      ? `${apiBaseURL}/discover/movie?api_key=${apiKey}&language=pt-BR&page=${currentPage}`
      : `${apiBaseURL}/discover/movie?api_key=${apiKey}&language=pt-BR&page=${currentPage}&with_genres=${currentGenre}`;

    const response = await fetch(endpoint);
    const data = await response.json();
    totalPages = data.total_pages; // Atualiza o total de páginas disponíveis

    // Atualizar e exibir os filmes na tela
    displayMovies(data.results);

    // Adicionar ou remover o botão "Carregar Mais"
    if (currentPage < totalPages) {
      if (!document.body.contains(loadMoreBtn)) {
        moviesGrid.parentElement.appendChild(loadMoreBtn);
      }
    } else {
      loadMoreBtn.remove();
    }
  } catch (error) {
    console.error('Erro ao buscar os filmes:', error);
  }
}

// Exibir os filmes na grade
function displayMovies(movies) {
  if (currentPage === 1) moviesGrid.innerHTML = ''; // Limpa os filmes da página anterior

  // Ordenar os filmes por título
  const sortedMovies = movies.sort((a, b) => {
    const titleA = a.title || ''; // Caso o título seja indefinido
    const titleB = b.title || '';

    // Priorizar símbolos e números
    const isSpecialA = /^[^a-zA-Z]/.test(titleA);
    const isSpecialB = /^[^a-zA-Z]/.test(titleB);

    if (isSpecialA && !isSpecialB) return -1; // Símbolos/números antes
    if (!isSpecialA && isSpecialB) return 1;  // Letras depois

    // Ordenação alfabética em português
    return titleA.localeCompare(titleB, 'pt', { sensitivity: 'base' });
  });

  // Renderizar os filmes
  sortedMovies.forEach(movie => {
    const { title, poster_path, vote_average } = movie;
    const movieCard = `
      <div class="movie-card">
        <img src="${imageBaseURL}${poster_path}" alt="${title}" class="movie-poster">
        <h3 class="titulo-movie">${title}</h3>
        <p class="movie-rating">TMDB ${vote_average}</p>
      </div>
    `;
    moviesGrid.innerHTML += movieCard;
  });
}

// Função para exibir o filme atual no carrossel
function showMovie(movie) {
  const movieItem = document.createElement('div');
  movieItem.classList.add('movie-item');
  movieItem.style.backgroundImage = `url('https://image.tmdb.org/t/p/w1280${movie.backdrop_path}')`;

  movieItem.innerHTML = `
    <div class="movie-info">
      <h3 class="movie-title">${movie.title}</h3>
      <p class="movie-synopsis">${movie.overview}</p>
      <button class="btn trailer" onclick="window.open('https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title)}+trailer')">
        Assista o Trailer
      </button>
    </div>
  `;

  // Adiciona o novo item ao carrossel e remove o antigo com transição
  movieCarousel.innerHTML = ''; // Limpa o carrossel
  movieCarousel.appendChild(movieItem);
}

// Função para trocar o filme no carrossel
function changeMovie() {
  currentMovieIndex = (currentMovieIndex + 1) % movies.length;
  showMovie(movies[currentMovieIndex]);
}

// Buscar filmes populares para o carrossel
async function fetchPopularMovies() {
  try {
    const response = await fetch(`${apiBaseURL}/trending/movie/week?api_key=${apiKey}&language=pt-BR`);
    const data = await response.json();
    movies = data.results.slice(0, 10); // Pegar os 10 filmes mais populares
    showMovie(movies[currentMovieIndex]); // Exibir o primeiro filme
    setInterval(changeMovie, 5000); // Alterar o filme a cada 5 segundos
  } catch (error) {
    console.error('Erro ao buscar filmes populares:', error);
  }
}

// Inicializar funções
fetchGenres();
fetchMovies();
fetchPopularMovies();
