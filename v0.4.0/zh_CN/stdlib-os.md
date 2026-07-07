# OS 接口模块

`std/os.vix` 提供操作系统相关功能。

## 主要函数

| 函数 | 说明 |
|------|------|
| `system(cmd: string): i32` | 执行系统命令 |
| `exit(code: i32): void` | 退出程序 |
| `opendir(path: string): ptr` | 打开目录 |
| `readdir(dir: ptr): ptr` | 读取目录项 |
| `closedir(dir: ptr): void` | 关闭目录 |
