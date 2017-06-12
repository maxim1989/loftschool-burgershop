$(document).ready(function(){
	var step = 100, duration = 1500,
		slides = $(".slide"),
		asideLinks = $(".total-nav__link"),
		wrapper = document.querySelector(".wrapper"),
		arrowDown = $(".scroll-down"),
		navLinks = $(".navigation__link"),
		orderBurger = $(".burger__make-order"),
		flag = true,
		hashValues = {slide0: 0, slide1: 1, slide2: 2, slide3: 3, slide4: 4, slide5: 5, slide6: 6, slide7: 7},
		changeCss = function(activeSlide, newActive, activeSlideIndex, newIdx){
			var accordeonVert = $(".person__name"),
				accordeonHor = $(".slide-5-menu__link"),
				asideLinkActive = $(".total-nav__link_opened"),
				topPosition = newIdx * step;
			activeSlide.removeClass('slide_active');
			newActive.addClass('slide_active');
			slides.css({
				transform: 'translate(0, ' + (topPosition === 0 ? topPosition : '-' + topPosition+'%') + ')'
			});
			
			setTimeout(function(){
 				flag = true;
				asideLinkActive.removeClass('total-nav__link_opened');
				asideLinks.eq(newIdx).addClass('total-nav__link_opened');
 			}, duration);

			accordeonVert.removeClass('person__name_collapse');
			accordeonVert.find(".triangel").removeClass('triangel_collapse');
			accordeonVert.next().slideUp();
			accordeonHor.removeClass('slide-5-menu__link_active');
			accordeonHor.next().removeClass('adjust-width_active');
			window.location.hash = '#slide' + newIdx;
		},
        hashChange = function(e){
			var hash = window.location.hash,
				slideIndex = hashValues[hash.slice(1)],
				activeSlide = $(".slide_active"),
                activeSlideIndex = slides.index(activeSlide),
                newActive = slides.eq(slideIndex);
			if (slideIndex >= 0) {
				changeCss(activeSlide, newActive, activeSlideIndex, slideIndex);
			}
		},
		wheelProcess = function(e){
			if (flag && e.target.className != 'slide-5-menu__content' && e.target.className != "slide-6-people__descr") {
				flag = false;
				var deltaY = e.deltaY,
					activeSlide = $(".slide_active"),
					activeSlideIndex = slides.index(activeSlide);
				if (deltaY > 0 && activeSlideIndex < slides.length - 1) {
					var newIdx = activeSlideIndex + 1;
					changeCss(activeSlide, activeSlide.next(), activeSlideIndex, newIdx);
				} else if (deltaY < 0 && activeSlideIndex > 0) {
					var newIdx = activeSlideIndex - 1;
					changeCss(activeSlide, activeSlide.prev(), activeSlideIndex, newIdx);
				} else {
					flag = true;
				}
			}
		};

	if (window.location.hash) {
		hashChange();
	}
	window.addEventListener("hashchange", hashChange);
	wrapper.addEventListener("wheel", wheelProcess);
	asideLinks.on('click', function(event) {
		event.preventDefault();
		var $this = $(this);
		if (!$this.hasClass('total-nav__link_opened') && flag) {
			flag = false;
			var activeSlide = $(".slide_active"),
				activeSlideIndex = slides.index(activeSlide),
				newActiveIdx = asideLinks.index($this),
				newActive = slides.eq(newActiveIdx);
			changeCss(activeSlide, newActive, activeSlideIndex, newActiveIdx);
		}
	});
	arrowDown.on('click', function(event) {
		event.preventDefault();
		if (flag){
			flag = false;
			var activeSlide = $(".slide_active"),
				activeSlideIndex = slides.index(activeSlide),
				newActive = activeSlide.next(),
				newActiveIdx = slides.index(newActive);
			changeCss(activeSlide, newActive, activeSlideIndex, newActiveIdx);
		}
	});
	navLinks.on('click', function(event) {
		event.preventDefault();
		var item = event.target.classList.item(1),
		    itemIdx = item.split('__link_')[1],
		    activeSlide = $(".slide_active"),
			activeSlideIndex = slides.index(activeSlide),
			newActive = slides.eq(itemIdx);
    	changeCss(activeSlide, newActive, activeSlideIndex, itemIdx);
	});
	orderBurger.on('click', function(event) {
		event.preventDefault();
		var itemIdx = 6,
		    activeSlide = $(".slide_active"),
			activeSlideIndex = slides.index(activeSlide),
			newActive = slides.eq(itemIdx);
		changeCss(activeSlide, newActive, activeSlideIndex, itemIdx);
	});
})