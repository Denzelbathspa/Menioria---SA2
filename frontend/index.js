document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slider img');
    const slideCount = slides.length;
    let currentIndex = 0; // Start from the first slide
    const slideInterval = 5000; // 3000ms = 3 seconds

    // Function to show the current slide
    function showSlide(index) {
        const slideWidth = slides[0].offsetWidth;
        slider.scrollTo({
            left: slideWidth * index,
            behavior: 'smooth',
        });
    }

    // Function to move to the next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount; // Cycle through slides
        showSlide(currentIndex);
    }

    // Automatically change slides every interval
    setInterval(nextSlide, slideInterval);
});

function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
}

function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
}
