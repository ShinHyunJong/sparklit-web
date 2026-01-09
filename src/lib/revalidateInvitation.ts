export async function triggerInvitationRevalidate(invitationUid: string) {
  if (!invitationUid) return;

  try {
    await fetch('/api/revalidate/invitation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invitationUid }),
    });
  } catch {
    // Best-effort revalidate
  }
}
