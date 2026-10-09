import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Alert, Linking, StyleSheet, Text, View } from 'react-native';

import { Button, Card, Chip, EmptyState, Screen, SectionTitle, textStyles } from '../components/ui';
import { PROJECTS } from '../data/content';
import { ProjectsStackParamList } from '../navigation/types';
import { colors, spacing } from '../theme';

type Props = NativeStackScreenProps<ProjectsStackParamList, 'ProjectDetails'>;

export default function ProjectDetailsScreen({ route }: Props) {
  const project = PROJECTS.find((p) => p.id === route.params.projectId);

  if (!project) {
    return (
      <Screen>
        <EmptyState title="Project not found" message="Go back and choose a project from the list." />
      </Screen>
    );
  }

  const openLink = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert('Cannot open link', 'This link needs an internet connection and a browser.');
    }
  };

  return (
    <Screen>
      <Text style={textStyles.h1} accessibilityRole="header">
        {project.title}
      </Text>

      <Card>
        <SectionTitle>Problem</SectionTitle>
        <Text style={styles.body}>{project.problem}</Text>
      </Card>

      <Card>
        <SectionTitle>My contribution</SectionTitle>
        <Text style={styles.body}>{project.contribution}</Text>
      </Card>

      <Card>
        <SectionTitle>Technology used</SectionTitle>
        <View style={styles.chips}>
          {project.tech.map((t) => (
            <Chip key={t} label={t} />
          ))}
        </View>
      </Card>

      {project.link && (
        <Button variant="secondary" label={project.link.label} onPress={() => openLink(project.link!.url)} />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: { fontSize: 16, lineHeight: 24, color: colors.ink, marginTop: spacing.sm },
  chips: { flexDirection: 'row', flexWrap: 'wrap' },
});
