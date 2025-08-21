document.addEventListener('DOMContentLoaded', function() {
    // Get all category links and news cards
    const categoryLinks = document.querySelectorAll('.categories-list a[data-category]');
    const newsCards = document.querySelectorAll('.news-card');
    
    // Add click event listeners to category links
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            categoryLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            const selectedCategory = this.getAttribute('data-category');
            
            // Show/hide news cards based on selected category
            newsCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Update URL hash for deep linking
            window.location.hash = selectedCategory !== 'all' ? `category=${selectedCategory}` : '';
        });
    });
    
    // Check URL for category filter on page load
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const categoryFromUrl = urlParams.get('category');
    
    if (categoryFromUrl) {
        // Find and click the corresponding category link
        const matchingLink = Array.from(categoryLinks).find(
            link => link.getAttribute('data-category') === categoryFromUrl
        );
        if (matchingLink) matchingLink.click();
    }
});
