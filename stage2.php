<?php
session_start();
$id = $_GET["id"];
$_SESSION["selected"][3] = $id;
?>

<img src="images/co_glass.png" width="300px;" id="cocktail_glass"/>