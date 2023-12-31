<script setup lang="ts">
import { useAuthStore } from '@/store/authStore';
import { useUserStore } from '@/store/userStore';
import type { User } from '@/utils/interfaces/User';
import { useRouter } from 'vue-router';

const router = useRouter();

const userStore = useUserStore();
const authStore = useAuthStore();

const signInWithGoogle = async () => {
  await authStore.signInWithGoogle();

  const { uid: userId, emailVerified } = authStore.userCredential.user;

  await userStore.getUser(userId);
  const useAlreadyExists = !!userStore.user.id;

  if (useAlreadyExists) {
    userStore.user.accessToken = await authStore.userCredential.user.getIdToken();

    if (!userStore.user.emailVerified) {
      userStore.user.emailVerified = emailVerified;
      await userStore.updateUser(userStore.user, userStore.user.accessToken);
    }

    return router.push('/select-menu');
  }

  if (!useAlreadyExists) {
    const {
      displayName,
      email,
      emailVerified,
      phoneNumber,
      uid: id
    } = authStore.userCredential.user;
    const name = displayName?.split(' ')[0];
    const lastName = displayName?.split(' ')[1];

    await userStore.createUser({
      id,
      name,
      lastName,
      email,
      emailVerified,
      phoneNumber
    } as User);

    userStore.user.accessToken = await authStore.userCredential.user.getIdToken();
    return router.push('/select-menu');
  }
};
</script>
<template>
  <div
    class="mx-auto flex h-[40px] max-w-[300px] cursor-pointer items-center justify-between rounded-[2px] border-2 bg-white px-[10px]"
    @click="signInWithGoogle()"
  >
    <img src="../assets/img/google.png" width="24" />
    <span class="text-right font-notosans text-xs font-bold text-black">Entrar com o google</span>
  </div>
</template>

<style lang="scss" scoped></style>
