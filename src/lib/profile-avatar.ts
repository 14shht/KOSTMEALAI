"use client";

import { readStorage, writeStorage } from "@/lib/storage";

export const profileAvatarChangedEvent = "kostmeal.profileAvatar.changed";

function avatarStorageKey(email: string) {
  return `kostmeal.profileAvatar.${email}`;
}

export function getProfileAvatar(email: string): string | null {
  return readStorage<string | null>(avatarStorageKey(email), null);
}

export function saveProfileAvatar(email: string, avatarUrl: string | null) {
  writeStorage(avatarStorageKey(email), avatarUrl);
  window.dispatchEvent(new Event(profileAvatarChangedEvent));
}
