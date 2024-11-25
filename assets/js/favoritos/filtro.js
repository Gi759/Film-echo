import { InserirFilmesNaTela } from './main.js';
import { listaDeFavoritos } from '../Movie-Details.js';
import { apiKey, currentPage } from './script.js';

//const filtroAtivo = document.getElementById('cabecalho__checkbox');

//filtroAtivo.addEventListener('change', getFilmesFavoritos);

const inputPesquisa = document.querySelector('.search-input');
const lupa = document.querySelector('.search-button');
const moviesContainer = document.querySelector('.movies-list');
let searchTerm = ''; // Variável local de pesquisa
let isSearching = false; // Variável de controle se está pesquisando

lupa.addEventListener('click', pesquisarFilmes);

function pesquisarFilmes() {
  searchTerm = inputPesquisa.value.trim(); // Define o termo de pesquisa

  if (searchTerm !== '') {
    isSearching = true; // Define que está em modo de pesquisa

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&query=${encodeURIComponent(searchTerm)}&page=${currentPage}&include_adult=false`)
      .then(response => response.json())
      .then(data => {
        const filmes = data.results;
        moviesContainer.innerHTML = ''; // Limpa os filmes anteriores
        InserirFilmesNaTela(filmes); // Exibe os filmes da pesquisa
      })
      .catch(error => {
        console.error('Erro ao pesquisar filmes:', error);
      });
  } else {
    console.log('Nenhum termo de pesquisa foi inserido.');
  }
}

export { searchTerm, isSearching};

//async function getFilmesFavoritos() {
    //if (listaDeFavoritos.length === 0) {
        //document.getElementById('filmes').innerHTML = '';
        //document.querySelector('.card__lista-vazia').style.display = 'flex';
    //}

    //if (filtroAtivo.checked) {
        //try {
            //const filmes = [];
            //for (const movieId of listaDeFavoritos) {
                //const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR`);
                //const movie = await response.json();
                //filmes.push(movie);
            //}
            //InserirFilmesNaTela(filmes);
            //document.querySelectorAll('.cards').forEach(elemento => {
                //elemento.querySelector('.cards__parte2-checkbox').checked = true;
            //});
        //} catch (error) {
            //console.error('Ocorreu um erro ao obter detalhes dos filmes:', error);
        //}
    //} else {
        //document.querySelector('.card__lista-vazia').style.display = 'none';
        //try {
            //const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`);
            //const data = await response.json();
            //const movies = data.results.slice(0, 10);
            //InserirFilmesNaTela(movies);
        //} catch (error) {
            //console.error('Ocorreu um erro ao obter os filmes populares:', error);
        //}
    //}
//}