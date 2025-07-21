import { 
  FiCode, 
  FiSmartphone, 
  FiPenTool, 
  FiServer, 
  FiHeadphones, 
  FiTrendingUp,
  FiGlobe,
  FiSettings,
  FiDatabase,
  FiShield,
  FiZap,
  FiMonitor
} from 'react-icons/fi';

// Dynamic icon mapping - can be extended for new services
export const getServiceIcon = (slug) => {
  const iconMap = {
    'web-development': FiCode,
    'mobile-development': FiSmartphone,
    'ui-ux-design': FiPenTool,
    'devops': FiServer,
    'consulting': FiHeadphones,
    'digital-transformation': FiTrendingUp,
    'ecommerce': FiGlobe,
    'saas': FiSettings,
    'fintech': FiDatabase,
    'healthcare': FiShield,
    'education': FiMonitor,
    'other': FiZap
  };
  return iconMap[slug] || FiCode; // Default to FiCode if no match
};

// Export all icons for direct use if needed
export const serviceIcons = {
  FiCode,
  FiSmartphone,
  FiPenTool,
  FiServer,
  FiHeadphones,
  FiTrendingUp,
  FiGlobe,
  FiSettings,
  FiDatabase,
  FiShield,
  FiZap,
  FiMonitor
}; 