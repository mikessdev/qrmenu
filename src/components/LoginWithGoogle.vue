<script setup lang="ts">
import { firebaseAuth } from '@/firebase/config';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const emit = defineEmits(['signInWithGoogle']);

const signInWithGoogle = async () => {
  try {
    const userCredential = await signInWithPopup(firebaseAuth, new GoogleAuthProvider());
    emit('signInWithGoogle', userCredential);
  } catch (error) {
    console.error(error.code);
  }
};
</script>
<template>
  <div
    class="mx-auto flex h-[40px] max-w-[300px] cursor-pointer items-center justify-between rounded-[2px] border-2 bg-white px-[10px]"
    @click="signInWithGoogle()"
  >
    <img src="../assets/img/google.png" width="24" />
    <span class="text-right font-notosans text-xs font-bold text-black"
      >Criar conta com o google</span
    >
  </div>
</template>

<style lang="scss" scoped></style>
