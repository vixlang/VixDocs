# Struct Types

## Definition

```vix
type Person = struct
{
    name: string,
    age: i32,
    height: f64
}
```

## Instantiation

```vix
let p = Person
{
    name: "Alice",
    age: 25,
    height: 5.7
}
```

## Field Access

```vix
print(p.name)     // "Alice"
print(p.age)      // 25
```

## Mutable Structs

```vix
let mut p = Person { name: "Bob", age: 30, height: 6.0 }
p.age = 31
```

## Nested Structs

```vix
type Address = struct { street: string, city: string }
type Person = struct { name: string, address: Address }

let p = Person {
    name: "Alice",
    address: Address { street: "123 Main St", city: "NYC" }
}
print(p.address.city)
```

## Generic Structs

```vix
type Box:[T] = struct { value: T }
let intBox = Box:[i32]{ value: 42 }
let strBox = Box:[string]{ value: "hello" }
```
