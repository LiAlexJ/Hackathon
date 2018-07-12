function cartOnClick(){
  location.href = "summary.html";
}

$(function() {
	var companyTicker = "Maya";
	var info = companyInfo[companyTicker];
	if(info) {
		console.log(info);
		$("#companyName").append(info["name"]);
	for (var key in info) {
		if (info.hasOwnProperty(key)) {
			$("#companyAbout").append(key + ": " + info[key] + " ");
		 }
	}
	}
	

});
document.getElementById("right-brand").style.cursor = "pointer";
