import * as FileSystem from 'expo-file-system/legacy';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Alert, Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { Avatar, Banner, Button, Card, Field, Screen, SectionTitle } from '../components/ui';
import { Profile, useProfile } from '../context/ProfileContext';
import { AVAILABILITY_OPTIONS, Availability, IDENTITY } from '../data/content';
import { colors, radius, spacing } from '../theme';
import { FormErrors, ProfileForm, hasErrors, validateProfile } from '../utils/validation';

type Message = { tone: 'info' | 'success' | 'error'; text: string } | null;

const initials = IDENTITY.fullName
  .split(' ')
  .map((w) => w[0])
  .join('')
  .slice(0, 2);

function toForm(p: Profile): ProfileForm {
  return { headline: p.headline, bio: p.bio, primarySkill: p.primarySkill, availability: p.availability };
}

export default function ProfileScreen() {
  const { profile, loaded, saveProfile, resetProfile } = useProfile();
  const [form, setForm] = useState<ProfileForm>(toForm(profile));
  const [touched, setTouched] = useState<Partial<Record<keyof ProfileForm, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState<Message>(null);

  // Keep the form in step with the saved profile (after load, save or reset).
  useEffect(() => {
    setForm(toForm(profile));
    setTouched({});
    setSubmitted(false);
  }, [profile, loaded]);

  const errors: FormErrors = validateProfile(form);
  const show = (k: keyof ProfileForm) => (submitted || touched[k] ? errors[k] : undefined);
  const update = (k: keyof ProfileForm, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setMessage(null);
  };
  const blur = (k: keyof ProfileForm) => setTouched((t) => ({ ...t, [k]: true }));

  const onSave = async () => {
    setSubmitted(true);
    if (hasErrors(errors)) {
      setMessage({ tone: 'error', text: 'Please fix the highlighted fields. Nothing was saved.' });
      return; // invalid save is blocked
    }
    try {
      await saveProfile({
        headline: form.headline.trim(),
        bio: form.bio.trim(),
        primarySkill: form.primarySkill.trim(),
        availability: form.availability as Availability,
        imageUri: profile.imageUri,
      });
      setMessage({ tone: 'success', text: 'Profile saved on this phone.' });
    } catch {
      setMessage({ tone: 'error', text: 'Could not save. Please try again.' });
    }
  };

  const onReset = () => {
    Alert.alert('Reset profile?', 'This deletes your saved changes and picture from this phone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reset',
        style: 'destructive',
        onPress: async () => {
          await removeStoredImage(profile.imageUri);
          await resetProfile();
          setMessage({ tone: 'info', text: 'Profile reset to the default content.' });
        },
      },
    ]);
  };

  // ---- Profile picture: capture or choose, preview, replace, remove ----

  const permissionDenied = (what: string) => {
    setMessage({
      tone: 'error',
      text: `Permission for the ${what} was denied, so no picture was changed. You can allow it in Settings.`,
    });
    Alert.alert('Permission needed', `Allow ${what} access in Settings to use this option.`, [
      { text: 'Not now', style: 'cancel' },
      { text: 'Open Settings', onPress: () => Linking.openSettings() },
    ]);
  };

  const applyPicked = async (result: ImagePicker.ImagePickerResult) => {
    if (result.canceled || !result.assets?.length) {
      setMessage({ tone: 'info', text: 'Cancelled. Your current picture is unchanged.' });
      return;
    }
    try {
      const stored = await storeImage(result.assets[0].uri);
      await removeStoredImage(profile.imageUri);
      await saveProfile({ ...profile, imageUri: stored });
      setMessage({ tone: 'success', text: profile.imageUri ? 'Picture replaced.' : 'Picture saved.' });
    } catch {
      setMessage({ tone: 'error', text: 'Could not use that picture. Please try another.' });
    }
  };

  const takePhoto = async () => {
    try {
      const perm = await ImagePicker.requestCameraPermissionsAsync();
      if (!perm.granted) return permissionDenied('camera');
      const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.7 });
      await applyPicked(result);
    } catch {
      setMessage({ tone: 'error', text: 'The camera is not available on this device.' });
    }
  };

  const chooseFromGallery = async () => {
    try {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) return permissionDenied('photo library');
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
      await applyPicked(result);
    } catch {
      setMessage({ tone: 'error', text: 'Could not open the photo library.' });
    }
  };

  const removePicture = async () => {
    await removeStoredImage(profile.imageUri);
    await saveProfile({ ...profile, imageUri: null });
    setMessage({ tone: 'info', text: 'Picture removed. Your initials are shown instead.' });
  };

  const hasImage = !!profile.imageUri;

  return (
    <Screen>
      <SectionTitle>Profile picture</SectionTitle>
      <Card style={{ alignItems: 'center', gap: spacing.sm }}>
        <Avatar uri={profile.imageUri} initials={initials} size={120} />
        <Text style={styles.caption}>{hasImage ? 'Preview of your saved picture' : 'No picture yet. Initials are shown.'}</Text>
        <View style={styles.buttons}>
          <Button label={hasImage ? 'Replace: take photo' : 'Take photo'} onPress={takePhoto} />
          <Button
            variant="secondary"
            label={hasImage ? 'Replace: choose from gallery' : 'Choose from gallery'}
            onPress={chooseFromGallery}
          />
          {hasImage && <Button variant="danger" label="Remove picture" onPress={removePicture} />}
        </View>
      </Card>

      <SectionTitle>Edit profile</SectionTitle>
      {message && <Banner tone={message.tone} text={message.text} />}

      <Card>
        <Field
          label="Headline"
          value={form.headline}
          onChangeText={(v) => update('headline', v)}
          onBlur={() => blur('headline')}
          error={show('headline')}
          hint="8 to 60 characters"
          maxLength={80}
        />
        <Field
          label="Short biography"
          value={form.bio}
          onChangeText={(v) => update('bio', v)}
          onBlur={() => blur('bio')}
          error={show('bio')}
          hint={`30 to 280 characters (${form.bio.trim().length} now)`}
          multiline
          textAlignVertical="top"
          style={{ minHeight: 120 }}
        />
        <Field
          label="Primary skill"
          value={form.primarySkill}
          onChangeText={(v) => update('primarySkill', v)}
          onBlur={() => blur('primarySkill')}
          error={show('primarySkill')}
          hint="Your strongest skill, 2 to 30 characters"
        />

        <Text style={styles.groupLabel}>Availability status</Text>
        <View accessibilityRole="radiogroup" style={{ gap: spacing.sm }}>
          {AVAILABILITY_OPTIONS.map((opt) => {
            const selected = form.availability === opt;
            return (
              <Pressable
                key={opt}
                onPress={() => {
                  update('availability', opt);
                  blur('availability');
                }}
                accessibilityRole="radio"
                accessibilityLabel={opt}
                accessibilityState={{ selected }}
                style={[styles.option, selected && styles.optionSelected]}
              >
                <View style={[styles.radio, selected && styles.radioSelected]} />
                <Text style={styles.optionText}>{opt}</Text>
              </Pressable>
            );
          })}
        </View>
        {!!show('availability') && <Text style={styles.error}>{show('availability')}</Text>}
      </Card>

      <Button label="Save changes" onPress={onSave} accessibilityHint="Saves your profile on this phone" />
      <Button variant="danger" label="Reset profile" onPress={onReset} />
    </Screen>
  );
}

// ---- Helpers for keeping the picture inside the app's own storage ----

async function storeImage(uri: string): Promise<string> {
  try {
    const dir = FileSystem.documentDirectory;
    if (!dir) return uri;
    const dest = `${dir}profile-${Date.now()}.jpg`;
    await FileSystem.copyAsync({ from: uri, to: dest });
    return dest;
  } catch {
    return uri; // fall back to the picker's own location
  }
}

async function removeStoredImage(uri: string | null) {
  try {
    if (uri && FileSystem.documentDirectory && uri.startsWith(FileSystem.documentDirectory)) {
      await FileSystem.deleteAsync(uri, { idempotent: true });
    }
  } catch {
    // ignore: nothing to clean up
  }
}

const styles = StyleSheet.create({
  caption: { fontSize: 14, color: colors.muted, textAlign: 'center' },
  buttons: { alignSelf: 'stretch', gap: spacing.sm, marginTop: spacing.sm },
  groupLabel: { fontSize: 15, fontWeight: '700', color: colors.ink, marginBottom: 6 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1.5,
    borderColor: colors.line,
    borderRadius: radius.sm,
    padding: 12,
    minHeight: 48,
  },
  optionSelected: { borderColor: colors.primary, backgroundColor: colors.chip },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: colors.muted },
  radioSelected: { borderColor: colors.primary, backgroundColor: colors.primary },
  optionText: { flex: 1, fontSize: 16, color: colors.ink },
  error: { fontSize: 14, color: colors.danger, marginTop: 6, fontWeight: '600' },
});
