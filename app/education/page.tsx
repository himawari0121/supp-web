import dynamic from 'next/dynamic';

const ClinicalNutritionEducation = dynamic(() => import('../../components/ClinicalNutritionEducation'), { ssr: false });

export default function Page() {
  return <ClinicalNutritionEducation />;
}
