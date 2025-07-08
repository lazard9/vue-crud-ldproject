<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter, RouterLink } from "vue-router";
import { useAuthStore } from '@/stores/auth';
import logo from "@/assets/images/ldproject-logo-520-min.png";

const isOpen = ref(false);
const route = useRoute();
const router = useRouter();
const auth = useAuthStore();
const loggedIn = computed(() => auth.loggedIn);

const isActiveLink = (path) => {
    return route.path === path;
};

function handleLogout() {
    auth.logout();
    router.push('/');
}

async function goToSubscription() {
    if (route.path !== '/') {
        await router.push('/');
        setTimeout(() => {
            const el = document.getElementById('subscription');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    } else {
        scrollToSubscription();
    }
}

function scrollToSubscription() {
    const el = document.getElementById('subscription');
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    isOpen.value = false; // zatvori hamburger meni ako je otvoren na mobilnom
}
</script>

<template>
    <nav class="w-full bg-[var(--color-background-soft)] text-[var(--color-text)] shadow-md">
        <div class="max-w-screen-xl mx-auto px-4">
            <div class="flex justify-between items-center h-16">
                <!-- Logo -->
                <RouterLink to="/" class="flex items-center space-x-2">
                    <img :src="logo" alt="LD Projects Logo" class="h-8 w-auto -mb-1" />
                </RouterLink>

                <!-- Desktop Navigation -->
                <div class="hidden md:flex space-x-6">
                    <!-- <RouterLink
                        to="/"
                        class="hover:text-[var(--color-heading)] no-underline transition-colors duration-200"
                        >Home</RouterLink
                    > -->

                    <RouterLink to="/destinations" :class="[
                        isActiveLink('/destinations')
                            ? 'text-[var(--color-heading)]'
                            : '',
                        'hover:text-[var(--color-heading)] font-medium no-underline transition-colors duration-200',
                    ]">
                        Destinations</RouterLink>

                    <RouterLink v-if="loggedIn" to="/destinations/add" :class="[
                        isActiveLink('/destinations/add')
                            ? 'text-[var(--color-heading)]'
                            : '',
                        'hover:text-[var(--color-heading)] font-medium no-underline transition-colors duration-200',
                    ]">
                        Add Destination</RouterLink>

                    <button @click.prevent="goToSubscription"
                        class="hover:text-[var(--color-heading)] font-medium no-underline transition-colors duration-200 cursor-pointer">
                        Subscribe
                    </button>

                    <button v-if="!loggedIn" @click="auth.openLoginModal"
                        class="block p-0 font-medium no-underline transition-colors duration-200  text-blue-600 hover:text-blue-500 dark:text-[#19b2e4] dark:hover:text-[#1cc6fd]">
                        Login
                    </button>

                    <button v-if="loggedIn" @click="handleLogout"
                        class="block p-0 font-medium no-underline transition-colors duration-200  text-[#7d3fe0] hover:text-[#9354fc]">
                        Logout
                    </button>
                </div>

                <!-- Hamburger Button (mobile) -->
                <button @click="isOpen = !isOpen" class="md:hidden text-[var(--color-text)] focus:outline-none">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>

            <!-- Mobile Menu -->
            <div v-if="isOpen" class="md:hidden mt-2 space-y-2 pb-4">
                <!-- <RouterLink to="/" class="block px-2 py-1 hover:text-[var(--color-heading)] no-underline">Home</RouterLink> -->
                <RouterLink to="/destinations" :class="[
                    isActiveLink('/destinations')
                        ? 'text-[var(--color-heading)]'
                        : '',
                    'block px-2 py-1 hover:text-[var(--color-heading)] font-medium no-underline transition-colors duration-200',
                ]">
                    Destinations</RouterLink>

                <RouterLink v-if="loggedIn" to="/destinations/add"
                    :class="[isActiveLink('/destinations/add') ? 'text-[var(--color-heading)]' : '', 'block px-2 py-1 hover:text-[var(--color-heading)] font-medium no-underline transition-colors duration-200']">
                    Add Destination
                </RouterLink>

                <button @click.prevent="goToSubscription"
                    class="block px-2 py-1 hover:text-[var(--color-heading)] font-medium no-underline transition-colors duration-200 cursor-pointer">
                    Subscribe
                </button>

                <button v-if="!loggedIn" @click="auth.openLoginModal"
                    class="block px-2 py-1 font-medium no-underline transition-colors duration-200  text-blue-600 hover:text-blue-500 dark:text-[#19b2e4] dark:hover:text-[#1cc6fd]">
                    Login
                </button>

                <button v-if="loggedIn" @click="handleLogout"
                    class="block px-2 py-1 font-medium no-underline transition-colors duration-200  text-[#7d3fe0] hover:text-[#9354fc]">
                    Logout
                </button>
            </div>
        </div>
    </nav>
</template>
