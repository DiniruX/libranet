<template>
  <div>
    <!-- Add margin if you want to see some of the overlay behind the modal-->
    <div class="px-6 py-4 text-left modal-content">
      <!--Title-->
      <div class="flex items-center justify-between pb-3">
        <p class="text-2xl font-bold">View Reservation</p>
        <div class="z-50 cursor-pointer modal-close" @click="false">
          <svg class="text-black fill-current" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
          </svg>
        </div>
      </div>

      <!--Body-->
      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">Library</span>
        <p class="block mt-1 mb-6 text-sm text-gray-600">{{ getLibraryName(library_id) }}</p>
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">User</span>
        <p class="block mt-1 mb-6 text-sm text-gray-600">{{ getUserName(user_id) }}</p>
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">Reservation from</span>
        <p class="block mt-1 mb-6 text-sm text-gray-600">{{ formatDate(reservation_from) }}</p>
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">Reservation to</span>
        <p class="block mt-1 mb-6 text-sm text-gray-600">{{ formatDate(reservation_to) }}</p>
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">Books</span>
        <p class="block mt-1 mb-6 text-sm text-gray-600">{{ getBookNames(book_ids) }}</p>
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">Status</span>
        <StatusLayout :status="status" class="mb-6" />
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">Created at</span>
        <p class="block mt-1 mb-6 text-sm text-gray-600">{{ created_at }}</p>
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">Reservation type</span>
        <p v-if="from_library_id !== null" class="block mt-1 mb-6 text-sm text-gray-600">This is a <strong>inter</strong> library reservation</p>
        <p v-else class="block mt-1 mb-6 text-sm text-gray-600">This is a <strong>same</strong> library reservation</p>
      </label>

      <div v-if="from_library_id !== null">
        <hr class="my-6" />
        <span class="text-md mb-2 text-gray-700 capitalize font-semibold">Inter library reservation info</span>
        <label class="block">
          <span class="text-sm text-gray-700 capitalize font-semibold">Arrival library</span>
          <p class="block mt-1 mb-6 text-sm text-gray-600">{{ getLibraryName(from_library_id) }}</p>
        </label>

        <label class="block">
          <span class="text-sm text-gray-700 capitalize font-semibold">Status</span>
          <StatusLayout :status="interLibStatus" />
        </label>

        <label class="block">
          <span class="text-sm text-gray-700 capitalize font-semibold">Logistic status</span>
          <StatusLayout :status="logisticStatus" />
        </label>
        <hr class="my-6" />
      </div>

      <label class="block">
        <span class="text-sm text-gray-700 font-semibold">Does this reservation has fines?</span>
        <p v-if="fines.length > 0" class="block mt-1 mb-6 text-sm text-gray-600">Yes</p>
        <p v-else class="block mt-1 mb-6 text-sm text-gray-600">No</p>
      </label>

      <div v-if="fines.length > 0">
        <hr class="my-6" />
        <span class="text-md mb-2 text-gray-700 capitalize font-semibold">Fines info</span>
        <ul class="list-disc list-inside">
          <li v-for="fine in fines" :key="fine.id" class="text-sm text-gray-600 mb-2">
            {{ fine.reason }} - {{ fine.amount }}¥ <StatusLayout :status="fine.status" />
          </li>
        </ul>
      </div>
      <div v-else>
        <p class="text-sm text-gray-600 mb-6">No fines associated with this reservation.</p>
      </div>
      <div class="flex justify-end pt-2 gap-2">
        <button
          v-if="(loggedInRole === 'admin' || loggedInRole === 'librarian') && loggedInLibId === library_id.toString()"
          @click="openNewFineModal"
          class="px-2 py-1 text-sm font-medium tracking-wide text-white bg-orange-500 rounded-md hover:bg-gray-500 focus:outline-none"
        >
          Add Fine
        </button>
        <button
          v-if="loggedInRole === 'librarian' && loggedInLibId === library_id.toString()"
          @click="confirmReservation(props.id)"
          class="px-2 py-1 text-sm font-medium tracking-wide text-white bg-blue-500 rounded-md hover:bg-gray-500 focus:outline-none"
        >
          Confirm
        </button>
      </div>
    </div>

    <!-- new fine modal -->
    <div
      :class="`modal ${
        !isNewFineModalOpen && 'opacity-0 pointer-events-none'
      } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`"
    >
      <div @click="isNewFineModalOpen = false" class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"></div>

      <div class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md">
        <!-- md:max-w-6xl -->
        <div class="absolute top-0 right-0 z-50 flex flex-col items-center mt-4 mr-4 text-sm text-white cursor-pointer modal-close">
          <svg class="text-white fill-current" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
          </svg>
          <span class="text-sm">(Esc)</span>
        </div>
        <NewFineModal :id="props.id" :due_date="reservation_to" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted, watch } from 'vue'
import axios from 'axios'
const BASE_URL = process.env.VUE_APP_BASE_URL
import StatusLayout from '@/components/status/StatusLayout.vue'
import NewFineModal from '../fines/NewFineModal.vue'

const libs = ref([])
const users = ref([])
const books = ref([])
interface Fine {
  id: number
  reason: string
  amount: number
  status: string
}
const fines = ref<Fine[]>([])
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
})
const token = ref(localStorage.getItem('token') || '')
const library_id = ref('')
const user_id = ref('')
const reservation_from = ref('')
const reservation_to = ref('')
const book_ids = ref('')
const status = ref('')
const created_at = ref('')
const loading = ref(false)
const isNewFineModalOpen = ref(false)
const loggedInRole = ref(localStorage.getItem('role'))
const loggedInLibId = ref(localStorage.getItem('library_id'))

// inter library reservation
const from_library_id = ref('')
const interLibStatus = ref('')
const logisticStatus = ref('')

async function fetchReservation() {
  try {
    const response = await axios.get(`${BASE_URL}/reservations/${props.id}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    const res = response.data
    if (res) {
      library_id.value = res.library_id || ''
      user_id.value = res.user_id || ''
      reservation_from.value = res.reservation_from || ''
      reservation_to.value = res.reservation_to || ''
      book_ids.value = res.book_ids || []
      status.value = res.status || ''
      created_at.value = res.created_at || ''
    }
  } catch (error) {
    console.error('Error fetching book:', error)
  }
}

async function fetchInterLibReservation() {
  try {
    const response = await axios.get(`${BASE_URL}/inter-lib-reservations/reservation-id/${props.id}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    const res = response.data
    if (res) {
      from_library_id.value = res.from_library_id || ''
      interLibStatus.value = res.status || ''
      logisticStatus.value = res.logistic_status || ''
    }
    await fetchFines()
  } catch (error) {
    console.error('Error fetching book:', error)
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

async function fetchFines() {
  loading.value = true
  try {
    const response = await axios.get(`${BASE_URL}/fines/reservation/${props.id}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    console.log('Fines response:', response.data)
    fines.value = response.data || []
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await fetchLibs()
  await fetchUsers()
  await fetchBooks()
})

watch(
  () => props.id,
  async (newId) => {
    if (newId) {
      await fetchInterLibReservation()
      await fetchReservation()
    }
  },
  { immediate: true }
)

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

function openNewFineModal() {
  isNewFineModalOpen.value = true
}

async function confirmReservation(resId: number) {
  if (!confirm('Are you sure you want to confirm this reservation?')) return
  try {
    await axios.put(
      `${BASE_URL}/reservations/${resId}/confirm`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    )
  } catch (error) {
    console.error('There was a problem with the delete operation:', error)
  }
}
</script>
