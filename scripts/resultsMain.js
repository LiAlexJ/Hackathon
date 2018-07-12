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
	for(var i = 0; i < parsed.length; i++) {
		if(parsed[i]) {
			console.log("parsed[i] = " + parsed[i]);
			var companies = tags[parsed[i]];
			if(tags[parsed[i]]) {
				for(var a = 0; a < companies.length; a++) {
					console.log("tag = " + parsed[i] + ", company = " + companies[a]);
					$("#results").append("tag = " + parsed[i] + ", company = " + companies[a] + "<br>");
				}
			}
		}
	}




});



document.getElementById("right-brand").style.cursor = "pointer";
