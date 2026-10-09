import Constants from 'expo-constants';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Banner, Card, Screen, SectionTitle } from '../components/ui';
import { IDENTITY } from '../data/content';
import { colors, spacing } from '../theme';

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row} accessible accessibilityLabel={`${label}: ${value}`}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

export default function AboutScreen() {
  const version = Constants.expoConfig?.version ?? '1.0.0';
  return (
    <Screen>
      <SectionTitle>About this app</SectionTitle>
      <Card>
        <Row label="App name" value={IDENTITY.appName} />
        <Row label="Student name" value={IDENTITY.fullName} />
        <Row label="Registration number" value={IDENTITY.regNo} />
        <Row label="Verification code" value={IDENTITY.verificationCode} />
        <Row label="Version" value={version} />
      </Card>

      <SectionTitle>Data use</SectionTitle>
      <Card>
        <Text style={styles.text}>
          This app stores the profile you edit (headline, biography, primary skill, availability) and the
          location of your chosen profile picture on this phone only, using AsyncStorage. Nothing is sent to a
          server. Do not enter passwords or private records. Use Reset on the Profile tab to delete everything.
        </Text>
      </Card>

      <Banner text="Offline: the whole portfolio works in Airplane Mode. Only the GitHub links on project pages need internet." />
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.line },
  label: { fontSize: 13, color: colors.muted, fontWeight: '600' },
  value: { fontSize: 18, color: colors.ink, fontWeight: '700', marginTop: 2 },
  text: { fontSize: 16, lineHeight: 24, color: colors.ink },
});
