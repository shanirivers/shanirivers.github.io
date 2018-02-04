---
layout: post
title: "Converting HTML Hex Color to UIColor"
author: "Shani"
categories: journal
tags: [how-to,video,notes,UIColor,hexadecimal,HTML,UI,design,color]
image: colorcrayons.jpg
---

While working on my app and creating a lot of the UI via code, I wanted a way to keep track of the colors that I was using as my design is in Sketch and I find it easier to just copy/paste the color hex directly from it. I coded a lot of the UI elements (custom cells and some views) programmatically, so changing the color is not as easy as updating it in main.Storyboard. The best way for me to manage color changes or UI additions while still being able to just use "Find" for searching the color hex code so that I could change a color easily if needed. 

I could have used Color Literal, but then I wouldn't be able to use Ctrl+F if I wanted to search for a color hex code quickly. 
```swift
let colorLiteral = Color Literal
```

In order to convert hexadecimal color code to UIColor, I had to do a bit of string magic and a bit of math. 

Here's the code ahead of the explanation, you can pop this into a standalone helper class, add it to your AppDelegate file or have it be an extension to whatever class you want to tack it on to:
```swift
func hexStringToUIColor (hex: String) -> UIColor
{
// 1.
    var cString: String = hex.trimmingCharacters(in: .whitespaces).uppercased()
    
    
    if cString.hasPrefix("#")
    {
        cString.remove(at: cString.startIndex)
    }
    
// 2.
    if cString.count != 6
    {
        return UIColor.gray
    }
    
// 3.
    var rgbValue: UInt32 = 0
    Scanner(string: cString).scanHexInt32(&rgbValue)
    
// 4.
    return UIColor (
        red: CGFloat((rgbValue & 0xFF0000) >> 16) / 255.00,
        green: CGFloat((rgbValue & 0x00FF00) >> 8) / 255.0,
        blue: CGFloat(rgbValue & 0x0000FF) / 255.0,
        alpha: CGFloat(1.0)
    )  
}

```
### 1. String clean-up.

Remove all whitespaces and make sure if there are letters that they are all uppercase, also need to remove the hash, if it exists.

### 2. Check string length. 

If the string isn't 6 characters long, it's going to be gray by default and won't finish going through the rest of the method's code. 

### 3. Convert the hexadecimal to RGB.

UIColor represents colors as percentages, so it needs to be converted from an HTML-style hexadecimal (base 16) to RGB color decimals (base 10) and then divided by 255 to change it into a percentage. 

#### How to get from Hexadecimal color to RGB (because I get 🤓  over math) 

Hexadecimal colors are made up of 3 hex values of red, green and blue concatenated together: RRGGBB, where rr, gg and bb represent the red, green and blue values in hexadecimal. The max value of any of these colors is 255 in base 10. 

So in order to convert the hexadecimal from something like #3381AB to RGB we have to do the math:


$$
R = 33_{16} = (3 x 16^1) + (3 x 16^0) = 51_{10}
$$
$$
G = 81_{16} = (8 x 16^1) + (1 x 16^0) = 129_{10}
$$
$$
B = AB_{16} = (A x 16^1) + (B x 16^0) = 171_{10}
$$

$$
where, 
RGB = (51, 129, 171)
$$

But luckily, we have some code to do all that math work for us: 

```swift
var rgbValue: UInt32 = 0
let colorFromRGB = Scanner(string: "3381AB").scanHexInt32(&rgbValue)
```

The Scanner class scans values from a string, interprets and converts the characters into number and string values from begin to end. 

The Scanner class has a built-in function:
```swift 
scanHexInt32(<UnsafeMutablePointer<UInt32>?>)
```
scanHexInt32(_:) scans for an unsigned value from a hexadecimal representation, returning a found value by reference. It returns true if the receiver finds a valid hexadecimal integer representation, otherwise it returns false. 

Where rgbValue variable is a pointer of type UInt32 using Swift's implicit bridging to pass it to an instance using inout syntax, "&", set to start at index 0 or the beginning of the string.


The hexadecimal integer representation may optionally be preceded by 0x or 0X, in instead of #:
```
#rrggbb  -> #3381AB 
0xrrggbb -> 0x3381AB
```

And where rr, gg and bb represent the red, green and blue values in hexadecimal,  either way the pointer will skip past excess digits in the case of overflow, so the receiver’s position is past the entire hexadecimal representation.

The above hex code would return a blue color.

### 4.  Calculating the return value.
Using the UIColor initializer, UIColor(red:green:blue:alpha:), we can use the converted values from the colorFromRGB variable to initialize and return a color object by calculating the RGB component values.
 
```swift
return UIColor (
        red: CGFloat((rgbValue & 0xFF0000) >> 16) / 255.0,
        green: CGFloat((rgbValue & 0x00FF00) >> 8) / 255.0,
        blue: CGFloat(rgbValue & 0x0000FF) / 255.0,
        alpha: CGFloat(1.0)
```

The calculation, ``` CGFloat((rgbValue & 0xFF0000) >> 16))/255.0```, for each of the colors first converts the the value and overlays the bitmask, 0xFF0000, and extracts the red value from rgbValue in this case. In our example, this would result in 0x330000, where ```>> 16```, and is used to shift the bits of 0x330000 by 16 places to get us 0x000033 so that we can get a base 10 value.

The bitmask for the green value, 0x00FF00, needs to be moved by 8 places before being divided by 255.0, whereas the blue, 0x0000FF, is in the correct spot to be divided by 255.0 to get us the percentage of each color, as UIColor represents colors as percentages with an alpha value of 1.0, so the return value will contain the values (0.2, 0.506, 0.671, 1.0) for the UIColor initializer. 

If you want more info on hexadecimals and how to convert them into base 10, just search for tutorials in your favorite search engine as there are tons out there. 

Cheers!

Photo credit: 
<a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px;" href="https://unsplash.com/@sharonmccutcheon?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Sharon McCutcheon"><span style="display:inline-block;padding:2px 3px;"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-1px;fill:white;" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M20.8 18.1c0 2.7-2.2 4.8-4.8 4.8s-4.8-2.1-4.8-4.8c0-2.7 2.2-4.8 4.8-4.8 2.7.1 4.8 2.2 4.8 4.8zm11.2-7.4v14.9c0 2.3-1.9 4.3-4.3 4.3h-23.4c-2.4 0-4.3-1.9-4.3-4.3v-15c0-2.3 1.9-4.3 4.3-4.3h3.7l.8-2.3c.4-1.1 1.7-2 2.9-2h8.6c1.2 0 2.5.9 2.9 2l.8 2.4h3.7c2.4 0 4.3 1.9 4.3 4.3zm-8.6 7.5c0-4.1-3.3-7.5-7.5-7.5-4.1 0-7.5 3.4-7.5 7.5s3.3 7.5 7.5 7.5c4.2-.1 7.5-3.4 7.5-7.5z"></path></svg></span><span style="display:inline-block;padding:2px 3px;">Sharon McCutcheon</span></a>