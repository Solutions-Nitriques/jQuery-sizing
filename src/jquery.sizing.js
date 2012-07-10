/*
 *  Sizing v2.0 - jQuery plugin
 *
 *  Copyright (c) 2012 Deux Huit Huit (http://www.deuxhuithuit.com/)
 *  Copyright (c) 2011 Solutions Nitriques (http://www.nitriques.com/open-source/)
 *  Licensed under the MIT (https://raw.github.com/Solutions-Nitriques/jQuery-sizing/blob/master/LICENSE.txt)
 */

(function ($, undefined) {
	
	"use strict";
	
	var
	
	// safe division - declared here to help compilers :)
	sdiv = function (n, d) {
		if (!n || !d) {
			return 0;
		}
		return n/d;
	},
	
	
	/* SIZING ****************************************************************/
	
	// Resize content modes
	// @See: http://developer.apple.com/library/ios/#documentation/uikit/reference/UIView_Class/UIView/UIView.html#//apple_ref/occ/cl/UIView
	
	// fit the required height and resize the width preserving the aspect ratio
	// stops at max values
	fitHeight = function (width, height, mw, mh) {
		
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
			if (height > mh) {
				height = mh;
			}
		}
		
		if (!ratio) {
			h = height;
			w = width;
			//console.warn('sizing: no ratio found');
		} else {
			// try to make it fit with the width
			w = width;
			h = w * sdiv(1, ratio);
			
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
	
	_innerFit = function (options) {
		var o = $.extend({},  {
				width: null,
				height: null,
				reference: null,
				ratio: null,
				maxHeight: null,
				maxWidth: null
			}, options),
			h = o.height,
			w = o.width;
		
		if (o.maxHeight != null || o.maxWidth != null) { // use null here as null == undefined
			if (w > o.maxWidth) {
				// use max values
				w = o.maxWidth;
			}
			if (h > o.maxHeight) {
				h = o.maxHeight;
			}
		}
		
		if (!o.ratio) {
			//console.warn('sizing: no ratio found');
		} else {
			
			// try to make it fit with the width
			
			h = w * sdiv(1, o.ratio);
			
			// if the height is too big
			if (h > o.height) {
				h = o.height;
				w = o.ratio * h;
				//console.info('sizing: height');
			} else {
				//console.info('sizing: width');
			}
		}
		return {
			width: w,
			height: h
		};
	},
	
	innerFit = function (options) {
		var o = $.extend({},  {
				width: null,
				height: null,
				reference: null,
				ratio: null,
				maxHeight: null,
				maxWidth: null
			}, options);
		
		if(!!o.reference) {
			o.width = $(o.reference).width();
			o.height = $(o.reference).height();
		}
		
		var size = _innerFit(o);
		
		$(this).width(size.width).height(size.height);
	},
	
	
	/* POSITIONING ***********************************************************/
	
	/** 
	 * Centers the image based on the params instead of resizing the image, 
	 * the image is moved in order to stay centered
	 */
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
	
	/**
	 * This method should be moved elsewhere.
	 * It's not sizing, it's positioning
	 *
	 * This method permits to move some element according to
	 * a specific number of pixel even if the current CSS
	 * uses other units (i.e. 100% - 50px)
	 */
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
			
			var // get the original position, calculated based on css
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
	},
	
	
	
	/* SIZE MANAGEMENT *******************************************************/
	
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
	
	/**
	 * 
	 */
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
	
	
	/* UTILITIES *************************************************************/
	
	/**
	 * Utility method to facilitate working with
	 * jQuery objects.
	 */
	each = function (callback, args) {
		var t = $(this);
			
		if (t && t.length >= 0 && $.isFunction(callback)) {
			t.each(function() {
				callback.apply(this, args);
			});
		}
		
		return t;
	};
	
	
	
	/* ACTUAL PLUGINS ********************************************************/
	
	$.fn.extend({
		// resize algorithm
		fitHeight:				function () { return each.call(this, fitHeight, arguments); },
		fitWidthOnly:			function () { return each.call(this, fitWidthOnly, arguments); },
		fit:					function () { return each.call(this, fit, arguments); },
		innerFit:				function () { return each.call(this, innerFit, arguments); },
		
		// cloning, saving, getting sizes
		cloneSize:				function () { return each.call(this, fitHeight, arguments); },
		saveOriginalSize:		function () { return each.call(this, saveOriginalSize, arguments); },
		getOriginalSize:		getOriginalSize, // no each for a getter
		
		// Should be moved ?? - positioning...
		offsetPosition:			function () { return each.call(this, offsetPosition, arguments); },
		centerCropFit:			function () { return each.call(this, centerCropFit, arguments); }
	});
	
	$.extend({
		// safe divide function
		sdiv: sdiv,
		innerFit: _innerFit
	});
	
})(jQuery);