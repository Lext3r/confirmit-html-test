function getValuesByKeys(data, num, keys){
	values = [];
	for(var i = 0; i < keys.length; i++){
		values.push(data[num][keys[i]]);
	}
	return values;
}

function getValuesByKey(data, key, num){
	if (num === undefined) 
		num = data.length;
	var values = [];
	for(var i = 0; i < num; i++){
		if(data[i][key] != undefined)
			values.push(data[i][key]);
	}
	return values;
}

function sortByKey(data, key) {
	if (typeof(data[0][key]) === 'number'){
		return data.sort(function(a, b) {
    		if(a[key] != undefined && b[key] != undefined)
    			return b[key] - a[key];
    	});
	}
	else{
		return data.sort(function(a, b) {
    		if(a[key] != undefined && b[key] != undefined)
    			return a[key].localeCompare(b[key]);
    	});
	}
}