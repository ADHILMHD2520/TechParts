# TechParts - Modern PC Components & Hardware E-Commerce Store

**TechParts** is a clean, modern, responsive e-commerce web application designed specifically for online computer parts and PC hardware enthusiasts.

---

## ⚡ Tech Stack & Architecture
- **HTML5 & CSS3**: Semantic markup and modern custom CSS design system (no Tailwind dependency).
- **Vanilla JavaScript (SPA)**: Reactive routing, local storage persistence, state controller, dynamic filters, and real-time updates.
- **Node.js Static Server**: Lightweight server included (`server.js`) for local preview and production serving.

---

## 💻 Features & Pages Included

### 1. 🏠 Homepage (`#home`)
- **Top Announcement Bar**: Flash sale promotions, free shipping notices, and direct admin link.
- **Top Navigation Bar**: TechParts logo, live search bar with category filter & auto-suggestions dropdown, wishlist badge, cart button with badge and total, user account menu.
- **Category Navigation Strip**: Quick access to CPUs, GPUs, Motherboards, RAM, SSDs, Power Supplies, PC Cases, Cooling, and Flash Deals.
- **Hero Section**: "Build Your Perfect PC" with floating spec pills (*PCIe 5.0 Ready*, *Zero Bottlenecks*), high-end visual showcase, and quick CTAs.
- **Trust Features**: Free Express Delivery, 100% Genuine Brands, 30-Day Easy Returns, 24/7 Tech Support.
- **Popular Categories**: 8 category cards with interactive counts and hover elevation.
- **Flash Deals Banner**: Live ticking countdown timer (Hours, Mins, Secs) and discounted hardware items.
- **Featured Products**: Responsive product grid with ratings, stock status, and add-to-cart actions.

### 2. 📦 Products Catalog (`#products`)
- **Search & Filter Sidebar**:
  - Live search keyword filter
  - In-stock only toggle switch
  - Category selector
  - Brand checkboxes (AMD, Intel, NVIDIA, Corsair, Samsung, ASUS, NZXT, DeepCool, MSI, etc.)
  - Interactive price range slider ($0 – $1,200)
  - One-click "Reset All" filters
- **Sorting Options**:
  - Popularity (Review count)
  - Price: Low to High
  - Price: High to Low
  - Newest
  - Top Rated
- **Product Card Features**:
  - High-res image with hover zoom
  - Brand badge & product title
  - Rating stars & review count
  - Price, original price, and % discount pill
  - Real-time stock status badge (*In Stock* or *Low Stock*)
  - "Add to Cart" button & Wishlist heart toggle
  - Quick View modal button

### 3. 🔍 Product Details Page (`#product-details?id=...`)
- Interactive image gallery with thumbnail switcher
- Brand, SKU, and dynamic stock availability badge
- Pricing, original price, and savings badge
- Quantity selector (- / +)
- "Add to Cart" & "Buy Now" (direct to checkout) buttons
- Technical Specifications key-value table (Socket, Cores/Threads, Boost Clock, TDP, Memory, etc.)
- Customer Reviews section with average rating breakdown, 5-star distribution bars, and verified reviews list
- **"Write a Review" interactive form** with real-time state update
- Related components / "Customers Also Bought" carousel

### 4. 🛒 Shopping Cart (`#cart`) & Sliding Drawer
- Item thumbnail, brand, name, and unit price
- Interactive quantity controls (- / +) and remove item button
- Subtotal, Shipping (Free over $100), Estimated Tax (8%), and Total calculation
- Promo code input (e.g. `TECH10` for 10% discount, `BUILDPC` for $25 off)
- "Proceed to Checkout" button
- Clean empty state illustration

### 5. 💳 Checkout Page (`#checkout`)
- Contact information (Email, Phone)
- Delivery address form (Full Name, Street Address, City, State, ZIP)
- Order Summary preview with live item breakdown and pricing
- **Payment Methods**:
  - **Credit / Debit Card**: Interactive visual card preview with card number formatting, cardholder name, expiry, and CVV.
  - **UPI**: Instant QR code preview and UPI ID input.
  - **Cash on Delivery**: Zero pre-payment option with door delivery.
- "Place Order Now" button generating a unique Order ID (e.g., `TP-84920`) and FedEx tracking number.
- Order confirmation modal with direct link to track order.

### 6. 🔐 Authentication (`#login` / `#signup`)
- Tabbed interface: Sign In & Create Account
- Fields: Full Name (signup), Email, Password, Confirm Password, Remember Me, Forgot Password
- One-click Google Login simulation
- Persistent session storage in `localStorage`

### 7. 👤 User Profile (`#profile`)
- User avatar, name, and email header
- **My Orders**: Detailed order history cards with visual **4-step tracking progress bar** (*Confirmed* ➔ *Processing* ➔ *Shipped* ➔ *Delivered*), item breakdown, and delivery details.
- **Wishlist**: Saved hardware cards with quick "Move to Cart" and remove.
- **Saved Addresses**: Address management with primary default tag.
- **Personal Information**: Editable profile form with instant save.

### 8. 🛠️ Admin Dashboard (`#admin`)
- **Key Performance Indicators (KPIs)**: Total Revenue, Total Orders, Active Catalog Count, Registered Customers.
- **Product Management**: Table of components with stock levels, "Add New Component" modal, "Edit Product" modal, and delete action.
- **Order Management**: Order table with live status dropdown (*Processing*, *Shipped*, *Delivered*) which immediately updates user tracking in real-time.
- **Customer Management**: Customer directory with spend totals.

---

## 🚀 Running the Project

### Option A: Using the built-in Node.js server
```bash
node server.js
```
Open your browser and navigate to:
```
http://localhost:3000/
```

### Option B: Opening directly in any browser
Double-click `index.html` or open it with any web browser or Live Server.
