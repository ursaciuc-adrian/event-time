window.onscroll = function() {changeToSolid()};

function changeToSolid() {
	if (document.body.scrollTop > 700 || document.documentElement.scrollTop > 700) {
	document.getElementById("nav-scroll").className = "navbar-scrolled";
  } else {
	document.getElementById("nav-scroll").className = "navbar";
  }
}