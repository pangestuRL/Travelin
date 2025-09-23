import { defineStore } from 'pinia'

interface User {
  id: string
  email: string
  role: string
  name?: string
  profilePictureUrl?: string
  phoneNumber?: string
}

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
}

const BASE_URL = "https://travel-journal-api-bootcamp.do.dibimbing.id"
const API_KEY = "24405e01-fbc1-45a5-9f5a-be13afcd757c"

export const useUserStore = defineStore('user', {
  state: (): AuthState => ({
    user: null,
    token: null,
    loading: false,
    error: null,
  }),

  actions: {
    async register(name: string, email: string, password: string, role: string = "user") {
    this.loading = true
    this.error = null
    try {
        const res = await fetch(`${BASE_URL}/api/v1/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "apiKey": API_KEY,
        },
        body: JSON.stringify({
            name,          
            email,
            password,
            passwordRepeat: password,
            role,
        }),
        })

        if (!res.ok) throw new Error("Register gagal")
        return await res.json()
    } catch (err: any) {
        this.error = err.message
    } finally {
        this.loading = false
    }
    },

    async login(email: string, password: string) {
      this.loading = true
      this.error = null
      try {
        const res = await fetch(`${BASE_URL}/api/v1/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apiKey": API_KEY,
          },
          body: JSON.stringify({ email, password }),
        })

        if (!res.ok) throw new Error("Login gagal")
        const data = await res.json()
        console.log(data);
        this.token = data.token || data.accessToken || null
        if (this.token) localStorage.setItem("token", this.token)

        return data
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async fetchUser() {
      if (!this.token) return
      try {
        const res = await fetch(`${BASE_URL}/api/v1/user`, {
          headers: {
            "Authorization": `Bearer ${this.token}`,
            "apiKey": API_KEY,
          },
        })
        if (!res.ok) throw new Error("Gagal ambil user")
        const data = await res.json()
        this.user = data
      } catch (err: any) {
        this.error = err.message
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem("token")
    }
  }
})
