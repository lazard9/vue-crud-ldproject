<script setup>
import { ref, onMounted } from 'vue'

const name = ref('Composition API')
const status = ref('pending')

const newTask = ref('')
const tasks = ref([])

const error = ref(null)

function changeStatus() {
    switch (status.value) {
        case 'active':
            status.value = 'pending'
            break
        case 'pending':
            status.value = 'inactive'
            break
        default:
            status.value = 'active'
    }
}

const addTask = () => {
    // e.preventDefault()
    const trimmed = newTask.value.trim()
    if (trimmed) {
        tasks.value.push(trimmed)
        newTask.value = ''
    }
}

const deleteTask = (index) => {
    tasks.value.splice(index, 1)
}

onMounted(async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos')
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        tasks.value = data.map((task) => task.title)
    } catch (err) {
        error.value = err.message
        console.error('Fetch error:', err)
    }
})
</script>

<template>
    <h1>{{ name }}</h1>

    <p v-if="status === 'active'">Status: {{ status }}</p>
    <p v-else-if="status === 'pending'">Status: {{ status }}</p>
    <p v-else>Status: {{ status }}</p>

    <button @click="changeStatus">Change Status</button>

    <form @submit.prevent="addTask">
        <input v-model="newTask" placeholder="Enter a task" />
        <button type="submit">Add Task</button>
    </form>

    <h3>Tasks:</h3>
    <ul>
        <li v-for="(task, index) in tasks" :key="index">
            <span style="margin-right: 10px;">
                {{ task }}
            </span>
            <button @click="deleteTask(index)">Delete</button>
        </li>
    </ul>
</template>
