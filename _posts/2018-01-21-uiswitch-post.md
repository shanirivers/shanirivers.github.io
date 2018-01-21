---
layout: post
title: "Why UISwitch Can be a Biatch To Setup"
author: "Shani"
categories: blog
tags: [UISwitch,Swift,UIKit,YouTube,Vimeo,how-to,addTarget]
image: shatterIphone.jpg
---

Most tutorials just show how to get UISwitch to do an action, but almost every one that I had tried didn't address a my major pain in the ass - when you have more than one view controller. And when you have more than one view controller, UISwitch will dismiss it, popping it completely off the stack. So this is just a quick reference on how I figured it out without help from Apple's documentation or Stackoverflow.

## 1. Create an outlet for the UISwitch - you will need this to get the status of the switch

Create an action - By "right" clicking on the switch and dragging to file OR going to the Connections inspector and dragging it for the "Primary Action Triggered" to file: 
```
Connection: Action
Name: changeOfSwitchStatus
Type: UISwitch
```
## 2. Determine if you need to put the addTarget() method in viewDidLoad() or viewWillAppear().
If this is app has more than one veiw controller, this biatch will dismiss your current view so if you have only one view controller, add the addTarget(:_) action to the viewDidLoad() method, otherwise add it to to viewWillAppear().

This is the code you will need to implement, using my implementation for controlling whether a view object will appear or not depending on whether the UISwitch was turned on: 

The switch outlet:
```swift
@IBOutlet weak var myDamnSwitch: UISwitch!
```

The following code could be put into viewDidLoad(), but I kept having issues with it dismissing my view controller so I put it the viewWillAppear() method: 
```swift
override func viewWillAppear(_ animated: Bool) 
{
	// Got to get target and look for value changes
	myDamnSwitch.addTarget(self, action: #selector(changeOfSwitchStatus(_:)), 	for: UIControlEvents.valueChanged)
}
```

The switch action, I have it calling a method I created that would display the view.
```swift
 @IBAction func changeOfSwitchStatus(_ sender: UISwitch) 
{
    displayPicker()
}
```

## 3. The action I want it to do.
In this case it's to hide or show a date picker's view (the date picker is in a view) and to enable the datepicker, or put whatever code you need it to do.
```swift
func displayPicker()
{
    if dueSwitch.isOn {
        datePickerView?.isHidden = false
        datePicker?.isEnabled = true
    } else {
        datePickerView?.isHidden = true
        datePicker?.isEnabled = false
    }
}
```

Hopefully my several hours of head-banging is helpful to you.