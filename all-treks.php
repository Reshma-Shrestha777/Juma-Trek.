<?php
?>

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>All Treks - Juma Trek | 45+ Himalayan Adventures</title>
  <meta name="description" content="Discover all 45+ trekking routes in Nepal with Juma Trek. From easy walks to expert expeditions, find your perfect Himalayan adventure." />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
  <link rel="stylesheet" href="CSS/style.css">
  <style>
    .treks-filter {
      background: white;
      padding: 30px;
      border-radius: 16px;
      box-shadow: 0 10px 40px var(--shadow);
      margin-bottom: 40px;
      border: 1px solid var(--border);
    }
    
    .filter-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }
    
    .filter-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: var(--text-dark);
    }
    
    .filter-actions {
      display: flex;
      gap: 12px;
      justify-content: space-between;
      align-items: center;
    }
    
    .results-count {
      color: var(--muted);
      font-size: 14px;
    }
    
    .treks-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 30px;
      margin: 40px 0;
    }
    
    .trek-card {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 40px var(--shadow);
      border: 1px solid var(--border);
      transition: all 0.3s ease;
      position: relative;
    }
    
    .trek-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 60px var(--shadow-hover);
    }
    
    .trek-card-badge {
      position: absolute;
      top: 16px;
      left: 16px;
      background: var(--accent);
      color: white;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 700;
      z-index: 2;
    }
    
    .trek-card-image {
      height: 200px;
      overflow: hidden;
      position: relative;
    }
    
    .trek-card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .trek-card:hover .trek-card-image img {
      transform: scale(1.1);
    }
    
    .trek-card-content {
      padding: 24px;
    }
    
    .trek-card-title {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 8px;
      color: var(--text-dark);
    }
    
    .trek-card-meta {
      display: flex;
      gap: 16px;
      margin-bottom: 12px;
      flex-wrap: wrap;
    }
    
    .trek-card-meta span {
      display: flex;
      align-items: center;
      gap: 4px;
      color: var(--muted);
      font-size: 14px;
    }
    
    .trek-card-description {
      color: var(--muted);
      margin-bottom: 16px;
      line-height: 1.6;
    }
    
    .trek-card-rating {
      display: flex;
      align-items: center;
      gap: 4px;
      color: var(--accent);
      font-size: 14px;
      margin-bottom: 16px;
    }
    
    .trek-card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
    }
    
    .trek-card-price {
      font-size: 24px;
      font-weight: 800;
      color: var(--brand);
    }
    
    .compare-checkbox {
      position: absolute;
      top: 16px;
      right: 16px;
      z-index: 2;
    }
    
    .compare-bar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: var(--brand);
      color: white;
      padding: 20px;
      transform: translateY(100%);
      transition: transform 0.3s ease;
      z-index: 1000;
    }
    
    .compare-bar.active {
      transform: translateY(0);
    }
    
    .compare-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    .compare-treks {
      display: flex;
      gap: 20px;
    }
    
    .compare-trek {
      background: rgba(255,255,255,0.1);
      padding: 12px 16px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .remove-compare {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
    }
    
    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: var(--muted);
    }
    
    .empty-state i {
      font-size: 48px;
      margin-bottom: 16px;
      color: var(--muted-light);
    }
  </style>
</head>
<body>
  <div class="scroll-progress" id="scrollProgress"></div>
  
  <header id="header">
    <div class="container topbar">
      <div class="brand" onclick="window.location.href='index.html'">
        <div class="logo">JT</div>
        <div>
          <div class="brand-text">JUMA TREK</div>
          <div class="brand-tagline">Walk in Nepal</div>
        </div>
      </div>
      <nav id="nav">
        <ul>
          <li><a href="index.html#trips">Home</a></li>
          <li><a href="#all-treks">All Treks</a></li>
          <li><a href="index.html#training">Preparation</a></li>
          <li><a href="index.html#gear">Gear</a></li>
          <li><a href="index.html#about">About</a></li>
          <li><a class="btn" href="booking.html"><i class="fas fa-calendar-alt"></i> Book Now</a></li>
        </ul>
      </nav>
      <button class="mobile-menu-toggle" onclick="toggleMobileMenu()">
        <i class="fas fa-bars"></i>
      </button>
    </div>
  </header>

  <main class="container">
    <section class="section">
      <div class="section-header">
        <h1 class="section-title">All Trekking Routes</h1>
        <p class="section-subtitle">Discover 45+ carefully curated Himalayan adventures. Filter by difficulty, duration, or region to find your perfect trek.</p>
      </div>

      <!-- Filters -->
      <div class="treks-filter">
        <div class="filter-grid">
          <div class="filter-group">
            <label for="difficulty-filter">Difficulty</label>
            <select id="difficulty-filter" class="filter-select">
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="challenging">Challenging</option>
              <option value="expert">Expert</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label for="duration-filter">Duration</label>
            <select id="duration-filter" class="filter-select">
              <option value="all">Any Duration</option>
              <option value="1-3">1-3 Days</option>
              <option value="4-7">4-7 Days</option>
              <option value="8-14">8-14 Days</option>
              <option value="15+">15+ Days</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label for="region-filter">Region</label>
            <select id="region-filter" class="filter-select">
              <option value="all">All Regions</option>
              <option value="everest">Everest Region</option>
              <option value="annapurna">Annapurna Region</option>
              <option value="langtang">Langtang Region</option>
              <option value="manaslu">Manaslu Region</option>
              <option value="mustang">Mustang Region</option>
              <option value="kanchenjunga">Kanchenjunga Region</option>
              <option value="remote">Remote Areas</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label for="season-filter">Best Season</label>
            <select id="season-filter" class="filter-select">
              <option value="all">All Seasons</option>
              <option value="spring">Spring (Mar-May)</option>
              <option value="autumn">Autumn (Sep-Nov)</option>
              <option value="winter">Winter (Dec-Feb)</option>
              <option value="monsoon">Monsoon (Jun-Aug)</option>
            </select>
          </div>
        </div>
        
        <div class="filter-actions">
          <div class="results-count" id="results-count">Showing 45 treks</div>
          <div>
            <button class="btn btn-secondary" onclick="resetFilters()">
              <i class="fas fa-refresh"></i> Reset Filters
            </button>
            <button class="btn" onclick="applyFilters()">
              <i class="fas fa-filter"></i> Apply Filters
            </button>
          </div>
        </div>
      </div>

      <!-- Treks Grid -->
      <div class="treks-grid" id="treks-grid">
        <!-- Treks will be loaded by JavaScript -->
      </div>

      <!-- Compare Bar -->
      <div class="compare-bar" id="compare-bar">
        <div class="compare-content">
          <div class="compare-treks" id="compare-treks-list">
            <!-- Compared treks will appear here -->
          </div>
          <div>
            <button class="btn btn-secondary" onclick="clearComparison()">
              Clear All
            </button>
            <button class="btn" onclick="compareTreks()" id="compare-button">
              Compare (0)
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="container">
      <div class="footer-content">
        <div>
          <div class="footer-brand">
            <div class="logo">JT</div>
            <div>
              <div class="brand-text" style="color: white;">JUMA TREK</div>
              <div class="brand-tagline">Walk in Nepal</div>
            </div>
          </div>
          <div class="footer-desc">
            Experience Nepal's majestic Himalayas with expert local guides. We create authentic, responsible adventures that benefit local communities while providing unforgettable memories.
          </div>
          <div class="footer-social">
            <a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
            <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-link"><i class="fab fa-youtube"></i></a>
          </div>
        </div>
        
        <div class="footer-section">
          <h4>Popular Treks</h4>
          <ul>
            <li><a href="booking.html?trek=everest-base-camp">Everest Base Camp</a></li>
            <li><a href="booking.html?trek=annapurna-circuit">Annapurna Circuit</a></li>
            <li><a href="booking.html?trek=langtang-valley">Langtang Valley</a></li>
            <li><a href="booking.html?trek=manaslu-circuit">Manaslu Circuit</a></li>
            <li><a href="booking.html?trek=upper-mustang">Upper Mustang</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>Support</h4>
          <ul>
            <li><a href="index.html#contact">Contact Us</a></li>
            <li><a href="#" onclick="viewFAQ()">Booking FAQ</a></li>
            <li><a href="#" onclick="viewTerms()">Terms & Conditions</a></li>
            <li><a href="#" onclick="viewPrivacy()">Privacy Policy</a></li>
            <li><a href="#" onclick="emergencyContact()">Emergency Contact</a></li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div>
          <strong>JUMA TREK</strong> &nbsp;|&nbsp; 
          <span style="color: rgba(255, 255, 255, 0.7);">© 2024 All rights reserved &nbsp;•&nbsp; Built with ❤️ in Nepal</span>
        </div>
        <div style="display: flex; gap: 24px; align-items: center;">
          <div style="display: flex; align-items: center; gap: 8px; color: rgba(255, 255, 255, 0.7);">
            <i class="fas fa-certificate"></i>
            Licensed & Insured
          </div>
          <div style="display: flex; align-items: center; gap: 8px; color: rgba(255, 255, 255, 0.7);">
            <i class="fas fa-award"></i>
            TripAdvisor Excellence
          </div>
        </div>
      </div>
    </div>
  </footer>

  <script src="JS/script.js"></script>
  <script src="JS/all-treks.js"></script>
</body>
</html>