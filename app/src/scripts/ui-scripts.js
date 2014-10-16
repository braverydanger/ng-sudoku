document.onkeydown = function(event){
    var scope = angular.element(document.documentElement).scope()
	switch (event.which) {
	case 83 :
			event.shiftKey && event.ctrlKey && console.log(scope)
		break;
	case 67 :
			event.shiftKey && event.ctrlKey && console.clear()
		break;
	}
}
