# Astro-Dodge

A lightweight, fast-paced **2D arcade survival game** built with modern web technologies. Pilot your starship through an endless asteroid field, dodge incoming hazards, and try to beat your high score.

![Game Screenshot](https://via.placeholder.com/800x450?text=Astro-Dodge+Gameplay)

---

##  Game Description

Navigate your starship through a dangerous asteroid field. The longer you survive, the faster and more intense the game becomes. Simple to learn, hard to master — perfect for quick gaming sessions.

**Built as a single-file Progressive Web App (PWA)** — no build tools or servers required.

---

##  Features

- **Smooth 60 FPS Gameplay** using HTML5 Canvas and `requestAnimationFrame`
- **Dynamic Difficulty Scaling** — asteroids get faster as your score increases
- **Mobile Optimized** with touch controls and responsive design
- **Installable PWA** — can be added to your phone’s home screen
- **High Score Persistence** using `localStorage`
- **Single HTML File** — easy to share and run

---

##  Tech Stack

- **HTML5 Canvas** — Game rendering
- **CSS3** — Styling and mobile responsiveness
- **Vanilla JavaScript (ES6+)** — Game logic and OOP design
- **Progressive Web App (PWA)** — Offline support & installable

---
astro-dodge/
├── index.html                 # Main game file (Everything in one file)
├── README.md                  # Documentation (what you asked for)
├── manifest.json              # PWA manifest for installability
├── sw.js                      # Service Worker (for offline PWA support)
├── assets/
│   ├── icons/
│   │   ├── icon-192.png
│   │   ├── icon-512.png
│   │   └── favicon.ico
│   └── images/                # Backgrounds, sprites (optional)
├── css/
│   └── style.css              # Separate CSS (cleaner code)
└── js/
    └── game.js                # Game logic (recommended separation)

astro-dodge/
└── index.html          # Complete game (HTML + CSS + JS)
