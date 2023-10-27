<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { isGetAccessorDeclaration } from 'typescript';

const props = defineProps({
  fixed: {
    type: Boolean,
    default: false
  },
  links: {
    type: Array<HeaderLinks>,
    default: []
  }
});

export interface HeaderLinks {
  id: number;
  name: string;
  link: string;
}
</script>
<template>
  <header
    :class="props.fixed ? 'fixed z-20' : ''"
    class="h-[60px] w-full bg-qr-primary-orange shadow-md"
  >
    <div
      class="mx-auto my-0 flex h-full max-w-[1200px] items-center justify-between px-2.5 font-notosans font-bold text-white"
    >
      <p>SEU CARDÁPIO</p>
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
