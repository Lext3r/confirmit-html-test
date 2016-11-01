window.onload = function(){

	var select = document.getElementById('categories_select');
	document.getElementById('cross').onclick = function() {
		//select...
	}

	var f = function(){
		let data = [];
		let rows = document.getElementsByTagName('tr');
		for (let i = 1; i < rows.length ; i++){
			data[i] = rows[i].innerText.trim().split('\t');
			let positive = (((data[i][3] / data[1][1]))*100).toFixed(2);
			let negative = (Math.abs(data[i][2] / data[1][1])*100).toFixed(2);
			rows[i].children[4].children[1].style.width = positive + "%";
			rows[i].children[4].children[0].style.width = negative + "%";
		}
	}
	f();
}
