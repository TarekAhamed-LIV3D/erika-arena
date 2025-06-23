import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { supabase } from '../lib/supabase';

const upcomingPosts = [
  { id: 1, title: "How AI Changes Content Creation", date: "2025-06-25" },
  { id: 2, title: "Top 5 Automation Tools", date: "2025-06-26" },
];

const stats = [
  { label: "Curated", value: 128 },
  { label: "Published", value: 87 },
  { label: "Scheduled", value: 12 },
];

const HomePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {data} = await supabase.auth.getUser();
      setUser(data.user)
    };
    fetchUser();
  }, []);


  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      <Animatable.Text animation="fadeInDown" style={styles.logo}>AutoCurate</Animatable.Text>
      <Animatable.Text animation="fadeInUp" delay={200} style={styles.greeting}>Welcome back!</Animatable.Text>

      {/* Stats */}
      <View style={styles.statsRow}>
        {stats.map((stat, idx) => (
          <Animatable.View animation="bounceIn" delay={300 + idx * 100} key={stat.label} style={styles.statCard}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </Animatable.View>
        ))}
      </View>

      {/* Upcoming Posts */}
      <Animatable.Text animation="fadeInLeft" delay={400} style={styles.sectionTitle}>Upcoming Posts</Animatable.Text>
      <View style={styles.upcomingList}>
        {upcomingPosts.map((post, idx) => (
          <Animatable.View animation="fadeInRight" delay={500 + idx * 100} key={post.id} style={styles.upcomingCard}>
            <Text style={styles.upcomingTitle}>{post.title}</Text>
            <Text style={styles.upcomingDate}>{post.date}</Text>
          </Animatable.View>
        ))}
      </View>

      {/* Actions */}
      <Animatable.View animation="pulse" iterationCount="infinite" style={styles.actionWrap}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Curate New Content</Text>
        </TouchableOpacity>
      </Animatable.View>
      <Animatable.View animation="fadeInUp" delay={700}>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>View Analytics</Text>
        </TouchableOpacity>
      </Animatable.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', paddingHorizontal: 20, paddingTop: 40 },
  logo: { fontSize: 28, fontWeight: 'bold', color: '#2563EB', marginBottom: 12, alignSelf: 'center' },
  greeting: { fontSize: 22, color: '#1e293b', marginBottom: 16, alignSelf: 'center' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 6,
    elevation: 2,
  },
  statValue: { fontSize: 20, fontWeight: 'bold', color: '#2563EB' },
  statLabel: { fontSize: 14, color: '#64748b', marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#1e293b', marginBottom: 12, marginTop: 10 },
  upcomingList: { marginBottom: 24 },
  upcomingCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    elevation: 1,
  },
  upcomingTitle: { fontSize: 15, fontWeight: 'bold', color: '#2563EB' },
  upcomingDate: { fontSize: 13, color: '#64748b', marginTop: 2 },
  actionWrap: { alignItems: 'center' },
  primaryButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 12,
    width: 220,
  },
  primaryButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  secondaryButton: {
    borderColor: '#2563EB',
    borderWidth: 2,
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    width: 220,
  },
  secondaryButtonText: { color: '#2563EB', fontWeight: 'bold', fontSize: 16 },
});

export default HomePage;