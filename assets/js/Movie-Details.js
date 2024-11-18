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
  document.querySelector('.runtime').innerHTML = `${movie.runtime} minutos`;
  document.querySelector('.classification').innerHTML = (() => {
    const brazilRelease = movie.release_dates?.results?.find(({ iso_3166_1 }) => iso_3166_1 === "BR");
    const classification = brazilRelease?.release_dates?.find(({ certification }) => certification)?.certification;
    return classification || (movie.adult ? "18+" : "Livre");
  })();
  

  const genresContainer = document.querySelector('.ganre-wrapper');
  movie.genres.forEach(genre => {
    const genreElement = document.createElement('span');
    genreElement.classList.add('badge', 'badge-outline');
    genreElement.textContent = genre.name;
    genresContainer.appendChild(genreElement);
  });
 
  
  const movieBanner = document.querySelector('.poster-front');
  movieBanner.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
  movieBanner.alt = `Poster de ${movie.title}`;

  const streamingInfo = document.querySelector('.streaming-info');
  streamingInfo.innerHTML = "";
  if (providers.flatrate) {
    const providerList = providers.flatrate.map(provider => provider.provider_name).join(', ');
    streamingInfo.innerHTML = `<p class="text"><strong>Disponível para streaming:</strong> ${providerList}</p>`;
  } else {
    streamingInfo.innerHTML = "<p class='text'>Sem informações de streaming disponíveis.</p>";
  }

  // Atualizar o background da seção
  const movieDetailSection = document.getElementById('movie-detail');
  movieDetailSection.style.backgroundImage = `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`;
  movieDetailSection.style.backgroundSize = 'cover';
  movieDetailSection.style.backgroundPosition = 'center';
}

fetchMovieDetails();
