document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('readme-form');
    const formInputs = document.querySelectorAll('#readme-form input, #readme-form textarea, #readme-form select');
    const previewContainer = document.getElementById('preview-container');
    
    // دکمه‌ها
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const resetBtn = document.getElementById('resetBtn');

    // این متغیر رشته نهایی مارک‌داون را در خود نگه می‌دارد
    window.rawMarkdown = "";

    // تابع سازنده مارک‌داون (بدون تغییر نسبت به مرحله قبل)
    function generateMarkdown() {
        const name = document.getElementById('name').value.trim();
        const title = document.getElementById('title').value.trim();
        const about = document.getElementById('about').value.trim();
        
        const github = document.getElementById('social-github').value.trim();
        const linkedin = document.getElementById('social-linkedin').value.trim();

        const showCards = document.getElementById('stat-cards').checked;
        const showLangs = document.getElementById('stat-langs').checked;
        const showStreak = document.getElementById('stat-streak').checked;
        const theme = document.getElementById('stat-theme').value;

        const projName = document.getElementById('proj-name').value.trim();
        const projLink = document.getElementById('proj-link').value.trim();
        const projDesc = document.getElementById('proj-desc').value.trim();

        const skills = Array.from(document.querySelectorAll('.skill-checkbox:checked')).map(cb => cb.value);

        let md = "";

        if (name) md += `<h1 align="center">Hi 👋, I'm ${name}</h1>\n`;
        if (title) md += `<h3 align="center">${title}</h3>\n\n`;

        if (about) md += `## 🙋‍♂️ About Me\n${about}\n\n`;

        if (skills.length > 0) {
            md += `## 🚀 Skills\n<p align="left">\n`;
            const badges = { python: "3776AB", cpp: "00599C", javascript: "F7DF1E", html5: "E34F26", react: "20232A", linux: "FCC624" };
            const logos = { cpp: 'c%2B%2B', html5: 'html5', react: 'react', python: 'python', javascript: 'javascript', linux: 'linux' };
            
            skills.forEach(skill => {
                const color = badges[skill] || "grey";
                const logo = logos[skill] || skill;
                md += `  <img src="https://img.shields.io/badge/${skill}-${color}?style=for-the-badge&logo=${logo}&logoColor=white" alt="${skill}" />\n`;
            });
            md += `</p>\n\n`;
        }

        if (projName) {
            md += `## 💻 Top Project\n`;
            md += `**[${projName}](${projLink || '#'})**\n`;
            if (projDesc) md += `> ${projDesc}\n\n`;
        }

        if (github || linkedin) {
            md += `## 🌐 Connect with me\n<p align="left">\n`;
            if (github) md += `  <a href="https://github.com/${github}" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="github" /></a>\n`;
            if (linkedin) md += `  <a href="https://linkedin.com/in/${linkedin}" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="linkedin" /></a>\n`;
            md += `</p>\n\n`;
        }

        if (github && (showCards || showLangs || showStreak)) {
            md += `## 📊 GitHub Stats\n<div align="left">\n`;
            if (showCards) {
                md += `  <img src="https://github-readme-stats.vercel.app/api?username=${github}&show_icons=true&theme=${theme}" alt="GitHub Stats" />\n`;
            }
            if (showStreak) {
                md += `  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${github}&theme=${theme}" alt="GitHub Streak" />\n`;
            }
            if (showLangs) {
                md += `  <br><br>\n  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${github}&layout=compact&theme=${theme}" alt="Top Languages" />\n`;
            }
            md += `</div>\n\n`;
        }

        return md.trim();
    }

    function updatePreview() {
        const markdownText = generateMarkdown();
        window.rawMarkdown = markdownText; // ذخیره برای دانلود و کپی
        
        if (!markdownText) {
            previewContainer.innerHTML = `
                <div class="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 space-y-3 border-2 border-dashed border-gray-200 dark:border-darkBorder rounded-lg p-10">
                    <i class="fa-brands fa-markdown text-4xl"></i>
                    <p>Start typing to generate preview...</p>
                </div>
            `;
            return;
        }

        previewContainer.innerHTML = `<div class="markdown-body">\n${marked.parse(markdownText)}\n</div>`;
    }

    formInputs.forEach(input => {
        input.addEventListener('input', updatePreview);
        input.addEventListener('change', updatePreview);
    });

    // -------------------------------------------------------------
    // کدهای جدید مرحله ۵: قابلیت‌های کپی، دانلود و ریست
    // -------------------------------------------------------------

    // ۱. قابلیت کپی در کلیپ‌بورد
    copyBtn.addEventListener('click', () => {
        if (!window.rawMarkdown) {
            alert("فایلی برای کپی وجود ندارد! لطفاً فرم را پر کنید.");
            return;
        }
        
        // استفاده از API مدرن Clipboard
        navigator.clipboard.writeText(window.rawMarkdown).then(() => {
            // تغییر موقت دکمه برای نمایش پیام موفقیت
            const originalHTML = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fa-solid fa-check text-green-500"></i> <span class="hidden md:inline text-green-600 dark:text-green-400 font-bold">Copied!</span>';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalHTML;
            }, 2000); // بازگشت به حالت اول بعد از ۲ ثانیه
        }).catch(err => {
            console.error("خطا در کپی: ", err);
            alert("مرورگر شما از قابلیت کپی پشتیبانی نمی‌کند.");
        });
    });

    // ۲. قابلیت دانلود فایل README.md
    downloadBtn.addEventListener('click', () => {
        if (!window.rawMarkdown) {
            alert("فایلی برای دانلود وجود ندارد! لطفاً فرم را پر کنید.");
            return;
        }

        // ساخت یک فایل (Blob) در حافظه مرورگر
        const blob = new Blob([window.rawMarkdown], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        
        // ساخت یک تگ لینک مجازی و کلیک کردن روی آن
        const a = document.createElement('a');
        a.href = url;
        a.download = "README.md"; // نام فایل خروجی
        document.body.appendChild(a);
        a.click();
        
        // پاکسازی حافظه
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // ۳. قابلیت ریست کردن فرم
    resetBtn.addEventListener('click', () => {
        if(confirm("آیا مطمئن هستید که می‌خواهید تمام اطلاعات فرم را پاک کنید؟")) {
            form.reset();
            updatePreview(); // رندر مجدد پیش‌نمایش (که حالا خالی می‌شود)
        }
    });

    // اجرای اولیه هنگام لود شدن صفحه
    updatePreview();
});
            
