# Vue Destinations CRUD App

This is a custom-built Vue 3 + Vite application for managing travel destinations.

The app supports dynamic routing with full CRUD functionality (create, read, update, delete), client-side form validation, and 404 error handling.  
It was inspired by a YouTube tutorial but developed completely independently with custom structure, components, and logic.

---

## Acknowledgements

This project is essentially a small blog focused on travel destinations. It is built upon nearly 10 years of backend and frontend experience, primarily custom development in WordPress, with additional exposure to NextJS, NuxtJS, and some Django.

The development process was greatly enhanced by assistants such as ChatGPT and Windsurf, which provided guidance on learning and technical solutions as well as help with documentation. Meanwhile, Sora was used to generate images based on custom prompt queries, enriching the visual content of the app.

---

## Features

- ⚡ Vue 3 + Composition API with Vite
- 📱 Fully responsive design optimized for desktop, tablet, and mobile devices
- 🌐 Vue Router with dynamic routes and slug validation
- 📝 Add/Edit destination form with client-side validation
  - 🖼️ Image upload field with preview and camera overlay (manual image placement required in /public/media due to browser security restrictions)
  - 🏷️ Tags input with comma-separated parsing and validation
- 🔤 Unique slug generation logic
- 🚫 Automatic redirect to `/404` for non-existent slugs
- 🗂 Local mock backend via JSON Server
- 🧩 Minimal and clean UI built with custom components
- 🌙 Light/Dark mode that automatically follows user device preference
- 🔐 Mock login system with session-based auth (user: `admin`, password: `password`)
- ✅ Click-to-copy credentials for easier testing
- 🎯 Conditional UI rendering based on login status
- 🔒 Route and UI protection based on login state
- 🎨 Centered single CTA card for better layout when user is not logged in
- 🎡 Dynamic, responsive, infinite swiper carousel with pagination and autoplay features
- 💾 Local caching and fallback images for destinations with missing or broken images
- 🔖 Tag filtering and dynamic tag display with exclusion of specific tags (e.g. top, pinned)
- 🧹 Smooth scroll navigation to subscription form section
- 🔖 Tag filtering: Dynamic filtering of destinations by tags via /destinations/tags/:tag route, with unified component handling both all and filtered views.
- 🔗 Clickable tags: Tags displayed as clickable links that navigate to corresponding filtered views.
- ♻️ Modular tag component: Reusable tag list component with customizable styles and exclusion logic for special tags (e.g. top, pinned, grid).
- ⚡ Optimized UX: Capitalized tag titles and conditional rendering of headings based on tag presence.
- 🧩 Extracted API layer into reusable functions for cleaner separation of concerns and easier backend integration.
- 📄 Pagination system with flexible `limit` and `postsPerPage` props, supporting filtered views and UI feedback on disabled navigation buttons.

---

## Project Structure

- 📦 src/
  - 📄 App.vue
  - 📄 main.js
  - 📄 router.js
  - 📁 api/
    - 📄 destinations.js
  - 📁 assets/
    - 📄 (images, styles...)
  - 📁 data/
    - 📄 destinations.json — Static data (optional)
    - 📄 destinations-server.json — Used by JSON Server (live data)
  - 📁 components/
    - 📄 CtaCard.vue
    - 📄 CtaCardsContainer.vue
    - 📄 DestinationCard.vue
    - 📄 DestinationForm.vue
    - 📄 DestinationsGrid.vue
    - 📄 DestinationsSlider.vue
    - 📄 Footer.vue
    - 📄 HeroSection.vue
    - 📄 LoginModal.vue
    - 📄 Navbar.vue
    - 📄 Pagination.vue
    - 📄 ParallaxSection.vue
    - 📄 Spinner.vue
    - 📄 SubscribeToForm.vue
    - 📄 TagsList.vue
    - 📄 TipTapEditor.vue
  - 📁 composables/
    - 📄 useShowSubscribe.js
  - 📁 stores/ - Pinia store modules
    - auth.js - Auth logic using Pinia store
  - 📁 utils/ - Utility functions
    - auth.js - Auth logic used with provide/inject and props
  - 📁 views/
    - 📄 Home.vue
    - 📄 Destinations.vue
    - 📄 DestinationSingle.vue
    - 📄 DestinationAdd.vue
    - 📄 DestinationEdit.vue
    - 📄 NotFound.vue

## Installation & Setup

1. Clone this repository:

    ```bash
    git clone https://github.com/lazard9/vue-crud-ldproject.git
    ```

2. Navigate to the project folder:

    ```bash
    cd vue-crud-ldproject
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the JSON server [http://localhost:8080](http://localhost:8080):

    ```bash
    npm run server
    ```

5. Run the development server [http://localhost:8080](http://localhost:8080):

    ```bash
    npm run dev
    ```

## Scripts

Defined in `package.json`:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "server": "json-server --watch src/data/destinations-server.json --port 8080"
},
```

## Usage

1. Launch the app with `npm run dev`
2. Click the "Login" button and use:
   - Username: `admin`
   - Password: `password`
3. On successful login, new options will appear (e.g., Add Destination)

## Notes

- Dynamic routes such as `/destinations/:slug` and `/destinations/edit/:slug` include logic to validate if the destination exists. If not, users are redirected to `/404`.
- Form validation includes required fields and positive number checks for price.
- Slugs are generated from the title and guaranteed to be unique via incremental suffixes if needed.

## Inspiration

This project is based on the same core idea as the jobs listing project from the [YouTube crash course](https://www.youtube.com/watch?v=VeNfHj6MhgA). However, all code was written independently from scratch, following my own approach and implementation rather than copying existing code.

## License

This project is open for educational and personal use.
