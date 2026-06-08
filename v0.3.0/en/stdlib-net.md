# Network Module (std/net.vix)

## Types

```vix
pub type sockaddr_in = struct {
    sin_family: u16,
    sin_port: u16,
    sin_addr: u32,
    sin_zero: [u8 * 8]
}

pub type Socket = struct {
    fd: i32
}
```

## API

```vix
pub fn new_tcp(): Result[Socket, string]
pub fn connect_tcp(sock: Socket, address: sockaddr_in): Result[i32, string]
```

## Example

```vix
import "std/net.vix"

fn main(): i32
{
    let sock_result = new_tcp()
    match sock_result
    {
        Ok(sock) -> print("Socket created: ", sock.fd)
        Err(e) -> print("Failed: ", e)
    }
    return 0
}
```

## Extern Declarations

```vix
extern "C"
{
    fn socket(domain: i32, type_: i32, protocol: i32): i32
    fn connect(sockfd: i32, addr: ptr, addrlen: usize): i32
    fn send(sockfd: i32, buf: ptr, len: usize, flags: i32): isize
    fn recv(sockfd: i32, buf: ptr, len: usize, flags: i32): isize
    fn bind(sockfd: i32, addr: ptr, addrlen: usize): i32
    fn listen(sockfd: i32, backlog: i32): i32
}
```
