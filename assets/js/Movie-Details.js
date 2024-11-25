const apiKey = 'e8ad7288aafe45a2654c370953748b4a';
const movieId = new URLSearchParams(window.location.search).get('id');
export let listaDeFavoritos = [];

async function fetchMovieDetails() {
  try {
    const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR&append_to_response=credits,videos`);
    const providersResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${apiKey}`);
    
    const movieData = await movieResponse.json();
    const providersData = await providersResponse.json();

    displayMovieDetails(movieData, providersData.results.BR || {});
  } catch (error) {
    console.error('Erro ao buscar dados do filme:', error);
  }
}
function displayMovieDetails(movie, providers) {
  // Atualizar título, sinopse, data de lançamento, etc.
  document.querySelector('.detail-title').innerHTML = movie.title;
  document.querySelector('.storyline').innerHTML = movie.overview;
  document.querySelector('.release-date').innerHTML = new Date(movie.release_date).toLocaleDateString('pt-BR');
  document.querySelector('.runtime').innerHTML = movie.runtime + " minutos";

  const classificationElement = document.querySelector('.classification');
  if (movie.adult !== undefined) {
    classificationElement.innerHTML = movie.adult ? "18+" : "Livre";
    classificationElement.className = movie.adult ? "badge badge-fill adult" : "badge badge-fill all-ages";
  } else {
    classificationElement.innerHTML = "Classificação não disponível";
    classificationElement.className = "badge badge-fill unknown";
  }

  // Atualizar gêneros
  const genresContainer = document.querySelector('.ganre-wrapper');
  genresContainer.innerHTML = ""; // Limpar os gêneros existentes
  movie.genres.forEach(genre => {
    const genreElement = document.createElement('span');
    genreElement.classList.add('badge', 'badge-outline');
    genreElement.textContent = genre.name;
    genresContainer.appendChild(genreElement);
  });

  // Atualizar o fundo do .movie-detail
  const movieDetail = document.querySelector('.movie-detail');
  if (movie.backdrop_path) {
    movieDetail.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;
  } else {
    movieDetail.style.backgroundImage = "none"; // Caso não tenha imagem
  }

  // Atualizar informações de streaming
  const streamingInfo = document.querySelector('.streaming-info');
  streamingInfo.innerHTML = "";
  if (providers.flatrate) {
    const providerList = providers.flatrate.map(provider => provider.provider_name).join(', ');
    streamingInfo.innerHTML = `<p class="text"><strong>Disponível para streaming:</strong> ${providerList}</p>`;
  } else {
    streamingInfo.innerHTML = "<p class='text'>Sem informações de streaming disponíveis.</p>";
  }
}


fetchMovieDetails();
// Favoritar filme
function toggleFavorite(button) {
  button.classList.toggle("active");
  const icon = button.querySelector("ion-icon");
  icon.name = button.classList.contains("active") ? "heart" : "heart-outline";
}



const stars = document.querySelectorAll(".stars .star");
let rating = 0; // Valor atual da avaliação

stars.forEach((star, index) => {
  const starValue = index + 1;

  // Ao passar o mouse
  star.addEventListener("mouseover", () => {
    highlightStars(starValue);
  });

  // Ao clicar
  star.addEventListener("click", () => {
    if (rating === starValue - 0.5) {
      // Alternar para estrela cheia
      rating = starValue;
    } else if (rating === starValue) {
      // Alternar para meia estrela
      rating = starValue - 0.5;
    } else {
      // Novo valor (meia estrela inicialmente)
      rating = starValue - 0.5;
    }

    applyRating();
  });

  // Ao sair do elemento
  star.addEventListener("mouseleave", () => {
    applyRating();
  });
});

// Funções auxiliares
function highlightStars(value) {
  stars.forEach((star, i) => {
    if (i < value) {
      star.classList.add("hover");
    } else {
      star.classList.remove("hover");
    }
  });
}

function applyRating() {
  stars.forEach((star, i) => {
    star.classList.remove("active", "half", "hover");
    if (i < Math.floor(rating)) {
      star.classList.add("active");
    } else if (i === Math.floor(rating) && rating % 1 !== 0) {
      star.classList.add("half");
    }
  });

  document.getElementById("ratingValue").innerText = `Nota: ${rating}`;
}
