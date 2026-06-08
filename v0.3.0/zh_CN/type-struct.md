# 结构体类型

## 定义

```vix
type Person = struct
{
    name: string,
    age: i32,
    height: f64
}
// 或传统写法（v0.3.0 弃用警告）：
struct Person {
    name: string,
    age: i32
}
```

## 实例化

```vix
let p = Person
{
    name: "Alice",
    age: 25,
    height: 5.7
}
```

## 字段访问

```vix
print(p.name)    // "Alice"
print(p.age)     // 25
```

## 可变结构体

```vix
let mut p = Person { name: "Bob", age: 30, height: 6.0 }
p.age = 31
```

## 嵌套结构体

```vix
type Address = struct { street: string, city: string }
type Person = struct { name: string, address: Address }

let p = Person {
    name: "Alice",
    address: Address { street: "123 Main St", city: "NYC" }
}
print(p.address.city)
```

## 泛型结构体

```vix
type Box:[T] = struct { value: T }
let intBox = Box:[i32]{ value: 42 }
let strBox = Box:[string]{ value: "hello" }
```
