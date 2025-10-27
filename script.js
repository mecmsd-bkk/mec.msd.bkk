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
    // วนลูปสำหรับทุก entry ที่ observer ตรวจจับได้
    entries.forEach((entry) => {
        // ถ้า Element เข้ามาในหน้าจอ (isIntersecting)
        if (entry.isIntersecting) {
            // เพิ่มคลาส is-visible เพื่อเริ่ม animation
            entry.target.classList.add('is-visible');
        }
    });
});

// เลือกทุก elements ที่มีคลาส fade-in-section มาให้ Observer คอยดู
const elementsToFadeIn = document.querySelectorAll('.fade-in-section');
elementsToFadeIn.forEach((el) => observer.observe(el));