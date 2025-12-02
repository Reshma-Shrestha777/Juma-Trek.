// Booking System JavaScript
let currentStep = 1;
let selectedTrek = null;
let selectedDate = null;
let participantCount = 1;
let bookingData = {
    trek: null,
    dates: null,
    participants: [],
    contact: {},
    payment: {}
};

// Initialize booking system
document.addEventListener('DOMContentLoaded', function() {
    initializeBooking();
    setupEventListeners();
    loadTrekFromURL();
    generateCalendar();
});

function initializeBooking() {
    updateProgressSteps();
    showStep(currentStep);
    updateSidebar();
}

function setupEventListeners() {
    // Trek selection
    document.querySelectorAll('.select-trek-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const trekOption = this.closest('.trek-option');
            selectTrek(trekOption);
        });
    });

    // Date navigation
    document.querySelector('.prev-month').addEventListener('click', previousMonth);
    document.querySelector('.next-month').addEventListener('click', nextMonth);

    // Participant counter
    document.querySelectorAll('.counter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            updateParticipantCount(action);
        });
    });

    // Payment methods
    document.querySelectorAll('.payment-method').forEach(method => {
        method.addEventListener('click', function() {
            selectPaymentMethod(this.getAttribute('data-method'));
        });
    });
}

function loadTrekFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const trekParam = urlParams.get('trek');
    
    if (trekParam) {
        const trekOption = document.querySelector(`[data-trek="${trekParam}"]`);
        if (trekOption) {
            selectTrek(trekOption);
        }
    }
}

function selectTrek(trekElement) {
    // Remove selected class from all options
    document.querySelectorAll('.trek-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    trekElement.classList.add('selected');
    
    // Store trek data
    selectedTrek = {
        id: trekElement.getAttribute('data-trek'),
        name: trekElement.querySelector('h3').textContent,
        duration: trekElement.querySelector('.trek-meta span:first-child').textContent.replace('⏰ ', ''),
        difficulty: trekElement.querySelector('.trek-meta span:nth-child(2)').textContent.replace('⚡ ', ''),
        price: parseInt(trekElement.querySelector('.trek-price').textContent.replace('$', '').replace(',', '')),
        image: trekElement.querySelector('img').src
    };
    
    bookingData.trek = selectedTrek;
    
    // Auto-advance to next step after 1 second
    setTimeout(() => {
        nextStep();
    }, 1000);
}

function updateParticipantCount(action) {
    const counter = document.querySelector('.counter-value');
    let count = parseInt(counter.textContent);
    
    if (action === 'increase' && count < 12) {
        count++;
    } else if (action === 'decrease' && count > 1) {
        count--;
    }
    
    counter.textContent = count;
    participantCount = count;
    updateParticipantForms();
    updateSidebar();
}

function updateParticipantForms() {
    const container = document.getElementById('participant-forms');
    const currentForms = container.querySelectorAll('.participant-form').length;
    
    if (participantCount > currentForms) {
        // Add new forms
        for (let i = currentForms + 1; i <= participantCount; i++) {
            const form = createParticipantForm(i);
            container.appendChild(form);
        }
    } else if (participantCount < currentForms) {
        // Remove extra forms
        const forms = container.querySelectorAll('.participant-form');
        for (let i = forms.length - 1; i >= participantCount; i--) {
            forms[i].remove();
        }
    }
    
    updateSidebar();
}

function createParticipantForm(index) {
    const form = document.createElement('div');
    form.className = 'participant-form';
    form.innerHTML = `
        <h5>Participant ${index} ${index === 1 ? '(Primary)' : ''}</h5>
        <div class="form-row">
            <div class="form-group">
                <label>Full Name *</label>
                <input type="text" name="participant_name[]" required>
            </div>
            <div class="form-group">
                <label>Email *</label>
                <input type="email" name="participant_email[]" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Phone</label>
                <input type="tel" name="participant_phone[]">
            </div>
            <div class="form-group">
                <label>Date of Birth</label>
                <input type="date" name="participant_dob[]">
            </div>
        </div>
    `;
    return form;
}

// Calendar functionality
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function generateCalendar() {
    const calendar = document.getElementById('calendar');
    const monthYear = document.getElementById('current-month');
    
    // Update month year display
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    monthYear.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    
    // Clear calendar
    calendar.innerHTML = '';
    
    // Add day headers
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-header';
        dayElement.textContent = day;
        calendar.appendChild(dayElement);
    });
    
    // Get first day of month and days in month
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Add empty days for previous month
    for (let i = 0; i < firstDay; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day other-month';
        dayElement.textContent = '';
        calendar.appendChild(dayElement);
    }
    
    // Add days of current month
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day available';
        dayElement.textContent = day;
        dayElement.setAttribute('data-date', `${currentYear}-${currentMonth + 1}-${day}`);
        
        // Check if date is in the past
        const date = new Date(currentYear, currentMonth, day);
        if (date < today) {
            dayElement.classList.remove('available');
            dayElement.classList.add('unavailable');
        }
        
        // Add click event
        dayElement.addEventListener('click', function() {
            if (this.classList.contains('available')) {
                selectDate(this);
            }
        });
        
        calendar.appendChild(dayElement);
    }
}

function previousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar();
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar();
}

function selectDate(dateElement) {
    // Remove selected class from all dates
    document.querySelectorAll('.calendar-day').forEach(day => {
        day.classList.remove('selected');
    });
    
    // Add selected class to clicked date
    dateElement.classList.add('selected');
    
    selectedDate = dateElement.getAttribute('data-date');
    bookingData.dates = {
        start: selectedDate,
        // Calculate end date based on trek duration
        end: calculateEndDate(selectedDate, selectedTrek ? parseInt(selectedTrek.duration) : 14)
    };
    
    updateSidebar();
}

function calculateEndDate(startDate, duration) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + duration);
    return date.toISOString().split('T')[0];
}

function selectPaymentMethod(method) {
    // Remove active class from all methods
    document.querySelectorAll('.payment-method').forEach(m => {
        m.classList.remove('active');
    });
    
    // Add active class to selected method
    document.querySelector(`[data-method="${method}"]`).classList.add('active');
    
    // Show corresponding payment form
    document.querySelectorAll('.payment-form').forEach(form => {
        form.classList.add('hidden');
    });
    document.getElementById(`${method}-payment`).classList.remove('hidden');
    
    bookingData.payment.method = method;
}

// Step navigation
function nextStep() {
    if (validateStep(currentStep)) {
        currentStep++;
        showStep(currentStep);
        updateProgressSteps();
        updateSidebar();
        
        // Scroll to top of form
        document.querySelector('.booking-form-container').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

function previousStep() {
    currentStep--;
    showStep(currentStep);
    updateProgressSteps();
    updateSidebar();
}

function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.booking-step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show current step
    document.getElementById(`step-${step}`).classList.add('active');
}

function updateProgressSteps() {
    document.querySelectorAll('.step').forEach(step => {
        const stepNumber = parseInt(step.getAttribute('data-step'));
        if (stepNumber <= currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

function validateStep(step) {
    switch(step) {
        case 1:
            if (!selectedTrek) {
                alert('Please select a trek to continue.');
                return false;
            }
            return true;
            
        case 2:
            if (!selectedDate) {
                alert('Please select a start date for your trek.');
                return false;
            }
            // Validate participant forms
            const participantForms = document.querySelectorAll('.participant-form');
            for (let form of participantForms) {
                const name = form.querySelector('input[name="participant_name[]"]').value;
                const email = form.querySelector('input[name="participant_email[]"]').value;
                if (!name || !email) {
                    alert('Please fill in all required participant details.');
                    return false;
                }
            }
            return true;
            
        case 3:
            // Validate contact form
            const requiredFields = document.querySelectorAll('#step-3 input[required]');
            for (let field of requiredFields) {
                if (!field.value) {
                    alert('Please fill in all required contact information.');
                    field.focus();
                    return false;
                }
            }
            return true;
            
        default:
            return true;
    }
}

function updateSidebar() {
    // Update trek info
    const trekElement = document.getElementById('sidebar-trek');
    if (selectedTrek) {
        trekElement.innerHTML = `
            <div class="sidebar-label">Trek</div>
            <div class="sidebar-value">${selectedTrek.name}</div>
        `;
    }
    
    // Update dates
    const datesElement = document.getElementById('sidebar-dates');
    if (selectedDate) {
        const date = new Date(selectedDate);
        datesElement.innerHTML = `
            <div class="sidebar-label">Dates</div>
            <div class="sidebar-value">${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
        `;
    }
    
    // Update participants
    const participantsElement = document.getElementById('sidebar-participants');
    participantsElement.innerHTML = `
        <div class="sidebar-label">Participants</div>
        <div class="sidebar-value">${participantCount} person${participantCount > 1 ? 's' : ''}</div>
    `;
    
    // Update cost
    const costElement = document.getElementById('sidebar-cost');
    if (selectedTrek) {
        const totalCost = selectedTrek.price * participantCount;
        costElement.innerHTML = `
            <div class="sidebar-label">Total Cost</div>
            <div class="sidebar-value">$${totalCost.toLocaleString()}</div>
        `;
    }
    
    // Update summary in step 4
    updateBookingSummary();
}

function updateBookingSummary() {
    if (selectedTrek && selectedDate) {
        const totalCost = selectedTrek.price * participantCount;
        
        // Trek summary
        document.getElementById('summary-trek').innerHTML = `
            <div>
                <strong>${selectedTrek.name}</strong><br>
                <span class="muted">${selectedTrek.duration} • ${selectedTrek.difficulty}</span>
            </div>
            <div>$${selectedTrek.price.toLocaleString()}</div>
        `;
        
        // Dates summary
        const startDate = new Date(selectedDate);
        const endDate = new Date(bookingData.dates.end);
        document.getElementById('summary-dates').innerHTML = `
            <div>
                <strong>${startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</strong><br>
                <span class="muted">to ${endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div>${selectedTrek.duration}</div>
        `;
        
        // Participants summary
        document.getElementById('summary-participants').innerHTML = `
            <div>
                <strong>${participantCount} Participant${participantCount > 1 ? 's' : ''}</strong>
            </div>
            <div>$${(selectedTrek.price * participantCount).toLocaleString()}</div>
        `;
        
        // Cost summary
        document.getElementById('summary-cost').innerHTML = `
            <div>
                <strong>Trek Cost</strong><br>
                <strong>Total</strong>
            </div>
            <div>
                $${(selectedTrek.price * participantCount).toLocaleString()}<br>
                <strong>$${totalCost.toLocaleString()}</strong>
            </div>
        `;
    }
}

function submitBooking() {
    if (!validateStep(4)) {
        alert('Please complete all required fields before submitting.');
        return;
    }
    
    // Collect all form data
    collectFormData();
    
    // Show loading state
    const submitBtn = document.querySelector('#step-4 .btn-primary');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showConfirmationModal();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function collectFormData() {
    // Collect participant data
    bookingData.participants = [];
    document.querySelectorAll('.participant-form').forEach((form, index) => {
        bookingData.participants.push({
            name: form.querySelector('input[name="participant_name[]"]').value,
            email: form.querySelector('input[name="participant_email[]"]').value,
            phone: form.querySelector('input[name="participant_phone[]"]').value,
            dob: form.querySelector('input[name="participant_dob[]"]').value
        });
    });
    
    // Collect contact data
    bookingData.contact = {
        firstName: document.querySelector('input[name="first_name"]').value,
        lastName: document.querySelector('input[name="last_name"]').value,
        email: document.querySelector('input[name="email"]').value,
        phone: document.querySelector('input[name="phone"]').value,
        address: document.querySelector('input[name="address"]').value,
        city: document.querySelector('input[name="city"]').value,
        country: document.querySelector('input[name="country"]').value,
        postalCode: document.querySelector('input[name="postal_code"]').value,
        emergencyContact: {
            name: document.querySelector('input[name="emergency_name"]').value,
            relationship: document.querySelector('input[name="emergency_relationship"]').value,
            phone: document.querySelector('input[name="emergency_phone"]').value,
            email: document.querySelector('input[name="emergency_email"]').value
        },
        experience: document.querySelector('select[name="experience_level"]').value,
        medicalConditions: document.querySelector('textarea[name="medical_conditions"]').value,
        dietaryRequirements: document.querySelector('textarea[name="dietary_requirements"]').value
    };
    
    // Collect payment data
    if (bookingData.payment.method === 'card') {
        bookingData.payment.details = {
            cardNumber: document.querySelector('#card-payment input[placeholder*="Card Number"]').value,
            nameOnCard: document.querySelector('#card-payment input[placeholder*="Name on Card"]').value,
            expiry: document.querySelector('#card-payment input[placeholder*="Expiry Date"]').value,
            cvv: document.querySelector('#card-payment input[placeholder*="CVV"]').value
        };
    }
    
    // Generate booking reference
    bookingData.bookingReference = `JT-${currentYear}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    bookingData.bookingDate = new Date().toISOString();
}

function showConfirmationModal() {
    // Update modal content
    document.getElementById('booking-ref').textContent = bookingData.bookingReference;
    document.getElementById('confirmation-trek').textContent = selectedTrek.name;
    document.getElementById('confirmation-date').textContent = new Date(selectedDate).toLocaleDateString('en-US', { 
        month: 'long', day: 'numeric', year: 'numeric' 
    });
    document.getElementById('confirmation-participants').textContent = `${participantCount} person${participantCount > 1 ? 's' : ''}`;
    
    // Show modal
    document.getElementById('confirmationModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('confirmationModal').style.display = 'none';
}

function goHome() {
    window.location.href = 'index.php';
}

// Utility functions from main script (replicated for booking page)
function toggleMobileMenu() {
    const nav = document.getElementById('nav');
    const ul = nav.querySelector('ul');
    ul.style.display = ul.style.display === 'flex' ? 'none' : 'flex';
}

function viewTerms() {
    alert('Terms & Conditions would be displayed here.');
    return false;
}

function viewPrivacy() {
    alert('Privacy Policy would be displayed here.');
    return false;
}

function viewFAQ() {
    alert('Booking FAQ would be displayed here.');
    return false;
}

function emergencyContact() {
    alert('Emergency Contact: +977 985 123 4567 (24/7)');
    return false;
}

function openChat() {
    alert('Live chat would open here. In a real implementation, this would connect to a chat service.');
}