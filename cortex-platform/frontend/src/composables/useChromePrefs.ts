import { ref, watch } from "vue";

const NOTIFICATION_KEY = "cortex-browser-notifications";
const SOUND_KEY = "cortex-sound-reminder";
const LEGACY_NOTIFICATION_KEY = "manus-browser-notifications";
const LEGACY_SOUND_KEY = "manus-sound-reminder";

function readBool(key: string, legacyKey: string, fallback: boolean): boolean {
  try {
    const raw = localStorage.getItem(key) ?? localStorage.getItem(legacyKey);
    if (raw === null) return fallback;
    const value = JSON.parse(raw) === true;
    if (localStorage.getItem(key) === null) {
      localStorage.setItem(key, JSON.stringify(value));
    }
    return value;
  } catch {
    return fallback;
  }
}

function writeBool(key: string, value: boolean): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

const browserNotificationsEnabled = ref(
  readBool(NOTIFICATION_KEY, LEGACY_NOTIFICATION_KEY, false),
);
const soundReminderEnabled = ref(readBool(SOUND_KEY, LEGACY_SOUND_KEY, false));

watch(browserNotificationsEnabled, (v) => writeBool(NOTIFICATION_KEY, v));
watch(soundReminderEnabled, (v) => writeBool(SOUND_KEY, v));

export function useChromePrefs() {
  const setBrowserNotifications = async (enabled: boolean) => {
    if (enabled) {
      if (typeof Notification === "undefined") {
        browserNotificationsEnabled.value = false;
        return false;
      }
      const permission = await Notification.requestPermission();
      const ok = permission === "granted";
      browserNotificationsEnabled.value = ok;
      return ok;
    }
    browserNotificationsEnabled.value = false;
    return true;
  };

  const setSoundReminder = (enabled: boolean) => {
    soundReminderEnabled.value = enabled;
  };

  return {
    browserNotificationsEnabled,
    soundReminderEnabled,
    setBrowserNotifications,
    setSoundReminder,
  };
}
