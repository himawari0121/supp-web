import dynamic from 'next/dynamic';

const SupplementInteractionChecker = dynamic(() => import('../../components/SupplementInteractionChecker'), { ssr: false });

export default function Page() {
  return <SupplementInteractionChecker />;
}
