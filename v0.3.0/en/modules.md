# Module System

## Import

```vix
import "std/io.vix"
import "std/arr.vix"
import "std/mem.vix"
```

## Public Export

Use `pub` keyword to export functions:

```vix
// mymodule.vix
pub fn public_func(x: i32): i32
{
    return x * 2
}

fn private_helper()
{
    // not exported
}
```

## Extern Blocks

```vix
extern "C"
{
    fn printf(format: ptr, ...): i32
}
```

## Import Mechanism

- `inline_imports()` recursively resolves `import` statements
- All `pub`-marked functions are inlined into the current AST
- Circular imports are handled via visited-file tracking

## Standard Library Modules

```vix
import "std/io.vix"      // I/O functions
import "std/arr.vix"     // Array utilities
import "std/mem.vix"     // Memory operations
import "std/String.vix"  // String utilities
import "std/os.vix"      // OS interface
import "std/rand.vix"    // Random numbers
import "std/hash.vix"    // HashMap
import "std/net.vix"     // Networking
import "std/type.vix"    // Type utilities
```
