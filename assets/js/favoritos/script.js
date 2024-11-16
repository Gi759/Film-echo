import { InserirFilmesNaTela } from "./main.js";

const apiKey = '9bbf7d734588f0a01ba0510c39e7e786';
let currentPage = 1;

// Função para carregar filmes da API
function carregarFilmes(page = 1) {
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=${page}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao conectar à API.');
      }
      return response.json();
    })
    .then(data => {
      const filmes = data.results;
      InserirFilmesNaTela(filmes); // Adiciona filmes ao DOM
    })
    .catch(error => {
      console.error('Erro ao carregar filmes:', error);
    });
}

// Inicializa com a primeira página
carregarFilmes(currentPage);

// Botão "Carregar Mais"
const carregarMaisBtn = document.querySelector('#carregarMais');
carregarMaisBtn.addEventListener('click', () => {
  currentPage++;
  carregarFilmes(currentPage);
});
