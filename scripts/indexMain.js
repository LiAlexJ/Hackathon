if($(window).height() > 700) {
  $("html").css('zoom','150%');
}

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

	$('.btn-popular-tags').click(function() {
		var buttonText = $(this).text();
		var barText = $('#searchBar').val();
		if (!barText.toLowerCase().includes(buttonText.toLowerCase())) {
			var concatText = barText.split(',').concat([buttonText]).filter(x => x).join(',   ');
			$('#searchBar').val(concatText);
			$('#searchBar').focus();
		}
	});
});

function check() {
}
