document.addEventListener('DOMContentLoaded', () => {
    // Select the new in-header links
    const navLinks = document.querySelectorAll('.header-nav-links a'); 
    const sections = document.querySelectorAll('main section');
    const headerElement = document.querySelector('header');
    
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