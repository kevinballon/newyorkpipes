var hover = false;
var aboutbox = false;

var caption = 
[
"Sometimes they feel shame", 
"A relative of cobras?", 
"A sign of respect", 
"Colour co-ordination",
"Peering around the corner",
"Royalty",
"",
"Dinosaur spikes",
"A frightened child",
"Taking shelter in SoHo",
"An expression of surprise",
"The tyrant",
"The king and the queen",
"Imprisoned",
"After a rough night",
"Family",
"In disguise",
"The gang",
"Taking the dog for a walk",
"Port and starboard",
"The garden snake",
"A cyclops",
"Talking behind his back",
"A tiny garden dweller",
"The messiah?",
"Service workers",
"",
"Surviving the elements",
"",
"",
];

var imageCount = caption.length;
var is_mobile = false;
var counter = Math.floor(Math.random() * imageCount);;

$( document ).ready(function() {    
	$('.loading').fadeOut(1000)
	if ( $('.introduction').css('display')=='none') {
		is_mobile = true;
	}
    // Preload images
    for (i = 1; i <= imageCount; i++) {
    	preloadImg('assets/images/pipe-' + i + '.jpg')
    	console.log('preloaded pipe ' + i)
    }

    if (is_mobile == true) {
    	$('.introduction').hide();
    	updateImage();
	    $('.next').html('&rarr;');
	    $('.previous').html('&larr;');
	    hover = true;

	    $('.index').hide();
	    $('.body').css('height', '110%');
	    $('.navigation').hide();
	    $('.viewer-next').hide();
	    $('.viewer-previous').hide();
	    $('.caption').css({"text-align":"center","float":"none","display":"block"});

		$(".viewer").on("swipeleft",function(){
		  counter--;
		  updateImage();
		});

		$(".viewer").on("swiperight",function(){
		  counter++;
		  updateImage();
		});

		$(".viewer").click(function(){
		  counter++;
		  updateImage();
		});


    }

});


$('.introduction-close').click(function() {
	$('.introduction').hide();
    updateImage();
    $('.next').html('&rarr;');
    $('.previous').html('&larr;');
    hover = true;
});

$('.about').click(function() {
	
	if (aboutbox == false && hover == true) {
		$('.aboutbox').animate({ right: 0}, 200)
		aboutbox = true;
		$('.about').text('close');
		// $('.about').css('color', 'red');
	} else	if (aboutbox == true) {
		$('.aboutbox').animate({ right: -475}, 200)
		aboutbox = false;
		$('.about').text('about');
		// $('.about').css('color', '#888');
	}
});

$('.next, .previous').hover( function() {
		if (hover == true) {
			$(this).addClass('hover');
		}	
	}, function() {
		$(this).removeClass('hover');
	}
);

$('.index').hover( function() {

	if (hover == true) {
			$(this).addClass('hoverindex');
		}
	}, function() {
		$(this).removeClass('hoverindex');
	}
);

$('.next, .viewer-next').click(function() {
	counter++
	updateImage();
});

$('.previous, .viewer-previous').click(function() {	
	counter--;
	updateImage();
});

$('.index').change(function() {
	input = $(this).val();
	if (input < caption.length) {
		counter = input;
	} else if (input > caption.length-1) {
		counter = caption.length;
	}
	updateImage();
});

function updateImage() {
	// CHECK COUNTER
	if (counter < 1) {
		counter = imageCount;
	} else 
	if (counter > imageCount) {
		counter = 1;
	}

	// SHOW IMAGE WITH FADE
	$('.viewer').fadeOut(300);
	$('.caption').fadeOut(300);
	function update(){
		$('.viewer').css("background-image", "url(assets/images/pipe-" + counter + ".jpg)");  
	 	$('.viewer').fadeIn(300);
 		currentCaption = caption[counter-1];
 		
 		if (currentCaption == "") {
 			currentCaption = "Pipe " + counter;
 			$('.caption').addClass('nocaption');
 		} else { $('.caption').removeClass('nocaption');
 		}
		$('.caption').html(currentCaption);
	 	$('.caption').fadeIn(300);
	 	$('.index').val(counter);
	}
	setTimeout(update, 300);	
}

function preloadImg(src) {
    $('<img/>')[0].src = src;
}

function randomCounter() {
	// Needs a way to prevent duplicates
	r = Math.floor(Math.random() * imageCount);
	counter = r;
	console.log(r);
}