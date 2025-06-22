import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

const LandingPage: React.FC<Props> = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Header */}
      <Animatable.View animation="fadeInDown" duration={800} style={styles.header}>
        <Text style={styles.logo}>AutoCurate</Text>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.headerButtonText}>Get Started</Text>
        </TouchableOpacity>
      </Animatable.View>

      {/* Hero Section */}
      <Animatable.View
        animation="fadeInUp"
        delay={200}
        duration={800}
        style={[styles.heroSection, isTablet && styles.heroSectionTablet]}
      >
        <View style={styles.heroTextContainer}>
          <Animatable.Text animation="fadeInLeft" delay={400} style={styles.heroTitle}>
            Automate Your Content Curation Effortlessly
          </Animatable.Text>
          <Animatable.Text animation="fadeInLeft" delay={600} style={styles.heroSubtitle}>
            Save time, boost engagement, and publish smarter with AutoCurate's AI-powered automation.
          </Animatable.Text>
          <View style={styles.ctaRow}>
            <Animatable.View animation="bounceIn" delay={800}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => navigation.navigate('Signup')}
              >
                <Text style={styles.primaryButtonText}>Get Started</Text>
              </TouchableOpacity>
            </Animatable.View>
            <Animatable.View animation="bounceIn" delay={1000}>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.secondaryButtonText}>Login</Text>
              </TouchableOpacity>
            </Animatable.View>
          </View>
        </View>
        <Animatable.Image
          animation="zoomIn"
          delay={600}
          source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' }}
          style={[styles.heroImage, isTablet && styles.heroImageTablet]}
          resizeMode="cover"
        />
      </Animatable.View>

      {/* Features Section */}
      <Animatable.View animation="fadeInUp" delay={300} style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={[styles.featuresContainer, isTablet && styles.featuresContainerTablet]}>
          <Animatable.View animation="fadeInUp" delay={400} style={styles.featureCard}>
            <Text style={styles.featureTitle}>AI-Powered Summarization</Text>
            <Text style={styles.featureDesc}>Automatically summarize and enhance content for unique posts.</Text>
          </Animatable.View>
          <Animatable.View animation="fadeInUp" delay={600} style={styles.featureCard}>
            <Text style={styles.featureTitle}>Multi-Platform Publishing</Text>
            <Text style={styles.featureDesc}>Schedule and publish content across social media and blogs seamlessly.</Text>
          </Animatable.View>
          <Animatable.View animation="fadeInUp" delay={800} style={styles.featureCard}>
            <Text style={styles.featureTitle}>Customizable Workflows</Text>
            <Text style={styles.featureDesc}>Create automation workflows tailored to your needs with ease.</Text>
          </Animatable.View>
        </View>
      </Animatable.View>

      {/* Benefits Section */}
      <Animatable.View animation="fadeIn" delay={400} style={[styles.section, styles.benefitsSection]}>
        <Text style={styles.sectionTitle}>Benefits</Text>
        <View style={styles.benefitsList}>
          <Text style={styles.benefitItem}>• Save hours every week by automating repetitive tasks.</Text>
          <Text style={styles.benefitItem}>• Increase your audience engagement with consistent posting.</Text>
          <Text style={styles.benefitItem}>• Focus on creating quality content while we handle the rest.</Text>
        </View>
      </Animatable.View>

      {/* Societal Impact Section */}
      <Animatable.View animation="fadeInUp" delay={500} style={styles.section}>
        <Text style={styles.sectionTitle}>Impact on Society</Text>
        <Text style={styles.impactText}>
          AutoCurate empowers creators and businesses to share valuable content efficiently, fostering knowledge sharing and community growth.
        </Text>
        <Text style={styles.quote}>
          "AutoCurate transformed how I manage my social media, saving me hours every week!" - Jane D., Content Marketer
        </Text>
      </Animatable.View>

      {/* Footer */}
      <Animatable.View animation="fadeInUp" delay={600} style={styles.footer}>
        <Text style={styles.footerText}>© 2025 AutoCurate. All rights reserved.</Text>
      </Animatable.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { backgroundColor: '#fff', paddingBottom: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 40, paddingBottom: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  logo: { fontSize: 28, fontWeight: 'bold', color: '#2563EB' },
  headerButton: { backgroundColor: '#2563EB', paddingVertical: 10, paddingHorizontal: 22, borderRadius: 24 },
  headerButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  heroSection: { flexDirection: 'column', alignItems: 'center', padding: 24, backgroundColor: '#E0E7FF' },
  heroSectionTablet: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 40, paddingHorizontal: 32 },
  heroTextContainer: { flex: 1, alignItems: 'center', marginBottom: 16, marginRight: 0 },
  heroTitle: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 12, color: '#1E293B' },
  heroSubtitle: { fontSize: 16, textAlign: 'center', color: '#334155', marginBottom: 16 },
  ctaRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 8 },
  primaryButton: { backgroundColor: '#2563EB', paddingVertical: 12, paddingHorizontal: 28, borderRadius: 24, marginRight: 10 },
  primaryButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  secondaryButton: { borderColor: '#2563EB', borderWidth: 2, paddingVertical: 12, paddingHorizontal: 28, borderRadius: 24 },
  secondaryButtonText: { color: '#2563EB', fontWeight: 'bold', fontSize: 16 },
  heroImage: { width: '100%', height: 180, borderRadius: 16, marginTop: 18 },
  heroImageTablet: { width: 300, height: 200, marginTop: 0, marginLeft: 32 },
  section: { padding: 24, backgroundColor: '#fff' },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 14, textAlign: 'center', color: '#1E293B' },
  featuresContainer: { flexDirection: 'column', gap: 16 },
  featuresContainerTablet: { flexDirection: 'row', gap: 24, justifyContent: 'center' },
  featureCard: { backgroundColor: '#F1F5F9', borderRadius: 12, padding: 16, marginBottom: 10, flex: 1, marginHorizontal: 6, elevation: 1 },
  featureTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 6, color: '#2563EB' },
  featureDesc: { fontSize: 14, color: '#334155' },
  benefitsSection: { backgroundColor: '#F0F4FA' },
  benefitsList: { marginTop: 10, marginLeft: 8 },
  benefitItem: { fontSize: 15, color: '#334155', marginBottom: 5 },
  impactText: { fontSize: 15, color: '#334155', textAlign: 'center', marginVertical: 10 },
  quote: { fontStyle: 'italic', color: '#64748B', marginTop: 10, textAlign: 'center', borderLeftWidth: 4, borderLeftColor: '#2563EB', paddingLeft: 12 },
  footer: { padding: 18, backgroundColor: '#1E293B', alignItems: 'center', marginTop: 10 },
  footerText: { color: '#fff', fontSize: 14 },
});

export default LandingPage;