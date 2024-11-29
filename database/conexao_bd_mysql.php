<?php

// Variáveis
$hostname = "localhost";
$bancodedados = "film_echo";
$usuario = "root";
$senha = "";

// Conexão ao banco de dados
$mysqli = new mysqli($hostname, $usuario, $senha, $bancodedados);

// Tela de Erro/Conexão
if ($mysqli->connect_errno) {
    die("Falha na Conexão: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error);
}
// Mensagem opcional de sucesso (removida para evitar exibição desnecessária em produção)

// Nota: O fechamento da conexão é gerenciado no script que utiliza este arquivo.
?>

