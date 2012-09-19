# jQuery sizing [![Build Status](https://secure.travis-ci.org/Solutions-Nitriques/jQuery-sizing.png?branch=dev)](http://travis-ci.org/Solutions-Nitriques/jQuery-sizing)

Version: 2.0.0 

## What is it exactly ?
This project is a collection of functions that performs specific sizing and positioning operations,
such as making element the same size of another reference, resizing according to a certain ratio and algorithms,
position an element in a container, etc.

A good documentation is nice, but hard to maintain. Having the documentation into the code is a way
of forcing programmers to maintain it while working on it. 
So, reading the code *should* be easy, as there are lot of comments in it.

Note that version 2 of this project is a complete rewrite of version 1.
It is **not** backwards compatible with version 1.

Please use [Github's issue tracker](https://github.com/Solutions-Nitriques/jQuery-sizing/issues) 
to report any anomalies or [our website's](http://www.deuxhuithuit.com/?ref=jquery-sizing-github) contact form to say hi!

## Table of contents

- [Requirements](#requirements)
- [Definitions](#definitions)
	- [Size object](#size-object)
	- [Reference options](#reference-options)
- [Usage](#usage)
	- [jQuery plugins](#jquery-plugins)
	- [API](#api)
- [Build your own version](#build-your-own-version)
- [Copyrights](#copyrights)
- [Change log](#change-log)

## Requirements

- [jQuery 1.4+](http://jquery.com/)

## Definitions

The vocabulary used in this project is the same as defined by Apple by its 
[UIViewContentMode](http://developer.apple.com/library/ios/#documentation/uikit/reference/UIView_Class/UIView/UIView.html) 
enumeration. Following this nomencalture, this bundle offers methods such as `scaleToFill`, `scaleAspectFit` 
and `scaleAspectFill`. Those methods accepts a `position` option parameter in order to achieve the positioning abilities 
of `UIViewContentMode`. This behavior can also be achieved via it's own implementation, *i.e.* with 
the `autoPosition` method.

### Size Object

Along this file, the term "size object" is used. The size object is a plain javascript object
that contains three properties: width, height, ratio. The ratio is calculated as width divided by height.

### Reference Options

Along this file, the term "reference options" is used to name the reference size, the size in which the target
will "fit". The reference options are defined by three properties that work together,
passed in the options parameter. The first property is `reference` and its value can either be a CSS selector, a 
jQuery object or DOMElement. The others propeties are `width` and `height`. Normally, those properties should
reflects the target's container, but it does not have to be.

If the `reference` property is defined, than its size is used. If `reference` is not defined, the algorithm
will revert to `width` and `height` properties. If none is defined, the size of the `window` will be used as reference.
This behavior is encapsulated into the `cloneSize` method. Beware that specifying all properties is not usefull and
the `reference` property will always override `height` and `width` properties.

## Usage

For production environment, please use the 
[minified version](https://github.com/Solutions-Nitriques/jQuery-sizing/blob/master/dist/jquery.sizing.min.js).
The [source version](https://github.com/Solutions-Nitriques/jQuery-sizing/blob/master/src/jquery.sizing.js)
is provided for learning, testing, debugging and reviewing.

You can use this bundle via [jQuery plugins](#jquery-plugins) or directly via the [API](#api), 
for usign the algorithms results.

Ex.:

```	// jQuery plugin
	// Modifies the targeted node and returns the target jQuery object.
	// N.B. options parameter is always ommitable since all 
	// plugins have default values.
	// N.B.2. When working with images, it is always better
	// to hook up the plugin in the load event of the window or
	// image objects.
	$('#selector').method({...});
```

or

```	// API
	// Does not change anything in the DOM and return a size object.
	$.namespace.method({...}, param1, param2, ...);
```

See a list of [all methods below](#jquery-plugins).
	
### jQuery Plugins
#### Scale/Resize
- `$(target).scaleToFill(options)`: Fills the reference breaking the aspect ratio. 
No blank space nor cropping will occur. Options are:
	- `reference`: CSSSelector, DOMElement, jQuery object
	- `width`: the target with. Ignored if reference is set.
	- `height`: the target height. Ignored if reference is set.
- `$(target).scaleAspectFit(options)`: Fits the reference, preserving the aspect ratio. 
Blank space may be present without cropping. Options are: 
	- `reference`: CSSSelector, DOMElement, jQuery object
	- `width`: the target with. Ignored if reference is set.
	- `height`: the target height. Ignored if reference is set.
	- `position`: the position into the reference size. Can be object or string. See the autoPosition plugin
	for all options.
	- `maxWidth`: the maximum width to scale to. May be smaller if minHeight is reached.
	- `maxHeight`: the maximum height to scale to. May be smaller if minWidth is reached.
	- `minWidth`: the minimum width to scale to. May be bigger if minHeight is reached.
	- `minHeight`: the minimum height to scale to. May be bigger if minWidth is reached.
	- `preferWidth`: starts size checks with width, then height, when true. Will check height, then width
	if set to false. Defaults to true.
- `$(target).scaleAspectFill`: Fills the reference, preserving the aspect ratio. Cropping may occur 
without blank spaces. Options are:
	- `reference`: CSSSelector, DOMElement, jQuery object
	- `width`: the target with. Ignored if reference is set.
	- `height`: the target height. Ignored if reference is set.
	- `position`: the position into the reference size. Can be object or string. See the autoPosition plugin
	for all options.
	- `maxWidth`: the maximum width to scale to. May be smaller if minHeight is reached.
	- `maxHeight`: the maximum height to scale to. May be smaller if minWidth is reached.
	- `minWidth`: the minimum width to scale to. May be bigger if minHeight is reached.
	- `minHeight`: the minimum height to scale to. May be bigger if minWidth is reached.
	
#### Size management
- `$(target).size()`: Gets the size of the target DOM element as a size object. This utility is 
used internally and is offered for your convenience. BEWARE: This deletes jQuery's size() method.
- `$(target).size(size)`: Sets the size of the target DOM element base on the size parameter 
`{width:w, height:h}`. This utility is used internally and is offered for your convenience.
BEWARE: This deletes jQuery's size() method.

- `$(target).saveOriginalSize(retValue)`: Saves the current size of the target into jQuery's data store.
	- If `retValue` is true, will return the size object. Returns jQuery object otherwise.
- `$(target).clearOriginalSize()`: Delete the current value of the originalSize.
- `$(target).originalSize()`: Gets the last saved or current size (if no saved data exists) of the target.

#### Positioning
- `$(target).autoPosition(options)`: Changes the specified properties in order to position the target 
into the reference.
	- `reference`: CSSSelector, DOMElement, jQuery object
	- `width`: the target with. Ignored if reference is set.
	- `height`: the target height. Ignored if reference is set.
	- `position`: the actual position. Values are 'top', 'right', 'bottom', 'left' and you
	can	join them in any fashion such as 'top-right' or 'bottom|left'. Seperator character is optional.
	- `left`: the left porperty to change. Should be 'left' or 'margin-left' most of the time.
	Defaults to 'margin-left'.
	- `top`: the top porperty to change. Should be 'top' or 'margin-top' most of the time.
	Defaults to 'margin-top'.
	- `allowNegative`: Prevents the positioning from getting into negative values. Defaults to true.
- `$(target).offsetPosition(options)`: Changes the sepcified properties in order to position the target 
aside the reference, via a configurable offset.
	- **This method as not yet been fully testing and is provided for testing only.** Please read the 
code to understand.
	
### API

#### General
- `$.sdiv(num,den)`: Safe division, *i.e.* `num/den`. Always return 0 instead of NaN.
- `$.size()`: Create a null size object, *i.e.* `{width:0, height:0, ratio:0}`

#### $.sizing
- `$.sizing.cloneSize(options)`: The method implements the logic behind the reference options. Returns size object.
- `$.sizing.scaleAspect(options, ratio, compare)`: This method implements the scaling logic. Returns size object.
	- `options`: jQuery plugin options
	- `ratio`: The aspect ratio to preserve
	- `compare`: The comparison value. If this value is 1, scaling with fit into the reference. 
If this value is 1, filling will occur.
- `$.sizing.aspectFit(options, ratio)`: Really just a wrapper around `scaleAspect` with compare = 1. 
	Returns size object.
- `$.sizing.aspectFill(options, ratio)`: Really just a wrapper around `scaleAspect` with compare = -1. 
	Returns size object.

#### $.positioning
- `$.positioning.autoPosition(options, wrapSize, targetSize)`: This method will return the 
position coordinate need for the wanted positioning options.
	- `options`: jQuery plugin options
	- `wrapSize`: the reference size
	- `targetSize`: the target (positioned) size

## Build and test your own version

This git repro contains configuration files for use with [grunt](https://github.com/cowboy/grunt)
so you can simply call `grunt` in the project folder of your favorite terminal.
You will need `node`, `grunt` and `phantomjs` available in your `PATH` in order to run the 
tests and build your minified/uglyfied version. If you already have node you can install the
dependancies via `npm install`.

## Copyrights

See [LICENSE.txt](https://github.com/Solutions-Nitriques/jQuery-sizing/blob/master/LICENSE.txt)      
[Deux Huit Huit](http://www.deuxhuithuit.com/)

*Voila !*

### Change Log

- **2.0.0 - 2012-08-09**       
  Refactored the project in order to reuse the vocabulary defined by Apple     
  Extract the oneLiner method: It's now in a [separate project](https://github.com/DeuxHuitHuit/jQuery-one-liner)     
  More code reuse      
  More testability     
  More maintainability

- **1.3 - 2012-06-08**       
  Added grunt and travis build files      
  \* TODO: Add unit testing

- **1.2 - 2011-11-08**    
  Updated the oneLiner method in order to make it work with letter-spacing and font sizes

- **1.1 - 2011-09-27**    
  Added the oneLiner method

- **1.0 - 2011-07-27**    
  First release
  