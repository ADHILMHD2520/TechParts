/**
 * TechParts - Core Application Logic
 * Implements client-side SPA routing, reactive catalog filtering, cart management,
 * checkout flow, authentication, user profile, reviews, and admin dashboard.
 */

// ==========================================================================
// App State Management
// ==========================================================================
const AppState = {
  products: [],
  cart: [],
  wishlist: [],
  user: null,
  orders: [],
  reviews: [],
  promo: null,
  activeFilter: {
    search: "",
    category: "all",
    brands: [],
    maxPrice: 1200,
    inStockOnly: false,
    sort: "popular"
  },

  init() {
    // Load or initialize products
    const savedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    this.products = savedProducts ? JSON.parse(savedProducts) : [...TECHPARTS_DATA.products];

    // Load or initialize cart
    const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
    this.cart = savedCart ? JSON.parse(savedCart) : [
      // Pre-seed with one item for a great immediate user experience
      {
        id: "prod-1",
        name: "AMD Ryzen 7 7800X3D",
        brand: "AMD",
        price: 399.99,
        originalPrice: 449.99,
        image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80",
        quantity: 1
      }
    ];

    // Load or initialize wishlist
    const savedWishlist = localStorage.getItem(STORAGE_KEYS.WISHLIST);
    this.wishlist = savedWishlist ? JSON.parse(savedWishlist) : [...TECHPARTS_DATA.defaultWishlist];

    // Load or initialize user
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
    this.user = savedUser ? JSON.parse(savedUser) : { ...TECHPARTS_DATA.defaultUser };

    // Load or initialize orders
    const savedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
    this.orders = savedOrders ? JSON.parse(savedOrders) : [...TECHPARTS_DATA.defaultOrders];

    // Load or initialize reviews
    const savedReviews = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    this.reviews = savedReviews ? JSON.parse(savedReviews) : [...TECHPARTS_DATA.sampleReviews];

    // Pre-apply default promo
    this.promo = { code: "TECH10", discountPercent: 10 };

    this.saveAll();
    this.updateBadges();
  },

  saveAll() {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(this.products));
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(this.cart));
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(this.wishlist));
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(this.user));
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(this.orders));
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(this.reviews));
  },

  updateBadges() {
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartBadge = document.getElementById("cartCountBadge");
    const drawerBadge = document.getElementById("drawerItemCount");
    const cartCountText = document.getElementById("cartItemsCountText");
    const wishlistBadge = document.getElementById("wishlistCountBadge");
    const headerCartTotal = document.getElementById("headerCartTotal");

    if (cartBadge) cartBadge.textContent = totalItems;
    if (drawerBadge) drawerBadge.textContent = totalItems;
    if (cartCountText) cartCountText.textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'items'}`;
    if (wishlistBadge) wishlistBadge.textContent = this.wishlist.length;

    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (headerCartTotal) headerCartTotal.textContent = `$${subtotal.toFixed(2)}`;
  }
};

// ==========================================================================
// Toast Notification Utility
// ==========================================================================
function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  const icon = type === "success" ? "fa-circle-check" : type === "error" ? "fa-circle-xmark" : "fa-circle-info";
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ==========================================================================
// Router & Navigation
// ==========================================================================
const Router = {
  init() {
    window.addEventListener("hashchange", () => this.handleRoute());
    this.handleRoute();
  },

  handleRoute() {
    const hash = window.location.hash || "#home";
    const [path, queryString] = hash.split("?");
    const params = new URLSearchParams(queryString || "");

    // Hide all views
    document.querySelectorAll(".page-view").forEach(v => v.style.display = "none");

    // Close mobile menu or open modals if any
    document.querySelectorAll(".nav-link").forEach(link => {
      const targetNav = link.getAttribute("data-nav");
      if (path.includes(targetNav)) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    window.scrollTo({ top: 0, behavior: "smooth" });

    // Route dispatch
    switch (path) {
      case "#products":
        document.getElementById("view-products").style.display = "block";
        if (params.has("category")) {
          AppState.activeFilter.category = params.get("category");
        }
        if (params.has("search")) {
          AppState.activeFilter.search = params.get("search");
          const searchInput = document.getElementById("globalSearchInput");
          if (searchInput) searchInput.value = params.get("search");
        }
        CatalogView.render();
        break;

      case "#product-details":
        document.getElementById("view-product-details").style.display = "block";
        const prodId = params.get("id") || AppState.products[0]?.id;
        ProductDetailsView.render(prodId);
        break;

      case "#cart":
        document.getElementById("view-cart").style.display = "block";
        CartView.render();
        break;

      case "#checkout":
        document.getElementById("view-checkout").style.display = "block";
        CheckoutView.render();
        break;

      case "#login":
      case "#signup":
        document.getElementById("view-login").style.display = "block";
        AuthView.render(path === "#signup");
        break;

      case "#profile":
        document.getElementById("view-profile").style.display = "block";
        const tab = params.get("tab") || "orders";
        ProfileView.render(tab);
        break;

      case "#admin":
        document.getElementById("view-admin").style.display = "block";
        AdminView.render();
        break;

      case "#deals":
      case "#home":
      default:
        document.getElementById("view-home").style.display = "block";
        HomeView.render();
        if (path === "#deals") {
          const dealsSec = document.getElementById("deals");
          if (dealsSec) dealsSec.scrollIntoView({ behavior: "smooth" });
        }
        break;
    }
  }
};

// ==========================================================================
// Views Implementation
// ==========================================================================

// --- Home View ---
const HomeView = {
  render() {
    this.renderCategories();
    this.renderDeals();
    this.renderFeatured();
    this.startCountdown();
  },

  renderCategories() {
    const grid = document.getElementById("homeCategoriesGrid");
    if (!grid) return;

    grid.innerHTML = TECHPARTS_DATA.categories.map(cat => `
      <div class="category-card" onclick="window.location.hash='#products?category=${cat.id}'">
        <div class="cat-card-header">
          <div class="cat-card-icon">
            <i class="fa-solid ${cat.icon}"></i>
          </div>
          <span class="cat-card-count">${cat.itemCount} Items</span>
        </div>
        <h3 class="cat-card-title">${cat.name}</h3>
        <p class="cat-card-desc">${cat.description}</p>
        <div class="cat-card-action">
          Explore Hardware <i class="fa-solid fa-arrow-right"></i>
        </div>
      </div>
    `).join("");
  },

  renderDeals() {
    const grid = document.getElementById("homeDealsGrid");
    if (!grid) return;

    const dealProducts = AppState.products.filter(p => p.isDeal).slice(0, 4);
    grid.innerHTML = dealProducts.map(p => `
      <div class="deal-product-card">
        <div class="deal-img-wrap" onclick="window.location.hash='#product-details?id=${p.id}'">
          <img src="${p.images[0]}" alt="${p.name}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=400&q=80'">
        </div>
        <div class="deal-prod-title" onclick="window.location.hash='#product-details?id=${p.id}'">
          ${p.name}
        </div>
        <div class="deal-price-block">
          <span class="deal-curr-price">$${p.price.toFixed(2)}</span>
          ${p.originalPrice ? `<span class="deal-orig-price">$${p.originalPrice.toFixed(2)}</span>` : ''}
        </div>
        <button type="button" class="deal-add-btn" onclick="CartController.add('${p.id}', 1)">
          <i class="fa-solid fa-cart-plus"></i> Claim Deal
        </button>
      </div>
    `).join("");
  },

  renderFeatured() {
    const grid = document.getElementById("homeFeaturedGrid");
    if (!grid) return;

    const featuredProducts = AppState.products.filter(p => p.isFeatured).slice(0, 8);
    grid.innerHTML = featuredProducts.map(p => renderProductCard(p)).join("");
  },

  countdownInterval: null,
  startCountdown() {
    if (this.countdownInterval) clearInterval(this.countdownInterval);

    let totalSeconds = 8 * 3600 + 42 * 60 + 19;
    const hoursEl = document.getElementById("cd-hours");
    const minsEl = document.getElementById("cd-minutes");
    const secsEl = document.getElementById("cd-seconds");

    this.countdownInterval = setInterval(() => {
      totalSeconds--;
      if (totalSeconds <= 0) totalSeconds = 24 * 3600;

      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;

      if (hoursEl) hoursEl.textContent = String(h).padStart(2, "0");
      if (minsEl) minsEl.textContent = String(m).padStart(2, "0");
      if (secsEl) secsEl.textContent = String(s).padStart(2, "0");
    }, 1000);
  }
};

// --- Product Card Component Helper ---
function renderProductCard(p) {
  const isWishlisted = AppState.wishlist.includes(p.id);
  const discountPercent = p.originalPrice ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;
  const isLowStock = p.stock <= 10;

  return `
    <div class="product-card" data-product-id="${p.id}">
      <div class="product-image-container" onclick="window.location.hash='#product-details?id=${p.id}'">
        ${p.badge ? `<span class="product-badge ${p.isDeal ? 'deal-badge' : ''}">${p.badge}</span>` : ''}
        <button type="button" class="wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="event.stopPropagation(); WishlistController.toggle('${p.id}')" title="Save to Wishlist">
          <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
        </button>
        <img class="product-img" src="${p.images[0]}" alt="${p.name}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80'">
      </div>

      <div class="product-info">
        <span class="product-brand">${p.brand}</span>
        <h4 class="product-title" onclick="window.location.hash='#product-details?id=${p.id}'" title="${p.name}">
          ${p.name}
        </h4>

        <div class="product-rating">
          <div class="rating-stars">
            ${renderStars(p.rating)}
          </div>
          <span style="font-weight: 700;">${p.rating.toFixed(1)}</span>
          <span class="rating-count">(${p.reviewCount})</span>
        </div>

        <div class="product-price-row">
          <span class="current-price">$${p.price.toFixed(2)}</span>
          ${p.originalPrice ? `
            <span class="original-price">$${p.originalPrice.toFixed(2)}</span>
            <span class="discount-pill">-${discountPercent}%</span>
          ` : ''}
        </div>

        <div class="product-stock-status">
          <span class="${isLowStock ? 'stock-low' : 'stock-in'}">
            ${isLowStock ? `Only ${p.stock} left in stock` : `In Stock (${p.stock} available)`}
          </span>
        </div>

        <div class="card-actions-row">
          <button type="button" class="add-cart-btn" onclick="CartController.add('${p.id}', 1)">
            <i class="fa-solid fa-cart-shopping"></i> Add to Cart
          </button>
          <button type="button" class="quick-view-btn" onclick="QuickViewController.open('${p.id}')" title="Quick View">
            <i class="fa-regular fa-eye"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderStars(rating) {
  let starsHtml = "";
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      starsHtml += '<i class="fa-solid fa-star"></i>';
    } else if (rating >= i - 0.5) {
      starsHtml += '<i class="fa-solid fa-star-half-stroke"></i>';
    } else {
      starsHtml += '<i class="fa-regular fa-star"></i>';
    }
  }
  return starsHtml;
}

// --- Catalog View ---
const CatalogView = {
  render() {
    this.renderSidebarFilters();
    this.filterAndRenderProducts();
  },

  renderSidebarFilters() {
    // Categories filter options
    const catList = document.getElementById("filterCategoriesList");
    if (catList) {
      catList.innerHTML = `
        <label class="filter-checkbox-label">
          <span class="checkbox-custom-wrap">
            <input type="radio" name="catFilter" value="all" ${AppState.activeFilter.category === "all" ? "checked" : ""}>
            <span>All Categories</span>
          </span>
          <span class="filter-count-badge">${AppState.products.length}</span>
        </label>
      ` + TECHPARTS_DATA.categories.map(c => {
        const count = AppState.products.filter(p => p.category === c.id).length;
        const checked = AppState.activeFilter.category === c.id ? "checked" : "";
        return `
          <label class="filter-checkbox-label">
            <span class="checkbox-custom-wrap">
              <input type="radio" name="catFilter" value="${c.id}" ${checked}>
              <span>${c.name}</span>
            </span>
            <span class="filter-count-badge">${count}</span>
          </label>
        `;
      }).join("");

      catList.querySelectorAll("input").forEach(input => {
        input.addEventListener("change", (e) => {
          AppState.activeFilter.category = e.target.value;
          this.filterAndRenderProducts();
        });
      });
    }

    // Brands filter options
    const brandList = document.getElementById("filterBrandsList");
    if (brandList) {
      brandList.innerHTML = TECHPARTS_DATA.brands.map(b => {
        const count = AppState.products.filter(p => p.brand.toLowerCase() === b.toLowerCase()).length;
        const checked = AppState.activeFilter.brands.includes(b) ? "checked" : "";
        return `
          <label class="filter-checkbox-label">
            <span class="checkbox-custom-wrap">
              <input type="checkbox" value="${b}" ${checked}>
              <span>${b}</span>
            </span>
            <span class="filter-count-badge">${count}</span>
          </label>
        `;
      }).join("");

      brandList.querySelectorAll("input").forEach(input => {
        input.addEventListener("change", () => {
          const selected = Array.from(brandList.querySelectorAll("input:checked")).map(i => i.value);
          AppState.activeFilter.brands = selected;
          this.filterAndRenderProducts();
        });
      });
    }

    // In-Stock toggle
    const stockToggle = document.getElementById("filterInStock");
    if (stockToggle) {
      stockToggle.checked = AppState.activeFilter.inStockOnly;
      stockToggle.onchange = (e) => {
        AppState.activeFilter.inStockOnly = e.target.checked;
        this.filterAndRenderProducts();
      };
    }

    // Price slider
    const priceSlider = document.getElementById("priceRangeInput");
    const priceDisplay = document.getElementById("priceRangeDisplay");
    if (priceSlider && priceDisplay) {
      priceSlider.value = AppState.activeFilter.maxPrice;
      priceDisplay.textContent = `Up to $${AppState.activeFilter.maxPrice}`;
      priceSlider.oninput = (e) => {
        AppState.activeFilter.maxPrice = Number(e.target.value);
        priceDisplay.textContent = `Up to $${AppState.activeFilter.maxPrice}`;
        this.filterAndRenderProducts();
      };
    }

    // Sort select
    const sortSelect = document.getElementById("catalogSortSelect");
    if (sortSelect) {
      sortSelect.value = AppState.activeFilter.sort;
      sortSelect.onchange = (e) => {
        AppState.activeFilter.sort = e.target.value;
        this.filterAndRenderProducts();
      };
    }

    // Reset filters button
    const resetBtn = document.getElementById("resetFiltersBtn");
    if (resetBtn) {
      resetBtn.onclick = () => this.resetFilters();
    }

    const emptyResetBtn = document.getElementById("emptyStateResetBtn");
    if (emptyResetBtn) {
      emptyResetBtn.onclick = () => this.resetFilters();
    }
  },

  resetFilters() {
    AppState.activeFilter = {
      search: "",
      category: "all",
      brands: [],
      maxPrice: 1200,
      inStockOnly: false,
      sort: "popular"
    };
    const searchInput = document.getElementById("globalSearchInput");
    if (searchInput) searchInput.value = "";
    this.render();
    showToast("Filters reset to default");
  },

  filterAndRenderProducts() {
    let list = [...AppState.products];

    // Filter by category
    if (AppState.activeFilter.category && AppState.activeFilter.category !== "all") {
      list = list.filter(p => p.category === AppState.activeFilter.category);
    }

    // Filter by search
    if (AppState.activeFilter.search) {
      const q = AppState.activeFilter.search.toLowerCase().trim();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // Filter by brands
    if (AppState.activeFilter.brands.length > 0) {
      list = list.filter(p => AppState.activeFilter.brands.some(b => b.toLowerCase() === p.brand.toLowerCase()));
    }

    // Filter by price
    list = list.filter(p => p.price <= AppState.activeFilter.maxPrice);

    // Filter by stock
    if (AppState.activeFilter.inStockOnly) {
      list = list.filter(p => p.stock > 0);
    }

    // Sorting
    switch (AppState.activeFilter.sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list.reverse();
        break;
      case "popular":
      default:
        list.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    // Update count display
    const countEl = document.getElementById("catalogCount");
    if (countEl) countEl.textContent = list.length;

    // Breadcrumb text
    const catBreadcrumb = document.getElementById("catalogCategoryBreadcrumb");
    if (catBreadcrumb) {
      if (AppState.activeFilter.category !== "all") {
        const catObj = TECHPARTS_DATA.categories.find(c => c.id === AppState.activeFilter.category);
        catBreadcrumb.innerHTML = `<i class="fa-solid fa-chevron-right" style="margin: 0 0.5rem; font-size: 0.7rem;"></i> <span>${catObj ? catObj.name : ''}</span>`;
      } else {
        catBreadcrumb.innerHTML = "";
      }
    }

    // Render filter chips
    this.renderFilterChips();

    // Render grid or empty state
    const grid = document.getElementById("catalogProductsGrid");
    const emptyState = document.getElementById("catalogEmptyState");

    if (list.length === 0) {
      if (grid) grid.style.display = "none";
      if (emptyState) emptyState.style.display = "flex";
    } else {
      if (grid) {
        grid.style.display = "grid";
        grid.innerHTML = list.map(p => renderProductCard(p)).join("");
      }
      if (emptyState) emptyState.style.display = "none";
    }
  },

  renderFilterChips() {
    const container = document.getElementById("activeFilterChips");
    if (!container) return;

    let chipsHtml = "";

    if (AppState.activeFilter.category !== "all") {
      const cat = TECHPARTS_DATA.categories.find(c => c.id === AppState.activeFilter.category);
      chipsHtml += `
        <span class="filter-chip">
          Category: ${cat ? cat.name : AppState.activeFilter.category}
          <i class="fa-solid fa-xmark" onclick="AppState.activeFilter.category='all'; CatalogView.render();"></i>
        </span>
      `;
    }

    if (AppState.activeFilter.search) {
      chipsHtml += `
        <span class="filter-chip">
          "${AppState.activeFilter.search}"
          <i class="fa-solid fa-xmark" onclick="AppState.activeFilter.search=''; document.getElementById('globalSearchInput').value=''; CatalogView.render();"></i>
        </span>
      `;
    }

    AppState.activeFilter.brands.forEach(b => {
      chipsHtml += `
        <span class="filter-chip">
          Brand: ${b}
          <i class="fa-solid fa-xmark" onclick="AppState.activeFilter.brands=AppState.activeFilter.brands.filter(x=>x!=='${b}'); CatalogView.render();"></i>
        </span>
      `;
    });

    if (AppState.activeFilter.maxPrice < 1200) {
      chipsHtml += `
        <span class="filter-chip">
          Max: $${AppState.activeFilter.maxPrice}
          <i class="fa-solid fa-xmark" onclick="AppState.activeFilter.maxPrice=1200; CatalogView.render();"></i>
        </span>
      `;
    }

    if (AppState.activeFilter.inStockOnly) {
      chipsHtml += `
        <span class="filter-chip">
          In Stock Only
          <i class="fa-solid fa-xmark" onclick="AppState.activeFilter.inStockOnly=false; CatalogView.render();"></i>
        </span>
      `;
    }

    container.innerHTML = chipsHtml;
  }
};

// --- Product Details View ---
const ProductDetailsView = {
  currentProduct: null,
  selectedQuantity: 1,

  render(productId) {
    const product = AppState.products.find(p => p.id === productId) || AppState.products[0];
    if (!product) return;
    this.currentProduct = product;
    this.selectedQuantity = 1;

    // Breadcrumbs
    const cat = TECHPARTS_DATA.categories.find(c => c.id === product.category);
    const breadcrumbs = document.getElementById("pdpBreadcrumbs");
    if (breadcrumbs) {
      breadcrumbs.innerHTML = `
        <a href="#home">Home</a>
        <i class="fa-solid fa-chevron-right"></i>
        <a href="#products">Products</a>
        <i class="fa-solid fa-chevron-right"></i>
        <a href="#products?category=${product.category}">${cat ? cat.name : product.category}</a>
        <i class="fa-solid fa-chevron-right"></i>
        <span>${product.name}</span>
      `;
    }

    // Images
    const mainImg = document.getElementById("pdpMainImg");
    if (mainImg) {
      mainImg.src = product.images[0];
      mainImg.alt = product.name;
    }

    const thumbsRow = document.getElementById("pdpThumbsRow");
    if (thumbsRow) {
      thumbsRow.innerHTML = product.images.map((img, idx) => `
        <div class="pdp-thumb ${idx === 0 ? 'active' : ''}" onclick="ProductDetailsView.switchImage('${img}', this)">
          <img src="${img}" alt="Thumbnail ${idx + 1}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=120&q=80'">
        </div>
      `).join("");
    }

    // Basic Info
    document.getElementById("pdpBrand").textContent = product.brand;
    document.getElementById("pdpSku").textContent = `SKU: ${product.id.toUpperCase()}-TP`;
    document.getElementById("pdpTitle").textContent = product.name;
    document.getElementById("pdpRatingScore").textContent = product.rating.toFixed(1);
    document.getElementById("pdpReviewCount").textContent = `(${product.reviewCount} customer reviews)`;
    document.getElementById("pdpStars").innerHTML = renderStars(product.rating);

    const stockBadge = document.getElementById("pdpStockBadge");
    if (stockBadge) {
      stockBadge.className = product.stock <= 10 ? "pdp-stock-status stock-low" : "pdp-stock-status stock-in";
      stockBadge.textContent = product.stock <= 10 ? `Low Stock - Only ${product.stock} units remaining` : `In Stock - ${product.stock} units available`;
    }

    document.getElementById("pdpCurrentPrice").textContent = `$${product.price.toFixed(2)}`;
    const origPriceEl = document.getElementById("pdpOriginalPrice");
    const saveBadgeEl = document.getElementById("pdpSaveBadge");
    if (product.originalPrice) {
      origPriceEl.style.display = "inline";
      origPriceEl.textContent = `$${product.originalPrice.toFixed(2)}`;
      const savedAmount = (product.originalPrice - product.price).toFixed(2);
      saveBadgeEl.style.display = "inline";
      saveBadgeEl.textContent = `Save $${savedAmount}`;
    } else {
      origPriceEl.style.display = "none";
      saveBadgeEl.style.display = "none";
    }

    document.getElementById("pdpDescription").textContent = product.description;
    document.getElementById("pdpAvailableText").textContent = `Limit 5 units per customer`;

    // Quantity Input Setup
    const qtyInput = document.getElementById("pdpQtyInput");
    qtyInput.value = "1";
    document.getElementById("pdpQtyDec").onclick = () => {
      if (this.selectedQuantity > 1) {
        this.selectedQuantity--;
        qtyInput.value = this.selectedQuantity;
      }
    };
    document.getElementById("pdpQtyInc").onclick = () => {
      if (this.selectedQuantity < Math.min(5, product.stock)) {
        this.selectedQuantity++;
        qtyInput.value = this.selectedQuantity;
      }
    };

    // Action Buttons
    document.getElementById("pdpAddToCartBtn").onclick = () => {
      CartController.add(product.id, this.selectedQuantity);
    };

    document.getElementById("pdpBuyNowBtn").onclick = () => {
      CartController.add(product.id, this.selectedQuantity);
      window.location.hash = "#checkout";
    };

    const wishlistBtn = document.getElementById("pdpWishlistBtn");
    if (wishlistBtn) {
      const isWishlisted = AppState.wishlist.includes(product.id);
      wishlistBtn.className = `pdp-wishlist-btn ${isWishlisted ? 'active' : ''}`;
      wishlistBtn.innerHTML = `<i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>`;
      wishlistBtn.onclick = () => {
        WishlistController.toggle(product.id);
        const active = AppState.wishlist.includes(product.id);
        wishlistBtn.className = `pdp-wishlist-btn ${active ? 'active' : ''}`;
        wishlistBtn.innerHTML = `<i class="${active ? 'fa-solid' : 'fa-regular'} fa-heart"></i>`;
      };
    }

    // Specifications Table
    const specsTable = document.getElementById("pdpSpecsTable");
    if (specsTable) {
      if (product.specs && Object.keys(product.specs).length > 0) {
        specsTable.innerHTML = Object.entries(product.specs).map(([k, v]) => `
          <tr>
            <td class="spec-key">${k}</td>
            <td class="spec-val">${v}</td>
          </tr>
        `).join("");
      } else {
        specsTable.innerHTML = `<tr><td colspan="2">Specifications available upon request from manufacturer.</td></tr>`;
      }
    }

    // Customer Reviews
    this.renderReviews(product.id);

    // Related Products
    const relatedGrid = document.getElementById("pdpRelatedGrid");
    if (relatedGrid) {
      const related = AppState.products
        .filter(p => p.id !== product.id && p.category === product.category)
        .slice(0, 4);

      if (related.length === 0) {
        related.push(...AppState.products.filter(p => p.id !== product.id).slice(0, 4));
      }

      relatedGrid.innerHTML = related.map(p => renderProductCard(p)).join("");
    }

    // Tab buttons handling
    document.querySelectorAll(".pdp-tab-btn").forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll(".pdp-tab-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".pdp-tab-pane").forEach(p => p.classList.remove("active"));
        btn.classList.add("active");
        const tab = btn.getAttribute("data-tab");
        if (tab === "specs") document.getElementById("pdpPaneSpecs").classList.add("active");
        if (tab === "reviews") document.getElementById("pdpPaneReviews").classList.add("active");
      };
    });
  },

  switchImage(src, thumbEl) {
    document.getElementById("pdpMainImg").src = src;
    document.querySelectorAll(".pdp-thumb").forEach(t => t.classList.remove("active"));
    thumbEl.classList.add("active");
  },

  renderReviews(productId) {
    const list = AppState.reviews.filter(r => r.productId === productId);
    const countEl = document.getElementById("pdpTabReviewCount");
    if (countEl) countEl.textContent = list.length;

    const reviewsList = document.getElementById("pdpReviewsList");
    if (reviewsList) {
      if (list.length === 0) {
        reviewsList.innerHTML = `<div style="padding: 1.5rem; text-align: center; color: var(--text-muted);">No reviews written for this product yet. Be the first to share your experience!</div>`;
      } else {
        reviewsList.innerHTML = list.map(r => `
          <div class="review-item">
            <div class="review-user-row">
              <div class="review-author-wrap">
                <img src="${r.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'}" class="review-avatar" alt="${r.author}">
                <div>
                  <div class="review-author-name">${r.author}</div>
                  ${r.verified ? '<div class="review-verified-tag"><i class="fa-solid fa-circle-check"></i> Verified Purchase</div>' : ''}
                </div>
              </div>
              <div class="review-date">${r.date}</div>
            </div>
            <div class="rating-stars" style="margin-bottom: 0.35rem;">
              ${renderStars(r.rating)}
            </div>
            <h4 class="review-title">${r.title}</h4>
            <p class="review-text">${r.comment}</p>
          </div>
        `).join("");
      }
    }

    // Toggle Write Review Form
    const openReviewBtn = document.getElementById("openAddReviewBtn");
    const reviewFormWrap = document.getElementById("addReviewFormContainer");
    if (openReviewBtn && reviewFormWrap) {
      openReviewBtn.onclick = () => {
        reviewFormWrap.style.display = reviewFormWrap.style.display === "none" ? "block" : "none";
        if (reviewFormWrap.style.display === "block") {
          reviewFormWrap.scrollIntoView({ behavior: "smooth" });
        }
      };
    }

    // Handle Form Submit
    const form = document.getElementById("addReviewForm");
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const author = document.getElementById("reviewAuthorInput").value.trim();
        const rating = Number(document.getElementById("reviewRatingInput").value);
        const title = document.getElementById("reviewTitleInput").value.trim();
        const comment = document.getElementById("reviewTextInput").value.trim();

        const newReview = {
          productId,
          author: author || "Anonymous Builder",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
          rating,
          date: "Just now",
          verified: true,
          title,
          comment
        };

        AppState.reviews.unshift(newReview);
        // Also increment product review count
        const prod = AppState.products.find(p => p.id === productId);
        if (prod) {
          prod.reviewCount++;
          AppState.saveAll();
        }

        form.reset();
        reviewFormWrap.style.display = "none";
        this.renderReviews(productId);
        showToast("Review submitted successfully! Thank you for your feedback.");
      };
    }
  }
};

// --- Cart View & Drawer ---
const CartView = {
  render() {
    const listContainer = document.getElementById("cartItemsList");
    const emptyState = document.getElementById("cartEmptyState");
    const contentWrap = document.getElementById("cartContentWrapper");

    if (AppState.cart.length === 0) {
      if (contentWrap) contentWrap.style.display = "none";
      if (emptyState) emptyState.style.display = "flex";
      return;
    }

    if (contentWrap) contentWrap.style.display = "grid";
    if (emptyState) emptyState.style.display = "none";

    if (listContainer) {
      listContainer.innerHTML = AppState.cart.map(item => `
        <div class="cart-item-row" data-id="${item.id}">
          <img src="${item.image}" class="cart-item-thumb" alt="${item.name}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=150&q=80'">
          <div class="cart-item-info">
            <span class="cart-item-brand">${item.brand}</span>
            <h4>${item.name}</h4>
            <div style="font-size: 0.85rem; color: var(--text-muted);">Item Price: $${item.price.toFixed(2)}</div>
          </div>
          <div class="qty-picker">
            <button type="button" class="qty-btn" onclick="CartController.updateQuantity('${item.id}', ${item.quantity - 1})"><i class="fa-solid fa-minus"></i></button>
            <input type="text" class="qty-input" value="${item.quantity}" readonly>
            <button type="button" class="qty-btn" onclick="CartController.updateQuantity('${item.id}', ${item.quantity + 1})"><i class="fa-solid fa-plus"></i></button>
          </div>
          <div class="cart-item-price">
            $${(item.price * item.quantity).toFixed(2)}
          </div>
          <button type="button" class="cart-item-remove-btn" onclick="CartController.remove('${item.id}')" title="Remove Item">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      `).join("");
    }

    this.calculateTotals();

    // Promo code input handler
    const applyBtn = document.getElementById("cartPromoApplyBtn");
    const promoInput = document.getElementById("cartPromoInput");
    if (applyBtn && promoInput) {
      applyBtn.onclick = () => {
        const code = promoInput.value.trim().toUpperCase();
        if (code === "TECH10") {
          AppState.promo = { code: "TECH10", discountPercent: 10 };
          this.calculateTotals();
          showToast("Promo code applied: 10% discount deducted!");
        } else if (code === "BUILDPC") {
          AppState.promo = { code: "BUILDPC", discountAmount: 25 };
          this.calculateTotals();
          showToast("Promo code applied: $25 discount deducted!");
        } else {
          showToast("Invalid promo code. Try TECH10", "error");
        }
      };
    }

    const clearBtn = document.getElementById("clearCartBtn");
    if (clearBtn) {
      clearBtn.onclick = () => {
        if (confirm("Are you sure you want to empty your cart?")) {
          AppState.cart = [];
          AppState.saveAll();
          AppState.updateBadges();
          this.render();
          showToast("Shopping cart cleared");
        }
      };
    }
  },

  calculateTotals() {
    const subtotal = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discount = 0;

    if (AppState.promo) {
      if (AppState.promo.discountPercent) {
        discount = subtotal * (AppState.promo.discountPercent / 100);
      } else if (AppState.promo.discountAmount) {
        discount = Math.min(subtotal, AppState.promo.discountAmount);
      }
    }

    const shipping = subtotal > 100 || subtotal === 0 ? 0 : 15.00;
    const taxableAmount = Math.max(0, subtotal - discount);
    const tax = taxableAmount * 0.08;
    const total = taxableAmount + shipping + tax;

    document.getElementById("cartSubtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("cartDiscount").textContent = `-$${discount.toFixed(2)}`;
    document.getElementById("cartShipping").textContent = shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`;
    document.getElementById("cartTax").textContent = `$${tax.toFixed(2)}`;
    document.getElementById("cartTotal").textContent = `$${total.toFixed(2)}`;

    return { subtotal, discount, shipping, tax, total };
  }
};

// --- Cart Drawer Controller ---
const DrawerController = {
  open() {
    const drawer = document.getElementById("cartDrawer");
    const backdrop = document.getElementById("cartDrawerBackdrop");
    this.render();
    if (drawer) drawer.classList.add("active");
    if (backdrop) backdrop.classList.add("active");
  },

  close() {
    const drawer = document.getElementById("cartDrawer");
    const backdrop = document.getElementById("cartDrawerBackdrop");
    if (drawer) drawer.classList.remove("active");
    if (backdrop) backdrop.classList.remove("active");
  },

  render() {
    const list = document.getElementById("drawerItemsList");
    const subtotalEl = document.getElementById("drawerSubtotal");
    if (!list) return;

    if (AppState.cart.length === 0) {
      list.innerHTML = `<div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);"><i class="fa-solid fa-cart-shopping" style="font-size: 2.5rem; margin-bottom: 0.8rem; color: #cbd5e1;"></i><p>Your shopping cart is empty</p></div>`;
      if (subtotalEl) subtotalEl.textContent = "$0.00";
      return;
    }

    list.innerHTML = AppState.cart.map(item => `
      <div style="display: flex; gap: 0.85rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-light); align-items: center;">
        <img src="${item.image}" style="width: 54px; height: 54px; object-fit: contain; background: #f8fafc; border-radius: 6px; padding: 4px; border: 1px solid var(--border-color);" alt="${item.name}">
        <div style="flex: 1; min-width: 0;">
          <h5 style="font-size: 0.88rem; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.name}</h5>
          <div style="font-size: 0.78rem; color: var(--text-muted);">$${item.price.toFixed(2)} × ${item.quantity}</div>
          <div style="font-size: 0.9rem; font-weight: 800; color: var(--primary);">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
        <button type="button" onclick="CartController.remove('${item.id}')" style="color: var(--text-muted); font-size: 0.9rem;" title="Remove">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </div>
    `).join("");

    const subtotal = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  }
};

// --- Cart Actions Controller ---
const CartController = {
  add(productId, quantity = 1) {
    const product = AppState.products.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = AppState.cart.findIndex(i => i.id === productId);
    if (existingIndex > -1) {
      AppState.cart[existingIndex].quantity += quantity;
    } else {
      AppState.cart.push({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        quantity
      });
    }

    AppState.saveAll();
    AppState.updateBadges();
    DrawerController.open();
    showToast(`Added "${product.name}" to cart!`);
  },

  updateQuantity(productId, newQty) {
    if (newQty <= 0) {
      this.remove(productId);
      return;
    }
    const item = AppState.cart.find(i => i.id === productId);
    if (item) {
      item.quantity = newQty;
      AppState.saveAll();
      AppState.updateBadges();
      CartView.render();
      DrawerController.render();
    }
  },

  remove(productId) {
    AppState.cart = AppState.cart.filter(i => i.id !== productId);
    AppState.saveAll();
    AppState.updateBadges();
    CartView.render();
    DrawerController.render();
    showToast("Item removed from cart");
  }
};

// --- Wishlist Controller ---
const WishlistController = {
  toggle(productId) {
    const index = AppState.wishlist.indexOf(productId);
    const product = AppState.products.find(p => p.id === productId);
    const prodName = product ? product.name : "Item";

    if (index > -1) {
      AppState.wishlist.splice(index, 1);
      showToast(`Removed "${prodName}" from wishlist`);
    } else {
      AppState.wishlist.push(productId);
      showToast(`Saved "${prodName}" to wishlist!`);
    }

    AppState.saveAll();
    AppState.updateBadges();

    // Re-render wherever relevant
    if (window.location.hash.includes("products")) {
      CatalogView.filterAndRenderProducts();
    }
    if (window.location.hash.includes("profile")) {
      ProfileView.render("wishlist");
    }
  }
};

// --- Quick View Controller ---
const QuickViewController = {
  open(productId) {
    const product = AppState.products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById("quickViewModal");
    const body = document.getElementById("qvBody");
    const title = document.getElementById("qvTitle");

    title.textContent = product.name;
    body.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
        <div style="aspect-ratio: 1/1; background: #f8fafc; border-radius: 12px; display: flex; align-items: center; justify-content: center; padding: 1rem; border: 1px solid var(--border-color);">
          <img src="${product.images[0]}" alt="${product.name}" style="max-height: 240px; object-fit: contain;">
        </div>
        <div>
          <span style="font-size: 0.8rem; font-weight: 700; color: var(--primary); text-transform: uppercase;">${product.brand}</span>
          <h3 style="font-size: 1.35rem; font-weight: 800; margin: 0.3rem 0 0.6rem;">${product.name}</h3>
          <div style="display: flex; align-items: baseline; gap: 0.75rem; margin-bottom: 0.85rem;">
            <span style="font-size: 1.5rem; font-weight: 800;">$${product.price.toFixed(2)}</span>
            ${product.originalPrice ? `<span style="text-decoration: line-through; color: var(--text-muted);">$${product.originalPrice.toFixed(2)}</span>` : ''}
          </div>
          <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 1.5rem;">${product.description}</p>
          <div style="display: flex; gap: 0.75rem;">
            <button type="button" class="btn-primary" style="flex: 1; justify-content: center;" onclick="CartController.add('${product.id}', 1); QuickViewController.close();">
              <i class="fa-solid fa-cart-shopping"></i> Add to Cart
            </button>
            <a href="#product-details?id=${product.id}" class="btn-secondary" style="color: var(--text-main); border-color: var(--border-color);" onclick="QuickViewController.close();">
              Full Details
            </a>
          </div>
        </div>
      </div>
    `;

    modal.classList.add("active");
  },

  close() {
    const modal = document.getElementById("quickViewModal");
    if (modal) modal.classList.remove("active");
  }
};

// --- Checkout View ---
const CheckoutView = {
  selectedPayment: "card",

  render() {
    if (AppState.cart.length === 0) {
      window.location.hash = "#cart";
      return;
    }

    // Populate user details if available
    if (AppState.user) {
      const emailInput = document.getElementById("checkoutEmail");
      const phoneInput = document.getElementById("checkoutPhone");
      const nameInput = document.getElementById("checkoutFullName");
      const streetInput = document.getElementById("checkoutStreet");
      const cityInput = document.getElementById("checkoutCity");
      const stateInput = document.getElementById("checkoutState");
      const zipInput = document.getElementById("checkoutZip");

      if (emailInput && !emailInput.value) emailInput.value = AppState.user.email || "";
      if (phoneInput && !phoneInput.value) phoneInput.value = AppState.user.phone || "";
      if (nameInput && !nameInput.value) nameInput.value = AppState.user.name || "";

      if (AppState.user.addresses && AppState.user.addresses.length > 0) {
        const defAddr = AppState.user.addresses.find(a => a.isDefault) || AppState.user.addresses[0];
        if (streetInput && !streetInput.value) streetInput.value = defAddr.street;
        if (cityInput && !cityInput.value) cityInput.value = defAddr.city;
        if (stateInput && !stateInput.value) stateInput.value = defAddr.state;
        if (zipInput && !zipInput.value) zipInput.value = defAddr.zip;
      }
    }

    // Render Order Items Preview
    const itemsContainer = document.getElementById("checkoutItemsList");
    const countEl = document.getElementById("checkoutItemCount");
    const totalQty = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
    if (countEl) countEl.textContent = totalQty;

    if (itemsContainer) {
      itemsContainer.innerHTML = AppState.cart.map(item => `
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.85rem; font-size: 0.88rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem; min-width: 0;">
            <img src="${item.image}" style="width: 42px; height: 42px; object-fit: contain; background: #f8fafc; border-radius: 6px; padding: 2px; border: 1px solid var(--border-color);" alt="${item.name}">
            <div style="min-width: 0;">
              <div style="font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 170px;">${item.name}</div>
              <div style="color: var(--text-muted); font-size: 0.78rem;">Qty: ${item.quantity}</div>
            </div>
          </div>
          <strong style="color: var(--text-main);">$${(item.price * item.quantity).toFixed(2)}</strong>
        </div>
      `).join("");
    }

    // Totals Calculation
    const subtotal = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = AppState.promo ? subtotal * 0.1 : 0;
    const taxable = Math.max(0, subtotal - discount);
    const tax = taxable * 0.08;
    const total = taxable + tax;

    document.getElementById("checkoutSubtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("checkoutDiscount").textContent = `-$${discount.toFixed(2)}`;
    document.getElementById("checkoutTax").textContent = `$${tax.toFixed(2)}`;
    document.getElementById("checkoutTotal").textContent = `$${total.toFixed(2)}`;

    // Payment Tiles selection
    document.querySelectorAll(".payment-method-tile").forEach(tile => {
      tile.onclick = () => {
        document.querySelectorAll(".payment-method-tile").forEach(t => t.classList.remove("selected"));
        tile.classList.add("selected");
        this.selectedPayment = tile.getAttribute("data-method");

        document.getElementById("paymentPaneCard").style.display = this.selectedPayment === "card" ? "block" : "none";
        document.getElementById("paymentPaneUpi").style.display = this.selectedPayment === "upi" ? "block" : "none";
        document.getElementById("paymentPaneCod").style.display = this.selectedPayment === "cod" ? "block" : "none";
      };
    });

    // Interactive Credit Card inputs
    const cardNumInput = document.getElementById("cardInputNumber");
    const cardNameInput = document.getElementById("cardInputName");
    const cardExpInput = document.getElementById("cardInputExpiry");

    if (cardNumInput) {
      cardNumInput.oninput = (e) => {
        let val = e.target.value.replace(/\D/g, "").substring(0, 16);
        val = val != "" ? val.match(/.{1,4}/g).join(" ") : "";
        e.target.value = val;
        document.getElementById("visualCardNum").textContent = val || "•••• •••• •••• 4242";
      };
    }
    if (cardNameInput) {
      cardNameInput.oninput = (e) => {
        document.getElementById("visualCardName").textContent = e.target.value.toUpperCase() || "ALEX TURNER";
      };
    }
    if (cardExpInput) {
      cardExpInput.oninput = (e) => {
        document.getElementById("visualCardExp").textContent = e.target.value || "12/28";
      };
    }

    // Place Order Form Submission
    const checkoutForm = document.getElementById("checkoutForm");
    if (checkoutForm) {
      checkoutForm.onsubmit = (e) => {
        e.preventDefault();
        this.placeOrder();
      };
    }
  },

  placeOrder() {
    const fullName = document.getElementById("checkoutFullName").value.trim();
    const street = document.getElementById("checkoutStreet").value.trim();
    const city = document.getElementById("checkoutCity").value.trim();
    const state = document.getElementById("checkoutState").value.trim();
    const zip = document.getElementById("checkoutZip").value.trim();

    const orderId = `TP-${Math.floor(10000 + Math.random() * 90000)}`;
    const trackingId = `FEDEX-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const subtotal = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = AppState.promo ? subtotal * 0.1 : 0;
    const total = (subtotal - discount) * 1.08;

    const paymentLabels = {
      card: "Credit/Debit Card (Visa ending in 4242)",
      upi: "UPI Instant Payment",
      cod: "Cash on Delivery"
    };

    const newOrder = {
      id: orderId,
      date: new Date().toISOString().split("T")[0],
      status: "Processing",
      total: Number(total.toFixed(2)),
      paymentMethod: paymentLabels[this.selectedPayment] || "Credit Card",
      deliveryAddress: `${street}, ${city}, ${state} ${zip}`,
      trackingNumber: trackingId,
      items: [...AppState.cart]
    };

    AppState.orders.unshift(newOrder);
    AppState.cart = [];
    AppState.saveAll();
    AppState.updateBadges();

    // Show Success Modal
    document.getElementById("successOrderId").textContent = orderId;
    document.getElementById("successTrackingId").textContent = trackingId;
    document.getElementById("orderSuccessModal").classList.add("active");

    showToast(`Order #${orderId} confirmed successfully!`);
  }
};

// --- Profile View ---
const ProfileView = {
  render(activeTab = "orders") {
    if (!AppState.user) {
      window.location.hash = "#login";
      return;
    }

    // Set user header details
    document.getElementById("profileUserName").textContent = AppState.user.name;
    document.getElementById("profileUserEmail").textContent = AppState.user.email;
    document.getElementById("profileUserAvatar").src = AppState.user.avatar;

    // Switch tab
    document.querySelectorAll(".profile-nav-item").forEach(item => {
      const tab = item.getAttribute("data-tab");
      if (tab === activeTab) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
      item.onclick = () => {
        if (tab) {
          window.location.hash = `#profile?tab=${tab}`;
        }
      };
    });

    document.querySelectorAll(".profile-pane").forEach(p => p.style.display = "none");

    switch (activeTab) {
      case "wishlist":
        document.getElementById("profilePaneWishlist").style.display = "block";
        this.renderWishlist();
        break;
      case "addresses":
        document.getElementById("profilePaneAddresses").style.display = "block";
        this.renderAddresses();
        break;
      case "personal":
        document.getElementById("profilePanePersonal").style.display = "block";
        this.renderPersonalInfo();
        break;
      case "orders":
      default:
        document.getElementById("profilePaneOrders").style.display = "block";
        this.renderOrders();
        break;
    }

    // Sign out button
    const logoutBtn = document.getElementById("profileLogoutBtn");
    if (logoutBtn) {
      logoutBtn.onclick = () => {
        showToast("Logged out of TechParts");
        window.location.hash = "#home";
      };
    }
  },

  renderOrders() {
    const container = document.getElementById("profileOrdersList");
    if (!container) return;

    if (AppState.orders.length === 0) {
      container.innerHTML = `<div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);"><i class="fa-solid fa-box-open" style="font-size: 2.5rem; margin-bottom: 0.8rem; color: #cbd5e1;"></i><p>No orders placed yet.</p></div>`;
      return;
    }

    container.innerHTML = AppState.orders.map(order => {
      const statusClass = order.status.toLowerCase() === "delivered" ? "status-delivered" : order.status.toLowerCase() === "shipped" ? "status-shipped" : "status-processing";

      const isDelivered = order.status.toLowerCase() === "delivered";
      const isShipped = isDelivered || order.status.toLowerCase() === "shipped";
      const isProcessing = true;

      return `
        <div class="order-card">
          <div class="order-top-row">
            <div>
              <span class="order-id-badge">${order.id}</span>
              <span style="font-size: 0.82rem; color: var(--text-muted); margin-left: 0.6rem;">Placed on ${order.date}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span class="order-status-pill ${statusClass}">${order.status}</span>
              <strong style="font-size: 1.15rem; color: var(--text-main);">$${order.total.toFixed(2)}</strong>
            </div>
          </div>

          <!-- Order Tracking Stepper -->
          <div class="tracking-stepper">
            <div class="stepper-step completed">
              <div class="step-circle"><i class="fa-solid fa-check"></i></div>
              <span>Confirmed</span>
            </div>
            <div class="stepper-step ${isProcessing ? 'completed' : ''}">
              <div class="step-circle"><i class="fa-solid ${isProcessing ? 'fa-check' : 'fa-gear'}"></i></div>
              <span>Processing</span>
            </div>
            <div class="stepper-step ${isShipped ? 'completed' : ''}">
              <div class="step-circle"><i class="fa-solid ${isShipped ? 'fa-check' : 'fa-truck-fast'}"></i></div>
              <span>Shipped</span>
            </div>
            <div class="stepper-step ${isDelivered ? 'completed' : ''}">
              <div class="step-circle"><i class="fa-solid ${isDelivered ? 'fa-check' : 'fa-box-open'}"></i></div>
              <span>Delivered</span>
            </div>
          </div>

          <!-- Items list -->
          <div class="order-items-preview">
            ${order.items.map(item => `
              <div class="order-item-inline">
                <img src="${item.image}" class="order-item-thumb" alt="${item.name}">
                <div style="flex: 1; min-width: 0;">
                  <div style="font-size: 0.92rem; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.name}</div>
                  <div style="font-size: 0.8rem; color: var(--text-muted);">Qty: ${item.quantity} · $${item.price.toFixed(2)} each</div>
                </div>
                <button type="button" class="btn-secondary" style="padding: 0.4rem 0.75rem; font-size: 0.8rem; color: var(--text-main); border-color: var(--border-color); background: var(--bg-surface-alt);" onclick="window.location.hash='#product-details?id=${item.id}'">
                  Buy Again
                </button>
              </div>
            `).join("")}
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; font-size: 0.85rem; color: var(--text-muted);">
            <div>
              <i class="fa-solid fa-location-dot"></i> Delivery: <strong>${order.deliveryAddress}</strong>
            </div>
            <div>
              <i class="fa-solid fa-barcode"></i> Tracking: <strong style="font-family: var(--font-mono); color: var(--primary);">${order.trackingNumber}</strong>
            </div>
          </div>
        </div>
      `;
    }).join("");
  },

  renderWishlist() {
    const grid = document.getElementById("profileWishlistGrid");
    const countEl = document.getElementById("profileWishlistCount");
    if (!grid) return;

    const items = AppState.products.filter(p => AppState.wishlist.includes(p.id));
    if (countEl) countEl.textContent = items.length;

    if (items.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);"><i class="fa-regular fa-heart" style="font-size: 2.5rem; margin-bottom: 0.8rem; color: #cbd5e1;"></i><p>Your wishlist is currently empty.</p><a href="#products" class="btn-primary" style="margin-top: 1rem; display: inline-flex;">Explore Components</a></div>`;
      return;
    }

    grid.innerHTML = items.map(p => renderProductCard(p)).join("");
  },

  renderAddresses() {
    const grid = document.getElementById("profileAddressesGrid");
    if (!grid || !AppState.user.addresses) return;

    grid.innerHTML = AppState.user.addresses.map(addr => `
      <div class="address-box ${addr.isDefault ? 'default' : ''}">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <h4 style="font-size: 1rem; font-weight: 800;">${addr.label}</h4>
          ${addr.isDefault ? '<span class="announcement-badge" style="background: var(--primary);">Default</span>' : ''}
        </div>
        <div style="font-size: 0.9rem; line-height: 1.5; color: var(--text-secondary);">
          <div><strong>${addr.name}</strong></div>
          <div>${addr.street}</div>
          <div>${addr.city}, ${addr.state} ${addr.zip}</div>
          <div style="margin-top: 0.35rem; color: var(--text-muted);">${addr.phone}</div>
        </div>
      </div>
    `).join("");
  },

  renderPersonalInfo() {
    document.getElementById("profileEditName").value = AppState.user.name;
    document.getElementById("profileEditEmail").value = AppState.user.email;
    document.getElementById("profileEditPhone").value = AppState.user.phone || "";

    const form = document.getElementById("profilePersonalForm");
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        AppState.user.name = document.getElementById("profileEditName").value.trim();
        AppState.user.email = document.getElementById("profileEditEmail").value.trim();
        AppState.user.phone = document.getElementById("profileEditPhone").value.trim();
        AppState.saveAll();
        document.getElementById("profileUserName").textContent = AppState.user.name;
        document.getElementById("profileUserEmail").textContent = AppState.user.email;
        showToast("Profile details updated successfully!");
      };
    }
  }
};

// --- Auth View ---
const AuthView = {
  isSignup: false,

  render(isSignup = false) {
    this.isSignup = isSignup;
    const tabLogin = document.getElementById("authTabLogin");
    const tabSignup = document.getElementById("authTabSignup");
    const nameGroup = document.getElementById("authNameGroup");
    const confirmGroup = document.getElementById("authConfirmGroup");
    const submitBtn = document.getElementById("authSubmitBtn");
    const heading = document.getElementById("authHeading");
    const subheading = document.getElementById("authSubheading");

    if (isSignup) {
      tabLogin.classList.remove("active");
      tabSignup.classList.add("active");
      nameGroup.style.display = "block";
      confirmGroup.style.display = "block";
      submitBtn.textContent = "Create TechParts Account";
      heading.textContent = "Join TechParts";
      subheading.textContent = "Build your dream PC with member perks and exclusive deals.";
    } else {
      tabLogin.classList.add("active");
      tabSignup.classList.remove("active");
      nameGroup.style.display = "none";
      confirmGroup.style.display = "none";
      submitBtn.textContent = "Sign In to TechParts";
      heading.textContent = "Welcome Back";
      subheading.textContent = "Access your TechParts account, track orders, and sync wishlists.";
    }

    tabLogin.onclick = () => this.render(false);
    tabSignup.onclick = () => this.render(true);

    // Google one-click simulation
    const googleBtn = document.getElementById("googleLoginBtn");
    if (googleBtn) {
      googleBtn.onclick = () => {
        AppState.user = { ...TECHPARTS_DATA.defaultUser };
        AppState.saveAll();
        showToast("Signed in with Google!");
        window.location.hash = "#profile";
      };
    }

    // Submit form simulation
    const authForm = document.getElementById("authForm");
    if (authForm) {
      authForm.onsubmit = (e) => {
        e.preventDefault();
        const email = document.getElementById("authEmailInput").value.trim();
        const name = this.isSignup ? document.getElementById("authNameInput").value.trim() : "Alex Turner";

        AppState.user = {
          ...TECHPARTS_DATA.defaultUser,
          name: name || "Alex Turner",
          email: email || "alex.turner@techparts.dev"
        };
        AppState.saveAll();
        showToast(this.isSignup ? "Account created successfully!" : "Signed in successfully!");
        window.location.hash = "#profile";
      };
    }
  }
};

// --- Admin Dashboard View ---
const AdminView = {
  render() {
    this.renderKPIs();
    this.renderProductsTable();
    this.renderOrdersTable();

    // Tab switcher
    document.querySelectorAll(".admin-tab-btn").forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll(".admin-tab-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".admin-pane").forEach(p => p.style.display = "none");
        btn.classList.add("active");
        const tab = btn.getAttribute("data-tab");
        if (tab === "products") document.getElementById("adminPaneProducts").style.display = "block";
        if (tab === "orders") document.getElementById("adminPaneOrders").style.display = "block";
        if (tab === "customers") document.getElementById("adminPaneCustomers").style.display = "block";
      };
    });

    // Add product button
    const addBtn = document.getElementById("adminAddNewProdBtn");
    if (addBtn) {
      addBtn.onclick = () => this.openProductModal();
    }
  },

  renderKPIs() {
    const totalRevenue = AppState.orders.reduce((sum, o) => sum + o.total, 48920.50);
    const totalOrders = AppState.orders.length + 140;

    document.getElementById("adminKpiRevenue").textContent = `$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
    document.getElementById("adminKpiOrders").textContent = totalOrders;
    document.getElementById("adminKpiProducts").textContent = AppState.products.length;
    document.getElementById("adminKpiCustomers").textContent = "92";
  },

  renderProductsTable() {
    const tbody = document.getElementById("adminProductsTableBody");
    if (!tbody) return;

    tbody.innerHTML = AppState.products.map(p => `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 0.85rem;">
            <img src="${p.images[0]}" class="admin-item-thumb" alt="${p.name}">
            <div>
              <div style="font-weight: 700; color: var(--text-main);">${p.name}</div>
              <div style="font-size: 0.78rem; color: var(--text-muted); font-family: var(--font-mono);">${p.id}</div>
            </div>
          </div>
        </td>
        <td><span class="announcement-badge" style="background: var(--bg-surface-alt); color: var(--text-main); border: 1px solid var(--border-color);">${p.category.toUpperCase()}</span></td>
        <td><strong>${p.brand}</strong></td>
        <td><strong>$${p.price.toFixed(2)}</strong></td>
        <td>
          <span style="font-weight: 700; color: ${p.stock <= 10 ? 'var(--warning)' : 'var(--success)'};">
            ${p.stock} in stock
          </span>
        </td>
        <td>★ ${p.rating.toFixed(1)} (${p.reviewCount})</td>
        <td style="text-align: right;">
          <button type="button" class="action-icon-btn" onclick="AdminView.openProductModal('${p.id}')" title="Edit Component">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button type="button" class="action-icon-btn delete-btn" onclick="AdminView.deleteProduct('${p.id}')" title="Delete Component">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </td>
      </tr>
    `).join("");
  },

  renderOrdersTable() {
    const tbody = document.getElementById("adminOrdersTableBody");
    if (!tbody) return;

    tbody.innerHTML = AppState.orders.map(order => `
      <tr>
        <td><strong style="font-family: var(--font-mono); color: var(--primary);">${order.id}</strong></td>
        <td>${order.date}</td>
        <td>${AppState.user ? AppState.user.name : "Alex Turner"}</td>
        <td>${order.items.length} items</td>
        <td><strong>$${order.total.toFixed(2)}</strong></td>
        <td>
          <select onchange="AdminView.updateOrderStatus('${order.id}', this.value)" style="border: 1px solid var(--border-color); border-radius: 6px; padding: 0.3rem 0.5rem; font-size: 0.85rem; font-weight: 700;">
            <option value="Processing" ${order.status === "Processing" ? "selected" : ""}>Processing</option>
            <option value="Shipped" ${order.status === "Shipped" ? "selected" : ""}>Shipped</option>
            <option value="Delivered" ${order.status === "Delivered" ? "selected" : ""}>Delivered</option>
          </select>
        </td>
        <td>
          <button type="button" class="btn-secondary" style="padding: 0.35rem 0.65rem; font-size: 0.8rem; color: var(--text-main); border-color: var(--border-color); background: var(--bg-surface-alt);" onclick="window.location.hash='#profile?tab=orders'">
            View Stepper
          </button>
        </td>
      </tr>
    `).join("");
  },

  updateOrderStatus(orderId, newStatus) {
    const order = AppState.orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      AppState.saveAll();
      showToast(`Order #${orderId} status set to ${newStatus}`);
    }
  },

  deleteProduct(productId) {
    if (confirm("Are you sure you want to remove this product from inventory?")) {
      AppState.products = AppState.products.filter(p => p.id !== productId);
      AppState.saveAll();
      this.renderProductsTable();
      this.renderKPIs();
      showToast("Product removed from catalog");
    }
  },

  openProductModal(productId = null) {
    const modal = document.getElementById("adminProductModal");
    const title = document.getElementById("adminProdModalTitle");
    const form = document.getElementById("adminProductForm");

    if (productId) {
      const p = AppState.products.find(x => x.id === productId);
      if (!p) return;
      title.textContent = "Edit Product";
      document.getElementById("adminProdId").value = p.id;
      document.getElementById("adminProdName").value = p.name;
      document.getElementById("adminProdCategory").value = p.category;
      document.getElementById("adminProdBrand").value = p.brand;
      document.getElementById("adminProdPrice").value = p.price;
      document.getElementById("adminProdOrigPrice").value = p.originalPrice || "";
      document.getElementById("adminProdStock").value = p.stock;
      document.getElementById("adminProdBadge").value = p.badge || "";
      document.getElementById("adminProdImage").value = p.images[0] || "";
      document.getElementById("adminProdDesc").value = p.description || "";
    } else {
      title.textContent = "Add New Component";
      form.reset();
      document.getElementById("adminProdId").value = "";
    }

    modal.classList.add("active");

    form.onsubmit = (e) => {
      e.preventDefault();
      const id = document.getElementById("adminProdId").value;
      const name = document.getElementById("adminProdName").value.trim();
      const category = document.getElementById("adminProdCategory").value;
      const brand = document.getElementById("adminProdBrand").value.trim();
      const price = parseFloat(document.getElementById("adminProdPrice").value);
      const originalPrice = parseFloat(document.getElementById("adminProdOrigPrice").value) || null;
      const stock = parseInt(document.getElementById("adminProdStock").value);
      const badge = document.getElementById("adminProdBadge").value.trim();
      const img = document.getElementById("adminProdImage").value.trim() || "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80";
      const desc = document.getElementById("adminProdDesc").value.trim();

      if (id) {
        // Edit
        const p = AppState.products.find(x => x.id === id);
        if (p) {
          p.name = name;
          p.category = category;
          p.brand = brand;
          p.price = price;
          p.originalPrice = originalPrice;
          p.stock = stock;
          p.badge = badge;
          p.images = [img];
          p.description = desc;
        }
        showToast("Product updated successfully!");
      } else {
        // Add
        const newProduct = {
          id: `prod-${Date.now().toString().slice(-4)}`,
          name,
          category,
          brand,
          price,
          originalPrice,
          rating: 5.0,
          reviewCount: 1,
          stock,
          isFeatured: true,
          isDeal: false,
          badge: badge || "New Component",
          images: [img],
          description: desc,
          specs: {
            "Brand": brand,
            "Category": category.toUpperCase(),
            "Warranty": "2-Year Manufacturer Warranty"
          }
        };
        AppState.products.unshift(newProduct);
        showToast("New component added to inventory!");
      }

      AppState.saveAll();
      modal.classList.remove("active");
      this.renderProductsTable();
      this.renderKPIs();
    };
  }
};

// ==========================================================================
// Global Event Listeners & Search Bar
// ==========================================================================
function setupGlobalEvents() {
  // Global search input
  const searchInput = document.getElementById("globalSearchInput");
  const searchDropdown = document.getElementById("searchDropdown");
  const searchCategory = document.getElementById("globalSearchCategory");
  const searchSubmitBtn = document.getElementById("searchSubmitBtn");

  function performSearch() {
    const query = searchInput.value.trim();
    const cat = searchCategory.value;
    searchDropdown.classList.remove("active");
    if (cat !== "all") {
      window.location.hash = `#products?category=${cat}&search=${encodeURIComponent(query)}`;
    } else {
      window.location.hash = `#products?search=${encodeURIComponent(query)}`;
    }
  }

  if (searchInput && searchDropdown) {
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        searchDropdown.classList.remove("active");
        return;
      }

      const matches = AppState.products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      ).slice(0, 5);

      if (matches.length === 0) {
        searchDropdown.innerHTML = `<div style="padding: 1rem; text-align: center; color: var(--text-muted); font-size: 0.88rem;">No parts found matching "${q}"</div>`;
      } else {
        searchDropdown.innerHTML = matches.map(p => `
          <div class="search-suggestion-item" onclick="window.location.hash='#product-details?id=${p.id}'; document.getElementById('searchDropdown').classList.remove('active');">
            <img src="${p.images[0]}" class="search-item-thumb" alt="${p.name}">
            <div class="search-item-info">
              <div class="search-item-title">${p.name}</div>
              <div class="search-item-meta">
                <span>${p.brand}</span>
                <span>•</span>
                <span class="search-item-price">$${p.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        `).join("");
      }
      searchDropdown.classList.add("active");
    });

    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") performSearch();
    });

    if (searchSubmitBtn) {
      searchSubmitBtn.addEventListener("click", performSearch);
    }

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".header-search")) {
        searchDropdown.classList.remove("active");
      }
    });
  }

  // Header cart button opens sliding drawer
  const headerCartBtn = document.getElementById("headerCartBtn");
  if (headerCartBtn) {
    headerCartBtn.addEventListener("click", () => DrawerController.open());
  }

  // Drawer close events
  const closeDrawerBtn = document.getElementById("closeCartDrawerBtn");
  const drawerBackdrop = document.getElementById("cartDrawerBackdrop");
  if (closeDrawerBtn) closeDrawerBtn.onclick = () => DrawerController.close();
  if (drawerBackdrop) drawerBackdrop.onclick = () => DrawerController.close();

  // Quick View Modal Close
  const closeQvBtn = document.getElementById("closeQuickViewBtn");
  const qvModal = document.getElementById("quickViewModal");
  if (closeQvBtn) closeQvBtn.onclick = () => QuickViewController.close();
  if (qvModal) {
    qvModal.onclick = (e) => {
      if (e.target === qvModal) QuickViewController.close();
    };
  }

  // Admin Modal Close
  const closeAdminModalBtn = document.getElementById("closeAdminProdModalBtn");
  const cancelAdminBtn = document.getElementById("cancelAdminProdBtn");
  const adminModal = document.getElementById("adminProductModal");
  if (closeAdminModalBtn) closeAdminModalBtn.onclick = () => adminModal.classList.remove("active");
  if (cancelAdminBtn) cancelAdminBtn.onclick = () => adminModal.classList.remove("active");

  // Order Success Modal close actions
  const successHomeBtn = document.getElementById("successHomeBtn");
  const viewOrderTrackingBtn = document.getElementById("viewOrderTrackingBtn");
  const orderSuccessModal = document.getElementById("orderSuccessModal");
  if (successHomeBtn) {
    successHomeBtn.onclick = () => orderSuccessModal.classList.remove("active");
  }
  if (viewOrderTrackingBtn) {
    viewOrderTrackingBtn.onclick = () => orderSuccessModal.classList.remove("active");
  }

  // Newsletter Form
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.onsubmit = (e) => {
      e.preventDefault();
      showToast("Thank you for subscribing to TechParts hardware drops!");
      newsletterForm.reset();
    };
  }
}

// ==========================================================================
// Initialize Application
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  AppState.init();
  setupGlobalEvents();
  Router.init();
});
