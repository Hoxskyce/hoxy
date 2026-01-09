// Inisialisasi tahun di footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Membuat efek salju
function createSnowflakes() {
    const snowflakesContainer = document.querySelector('.snowflakes');
    const snowflakeCount = 50;
    
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        // Ukuran random
        const size = Math.random() * 10 + 5;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        
        // Posisi awal random
        snowflake.style.left = `${Math.random() * 100}vw`;
        
        // Animasi
        const duration = Math.random() * 10 + 10;
        snowflake.style.animationDuration = `${duration}s`;
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
        
        // Opacity random
        snowflake.style.opacity = Math.random() * 0.5 + 0.3;
        
        snowflakesContainer.appendChild(snowflake);
    }
}

// Efek ketik pada tagline
function typeWriterEffect() {
    const tagline = document.querySelector('.tagline');
    const text = tagline.textContent;
    tagline.textContent = '';
    
    let i = 0;
    function type() {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    }
    setTimeout(type, 1000);
}

// Efek parallax pada scroll
function setupParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        hero.style.transform = `translateY(${scrolled * 0.1}px)`;
    });
}

// Animasi skill bars saat scroll
function animateSkillsOnScroll() {
    const skillBars = document.querySelectorAll('.skill-level');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                skillBar.style.animation = 'fillBar 2s ease-out forwards';
                observer.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Efek hover pada card
function setupCardHover() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.zIndex = '10';
        });
        card.addEventListener('mouseleave', () => {
            card.style.zIndex = 'auto';
        });
    });
}

// Glitch text interval
function setupGlitchEffect() {
    const glitchText = document.querySelector('.glitch-text');
    setInterval(() => {
        glitchText.style.animation = 'none';
        void glitchText.offsetWidth; // Trigger reflow
        glitchText.style.animation = 'glitch 5s infinite';
    }, 5000);
}

// Particle effect untuk background
function createParticles() {
    const container = document.querySelector('.container');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Posisi random
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Ukuran random
        const size = Math.random() * 4 + 1;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            pointer-events: none;
            z-index: 1;
            animation: float ${Math.random() * 20 + 10}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        container.appendChild(particle);
    }
    
    // Tambahkan CSS untuk animasi float
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(90deg); }
            50% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(180deg); }
            75% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(270deg); }
        }
    `;
    document.head.appendChild(style);
}

// Fungsi untuk mengontrol audio player
function setupAudioPlayer() {
    const audioPlayer = document.getElementById('bgMusic');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playIcon = document.getElementById('playIcon');
    const volumeSlider = document.getElementById('volumeSlider');
    const progressBar = document.getElementById('progressBar');
    const progress = document.getElementById('progress');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    
    // Format waktu dari detik ke menit:detik
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Update waktu dan progress bar
    function updateProgress() {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;
        
        if (duration) {
            const progressPercent = (currentTime / duration) * 100;
            progress.style.width = `${progressPercent}%`;
            currentTimeEl.textContent = formatTime(currentTime);
            durationEl.textContent = formatTime(duration);
        }
    }
    
    // Set progress bar ketika diklik
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;
        
        if (duration) {
            audioPlayer.currentTime = (clickX / width) * duration;
        }
    }
    
    // Fungsi untuk toggle play/pause
    function togglePlayPause() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
            playPauseBtn.setAttribute('aria-label', 'Jeda musik');
        } else {
            audioPlayer.pause();
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
            playPauseBtn.setAttribute('aria-label', 'Putar musik');
        }
    }
    
    // Fungsi untuk mengatur volume
    function setVolume() {
        audioPlayer.volume = volumeSlider.value / 100;
    }
    
    // Event listeners untuk audio player
    playPauseBtn.addEventListener('click', togglePlayPause);
    volumeSlider.addEventListener('input', setVolume);
    progressBar.addEventListener('click', setProgress);
    
    // Update progress secara berkala
    audioPlayer.addEventListener('timeupdate', updateProgress);
    
    // Update ikon ketika audio selesai
    audioPlayer.addEventListener('ended', function() {
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
    });
    
    // Update durasi ketika metadata audio dimuat
    audioPlayer.addEventListener('loadedmetadata', function() {
        durationEl.textContent = formatTime(audioPlayer.duration);
    });
    
    // Atur volume awal
    audioPlayer.volume = volumeSlider.value / 100;
}

// Smooth scroll untuk anchor links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Efek loading saat halaman dimuat
function setupPageLoadEffect() {
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
}

// Inisialisasi semua efek ketika halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    createSnowflakes();
    typeWriterEffect();
    setupParallax();
    animateSkillsOnScroll();
    setupCardHover();
    setupGlitchEffect();
    createParticles();
    setupAudioPlayer();
    setupSmoothScroll();
    setupPageLoadEffect();
    
    // Tambahkan efek ketik untuk semua card
    const cards = document.querySelectorAll('.card p, .project-item p');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.animation = 'fadeIn 0.5s ease-out forwards';
        card.style.animationDelay = '0.5s';
    });
    
    // Tambahkan tahun di footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});