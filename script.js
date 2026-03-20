const translations = {
    en: {
        "nav-home": "Home",
        "nav-features": "Features",
        "nav-contact": "Contact",
        "nav-signup": "Sign up now",
        "hero-title": "Take your ideas <br><span class=\"highlight\">further</span>",
        "hero-subtitle": "A comprehensive solution to help you optimize workflows and skyrocket revenue with cutting-edge technology.",
        "cta-explore": "Explore now",
        "cta-learn": "Learn more",
        "section-title": "Why choose Aura?",
        "feat1-title": "Maximum speed",
        "feat1-desc": "Our system is optimized to deliver outstanding performance for your projects.",
        "feat2-title": "Absolute security",
        "feat2-desc": "Your data is always encrypted and safely protected on our platform.",
        "feat3-title": "Refined interface",
        "feat3-desc": "A great user experience with a modern, easy-to-use design.",
        "footer-text": "&copy; 2026 Aura. All rights reserved."
    },
    vi: {
        "nav-home": "Trang chủ",
        "nav-features": "Tính năng",
        "nav-contact": "Liên hệ",
        "nav-signup": "Đăng ký ngay",
        "hero-title": "Đưa ý tưởng của bạn <br><span class=\"highlight\">bay xa hơn</span>",
        "hero-subtitle": "Giải pháp toàn diện giúp bạn tối ưu hóa quy trình làm việc và bứt phá doanh thu với công nghệ tiên tiến nhất.",
        "cta-explore": "Khám phá ngay",
        "cta-learn": "Tìm hiểu thêm",
        "section-title": "Tại sao chọn Aura?",
        "feat1-title": "Tốc độ tối đa",
        "feat1-desc": "Hệ thống được tối ưu hóa để mang lại hiệu suất vượt trội cho dự án của bạn.",
        "feat2-title": "Bảo mật tuyệt đối",
        "feat2-desc": "Dữ liệu của bạn luôn được mã hóa và bảo vệ an toàn trên nền tảng của chúng tôi.",
        "feat3-title": "Giao diện tinh tế",
        "feat3-desc": "Trải nghiệm người dùng tuyệt vời với thiết kế hiện đại, dễ dàng sử dụng.",
        "footer-text": "&copy; 2026 Aura. Bản quyền thuộc về Aura."
    }
};

let currentLang = localStorage.getItem('lang') || 'en';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (key === 'hero-title' || key === 'footer-text') {
                el.innerHTML = translations[lang][key];
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });

    const langToggleBtn = document.getElementById('lang-toggle');
    if (langToggleBtn) {
        langToggleBtn.textContent = lang === 'en' ? 'VI' : 'EN';
    }
}

// Xử lý hiệu ứng Navbar khi scroll
document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);

    const langToggleBtn = document.getElementById('lang-toggle');
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            const newLang = currentLang === 'en' ? 'vi' : 'en';
            setLanguage(newLang);
        });
    }
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Thêm hiệu ứng hover 3D (Tilt effect) cho các thẻ tính năng
    const cards = document.querySelectorAll('.feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Tính toán góc xoay dựa trên vị trí chuột, max. 10deg
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        });

        card.addEventListener('mouseenter', () => {
            // Tắt transition khi chuột đang di chuyển trong card để hiệu ứng mượt hơn
            card.style.transition = 'none';
        });
    });
});
