function hide(idname) {
    var x = document.getElementById(idname);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

$(function() {
	var query = window.location.search.replace(/^\?/, "");
	query = query.replace("tag=", "");
	query = query.replace(/\+/g, " ");
	var parsed = query.split("%2C   ");
	var tagsList = "";

	for(var i = 0; i < parsed.length; i++) {
		if(parsed[i]) {
			tagsList += parsed[i] + ", ";
			console.log("parsed[i] = " + parsed[i]);
			$("#selectedTags").append('<button type="button" class="btn btn-outline-primary">' + parsed[i] + ' </button>');
			var companies = tags[parsed[i]];
			if(tags[parsed[i]]) {
				for(var a = 0; a < companies.length; a++) {
					console.log("tag = " + parsed[i] + ", company = " + companies[a]);
					$("#results").append("tag = " + parsed[i] + ", company = " + companies[a] + "<br>");
				}
			}
		}
	}

	tagsList = tagsList.slice(0, -2);
	console.log(tagsList);
	$("#searchBar").val(tagsList);




});



document.getElementById("right-brand").style.cursor = "pointer";
