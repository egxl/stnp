"use client";
import dynamic from 'next/dynamic';

const Grainient = dynamic(() => import('./Grainient'), { ssr: false });

export default function GrainientDynamic(props) {
  return <Grainient {...props} />;
}
