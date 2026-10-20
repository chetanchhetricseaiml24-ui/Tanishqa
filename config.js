// ==============================================================================
// 💖 ROMANTIC BIRTHDAY WEBSITE CONFIGURATION
// Customize everything below easily for your girlfriend!
// ==============================================================================

const CONFIG = {
    // 🌸 Girlfriend's Details
    herName: "My Love", // Change to her name e.g. "Sophia", "Priya", "Emma"
    nickname: "Sweetheart", // A cute pet name e.g. "Babu", "Cutie Pie", "Princess"
    birthdayDate: "2026-09-14", // Her birthday date (YYYY-MM-DD)
    anniversaryDate: "2023-02-14", // Optional: When you met or started dating (YYYY-MM-DD)

    // 💌 Entrance Screen (The Envelope Opening Surprise)
    entrance: {
        title: "A Surprise For Someone Truly Special",
        subtitle: "Turn on your volume, take a deep breath, and open your gift...",
        buttonText: "Open With Love 💌"
    },

    // 🎂 Hero Section
    hero: {
        badge: "✨ Happy Birthday To The Love Of My Life ✨",
        title: "Every Single Day With You Is A Gift BF JII",
        subtext: "Today the world celebrates the most gorgeous, pure, and precious soul to ever exist.",
        scrollHint: "Scroll down for all your surprises ↓"
    },

    // 🎂 Interactive Birthday Cake
    cake: {
        title: "Make a Birthday Wish",
        instruction: "Close your eyes, picture the dream closest to your heart, and blow out the candles!",
        buttonText: "✨ Make a Wish & Blow the Candles ✨",
        wishGrantedTitle: "🎉 Happy Birthday Dear BF Jii 🎉",
        wishGrantedMessage: "Have a Amazing Birthday! May your Life be filled with love, laughter, and all the happiness in the world. You deserve nothing but the best, today and always. 💖 God's Favorito Angel 🪽"
    },

    // 📸 Polaroid Photo Gallery
    // You can drop your photos into 'assets/images/' (e.g. photo1.jpg, photo2.jpg)
    // Add as many photos as you want!
    gallery: [
        {
            image: "assets/images/photo1.jpg",
            fallback: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80",
            caption: "Your infectious smile that brightens my darkest days.",
            date: "A Smile That Melts My Heart"
        },
        {
            image: "assets/images/photo2.jpeg",
            fallback: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&auto=format&fit=crop&q=80",
            caption: "The way you look at the world with so much kindness.",
            date: "Pure Magic"
        },
        {
            image: "assets/images/photo3.jpeg",
            fallback: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80",
            caption: "Unforgettable adventures, laughing until our stomachs hurt.",
            date: "Forever With You"
        },
        {
            image: "assets/images/photo4.jpg",
            fallback: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
            caption: "Breathtakingly gorgeous in every single way.",
            date: "My Favorite View"
        },
        {
            image: "assets/images/photo5.jpg",
            fallback: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=80",
            caption: "Holding your hand is where I always feel at home.",
            date: "Warmth & Love"
        },
        {
            image: "assets/images/photo6.jpg",
            fallback: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=80",
            caption: "To a lifetime more of birthdays and memories with you.",
            date: "Endless Tomorrow"
        }
    ],

    // 🎬 Video Showcase
    // Save your personal video clip or montage into 'assets/video/her_video.mp4'
    video: {
        title: "A Video Made Just For You 🎥",
        subtitle: "Turn your volume up and watch this little trip down our memory lane.",
        src: "assets/video/her_video.mp4",
        fallback: "https://assets.mixkit.co/videos/preview/mixkit-romantic-couple-on-the-beach-at-sunset-41618-large.mp4",
        caption: "Every second captured here is a reminder of how blessed I am to have you in my life."
    },

    // 💖 Reasons Why I Love You (Interactive Cards)
    reasons: [
        {
            icon: "✨",
            title: "Your Gentle Heart",
            text: "You care for people and animals with a warmth and sincerity that is so rare in this world. You inspire me to be kinder."
        },
        {
            icon: "🌸",
            title: "Your Gorgeous Smile",
            text: "Nothing in this world compares to that split second when you catch my eye and give me that sweet, warm smile."
        },
        {
            icon: "❤️",
            title: "Simply You",
            text: "U are the Most Amazing Soul in Existence. Your love has transformed my world in ways I never thought possible. I thank the universe every day for bringing you into my life."
        }
    ],

    // 💌 Wax-Sealed Love Letter
    letter: {
        title: "A Heartfelt Letter To My Girl",
        subtitle: "Click the wax seal to unfold what's in my heart",
        sealText: "WITH LOVE",
        greeting: "My Dearest Love,",
        paragraphs: [
            "Happy Birthday to the most extraordinary person in my life. As another beautiful year is added to your journey, I want to say that you are truely the most precious gift I have ever received. Your love has transformed my world in ways I never thought possible. I thank the universe every day for bringing you into my life.",
            "You have brought so much light into my life and have filled my days with laughter, love, and endless joy. Your presence is a gift I treasure beyond words.",
            "I want you to know that wherever this life takes us, I promise to walk beside you, cheer for your dreams, dry any tear that falls, and celebrate every single victory by your side.",
            "May this upcoming year shower you with endless opportunities, deep joy, good health, and sweet surprises. You deserve the entire universe, but until I can wrap it up for you, you have my whole heart."
        ],
        closing: "Forever and always yours,",
        signature: "Chetan ❤️"
    },

    // 🎵 Music Settings
    music: {
        // Place your MP3 file in 'assets/audio/romantic_song.mp3'
        src: "assets/audio/romantic_song.mp3",
        // Royalty-free acoustic romantic piano as backup so music plays out of the box
        fallback: "https://cdn.pixabay.com/download/audio/2022/05/16/audio_c1e0958d51.mp3?filename=romantic-piano-112199.mp3",
        volume: 0.65
    }
};
