/*
* 	Sizing v1.0 - jQuery plugin
*
*	Copyright (c) 2011 Solutions Nitriques (http://www.nitriques.com/open-source/)
*	Licensed under the MIT (https://raw.github.com/Solutions-Nitriques/jQuery-sizing/master/LICENSE.txt)
*/


(function ($, undefined) {
	
	// fit the required height and resize the width preserving the aspect ratio
	// stops at max values
    function fitHeight(width, height, mw, mh) {

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
    };

    // fit the required width and resize the height preserving aspect ratio
    // stops at max values
    function fitWidthOnly(width, height, mw, mh) {

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
    };
    
    // fit the target to maximize space used (no blanks)
    // while preserving aspect ratio
    function fit(width, height, ratio, mw, mh) {

        // compute w relative to h
        var h = 0,
        	w = 0;

        if (mw != undefined || mh != undefined) {
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
    };
    
    function cloneSize(options) {
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
    };

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
    };


    // comupute the free space between the parent and the img
    // targets are set to "fill" this free space
    function computePadding(targetw, targeth, parent, img) {
        var p = $(parent), i = $(img),
    		iw = i.width(), ih = i.height(),
    		pw = p.width(), ph = p.height(),
    		tw = $(targetw), th = $(targeth),
    		w = pw - iw,
    		h = ph - ih;

        tw.css({ top: 0, left: iw, width: w, height: ph });
        th.css({ top: ih, left: 0, width: pw, height: h });
    };*/
    
    function centerCropFit(width, height, options) {
    	var t = $(this),
    		o = $.extend({
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
    	
    	t.css(o.left, left).css(o.top, top);
    };
    
    
    function each(callback, args) {
    	var t = $(this);
    		
    	if (t && t.length >= 0 && $.isFunction(callback)) {
    		t.each(function() {
    			callback.apply(this, args);
    		});
    	}
    };
	
	// ACTUAL PLUGIN
	$.fn.extend({
		centerCropFit: function () { each.call(this, centerCropFit, arguments); } ,
		cloneSize: cloneSize,
		fitHeight: fitHeight,
		fitWidthOnly: fitWidthOnly,
		fit: fit
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