<?php
session_start();
$id = $_GET["id"];
$_SESSION["selected"][3] = $id;
?>

<img src="images/table.jpg" width="1000px" class="table"/>