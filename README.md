# Vue Destinations CRUD App

This is a custom-built Vue 3 + Vite application for managing travel destinations.

The app supports dynamic routing with full CRUD functionality (create, read, update, delete), client-side form validation, and 404 error handling.  
It was inspired by a YouTube tutorial but developed completely independently with custom structure, components, and logic.

---

## Features

- Vue 3 + Composition API with Vite
- Vue Router with dynamic routes and slug validation
- Add/Edit destination form with client-side validation
- Unique slug generation logic
- Automatic redirect to `/404` for non-existent slugs
- Local mock backend via JSON Server
- Minimal and clean UI built with custom components

---

## Project Structure

📦 src/
├── 📄 App.vue
├── 📄 AppCompositionApi.vue
├── 📄 AppOptionsApi.vue
├── 📄 main.js
├── 📄 router.js
├── 📁 assets/
│   └── 📄 (images, styles...)
├── 📁 data/
│   ├── 📄 destinations.json               # Static data (optional)
│   └── 📄 destinations-server.json        # Used by JSON Server (live data)
├── 📁 components/
│   ├── 📄 CtaCard.vue
│   ├── 📄 CtaCardsContainer.vue
│   ├── 📄 DestinationCard.vue
│   ├── 📄 DestinationForm.vue
│   ├── 📄 DestinationsGrid.vue
│   ├── 📄 Footer.vue
│   ├── 📄 HeroSection.vue
│   └── 📄 Spinner.vue
└── 📁 views/
    ├── 📄 Home.vue
    ├── 📄 Destinations.vue
    ├── 📄 DestinationSingle.vue
    ├── 📄 DestinationAdd.vue
    ├── 📄 DestinationEdit.vue
    └── 📄 NotFound.vue

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

## Notes

- Dynamic routes such as `/destinations/:slug` and `/destinations/edit/:slug` include logic to validate if the destination exists. If not, users are redirected to `/404`.
- Form validation includes required fields and positive number checks for price.
- Slugs are generated from the title and guaranteed to be unique via incremental suffixes if needed.

## Inspiration

Inspired by the jobs listing project from the [YouTube crash course](https://www.youtube.com/watch?v=VeNfHj6MhgA),
but this project was written from scratch using custom components, routes, and logic.

## License

This project is open for educational and personal use.
