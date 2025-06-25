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

  const {
    uid: firebaseId,
    emailVerified,
    displayName,
    email,
    phoneNumber
  } = authStore.userCredential?.user;
  const accessToken = await authStore.userCredential?.user.getIdToken();
  await userStore.getUserByFirebaseId(firebaseId, accessToken);

  if (userStore.user.id) {
    userStore.user.accessToken = accessToken;

    if (!userStore.user.emailVerified) {
      userStore.user.emailVerified = emailVerified;
      await userStore.updateUser(userStore.user, userStore.user.accessToken);
    }

    return router.push('/select-menu');
  }

  const name = displayName?.split(' ')[0];
  const lastName = displayName?.split(' ')[1];

  await userStore.createUser(
    {
      firebaseId,
      name,
      lastName,
      email,
      emailVerified,
      phoneNumber
    } as User,
    accessToken
  );

  userStore.user.accessToken = accessToken;
  return router.push('/select-menu');
};
</script>
<template>
  <div
    class="mx-auto flex h-[40px] w-[220px] cursor-pointer items-center justify-between rounded-[2px] border-2 bg-white px-[10px]"
    @click="signInWithGoogle()"
  >
    <img src="../assets/img/google.png" width="24" />
    <span class="paragraph-12px text-right font-bold text-black">Entrar com o google</span>
  </div>
</template>

<style lang="scss" scoped></style>
