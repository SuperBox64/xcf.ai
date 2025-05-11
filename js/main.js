document.addEventListener('DOMContentLoaded', function() {
    // Fade in effect for sections
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Ensure code blocks have no borders
    document.querySelectorAll('.code-block, .code-block *, .code-block pre, .code-block code').forEach(el => {
        el.style.border = 'none';
        el.style.outline = 'none';
        el.style.boxShadow = 'none';
    });
    
    // Copy button functionality
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.nextElementSibling.querySelector('code');
            const textToCopy = codeBlock.textContent;
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Change button text to show success
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                
                // Reset button text after 2 seconds
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
                this.textContent = 'Error!';
                
                setTimeout(() => {
                    this.textContent = 'Copy';
                }, 2000);
            });
        });
    });
}); 