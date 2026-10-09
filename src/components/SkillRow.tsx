import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Skill } from '../data/content';
import { colors, spacing } from '../theme';
import { Card } from './ui';

export function SkillRow({ skill }: { skill: Skill }) {
  return (
    <Card style={{ padding: spacing.md - 2 }}>
      <View style={styles.row}>
        <Text style={styles.name}>{skill.name}</Text>
        <Text style={styles.level} accessibilityLabel={`Level: ${skill.level}`}>
          {skill.level}
        </Text>
      </View>
      <Text style={styles.note}>{skill.note}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  name: { flexShrink: 1, fontSize: 17, fontWeight: '700', color: colors.ink },
  level: { fontSize: 13, fontWeight: '700', color: '#8A3522' },
  note: { fontSize: 14, color: colors.muted, marginTop: 4, lineHeight: 20 },
});
