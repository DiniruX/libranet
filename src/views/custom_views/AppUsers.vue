<template>
  <div>
    <Breadcrumb breadcrumb="Users" />
    <div class="mt-4">
      <div class="flex flex-wrap -mx-6">
        <div class="w-full px-6 sm:w-1/2 xl:w-1/3">
          <div class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
            <div class="text-white bg-blue-500 rounded-full p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
                width="40"
                height="40"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                />
              </svg>
            </div>
            <div class="mx-5">
              <h4 class="text-2xl font-semibold text-gray-700">{{ users.length > 0 ? users.length : 'No' }}</h4>
              <div class="text-gray-500">Total Users</div>
            </div>
          </div>
        </div>
        <div class="w-full px-6 sm:w-1/2 xl:w-1/3">
          <div class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
            <div class="text-white bg-green-500 rounded-full p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
                width="40"
                height="40"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                />
              </svg>
            </div>
            <div class="mx-5">
              <h4 class="text-2xl font-semibold text-gray-700">
                {{ users.filter((u) => u.is_active).length > 0 ? users.filter((u) => u.is_active).length : 'No' }}
              </h4>
              <div class="text-gray-500">Active Users</div>
            </div>
          </div>
        </div>
        <div class="w-full px-6 sm:w-1/2 xl:w-1/3">
          <div class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
            <div class="text-white bg-red-500 rounded-full p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
                width="40"
                height="40"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                />
              </svg>
            </div>
            <div class="mx-5">
              <h4 class="text-2xl font-semibold text-gray-700">
                {{ users.filter((u) => !u.is_active).length > 0 ? users.filter((u) => !u.is_active).length : 'No' }}
              </h4>
              <div class="text-gray-500">Inactive Users</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8"></div>

    <div class="flex flex-col mt-8">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div class="flex justify-end items-end px-6 py-4 mb-2 w-full gap-2">
          <button @click="fetchUsers" class="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-500 focus:outline-none">
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
                  Name
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  Status
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  Role
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody class="bg-white">
              <tr v-for="(u, index) in users" :key="index">
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 w-10 h-10">
                      <img
                        class="w-10 h-10 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </div>

                    <div class="ml-4">
                      <div class="text-sm font-medium leading-5 text-gray-900">
                        {{ u.name }}
                      </div>
                      <div class="text-sm leading-5 text-gray-500">
                        {{ u.email }}
                      </div>
                    </div>
                  </div>
                </td>

                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  <div class="text-sm leading-5 text-gray-900">
                    <StatusLayout :status="u.is_active ? 'active' : 'inactive'" />
                  </div>
                </td>

                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap capitalize">
                  {{ u.role }}
                </td>

                <td class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap">
                  <div class="flex justify-around">
                    <span class="text-yellow-500 flex justify-center">
                      <a href="#" class="mx-2 px-2 rounded-md" @click.prevent="updateUser(u.id)" title="Update User"
                        ><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-700" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                          <path
                            fill-rule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </a>
                      <form method="POST" @submit.prevent="deleteUser(u.id)">
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

    <!-- update user modal -->
    <div
      :class="`modal ${
        !isUpdateUserModalOpen && 'opacity-0 pointer-events-none'
      } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`"
    >
      <div @click="isUpdateUserModalOpen = false" class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"></div>

      <div class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md">
        <div class="absolute top-0 right-0 z-50 flex flex-col items-center mt-4 mr-4 text-sm text-white cursor-pointer modal-close">
          <svg class="text-white fill-current" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
          </svg>
          <span class="text-sm">(Esc)</span>
        </div>
        <UpdateUserModal :id="selectedUserId" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Breadcrumb from '../../partials/AppBreadcrumb.vue'
import axios from 'axios'
import UpdateUserModal from '@/components/users/UpdateUserModal.vue'
import StatusLayout from '@/components/status/StatusLayout.vue'
const BASE_URL = process.env.VUE_APP_BASE_URL

interface User {
  id: number
  name: string
  email: string
  is_active: boolean
  role: string
}

const users = ref<User[]>([])
const loading = ref(false)
const token = ref(localStorage.getItem('token') || '')
const isUpdateUserModalOpen = ref(false)
const selectedUserId = ref()
const loggedInRole = ref(localStorage.getItem('role'))

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

async function fetchUsersByLib() {
  loading.value = true
  try {
    const lib_id = localStorage.getItem('library_id')
    const response = await axios.get(`${BASE_URL}/users/library/${lib_id}`, {
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

onMounted(async () => {
  if (loggedInRole.value === 'admin') {
    await fetchUsers()
  } else if (loggedInRole.value === 'librarian') {
    await fetchUsersByLib()
  }
})

async function deleteUser(userId: number) {
  if (!confirm('Are you sure you want to delete this user?')) return
  try {
    await axios.delete(`${BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    await fetchUsers()
  } catch (error) {
    console.error('There was a problem with the delete operation:', error)
  }
}

function updateUser(id: number) {
  selectedUserId.value = id
  isUpdateUserModalOpen.value = true
}
</script>
<style>
.modal {
  transition: opacity 0.25s ease;
}
</style>
