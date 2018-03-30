var appID = "65e26464";
var appKey = "c36b1cb49a17114be31f8e18a0da6361" ;

var startCategories = ["Brandy","Gin","Rum","Tequila","Vodka","Whiskey"];
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
				categoryNode.innerHTML += "<li class='list-group-item'  onClick=\"getCategory('" + item["id"] + "');\"><Image src='" + item["_links"]["image"]["size_480"] + "' width='100'/><br>" + item["name"] + "</li>";
			}
			console.log(jNodes);
		}
	}
	xhr.open('get','https://api.foodpairing.com/ingredients?q=' + cat,true);
	xhr.setRequestHeader('X-Application-ID', appID);
	xhr.setRequestHeader('X-Application-Key', appKey);
	xhr.send(data);
}
	