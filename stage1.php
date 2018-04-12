<?php
session_start();
$appID = "65e26464";
$appKey = "c36b1cb49a17114be31f8e18a0da6361" ;
$categoryList = [[],[38],[357],[437,575]];
$elmsPerPage = 5;

if(!isset($_SESSION["selected"])) $_SESSION["selected"] = [0,0,0,0];
$id = $_GET["id"];
$step = $_GET["step"];
$function = $_GET["funct"];

if($function == "getSub"){ //get sub categories
	$_SESSION["selected"][$step - 1] = $id;
	$pairings = $_SESSION["selected"][0];
	if($step == 4) return;
	for($i = 1; $i < $step ; $i++){
		$pairings .= "," . $_SESSION["selected"][$i];
	}
	$all = getIngredients($pairings, $step);
	echo '<tr><td width="100px" align="right">';
	echo '<div class="page_button" style="display:none" id="page-left-btn" onclick="prevPage();"><span class="fa fa-angle-left page_button_inner" style="margin-right: 30px;"></span></div>';
	if(count($all) == 0){
		echo '</td><td><h2 class=\'sel-matching\'>Sorry, No matches found!</h2>';
	}
	else{
		echo "</td><td><ul class='mi-current' id='items_grid'>";
	}
	$total = count($all);
	$numPages = intval($total/$elmsPerPage);
	if($numPages * $elmsPerPage < $total ) $numPages++;
	for($i = 0; $i < $numPages ; $i++){
		if($i == 0)
			echo '<div class="listPage selected-page">';
		else 
			echo '<div class="listPage">';
		for($j = $i * $elmsPerPage; $j < $total && $j < ($i * $elmsPerPage) + $elmsPerPage; $j++){
			echo "<li onClick='getIngredient(" . $all[$j][0] . ",". ($step + 1) ." ,this);'><a><img src='".$all[$j][2]."' alt='".$all[$j][1]."'><h4>".$all[$j][1]."</h4></a></li>";
		}
		echo '</div>';
	}
	if(count($all) == 0){
		echo '</td><td width="100px">';
	}
	else{
		echo '</ul></td><td width="100px">';
	}
	$nextDisplay = ($numPages > 1) ? "block": "none";
	echo '<div class="page_button" style="display:'.$nextDisplay.'" id="page-right-btn" onclick="nextPage();"><span class="fa fa-angle-right page_button_inner" style="margin-left: 30px;"></span></div>';
	echo '</td></tr></table>';
}
else{ //get main categories, load the whole page
	$liquorList = getLiquor($id);
	echo "<div id='mi-slider' class='mi-slider'>";
	echo '<table id="mi-display-content"><tr><td width="100px" align="right">';
	echo '<div class="page_button" style="display:none" id="page-left-btn" onclick="prevPage();"><span class="fa fa-angle-left page_button_inner" style="margin-right: 30px;"></span></div>';
	echo "</td><td><ul class='mi-current' id='items_grid'>";
	$total = count($liquorList);
	$numPages = intval($total/$elmsPerPage);
	if($numPages * $elmsPerPage < $total ) $numPages++;
	for($i = 0; $i < $numPages ; $i++){
		if($i == 0)
			echo '<div class="listPage selected-page">';
		else 
			echo '<div class="listPage">';
		for($j = $i * $elmsPerPage; $j < $total && $j < ($i * $elmsPerPage) + $elmsPerPage; $j++){
			echo "<li onClick='getIngredient(" . $liquorList[$j][0] . ",1 ,this);'><a><img src='".$liquorList[$j][2]."' alt='".$liquorList[$j][1]."'><h4>".$liquorList[$j][1]."</h4></a></li>";
		}
		echo '</div>';
	}
	echo '</ul></td><td width="100px">';
	$nextDisplay = ($numPages > 1) ? "block": "none";
	echo '<div class="page_button" style="display:'.$nextDisplay.'" id="page-right-btn" onclick="nextPage();"><span class="fa fa-angle-right page_button_inner" style="margin-left: 30px;"></span></div>';
	echo '</td></tr></table>';
	echo "
		<nav>
			<a class='steps mi-selected' onclick='getCategory(\"".$id."\")'>Liquor</a>
			<a class='steps'>Suppliment 1</a>
			<a class='steps'>Suppliment 2</a>
			<a class='steps'>Suppliment 3</a>
		</nav>";
		
	echo "<ul  id='selections_grid'>";
	echo "<li><a id='selection_preview_1'><img src='images/emptyPlace.png' alt='Liquor'><h4>Not Selected</h4></a></li>";
	echo "<li><a id='selection_preview_2'><img src='images/emptyPlace.png' alt='Suppliment 1'><h4>Not Selected</h4></a></li>";
	echo "<li><a id='selection_preview_3'><img src='images/emptyPlace.png' alt='Suppliment 2'><h4>Not Selected</h4></a></li>";
	echo "<li><a id='selection_preview_4'><img src='images/emptyPlace.png' alt='Suppliment 3'><h4>Not Selected</h4></a></li>";
	echo "</ul>";
}

function getLiquor($id){
	$appID = "65e26464";
	$appKey = "c36b1cb49a17114be31f8e18a0da6361" ;
	try {
		$url = 'https://api.foodpairing.com/ingredients?q=' . $id;
		
        $curl            = curl_init($url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_POST, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($curl, CURLOPT_HTTPHEADER, array(
			'X-Application-ID: '.$appID,
			'X-Application-Key: '.$appKey));
        $curl_response   = curl_exec($curl);
        curl_close($curl);
        $liquorList    = json_decode($curl_response);
		$returnArr = [];
		
		for ($i = 0 ; $i < count($liquorList); $i++){
			$item = $liquorList[$i];
			if(strpos(strtolower($item->name),strtolower($id)) != False)
				array_push($returnArr,[$item->id,$item->name,$item->_links->image->size_480]);
		}
		return $returnArr;
	} catch (Exception $ex) {
		return ["Error"];
	}
}

function getIngredients($id, $step){	
	$appID = "65e26464";
	$appKey = "c36b1cb49a17114be31f8e18a0da6361" ;
	$categoryList = [[],[38],[357],[437,575]];
	try {
		$url = 'https://api.foodpairing.com/ingredients/' . $id . '/pairings';
        $curl            = curl_init($url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_POST, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($curl, CURLOPT_HTTPHEADER, array(
			'X-Application-ID: '.$appID,
			'X-Application-Key: '.$appKey));
        $curl_response   = curl_exec($curl);
        curl_close($curl);
        $liquorList    = json_decode($curl_response);
		$returnArr = [];
		
		for ($i = 0 ; $i < count($liquorList); $i++){
			$item = $liquorList[$i];
			$cats = $item->_links->ingredient->_links->categories;
			$ok = false;
			for ($j = 0; $j < count($cats); $j++){
				for($k = 0; $k < count($categoryList[$step]); $k++){
					if($cats[$j]->id == $categoryList[$step][$k])
						$ok = true;
				}
			}
			if($ok){
				array_push($returnArr,[$item->_links->ingredient->id,$item->_links->ingredient->name,$item->_links->ingredient->_links->image->size_480]);
			}
		}
		return $returnArr;
	} catch (Exception $ex) {
		return ["Error"];
	}
}

