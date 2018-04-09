<!DOCTYPE html>
<html lang="en" class="no-js">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
		<meta name="viewport" content="width=device-width, initial-scale=1.0"> 
		<title>Cocktail</title>
		<meta name="description" content="Simple Multi-Item Slider: Category slider with CSS animations" />
		<meta name="keywords" content="jquery plugin, item slider, categories, apple slider, css animation" />
		<meta name="author" content="Codrops" />
		<link rel="shortcut icon" href="../favicon.ico"> 
		
		<script src="js/funct0.js"></script>
		<link href="css/bootstrap.css" rel="stylesheet">
		<link href="css/font-awesome.css" rel="stylesheet" type="text/css">
		<link rel="stylesheet" type="text/css" href="css/style.css" />
		<script src="js/modernizr.custom.63321.js"></script>
		<style>
			.base_liquor_img{
				position: absolute;
				cursor:pointer;
				transition: color 0.5s linear;
			}
			
			.base_liquor_label{
				position: absolute;
				color:White;
				font-weight:bolder;
				display:none;
				transition: color 0.5s linear;
			}
			
			.base_liquor:hover .base_liquor_label{
				display:block;
				transition: color 0.5s linear;
			}
			
			.base_liquor:hover .base_liquor_img{
				opacity:0.8;
				transition: color 0.5s linear;
			}
			
			.table{
				margin-top:100px;
			}
			
			.page_button{
				border: solid 2px gray;
				border-radius: 40px;
				width: 80px;
				height: 80px;
				cursor:pointer;
			}
			
			.page_button_inner{
				width: 30px;
				display: block;
				height: 30px;
				color: gray;
				margin-top: 8px;
				font-size: 60px;
			}
			
			.page_button:hover{
				opacity:0.7;
			}
			
			.steps{
				cursor:pointer;
			}
			
			.steps[onclick=""]{
				cursor:beam;
			}
				
			#mi-display-content{
				width:100%;
			}
			
			.sel-matching{
				text-align: center;
				margin-top: 40px;
				margin-bottom: 40px;
				color: Gray;
			}
			#selections_grid li{
				webkit-transform: unset;
				transform: unset;
			}
			#selections_grid li a img{
				width: 100px;
			}
			
			.mi-slider ul li h4{
				padding: 0px !important;
			}
			
			.main {
				padding-bottom: 80px !important;
			}
		</style>
	</head>
	<body>
		<div class="container">	

			<!-- Codrops top bar -->
			<!--<div class="codrops-top clearfix">
				<a href="http://tympanus.net/Development/SliderPagination/"><strong>&laquo; Previous Demo: </strong>Slider Pagination Concept</a>
				<span class="right"><a href="http://tympanus.net/codrops/?p=13218"><strong>Back to the Codrops Article</strong></a></span>
			</div><!--/ Codrops top bar -->
			<header class="clearfix">
				<h1>Let's Make Your Cocktail <span id="step_name">Choose your base liquor</span></h1>
			</header>
			<div class="main" id="main_container">
				<img src="images/table.jpg" width="1000px" class="table"/>
				<div class="base_liquor" onclick="getCategory('Brandy');">
					<img src="images/Brandy.png" width="100px" class="base_liquor_img" style="left:150px; top:200px;"/>
					<label class="base_liquor_label" style="left:100px; top:350px;">Brandy</label>
				</div>
				<div class="base_liquor" onclick="getCategory('Vodka');">
					<img src="images/Vodka.png" width="100px" class="base_liquor_img" style="left:300px; top:150px;"/>
					<label class="base_liquor_label" style="left:320px; top:370px;">Vodka</label>
				</div>
				<div class="base_liquor" onclick="getCategory('Rum');">
					<img src="images/Rum.png" width="100px" class="base_liquor_img" style="left:500px; top:190px;"/>
					<label class="base_liquor_label" style="left:560px; top:340px;">Rum</label>
				</div>
				<div class="base_liquor" onclick="getCategory('Whiskey');">
					<img src="images/Whiskey.png" width="100px" class="base_liquor_img" style="left:650px; top:160px;"/>
					<label class="base_liquor_label" style="left:610px; top:350px;">Whiskey</label>
				</div>
				<div class="base_liquor" onclick="getCategory('Gin');">
					<img src="images/Gin.png" width="100px" class="base_liquor_img" style="left:400px; top:160px;"/>
					<label class="base_liquor_label" style="left:500px; top:400px;">Gin</label>
				</div>
				<div class="base_liquor" onclick="getCategory('Tequila');">
					<img src="images/Tequila.png" width="100px" class="base_liquor_img" style="left:800px; top:210px;"/>
					<label class="base_liquor_label" style="left:760px; top:380px;">Tequila</label>
				</div>
			</div>
		</div><!-- /container -->
		<script src="js/jquery.js"></script>
		<script src="js/bootstrap.js"></script>
		<script src="js/jquery.catslider.js"></script>
		<script>
			$(function() {

				$( '#mi-slider' ).catslider();

			});
		</script>
	</body>
</html>