import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { TimelineItem } from '../data/content';
import { colors, spacing } from '../theme';

export function TimelineEntry({ item, last }: { item: TimelineItem; last: boolean }) {
  return (
    <View style={styles.row}>
      <View style={styles.rail}>
        <View style={styles.dot} />
        {!last && <View style={styles.line} />}
      </View>
      <View style={styles.body}>
        <Text style={styles.period}>{item.period}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.place}>{item.place}</Text>
        <Text style={styles.detail}>{item.detail}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  rail: { width: 24, alignItems: 'center' },
  dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.accent, marginTop: 6 },
  line: { flex: 1, width: 2, backgroundColor: colors.line, marginTop: 4 },
  body: { flex: 1, paddingBottom: spacing.md, paddingLeft: spacing.sm },
  period: { fontSize: 13, fontWeight: '700', color: '#8A3522' },
  title: { fontSize: 16, fontWeight: '700', color: colors.ink },
  place: { fontSize: 14, color: colors.primary, fontWeight: '600' },
  detail: { fontSize: 14, color: colors.muted, lineHeight: 20, marginTop: 2 },
});
