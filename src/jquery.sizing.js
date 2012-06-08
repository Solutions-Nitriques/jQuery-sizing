/*
 *  Sizing v1.3 - jQuery plugin
 *
 *  Copyright (c) 2012 Deux Huit Huit (http://www.deuxhuithuit.com/)
 *  Copyright (c) 2011 Solutions Nitriques (http://www.nitriques.com/open-source/)
 *  Licensed under the MIT (https://raw.github.com/Solutions-Nitriques/jQuery-sizing/blob/master/LICENSE.txt)
 */

(function ($, undefined) {

	"use strict";

	// fit the required height and resize the width preserving the aspect ratio
	// stops at max values
	var fitHeight = function (width, height, mw, mh) {

		// compute w relative to h
		var ratio = mw / mh,
			h = height,
			// compute w according to h
			w = h * ratio;

		// if the new width is too small, resize usign w
		if (w < width) {
			w = width;
			h = w * (1 / ratio);
		}

		// actual resize
		$(this).width(w).height(h);
	},

	// fit the required width and resize the height preserving aspect ratio
	// stops at max values
	fitWidthOnly = function (width, height, mw, mh) {

		// compute w relative to h
		var ratio = mw / mh,
		h = 0,
		w = 0;

		if (width > mw) {
			// use max values
			width = mw;
		}

		w = width;
		h = w * (1 / ratio);

		// actual resize
		$(this).width(w).height(h);
	},

	// fit the target to maximize space used (no blanks)
	// while preserving aspect ratio
	fit = function (width, height, ratio, mw, mh) {

		// compute w relative to h
		var h = 0,
			w = 0;

		if (mw != null || mh != null) { // use null here as null == undefined
			if (width > mw) {
				// use max values
				width = mw;
			}
		}
		
		if (!ratio) {
			h = height;
			w = width;
			//console.warn('sizing: no ratio found');
		} else {
			// try to make it fit with the width
			w = width;
			h = w * (1 / ratio);
			
			// if the height is too small
			if (h < height) {
				h = height;
				w = ratio * h;
				//console.info('sizing: height');
			} else {
				//console.info('sizing: width');
			}
		}

		// actual resize
		$(this).width(w).height(h);
	},
	
	cloneSize = function (options) {
		if (options && options.reference) {

			options.width = $(options.reference).width();
			options.height = $(options.reference).height();

		} else {
			options = {
				width: $(window).width(),
				height: $(window).height(),
				reference: window
			};
		}

		$(this).width(options.width).height(options.height);
	},

	// Safe resize + move for links
	// Move and resize a target according to the resize of the reference
	/*function relativeRepositionement(target, to_w, to_h, to_top, to_left, reference, ro_w, ro_h) {
		var r = $(reference),
			rw = r.width(), rh = r.height(), rtop = r.offset().top,
			t = $(target),
			ratio_w = rw / ro_w,
			ratio_h = rh / ro_h,
			w = ratio_w * to_w,
			h = ratio_h * to_h,
			top = ratio_h * to_top,  // use height ratio for top
			left = ratio_w * to_left;

		// actual resize
		t.width(w).height(h);
		// actual move
		t.css({ top: top, left: left });
	};*/


	
	// centers the image based on the params
	// instead of resizing the image, the image 
	// is moved in order to stay centered
	centerCropFit = function (width, height, options) {
		var t = $(this),
			o = $.extend(o, {
				allowNegative: true,
				left:'margin-left',
				top:'margin-top'
			}, options),
			w = t.width(),
			h = t.height(),
			left = $.sdiv(width - w, 2),
			top = $.sdiv(height - h, 2);
		
		if (!o.allowNegative) {
			left = left < 0 ? 0 : left;
			top = top < 0 ? 0 : top;
		}
		
		if (o.left) {
			t.css(o.left, left);
		}
		
		if (o.top) {
			t.css(o.top, top);
		}
	},
	
	saveOriginalSize = function () {
		var t = $(this),
			o = {
				width: t.width(),
				height: t.height(),
				ratio:  $.sdiv(t.width(),t.height())
			};
		
		t.data('original-size', o);
		
		return t;
	},
	
	getOriginalSize = function () {
		return $(this).eq(0).data('original-size');
	},
	
	
	each = function (callback, args) {
		var t = $(this);
			
		if (t && t.length >= 0 && $.isFunction(callback)) {
			t.each(function() {
				callback.apply(this, args);
			});
		}
		
		return t;
	},
	
	oneLiner = function (options) {
		var t = $(this),
			children = t.children(),
			fx = $.noop,
			opts = {
				factor: 0.98,
				wrapper: 'span',
				wrapperClass : 'one-liner',
				fx: 'font-size', // can be either be `font-size` or `letter-spacing` 
				childSelector: null
			},
		
			fontSize = function (c) {
				// get ratio for this child
				var ratio = $.sdiv(t.width(), c.find(opts.wrapper+'.'+opts.wrapperClass).outerWidth(true));
				
				if (ratio != 0) {
					var currentSize = c.css('font-size'),
						currentSizeFloat = parseFloat(currentSize, 10),
						currentSizeUnit = currentSize.replace(/[0-9]+/, '');
					
					// change the font-size according to the ratio
					c.css('font-size', ((currentSizeFloat * ratio) * opts.factor) + currentSizeUnit);
				}
			},
		
			letterSpacing = function (c) {
				// get the diff between the target and the child
				var diff = t.width() - c.find(opts.wrapper+'.'+opts.wrapperClass).outerWidth(true),
				// get the count of chars in the children
					length = t.text().length;
					
				if (diff != 0) {
					var dir = diff > 0 ? '+' : '-';
					
					// distribute the free space across all letters
					c.css('letter-spacing', dir + $.sdiv(diff * opts.factor, length) + 'px');
				}
			};
		
		if (!!options) {
			opts = $.extend(opts, options);
		}
		
		// capture the children, if we need to
		if (!!opts.childSelector) {
			children = t.find(opts.childSelector);
		}
		
		// check for the fx param
		switch (opts.fx) {
			case 'font-size':
				fx = fontSize;
				break;
			
			case 'letter-spacing':
				fx = letterSpacing;
				break;
				
			default:
				console.log('[oneLiner] the `fx` parameter is not valid!');
				return this;
		}
		
		// set overflow to hidden on container
		t.css('overflow','hidden');
		
		// pass through each children
		children.each(function forEachChildren () {
			var c = $(this);
			
			// make it large enough
			c.width(100000000);
			
			// reset font-size and letter spacing
			c.css('font-size','');
			c.css('letter-spacing','');
			
			if (!c.find('.one-liner').length) {			
				// wrap inner content
				c.html('<'+opts.wrapper+' class="'+opts.wrapperClass+'">' + c.html() + '</'+opts.wrapper+'>');
			}
			
			// call the actual function
			fx.call(t, c);
			
			// reset width
			c.css('width', '');
		}); // end each
		
		// reset container overflow
		t.css('overflow','');
	},
	
	offsetPosition = function (options) {
		var t = $(this),
			opts = $.extend({
				prop: null, // top | left
				offset: null // numeric, can be negative
			}, options);
		
		// get options from html5 data-attr
		if (!opts.prop) {
			opts.prop = t.attr('data-prop');
		}
		if (!opts.offset) {
			opts.offset = parseFloat(t.attr('data-offset'));
		}
		
		if (opts.prop && opts.offset) {
			// reset css
			t.css(opts.prop, '');
			
			var // get the original position, cultulated based on css
				original = t.position()[opts.prop],
				// original position in float format
				originalFloat = parseFloat(original, 10);
			
			// save the current position, calculated from css
			t.data('sizing-cur-offpos', original);
			
			// set the new value
			t.css(opts.prop, originalFloat + opts.offset + 'px');
			
			//console.log('[sizing] offsetPosition: ' + original + ':' + opts.offset);
			
		} else {
			//console.log('[sizing] offsetPosition skipped');
		}
	};
	
	// ACTUAL PLUGIN
	$.fn.extend({
		centerCropFit: function () { return each.call(this, centerCropFit, arguments); },
		cloneSize: cloneSize,
		fitHeight: fitHeight,
		fitWidthOnly: fitWidthOnly,
		fit: fit,
		oneLiner: function () { return each.call(this, oneLiner, arguments); },
		saveOriginalSize: function () { return each.call(this, saveOriginalSize, arguments); },
		getOriginalSize: function () { return each.call(this, getOriginalSize, arguments); },
		offsetPosition: function () { return each.call(this, offsetPosition, arguments); }
	});
	
	$.extend({
		// safe divide function
		sdiv: function (n, d) {
			if (!n || !d) {
				return 0;
			}
			return n/d;
		}
	});
	
})(jQuery);