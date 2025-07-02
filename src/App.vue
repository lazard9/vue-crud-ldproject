<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import LoginModal from './components/LoginModal.vue';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

const auth = useAuthStore();

const routerKey = ref(0);
</script>

<template>
    <Navbar :loggedIn="auth.loggedIn" :key="routerKey" />
    <router-view :loggedIn="auth.loggedIn" :key="routerKey" />
    <Footer :loggedIn="auth.loggedIn" :key="routerKey" />
    <LoginModal v-if="auth.showLogin" />
</template>
