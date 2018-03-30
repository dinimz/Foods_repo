var appID = "65e26464";
var appKey = "c36b1cb49a17114be31f8e18a0da6361" ;

var startCategories = ["Brandy","Gin","Rum","Tequila","Vodka","Whiskey"];
var categoryNames = ["Liquor", "Suppliment 1", "Suppliment 2", "Suppliment 3"];
var selectedCategories = [0,0,0,0];
var categoryList = [[],[38],[357],[437,575]];
var defaultCategory = "";

var categoryNode = document.getElementById("categories");
for (cat in startCategories){
	categoryNode.innerHTML += "<li class='list-group-item'  onClick=\"getCategory('" + startCategories[cat] + "');\"><Image src='' width='100'/><br>" + startCategories[cat] + "</li>";
}

function getCategory(cat){
	var xhr = (window.XMLHttpRequest)? new XMLHttpRequest(): new activeXObject("Microsoft.XMLHTTP");
	var data = new FormData;
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4 && xhr.status==200){
			categoryNode.innerHTML = "";
			var jNodes = JSON.parse(xhr.responseText.trim());
			for (i = 0 ; i < jNodes.length; i++){
				var item = jNodes[i];
				if(item["name"].toLowerCase().indexOf(cat.toLowerCase()) >= 0)
					categoryNode.innerHTML += "<li class='list-group-item'  onClick=\"addSubCategory(" + item["id"] + ", 1);\"><Image src='" + item["_links"]["image"]["size_480"] + "' width='100'/><br>" + item["name"] + "</li>";
			}
			console.log(jNodes);
		}
	}
	xhr.open('get','https://api.foodpairing.com/ingredients?q=' + cat,true);
	xhr.setRequestHeader('X-Application-ID', appID);
	xhr.setRequestHeader('X-Application-Key', appKey);
	xhr.send(data);
}

function addSubCategory(id, position){
	column = document.getElementById("cat" + String(position));
	selectedCategories[position-1] = id;
	column.innerHTML = "<label>" + categoryNames[position] + "</label>" +
				"<ul class='list-group'>";
	
	var xhr = (window.XMLHttpRequest)? new XMLHttpRequest(): new activeXObject("Microsoft.XMLHTTP");
	var data = new FormData;
	var pairings = selectedCategories[0];
	for(x = 1; x < position; x++)
		pairings += "," + selectedCategories[x];
	if(position == 3) pairings = selectedCategories[0];
	console.log(pairings);
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4 && xhr.status==200){
			var jNodes = JSON.parse(xhr.responseText.trim());
			for (i = 0 ; i < jNodes.length; i++){
				var item = jNodes[i];
				var cats = item["_links"]["ingredient"]["_links"]["categories"];
				var ok = false;
				for (j = 0; j < cats.length; j++){
					for(k = 0; k < categoryList.length; k++){
						if(cats[j]["id"] == categoryList[position][k])
							ok = true;
					}
				}
				if(ok){
					column.innerHTML += "<li class='list-group-item' onClick=\"addSubCategory(" + item["_links"]["ingredient"]["id"] + ", " + (position + 1) + ");\"><Image src='" + item["_links"]["ingredient"]["_links"]["image"]["size_480"] + "' width='100'/><br>" + item["_links"]["ingredient"]["name"] + "</li>";
				}
			}
			console.log(jNodes);
		}
	}
	xhr.open('get','https://api.foodpairing.com/ingredients/' + pairings + '/pairings',true);
	xhr.setRequestHeader('X-Application-ID', appID);
	xhr.setRequestHeader('X-Application-Key', appKey);
	xhr.send(data);
	
	column.innerHTML += "</ul>";
}
	
	