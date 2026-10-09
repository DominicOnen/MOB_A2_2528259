import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

import { colors, radius, spacing } from '../theme';

/** Scrolling screen wrapper. Flexible layout, so large system text never clips. */
export function Screen({ children }: { children: React.ReactNode }) {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.screenContent}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  );
}

export function Card({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function SectionTitle({ children }: { children: string }) {
  return (
    <Text accessibilityRole="header" style={styles.sectionTitle}>
      {children}
    </Text>
  );
}

export function Chip({ label }: { label: string }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipText}>{label}</Text>
    </View>
  );
}

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  accessibilityHint?: string;
};

export function Button({ label, onPress, variant = 'primary', disabled, accessibilityHint }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: !!disabled }}
      style={({ pressed }) => [
        styles.button,
        variant === 'secondary' && styles.buttonSecondary,
        variant === 'danger' && styles.buttonDanger,
        disabled && styles.buttonDisabled,
        pressed && { opacity: 0.85 },
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          variant === 'secondary' && { color: colors.primary },
          variant === 'danger' && { color: colors.danger },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

/** Round avatar: the saved photo, or the student's initials when there is none. */
export function Avatar({ uri, initials, size = 112 }: { uri: string | null; initials: string; size?: number }) {
  const box = { width: size, height: size, borderRadius: size / 2 };
  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={[box, styles.avatarImage]}
        accessibilityLabel="Profile picture"
        accessibilityRole="image"
      />
    );
  }
  return (
    <View style={[box, styles.avatarFallback]} accessibilityLabel={`Avatar with initials ${initials}`} accessibilityRole="image">
      <Text style={[styles.avatarText, { fontSize: size * 0.36 }]}>{initials}</Text>
    </View>
  );
}

type FieldProps = TextInputProps & {
  label: string;
  error?: string;
  hint?: string;
};

/** Controlled text field with a visible label and a field-level error message. */
export function Field({ label, error, hint, style, ...rest }: FieldProps) {
  return (
    <View style={{ marginBottom: spacing.md }}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        {...rest}
        accessibilityLabel={label}
        placeholderTextColor={colors.muted}
        style={[styles.input, !!error && styles.inputError, style]}
      />
      {!!hint && !error && <Text style={styles.hint}>{hint}</Text>}
      {!!error && (
        <Text style={styles.error} accessibilityLiveRegion="polite">
          {error}
        </Text>
      )}
    </View>
  );
}

export function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <Card style={{ alignItems: 'center' }}>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.body}>{message}</Text>
    </Card>
  );
}

export function Banner({ text, tone = 'info' }: { text: string; tone?: 'info' | 'success' | 'error' }) {
  const bg = tone === 'success' ? '#DDEFE3' : tone === 'error' ? '#F6DADA' : colors.chip;
  const fg = tone === 'success' ? colors.success : tone === 'error' ? colors.danger : colors.primary;
  return (
    <View style={[styles.banner, { backgroundColor: bg }]} accessibilityLiveRegion="polite">
      <Text style={[styles.bannerText, { color: fg }]}>{text}</Text>
    </View>
  );
}

export const textStyles = StyleSheet.create({
  h1: { fontSize: 26, lineHeight: 34, fontWeight: '700', color: colors.ink },
  body: { fontSize: 16, lineHeight: 24, color: colors.ink },
  muted: { fontSize: 14, lineHeight: 20, color: colors.muted },
});

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  screenContent: { padding: spacing.md, paddingBottom: spacing.xl, gap: spacing.md },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.line,
  },
  sectionTitle: { fontSize: 20, lineHeight: 28, fontWeight: '700', color: colors.primary },
  chip: {
    backgroundColor: colors.chip,
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: spacing.sm,
    marginTop: spacing.sm,
  },
  chipText: { color: colors.primary, fontSize: 14, fontWeight: '600' },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonSecondary: { backgroundColor: colors.card },
  buttonDanger: { backgroundColor: colors.card, borderColor: colors.danger },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', textAlign: 'center' },
  avatarImage: { backgroundColor: colors.chip },
  avatarFallback: { backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#FFFFFF', fontWeight: '800' },
  fieldLabel: { fontSize: 15, fontWeight: '700', color: colors.ink, marginBottom: 6 },
  input: {
    borderWidth: 1.5,
    borderColor: colors.line,
    backgroundColor: colors.card,
    borderRadius: radius.sm,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.ink,
    minHeight: 48,
  },
  inputError: { borderColor: colors.danger },
  hint: { fontSize: 13, color: colors.muted, marginTop: 4 },
  error: { fontSize: 14, color: colors.danger, marginTop: 4, fontWeight: '600' },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: colors.ink, marginBottom: 6 },
  body: { fontSize: 16, lineHeight: 24, color: colors.muted, textAlign: 'center' },
  banner: { borderRadius: radius.sm, padding: spacing.sm + 4 },
  bannerText: { fontSize: 14, fontWeight: '600' },
});
