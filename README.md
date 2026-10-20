# 💖 Romantic Birthday Surprise Website for Your Girlfriend

A personalized, interactive, and romantic birthday website crafted with love.

---

## 🚀 Quick Start: How to Open & View Right Now

Simply **double-click** `index.html` in your browser (Google Chrome, Edge, Safari, or Brave) or right-click `index.html` -> **Open with** -> your preferred browser.

Everything works out of the box with built-in romantic falling rose petals, glowing sparkles, interactive candle blowing, audio, and aesthetic photos!

---

## 🎨 How to Personalize Everything (In 3 Simple Steps)

All personal details are organized inside **`config.js`**. You can open it in any text editor (like Notepad, VS Code, or Antigravity) to customize:

### Step 1: Change Her Name & Love Letter
Open `config.js` and edit:
- `herName`: Her real name (e.g., `"Sophia"` or `"Priya"`).
- `nickname`: Her cute pet name (e.g., `"Sweetheart"`, `"Babu"`, `"Princess"`).
- `letter`: Personalize the heartfelt love letter with your own memories, words, and closing signature.
- `reasons`: Add your own reasons why you love her, silly inside jokes, and sweet memories.

---

### Step 2: Add Photos of Her (Polaroid Gallery)
1. Copy your photos of her into the `assets/images/` folder.
2. Name them `photo1.jpg`, `photo2.jpg`, `photo3.jpg`, etc. (or any name you like!).
3. In `config.js`, update the `gallery` list:
```javascript
gallery: [
    {
        image: "assets/images/photo1.jpg",
        caption: "Your beautiful smile that made me fall for you.",
        date: "First Date ❤️"
    },
    {
        image: "assets/images/photo2.jpg",
        caption: "When we laughed so hard our stomachs hurt.",
        date: "Summer Roadtrip"
    }
    // Add as many photos as you like!
]
```
*(Note: If a photo is not found, it automatically displays a romantic aesthetic photo so the website always looks stunning).*

---

### Step 3: Add Video of Her (Cinema Lounge)
1. Copy your video clip or video montage of her into the `assets/video/` folder.
2. Name it `her_video.mp4` (or any format like `.mp4`, `.webm`, `.mov`).
3. In `config.js`, check:
```javascript
video: {
    title: "A Video Made Just For You 🎥",
    subtitle: "Turn your volume up and watch our moments.",
    src: "assets/video/her_video.mp4",
    caption: "Every second with you is my favorite memory."
}
```

---

### Step 4: Add Romantic Music (Optional)
1. Copy your favorite romantic song into `assets/audio/romantic_song.mp3`.
2. The website will automatically play it softly when she taps **"Open With Love 💌"**.
3. *(If you don't add an MP3, the website automatically plays a soothing romantic piano piece via internet or procedural Web Audio synthesis).*

---

## 🌐 How to Send This Website to Her Phone or Computer

You can easily host this website online for **100% free** so she can open a link on her phone:

### Option A: Netlify Drop (Easiest - 30 seconds, No account needed)
1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop the whole `birthday-surprise` folder into the browser window.
3. It will immediately give you a live link (e.g., `https://romantic-birthday-surprise.netlify.app`) to send to her!

### Option B: GitHub Pages / Vercel
- Create a GitHub repository and push this folder.
- Enable GitHub Pages in Repository Settings -> Pages, or import to [Vercel](https://vercel.com) for a custom domain.

---

## ✨ Features Included
- 🌸 **Canvas Petal & Sparkle Physics**: Soft rose petals and glowing fairy dust drifting gently down the screen.
- 🎁 **Surprise Curtain Entrance**: "A Special Surprise For Someone Special" with animated gift box and romantic unlock.
- 🎂 **Interactive Birthday Cake**: She can click to make a wish and blow out the candles, accompanied by realistic smoke, chimes, and a confetti explosion.
- 📸 **Polaroid Memory Gallery**: Washi-taped photo frames with tilt animations, handwritten captions, and full-screen lightbox viewing.
- 🎬 **Cinema Video Lounge**: Sleek video frame to watch her special montage or video greeting.
- 💖 **Reasons Why I Love You**: Glassmorphic interactive cards with romantic compliments and memories.
- 💌 **Wax-Sealed Love Letter**: Realistic vintage wax seal that cracks open to reveal an intimate unfolding parchment letter.
- 🎵 **Floating Music Player**: Pulsing audio equalizer and music toggle.
