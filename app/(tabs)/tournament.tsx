import TabSwitcher from '@/components/TabSwitcher';
import TournamentForm from '@/components/TournamentForm';
import { ACCENT, FG, SURFACE } from '@/constants';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import DatePicker, { SingleOutput } from 'react-native-neat-date-picker';

export default function TournamentsScreen() {
//   const [tournaments] = useAtom(tournamentsAtom);
  const tabs = ["Список", "Создать"]
  const [date, setDate] = useState(new Date())
  const [dateShow, setDateShow] = useState(false)

  const onConfirmSingle = (output: SingleOutput) => {
    setDateShow(false)
    if (output.date)
      setDate(output.date)
  }

  /* загружаем турниры из контракта */
  useEffect(() => {
    (async () => {
    //   await tournaments.load(); // читаем из smart-contract
    })();
  }, []);

  return (
    <>
    <TabSwitcher tabs={tabs}>
        <View></View>
        <TournamentForm date={date} setDateShow={setDateShow} />
    </TabSwitcher>
    <DatePicker
        isVisible={dateShow}
        mode={'single'}
        onCancel={()=>setDateShow(false)}
        onConfirm={onConfirmSingle}
        colorOptions={{
          backgroundColor: SURFACE,
          headerColor: ACCENT,
          weekDaysColor: FG,
          dateTextColor: FG,
          selectedDateBackgroundColor: ACCENT,
          confirmButtonColor: ACCENT,

        }}
      />
    </>
  );
}