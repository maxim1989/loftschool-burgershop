$(document).ready(function(){
	var items = $(".slide-5-menu__link");

	items.on('click', function(event) {
		event.preventDefault();
		var $this = $(this),
			activeItem = $('.slide-5-menu__link_active'),
			thsActive = $this.hasClass('slide-5-menu__link_active');
		if (thsActive) {
			$this.removeClass('slide-5-menu__link_active');
			$this.next().removeClass('adjust-width_active');
		} else {
			if (activeItem.length) {
				activeItem.removeClass('slide-5-menu__link_active');
				activeItem.next().removeClass('adjust-width_active');
			}
			$this.addClass('slide-5-menu__link_active');
			$this.next().addClass('adjust-width_active');

		}
	});
})