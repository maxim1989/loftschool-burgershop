$(document).ready(function(){
	var btns = $(".slide-6-people__btn"),
		bg = $(".modal-bg"),
		modalSl5 = $(".modal-person"),
		closeSl5 = $(".modal-person__right"),
		orderBtn = $('.slide-7__make-order'),
		modalSl7 = $('.modal-order'),
        closeSl7 = $(".model-order__close"),
		changeDisplay = function(disp, modal) {
			bg.css({
				display: disp
			});
			modal.css({
				display: disp
			});
		};

	btns.on('click', function(event) {
		event.preventDefault();
		changeDisplay('block', modalSl5);
	});

	bg.on('click', function(event) {
		event.preventDefault();
		changeDisplay('none', modalSl5);
	});

	closeSl5.on('click', function(event) {
		event.preventDefault();
		changeDisplay('none', modalSl5);
	});

    closeSl7.on('click', function(event) {
        event.preventDefault();
        changeDisplay('none', modalSl7);
    });

    orderBtn.on('click', function(e) {
    	e.preventDefault();
    	var name = $('input[name=username]').val(),
    		phone = $('input[name=userphone]').val();
		$.ajax({
			url: "php/order.php",
			method: 'POST',
			data: {
				name: name,
                phone: phone
			},
			dataType: 'json',
			success: function(data, textStatus, jqXHR) {
			    console.log(data);
                if (data.Success) {
                    changeDisplay('block', modalSl7);
                    $('form[name=slide-7-form-make-order]')[0].reset();
				} else {
                    if (!data.name && !data.phone) {
                        alert("Введите имя и номер телефона");
                    } else if (data.name && !data.phone) {
                        alert("Введите номер телефона");
                    }
                    if (!data.name && data.phone) {
                        alert("Введите имя");
                    }
				}
			},
			error: function(jqXHR, textStatus, errorThrown){
				alert("ERROR");
			}
		})
    })
});