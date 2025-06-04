<template>
  <div>
    <!-- Add margin if you want to see some of the overlay behind the modal-->
    <div class="px-6 py-4 text-left modal-content">
      <!--Title-->
      <div class="flex items-center justify-between pb-3">
        <p class="text-2xl font-bold">Update User</p>
        <div class="z-50 cursor-pointer modal-close" @click="false">
          <svg class="text-black fill-current" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
          </svg>
        </div>
      </div>

      <!--Body-->
      <label class="block">
        <span class="text-sm text-gray-700 capitalize">Name</span>
        <input
          type="text"
          class="block w-full mt-1 mb-6 border px-4 py-2 border-gray-400 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 text-sm"
          v-model="name"
        />
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize">Email</span>
        <input
          type="text"
          class="block w-full mt-1 mb-6 border px-4 py-2 border-gray-400 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 text-sm"
          v-model="email"
        />
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize">Role</span>
        <input
          type="text"
          class="block w-full mt-1 mb-6 border px-4 py-2 border-gray-400 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 text-sm"
          v-model="role"
        />
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize">Library</span>
        <select
          class="block w-full h-full px-4 py-2 pr-8 mb-6 leading-tight text-gray-700 bg-white border border-gray-400 rounded-l appearance-none focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
          v-model="library_id"
        >
          <option v-for="lib in libraries" :key="lib.id" :value="lib.id" class="whitespace-nowrap">
            {{ lib.name }}
          </option>
        </select>
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize">Library</span>
        <select
          class="block w-full h-full px-4 py-2 pr-8 mb-6 leading-tight text-gray-700 bg-white border border-gray-400 rounded-l appearance-none focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
          v-model="library_id"
        >
          <option v-for="lib in libraries" :key="lib.id" :value="lib.id" class="whitespace-nowrap">
            {{ lib.name }}
          </option>
        </select>
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize">Status</span>
        <select
          class="block w-full h-full px-4 py-2 pr-8 mb-6 leading-tight text-gray-700 bg-white border border-gray-400 rounded-l appearance-none focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
          v-model="is_active"
        >
          <option v-for="status in fixedStatuses" :key="status.id" :value="status.id" class="whitespace-nowrap">
            {{ status.name }}
          </option>
        </select>
      </label>

      <!--Footer-->
      <div class="flex justify-end pt-2">
        <button
          @click="updateUser"
          class="px-6 py-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
        >
          Update
        </button>
      </div>
      <div v-if="success" class="mt-1 text-green-600 w-full text-right text-sm font-semibold">
        {{ success }}
      </div>
      <div v-if="error" class="mt-1 text-red-600 w-full text-right text-sm font-semibold">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted, watch } from 'vue'
import axios from 'axios'
const BASE_URL = process.env.VUE_APP_BASE_URL

interface Library {
  id: string | number
  name: string
}
const libraries = ref<Library[]>([])
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
})
const token = ref(localStorage.getItem('token') || '')
const name = ref('')
const email = ref('')
const role = ref('')
const library_id = ref('')
const password = ref('')
const is_active = ref(false)
const success = ref('')
const error = ref('')
const fixedStatuses = ref([
  {
    id: true,
    name: 'active',
  },
  {
    id: false,
    name: 'inactive',
  }
])

async function fetchUser() {
  try {
    const response = await axios.get(`${BASE_URL}/users/${props.id}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    console.log('User data:', response.data)
    const user = response.data
    name.value = user.name
    email.value = user.email
    role.value = user.role
    library_id.value = user.library_id
    password.value = user.hashed_password
    is_active.value = user.is_active
  } catch (error) {
    console.error('Error fetching user:', error)
  }
}

async function fetchLibraries() {
  try {
    const response = await axios.get(`${BASE_URL}/libraries`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    libraries.value = response.data || []
  } catch (error) {
    console.error('Error fetching libraries:', error)
    return []
  }
}

async function updateUser() {
  try {
    await axios.put(
      `${BASE_URL}/users/${props.id}`,
      {
        id: props.id,
        name: name.value,
        email: email.value,
        role: role.value,
        library_id: library_id.value,
        hashed_password: password.value,
        is_active: is_active.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    )
    success.value = 'User updated successfully'
  } catch (err) {
    console.error('Error updating user:', err)
    if (axios.isAxiosError(err)) {
      error.value = err.response?.data?.message || 'An error occurred while updating the user'
    } else {
      error.value = 'An unexpected error occurred'
    }
  }
}

onMounted(async () => {
  await fetchLibraries()
})

watch(
  () => props.id,
  (newId) => {
    if (newId) {
      fetchUser()
    }
  },
  { immediate: true }
)
</script>
