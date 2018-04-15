var pageIndex = 0;
var dataAquired = false;
var animOver = false;
var aqData = "";
var amount = [60,60,60,60];
var units = ["ml", "ml", "ml", "g"];
function getCategory(cat,elem){
	var selectionsTag = document.getElementById("selections");
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
		selectionsTag.removeAttribute("style");
		document.getElementById("selections").innerHTML = "<h2 class='sel-matching'><div class='loader'></div></h2>";
		var rectBody = document.getElementById("body").getBoundingClientRect();
		var rectSpin = document.getElementsByClassName("loader")[0].getBoundingClientRect();
		document.getElementById("back_cover").setAttribute("style", "overflow:hidden; height: " + rectBody.height + "px");
		document.getElementsByClassName("loader")[0].setAttribute("style", "margin-top: " + ((rectBody.height - rectSpin.height) / 2) + "px; margin-left: " + ((rectBody.width - rectSpin.width) / 2) + "px;");
		$('#back_cover').animate({
			height: "100px"
		},400);
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
	obj.style.top = ((rectCont.height - rectObj.height)/2) + "px";
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
	
	var animSample = document.getElementById("anim-sample");
	var animDest = prevElem.getElementsByTagName("img")[0];
	var rectDest = animDest.getBoundingClientRect();
	if(elm != null){
		var animOriginal = elm.childNodes[0].getElementsByTagName("img")[0];
		var rectOrg = animOriginal.getBoundingClientRect();
		animSample.setAttribute("src", animOriginal.getAttribute("src"));
		animSample.setAttribute("style", "left : " + rectOrg.left + "px; " +
								 "Top : " + rectOrg.top + "px; " +
								 "display : block; position : absolute;");
	}
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
			case 4 : document.getElementById("step_name").innerHTML = "Let's make your recipe "; break;
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
			itemsGrid.innerHTML = "<div class='loader'></div>";
			var rectBody = document.getElementById("selections").getBoundingClientRect();
			var rectSpin = document.getElementsByClassName("loader")[0].getBoundingClientRect();
			itemsGrid.innerHTML = "<div class='loader' style='border: 8px solid #f3f3f3; border-top: 8px solid #3498db; height: 70px; width: 70px; margin-top: 50px; margin-left: " + ((rectBody.width - rectSpin.width) / 2) + "px;'></div>";
		}
	});
	
	
}

function goToNextStage(itm){
	var rectSlider = document.getElementById("selections").getBoundingClientRect();
	$('#mi-slider').animate({
		left: "-" + rectSlider.width + "px"
	},700,function (){
		var animRef = document.getElementById("mi-slider");
		animRef.style.left= "-300px";
		animRef.innerHTML = "";
		var rectRef = animRef.getBoundingClientRect();
		document.getElementById("recipe-pane").style.left = (rectRef.left + rectRef.width) + "px";
		var rectBody = document.getElementById("body").getBoundingClientRect();
		$('#back_cover').animate({
			height: rectBody.height + "px"
		},400);
		document.getElementById("step_name").innerHTML = "Your recipe is ready";
		$('#recipe-pane').animate({
			opacity: 1.0
		},500, function(){
			$('.recipe-row').eq(3).animate({
				opacity: 1.0
			},400, function(){
				$('.recipe-row').eq(2).animate({
					opacity: 1.0
				},400, function(){
					$('.recipe-row').eq(1).animate({
						opacity: 1.0
					},400, function(){
						$('.recipe-row').eq(0).animate({
							opacity: 1.0
						},400);
					});
				});
			});
		});
	});
	var recipeLabels = document.getElementsByClassName("recipe-label");
	for(k = 3; k >= 0 ; k--){
		var supName = document.getElementById("selection_preview_" + (4 - k)).getElementsByTagName("h4")[0].innerHTML;
		recipeLabels[k].innerHTML = amount[3 - k] + units[3 - k] + " of " + supName;
	}
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

function resizeElements(){
	try{
		var imgTag = document.getElementById("back_img");
		var bodyRect = document.getElementById("body").getBoundingClientRect();
		var selectionsTag = document.getElementById("selections");
		var selectionsRect = selectionsTag.getBoundingClientRect();
		var imgRect = imgTag.getBoundingClientRect();
		console.log(bodyRect.height, bodyRect.width);
		imgTag.setAttribute("style", "top : " + (bodyRect.height - imgRect.height) + "px");
		selectionsTag.setAttribute("style", "margin-top : " + (bodyRect.height - selectionsRect.height - 350) + "px");

		
		
	}
	catch{
		console.log("ERR");
	}
}