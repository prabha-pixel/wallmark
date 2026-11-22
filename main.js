/**
 * Wallmark Facades and Structures - Global JavaScript
 * Powers Search Modal, Quote Modal, FAQ Accordions, Mobile Navigation, and Cost Estimator
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initSearch();
  initQuoteModal();
  initFaqAccordion();
  initWindLoadAdvisor();
  initDockChat();
  initServicesFilter();
});

/* =============================================================
   1. MOBILE NAVIGATION TOGGLE
============================================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isExpanded = navMenu.classList.contains('open');
      toggleBtn.setAttribute('aria-expanded', isExpanded);
      toggleBtn.innerHTML = isExpanded 
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
      if (!toggleBtn.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
      }
    });

    // Close mobile nav when clicking any nav link inside drawer
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
      });
    });
  }
}

/* =============================================================
   2. SEARCH MODAL WITH LIVE INSTANT SEARCH
============================================================== */
const searchableContent = [
  { title: "Curtain Wall Systems (Division 01)", category: "Services", url: "services.html#curtain-wall", desc: "Stick, unitized, semi-unitized, and pressure plate curtain wall envelopes." },
  { title: "Glazing Systems (Division 02)", category: "Services", url: "services.html#glazing", desc: "Spider glazing, strip glazing, structural skylights, aluminium and MS canopies, entrance glazing." },
  { title: "Frameless Glass & Patch Fittings (Division 03)", category: "Services", url: "services.html#frameless", desc: "Frameless glass doors, shower cubicles, railings, automatic sensor doors, slim partitions, switchable glass." },
  { title: "Wall Cladding Systems (Division 04)", category: "Services", url: "services.html#cladding", desc: "ACP cladding, HPL, FCB/Shera boards, SS PVD sheets, perforated metal, vertical fins, stonelam, CNC screens." },
  { title: "Structural Steel Engineering (Division 05)", category: "Services", url: "services.html#steel", desc: "Anchorage hooks, PEB structures, mild steel fabrication and high-rise site erection." },
  { title: "Engineering Services (Division 06)", category: "Services", url: "services.html#engineering", desc: "Façade design, shop drawings, structural wind calculations, material procurement, QC, project management." },
  { title: "About Wallmark Facades & Founder Ragul R", category: "About", url: "about.html", desc: "Founder Ragul R with 10+ years facade engineering experience across Chennai companies, Anna Nagar West office." },
  { title: "Wind Load Engineering (IS 875)", category: "Engineering", url: "about.html#engineering", desc: "Coastal Chennai cyclonic pressure engineering and structural deflection checks." },
  { title: "Vision, Mission & Purpose", category: "About", url: "about.html#purpose", desc: "Wallmark's core engineering vision, mission and execution principles." },
  { title: "Technical Specifications & Engineering FAQ", category: "FAQ", url: "faq.html", desc: "Answers to facade engineering, structural wind load, IS codes, and compliance in Chennai." },
  { title: "Fire Safety & Class A2 ACP Standards", category: "FAQ", url: "faq.html#fire-safety", desc: "NBC 2016 fire safety compliance and non-combustible mineral core ACP panels." },
  { title: "Curtain Wall vs Window Wall Guide", category: "Blog", url: "blog.html#curtain-vs-window", desc: "Technical evaluation of curtain wall systems for commercial high-rises." },
  { title: "Coastal Glass Cyclone Resistance Guide", category: "Blog", url: "blog.html#coastal-glass", desc: "Mitigating salt corrosion and 200 km/h wind gusts across the Chennai coastline." },
  { title: "Request a Turnkey Quotation", category: "Contact", url: "contact.html", desc: "Get rapid engineering quotes from our Anna Nagar West office in Chennai." },
  { title: "Chennai Headquarters & Contact", category: "Contact", url: "contact.html#office", desc: "Anna Nagar West, +91 78100 74774, ragul@wallmarkfacades.com." }
];

function initSearch() {
  const searchModal = document.getElementById('searchModal');
  const searchInput = document.getElementById('siteSearchInput');
  const searchResults = document.getElementById('searchResultsList');

  if (!searchModal) return;

  window.openSearchModal = function() {
    searchModal.classList.add('active');
    setTimeout(() => {
      if (searchInput) searchInput.focus();
    }, 100);
    renderSearchResults('');
  };

  window.closeSearchModal = function() {
    searchModal.classList.remove('active');
    if (searchInput) searchInput.value = '';
  };

  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) {
      window.closeSearchModal();
    }
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderSearchResults(e.target.value.trim().toLowerCase());
    });
  }

  function renderSearchResults(query) {
    if (!searchResults) return;

    const filtered = query === ''
      ? searchableContent.slice(0, 5)
      : searchableContent.filter(item => 
          item.title.toLowerCase().includes(query) || 
          item.desc.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
        );

    if (filtered.length === 0) {
      searchResults.innerHTML = `<div style="padding: 20px; text-align: center; color: #64748b;">No results found for "<strong>${escapeHtml(query)}</strong>". Try searching for "glazing", "ACP", "cost", or "pricing".</div>`;
      return;
    }

    searchResults.innerHTML = filtered.map(item => `
      <a href="${item.url}" class="search-item" onclick="closeSearchModal()">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <h4 style="margin: 0; color: #0b1e36; font-size: 0.98rem; font-weight: 700;">${escapeHtml(item.title)}</h4>
          <span style="font-size: 0.72rem; font-weight: 700; background: #e0f2fe; color: #0284c7; padding: 2px 8px; border-radius: 4px; text-transform: uppercase;">${escapeHtml(item.category)}</span>
        </div>
        <p style="margin: 0; font-size: 0.85rem; color: #64748b;">${escapeHtml(item.desc)}</p>
      </a>
    `).join('');
  }
}

/* =============================================================
   3. REQUEST A QUOTATION POPUP MODAL
============================================================== */
function initQuoteModal() {
  const quoteModal = document.getElementById('quoteModal');
  if (!quoteModal) return;

  window.openQuoteModal = function(serviceType = '', systemTitle = '') {
    quoteModal.classList.add('active');
    const serviceSelect = document.getElementById('modalServiceType');
    const modalDetails = document.getElementById('modalDetails');
    if (serviceSelect && serviceType) {
      // Map division id if necessary
      const validOptions = Array.from(serviceSelect.options).map(o => o.value);
      if (validOptions.includes(serviceType)) {
        serviceSelect.value = serviceType;
      }
    }
    if (modalDetails && systemTitle) {
      modalDetails.value = `Interested in system: ${systemTitle}. Please provide engineering specifications and quotation estimate.`;
    }
  };

  window.closeQuoteModal = function() {
    quoteModal.classList.remove('active');
  };

  quoteModal.addEventListener('click', (e) => {
    if (e.target === quoteModal) {
      window.closeQuoteModal();
    }
  });

  const quoteForm = document.getElementById('modalQuoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = quoteForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Submitting Request...';
      submitBtn.disabled = true;

      setTimeout(() => {
        alert('Thank you! Your quotation request has been received by Wallmark Facades engineering desk. Our team in Anna Nagar West will reach out within 2 hours with an initial estimate.');
        quoteForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        window.closeQuoteModal();
      }, 700);
    });
  }
}

/* =============================================================
   4. FAQ ACCORDION INTERACTIVITY
============================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Optionally close other items
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove('active');
        });

        item.classList.toggle('active', !isActive);
      });
    }
  });

  // Category filter tabs on faq.html if present
  const filterBtns = document.querySelectorAll('.faq-filter-btn');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        faqItems.forEach(item => {
          const itemCat = item.getAttribute('data-category');
          if (filter === 'all' || itemCat === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
}

/* =============================================================
   5. CHENNAI COASTAL WIND-LOAD & FACADE SPEC ENGINE (IS 875)
============================================================== */
function initWindLoadAdvisor() {
  const form = document.getElementById('windLoadAdvisorForm');
  if (!form) return;

  const zoneInput = document.getElementById('siteZoneSelect');
  const heightInput = document.getElementById('heightSelect');
  const systemInput = document.getElementById('systemSelect');

  const pzDisplay = document.getElementById('windPzValue');
  const badgeDisplay = document.getElementById('windZoneBadge');
  const glassDisplay = document.getElementById('specGlassBuild');
  const mullionDisplay = document.getElementById('specMullion');
  const safeguardDisplay = document.getElementById('specSafeguard');

  const windData = {
    coastal: {
      low: { pz: '1.65 kPa (~168 kg/m²)', badge: 'Zone 5 Coastal High Exposure (Vb = 50 m/s)' },
      mid: { pz: '2.15 kPa (~219 kg/m²)', badge: 'Zone 5 Coastal Cyclonic Corridor (Vb = 50 m/s)' },
      high: { pz: '2.65 kPa (~270 kg/m²)', badge: 'Zone 5 Severe Cyclonic Exposure (Vb = 50 m/s)' },
      sky: { pz: '3.05 kPa (~311 kg/m²)', badge: 'Zone 5 Skyscraper Coastal Gale Peak (Vb = 50 m/s)' }
    },
    urban: {
      low: { pz: '1.25 kPa (~127 kg/m²)', badge: 'Zone 5 Urban Terrain Category 3 (Vb = 50 m/s)' },
      mid: { pz: '1.75 kPa (~178 kg/m²)', badge: 'Zone 5 Built-Up Commercial Corridor (Vb = 50 m/s)' },
      high: { pz: '2.20 kPa (~224 kg/m²)', badge: 'Zone 5 Urban High-Rise Exposure (Vb = 50 m/s)' },
      sky: { pz: '2.55 kPa (~260 kg/m²)', badge: 'Zone 5 Landmark Tower Urban Wind (Vb = 50 m/s)' }
    },
    suburban: {
      low: { pz: '1.45 kPa (~148 kg/m²)', badge: 'Zone 5 Open Suburban Terrain Cat 2 (Vb = 50 m/s)' },
      mid: { pz: '1.95 kPa (~199 kg/m²)', badge: 'Zone 5 Industrial Corridor Wind (Vb = 50 m/s)' },
      high: { pz: '2.40 kPa (~245 kg/m²)', badge: 'Zone 5 Open Highway Elevation (Vb = 50 m/s)' },
      sky: { pz: '2.80 kPa (~285 kg/m²)', badge: 'Zone 5 Landmark Open Exposure (Vb = 50 m/s)' }
    }
  };

  const systemSpecs = {
    unitized: {
      low: {
        glass: '24mm DGU: 6mm Solar Control + 12A Argon + 6mm Toughened Clear',
        mullion: 'IS 875 L/175 Limit | 135mm x 60mm 6063-T6 Die-Extruded Unitized Profile',
        safeguard: 'Triple-Gasket EPDM Barrier + NBC 2016 2-Hr Perimeter Fire Stop'
      },
      mid: {
        glass: '28mm DGU: 8mm High-Performance Low-E + 12A Argon + 8mm Heat-Strengthened',
        mullion: 'IS 875 L/240 Limit | 160mm x 65mm Die-Extruded 6063-T6 Structural Profile',
        safeguard: 'Interlocking Male/Female Gasket System + Dow Corning 983 Silicone Seal'
      },
      high: {
        glass: '31.52mm Acoustic DGU: 8mm Low-E + 12A + (6mm + 1.52mm PVB + 6mm Laminated)',
        mullion: 'IS 875 L/240 Limit | 185mm x 75mm Heavy-Duty Extruded Box Mullion',
        safeguard: 'Dynamic Seismic Movement Expansion Joint (±25mm) + NBC 2016 Fire Stop'
      },
      sky: {
        glass: '33.52mm Cyclone-Rated DGU: 10mm Toughened Low-E + 12A + (8mm + 1.52mm SentryGlas + 8mm)',
        mullion: 'IS 875 L/300 Strict Limit | 220mm Custom Die Mullion with Internal Steel Stiffener',
        safeguard: 'Hurricane-Resistant Structural Brackets with M16 SS 316 Anchor Fasteners'
      }
    },
    'semi-unitized': {
      low: {
        glass: '10mm or 12mm Monolithic Toughened Low-E Glass with Warm-Edge Spacers',
        mullion: 'IS 875 L/175 Limit | 100mm x 50mm Structural Aluminium Frame',
        safeguard: 'Weatherproof Neutral Silicone + Mechanical Safety Retainer Cleats'
      },
      mid: {
        glass: '24mm DGU: 6mm Low-E + 12A Spacer + 6mm Heat-Strengthened Float',
        mullion: 'IS 875 L/200 Limit | 140mm x 55mm Architectural Aluminium Box Section',
        safeguard: 'Factory-Glazed Sub-Frames with On-Site Structural Weather Seals'
      },
      high: {
        glass: '28mm DGU: 8mm High-Performance Reflective + 12A + 8mm Toughened Glass',
        mullion: 'IS 875 L/240 Limit | 175mm Heavy-Duty Mullion with Structural Brackets',
        safeguard: 'Continuous EPDM Gaskets + NBC 2016 Smoke Stop Floor Barriers'
      },
      sky: {
        glass: '30mm DGU: 8mm Solar Control + 12A + (6mm + 1.52mm PVB + 6mm Laminated)',
        mullion: 'IS 875 L/240 Limit | 200mm Reinforced Structural Extrusion Profile',
        safeguard: 'Dow Corning 795 Perimeter Seal + Laser-Aligned Boom Crane Anchor Fixing'
      }
    },
    spider: {
      low: {
        glass: '12mm Clear Toughened Architectural Glass with Countersunk SS 316 Rotules',
        mullion: '15mm Monolithic Toughened Glass Fin or Mild Steel Truss Support',
        safeguard: 'Heavy SS 316 Articulated 4-Way Spider Fittings with Torque-Checked Bolts'
      },
      mid: {
        glass: '17.52mm SGP Laminated: 8mm Toughened + 1.52mm SentryGlas + 8mm Toughened',
        mullion: '19mm Laminated Glass Fin with Structural Stainless Steel Patch Fittings',
        safeguard: 'Bay-of-Bengal Salt Spray Resistant SS 316 Marine-Grade Hardware'
      },
      high: {
        glass: '21.52mm Laminated: 10mm Toughened + 1.52mm SGP + 10mm Toughened Glass',
        mullion: 'Custom Aerodynamic Tubular Steel Trusses with Tension Cable Rigging',
        safeguard: 'Structural Wind Deflection Limit L/250 with Dynamic Swivel Articulation'
      },
      sky: {
        glass: '25.52mm Heavy Laminated: 12mm Low-Iron + 1.52mm SGP + 12mm Low-Iron Toughened',
        mullion: 'Heavy-Span Engineered Space Frame with Stainless Steel Tension Rods',
        safeguard: 'Full Cyclone Impact Safety with Fail-Safe Redundant Bracket Anchorage'
      }
    },
    acp: {
      low: {
        glass: '4mm Certified Class B1 Fire-Retardant ACP with 0.5mm Aluminium Skin (PVDF)',
        mullion: '50mm x 50mm x 2mm Aluminium/MS Sub-Grid Framework with Anti-Corrosive Primer',
        safeguard: 'Rivet-Fixed Panelled Cassette System with Siliconized Weather Grooves'
      },
      mid: {
        glass: '4mm Certified Class A2 Non-Combustible Mineral Core Composite Panel',
        mullion: '65mm x 50mm Extruded Aluminium Box Runner Grid with Heavy Cleat Fasteners',
        safeguard: 'NBC 2016 Mandatory Non-Combustible Cavity Fire Barriers Every Slab Level'
      },
      high: {
        glass: '4mm Class A2 PVDF 3-Coat Fluoropolymer Finish with 20-Year Warranty',
        mullion: 'Heavy 75mm x 50mm Structural Runner Grid with Wind Bracing Tiebacks',
        safeguard: 'Ventilated Rainscreen Pressure-Equalized Cavity to Prevent Moisture Trap'
      },
      sky: {
        glass: '4mm Heavy Class A2 Core with 0.5mm Marine-Grade 5005 Alloy Aluminium Skin',
        mullion: 'Engineered 100mm Structural Aluminium Sub-Structure with Stainless Anchors',
        safeguard: 'Cyclone Wind-Tear Resistant Cassette Anchorage with Dual Thermal Breaks'
      }
    },
    hpl: {
      low: {
        glass: '6mm Exterior High-Pressure Laminate (HPL) with UV-Resistant Surface',
        mullion: 'Aluminium T-Section Sub-Framing with Chemical Adhesive & Mechanical Fixings',
        safeguard: 'Back-Ventilated Rainscreen System for Passive Thermal Cooling'
      },
      mid: {
        glass: '8mm Exterior Grade HPL with Class B-s1,d0 Fire Rating',
        mullion: 'Engineered Aluminium Rail System with Slotted Expansion Hole Fasteners',
        safeguard: 'Breathable Weather Barrier Membrane + Fire Stops at Floor Interfaces'
      },
      high: {
        glass: '10mm Heavy Architectural HPL / Terracotta / Stone Composite Panels',
        mullion: 'Double Extruded Box Frame Grid with Structural Torque Anchor Bolts',
        safeguard: 'NBC 2016 Perimeter Compartmentation + Cyclone Uplift Restraints'
      },
      sky: {
        glass: '12mm High-Density Exterior Phenolic Composite Panels with Dual Skin Protection',
        mullion: 'Heavy Extruded Framing Designed for High Dynamic Suction Pressure',
        safeguard: 'Seismic Expansion Joints + Marine-Grade Anti-Corrosion Fasteners'
      }
    }
  };

  function updateDiagnostic() {
    const zone = zoneInput ? zoneInput.value : 'urban';
    const height = heightInput ? heightInput.value : 'mid';
    const system = systemInput ? systemInput.value : 'unitized';

    const zInfo = (windData[zone] && windData[zone][height]) || windData.urban.mid;
    const sInfo = (systemSpecs[system] && systemSpecs[system][height]) || systemSpecs.unitized.mid;

    if (pzDisplay) pzDisplay.textContent = zInfo.pz;
    if (badgeDisplay) badgeDisplay.textContent = zInfo.badge;
    if (glassDisplay) glassDisplay.textContent = sInfo.glass;
    if (mullionDisplay) mullionDisplay.textContent = sInfo.mullion;
    if (safeguardDisplay) safeguardDisplay.textContent = sInfo.safeguard;
  }

  [zoneInput, heightInput, systemInput].forEach(elem => {
    if (elem) elem.addEventListener('change', updateDiagnostic);
  });

  updateDiagnostic();
}

window.applyWindSpecToForm = function() {
  const zoneSelect = document.getElementById('siteZoneSelect');
  const heightSelect = document.getElementById('heightSelect');
  const systemSelect = document.getElementById('systemSelect');
  const pzValue = document.getElementById('windPzValue');

  const zoneText = zoneSelect ? zoneSelect.options[zoneSelect.selectedIndex].text : '';
  const heightText = heightSelect ? heightSelect.options[heightSelect.selectedIndex].text : '';
  const systemText = systemSelect ? systemSelect.options[systemSelect.selectedIndex].text : '';
  const pz = pzValue ? pzValue.textContent : '';

  const notesField = document.getElementById('contactNotes');
  const serviceField = document.getElementById('contactService');
  const locationField = document.getElementById('contactLocation');

  if (notesField) {
    notesField.value = `[IS 875 Wind-Load Assessment Request]\n• Site Micro-Zone: ${zoneText}\n• Elevation/Height: ${heightText}\n• System: ${systemText}\n• Calculated Design Wind Pressure (Pz): ${pz}\n\nPlease review structural drawings and schedule an engineering consultation / site survey.`;
  }

  if (serviceField) {
    const sysVal = systemSelect ? systemSelect.value : '';
    if (sysVal === 'unitized' || sysVal === 'semi-unitized') serviceField.value = 'glazing';
    else if (sysVal === 'acp') serviceField.value = 'acp';
    else if (sysVal === 'spider') serviceField.value = 'spider';
    else if (sysVal === 'hpl') serviceField.value = 'wall-cladding';
  }

  if (locationField && !locationField.value) {
    if (zoneSelect && zoneSelect.value === 'coastal') locationField.value = 'ECR / OMR Corridor, Chennai';
    else if (zoneSelect && zoneSelect.value === 'urban') locationField.value = 'Central Chennai (Anna Nagar / T. Nagar)';
    else if (zoneSelect && zoneSelect.value === 'suburban') locationField.value = 'Outer Chennai (Porur / Sriperumbudur)';
  }

  const officeSection = document.getElementById('office');
  if (officeSection) {
    officeSection.scrollIntoView({ behavior: 'smooth' });
    const nameField = document.getElementById('contactName');
    if (nameField) {
      setTimeout(() => nameField.focus(), 600);
    }
  }
};

// Utility HTML escaper
function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

/* =============================================================
   6. FLOATING DOCK & "ASK US" INTERACTIVE CHAT WIDGET
   (Authentic feature from https://www.wallmarkfacades.com/)
============================================================== */
function initDockChat() {
  const chatToggle = document.getElementById('chatToggle');
  const chatClose = document.getElementById('chatClose');
  const chatWidget = document.getElementById('chatWidget');
  const chatMessages = document.getElementById('chatMessages');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const quickBtns = document.querySelectorAll('.chat__q button');

  if (!chatToggle || !chatWidget) return;

  function openChat() {
    chatWidget.classList.add('is-open');
    chatWidget.setAttribute('aria-hidden', 'false');
    chatToggle.classList.add('is-active');
    chatToggle.setAttribute('aria-expanded', 'true');
    setTimeout(() => {
      if (chatInput) chatInput.focus();
    }, 150);
  }

  function closeChat() {
    chatWidget.classList.remove('is-open');
    chatWidget.setAttribute('aria-hidden', 'true');
    chatToggle.classList.remove('is-active');
    chatToggle.setAttribute('aria-expanded', 'false');
  }

  chatToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (chatWidget.classList.contains('is-open')) {
      closeChat();
    } else {
      openChat();
    }
  });

  if (chatClose) {
    chatClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closeChat();
    });
  }

  // Close when clicking outside chat widget and toggle button
  document.addEventListener('click', (e) => {
    if (
      chatWidget.classList.contains('is-open') &&
      !chatWidget.contains(e.target) &&
      !chatToggle.contains(e.target)
    ) {
      closeChat();
    }
  });

  // Knowledge base matcher
  function getBotResponse(userText) {
    const text = userText.toLowerCase().trim();

    if (text.includes('price') || text.includes('pricing') || text.includes('cost') || text.includes('boq') || text.includes('rate') || text.includes('per sq')) {
      return `<strong>Cost Breakdown in Chennai:</strong><br>&bull; <strong>Structural Glazing:</strong> ₹420 &ndash; ₹780 / sq. ft.<br>&bull; <strong>Unitized Curtain Wall:</strong> ₹650 &ndash; ₹1,100 / sq. ft.<br>&bull; <strong>Fire-Rated ACP Cladding:</strong> ₹220 &ndash; ₹360 / sq. ft.<br>&bull; <strong>Spider Glazing Atriums:</strong> ₹700 &ndash; ₹1,200 / sq. ft.<br><br>Share your architectural floor plans or elevation on <a href="https://wa.me/917810074774" target="_blank">WhatsApp (+91 78100 74774)</a> for an itemized BOQ within 4 hours.`;
    }

    if (text.includes('office') || text.includes('where') || text.includes('location') || text.includes('address') || text.includes('anna nagar')) {
      return `<strong>Chennai Headquarters:</strong><br>Plot No. 1051, Flat No. 2, Ground Floor, I Block, 35th Street, 18th Main Road, Anna Nagar West, Chennai &ndash; 600040.<br><br>You're welcome to visit our engineering office or schedule a project site survey.`;
    }

    if (text.includes('timing') || text.includes('time') || text.includes('hour') || text.includes('working') || text.includes('open') || text.includes('sunday')) {
      return `<strong>Engineering &amp; Site Operations:</strong><br>Mon &ndash; Sun: <strong>8:00 AM &ndash; 8:00 PM</strong>.<br>Our site erection and project management teams operate 7 days a week across Chennai and Tamil Nadu.`;
    }

    if (text.includes('whatsapp') || text.includes('contact') || text.includes('phone') || text.includes('number') || text.includes('call')) {
      return `Reach our Founder &amp; Senior Engineering Desk directly on WhatsApp or Call:<br>&bull; <strong>Phone / WhatsApp:</strong> <a href="https://wa.me/917810074774" target="_blank">+91 78100 74774</a><br>&bull; <strong>Email:</strong> <a href="mailto:ragul@wallmarkfacades.com">ragul@wallmarkfacades.com</a>`;
    }

    if (text.includes('ragul') || text.includes('founder') || text.includes('experience') || text.includes('leadership')) {
      return `<strong>Ragul R (Founder &amp; Technical Director):</strong><br>Ragul has <strong>10+ years of dedicated experience</strong> in facade engineering and strong structural engineering knowledge. Prior to founding Wallmark in Anna Nagar West, he worked in various leading facade companies across Chennai, managing structural glazing, unitized curtain walls, and cyclonic wind load engineering.`;
    }

    if (text.includes('glazing') || text.includes('glass') || text.includes('curtain') || text.includes('spider')) {
      return `We specialize in <strong>Structural Glazing</strong>, <strong>Unitized Curtain Walls</strong>, <strong>Spider Glazing Atriums</strong>, and <strong>DGU Acoustic Insulated Glass</strong>. All systems are engineered to IS 875 wind pressure standards with branded Saint-Gobain/Asahi glass and Dow Corning / Sika structural silicones.`;
    }

    if (text.includes('acp') || text.includes('cladding') || text.includes('hpl') || text.includes('fire')) {
      return `We engineer and install <strong>Fire-Rated Class A2/B1 ACP Cladding</strong> (Aludecor / Alstrong), CNC perforated facade panels, and exterior HPL cladding with ventilated cavity systems ensuring zero water ingress and complete fire safety.`;
    }

    if (text.includes('wind') || text.includes('cyclone') || text.includes('is 875')) {
      return `All Wallmark facades are calculated to <strong>IS 875 (Part 3)</strong> cyclonic wind pressure standards (up to 2.0 kPa), engineered specifically for Chennai's coastal environment with high-grade aluminium 6063-T6 extrusions and SS 316 anchors.`;
    }

    return `Thank you for your message! Our facade engineering team in Anna Nagar West will be glad to assist with technical drawings, BOQ, or site visits. Connect directly with us on <a href="https://wa.me/917810074774" target="_blank">WhatsApp (+91 78100 74774)</a> or email <a href="mailto:ragul@wallmarkfacades.com">ragul@wallmarkfacades.com</a>.`;
  }

  function appendMessage(sender, htmlContent) {
    if (!chatMessages) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg chat-msg--${sender}`;
    msgDiv.innerHTML = htmlContent;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleUserQuery(query) {
    if (!query) return;
    appendMessage('user', escapeHtml(query));

    // Show quick bot answer
    setTimeout(() => {
      const botResponse = getBotResponse(query);
      appendMessage('bot', botResponse);
    }, 350);
  }

  // Quick preset question chips
  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.getAttribute('data-question') || btn.textContent.trim();
      handleUserQuery(q);
    });
  });

  // Custom text submission
  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = chatInput.value.trim();
      if (!val) return;
      chatInput.value = '';
      handleUserQuery(val);
    });
  }
}


/* =============================================================
   7. SERVICES CATALOG SEARCH & DIVISION FILTER (ALL 41 SYSTEMS)
============================================================== */
function initServicesFilter() {
  const searchInput = document.getElementById('systemSearchInput');
  const chips = document.querySelectorAll('.filter-chip');
  const divisionSections = document.querySelectorAll('.division-section');
  const countBadge = document.getElementById('systemsCountDisplay');
  const noResultsBox = document.getElementById('catalogNoResults');
  const clearBtn = document.getElementById('clearSearchBtn');

  if (!searchInput && chips.length === 0) return;

  let currentCategory = 'all';
  let searchQuery = '';

  function applyFilter() {
    let matchCount = 0;
    const query = searchQuery.trim().toLowerCase();

    divisionSections.forEach(section => {
      const divisionId = section.getAttribute('id');
      const cards = section.querySelectorAll('.system-card');
      let divisionMatchCount = 0;

      const categoryMatches = (currentCategory === 'all' || currentCategory === divisionId);

      cards.forEach(card => {
        const title = (card.querySelector('.system-card-title')?.textContent || '').toLowerCase();
        const desc = (card.querySelector('.system-card-desc')?.textContent || '').toLowerCase();
        const textMatches = !query || title.includes(query) || desc.includes(query);

        if (categoryMatches && textMatches) {
          card.style.display = '';
          divisionMatchCount++;
          matchCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (divisionMatchCount > 0) {
        section.style.display = '';
      } else {
        section.style.display = 'none';
      }
    });

    if (countBadge) {
      countBadge.innerHTML = `Showing <strong>${matchCount}</strong> of 41 systems`;
    }

    if (noResultsBox) {
      if (matchCount === 0) {
        noResultsBox.classList.add('is-visible');
      } else {
        noResultsBox.classList.remove('is-visible');
      }
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      applyFilter();
    });
  }

  chips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.preventDefault();
      chips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      currentCategory = chip.getAttribute('data-division') || 'all';
      applyFilter();

      if (currentCategory !== 'all') {
        const targetSection = document.getElementById(currentCategory);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      currentCategory = 'all';
      chips.forEach(c => c.classList.remove('is-active'));
      const allChip = document.querySelector('.filter-chip[data-division="all"]');
      if (allChip) allChip.classList.add('is-active');
      applyFilter();
    });
  }

  // Handle URL hash on page load (e.g. services.html#curtain-wall)
  if (window.location.hash) {
    const hashId = window.location.hash.substring(1);
    const matchingChip = document.querySelector(`.filter-chip[data-division="${hashId}"]`);
    if (matchingChip) {
      chips.forEach(c => c.classList.remove('is-active'));
      matchingChip.classList.add('is-active');
      currentCategory = hashId;
      applyFilter();
    }
  }
}
