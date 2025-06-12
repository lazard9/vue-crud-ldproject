<template>
    <div class="min-h-[80vh] flex flex-col items-center justify-center bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 px-4">
        <h1 class="text-9xl font-bold mb-4">404</h1>
        <p class="text-xl mb-6 text-center">
            Sorry, the page you are looking for does not exist.
        </p>
        <RouterLink
            to="/"
            class="inline-block px-6 py-3 text-white bg-[#7d3fe0] hover:bg-[#9354fc] rounded-md transition-colors"
        >
            Go Home
        </RouterLink>
    </div>
</template>
