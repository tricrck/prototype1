// UAPTS Wireframe JavaScript
// Unified Analytics and Predictive Transport System

// Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on backdrop click
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
});

// Template Editor Functions
function selectTemplate(element, type) {
    document.querySelectorAll('.template-item').forEach(item => {
        item.classList.remove('active');
    });
    element.classList.add('active');

    // Update preview based on type
    const preview = document.querySelector('.sms-preview .preview-header');
    if (preview) {
        const icons = { sms: '📱', email: '📧', push: '🔔' };
        preview.textContent = `${icons[type]} ${type.charAt(0).toUpperCase() + type.slice(1)} Preview`;
    }
}

// Drag and Drop Simulation for Query Builder
function initDragAndDrop() {
    const blocks = document.querySelectorAll('.drag-block');
    const dropZones = document.querySelectorAll('.drop-zone');

    blocks.forEach(block => {
        block.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.dataset.type);
            e.target.classList.add('dragging');
        });

        block.addEventListener('dragend', (e) => {
            e.target.classList.remove('dragging');
        });
    });

    dropZones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('drag-over');
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('drag-over');
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('drag-over');
            const type = e.dataTransfer.getData('text/plain');
            const block = document.querySelector(`[data-type="${type}"]`);
            if (block) {
                const clone = block.cloneNode(true);
                clone.classList.add('placed');
                zone.appendChild(clone);
            }
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initDragAndDrop();

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Chart Animation Simulation
function animateCharts() {
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach((bar, index) => {
        const height = bar.style.height;
        bar.style.height = '0';
        setTimeout(() => {
            bar.style.height = height;
        }, index * 100);
    });
}

// Simulate real-time data updates
function simulateDataUpdate(elementId, min, max) {
    const element = document.getElementById(elementId);
    if (element) {
        const value = Math.floor(Math.random() * (max - min + 1)) + min;
        element.textContent = value.toLocaleString();
    }
}

// Gauge animation
function updateGauge(gaugeId, percentage) {
    const gauge = document.getElementById(gaugeId);
    if (gauge) {
        gauge.style.setProperty('--percentage', percentage + '%');
    }
}

// Export functions for use in pages
window.UAPTS = {
    openModal,
    closeModal,
    selectTemplate,
    simulateDataUpdate,
    updateGauge
};
