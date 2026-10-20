/**
 * Main Interactive Logic for Girlfriend's Romantic Birthday Website
 */

class RomanticBirthdayApp {
    constructor() {
        this.config = typeof CONFIG !== 'undefined' ? CONFIG : {};
        this.audioElement = null;
        this.isPlayingAudio = false;
        this.webAudioSynthesizer = null;
        this.currentLightboxIndex = 0;
        this.candlesBlown = false;

        this.init();
    }

    init() {
        this.applyConfigData();
        this.setupEntrance();
        this.setupAudio();
        this.setupCake();
        this.setupGallery();
        this.setupReasons();
        this.setupLetter();
        this.setupLightbox();
    }

    /* -------------------------------------------------------------------------- */
    /* 1. APPLY CONFIG DATA                                                       */
    /* -------------------------------------------------------------------------- */
    applyConfigData() {
        const c = this.config;

        // Title & Headings
        if (c.herName) {
            document.title = `Happy Birthday, ${c.herName}! 💖`;
            const herNameEls = document.querySelectorAll('.dynamic-her-name');
            herNameEls.forEach(el => el.textContent = c.herName);
        }

        if (c.nickname) {
            const nicknameEls = document.querySelectorAll('.dynamic-nickname');
            nicknameEls.forEach(el => el.textContent = c.nickname);
        }

        // Entrance
        if (c.entrance) {
            const entTitle = document.getElementById('entranceTitle');
            const entSub = document.getElementById('entranceSubtitle');
            const entBtn = document.getElementById('openSurpriseBtn');
            if (entTitle && c.entrance.title) entTitle.textContent = c.entrance.title;
            if (entSub && c.entrance.subtitle) entSub.textContent = c.entrance.subtitle;
            if (entBtn && c.entrance.buttonText) entBtn.innerHTML = c.entrance.buttonText;
        }

        // Hero
        if (c.hero) {
            const heroBadge = document.getElementById('heroBadge');
            const heroTitle = document.getElementById('heroTitle');
            const heroSub = document.getElementById('heroSubtext');
            const scrollHint = document.getElementById('scrollHintText');
            if (heroBadge && c.hero.badge) heroBadge.textContent = c.hero.badge;
            if (heroTitle && c.hero.title) heroTitle.textContent = c.hero.title;
            if (heroSub && c.hero.subtext) heroSub.textContent = c.hero.subtext;
            if (scrollHint && c.hero.scrollHint) scrollHint.textContent = c.hero.scrollHint;
        }

        // Cake
        if (c.cake) {
            const cakeTitle = document.getElementById('cakeTitle');
            const cakeSub = document.getElementById('cakeSubtitle');
            const blowBtn = document.getElementById('blowCandlesBtn');
            const wishTitle = document.getElementById('wishTitle');
            const wishMsg = document.getElementById('wishMessage');
            if (cakeTitle && c.cake.title) cakeTitle.textContent = c.cake.title;
            if (cakeSub && c.cake.instruction) cakeSub.textContent = c.cake.instruction;
            if (blowBtn && c.cake.buttonText) blowBtn.innerHTML = c.cake.buttonText;
            if (wishTitle && c.cake.wishGrantedTitle) wishTitle.textContent = c.cake.wishGrantedTitle;
            if (wishMsg && c.cake.wishGrantedMessage) wishMsg.textContent = c.cake.wishGrantedMessage;
        }

        // Video
        if (c.video) {
            const videoTitle = document.getElementById('videoTitle');
            const videoSub = document.getElementById('videoSubtitle');
            const videoCaption = document.getElementById('videoCaption');
            const videoEl = document.getElementById('herVideo');
            if (videoTitle && c.video.title) videoTitle.textContent = c.video.title;
            if (videoSub && c.video.subtitle) videoSub.textContent = c.video.subtitle;
            if (videoCaption && c.video.caption) videoCaption.textContent = c.video.caption;
            
            if (videoEl) {
                // Try configured video path, fallback gracefully
                videoEl.src = c.video.src || c.video.fallback;
                videoEl.onerror = () => {
                    if (c.video.fallback && videoEl.src !== c.video.fallback) {
                        videoEl.src = c.video.fallback;
                    }
                };
            }
        }
    }

    /* -------------------------------------------------------------------------- */
    /* 2. SURPRISE ENTRANCE                                                       */
    /* -------------------------------------------------------------------------- */
    setupEntrance() {
        const overlay = document.getElementById('entranceOverlay');
        const openBtn = document.getElementById('openSurpriseBtn');
        const giftBox = document.getElementById('giftBoxIcon');

        const handleOpen = () => {
            if (overlay.classList.contains('opened')) return;

            // Trigger celebratory burst
            if (window.triggerCelebrationBurst) {
                window.triggerCelebrationBurst(window.innerWidth / 2, window.innerHeight / 2, 90);
            }

            // Start romantic background music
            this.playAudio();

            // Fade out entrance curtain
            overlay.classList.add('opened');
        };

        if (openBtn) openBtn.addEventListener('click', handleOpen);
        if (giftBox) giftBox.addEventListener('click', handleOpen);
    }

    /* -------------------------------------------------------------------------- */
    /* 3. ROMANTIC AUDIO SYSTEM (MP3 + Procedural Piano Fallback)                 */
    /* -------------------------------------------------------------------------- */
    setupAudio() {
        const musicBtn = document.getElementById('musicToggleBtn');
        const musicConfig = this.config.music || {};

        this.audioElement = new Audio();
        this.audioElement.src = musicConfig.src || musicConfig.fallback || '';
        this.audioElement.loop = true;
        this.audioElement.volume = musicConfig.volume || 0.6;

        // Fallback to online romantic piano if local file doesn't exist
        this.audioElement.addEventListener('error', () => {
            if (musicConfig.fallback && this.audioElement.src !== musicConfig.fallback) {
                this.audioElement.src = musicConfig.fallback;
                if (this.isPlayingAudio) {
                    this.audioElement.play().catch(() => this.startProceduralPiano());
                }
            } else {
                // If network is offline, synthesize soothing romantic music!
                if (this.isPlayingAudio) {
                    this.startProceduralPiano();
                }
            }
        });

        if (musicBtn) {
            musicBtn.addEventListener('click', () => {
                if (this.isPlayingAudio) {
                    this.pauseAudio();
                } else {
                    this.playAudio();
                }
            });
        }
    }

    playAudio() {
        this.isPlayingAudio = true;
        const musicBtn = document.getElementById('musicToggleBtn');
        if (musicBtn) musicBtn.classList.remove('music-paused');

        if (this.audioElement && this.audioElement.src) {
            const playPromise = this.audioElement.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // Start synthesized piano if autoplay blocked or network error
                    this.startProceduralPiano();
                });
            }
        } else {
            this.startProceduralPiano();
        }
    }

    pauseAudio() {
        this.isPlayingAudio = false;
        const musicBtn = document.getElementById('musicToggleBtn');
        if (musicBtn) musicBtn.classList.add('music-paused');

        if (this.audioElement) {
            this.audioElement.pause();
        }
        if (this.webAudioSynthesizer) {
            this.webAudioSynthesizer.pause();
        }
    }

    // Gentle romantic chord progression via Web Audio API
    startProceduralPiano() {
        if (this.webAudioSynthesizer) {
            this.webAudioSynthesizer.resume();
            return;
        }

        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioCtx();
            const chords = [
                [261.63, 329.63, 392.00, 523.25], // C major
                [220.00, 261.63, 329.63, 440.00], // A minor
                [174.61, 220.00, 261.63, 349.23], // F major
                [196.00, 246.94, 293.66, 392.00]  // G major
            ];
            let currentChord = 0;
            let timer = null;

            const playNote = (freq, duration, delay) => {
                setTimeout(() => {
                    if (!this.isPlayingAudio) return;
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(freq, ctx.currentTime);

                    gain.gain.setValueAtTime(0.001, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.1);
                    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start();
                    osc.stop(ctx.currentTime + duration);
                }, delay * 1000);
            };

            const chordCycle = () => {
                if (!this.isPlayingAudio) return;
                const chord = chords[currentChord];
                chord.forEach((freq, idx) => {
                    playNote(freq, 2.5, idx * 0.25);
                });
                currentChord = (currentChord + 1) % chords.length;
                timer = setTimeout(chordCycle, 2800);
            };

            chordCycle();

            this.webAudioSynthesizer = {
                pause: () => {
                    if (timer) clearTimeout(timer);
                    ctx.suspend();
                },
                resume: () => {
                    ctx.resume();
                    chordCycle();
                }
            };
        } catch (e) {
            console.log('Procedural audio fallback not supported:', e);
        }
    }

    // Sweet chime sound when blowing candles or breaking wax seal
    playChimeSound() {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioCtx();
            const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
            notes.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);
                gain.gain.setValueAtTime(0.001, ctx.currentTime + i * 0.12);
                gain.gain.exponentialRampToValueAtTime(0.1, ctx.currentTime + i * 0.12 + 0.05);
                gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.12 + 1.2);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(ctx.currentTime + i * 0.12);
                osc.stop(ctx.currentTime + i * 0.12 + 1.2);
            });
        } catch (e) {}
    }

    /* -------------------------------------------------------------------------- */
    /* 4. BIRTHDAY CAKE & CANDLE BLOWING                                          */
    /* -------------------------------------------------------------------------- */
    setupCake() {
        const blowBtn = document.getElementById('blowCandlesBtn');
        const flames = document.querySelectorAll('.flame');
        const wishCard = document.getElementById('wishCard');

        if (blowBtn) {
            blowBtn.addEventListener('click', () => {
                if (this.candlesBlown) return;
                this.candlesBlown = true;

                // Blow out flames
                flames.forEach(f => f.classList.add('blown-out'));

                // Play celebration chime
                this.playChimeSound();

                // Explode colorful confetti & hearts
                if (window.triggerCelebrationBurst) {
                    const rect = blowBtn.getBoundingClientRect();
                    window.triggerCelebrationBurst(rect.left + rect.width / 2, rect.top, 140);
                }
                if (window.triggerConfettiStream) {
                    window.triggerConfettiStream(3500);
                }

                // Show wish reveal card
                setTimeout(() => {
                    if (wishCard) wishCard.classList.add('show');
                    blowBtn.innerHTML = '✨ Wish Sent to the Universe! 💖';
                    blowBtn.style.opacity = '0.85';
                    blowBtn.style.pointerEvents = 'none';
                }, 600);
            });
        }
    }

    /* -------------------------------------------------------------------------- */
    /* 5. POLAROID PHOTO GALLERY                                                  */
    /* -------------------------------------------------------------------------- */
    setupGallery() {
        const galleryGrid = document.getElementById('polaroidGrid');
        const galleryData = this.config.gallery || [];
        if (!galleryGrid) return;

        galleryGrid.innerHTML = '';

        galleryData.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'polaroid-card';
            card.dataset.index = index;

            const imgBox = document.createElement('div');
            imgBox.className = 'polaroid-img-box';

            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.caption || `Memory ${index + 1}`;
            img.loading = 'lazy';

            // Graceful fallback to aesthetic Unsplash photo if local photo is not yet loaded
            img.onerror = () => {
                if (item.fallback && img.src !== item.fallback) {
                    img.src = item.fallback;
                }
            };

            imgBox.appendChild(img);

            const caption = document.createElement('div');
            caption.className = 'polaroid-caption';
            caption.textContent = item.caption || `Our Memory #${index + 1}`;

            const date = document.createElement('span');
            date.className = 'polaroid-date';
            date.textContent = item.date || 'Sweet Memory';

            card.appendChild(imgBox);
            card.appendChild(caption);
            card.appendChild(date);

            card.addEventListener('click', () => {
                this.openLightbox(index);
            });

            galleryGrid.appendChild(card);
        });
    }

    /* -------------------------------------------------------------------------- */
    /* 6. LIGHTBOX MODAL                                                          */
    /* -------------------------------------------------------------------------- */
    setupLightbox() {
        const modal = document.getElementById('lightboxModal');
        const closeBtn = document.getElementById('lightboxClose');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeLightbox());
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.closeLightbox();
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeLightbox();
        });
    }

    openLightbox(index) {
        const modal = document.getElementById('lightboxModal');
        const img = document.getElementById('lightboxImg');
        const caption = document.getElementById('lightboxCaption');
        const galleryData = this.config.gallery || [];
        const item = galleryData[index];

        if (!modal || !item) return;

        this.currentLightboxIndex = index;
        img.src = item.image;
        img.onerror = () => {
            if (item.fallback) img.src = item.fallback;
        };
        caption.textContent = item.caption || '';
        modal.classList.add('active');
    }

    closeLightbox() {
        const modal = document.getElementById('lightboxModal');
        if (modal) modal.classList.remove('active');
    }

    /* -------------------------------------------------------------------------- */
    /* 7. REASONS WHY I LOVE YOU                                                  */
    /* -------------------------------------------------------------------------- */
    setupReasons() {
        const grid = document.getElementById('reasonsGrid');
        const reasonsData = this.config.reasons || [];
        if (!grid) return;

        grid.innerHTML = '';

        reasonsData.forEach((r) => {
            const card = document.createElement('div');
            card.className = 'reason-card';

            card.innerHTML = `
                <div class="reason-icon">${r.icon || '💖'}</div>
                <h3 class="reason-title">${r.title || 'Because You Are Magic'}</h3>
                <p class="reason-text">${r.text || ''}</p>
            `;

            grid.appendChild(card);
        });
    }

    /* -------------------------------------------------------------------------- */
    /* 8. WAX-SEALED LOVE LETTER                                                  */
    /* -------------------------------------------------------------------------- */
    setupLetter() {
        const waxSealWrapper = document.getElementById('waxSealWrapper');
        const letterPaper = document.getElementById('letterPaper');
        const letterConfig = this.config.letter || {};

        if (!waxSealWrapper || !letterPaper) return;

        // Populate Letter Content
        const greetingEl = document.getElementById('letterGreeting');
        const bodyEl = document.getElementById('letterBody');
        const closingEl = document.getElementById('letterClosing');
        const sigEl = document.getElementById('letterSignature');

        if (greetingEl) greetingEl.textContent = letterConfig.greeting || 'My Dearest Love,';
        if (closingEl) closingEl.textContent = letterConfig.closing || 'Forever and always yours,';
        if (sigEl) sigEl.textContent = letterConfig.signature || 'Yours Always ❤️';

        if (bodyEl && letterConfig.paragraphs) {
            bodyEl.innerHTML = letterConfig.paragraphs
                .map(p => `<p class="letter-paragraph">${p}</p>`)
                .join('');
        }

        // Crack wax seal interaction
        waxSealWrapper.addEventListener('click', () => {
            this.playChimeSound();
            waxSealWrapper.style.display = 'none';
            letterPaper.classList.add('open');

            if (window.triggerCelebrationBurst) {
                const rect = letterPaper.getBoundingClientRect();
                window.triggerCelebrationBurst(rect.left + rect.width / 2, rect.top + 80, 70);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.romanticApp = new RomanticBirthdayApp();
});
