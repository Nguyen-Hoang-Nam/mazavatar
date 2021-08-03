# Mazavatar

Generate maze by username

![Screenshot](https://raw.githubusercontent.com/Nguyen-Hoang-Nam/readme-image/main/mazavatar/screenshot.png)

## Installation

```bash
$ npm install -g mazavatar
```

## Usage

```bash
$ mazavatar -h

Usage: mazavatar <Options> <Input>
Options:
  -h, --help              Show help
  -v, --version           Show version
  -o, --output            Create output file
  -a, --algorithm         Change hash algorithm
  -s, --style             Change maze style (normal, heavy, arc)
  -W, --width             Set width of maze
  -H, --height            Set height of maze

Examples:
  $ mazavatar --width 20 --height 20 example
```

```bash
$ mazavatar --width 20 --height 20 --style arc --algorithm md5 username

╭───┬───┬─────────┬───────────────────┬─╮
├─╮ ╵ ╷ │ ╭─────╮ ╰───╮ ╭───────┬───╮ ╵ │
│ ╰───┤ ╵ │ ╷  ─┴───╮ ╵ │  ───╮ ╵ ╷ ╰─  │
│ ╷ ╷ ╰───┤ ╰─────╮ ├───┴───╮ ╰───┼───┬─┤
│ │ ├───╮ ├───┬─  │ ╵ ╭─╮ ╭─┴───╮ ╵ ╷ │ │
│ │ ╵ ╷ ╰─╯ ╷ ╵ ╭─┴───┤ │ ╵ ╷  ─┴───┤ ╵ │
│ ╰─┬─┴─┬───┴───╯ ╭─╮ ╵ ╰─┬─┴─────╮ ├─  │
├─╮ ╵ ╷ │ ╭─┬───┬─╯ ╰───╮ ╵ ╭───  │ ╵ ╭─┤
│ ╰───┤ ╵ │ ╵ ╷ ╵ ╭─╮ ╭─┴───┤  ─┬─┴─┬─╯ │
│  ─╮ ├───╯ ╭─┴───╯ │ ╵ ╭─  ╰─╮ ╵ ╷ │ ╷ │
├─╮ │ ╵ ╭───╯  ─╮ ╷ ├───┤ ╭───┴───┤ ╵ │ │
│ │ ╰─┬─┴─┬─────╯ │ ╵ ╷ │ ╵ ╭─╮ ╷ ╰───┤ │
│ ╰─╮ ╵ ╷ │ ╭─┬───┴───┤ ╰───╯ │ ├───╮ │ │
│  ─┴───┤ ╵ │ ╵ ╷ ╭───┴─┬───╮ │ ╵ ╷ ╰─╯ │
│  ─╮  ─┴───┤  ─┤ ╵ ╷  ─╯ ╷ ╵ ├───┴─────┤
├─╮ ╰─┬───  ╰─╮ ╰───┴─┬───┼───┼─────  ╷ │
│ ├─  │ ╭─────┴─────  │ ╷ ╵ ╷ │ ╭───┬─╯ │
│ ╵ ╭─┤ ╵ ╭───────────╯ ├───┤ ╵ │ ╷ ╵ ╭─┤
│  ─╯ ╰───┤  ─────┬─┬───╯ ╭─┴─┬─╯ ├───╯ │
├───────  ╰─────  │ ╵ ╷  ─╯ ╷ ╵  ─╯ ╭─  │
╰─────────────────┴───┴─────┴───────┴───╯
```

## Todo

- [ ] Implement Growing Tree algorithm
- [x] Output file
- [ ] Move recursion to iteration
- [x] Support change hash algorithm

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
