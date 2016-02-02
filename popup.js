
function click(e) {
	var element = e.target;
	var spamScript ;
	if (element.id == 'create_filter_by_email') {
		spamScript = 'startWithEmail()';
	} else if (element.id == 'create_filter_by_domain') {
		spamScript = 'startWithDomain()';
	}
	chrome.tabs.executeScript(null,
      	{code:spamScript});
	window.close();
}

document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('div');
  for (var i = 0; i < divs.length; i++) {
  	console.info("add div " + divs[i]);
    divs[i].addEventListener('click', click);
  }
});
