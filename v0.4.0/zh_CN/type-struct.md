# 结构体类型

## 定义

```vix
type Person = struct
{
    name: string,
    age: i32,
    height: f64
}
```

## 实例化

```vix
let alice = Person
{
    name: "Alice",
    age: 30,
    height: 165.0
}
```

## 字段访问

```vix
print(alice.name)               /* Output: Alice */
print(alice.age)                /* Output: 30 */
```

## 可变结构体

```vix
let mut bob = Person { name: "Bob", age: 25, height: 180.0 }
bob.age = 26

let static_p = Person { name: "Ann", age: 20, height: 160.0 }
static_p.age = 21               /* ❌ 错误: 不可变结构体字段不可修改 */
```

## 嵌套结构体

```vix
type Address = struct { street: string, city: string }
type Employee = struct { name: string, address: Address }

let emp = Employee
{
    name: "Alice",
    address: Address { street: "123 Main St", city: "NYC" }
}
print(emp.address.city)        /* Output: NYC */
```

## 泛型结构体

```vix
type Box:[T] = struct { value: T }
type Pair:[T, U] = struct { first: T, second: U }

let int_box = Box:[i32]{ value: 42 }
let str_box = Box:[string]{ value: "hello" }
let pair = Pair:[i32, string]{ first: 1, second: "one" }
```

## Copy 语义

结构体在 Vix 中视为 Copy 类型：

```vix
let a = Person { name: "X", age: 1, height: 100.0 }
let b = a                       /* 复制，a 和 b 独立 */
print(a.name)                   /* ✓ 原变量可用 */
```

## 边界情况

- **空结构体**：`type Empty = struct {}` `[TODO: 确认大小与布局]`
- **字段类型为非 Copy**：`struct { items: [i32] }` 中 struct 仍被视为 Copy `[TODO: 确认]`
