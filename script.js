document.addEventListener('DOMContentLoaded', () => {
    // گرفتن تمام فیلدهای فرم (اینپوت‌ها، تکست‌اریا و سلکت‌ها)
    const formInputs = document.querySelectorAll('#readme-form input, #readme-form textarea, #readme-form select');

    // این تابع در مرحله ۴ وظیفه ساخت مارک‌داون را برعهده می‌گیرد
    function generatePreview() {
        console.log("در حال ساخت پیش‌نمایش بر اساس دیتای جدید...");
        // فعلاً مقادیر را اینجا در کنسول چاپ می‌کنیم تا در مرحله بعد مارک‌داون را بسازیم
        const name = document.getElementById('name').value;
        const title = document.getElementById('title').value;
        console.log(`نام: ${name} | عنوان: ${title}`);
    }

    // اتصال رویداد «تغییر» به تک‌تک فیلدها
    // هر کلیدی که کاربر تایپ کند یا چکی که بزند، تابع generatePreview فوراً اجرا می‌شود
    formInputs.forEach(input => {
        input.addEventListener('input', generatePreview);
        input.addEventListener('change', generatePreview);
    });
});
