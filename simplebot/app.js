/* ═══════════════════════════════════════════════════════════
   SimpleBot Academy — app.js
   Lesson engine + Pyodide integration + SimpleBot bridge
   Controls: LEDs, Servos, NeoPixels on ESP32-C3
   ═══════════════════════════════════════════════════════════ */

// ─────────────────────────────────────────
//  LESSON DATA — Week 1: Python + Hardware
// ─────────────────────────────────────────
const LESSONS = [
  {
    id: 1,
    title: "💡 First Light",
    filename: "mission_01.py",
    body: `
      <p>Every great journey starts with a single spark. In electronics, the classic first project is <strong>blinking an LED</strong> — the hardware equivalent of "Hello, World!"</p>
      <p>Your SimpleBot has a built-in LED. Let's turn it on with Python!</p>
      <div class="concept-card">
        <h3>🧠 New Concept: HTTP Requests</h3>
        <p>Your SimpleBot runs a tiny web server. When you call <code>bot.led_on()</code>, Python sends an HTTP request over Wi-Fi — just like your browser loads a webpage. The bot receives it and flips the LED.</p>
      </div>
      <div class="mission-briefing">
        <h3>🚀 Mission Briefing</h3>
        <p>Run the starter code to turn the LED on. Then try <code>bot.led_off()</code> and <code>bot.led_toggle()</code>. Finally, <strong>add a print statement</strong> saying what you did!</p>
        <p>Hit <strong>▶ Run</strong> or press <strong>Ctrl+Enter</strong>.</p>
      </div>
    `,
    starter: `# 💡 First Light — Turn on your SimpleBot's LED!\nfrom simplebot import SimpleBot\n\nbot = SimpleBot("MyBot")\n\n# Turn the LED on\nbot.led_on()\nprint("LED is now ON!")\n\n# Try these too:\n# bot.led_off()\n# bot.led_toggle()`,
    validate: (output) => {
      return output.includes('[SimpleBot]') && output.includes('led');
    },
    validateMessage: 'Make sure your code uses <code>bot.led_on()</code> or another LED command!',
    success: "First light achieved! You just controlled real hardware with Python. 💡",
    hint: `The code is ready to run! Click <strong>▶ Run</strong>. Then uncomment <code>bot.led_off()</code> or <code>bot.led_toggle()</code> to try more.`,
    solutionCode: `from simplebot import SimpleBot\n\nbot = SimpleBot("Sparky")\nbot.led_on()\nprint("LED is ON!")\nbot.led_off()\nprint("LED is OFF!")\nbot.led_toggle()\nprint("LED toggled!")`,
    reflection: [
      "What happens if you call led_toggle() twice in a row?",
      "How is this different from print()? One controls hardware, the other shows text.",
    ],
  },
  {
    id: 2,
    title: "🎵 LED Orchestra",
    filename: "mission_02.py",
    body: `
      <p>One LED on or off is cool, but what about <strong>patterns</strong>? Real engineers use loops to repeat actions — blinking lights, scanning sensors, sending signals.</p>
      <div class="concept-card">
        <h3>🧠 New Concepts: Loops & time.sleep()</h3>
        <p><code>for i in range(5):</code> repeats code 5 times.<br>
        <code>time.sleep(0.5)</code> pauses for half a second.<br>
        Together, they create <strong>timed patterns</strong> — like a heartbeat!</p>
      </div>
      <div class="mission-briefing">
        <h3>🚀 Mission Briefing</h3>
        <p>Make the LED blink <strong>5 times</strong> with half-second pauses. Then create your own pattern — maybe fast blinks followed by a long pause? Get creative!</p>
      </div>
    `,
    starter: `# 🎵 LED Orchestra — Make blinking patterns!\nfrom simplebot import SimpleBot\nimport time\n\nbot = SimpleBot("Blinky")\n\n# Blink 5 times\nfor i in range(5):\n    bot.led_on()\n    time.sleep(0.3)\n    bot.led_off()\n    time.sleep(0.3)\n    print(f"Blink {i + 1}!")\n\nprint("Pattern complete!")`,
    validate: (output) => {
      return (output.match(/Blink/g) || []).length >= 3 && output.includes('[SimpleBot]');
    },
    validateMessage: 'Make the LED blink at least 3 times using a loop!',
    success: "Your LED is dancing! Loops are the heartbeat of programming. 🎵",
    hint: `Try changing <code>range(5)</code> to <code>range(10)</code> for more blinks, or change the <code>sleep()</code> values for different rhythms.`,
    solutionCode: `from simplebot import SimpleBot\nimport time\n\nbot = SimpleBot("DJ Bot")\n\n# Fast burst\nfor i in range(3):\n    bot.led_toggle()\n    time.sleep(0.1)\n    bot.led_toggle()\n    time.sleep(0.1)\n\ntime.sleep(0.5)  # pause\n\n# Slow pulse\nfor i in range(3):\n    bot.led_on()\n    time.sleep(0.5)\n    bot.led_off()\n    time.sleep(0.5)\n    print(f"Pulse {i + 1}")\n\nprint("Show over!")`,
    reflection: [
      "What happens if you set sleep(0)? Why?",
      "How would you make the blinks get faster each time?",
    ],
  },
  {
    id: 3,
    title: "⚙️ Servo Sweep",
    filename: "mission_03.py",
    body: `
      <p>Servos are motors that rotate to a <strong>precise angle</strong> (0° to 180°). They're used in robot arms, RC cars, camera gimbals — and your SimpleBot has two of them!</p>
      <div class="concept-card">
        <h3>🧠 New Concepts: Functions with Parameters</h3>
        <p><code>bot.set_servo(1, 90)</code> means "move servo #1 to 90 degrees."<br>
        The <code>1</code> and <code>90</code> are <strong>parameters</strong> — inputs that change what the function does.<br>
        <code>range(0, 180, 10)</code> counts from 0 to 180 in steps of 10.</p>
      </div>
      <div class="mission-briefing">
        <h3>🚀 Mission Briefing</h3>
        <p>Sweep servo 1 from 0° to 180° in steps. Then try servo 2! Finally, make both servos move together in a <strong>synchronized dance</strong>.</p>
      </div>
    `,
    starter: `# ⚙️ Servo Sweep — Control precision motors!\nfrom simplebot import SimpleBot\nimport time\n\nbot = SimpleBot("Sweeper")\n\n# Sweep servo 1 from 0 to 180\nfor angle in range(0, 181, 30):\n    bot.set_servo(1, angle)\n    print(f"Servo 1 → {angle}°")\n    time.sleep(0.3)\n\n# Return to center\nbot.set_servo(1, 90)\nprint("Servo 1 centered!")`,
    validate: (output) => {
      return output.includes('Servo') && output.includes('[SimpleBot]') &&
             (output.match(/set_servo/g) || []).length >= 3;
    },
    validateMessage: 'Move a servo to at least 3 different angles!',
    success: "Precision engineering! You're controlling motors with exact angles. ⚙️",
    hint: `Try adding servo 2: <code>bot.set_servo(2, angle)</code>. Make them mirror each other by using <code>180 - angle</code> for servo 2!`,
    solutionCode: `from simplebot import SimpleBot\nimport time\n\nbot = SimpleBot("TwinArms")\n\n# Synchronized sweep\nfor angle in range(0, 181, 20):\n    bot.set_servo(1, angle)\n    bot.set_servo(2, 180 - angle)  # Mirror!\n    print(f"S1: {angle}° | S2: {180 - angle}°")\n    time.sleep(0.2)\n\n# Quick wave\nfor _ in range(3):\n    bot.servo_wave(1)\n    time.sleep(0.4)\n\nprint("Servo dance complete!")`,
    reflection: [
      "Why does range(0, 181, 20) stop at 180, not 181?",
      "What would happen if you tried angle 200? (Servos max out at 180°)",
    ],
  },
  {
    id: 4,
    title: "🌈 Rainbow Machine",
    filename: "mission_04.py",
    body: `
      <p>Your NeoPixel strip has <strong>10 individually addressable RGB LEDs</strong>. Each pixel can be any color — you control the Red, Green, and Blue values (0-255 each).</p>
      <div class="concept-card">
        <h3>🧠 New Concepts: Lists & RGB Colors</h3>
        <p>Colors are defined by three numbers: <code>(R, G, B)</code><br>
        <code>(255, 0, 0)</code> = Red &nbsp; <code>(0, 255, 0)</code> = Green &nbsp; <code>(0, 0, 255)</code> = Blue<br>
        <code>(255, 255, 0)</code> = Yellow &nbsp; <code>(255, 0, 255)</code> = Magenta<br>
        You can set each of the 10 pixels independently!</p>
      </div>
      <div class="mission-briefing">
        <h3>🚀 Mission Briefing</h3>
        <p>Light up each pixel one by one in different colors. Then try <code>bot.neopixel_all(r, g, b)</code> to set them all at once. Create a <strong>rainbow</strong> — or invent your own color scheme!</p>
      </div>
    `,
    starter: `# 🌈 Rainbow Machine — 10 pixels of pure color!\nfrom simplebot import SimpleBot\nimport time\n\nbot = SimpleBot("Rainbow")\n\n# Define some colors as (R, G, B)\nred = (255, 0, 0)\ngreen = (0, 255, 0)\nblue = (0, 0, 255)\n\n# Light up pixels one by one\ncolors = [red, green, blue, red, green, blue, red, green, blue, red]\n\nfor i in range(10):\n    r, g, b = colors[i]\n    bot.neopixel_set(i, r, g, b)\n    print(f"Pixel {i} → ({r}, {g}, {b})")\n    time.sleep(0.2)\n\nprint("Rainbow complete! 🌈")`,
    validate: (output) => {
      return output.includes('Pixel') && output.includes('[SimpleBot]') &&
             (output.match(/neopixel/g) || []).length >= 5;
    },
    validateMessage: 'Set at least 5 NeoPixels to different colors!',
    success: "Your rainbow is glowing! You're mixing light like an artist. 🌈",
    hint: `Try creating a smooth rainbow using math!<br><code>for i in range(10):<br>&nbsp;&nbsp;hue = i * 25<br>&nbsp;&nbsp;bot.neopixel_set(i, hue, 255-hue, 128)</code>`,
    solutionCode: `from simplebot import SimpleBot\nimport time\n\nbot = SimpleBot("Prism")\n\n# Rainbow colors\nrainbow = [\n    (255, 0, 0),     # Red\n    (255, 127, 0),   # Orange\n    (255, 255, 0),   # Yellow\n    (127, 255, 0),   # Chartreuse\n    (0, 255, 0),     # Green\n    (0, 255, 127),   # Spring\n    (0, 255, 255),   # Cyan\n    (0, 127, 255),   # Azure\n    (0, 0, 255),     # Blue\n    (127, 0, 255),   # Violet\n]\n\nfor i, (r, g, b) in enumerate(rainbow):\n    bot.neopixel_set(i, r, g, b)\n    print(f"Pixel {i}: ({r},{g},{b})")\n    time.sleep(0.15)\n\nprint("🌈 Full rainbow!")`,
    reflection: [
      "How many possible colors can one pixel display? (Hint: 256 × 256 × 256)",
      "What color is (128, 128, 128)? What about (0, 0, 0)?",
    ],
  },
  {
    id: 5,
    title: "🎆 Light Show",
    filename: "mission_05.py",
    body: `
      <p>Now you control <strong>everything</strong> — LEDs, servos, and NeoPixels. Real engineers combine multiple systems to create complex behaviors. Time to orchestrate!</p>
      <div class="concept-card">
        <h3>🧠 Key Idea: System Integration</h3>
        <p>The magic isn't in any single component — it's in how they work <strong>together</strong>. A LED blinks while a servo sweeps while NeoPixels animate. That's what makes robots feel alive!</p>
      </div>
      <div class="mission-briefing">
        <h3>🚀 Mission Briefing</h3>
        <p>Create a light show that uses <strong>all three systems</strong>: LED, at least one servo, and NeoPixels. Tell a story — maybe a sunrise, a countdown, a celebration?</p>
        <p>Use at least <strong>8 different commands</strong>.</p>
      </div>
    `,
    starter: `# 🎆 Light Show — Combine everything!\nfrom simplebot import SimpleBot\nimport time\n\nbot = SimpleBot("ShowBot")\n\n# Your light show here!\n# Use bot.led_on/off/toggle\n# Use bot.set_servo(num, angle)\n# Use bot.neopixel_set(pixel, r, g, b)\n# Use bot.neopixel_all(r, g, b)\n# Use bot.neopixel_clear()\n\n`,
    validate: (output) => {
      const cmds = (output.match(/\[SimpleBot\]/g) || []).length;
      const hasLed = output.includes('led_');
      const hasServo = output.includes('set_servo');
      const hasNeo = output.includes('neopixel');
      return cmds >= 8 && hasLed && hasServo && hasNeo;
    },
    validateMessage: 'Use <strong>all three systems</strong> (LED, servo, NeoPixel) with at least 8 total commands!',
    success: "What a performance! You're a hardware conductor! 🎆",
    hint: `Try this structure:<br>1. Start with NeoPixels dark<br>2. Light up pixels one by one (sunrise)<br>3. Sweep a servo (flag raise)<br>4. Flash the LED (celebration)<br>5. Set all NeoPixels to party colors`,
    solutionCode: `from simplebot import SimpleBot\nimport time\n\nbot = SimpleBot("Director")\n\n# Act 1: Sunrise\nbot.neopixel_clear()\nfor i in range(10):\n    brightness = int(i * 25)\n    bot.neopixel_set(i, brightness, brightness // 2, 0)\n    time.sleep(0.15)\nprint("🌅 Sunrise!")\n\n# Act 2: Flag raise\nfor angle in range(0, 181, 30):\n    bot.set_servo(1, angle)\n    time.sleep(0.1)\nprint("🚩 Flag raised!")\n\n# Act 3: Celebration\nfor _ in range(5):\n    bot.led_toggle()\n    time.sleep(0.15)\n\nbot.neopixel_all(0, 255, 100)\nprint("🎉 Celebration!")\n\n# Finale\nbot.set_servo(1, 90)\nbot.set_servo(2, 90)\nprint("Show complete!")`,
    reflection: [
      "Which part of your show felt most alive? Why?",
      "How would you add sound if you had a speaker?",
    ],
  },
  {
    id: 6,
    title: "🏆 Final Challenge",
    filename: "challenge_01.py",
    body: `
      <p>You've mastered LEDs, servos, and NeoPixels. Now put it <strong>all together</strong> in your own creation!</p>
      <div class="mission-briefing challenge">
        <h3>🏆 Final Challenge</h3>
        <ol>
          <li>Use <strong>all three hardware systems</strong> (LED, servos, NeoPixels)</li>
          <li>Create at least <strong>2 variables</strong> to store settings</li>
          <li>Use at least <strong>one loop</strong></li>
          <li>Include <strong>print() statements</strong> with f-strings for a status log</li>
          <li>Make it tell a <strong>story or serve a purpose</strong></li>
        </ol>
        <p>No single right answer — be creative! This is YOUR hardware.</p>
      </div>
      <p>💡 Available commands:</p>
      <div class="expected-output">bot.led_on() / led_off() / led_toggle()
bot.set_servo(num, angle)   — num: 1 or 2, angle: 0-180
bot.servo_wave(num)         — quick wave action
bot.neopixel_set(pixel, r, g, b)  — pixel: 0-9
bot.neopixel_all(r, g, b)         — set all 10 pixels
bot.neopixel_clear()               — all pixels off
bot.neopixel_rainbow()             — auto rainbow</div>
    `,
    starter: `# 🏆 Final Challenge — Build something amazing!\nfrom simplebot import SimpleBot\nimport time\n\nbot = SimpleBot("YOUR_NAME")\nspeed = 0.2\nbrightness = 200\n\n# Your creation here!\n# Requirements:\n# 1. All three systems (LED + servo + NeoPixel)\n# 2. At least 2 variables\n# 3. At least 1 loop\n# 4. f-string print statements\n# 5. Tell a story!\n\n`,
    validate: (output) => {
      const cmds = (output.match(/\[SimpleBot\]/g) || []).length;
      const hasPrint = output.split('\n').some(l =>
        !l.trim().startsWith('[SimpleBot]') && !l.trim().startsWith('[Sim]') &&
        !l.trim().startsWith('▸') && l.trim().length > 0);
      return cmds >= 10 && hasPrint && !output.includes('YOUR_NAME');
    },
    validateMessage: 'Give your bot a name, use 10+ hardware commands, and print a status log!',
    success: "SimpleBot Academy COMPLETE! You've earned your Hardware Hacker badge! 🏆🔌",
    hint: `Structure idea:<br><code>bot_name = "Sparky"<br>for i in range(10):<br>&nbsp;&nbsp;bot.neopixel_set(i, brightness, 0, brightness)<br>bot.set_servo(1, 45)<br>bot.led_on()<br>print(f"{bot_name} is ready!")</code>`,
    solutionCode: `from simplebot import SimpleBot\nimport time\n\nbot = SimpleBot("Sparky")\nspeed = 0.15\nbrightness = 200\n\n# Startup sequence\nprint(f"=== {bot.name} Booting ===" )\n\n# NeoPixel loading bar\nfor i in range(10):\n    g = int(i * 25)\n    bot.neopixel_set(i, 0, g, brightness)\n    print(f"Loading: {(i+1)*10}%")\n    time.sleep(speed)\n\n# Servo calibration\nfor servo in [1, 2]:\n    for angle in [0, 90, 180, 90]:\n        bot.set_servo(servo, angle)\n        time.sleep(speed)\n    print(f"Servo {servo} calibrated ✓")\n\n# LED heartbeat\nfor _ in range(5):\n    bot.led_toggle()\n    time.sleep(0.1)\n\n# Final state\nbot.neopixel_all(0, brightness, 50)\nbot.led_on()\nprint(f"\\n=== {bot.name} Online ===")\nprint(f"Speed: {speed}s | Brightness: {brightness}")\nprint(f"Systems: LED ✓ | Servos ✓ | NeoPixels ✓")`,
    reflection: [
      "What story did your creation tell?",
      "What would you add if you had more hardware (speaker, sensor, display)?",
      "Which Python concept was most useful for hardware control?",
    ],
    isChallenge: true,
  },
];


// ─────────────────────────────────────────
//  SIMPLEBOT BRIDGE
//  Intercepts Python commands → HTTP to SimpleBot
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
      const timeout = setTimeout(() => ctrl.abort(), 2500);
      const res = await fetch(`http://${this.ip}/status`, { signal: ctrl.signal });
      clearTimeout(timeout);
      if (res.ok) {
        this.connected = true;
        this.simulationMode = false;
        this._updateStatusUI(true);
        return true;
      }
    } catch (e) { /* not reachable */ }
    this.connected = false;
    this.simulationMode = true;
    this._updateStatusUI(false);
    return false;
  },

  async sendCommand(endpoint) {
    if (this.simulationMode) return { simulated: true };
    try {
      const res = await fetch(`http://${this.ip}/${endpoint}`, { method: 'GET' });
      return await res.text().catch(() => 'OK');
    } catch (e) {
      return { error: e.message };
    }
  },

  // LED
  ledOn() {
    appendConsole(`[SimpleBot] 💡 led_on`, 'robot-msg');
    this.sendCommand('l1on');
    if (this.simulationMode) appendConsole(`  [Sim] LED → ON`, 'robot-msg');
  },
  ledOff() {
    appendConsole(`[SimpleBot] 💡 led_off`, 'robot-msg');
    this.sendCommand('l1off');
    if (this.simulationMode) appendConsole(`  [Sim] LED → OFF`, 'robot-msg');
  },
  ledToggle() {
    appendConsole(`[SimpleBot] 💡 led_toggle`, 'robot-msg');
    this.sendCommand('toggle');
    if (this.simulationMode) appendConsole(`  [Sim] LED → TOGGLE`, 'robot-msg');
  },

  // Servos
  setServo(num, angle) {
    appendConsole(`[SimpleBot] ⚙️ set_servo(${num}, ${angle})`, 'robot-msg');
    this.sendCommand(`s${num}_${angle}`);
    if (this.simulationMode) appendConsole(`  [Sim] Servo ${num} → ${angle}°`, 'robot-msg');
  },
  servoWave(num) {
    appendConsole(`[SimpleBot] ⚙️ servo_wave(${num})`, 'robot-msg');
    this.sendCommand(`s${num}on`);
    if (this.simulationMode) appendConsole(`  [Sim] Servo ${num} → wave action`, 'robot-msg');
  },

  // NeoPixels
  neopixelSet(pixel, r, g, b) {
    appendConsole(`[SimpleBot] 🌈 neopixel_set(${pixel}, ${r}, ${g}, ${b})`, 'robot-msg');
    this.sendCommand(`neopixel?pixel=${pixel}&r=${r}&g=${g}&b=${b}`);
    if (this.simulationMode) appendConsole(`  [Sim] Pixel ${pixel} → (${r},${g},${b})`, 'robot-msg');
  },
  neopixelAll(r, g, b) {
    appendConsole(`[SimpleBot] 🌈 neopixel_all(${r}, ${g}, ${b})`, 'robot-msg');
    this.sendCommand(`neopixel_all?r=${r}&g=${g}&b=${b}`);
    if (this.simulationMode) appendConsole(`  [Sim] All pixels → (${r},${g},${b})`, 'robot-msg');
  },
  neopixelClear() {
    appendConsole(`[SimpleBot] 🌈 neopixel_clear`, 'robot-msg');
    this.sendCommand('neopixel_clear');
    if (this.simulationMode) appendConsole(`  [Sim] All pixels → OFF`, 'robot-msg');
  },
  neopixelRainbow() {
    appendConsole(`[SimpleBot] 🌈 neopixel_rainbow`, 'robot-msg');
    // Set rainbow via individual pixels
    const rainbow = [
      [255,0,0],[255,127,0],[255,255,0],[127,255,0],[0,255,0],
      [0,255,127],[0,255,255],[0,127,255],[0,0,255],[127,0,255]
    ];
    rainbow.forEach((c, i) => {
      this.sendCommand(`neopixel?pixel=${i}&r=${c[0]}&g=${c[1]}&b=${c[2]}`);
    });
    if (this.simulationMode) appendConsole(`  [Sim] Rainbow pattern applied`, 'robot-msg');
  },

  _updateStatusUI(isConnected) {
    const dot = document.querySelector('.status-robot-dot');
    const text = document.querySelector('.status-robot-text');
    if (!dot || !text) return;
    if (isConnected) {
      dot.className = 'status-robot-dot connected';
      text.textContent = `SimpleBot: ${this.ip}`;
    } else {
      dot.className = 'status-robot-dot disconnected';
      text.textContent = 'SimpleBot: Simulation mode';
    }
  }
};


// ─────────────────────────────────────────
//  PYODIDE LOADER
// ─────────────────────────────────────────
const PYODIDE_CDNS = [
  "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
  "https://pyodide-cdn2.iodide.io/v0.25.0/full/",
];

let pyodide = null;
let pyodideReady = false;
let pyodideLoading = false;
let pendingRunResolve = null;

function loadPyodideScript(baseURL) {
  return new Promise((resolve, reject) => {
    const old = document.getElementById('pyodide-script');
    if (old) old.remove();
    const script = document.createElement('script');
    script.id = 'pyodide-script';
    script.src = baseURL + 'pyodide.js';
    script.onload = () => {
      if (typeof loadPyodide === 'function') resolve(baseURL);
      else reject(new Error('loadPyodide not found'));
    };
    script.onerror = () => reject(new Error(`Failed: ${script.src}`));
    document.head.appendChild(script);
  });
}

async function initPyodide() {
  if (pyodideLoading || pyodideReady) return;
  pyodideLoading = true;

  const bar = document.getElementById('loading-bar');
  const status = document.getElementById('loading-status');
  const overlay = document.getElementById('loading-overlay');
  const runBtn = document.getElementById('btn-run');

  runBtn.classList.add('loading');
  runBtn.setAttribute('disabled', 'true');

  let usedCDN = null;
  for (const cdn of PYODIDE_CDNS) {
    try {
      bar.style.width = '10%';
      status.textContent = 'Downloading Python runtime…';
      usedCDN = await loadPyodideScript(cdn);
      break;
    } catch (e) { console.warn('CDN failed:', cdn, e.message); }
  }

  if (!usedCDN) {
    showLoadError('Could not download Python runtime. Check your internet.', bar, status, overlay);
    pyodideLoading = false;
    return;
  }

  try {
    bar.style.width = '30%';
    status.textContent = 'Initializing Python…';

    pyodide = await loadPyodide({ indexURL: usedCDN });

    bar.style.width = '65%';
    status.textContent = 'Setting up SimpleBot bridge…';

    pyodide.registerJsModule("_simplebot_bridge", {
      led_on:           () => RobotBridge.ledOn(),
      led_off:          () => RobotBridge.ledOff(),
      led_toggle:       () => RobotBridge.ledToggle(),
      set_servo:        (n, a) => RobotBridge.setServo(n, a),
      servo_wave:       (n) => RobotBridge.servoWave(n),
      neopixel_set:     (p, r, g, b) => RobotBridge.neopixelSet(p, r, g, b),
      neopixel_all:     (r, g, b) => RobotBridge.neopixelAll(r, g, b),
      neopixel_clear:   () => RobotBridge.neopixelClear(),
      neopixel_rainbow: () => RobotBridge.neopixelRainbow(),
      get_connected:    () => RobotBridge.connected,
    });

    bar.style.width = '80%';
    status.textContent = 'Installing simplebot module…';

    const moduleCode = [
      '"""',
      'simplebot.py — Control your SimpleBot hardware from Python.',
      'LED, Servos, and NeoPixel strip.',
      '"""',
      'import _simplebot_bridge',
      '',
      'class SimpleBot:',
      '    """Your SimpleBot! Create one with: bot = SimpleBot(\\"name\\")"""',
      '    ',
      '    def __init__(self, name="SimpleBot"):',
      '        self.name = name',
      '        self._log = []',
      '        print(f"[SimpleBot] 🔌 Connected to: {name}")',
      '    ',
      '    # ── LED ──',
      '    def led_on(self):',
      '        """Turn the built-in LED on."""',
      '        self._log.append("led_on")',
      '        _simplebot_bridge.led_on()',
      '    ',
      '    def led_off(self):',
      '        """Turn the built-in LED off."""',
      '        self._log.append("led_off")',
      '        _simplebot_bridge.led_off()',
      '    ',
      '    def led_toggle(self):',
      '        """Toggle the built-in LED."""',
      '        self._log.append("led_toggle")',
      '        _simplebot_bridge.led_toggle()',
      '    ',
      '    # ── Servos ──',
      '    def set_servo(self, num, angle):',
      '        """Move a servo to an angle. num: 1 or 2, angle: 0-180"""',
      '        angle = max(0, min(180, int(angle)))',
      '        self._log.append(f"set_servo({num}, {angle})")',
      '        _simplebot_bridge.set_servo(int(num), angle)',
      '    ',
      '    def servo_wave(self, num=1):',
      '        """Quick wave action on a servo."""',
      '        self._log.append(f"servo_wave({num})")',
      '        _simplebot_bridge.servo_wave(int(num))',
      '    ',
      '    # ── NeoPixels ──',
      '    def neopixel_set(self, pixel, r, g, b):',
      '        """Set one pixel. pixel: 0-9, r/g/b: 0-255"""',
      '        self._log.append(f"neopixel_set({pixel}, {r}, {g}, {b})")',
      '        _simplebot_bridge.neopixel_set(int(pixel), int(r), int(g), int(b))',
      '    ',
      '    def neopixel_all(self, r, g, b):',
      '        """Set all 10 pixels to one color."""',
      '        self._log.append(f"neopixel_all({r}, {g}, {b})")',
      '        _simplebot_bridge.neopixel_all(int(r), int(g), int(b))',
      '    ',
      '    def neopixel_clear(self):',
      '        """Turn off all NeoPixels."""',
      '        self._log.append("neopixel_clear")',
      '        _simplebot_bridge.neopixel_clear()',
      '    ',
      '    def neopixel_rainbow(self):',
      '        """Set a rainbow pattern across all 10 pixels."""',
      '        self._log.append("neopixel_rainbow")',
      '        _simplebot_bridge.neopixel_rainbow()',
      '    ',
      '    def get_log(self):',
      '        """Return a list of all commands sent."""',
      '        return list(self._log)',
      '    ',
      '    def __repr__(self):',
      '        return f"SimpleBot(name=\'{self.name}\')"',
    ].join('\n');

    pyodide.FS.writeFile("/home/pyodide/simplebot.py", moduleCode, { encoding: "utf8" });

    bar.style.width = '92%';
    status.textContent = 'Running self-check…';
    await pyodide.runPythonAsync('import simplebot');

    bar.style.width = '100%';
    status.textContent = 'All systems go! ✓';
    pyodideReady = true;
    pyodideLoading = false;

    runBtn.removeAttribute('disabled');
    runBtn.classList.remove('loading');
    appendConsole('▸ Python 3.11 (Pyodide) — Ready ✓', 'stdout');
    setTimeout(() => overlay.classList.add('hidden'), 600);

    if (pendingRunResolve) {
      const fn = pendingRunResolve;
      pendingRunResolve = null;
      fn();
    }
  } catch (err) {
    console.error('Pyodide init error:', err);
    showLoadError(`Python engine error: ${err.message}`, bar, status, overlay);
    pyodideLoading = false;
  }
}

function showLoadError(message, bar, status, overlay) {
  bar.style.width = '100%';
  bar.style.background = '#f87171';
  status.textContent = message;
  if (!document.getElementById('retry-btn')) {
    const retryBtn = document.createElement('button');
    retryBtn.id = 'retry-btn';
    retryBtn.textContent = '🔄 Retry';
    retryBtn.style.cssText = 'margin-top:16px;padding:10px 24px;font-weight:600;font-size:0.9rem;border-radius:8px;background:rgba(255,255,255,0.1);color:#e8ecf4;border:1px solid rgba(255,255,255,0.15);cursor:pointer;';
    retryBtn.addEventListener('click', () => {
      retryBtn.remove();
      bar.style.background = '';
      bar.style.width = '0%';
      pyodideLoading = false; pyodideReady = false; pyodide = null;
      initPyodide();
    });
    document.querySelector('.loading-content').appendChild(retryBtn);
  }
}


// ─────────────────────────────────────────
//  PYTHON RUNNER
// ─────────────────────────────────────────
async function runPython(code) {
  if (!pyodideReady && pyodideLoading) {
    appendConsole('⏳ Python is still loading…', 'stdout');
    await new Promise((resolve) => {
      pendingRunResolve = resolve;
      setTimeout(() => { if (pendingRunResolve === resolve) { pendingRunResolve = null; resolve(); } }, 30000);
    });
  }
  if (!pyodideReady) {
    appendConsole('⚠ Python engine not loaded. Refresh the page.', 'stderr');
    return '';
  }

  let output = '';
  pyodide.setStdout({ batched: (t) => { output += t + '\n'; appendConsole(t, 'stdout'); } });
  pyodide.setStderr({ batched: (t) => { output += t + '\n'; appendConsole(t, 'stderr'); } });

  try {
    await pyodide.runPythonAsync(code);
  } catch (err) {
    const rawMsg = err.message || String(err);
    const lines = rawMsg.split('\n');
    const clean = [];
    let inTB = false;
    for (const line of lines) {
      if (line.startsWith('Traceback')) { inTB = true; clean.push(line); continue; }
      if (inTB) {
        if (line.includes('/lib/python') || line.includes('pyodide') || line.includes('wasm')) continue;
        clean.push(line);
      } else { clean.push(line); }
    }
    const msg = clean.join('\n').trim() || rawMsg;
    output += msg + '\n';
    appendConsole(msg, 'stderr');
  }
  return output;
}


// ─────────────────────────────────────────
//  CONSOLE
// ─────────────────────────────────────────
function getConsoleEl() { return document.getElementById('console-output'); }

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
let exerciseCompleted = new Array(LESSONS.length).fill(false);
const STORAGE_KEY = 'simplebotAcademy_progress';

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && Array.isArray(saved.completed)) {
      exerciseCompleted = saved.completed;
      currentExercise = saved.currentExercise || 0;
      if (currentExercise >= LESSONS.length) currentExercise = LESSONS.length - 1;
    }
  } catch (e) {}
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ completed: exerciseCompleted, currentExercise }));
  } catch (e) {}
}

function renderProgressDots() {
  const container = document.getElementById('nav-progress');
  if (!container) return;
  container.innerHTML = '';
  LESSONS.forEach((lesson, i) => {
    const dot = document.createElement('div');
    dot.className = 'progress-dot';
    if (exerciseCompleted[i]) dot.classList.add('completed');
    if (i === currentExercise) dot.classList.add('active');
    dot.title = `Mission ${i + 1}: ${lesson.title}`;
    dot.addEventListener('click', () => { if (i <= currentExercise || exerciseCompleted[i]) navigateTo(i); });
    container.appendChild(dot);
  });
}

function navigateTo(index) {
  currentExercise = index;
  renderExercise();
  saveProgress();
}

function renderExercise() {
  const lesson = LESSONS[currentExercise];
  if (!lesson || !editor) return;

  const numEl = document.getElementById('exercise-number');
  const titleEl = document.getElementById('exercise-title');
  if (numEl) numEl.textContent = `MISSION ${lesson.id} of ${LESSONS.length}`;
  if (titleEl) titleEl.textContent = lesson.title;

  const bodyEl = document.getElementById('exercise-body');
  if (bodyEl) bodyEl.innerHTML = lesson.body;

  editor.setValue(lesson.starter);
  editor.clearHistory();

  const tabName = document.getElementById('editor-tab-name');
  if (tabName) tabName.textContent = lesson.filename;

  const navTitle = document.getElementById('nav-lesson-title');
  if (navTitle) navTitle.textContent = lesson.title.replace(/^[^\s]+\s/, '');

  // Reset UI
  hide('success-message');
  hide('reflection-section');

  // Hint
  const hintSection = document.getElementById('hint-section');
  const hintContent = document.getElementById('hint-content');
  if (lesson.hint) {
    hintSection.style.display = '';
    hintContent.style.display = 'none';
    hintContent.innerHTML = lesson.hint;
  } else {
    hintSection.style.display = 'none';
  }

  // Solution
  const solSection = document.getElementById('solution-section');
  const solContent = document.getElementById('solution-content');
  if (lesson.solutionCode) {
    solSection.style.display = '';
    solContent.style.display = 'none';
    solContent.textContent = lesson.solutionCode;
  } else {
    solSection.style.display = 'none';
  }

  clearConsole();
  renderProgressDots();

  // Scroll lesson panel to top
  const scroll = document.getElementById('lesson-scroll');
  if (scroll) scroll.scrollTop = 0;
}

function hide(id) { const el = document.getElementById(id); if (el) el.style.display = 'none'; }
function show(id) { const el = document.getElementById(id); if (el) el.style.display = ''; }


// ─────────────────────────────────────────
//  RUN HANDLER
// ─────────────────────────────────────────
let isRunning = false;

async function handleRun() {
  if (isRunning || !editor) return;
  isRunning = true;

  const runBtn = document.getElementById('btn-run');
  runBtn.classList.add('running');
  clearConsole();
  hide('success-message');
  hide('reflection-section');

  const code = editor.getValue();
  const output = await runPython(code);

  runBtn.classList.remove('running');
  isRunning = false;

  // Validate
  const lesson = LESSONS[currentExercise];
  if (lesson && lesson.validate) {
    if (lesson.validate(output)) {
      // Success!
      exerciseCompleted[currentExercise] = true;
      saveProgress();
      renderProgressDots();

      appendConsole('', 'stdout');
      appendConsole('✅ ' + lesson.success, 'success');

      const successEl = document.getElementById('success-message');
      const successText = document.getElementById('success-text');
      if (successText) successText.textContent = lesson.success;
      show('success-message');

      // Show reflection
      if (lesson.reflection && lesson.reflection.length) {
        const list = document.getElementById('reflection-list');
        list.innerHTML = '';
        lesson.reflection.forEach(q => {
          const li = document.createElement('li');
          li.textContent = q;
          list.appendChild(li);
        });
        show('reflection-section');
      }

      // Confetti!
      launchConfetti();

      // Update next button
      const nextBtn = document.getElementById('btn-next');
      if (currentExercise >= LESSONS.length - 1) {
        nextBtn.innerHTML = 'Complete! 🏆';
        nextBtn.onclick = () => showWeekComplete();
      } else {
        nextBtn.innerHTML = 'Next Mission <span class="btn-arrow">→</span>';
        nextBtn.onclick = () => navigateTo(currentExercise + 1);
      }
    } else {
      appendConsole('', 'stdout');
      appendConsole('⚠ ' + (lesson.validateMessage || 'Not quite — try again!'), 'error');
    }
  }
}


// ─────────────────────────────────────────
//  CONFETTI
// ─────────────────────────────────────────
function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const colors = ['#22d1c3', '#f5c842', '#a78bfa', '#4ade80', '#f472b6', '#60a5fa'];
  for (let i = 0; i < 80; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * -0.5,
      w: 6 + Math.random() * 6,
      h: 4 + Math.random() * 4,
      vx: (Math.random() - 0.5) * 4,
      vy: 2 + Math.random() * 4,
      rot: Math.random() * Math.PI * 2,
      rv: (Math.random() - 0.5) * 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 1,
    });
  }

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    pieces.forEach(p => {
      if (p.opacity <= 0) return;
      alive = true;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.08;
      p.rot += p.rv;
      if (frame > 60) p.opacity -= 0.015;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
      ctx.restore();
    });
    frame++;
    if (alive) requestAnimationFrame(animate);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  requestAnimationFrame(animate);
}


// ─────────────────────────────────────────
//  WEEK COMPLETE
// ─────────────────────────────────────────
function showWeekComplete() {
  const overlay = document.createElement('div');
  overlay.className = 'week-complete-overlay';
  overlay.innerHTML = `
    <div class="week-complete-card">
      <div class="week-complete-badge">🏆</div>
      <h2 class="week-complete-title">SimpleBot Academy Complete!</h2>
      <p class="week-complete-text">
        You've mastered LEDs, servos, and NeoPixels using Python. 
        You're a certified Hardware Hacker!
      </p>
      <div class="week-complete-stats">
        <div class="week-complete-stat">
          <div class="week-complete-stat-num">6</div>
          <div class="week-complete-stat-label">Missions</div>
        </div>
        <div class="week-complete-stat">
          <div class="week-complete-stat-num">3</div>
          <div class="week-complete-stat-label">Hardware Systems</div>
        </div>
        <div class="week-complete-stat">
          <div class="week-complete-stat-num">∞</div>
          <div class="week-complete-stat-label">Possibilities</div>
        </div>
      </div>
      <a href="../index.html" class="btn btn-next" style="text-decoration:none;">
        Back to Hub <span class="btn-arrow">→</span>
      </a>
    </div>
  `;
  document.body.appendChild(overlay);
  launchConfetti();
}


// ─────────────────────────────────────────
//  RESIZE HANDLE
// ─────────────────────────────────────────
function initResize() {
  const handle = document.getElementById('resize-handle');
  const panel = document.getElementById('lesson-panel');
  if (!handle || !panel) return;

  let dragging = false;
  handle.addEventListener('mousedown', (e) => {
    e.preventDefault();
    dragging = true;
    handle.classList.add('dragging');
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  });
  document.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const x = e.clientX;
    const min = 280, max = 600;
    panel.style.width = Math.max(min, Math.min(max, x)) + 'px';
    if (editor) editor.refresh();
  });
  document.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    handle.classList.remove('dragging');
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  });
}


// ─────────────────────────────────────────
//  CONNECTION MODAL
// ─────────────────────────────────────────
function initConnectionModal() {
  const btn = document.getElementById('btn-connect-robot');
  const overlay = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('modal-close');
  const skipBtn = document.getElementById('btn-skip-connect');
  const connectBtn = document.getElementById('btn-do-connect');
  const ipInput = document.getElementById('robot-ip');

  function openModal() { overlay.style.display = 'flex'; ipInput.focus(); }
  function closeModal() { overlay.style.display = 'none'; }

  btn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  skipBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });

  connectBtn.addEventListener('click', async () => {
    const ip = ipInput.value.trim();
    if (!ip) return;
    connectBtn.textContent = '⏳ Connecting…';
    const ok = await RobotBridge.connect(ip);
    if (ok) {
      connectBtn.textContent = '✅ Connected!';
      localStorage.setItem('simplebotAcademy_ip', ip);
      setTimeout(closeModal, 800);
    } else {
      connectBtn.innerHTML = '<span class="btn-icon">📡</span> Connect';
      alert('Could not reach SimpleBot at ' + ip + '. Check the IP and make sure you\'re on the same network.');
    }
  });

  ipInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') connectBtn.click(); });

  // Auto-restore saved IP
  const savedIP = localStorage.getItem('simplebotAcademy_ip');
  if (savedIP) {
    ipInput.value = savedIP;
    RobotBridge.connect(savedIP);
  }
}


// ─────────────────────────────────────────
//  INIT
// ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initEditor();
  loadProgress();
  renderExercise();
  initResize();
  initConnectionModal();

  // Run button
  document.getElementById('btn-run').addEventListener('click', handleRun);

  // Reset button
  document.getElementById('btn-reset').addEventListener('click', () => {
    const lesson = LESSONS[currentExercise];
    if (lesson && editor) {
      editor.setValue(lesson.starter);
      editor.clearHistory();
      clearConsole();
      hide('success-message');
      hide('reflection-section');
    }
  });

  // Clear console
  document.getElementById('btn-clear-console').addEventListener('click', clearConsole);

  // Hint toggle
  document.getElementById('hint-toggle').addEventListener('click', () => {
    const content = document.getElementById('hint-content');
    const btn = document.getElementById('hint-toggle');
    if (content.style.display === 'none') {
      content.style.display = '';
      btn.innerHTML = '<span class="hint-icon">💡</span> Hide Hint';
    } else {
      content.style.display = 'none';
      btn.innerHTML = '<span class="hint-icon">💡</span> Show Hint';
    }
  });

  // Solution toggle
  document.getElementById('solution-toggle').addEventListener('click', () => {
    const content = document.getElementById('solution-content');
    const btn = document.getElementById('solution-toggle');
    if (content.style.display === 'none') {
      content.style.display = '';
      btn.innerHTML = '<span class="solution-icon">📖</span> Hide Solution';
    } else {
      content.style.display = 'none';
      btn.innerHTML = '<span class="solution-icon">📖</span> Show Solution';
    }
  });

  // Start loading Pyodide
  initPyodide();
});
