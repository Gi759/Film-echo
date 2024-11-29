import { InserirFilmesNaTela } from "./main.js";

export const apiKey = '9bbf7d734588f0a01ba0510c39e7e786';

// Carrega os filmes favoritos do localStorage
const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || []; // Carrega favoritos do localStorage

// Função para carregar filmes favoritos
function carregarFilmesFavoritos() {
  if (favoriteMovies.length === 0) {
    const ElementoParaInserirFilmes = document.querySelector('.movies-list');
    ElementoParaInserirFilmes.innerHTML = '<p>Nenhum filme favorito encontrado.</p>'; // Mensagem se não houver favoritos
    return;
  }

  // Buscar detalhes dos filmes a partir da API usando os IDs armazenados
  const promises = favoriteMovies.map(movieId => {
    return fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR`)
      .then(response => response.json());
  });

  Promise.all(promises)
    .then(filmes => InserirFilmesNaTela(filmes))
    .catch(error => console.error('Erro ao carregar filmes favoritos:', error));
}

// Inicializa com os filmes favoritos
carregarFilmesFavoritos();