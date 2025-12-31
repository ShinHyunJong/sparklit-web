import invitationEditorAtom from '@/atoms/invitationEditor';
import { globalStore } from '@/components/ui/provider';
import { toaster } from '@/components/ui/toaster';

export async function saved<T>(promiseFn: () => Promise<T>): Promise<T> {
  try {
    globalStore.set(invitationEditorAtom.isSaving, true);
    const result = await promiseFn();
    globalStore.set(invitationEditorAtom.isSaving, false);
    return result;
  } catch (error) {
    toaster.create({
      title: 'Failed to save changes.',
      type: 'error',
    });
    throw error;
  } finally {
    globalStore.set(invitationEditorAtom.isSaving, false);
  }
}
