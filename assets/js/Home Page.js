const apiKey = 'e8ad7288aafe45a2654c370953748b4a';
    const upcomingMoviesURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=pt-BR&page=1`;
    const popularMoviesInBrazilURL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&region=BR`;
    async function fetchMovies(url, containerId, filterFuture = false) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    let movies = data.results;

    // Aplicar filtro para lançamentos a partir de dezembro de 2024
    if (filterFuture) {
      movies = filterUpcomingMovies(movies);
    }

    displayMovies(movies, containerId);
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

// Exemplo de uso para filmes futuros
fetchMovies(upcomingMoviesURL, 'movies-list', true);

  
    async function getMovieRuntime(movieId) {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR`);
        const data = await response.json();
        return data.runtime || 'N/A';
      } catch (error) {
        console.error(`Erro ao buscar duração do filme (ID: ${movieId}):`, error);
        return 'N/A';
      }
    }
  
    async function fetchMovies(url, containerId, filterFuture = false, pages = 1) {
      try {
        let allMovies = [];
    
        for (let page = 1; page <= pages; page++) {
          const response = await fetch(`${url}&page=${page}`);
          const data = await response.json();
          allMovies = allMovies.concat(data.results);
        }
    
        // Aplicar filtro para lançamentos futuros (se necessário)
        if (filterFuture) {
          allMovies = filterUpcomingMovies(allMovies);
        }
    
        displayMovies(allMovies, containerId);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    }
    
    // Buscar múltiplas páginas de filmes futuros
    fetchMovies(upcomingMoviesURL, 'movies-list', true, 3); // Ajuste o número de páginas aqui
    

    async function displayMovies(movies, containerId) {
      const container = document.getElementById(containerId);
      container.innerHTML = '';
  
      for (const movie of movies) {
        const runtime = await getMovieRuntime(movie.id); // Buscar a duração do filme
        const movieCard = `
          <li>
            <div class="movie-card">
              <a href="./movie-details.php?id=${movie.id}">
                <figure class="card-banner">
                  <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                </figure>
              </a>
              <div class="title-wrapper">
                <a href="./movie-details.php?id=${movie.id}" class="card-title">${movie.title}</a>
                <time datetime="${movie.release_date}">${new Date(movie.release_date).getFullYear()}</time>
              </div>
              <div class="card-meta">
                <div class="badge badge-outline">${movie.original_language.toUpperCase()}</div>
                <div class="duration">
                  <ion-icon name="time-outline"></ion-icon>
                  <time datetime="">${runtime} min</time>
                </div>
                <div class="rating">
                  <ion-icon name="star"></ion-icon>
                  <data>${movie.vote_average.toFixed(1)}</data>
                </div>
              </div>
            </div>
          </li>
        `;
        container.innerHTML += movieCard;
      }
    }
  
    // Buscar filmes populares e próximos lançamentos (apenas a partir de novembro de 2024)
    fetchMovies(popularMoviesInBrazilURL, 'popular-movies-list');
