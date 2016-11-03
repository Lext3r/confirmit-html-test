window.onload = function(){	
	var getData = function(){
		var data = [];
		var rows = document.getElementsByTagName('tr');
		for (var i = 1; i < rows.length ; i++){
			var values = [];
			for(var j = 1; j < 4; j++){
				values.push(rows[i].cells[j].innerHTML);
			}
			data.push(values);
		}
		return data;
	}
	
	var data = getData();

	drawChart = function(data){
		var negative_width = (Math.abs(data[0][1] / data[0][2] * 100)).toFixed(2);
		var positive_width = 90 - negative_width;
		for(var i = 0; i < data.length; i++){
			document.getElementsByClassName('chart_left')[i].style.width = negative_width + "%";
			document.getElementsByClassName('chart_right')[i].style.width = positive_width + "%";
			var negative = (Math.abs(data[i][1] / data[0][1] * 100)).toFixed(2);
			var positive = (Math.abs(data[i][2] / data[0][2] * 100)).toFixed(2);
			document.getElementsByClassName('negative')[i].style.width = negative + "%";
			document.getElementsByClassName('positive')[i].style.width = positive + "%";
		}
	}	
	drawChart(data);
}