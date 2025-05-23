# Appraisily Header / Navbar – Full Technical Blueprint

> **Audience**: Another AI agent (or an experienced developer) who needs to _re-create_ the exact same responsive header in a different repository without having access to the original code-base.
>
> **Goal**: Provide **all** information (structure, behaviour, dependencies, styling, links, state logic, build prerequisites) so that the target agent can generate code that is **pixel-perfect** and **behaviour-identical** to the original implementation found in `src/components/Navbar.tsx`.

---

## 1. High-level Behavioural Summary

1. Fixed, translucent top navigation bar (`position: fixed; top: 0; width: 100%; z-index: 50`).
2. Gains a drop-shadow + opaque background on _scroll Y > 0_ (`isScrolled` state).
3. Desktop (`min-width ≥ 768 px`) and Mobile views have separate layouts:
   * Desktop shows full navigation menus, dropdowns, CTA buttons.
   * Mobile collapses items into a hamburger menu with slide-down panel; primary CTA still visible.
4. Authentication-aware:
   * When `authenticated === true` show **Dashboard** + **Profile Dropdown** (with **Logout**) instead of **Log In**.
5. Uses **TailwindCSS** utility classes exclusively – no inline styles – with a small set of custom classes injected via Shadcn UI / Radix primitives.
6. No environment-specific secrets are required; purely client-side rendering.

---

## 2. External Libraries / Dependencies (exact versions not mandatory but keep major versions)

| Purpose                       | Package                       | Notes |
|-------------------------------|--------------------------------|-------|
| React binding / SPA routing   | `react-router-dom`            | `Link`, `useLocation`, `useNavigate` |
| Icons                         | `lucide-react`                | `Menu`, `X`, `ArrowRight`, `LogIn`, `User`, `LogOut`, `LayoutDashboard`, `ChevronDown` |
| Headless UI primitives        | `@radix-ui/react-navigation-menu` + `@radix-ui/react-dropdown-menu` |
| Tailwind config helpers       | `class-variance-authority`    | Generates variants for Radix triggers |
| Utility to concat classNames  | Local helper `cn()`           | Equivalent to `clsx` |
| Auth state                    | Local `useAuth()` context     | Must expose `user`, `authenticated`, `logout()`, `loading` |

> The Radix primitives are wrapped into custom Shadcn UI components living under `src/components/ui/`. The spec below documents the contract those wrappers must satisfy.

---

## 3. Directory / File Layout (single-source-of-truth)

```
src/
└─ components/
   ├─ Navbar.tsx           ← main header defined here (≈ 380 LOC)
   └─ ui/
      ├─ navigation-menu.tsx  ← Radix > Shadcn wrapper
      └─ dropdown-menu.tsx    ← Radix > Shadcn wrapper
lib/
└─ auth/
   └─ AuthContext.tsx     ← exposes useAuth()
```

> In a new repository, the **only** required top-level file is `Navbar.tsx`; the rest can remain identical or be imported as an external package if you centralise UI primitives.

---

## 4. Detailed JSX / DOM Tree Blueprint

The tree below omits explicit `key` / React attributes not affecting layout but includes **every element** and **class list** so cloning is deterministic.

```
<nav class="fixed w-full z-50 top-0 left-0 right-0 will-change-transform
            transition-[background,shadow] duration-300
            bg-white/80 backdrop-blur-md"
     state="isScrolled ➜ bg-white/90 shadow-sm md:shadow-md">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-14">
      <!-- 4.1 Logo Cluster -->
      <div class="flex items-center">
        <Link to="/" class="flex items-center gap-2">
          <img src="https://ik.imagekit.io/appraisily/WebPage/logo_new.png?updatedAt=1731919266638"
               alt="Appraisily Logo" class="h-7 w-auto" loading="eager" />
          <span class="text-lg font-semibold text-gray-900">Appraisily</span>
        </Link>
      </div>

      <!-- 4.2 Desktop Navigation (hidden md:flex) -->
      <div class="hidden md:flex md:items-center md:justify-end w-full pl-8">
        <div class="flex items-center space-x-4">
          <!-- 4.2.1 Top-level nav items implemented via <NavigationMenu> -->
          … see Section 5 for each trigger/content pair …

          <!-- 4.2.2 Auth-aware button cluster -->
          <div class="flex items-center space-x-3">
            {loading ? skeleton : authenticated ? dashboard+profileDropdown : loginLink}
            <Link to="/start" id="start-appraisal-nav"
                  class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium
                         rounded-lg text-white bg-gray-900 hover:bg-gray-800 transition-colors
                         shadow-sm hover:shadow-md">
              Start Appraisal <ArrowRight class="h-4 w-4 ml-2"/>
            </Link>
          </div>
        </div>
      </div>

      <!-- 4.3 Mobile Icons (md:hidden) -->
      <div class="md:hidden flex items-center space-x-2">
        {authenticated ? dashboardShortcut+profileDropdown : loginIcon}
        <Link to="/start" id="start-appraisal-nav-mobile" …>Start</Link>
        <button aria-expanded={isOpen} aria-controls="mobile-menu" …>
          {isOpen ? <X/> : <Menu/>}
        </button>
      </div>
    </div>
  </div>

  <!-- 4.4 Mobile Slide-down Menu (only when isOpen) -->
  <div id="mobile-menu" class="md:hidden">
    <div class="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg mx-2 rounded-xl"
         state="isScrolled ➜ shadow-md">
      {navItems.map(…) with hover/active colour logic}
      <!-- replicate auth cluster as blocks here -->
    </div>
  </div>
</nav>
```

> Use **exact Tailwind class orders** for deterministic diffing. Underlying colours assume the default Tailwind palette.

---

## 5. Navigation Items & Dropdown Content Matrix

| Trigger Label | Desktop Type | Sub-links (label → href) | External? |
|---------------|--------------|---------------------------|-----------|
| About         | Dropdown     | About Us → /about, Team → /team, Qualified Appraisals → /qualified-appraisals | No |
| Services      | Dropdown     | Our Services → /services, How It Works → /how-it-works | No |
| Expertise     | Dropdown     | Our Expertise → /expertise | No |
| Knowledge     | Dropdown     | Articles → https://articles.appraisily.com/, Art Appraiser Directory → http://art-appraiser-directory.appraisily.com/, Antique Appraiser Directory → http://antique-appraiser-directory.appraisily.com/ | Mixed |
| Screener      | Direct Link  | Screener → https://screener.appraisily.com/ | Yes |

Implementation details:
* Each trigger uses `<NavigationMenuTrigger className="bg-transparent">` so background inherits.
* Dropdown widths: About (280 px), Services (250 px), Expertise (250 px), Knowledge (400 px) – achieved via wrapper `div.w-[Npx]`.
* Each dropdown item uses `block p-2` (or `p-3`) with `hover:bg-gray-50 rounded-lg transition-colors`.

---

## 6. Authentication Flow Contracts

```
interface AuthContext {
  authenticated: boolean;
  loading: boolean;           // true while Firebase (or other) auth is resolving
  user: {
    displayName?: string;
    email?: string;
  } | null;
  logout(): Promise<void>;
}
```

* **Desktop**: When `authenticated === true` render:
  * `Link /dashboard` (button-style)
  * `DropdownMenuTrigger` containing username / email prefix, with menu:
    * Profile Settings → `/profile`
    * Separator
    * Logout (red text) → triggers `handleLogout()` then `navigate('/')`.
* **Mobile**: Render smaller icon buttons inside `md:hidden` cluster + same actions replicated inside slide-down list.

---

## 7. Scroll & Menu State Logic (pseudo)

```ts
const [isScrolled, setIsScrolled] = useState(false);
const [isOpen, setIsOpen] = useState(false);

useEffect(() => {
  const onScroll = () => requestAnimationFrame(() => setIsScrolled(window.scrollY > 0));
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}, []);
```

* `isScrolled` toggles additional `shadow-sm md:shadow-md` + darker `bg-white/90`.
* `isOpen` controls mobile menu visibility; toggled by hamburger button.

---

## 8. Shadcn UI Wrapper Contracts

### navigation-menu.tsx
* Re-export Radix primitives as capitalised components.
* Provide `navigationMenuTriggerStyle` via `cva` to match Shadcn default.
* **IMPORTANT**: The wrapper _must_ inject an inline chevron icon (`<ChevronDown>`). Desktop spec expects this.

### dropdown-menu.tsx
* Standard Shadcn wrapper with `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuSeparator`.
* Ensure items adopt Tailwind classes for colours identical to desktop list.

---

## 9. Tailwind / PostCSS Requirements

No bespoke Tailwind configuration is mandatory besides default.
However, recommended `tailwind.config.js` excerpt:

```js
module.exports = {
  content: [
    './src/**/*.{ts,tsx,jsx,js}', // include components & pages
    './index.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-animate')], // for Radix fade/slide animations
}
```

> Colours: rely on default gray (e.g., `gray-50`, `gray-700`) and blue for active link (`text-blue-600` `bg-blue-50`).

---

## 10. Accessibility Checklist

* Each interactive element has an associated `aria-hidden`, `aria-expanded`, `aria-controls`, or `sr-only` label as per WAI-ARIA best practices.
* Dropdown & navigation primitives inherit keyboard navigation (Radix).
* Colour contrast passes AA.

---

## 11. Performance Notes / Optimisations

1. Images (`logo_new.png`) loaded with `loading="eager"` because header is above-the-fold.
2. Scroll listener wrapped in `requestAnimationFrame` to avoid layout thrashing.
3. `will-change: transform` on `<nav>` to hint GPU compositing during scroll.
4. All route changes use `react-router-dom` for SPA navigation; external links include `rel="noopener noreferrer"` when `target="_blank"`.

---

## 12. How to Integrate into Another Repository (step-by-step)

1. **Copy Files**
   * `Navbar.tsx` (plus wrappers under `components/ui/`).
2. **Install Dependencies**
   ```bash
   pnpm add react-router-dom lucide-react @radix-ui/react-navigation-menu @radix-ui/react-dropdown-menu class-variance-authority
   # + tailwindcss / postcss setup if not already present
   ```
3. **Ensure AuthContext** with the contract in Section 6 exists; otherwise, stub it.
4. **Add Tailwind** + plugin (or import compiled CSS bundle from original repo's `src/index.css`).
5. **Import & Render** `<Navbar />` at the top of your root component/layout; ensure it is outside router `<Routes>` so it persists across pages.

---

## 13. Change Log / Versioning Strategy

* Treat this Markdown as the single source of truth.
* Increment a `## [vX.Y.Z] – YYYY-MM-DD` section here whenever the header spec changes.

---

_Last generated automatically on 2025-05-20._ 