function searchOnClick(){
  location.href = "results.html";
}

$(function() {
	console.log($("#tickerToggle").is(':checked'));

	$('#searchForm').submit(function(){
		if($("#tickerToggle").is(':checked')) {
			console.log("here");
			console.log($("#searchBar").val());
			$("#searchBar").attr("name","companies");
			$("#searchForm").attr("action", "summary.html?companies=" + $("#searchBar").val());
		}  else {
			$("#searchForm").attr("action", "results.html?tag=" + $("#searchBar").val());
		}
	});

	$('.btn-outline-primary').click(function() {
		var text = $(this).text();
		$('#searchBar').val(text);
	});
});

function check() {
}