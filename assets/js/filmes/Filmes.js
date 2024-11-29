(() => {
  const apiBaseURL = 'https://api.themoviedb.org/3';
  const imageBaseURL = 'https://image.tmdb.org/t/p/w500';

  // Elementos do DOM
  const moviesGrid = document.getElementById('movies-grid');
  const genreList = document.getElementById('genre-list');
  const yearHamburger = document.getElementById('year-hamburger');
  const yearList = document.getElementById('year-list');
  const ratingHamburger = document.getElementById('rating-hamburger');
  const ratingList = document.getElementById('rating-list');
  const cinemaHamburger = document.getElementById('cinema-hamburger');
  const cinemaList = document.getElementById('cinema-list');
  const loadMoreBtn = document.createElement('button'); // Botão "Carregar Mais"

  // Estado do aplicativo
  const appState = {
    currentPage: 1,
    totalPages: 0,
    currentGenre: 'all',
    currentYear: 'all',
    currentRating: 'all',
    currentCinema: 'all',
  };

  // Preencher os anos dinamicamente (de 10 em 10 anos)
  function populateYearOptions() {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1900; year -= 10) {
      const listItem = document.createElement('li');
      listItem.innerHTML = `<button class="filter-btn" data-year="${year}-${year + 9}">${year}-${year + 9}</button>`;
      yearList.appendChild(listItem);
    }
  }

  // Alternar visibilidade dos menus
  [yearHamburger, ratingHamburger, cinemaHamburger].forEach((button, index) => {
    const lists = [yearList, ratingList, cinemaList];
    button.addEventListener('click', () => {
      lists[index].classList.toggle('hidden'); // Mostrar/ocultar o menu correspondente

      // Alternar visibilidade do menu hambúrguer de categorias
hamburgerBtn.addEventListener('click', () => {
  genreList.classList.toggle('hidden'); // Alterna entre mostrar/ocultar
});

    });
  });

  // Obter gêneros de filmes da API do TMDB
async function fetchGenres() {
  try {
    const response = await fetch(`${apiBaseURL}/genre/movie/list?api_key=${apiKey}&language=pt-BR`);
    const data = await response.json();

    // Exibir os gêneros no menu
    displayGenres(data.genres);
  } catch (error) {
    console.error('Erro ao buscar gêneros:', error);
  }
}

// Exibir gêneros no menu hambúrguer
function displayGenres(genres) {
  genreList.innerHTML = ''; // Limpar lista anterior
  genres.forEach(genre => {
    const genreItem = document.createElement('li');
    genreItem.innerHTML = `<button class="filter-btn" data-genre="${genre.id}">${genre.name}</button>`;
    genreList.appendChild(genreItem);

    // Adicionar evento de clique para filtrar por gênero
    genreItem.querySelector('button').addEventListener('click', () => {
      appState.currentGenre = genre.id; // Atualiza o gênero atual
      appState.currentPage = 1; // Reinicia a páginação
      fetchMovies(); // Carrega filmes do gênero selecionado
      genreList.classList.add('hidden'); // Fecha o menu após clicar
    });
  });
}

  // Função para atualizar os filtros e buscar os filmes
  function applyFilter(filterType, value) {
    appState.currentPage = 1; // Reiniciar a paginação

    if (filterType === 'year') {
      appState.currentYear = value;
    } else if (filterType === 'rating') {
      appState.currentRating = value;
    } else if (filterType === 'cinema') {
      appState.currentCinema = value;
    }

    fetchMovies(); // Atualizar os filmes na grade

    
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
  // Adicionar eventos de clique aos filtros dinâmicos
  function addFilterEvents() {
    document.querySelectorAll('#year-list .filter-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        applyFilter('year', btn.dataset.year);
        yearList.classList.add('hidden'); // Fechar o menu
      });
    });

 // Adicionar eventos para os filtros de classificação indicativa
document.querySelectorAll('#rating-list .filter-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    applyFilter('rating', btn.dataset.rating);
    ratingList.classList.add('hidden'); // Fechar o menu após clicar
  });
});


    document.querySelectorAll('#cinema-list .filter-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        applyFilter('cinema', btn.dataset.cinema);
        cinemaList.classList.add('hidden'); // Fechar o menu
      });
    });
  }

  // Buscar filmes da API
  async function fetchMovies() {
    try {
      let endpoint = `${apiBaseURL}/discover/movie?api_key=${apiKey}&language=pt-BR&page=${appState.currentPage}`;
  

      // Filtros: ano, classificação etária e disponibilidade no cinema

          // Aplicar filtros
    if (appState.currentGenre !== 'all') {
      endpoint += `&with_genres=${appState.currentGenre}`;
    }
      if (appState.currentYear !== 'all') {
        const [startYear, endYear] = appState.currentYear.split('-');
        endpoint += `&primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${endYear}-12-31`;
      }
      if (appState.currentRating !== 'all') {
        endpoint += `&certification_country=BR&certification=${appState.currentRating}`;
      }
      if (appState.currentCinema !== 'all') {
        endpoint += `&with_release_type=${appState.currentCinema === 'true' ? '3|2' : '1'}`;
      }
  
      console.log('Fetching movies from endpoint:', endpoint);
  
      const response = await fetch(endpoint);
      const data = await response.json();
      appState.totalPages = data.total_pages;
  
      displayMovies(data.results);
  
      // Atualizar o botão "Carregar Mais"
      if (appState.currentPage < appState.totalPages) {
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
    if (appState.currentPage === 1) moviesGrid.innerHTML = ''; // Limpa a grade

    movies.forEach((movie) => {
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

  // Configurar o botão "Carregar Mais"
  loadMoreBtn.textContent = 'Carregar Mais';
  loadMoreBtn.classList.add('filter-btn');
  loadMoreBtn.addEventListener('click', () => {
    appState.currentPage++;
    fetchMovies();
  });

  // Elemento da barra de pesquisa
const searchBar = document.getElementById('search-bar');

// Adicionar evento para capturar texto e realizar busca
searchBar.addEventListener('input', debounce(handleSearch, 500)); // Usa debounce para evitar chamadas excessivas

// Função para lidar com a pesquisa
function handleSearch() {
  const query = searchBar.value.trim();

  if (query.length === 0) {
    // Se a barra de pesquisa estiver vazia, carregue os filmes iniciais
    appState.currentPage = 1;
    appState.currentGenre = 'all';
    appState.currentYear = 'all';
    appState.currentRating = 'all';
    appState.currentCinema = 'all';
    fetchMovies();
    return;
  }

  searchMovies(query); // Buscar filmes com base no texto
}

// Função para buscar filmes pelo nome
async function searchMovies(query) {
  try {
    const endpoint = `${apiBaseURL}/search/movie?api_key=${apiKey}&language=pt-BR&query=${encodeURIComponent(query)}&page=${appState.currentPage}`;

    console.log('Fetching search results from endpoint:', endpoint);

    const response = await fetch(endpoint);
    const data = await response.json();

    if (data.results.length > 0) {
      displayMovies(data.results); // Exibir os filmes encontrados
    } else {
      moviesGrid.innerHTML = `<p class="no-results">Nenhum filme encontrado para "${query}".</p>`;
    }
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
  }
}

// Função debounce para evitar chamadas frequentes
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}
function displayMovies(movies) {
  moviesGrid.innerHTML = ''; // Limpa os resultados anteriores

  if (movies.length === 0) {
    moviesGrid.innerHTML = '<p class="no-results">Nenhum filme encontrado.</p>';
    return;
  }

  movies.forEach((movie) => {
    const { title, poster_path, vote_average } = movie;
    const movieCard = `
      <div class="movie-card">
        <img src="${poster_path ? imageBaseURL + poster_path : 'placeholder.jpg'}" alt="${title}" class="movie-poster">
        <h3 class="titulo-movie">${title}</h3>
        <p class="movie-rating">TMDB ${vote_average || 'N/A'}</p>
      </div>
    `;
    moviesGrid.innerHTML += movieCard;
  });
}
function displayMovies(movies) {
  moviesGrid.innerHTML = ''; // Limpa os resultados anteriores

  if (movies.length === 0) {
    moviesGrid.innerHTML = '<p class="no-results">Nenhum filme encontrado.</p>';
    return;
  }

  movies.forEach((movie) => {
    const { id, title, poster_path, vote_average } = movie;
    const movieCard = `
      <div class="movie-card">
        <a href="./movie-details.php?id=${id}" class="movie-link">
          <img src="${poster_path ? imageBaseURL + poster_path : 'placeholder.jpg'}" alt="${title}" class="movie-poster">
        </a>
        <a href="./detalhes.html?id=${id}" class="movie-title-link">
          <h3 class="titulo-movie">${title}</h3>
        </a>
        <p class="movie-rating">TMDB ${vote_average || 'N/A'}</p>
        <button class="favorite-btn" data-id="${id}">
          <ion-icon name="heart-outline"></ion-icon>
        </button>
      </div>
    `;
    moviesGrid.innerHTML += movieCard;
  });

  // Adição do evento de clique no botão de favoritos
  const favoriteBtns = document.querySelectorAll('.favorite-btn');
  favoriteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const movieId = btn.getAttribute('data-id');
      toggleFavorite(movieId, btn);
  });
});


// Função para armazenar filmes favoritos
function toggleFavorite(movieId, button) {
  const index = favoriteMovies.indexOf(movieId);
  if (index === -1) {
    favoriteMovies.push(movieId);
    button.querySelector('ion-icon').name = 'heart';
  } else {
    favoriteMovies.splice(index, 1);
    button.querySelector('ion-icon').name = 'heart-outline';
  }
  localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies)); // Salva no localStorage
}


// Inicializa o array de filmes favoritos
const favoriteMovies = [];

// Função para carregar os filmes favoritos do localStorage
function loadFavoriteMovies() {
  const storedFavorites = JSON.parse(localStorage.getItem('favoriteMovies'));
  if (storedFavorites) {
    favoriteMovies.push(...storedFavorites); // Adiciona os filmes favoritos armazenados ao array
  }
}

// Função para atualizar os ícones dos botões de favoritar
function updateFavoriteButtons() {
  favoriteMovies.forEach(id => {
    const btn = document.querySelector(`.favorite-btn[data-id="${id}"]`);
    if (btn) {
      btn.querySelector('ion-icon').name = 'heart'; // Muda o ícone para coração preenchido
    }
  });
}

// Chama a função para carregar os favoritos ao iniciar a aplicação
loadFavoriteMovies();
updateFavoriteButtons();


}


  // Inicializar
  populateYearOptions();
  addFilterEvents();
  fetchMovies();
  fetchGenres();

})();
