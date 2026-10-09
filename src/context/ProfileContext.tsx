import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { Availability, DEFAULT_PROFILE } from '../data/content';

// Low-risk class data only. No passwords, tokens or sensitive records are stored.
const STORAGE_KEY = 'doportfolio.profile.v1';

export type Profile = {
  headline: string;
  bio: string;
  primarySkill: string;
  availability: Availability;
  imageUri: string | null;
};

const DEFAULTS: Profile = { ...DEFAULT_PROFILE, imageUri: null };

type Ctx = {
  profile: Profile;
  loaded: boolean;
  saveProfile: (p: Profile) => Promise<void>;
  resetProfile: () => Promise<void>;
  /** True when the saved profile differs from the built-in default. */
  isCustomised: boolean;
};

const ProfileContext = createContext<Ctx | null>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile>(DEFAULTS);
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(false);

  // Load: restore the saved profile after an app restart.
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as Partial<Profile>;
          setProfile({ ...DEFAULTS, ...parsed });
          setSaved(true);
        }
      } catch {
        // Corrupt or unreadable data: fall back to defaults.
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  // Save / update.
  const saveProfile = useCallback(async (p: Profile) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    setProfile(p);
    setSaved(true);
  }, []);

  // Delete / reset.
  const resetProfile = useCallback(async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setProfile(DEFAULTS);
    setSaved(false);
  }, []);

  const value = useMemo(
    () => ({ profile, loaded, saveProfile, resetProfile, isCustomised: saved }),
    [profile, loaded, saveProfile, resetProfile, saved],
  );
  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile(): Ctx {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used inside ProfileProvider');
  return ctx;
}
