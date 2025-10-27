// --- โค้ดสำหรับปุ่ม Collapsible ---
var collapsibles = document.getElementsByClassName("collapsible");
for (var i = 0; i < collapsibles.length; i++) {
    collapsibles[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}

// --- โค้ดสำหรับ Scroll Animation ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
});

const elementsToFadeIn = document.querySelectorAll('.fade-in-section');
elementsToFadeIn.forEach((el) => observer.observe(el));

// --- (โค้ดใหม่) โค้ดสำหรับสลับธีม (Theme Toggle) ---

// 1. หาปุ่มและ body
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const body = document.body;

// 2. (สำคัญ) ตรวจสอบธีมที่บันทึกไว้ใน localStorage เมื่อหน้าเว็บโหลด
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    // ถ้าจำไว้ว่าเป็น dark mode ให้เปิด dark mode
    body.classList.add('dark-mode');
    themeToggleBtn.innerHTML = '☀️'; // เปลี่ยนไอคอนเป็นพระอาทิตย์
} else {
    // ถ้าไม่ใช่ (หรือเป็น null) ให้ใช้ light mode (ค่าเริ่มต้น)
    body.classList.remove('dark-mode');
    themeToggleBtn.innerHTML = '🌙'; // เปลี่ยนไอคอนเป็นพระจันทร์
}

// 3. เพิ่ม Event Listener ให้ปุ่ม
themeToggleBtn.addEventListener('click', function() {
    // สลับคลาส .dark-mode ที่ body
    body.classList.toggle('dark-mode');

    // 4. ตรวจสอบว่าตอนนี้เป็นธีมอะไร แล้วบันทึกลง localStorage
    if (body.classList.contains('dark-mode')) {
        // ถ้าตอนนี้เป็น dark mode
        themeToggleBtn.innerHTML = '☀️'; // เปลี่ยนไอคอนเป็นพระอาทิตย์
        localStorage.setItem('theme', 'dark'); // บันทึกว่าเลือก dark
    } else {
        // ถ้าตอนนี้เป็น light mode
        themeToggleBtn.innerHTML = '🌙'; // เปลี่ยนไอคอนเป็นพระจันทร์
        localStorage.setItem('theme', 'light'); // บันทึกว่าเลือก light
    }
});