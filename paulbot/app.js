/* ═══════════════════════════════════════════════════════════
   Python Academy — app.js
   Lesson engine + Pyodide integration + Robot bridge
   Fully self-contained: loads Pyodide dynamically
   ═══════════════════════════════════════════════════════════ */

// ─────────────────────────────────────────
//  LESSON DATA — Week 1: Hello, Python
// ─────────────────────────────────────────
const WEEK_1_LESSONS = [
  {
    id: 1,
    title: "📡 First Transmission",
    filename: "mission_01.py",
    body: `
      <p>Every space mission starts with a simple radio check. Before NASA launches a rocket, they send a test signal to confirm <strong>everything is working</strong>.</p>
      <p>In Python, your first "radio check" is the <code>print()</code> function. It sends a message to your console — Mission Control's communication screen.</p>
      <div class="concept-card">
        <h3>🧠 New Concept: print()</h3>
        <p><code>print()</code> displays whatever you put inside the parentheses. Text goes in quotes: <code>print("Hello!")</code></p>
      </div>
      <div class="mission-briefing">
        <h3>🚀 Mission Briefing</h3>
        <p>Run the code below to send your first transmission. Then <strong>change the message</strong> to something of your own — a greeting, a joke, a secret code. Make it yours!</p>
        <p>Hit the green <strong>Run</strong> button or press <strong>Ctrl+Enter</strong>.</p>
      </div>
    `,
    starter: `# Your first Python transmission!\n# Try changing the message to something fun!\nprint("Hello, Mission Control!")`,
    validate: (output) => {
      const lines = output.trim().split('\n').filter(l => !l.startsWith('[Robot]') && !l.startsWith('  [Sim]') && !l.startsWith('▸') && l.trim().length > 0);
      return lines.length >= 1;
    },
    validateMessage: 'Make sure your code has a <code>print()</code> statement that outputs something!',
    success: "Transmission received! You just ran real Python code. 🛰️",
    hint: `Click <strong>▶ Run</strong> — the code is ready. Then try changing <code>"Hello, Mission Control!"</code> to your own message!`,
    solutionCode: `# One possible solution:\nprint("Hello, Mission Control!")\n\n# But you could also try:\nprint("Houston, we have Python!")\nprint("Greetings from orbit!")`,
    reflection: [
      "What happened when you changed the text inside the quotes?",
      "What do you think would happen if you removed the quotes?",
    ],
  },
  {
    id: 2,
    title: "🏷️ Mission Profile",
    filename: "mission_02.py",
    body: `
      <p>Every astronaut has a callsign — a short name used on the radio. <strong>Neil Armstrong</strong> was "Commander." In Python, we store information using <strong>variables</strong>.</p>
      <p>A variable is like a labeled container — you put a value in and use the label to get it back later.</p>
      <div class="concept-card">
        <h3>🧠 New Concept: Variables & Data Types</h3>
        <p><code>name = "Apollo"</code> stores text (a <strong>string</strong>).<br>
        <code>battery = 85</code> stores a whole number (<strong>integer</strong>).<br>
        <code>temp = 72.5</code> stores a decimal (<strong>float</strong>).<br>
        <code>ready = True</code> stores yes/no (<strong>boolean</strong>).</p>
      </div>
      <div class="mission-briefing">
        <h3>🚀 Mission Briefing: "Mission Profile"</h3>
        <p>Create a <strong>Mission Profile</strong> for your robot! Store its name, battery level, and mission status in variables, then print a formatted report. Make all the values your own!</p>
      </div>
    `,
    starter: `# Build your robot's mission profile!\nrobot_name = "YOUR_NAME"\nbattery = 85\nmission = "YOUR_MISSION"\nready = True\n\nprint("═══ MISSION PROFILE ═══")\nprint("Robot: " + robot_name)\nprint("Battery: " + str(battery) + "%")\nprint("Mission: " + mission)\nprint("Status: " + str(ready))\nprint("═══════════════════════")`,
    validate: (output) => {
      const lines = output.trim().split('\n');
      return lines.some(l => l.includes('Robot:') && !l.includes('YOUR_NAME')) &&
             lines.some(l => l.includes('Mission:') && !l.includes('YOUR_MISSION'));
    },
    validateMessage: 'Replace <code>YOUR_NAME</code> and <code>YOUR_MISSION</code> with your own values!',
    success: "Mission profile filed! Variables are your data containers. 📋",
    hint: `Replace <code>"YOUR_NAME"</code> with a robot name like <code>"Bolt"</code>. Replace <code>"YOUR_MISSION"</code> with something like <code>"Explore Mars"</code>. You can change battery too!`,
    solutionCode: `robot_name = "Bolt"\nbattery = 92\nmission = "Explore the asteroid belt"\nready = True\n\nprint("═══ MISSION PROFILE ═══")\nprint("Robot: " + robot_name)\nprint("Battery: " + str(battery) + "%")\nprint("Mission: " + mission)\nprint("Status: " + str(ready))\nprint("═══════════════════════")`,
    reflection: [
      "What did you choose for your robot's name and why?",
      "What happens if you change battery to a decimal like 85.5?",
      "How is a string different from an integer?",
    ],
  },
  {
    id: 3,
    title: "✉️ f-String Transmissions",
    filename: "mission_03.py",
    body: `
      <p>Real mission logs combine data from many sources. Python has a powerful tool called <strong>f-strings</strong> (formatted strings).</p>
      <p>Instead of messy <code>+</code> concatenation, put an <code>f</code> before your quotes and use <code>{curly braces}</code> to insert variables.</p>
      <div class="concept-card">
        <h3>🧠 New Concept: f-strings & Math</h3>
        <p><code>f"Hello, {name}!"</code> inserts the value of <code>name</code>.<br>
        You can do math inside too: <code>f"Double: {x * 2}"</code></p>
      </div>
      <div class="mission-briefing">
        <h3>🚀 Mission Briefing: "Control Dashboard"</h3>
        <p>Build a <strong>Mission Control Dashboard</strong> using f-strings! Create variables for your robot's stats, calculate estimated runtime from battery, and display a beautiful formatted report.</p>
      </div>
    `,
    starter: `# Mission Control Dashboard — use f-strings!\npilot = "YOUR_NAME"\nrobot_name = "YOUR_ROBOT"\nbattery = 85\nspeed = 3.5\n\nhours = battery / 10\n\nprint(f"╔══════════════════════════╗")\nprint(f"║   MISSION CONTROL DASH   ║")\nprint(f"╠══════════════════════════╣")\nprint(f"║ Pilot:    {pilot}")\nprint(f"║ Robot:    {robot_name}")\nprint(f"║ Battery:  {battery}%")\nprint(f"║ Speed:    {speed} m/s")\nprint(f"║ Runtime:  {hours} hours")\nprint(f"╚══════════════════════════╝")`,
    validate: (output) => {
      return output.includes('Pilot:') && !output.includes('YOUR_NAME') &&
             output.includes('Robot:') && !output.includes('YOUR_ROBOT') &&
             output.includes('Runtime:');
    },
    validateMessage: 'Fill in your own values for <code>pilot</code> and <code>robot_name</code>!',
    success: "Dashboard online! f-strings make formatting a breeze. 🖥️",
    hint: `Replace <code>"YOUR_NAME"</code> and <code>"YOUR_ROBOT"</code>. The f-string <code>f"Battery: {battery}%"</code> auto-inserts the number. Try adding more stats!`,
    solutionCode: `pilot = "Alex"\nrobot_name = "Comet"\nbattery = 92\nspeed = 4.2\nhours = battery / 10\n\nprint(f"╔══════════════════════════╗")\nprint(f"║   MISSION CONTROL DASH   ║")\nprint(f"╠══════════════════════════╣")\nprint(f"║ Pilot:    {pilot}")\nprint(f"║ Robot:    {robot_name}")\nprint(f"║ Battery:  {battery}%")\nprint(f"║ Speed:    {speed} m/s")\nprint(f"║ Runtime:  {hours} hours")\nprint(f"╚══════════════════════════╝")`,
    reflection: [
      "How are f-strings easier than using + to join strings?",
      "What happened when you put math inside {}?",
    ],
  },
  {
    id: 4,
    title: "🤖 First Contact",
    filename: "mission_04.py",
    body: `
      <p>This is it — <strong>the moment your code talks to a real machine.</strong></p>
      <p>Everything you've learned — <code>print()</code>, variables, f-strings — comes together. Now you'll send commands to your robot dog.</p>
      <div class="concept-card">
        <h3>🧠 New Concept: Importing Modules</h3>
        <p><code>from robot import Dog</code> loads the robot module.<br>
        <code>my_dog = Dog("name")</code> creates a robot connection.<br>
        Think of it like tuning a radio to the right frequency.</p>
      </div>
      <div class="mission-briefing">
        <h3>🚀 Mission Briefing: "First Contact"</h3>
        <p>Give your robot a name and make it <strong>introduce itself</strong>! Use <code>my_dog.say()</code> to speak and <code>my_dog.set_face()</code> for an expression. Print a log to the console too!</p>
        <p>Faces: <code>happy</code>, <code>curious</code>, <code>excited</code>, <code>sleepy</code>, <code>silly</code></p>
      </div>
      <p>💡 <strong>No robot?</strong> That's OK — simulation mode shows what the robot <em>would</em> do.</p>
    `,
    starter: `# 🤖 First Contact — Make your robot introduce itself!\nfrom robot import Dog\n\nmy_dog = Dog("Spark")\nmy_dog.set_face("happy")\nmy_dog.say("Hello! My name is " + my_dog.name)\n\nprint(f"{my_dog.name} is online and ready!")`,
    validate: (output) => output.includes('[Robot]') && output.includes('say:'),
    success: "Your robot responded! Software meets hardware. 🌉",
    hint: `Change <code>"Spark"</code> to any name. Try faces like <code>"curious"</code> or <code>"silly"</code>. Make the robot say something unique!`,
    solutionCode: `from robot import Dog\n\nmy_dog = Dog("Nova")\nmy_dog.set_face("excited")\nmy_dog.say(f"Hello! I'm {my_dog.name}!")\nmy_dog.say("Ready for my first mission!")\nmy_dog.wave()\nprint(f"✅ {my_dog.name} is operational.")`,
    reflection: [
      "How is my_dog.say() different from print()?",
      "What would happen if you forgot quotes around the face name?",
    ],
  },
  {
    id: 5,
    title: "💃 Dance Routine",
    filename: "mission_05.py",
    body: `
      <p>Robots follow <strong>sequences of commands</strong> — instructions executed one after another, top to bottom. Let's make a longer, more expressive sequence!</p>
      <div class="concept-card">
        <h3>🧠 Key Idea: Sequences & Chaining</h3>
        <p>Python runs code <strong>line by line</strong>. Each command happens in order — like choreographing a dance!</p>
        <div class="expected-output">my_dog.say("text")        — speak<br>my_dog.set_face("name")   — change face<br>my_dog.wave()             — wave<br>my_dog.sit() / .stand()   — sit/stand<br>my_dog.stretch()          — stretch<br>my_dog.play_sound("beep") — sound</div>
      </div>
      <div class="mission-briefing">
        <h3>🚀 Mission Briefing: "Dance Routine"</h3>
        <p>Choreograph a dance for your robot with at least <strong>5 different actions</strong>! Tell a story — maybe it wakes up, stretches, greets the audience, dances, and takes a bow?</p>
      </div>
    `,
    starter: `# 💃 Dance Routine — choreograph your robot!\nfrom robot import Dog\n\nmy_dog = Dog("YOUR_NAME")\n\n# Write your dance routine below!\n# Use at least 5 different commands.\n# Tell a story with your robot's moves!\n\n`,
    validate: (output) => (output.match(/\[Robot\]/g) || []).length >= 5,
    validateMessage: 'Your robot needs at least <strong>5 actions</strong>! Combine say, set_face, wave, sit, stand, stretch, play_sound.',
    success: "What a performance! Your sequencing skills are on point! 🕺",
    hint: `Try:<br><code>my_dog.set_face("sleepy")</code><br><code>my_dog.say("*yawn* Good morning!")</code><br><code>my_dog.stretch()</code><br><code>my_dog.set_face("excited")</code><br><code>my_dog.say("Let's dance!")</code><br><code>my_dog.wave()</code>`,
    solutionCode: `from robot import Dog\n\nmy_dog = Dog("Ziggy")\nmy_dog.set_face("sleepy")\nmy_dog.say("*yawn* Good morning!")\nmy_dog.stretch()\nmy_dog.set_face("excited")\nmy_dog.say("Time to dance!")\nmy_dog.play_sound("happy")\nmy_dog.wave()\nmy_dog.sit()\nmy_dog.stand()\nmy_dog.set_face("happy")\nmy_dog.say("Thank you!")\nmy_dog.wave()\nprint(f"🎵 {my_dog.name}'s routine complete!")`,
    reflection: [
      "What story did your dance routine tell?",
      "What happens if you change the order of commands?",
      "How would you make the robot repeat part of the dance?",
    ],
  },
  {
    id: 6,
    title: "🏆 Final Mission: Custom Intro",
    filename: "challenge_01.py",
    body: `
      <p>You've mastered <code>print()</code>, variables, f-strings, and robot commands. Now put it <strong>all</strong> together!</p>
      <div class="mission-briefing challenge">
        <h3>🏆 Final Mission Challenge</h3>
        <ol>
          <li>Create a robot with a <strong>custom name</strong></li>
          <li>Use <strong>variables</strong> to store at least 3 pieces of data</li>
          <li>Robot <strong>says at least 2 things</strong></li>
          <li>At least <strong>2 different actions</strong> (wave, sit, stretch, etc.)</li>
          <li>Print a <strong>formatted mission log</strong> with f-strings</li>
        </ol>
        <p>No single right answer — be creative! This is YOUR robot.</p>
      </div>
      <p>💡 Available commands:</p>
      <div class="expected-output">my_dog.say("text")        — speak<br>my_dog.set_face("name")   — face<br>my_dog.wave()             — wave<br>my_dog.sit() / .stand()   — sit/stand<br>my_dog.stretch()          — stretch<br>my_dog.play_sound("beep") — sound<br>my_dog.move_forward(2)    — walk<br>my_dog.name               — get name</div>
    `,
    starter: `# 🏆 Final Mission: Build your robot's complete intro!\nfrom robot import Dog\n\nmy_dog = Dog("YOUR_NAME_HERE")\nbattery = 100\nmission = "YOUR_MISSION"\n\n# Your program here!\n# 1. Custom name  2. 3+ variables  3. Say 2+ things\n# 4. 2+ actions   5. f-string mission log\n`,
    validate: (output) => {
      const says = (output.match(/\[Robot\].*say:/g) || []).length;
      const acts = (output.match(/\[Robot\]/g) || []).length;
      const hasPrint = output.split('\n').some(l =>
        !l.trim().startsWith('[Robot]') && !l.trim().startsWith('[Sim]') &&
        !l.trim().startsWith('▸') && l.trim().length > 0);
      return says >= 2 && acts >= 4 && hasPrint;
    },
    validateMessage: 'Robot must say <strong>2+ things</strong>, do <strong>2+ actions</strong>, and <code>print()</code> a log!',
    success: "Week 1 COMPLETE! You've earned your Python Pioneer badge! 🎖️🐍",
    hint: `Structure:<br><code>my_dog.set_face("excited")</code><br><code>my_dog.say(f"I'm {my_dog.name}!")</code><br><code>my_dog.say("Ready for action!")</code><br><code>my_dog.wave()</code><br><code>my_dog.stretch()</code><br><code>print(f"Log: {my_dog.name}, battery: {battery}%")</code>`,
    solutionCode: `from robot import Dog\n\nmy_dog = Dog("Phoenix")\nbattery = 98\nmission = "Deep Space Exploration"\n\nmy_dog.set_face("excited")\nmy_dog.say(f"Hello! I'm {my_dog.name}!")\nmy_dog.say(f"My mission: {mission}")\nmy_dog.wave()\nmy_dog.stretch()\n\nprint(f"╔════════════════════════╗")\nprint(f"║    MISSION LOG         ║")\nprint(f"║ Robot:   {my_dog.name}")\nprint(f"║ Battery: {battery}%")\nprint(f"║ Mission: {mission}")\nprint(f"╚════════════════════════╝")`,
    reflection: [
      "What makes your robot unique?",
      "Which Python concept was hardest? Easiest?",
      "If you could add one more robot command, what would it be?",
    ],
    isChallenge: true,
  },
];



// ─────────────────────────────────────────
//  ROBOT BRIDGE
//  Intercepts Python robot commands → HTTP
// ─────────────────────────────────────────
const RobotBridge = {
  ip: null,
  connected: false,
  simulationMode: true,

  connect(ip) {
    this.ip = ip;
    return this._checkConnection();
  },

  async _checkConnection() {
    if (!this.ip) return false;
    try {
      const ctrl = new AbortController();
      const timeout = setTimeout(() => ctrl.abort(), 2000);
      const res = await fetch(`http://${this.ip}/status`, { signal: ctrl.signal });
      clearTimeout(timeout);
      if (res.ok) {
        this.connected = true;
        this.simulationMode = false;
        this._updateStatusUI(true);
        return true;
      }
    } catch (e) { /* Robot not reachable */ }
    this.connected = false;
    this.simulationMode = true;
    this._updateStatusUI(false);
    return false;
  },

  async sendCommand(endpoint, params = {}) {
    if (this.simulationMode) return { simulated: true };
    try {
      const url = new URL(`http://${this.ip}/${endpoint}`);
      Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
      const res = await fetch(url.toString(), { method: 'GET' });
      return await res.json().catch(() => ({ ok: true }));
    } catch (e) {
      return { error: e.message };
    }
  },

  say(text) {
    appendConsole(`[Robot] 🔊 say: "${text}"`, 'robot-msg');
    if (!this.simulationMode) {
      this.sendCommand('say', { text });
    } else {
      appendConsole(`  [Sim] Would send voice command to robot`, 'robot-msg');
    }
  },

  setFace(face) {
    appendConsole(`[Robot] 😊 set_face: "${face}"`, 'robot-msg');
    if (!this.simulationMode) {
      this.sendCommand('face', { name: face });
    } else {
      appendConsole(`  [Sim] Would change robot face to "${face}"`, 'robot-msg');
    }
  },

  wave() {
    appendConsole(`[Robot] 🐾 wave!`, 'robot-msg');
    if (!this.simulationMode) {
      this.sendCommand('wave');
    } else {
      appendConsole(`  [Sim] Would make robot wave`, 'robot-msg');
    }
  },

  moveForward(steps = 1) {
    appendConsole(`[Robot] 🦿 move_forward(${steps})`, 'robot-msg');
    if (!this.simulationMode) {
      this.sendCommand('move', { direction: 'forward', steps });
    } else {
      appendConsole(`  [Sim] Would move forward ${steps} step(s)`, 'robot-msg');
    }
  },

  moveBackward(steps = 1) {
    appendConsole(`[Robot] 🦿 move_backward(${steps})`, 'robot-msg');
    if (!this.simulationMode) {
      this.sendCommand('move', { direction: 'backward', steps });
    } else {
      appendConsole(`  [Sim] Would move backward ${steps} step(s)`, 'robot-msg');
    }
  },

  turnLeft() {
    appendConsole(`[Robot] ↰ turn_left()`, 'robot-msg');
    if (!this.simulationMode) {
      this.sendCommand('turn', { direction: 'left' });
    } else {
      appendConsole(`  [Sim] Would turn left 90°`, 'robot-msg');
    }
  },

  turnRight() {
    appendConsole(`[Robot] ↱ turn_right()`, 'robot-msg');
    if (!this.simulationMode) {
      this.sendCommand('turn', { direction: 'right' });
    } else {
      appendConsole(`  [Sim] Would turn right 90°`, 'robot-msg');
    }
  },

  sit() {
    appendConsole(`[Robot] 🐕 sit()`, 'robot-msg');
    if (!this.simulationMode) {
      this.sendCommand('sit');
    } else {
      appendConsole(`  [Sim] Would make robot sit down`, 'robot-msg');
    }
  },

  stand() {
    appendConsole(`[Robot] 🐕‍🦺 stand()`, 'robot-msg');
    if (!this.simulationMode) {
      this.sendCommand('stand');
    } else {
      appendConsole(`  [Sim] Would make robot stand up`, 'robot-msg');
    }
  },

  stretch() {
    appendConsole(`[Robot] 🐾 stretch()`, 'robot-msg');
    if (!this.simulationMode) {
      this.sendCommand('stretch');
    } else {
      appendConsole(`  [Sim] Would make robot stretch`, 'robot-msg');
    }
  },

  playSound(name) {
    appendConsole(`[Robot] 🔔 play_sound("${name}")`, 'robot-msg');
    if (!this.simulationMode) {
      this.sendCommand('sound', { name });
    } else {
      appendConsole(`  [Sim] Would play sound: "${name}"`, 'robot-msg');
    }
  },

  _updateStatusUI(isConnected) {
    const dot = document.querySelector('.status-robot-dot');
    const text = document.querySelector('.status-robot-text');
    if (!dot || !text) return;
    if (isConnected) {
      dot.className = 'status-robot-dot connected';
      text.textContent = `Robot: ${this.ip}`;
    } else {
      dot.className = 'status-robot-dot disconnected';
      text.textContent = 'Robot: Simulation mode';
    }
  }
};


// ─────────────────────────────────────────
//  PYODIDE LOADER — Dynamic, with retries
// ─────────────────────────────────────────
const PYODIDE_CDNS = [
  "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
  "https://pyodide-cdn2.iodide.io/v0.25.0/full/",
];

let pyodide = null;
let pyodideReady = false;
let pyodideLoading = false;       // prevents double-init
let pendingRunResolve = null;      // queued run while loading

/** Inject the Pyodide <script> tag and wait for it to define loadPyodide */
function loadPyodideScript(baseURL) {
  return new Promise((resolve, reject) => {
    // Remove any previous attempt
    const old = document.getElementById('pyodide-script');
    if (old) old.remove();

    const script = document.createElement('script');
    script.id = 'pyodide-script';
    script.src = baseURL + 'pyodide.js';
    script.onload = () => {
      if (typeof loadPyodide === 'function') resolve(baseURL);
      else reject(new Error('pyodide.js loaded but loadPyodide not found'));
    };
    script.onerror = () => reject(new Error(`Failed to fetch ${script.src}`));
    document.head.appendChild(script);
  });
}

/** Main init: try CDNs, set up bridge, hide overlay when ready */
async function initPyodide() {
  if (pyodideLoading || pyodideReady) return;
  pyodideLoading = true;

  const bar = document.getElementById('loading-bar');
  const status = document.getElementById('loading-status');
  const overlay = document.getElementById('loading-overlay');
  const runBtn = document.getElementById('btn-run');

  // Disable Run while loading
  runBtn.classList.add('loading');
  runBtn.setAttribute('disabled', 'true');

  let usedCDN = null;

  // ── Step 1: Load the Pyodide script from a CDN ──
  for (const cdn of PYODIDE_CDNS) {
    try {
      bar.style.width = '10%';
      status.textContent = 'Downloading Python runtime…';
      console.log('[PyAcademy] Trying CDN:', cdn);
      usedCDN = await loadPyodideScript(cdn);
      console.log('[PyAcademy] Script loaded from', cdn);
      break;
    } catch (e) {
      console.warn('[PyAcademy] CDN failed:', cdn, e.message);
    }
  }

  if (!usedCDN) {
    showLoadError('Could not download the Python runtime. Check your internet connection.', bar, status, overlay);
    pyodideLoading = false;
    return;
  }

  // ── Step 2: Initialize Pyodide ──
  try {
    bar.style.width = '30%';
    status.textContent = 'Initializing Python engine…';

    pyodide = await loadPyodide({ indexURL: usedCDN });

    bar.style.width = '65%';
    status.textContent = 'Setting up robot bridge…';

    // Register JS bridge so Python can call our robot methods
    pyodide.registerJsModule("_robot_bridge", {
      say:            (text)  => RobotBridge.say(text),
      set_face:       (face)  => RobotBridge.setFace(face),
      wave:           ()      => RobotBridge.wave(),
      move_forward:   (steps) => RobotBridge.moveForward(steps),
      move_backward:  (steps) => RobotBridge.moveBackward(steps),
      turn_left:      ()      => RobotBridge.turnLeft(),
      turn_right:     ()      => RobotBridge.turnRight(),
      sit:            ()      => RobotBridge.sit(),
      stand:          ()      => RobotBridge.stand(),
      stretch:        ()      => RobotBridge.stretch(),
      play_sound:     (name)  => RobotBridge.playSound(name),
      get_connected:  ()      => RobotBridge.connected,
    });

    bar.style.width = '80%';
    status.textContent = 'Installing robot module…';

    // Write the `robot` package into Pyodide's virtual filesystem
    const robotModuleCode = [
      '"""',
      'robot.py — Your robot control module.',
      'This module lets you control your robot dog from Python.',
      '"""',
      'import _robot_bridge',
      '',
      'class Dog:',
      '    """Your robot dog! Create one with: my_dog = Dog(\\"name\\")"""',
      '    ',
      '    def __init__(self, name="Robot"):',
      '        self.name = name',
      '        self._action_log = []',
      '        print(f"[Robot] \\U0001f916 Connected to robot: {name}")',
      '    ',
      '    def say(self, text):',
      '        """Make the robot speak. Example: my_dog.say(\'Hello!\')"""',
      '        self._action_log.append(f"say: {text}")',
      '        _robot_bridge.say(str(text))',
      '    ',
      '    def set_face(self, face):',
      '        """Change the robot\'s face. Options: happy, curious, sleepy, excited, silly"""',
      '        self._action_log.append(f"set_face: {face}")',
      '        _robot_bridge.set_face(str(face))',
      '    ',
      '    def wave(self):',
      '        """Make the robot wave its paw!"""',
      '        self._action_log.append("wave")',
      '        _robot_bridge.wave()',
      '    ',
      '    def move_forward(self, steps=1):',
      '        """Move the robot forward. Example: my_dog.move_forward(3)"""',
      '        self._action_log.append(f"move_forward: {steps}")',
      '        _robot_bridge.move_forward(int(steps))',
      '    ',
      '    def move_backward(self, steps=1):',
      '        """Move the robot backward. Example: my_dog.move_backward(2)"""',
      '        self._action_log.append(f"move_backward: {steps}")',
      '        _robot_bridge.move_backward(int(steps))',
      '    ',
      '    def turn_left(self):',
      '        """Turn the robot 90° left."""',
      '        self._action_log.append("turn_left")',
      '        _robot_bridge.turn_left()',
      '    ',
      '    def turn_right(self):',
      '        """Turn the robot 90° right."""',
      '        self._action_log.append("turn_right")',
      '        _robot_bridge.turn_right()',
      '    ',
      '    def sit(self):',
      '        """Make the robot sit down."""',
      '        self._action_log.append("sit")',
      '        _robot_bridge.sit()',
      '    ',
      '    def stand(self):',
      '        """Make the robot stand up."""',
      '        self._action_log.append("stand")',
      '        _robot_bridge.stand()',
      '    ',
      '    def stretch(self):',
      '        """Make the robot do a stretch!"""',
      '        self._action_log.append("stretch")',
      '        _robot_bridge.stretch()',
      '    ',
      '    def play_sound(self, name):',
      '        """Play a sound. Options: beep, bark, happy, alert"""',
      '        self._action_log.append(f"play_sound: {name}")',
      '        _robot_bridge.play_sound(str(name))',
      '    ',
      '    def get_log(self):',
      '        """Return a list of all actions performed."""',
      '        return list(self._action_log)',
      '    ',
      '    def __repr__(self):',
      '        return f"Dog(name=\'{self.name}\')"',
    ].join('\n');

    pyodide.FS.writeFile("/home/pyodide/robot.py", robotModuleCode, { encoding: "utf8" });

    bar.style.width = '92%';
    status.textContent = 'Running self-check…';

    // Self-test: make sure import works
    await pyodide.runPythonAsync('import robot');

    // ── Done! ──
    bar.style.width = '100%';
    status.textContent = 'All systems go! ✓';
    pyodideReady = true;
    pyodideLoading = false;

    // Enable Run button
    runBtn.removeAttribute('disabled');
    runBtn.classList.remove('loading');

    // Update console
    appendConsole('▸ Python 3.11 (Pyodide) — Ready ✓', 'stdout');

    // Smooth hide
    setTimeout(() => overlay.classList.add('hidden'), 600);

    // If someone tried to run while we were loading, run now
    if (pendingRunResolve) {
      const fn = pendingRunResolve;
      pendingRunResolve = null;
      fn();
    }

  } catch (err) {
    console.error('[PyAcademy] Pyodide init error:', err);
    showLoadError(`Python engine error: ${err.message}`, bar, status, overlay);
    pyodideLoading = false;
  }
}

function showLoadError(message, bar, status, overlay) {
  bar.style.width = '100%';
  bar.style.background = '#f87171';
  status.textContent = message;

  // Add retry button if not already there
  if (!document.getElementById('retry-btn')) {
    const retryBtn = document.createElement('button');
    retryBtn.id = 'retry-btn';
    retryBtn.textContent = '🔄 Retry';
    retryBtn.style.cssText = 'margin-top:16px; padding:10px 24px; font-weight:600; font-size:0.9rem; border-radius:8px; background:rgba(255,255,255,0.1); color:#e8ecf4; border:1px solid rgba(255,255,255,0.15); cursor:pointer;';
    retryBtn.addEventListener('click', () => {
      retryBtn.remove();
      bar.style.background = '';
      bar.style.width = '0%';
      status.textContent = 'Retrying…';
      overlay.classList.remove('hidden');
      pyodideLoading = false;
      pyodideReady = false;
      pyodide = null;
      initPyodide();
    });
    document.querySelector('.loading-content').appendChild(retryBtn);
  }
}


// ─────────────────────────────────────────
//  PYTHON RUNNER
// ─────────────────────────────────────────
async function runPython(code) {
  // If Pyodide is still loading, wait for it (up to 30s)
  if (!pyodideReady && pyodideLoading) {
    appendConsole('⏳ Python is still loading, please wait…', 'stdout');
    await new Promise((resolve) => {
      pendingRunResolve = resolve;
      // Timeout safety net
      setTimeout(() => {
        if (pendingRunResolve === resolve) {
          pendingRunResolve = null;
          resolve();
        }
      }, 30000);
    });
  }

  if (!pyodideReady) {
    appendConsole('⚠ Python engine failed to load. Click Retry in the loading screen or refresh the page.', 'stderr');
    return '';
  }

  let output = '';

  // Capture stdout / stderr
  pyodide.setStdout({
    batched: (text) => {
      output += text + '\n';
      appendConsole(text, 'stdout');
    }
  });
  pyodide.setStderr({
    batched: (text) => {
      output += text + '\n';
      appendConsole(text, 'stderr');
    }
  });

  try {
    await pyodide.runPythonAsync(code);
  } catch (err) {
    const rawMsg = err.message || String(err);
    // Clean up the traceback to show only the Python-relevant parts
    const lines = rawMsg.split('\n');
    const cleanLines = [];
    let inTraceback = false;
    for (const line of lines) {
      if (line.startsWith('Traceback')) { inTraceback = true; cleanLines.push(line); continue; }
      if (inTraceback) {
        // Skip pyodide/wasm internal frames
        if (line.includes('/lib/python') || line.includes('pyodide') || line.includes('wasm')) continue;
        cleanLines.push(line);
      } else {
        cleanLines.push(line);
      }
    }
    const cleanMsg = cleanLines.join('\n').trim() || rawMsg;
    output += cleanMsg + '\n';
    appendConsole(cleanMsg, 'stderr');
  }

  return output;
}


// ─────────────────────────────────────────
//  CONSOLE
// ─────────────────────────────────────────
function getConsoleEl() {
  return document.getElementById('console-output');
}

function appendConsole(text, className = 'stdout') {
  const el = getConsoleEl();
  if (!el) return;
  const line = document.createElement('div');
  line.className = `console-line ${className}`;
  line.textContent = text;
  el.appendChild(line);
  el.scrollTop = el.scrollHeight;
}

function clearConsole() {
  const el = getConsoleEl();
  if (el) el.innerHTML = '';
}


// ─────────────────────────────────────────
//  CODE EDITOR (CodeMirror)
// ─────────────────────────────────────────
let editor = null;

function initEditor() {
  const container = document.getElementById('editor-container');
  if (!container) return;

  editor = CodeMirror(container, {
    value: '',
    mode: 'python',
    theme: 'material-darker',
    lineNumbers: true,
    indentUnit: 4,
    tabSize: 4,
    indentWithTabs: false,
    matchBrackets: true,
    autoCloseBrackets: true,
    lineWrapping: true,
    styleActiveLine: true,
    viewportMargin: Infinity,
    extraKeys: {
      'Ctrl-Enter': () => handleRun(),
      'Cmd-Enter': () => handleRun(),
      'Tab': (cm) => {
        if (cm.somethingSelected()) cm.indentSelection('add');
        else cm.replaceSelection('    ', 'end');
      }
    }
  });
}


// ─────────────────────────────────────────
//  LESSON ENGINE
// ─────────────────────────────────────────
let currentExercise = 0;
let exerciseCompleted = new Array(WEEK_1_LESSONS.length).fill(false);
const STORAGE_KEY = 'pythonAcademy_week1_progress';

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && Array.isArray(saved.completed)) {
      exerciseCompleted = saved.completed;
      currentExercise = saved.currentExercise || 0;
      if (currentExercise >= WEEK_1_LESSONS.length) currentExercise = WEEK_1_LESSONS.length - 1;
    }
  } catch (e) { /* ignore corrupt data */ }
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      completed: exerciseCompleted,
      currentExercise,
    }));
  } catch (e) { /* quota exceeded — not critical */ }
}

function renderProgressDots() {
  const container = document.getElementById('nav-progress');
  if (!container) return;
  container.innerHTML = '';
  WEEK_1_LESSONS.forEach((lesson, i) => {
    const dot = document.createElement('div');
    dot.className = 'progress-dot';
    if (exerciseCompleted[i]) dot.classList.add('completed');
    if (i === currentExercise) dot.classList.add('active');
    dot.title = `Exercise ${i + 1}: ${lesson.title}`;
    dot.addEventListener('click', () => {
      if (i <= currentExercise || exerciseCompleted[i]) navigateTo(i);
    });
    container.appendChild(dot);
  });
}

function navigateTo(index) {
  currentExercise = index;
  renderExercise();
  saveProgress();
}

function renderExercise() {
  const lesson = WEEK_1_LESSONS[currentExercise];
  if (!lesson || !editor) return;

  // Header — now says MISSION instead of EXERCISE
  const numEl = document.getElementById('exercise-number');
  const titleEl = document.getElementById('exercise-title');
  if (numEl) numEl.textContent = `MISSION ${lesson.id} of ${WEEK_1_LESSONS.length}`;
  if (titleEl) titleEl.textContent = lesson.title;

  // Body
  const bodyEl = document.getElementById('exercise-body');
  if (bodyEl) bodyEl.innerHTML = lesson.body;

  // Editor
  editor.setValue(lesson.starter);
  const tabName = document.getElementById('editor-tab-name');
  if (tabName) tabName.textContent = lesson.filename;

  // Delay focus so CodeMirror renders properly
  requestAnimationFrame(() => {
    editor.refresh();
    editor.focus();
    editor.setCursor(editor.lineCount(), 0);
  });

  // Hint
  const hintSection = document.getElementById('hint-section');
  const hintContent = document.getElementById('hint-content');
  const hintToggle = document.getElementById('hint-toggle');
  if (lesson.hint && hintSection) {
    hintSection.style.display = 'block';
    if (hintContent) { hintContent.style.display = 'none'; hintContent.innerHTML = lesson.hint; }
    if (hintToggle) hintToggle.innerHTML = '<span class="hint-icon">💡</span> Show Hint';
  } else if (hintSection) {
    hintSection.style.display = 'none';
  }

  // Solution tab
  const solutionSection = document.getElementById('solution-section');
  const solutionContent = document.getElementById('solution-content');
  const solutionToggle = document.getElementById('solution-toggle');
  if (lesson.solutionCode && solutionSection) {
    solutionSection.style.display = 'block';
    if (solutionContent) {
      solutionContent.style.display = 'none';
      solutionContent.textContent = lesson.solutionCode;
    }
    if (solutionToggle) solutionToggle.innerHTML = '<span class="solution-icon">📖</span> Show Solution';
  } else if (solutionSection) {
    solutionSection.style.display = 'none';
  }

  // Reflection prompts — hidden until success
  const reflectionSection = document.getElementById('reflection-section');
  if (reflectionSection) reflectionSection.style.display = 'none';

  // Reset success
  const successEl = document.getElementById('success-message');
  if (successEl) successEl.style.display = 'none';

  // Console
  clearConsole();
  if (pyodideReady) {
    appendConsole(`▸ Mission ${lesson.id}: ${lesson.title.replace(/^[^\s]+\s/, '')}`, 'stdout');
  } else {
    appendConsole('⏳ Python engine is loading…', 'stdout');
  }

  renderProgressDots();

  const scroll = document.getElementById('lesson-scroll');
  if (scroll) scroll.scrollTop = 0;
}


let isRunning = false;

async function handleRun() {
  if (isRunning) return; // prevent double-runs
  isRunning = true;

  const code = editor.getValue();
  const lesson = WEEK_1_LESSONS[currentExercise];
  const runBtn = document.getElementById('btn-run');

  // Visual feedback
  runBtn.classList.add('running');
  runBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2l10 6-10 6V2z" fill="currentColor"/></svg> Running…`;

  clearConsole();
  appendConsole('▸ Running…', 'stdout');

  const output = await runPython(code);

  // Reset button
  runBtn.classList.remove('running');
  runBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2l10 6-10 6V2z" fill="currentColor"/></svg> Run`;
  isRunning = false;

  // Don't validate if there was no output (engine error)
  if (!output && !pyodideReady) return;

  // Validate
  if (lesson.validate(output)) {
    exerciseCompleted[currentExercise] = true;
    saveProgress();
    renderProgressDots();

    appendConsole('', 'stdout');
    appendConsole('✅ ' + lesson.success, 'success');

    // Show success in lesson panel
    const successEl = document.getElementById('success-message');
    const successText = document.getElementById('success-text');
    if (successEl && successText) {
      successText.textContent = lesson.success;
      successEl.style.display = 'block';
    }

    // Show reflection prompts
    const reflectionSection = document.getElementById('reflection-section');
    const reflectionList = document.getElementById('reflection-list');
    if (lesson.reflection && reflectionSection && reflectionList) {
      reflectionList.innerHTML = lesson.reflection.map(q =>
        `<li>${q}</li>`
      ).join('');
      reflectionSection.style.display = 'block';
    }

    // Update next button label
    const nextBtn = document.getElementById('btn-next');
    if (nextBtn) {
      if (currentExercise < WEEK_1_LESSONS.length - 1) {
        nextBtn.innerHTML = 'Next Mission <span class="btn-arrow">→</span>';
      } else {
        nextBtn.innerHTML = 'Complete Week 1 <span class="btn-arrow">🎖️</span>';
      }
    }

    // Scroll lesson panel to success
    const lessonScroll = document.getElementById('lesson-scroll');
    if (lessonScroll) {
      setTimeout(() => lessonScroll.scrollTo({ top: lessonScroll.scrollHeight, behavior: 'smooth' }), 150);
    }

    // Confetti on challenges
    if (lesson.isChallenge || currentExercise === WEEK_1_LESSONS.length - 1) {
      fireConfetti();
    }

  } else if (lesson.validateMessage) {
    appendConsole('', 'stdout');
    const msgEl = document.createElement('div');
    msgEl.className = 'console-line error';
    msgEl.innerHTML = '⚠ ' + lesson.validateMessage;
    getConsoleEl().appendChild(msgEl);
  }
}


function handleNext() {
  if (currentExercise < WEEK_1_LESSONS.length - 1) {
    currentExercise++;
    saveProgress();
    renderExercise();
  } else {
    showWeekComplete();
  }
}

function handleReset() {
  const lesson = WEEK_1_LESSONS[currentExercise];
  if (!lesson || !editor) return;
  editor.setValue(lesson.starter);
  editor.focus();
}


// ─────────────────────────────────────────
//  WEEK COMPLETE SCREEN
// ─────────────────────────────────────────
function showWeekComplete() {
  const completedCount = exerciseCompleted.filter(Boolean).length;
  const overlay = document.createElement('div');
  overlay.className = 'week-complete-overlay';
  overlay.innerHTML = `
    <div class="week-complete-card">
      <div class="week-complete-badge">🎖️</div>
      <h1 class="week-complete-title">Week 1 Complete!</h1>
      <p class="week-complete-text">
        You've learned <strong>print()</strong>, <strong>variables</strong>, <strong>f-strings</strong>, and how to <strong>command your robot</strong> — all in Python.
        That's real programming. NASA would be proud.
      </p>
      <div class="week-complete-stats">
        <div class="week-complete-stat">
          <div class="week-complete-stat-num">${completedCount}</div>
          <div class="week-complete-stat-label">Exercises</div>
        </div>
        <div class="week-complete-stat">
          <div class="week-complete-stat-num">4</div>
          <div class="week-complete-stat-label">Concepts</div>
        </div>
        <div class="week-complete-stat">
          <div class="week-complete-stat-num">1</div>
          <div class="week-complete-stat-label">Robot Connected</div>
        </div>
      </div>
      <p class="week-complete-text" style="font-weight:600; color:var(--gold);">
        Week 2: Logic & Loops — Coming soon!
      </p>
      <button class="btn btn-next" onclick="this.closest('.week-complete-overlay').remove()">
        Review Exercises <span class="btn-arrow">←</span>
      </button>
    </div>
  `;
  document.body.appendChild(overlay);
  fireConfetti();
}


// ─────────────────────────────────────────
//  CONFETTI 🎉
// ─────────────────────────────────────────
function fireConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#22d1c3', '#f5c842', '#a78bfa', '#4ade80', '#f87171', '#60a5fa'];

  for (let i = 0; i < 120; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 100,
      vx: (Math.random() - 0.5) * 8,
      vy: -(Math.random() * 18 + 8),
      size: Math.random() * 8 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 12,
      gravity: 0.25,
      opacity: 1,
    });
  }

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    for (const p of particles) {
      p.x += p.vx;
      p.vy += p.gravity;
      p.y += p.vy;
      p.rotation += p.rotSpeed;
      p.opacity -= 0.008;
      if (p.opacity > 0) {
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * Math.PI / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.5);
        ctx.restore();
      }
    }
    frame++;
    if (alive && frame < 200) requestAnimationFrame(animate);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  animate();
}


// ─────────────────────────────────────────
//  RESIZE HANDLE
// ─────────────────────────────────────────
function initResize() {
  const handle = document.getElementById('resize-handle');
  const lessonPanel = document.getElementById('lesson-panel');
  if (!handle || !lessonPanel) return;
  let isDragging = false;

  handle.addEventListener('mousedown', (e) => {
    isDragging = true;
    handle.classList.add('dragging');
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const newWidth = e.clientX;
    const minW = 280, maxW = window.innerWidth * 0.6;
    if (newWidth >= minW && newWidth <= maxW) {
      lessonPanel.style.width = newWidth + 'px';
      if (editor) editor.refresh();
    }
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      handle.classList.remove('dragging');
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
  });
}


// ─────────────────────────────────────────
//  ROBOT CONNECTION MODAL
// ─────────────────────────────────────────
function initConnectionModal() {
  const overlay   = document.getElementById('modal-overlay');
  const ipInput   = document.getElementById('robot-ip');
  const connectBtn= document.getElementById('btn-do-connect');
  const skipBtn   = document.getElementById('btn-skip-connect');
  const closeBtn  = document.getElementById('modal-close');
  const openBtn   = document.getElementById('btn-connect-robot');
  if (!overlay || !openBtn) return;

  const closeModal = () => { overlay.style.display = 'none'; };

  openBtn.addEventListener('click', () => {
    overlay.style.display = 'flex';
    if (ipInput) { ipInput.value = RobotBridge.ip || ''; setTimeout(() => ipInput.focus(), 100); }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (skipBtn) skipBtn.addEventListener('click', () => {
    RobotBridge.simulationMode = true;
    RobotBridge._updateStatusUI(false);
    closeModal();
  });
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });

  if (connectBtn && ipInput) {
    connectBtn.addEventListener('click', async () => {
      const ip = ipInput.value.trim();
      if (!ip) return;

      connectBtn.textContent = 'Connecting…';
      connectBtn.disabled = true;

      const dot = document.querySelector('.status-robot-dot');
      if (dot) dot.className = 'status-robot-dot connecting';
      const txt = document.querySelector('.status-robot-text');
      if (txt) txt.textContent = `Connecting to ${ip}…`;

      const success = await RobotBridge.connect(ip);

      connectBtn.innerHTML = '<span class="btn-icon">📡</span> Connect';
      connectBtn.disabled = false;

      if (success) {
        closeModal();
        appendConsole(`[System] ✅ Connected to robot at ${ip}`, 'success');
      } else {
        if (ipInput) { ipInput.style.borderColor = 'var(--red)'; setTimeout(() => { ipInput.style.borderColor = ''; }, 2000); }
        RobotBridge.simulationMode = true;
        RobotBridge._updateStatusUI(false);
        appendConsole(`[System] ⚠ Could not reach robot at ${ip}. Running in simulation mode.`, 'stderr');
      }
    });

    ipInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') connectBtn.click(); });
  }
}


// ─────────────────────────────────────────
//  HINT TOGGLE
// ─────────────────────────────────────────
function initHintToggle() {
  const toggle = document.getElementById('hint-toggle');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    const content = document.getElementById('hint-content');
    if (!content) return;
    if (content.style.display === 'none') {
      content.style.display = 'block';
      toggle.innerHTML = '<span class="hint-icon">💡</span> Hide Hint';
    } else {
      content.style.display = 'none';
      toggle.innerHTML = '<span class="hint-icon">💡</span> Show Hint';
    }
  });
}


// ─────────────────────────────────────────
//  SOLUTION TOGGLE
// ─────────────────────────────────────────
function initSolutionToggle() {
  const toggle = document.getElementById('solution-toggle');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    const content = document.getElementById('solution-content');
    if (!content) return;
    if (content.style.display === 'none') {
      content.style.display = 'block';
      toggle.innerHTML = '<span class="solution-icon">📖</span> Hide Solution';
    } else {
      content.style.display = 'none';
      toggle.innerHTML = '<span class="solution-icon">📖</span> Show Solution';
    }
  });
}


// ─────────────────────────────────────────
//  INIT — everything starts here
// ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // 1. Editor first (instant, no network)
  initEditor();

  // 2. UI handlers
  initResize();
  initConnectionModal();
  initHintToggle();
  initSolutionToggle();

  // 3. Wire buttons
  const runBtn   = document.getElementById('btn-run');
  const resetBtn = document.getElementById('btn-reset');
  const nextBtn  = document.getElementById('btn-next');
  const clearBtn = document.getElementById('btn-clear-console');

  if (runBtn)   runBtn.addEventListener('click', handleRun);
  if (resetBtn) resetBtn.addEventListener('click', handleReset);
  if (nextBtn)  nextBtn.addEventListener('click', handleNext);
  if (clearBtn) clearBtn.addEventListener('click', clearConsole);

  // 4. Load progress & render the first exercise
  loadProgress();
  renderExercise();

  // 5. Robot status
  RobotBridge._updateStatusUI(false);

  // 6. Start loading Pyodide (async — won't block the UI)
  initPyodide();
});
