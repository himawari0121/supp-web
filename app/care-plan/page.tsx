import dynamic from 'next/dynamic';

const NutritionCarePlan = dynamic(() => import('../../components/NutritionCarePlan'), { ssr: false });

export default function Page() {
  return <NutritionCarePlan />;
}
