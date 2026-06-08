# I/O Module (std/io.vix)

## API

```vix
pub fn puts(s: ptr): i32             // print string + newline
pub fn panic(msg: ptr)               // print error and hang

// extern "C" wrappers:
fn printf(format: ptr, ...): i32     // formatted output
fn fprintf(file: ptr, format: ptr, ...): i32
fn fopen(filename: ptr, mode: ptr): ptr
fn fclose(file: ptr): i32
fn fread(buf: ptr, size: i64, count: i64, file: ptr): i64
fn fwrite(buf: ptr, size: i64, count: i64, file: ptr): i64
```

## Example

```vix
import "std/io.vix"

fn main(): i32
{
    puts("Hello, World!")
    return 0
}
```

## File I/O

```vix
import "std/io.vix"

fn main(): i32
{
    let file = fopen("test.txt", "w")
    if (file == nil)
    {
        puts("Failed to open file")
        return 1
    }
    let data = "Hello, Vix!"
    fwrite(data, 1, data.length, file)
    fclose(file)
    return 0
}
```
