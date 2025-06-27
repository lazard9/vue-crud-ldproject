<script setup>
import { useRoute } from 'vue-router';
import { inject } from 'vue';
import logo from '@/assets/ldproject-logo-520-min.png';

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

const route = useRoute()

const isActiveLink = (path) => {
    return route.path === path;
}

const auth = inject('auth');
const loggedIn = auth.loggedIn.value;
</script>

<template>
    <footer
        class="bg-[var(--color-background-soft)] text-[var(--color-text)] py-8 border-t border-[var(--color-border)]">
        <div class="max-w-7xl mx-auto px-4 text-center space-y-6">
            <!-- Navigacija -->
            <nav class="flex flex-wrap justify-center space-x-6">
                <RouterLink to="/"
                    :class="[isActiveLink('/') ? 'text-[var(--color-heading)]' : '', 'hover:text-[var(--color-heading)] font-medium no-underline transition-colors duration-200']">
                    Home
                </RouterLink>
                <RouterLink to="/destinations"
                    :class="[isActiveLink('/destinations') ? 'text-[var(--color-heading)]' : '', 'hover:text-[var(--color-heading)] font-medium no-underline transition-colors duration-200']">
                    Destinations
                </RouterLink>
                <RouterLink v-if="loggedIn" to="/destinations/add"
                    :class="[isActiveLink('/destinations/add') ? 'text-[var(--color-heading)]' : '', 'hover:text-[var(--color-heading)] font-medium no-underline transition-colors duration-200']">
                    Add Destination
                </RouterLink>
                <a href="#" @click.prevent="scrollToTop"
                    class="hover:text-[var(--color-heading)] font-medium no-underline transition-colors duration-200">
                    Back to top
                </a>
            </nav>

            <!-- Social ikone -->
            <div class="flex justify-center space-x-6 text-xl">
                <a href="https://www.linkedin.com" target="_blank"
                    class="hover:text-[var(--color-heading)] transition-colors duration-200">
                    <i class="fab fa-linkedin"></i>
                </a>
                <a href="https://www.instagram.com" target="_blank"
                    class="hover:text-[var(--color-heading)] transition-colors duration-200">
                    <i class="fab fa-instagram"></i>
                </a>
                <a href="https://www.facebook.com" target="_blank"
                    class="hover:text-[var(--color-heading)] transition-colors duration-200">
                    <i class="fab fa-facebook"></i>
                </a>
                <a href="https://www.twitter.com" target="_blank"
                    class="hover:text-[var(--color-heading)] transition-colors duration-200">
                    <i class="fab fa-twitter"></i>
                </a>
            </div>

            <!-- Logo -->
            <div class="flex justify-center">
                <img :src="logo" alt="LD Projects Logo" class="h-16 w-auto" />
            </div>
        </div>
    </footer>
</template>
