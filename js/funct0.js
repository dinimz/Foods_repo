var pageIndex = 0;
function getCategory(cat){
	document.getElementById("main_container").innerHTML = "";
	var xhr = (window.XMLHttpRequest)? new XMLHttpRequest(): new activeXObject("Microsoft.XMLHTTP");
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4 && xhr.status==200){
			document.getElementById("step_name").innerHTML = "Choose your liquor";
			document.getElementById("main_container").innerHTML = xhr.responseText.trim();
		}
	}
	xhr.open('get','stage1.php?id=' + cat + "&step=0&funct=basePage" ,true);
	xhr.send();
}

function getIngredient(cat,step){
	var itemsGrid = document.getElementById("items_grid");
	itemsGrid.innerHTML = "";
	switch(step){
		case 1 : document.getElementById("step_name").innerHTML = "Choose your suppliment 1"; break;
		case 2 : document.getElementById("step_name").innerHTML = "Choose your suppliment 2"; break;
		case 3 : document.getElementById("step_name").innerHTML = "Choose your suppliment 3"; break;
	}
	var xhr = (window.XMLHttpRequest)? new XMLHttpRequest(): new activeXObject("Microsoft.XMLHTTP");
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4 && xhr.status==200){
			itemsGrid.innerHTML = xhr.responseText.trim();
		}
	}
	xhr.open('get','stage1.php?id=' + cat + "&step="+ step +"&funct=getSub" ,true);
	xhr.send();
	var stepNavigation = document.getElementsByClassName("steps");
	for(i = 0; i< stepNavigation.length; i++){
		stepNavigation[i].classList.remove("mi-selected");
	}
	stepNavigation[step].classList.add("mi-selected");
	for(i = step + 1; i < stepNavigation.length; i++){
		stepNavigation[i].setAttribute("onClick","");
	}
	if(step < 4){
		stepNavigation[step].setAttribute("onClick","getIngredient(" + cat + "," + step + ");");
	}
}

function goToNextStage(itm){
	document.getElementById("main_container").innerHTML = "";
	var xhr = (window.XMLHttpRequest)? new XMLHttpRequest(): new activeXObject("Microsoft.XMLHTTP");
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4 && xhr.status==200){
			document.getElementById("step_name").innerHTML = "Receipt for your cocktail";
			document.getElementById("main_container").innerHTML = xhr.responseText.trim();
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