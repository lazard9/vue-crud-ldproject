<script>
    export default {
        data: () => ({
            name: 'Options API',
            status: 'pending',
        }),
        methods: {
            changeStatus() {
                if (this.status === 'active') {
                    this.status = 'pending';
                } else if (this.status === 'pending') {
                    this.status = 'inactive';
                } else {
                    this.status = 'active';
                }
                
            },
        },
    };
</script>

<template>
    <h1>{{ name }}</h1>

    <p v-if="status === 'active'">Status: {{ status }}</p>
    <p v-else-if="status === 'pending'">Status: {{ status }}</p>
    <p v-else="status === 'inactive'">Status: {{ status }}</p>
    
    <!-- <button v-on:click="changeStatus">Change Status</button> -->
    <button @click="changeStatus">Change Status</button>
</template>
