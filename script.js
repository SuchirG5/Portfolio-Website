document.addEventListener('DOMContentLoaded', () => {
    // Select the new in-header links
    const navLinks = document.querySelectorAll('.header-nav-links a'); 
    const sections = document.querySelectorAll('main section');
    const headerElement = document.querySelector('header');
    
    // --- THEME TOGGLE LOGIC START ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    // 1. Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Function to set the theme, apply class, and save preference
    const setTheme = (theme) => {
        if (theme === 'light') {
            body.classList.add('light-mode');
            themeToggleButton.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for switching to dark
            themeToggleButton.title = 'Switch to Dark Mode';
        } else {
            body.classList.remove('light-mode');
            themeToggleButton.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for switching to light
            themeToggleButton.title = 'Switch to Light Mode';
        }
        // Save the user's choice for future visits
        localStorage.setItem('theme', theme);
    };

    // Initialize theme on load (Default to light if no preference is saved)
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // If no theme is saved, explicitly set the default to Light Mode
        setTheme('light'); 
    }
    
    // Add event listener to the toggle button
    themeToggleButton.addEventListener('click', () => {
        // Determine the current theme based on the class presence
        const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
        // Switch to the opposite theme
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
    // --- THEME TOGGLE LOGIC END ---

    // Function to calculate the total height of the fixed header block
    const getFixedHeaderHeight = () => {
        return headerElement ? headerElement.offsetHeight : 0;
    };

    // Function to add active class to the current navigation link
    const updateActiveNav = () => {
        // Offset is the header height + a little extra space (padding)
        const offset = getFixedHeaderHeight() + 10; 
        let current = '';

        sections.forEach(section => {
            // Check if the top of the section has reached the scroll point, minus the offset
            const sectionTop = section.offsetTop - offset; 

            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        // Apply 'active' class to the corresponding navigation link
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            // Check if the link's href (e.g., '#summary') matches the current section's ID (e.g., 'summary')
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    };

    // Run the function on load and on scroll
    window.addEventListener('scroll', updateActiveNav);
    window.addEventListener('resize', updateActiveNav);
    updateActiveNav(); 
});
