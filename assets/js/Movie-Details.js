const apiKey = 'e8ad7288aafe45a2654c370953748b4a';
const movieId = new URLSearchParams(window.location.search).get('id');

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

  const genresContainer = document.querySelector('.ganre-wrapper');
  movie.genres.forEach(genre => {
    const genreElement = document.createElement('span');
    genreElement.classList.add('badge', 'badge-outline');
    genreElement.textContent = genre.name;
    genresContainer.appendChild(genreElement);
  });

  const movieBanner = document.querySelector('.movie-detail-banner img');
  movieBanner.src = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;

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

// Estrelas de avaliação
document.querySelectorAll(".stars .star").forEach(star => {
  star.addEventListener("click", function () {
    const value = this.dataset.value;
    document.querySelectorAll(".stars .star").forEach(s => {
      s.classList.remove("active");
      if (s.dataset.value <= value) s.classList.add("active");
    });
  });
});
