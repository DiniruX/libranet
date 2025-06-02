<template>
  <div>
    <!-- Add margin if you want to see some of the overlay behind the modal-->
    <div class="px-6 py-4 text-left modal-content">
      <!--Title-->
      <div class="flex items-center justify-between pb-3">
        <p class="text-2xl font-bold">Add Reservation</p>
        <div class="z-50 cursor-pointer modal-close" @click="false">
          <svg class="text-black fill-current" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
          </svg>
        </div>
      </div>

      <!--Body-->
      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">From</span>
        <input
          type="date"
          class="block w-full mt-1 mb-6 border px-4 py-2 border-gray-400 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 text-sm"
          v-model="reservation_from"
        />
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">To</span>
        <input
          type="date"
          class="block w-full mt-1 mb-6 border px-4 py-2 border-gray-400 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 text-sm"
          v-model="reservation_to"
        />
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">Books</span>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div v-for="book in books" :key="book.id" class="relative p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
            <img
              v-if="book?.cover_image"
              :src="book?.cover_image ? `data:image/png;base64,${book?.cover_image}` : ''"
              class="mb-6 w-full h-28 object-cover rounded-md"
            />
            <div class="text-sm font-medium text-gray-800">
              {{ book.title }}
            </div>
            <div class="text-xs text-gray-500">by {{ book.author }}</div>
            <div v-if="book_ids.includes(book.id)" class="text-xs text-green-500">Added</div>
            <button
              class="absolute top-2 right-2 w-6 h-6 text-white bg-green-500 rounded-full hover:bg-green-600"
              @click="addBookId(book.id)"
              :disabled="book_ids.includes(book.id)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
                width="1.5em"
                height="1.5em"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </button>
          </div>
        </div>
      </label>

      <label class="flex items-center gap-2 mt-6 mb-6">
        <span class="text-sm text-gray-700 capitalize font-semibold"> Requesting from different library? </span>
        <input type="checkbox" class="text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" v-model="isInterLibReservation" />
      </label>

      <div v-if="isInterLibReservation" class="mt-4">
        <label class="block">
          <span class="text-sm text-gray-700 capitalize font-semibold">From Library</span>
          <select
            class="block w-full h-full px-4 py-2 pr-8 mb-6 leading-tight text-gray-700 bg-white border border-gray-400 rounded-l appearance-none focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
            v-model="from_library_id"
          >
            <option v-for="lib in libs" :key="lib.id" :value="lib.id" class="whitespace-nowrap">
              {{ lib.name }}
            </option>
          </select>
        </label>
      </div>

      <!--Footer-->
      <div class="flex justify-end pt-2 gap-2">
        <button
          @click="clearForm"
          class="px-6 py-3 font-medium tracking-wide text-white bg-gray-300 rounded-md hover:bg-gray-500 focus:outline-none"
        >
          Clear
        </button>
        <button
          @click="saveReservation"
          class="px-6 py-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
        >
          Add
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
import { ref, onMounted } from 'vue'
import axios from 'axios'
const BASE_URL = process.env.VUE_APP_BASE_URL

const today = new Date()
const defaultFromDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())
const defaultToDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14)
interface Library {
  id: string | number
  name: string
}
interface AddBookIdFn {
  (id: string | number): void
}
const users = ref([])
interface Book {
  id: string | number
  title: string
  author: string
  cover_image?: string
}
const books = ref<Book[]>([])
const libs = ref<Library[]>([])
const token = ref(localStorage.getItem('token') || '')
const user_id = ref(localStorage.getItem('user_id') || '')
const library_id = ref(localStorage.getItem('library_id') || '')
const reservation_from = ref(defaultFromDate.toISOString().split('T')[0])
const reservation_to = ref(defaultToDate.toISOString().split('T')[0])
const book_ids = ref<Array<string | number>>([])
const loading = ref(false)

// inter library reservation
const isInterLibReservation = ref(false)
const from_library_id = ref('')

const success = ref('')
const error = ref('')

async function fetchLibs() {
  loading.value = true
  try {
    const response = await axios.get(`${BASE_URL}/libraries`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    libs.value = response.data || []
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error)
  } finally {
    loading.value = false
  }
}

async function fetchUsers() {
  loading.value = true
  try {
    const response = await axios.get(`${BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    users.value = response.data || []
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error)
  } finally {
    loading.value = false
  }
}

async function fetchBooks() {
  loading.value = true
  try {
    const response = await axios.get(`${BASE_URL}/books`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    books.value = response.data || []
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchLibs()
  fetchUsers()
  fetchBooks()
})

const addBookId: AddBookIdFn = function (id) {
  if (!book_ids.value.includes(id)) {
    book_ids.value.push(id)
  }
}

async function saveReservation() {
  success.value = ''
  error.value = ''
  try {
    await axios.post(
      `${BASE_URL}/reservations`,
      {
        user_id: user_id.value,
        library_id: library_id.value,
        reservation_from: reservation_from.value,
        reservation_to: reservation_to.value,
        book_ids: book_ids.value,
        status: 'pending',
        from_library_id: isInterLibReservation.value ? from_library_id.value : null,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.value}`,
        },
      }
    )
    success.value = 'Reservation added successfully'
  } catch (err) {
    console.error('Error adding book:', err)
    if (axios.isAxiosError(err)) {
      error.value = err.response?.data?.message || 'An error occurred while adding the reservation'
    } else {
      error.value = 'An unexpected error occurred'
    }
  }
}

function clearForm() {
  reservation_from.value = defaultFromDate.toISOString().split('T')[0]
  reservation_to.value = defaultToDate.toISOString().split('T')[0]
  book_ids.value = []
  isInterLibReservation.value = false
  from_library_id.value = ''
  success.value = ''
  error.value = ''
}
</script>
