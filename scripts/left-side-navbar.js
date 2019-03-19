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