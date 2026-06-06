Astro-Dodge Web App
A lightweight, fast-paced, 2D arcade survival game built entirely using modern web technologies. 
Players pilot a starship through a dense asteroid field, using fluid controls to dodge obstacles, survive as long as possible, and rack up a high score.
This project is optimized for both desktop browsers and mobile devices as a fully installable Progressive Web App (PWA).
🕹️ Live Demo & PlayDesktop: 
Play via keyboard arrow keys or mouse movement.
Mobile: Install directly to your home screen via browser prompt and play using fluid touch/drag controls.
✨ Features60 FPS Gameplay:
Driven by HTML5 Canvas API and requestAnimationFrame for buttery-smooth animations.
Dynamic Difficulty: Asteroid spawn rates and velocities increase gradually based on your survival time.
PWA Ready: Includes a web app manifest allowing mobile device installation with a custom app icon and fullscreen standalone view.
Responsive Design: Dynamic canvas resizing ensures pixel-perfect rendering across wide monitors, tablets, and smartphones.
Local High Scores: Utilizes HTML5 localStorage to save your highest score locally on the device.
🛠️ Technology StackStructure:
HTML5 CanvasStyling: CSS3 (Fullscreen, zero-latency layouts)Logic:
Modern Vanilla JavaScript (ES6+ Object-Oriented Programming)Deployment:
PWA Framework (manifest.json / Service Worker configuration)
📂 File Architecturetextastro-dodge/
├── index.html          # Core game logic, HTML canvas, & main stylesheet
├── manifest.json       # App configuration for mobile home-screen installation
└── assets/
    └── icon.png        # App launch icon (192x192 PNG)
Use code with caution.
🚀 Getting Started & Local SetupBecause this game relies on clean, native web code, you do not need to install complex build tools like Node.js, Webpack, or 
React.1. Clone 
or Download the Projectbashgit clone https://github.com
cd astro-dodge
