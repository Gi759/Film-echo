<?php

$local_servidor = "localhost"; // Apenas "localhost"
$bd_procurado = "bd_inter";

$usuario = "root";
$senha = "";

// Conexão ao banco de dados
$conexao_servidor_bd = mysqli_connect($local_servidor, $usuario, $senha, $bd_procurado, 3306);

if (!$conexao_servidor_bd) {
    die("Conexão falhou: " . mysqli_connect_error());
}

// Operações no banco de dados

// Fechando a conexão
mysqli_close($conexao_servidor_bd);

?>
