jQuery(document).ready(function() {
	var arrowRight = $('.slide-3__arrow-right'),
		arrowLeft = $('.slide-3__arrow-left'),
		step = 940,
		run = true,
		delay = 1000,
		nextExist = function(page, activePage, allPages, expression){
			page.addClass('page_active');
        	activePage.removeClass('page_active');
	        allPages.animate({
	        	right: expression
	        }, delay,
	        function(){
	        	run = true;
	        });
		},
		nextNotExist = function(page, activePage, allPages, expression) {
			page.addClass('page_active');
        	activePage.removeClass('page_active');
	        allPages.animate({
	        	right: expression
	        }, delay,
	        function(){
	        	run = true;
	        });
		};

	arrowRight.on('click', function(event) {
		event.preventDefault();
		var $this = $(this),
	        container = $this.closest('.container').find('.container-slide-3'),
	        activePage = container.find('.page_active'),
	        allPages = container.find('.page'),
	        nextPage = activePage.next(),
	        currentRight = parseInt(activePage.css("right"));
		if (!run) return
		run = false;
		if (nextPage.length) {
	        nextExist(nextPage, activePage, allPages, currentRight + step + 'px');
        } else {
	        nextNotExist(allPages.first(), activePage, allPages, '0');
        }
	});

	arrowLeft.on('click', function(event) {
		event.preventDefault();
		var $this = $(this),
	        container = $this.closest('.container').find('.container-slide-3'),
	        activePage = container.find('.page_active'),
	        allPages = container.find('.page'),
	        prevPage = activePage.prev(),
	        currentRight = parseInt(activePage.css("right"));
		if (!run) return
		run = false;
		if (prevPage.length) {
	        nextExist(prevPage, activePage, allPages, currentRight - step + 'px');
        } else {
	        nextNotExist(allPages.last(), activePage, allPages, allPages.last().index() * step);
        }
	});
});