import dynamic from 'next/dynamic';

const NutritionAssessmentModule = dynamic(() => import('./nutrition-assessment'), { ssr: false });

export default function Page() {
  return <NutritionAssessmentModule userId="demo" />;
}
