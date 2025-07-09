<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import Navbar from '@/components/Navbar.vue';
import SubscribeToForm from '@/components/SubscribeToForm.vue';
import Footer from '@/components/Footer.vue';
import LoginModal from '@/components/LoginModal.vue';

import { useShowSubscribe } from '@/composables/useShowSubscribe';

const auth = useAuthStore();

const routerKey = ref(0);

const { showSubscribeForm } = useShowSubscribe();
</script>

<template>
    <Navbar :loggedIn="auth.loggedIn" :key="routerKey" />
    <router-view :loggedIn="auth.loggedIn" :key="routerKey" />
    <SubscribeToForm v-if="showSubscribeForm" />
    <Footer :loggedIn="auth.loggedIn" :key="routerKey" />
    <LoginModal v-if="auth.showLogin" />
</template>
