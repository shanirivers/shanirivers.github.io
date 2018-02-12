---
layout: post
title: "Algorithms in Swift"
author: "Shani"
categories: journal
tags: [algorithms,log,notes,Swift,search, binary, selection]
image: keyboard.jpg
---

Why am I studying algorithms? Well, why not!?! It's only logical to want to solve a problem or complete a task in the most efficient way possible. Yes, I could have just found algorithms already written in Swift, but that would defeat the purpose of learning it, coding from pseudocode and applying them to a language that I really, really like. 

This post will catalog and summarize my notes from the book, [Grokking Algorithms](https://www.manning.com/books/grokking-algorithms), which contains the code in Python so it makes me want to convert it to Swift. I choose to use this book, as it is very straight forward and contains just enough detail to facilitate understanding. 

Plus, I'll include other references that I've found online that I have used to supplement my notes and understanding. I tested all this algorithms in Xcode Playground without much issue and it works great to get quick feedback and explore what's going on with your code. So I highly recommend you use it if you plan to learn algorithms. 

## Binary Search

Binary search is an algorithm that takes a sorted list of elements and compares a given value. It does this by starting with a value in the middle of the list and compares it to the search value. It them set high or low depending on the outcome. It continues to do this until it finds the value.

Binary search will take $$ log_{2} n $$ steps to run at most or in Big O notation, $$ O(log  n) $$. 

In order to figure out if my Swift code was accurate and actually had the correct runtime, I used a struct to calculate runtime.
```swift 
// TIMER
struct Timer
{
    var startTime: UInt64 = 0
    var stopTime: UInt64 = 0
    let numer: UInt64
    let denom: UInt64
    
    init()
    {
        var info = mach_timebase_info(numer: 0, denom: 0)
        mach_timebase_info(&info)
        numer = UInt64(info.numer)
        denom = UInt64(info.denom)
    }
    
    mutating func start() { startTime = mach_absolute_time() }
    
    mutating func stop() { stopTime = mach_absolute_time() }
    
    var nanoseconds: UInt64 { return ((stopTime - startTime) * numer ) / denom }
    
    var milliseconds : Double {  return Double(nanoseconds) / 1_000_000 }
    
    var seconds: Double { return Double(nanoseconds) / 1_000_000_000 }
}

// Create an instance of Timer
var t = Timer()
 
t.start()
// some algorithm code here
t.stop()
print("Run time was \(t.seconds) seconds.")
```

### My code for Binary Search in Swift 4: 
```swift 
func binarySearch (array: [Int], targetValue T: Int) -> (Int?, String?)
{
    let A = array.sorted()	// Sort in case array isn't already sorted
    var L = 0 				// Indices left of middle
    var R = A.count - 1		// Indices right of middle
    var m: Int				// Middle index

    while L <= R
    {
        m = (L + R)/2 		// Set middle index value
        
        // If value of the middle index is equal to search value, return index
        if A[m] == T {		
            return (m, "Found index for \(T)")
        } else if A[m] < T {
            L = m + 1
        } else {
            // if A[m] > T
            R = m - 1
        }
    }
    return (nil, "None. Value \(T) was not found.")
}
```

I created a function that would make sorted arrays for me to test: 
```swift 
func createList (numberOfElements: Int) -> [Int]
{
    var list = [Int]()
    
    for i in 1..<numberOfElements
    {
        list.append(i)
    }
    
    return list
}
```
And here's the code I used to test my binary search algorithm: 
```swift
var myList = createList(numberOfElements: 100)
t.start()
binarySearch(array: myList, targetValue: 70)
t.stop()
print("Run time was \(t.seconds) seconds.")
```

## Selection Sort

Selection sort is  an in-place comparison sort. It has $$ O(n^2) $$ time complexity, so its performs worse, but is simple and it has performance advantages over more complicated algorithms in certain situations, particularly where auxiliary memory is limited. Why not just use Swift built-in array method ``` sorted() ```, you might ask, because it's about learning. It is definitely faster too, but this is for understanding and flexing the mental muscle.

Basically, the algorithm has to traverse through all the array elements and swap values when it comes across one that is smaller.  

Here's the pseudocode: 
1. Find the array element with the minimum value amoung a[i], a[i+1], ..., a[n-1].

2. Swap element with the new minimum element that was found. 

I first implemented the example given in the book and was quite unsatisfied by the run time of 0.006404712 seconds, but I'll share it with you nevertheless: 
```swift
func findSmallest(arr: [Int]) -> Int
{
    var smallest = arr[0]
    var smallestIndex = 0
    
    for i in 0..<(arr.count)
    {
        if arr[i] < smallest
        {
            smallest = arr[i]
            smallestIndex = i
        }
    }
    return smallestIndex
}

func selectionSort(arr: [Int]) -> [Int]
{
    var newArr = [Int]()
    var oldArr = arr
    
    for _ in 0..<(arr.count)
    {
        let smallest = findSmallest(arr: oldArr)
        newArr.append(oldArr[smallest])
        oldArr.remove(at: smallest)
    }
    return newArr
}

let mySelectionArray = [12, 4, 5, 7, 3, 1, 9, 10, 11]

t.start()
let mySortedArray = selectionSort(arr: mySelectionArray)
t.stop()
print("Run time for algo from book - \(t.seconds) seconds")
```
So instead of using two functions,  I decided to combine into one, which cut running time in half to 0.003421086 seconds.

### My updated Selection Sort algorithm in Swift 4: 

```swift 
func updatedSelectionSort (arr: [Int]) -> [Int]
{
    var a = arr
    var holder: Int // temporary holder for swapping values, as needed
    
    // Traverse through all array elements
    /*------------------------------------------------------
     The selection sort algorithm
     ------------------------------------------------------*/
    for i in 0..<a.count
    {
        /* ------------------------------------------------------
           Find the array element with the min. value amoung
            a[i], a[i+1], ..., a[n-1]
           ------------------------------------------------------*/
        var min_j = i // Assuming elem 0 (a[0]) is the minimum
        
        for j in i+1..<a.count
        {
            if a[j] < a[min_j]
            {
                min_j = j // Found a smaller minimum, update min_j
            }
        }
    
        /* ------------------------------------------------------
           Swap  a[i] and a[min_j]
           ------------------------------------------------------*/
        holder = a[i]
        a[i] = a[min_j]
        a[min_j] = holder
        
    }
    return a
}

t.start()
let mySortedArrayWithUpdatedSort = updatedSelectionSort(arr: mySelectionArray)
t.stop()
print("Run time for new algo: \(t.seconds) seconds")
```

Stay tuned, as I plan to update this post as I learn other algorithms...

[Photo credit](https://www.pexels.com/photo/computer-keyboard-34153/)
 
