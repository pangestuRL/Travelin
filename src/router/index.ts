import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import LoginView from "../views/LoginView.vue"
import RegisterView from "../views/RegisterView.vue"
import DetailDestinationView from "../views/DetailDestinationView.vue"
import CartView from "../views/CartView.vue"
import TransactionsView from "../views/TransactionsView.vue"

const routes = [
    { path: "/", name: "Home", component: HomeView },
    { path: "/login", name: "Login", component: LoginView },
    { path: "/register", name: "Register", component: RegisterView },
    { path: "/destination/:id", name: "DestinationDetail", component: DetailDestinationView },
    { path: "/cart", name: "Cart", component: CartView },
    { path: "/transactions", name: "Transactions", component: TransactionsView }, 


]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
