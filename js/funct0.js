var pageIndex = 0;
var dataAquired = false;
var animOver = false;
var aqData = "";
function getCategory(cat,elem){
	var xhr = (window.XMLHttpRequest)? new XMLHttpRequest(): new activeXObject("Microsoft.XMLHTTP");
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4 && xhr.status==200){
			document.getElementById("step_name").innerHTML = "Choose your liquor";
			document.getElementById("selections").innerHTML = xhr.responseText.trim();
		}
	}
	xhr.open('get','stage1.php?id=' + cat + "&step=0&funct=basePage" ,true);
	xhr.send();
	$('#selections').animate({
		opacity: "0"
	},500, function(){
		document.getElementById("selections").innerHTML = "<h2 class='sel-matching'>Aquiring data, please wait...</h2>";
		$('#selections').animate({
			opacity: "1"
		},200);
	});
}
function animePrepRecBtn(){
	console.log("anime");
	var obj = document.getElementById("prep_rec");
	var container = document.getElementById("mi-display-content");
	var rectObj = obj.getBoundingClientRect();
	var rectCont = container.getBoundingClientRect();
	$('#prep_rec').animate({
		left: (rectCont.width - rectObj.width -40) + "px"
	},700);
	var animRef = document.getElementById("mi-slider");
	var rectRef = animRef.getBoundingClientRect();
	document.getElementById("recipe-pane").style.left = (rectRef.left + rectRef.width + 100) + "px";
}

function getIngredient(cat, step, elm){
	animOver = false;;
	aqData = "";
	dataAquired = false;
	var itemsGrid = document.getElementById("mi-display-content");
	var prevElem = document.getElementById("selection_preview_" + step);
	var xhr = (window.XMLHttpRequest)? new XMLHttpRequest(): new activeXObject("Microsoft.XMLHTTP");
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4 && xhr.status==200){
			if(animOver){
				itemsGrid.innerHTML = xhr.responseText.trim();
				if(step == 4) animePrepRecBtn();
			}
			else{
				aqData = xhr.responseText.trim();
				dataAquired = true;
			}
		}
	}
	
	xhr.open('get','stage1.php?id=' + cat + "&step="+ step +"&funct=getSub" ,true);
	xhr.send();
	if(elm == null){
	}
	var animSample = document.getElementById("anim-sample");
	var animOriginal = elm.childNodes[0].getElementsByTagName("img")[0];
	var animDest = prevElem.getElementsByTagName("img")[0];
	var rectOrg = animOriginal.getBoundingClientRect();
	var rectDest = animDest.getBoundingClientRect();
	animSample.setAttribute("src", animOriginal.getAttribute("src"));
	animSample.setAttribute("style", "left : " + rectOrg.left + "px; " +
									 "Top : " + rectOrg.top + "px; " +
									 "display : block; position : absolute;");
	//animation
	$('#anim-sample').animate({
		left: rectDest.left +"px",
		top: rectDest.top +"px",
		width: rectDest.width +"px",
		height: rectDest.height +"px"
	},500, function(){
		animOver = true;
		animSample.setAttribute("style", "display : none;");
		//change sub topic
		switch(step){
			case 1 : document.getElementById("step_name").innerHTML = "Choose your suppliment 1"; break;
			case 2 : document.getElementById("step_name").innerHTML = "Choose your suppliment 2"; break;
			case 3 : document.getElementById("step_name").innerHTML = "Choose your suppliment 3"; break;
		}
		
		if(elm != null){  //set the image
			var destImg = elm.childNodes[0].getElementsByTagName("img")[0].getAttribute("src");
			var destName = elm.childNodes[0].getElementsByTagName("h4")[0].innerHTML;
			prevElem.getElementsByTagName("img")[0].setAttribute("src", destImg);
			prevElem.getElementsByTagName("h4")[0].innerHTML = destName;
		}
		else{// clear images of the selected ingredients if returning form front
			for(h = step + 1; h < 4;  h++){
				prevElem = document.getElementById("selection_preview_" + h);
				prevElem.getElementsByTagName("img")[0].setAttribute("src", "images/emptyPlace.png");
				prevElem.getElementsByTagName("h4")[0].innerHTML = "Not Selected";
			}
		}
		
		var stepNavigation = document.getElementsByClassName("steps");
		for(i = 0; i< stepNavigation.length; i++){
			stepNavigation[i].classList.remove("mi-selected");
		}
		if(step != 4)
			stepNavigation[step].classList.add("mi-selected");
		for(i = step + 1; i < stepNavigation.length; i++){
			stepNavigation[i].setAttribute("onClick","");
		}
		if(step < 4){
			stepNavigation[step].setAttribute("onClick","getIngredient(" + cat + "," + step + " ,null);");
		}
		if(dataAquired){
			itemsGrid.innerHTML = aqData;
				if(step == 4) animePrepRecBtn();
		}
		else{
			itemsGrid.innerHTML = "<h2 class='sel-matching'>Matching your selections, please wait...</h2>";
		}
	});
	
	
}

function goToNextStage(itm){
	$('#mi-slider').animate({
		left: "-300px"
	},700,function (){
		var animRef = document.getElementById("mi-slider");
		var rectRef = animRef.getBoundingClientRect();
		document.getElementById("recipe-pane").style.left = (rectRef.left + rectRef.width) + "px";
		$('#recipe-pane').animate({
			opacity: 1.0
		},500);
	});
	//document.getElementById("main_container").innerHTML = "";
	var xhr = (window.XMLHttpRequest)? new XMLHttpRequest(): new activeXObject("Microsoft.XMLHTTP");
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4 && xhr.status==200){
			//document.getElementById("step_name").innerHTML = "Receipt for your cocktail";
			//document.getElementById("main_container").innerHTML = xhr.responseText.trim();
		}
	}
	xhr.open('get','stage2.php?id=' + itm ,true);
	xhr.send();
}

function nextPage(){
	var pageRightBtn = document.getElementById("page-right-btn");
	var pageLeftBtn = document.getElementById("page-left-btn");
	var pageCollection = document.getElementsByClassName("mi-current")[0];
	pageIndex++;
	var allPages = pageCollection.childNodes;
	if(pageIndex > allPages.length -1)
		pageIndex = allPages.length -1;
	if(pageIndex == allPages.length -1)
		pageRightBtn.style.display = "none";
	if(pageIndex != 0)
		pageLeftBtn.style.display = "block";
	for(i = 0; i < allPages.length; i++)
		allPages[i].classList.remove("selected-page");
	allPages[pageIndex].classList.add("selected-page");
}

function prevPage(){
	var pageRightBtn = document.getElementById("page-right-btn");
	var pageLeftBtn = document.getElementById("page-left-btn");
	var pageCollection = document.getElementsByClassName("mi-current")[0];
	pageIndex--;
	var allPages = pageCollection.childNodes;
	if(pageIndex < 0)
		pageIndex = 0;
	if(allPages.length > 1)
		pageRightBtn.style.display = "block";
	if(pageIndex == 0)
		pageLeftBtn.style.display = "none";
	for(i = 0; i < allPages.length; i++)
		allPages[i].classList.remove("selected-page");
	allPages[pageIndex].classList.add("selected-page");
}