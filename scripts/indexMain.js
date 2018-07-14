function searchOnClick(){
  location.href = "results.html";
}

$(function() {
	$('#searchForm').submit(function(){
		if($("#tickerToggle").is(':checked')) {
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