
const terminalArea = document.getElementById("terminal-area");

// ✅ Command handler object
const commands = {
  jutsus: () =>
    "🧾 Available Commands:\n- help\n- whoami\n- clear\n- version\n- pwd\n- ls\n- cd\n- man\n- cat\n- more\n- less\n- head\n- tail\n- nano\n- vim\n- echo\n- locate\n- whereis\n- which\n- find",
  whoami: () =>
    "show current user.",
  clear: () => "__CLEAR__",
  version: () => "🔖 LinJutsu v1.0.0",
  pwd: () => "printing the working directory you already in.",
  ls: () => "listing the files in the working directory",
  cd: () => "changing the working directory",
  man: () => "open manual pages",
  cat: () => "dispaly file contents",
  more: () => "scroll through text files",
  less: () => "scroll through text files",
  head: () => "show first lines of the file",
  tail: () => "show last lines of the file",
  nano: () => "text editor",
  vim: () => "text editor",
  echo: () => "write text through terminal or a file",
  locate: () => "tells you the location of every occurance of the word in the filesystem",
  whereis: () => "tels you the location of binaries, source files and man page",
  which: () => "tells you the location of binaries listed in PATH variables",
  find: () => "search for files and directories in a directory hierarchy based on various conditions like name, type, size, modification time, permissions, etc."

};

// ✅ Main command executor
function handleCommand(command) {
  const lower = command.trim().toLowerCase();
  if (commands[lower]) {
    return commands[lower]();
  } else if (lower === "") {
    return "";
  } else {
    return `⚠️ Unknown command: '${command}'\nType 'jutsus' to see available commands.`;
  }
}

// ✅ Utility to create a new prompt line
function createNewPrompt() {
  const line = document.createElement("div");
  line.className = "terminal-line";

  const prompt = document.createElement("span");
  prompt.className = "prompt";
  prompt.innerText = "linjutsu@dojo:~$";

  const input = document.createElement("input");
  input.type = "text";
  input.autofocus = true;

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const command = input.value.trim();

      // Freeze the current input
      const frozenLine = document.createElement("div");
      frozenLine.className = "terminal-line";
      frozenLine.innerHTML = `<span class="prompt">linjutsu@dojo:~$</span> ${command}`;
      terminalArea.removeChild(line);
      terminalArea.appendChild(frozenLine);

      const result = handleCommand(command);

      if (result === "__CLEAR__") {
        terminalArea.innerHTML = "";
        createNewPrompt();
        return;
      }

      const responseDiv = document.createElement("div");
      responseDiv.className = result.startsWith("⚠️") ? "output-error" : "output-success";
      responseDiv.innerText = result;
      terminalArea.appendChild(responseDiv);

      // Add next prompt
      createNewPrompt();
    }
  });

  line.appendChild(prompt);
  line.appendChild(input);
  terminalArea.appendChild(line);
  input.focus();
}

// ✅ Start the terminal on page load
window.onload = () => {
  createNewPrompt();
};
