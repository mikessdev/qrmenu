<script setup lang="ts">
import { type PropType } from 'vue';

const props = defineProps({
  fixed: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: '#f85d3a'
  },
  headerItens: {
    type: Array as PropType<HeaderItem[]>,
    default: [] as HeaderItem[]
  }
});

interface HeaderItem {
  id: number;
  text: string;
  action: Function;
  show: boolean;
}
</script>

<template>
  <header
    :style="`background-color: ${props.color}`"
    :class="props.fixed ? 'fixed z-20' : ''"
    class="h-[60px] w-full shadow-md"
  >
    <div
      class="mx-auto my-0 flex h-full max-w-[1200px] items-center justify-between px-2.5 font-notosans font-bold text-white"
    >
      <router-link to="/">
        <p>LOGO</p>
      </router-link>

      <ul class="flex">
        <li class="ml-[10px]" v-for="item in headerItens" :key="item.id">
          <a
            v-if="item.show"
            @click="item.action"
            class="cursor-pointer hover:text-qr-medium-gray"
            >{{ item.text }}</a
          >
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
