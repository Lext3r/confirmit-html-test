window.onload = function(){
	sortByKey(data,'positive');
	var rowNum = 11;
	keys = ['category', 'total', 'negative','positive'];
	headers = ["Categories", "Total", "Negative", "Positive", "Charts"];
	createTable('table', rowNum, keys.length + 1);
	fillTable('table', keys, headers, rowNum);

	document.querySelector("#row_num select").addEventListener("change", function(){
		table.parentElement.removeChild(table);
		rowNum = parseInt(this.value) + 1;
		createTable('table', rowNum, keys.length + 1);
		fillTable('table', keys, headers, rowNum);
	});

	document.querySelector("#chart_type select").addEventListener("change", function(){
		table.parentElement.removeChild(table);
		sortByKey(data, this.value);
		createTable('table', parseInt(rowNum), keys.length + 1);
		fillTable('table', keys, headers, rowNum);
	});

}
