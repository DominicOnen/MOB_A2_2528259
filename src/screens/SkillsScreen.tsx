import React from 'react';
import { View } from 'react-native';

import { SkillRow } from '../components/SkillRow';
import { TimelineEntry } from '../components/TimelineEntry';
import { Card, EmptyState, Screen, SectionTitle } from '../components/ui';
import { SKILLS, TIMELINE } from '../data/content';
import { spacing } from '../theme';

export default function SkillsScreen() {
  return (
    <Screen>
      <SectionTitle>Skills</SectionTitle>
      {SKILLS.length === 0 ? (
        <EmptyState title="No skills yet" message="Skills added to the portfolio will appear here." />
      ) : (
        <View style={{ gap: spacing.sm }}>
          {SKILLS.map((s) => (
            <SkillRow key={s.name} skill={s} />
          ))}
        </View>
      )}

      <SectionTitle>Education and training</SectionTitle>
      <Card>
        {TIMELINE.map((t, i) => (
          <TimelineEntry key={t.title} item={t} last={i === TIMELINE.length - 1} />
        ))}
      </Card>
    </Screen>
  );
}
