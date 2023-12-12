import AlertDialog from '@/components/AlertDialog.vue';
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

describe('AlertDialog', () => {
  it('should display AlertDialog component', async () => {
    const name = 'pasteis';
    const type = 'categoria';
    const message =
      'Ao deletar uma categoria, todos os produtos que estão nela também serão deletados!';

    const wrapper = mount(AlertDialog, {
      props: {
        name: name,
        type: type,
        message: message
      }
    });

    expect(wrapper.exists()).toBe(true);
  });
});
