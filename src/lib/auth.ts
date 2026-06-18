export type AuthUser = {
  email: string;
  fullName?: string;
  displayName: string;
  initials: string;
  membership: string;
};

const authUserStorageKey = "kostmeal.auth.user";
const defaultMembership = "Akun KostMeal";

function toTitleCase(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function getDisplayNameFromEmail(email: string): string {
  const localPart = email.split("@")[0] ?? "";
  const withoutTrailingNumbers = localPart.replace(/\d+$/g, "");
  const normalized = withoutTrailingNumbers.replace(/[._-]+/g, " ").trim();

  return toTitleCase(normalized || "User");
}

export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) return "U";

  return words
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

export function createAuthUser(input: { email: string; fullName?: string }): AuthUser {
  const trimmedFullName = input.fullName?.trim();
  const displayName = trimmedFullName ? toTitleCase(trimmedFullName) : getDisplayNameFromEmail(input.email);

  return {
    email: input.email.trim().toLowerCase(),
    fullName: trimmedFullName ? displayName : undefined,
    displayName,
    initials: getInitials(displayName),
    membership: defaultMembership,
  };
}

export function saveAuthUser(user: AuthUser): void {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(authUserStorageKey, JSON.stringify(user));
}

export function getAuthUser(): AuthUser | null {
  if (typeof window === "undefined") return null;

  try {
    const rawUser = window.localStorage.getItem(authUserStorageKey);
    if (!rawUser) return null;

    const parsedUser = JSON.parse(rawUser) as Partial<AuthUser>;
    if (!parsedUser.email || !parsedUser.displayName || !parsedUser.initials) return null;

    return {
      email: parsedUser.email,
      fullName: parsedUser.fullName,
      displayName: parsedUser.displayName,
      initials: parsedUser.initials,
      membership: parsedUser.membership ?? defaultMembership,
    };
  } catch {
    return null;
  }
}

export function clearAuthUser(): void {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(authUserStorageKey);
}
