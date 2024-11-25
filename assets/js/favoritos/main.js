const ElementoParaInserirFilmes = document.getElementById('filmes');


function InserirFilmesNaTela(filmes) {
  const ElementoParaInserirFilmes = document.querySelector('.movies-list');

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
      </div>
    `;

    ElementoParaInserirFilmes.appendChild(movieCard);
  });
}

export { InserirFilmesNaTela };
