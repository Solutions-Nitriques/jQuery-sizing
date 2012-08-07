# jQuery sizing [![Build Status](https://secure.travis-ci.org/Solutions-Nitriques/jQuery-sizing.png?branch=dev2.0)](http://travis-ci.org/Solutions-Nitriques/jQuery-sizing)

Version: 2.0.0 

#### Collection of functions that performs specific sizing operations such as making element the same size of the reference or resizing according to a certain ratio and algorithm.

The vocabulary used in this project is the same as defined by Apple by its 
[UIViewContentMode](http://developer.apple.com/library/ios/#documentation/uikit/reference/UIView_Class/UIView/UIView.html) enumeration.
Following this principle, this bundle offers methods such as `scaleToFill`, `scaleAspectFit` and `scaleAspectFill`.
Those methods accepts a `position` option in order to offer the positioning abilities of UIViewContentMode.
This behavior can also be achieved via it's own implementation, *i.e.* with the `autoPosition` method.

A good documentation is nice, but hard to maintain. Having the documentation into the code is a way
of forcing programmers to maintain it while working on it. 
So, Reading the code *should* be easy as there are a lot of comments in it.

Finally, since version 2 of this project is a complete rewrite of version 1 so it is **not** backwards compatible.

## Table of contents

- [Requirements](#requirements)
- [Usage](#usage)
	- [Size object](#size-object)
	- [jQuery plugins](#jquery-plugins)
	- [API](#api)
- [Build your own version](#build-your-own-version)
- [Copyrights](#copyrights)
- [Change log](#change-log)

## Requirements

- jQuery 1.4+

## Usage

For production environnement, please use the [minified version](https://github.com/Solutions-Nitriques/jQuery-sizing/blob/master/dist/jquery.sizing.min.js).
The [source version](https://github.com/Solutions-Nitriques/jQuery-sizing/blob/master/src/jquery.sizing.js)
is provided for learning, testing, debugging and reviewing.

You can use all of those methods as jQuery plugins or directly for getting the results.
See a list of all methods below. Ex.:

	$('#selector').method({...}); // modifies the targeted node and returns the jQuery object.

or

	$.namespace.method({...}); // Does not change anything in the DOM and return a size object.

### Size Object

Along this file, the term "size object" is used. The size object is a plain javascript object
that contains three properties: width, height, ratio. The ratio is calculated as width divided by height.
	
### jQuery Plugins
	
- `$().scaleToFill()`: 
- `$().scaleAspectFit()`:
- `$().scaleAspectFill`:

- `$().size()`: Gets the size of the target DOM element as a size object.
- `$().size(size)`: Sets the size of the target DOM element base on the size parameter.

- `$().saveOriginalSize()`:
- `$().clearOriginalSize()`:
- `$().originalSize()`:

- `$().autoPosition()`: 
- `$().offsetPosition()`:	
	
### API

- `$.sdiv(num,den)`: Safe division, *i.e.* `num/den`. Always return 0 instead of NaN.
- `$.size()`: Create an null size object, *i.e.* `{width:0, height:0, ratio:0}`

- `$.sizing.cloneSize()`:
- `$.sizing.scaleAspect()`:
- `$.sizing.aspectFit()`:
- `$.sizing.aspectFit()`:

- `$.positioning.autoPosition()`:

## Build your own version

This git repro contains a configuration for use with [grunt](https://github.com/cowboy/grunt)
so you can simply call `grunt` in your favorite terminal. You will need `node`, `grunt` and `phantomjs` 
available in your `PATH` in order to run the tests and build your minified version.

## Copyrights

See [LICENSE.txt](https://github.com/Solutions-Nitriques/jQuery-sizing/blob/master/LICENSE.txt)      
<http://www.deuxhuithuit.com/>

*Voila !*

### Change Log

- **2.0.0 - 2012-08-06**       
  Refactored the project in order to reuse the vocabulary defined by Apple     
  Extract the oneLiner method: It now in a [separate project](https://github.com/DeuxHuitHuit/jQuery-one-liner)     
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
  