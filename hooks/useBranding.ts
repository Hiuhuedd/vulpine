import { useBranding as useBrandingProvider } from '@/components/providers/BrandingProvider';

export function useBranding() {
  return useBrandingProvider();
}
