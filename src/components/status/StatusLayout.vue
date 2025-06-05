<template>
  <div>
    <!-- reservation --> <!-- inter lib reservations --> <!-- fine -->
    <div v-if="props.status === 'pending'" class="text-sky-600">
      <span class="inline-flex px-2 text-xs font-semibold leading-5 text-sky-800 bg-sky-100 rounded-full">Pending</span>
    </div>
    <!-- reservation -->
    <div v-else-if="props.status === 'confirmed'" class="text-green-600">
      <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Confirmed</span>
    </div>
    <!-- reservation --> <!-- fine -->
    <div v-else-if="props.status === 'cancelled'" class="text-yellow-600">
      <span class="inline-flex px-2 text-xs font-semibold leading-5 text-yellow-800 bg-yellow-100 rounded-full">Cancelled</span>
    </div>
    <!-- reservation -->
    <div v-else-if="props.status === 'expired'" class="text-rose-600">
      <span class="inline-flex px-2 text-xs font-semibold leading-5 text-rose-800 bg-rose-100 rounded-full">Expired</span>
    </div>
    <!-- reservation -->
    <div v-else-if="props.status === 'checked out'" class="text-fuchsia-600">
      <span class="inline-flex px-2 text-xs font-semibold leading-5 text-fuchsia-800 bg-fuchsia-100 rounded-full">Checked out</span>
    </div>
    <!-- reservation -->
    <div v-else-if="props.status === 'borrowed'" class="text-gray-600">
      <span class="inline-flex px-2 text-xs font-semibold leading-5 text-gray-800 bg-gray-100 rounded-full">Borrowed</span>
    </div>
    <!-- book -->
    <div v-else-if="props.status === 'available'" class="text-green-600">
      <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Available</span>
    </div>
    <!-- book -->
    <div v-else-if="props.status === 'reserved'" class="text-yellow-600">
      <span class="inline-flex px-2 text-xs font-semibold leading-5 text-yellow-800 bg-yellow-100 rounded-full">Reserved</span>
    </div>
    <!-- book -->
    <div v-else-if="props.status === 'damaged'" class="text-red-600">
      <span class="inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full">Damaged</span>
    </div>
    <!-- book -->
    <div v-else-if="props.status === 'lost'" class="text-gray-600">
      <span class="inline-flex px-2 text-xs font-semibold leading-5 text-gray-800 bg-gray-100 rounded-full">Lost</span>
    </div>
    <!-- fine -->
    <div v-else-if="props.status === 'paid'" class="text-green-600">
      <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Paid</span>
    </div>
    <!-- fine -->
    <div v-else-if="props.status === 'unpaid'" class="text-red-600">
      <span class="inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full">Unpaid</span>
    </div>
    <!-- inter lib reservations -->
    <div v-else-if="props.status === 'in transit'" class="text-amber-600">
      <span class="inline-flex px-2 text-xs font-semibold leading-5 text-amber-800 bg-amber-100 rounded-full">In transit</span>
    </div>
    <!-- inter lib reservations -->
    <div v-else-if="props.status === 'delivered'" class="text-green-600">
      <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Delivered</span>
    </div>
    <!-- user -->
    <div v-else-if="props.status === 'active'" class="text-green-600">
      <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
    </div>
    <!-- user -->
    <div v-else-if="props.status === 'inactive'" class="text-red-600">
      <span class="inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full">Inactive</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
})
</script>
