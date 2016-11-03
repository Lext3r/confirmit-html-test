window.onload = function(){
	var select = document.getElementById('categories_select');
	document.getElementById('cross').onclick = function() {
		document.getElementById('categories_select').value = "none";
	}
}
