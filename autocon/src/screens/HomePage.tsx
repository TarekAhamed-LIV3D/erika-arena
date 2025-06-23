import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
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
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        Alert.alert('Session expired', 'Please log in again.');
        // You can add navigation to Landing/Login here if needed
      } else {
        setUser(data.user);
      }
    };
    fetchUser();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      <Text style={styles.logo}>AutoCurate</Text>
      {user && <Text style={styles.greeting}>Welcome back, {user.email}!</Text>}

      {/* Stats */}
      <View style={styles.statsRow}>
        {stats.map((stat) => (
          <View key={stat.label} style={styles.statCard}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Upcoming Posts */}
      <Text style={styles.sectionTitle}>Upcoming Posts</Text>
      <View style={styles.upcomingList}>
        {upcomingPosts.map((post) => (
          <View key={post.id} style={styles.upcomingCard}>
            <Text style={styles.upcomingTitle}>{post.title}</Text>
            <Text style={styles.upcomingDate}>{post.date}</Text>
          </View>
        ))}
      </View>

      {/* Actions */}
      <TouchableOpacity style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Curate New Content</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryButton}>
        <Text style={styles.secondaryButtonText}>View Analytics</Text>
      </TouchableOpacity>
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
  primaryButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  secondaryButton: {
    borderColor: '#2563EB',
    borderWidth: 2,
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
  },
  secondaryButtonText: { color: '#2563EB', fontWeight: 'bold', fontSize: 16 },
});

export default HomePage;
