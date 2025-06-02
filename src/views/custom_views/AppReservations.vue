<template>
  <div>
    <Breadcrumb breadcrumb="Resevations" />
    <div class="mt-4">
      <div class="flex flex-wrap -mx-6">
        <div class="w-full px-6 sm:w-1/2 xl:w-1/3">
          <div class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
            <div class="p-3 bg-indigo-600 bg-opacity-75 rounded-full">
              <svg class="w-8 h-8 text-white" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                  fill="currentColor"
                />
                <path
                  d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                  fill="currentColor"
                />
                <path
                  d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                  fill="currentColor"
                />
                <path
                  d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                  fill="currentColor"
                />
                <path
                  d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                  fill="currentColor"
                />
                <path
                  d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            <div class="mx-5">
              <h4 class="text-2xl font-semibold text-gray-700">{{ reservations.length > 0 ? reservations.length : 'No' }}</h4>
              <div class="text-gray-500">Total Reservations</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8"></div>

    <div class="flex flex-col mt-8">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div class="flex justify-end items-end px-6 py-4 mb-2 w-full gap-2">
          <h3 class="text-lg font-semibold text-gray-700"></h3>
          <button @click="newRes" class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none">
            New Reservation
          </button>
          <button
            @click="fetchReservations"
            class="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-indigo-500 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
              width="20"
              height="20"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </button>
        </div>
        <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
          <table class="min-w-full">
            <thead>
              <tr>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  Library
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  User
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  From - to(Automatically set for 14 days)
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  Books
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody class="bg-white">
              <tr v-for="(u, index) in reservations" :key="index">
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="text-sm font-medium leading-5 text-gray-900">
                      {{ getLibraryName(u.library_id) }}
                    </div>
                  </div>
                </td>

                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  <div class="text-sm leading-5 text-gray-900">
                    <div class="text-sm leading-5 text-gray-500">
                      {{ getUserName(u.user_id) }}
                    </div>
                  </div>
                </td>

                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="ml-1">
                      <div class="text-sm leading-5 text-gray-500">From {{ formatDate(u.reservation_from) }}</div>
                      <div class="text-sm leading-5 text-gray-500">To {{ formatDate(u.reservation_to) }}</div>
                    </div>
                  </div>
                </td>

                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  <div class="text-sm leading-5 text-gray-900">
                    <div class="text-sm leading-5 text-gray-500">
                      {{ getBookNames(u.book_ids) }}
                    </div>
                  </div>
                </td>

                <td class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap">
                  <div class="flex justify-around">
                    <span class="text-yellow-500 flex justify-center">
                      <a href="#" class="mx-2 px-2 rounded-md" @click.prevent="viewRes(u.id)" title="Update Book">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="2.5"
                          stroke="currentColor"
                          class="h-5 w-5 text-yellow-500"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                          />
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      </a>
                      <a href="#" class="mx-2 px-2 rounded-md" @click.prevent="updateRes(u.id)" title="Update Book"
                        ><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-700" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                          <path
                            fill-rule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </a>
                      <form method="POST" @submit.prevent="deleteReservation(u.id)">
                        <button class="mx-2 px-2 rounded-md">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-700" viewBox="0 0 20 20" fill="currentColor">
                            <path
                              fill-rule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </button>
                      </form>
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- update book modal -->
    <div
      :class="`modal ${
        !isUpdateResModalOpen && 'opacity-0 pointer-events-none'
      } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`"
    >
      <div @click="isUpdateResModalOpen = false" class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"></div>

      <div class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md h-4/5">
        <div class="absolute top-0 right-0 z-50 flex flex-col items-center mt-4 mr-4 text-sm text-white cursor-pointer modal-close">
          <svg class="text-white fill-current" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
          </svg>
          <span class="text-sm">(Esc)</span>
        </div>
        <UpdateResModal :id="selectedResId" />
      </div>
    </div>

    <!-- view book modal -->
    <div
      :class="`modal ${
        !isViewResModalOpen && 'opacity-0 pointer-events-none'
      } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`"
    >
      <div @click="isViewResModalOpen = false" class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"></div>

      <div class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md h-4/5">
        <!-- md:max-w-6xl -->
        <div class="absolute top-0 right-0 z-50 flex flex-col items-center mt-4 mr-4 text-sm text-white cursor-pointer modal-close">
          <svg class="text-white fill-current" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
          </svg>
          <span class="text-sm">(Esc)</span>
        </div>
        <ViewResModal :id="selectedResId" />
      </div>
    </div>

    <!-- new book modal -->
    <div
      :class="`modal ${!isNewResModalOpen && 'opacity-0 pointer-events-none'} z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`"
    >
      <div @click="isNewResModalOpen = false" class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"></div>

      <div class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md h-4/5">
        <!-- md:max-w-6xl -->
        <div class="absolute top-0 right-0 z-50 flex flex-col items-center mt-4 mr-4 text-sm text-white cursor-pointer modal-close">
          <svg class="text-white fill-current" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
          </svg>
          <span class="text-sm">(Esc)</span>
        </div>
        <NewResModal />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Breadcrumb from '../../partials/AppBreadcrumb.vue'
import axios from 'axios'
import NewResModal from '@/components/reservations/NewResModal.vue'
import UpdateResModal from '@/components/reservations/UpdateResModal.vue'
import ViewResModal from '@/components/reservations/ViewResModal.vue'
const BASE_URL = process.env.VUE_APP_BASE_URL

const reservations = ref<Reservation[]>([])
interface Reservation {
  id: number
  library_id: string
  user_id: string
  reservation_from: string
  reservation_to: string
  book_ids: string
}
const libs = ref([])
const users = ref([])
const books = ref([])
const loading = ref(false)
const token = ref(localStorage.getItem('token') || '')
const isUpdateResModalOpen = ref(false)
const isViewResModalOpen = ref(false)
const isNewResModalOpen = ref(false)
const selectedResId = ref()

async function fetchReservations() {
  loading.value = true
  try {
    const response = await axios.get(`${BASE_URL}/reservations`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    reservations.value = response.data || []
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error)
  } finally {
    loading.value = false
  }
}

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
  fetchReservations()
  fetchLibs()
  fetchUsers()
  fetchBooks()
})

async function deleteReservation(resId: number) {
  if (!confirm('Are you sure you want to delete this book?')) return
  try {
    await axios.delete(`${BASE_URL}/reservations/${resId}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    await fetchReservations()
  } catch (error) {
    console.error('There was a problem with the delete operation:', error)
  }
}

function updateRes(id: number) {
  selectedResId.value = id
  isUpdateResModalOpen.value = true
}

function viewRes(id: number) {
  selectedResId.value = id
  isViewResModalOpen.value = true
}

function newRes() {
  isNewResModalOpen.value = true
}

function getLibraryName(libraryId: string | number): string {
  const library = libs.value.find((lib) => lib.id === libraryId)
  return library ? library.name : 'Unknown Library'
}

function getUserName(userId: string | number): string {
  const user = users.value.find((u) => u.id === userId)
  return user ? user.name : 'Unknown user'
}

function getBookNames(bookIds: any): string {
  const plainIds = Array.isArray(bookIds) ? bookIds : Array.from(bookIds)

  return plainIds
    .map((id: number) => {
      const book = books.value.find((b) => b.id === id)
      return book ? book.title : 'Unknown Book'
    })
    .join(', ')
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}
</script>
<style>
.modal {
  transition: opacity 0.25s ease;
}
</style>
