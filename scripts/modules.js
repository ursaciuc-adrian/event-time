var modules = document.getElementsByClassName("module");

Array.prototype.forEach.call(modules, function (module) {
	httpGetAsync(module.dataset.module, module, addModuleToPage);
});

function addModuleToPage(module, content) {
	module.innerHTML = content;
}

function httpGetAsync(url, module, callback) {
	var xmlHttp = new XMLHttpRequest();

	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			callback(module, xmlHttp.responseText);
		}
	}

	xmlHttp.open("GET", url, true);
	xmlHttp.send(null);
}

window.onscroll = function() {changeToSolid()};

function changeToSolid() {
	if (document.body.scrollTop > 700 || document.documentElement.scrollTop > 700) {
	document.getElementById("nav-scroll").className = "navbar-scrolled";
  } else {
	document.getElementById("nav-scroll").className = "navbar";
  }
}

function showNav() {
	document.getElementsByClassName("sidenav")[0].style.left='0px';
}

function handleMousePos(event) {
	var mouseClickWidth = event.clientX;
	if(mouseClickWidth>=270){
				document.getElementsByClassName("sidenav")[0].style.left='-270px'
				
	}
}

document.addEventListener("click", handleMousePos);