document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Change icon based on state
            if (navLinks.classList.contains('active')) {
                menuToggle.innerHTML = '✕';
            } else {
                menuToggle.innerHTML = '☰';
            }
        });
    }

    // Smooth Scrolling for Hash Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Adjust for fixed header height
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.innerHTML = '☰';
                }
            }
        });
    });

    // Form Submissions
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const statusDiv = document.getElementById('booking-status');
            statusDiv.innerHTML = '<span style="color: var(--primary-color);">Submitting...</span>';

            const formData = new FormData(bookingForm);
            const data = Object.fromEntries(formData.entries());

            try {
                // IMPORTANT: Replace 'YOUR_BOOKING_FORM_ID' with your actual Formspree ID
                const response = await fetch('https://formspree.io/f/xqewllwq', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    statusDiv.innerHTML = '<span style="color: var(--accent-color);">Thank you! Your repair booking request has been received. We will contact you shortly to confirm.</span>';
                    bookingForm.reset();
                } else {
                    statusDiv.innerHTML = '<span style="color: var(--secondary-color);">Failed to submit booking. Please try again later.</span>';
                }
            } catch (error) {
                console.error('Error:', error);
                statusDiv.innerHTML = '<span style="color: var(--secondary-color);">Failed to connect to the server. Is it running?</span>';
            }
        });
    }

    const enquiryForm = document.getElementById('enquiry-form');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const statusDiv = document.getElementById('enquiry-status');
            statusDiv.innerHTML = '<span style="color: var(--primary-color);">Submitting...</span>';

            const formData = new FormData(enquiryForm);
            const data = Object.fromEntries(formData.entries());

            try {
                // IMPORTANT: Replace 'YOUR_ENQUIRY_FORM_ID' with your actual Formspree ID
                const response = await fetch('https://formspree.io/f/xlgallan', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    statusDiv.innerHTML = '<span style="color: var(--accent-color);">Thank you for your enquiry! A member of our team will get back to you soon.</span>';
                    enquiryForm.reset();
                } else {
                    statusDiv.innerHTML = '<span style="color: var(--secondary-color);">Failed to send message. Please try again later.</span>';
                }
            } catch (error) {
                console.error('Error:', error);
                statusDiv.innerHTML = '<span style="color: var(--secondary-color);">Failed to connect to the server. Is it running?</span>';
            }
        });
    }

});
