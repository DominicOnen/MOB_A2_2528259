import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Card, Chip, EmptyState, Screen, textStyles } from '../components/ui';
import { PROJECTS } from '../data/content';
import { ProjectsStackParamList } from '../navigation/types';
import { colors, spacing } from '../theme';

type Props = NativeStackScreenProps<ProjectsStackParamList, 'ProjectList'>;

export default function ProjectsScreen({ navigation }: Props) {
  return (
    <Screen>
      {PROJECTS.length === 0 && (
        <EmptyState title="No projects yet" message="Projects added to the portfolio will appear here." />
      )}
      {PROJECTS.map((p) => (
        <Pressable
          key={p.id}
          onPress={() => navigation.navigate('ProjectDetails', { projectId: p.id })}
          accessibilityRole="button"
          accessibilityLabel={`Open project ${p.title}`}
          accessibilityHint="Shows the problem, my contribution and the technology used"
          style={({ pressed }) => pressed && { opacity: 0.85 }}
        >
          <Card>
            <Text style={styles.title}>{p.title}</Text>
            <Text style={[textStyles.muted, { marginTop: 4 }]} numberOfLines={3}>
              {p.problem}
            </Text>
            <View style={styles.chips}>
              {p.tech.map((t) => (
                <Chip key={t} label={t} />
              ))}
            </View>
            <Text style={styles.more}>View details ›</Text>
          </Card>
        </Pressable>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 18, lineHeight: 26, fontWeight: '700', color: colors.ink },
  chips: { flexDirection: 'row', flexWrap: 'wrap' },
  more: { marginTop: spacing.sm, fontSize: 15, fontWeight: '700', color: '#8A3522' },
});
