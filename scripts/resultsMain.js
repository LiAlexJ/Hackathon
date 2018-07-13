function hide(idname) {
    var x = document.getElementById(idname);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

	$(document).ready(function() {
	});

$(function() {
	var query = window.location.search.replace(/^\?/, "");
	query = query.replace("tag=", "");
	query = query.replace(/\+/g, " ");
	var parsed = query.split("%2C   ");
	var tagsList = "";
	var tagsSet = new Set();
	var companiesSet = new Set();

	var dataSet = [[]];
	for(var i = 0; i < parsed.length; i++) {
		//parsed[i] is the name of the tag, i.e "Women CEOs";
		if(parsed[i]) {
			if(!tagsSet.has(parsed[i])) {
			tagsSet.add(parsed[i]);
			tagsList += parsed[i] + ", ";
			//Add tag box to selectedTags div
			// $("#selectedTags").append('<button type="button" class="btn btn-outline-primary">' + parsed[i] + ' </button>');
			//companies is the array of companies, i.e. ["Apple", "Amazon"];
			var companies = tags[parsed[i]];
				if(tags[parsed[i]]) {
					for(var a = 0; a < companies.length; a++) {
						//companies[a] is the ticker of the companies, i.e. "APPL";
						if(!companiesSet.has(companies[a])) {
							companiesSet.add(companies[a]);
							//Add company results to results div
							if(companyInfo[companies[a]]) {
								var info = companyInfo[companies[a]];
								var row = [];
								row.push([]);
								row.push(companies[a]);
								for (var attr in info) {
								    if (info.hasOwnProperty(attr)) {
										row.push(info[attr]);
								    }
								}
								dataSet.push(row);
							}
						}

					}
				}
			}
		}
	}
	dataSet.shift();

	$('#tableResults').DataTable( {
		data: dataSet,
		columns: [	
			{
				orderable: false,
				className: 'select-checkbox',
				targets: 0
			},
			{ title: "Ticker", "targets":1},
			{ title:"Name", "targets": 2},
			{ title:"Market Cap", "targets": 3},
			{ title: "Share Price", "targets": 4},
			{ title: "P/E Ratio", "targets": 5},
			{ title: "Dividends", "targets": 6},
			{ title:"Sector", "targets": 7},
			{ title:"Tags", "targets": 8},
			
		],
		dom: 'Bfrtip',
		buttons: [
			{
				extend: 'selected',
				text: 'Reset'
			},
			{
				extend: 'selected',
				text: 'Submit',
				action: function( e, dt, node, config) {
					var rows = dt.rows( { selected: true } ).data();

					var arrayLength = rows.length;
					var ret = [];
					for(var i = 0; i < arrayLength; i++){
						ret.push(rows[i][1]);
					}
					window.location.href = 'summary.html' + '?companies=' + ret.toString();
				}
			}
		],

		"columnDefs":[
			{
				"render":function (data, type, row){
					var link = "detail.html?stock=" + row[1];
					console.log(link);
					return '<a href=' + link + '>' + row[1] + '</a>';
				},
				"targets":1
			},
			{"visible":false, "targets":[3]}

		],
		select:{
			style: 'multi',
			selector: 'td:first-child'
		},
		order: [[1, 'asc' ]]
	});



	tagsList = tagsList.slice(0, -2);
	//Add searched tags to searchBar div
	$("#searchBar").val(tagsList);




});
