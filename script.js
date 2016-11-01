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
			data[i]['positive'] = data[i][3] / data[1][1];
			data[i]['negative'] = Math.abs(data[i][2] / data[1][1]);
			console.log(data[i]['positive']);
			console.log(data[i]['negative']);
		}

		//counting

		//draw
	}
	f();
}
