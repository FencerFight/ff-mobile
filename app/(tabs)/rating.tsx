// app/(drawer)/rating.tsx
import RatingPage from '@/components/RatingPage ';
import TabSwitcher from '@/components/TabSwitcher';
import { FG } from '@/constants';
import { ChartSpline, Medal } from 'lucide-react-native';
import React from 'react';


export default function RatingScreen() {
  const tabs = [<ChartSpline key={0} size={20} color={FG} />, <Medal key={1} size={20} color={FG} />]


  return (
    <TabSwitcher
      tabs={tabs}
    >
      <RatingPage />
      <></>
    </TabSwitcher>
  );
}