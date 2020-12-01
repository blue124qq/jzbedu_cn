/*
 * Carousel with variable width items. Relies on caller providing the correct CSS.
 * 
 */

(function(){

	var root = this,
		previous = root.VariableWidthCarousel;

	// Create the VariableWidthCarousel Object
	var VariableWidthCarousel = function(){

		this.numberOfSlides = 0;
		this.nextSlide = 1;
		this.maxSlides = 0;

		this.carouselContainer = null;
		this.backSelector = null;
		this.nextSelector = null;
		this.itemWidth = 0;

		this.initVariableWidthCarousel = function(numberOfSlides, carouselContainer, backSelector, nextSelector, itemWidth) {
			this.numberOfSlides = numberOfSlides;
			this.carouselContainer = carouselContainer;
			this.backSelector = backSelector;
			this.nextSelector = nextSelector;
			this.itemWidth = itemWidth;

	    	this.calculateMaxSlides();

	    	var that = this;
			$(window).resize(function(){
				that.calculateMaxSlides();
			});

			$(this.backSelector).on("click", function() {
				that.slideRight();
			});

			$(this.nextSelector).on("click", function() {
				that.slideLeft();
			});

			$(this.backSelector).attr("disabled", true);
	    }

		this.calculateMaxSlides = function() {
			if ($(window).width() > 1006) {
				this.maxSlides = this.numberOfSlides - 4;
			} else if ($(window).width() > 767) {
				this.maxSlides = this.numberOfSlides - 2;
			} else {
				this.maxSlides = this.numberOfSlides - 1;
			}

			if (this.maxSlides > 0 && this.nextSlide <= this.maxSlides) {
				$(this.nextSelector).attr("disabled", false);
			}  else {
				$(this.nextSelector).attr("disabled", true);
			}
		}

		this.slideLeft = function() {
			var slideAmount = (this.nextSlide * -this.itemWidth);
			this.slide(slideAmount);
			this.nextSlide += 1;
			$(this.backSelector).attr("disabled", false);
			if (this.nextSlide > this.maxSlides) {
				$(this.nextSelector).attr("disabled", true);
			}
		}
	    
		this.slideRight = function() {
			this.nextSlide -= 1;
			var slideAmount = ((this.nextSlide - 1) * -this.itemWidth);
			this.slide(slideAmount);
			$(this.nextSelector).attr("disabled", false);
			if (slideAmount == 0) {
				$(this.backSelector).attr("disabled", true);
			}
		}

		this.slide = function(amount) {
			$(this.carouselContainer).animate({left: amount+"px"}, 1000);
		}

		return this;
	}

	// Define as amd module if we are using amd
	var helpers = VariableWidthCarousel.helpers = {};
	var amd = helpers.amd = (typeof define == 'function' && define.amd)

	if (amd) {
		define(function(){
			return VariableWidthCarousel;
		});
	} else if (typeof module === 'object' && module.exports) {
		module.exports = VariableWidthCarousel;
	}

	// Create the root object for dealing with variable width carousels
	root.VariableWidthCarousel = VariableWidthCarousel;

	VariableWidthCarousel.noConflict = function(){
		root.VariableWidthCarousel = previous;
		return VariableWidthCarousel;
	};

}).call(this);