jQuery sizing [![Build Status](https://secure.travis-ci.org/Solutions-Nitriques/jQuery-sizing.png?branch=dev2.0)](http://travis-ci.org/Solutions-Nitriques/jQuery-sizing)

Version: 2.0.0 

#### Collection of function that performs specific sizing such as making the same size or resizing according to a certain ratio

The vocabulary used in this project is the same as defined by Apple by its 
[UIViewContentMode](http://developer.apple.com/library/ios/#documentation/uikit/reference/UIView_Class/UIView/UIView.html) enumeration.
Following the same principle, this bundle offers methods such as `scaleToFill`, `scaleAspectFit` and `scaleAspectFill`.
Those methods accepts a position parameter for offer the position abilities of the UIViewContentMode but this can be
done via it's own implementation directly, *i.e.* with the `autoPosition` method.

A good documentation is nice, but hard to maintain. Having the documentation in the code is a way
of forcing programmers to maintain it while working on it. 
So, Reading the code *should* be easy as there are a lot of comments in it.

Finally, since version 2 is a complete rewrite of version 1, it is **not** backwards compatible.

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

You can use all of those methods as jQuery plugins or directly for getting the results.
See a list of all methods below. Ex.:

	$('#selector').method({...}) // modifies the targeted node and returns the jQuery object.

or

	$.namespace.method({...}) // Does not change anything in the DOM and return a size object.

### Size Object

Along this file, the term size object is used. The size object is a plain javascript object
that contains three properties: width, height, ratio.
	
### jQuery Plugins
	
- scaleToFill
- scaleAspectFit
- scaleAspectFill
- 

- size

- saveOriginalSize
- clearOriginalSize
- originalSize

- autoPosition(): 
- offsetPosition	
	
### API

- $.sdiv(num,den): Safe division. Always return 0 instead of NaN.
- $.size(): Create an null size object.


- $.sizing.cloneSize()
- $.sizing.scaleAspect()
- $.sizing.aspectFit()
- $.sizing.aspectFit()

- $.positioning.autoPosition()

## Build your own version

This git repro contains a configuration for use with [grunt](https://github.com/cowboy/grunt)
so you can simply call `grunt` in your favorite terminal. You will need node, grunt and phantomjs 
available in your PATH in order to run the tests and build your minified version.

## Copyrights

See [LICENSE.txt](https://github.com/Solutions-Nitriques/jQuery-sizing/blob/master/LICENSE.txt)      
<http://www.deuxhuithuit.com/>

*Voila !*

### Change Log

- **2.0.0 - 2012-08-05**       
  Refactored the project to reuse the vocabulary defined by Apple    
  Extract the oneLiner method: It now in a separated project    
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
  