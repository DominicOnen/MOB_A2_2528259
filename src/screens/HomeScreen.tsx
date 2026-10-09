import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Avatar, Banner, Card, Chip, Screen, SectionTitle, textStyles } from '../components/ui';
import { useProfile } from '../context/ProfileContext';
import { IDENTITY } from '../data/content';
import { colors, spacing } from '../theme';

function initialsOf(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0].toUpperCase())
    .slice(0, 2)
    .join('');
}

export default function HomeScreen() {
  const { profile, loaded } = useProfile();

  if (!loaded) {
    return (
      <Screen>
        <Text style={textStyles.muted}>Loading your saved profile…</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={styles.hero}>
        <Avatar uri={profile.imageUri} initials={initialsOf(IDENTITY.fullName)} />
        {/* The first sentence on the Home screen: exactly "My name is [full name]." */}
        <Text style={styles.intro} accessibilityRole="header">
          My name is {IDENTITY.fullName}.
        </Text>
        <Text style={styles.headline}>{profile.headline}</Text>
        <View style={styles.row}>
          <Chip label={profile.primarySkill} />
          <Chip label={profile.availability} />
        </View>
      </View>

      <Card>
        <SectionTitle>About me</SectionTitle>
        <Text style={[textStyles.body, { marginTop: spacing.sm }]}>{profile.bio}</Text>
      </Card>

      <Card>
        <Text style={textStyles.muted}>Verification code</Text>
        <Text style={styles.code} accessibilityLabel={`Verification code ${IDENTITY.verificationCode}`}>
          {IDENTITY.verificationCode}
        </Text>
      </Card>

      <Banner text="Works offline. Everything on this screen is stored on your phone." />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.sm },
  intro: { fontSize: 28, lineHeight: 36, fontWeight: '800', color: colors.primary, textAlign: 'center' },
  headline: { fontSize: 17, lineHeight: 24, color: colors.ink, textAlign: 'center' },
  row: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  code: { fontSize: 24, fontWeight: '800', color: colors.ink, letterSpacing: 1, marginTop: 2 },
});
