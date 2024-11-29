<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Detalhes do Filme</title>
  <link rel="shortcut icon" href="./favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="./assets/css/Movie-Details.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>

<body id="top">
  <header class="header" data-header>
    <div class="container">
      <div class="overlay" data-overlay></div>
      <a href="./Home Page.html" class="logo">
        <img src="assets/images/logoo.png" alt="Film Echo logo">
      </a>      
      <div class="header-actions">
        <div class="lang-wrapper">
          <label for="language">
            <ion-icon name="globe-outline"></ion-icon>
          </label>
          <select name="language" id="language">
            <option value="en">Pt-Br</option>
          </select>
        </div>
        <button class="btn btn-primary" onclick="window.location.href = './Pagina de Login.html';">Entrar</button>
      </div>
      <button class="menu-open-btn" data-menu-open-btn>
        <ion-icon name="reorder-two"></ion-icon>
      </button>
      <nav class="navbar" data-navbar>
        <div class="navbar-top">
          <a href="./Home Page.html" class="logo">
            <img src="./assets/images/logoo.png" alt="Film Echo logo">
          </a>
          <button class="menu-close-btn" data-menu-close-btn>
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>
      <ul class="navbar-list">
          <li><a href="./Home Page.html" class="navbar-link">Inicio</a></li>
          <li><a href="./Filmes.html" class="navbar-link">Filmes</a></li>
          <li><a href="./Favoritos.html" class="navbar-link">Favoritos</a></li>
          <li><a href="./Sobre.html" class="navbar-link">Criadores</a></li>
        </ul>
      </nav>
    </div>
  </header>
  <main>
    <article>
      <section class="movie-detail">
        <div class="container">
          <figure class="movie-detail-banner">
            <img src="" alt="Poster do filme" />
            <button class="play-btn">
              <ion-icon name="play-circle-outline"></ion-icon>
            </button>
          </figure>
          <div class="movie-detail-content">
            <div class="title-wrapper">
              <h1 class="h1 detail-title">Título do Filme</h1>
              <button class="favorite-btn" onclick="toggleFavorite(this)">
                <ion-icon name="heart-outline"></ion-icon>
              </button>
            </div>
            <div class="meta-wrapper">
              <div class="badge-wrapper">
                <div class="badge badge-fill classification"></div>
                <div class="badge badge-outline">HD</div>
              </div>
              <div class="ganre-wrapper">
              </div>
              <div class="date-time">
                <div>
                  <ion-icon name="calendar-outline"></ion-icon>
                  <time class="release-date"></time>
                </div>
                <div>
                  <ion-icon name="time-outline"></ion-icon>
                  <time class="runtime"></time>
                </div>
              </div>
            </div>
            <p class="storyline">Ops...parece que ainda falta informação sobre esse!</p>

            <div class="details-actions">
              <button class="share">
                <ion-icon name="share-social"></ion-icon>
                <span>Compartilhar</span>
              </button>
              <div class="title-wrapper streaming-info"></div>
              <button class="btn btn-primary">
                <ion-icon name="play"></ion-icon>
                <span>Assistir Agora</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </article>
  </main>
  
  <section class="rating-section">
    <div class="container">
      <h2 class="h2 section-title">Avaliações</h2>
      <label for="rating">Dê sua avaliação:</label>
      <div class="stars" id="rating">
        <button class="star" data-value="1">&#9733;</button>
        <button class="star" data-value="2">&#9733;</button>
        <button class="star" data-value="3">&#9733;</button>
        <button class="star" data-value="4">&#9733;</button>
        <button class="star" data-value="5">&#9733;</button>
      </div>
      
      
      <textarea placeholder="Escreva sua opinião..." class="review-input"></textarea>
      <button class="btn btn-primary">Enviar Avaliação</button>
    </div>
  </section>
  
  <footer class="footer">
    <div class="footer-top">
      <div class="container">
        <div class="footer-brand-wrapper">
          <a href="./Home Page.html" class="logooo">
            <img src="./assets/images/logooo.png" alt="Film Echo logo">
          </a>        
          <ul class="footer-list">
            <li><a href="./Home Page.html" class="footer-link">Inicio</a></li>
            <li><a href="./Filmes.html" class="footer-link">Filmes</a></li>
            <li><a href="./Favoritos.html" class="footer-link">Favoritos</a></li>
            <li><a href="./Sobre.html" class="footer-link">Criadores</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        <p class="copyright">&copy; 2024 <a href="#">2° DS</a>. All Rights Reserved</p>
      </div>
    </div>
  </footer>

  <?php
// Código ponte reutilizado
    include 'database/conexao_bd_mysql.php';
  ?>



  <a href="#top" class="go-top" data-go-top>
    <ion-icon name="chevron-up"></ion-icon>
  </a>


  <script src="./assets/js/Movie-Details.js"></script>
  <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
  <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
</body>

</html>
