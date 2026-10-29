// ===== 1. ПЕРЕКЛЮЧЕНИЕ ТЕМЫ =====
const themeBtn = document.getElementById('themeBtn');
const iconMoon = themeBtn.querySelector('.icon-moon');
const iconSun = themeBtn.querySelector('.icon-sun');

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    iconMoon.style.display = 'none';
    iconSun.style.display = 'block';
}

themeBtn.addEventListener('click', function () {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    
    if (isDark) {
        iconMoon.style.display = 'none';
        iconSun.style.display = 'block';
    } else {
        iconMoon.style.display = 'block';
        iconSun.style.display = 'none';
    }
    
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ===== 2. БУРГЕР-МЕНЮ =====
const burgerBtn = document.getElementById('burgerBtn');
const nav = document.getElementById('nav');

burgerBtn.addEventListener('click', function () {
    nav.classList.toggle('open');
});

nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
        nav.classList.remove('open');
    });
});

// ===== 3. КАРУСЕЛИ ВНУТРИ КАРТОЧЕК =====
const carousels = document.querySelectorAll('.project-carousel-wrapper');

carousels.forEach(wrapper => {
    const track = wrapper.querySelector('.project-carousel-track');
    const slides = wrapper.querySelectorAll('.project-slide');
    const prevBtn = wrapper.querySelector('.prev');
    const nextBtn = wrapper.querySelector('.next');
    let currentIndex = 0;

    function updateButtons() {
        prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
        prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
        nextBtn.style.opacity = currentIndex === slides.length - 1 ? '0.3' : '1';
        nextBtn.style.pointerEvents = currentIndex === slides.length - 1 ? 'none' : 'auto';
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            updateButtons();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            updateButtons();
        }
    });

    updateButtons();
});

// ===== 4. ФИЛЬТРАЦИЯ ПРОЕКТОВ =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-vertical-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ===== 5. АВТОМАТИЧЕСКИЕ НЕРАЗРЫВНЫЕ ПРОБЕЛЫ =====
document.addEventListener('DOMContentLoaded', () => {
    const prepRegex = /\b(в|во|без|до|из|к|ко|на|по|о|об|от|ото|с|со|у|через|при|для|про|над|под|за|из-за|из-под|и|а|но|да|или|либо|что|чтобы|как|так|же|ли|бы|не|ни)\s+/gi;
    
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function(node) {
                const parent = node.parentNode.nodeName;
                if (parent === 'SCRIPT' || parent === 'STYLE' || parent === 'NOSCRIPT') {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        }
    );

    let node;
    while (node = walker.nextNode()) {
        if (node.nodeValue.trim().length > 0) {
            node.nodeValue = node.nodeValue.replace(prepRegex, '$1&nbsp;');
        }
    }
});

// ===== 6. КОПИРОВАНИЕ ПОЧТЫ =====
const emailBtn = document.getElementById('emailBtn');

// Создаем элемент уведомления
const toast = document.createElement('div');
toast.className = 'toast';
toast.textContent = 'Скопировано!';
document.body.appendChild(toast);

emailBtn.addEventListener('click', function (e) {
    e.preventDefault(); // Отменяем переход по ссылке
    
    const email = this.textContent.trim();

    // Копируем в буфер обмена
    navigator.clipboard.writeText(email).then(() => {
        // Показываем уведомление
        toast.classList.add('show');
        
        // Скрываем через 2 секунды
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }).catch(err => {
        console.error('Ошибка копирования: ', err);
    });
});