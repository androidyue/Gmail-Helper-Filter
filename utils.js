var sForceUseEmail;
var sForceUseDomain;


String.prototype.contains = function(it) { 
   return this.indexOf(it) != -1; 
};


function replaceAll(d,c,a){
	var b=new RegExp(c,"g");return d.replace(b,a)
}

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

function logMessage(message) {
	console.info(message);
}

function isDataSourceEmpty(dataSource) {
	var isEmpty = true;
    if (dataSource) {
        isEmpty = (0 == Object.keys(dataSource).length);
    }
    return isEmpty;
}

function getDomain(email) {
	var domain = undefined;
	if (email.contains('@')) {
		domain = email.substr(email.indexOf('@') + 1);
	}
	return domain;
}


function showFilterPopupWindow() {
	var element = findSearchOptionButton();
	if (element) {
		element.click();
	}
}

function findSearchOptionButton() {
	var element;
	element = document.getElementsByClassName("aoq")[0];
	return element;
}


function fillupFilter(filter) {
	var emailElement = document.getElementsByClassName("aQa")[0];
	if (emailElement) {
		emailElement.value = filter;
	} else {
		console.info("fillupEmail failed");
	}
}

function createFilter() {
	var elem = document.getElementsByClassName("acM")[0];
	elem.click();
}

function extractEmail(rawEmail) {
	var email;
	email = replaceAll(rawEmail, "<", "");
	email = replaceAll(email, ">", "");
	if (email.match("^via")) {
		email = email.replace("via", "");
	}
	return email;
}

function findElementByClassName(element, className) {
	if (element == undefined) {
		var elements = document.getElementsByClassName(className);
		logMessage("get elements by className " + className)
		if (elements && !isDataSourceEmpty(elements)) {
			logMessage("use element className=" + className);
			if (elements[0].innerText.match("@")) {
				element = elements[0];
			}
		}
	}
	return element;
}

function findEmailText() {
	var emailTextView = undefined;
	emailTextView = findElementByClassName(emailTextView, "gD");	
	emailTextView = findElementByClassName(emailTextView, 'go');
	return emailTextView.innerText;
}


function getFilterCondition(email) {
	var condition;	
	var domain = getDomain(email);
	if (sForceUseEmail) {
		condition = email;
	} else if (sForceUseDomain) {
		condition = "@" + domain;
	} 
	console.info("extractFilterCondition condition=" + condition);
	return condition;
}


function getFiter() {
	var rawEmail = findEmailText();
	var email = extractEmail(rawEmail);
	return getFilterCondition(email);
}


function start() {
	var filter = getFiter();
	if (filter) {
		showFilterPopupWindow();
		setTimeout(function(){
			fillupFilter(filter);
			createFilter();		
		}, 2000);
	}
}
function startAuto() {
	sForceUseDomain = false;
	sForceUseEmail = false;
	start();
}


function startWithDomain() {
	sForceUseDomain = true;
	sForceUseEmail = false;
	start();
}

function startWithEmail() {
	sForceUseEmail = true;
	sForceUseDomain = false;
	start();
}



