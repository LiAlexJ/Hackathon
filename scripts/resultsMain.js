function hide(idname) {
    var x = document.getElementById(idname);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

$(function() {
	//alert(window.location.search);
	var query = window.location.search.replace(/^\?/, "");
	query = query.replace("tag=", "");
	query = query.replace(/\+/g, " ");
	var parsed = query.split("%2C   ");
	for(var i=0; i < parsed.length; i++) {
		console.log(parsed[i]);
	}

});

document.getElementById("right-brand").style.cursor = "pointer";
