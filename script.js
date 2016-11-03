window.onload = function(){

	var select = document.getElementById('categories_select');
	document.getElementById('cross').onclick = function() {
		document.getElementById('categories_select').value = "none";
	}

	var getData = function(){
		let data = [];
		let rows = document.getElementsByTagName('tr');
		for (let i = 1; i < rows.length ; i++){
			data[i-1] = rows[i].innerText.trim().split('\t');
		}
		return data;
	}

	let data = getData();

	drawChart = function(data){
		let negative_width = (Math.abs(data[0][2] / data[0][1] * 100)).toFixed(2);
		let positive_width = 90 - negative_width;
		for(let i = 0; i < data.length; i++){
			document.getElementsByClassName('chart_left')[i].style.width = negative_width + "%";
			document.getElementsByClassName('chart_right')[i].style.width = positive_width + "%";
			let negative = (Math.abs(data[i][2] / data[0][2] * 100)).toFixed(2);
			let positive = (Math.abs(data[i][3] / data[0][3] * 100)).toFixed(2);
			document.getElementsByClassName('negative')[i].style.width = negative + "%";
			document.getElementsByClassName('positive')[i].style.width = positive + "%";
		}
	}
			
	drawChart(data);
}
