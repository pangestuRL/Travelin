import { defineStore } from "pinia"

export const useCartStore = defineStore("cart", {
  state: () => ({
    count: 0,
  }),
  actions: {
    setCount(n: number) {
      this.count = n
    },
    increment(n: number = 1) {
      this.count += n
    },
    decrement(n: number = 1) {
      this.count = Math.max(0, this.count - n)
    },
  },
})
