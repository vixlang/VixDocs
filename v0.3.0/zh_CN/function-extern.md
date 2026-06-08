# 外部函数

## extern "C" 块

通过 `extern "C"` 声明 C ABI 函数：

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
fn main(): i32
{
    let msg = "Hello from C!\n"
    printf(msg)
    return 0
}
```

## 注意事项

- `extern "C"` 块中的声明会被注册到外层作用域
- 不要使用与 extern 声明同名的包装函数（会导致递归调用）
- 指针类型使用 `ptr` 通用指针进行 FFI
