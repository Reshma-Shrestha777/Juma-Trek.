// All Treks Page Functionality
let allTreks = [];
let filteredTreks = [];
let comparedTreks = [];

// Trek data
const trekData = [
    {
        id: 'everest-base-camp',
        name: 'Everest Base Camp Trek',
        duration: 14,
        difficulty: 'challenging',
        region: 'everest',
        season: ['spring', 'autumn'],
        price: 1799,
        rating: 4.8,
        reviews: 203,
        badge: 'Best Seller',
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=400&auto=format&fit=crop',
        description: 'The ultimate Himalayan adventure to the base of the world\'s highest peak, through Sherpa villages and ancient monasteries.'
    },
    {
        id: 'annapurna-circuit',
        name: 'Annapurna Circuit',
        duration: 12,
        difficulty: 'moderate',
        region: 'annapurna',
        season: ['spring', 'autumn'],
        price: 1199,
        rating: 4.9,
        reviews: 156,
        badge: 'Most Popular',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=400&auto=format&fit=crop',
        description: 'Classic tea-house trek through diverse landscapes, from subtropical forests to high mountain passes.'
    },
    {
        id: 'langtang-valley',
        name: 'Langtang Valley Trek',
        duration: 8,
        difficulty: 'moderate',
        region: 'langtang',
        season: ['spring', 'autumn', 'winter'],
        price: 899,
        rating: 4.7,
        reviews: 89,
        badge: 'Hidden Gem',
        image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=400&auto=format&fit=crop',
        description: 'Pristine valley with stunning mountain views and rich Tamang culture, close to Kathmandu.'
    },
    {
        id: 'manaslu-circuit',
        name: 'Manaslu Circuit Trek',
        duration: 16,
        difficulty: 'challenging',
        region: 'manaslu',
        season: ['spring', 'autumn'],
        price: 1599,
        rating: 4.8,
        reviews: 67,
        badge: 'Restricted Area',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=400&auto=format&fit=crop',
        description: 'Remote and culturally rich trek around the eighth highest mountain in the world.'
    },
    {
        id: 'upper-mustang',
        name: 'Upper Mustang Trek',
        duration: 14,
        difficulty: 'moderate',
        region: 'mustang',
        season: ['spring', 'autumn', 'monsoon'],
        price: 1899,
        rating: 4.6,
        reviews: 45,
        badge: 'Forbidden Kingdom',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=400&auto=format&fit=crop',
        description: 'Journey to the ancient Buddhist kingdom with Tibetan culture and desert-like landscapes.'
    },
    {
        id: 'ghorepani-poonhill',
        name: 'Ghorepani Poon Hill',
        duration: 5,
        difficulty: 'easy',
        region: 'annapurna',
        season: ['spring', 'autumn', 'winter'],
        price: 599,
        rating: 4.5,
        reviews: 178,
        badge: 'Sunrise Views',
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=400&auto=format&fit=crop',
        description: 'Short and sweet trek with spectacular sunrise views over the Annapurna and Dhaulagiri ranges.'
    },
    {
        id: 'three-passes',
        name: 'Everest Three Passes',
        duration: 19,
        difficulty: 'expert',
        region: 'everest',
        season: ['spring', 'autumn'],
        price: 2299,
        rating: 4.9,
        reviews: 34,
        badge: 'Ultimate Challenge',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=400&auto=format&fit=crop',
        description: 'The ultimate Everest adventure crossing three high passes over 5,000m for experienced trekkers.'
    },
    {
        id: 'kanchenjunga-base-camp',
        name: 'Kanchenjunga Base Camp',
        duration: 22,
        difficulty: 'expert',
        region: 'kanchenjunga',
        season: ['spring', 'autumn'],
        price: 2599,
        rating: 4.7,
        reviews: 23,
        badge: 'Wilderness Trek',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=400&auto=format&fit=crop',
        description: 'Remote trek to the base of the world\'s third highest mountain in pristine wilderness.'
    },
    // Add more treks as needed...
];

document.addEventListener('DOMContentLoaded', function() {
    initializeTreksPage();
});

function initializeTreksPage() {
    allTreks = [...trekData];
    filteredTreks = [...trekData];
    renderTreks();
    setupFilterListeners();
}

function setupFilterListeners() {
    // Auto-apply filters when selections change
    document.querySelectorAll('.filter-select').forEach(select => {
        select.addEventListener('change', applyFilters);
    });
}

function applyFilters() {
    const difficulty = document.getElementById('difficulty-filter').value;
    const duration = document.getElementById('duration-filter').value;
    const region = document.getElementById('region-filter').value;
    const season = document.getElementById('season-filter').value;

    filteredTreks = allTreks.filter(trek => {
        // Difficulty filter
        if (difficulty !== 'all' && trek.difficulty !== difficulty) {
            return false;
        }

        // Duration filter
        if (duration !== 'all') {
            const [min, max] = duration.split('-').map(Number);
            if (max && (trek.duration < min || trek.duration > max)) {
                return false;
            }
            if (duration === '15+' && trek.duration < 15) {
                return false;
            }
        }

        // Region filter
        if (region !== 'all' && trek.region !== region) {
            return false;
        }

        // Season filter
        if (season !== 'all' && !trek.season.includes(season)) {
            return false;
        }

        return true;
    });

    renderTreks();
}

function resetFilters() {
    document.getElementById('difficulty-filter').value = 'all';
    document.getElementById('duration-filter').value = 'all';
    document.getElementById('region-filter').value = 'all';
    document.getElementById('season-filter').value = 'all';
    
    applyFilters();
}

function renderTreks() {
    const grid = document.getElementById('treks-grid');
    const resultsCount = document.getElementById('results-count');
    
    resultsCount.textContent = `Showing ${filteredTreks.length} of ${allTreks.length} treks`;
    
    if (filteredTreks.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="fas fa-mountain"></i>
                <h3>No treks found</h3>
                <p>Try adjusting your filters to see more results.</p>
                <button class="btn" onclick="resetFilters()">Reset Filters</button>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = filteredTreks.map(trek => `
        <div class="trek-card" data-trek-id="${trek.id}">
            ${trek.badge ? `<div class="trek-card-badge">${trek.badge}</div>` : ''}
            <input type="checkbox" class="compare-checkbox" onchange="toggleCompare('${trek.id}', this.checked)" 
                   ${comparedTreks.includes(trek.id) ? 'checked' : ''}>
            <div class="trek-card-image">
                <img src="${trek.image}" alt="${trek.name}">
            </div>
            <div class="trek-card-content">
                <h3 class="trek-card-title">${trek.name}</h3>
                <div class="trek-card-meta">
                    <span><i class="fas fa-calendar-alt"></i> ${trek.duration} days</span>
                    <span><i class="fas fa-signal"></i> ${capitalizeFirst(trek.difficulty)}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${capitalizeFirst(trek.region)}</span>
                </div>
                <p class="trek-card-description">${trek.description}</p>
                <div class="trek-card-rating">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    ${trek.rating} (${trek.reviews} reviews)
                </div>
                <div class="trek-card-footer">
                    <div class="trek-card-price">$${trek.price}</div>
                    <div>
                        <button class="btn btn-secondary" onclick="downloadTripItinerary('${trek.name}')">
                            <i class="fas fa-download"></i>
                        </button>
                        <button class="btn" onclick="window.location.href='booking.html?trek=${trek.id}'">
                            <i class="fas fa-arrow-right"></i> Book Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function toggleCompare(trekId, isChecked) {
    if (isChecked) {
        if (comparedTreks.length < 3) {
            comparedTreks.push(trekId);
        } else {
            alert('You can compare up to 3 treks at a time.');
            document.querySelector(`[data-trek-id="${trekId}"] .compare-checkbox`).checked = false;
            return;
        }
    } else {
        comparedTreks = comparedTreks.filter(id => id !== trekId);
    }
    
    updateCompareBar();
}

function updateCompareBar() {
    const compareBar = document.getElementById('compare-bar');
    const compareButton = document.getElementById('compare-button');
    const compareList = document.getElementById('compare-treks-list');
    
    compareButton.textContent = `Compare (${comparedTreks.length})`;
    
    if (comparedTreks.length > 0) {
        compareBar.classList.add('active');
        compareList.innerHTML = comparedTreks.map(trekId => {
            const trek = allTreks.find(t => t.id === trekId);
            return `
                <div class="compare-trek">
                    <span>${trek.name}</span>
                    <button class="remove-compare" onclick="toggleCompare('${trekId}', false)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
        }).join('');
    } else {
        compareBar.classList.remove('active');
    }
}

function clearComparison() {
    comparedTreks = [];
    document.querySelectorAll('.compare-checkbox').forEach(checkbox => {
        checkbox.checked = false;
    });
    updateCompareBar();
}

function compareTreks() {
    if (comparedTreks.length < 2) {
        alert('Please select at least 2 treks to compare.');
        return;
    }
    
    const comparedTreksData = comparedTreks.map(id => allTreks.find(t => t.id === id));
    
    // Create comparison table
    const comparisonContent = `
Juma Trek - Trek Comparison
===========================

${comparedTreksData.map((trek, index) => `
TREK ${index + 1}: ${trek.name}
• Duration: ${trek.duration} days
• Difficulty: ${capitalizeFirst(trek.difficulty)}
• Price: $${trek.price}
• Region: ${capitalizeFirst(trek.region)}
• Best Season: ${trek.season.map(s => capitalizeFirst(s)).join(', ')}
• Rating: ${trek.rating}/5 (${trek.reviews} reviews)
• Description: ${trek.description}

`).join('')}

Comparison Summary:
------------------
${comparedTreksData.map(trek => 
    `• ${trek.name}: ${trek.duration} days, $${trek.price}, ${capitalizeFirst(trek.difficulty)} difficulty`
).join('\n')}

Recommendation:
${getComparisonRecommendation(comparedTreksData)}

Choose the trek that best matches your fitness level, time availability, and budget!
    `;
    
    downloadTextFile(comparisonContent, 'Juma-Trek-Comparison.txt');
}

function getComparisonRecommendation(treks) {
    if (treks.length === 0) return '';
    
    const easiest = treks.reduce((a, b) => a.difficulty === 'easy' ? a : b);
    const shortest = treks.reduce((a, b) => a.duration < b.duration ? a : b);
    const cheapest = treks.reduce((a, b) => a.price < b.price ? a : b);
    
    return `
For first-time trekkers: ${easiest.name}
For limited time: ${shortest.name} 
For budget travelers: ${cheapest.name}
    `;
}

// Utility function for downloading text files
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