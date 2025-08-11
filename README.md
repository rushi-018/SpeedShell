# ⚡ SpeedShell

**SpeedShell** is an interactive typing test application that replicates the **Windows Terminal interface**.  
It’s designed to **sharpen your typing skills** in a realistic, command-line-driven environment, complete with authentic styling and detailed performance analytics.

---

## ✨ Features

- **🎯 Authentic Terminal Experience**  
  A meticulously styled interface inspired by the modern Windows Terminal, featuring a blinking cursor, command prompt, and color-coded output.

- **⌨️ Command-Line Navigation**  
  Use simple commands like `start`, `stats`, `help`, and `clear` to interact with the app.

- **📊 In-Depth Performance Analysis**  
  After each test, view detailed stats:
  - **WPM (Words Per Minute)**
  - **Raw WPM & CPM (Characters Per Minute)**
  - **Accuracy (%)**
  - **Total Time**
  - **Correct vs Incorrect Words/Characters**

- **📈 Session Tracking**  
  Keep track of your **average WPM**, **average accuracy**, and **personal best**.

- **📱 Responsive Design**  
  Works seamlessly on both desktop and mobile devices.

---

## 🚀 How to Use

1. Open the application.
2. You’ll see a **welcome message** in the terminal.
3. Type `start` and press **Enter** to begin a typing test.
4. Type out the given text, then press **Enter**.
5. Your results will be displayed instantly.
6. Choose to start another test or exit.

---

## 🛠 Available Commands

| Command  | Description |
|----------|-------------|
| `start`  | Starts a new typing test. |
| `stats`  | Displays current session statistics. |
| `help`   | Lists all available commands. |
| `clear`  | Clears all text from the terminal screen. |
| `reset`  | Resets all tracked statistics. |
| `exit`   | Simulates closing the terminal application. |

---

## 💻 Local Development

**Clone the repository:**
```bash
git clone https://github.com/rushi-018/speedshell.git
cd speedshell

## Install Dependencies

```bash
npm install
```

## Usage

```bash
node speedShell.js
```

## Features

- 🚀 **Fast Execution**: Minimal overhead for maximum speed.
- 🛠 **Cross-Platform**: Works on macOS, Linux, and Windows.
- 📜 **Custom Commands**: Easily extendable for your own scripts.
- ⏱ **Performance-Oriented**: Optimized for reduced execution time.

## Example

```bash
node speedShell.js "ls -l"
```
Output:
```
total 0
-rw-r--r--  1 user  staff  0 Aug 11 12:00 file1.txt
-rw-r--r--  1 user  staff  0 Aug 11 12:00 file2.txt
```

## Contributing

Contributions are welcome!  
Fork the repository, create a new branch, and submit a pull request.

```bash
git clone https://github.com/rushi-018/SpeedShell.git
cd SpeedShell
git checkout -b feature-branch
```

## License

This project is licensed under the [MIT License](LICENSE).
