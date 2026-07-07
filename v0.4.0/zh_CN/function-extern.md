# 外部函数

通过 `extern "C"` 声明遵循 C ABI 的外部函数。

## 语法

```vix
extern "C"
{
    fn printf(format: ptr, ...): i32
    fn malloc(size: usize): ptr
    fn free(ptr: ptr): void
    fn strlen(s: ptr): usize
}
```

## 变参函数

使用 `...` 声明可变参数：

```vix
extern "C"
{
    fn printf(format: ptr, ...): i32
    fn fprintf(file: ptr, format: ptr, ...): i32
}
```

## 调用外部函数

```vix
extern "C"
{
    fn printf(format: ptr, ...): i32
}

fn main(): i32
{
    let msg = "Hello from C\n"
    printf(msg)
    return 0
}
```

## 注意事项

- `extern "C"` 块中的声明注册到外层作用域
- 不要创建与 extern 声明同名的包装函数（会导致递归调用）
- `ptr` 类型用于与 C 的 `void*` 互操作

## 边界情况

- **ABI 兼容性**：假定目标平台 C ABI 与 Vix 调用约定兼容。
- **变参类型安全**：`...` 参数无类型检查，调用者负责匹配约定。
