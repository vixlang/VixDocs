# Control Flow

Control flow statements are used to control the execution order of a program. Vix provides a rich set of control flow structures.

## Table of Contents

- [Conditional Statements](#conditional-statements)
- [while Loop](#while-loop)
- [for Loop](#for-loop)
- [break and continue](#break-and-continue)
- [match Statement](#match-statement)
- [Logical Operations](#logical-operations)

---

## Conditional Statements

### if Statement

```vix
fn main() -> i32 {
    let x = 10

    if (x > 5) {
        print("x is greater than 5")
    }
    return 0
}
```

### if-else Statement

```vix
fn main() -> i32 {
    let x = 10

    if (x > 15) {
        print("x is greater than 15")
    } else {
        print("x is 15 or less")
    }
    return 0
}
```

### if-elif-else Statement

```vix
fn main() -> i32 {
    let score = 85

    if (score >= 90) {
        print("Grade: A")
    } elif (score >= 80) {
        print("Grade: B")
    } elif (score >= 70) {
        print("Grade: C")
    } elif (score >= 60) {
        print("Grade: D")
    } else {
        print("Grade: F")
    }
    return 0
}
```

### Nested if Statement

```vix
fn main() -> i32 {
    let age = 25
    let hasLicense = true

    if (age >= 18) {
        if (hasLicense) {
            print("You can drive")
        } else {
            print("You need a license to drive")
        }
    } else {
        print("You are too young to drive")
    }
    return 0
}
```

### Conditional Expressions

The condition can be any expression that returns a boolean value:

```vix
fn main() -> i32 {
    let a = 10
    let b = 20

    if (a < b and b < 30) {
        print("Both conditions are true")
    }

    if (a == 10 or b == 10) {
        print("At least one condition is true")
    }

    if (!(a > b)) {
        print("a is not greater than b")
    }
    return 0
}
```

---

## while Loop

The while loop repeatedly executes a block of code as long as a condition is true.

### Basic Usage

```vix
fn main() -> i32 {
    let mut i = 0
    while (i < 5) {
        print(i)
        i += 1
    }
    // Output: 0 1 2 3 4
    return 0
}
```

### Infinite Loop

```vix
fn main() -> i32 {
    while (true) {
        // Infinite loop
        // Use break to exit
    }
    return 0
}
```

### Infinite Loop with Condition

```vix
fn main() -> i32 {
    let mut running = true
    while (running) {
        let input = getInput()
        if (input == "quit") {
            running = false
        }
    }
    return 0
}
```

### while with User Interaction

```vix
fn main() -> i32 {
    let mut guess = 0
    let target = 42

    while (guess != target) {
        guess = toint(input("Guess a number: "))
        if (guess < target) {
            print("Too low!")
        } elif (guess > target) {
            print("Too high!")
        }
    }
    print("Correct!")
    return 0
}
```

---

## for Loop

The for loop is used to iterate over a range or a collection.

### Range Loop

```vix
fn main() -> i32 {
    // Iterate from 1 to 9 (excluding 10)
    for (i in 1 .. 10) {
        print(i)
    }
    // Output: 1 2 3 4 5 6 7 8 9
    return 0
}
```

### Loop Starting from Zero

```vix
fn main() -> i32 {
    for (i in 0 .. 5) {
        print(i)
    }
    // Output: 0 1 2 3 4
    return 0
}
```

### Iterating Over an Array

```vix
fn main() -> i32 {
    let arr = [10, 20, 30, 40, 50]

    for (i in 0 .. arr.length) {
        print("arr[", i, "] = ", arr[i])
    }
    return 0
}
```

### Nested Loops

```vix
fn main() -> i32 {
    // Print multiplication table
    for (i in 1 .. 10) {
        for (j in 1 .. 10) {
            printf("%4d", i * j)
        }
        print("")
    }
    return 0
}
```

### Modifying Loop Variable

```vix
fn main() -> i32 {
    for (i in 0 .. 10) {
        if (i % 2 == 0) {
            print(i)  // Only print even numbers
        }
    }
    return 0
}
```

---

## break and continue

### break Statement

`break` is used to exit a loop immediately:

```vix
fn main() -> i32 {
    let mut i = 0
    while (true) {
        print(i)
        i += 1
        if (i >= 5) {
            break  // Exit loop
        }
    }
    // Output: 0 1 2 3 4
    return 0
}
```

Using in a for loop:

```vix
fn main() -> i32 {
    for (i in 1 .. 100) {
        if (i == 5) {
            break  // Exit when i == 5
        }
        print(i)
    }
    // Output: 1 2 3 4
    return 0
}
```

Finding an element:

```vix
fn main() -> i32 {
    let arr = [3, 7, 2, 9, 5]
    let target = 9
    let mut found = -1

    for (i in 0 .. arr.length) {
        if (arr[i] == target) {
            found = i
            break  // Exit immediately after finding
        }
    }

    if (found >= 0) {
        print("Found at index: ", found)
    } else {
        print("Not found")
    }
    return 0
}
```

### continue Statement

`continue` is used to skip the current iteration and proceed to the next loop cycle:

```vix
fn main() -> i32 {
    // Only print odd numbers
    for (i in 1 .. 10) {
        if (i % 2 == 0) {
            continue  // Skip even numbers
        }
        print(i)
    }
    // Output: 1 3 5 7 9
    return 0
}
```

Filtering data:

```vix
fn main() -> i32 {
    let numbers = [1, -2, 3, -4, 5, -6]

    for (i in 0 .. numbers.length) {
        if (numbers[i] < 0) {
            continue  // Skip negative numbers
        }
        print(numbers[i])
    }
    // Output: 1 3 5
    return 0
}
```

### Combined Usage

```vix
fn main() -> i32 {
    for (i in 0 .. 100) {
        if (i % 3 == 0) {
            continue  // Skip multiples of 3
        }
        if (i > 20) {
            break  // Stop if greater than 20
        }
        print(i)
    }
    return 0
}
```

---

## match Statement

The match statement is used for pattern matching:

### Basic Usage

```vix
fn main() -> i32 {
    let value = 10

    match value {
        5 -> {
            print("value is 5")
        }
        10 -> {
            print("value is 10")
        }
        15 -> {
            print("value is 15")
        }
        _ -> {
            print("value is something else")
        }
    }
    return 0
}
```

### Matching Enumeration Values

```vix
fn main() -> i32 {
    type State = Running | Stopped | Paused

    let state = Running

    match state {
        Running -> {
            print("System is running")
        }
        Stopped -> {
            print("System is stopped")
        }
        Paused -> {
            print("System is paused")
        }
    }
    return 0
}
```

### match with Return Value

```vix
fn describe(n: i32) -> string {
    match n {
        0 -> {
            return "zero"
        }
        1 -> {
            return "one"
        }
        _ -> {
            return "many"
        }
    }
}
```

---

## Logical Operations

### and Operator

Returns true if both conditions are true:

```vix
fn main() -> i32 {
    let age = 25
    let hasID = true

    if (age >= 18 and hasID) {
        print("You can enter")
    }
    return 0
}
```

Short-circuit evaluation:

```vix
fn main() -> i32 {
    let x = 0
    if (x != 0 and 10 / x > 1) {
        // If x != 0 is false, the subsequent expression is not evaluated
        // Avoids division by zero error
    }
    return 0
}
```

### or Operator

Returns true if at least one condition is true:

```vix
fn main() -> i32 {
    let day = "Saturday"

    if (day == "Saturday" or day == "Sunday") {
        print("It's the weekend!")
    }
    return 0
}
```

### not Operator

Negates a boolean value:

```vix
fn main() -> i32 {
    let isEmpty = false

    if (!isEmpty) {
        print("There are items")
    }
    return 0
}
```

### Composite Logical Expressions

```vix
fn main() -> i32 {
    let a = 10
    let b = 20
    let c = 30

    if ((a < b and b < c) or a == 0) {
        print("Complex condition is true")
    }
    return 0
}
```

---

## Control Flow Best Practices

### 1. Avoid Deep Nesting

```vix
fn main() -> i32 {
    // Not recommended
    if (condition1) {
        if (condition2) {
            if (condition3) {
                // Too deep
            }
        }
    }

    // Recommended: use early returns
    if (!condition1) {
        return 0
    }
    if (!condition2) {
        return 0
    }
    if (!condition3) {
        return 0
    }
    // Main logic
    return 0
}
```

### 2. Use Meaningful Condition Variables

```vix
fn main() -> i32 {
    // Not recommended
    if (age >= 18 and hasLicense and !isSuspended) {
        // ...
    }

    // Recommended
    let canDrive = age >= 18 and hasLicense and !isSuspended
    if (canDrive) {
        // ...
    }
    return 0
}
```

### 3. Choose the Right Loop Type

- Use `for` loop to iterate over a known range
- Use `while` loop to handle uncertain number of iterations

### 4. Avoid Infinite Loops

```vix
fn main() -> i32 {
    // Dangerous: no exit condition
    while (true) {
        // Forgot break
    }
    // Safe: explicit exit condition
    let mut running = true
    while (running) {
        // ...
        if (shouldStop) {
            running = false
        }
    }
    return 0
}
```

---

## Examples

### Binary Search

```vix
fn binarySearch(arr: [i32], target: i32, mut low: i32, mut high: i32) -> i32 {
    while (low <= high) {
        let mid = (low + high) / 2
        if (arr[mid] == target) {
            return mid
        } elif (arr[mid] < target) {
            low = mid + 1
        } else {
            high = mid - 1
        }
    }
    return -1
}
```

### Bubble Sort

```vix
fn bubbleSort(arr: [i32], size: i32) {
    for (i in 0 .. size - 1) {
        for (j in 0 .. size - i - 1) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
}
```

### Guessing Game

```vix
fn game() -> i32 {
    let target = 42
    let mut guesses = 0
    
    while (true) {
        let guess = toint(input("Guess: "))
        guesses += 1
        
        if (guess == target) {
            print("Correct! You got it in ", guesses, " guesses!")
            return 0
        } elif (guess < target) {
            print("Too low!")
        } else {
            print("Too high!")
        }
    }
}
```

---

## Next Steps

- [Functions](functions.md) - Function definition and calling
- [Arrays and Lists](syntax.md#arrays-and-lists) - Data structures
- [Pointers](pointers.md) - Pointer operations