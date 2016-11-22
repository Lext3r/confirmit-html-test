"use strict";
window.onload = function(){

	(function(){
		var headers = ["Categories", "Total", "Negative", "Positive", "Charts"];
		var keys = ['total', 'negative','positive'];
		createTable('table', headers, keys, data);
		document.querySelector("#chart_type select").addEventListener("change", function(){
			while(table.rows.length > 0) {
				table.deleteRow(0);
			}
			sortByKey(data, this.value);
			createTable('table', headers, keys, data);
		});

		document.querySelector("#row_num select").addEventListener("change", function(){
			showNRows(this.value);
		});

		document.querySelector("#distrib select").addEventListener("change", function(){
			if (this.value === 'counts'){
				while(table.rows.length > 0) {
					table.deleteRow(0);
				}
				createTable('table', headers, keys, data);
			}
			if (this.value === 'percent'){
				fillPercentageTable('table');
			}
		});


	})();
}