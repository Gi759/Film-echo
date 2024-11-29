<!DOCTYPE html>
<html lang="Pt-Br">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Avaliações</title>
  <!-- CSS e Fontes -->
  <link rel="stylesheet" href="./assets/css/Home Page.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>

<body id="top">
<header class="header" data-header>
    <div class="container">
      <div class="overlay" data-overlay></div>

      <a href="./Avaliações.php" class="logo">
        <img src="assets/images/logoo.png" alt="Film Echo logo">
      </a>

      <div class="header-actions">
        <button class="search-btn">
          <ion-icon name="search-outline"></ion-icon>
        </button>
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
          <a href="./Avaliações.php" class="logo">
            <img src="./assets/images/logoo.png" alt="Film Echo logo">
          </a>
          <button class="menu-close-btn" data-menu-close-btn>
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>

        <ul class="navbar-list">
          <li><a href="./Home Page.html" class="navbar-link">Inicio</a></li>
          <li><a href="./Filmes.html" class="navbar-link">Filmes</a></li>
          <li><a href="./Avaliações.php" class="navbar-link">Avaliações</a></li>
          <li><a href="./Favoritos.html" class="navbar-link">Favoritos</a></li>
          <li><a href="./Criadores.html" class="navbar-link">Criadores</a></li>
          <li><a href="./user-page.html" class="navbar-link">Página de Usuário</a></li>
        </ul>
      </nav>
    </div>
  </header>


  <main>
    <h1>Avaliações de Filmes</h1>
    <!-- Exibir avaliações dinâmicas -->
    <div class="avaliacoes">
      <?php if (!empty($filmes)): ?>
        <?php foreach ($filmes as $filme): ?>
          <div class="filme">
            <h2><?php echo htmlspecialchars($filme['filme_titulo']); ?></h2>
            <img src="<?php echo htmlspecialchars($filme['filme_poster']); ?>" alt="Poster de <?php echo htmlspecialchars($filme['filme_titulo']); ?>">
            <p><strong>Estrelas:</strong> <?php echo $filme['filme_estrelas']; ?></p>
            <p><?php echo htmlspecialchars($filme['filme_comentarios']); ?></p>
          </div>
        <?php endforeach; ?>
      <?php else: ?>
        <p>Nenhum filme avaliado ainda.</p>
      <?php endif; ?>
    </div>

    <!-- Formulário para adicionar avaliações -->
    <form action="Avaliações.php" method="post">
      <h2>Adicionar Avaliação</h2>
      <label for="titulo">Título do Filme:</label>
      <input type="text" name="titulo" id="titulo" required>
      
      <label for="poster">URL do Poster:</label>
      <input type="url" name="poster" id="poster" required>
      
      <label for="estrelas">Avaliação (1-5 estrelas):</label>
      <input type="number" name="estrelas" id="estrelas" min="1" max="5" required>
      
      <label for="comentarios">Comentários:</label>
      <textarea name="comentarios" id="comentarios" rows="4" required></textarea>
      
      <button type="submit">Enviar Avaliação</button>
    </form>
  </main>

  <footer class="footer">
    <!-- Rodapé -->
  </footer>
</body>

</html>

<?php
// Conexão ao banco de dados
include 'database/conexao_bd_mysql.php';

// Inicializa variáveis
$filmes = [];

// Insere avaliações no banco de dados
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $titulo = $_POST['titulo'];
    $poster = $_POST['poster'];
    $estrelas = $_POST['estrelas'];
    $comentarios = $_POST['comentarios'];

    $sql_insert = "INSERT INTO tb_avaliacoes (poster_filme, nome_filme, avaliacao_texto, avaliacao_estrelas) 
                   VALUES (?, ?, ?, ?)";
    $stmt = $mysqli->prepare($sql_insert);
    $stmt->bind_param("sssd", $poster, $titulo, $comentarios, $estrelas);
    $stmt->execute();
    $stmt->close();
}

// Consulta avaliações no banco de dados
$sql_select = "SELECT nome_filme AS filme_titulo, poster_filme AS filme_poster, 
                      avaliacao_texto AS filme_comentarios, avaliacao_estrelas AS filme_estrelas 
               FROM tb_avaliacoes ORDER BY id_avaliacao DESC";
$result = $mysqli->query($sql_select);

// Organiza os resultados em um array
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $filmes[] = $row;
    }
}

$mysqli->close();
?>
