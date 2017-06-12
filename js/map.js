ymaps.ready(init);
var myMap;

function init(){     
    myMap = new ymaps.Map("map", {
        center: [55.75960502, 37.62675950],
        zoom: 16,
        controls: []
    });
    myMap.behaviors.disable(['scrollZoom', 'rightMouseButtonMagnifier']);
    myMap.events.add('dblclick', function (e) {
        e.preventDefault();
    });

    myPlacemark1 = new ymaps.Placemark([55.75996497, 37.62432405], { 
            hintContent: 'Бургеры', 
            balloonContent: 'Ресторан №1'
        },{
        	iconLayout: 'default#image',
        	iconImageHref: './img/icons/map-marker.svg',
        	iconImageSize: [46, 57],
        	iconImageOffset: [0, -55]
        });
    myPlacemark2 = new ymaps.Placemark([55.75853725, 37.62136289], { 
            hintContent: 'Бургеры', 
            balloonContent: 'Ресторан №2'
        },{
            iconLayout: 'default#image',
        	iconImageHref: './img/icons/map-marker.svg',
        	iconImageSize: [46, 57]
        });
    myPlacemark3 = new ymaps.Placemark([55.75885184, 37.62962410], { 
            hintContent: 'Бургеры', 
            balloonContent: 'Ресторан №3'
        },{
            iconLayout: 'default#image',
        	iconImageHref: './img/icons/map-marker.svg',
        	iconImageSize: [46, 57]
        });

    myMap.geoObjects.add(myPlacemark1);
    myMap.geoObjects.add(myPlacemark2);
    myMap.geoObjects.add(myPlacemark3);
}