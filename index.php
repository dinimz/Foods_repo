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
				position: relative;
				cursor:pointer;
				transition: color 0.5s linear;
				display:inline-block;
				max-height:150px;
				max-width:80px;
				margin-bottom:0px;
				vertical-align:bottom;
			}
			
			.base_liquor_label{
				position: absolute;
				color:white;
				font-weight:bolder;
				display:none;
				transition: color 0.5s linear;
				font-size: 20px;
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
				height:500px;
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
				height: 200px;
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
			#selections_grid div a img{
				width: 30%;
				display:block;
			}
			
			.mi-slider ul li h4{
				padding: 0px !important;
			}
			
			.main {
				padding-bottom: 80px !important;
			}
			
			#cocktail_glass{
				
			}
			
			#prep_rec{
				position: absolute;
				top: 200px;
				cursor: pointer;
			}
			
			.prep_rec_btn{
				display: inline-block;
				font-size: 40px;
				font-weight: bolder;
				font-family: "Calibri";
				vertical-align: -5px;
				color:orange;
			}
			
			.prep_rec_Img{
				height: 50px;
			}
			
			#recipe-pane{
				opacity:0.0;
				/*display:none;*/
				float: right;
				position: absolute;
				left: 700px;
				top: 80px;
			}
			
			#recipe-svg{
				position: absolute;
				left: 220px;
				top: 70px;
			}
			
			#back_img, #back_cover{
				position: absolute;
				left: 0px;
				width: 100%;
			}
			
			#back_cover{
				
			}
			
			#step_name{
				color: white;
			}
			
			#body{
				height:100%;
				overflow:hidden;
			}
			
			.loader {
			  border: 16px solid #f3f3f3;
			  border-radius: 50%;
			  border-top: 16px solid #3498db;
			  width: 120px;
			  height: 120px;
			  -webkit-animation: spin 2s linear infinite; /* Safari */
			  animation: spin 2s linear infinite;
			}

			/* Safari */
			@-webkit-keyframes spin {
			  0% { -webkit-transform: rotate(0deg); }
			  100% { -webkit-transform: rotate(360deg); }
			}

			@keyframes spin {
			  0% { transform: rotate(0deg); }
			  100% { transform: rotate(360deg); }
			}
		</style>
	</head>
	<body id="body"  onresize="resizeElements();">
		<div class="container">	

			<!-- Codrops top bar -->
			<!--<div class="codrops-top clearfix">
				<a href="http://tympanus.net/Development/SliderPagination/"><strong>&laquo; Previous Demo: </strong>Slider Pagination Concept</a>
				<span class="right"><a href="http://tympanus.net/codrops/?p=13218"><strong>Back to the Codrops Article</strong></a></span>
			</div><!--/ Codrops top bar -->
			
			<div class="main" id="main_container">
				<div id="back_cover"><img src="images/back1.png" id="back_img"></div>
				<div class="col-xs-9"> <!-- devide windows in to two, topic and selections-->
					<div class="row-xs-2"> <!-- devide in to two, Topic-->
						<header class="clearfix">
							<h1 style="color: white;">Let's Make Your Cocktail <span id="step_name">Choose your base liquor</span></h1>
						</header>
					</div>
					<div class="row-xs-7" id="selections"> <!-- devide in to two, Slections-->
						<div class="base_liquor col-xs-2" onclick="getCategory('Brandy',this);">
							<img src="images/Brandy.png" class="base_liquor_img"/>
							<label class="base_liquor_label">Brandy</label>
						</div>
						<div class="base_liquor col-xs-2" onclick="getCategory('Vodka',this);">
							<img src="images/Vodka.png" class="base_liquor_img"/>
							<label class="base_liquor_label">Vodka</label>
						</div>
						<div class="base_liquor col-xs-2" onclick="getCategory('Rum',this);">
							<img src="images/Rum.png" class="base_liquor_img"/>
							<label class="base_liquor_label">Rum</label>
						</div>
						<div class="base_liquor col-xs-2" onclick="getCategory('Whiskey',this);">
							<img src="images/Whiskey.png" class="base_liquor_img"/>
							<label class="base_liquor_label">Whiskey</label>
						</div>
						<div class="base_liquor col-xs-2" onclick="getCategory('Gin',this);">
							<img src="images/Gin.png" class="base_liquor_img"/>
							<label class="base_liquor_label">Gin</label>
						</div>
						<div class="base_liquor col-xs-2" onclick="getCategory('Tequila',this);">
							<img src="images/Tequila.png" class="base_liquor_img"/>
							<label class="base_liquor_label">Tequila</label>
						</div>
					</div>
				</div>
				<img src="images/Brandy.png" id="anim-sample" class="base_liquor_img" style="display:none; position:absolute; left:10%; top:15%;"/>
				<div class="col-xs-3"  id='selections_grid'> <!-- devide window in to two, All selections-->
					
				</div>
				<script>
					resizeElements();
				</script>
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