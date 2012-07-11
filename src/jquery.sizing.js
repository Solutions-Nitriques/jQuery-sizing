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
	
	win = $(window),
	
	m = Math,
	
	/**
	 * Safe Division that returns 0 as safe value.
	 * This unifies the ECMA spec with a safe result for sizing
	 * Declared here to help compilers :)
	 * 
	 * @param @optional numerator
	 * @param @optional denominator
	 * @return int
	 */
	sdiv = function (n, d) {
		return (!n || !d) ? 0 : n/d;
	},
	
	/**
	 * Factory method to create a size object
	 * 
	 * @param @optional width
	 * @param @optional height
	 * @param @optional ratio
	 * @return Object
	 */
	newSize = function (w, h, r) {
		return {width:w||0,height:h||0,ratio:r||sdiv(w,h)};
	},
	
	/**
	 * Get the size of a jQuery object
	 * @return Object
	 */
	size = function () {
		var t = $(this);
		return newSize(t.width(), t.height());
	};
	
	
	/* SIZING ****************************************************************/
	
	// Resize content modes
	// @See: http://developer.apple.com/library/ios/#documentation/uikit/reference/UIView_Class/UIView/UIView.html#//apple_ref/occ/cl/UIView
	
	/**
	 * Copies an object size.
	 * This method is a multi-use shortcut.
	 * 
	 * @param @optional options.reference
	 * @param @optional options.width
	 * @param @optional options.height
	 * @return Object
	 */
	_cloneSize = function (options) {
		var size = newSize();

		if (!!options && options.reference) {
			// clone the reference
			size.width = $(options.reference).width();
			size.height = $(options.reference).height();
		
		} else if (!!options.width || !!options.height) {
			// use fallback values
			size.width = options.width;
			size.height = options.height;
			
		} else {
			// use window as reference
			size.width = win.width();
			size.height = win.height();
		}
		
		return size;
	},
	
	/**
	 * Actual jQuery plugin.
	 * @return jQuery
	 */
	scaleToFit = function (options) {
		var size = _cloneSize(options);
		return $(this).width(size.width).height(size.height);
	},
	
	/**
	 * 
	 */
	_processAspectPropVal = function (options, prop, op, value) {
		var opFx = m[op] || m.max;
			
		
	},
	
	/**
	 * Utility method that return a size object.
	 * It first tries to 
	 */
	_scaleAspect = function (options) {
		// process firstpass with prefered option
		
		// if is does not fit
	},
	
	/**
	 * Fit the required height and resize the width preserving the aspect ratio .
	 * Assure that all of the target will be inside limits (no cropping)
	 * 
	 * 
	 */
	_aspectFit = function () {
		
	},
	
	/**
	 * Fit the required height and resize the width preserving the aspect ratio .
	 * Assure that all of the target will fill the limit (cropping may occur)
	 * 
	 * 
	 */
	_aspectFill = function () {
		
	},
	
	/**
	 * Actual jQuery plugin.
	 * @return jQuery
	 */
	scaleAspectFit = function (options) {
		// process firstpass with prefered option
		
		// if is does not fit with the first pass
		// use secondProp
		
		// Check to see if it meets max criteria
		
		// Check to see if it meets min criteria
	},
	
	//
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
		return newSize(w,h);
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
	
	/*
	 * Should those method should be moved elsewhere???
	 * It's not sizing, it's positioning (?!?!)
	 * But we could couple those two to create something great...
	 */
	
	/** 
	 * Centers the image based on the params instead of resizing the image, 
	 * the image is moved in order to stay centered
	 * 
	 * 
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
		return t;
	},
	
	/**
	 * 
	 *
	 * This method permits to move some element according to
	 * a specific number of pixel even if the current CSS
	 * uses other units (i.e. 100% - 50px)
	 * 
	 * @param @optional options.prop string
	 * @param @optional options.offset int
	 * @return jQuery
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
		return t;
	},
	
	
	
	/* SIZE MANAGEMENT *******************************************************/
	
	/**
	 * Save the current object size for use later on...
	 * @param @optional returnValue boolean
	 * @return jQuery | Object
	 */
	saveOriginalSize = function (returnValue) {
		var t = $(this),
			o = t.size();
		
		t.data('original-size', o);
		
		return returnValue ? o : t;
	},
	
	/**
	 * Get the current original size
	 * @return Object
	 */
	getOriginalSize = function () {
		var t = $(this).eq(0),
			size = t.data('original-size');
		if (!size) {
			size = t.saveOriginalSize(true);
		}
		return size;
	},
	
	/**
	 * Delete the current value of the original size
	 * @return jQuery
	 */
	clearOriginalSize = function () {
		$(this).data('original-size', null);
		return this;
	},
	
	
	/* UTILITIES *************************************************************/
	
	/**
	 * Utility method to facilitate working with jQuery objects.
	 * @param callback
	 * @param arguments
	 * @return jQuery
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
		// Resizing/Scaling algorithm
		scaleToFill:			function () { return each.call(this, scaleToFill, arguments); },
		scaleToAspectFit:		function () { return each.call(this, fitHeight, arguments); },
		scaleToAspectFill:		function () { return each.call(this, fitWidthOnly, arguments); },
		size:					size,
		
		// setting / getting original sizes
		saveOriginalSize:		function () { return each.call(this, saveOriginalSize, arguments); },
		clearOriginalSize:		function () { return each.call(this, clearOriginalSize, arguments); },
		getOriginalSize:		getOriginalSize, // no each for a getter, we want the value !!!
		
		// Positioning
		offsetPosition:			function () { return each.call(this, offsetPosition, arguments); },
		centerCropFit:			function () { return each.call(this, centerCropFit, arguments); }
	});
	
	$.extend({
		// safe divide function
		sdiv: sdiv,
		
		// create fast size object
		size: newSize,
		
		// Utils: just the Maths!
		sizing: {
			cloneSize: _cloneSize,
			aspectFit: _aspectFit,
			aspectFill: _aspectFill 
		},
		positioning: {
			center: null,
			top: null,
			right: null,
			bottom: null,
			left: null,
			topleft: null,
			topright: null,
			bottomright: null,
			bottomleft: null
		}
	});
	
})(jQuery);