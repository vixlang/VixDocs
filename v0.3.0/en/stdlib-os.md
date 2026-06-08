# OS Module (std/os.vix)

## API

```vix
pub fn system(cmd: ptr): i32    // Execute shell command
pub fn exit(status: i32): void  // Exit process
pub fn opendir(path: ptr): ptr  // Open directory
pub fn readdir(dir: ptr): ptr   // Read directory entry
pub fn closedir(dir: ptr): i32  // Close directory
```

## Example

```vix
import "std/os.vix"

fn main(): i32
{
    system("ls -la")
    return 0
}
```

## Extern Declarations

```vix
extern "C"
{
    fn system(cmd: ptr): i32
    fn exit(status: i32): void
    fn opendir(path: ptr): ptr
    fn readdir(dir: ptr): ptr
    fn closedir(dir: ptr): i32
}
```

## Note

`system` and `exit` share names with their extern declarations — the compiler correctly resolves them.
