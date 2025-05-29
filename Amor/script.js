// --- Contador de días juntos ---
// Fecha actual en Quibdó, Chocó, Colombia es 29 de mayo de 2025.
// ¡IMPORTANTE! Reemplaza 'YYYY-MM-DD' con la fecha exacta en que inició su relación
const startDate = new Date('2023-05-29T00:00:00'); // Ejemplo: 29 de mayo de 2023 a la medianoche

const daysTogetherElement = document.getElementById('days-together');

function updateDaysTogether() {
    const now = new Date();
    const diff = now.getTime() - startDate.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const remainingHours = hours % 24;
    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;

    daysTogetherElement.innerHTML =
        `${days} días, ${remainingHours} horas, ${remainingMinutes} minutos y ${remainingSeconds} segundos`;
}

// Iniciar el contador al cargar la página
setInterval(updateDaysTogether, 1000);
updateDaysTogether();

// --- Animación de flores/corazones cayendo ---
// URLs de iconos con colores que combinan con el rosa (de Flaticon)
// Puedes buscar más en flaticon.com y reemplazar estas URLs
const flowerImages = [
    'https://cdn-icons-png.flaticon.com/512/3233/3233669.png', // Flor rosa (parecido a una rosa)
    'https://cdn-icons-png.flaticon.com/512/3233/3233682.png', // Flor violeta/rosa
    'https://cdn-icons-png.flaticon.com/512/1077/1077035.png', // Corazón rosa sólido (el mismo del amor infinito)
    'https://cdn-icons-png.flaticon.com/512/4819/4819448.png', // Corazón degradado rosa/violeta
    'https://cdn-icons-png.flaticon.com/512/4208/4208398.png'  // Flor de cerezo rosa
];

const numFlowers = 15; // Cantidad de elementos cayendo
const minDuration = 10; // Duración mínima de la caída en segundos
const maxDuration = 20; // Duración máxima de la caída en segundos

function createFlower() {
    const flor = document.createElement('img');
    flor.classList.add('flor-animada');
    // Selecciona una imagen aleatoria de la lista
    const randomImage = flowerImages[Math.floor(Math.random() * flowerImages.length)];
    flor.src = randomImage;
    flor.alt = 'elemento animado'; // Cambiado a más genérico

    // Tamaños aleatorios
    const sizes = ['small', 'medium', 'large'];
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
    flor.classList.add(randomSize);

    // Posición inicial horizontal aleatoria
    const startX = Math.random() * window.innerWidth;
    flor.style.left = `${startX}px`;

    // Duración de la animación aleatoria
    const duration = Math.random() * (maxDuration - minDuration) + minDuration;
    flor.style.animationDuration = `${duration}s`;

    // Retraso de inicio de la animación aleatorio (para que no caigan todas a la vez)
    const delay = Math.random() * numFlowers;
    flor.style.animationDelay = `${delay}s`;

    // Pequeño desplazamiento horizontal durante la caída para un efecto más natural
    const translateX = (Math.random() - 0.5) * 200; // entre -100px y 100px
    flor.style.setProperty('--desplazamiento-x', `${translateX}px`); // Variable CSS

    document.body.appendChild(flor);

    // Eliminar el elemento una vez que termina su animación y crear uno nuevo
    flor.addEventListener('animationend', () => {
        flor.remove();
        // Espera un tiempo aleatorio antes de crear la siguiente flor para un flujo continuo
        setTimeout(createFlower, Math.random() * 2000); // Crea una nueva flor después de 0 a 2 segundos
    });
}

// Crea la cantidad inicial de flores/elementos al cargar la página
for (let i = 0; i < numFlowers; i++) {
    createFlower();
}

// --- Funcionalidad de la Galería de Fotos y Modal (Lightbox) ---
const mainGalleryImage = document.getElementById('main-gallery-image');
const thumbnails = document.querySelectorAll('.thumbnails-grid .thumbnail');

// Variables para el modal
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeButton = document.querySelector('.close-button');
const modalPrevButton = document.querySelector('.modal-nav-button.prev');
const modalNextButton = document.querySelector('.modal-nav-button.next');

let currentModalIndex = 0; // Índice de la imagen actual en el modal

// Función para actualizar la imagen principal (en la sección de galería)
function updateGalleryImage(selectedThumbnail) {
    console.log('updateGalleryImage llamada con:', selectedThumbnail);
    thumbnails.forEach(thumb => {
        thumb.classList.remove('active');
    });
    selectedThumbnail.classList.add('active');

    // Actualiza la fuente de la imagen principal de la galería
    mainGalleryImage.src = selectedThumbnail.dataset.fullSrc;
    console.log('Imagen principal de galería actualizada a:', mainGalleryImage.src);
}

// Función para abrir el modal (lightbox)
function openModal(index) {
    console.log('openModal llamada con índice:', index);
    // Asegura que el índice esté dentro de los límites
    if (index < 0 || index >= thumbnails.length) {
        console.error("Índice de miniatura fuera de rango en openModal:", index);
        return;
    }

    currentModalIndex = index;
    // Asigna la fuente de la imagen grande al modal
    modalImage.src = thumbnails[currentModalIndex].dataset.fullSrc;
    console.log('Modal imagen src establecida a:', modalImage.src);

    // Muestra el modal (aplicando la clase 'open')
    imageModal.classList.add('open');
    console.log('Clase "open" añadida al modal.');

    // Evita el scroll del body mientras el modal está abierto
    document.body.style.overflow = 'hidden';
}

// Función para cerrar el modal (lightbox)
function closeModal() {
    console.log('closeModal llamada.');
    // Oculta el modal (removiendo la clase 'open')
    imageModal.classList.remove('open');
    // Restaura el scroll del body
    document.body.style.overflow = 'auto';
}

// Función para navegar en el modal (lightbox) (adelante/atrás)
function navigateModal(direction) {
    console.log('navigateModal llamada. Dirección:', direction);
    currentModalIndex += direction; // Suma -1 o 1

    // Reinicia el índice si se pasa de los límites
    if (currentModalIndex < 0) {
        currentModalIndex = thumbnails.length - 1; // Si va antes de la primera, va a la última
    } else if (currentModalIndex >= thumbnails.length) {
        currentModalIndex = 0; // Si va después de la última, va a la primera
    }

    // Actualiza la imagen en el modal
    modalImage.src = thumbnails[currentModalIndex].dataset.fullSrc;
    console.log('Modal imagen navegada a:', modalImage.src);

    // Opcional: actualiza también la imagen principal de la galería de fondo
    updateGalleryImage(thumbnails[currentModalIndex]);
}


// --- Event Listeners ---

// Bucle para añadir un listener a cada miniatura
thumbnails.forEach((thumbnail, index) => {
    // Añadir listener para el clic en la miniatura
    thumbnail.addEventListener('click', () => {
        console.log('Miniatura clicada. Índice:', index);
        // 1. Actualiza la imagen principal de la galería (la que no es modal)
        updateGalleryImage(thumbnail);
        // 2. Abre el modal con la imagen grande correspondiente
        openModal(index);
    });

    // Opcional: Añadir listener para el hover (para la animación)
    // Aunque el CSS ya maneja el :hover, esto puede ser útil para depuración
    thumbnail.addEventListener('mouseenter', () => {
        console.log('Mouse entró en miniatura:', index);
    });
    thumbnail.addEventListener('mouseleave', () => {
        console.log('Mouse salió de miniatura:', index);
    });
});

// Listener para el botón de cerrar del modal
closeButton.addEventListener('click', closeModal);

// Listener para cerrar el modal haciendo clic en el fondo oscuro
imageModal.addEventListener('click', (event) => {
    // Asegura que el clic fue directamente en el fondo del modal, no en la imagen
    if (event.target === imageModal) {
        closeModal();
    }
});

// Listeners para los botones de navegación del modal
modalPrevButton.addEventListener('click', () => navigateModal(-1)); // Botón "Anterior"
modalNextButton.addEventListener('click', () => navigateModal(1));  // Botón "Siguiente"

// Soporte para teclado (flechas izquierda/derecha y Esc)
document.addEventListener('keydown', (event) => {
    // Solo si el modal está actualmente abierto
    if (imageModal.classList.contains('open')) {
        if (event.key === 'ArrowLeft') { // Flecha izquierda
            navigateModal(-1);
        } else if (event.key === 'ArrowRight') { // Flecha derecha
            navigateModal(1);
        } else if (event.key === 'Escape') { // Tecla Esc
            closeModal();
        }
    }
});

// Inicializar la galería con la primera imagen activa al cargar la página
// Esto asegura que la primera miniatura esté resaltada y su imagen se muestre en el visor principal.
// Se ejecuta después de que todos los elementos DOM estén disponibles.
document.addEventListener('DOMContentLoaded', () => {
    if (thumbnails.length > 0) {
        updateGalleryImage(thumbnails[0]);
    } else {
        console.warn("No se encontraron miniaturas en la galería. Asegúrate de que el HTML esté correcto.");
    }
});
