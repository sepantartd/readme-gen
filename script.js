document.addEventListener('DOMContentLoaded', () => {
    const formInputs = document.querySelectorAll('#readme-form input, #readme-form textarea, #readme-form select');
    const previewContainer = document.getElementById('preview-container');

    // این متغیر رشته نهایی مارک‌داون را در خود نگه می‌دارد تا در مراحل بعد کپی/دانلود شود
    window.rawMarkdown = "";

    function generateMarkdown() {
        // ۱. دریافت مقادیر از فرم
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

        // دریافت مهارت‌های تیک‌خورده
        const skills = Array.from(document.querySelectorAll('.skill-checkbox:checked')).map(cb => cb.value);

        // ۲. ساخت رشته مارک‌داون
        let md = "";

        if (name) md += `<h1 align="center">Hi 👋, I'm ${name}</h1>\n`;
        if (title) md += `<h3 align="center">${title}</h3>\n\n`;

        if (about) md += `## 🙋‍♂️ About Me\n${about}\n\n`;

        if (skills.length > 0) {
            md += `## 🚀 Skills\n<p align="left">\n`;
            // رنگ‌ها و آیکون‌های اختصاصی برای شیلدها (Badges)
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

        // نمایش آمارهای گیت‌هاب (فقط اگر یوزرنیم وارد شده باشد)
        if (github && (showCards || showLangs || showStreak)) {
            md += `## 📊 GitHub Stats\n<div align="left">\n`;
            if (showCards) {
                md += `  <img src="https://github-readme-stats.vercel.app/api?username=${github}&show_icons=true&theme=${theme}" alt="GitHub Stats" />\n`;
            }
            if (showStreak) {
                md += `  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${github}&theme=${theme}" alt="GitHub Streak" />\n`;
            }
            if (showLangs) {
                // تگ <br> برای رفتن به خط بعد
                md += `  <br><br>\n  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${github}&layout=compact&theme=${theme}" alt="Top Languages" />\n`;
            }
            md += `</div>\n\n`;
        }

        return md.trim();
    }

    function updatePreview() {
        const markdownText = generateMarkdown();
        // ذخیره مارک‌داون برای دکمه‌های کپی و دانلود
        window.rawMarkdown = markdownText;
        
        if (!markdownText) {
            previewContainer.innerHTML = `
                <div class="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 space-y-3 border-2 border-dashed border-gray-200 dark:border-darkBorder rounded-lg p-10">
                    <i class="fa-brands fa-markdown text-4xl"></i>
                    <p>Start typing to generate preview...</p>
                </div>
            `;
            return;
        }

        // جادوی اصلی: رندر مارک‌داون به HTML
        previewContainer.innerHTML = `<div class="markdown-body">\n${marked.parse(markdownText)}\n</div>`;
    }

    // هر بار که کاربر تایپ کند یا کلیک کند، پیش‌نمایش ساخته می‌شود
    formInputs.forEach(input => {
        input.addEventListener('input', updatePreview);
        input.addEventListener('change', updatePreview);
    });

    // یک‌بار اجرای تابع برای نمایش مقادیر پیش‌فرض (مثل تیک‌های مهارت‌ها)
    updatePreview();
});
