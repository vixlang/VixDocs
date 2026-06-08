# Extern Functions

## extern "C" Block

```vix
extern "C"
{
    fn printf(format: ptr, ...): i32
    fn malloc(size: usize): ptr
    fn free(ptr: ptr): void
    fn strlen(s: ptr): usize
}
```

## Variadic Functions

```vix
extern "C"
{
    fn printf(format: ptr, ...): i32
    fn fprintf(file: ptr, format: ptr, ...): i32
}
```

## Calling Extern Functions

```vix
fn main(): i32
{
    let msg = "Hello from C!\n"
    printf(msg)
    return 0
}
```

## Notes

- Extern declarations are registered in the outer scope
- Avoid naming public wrappers the same as extern declarations (causes recursion)
- Use `ptr` for C pointer types in FFI
