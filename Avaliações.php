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
      <!-- Cabeçalho e navegação -->
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

  <?php

$local_servidor = "localhost";
$bd_procurado = "bd_inter";

$usuario = "root";
$senha = "";

// Conexão ao banco de dados
$conexao_servidor_bd = mysqli_connect($local_servidor, $usuario, $senha, $bd_procurado, 3306);

if (!$conexao_servidor_bd) {
    die("Conexão falhou: " . mysqli_connect_error());
}

// Função para buscar os filmes avaliados
$sql_buscar = "SELECT * FROM tb_filmes";
$resultado_filmes = mysqli_query($conexao_servidor_bd, $sql_buscar);

$filmes = [];
if ($resultado_filmes && mysqli_num_rows($resultado_filmes) > 0) {
    while ($linha = mysqli_fetch_assoc($resultado_filmes)) {
        $filmes[] = $linha;
    }
}

// Fechando a conexão
mysqli_close($conexao_servidor_bd);

?>


</body>

</html>

<?php
// Inserir avaliação (se houver POST)
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $titulo = $_POST['titulo'];
    $poster = $_POST['poster'];
    $estrelas = (int) $_POST['estrelas'];
    $comentarios = $_POST['comentarios'];

    $conexao_servidor_bd = mysqli_connect($local_servidor, $usuario, $senha, $bd_procurado, 3306);
    if (!$conexao_servidor_bd) {
        die("Conexão falhou: " . mysqli_connect_error());
    }

    $sql_inserir = "INSERT INTO tb_filmes (filme_titulo, filme_poster, filme_estrelas, filme_comentarios) VALUES (?, ?, ?, ?)";
    $stmt = mysqli_prepare($conexao_servidor_bd, $sql_inserir);
    mysqli_stmt_bind_param($stmt, "ssis", $titulo, $poster, $estrelas, $comentarios);

    if (mysqli_stmt_execute($stmt)) {
        echo "<script>alert('Avaliação adicionada com sucesso!');</script>";
    } else {
        echo "<script>alert('Erro ao adicionar avaliação: " . mysqli_error($conexao_servidor_bd) . "');</script>";
    }

    mysqli_stmt_close($stmt);
    mysqli_close($conexao_servidor_bd);
}
?>