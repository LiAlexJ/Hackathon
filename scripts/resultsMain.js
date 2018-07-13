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
			{ title:"Name"},
			{ title:"Market Cap"},
			{ title: "Share Price"},
			{ title: "P/E Ratio"},
			{ title: "Dividents"},
			{ title:"Sector"},
			{ title:"Tags"}
		]
	});


	tagsList = tagsList.slice(0, -2);
	//Add searched tags to searchBar div
	$("#searchBar").val(tagsList);




});
