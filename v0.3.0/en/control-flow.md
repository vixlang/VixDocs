# Control Flow

## if / elif / else

```vix
if (x > 10)
{
    print("greater than 10")
} elif (x > 5)
{
    print("greater than 5")
} else
{
    print("5 or less")
}
```

## while Loop

```vix
let mut i = 0
while (i < 10)
{
    print(i)
    i += 1
}
```

## for Loop

```vix
for (i in 0 .. 10)
{
    print(i)  // 0, 1, ..., 9
}
```

## break and continue

```vix
// break
for (i in 0 .. 100)
{
    if (i >= 10) { break }
    print(i)
}

// continue
for (i in 0 .. 10)
{
    if (i % 2 == 0) { continue }
    print(i)  // odd numbers only
}
```

## Nested Loops

```vix
for (x in 1 .. 3)
{
    for (y in 1 .. 3)
    {
        print(x, y)
    }
}
```
