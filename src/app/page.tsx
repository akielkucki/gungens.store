
import {JSX, Suspense} from 'react';
import StoreContent from "@/components/storecontent";

export default function HomePage(): JSX.Element {
  return (
      <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>}>
        <StoreContent />
      </Suspense>
  );
}