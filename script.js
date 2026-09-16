document.addEventListener('DOMContentLoaded', () => {
    // گرفتن المنت‌های فرم و پیش‌نمایش
    const form = document.getElementById('readme-form');
    const formInputs = document.querySelectorAll('#readme-form input, #readme-form textarea, #readme-form select');
    const previewContainer = document.getElementById('preview-container');
    
    // گرفتن دکمه‌های اصلی
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const resetBtn = document.getElementById('resetBtn');
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    
    const htmlElement = document.documentElement;
    const themeIcon = themeToggleBtn.querySelector('i');

    // متغیر سراسری برای نگهداری کد مارک‌داون نهایی
    window.rawMarkdown = "";

    // -------------------------------------------------------------
    // ۱. مدیریت تم تاریک (Dark Mode) و ذخیره در LocalStorage
    // -------------------------------------------------------------
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        htmlElement.classList.remove('dark');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }

    themeToggleBtn.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        if (htmlElement.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            localStorage.setItem('theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    });

    // -------------------------------------------------------------
    // ۲. تابع جامع تولید کد مارک‌داون (Markdown Generator)
    // -------------------------------------------------------------
    function generateMarkdown() {
        // اطلاعات پایه و مقدمه
        const name = document.getElementById('name').value.trim();
        const title = document.getElementById('title').value.trim();
        const about = document.getElementById('about').value.trim();
        const workingOn = document.getElementById('working-on').value.trim();
        const learning = document.getElementById('learning').value.trim();
        const askme = document.getElementById('askme').value.trim();
        const email = document.getElementById('email').value.trim();

        // شبکه‌های اجتماعی و لینک‌ها
        const github = document.getElementById('social-github').value.trim();
        const linkedin = document.getElementById('social-linkedin').value.trim();
        const twitter = document.getElementById('social-twitter').value.trim();
        const stackoverflow = document.getElementById('social-stackoverflow').value.trim();
        const youtube = document.getElementById('social-youtube').value.trim();
        const portfolio = document.getElementById('portfolio').value.trim();

        // بخش حمایت مالی (Donate)
        const donateBmc = document.getElementById('donate-bmc').value.trim();
        const donateKofi = document.getElementById('donate-kofi').value.trim();

        // تنظیمات آمار گیت‌هاب
        const showCards = document.getElementById('stat-cards').checked;
        const showLangs = document.getElementById('stat-langs').checked;
        const showStreak = document.getElementById('stat-streak').checked;
        const theme = document.getElementById('stat-theme').value;

        // مهارت‌های انتخاب شده (چک‌باکس‌ها)
        const skills = Array.from(document.querySelectorAll('.skill-checkbox:checked')).map(cb => cb.value);

        let md = "";

        // ساخت هدر پروفایل
        if (name) md += `<h1 align="center">${name}</h1>\n`;
        if (title) md += `<h3 align="center">${title}</h3>\n\n`;

        // بخش درباره من و وضعیت‌های فعلی
        if (about || workingOn || learning || askme || email) {
            if (about) md += `## 🙋‍♂️ About Me\n${about}\n\n`;
            
            let currentInfo = "";
            if (workingOn) currentInfo += `- 🔭 I’m currently working on **${workingOn}**\n`;
            if (learning) currentInfo += `- 🌱 I’m currently learning **${learning}**\n`;
            if (askme) currentInfo += `- 💬 Ask me about **${askme}**\n`;
            if (email) currentInfo += `- 📫 How to reach me **${email}**\n`;
            
            if (currentInfo) md += `${currentInfo}\n`;
        }

        // بخش مهارت‌ها و ابزارها (Badge ساز پیشرفته)
        if (skills.length > 0) {
            md += `## 🚀 Languages and Tools\n<p align="left">\n`;
            
            // رنگ‌بندی بج‌های مختلف
            const badgeColors = {
                html5: "E34F26", css3: "1572B6", javascript: "F7DF1E", react: "61DAFB", vuejs: "4FC08D", angular: "DD0031", tailwindcss: "06B6D4", bootstrap: "7952B3", sass: "CC6699",
                python: "3776AB", cpp: "00599C", csharp: "239120", java: "ED8B00", nodejs: "339933", php: "777BB4", go: "00ADD8", ruby: "CC342D", rust: "000000",
                git: "F05032", docker: "2496ED", linux: "FCC624", aws: "232F3E", mysql: "4479A1", mongodb: "47A248", postgres: "4169E1", figma: "F24E1E", firebase: "FFCA28"
            };

            skills.forEach(skill => {
                const color = badgeColors[skill] || "grey";
                // تنظیم نام لوگو برای Shields.io
                let logoName = skill;
                if (skill === 'cpp') logoName = 'c%2B%2B';
                if (skill === 'tailwindcss') logoName = 'tailwindcss';
                if (skill === 'postgres') logoName = 'postgresql';

                md += `  <img src="https://img.shields.io/badge/${skill.toUpperCase()}-${color}?style=for-the-badge&logo=${logoName}&logoColor=white" alt="${skill}" />\n`;
            });
            md += `</p>\n\n`;
        }

        // بخش شبکه‌های اجتماعی و راه‌های ارتباطی
        if (github || linkedin || twitter || stackoverflow || youtube || portfolio) {
            md += `## 🌐 Connect with me\n<p align="left">\n`;
            if (github) md += `  <a href="https://github.com/${github}" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="github" /></a>\n`;
            if (linkedin) md += `  <a href="https://linkedin.com/in/${linkedin}" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="linkedin" /></a>\n`;
            if (twitter) md += `  <a href="https://twitter.com/${twitter}" target="_blank"><img src="https://img.shields.io/badge/X-%23000000.svg?style=for-the-badge&logo=X&logoColor=white" alt="twitter" /></a>\n`;
            if (stackoverflow) md += `  <a href="https://stackoverflow.com/users/${stackoverflow}" target="_blank"><img src="https://img.shields.io/badge/Stack_Overflow-FE7A16?style=for-the-badge&logo=stack-overflow&logoColor=white" alt="stackoverflow" /></a>\n`;
            if (youtube) md += `  <a href="https://youtube.com/@${youtube}" target="_blank"><img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="youtube" /></a>\n`;
            if (portfolio) md += `  <a href="${portfolio}" target="_blank"><img src="https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white" alt="portfolio" /></a>\n`;
            md += `</p>\n\n`;
        }

        // بخش آمار گیت‌هاب (GitHub Stats & Metrics)
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

        // بخش حمایت مالی (Support / Donate)
        if (donateBmc || donateKofi) {
            md += `## ☕ Support Me\n<p align="left">\n`;
            if (donateBmc) {
                md += `  <a href="https://www.buymeacoffee.com/${donateBmc}" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="40" alt="Buy Me A Coffee" /></a>\n`;
            }
            if (donateKofi) {
                md += `  <a href="https://ko-fi.com/${donateKofi}" target="_blank"><img src="https://ko-fi.com/img/githubbutton_sm.svg" height="40" alt="Ko-fi" /></a>\n`;
            }
            md += `</p>\n\n`;
        }

        return md.trim();
    }

    // -------------------------------------------------------------
    // ۳. رندر زنده پیش‌نمایش در صفحه
    // -------------------------------------------------------------
    function updatePreview() {
        const markdownText = generateMarkdown();
        window.rawMarkdown = markdownText; // ذخیره متن خام جهت کپی و دانلود
        
        if (!markdownText) {
            previewContainer.innerHTML = `
                <div class="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 space-y-3 p-10">
                    <i class="fa-brands fa-markdown text-5xl"></i>
                    <p class="text-base font-medium">Start filling out the form to see your live preview...</p>
                </div>
            `;
            return;
        }

        previewContainer.innerHTML = `<div class="markdown-body">\n${marked.parse(markdownText)}\n</div>`;
    }

    // رخداد تغییرات در فرم
    formInputs.forEach(input => {
        input.addEventListener('input', updatePreview);
        input.addEventListener('change', updatePreview);
    });

    // -------------------------------------------------------------
    // ۴. قابلیت‌های کلیدی: کپی، دانلود و ریست فرم
    // -------------------------------------------------------------

    // کپی کردن کد مارک‌داون
    copyBtn.addEventListener('click', () => {
        if (!window.rawMarkdown) {
            alert("Nothing to copy! Please fill in some fields first.");
            return;
        }
        
        navigator.clipboard.writeText(window.rawMarkdown).then(() => {
            const originalHTML = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fa-solid fa-check text-green-500 md:mr-2"></i> <span class="hidden md:inline text-green-600 dark:text-green-400 font-bold">Copied!</span>';
            setTimeout(() => {
                copyBtn.innerHTML = originalHTML;
            }, 2000);
        }).catch(err => {
            console.error("Clipboard error: ", err);
            alert("Failed to copy text to clipboard.");
        });
    });

    // دانلود به عنوان فایل README.md
    downloadBtn.addEventListener('click', () => {
        if (!window.rawMarkdown) {
            alert("Nothing to download! Please fill in some fields first.");
            return;
        }

        const blob = new Blob([window.rawMarkdown], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = "README.md";
        document.body.appendChild(a);
        a.click();
        
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // ریست کامل فرم
    resetBtn.addEventListener('click', () => {
        if(confirm("Are you sure you want to reset the form and clear all data?")) {
            form.reset();
            updatePreview();
        }
    });

    // اجرای اولیه برای وضعیت پیش‌فرض صفحه
    updatePreview();
});
                
