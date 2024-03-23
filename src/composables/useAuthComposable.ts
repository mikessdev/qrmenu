import { ref } from 'vue';

const isAuthenticated = ref<boolean>(false);

export function useAuthComposable() {
  const updateAuthState = (authState: boolean) => {
    isAuthenticated.value = authState;
  };

  return {
    isAuthenticated,
    updateAuthState
  };
}
