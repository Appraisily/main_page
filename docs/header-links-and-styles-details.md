# Appraisily Header: Links & Detailed Styling Guide

This document provides more granular details about the header component's navigation links and styling specifics to ensure exact replication across repositories. It should be used alongside the main `header-component-spec.md` document.

## Complete Navigation Link Structure

### 1. Desktop Navigation - All Links with Exact URLs

```
├── Logo Link → "/"
├── About Menu
│   ├── About Us → "/about"
│   ├── Our Team → "/team"
│   └── Qualified Appraisals → "/qualified-appraisals"
├── Services Menu
│   ├── Our Services → "/services"
│   └── How It Works → "/how-it-works"
├── Expertise Menu
│   └── Our Expertise → "/expertise"
├── Knowledge Menu
│   ├── Articles → "https://articles.appraisily.com/" (external)
│   ├── Art Appraiser Directory → "http://art-appraiser-directory.appraisily.com/" (external)
│   └── Antique Appraiser Directory → "http://antique-appraiser-directory.appraisily.com/" (external)
├── Screener → "https://screener.appraisily.com/" (external)
├── Authentication Section
│   ├── If authenticated:
│   │   ├── Dashboard → "/dashboard"
│   │   └── Profile Dropdown
│   │       ├── Profile Settings → "/profile"
│   │       └── Logout (function call)
│   └── If not authenticated:
│       └── Log In → "/login"
└── Start Appraisal → "/start" (CTA button)
```

### 2. Mobile Navigation Links (Same destinations, different structure)

```
├── Logo Link → "/"
├── Auth Icon Buttons (right side)
│   ├── If authenticated:
│   │   ├── Dashboard Icon → "/dashboard"
│   │   └── Profile Icon (dropdown)
│   └── If not authenticated:
│       └── Login Icon → "/login"
├── Start Button → "/start" (Compact CTA)
├── Hamburger Menu Toggle
└── Mobile Menu Panel (when open)
    ├── About → "/about"
    ├── Qualified Appraisals → "/qualified-appraisals"
    ├── Services → "/services"
    ├── Expertise → "/expertise"
    ├── Screener → "https://screener.appraisily.com/" (external)
    ├── If authenticated:
    │   ├── Profile → "/profile"
    │   ├── Dashboard → "/dashboard"
    │   └── Logout (button)
    └── If not authenticated:
        ├── Log In → "/login"
        └── Sign Up → "/signup"
```

## Detailed Styling Specifications

### 1. Exact Color Values & Transitions

| Element | State | Color/Value | Tailwind Class |
|---------|-------|-------------|----------------|
| Nav background | Default | rgba(255, 255, 255, 0.8) | `bg-white/80` |
| Nav background | Scrolled | rgba(255, 255, 255, 0.9) | `bg-white/90` |
| Blur effect | All states | 12px | `backdrop-blur-md` |
| Text | Primary (logo, titles) | #111827 | `text-gray-900` |
| Text | Secondary (descriptions) | #4B5563 | `text-gray-600` |
| Link hover | Default | #2563EB | `hover:text-blue-600` |
| Link background hover | Default | #F9FAFB | `hover:bg-gray-50` |
| Link active | Selected | #2563EB | `text-blue-600` |
| Link background active | Selected | #EFF6FF | `bg-blue-50` |
| Button (CTA) | Default | #111827 (bg), #FFFFFF (text) | `bg-gray-900 text-white` |
| Button (CTA) | Hover | #1F2937 (bg) | `hover:bg-gray-800` |
| Auth button | Default | #F3F4F6 (bg), #111827 (text) | `bg-gray-100 text-gray-900` |
| Auth button | Hover | #E5E7EB | `hover:bg-gray-200` |
| Logout text | Default | #DC2626 | `text-red-600` |
| Shadow | Scrolled | Light soft shadow | `shadow-sm md:shadow-md` |
| Transition | All hover/state | 300ms | `transition-colors duration-300` |

### 2. Critical Layout Measurements

| Element | Measurement | Tailwind Class |
|---------|-------------|----------------|
| Navigation height | 56px | `h-14` |
| Content max width | 1280px | `max-w-7xl` |
| Horizontal padding | 16px (sm), 24px (md), 32px (lg) | `px-4 sm:px-6 lg:px-8` |
| Logo height | 28px | `h-7` |
| Space between nav items | 16px | `space-x-4` |
| Space between auth buttons | 12px | `space-x-3` |
| Mobile menu item padding | 12px horiz, 8px vert | `px-3 py-2` |
| Dropdown item padding | 8px | `p-2` |
| Button padding | 16px horiz, 8px vert | `px-4 py-2` |
| Button border radius | 8px | `rounded-lg` |
| Mobile dropdown corners | 12px | `rounded-xl` |
| Dropdown width (About) | 280px | `w-[280px]` |
| Dropdown width (Services) | 250px | `w-[250px]` |
| Dropdown width (Expertise) | 250px | `w-[250px]` |
| Dropdown width (Knowledge) | 400px | `w-[400px]` |
| Dropdown item transition | All properties | `transition-colors` |
| Menu z-index | 50 (above content) | `z-50` |

### 3. Font Specifications

| Text Element | Size | Weight | Tailwind Class |
|--------------|------|--------|----------------|
| Logo text | 18px | 600 (semibold) | `text-lg font-semibold` |
| Navigation links | 14px | 500 (medium) | `text-sm font-medium` |
| Dropdown titles | 14px | 500 (medium) | `font-medium text-gray-900` |
| Dropdown descriptions | 14px | 400 (normal) | `text-sm text-gray-600` |
| Mobile nav items | 16px | 500 (medium) | `text-base font-medium` |

### 4. Critical Styling Classes for Key Elements

#### Logo Link
```html
<Link to="/" class="flex items-center gap-2">
  <img 
    src="https://ik.imagekit.io/appraisily/WebPage/logo_new.png?updatedAt=1731919266638" 
    alt="Appraisily Logo" 
    class="h-7 w-auto"
    loading="eager"
  />
  <span class="text-lg font-semibold text-gray-900">Appraisily</span>
</Link>
```

#### Desktop CTA Button
```html
<Link
  to="/start"
  id="start-appraisal-nav"
  class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium 
         rounded-lg text-white bg-gray-900 hover:bg-gray-800 transition-colors
         shadow-sm hover:shadow-md"
>
  Start Appraisal
  <ArrowRight class="h-4 w-4 ml-2" />
</Link>
```

#### Desktop Dropdown Item
```html
<Link to="/about" class="block p-2 hover:bg-gray-50 rounded-lg transition-colors">
  <div class="font-medium text-gray-900">About Us</div>
  <p class="text-sm text-gray-600">Learn about our mission and values</p>
</Link>
```

#### Desktop Authentication Button
```html
<Link
  to="/login"
  class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium 
         rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors"
>
  <LogIn class="h-4 w-4 mr-2" />
  Log In
</Link>
```

#### Mobile Menu Item
```html
<Link
  to="/about"
  class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 
         hover:text-blue-600 hover:bg-gray-50 transition-colors"
>
  About
</Link>
```

## Additional Implementation Notes

1. **Z-index Hierarchy**: 
   - Navbar: `z-50`
   - Dropdown contents: `z-10`
   - This ensures dropdowns appear above page content but below any modals

2. **Focus States**:
   - All interactive elements have focus states: `focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2`
   - This provides accessible keyboard navigation

3. **Mobile Menu Animation**:
   - No animation is applied to the mobile menu directly; it uses a simple display toggle
   - Consider adding a slight fade-in animation for better UX

4. **Class Order Consistency**:
   - Tailwind classes should follow consistent ordering: layout → spacing → typography → colors → effects
   - This ensures predictable specificity and overrides

5. **Logo Image Optimization**:
   - The logo is loaded from ImageKit CDN with the following URL structure:
     `https://ik.imagekit.io/appraisily/WebPage/logo_new.png?updatedAt=1731919266638`
   - The `updatedAt` parameter ensures cache invalidation when the logo is updated
   - Ensure correct image dimensions to prevent layout shifts (28px height)

6. **Responsive Breakpoints**:
   - Mobile: up to 767px
   - Desktop: 768px and above (md: prefix)
   - No intermediate breakpoints are used in the header specifically

7. **User Indicator When Loading**:
   - When authentication is loading, a pulsing avatar placeholder is shown:
     ```html
     <div class="w-7 h-7 rounded-full bg-gray-200 animate-pulse"></div>
     ```

8. **Profile Menu Truncation**:
   - Long email addresses are truncated with ellipsis:
     ```html
     <span class="truncate max-w-[150px]">
       {user?.displayName || user?.email?.split('@')[0] || 'Profile'}
     </span>
     ```

9. **Authentication Fallbacks**:
   - Always include fallbacks for missing user data:
     - Use `displayName` if available
     - Otherwise, use email prefix (before @)
     - Fallback to 'Profile' if neither exists 