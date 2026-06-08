import { useSection as useSectionProvider } from '@/components/providers/SectionsProvider';

export function useSection(sectionId: string) {
  return useSectionProvider(sectionId);
}
