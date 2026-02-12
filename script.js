// Variabel Global
let partnerName = localStorage.getItem('partnerName') || '';
let anniversaryDate = localStorage.getItem('anniversaryDate') || '';
let theme = localStorage.getItem('theme') || 'light';
let confessions = JSON.parse(localStorage.getItem('confessions')) || [];
let memoryGameCards = []; // Untuk Memory Game
let flippedCards = []; // Untuk Memory Game
let matchedPairs = 0; // Untuk Memory Game
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Konfigurasi Hari Spesial (Data digabungkan di sini)
const specialDatesConfig = {
    "14-2": { title: "Valentine Day 🌹", type: "fixed", msg: "Hari kasih sayang ini hanyalah pengingat kecil, karena bagi Fadli, setiap hari adalah hari untuk menyayangimu. ❤️" },
    "15-7": { title: "Birthday Sayang 🎂", type: "birthday", startYear: 2007 },
    "22-4": { title: "Anniversary Kita 💖", type: "anniversary", startYear: 2025 }
};
// Letakkan di area Variabel Global (Paling Atas)
const puzzleImages = [
    "Love.jpg",
    "Kenangan1.jpg",
    "Kenangan2.jpg",
    "Kenangan3.jpg",
    "Kenangan4.jpg",
    "Kenangan5.jpg",
    "Kenangan6.jpg",
    "Kenangan7.jpg",
    "Kenangan8.jpg",
    "Kenangan9.jpeg",
    "Kenangan10.jpeg",
];
let puzzleOrder = [];
let currentPuzzleImage = "";
// Array Data untuk Fitur
const quotes = [
    "Setiap hari bersamamu terasa seperti keajaiban kecil yang tak pernah habis Terima kasih sudah mencintaiku dengan cara yang begitu hangat dan tulus,Kamu bukan hanya bagian dari hidupku kamu adalah alasanku untuk terus tersenyum setiap hari. 💖",
    "Aku jatuh cinta dengan caramu tersenyum, tapi aku jatuh cinta lebih dalam dengan caramu tersenyum kepadaku. 💖",
    "Kamu adalah alasan aku percaya pada takdir. 🌟",
    "Cinta sejati adalah ketika kamu tidak perlu kata-kata untuk mengungkapkan perasaanmu. 💘",
    "Setiap hari bersamamu adalah petualangan baru. 🥰",
    "Dunia terasa jauh lebih tenang dan berwarna sejak kamu datang membawa cinta yang begitu tulus ke dalam hari-hariku.",
    "Meski musim berganti dan waktu terus berlalu, perasaanku padamu akan tetap sama dan bahkan tumbuh lebih kuat setiap harinya.💘",

];

const petNames = [
    "Sayang", "Beb", "Seng", "Cantik" ,"Bidadariku","Kesayangan Fadli"
];

const affirmations = [
    "Kamu hebat dan aku selalu bangga padamu. 💕",
    "Cintamu membuat dunia ini lebih indah. 🌸",
    "Kita adalah hati yang tak akan terpisahkan. 💑",
    "Setiap momen bersamamu adalah kebahagianku. ",
    "Aku mencintaimu lebih dari apa pun. 💖",
    "Aku mencintaimu dengan sepenuh hati, hari ini dan selamanya 💞",
    "Terima kasih sudah hadir dan mencintaiku dengan sepenuh hati.Kamu adalah anugerah terindah dalam hidupku.Semoga Tuhan selalu menjaga kita, menguatkan cinta ini, dan menyatukan langkah kita hingga akhir waktu.Aku ingin tetap bersamamu, sekarang dan selamanya. 🤍"
];

// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('login-page')) {
        initLogin();
    } else if (document.body.classList.contains('dashboard-page')) {
        initDashboard();
        showWelcomeMessage(); // Fungsi baru untuk sapaan romantis
        startHeartParticles(); 
    }
});

function initLogin() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const partnerName = document.getElementById('partnerName').value;
        const anniversaryDate = document.getElementById('anniversaryDate').value;
        
        localStorage.setItem('partnerName', partnerName);
        localStorage.setItem('anniversaryDate', anniversaryDate);
        
        window.location.href = 'dashboard.html';
    });
}

function showWelcomeMessage() {
    const name = localStorage.getItem('partnerName') || 'Sayang';
    const card = document.getElementById('welcomeCard');
    const text = document.getElementById('welcomeText');
    
    if (card && text) {
        // Set pesan
        text.innerText = `Selamat Datang ${name} Sayang!`;
        
        // Munculkan kartu (hapus class hidden)
        card.classList.remove('hidden');

        // Hilangkan kartu setelah 4 detik (4000ms)
        setTimeout(() => {
            card.style.opacity = '0'; // Efek fade out
            
            // Benar-benar hapus dari layar setelah animasi fade out selesai
            setTimeout(() => {
                card.style.display = 'none';
            }, 1000); 
            
        }, 1800);
    }
}

// Dashboard
// 1. DAFTAR LAGU (Taruh di luar agar bisa dibaca semua fungsi)
const playlist = [
    "Nadhif Basalamah - bergema sampai selamanya (Official Audio).mp3",
    "angel baby.mp3",
    "ssstik.io_1769953662192.mp3",
    "ssstik.io_1769954186618.mp3"
];

// 2. FUNGSI PUTAR MUSIK (Berdiri sendiri)
function playRandomMusic() {
    const audio = document.getElementById('bgMusic');
    const source = document.getElementById('musicSource');
    
    if (audio && source) {
        // Pilih lagu random dari array playlist
        const randomSong = playlist[Math.floor(Math.random() * playlist.length)];
        source.src = randomSong;
        
        // Muat ulang dan putar
        audio.load();
        audio.play().catch(() => {
            console.log("Menunggu interaksi user untuk memulai musik...");
        });

        // --- TAMBAHKAN LOGIKA INI ---
        // Ketika lagu selesai, panggil lagi fungsi ini untuk lagu berikutnya
        audio.onended = () => {
            console.log("Lagu selesai, memutar lagu acak berikutnya...");
            playRandomMusic();
        };
    }
}
// 3. FUNGSI DASHBOARD (Berdiri sendiri)
function initDashboard() {
    applyTheme();
    loadPage('home');
    initNav();
    initThemeToggle();
    initMuteToggle();
    playRandomMusic();// Memanggil fungsi musik di atas
    initNotificationListener();
    updateProfileHeader(); 
    updateOnlineStatus();
    loadConfessions();
    checkAnniversaryGlow();
    
    
    // Logika Suara Bebek/Ayam
    const pet = document.getElementById('petPeek');
    const sound = document.getElementById('soundPet');

    if (pet && sound) {
        pet.onclick = () => {
            sound.currentTime = 0; 
            sound.play().catch(e => console.log("Izin audio diperlukan"));
            triggerConfetti();
        };
    }
}

function initNav() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('open');
    });
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.dataset.page;
            
            navMenu.classList.remove('open');
            loadPage(page);
            window.scrollTo(0,0);
        });
    });
    
}

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');

    if (themeToggle && themeIcon) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            // Simpan pilihan user ke localStorage
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            // Ganti ikon: matahari saat dark mode, bulan saat light mode
            themeIcon.className = isDark ? 'ri-sun-line' : 'ri-moon-line';
        applyTheme();
        triggerConfetti(); 
    });
    }
document.addEventListener('click', (e) => {
        // Cek apakah menu sedang terbuka
        if (navMenu.classList.contains('open')) {
            const isClickInsideMenu = navMenu.contains(e.target);
            const isClickOnHamburger = hamburger.contains(e.target);
            
            // Logika: Jika klik terjadi pada overlay (::before) 
            // atau benar-benar di luar elemen menu dan bukan tombol hamburger
            if (!isClickInsideMenu || e.target === navMenu) {
                if (!isClickOnHamburger) {
                    navMenu.classList.remove('open');
                }
            }
        }
    });
}

function applyTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.getElementById('themeIcon');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeIcon) themeIcon.className = 'ri-sun-line'; // Ikon matahari
    } else {
        document.body.classList.remove('dark-mode');
        if (themeIcon) themeIcon.className = 'ri-moon-line'; // Ikon bulan
    }
}

function initMuteToggle() {
    const muteToggle = document.getElementById('muteToggle');
    const muteIcon = document.getElementById('muteIcon');
    const audio = document.getElementById('bgMusic');
    if (muteToggle && muteIcon && audio) {
        muteToggle.addEventListener('click', () => {
            audio.muted = !audio.muted;
            // Ganti class ikon: volume nyala vs mute
            muteIcon.className = audio.muted ? 'ri-volume-mute-line' : 'ri-volume-up-line';
        });
    }
}

// Partikel Hati Terus-Menerus
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-particle');
    
    // Daftar emoji hati yang berbeda
    const heartTypes = ['💖', '💗', '💓', '💕', '❤️','🥰','🫶🏻','😜','🌏','❤️‍🔥'];
    heart.innerText = heartTypes[Math.floor(Math.random() * heartTypes.length)];
    
    // Posisi acak horizontal
    heart.style.left = Math.random() * 100 + "vw";
    
    // Ukuran acak
    heart.style.fontSize = Math.random() * 1.5 + 0.5 + "rem";
    
    // Kecepatan jatuh acak (antara 3 - 6 detik)
    const duration = Math.random() * 3 + 3;
    heart.style.animationDuration = duration + "s";
    
    // Transparansi acak
    heart.style.opacity = Math.random() * 0.5 + 0.5;

    document.body.appendChild(heart);

    // Hapus hati dari DOM setelah selesai animasi
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Jalankan fungsi createHeart setiap 300ms
setInterval(createHeart, 300);

// Efek Confetti
function triggerConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 2000);
    }
}

function loadPage(page) {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Tambahkan ini jika ingin efek scroll yang lembut//
    });
    const content = document.getElementById('mainContent');
    content.innerHTML = '';
    switch (page) {
   case 'home':
    // 1. Logika Ucapan Berdasarkan Waktu
    const jamNow = new Date().getHours();
    let ucapanNow;
    if (jamNow >= 5 && jamNow < 11) ucapanNow = "Selamat Pagi Sayang Jangan Lupa Semangat Buat Hari Ini";
    else if (jamNow >= 11 && jamNow < 15) ucapanNow = "Selamat Siang Sayang, Jangan Lupa Makan Ya";
    else if (jamNow >= 15 && jamNow < 19) ucapanNow = "Selamat Sore Sayangku";
    else ucapanNow = "Selamat Malam Sayang Jangan Lupa Istirahat ya";

    content.innerHTML = `
        <div class="home-wrapper" style="padding: 20px 15px; perspective: 1000px;">
            <div class="card-container" style="position: relative; margin-bottom: 20px;">
                <div class="card-glow" style="position: absolute; width: 120%; height: 120%; background: radial-gradient(circle, rgba(255,182,193,0.3) 0%, transparent 70%); top: -10%; left: -10%; filter: blur(40px); z-index: -1;"></div>
                <div class="card home-hero premium-box floating-animation" style="overflow: visible; border-radius: 30px; border: 1px solid rgba(255,255,255,0.4); background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(10px); box-shadow: 0 20px 40px rgba(0,0,0,0.05); padding: 30px 20px;">
                    <div class="hero-header" style="text-align: center; margin-bottom: 25px;">
                        <p style="font-size: 0.8rem; color: #ff69b4; margin-bottom: 5px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">${ucapanNow} ✨</p>
                        <h1 class="romantic-text jumbo-text" style="font-size: 3.2rem; background: linear-gradient(45deg, #ff1493, #ff69b4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0; line-height: 1.2; padding-top: 10px;">
                             Hai, ${partnerName}💕
                        </h1>
                    </div>
                    <div class="anniv-info-v2" style="display: flex; gap: 15px; justify-content: center; margin-bottom: 25px;">
                        <div class="info-box-v2 highlight-box" style="flex: 1; text-align: center; background: white; padding: 15px; border-radius: 20px; box-shadow: 0 5px 15px rgba(0,0,0,0.03);">
                            <span class="label" style="display: block; font-size: 0.75rem; color: #888; text-transform: uppercase; letter-spacing: 1px;">📅 Sejak</span>
                            <span class="value" style="font-weight: bold; color: #444; font-size: 1.1rem;">${anniversaryDate}</span>
                        </div>
                        <div class="info-box-v2 highlight-box" style="flex: 1; text-align: center; background: white; padding: 15px; border-radius: 20px; box-shadow: 0 5px 15px rgba(0,0,0,0.03); position: relative;">
                            <span class="label" style="display: block; font-size: 0.75rem; color: #888; text-transform: uppercase; letter-spacing: 1px;">⏳ Bersama</span>
                            <span class="value" style="font-weight: bold; color: #ff1493; font-size: 1.1rem;">${calculateRelationshipDuration()} Hari</span>
                            <div id="homeHeart" class="home-heartbeat" style="position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%); font-size: 1.2rem;">❤️</div>
                        </div>
                    </div>
                    <div class="mood-tracker" style="text-align: center; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 20px;">
                        <p style="font-size: 0.8rem; color: #888; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px;">Gimana perasaan Fita hari ini? ✨</p>
                        <div class="mood-buttons" style="display: flex; justify-content: center; gap: 15px;">
                            <button onclick="checkMood('happy')" class="mood-btn">😊</button>
                            <button onclick="checkMood('sad')" class="mood-btn">🥺</button>
                            <button onclick="checkMood('tired')" class="mood-btn">😴</button>
                            <button onclick="checkMood('love')" class="mood-btn">💖</button>
                        </div>
                    </div>
                    <div class="corner-emoji-v3" style="position: absolute; top: -10px; right: 10px; font-size: 2rem;">🧸</div>
                    <div class="corner-emoji-v3" style="position: absolute; bottom: -10px; left: 10px; font-size: 2.5rem;">🐣</div>
                </div>
            </div>

            <div class="card message-card-v3 reveal-animation" style="margin-bottom: 20px; border-radius: 25px; background: white; padding: 25px; text-align: center; box-shadow: 0 15px 30px rgba(255,182,193,0.2);">
                <p class="main-message" style="line-height: 1.6; color: #555; font-size: 1.05rem; margin: 0;">
                    Terima kasih <b>Fita</b> sudah hadir dan bertahan. <br>
                    <span style="color: #ff1493; font-style: italic;">"Setiap hari bersamamu adalah bagian terbaik dalam hidupku."</span> 💞
                </p>
            </div>

            <div class="card flower-card reveal-animation" style="text-align: center; background: white; border-radius: 25px; padding: 25px; box-shadow: 0 15px 30px rgba(255,182,193,0.15); position: relative; overflow: hidden;">
                <h3 class="romantic-text" style="font-size: 1.8rem; color: #ff69b4; margin-bottom: 5px;">Bunga Cinta Kita ✨</h3>
                <p style="font-size: 0.75rem; color: #888; margin-bottom: 10px;">
    Tumbuh subur sejak ${localStorage.getItem('anniversaryDate')}
</p>
                <div id="flowerContainer" style="font-size: 5rem; margin: 15px 0; min-height: 80px;"></div>
                <div id="flowerStatus" style="font-weight: bold; color: #ff1493; font-size: 1rem;"></div>
                <p id="flowerDesc" style="font-size: 0.85rem; color: #666; font-style: italic; margin-top: 5px;"></p>
            </div>
        </div>
    `;

    // --- Eksekusi Fungsi ---
    function updateLoveFlower() {
    const container = document.getElementById('flowerContainer');
    const status = document.getElementById('flowerStatus');
    const desc = document.getElementById('flowerDesc');
    
    if(!container) return;

    // 1. Ambil tanggal dari localStorage (hasil input login)
    let anniv = localStorage.getItem('anniversaryDate');
    if (!anniv) return;

    // 2. Konversi string tanggal ke format Date yang dipahami JS
    // Menangani format DD/MM/YYYY atau YYYY-MM-DD
    let parts = anniv.includes('-') ? anniv.split('-') : anniv.split('/');
    let dateObj;
    if (anniv.includes('-')) {
        dateObj = new Date(parts[0], parts[1] - 1, parts[2]); // YYYY-MM-DD
    } else {
        dateObj = new Date(parts[2], parts[1] - 1, parts[0]); // DD/MM/YYYY
    }

    // 3. Hitung selisih hari
    const today = new Date();
    const diffTime = Math.abs(today - dateObj);
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    let flower, statusText, description;

    // 4. Logika Pertumbuhan (Bisa kamu atur sendiri jarak harinya)
    if (days < 7) {
        flower = "🌱";
        statusText = "Baru Saja Tumbuh";
        description = "Benih cinta baru saja ditanam. Mari kita jaga bersama!";
    } else if (days < 30) {
        flower = "🌿";
        statusText = "Mulai Berdaun";
        description = "Cinta kita mulai tumbuh kuat setiap harinya.";
    } else if (days < 365) {
        flower = "🌷";
        statusText = "Kuncup Cantik";
        description = "Sudah banyak momen indah yang kita lalui bersama.";
    } else if (days < 730) {
        flower = "🌹";
        statusText = "Mekar Sempurna";
        description = "Satu tahun lebih bersamamu adalah kebahagiaan sejati.";
    } else {
        flower = "🌻✨";
        statusText = "Cinta Abadi";
        description = `Sudah ${days} hari! Cinta kita sudah sekuat matahari dan takkan layu.`;
    }

    // Tampilkan ke layar
    container.innerHTML = `<div class="floating-flower">${flower}</div>`;
    status.innerText = statusText;
    desc.innerText = description;
}
    // Gunakan setTimeout sedikit agar browser selesai render HTML
    setTimeout(() => {
        updateLoveFlower();
    }, 100);

    const heartInterval = setInterval(() => {
        const h = document.getElementById('homeHeart');
        if (h) h.classList.toggle('pulse-active');
        else clearInterval(heartInterval);
    }, 1000);
    
    break;     
       case 'timeline':
    content.innerHTML = `
        <div class="card timeline-page-container" style="background: rgba(255, 255, 255, 0.9); border-radius: 30px; padding: 30px 20px;">
            <h2 class="romantic-text" style="text-align: center; color: #ff1493; margin-bottom: 30px; font-size: 2.2rem;">Perjalanan Cinta Kita ✨</h2>
            
            <div class="timeline-v2" style="position: relative; max-width: 800px; margin: 0 auto; padding-left: 40px;">
                <div style="position: absolute; left: 15px; top: 0; bottom: 0; width: 3px; background: linear-gradient(to bottom, #ffb6c1, #ff1493, #ffb6c1); border-radius: 10px;"></div>

                <div class="timeline-item" style="position: relative; margin-bottom: 30px;">
                    <div class="timeline-dot" style="position: absolute; left: -33px; top: 5px; width: 18px; height: 18px; background: #ff1493; border: 4px solid #fff; border-radius: 50%; box-shadow: 0 0 10px rgba(255,20,147,0.4); z-index: 2;"></div>
                    <div class="card timeline-card-v2" style="margin: 0; padding: 15px 20px; border-radius: 20px; box-shadow: 0 10px 20px rgba(0,0,0,0.05); border-left: 5px solid #ff1493; background: #fff;">
                        <span style="font-size: 0.8rem; font-weight: bold; color: #ff69b4; text-transform: uppercase;">22 April 2025</span>
                        <h4 style="margin: 5px 0; color: #444;">Hari Keberanian 💘</h4>
                        <p style="margin: 0; font-size: 0.95rem; color: #666;">Hari di mana aku memantapkan hati untuk menyatakan perasaanku padamu🤩.</p>
                    </div>
                </div>

                <div class="timeline-item" style="position: relative; margin-bottom: 30px;">
                    <div class="timeline-dot" style="position: absolute; left: -33px; top: 5px; width: 18px; height: 18px; background: #ff1493; border: 4px solid #fff; border-radius: 50%; z-index: 2;"></div>
                    <div class="card timeline-card-v2" style="margin: 0; padding: 15px 20px; border-radius: 20px; box-shadow: 0 10px 20px rgba(0,0,0,0.05); border-left: 5px solid #ff1493; background: #fff;">
                        <span style="font-size: 0.8rem; font-weight: bold; color: #ff69b4; text-transform: uppercase;">${anniversaryDate}</span>
                        <h4 style="margin: 5px 0; color: #444;">Awal Cerita Indah 💑</h4>
                        <p style="margin: 0; font-size: 0.95rem; color: #666;">Resmi memulai perjalanan ini bersamamu. Setiap detik sejak saat itu adalah anugerah.</p>
                    </div>
                </div>

                <div class="timeline-item" style="position: relative; margin-bottom: 30px;">
                    <div class="timeline-dot" style="position: absolute; left: -33px; top: 5px; width: 18px; height: 18px; background: #ff69b4; border: 4px solid #fff; border-radius: 50%; z-index: 2;"></div>
                    <div class="card timeline-card-v2" style="margin: 0; padding: 15px 20px; border-radius: 20px; box-shadow: 0 10px 20px rgba(0,0,0,0.05); border-left: 5px solid #ff1493; background: #fff;">
                        <span style="font-size: 0.8rem; font-weight: bold; color: #ff69b4; text-transform: uppercase;">Hari Ini & Seterusnya</span>
                        <h4 style="margin: 5px 0; color: #444;">Momen Spesial 💕</h4>
                        <p style="margin: 0; font-size: 0.95rem; color: #666;">Bersamamu, hal-hal sederhana berubah menjadi kenangan yang luar biasa.</p>
                    </div>
                </div>

                <div class="timeline-item" style="position: relative;">
                    <div class="timeline-dot" style="position: absolute; left: -33px; top: 5px; width: 18px; height: 18px; background: #ff1493; border: 4px solid #fff; border-radius: 50%; z-index: 2; box-shadow: 0 0 10px rgba(255,20,147,0.2);"></div>
                    <div class="card timeline-card-v2 scratch-card-fixed" style="margin: 0; padding: 20px; border-radius: 20px; box-shadow: 0 10px 20px rgba(0,0,0,0.05); border-left: 5px solid #ff1493; background: #fff; text-align: center;">
                        <span style="font-size: 0.8rem; font-weight: bold; color: #ff69b4; text-transform: uppercase;">Surprise ✨</span>
                        <h4 style="margin: 5px 0 15px 0; color: #444;">Hadiah Rahasia 🎁</h4>
                        
                        <div class="scratch-area" style="position: relative; width: 100%; max-width: 250px; height: 120px; margin: 0 auto; background: #fdf2f5; border-radius: 15px; overflow: hidden; box-shadow: inset 0 0 10px rgba(0,0,0,0.05);">
                            <div class="secret-message" style="position: absolute; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; padding: 15px; font-weight: bold; color: #ff1493; font-size: 0.9rem; text-align: center;">
                                "Gosok Sampai Habis dong:)"
                            </div>
                            
                            <canvas id="scratchCanvas" style="position: absolute; top: 0; left: 0; cursor: crosshair; touch-action: none; width: 100%; height: 100%;"></canvas>
                        </div>
                        <p style="font-size: 0.7rem; color: #aaa; margin-top: 10px; font-style: italic;">Gosok layarnya sayang💞!</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    setTimeout(initScratchCard, 100); 
    break;    case 'loveCalendar':
    // Cukup panggil fungsi ini, logika perhitungan ada di dalamnya
    initLoveCalendar(content);
    break;
    case 'jigsaw':
    content.innerHTML = `
        <div class="card" style="text-align:center; padding: 20px;">
            <h3 class="romantic-text" style="font-size: 1.8rem; color: #ff69b4;">Jigsaw Puzzle Foto 🧩</h3>
            <p style="margin-bottom: 15px; color: #666;">Susun potongan foto kita ya sayang!</p>
            
            <div id="puzzleBoard" class="puzzle-board" style="display: grid; grid-template-columns: repeat(3, 100px); grid-template-rows: repeat(3, 100px); gap: 5px; width: 320px; height: 320px; margin: 0 auto; background: rgba(0,0,0,0.05); padding: 10px; border-radius: 15px;"></div>
            
            <button class="btn" onclick="initPuzzle()" style="margin-top:20px; background: linear-gradient(45deg, #ff69b4, #ff1493); color:white; border:none; padding:10px 25px; border-radius:30px; cursor:pointer; font-weight: bold; box-shadow: 0 4px 15px rgba(255,105,180,0.3);">Acak Ulang 🔄</button>
        </div>
    `;
    // Gunakan timeout agar element #puzzleBoard benar-benar ada di layar sebelum diisi puzzle
    setTimeout(() => {
        initPuzzle();
    }, 150);
    break;
// --- GANTI FUNGSI zoomImage LAMA DENGAN INI DI script.js ---

// --- Script JS untuk Zoom Gambar ---

function zoomImage(imgElement) {
    // 1. Cek apakah gambar sedang di-zoom
    if (imgElement.classList.contains('img-zoomed')) {
        closeZoom(imgElement);
        return;
    }

    // 2. Buat layar hitam (Overlay)
    // Cek dulu biar gak dobel overlay
    if (!document.getElementById('zoomOverlay')) {
        const overlay = document.createElement('div');
        overlay.classList.add('overlay-backdrop');
        overlay.id = 'zoomOverlay'; 
        document.body.appendChild(overlay);
        
        // Klik overlay untuk menutup
        overlay.onclick = function() {
            closeZoom(imgElement);
        };
    }

    // 3. Tambahkan class zoom ke gambar
    imgElement.classList.add('img-zoomed');
    
    // 4. Ubah fungsi klik gambar jadi menutup
    // Simpan fungsi lama biar bisa dibalikin
    imgElement.onclick = function() {
        closeZoom(imgElement);
    };
}

function closeZoom(imgElement) {
    // Hapus class zoom
    imgElement.classList.remove('img-zoomed');
    
    // Hapus layar hitam
    const overlay = document.getElementById('zoomOverlay');
    if (overlay) {
        overlay.remove();
    }
    
    // Kembalikan fungsi onclick ke fungsi zoom awal (penting!)
    imgElement.onclick = function() { zoomImage(this); };
}
 case 'gallery':
    content.innerHTML = `
        <div class="card" style="position: relative; padding: 25px 15px; background: #fff; border-radius: 20px;">
            
            <div style="text-align: center; margin-bottom: 25px;">
                    <h2 class="" style="font-family: 'Arial Black', 'Inter', sans-serif; color: #f062c1bf; margin-bottom: 5px; letter-spacing: 1px; font-weight: 900; text-transform: uppercase; font-size: 1.8rem;">
                        TIME TRAVEL ⏳
                    </h2>
                    <p style="font-size: 0.8rem; color: #666; font-weight: 500;">"Klik untuk menghidupkan kembali kenangan kita"</p>
                </div>

            <div class="grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 12px;">
                ${[
                    'Kenangan9.jpeg', 'Kenangan2.jpg', 'Kenangan3.jpg', 
                    'Kenangan4.jpg', 'you.jpg', 'Kenangan5.jpg', 
                    'Kenangan6.jpg', 'fadli.png', 'Kenangan7.jpg', 
                    'Kenangan8.jpg', 'Love.jpg', 'Kenangan1.jpg', 
                    'Kenangan10.jpeg', 'Kenangan11.jpeg', 'Kenangan12.jpeg'
                ].map(src => `
                    <div class="memory-container" style="border-radius: 10px; overflow: hidden; aspect-ratio: 1/1; background: #eee;">
                        <img src="${src}" 
                             class="gallery-img item-bw" 
                             onclick="reviveAndZoom(this)" 
                             style="width: 100%; height: 100%; object-fit: cover; transition: all 0.8s ease; cursor: pointer;">
                    </div>
                `).join('')}
            </div>
        </div>

        <div id="customZoomModal" onclick="this.style.display='none'" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:9999; justify-content:center; align-items:center; padding: 20px;">
            <img id="zoomedImg" style="max-width: 85%; max-height: 80%; border-radius: 15px; box-shadow: 0 0 20px rgba(255,255,255,0.2); object-fit: contain;">
        </div>

        <style>
            /* Kondisi awal: Hitam Putih */
            .item-bw {
                filter: grayscale(100%);
            }

            /* Kondisi akhir: Berwarna permanen */
            .item-colored {
                filter: grayscale(0%) !important;
                transform: scale(1.05);
            }

            .gallery-img:hover {
                filter: grayscale(50%); /* Efek intip warna sebelum diklik */
            }
        </style>
    `;

    // Logika Inti
    window.reviveAndZoom = function(imgElement) {
        // 1. Ubah foto di grid menjadi berwarna permanen
        imgElement.classList.remove('item-bw');
        imgElement.classList.add('item-colored');

        // 2. Munculkan Zoom (Ukuran sedang & Jernih)
        const modal = document.getElementById('customZoomModal');
        const zoomedImg = document.getElementById('zoomedImg');
        
        zoomedImg.src = imgElement.src;
        modal.style.display = 'flex';
    };
    break;
             case 'messages':
    content.innerHTML = `
        <div class="card" style="text-align: center; padding: 3rem 2rem;">
            <div class="love-message delay-1">
                <h2 class="romantic-text" style="font-size: 2rem;">Surat Kecil Untukmu</h2>
            </div>
            
            <p class="love-message delay-2" style="font-size: 1.1rem;">
                "Aku mencintaimu lebih dari sekadar kata-kata. Kamu adalah <span class="glow-text">alasan di balik setiap senyumku</span> dan ketenangan di setiap hariku."
            </p>
            
            <p class="love-message delay-3" style="font-size: 1.1rem;">
                "Terima kasih telah menjadi bagian terindah dalam hidupku. <span class="glow-text">Selamanya</span> akan selalu menjadi waktu yang ingin kuhabiskan bersamamu."
            </p>
            
            <p class="love-message delay-3"
            style="font-size: 1.1rem;">
            "Setiap manusia memiliki seseorang yang <span class="glow-text">istimewa</span> dalam hidup mereka, dan bagiku orang itu adalah <span class="glow-text">kamu.</span>"
            </p>
            <div class="love-message" style="animation-delay: 6.5s; margin-top: 2rem;">
                <span style="font-size: 2rem;">💖</span>
            </div>
        </div>
    `;
    break;
        case 'countdown':
    content.innerHTML = `
        <div class=" dynamicCountdownBg" "card countdown-container" style="text-align: center;">
            <h2 class="romantic-text">Waktu Kita ❤️</h2>
            
            <div class="timer-section past" style="width: 100%;">
                <p class="timer-label">Sudah Melewati</p>
                <div class="timer-display" style="align-items: center;">
                    <span class="timer-number">${calculateDaysSince()}</span>
                    <span class="timer-unit">Hari Bersamamu</span>
                    <div id="heartbeatIcon" class="heartbeat-icon" >❤️</div>
                </div>
            </div>

            <hr class="timer-divider">

            <div class="timer-section future">
                <p class="timer-label">Menuju Anniversary Berikutnya</p>
                
                <div id="secretMessage" class="secret-msg"></div>

                <div id="realtimeTimer" class="timer-grid-detailed">
                    <div class="timer-box"><span id="d-num" class="num">0</span><span class="label">Hari</span></div>
                    <div class="timer-box"><span id="h-num" class="num">0</span><span class="label">Jam</span></div>
                    <div class="timer-box"><span id="m-num" class="num">0</span><span class="label">Menit</span></div>
                    <div class="timer-box"><span id="s-num" class="num">0</span><span class="label">Detik</span></div>
                </div>

                <p id="milestoneText" class="milestone-text"></p>
<div class="progress-container-v3">
    <div id="annivProgressBar" class="progress-fill-v3"></div>
    <div class="progress-glow"></div>
</div>
<p id="daysLeftNote" style="font-size: 0.75rem; color: #ff69b4; margin-top: 5px;"></p>
            </div>
            <button class="btn-booster" onclick="spreadLove()">
                Klik Kalau Kangen Aku ❤️
            </button>
            <p class="anniv-quote">"Setiap detik berharga jika dilewati bersamamu."</p>
        </div>
    `;
    applyDynamicTheme();
    startRealtimeCountdown();
    break;
    case 'quotes':
    content.innerHTML = `
        <div class="card quotes-container" style="text-align: center; padding: 40px 20px; position: relative; overflow: hidden;">
            <h2 class="romantic-text" style="font-size: 2.2rem; color: #ff1493; margin-bottom: 25px;">
                Kata-Kata Cinta ✨
            </h2>

            <div class="quote-box" style="min-height: 120px; display: flex; align-items: center; justify-content: center;">
                <p id="quote" class="quote-text" style="font-size: 1.2rem; line-height: 1.6; color: #555; font-style: italic; transition: all 0.5s ease;">
                    "${getRandomQuote()}"
                </p>
            </div>

            <div class="quote-action" style="margin-top: 30px;">
                <button class="btn btn-affirmation" onclick="refreshQuote()" style="padding: 12px 25px; border-radius: 30px;">
                    Lihat Pesan Lainnya 💖
                </button>
            </div>

            <div style="margin-top: 20px; font-size: 0.8rem; color: #ffb6c1;">
                Dibuat dengan ❤️ untuk ${partnerName}
            </div>
            
            <div style="position: absolute; bottom: -10px; right: 10px; font-size: 3rem; opacity: 0.1;">"</div>
        </div>
    `;
    break;
       case 'confession':
    content.innerHTML = `
        <div class="card confession-card">
            <h3 class="romantic-text">Pojok Pengakuan ❤️</h3>
            <div class="input-wrapper">
                <textarea id="confessionText" placeholder="Tulis hal yang ingin kamu sampaikan hari ini... 💌" rows="4"></textarea>
                <div class="textarea-decor">✨</div>
            </div>
            <button class="btn btn-confess" onclick="saveConfession()">
                Kirim Surat Cinta 💖
            </button>
            <hr class="divider">
            <div id="savedConfessions" class="confessions-container"></div>
        </div>
    `;
    loadConfessions();
    break;
        case 'loveMeter':
    content.innerHTML = `
        <div class="card love-meter-card" style="text-align: center; padding: 30px 20px;">
            <h3 class="romantic-text" style="font-size: 2rem; color: #ff1493; margin-bottom: 20px;">Cek Kecocokan Kita 💘</h3>
            
            <div class="input-group" style="display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 25px;">
                <input type="text" id="name1" placeholder="Nama Kamu" class="love-input" style="width: 40%; padding: 10px; border-radius: 15px; border: 2px solid #ffb6c1; outline: none; text-align: center;">
                <span class="heart-split" style="font-size: 1.5rem; animation: heartbeat 1.2s infinite;">❤️</span>
                <input type="text" id="name2" placeholder="Nama Pasangan" class="love-input" style="width: 40%; padding: 10px; border-radius: 15px; border: 2px solid #ffb6c1; outline: none; text-align: center;">
            </div>
            
            <button class="btn btn-love-premium" onclick="calculateLove()" style="background: linear-gradient(45deg, #ff1493, #ff69b4); color: white; border: none; padding: 12px 25px; border-radius: 30px; cursor: pointer; font-weight: bold; box-shadow: 0 5px 15px rgba(255,20,147,0.3);">
                <span>Cek Persentase Cinta</span> ✨
            </button>

            <div id="loveResultContainer" style="display: none; margin-top: 30px; position: relative;">
                <div class="heart-container" style="position: relative; width: 200px; height: 180px; margin: 0 auto 20px;">
                    <svg viewBox="0 0 32 29.6" style="width: 100%; height: 100%; fill: #eee; filter: drop-shadow(0 5px 10px rgba(0,0,0,0.1));">
                        <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,16,21.2,16,21.2s16-11.8,16-21.2C32,3.8,28.2,0,23.6,0z"/>
                        <clipPath id="heartClip">
                            <rect id="heartFillRect" x="0" y="30" width="32" height="30" />
                        </clipPath>
                        <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,16,21.2,16,21.2s16-11.8,16-21.2C32,3.8,28.2,0,23.6,0z" 
                              fill="url(#loveGradient)" clip-path="url(#heartClip)"/>
                        
                        <defs>
                            <linearGradient id="loveGradient" x1="0" x2="0" y1="1" y2="0">
                                <stop offset="0%" stop-color="#ff1493" />
                                <stop offset="100%" stop-color="#ff69b4" />
                            </linearGradient>
                        </defs>
                    </svg>
                    
                    <h2 id="lovePercent" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); margin: 0; color: #444; font-size: 2rem; z-index: 2;">0%</h2>
                </div>

                <p id="loveStatus" style="font-weight: bold; color: #ff1493; font-style: italic; min-height: 24px;"></p>
            </div>
        </div>
    `;
    break;     
      case 'memoryGame':
            initMemoryGame();
            break;
        case 'petName':
    content.innerHTML = `
        <div class="card pet-name-container">
            <h3 class="romantic-text">Panggilan Sayang Hari Ini 🍯</h3>
            <div class="pet-name-display">
                <span id="petName" class="pet-name-text">${getRandomPetName()}</span>
            </div>
            <p class="pet-name-hint">Klik tombol di bawah untuk ganti panggilan!</p>
            <button class="btn btn-pet" onclick="refreshPetName()">
                Acak Nama Baru 🎀
            </button>
        </div>
    `;
    break;
      case 'loveLetter':
content.innerHTML = `
    <div class="love-letter-scene">
        <div class="envelope-container" id="envelope" onclick="window.openEnvelope()">
            <div class="envelope-base">
                <div class="envelope-flap"></div>
                <div class="envelope-seal">💖</div>
                <div class="envelope-hint">Tap to open.. ✨</div>
            </div>
        </div>

        <div id="letterOverlay" class="letter-overlay">
            <div class="letter-paper">
                <div class="letter-content"> 
                    <h3 class="romantic-title">Surat Cinta untuk ${partnerName} 💕</h3>
                    <div class="letter-text">
                        <p>Hai sayang,</p>
                        <p>Aku ingin mengatakan bahwa kamu adalah cahaya dalam hidupku. Setiap hari bersamamu adalah kebahagiaan terbesarku.</p>
                        <p>Terima kasih sudah menjadi bagian terindah dalam ceritaku. Aku mencintaimu selamanya. 🌹</p>
                    </div>
                    <p class="letter-signature">Selamanya milikmu,<br><strong>Zaenu Fadli Abdilah</strong></p>
                    <button onclick="window.closeLetter()" class="btn-close-letter">Tutup Surat</button>
                </div>
                </div>
        </div>
    </div>
`;
    break;
            case 'affirmation':
    content.innerHTML = `
        <div class="card affirmation-container">
            <div class="sparkle-icon">✨</div>
            <div class="affirmation-box">
                <p id="affirmationText" class="affirmation-text">${getRandomAffirmation()}</p>
            </div>
            <div class="flower-decor">🌸</div>
            <button class="btn btn-affirmation" onclick="nextAffirmation()">
                Dengarkan Kata Hati 💖
            </button>
        </div>
    `;
    break;
    }
}

// Fungsi Tambahan untuk Fitur
function calculateRelationshipDuration() {
    if (!anniversaryDate) return 0;
    const start = new Date(anniversaryDate.split('/').reverse().join('-'));
    const now = new Date();
    return Math.floor((now - start) / (1000 * 60 * 60 * 24));
}

function calculateDaysSince() {
    return calculateRelationshipDuration();
}

function calculateNextAnniversary() {
    // Ambil data dari localStorage
    let anniv = localStorage.getItem('anniversaryDate'); 
    if (!anniv) return 'Tanggal belum diatur';

    const now = new Date();
    // Mendukung format YYYY-MM-DD (input date bawaan) atau DD/MM/YYYY
    let parts = anniv.includes('-') ? anniv.split('-') : anniv.split('/');
    
    let day, month;
    if (anniv.includes('-')) {
        // Format YYYY-MM-DD (Hasil input type="date")
        day = parseInt(parts[2]);
        month = parseInt(parts[1]);
    } else {
        // Format DD/MM/YYYY
        day = parseInt(parts[0]);
        month = parseInt(parts[1]);
    }

    let nextAnniv = new Date(now.getFullYear(), month - 1, day);

    // Jika anniversary tahun ini sudah lewat, hitung untuk tahun depan
    if (nextAnniv < now) {
        nextAnniv.setFullYear(now.getFullYear() + 1);
    }

    const diffTime = nextAnniv - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return `${diffDays} hari lagi`;
}

function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

// Mengirim Pesan ke Firebase
function saveConfession() {
    const text = document.getElementById('confessionText').value;
    const sender = localStorage.getItem('partnerName') || 'Seseorang';

    if (text.trim() !== "") {
        if (window.pushData && window.dbRef) {
            window.pushData(window.dbRef, {
                message: text,
                from: sender,
                timestamp: Date.now()
            }).then(() => {
                document.getElementById('confessionText').value = '';
                showLoveToast("Pesan cintamu terkirim! ✨", "success"); // Menggunakan fungsi baru
            }).catch((err) => {
                showLoveToast("Gagal kirim: " + err.message, "error");
            });
        } else {
            showLoveToast("Koneksi belum siap, sabar ya sayang! ⏳", "warning");
        }
    } else {
        showLoveToast("Isi dulu dong hatimu.. eh, pesannya! ❤️", "warning");
    }
}

// Fungsi BARU untuk Notifikasi Love Toast
function showLoveToast(message, type = 'info') {
    let container = document.getElementById('love-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'love-toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.classList.add('love-toast', type);
    
    let icon = '';
    if (type === 'success') icon = '💖';
    else if (type === 'warning') icon = '⚠️';
    else if (type === 'error') icon = '💔';
    else icon = '💬';

    toast.innerHTML = `<span class="toast-icon">${icon}</span> <span class="toast-message">${message}</span>`;
    
    document.getElementById('love-toast-container').appendChild(toast);

    // Animasi masuk
    setTimeout(() => {
        toast.style.transform = 'translateY(0) scale(1)';
        toast.style.opacity = '1';
    }, 10); // Sedikit delay agar transisi terlihat

    // Animasi keluar setelah beberapa detik
    setTimeout(() => {
        toast.style.transform = 'translateY(-20px) scale(0.6)';
        toast.style.opacity = '0';
        toast.addEventListener('transitionend', () => toast.remove());
    }, 1200); // Muncul 1.2 detik
}

// Mendengarkan Pesan Masuk secara Real-Time
function initConfessionListener() {
    const container = document.getElementById('savedConfessions');
    
    // Fungsi ini akan otomatis jalan setiap ada data baru di Firebase
    window.listenData(window.dbRef, (snapshot) => {
        const data = snapshot.val();
        const messageElement = document.createElement('div');
        messageElement.className = 'card fadeInGlow';
        messageElement.innerHTML = `
            <small>Dari: ${data.from}</small>
            <p>${data.message}</p>
        `;
        // Menambahkan pesan paling baru di atas
        container.prepend(messageElement);
        
        // Munculkan notifikasi jika itu pesan dari pasangan
        if (data.from !== localStorage.getItem('partnerName')) {
            showBrowserNotification(data.from, data.message);
        }
    });
}
function showBrowserNotification(sender, message) {
    if (Notification.permission === "granted") {
        new Notification("Pesan Cinta Baru! 💌", {
            body: `${sender}: ${message}`,
            icon: "Love.jpg"
        });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission();
    }
}

function loadConfessions() {
    const container = document.getElementById('savedConfessions');
    
    // Pastikan container ada sebelum mengisi
    if (!container) return;

    // Kita balik urutannya (reverse) supaya pesan terbaru muncul di paling atas
    container.innerHTML = confessions.map(conf => `
        <div class="confession-item">
            <div class="confession-content">
                <p>"${conf.text || conf}"</p> 
            </div>
            <div class="confession-footer">
                <small>📅 ${conf.date || 'Baru saja'}</small>
                <span class="heart-decor">❤️</span>
            </div>
        </div>
    `).join('');
}
function initMemoryGame() {
    const content = document.getElementById('mainContent');
    const emojis = ['💖', '🌹', '💍', '🧸', '🍫', '💌']; 
    let gameCards = [...emojis, ...emojis]; 
    gameCards.sort(() => 0.5 - Math.random());

    flippedCards = [];
    matchedPairs = 0;

    content.innerHTML = `
        <div class="card" style="text-align: center; padding: 25px 15px; border-radius: 20px; background: #fff;">
            <h3 style="font-family: 'Arial Black', sans-serif; color: #f163ac; text-transform: uppercase; margin-bottom: 5px;">
                Memory Game Cinta 🎮
            </h3>
            <p style="color: #888; font-size: 0.85rem; margin-bottom: 20px;">Cari pasangan emojinya ya sayang!</p>
            
            <div id="gameBoard" class="memory-grid"></div>
            
            <div id="scoreContainer" style="margin-top: 25px; display: flex; flex-direction: column; align-items: center; gap: 15px;">
                <span id="score" style="background: #fff0f3; color: #ff85a2; padding: 8px 25px; border-radius: 50px; font-weight: bold; border: 1px solid #ffccd5;">
                    Pasangan Cocok: 0 / ${emojis.length}
                </span>

                <button onclick="initMemoryGame()" class="btn-reset">
                    <span style="margin-right: 5px;">🔄</span> Main Lagi
                </button>
            </div>
        </div>
    `;

    const board = document.getElementById('gameBoard');
    gameCards.forEach((emoji) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('memory-card-container');
        cardElement.innerHTML = `
            <div class="memory-card-inner" data-emoji="${emoji}">
                <div class="memory-card-front">❓</div>
                <div class="memory-card-back">${emoji}</div>
            </div>
        `;
        cardElement.addEventListener('click', function() {
            const cardInner = this.querySelector('.memory-card-inner');
            handleCardFlip(cardInner, emojis.length); 
        });
        board.appendChild(cardElement);
    });
}
function handleCardFlip(cardInner, totalPairs) {
    // Cegah klik jika kartu sudah terbuka atau sudah cocok
    if (cardInner.classList.contains('is-flipped') || cardInner.classList.contains('matched') || flippedCards.length === 2) return;

    // Putar kartu
    cardInner.classList.add('is-flipped');
    flippedCards.push(cardInner);

    if (flippedCards.length === 2) {
        const emoji1 = flippedCards[0].dataset.emoji;
        const emoji2 = flippedCards[1].dataset.emoji;

        if (emoji1 === emoji2) {
            // Jika Cocok
            flippedCards[0].classList.add('matched');
            flippedCards[1].classList.add('matched');
            matchedPairs++;
            document.getElementById('score').innerText = `Pasangan Cocok: ${matchedPairs} / ${totalPairs}`;
            flippedCards = [];
            
            if (matchedPairs === totalPairs) {
                setTimeout(() => showLoveToast("Hebat sayang! Kamu ingat semuanya! ❤️", "success"), 500);
            }
        } else {
            // Jika Salah, tutup kembali setelah 1 detik
            setTimeout(() => {
                flippedCards[0].classList.remove('is-flipped');
                flippedCards[1].classList.remove('is-flipped');
                flippedCards = [];
            }, 1000);
        }
    }
}

// Logika Flip Card Baru
function flipCard(card, emoji, totalPairs) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        card.innerHTML = emoji; // Tampilkan emoji
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkMatch(totalPairs);
        }
    }
}

function checkMatch(totalPairs) {
    const [card1, card2] = flippedCards;
    
    if (card1.dataset.emoji === card2.dataset.emoji) {
        matchedPairs++;
        document.getElementById('score').textContent = `Pasangan Cocok: ${matchedPairs}/${totalPairs}`;
        flippedCards = []; 
        
        // --- CEK KEMENANGAN ---
        if (matchedPairs === totalPairs) {
            setTimeout(() => {
                // Efek kembang api/confetti
                triggerConfetti();
                
                // Notifikasi Kemenangan di Tengah Layar
                Swal.fire({
                    title: 'Yey! Kamu Menang Sayang! 🏆',
                    text: 'Ingatanku mungkin terbatas, tapi cintaku padamu takkan terbatas. I Love You! 💖',
                    icon: 'success',
                    confirmButtonText: 'Main Lagi? 🔄',
                    confirmButtonColor: '#ff69b4',
                    background: '#fff',
                    borderRadius: '20px',
                    customClass: {
                        title: 'romantic-text'
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        initMemoryGame(); // Reset game otomatis
                    }
                });
            }, 500);
        }
    } else {
        // Jika salah, tutup lagi setelah 1 detik
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.innerHTML = '❓';
            card2.innerHTML = '❓';
            flippedCards = [];
        }, 1000);
    }
}
function getRandomPetName() {
    return petNames[Math.floor(Math.random() * petNames.length)];
}

// Contoh logika saat amplop diklik
function openEnvelope() {
    const envelope = document.querySelector('.envelope-container');
    const overlay = document.querySelector('.letter-overlay');

    // 1. Buka tutup amplop
    envelope.classList.add('is-open');

    // 2. Beri jeda 300ms agar tutup amplop terbuka dulu, baru surat keluar
    setTimeout(() => {
        overlay.classList.add('active');
    }, 300);
}

// Contoh logika saat tombol tutup diklik
function closeLetter() {
    const envelope = document.querySelector('.envelope-container');
    const overlay = document.querySelector('.letter-overlay');

    // 1. Surat masuk kembali (mengecil ke bawah)
    overlay.classList.remove('active');

    // 2. Setelah surat masuk, tutup kembali amplopnya
    setTimeout(() => {
        envelope.classList.remove('is-open');
    }, 500);
}

function getRandomAffirmation() {
    return affirmations[Math.floor(Math.random() * affirmations.length)];
}

function zoomImage(imgElement) {
    // 1. Buat Overlay (Layar Hitam) jika belum ada
    let overlay = document.getElementById('zoomOverlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'zoomOverlay';
        overlay.className = 'overlay-backdrop';
        document.body.appendChild(overlay);
        
        // Klik background hitam untuk tutup
        overlay.onclick = () => closeZoom();
    }

    // 2. Buat elemen gambar baru khusus untuk zoom (Clone)
    // Ini supaya gambar zoom tidak terikat animasi float dari kartu asli
    const zoomedImg = document.createElement('img');
    zoomedImg.src = imgElement.src;
    zoomedImg.id = 'zoomedImg';
    zoomedImg.className = 'img-zoomed';
    
    // Klik gambarnya juga untuk tutup
    zoomedImg.onclick = () => closeZoom();

    // 3. Masukkan ke dalam body
    document.body.appendChild(zoomedImg);
    overlay.style.display = 'block';
}

function closeZoom() {
    const overlay = document.getElementById('zoomOverlay');
    const zoomedImg = document.getElementById('zoomedImg');
    
    if (overlay) overlay.remove();
    if (zoomedImg) zoomedImg.remove();
}

function startSlideshow() {
    const images = ['images/photo1.jpg', 'images/photo2.jpg'];
    let index = 0;
    document.getElementById('slideshow').style.display = 'block';
    const slideImg = document.getElementById('slideImg');
    slideImg.src = images[index];
    setInterval(() => {
        index = (index + 1) % images.length;
        slideImg.src = images[index];
    }, 3000);
}

function nextSlide() {
    // Fungsi untuk tombol Next di slideshow (opsional, bisa dikembangkan)
    startSlideshow(); // Restart slideshow
}
// Fungsi pembantu Kalender
function initLoveCalendar(content) {
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    
    content.innerHTML = `
        <div class="card calendar-card">
            <div class="calendar-header" style="display: flex; flex-direction: column; gap: 10px; align-items: center; margin-bottom: 20px;">
                <h3 class="romantic-text">Kalender Kenangan</h3>
                <h4 style="color: #ff69b4;">${monthNames[currentMonth]} ${currentYear}</h4>
                <div style="display: flex; gap: 5px; align-items: center;">
                    <input type="number" id="inputMonth" placeholder="Bulan" min="1" max="12" value="${currentMonth + 1}" style="width: 80px; padding: 8px; border-radius: 10px; border: 1px solid #ff69b4; outline: none;">
                    <input type="number" id="inputYear" placeholder="Tahun" value="${currentYear}" style="width: 100px; padding: 8px; border-radius: 10px; border: 1px solid #ff69b4; outline: none;">
                    <button onclick="manualJumpToDate()" style="padding: 8px 15px; border-radius: 10px; background: #ff69b4; color: white; border: none; cursor: pointer;">Cari 🔍</button>
                </div>
            </div>
            <div id="calendarGrid" class="calendar-grid"></div>
            <p id="eventNote" style="margin-top:15px; text-align:center; font-style:italic; color:#ff69b4; min-height: 25px;"></p>
        </div>
    `;

    const grid = document.getElementById('calendarGrid');
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].forEach(day => {
        grid.innerHTML += `<div style="font-weight:bold; color:#ff69b4; padding-bottom:10px;">${day}</div>`;
    });

    for (let i = 0; i < firstDay; i++) { grid.innerHTML += `<div></div>`; }

    for (let d = 1; d <= daysInMonth; d++) {
        const key = `${d}-${currentMonth + 1}`;
        let isSpecial = false;
        let pTitle = "";
        let pText = "";

        if (specialDatesConfig[key]) {
            isSpecial = true;
            const event = specialDatesConfig[key];
            if (event.type === "fixed") {
                pTitle = event.title;
                pText = event.msg;
            } else if (event.type === "birthday") {
                const umur = currentYear - event.startYear;
                pTitle = `Happy Birthday ke-${umur}! 🎂`;
                pText = `Selamat ulang tahun sayang! Terima kasih sudah lahir dan menjadi kebahagiaan Fadli! 🌈`;
            } else if (event.type === "anniversary") {
                const tahunKe = currentYear - event.startYear;
                pTitle = `Happy Anniversary ke-${tahunKe}! 💖`;
                pText = tahunKe <= 0 ? "Hari dimana cerita kita dimulai bersama 🥰" : `Sudah ${tahunKe} tahun kita bersama. Aku mencintaimu lebih dari kemarin! ♾️`;
            }
        }

        const isToday = new Date().getDate() === d && new Date().getMonth() === currentMonth && new Date().getFullYear() === currentYear;

        grid.innerHTML += `
            <div class="calendar-day ${isSpecial ? 'special-day' : ''} ${isToday ? 'today' : ''}" 
                 onclick="${isSpecial ? `showSpecialPopup('${pTitle}', '${pText}')` : ''}">
                ${d}
                ${isSpecial ? '<span class="heart-indicator" style="display:block; font-size:10px;">❤️</span>' : ''}
            </div>`;
    }
}

    // Pasang event enter untuk input
    const handleEnter = (e) => { if (e.key === "Enter") manualJumpToDate(); };
    document.getElementById('inputMonth').onkeydown = handleEnter;
    document.getElementById('inputYear').onkeydown = handleEnter;

    const grid = document.getElementById('calendarGrid');
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // 3. Header Nama Hari
    ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].forEach(day => {
        grid.innerHTML += `<div style="font-weight:bold; color:#ff69b4; padding-bottom:10px;">${day}</div>`;
    });

    // 4. Kotak Kosong
    for (let i = 0; i < firstDay; i++) {
        grid.innerHTML += `<div></div>`;
    }

    // 5. Mengisi Tanggal
   for (let d = 1; d <= daysInMonth; d++) {
    const yearlyKey = `${d}-${currentMonth + 1}`; 
    let eventText = "";
    let isSpecial = false;
    let popupTitle = "";

    // Logika Valentine (Sama setiap tahun)
    if (yearlyKey === "14-2") {
        isSpecial = true;
        popupTitle = "Happy Valentine's Day! 🌹";
        eventText = "Hari kasih sayang ini hanyalah pengingat kecil, karena bagi Fadli, setiap hari adalah hari untuk menyayangimu. Terima kasih sudah menjadi Valentine-ku selamanya. ❤️";
    } 
    // Logika Anniversary (Berbeda setiap tahun)
    else if (yearlyKey === "22-4") {
        isSpecial = true;
        const tahunJadian = 2025; // Sesuaikan dengan tahun jadian kalian
        const tahunKe = currentYear - tahunJadian;
        
        popupTitle = `Happy Anniversary ke-${tahunKe}! 💖`;
        
        if (tahunKe < 1) {
            eventText = "Belum genap setahun, tapi rasanya aku sudah ingin menghabiskan seluruh hidupku bersamamu. Happy Month-versary sayang! 🥰";
        } else if (tahunKe === 1) {
            eventText = "Satu tahun pertama yang luar biasa! Terima kasih sudah bertahan dan berjuang bersamaku. Mari buat ribuan tahun lagi! 🥂";
        } else {
            eventText = `Tahun ke-${tahunKe} dan cintaku masih tetap sama, bahkan tumbuh lebih kuat. Kamu adalah keputusan terbaik yang pernah kubuat. I love you! ♾️`;
        }
    }
    // Logika Ulang Tahun (Berbeda setiap tahun)
    else if (yearlyKey === "15-7") {
        isSpecial = true;
        const tahunLahir = 2007; // Sesuaikan tahun lahir Fita
        const umur = currentYear - tahunLahir;
        
        popupTitle = `Happy Birthday yang ke-${umur}! 🎂`;
        
        if (umur === 17) {
            eventText = "Sweet Seventeen! Semoga di usia yang baru ini kamu makin dewasa, makin cantik, dan selalu dalam lindungan Tuhan. Fadli akan selalu ada di sampingmu! ✨";
        } else {
            eventText = `Selamat ulang tahun yang ke-${umur} sayang! Semoga semua impianmu tercapai. Terima kasih sudah lahir ke dunia dan menjadi pelangi di hidupku! 🌈`;
        }
    }

    const isToday = new Date().getDate() === d && 
                    new Date().getMonth() === currentMonth && 
                    new Date().getFullYear() === currentYear;

   // ... di dalam loop tanggal d ...
grid.innerHTML += `
    <div class="calendar-day ${isSpecial ? 'special-day' : ''} ${isToday ? 'today' : ''}" 
         onclick="${isSpecial ? `showSpecialPopup('${pTitle}', '${pText}')` : ''}">
        ${d}
        ${isSpecial ? '<span class="heart-indicator">❤️</span>' : ''}
    </div>`;
}

// Fungsi Navigasi Bulan
function changeMonth(delta) {
    currentMonth += delta;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    } else if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    // Refresh konten kalender
    const content = document.getElementById('mainContent');
    initLoveCalendar(content);
}

function initPuzzle() {
    const board = document.getElementById('puzzleBoard');
    if(!board) return;
    
    // Pilih satu foto secara acak dari daftar puzzleImages
    currentPuzzleImage = puzzleImages[Math.floor(Math.random() * puzzleImages.length)];
    
    puzzleOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8]; 
    
    do {
        puzzleOrder.sort(() => Math.random() - 0.5);
    } while (!isSolvable(puzzleOrder));

    renderPuzzle();
}

function renderPuzzle() {
    const board = document.getElementById('puzzleBoard');
    if (!board) return; // Keamanan jika element belum dimuat
    board.innerHTML = '';

    puzzleOrder.forEach((pieceValue, index) => {
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        
        if (pieceValue === 8) {
            piece.classList.add('empty');
            piece.style.background = "#eee"; // Warna kotak kosong
        } else {
            piece.style.backgroundImage = `url('${currentPuzzleImage}')`; 
            piece.style.backgroundSize = "300px 300px"; // Ukuran total (3x3 keping @100px)
            
            const row = Math.floor(pieceValue / 3);
            const col = pieceValue % 3;
            piece.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
        }

        piece.onclick = () => movePiece(index);
        board.appendChild(piece);
    });
}

function movePiece(index) {
    const emptyIndex = puzzleOrder.indexOf(8);
    const validMoves = [index - 1, index + 1, index - 3, index + 3];
    const isAdjacent = validMoves.includes(emptyIndex);
    const isSameRow = Math.floor(index / 3) === Math.floor(emptyIndex / 3);
    const isSameCol = index % 3 === emptyIndex % 3;

    if (isAdjacent && (isSameRow || isSameCol)) {
        [puzzleOrder[index], puzzleOrder[emptyIndex]] = [puzzleOrder[emptyIndex], puzzleOrder[index]];
        renderPuzzle();
        checkWin();
    }
}

function checkWin() {
    const winPattern = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    if (JSON.stringify(puzzleOrder) === JSON.stringify(winPattern)) {
        setTimeout(() => {
            alert("Yey! Foto kita sudah utuh lagi! I Love You Sayang! 💖");
            triggerConfetti();
        }, 300);
    }
}

function isSolvable(arr) {
    let inversions = 0;
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j] && arr[i] !== 8 && arr[j] !== 8) inversions++;
        }
    }
    return inversions % 2 === 0;
}

//Fungsi navigasi calender//
function changeMonth(delta) {
    currentMonth += delta;

    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    } else if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }

    // Panggil ulang loadPage agar tampilan kalender terupdate
    loadPage('loveCalendar');
}
//Fungsi JumpToDate//
function jumpToDate(value) {
    if (!value) return;
    
    // value berbentuk "YYYY-MM"
    const [year, month] = value.split('-');
    
    // Update variabel global
    currentYear = parseInt(year);
    currentMonth = parseInt(month) - 1; // Kurangi 1 karena array bulan mulai dari 0

    // Refresh tampilan
    loadPage('loveCalendar');
}
    // --- INI ADALAH BAGIAN ALERT UNTUK BULAN ---
    // Fungsi untuk menampilkan alert kustom
function myAlert(pesan) {
    const alertOverlay = document.getElementById('customAlert');
    const alertMsg = document.getElementById('alertMessage');
    
    alertMsg.innerText = pesan;
    alertOverlay.classList.remove('hidden');
    
    // Trigger animasi setelah display block
    setTimeout(() => {
        alertOverlay.classList.add('show');
    }, 10);
}

// Fungsi untuk menutup alert
function closeAlert() {
    const alertOverlay = document.getElementById('customAlert');
    alertOverlay.classList.remove('show');
    setTimeout(() => {
        alertOverlay.classList.add('hidden');
    }, 300);
}
// --- PERBAIKAN FUNGSI JUMP TO DATE ---
function manualJumpToDate() {
    const inputM = document.getElementById('inputMonth');
    const inputY = document.getElementById('inputYear');
    
    if (!inputM || !inputY) return;

    const m = parseInt(inputM.value);
    const y = parseInt(inputY.value);

// --- Gunakan di kode validasi kamu ---
if (!m || m < 1 || m > 12) {
    inputM.classList.add('input-error');
    
    // GANTI ALERT BIASA DENGAN INI:
    myAlert("Bulan harus antara 1 sampai 12 ya sayang! 🌸");
    
    setTimeout(() => inputM.classList.remove('input-error'), 300);
    inputM.focus();
    return;
}

    // --- INI ADALAH BAGIAN ALERT UNTUK TAHUN ---
    if (!m || m < 1 || m > 12) {
        inputM.classList.add('input-error');
        alert("Eh, bulannya salah tuh sayang.. 🤭");
   setTimeout(() => inputM.classList.remove('input-error'), 300);
        
        inputM.focus();
        return;
    }

    // Jika semua di atas lolos (benar), baru baris di bawah ini dijalankan:
    currentMonth = m - 1; 
    currentYear = y;
    initLoveCalendar(document.getElementById('mainContent'));
}

// --- PERBAIKAN LOGOUT ---
function logout() {
    Swal.fire({
        title: 'Mau pamit sekarang? 🥺',
        text: "Nanti balik lagi ya sayang, aku tungguin!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ff69b4',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Iya, Logout 💕',
        cancelButtonText: 'Gak jadi!',
        background: '#fff',
        borderRadius: '20px',
        customClass: {
            title: 'romantic-text'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // 1. Hapus data sesi
            localStorage.removeItem('partnerName');
            localStorage.removeItem('anniversaryDate');
            localStorage.removeItem('isLoggedIn');

            // 2. Notifikasi sukses
            Swal.fire({
                title: 'Daaa Sayang! 👋',
                text: 'Hati-hati ya di luar sana!',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });

            // 3. Pindah halaman
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    });
}

// Hubungkan tombol di HTML ke fungsi logout di atas
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('logoutBtn');
    if (btn) {
        btn.addEventListener('click', logout);
    }
});

//fungsi freshquotes//
function refreshQuote() {
    const quoteElement = document.getElementById('quote');
    
    // 1. Tambahkan class fade (teks menghilang sedikit)
    quoteElement.classList.add('quote-fade');
    
    // 2. Ganti teks setelah animasi fade-out setengah jalan (200ms)
    setTimeout(() => {
        quoteElement.textContent = getRandomQuote();
        
        // 3. Munculkan kembali teksnya
        quoteElement.classList.remove('quote-fade');
        
        // Bonus: Efek confetti kecil setiap klik
        triggerConfetti();
    }, 400);
}
//fungsi calculate detail//
function calculateDetailedNextAnniversary() {
    let anniv = localStorage.getItem('anniversaryDate'); 
    if (!anniv) return '<span class="timer-unit">Tanggal belum diatur</span>';

    const now = new Date();
    let parts = anniv.includes('-') ? anniv.split('-') : anniv.split('/');
    
    let day, month;
    if (anniv.includes('-')) {
        day = parseInt(parts[2]);
        month = parseInt(parts[1]);
    } else {
        day = parseInt(parts[0]);
        month = parseInt(parts[1]);
    }

    let nextAnniv = new Date(now.getFullYear(), month - 1, day);
    if (nextAnniv < now) {
        nextAnniv.setFullYear(now.getFullYear() + 1);
    }

    const diffTime = nextAnniv - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return `
        <div class="timer-display">
            <span class="timer-number" style="font-size: 2.5rem; color: #ff1493;">${diffDays}</span>
            <span class="timer-unit">Hari Lagi 🌸</span>
        </div>
    `;
}
//menghitung detik//
function startRealtimeCountdown() {
    const timerElement = document.getElementById('realtimeTimer');
    let anniv = localStorage.getItem('anniversaryDate');
    
    if (!anniv || !timerElement) return;
    // Bersihkan interval lama jika ada (agar tidak dobel)
    if (window.annivInterval) clearInterval(window.annivInterval);

    const interval = setInterval(() => {
        const timerContainer = document.getElementById('realtimeTimer');
        if (!timerContainer) {
            clearInterval(interval);
            return;
        }

        const now = new Date().getTime();
        let parts = anniv.includes('-') ? anniv.split('-') : anniv.split('/');
        let day = anniv.includes('-') ? parseInt(parts[2]) : parseInt(parts[0]);
        let month = parseInt(parts[1]);

        let nextAnniv = new Date(new Date().getFullYear(), month - 1, day).getTime();
        if (nextAnniv < now) {
            nextAnniv = new Date(new Date().getFullYear() + 1, month - 1, day).getTime();
        }

        const distance = nextAnniv - now;

        // Hitung angka
        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        updateWithAnimation('d-num', d);
        updateWithAnimation('h-num', h);
        updateWithAnimation('m-num', m);
        updateWithAnimation('s-num', s);

        const heart = document.getElementById('heartbeatIcon');
        if (heart) {
            heart.classList.remove('pulse-active');
            void heart.offsetWidth; // Trigger reflow
            heart.classList.add('pulse-active');
        }
        const totalMsInYear = 365 * 24 * 60 * 60 * 1000;
    const timeLeftMs = distance; // Sisa waktu dalam milidetik
    
    // Hitung persentase (100% dikurangi sisa waktu)
    let progressPercent = 100 - (timeLeftMs / totalMsInYear * 100);
    
    // Pastikan angka berada di range 0-100
    progressPercent = Math.max(0, Math.min(100, progressPercent));

    // Update Progress Bar
    const progressBar = document.getElementById('annivProgressBar');
    if (progressBar) {
        progressBar.style.width = progressPercent + "%";
    }

    // Teks keterangan di bawah bar
    const noteEl = document.getElementById('daysLeftNote');
    if (noteEl) {
        noteEl.innerText = `${Math.floor(progressPercent)}% Menuju Bahagia 💖`;
    }
        // Fitur No 2: Milestone (Kalkulasi Menit/Detik Total)
        const totalMinutes = Math.floor(distance / (1000 * 60));
        document.getElementById('milestoneText').innerText = `${totalMinutes.toLocaleString()} menit lagi menuju hari spesial kita! ✨`;

        // Fitur No 5: Pesan Rahasia (Muncul di detik ke-22)
        const secretMsg = document.getElementById('secretMessage');
        if (s === 22) { // Anggap jadian tanggal 22
            secretMsg.innerText = "I Love You Forever! ❤️";
            secretMsg.classList.add('show');
        } else {
            secretMsg.classList.remove('show');
        }
    }, 1000);

}
// Fungsi Helper agar angka tidak kedap-kedip
function updateTextIfChanged(id, value) {
    const el = document.getElementById(id);
    if (el && el.innerText !== value.toString()) {
        el.innerText = value;
        // Tambahkan sedikit efek transisi
        el.style.animation = "none";
        void el.offsetWidth;
        el.style.animation = "heartbeat 0.3s ease-out";
    }
}
function applyDynamicTheme() {
    const hour = new Date().getHours();
    const container = document.getElementById('dynamicCountdownBg');
    if (!container) return;

    if (hour >= 5 && hour < 11) {
        // Pagi: Cerah/Kuning Soft
        container.style.background = "linear-gradient(to bottom, #fff9e6, #fff0f6)";
    } else if (hour >= 11 && hour < 18) {
        // Siang-Sore: Jingga/Warm
        container.style.background = "linear-gradient(to bottom, #fff5f0, #fff0f6)";
    } else {
        // Malam: Deep Pink/Malam
        container.style.background = "linear-gradient(to bottom, #ffe6f2, #fff0f6)";
    }
}

// No 5: Love Booster (Hati Beterbangan)
function spreadLove() {
    triggerConfetti(); // Pakai fungsi confetti yang sudah kamu punya
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        const types = ['❤️', '💖', '✨', '🌸', '💕'];
        heart.innerText = types[Math.floor(Math.random() * types.length)];
        heart.className = 'booster-heart';
        
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = (Math.random() * 1.5 + 1) + "rem";
        heart.style.animationDuration = (Math.random() * 2 + 2) + "s";
        
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 4000);
    }
}
// Fungsi Helper No 1: Animasi Rolling
function updateWithAnimation(id, value) {
    const el = document.getElementById(id);
    if (el && el.innerText !== value.toString()) {
        el.style.transform = "translateY(-10px)";
        el.style.opacity = "0";
        
        setTimeout(() => {
            el.innerText = value;
            el.style.transform = "translateY(0)";
            el.style.opacity = "1";
        }, 200);
    }
}
//Fungsi calculatelove//
function calculateLove() {
    const n1 = document.getElementById('name1').value;
    const n2 = document.getElementById('name2').value;
    const container = document.getElementById('loveResultContainer');
    const bar = document.getElementById('loveBar');
    const percentText = document.getElementById('lovePercent');
    const statusText = document.getElementById('loveStatus');

    if (!n1 || !n2) {
        Swal.fire({ icon: 'error', title: 'Ups!', text: 'Isi kedua nama dulu ya sayang! ❤️' });
        return;
    }

    // Munculkan container hasil
    container.style.display = 'block';
    
    // Reset bar dulu
    bar.style.width = '0%';
    
    // Hitung persentase (karena ini web romantis, kita set minimal 90%)
    const finalPercent = Math.floor(Math.random() * 11) + 90; 

    // Jalankan animasi bar
    setTimeout(() => {
        bar.style.width = finalPercent + '%';
        
        // Animasi angka berjalan
        let start = 0;
        let counter = setInterval(() => {
            if (start >= finalPercent) {
                clearInterval(counter);
                triggerConfetti(); // Rayakan!
            }
            percentText.innerText = start + '%';
            start++;
        }, 20);

        // Berikan pesan berdasarkan hasil
        if (finalPercent >= 99) {
            statusText.innerText = "Kalian adalah belahan jiwa sejati! ♾️";
        } else if (finalPercent >= 95) {
            statusText.innerText = "Cinta kalian sangat kuat dan indah! 💖";
        } else {
            statusText.innerText = "Pasangan yang serasi dan saling melengkapi! ✨";
        }
    }, 100);
}
//fungsi pet name//
function refreshPetName() {
    const petElement = document.getElementById('petName');
    
    // Tambahkan animasi
    petElement.classList.remove('pop-animation');
    void petElement.offsetWidth; // Trigger reflow agar animasi bisa diulang
    petElement.classList.add('pop-animation');
    
    // Ganti teks
    petElement.textContent = getRandomPetName();
    
    // Efek perayaan kecil
    if (typeof triggerConfetti === "function") {
        triggerConfetti();
    }
}
//fungsi nextaffirmation//
function nextAffirmation() {
    const textElement = document.getElementById('affirmationText');
    
    // 1. Beri class untuk menyembunyikan teks (fade out)
    textElement.classList.add('text-hidden');
    
    // 2. Tunggu sebentar (durasi animasi), lalu ganti teks
    setTimeout(() => {
        textElement.textContent = getRandomAffirmation();
        
        // 3. Munculkan kembali (fade in)
        textElement.classList.remove('text-hidden');
        
        // Bonus: Efek perayaan kecil
        if (typeof triggerConfetti === "function") {
            triggerConfetti();
        }
    }, 500);
}
//Cek Mood//
function checkMood(mood) {
    // Ambil ulang nama dari localStorage untuk memastikan data terbaru
    const currentPartner = localStorage.getItem('partnerName') || 'Sayang';
    let title, text, iconUrl;

    switch (mood) {
        case 'happy':
            title = `Yey! Ikut Seneng! 🥰`;
            text = `Liat ${currentPartner} bahagia bikin Fadli makin semangat hari ini. Terus senyum ya!`;
            iconUrl = 'https://cdn-icons-png.flaticon.com/512/3699/3699516.png';
            break;
        case 'sad':
            title = `Sini Fadli Peluk... 🫂`;
            text = `Gak apa-apa kalau lagi sedih. Fadli selalu ada di sini buat dengerin cerita ${currentPartner}. Semangat ya!`;
            iconUrl = 'https://cdn-icons-png.flaticon.com/512/3595/3595905.png';
            break;
        case 'tired':
            title = `Istirahat Dulu ${currentPartner} ☕`;
            text = `${currentPartner} sudah hebat hari ini. Jangan dipaksa ya, tidur yang nyenyak. Love you!`;
            iconUrl = 'https://cdn-icons-png.flaticon.com/512/3094/3094831.png';
            break;
        case 'love':
            title = `Fadli Juga Sayang ${currentPartner}! ♾️`;
            text = `Cintanya Fadli ke ${currentPartner} gak akan pernah habis. Terima kasih sudah jadi orang paling spesial!`;
            iconUrl = 'https://cdn-icons-png.flaticon.com/512/833/833472.png';
            break;
    }

    Swal.fire({
        title: title,
        text: text,
        imageUrl: iconUrl,
        imageWidth: 80,
        imageHeight: 80,
        background: '#fff',
        borderRadius: '25px',
        confirmButtonText: 'I Love You Sayang ❤️',
        confirmButtonColor: '#ff69b4',
        customClass: {
            title: 'romantic-text' // Ini akan pakai font Sacramento jika sudah terpasang
        }
    });

    if(mood === 'happy' || mood === 'love') {
        triggerConfetti();
    }
}
//fungsi initscratchCard//
function initScratchCard() {
    const canvas = document.getElementById('scratchCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Set resolusi internal canvas agar tidak pecah
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let isDrawing = false;

    // Warna lapisan penutup (disamakan dengan nuansa pink soft)
    ctx.fillStyle = '#ffdae0'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Teks instruksi
    ctx.fillStyle = '#ff69b4';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('GOSOK DI SINI 🎀', canvas.width / 2, canvas.height / 2 + 5);

    function getCoords(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }

    function scratch(e) {
        if (!isDrawing) return;
        e.preventDefault();
        const coords = getCoords(e);
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(coords.x, coords.y, 20, 0, Math.PI * 2);
        ctx.fill();
        checkScratch();
    }

   function checkScratch() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let clearPixels = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
        if (imageData.data[i] === 0) clearPixels++;
    }

    // Jika sudah digosok lebih dari 60%
    if ((clearPixels / (imageData.data.length / 4)) > 0.6) {
        canvas.style.transition = 'opacity 0.8s ease';
        canvas.style.opacity = '0';

        setTimeout(() => {
            canvas.remove(); // Hapus canvas agar teks rahasia bisa disalin/dilihat jelas
            triggerConfetti(); // Efek kembang api kertas

            // --- EFEK POP-UP SEPERTI MOOD ---
            Swal.fire({
                title: 'Surprise! 🎁',
                text: 'Voucher Gratis: 1x Pelukan hangat, 1x Cium kening, dan 1x Es krim favorit kamu. Berlaku selamanya! 🍦🎁',
                imageUrl: 'https://cdn-icons-png.flaticon.com/512/833/833472.png', // Ikon hati
                imageWidth: 80,
                imageHeight: 80,
                background: '#fff',
                borderRadius: '25px',
                confirmButtonText: 'I Love You ❤️',
                confirmButtonColor: '#ff69b4',
                customClass: {
                    title: 'romantic-text'
                }
            });
        }, 500);
    }
}

    canvas.addEventListener('mousedown', () => isDrawing = true);
    canvas.addEventListener('touchstart', () => isDrawing = true);
    window.addEventListener('mouseup', () => isDrawing = false);
    window.addEventListener('touchend', () => isDrawing = false);
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('touchmove', scratch, { passive: false });
}
//Buat love meter //
function calculateLove() {
    // 1. Ambil elemen input
    const input1 = document.getElementById('name1');
    const input2 = document.getElementById('name2');
    
    if (!input1 || !input2) return;

    // 2. Ambil Nama Asli (untuk pesan) dan Nama Kecil (untuk logika)
    const nameInput1 = input1.value.trim();
    const nameInput2 = input2.value.trim();
    const n1 = nameInput1.toLowerCase();
    const n2 = nameInput2.toLowerCase();
    
    const container = document.getElementById('loveResultContainer');
    const percentText = document.getElementById('lovePercent');
    const statusText = document.getElementById('loveStatus');
    const fillRect = document.getElementById('heartFillRect');

    if (n1 === "" || n2 === "") {
        Swal.fire({ icon: 'error', title: 'Ups!', text: 'Isi kedua nama dulu ya sayang! ❤️' });
        return;
    }

    container.style.display = 'block';

    // 3. Logika Pengecekan (Perbaikan pada variabel isMe & isPartner)
    // Cek masing-masing kolom secara spesifik
    const n1IsFita = n1.includes('fita') || n1.includes('ita') || n1.includes('maulidia') || n1.includes('nurun') || n1.includes('nafita');
    const n2IsFita = n2.includes('fita') || n2.includes('ita') || n2.includes('maulidia') || n2.includes('nurun') || n2.includes('nafita');
    
    const n1IsFadli = n1.includes('fadli') || n1.includes('zaenu') || n1.includes('abdilah') || n1.includes('zen') || n1.includes('badilah');
    const n2IsFadli = n2.includes('fadli') || n2.includes('zaenu') || n2.includes('abdilah') || n2.includes('zen')|| n2.includes('badilah');

    let finalPercent;
    let customMessage = "";

    // JALUR 7 KONDISI
    if (n1IsFadli && n2IsFita) {
        finalPercent = Math.floor(Math.random() * 3) + 98; 
        customMessage = `${nameInput1} & ${nameInput2}: Takdir yang tak terpisahkan! ♾️`;
    } 
    else if (n1IsFita && n2IsFadli) {
        finalPercent = Math.floor(Math.random() * 3) + 98; 
        customMessage = `${nameInput1} & ${nameInput2}: Pasangan paling serasi di dunia! ❤️`;
    } 
    else if (n1IsFadli && !n2IsFita) {
        finalPercent = Math.floor(Math.random() * 5) + 15; 
        customMessage = `${nameInput1}, fokus ke Fita aja ya! Jangan ke ${nameInput2} 🧊`;
    } 
    else if (!n1IsFita && n2IsFadli) {
        finalPercent = Math.floor(Math.random() * 5) + 12; 
        customMessage = `${nameInput2} cuma buat Fita! ${nameInput1} gak usah ganggu. 😤`;
    } 
    else if (n1IsFita && !n2IsFadli) {
        finalPercent = Math.floor(Math.random() * 5) + 8; 
        customMessage = `Gak cocok! Hati ${nameInput1} cuma ada Fadli, bukan ${nameInput2}. 🌸`;
    } 
    else if (!n1IsFadli && n2IsFita) {
        finalPercent = Math.floor(Math.random() * 5) + 5; 
        customMessage = `Maaf ${nameInput1}, ${nameInput2} sudah ada yang punya! 💍`;
    } 
    else {
        finalPercent = Math.floor(Math.random() * 31) + 30; 
        customMessage = "Mungkin kalian cocok jadi teman saja. ✨";
    }

    // 4. Animasi Pengisian Hati
    let start = 0;
    if (window.loveInterval) clearInterval(window.loveInterval);

    window.loveInterval = setInterval(() => {
        if (start >= finalPercent) {
            clearInterval(window.loveInterval);
            if (finalPercent > 80) triggerConfetti();
            
            // Tampilkan Pesan Dinamis yang sudah dibuat di atas
            statusText.innerText = customMessage;
        }

        percentText.innerText = start + '%';
        const fillValue = 30 - (30 * (start / 100));
        fillRect.setAttribute('y', fillValue);
        start++;
    }, 25);
}

// Fungsi untuk memantau pesan baru dari Firebase
function initNotificationListener() {
    const badge = document.getElementById('notifBadge');
    const bell = document.getElementById('bellIcon');

    if (!window.dbRef) return;

    // ListenData akan terpanggil setiap kali ada pesan baru masuk
    window.listenData(window.dbRef, (snapshot) => {
        const data = snapshot.val();
        if (!data) return;

        // Cek apakah pesan berasal dari orang lain (bukan dari diri sendiri)
        // Ambil pengirim terakhir (karena Firebase mengembalikan seluruh objek, kita ambil yang paling baru)
        const entries = Object.values(data);
        const lastEntry = entries[entries.length - 1];

        if (lastEntry.from !== localStorage.getItem('partnerName')) {
            // Tampilkan badge dan update angkanya
            badge.style.display = 'flex';
            let currentNotif = parseInt(badge.innerText) || 0;
            badge.innerText = currentNotif + 1;

            // Tambahkan efek animasi goyang pada lonceng
            bell.classList.add('ring-animation');
            setTimeout(() => bell.classList.remove('ring-animation'), 1000);
        }
    });// Fungsi untuk memantau pesan baru dari Firebase
function initNotificationListener() {
    const badge = document.getElementById('notifBadge');
    const bell = document.getElementById('bellIcon');

    if (!window.dbRef) return;

    // ListenData akan terpanggil setiap kali ada pesan baru masuk
    window.listenData(window.dbRef, (snapshot) => {
        const data = snapshot.val();
        if (!data) return;

        // Cek apakah pesan berasal dari orang lain (bukan dari diri sendiri)
        // Ambil pengirim terakhir (karena Firebase mengembalikan seluruh objek, kita ambil yang paling baru)
        const entries = Object.values(data);
        const lastEntry = entries[entries.length - 1];

        if (lastEntry.from !== localStorage.getItem('partnerName')) {
            // Tampilkan badge dan update angkanya
            badge.style.display = 'flex';
            let currentNotif = parseInt(badge.innerText) || 0;
            badge.innerText = currentNotif + 1;

            // Tambahkan efek animasi goyang pada lonceng
            bell.classList.add('ring-animation');
            setTimeout(() => bell.classList.remove('ring-animation'), 1000);
        }
    });
}

// Fungsi untuk menghilangkan tanda merah saat halaman confession dibuka
function resetNotification() {
    const badge = document.getElementById('notifBadge');
    if (badge) {
        badge.innerText = "0";
        badge.style.display = 'none';
        console.log("Notifikasi telah dibaca ✨");
    }
}
}

// Fungsi untuk menghilangkan tanda merah saat halaman confession dibuka
function resetNotification() {
    const badge = document.getElementById('notifBadge');
    if (badge) {
        badge.innerText = "0";
        badge.style.display = 'none';
    }
}
//Function Foto Profil//
function updateProfileHeader() {
    const name = localStorage.getItem('partnerName') || 'Sayang';
    const headerName = document.getElementById('headerName');
    const userInitial = document.getElementById('userInitial');

    if (headerName) headerName.innerText = name;
    if (userInitial) userInitial.innerText = name.charAt(0).toUpperCase();
}

// Fungsi jika profil diklik (Munculkan pesan manis)
function showProfileSummary() {
    const name = localStorage.getItem('partnerName');
    const days = calculateRelationshipDuration();
    
    Swal.fire({
        title: `Halo, ${name}! ✨`,
        html: `Kamu adalah pemilik hati ini.<br>Kita sudah berbagi kebahagiaan selama <b>${days} hari</b>.`,
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/4359/4359963.png',
        imageWidth: 100,
        confirmButtonText: 'I Love You Fadli ❤️',
        confirmButtonColor: '#ff69b4',
        background: '#fff',
        borderRadius: '25px'
    });
}
// --- 1. LOGIKA STATUS JARINGAN (ONLINE/OFFLINE) ---
function updateOnlineStatus() {
    const statusDot = document.getElementById('statusDot');
    if (navigator.onLine) {
        statusDot.classList.add('online');
        statusDot.classList.remove('offline');
        console.log("Jaringan: Online");
    } else {
        statusDot.classList.add('offline');
        statusDot.classList.remove('online');
        console.log("Jaringan: Offline");
    }
}

// Pantau perubahan jaringan secara real-time
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// Cek status saat pertama kali halaman dimuat
updateOnlineStatus();


// --- 2. LOGIKA UBAH FOTO PROFIL (VERSI RAPI) ---
const profileUpload = document.getElementById('profileUpload');

if (profileUpload) {
    profileUpload.addEventListener('change', function(event) {
        const file = event.target.files[0];
        
        if (file) {
            // Validasi ukuran file (Max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                Swal.fire("Kegedean!", "Fotonya jangan lebih dari 2MB ya sayang supaya webnya gak berat.", "error");
                return;
            }

            const reader = new FileReader();
            
            reader.onload = function(e) {
                const imageUrl = e.target.result;
                
                // 1. Simpan ke LocalStorage
                localStorage.setItem('profilePicture', imageUrl);
                
                // 2. Update Tampilan Avatar
                renderAvatar(imageUrl);
                
                // 3. FITUR NO 4: DAILY COMPLIMENT
                const compliments = [
                    "Masya Allah, foto barunya cantik banget sayang! ✨",
                    "Aura cantiknya keluar banget di foto ini! 😍",
                    "Fadli langsung deg-degan liat foto baru kamu.. ❤️",
                    "Cantik banget! Gak kuat liatnya.. 🥰"
                ];
                const randomMsg = compliments[Math.floor(Math.random() * compliments.length)];

                Swal.fire({
                    title: 'Foto Baru! ✨',
                    text: randomMsg,
                    imageUrl: imageUrl,
                    imageWidth: 100,
                    imageHeight: 100,
                    imageAlt: 'Foto Cantik Fita',
                    background: '#fffafb',
                    confirmButtonColor: '#ff69b4',
                    borderRadius: '20px',
                    customClass: { title: 'romantic-text' }
                });

                // 4. FITUR NO 5: TRIGGER HEART
                if (typeof spreadLove === 'function') spreadLove();
                
                // 5. Update Status Online
                updateOnlineStatus();
            };

            reader.readAsDataURL(file);
        }
    });
}

// Fungsi pembantu untuk merender gambar ke elemen
function renderAvatar(url) {
    const avatarDisplay = document.getElementById('avatarDisplay');
    if (avatarDisplay) {
        avatarDisplay.innerHTML = `
            <img src="${url}" alt="Profile" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">
            <div id="statusDot" class="status-dot"></div>
        `;
        // Cek apakah hari ini anniversary untuk efek glow
        if (typeof checkAnniversaryGlow === 'function') checkAnniversaryGlow();
    }
}
// --- 3. MUAT FOTO SAAT REFRESH HALAMAN ---
function loadSavedProfile() {
    const savedImage = localStorage.getItem('profilePicture');
    if (savedImage) {
        const avatarDisplay = document.getElementById('avatarDisplay');
        avatarDisplay.innerHTML = `
            <img src="${savedImage}" alt="Profile">
            <div id="statusDot" class="status-dot"></div>
        `;
        updateOnlineStatus();
    }
}

// Jalankan saat startup
loadSavedProfile();

// Fungsi untuk mengecek Anniversary (No 2)
function checkAnniversaryGlow() {
    const annivDate = localStorage.getItem('anniversaryDate'); // Format DD/MM/YYYY
    if (!annivDate) return;

    const today = new Date();
    const todayStr = `${today.getDate()}/${today.getMonth() + 1}`;
    
    // Ambil tanggal & bulan dari data jadian
    const parts = annivDate.split('/');
    const annivMonthDay = `${parts[0]}/${parts[1]}`;

    const avatar = document.getElementById('avatarDisplay');
    if (todayStr === annivMonthDay) {
        avatar.classList.add('anniversary-glow');
        console.log("Happy Anniversary! Glow Aktif ✨");
    }
}
//untuk klik loveletter// 
// Fungsi Buka Amplop
window.openEnvelope = function() {
    const envelope = document.getElementById('envelope');
    const overlay = document.getElementById('letterOverlay');

    if (envelope && overlay) {
        // Vibrasi HP (jika didukung)
        if (navigator.vibrate) navigator.vibrate(50);

        envelope.classList.add('is-open');

        setTimeout(() => {
            overlay.style.display = 'flex';
            
            setTimeout(() => {
                overlay.classList.add('active');
                
                // Efek Confetti yang lebih terarah (seperti ledakan kecil)
                confettiExplosion();
            }, 50);
        }, 700);
    }
};

// 1. TAMBAHKAN FUNGSI INI (Penting agar tidak error)
function confettiExplosion() {
    const symbols = ['❤️', '✨', '🌸', '💖'];
    for (let i = 0; i < 20; i++) {
        const c = document.createElement('div');
        c.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
        c.style.position = 'fixed';
        c.style.left = '50%';
        c.style.top = '50%';
        c.style.zIndex = '10001';
        c.style.pointerEvents = 'none';
        c.style.transition = 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        document.body.appendChild(c);

        const angle = Math.random() * Math.PI * 2;
        const dist = 50 + Math.random() * 150;
        const x = Math.cos(angle) * dist;
        const y = Math.sin(angle) * dist;

        setTimeout(() => {
            c.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 360}deg)`;
            c.style.opacity = '0';
        }, 10);

        setTimeout(() => c.remove(), 1500);
    }
}

// 2. PASTIKAN FUNGSI CLOSE SEPERTI INI (Gunakan selector yang tepat)
//fungsi pop up//
function showSpecialPopup(title, message) {
    if (typeof triggerConfetti === "function") triggerConfetti();

    Swal.fire({
        title: title,
        text: message,
        background: 'rgba(255, 255, 255, 0.95)',
        backdrop: `rgba(255, 182, 193, 0.4)`, // Backdrop warna pink transparan
        showConfirmButton: true,
        confirmButtonText: 'I Love You Too ❤️',
        confirmButtonColor: '#ff69b4',
        
        // Animasi Masuk & Keluar yang sangat smooth
        showClass: {
            popup: 'animate__animated animate__zoomIn animate__faster'
        },
        hideClass: {
            popup: 'animate__animated animate__zoomOut animate__faster'
        },
        
        customClass: {
            title: 'romantic-text',
            popup: 'special-event-popup-card'
        },
        borderRadius: '30px'
    });
}

window.closeLetter = function() {
    const overlay = document.getElementById('letterOverlay');
    const envelope = document.getElementById('envelope');
    // Mencari elemen surat secara spesifik
    const paper = document.querySelector('.letter-paper');

    if (overlay && paper) {
        // 1. Matikan semua animasi yang sedang berjalan (seperti melayang/floating)
        paper.style.animation = "none";
        
        // 2. Beri jeda 10ms agar browser sadar animasi mati, lalu pasang animasi keluar
        setTimeout(() => {
            // Pasang animasi keluar secara manual lewat JS
            paper.style.animation = "magicalExit 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards";
            
            // 3. Hilangkan blur background
            overlay.classList.remove('active');

            // 4. Tunggu animasi meluncur turun selesai (700ms) baru sembunyikan total
            setTimeout(() => {
                overlay.style.display = 'none'; 
                
                // Reset amplop
                if (envelope) {
                    envelope.classList.remove('is-open');
                }
                
                // Bersihkan style agar bisa dibuka lagi nanti
                paper.style.animation = ""; 
            }, 700);
        }, 10);
    }
};