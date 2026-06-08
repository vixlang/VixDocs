# 随机数模块 (std/rand.vix)

## API

```vix
pub fn rand(mini: i32, max: i32): i32
```

返回 `[mini, max]` 范围内的伪随机整数。

## 示例

```vix
import "std/rand.vix"

fn main(): i32
{
    let n = rand(1, 100)
    print(n)
    return 0
}
```

## 说明

- 使用线性同余生成器 (LCG)
- 结果类型由左值决定（如 `let n: i32 = rand(...)`）
- 适用于简单场景，不可用于密码学
