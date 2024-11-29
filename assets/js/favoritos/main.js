const ElementoParaInserirFilmes = document.querySelector('.movies-list');

function InserirFilmesNaTela(filmes) {
  ElementoParaInserirFilmes.innerHTML = ''; // Limpa a lista antes de inserir novos filmes

  filmes.forEach(movie => {
    const movieId = movie.id;
    const title = movie.title || 'Título não disponível';
    const releaseYear = movie.release_date?.split('-')[0] || 'Ano não disponível';
    const posterPath = movie.poster_path 
      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` 
      : './assets/images/movie-1.png'; // Caminho para imagem padrão
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

    const movieCard = document.createElement('li');
    movieCard.className = 'movie-card';

    movieCard.innerHTML = `
      <div class="card-banner">
        <img src="${posterPath}" alt="Pôster do filme ${title}">
      </div>
      <div class="title-wrapper">
        <a href="#" class="card-title">${title}</a>
        <time datetime="${releaseYear}">${releaseYear}</time>
      </div>
      <div class="card-meta">
        <span class="rating">
          <ion-icon name="star"></ion-icon>
          ${rating}
        </span>
        <button class="favorite-btn" data-id="${movieId}">
          <ion-icon name="heart-outline"></ion-icon>
        </button>
      </div>
    `;

    ElementoParaInserirFilmes.appendChild(movieCard);
  });
  // Função para atualizar os ícones dos botões de favoritar
function atualizarBotoesFavoritos() {
  const favoriteBtns = document.querySelectorAll('.favorite-btn');
  favoriteBtns.forEach(btn => {
    const movieId = btn.getAttribute('data-id');
    if (favoriteMovies.includes(movieId)) {
      btn.querySelector('ion-icon').name = 'heart'; // Muda o ícone para coração preenchido
    } else {
      btn.querySelector('ion-icon').name = 'heart-outline'; // Muda o ícone para coração vazio
    }

    // Adiciona evento de clique ao botão de favorito
    btn.addEventListener('click', () => {
      toggleFavorite(movieId, btn);
    });
  });
}

// Função para armazenar filmes favoritos
function toggleFavorite(movieId, button) {
  const index = favoriteMovies.indexOf(movieId);
  if (index === -1) {
    favoriteMovies.push(movieId);
    button.querySelector('ion-icon').name = 'heart'; // Muda o ícone para coração preenchido
  } else {
    favoriteMovies.splice(index, 1);
    button.querySelector('ion-icon').name = 'heart-outline'; // Muda o ícone para coração vazio
  }
  localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies)); // Salva no localStorage

  // Inicializa com os filmes favoritos
carregarFilmesFavoritos();
}


}

export { InserirFilmesNaTela };