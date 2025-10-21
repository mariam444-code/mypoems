// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Importeer je pagina/componenten
import HomePage from '@/desktop/components/home.vue'
import About from '@/desktop/components/about.vue'
import Books from '@/desktop/components/books.vue'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/books',
        name: 'Books',
        component: Books
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router

