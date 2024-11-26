<?php

$local_servidor = "localhost:3306";
$bd_procurado = "bd_inter";

$usuario = "root";
$senha = "";

$conexao_servidor_bd = mysqli_connect($local_servidor, $usuario, $senha,  $bd_procurado);
                      

?>