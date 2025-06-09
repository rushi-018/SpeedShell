// Sample texts for typing test
const sampleTexts = [
    "The quick brown fox jumps over the lazy dog. Programming is the process of creating a set of instructions that tell a computer how to perform a task.",
    "JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification. It is a language that is also characterized as dynamic, weakly typed, prototype-based and multi-paradigm.",
    "Web development is the work involved in developing a website for the Internet or an intranet. Web development can range from developing a simple single static page of plain text to complex web applications.",
    "HTML is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets and scripting languages such as JavaScript.",
    "CSS is a style sheet language used for describing the presentation of a document written in a markup language such as HTML. CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript."
];

// DOM Elements
const terminalContent = document.getElementById('terminal-content');
const mobileInput = document.getElementById('mobile-input');

// Game state
let isPlaying = false;
let currentText = '';
let startTime = null;
let firstKeyTime = null;
let correctChars = 0;
let totalChars = 0;
let stats = {
    testsCompleted: 0,
    averageWPM: 0,
    averageAccuracy: 0,
    bestWPM: 0
};

// Input state
let currentInput = '';
let currentLine = null;
let mode = 'command'; // 'command', 'typing', 'yn'

function addOutput(text, className = '') {
    const output = document.createElement('div');
    output.className = `command-output ${className}`;
    output.textContent = text;
    terminalContent.appendChild(output);
    terminalContent.scrollTop = terminalContent.scrollHeight;
}

function isMobile() {
    return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}

function addPrompt(input = '') {
    removePrompt();
    const commandLine = document.createElement('div');
    commandLine.className = 'command-line';
    commandLine.innerHTML = `
        <span class="prompt">Dev@Devtype.rushiraj.top:~$</span>
        <span class="user-input">${input}</span><span class="cursor"></span>
    `;
    terminalContent.appendChild(commandLine);
    currentLine = commandLine;
    currentInput = input;
    terminalContent.scrollTop = terminalContent.scrollHeight;
    if (isMobile()) {
        setTimeout(() => mobileInput.focus(), 0);
    }
}

function removePrompt() {
    // Remove any existing prompt
    const prompts = terminalContent.querySelectorAll('.command-line');
    prompts.forEach(p => p.remove());
}

const commands = {
    help: () => {
        addOutput(`Available commands:
        start    - Start a new typing test
        stats    - Show your typing statistics
        clear    - Clear the terminal
        reset    - Reset all statistics
        exit     - Exit the typing test
        help     - Show this help message`, 'info');
    },
    start: () => {
        if (isPlaying || mode === 'typing') {
            addOutput('A test is already in progress!', 'error');
            return;
        }
        currentText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
        addOutput('Type the following text:', 'info');
        addOutput(currentText, 'typing-text');
        isPlaying = true;
        mode = 'typing';
        startTime = null;
        firstKeyTime = null;
        correctChars = 0;
        totalChars = 0;
        currentInput = '';
        addPrompt();
    },
    stats: () => {
        if (stats.testsCompleted === 0) {
            addOutput('No tests completed yet!', 'info');
            return;
        }
        addOutput(`Statistics:
        Tests Completed: ${stats.testsCompleted}
        Average WPM: ${stats.averageWPM.toFixed(1)}
        Average Accuracy: ${stats.averageAccuracy.toFixed(1)}%
        Best WPM: ${stats.bestWPM}`, 'info');
    },
    clear: () => {
        terminalContent.innerHTML = '';
        const welcomeMessage = document.createElement('div');
        welcomeMessage.className = 'welcome-message';
        welcomeMessage.textContent = 'Welcome to Windows Terminal Typing Test v1.0.0\nType \'help\' to see available commands';
        terminalContent.appendChild(welcomeMessage);
    },
    reset: () => {
        stats = {
            testsCompleted: 0,
            averageWPM: 0,
            averageAccuracy: 0,
            bestWPM: 0
        };
        addOutput('Statistics have been reset!', 'success');
    },
    exit: () => {
        if (isPlaying || mode === 'typing') {
            addOutput('Cannot exit while a test is in progress!', 'error');
            return;
        }
        addOutput('Goodbye!', 'info');
        setTimeout(() => {
            window.close();
        }, 1000);
    }
};

function handleCommand(command) {
    if (command.trim() === '') {
        addPrompt();
        return;
    }
    const cmd = command.trim().toLowerCase();
    if (commands[cmd]) {
        commands[cmd]();
    } else {
        addOutput(`Command not found: ${command}. Type 'help' for available commands.`, 'error');
    }
    if (mode === 'command') addPrompt();
}

function handleTyping(input) {
    // Always append the user's input as a new line
    addOutput(`Dev@Devtype.rushiraj.top:~$ ${input}`);
    // Start timer on first key if not already started
    if (!firstKeyTime) {
        firstKeyTime = startTime = Date.now();
    }
    // Evaluate typing
    const endTime = Date.now();
    const elapsedMs = endTime - firstKeyTime;
    const elapsedMin = elapsedMs / 1000 / 60;
    const elapsedSec = (elapsedMs / 1000).toFixed(2);
    totalChars = input.length;
    let correct = 0;
    let incorrect = 0;

    // --- Monkeytype-style word analysis ---
    const promptWords = currentText.trim().split(/\s+/);
    const inputWords = input.trim().split(/\s+/);
    let correctWords = 0;
    let incorrectWords = 0;
    for (let i = 0; i < inputWords.length; i++) {
        if (promptWords[i] && inputWords[i] === promptWords[i]) {
            correctWords++;
        } else {
            incorrectWords++;
        }
    }
    // Character stats
    for (let i = 0; i < input.length; i++) {
        if (input[i] === currentText[i]) correct++;
        else incorrect++;
    }
    correctChars = correct;
    // Raw WPM: all words typed per minute
    const rawWPM = elapsedMin > 0 ? Math.round(inputWords.length / elapsedMin) : 0;
    // WPM: correct words per minute
    const wpm = elapsedMin > 0 ? Math.round(correctWords / elapsedMin) : 0;
    // CPM: correct characters per minute
    const cpm = elapsedMin > 0 ? Math.round(correctChars / elapsedMin) : 0;
    // Accuracy: correct words / total words typed
    const accuracy = inputWords.length > 0 ? Math.round((correctWords / inputWords.length) * 100) : 0;
    addOutput(`\nTest completed!\n        Raw WPM: ${rawWPM}\n        WPM (after accuracy): ${wpm}\n        CPM: ${cpm}\n        Accuracy: ${accuracy}%\n        Time: ${elapsedSec} seconds\n        Words Typed: ${inputWords.length}\n        Correct Words: ${correctWords}\n        Incorrect Words: ${incorrectWords}\n        Total Characters: ${totalChars}\n        Correct Characters: ${correct}\n        Incorrect Characters: ${incorrect}`, 'success');
    stats.testsCompleted++;
    stats.averageWPM = (stats.averageWPM * (stats.testsCompleted - 1) + wpm) / stats.testsCompleted;
    stats.averageAccuracy = (stats.averageAccuracy * (stats.testsCompleted - 1) + accuracy) / stats.testsCompleted;
    stats.bestWPM = Math.max(stats.bestWPM, wpm);
    isPlaying = false;
    mode = 'yn';
    addOutput('\nWould you like to try another test? (y/n)', 'info');
    addPrompt();
}

function handleYN(input) {
    // Always append the user's input as a new line
    addOutput(`Dev@Devtype.rushiraj.top:~$ ${input}`);
    const ans = input.trim().toLowerCase();
    if (ans === 'y') {
        mode = 'command';
        commands.start();
    } else if (ans === 'n') {
        mode = 'command';
        addOutput('Test session ended.', 'info');
        addPrompt();
    } else {
        addOutput("Please type 'y' or 'n' only.", 'error');
        addPrompt();
    }
}

// Unified key handler for desktop
function handleKey(e) {
    if (!currentLine) return;
    if (e.key === 'Enter') {
        const input = currentInput;
        removePrompt();
        if (mode === 'command') {
            addOutput(`Dev@Devtype.rushiraj.top:~$ ${input}`);
            handleCommand(input);
        } else if (mode === 'typing') {
            handleTyping(input);
        } else if (mode === 'yn') {
            handleYN(input);
        }
        currentInput = '';
        e.preventDefault();
    } else if (e.key === 'Backspace') {
        if (currentInput.length > 0) {
            currentInput = currentInput.slice(0, -1);
            updatePrompt();
        }
        e.preventDefault();
    } else if (e.key.length === 1) {
        if (mode === 'typing' && !firstKeyTime) {
            firstKeyTime = Date.now();
        }
        currentInput += e.key;
        updatePrompt();
        e.preventDefault();
    }
}

// For mobile: handle input event (entire value)
function handleMobileInput(e) {
    if (!currentLine) return;
    currentInput = e.target.value;
    updatePrompt();
}

// For mobile: handle Enter key
function handleMobileKeydown(e) {
    if (e.key === 'Enter') {
        const input = currentInput;
        removePrompt();
        if (mode === 'command') {
            addOutput(`Dev@Devtype.rushiraj.top:~$ ${input}`);
            handleCommand(input);
        } else if (mode === 'typing') {
            handleTyping(input);
        } else if (mode === 'yn') {
            handleYN(input);
        }
        currentInput = '';
        mobileInput.value = '';
        e.preventDefault();
    }
}

// Attach the correct listeners
if (isMobile()) {
    terminalContent.addEventListener('click', () => {
        mobileInput.focus();
    });
    mobileInput.addEventListener('input', handleMobileInput);
    mobileInput.addEventListener('keydown', handleMobileKeydown);
} else {
    document.addEventListener('keydown', handleKey);
}

function updatePrompt() {
    if (!currentLine) return;
    const userInput = currentLine.querySelector('.user-input');
    if (userInput) userInput.textContent = currentInput;
}

// Initial load
addPrompt(); 