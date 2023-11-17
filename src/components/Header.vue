<script setup lang="ts">
export interface HeaderLinks {
  id: number;
  name: string;
  link: string;
}

const props = defineProps({
  fixed: {
    type: Boolean,
    default: false
  },
  links: {
    type: Array<HeaderLinks>,
    default: []
  },
  center: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: '#f85d3a'
  }
});
</script>

<template>
  <header
    :style="`background-color: ${props.color}`"
    :class="props.fixed ? 'fixed z-20' : ''"
    class="h-[60px] w-full shadow-md"
  >
    <div
      v-if="props.center"
      class="mx-auto my-0 flex h-full max-w-[1200px] items-center px-2.5 font-notosans font-bold text-white"
    >
      <p class="mx-auto">LOGO</p>
    </div>
    <div
      v-if="!props.center"
      class="mx-auto my-0 flex h-full max-w-[1200px] items-center justify-between px-2.5 font-notosans font-bold text-white"
    >
      <p>LOGO</p>
      <ul>
        <li v-for="link in props.links" :key="link.id">
          <router-link :to="link.link">
            <a class="cursor-pointer hover:text-qr-medium-gray">{{ link.name }}</a>
          </router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script lang="ts">
export default {
  name: 'HeaderItem'
};
</script>
