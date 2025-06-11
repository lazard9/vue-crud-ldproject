<script setup>
import { ref } from 'vue'
import logo from '@/assets/ldprojects-logo-520-min.png'

const isOpen = ref(false)
</script>

<template>
    <nav class="w-full bg-[var(--color-background-soft)] text-[var(--color-text)] font-sans shadow-md">
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
                    <RouterLink to="/destinations"
                        class="hover:text-[var(--color-heading)] font-medium no-underline transition-colors duration-200">
                        Destinations</RouterLink>
                    <RouterLink to="/destinations/add"
                        class="hover:text-[var(--color-heading)] font-medium no-underline transition-colors duration-200">Add
                        Destination</RouterLink>
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
                <RouterLink to="/destinations" class="block px-2 py-1 hover:text-[var(--color-heading)] font-medium no-underline transition-colors duration-200">
                    Destinations</RouterLink>
                <RouterLink to="/destinations/add"
                    class="block px-2 py-1 hover:text-[var(--color-heading)] font-medium no-underline transition-colors duration-200">Add Destination</RouterLink>
            </div>
        </div>
    </nav>
</template>
