// This function applies the theme based on local storage
function applyTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark-mode');
    } else {
        document.documentElement.classList.remove('dark-mode');
    }
}

// 1. Apply theme immediately so there is no flicker
applyTheme();

// 2. Event Delegation: Works on every page, regardless of when the button loads
document.addEventListener('click', function(event) {
    if (event.target && event.target.closest('#theme-toggle')) {
        document.documentElement.classList.toggle('dark-mode');
        
        // Save the new state to localStorage
        const isDark = document.documentElement.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
});