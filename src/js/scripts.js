$(document).ready(function(){
	$('.js-menu-opener').on('click', function(e){
		e.preventDefault();
		var menuOpener = $(this);
		if(menuOpener.hasClass('opened')) {
			menuOpener.removeClass('opened').parent().next().css({
				"display": "none"
			})
		} else {
			menuOpener.addClass('opened').parent().next().css({
				"display": "flex"
			})
		}
	})
})