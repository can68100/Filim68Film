// FILM VERİTABANI
const movies = [
    {
        id: 1,
        title: "Inception (Başlangıç)",
        category: "Bilim Kurgu, Aksiyon",
        rating: "8.8",
        poster: "https://unsplash.com",
        iframeUrl: "https://youtube.com",
        description: "Hırsız Dom Cobb, insanların rüyalarından sırları çalan bir uzmandır. Bu kez görevi bir fikri çalmak değil, yerleştirmektir."
    },
    {
        id: 2,
        title: "Interstellar (Yıldızlararası)",
        category: "Bilim Kurgu, Dram",
        rating: "8.7",
        poster: "https://unsplash.com",
        iframeUrl: "https://youtube.com",
        description: "Bir grup astronot, insanlığın hayatta kalmasını sağlamak için solucan deliğinden geçerek yeni bir gezegen arayışına çıkar."
    },
    {
        id: 3,
        title: "The Dark Knight (Kara Şövalye)",
        category: "Aksiyon, Suç",
        rating: "9.0",
        poster: "https://unsplash.com",
        iframeUrl: "https://youtube.com",
        description: "Batman, Gotham şehrini kaosa sürüklemeye çalışan gizemli ve sadist suçlu Joker ile karşı karşıya gelir."
    },
    {
        id: 4,
        title: "The Hangover (Felekten Bir Gece)",
        category: "Komedi",
        rating: "7.7",
        poster: "https://unsplash.com",
        iframeUrl: "https://youtube.com",
        description: "Bekarlığa veda partisi için Las Vegas'a giden dört arkadaş, ertesi sabah damat kayıp olarak ve hiçbir şey hatırlamayarak uyanır."
    },
   {
        id: 5,
        title: "kaşmir bakını",
        category: "aksiyon",
        rating: "7.7",
        poster: "http://10.97.86.187/kashmir-baskini-2000.jpg",
        iframeUrl: "http://127.0.0.1/Ka%C5%9Fmir%20Bask%C4%B1n%C4%B1%202000%20Filmi%201080p%20Full%20HD%20izle.mp4",
        description: "Bekarlığa veda partisi için Las Vegas'a giden dört arkadaş, ertesi sabah damat kayıp olarak ve hiçbir şey hatırlamayarak uyanır."
    },


       
];



// DOM Elemanları
const movieGrid = document.getElementById('movieGrid');
const playerSection = document.getElementById('playerSection');
const videoPlayer = document.getElementById('videoPlayer');
const playerTitle = document.getElementById('playerTitle');
const playerDesc = document.getElementById('playerDesc');
const closePlayer = document.getElementById('closePlayer');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categoryContainer = document.getElementById('categoryContainer');
const gridTitle = document.getElementById('gridTitle');
const randomBtn = document.getElementById('randomBtn'); // Yeni buton

let activeCategory = "Hepsi";

// Kategorileri Dinamik Olarak Oluşturma
function generateCategoryButtons() {
    const categories = new Set(["Hepsi"]);
    movies.forEach(movie => {
        movie.category.split(',').forEach(cat => {
            categories.add(cat.trim());
        });
    });

    categoryContainer.innerHTML = "";
    
    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.classList.add('category-btn');
        if(category === activeCategory) btn.classList.add('active');
        btn.textContent = category;
        
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = category;
            filterMovies();
        });
        
        categoryContainer.appendChild(btn);
    });
}

// Filmleri Ekrana Basma
function displayMovies(moviesList) {
    movieGrid.innerHTML = "";
    
    if(moviesList.length === 0) {
        movieGrid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:#94a3b8;">Aradığınız kriterde film bulunamadı.</p>`;
        return;
    }

    moviesList.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <div class="poster-wrapper">
                <span class="rating"><i class="fa-solid fa-star"></i> ${movie.rating}</span>
                <img src="${movie.poster}" alt="${movie.title}">
            </div>
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>${movie.category}</p>
            </div>
        `;
        
        movieCard.addEventListener('click', () => {
            playMovie(movie);
        });

        movieGrid.appendChild(movieCard);
    });
}

// Ortak Filtreleme Fonksiyonu
function filterMovies() {
    const searchTerm = searchInput.value.toLowerCase();
    
    const filtered = movies.filter(movie => {
        const matchesCategory = (activeCategory === "Hepsi" || movie.category.includes(activeCategory));
        const matchesSearch = movie.title.toLowerCase().includes(searchTerm) || movie.category.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });

    if(activeCategory === "Hepsi") {
        gridTitle.innerHTML = `<i class="fa-solid fa-fire"></i> Tüm Filmler`;
    } else {
        gridTitle.innerHTML = `<i class="fa-solid fa-tags"></i> ${activeCategory} Filmleri`;
    }

    displayMovies(filtered);
}

// --- YENİ: Rastgele Film Öner Fonksiyonu ---
function suggestRandomMovie() {
    if (movies.length === 0) return;
    
    // Rastgele bir dizin seçiyoruz
    const randomIndex = Math.floor(Math.random() * movies.length);
    const selectedMovie = movies[randomIndex];
    
    // Seçilen filmi oynat
    playMovie(selectedMovie);
}

// Oynatıcı Fonksiyonları
function playMovie(movie) {
    videoPlayer.src = movie.iframeUrl;
    playerTitle.textContent = movie.title;
    playerDesc.textContent = movie.description;
    playerSection.classList.remove('hidden');
    playerSection.scrollIntoView({ behavior: 'smooth' });
}

closePlayer.addEventListener('click', () => {
    videoPlayer.src = "";
    playerSection.classList.add('hidden');
});

// Event Listeners
searchBtn.addEventListener('click', filterMovies);
searchInput.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') filterMovies();
});
randomBtn.addEventListener('click', suggestRandomMovie); // Zar butonu dinleyicisi

// Başlangıç yüklemesi
document.addEventListener('DOMContentLoaded', () => {
    generateCategoryButtons();
    displayMovies(movies);
});
