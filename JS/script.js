// Scroll Progress Bar
window.addEventListener('scroll', () => {
  const scrollProgress = document.getElementById('scrollProgress');
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / scrollHeight) * 100;
  scrollProgress.style.width = scrollPercent + '%';
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (window.scrollY > 100) {
    header.classList.add('header-scrolled');
  } else {
    header.classList.remove('header-scrolled');
  }
});

// Smooth scrolling for navigation links with header offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Don't prevent default for empty hashes or external links
    if (href === '#' || href.startsWith('http')) {
      return;
    }
    
    e.preventDefault();
    
    const targetElement = document.querySelector(href);
    if (!targetElement) return;
    
    // Calculate the header height for offset
    const headerHeight = document.querySelector('#header')?.offsetHeight || 0;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - (headerHeight + 20); // 20px extra space
    
    // Use smooth scrolling with offset
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    
    // Update URL without jumping
    if (history.pushState) {
      history.pushState(null, null, href);
    } else {
      location.hash = href;
    }
    
    // Close mobile menu if open
    const mobileMenu = document.querySelector('#nav');
    if (mobileMenu.classList.contains('active')) {
      toggleMobileMenu();
    }
  });
});

// Stats Counter Animation
const observerOptions = { threshold: 0.5 };
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.stat-number');
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
          } else {
            counter.textContent = Math.floor(current);
          }
        }, 16);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.stats').forEach(el => {
  statsObserver.observe(el);
});

// Enhanced Search Function
function performSearch() {
  const query = document.getElementById('searchQuery').value.trim();
  const duration = document.getElementById('duration').value;
  const difficulty = document.getElementById('difficulty').value;
  const activeFilters = Array.from(document.querySelectorAll('.filter-chip.active')).map(chip => chip.getAttribute('data-filter'));
  
  // Show loading state
  const searchForm = document.querySelector('.search form');
  searchForm.classList.add('loading');
  
  setTimeout(() => {
    searchForm.classList.remove('loading');
    let searchParams = [];
    if (query) searchParams.push(`destination: ${query}`);
    if (duration) searchParams.push(`duration: ${duration}`);
    if (difficulty) searchParams.push(`difficulty: ${difficulty}`);
    if (activeFilters.length) searchParams.push(`filters: ${activeFilters.join(', ')}`);
    
    const searchString = searchParams.length ? searchParams.join(' | ') : 'all available treks';
    alert(`🔍 Searching for: ${searchString}\n\nFound 12 matching treks! (This is a demo - in production, this would show real search results)`);
  }, 1000);
}

// Filter Toggle Function
function toggleFilter(chip) {
  chip.classList.toggle('active');
}

// Enhanced Trip Booking
function openTrip(tripName) {
  alert(`🏔️ Opening ${tripName} details...\n\n✅ Dates available\n✅ Small groups (max 12)\n✅ Expert local guides\n✅ All permits included\n\nWould you like to:\n• View detailed itinerary\n• Check availability\n• Book now\n\n(This is a demo)`);
}

// Enhanced Contact Form
function submitContactForm() {
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('contactEmail').value;
  const trek = document.getElementById('trekInterest').value;
  
  // Show loading state
  const form = document.querySelector('.contact-form form');
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    alert(`Thank you ${firstName}! 🙏\n\nWe've received your message and will respond within 24 hours.\n\nNext steps:\n• We'll send a detailed trek information packet\n• Schedule a consultation call\n• Create your custom itinerary\n\nNamaste! 🏔️`);
    
    // Reset form
    form.reset();
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }, 2000);
}

// NEW: Interactive Map Functions
function showMapTooltip(marker) {
  const tooltip = document.getElementById('mapTooltip');
  const region = marker.getAttribute('data-region');
  
  const regions = {
    everest: {
      name: "Everest Region",
      description: "Home to the world's highest peak. Treks: Everest Base Camp, Three Passes, Gokyo Lakes."
    },
    annapurna: {
      name: "Annapurna Region",
      description: "Diverse landscapes and cultures. Treks: Annapurna Circuit, ABC, Poon Hill."
    },
    langtang: {
      name: "Langtang Region",
      description: "Close to Kathmandu, stunning valleys. Treks: Langtang Valley, Gosainkunda."
    },
    manaslu: {
      name: "Manaslu Region",
      description: "Restricted area, cultural immersion. Trek: Manaslu Circuit."
    },
    mustang: {
      name: "Mustang Region",
      description: "Tibetan plateau, ancient kingdom. Trek: Upper Mustang."
    }
  };
  
  const regionData = regions[region];
  if (regionData) {
    tooltip.innerHTML = `
      <strong>${regionData.name}</strong>
      <p style="margin: 8px 0 0 0; font-size: 13px;">${regionData.description}</p>
    `;
    
    // Position tooltip near the marker
    const rect = marker.getBoundingClientRect();
    const mapRect = document.querySelector('.interactive-map').getBoundingClientRect();
    
    tooltip.style.left = (rect.left - mapRect.left + 12) + 'px';
    tooltip.style.top = (rect.top - mapRect.top - tooltip.offsetHeight - 10) + 'px';
    tooltip.classList.add('active');
  }
}

function hideMapTooltip() {
  const tooltip = document.getElementById('mapTooltip');
  tooltip.classList.remove('active');
}

// NEW: FAQ Toggle Function
function toggleFAQ(question) {
  const answer = question.nextElementSibling;
  const isActive = answer.classList.contains('active');
  
  // Close all FAQ answers
  document.querySelectorAll('.faq-answer').forEach(item => {
    item.classList.remove('active');
  });
  
  // Toggle icons
  document.querySelectorAll('.faq-question i').forEach(icon => {
    icon.className = 'fas fa-chevron-down';
  });
  
  // If this FAQ wasn't active, open it
  if (!isActive) {
    answer.classList.add('active');
    question.querySelector('i').className = 'fas fa-chevron-up';
  }
}

// NEW: Download Gear List
function downloadGearList() {
  alert('📋 Downloading Complete Gear Checklist...\n\nThis would download a PDF checklist in a real implementation.\n\nFor now, here are the key categories:\n• Footwear\n• Clothing (layers)\n• Equipment\n• Health & Safety\n• Personal Items');
}

// Additional Interactive Functions
function scheduleCall() {
  alert('📞 Schedule a Call\n\nOur trek experts are available:\n• Monday-Friday: 9 AM - 6 PM (Nepal Time)\n• Weekends: 10 AM - 4 PM (Nepal Time)\n\nWe\'ll call you back within 2 hours during business hours.\n\n(This would open a calendar booking system in production)');
}

function subscribe() {
  const email = document.getElementById('subscribeEmail').value;
  if (email) {
    document.getElementById('subscribeEmail').value = '';
    alert(`✅ Subscribed!\n\nThanks for joining our community. You'll receive:\n• Monthly trek stories\n• Exclusive deals\n• Nepal travel tips\n• Safety updates\n\nWelcome to the Juma Trek family! 🏔️`);
  }
}

function claimOffer() {
  alert('🎉 Early Bird Special!\n\nSave 15% on any 2025 trek + FREE gear package including:\n• Premium trekking poles\n• Juma Trek fleece jacket\n• Water purification tablets\n• Emergency whistle\n\nOffer valid until January 31, 2025\nUse code: EARLY2025\n\n(This would redirect to booking page)');
}

function readStory(storyId) {
  const stories = {
    'sherpa-guides': 'Our retired Sherpa guides bring decades of mountain experience...',
    'village-school': 'In 2022, our trekkers helped fund a new school in Gokyo village...',
    'reforestation': 'After the 2015 earthquake, we launched our reforestation initiative...'
  };
  alert(`📖 Story: ${storyId}\n\n${stories[storyId] || 'Story content would be displayed here...'}\n\n(This would open the full story page in production)`);
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
  const nav = document.getElementById('nav');
  nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
}

// Additional utility functions
function viewAllTrips() { alert('🏔️ Viewing all 45+ trek routes...'); }
function learnMore() { alert('👥 Learn more about our team...'); }
function viewCertifications() { alert('📜 Viewing certifications and licenses...'); }
function openMap() { alert('🗺️ Opening map directions...'); }
function viewTeam() { alert('👥 Meet our amazing team...'); }
function viewSafety() { alert('🛡️ Our comprehensive safety policy...'); }
function viewTerms() { alert('📋 Terms and conditions...'); }
function viewPrivacy() { alert('🔒 Privacy policy...'); }
function viewFAQ() { alert('❓ Frequently asked questions...'); }
function viewBookingGuide() { alert('📖 Complete booking guide...'); }
function viewPackingList() { alert('🎒 Essential packing lists...'); }
function viewTravelTips() { alert('💡 Expert travel tips for Nepal...'); }
function emergencyContact() { alert('🚨 Emergency contact: +977 985 123 4567 (24/7)'); }

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  // Add some initial animations
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);

  // Set current date in travel date input
  const today = new Date();
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1);
  const monthString = nextMonth.toISOString().substring(0, 7);
  const travelDateInput = document.getElementById('travelDate');
  if (travelDateInput) {
    travelDateInput.value = monthString;
  }
});

// Download Functions
function downloadGearList() {
    const gearContent = `
Juma Trek - Complete Gear Checklist
====================================

FOOTWEAR
--------
☐ Broken-in hiking boots
☐ Hiking socks (wool/synthetic) - 3-4 pairs
☐ Camp shoes/sandals
☐ Gaiters (for snow/mud)
☐ Sock liners (optional)

CLOTHING
--------
BASE LAYERS:
☐ Moisture-wicking t-shirts (2-3)
☐ Long sleeve base layers (2)
☐ Thermal underwear

MID LAYERS:
☐ Fleece jacket or pullover
☐ Down/synthetic insulated jacket
☐ Wool/fleece pants (for evenings)

OUTER LAYERS:
☐ Waterproof/windproof jacket (Gore-Tex recommended)
☐ Waterproof pants
☐ Quick-dry hiking pants (2 pairs)
☐ Hiking shorts (optional)

OTHER CLOTHING:
☐ Sun hat or baseball cap
☐ Warm beanie
☐ Buff or neck gaiter
☐ Gloves (liner + waterproof)
☐ Sunglasses with UV protection

EQUIPMENT
---------
☐ 40-60L backpack with rain cover
☐ Sleeping bag (-10°C comfort rating)
☐ Sleeping bag liner
☐ Trekking poles (collapsible)
☐ Headlamp with extra batteries
☐ Water bottles/hydration system (3L capacity)
☐ Water purification tablets/filter
☐ Personal first aid kit
☐ Multi-tool or knife

PERSONAL ITEMS
--------------
☐ Sunscreen (SPF 50+)
☐ Lip balm with SPF
☐ Personal medications
� Toiletries (biodegradable)
☐ Quick-dry towel
☐ Camera and extra batteries
☐ Power bank
☐ Book/notebook
☐ Ear plugs
☐ Hand sanitizer

DOCUMENTS
---------
☐ Passport and copies
☐ Travel insurance documents
☐ Visa and permits
☐ Emergency contact information
☐ Booking confirmation

Important Notes:
• Break in your boots before the trek
• Use packing cubes to organize your gear
• Keep important documents in waterproof bags
• Test all equipment before departure

Happy Trekking! 🏔️
Juma Trek Team
    `;

    downloadTextFile(gearContent, 'Juma-Trek-Gear-Checklist.txt');
}

function downloadTrainingGuide() {
    const trainingContent = `
Juma Trek - Training Preparation Guide
=======================================

PRE-TREK TRAINING (8-12 Weeks)
-------------------------------

WEEKLY SCHEDULE:
• Monday: Rest or light stretching
• Tuesday: Cardio (running/cycling) - 45 minutes
• Wednesday: Strength training
• Thursday: Cardio intervals - 30 minutes
• Friday: Strength training
• Saturday: Long hike with backpack
• Sunday: Active recovery (yoga/walking)

STRENGTH TRAINING EXERCISES:
Legs:
• Squats: 3 sets of 15 reps
• Lunges: 3 sets of 12 reps per leg
• Step-ups: 3 sets of 15 reps per leg
• Calf raises: 3 sets of 20 reps

Core:
• Plank: 3 sets of 60 seconds
• Russian twists: 3 sets of 20 reps
• Leg raises: 3 sets of 15 reps
• Bird-dog: 3 sets of 12 reps per side

Back:
• Bent-over rows: 3 sets of 12 reps
• Superman: 3 sets of 15 reps
• Lat pulldowns: 3 sets of 12 reps

CARDIO BUILD-UP:
Week 1-4: 30-45 minutes, 3 times per week
Week 5-8: 45-60 minutes, 4 times per week
Week 9-12: 60-90 minutes, 4-5 times per week

HIKING PRACTICE:
• Start with 2-3 hour hikes with 5kg backpack
• Progress to 4-6 hour hikes with 10-12kg backpack
• Include elevation gain in your practice hikes
• Practice using trekking poles

NUTRITION & HYDRATION:
• Stay hydrated throughout training
• Focus on complex carbohydrates
• Include lean proteins for muscle recovery
• Practice with energy snacks you'll use on trek

Remember: Consistency is key! Train smart and listen to your body.
    `;

    downloadTextFile(trainingContent, 'Juma-Trek-Training-Guide.txt');
}

function downloadPackingList() {
    const packingContent = `
Juma Trek - Smart Packing List
===============================

CARRY-ON LUGGAGE (if flying):
☐ Passport and documents
☐ Medications
☐ Change of clothes
☐ Valuables (camera, money)
☐ Book/entertainment

MAIN BACKPACK (40-60L):
------------------------

CLOTHING:
• 2-3 moisture-wicking t-shirts
• 1-2 long sleeve base layers
• 1 fleece jacket
• 1 insulated jacket
• 1 waterproof/windproof jacket
• 2 pairs quick-dry hiking pants
• 1 pair waterproof pants
• 3-4 pairs hiking socks
• 3-4 sets underwear
• 1 set thermal underwear
• 1 warm beanie
• 1 sun hat
• 1 pair gloves
• 1 buff/neck gaiter

FOOTWEAR:
• Hiking boots (worn)
• Camp shoes/sandals
• Gaiters (if required)

EQUIPMENT:
• Sleeping bag
• Sleeping bag liner
• Headlamp + batteries
• Water bottles (3L total)
• Water purification
• Trekking poles
• Sunglasses
• Sunscreen and lip balm
• Personal first aid kit
• Toiletries
• Quick-dry towel
• Camera + power bank

DAY PACK (25-35L):
------------------
DAILY ESSENTIALS:
☐ Water (2-3 liters)
☐ Lunch and snacks
☐ Waterproof jacket
☐ Insulating layer
☐ Headlamp
☐ First aid kit
☐ Sun protection
☐ Camera
☐ Extra batteries
☐ Personal medications

PACKING TIPS:
• Use packing cubes for organization
• Roll clothes to save space
• Keep frequently used items accessible
• Use waterproof bags for electronics
• Pack heavier items close to your back

Weight Target: Main backpack should be 12-15kg max
    `;

    downloadTextFile(packingContent, 'Juma-Trek-Packing-List.txt');
}

function downloadTextFile(content, filename) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

function downloadTripItinerary(tripName) {
    // This would typically be triggered from a trip card
    const itineraries = {
        'Everest Base Camp': `
Everest Base Camp Trek - Detailed Itinerary
============================================

Duration: 14 Days
Difficulty: Challenging
Max Elevation: 5,364m (17,598ft)

DAY 1: ARRIVAL IN KATHMANDU (1,400m)
• Airport pickup and transfer to hotel
• Trek briefing and equipment check
• Welcome dinner

DAY 2: FLIGHT TO LUKLA → TREK TO PHAKDING (2,651m)
• Scenic flight to Lukla (2,860m)
• Trek through Sherpa villages
• 3-4 hours walking

DAY 3: PHAKDING TO NAMCHE BAZAAR (3,440m)
• Cross suspension bridges
• First views of Everest
• 5-6 hours walking

DAY 4: ACCLIMATIZATION DAY IN NAMCHE
• Hike to Everest View Hotel
• Visit Sherpa Museum
• Acclimatization hike

DAY 5: NAMCHE TO TENGBOCHE (3,870m)
• Visit Tengboche Monastery
• Panoramic mountain views
• 5-6 hours walking

... [rest of itinerary] ...

INCLUDED:
• Expert local guide
• All accommodation
• All meals during trek
• Permits and fees
• Airport transfers
• Medical insurance
• Emergency oxygen

NOT INCLUDED:
• International flights
• Nepal visa
• Personal expenses
• Tips for staff
    `,
        'Annapurna Circuit': `
Annapurna Circuit Trek - Detailed Itinerary
===========================================

Duration: 12 Days
Difficulty: Moderate
Max Elevation: 5,416m (17,769ft)

DAY 1: DRIVE TO BHULBHULE → TREK TO NGADI (890m)
• Scenic drive from Kathmandu/Pokhara
• Start trek through sub-tropical forest
• 3-4 hours walking

DAY 2: NGADI TO JAGAT (1,300m)
• Follow Marsyangdi River
• Waterfall views
• 5-6 hours walking

... [rest of itinerary] ...
    `,
        'Langtang Valley': `
Langtang Valley Trek - Detailed Itinerary
=========================================

Duration: 8 Days
Difficulty: Moderate
Max Elevation: 4,984m (16,352ft)

DAY 1: DRIVE TO SYABRUBESI (1,550m)
• Scenic drive through hills
• Tibetan border views
• 7-8 hours driving

DAY 2: SYABRUBESI TO LAMA HOTEL (2,380m)
• Follow Langtang River
• Rhododendron forests
• 5-6 hours walking

... [rest of itinerary] ...
    `
    };

    const content = itineraries[tripName] || `Itinerary for ${tripName} will be available soon.`;
    downloadTextFile(content, `Juma-Trek-${tripName.replace(/\s+/g, '-')}-Itinerary.txt`);
}

// Update the existing downloadGearList function to use the new one
// Remove the old downloadGearList function and keep the new one above

// Testimonial Functions
function openTestimonialForm() {
    document.getElementById('testimonialModal').style.display = 'block';
    setupStarRating();
}

function closeTestimonialModal() {
    document.getElementById('testimonialModal').style.display = 'none';
    document.getElementById('testimonialForm').reset();
    resetStarRating();
}

function setupStarRating() {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            setStarRating(rating);
        });
        
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            highlightStars(rating);
        });
    });
    
    document.querySelector('.rating-stars').addEventListener('mouseleave', function() {
        const currentRating = parseInt(document.querySelector('input[name="rating"]').value);
        highlightStars(currentRating);
    });
}

function setStarRating(rating) {
    document.querySelector('input[name="rating"]').value = rating;
    highlightStars(rating);
}

function highlightStars(rating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
            star.textContent = '★';
        } else {
            star.classList.remove('active');
            star.textContent = '☆';
        }
    });
}

function resetStarRating() {
    document.querySelector('input[name="rating"]').value = 0;
    highlightStars(0);
}

function submitTestimonial(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const testimonial = {
        name: formData.get('name'),
        country: formData.get('country'),
        trek: formData.get('trek'),
        year: formData.get('year'),
        text: formData.get('testimonial'),
        rating: parseInt(formData.get('rating'))
    };
    
    // Show loading state
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // In a real application, you would send this to your server
        console.log('Testimonial submitted:', testimonial);
        
        // Show success message
        alert(`Thank you ${testimonial.name}! 🙏\n\nYour testimonial has been submitted for review. We'll contact you if we have any questions.\n\nNamaste! 🏔️`);
        
        // Close modal and reset form
        closeTestimonialModal();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}