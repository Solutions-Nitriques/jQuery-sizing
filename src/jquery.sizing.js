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
	
	WIDTH = 'width',
	HEIGHT = 'height',
	WIDTH_CAP = 'Width',
	HEIGHT_CAP = 'Height',
	ORIGINAL_SIZE = 'original-size',
	
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
	 * Simple numeric comparison.
	 * Returns 0 if params are equal (==), 1 if a > b, -1 otherwise
	 * 
	 * @param a
	 * @param b
	 * @return int
	 */
	cmp = function (a, b) {
		if (a == b) {
			return 0;
		}
		return a > b ? 1 : -1;
	},
	
	/**
	 * Factory method to create a size object
	 * {
	 *  width:  number,
	 *  height: number,
	 *  ratio:  number
	 * }
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
	 * Get/Set the size of a jQuery object
	 * @return Object/jQuery
	 */
	size = function (s) {
		var t = $(this);
		if (!s) {
			return newSize(t.width(), t.height());
		}
		return t.width(s.width).height(s.height);
	},
	
	
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
		var size = null;
		
		if (!!options && options.reference) {
			// clone the reference
			size = newSize($(options.reference).width(), $(options.reference).height());
		
		} else if (!!options && (!!options.width || !!options.height)) {
			// use fallback values
			size = newSize(options.width, options.height);
			
		} else {
			// use window as reference
			size = newSize(win.width(), win.height());
		}
		
		return size;
	},
	
	/**
	 * Actual jQuery plugin.
	 * Makes the target the same size as the reference
	 * 
	 * @return jQuery
	 */
	scaleToFill = function (options) {
		var size = _cloneSize(options);
		return $(this).size(size);
	},
	
	
	
	/**
	 * Method that tries to abstract the property names from the logic.
	 * We are dealing with 2 possibles orders (w,h) or (h,w) but since it's
	 * always the same process, this method makes testing a lot more easier and
	 * more extendable.
	 * 
	 * @param firstPropertyName
	 * @param secondPropertyName
	 * @param firstPropertyValue - the target value
	 * @param secondPropertyValue - the target value
	 * @param ratio - the aspect ratio to preserve
	 * @param comparisonResult - the wanted comparison result ( lessthan:-1, greaterthen:1)
	 */
	_processAspectProperty = function (fProp, sProp, fValue, sValue, ratio, compare) {
		var ret = {},
			r = (fProp === WIDTH) ? sdiv(1, ratio) : ratio,
			fVal = fValue,
			sVal = fValue * r;
		
		if (cmp(sVal, sValue) === compare) {
			fVal = sValue * sdiv(1, r); // inverted
			sVal = sValue;
		}
		
		ret[fProp] = fVal;
		ret[sProp] = sVal;
		
		return ret;
	},
	
	/**
	 * Fit the required height and resize the width preserving the aspect ratio.
	 * Compare param defines cropping
	 * 
	 * @param options
	 * @param ratio
	 * @param comparisonResult - 1 | -1
	 */
	_scaleAspect = function (options, ratio, compare) {
		// assure options
		options = $.extend({
						width: null,
						height: null,
						reference: null,
						maxHeight: null,
						maxWidth: null,
						minWidth: null,
						minHeight: null,
						preferWidth: true
					}, options);
		var 
		// get prop order
		firstProp = !!options.preferWidth ? WIDTH : HEIGHT,
		secondProp = !options.preferWidth ? WIDTH : HEIGHT,
		firstPropCap = !!options.preferWidth ? WIDTH_CAP : HEIGHT_CAP,
		secondPropCap = !options.preferWidth ? WIDTH_CAP : HEIGHT_CAP,
					
		// get our reference size
		size = _cloneSize(options);
		
		// find how to fit it
		size = _processAspectProperty(firstProp, 
									  secondProp,
									  size[firstProp],
									  size[secondProp],
									  ratio,
									  compare);
		
		// Check to see if it meets max criteria
		if ((!!options.maxWidth && size.width > options.maxWidth) || 
			(options.maxHeight && size.height > options.maxHeight)) {
			// Redo layout with max values
			size = _processAspectProperty(firstProp, 
										  secondProp,
										  options['max' + firstPropCap],
										  options['max' + secondPropCap],
										  ratio,
										  compare);
		}
		
		// Check to see if it meets min criteria
		if ((!!options.minWidth && size.width < options.minWidth) || 
			(!!options.minHeight && size.height < options.minHeight)) {
			// Redo layout with max values
			size = _processAspectProperty(firstProp, 
										  secondProp,
										  options['min' + firstPropCap],
										  options['min' + secondPropCap],
										  ratio,
										  compare);
		}
		
		return size;
	},
	
	/**
	 * Fit the required height and resize the width preserving the aspect ratio.
	 * Assure that all of the target will be inside limits (no cropping)
	 * 
	 * @param options
	 * @param ratio
	 */
	_aspectFit = function (options, ratio) {
		return _scaleAspect(options, ratio, 1);
	},
	
	/**
	 * Fit the required height and resize the width preserving the aspect ratio .
	 * Assure that all of the target will fill the limit (cropping may occur)
	 * 
	 * @param options
	 * @param ratio
	 */
	_aspectFill = function (options, ratio) {
		return _scaleAspect(options, ratio, -1);
	},
	
	/**
	 * Check if there is a position object/value
	 * in the options object. If there is such value,
	 * the autoPosition plugin is call on the target parameter
	 * 
	 * @param t - target jQuery Object
	 * @param options
	 */
	_assurePosition = function (t, options) {
		if (!!options.position) {
			if (!$.isPlainObject(options.position)) {
				options.position = {
					position: options.position
				};
			}
			t.autoPosition(options.position);
		}
	},
	
	/**
	 * Actual Scale Aspect Fit jQuery plugin.
	 * Cropping will never occur, blank spot may appear.
	 * 
	 * @param options
	 * @return jQuery
	 */
	scaleAspectFit = function (options) {
		var t = $(this),
			size = t.originalSize();
		
		// Resize according to aspect
		t.size(_aspectFit(options, size.ratio));
		
		// Check to see if it needs positioning
		_assurePosition(t, options);
		
		return t;
	},
	
	/**
	 * Actual Scale Aspect Fill jQuery plugin.
	 * Cropping will occur, blank spot will not appear.
	 * 
	 * @param options
	 * @return jQuery
	 */
	scaleAspectFill = function (options) {
		var t = $(this),
			size = t.originalSize();
		
		// Resize according to aspect
		t.size(_aspectFill(options, size.ratio));
		
		// Check to see if it needs positioning
		_assurePosition(t, options);
		
		return t;
	},
	
	
	/* POSITIONING ***********************************************************/
	
	/** 
	 * Centers the image based on the parameter instead of resizing the image, 
	 * the image is moved in order to stay centered
	 * 
	 * @param options
	 * @param wrapperSize - size of the wrapper
	 * @param targetSize - size of the positioned element
	 * @return Object
	 */
	_autoPosition = function (options, wrapSize, targetSize) {
		var pos = {},
			o = $.extend(o, {
				position: 'center',
				allowNegative: true,
				left:'margin-left',
				top:'margin-top'
			}, options),
			// diffs
			dw = wrapSize.width  - targetSize.width,
			dh = wrapSize.height - targetSize.height,
			// start centered
			left = $.sdiv(dw, 2),
			top =  $.sdiv(dh, 2);
		
		// fix top
		if (!!~o.position.indexOf('top')) {
			top = 0;
		} else if (!!~o.position.indexOf('bottom')) {
			top = dh;
		}
		
		// fix left
		if (!!~o.position.indexOf('left')) {
			left = 0;
		} else if (!!~o.position.indexOf('right')) {
			left = dw;
		}
		
		// fix negative values
		if (!o.allowNegative) {
			left = left < 0 ? 0 : left;
			top = top < 0 ? 0 : top;
		}
		
		// set left value
		if (!!o.left) {
			pos[o.left] = left;
		}
		// set top value
		if (!!o.top) {
			pos[o.top] = top;
		}
		
		return pos;
	},
	
	/**
	 * Actual jQuery plugin.
	 * @param options
	 * @return jQuery
	 */
	autoPosition = function (options) {
		var t = $(this),
			s = t.size(),
			ws = _cloneSize(options),
			css = _autoPosition(options, ws, s);
		
		return t.css(css);
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
		var t = $(this).eq(0),
			o = t.size();
		
		t.data(ORIGINAL_SIZE, o);
		
		return !!returnValue ? o : t;
	},
	
	/**
	 * Get the current original size
	 * @return Object
	 */
	originalSize = function () {
		var t = $(this).eq(0),
			size = t.data(ORIGINAL_SIZE);
		if (!size) {
			size = saveOriginalSize.call(t, true);
		}
		return size;
	},
	
	
	/**
	 * Delete the current value of the original size
	 * @return jQuery
	 */
	clearOriginalSize = function () {
		$(this).data(ORIGINAL_SIZE, null);
		return this;
	},
	
	
	/* UTILITIES *************************************************************/
	
	/**
	 * Utility method to facilitate working with jQuery objects
	 * in all plugins
	 * 
	 * @param callback
	 * @param arguments
	 * @return jQuery
	 */
	each = function (callback, args) {
		var t = $(this);
			
		if (!!t && !!t.length && $.isFunction(callback)) {
			t.each(function eachCallback () {
				callback.apply(this, args);
			});
		}
		
		return t;
	};
	
	
	
	/* ACTUAL PLUGINS ********************************************************/
	
	$.fn.extend({
		// Resizing/Scaling algorithm
		scaleToFill:			function () { return each.call(this, scaleToFill, arguments); },
		scaleAspectFit:			function () { return each.call(this, scaleAspectFit, arguments); },
		scaleAspectFill:		function () { return each.call(this, scaleAspectFill, arguments); },
		size:					size,
		
		// setting / getting original sizes
		saveOriginalSize:		function (o) { if (o === true) {return saveOriginalSize.call(this, true);} return each.call(this, saveOriginalSize, arguments); },
		clearOriginalSize:		function () { return each.call(this, clearOriginalSize, arguments); },
		originalSize:			originalSize, // no each for a getter, we want the value !!!
		
		// Positioning
		autoPosition:			function () { return each.call(this, autoPosition, arguments); },
		offsetPosition:			function () { return each.call(this, offsetPosition, arguments); }
	});
	
	$.extend({
		// safe divide function
		sdiv: sdiv,
		
		// create fast size object
		size: newSize,
		
		// Utils: just the Maths!
		sizing: {
			cloneSize: _cloneSize,
			scaleAspect: _scaleAspect,
			aspectFit: _aspectFit,
			aspectFill: _aspectFill
		},
		positioning: {
			autoPosition: _autoPosition
		}
	});
	
})(jQuery);