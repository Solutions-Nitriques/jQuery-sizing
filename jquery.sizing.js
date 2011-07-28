/*
* 	Sizing v1.0 - jQuery plugin
*
*	Copyright (c) 2011 Solutions Nitriques (http://www.nitriques.com/open-source/)
*	Licensed under the MIT (LICENSE.txt)
*/


(function ($, undefined) {
	
	// fit the required height and resize the width preserving the aspect ratio
    function fitHeight(selector, width, height, mw, mh) {

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
        $(selector).width(w).height(h);
    };

    // fit the required width and resize preserving aspect ratio
    // stops at max values
    function fitWidthOnly(selector, width, height, mw, mh) {

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
        $(selector).width(w).height(h);
    };

    // Safe resize + move for links
    // Move and resize a target according to the resize of the reference
    function safeResizeFromTarget(target, to_w, to_h, to_top, to_left, reference, ro_w, ro_h) {
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
    };


	
	// ACTUAL PLUGIN
	$.extend({
		
	});
	
})(jQuery);