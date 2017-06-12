$(document).ready(function() {
	var people = $(".person__name");	    

    people.on('click', function(event) {
    	event.preventDefault();
    	var $this = $(this),
    		person = $(".person__name.person__name_collapse");
    	if ($this.hasClass("person__name_collapse")) {
			$this.removeClass('person__name_collapse');
			$this.next().slideUp('slow', function() {
				$this.find(".triangel").removeClass('triangel_collapse');
			});
    	} else {
    		person.removeClass('person__name_collapse');
			person.next().slideUp('slow', function() {
				person.find(".triangel").removeClass('triangel_collapse');
			});
			$this.addClass('person__name_collapse');
    		$this.next().slideDown('slow', function() {
				$this.find(".triangel").addClass('triangel_collapse');
			});
    	}
    });
});