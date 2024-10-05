let images = []; // Store images
let currentImageIndex = 0; // Track the current image in the modal
let currentScale = 1; // Initial scale for zoom

document.addEventListener("DOMContentLoaded", function() {
    loadImages();  // Load images on page load
    setupModalNavigation(); // Set up modal navigation (left-right arrows)
    setupZoomFunctionality(); // Set up zoom functionality
});

// Function to load images dynamically from the server
function loadImages() {
    fetch('http://localhost:3000/api/images')
    .then(response => response.json())
    .then(data => {
        images = data; // Store the images globally
        displayImages(images);  // Display the images in the gallery
    })
    .catch(error => {
        console.error('Error loading images:', error);
        document.getElementById('gallery').innerHTML = '<p>Failed to load images.</p>';
    });
}

// Function to display images in the gallery
function displayImages(images) {
    const gallery = document.getElementById('gallery');
    const html = images.map((image, index) => `
        <div class="gallery-item" onclick="openModal(${index})">
            <img src="http://localhost:3000/images/${image}" alt="${image}">
            <p>${image.split('.')[0]}</p> <!-- Display filename as caption -->
        </div>
    `).join('');
    gallery.innerHTML = html;
}

// Modal functionality
function openModal(index) {
    currentImageIndex = index;
    currentScale = 1; // Reset zoom scale when opening a new image
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-image");
    const caption = document.getElementById("caption");
    const description = document.getElementById("description");

    modal.style.display = "flex";
    modalImg.src = `http://localhost:3000/images/${images[index]}`;
    caption.textContent = images[index].split('.')[0];
    description.textContent = "This is a description for " + images[index].split('.')[0];
    modalImg.style.transform = `scale(${currentScale})`; // Ensure zoom is reset
}

// Close modal when "X" is clicked
document.querySelector(".close").addEventListener('click', function() {
    document.getElementById("image-modal").style.display = "none";
});

// Setup navigation (left-right arrow keys and buttons)
function setupModalNavigation() {
    document.getElementById("prev-btn").addEventListener('click', showPreviousImage);
    document.getElementById("next-btn").addEventListener('click', showNextImage);
    document.addEventListener('keydown', function(e) {
        if (e.key === "ArrowLeft") showPreviousImage();
        if (e.key === "ArrowRight") showNextImage();
        if (e.key === "Escape") document.getElementById("image-modal").style.display = "none";
    });
}

// Show previous image
function showPreviousImage() {
    currentImageIndex = (currentImageIndex === 0) ? images.length - 1 : currentImageIndex - 1;
    openModal(currentImageIndex);
}

// Show next image
function showNextImage() {
    currentImageIndex = (currentImageIndex === images.length - 1) ? 0 : currentImageIndex + 1;
    openModal(currentImageIndex);
}

// Zoom functionality (Scroll to zoom)
function setupZoomFunctionality() {
    const modalImg = document.getElementById("modal-image");
    
    // Zoom in/out on mouse wheel
    modalImg.addEventListener("wheel", function(event) {
        event.preventDefault(); // Prevent page scrolling
        currentScale += event.deltaY * -0.01; // Increase/decrease scale
        currentScale = Math.min(Math.max(0.5, currentScale), 5); // Limit zoom scale
        modalImg.style.transform = `scale(${currentScale})`; // Apply zoom
    });
}
