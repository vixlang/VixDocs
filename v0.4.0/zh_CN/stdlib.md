# 标准库

Vix 标准库位于 `src/std/` 目录。

## 模块列表

| 模块 | 文件 | 主要 API |
|------|------|----------|
| I/O | `std/io.vix` | `puts` `panic` `printf` `fopen` `fclose` `fread` `fwrite` `fprintf` |
| 数组 | `std/arr.vix` | `sort` |
| 内存 | `std/mem.vix` | `set` `copy` `move` `compare` `zero` |
| 字符串 | `std/String.vix` | `new_string` |
| OS | `std/os.vix` | `system` `exit` `opendir` `readdir` `closedir` |
| 随机数 | `std/rand.vix` | `rand` |
| HashMap | `std/hash.vix` | `HashMap:[V]` `new_hashmap` `put` `get` `contains` `len` `capacity` |
| 网络 | `std/net.vix` | `Socket` `sockaddr_in` `new_tcp` `connect_tcp` |
| 类型工具 | `std/type.vix` | `isalpha` `isdigit` `isidentchar` |

## 详细文档

- [I/O 模块](stdlib-io)
- [数组工具](stdlib-arr)
- [内存操作](stdlib-mem)
- [字符串工具](stdlib-string)
- [OS 接口](stdlib-os)
- [随机数](stdlib-rand)
- [HashMap](stdlib-hashmap)
- [网络](stdlib-net)
- [类型工具](stdlib-type)
