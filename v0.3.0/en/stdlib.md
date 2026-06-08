# Standard Library

Vix standard library is located in `src/std/`, written in Vix.

## Module Index

| Module | File | Key APIs |
|--------|------|----------|
| I/O | `std/io.vix` | `puts` `panic` `printf` `fopen` `fclose` `fread` `fwrite` |
| Array | `std/arr.vix` | `sort` |
| Memory | `std/mem.vix` | `set` `copy` `move` `compare` `zero` |
| String | `std/String.vix` | `new_string` |
| OS | `std/os.vix` | `system` `exit` `opendir` `readdir` `closedir` |
| Random | `std/rand.vix` | `rand` |
| HashMap | `std/hash.vix` | `HashMap:[V]` `new_hashmap` `put` `get` `contains` |
| Network | `std/net.vix` | `Socket` `sockaddr_in` `new_tcp` `connect_tcp` |
| Type Utils | `std/type.vix` | `isalpha` `isdigit` `isidentchar` |

## Subtopics

- [I/O](stdlib-io)
- [Array](stdlib-arr)
- [Memory](stdlib-mem)
- [String](stdlib-string)
- [OS](stdlib-os)
- [Random](stdlib-rand)
- [HashMap](stdlib-hashmap)
- [Network](stdlib-net)
- [Type Utils](stdlib-type)
