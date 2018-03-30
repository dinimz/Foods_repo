var appID = "65e26464";
var appKey = "c36b1cb49a17114be31f8e18a0da6361" ;

function getCategory(cat){
	var xhrf = (window.XMLHttpRequest)? new XMLHttpRequest(): new activeXObject("Microsoft.XMLHTTP");
	var data = new FormData;
	data.append("X-Application-ID",appID);
	data.append("X-Application-Key",appKey);
	xhrf.onreadystatechange = function(){
		if(xhrf.readyState==4 && xhrf.status==200){
			console.log(xhrf.responseText.trim());
		}
	}
	xhrf.open('get','https://api.foodpairing.com/ingredients?q=' + cat,true);
	xhrf.send(data);
}
	