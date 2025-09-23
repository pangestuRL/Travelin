<template>
  <footer class="bg-blue-600 text-white py-8 mt-12">
    <div class="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Brand -->
      <div>
        <h2 class="text-2xl font-bold">Travelin</h2>
        <p class="mt-2 text-sm text-blue-100">
          Platform untuk booking destinasi wisata terbaik. Temukan pengalaman
          baru di setiap perjalananmu 🚀
        </p>
      </div>

      <!-- Links -->
      <div>
        <h3 class="text-lg font-semibold mb-3">Quick Links</h3>
        <ul class="space-y-2 text-sm">
          <li><RouterLink to="/" class="hover:underline">Home</RouterLink></li>
          <li><RouterLink to="/login" class="hover:underline">Login</RouterLink></li>
          <li><RouterLink to="/cart" class="hover:underline">Cart</RouterLink></li>
          <li><RouterLink to="/transactions" class="hover:underline">Transactions</RouterLink></li>
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h3 class="text-lg font-semibold mb-3">Contact Us</h3>
        <p class="text-sm">📍 Jakarta, Indonesia</p>
        <p class="text-sm">✉️ support@travelin.com</p>
        <p class="text-sm">📞 +62 812 3456 7890</p>
      </div>
    </div>

    <!-- Copyright -->
    <div class="border-t border-blue-500 mt-8 pt-4 text-center text-sm text-blue-200">
      © {{ new Date().getFullYear() }} Travelin. All rights reserved.
    </div>
  </footer>
</template>
