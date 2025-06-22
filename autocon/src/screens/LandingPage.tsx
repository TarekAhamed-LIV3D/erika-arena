import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

const LandingPage: React.FC<Props> = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F4FA" />
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>AutoCurate</Text>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate('Signup')}
            accessibilityLabel="Sign up"
            accessibilityRole="button"
          >
            <Text style={styles.headerButtonText}>Get Started</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View style={[styles.heroSection, isTablet && styles.heroSectionTablet]}>
          <View style={[styles.heroTextContainer, isTablet && styles.heroTextContainerTablet]}>
            <Text style={[styles.heroTitle, isTablet && styles.heroTitleTablet]}>
              Automate Your Content Curation Effortlessly
            </Text>
            <Text style={[styles.heroSubtitle, isTablet && styles.heroSubtitleTablet]}>
              Save time, boost engagement, and publish smarter with AutoCurate's AI-powered automation.
            </Text>
            <View style={styles.ctaRow}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => navigation.navigate('Signup')}
                accessibilityLabel="Get Started"
                accessibilityRole="button"
              >
                <Text style={styles.primaryButtonText}>Get Started</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => navigation.navigate('Features')}
                accessibilityLabel="Learn More"
                accessibilityRole="button"
              >
                <Text style={styles.secondaryButtonText}>Learn More</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
            }}
            style={[styles.heroImage, isTablet && styles.heroImageTablet]}
            resizeMode="cover"
            accessible
            accessibilityLabel="Content automation and productivity illustration"
          />
        </View>

        {/* Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={[styles.featuresContainer, isTablet && styles.featuresContainerTablet]}>
            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>🤖</Text>
              </View>
              <Text style={styles.featureTitle}>AI-Powered Summarization</Text>
              <Text style={styles.featureDesc}>
                Automatically summarize and enhance content for unique posts with advanced AI technology.
              </Text>
            </View>
            
            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>📱</Text>
              </View>
              <Text style={styles.featureTitle}>Multi-Platform Publishing</Text>
              <Text style={styles.featureDesc}>
                Schedule and publish content across social media and blogs seamlessly with one click.
              </Text>
            </View>
            
            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>⚙️</Text>
              </View>
              <Text style={styles.featureTitle}>Customizable Workflows</Text>
              <Text style={styles.featureDesc}>
                Create automation workflows tailored to your specific needs with our intuitive builder.
              </Text>
            </View>
          </View>
        </View>

        {/* Benefits Section */}
        <View style={[styles.section, styles.benefitsSection]}>
          <Text style={styles.sectionTitle}>Benefits</Text>
          <View style={styles.benefitsList}>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitBullet}>✓</Text>
              <Text style={styles.benefitText}>
                Save hours every week by automating repetitive tasks
              </Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitBullet}>✓</Text>
              <Text style={styles.benefitText}>
                Increase your audience engagement with consistent posting
              </Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitBullet}>✓</Text>
              <Text style={styles.benefitText}>
                Focus on creating quality content while we handle the rest
              </Text>
            </View>
          </View>
        </View>

        {/* Societal Impact Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Impact on Society</Text>
          <Text style={styles.impactText}>
            AutoCurate empowers creators and businesses to share valuable content efficiently, 
            fostering knowledge sharing and community growth worldwide.
          </Text>
          <View style={styles.testimonialCard}>
            <Text style={styles.quote}>
              "AutoCurate transformed how I manage my social media, saving me hours every week!"
            </Text>
            <Text style={styles.author}>- Jane D., Content Marketer</Text>
          </View>
        </View>

        {/* Call to Action */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to Get Started?</Text>
          <Text style={styles.ctaSubtitle}>
            Join thousands of creators who have automated their content workflow
          </Text>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => navigation.navigate('Signup')}
            accessibilityLabel="Start Free Trial"
            accessibilityRole="button"
          >
            <Text style={styles.ctaButtonText}>Start Free Trial</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 AutoCurate. All rights reserved.</Text>
          <Text style={styles.footerSubtext}>
            Empowering creators with intelligent automation
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + 16 : 60,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  headerButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 24,
    elevation: 2,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  headerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  heroSection: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#E0E7FF',
  },
  heroSectionTablet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 40,
    paddingHorizontal: 32,
  },
  heroTextContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  heroTextContainerTablet: {
    alignItems: 'flex-start',
    marginRight: 32,
    marginBottom: 0,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    color: '#1E293B',
    lineHeight: 34,
  },
  heroTitleTablet: {
    fontSize: 36,
    textAlign: 'left',
    lineHeight: 42,
  },
  heroSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#334155',
    marginBottom: 20,
    lineHeight: 24,
  },
  heroSubtitleTablet: {
    fontSize: 18,
    textAlign: 'left',
    lineHeight: 26,
  },
  ctaRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 24,
    marginRight: 12,
    marginBottom: 8,
    elevation: 3,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    borderColor: '#2563EB',
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 24,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  secondaryButtonText: {
    color: '#2563EB',
    fontWeight: 'bold',
    fontSize: 16,
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginTop: 20,
  },
  heroImageTablet: {
    width: 350,
    height: 250,
    marginTop: 0,
  },
  section: {
    padding: 24,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1E293B',
  },
  featuresContainer: {
    flexDirection: 'column',
    gap: 16,
  },
  featuresContainerTablet: {
    flexDirection: 'row',
    gap: 24,
    justifyContent: 'center',
  },
  featureCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flex: 1,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    alignItems: 'center',
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E0E7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIconText: {
    fontSize: 24,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2563EB',
    textAlign: 'center',
  },
  featureDesc: {
    fontSize: 14,
    color: '#334155',
    textAlign: 'center',
    lineHeight: 20,
  },
  benefitsSection: {
    backgroundColor: '#F0F4FA',
  },
  benefitsList: {
    marginTop: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  benefitBullet: {
    fontSize: 18,
    color: '#10B981',
    fontWeight: 'bold',
    marginRight: 12,
    marginTop: 2,
  },
  benefitText: {
    fontSize: 16,
    color: '#334155',
    flex: 1,
    lineHeight: 24,
  },
  impactText: {
    fontSize: 16,
    color: '#334155',
    textAlign: 'center',
    marginVertical: 12,
    lineHeight: 24,
  },
  testimonialCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
  },
  quote: {
    fontStyle: 'italic',
    color: '#64748B',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 24,
  },
  author: {
    color: '#2563EB',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
  ctaSection: {
    backgroundColor: '#2563EB',
    padding: 32,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  ctaSubtitle: {
    fontSize: 16,
    color: '#E0E7FF',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  ctaButton: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  ctaButtonText: {
    color: '#2563EB',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    padding: 24,
    backgroundColor: '#1E293B',
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
  },
  footerSubtext: {
    color: '#94A3B8',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default LandingPage;