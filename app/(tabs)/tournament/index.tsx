import Button from '@/components/Button';
import HorizontalSelect from '@/components/HorizontalSelect';
import InputText from '@/components/InputText';
import Switch from '@/components/Switch';
import TabSwitcher from '@/components/TabSwitcher';
import TournamentCard from '@/components/TournamentCard';
import TournamentForm from '@/components/TournamentForm';
import { ACCENT, FG, SURFACE } from '@/constants';
import { useContractCache } from '@/hooks/useContractCache';
import { EventLog, useEvents } from '@/hooks/useEvents';
import { TournamentCreatedEvent } from '@/typings';
import { strMatch, uint256ToDate } from '@/utils/helpers';
import { CalendarPlus2, LayoutList } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import DatePicker, { ColorOptions, RangeOutput, SingleOutput } from 'react-native-neat-date-picker';

const colorOption: ColorOptions = {
  backgroundColor: SURFACE,
  headerColor: ACCENT,
  weekDaysColor: FG,
  dateTextColor: FG,
  selectedDateBackgroundColor: ACCENT,
  confirmButtonColor: ACCENT,
}

export default function TournamentsScreen() {
  const [isShowFilters, setIsShowFilters] = useState(false)
  const [cityId, setCityId] = useState<number|null>(null)
  const [countryId, setCountryId] = useState<number|null>(null)
  const { logs: tournamentCreatedLogs, loading, mutate } = useEvents<TournamentCreatedEvent>(
    "tournament",
    "TournamentCreated",
    isShowFilters ? [null, null, cityId, countryId, null, null, null] : []
  )
  const { useContractQuery } = useContractCache("user")
  const { data: cities } = useContractQuery("getCities")
  const { data: countries } = useContractQuery("getCountries")
  const tabs = [<LayoutList key={0} color={FG} size={20} />, <CalendarPlus2 key={1} color={FG} size={20} />]
  const [date, setDate] = useState(new Date())
  const [dateFilter, setDateFilter] = useState<Date[]|null[]>([null, null])
  const [dateShow, setDateShow] = useState(false)
  const [dateFilterShow, setDateFilterShow] = useState(false)
  const [title, setTitle] = useState("")

  const onConfirmSingle = (output: SingleOutput) => {
    setDateShow(false)
    if (output.date)
      setDate(output.date)
  }

  const onConfirmRange = (output: RangeOutput) => {
    setDateFilterShow(false)

    if (output.startDate && output.endDate)
      setDateFilter([output.startDate, output.endDate])
  }

  const filterPredicate = (logs: EventLog<TournamentCreatedEvent>) => {
    let result = true
    if (!isShowFilters) return result
    // if (countryId)
    //   result = result && logs.args.countryId === countryId
    // if (cityId)
    //   result = result && logs.args.cityId === cityId
    if (dateFilter[0] && dateFilter[1]) {
      const tournamentDate = uint256ToDate(logs.args.date)
      result = result && tournamentDate >= dateFilter[0] && tournamentDate <= dateFilter[1]
    }
    if (title)
      result = result && strMatch(title, logs.args.name)

    return result
  }

  return (
    <>
    <TabSwitcher tabs={tabs}>
        <View>
          {loading ?
          <Text>Загрузка</Text>
          :
          <ScrollView>
            <Switch title='Фильтры' value={isShowFilters} setValue={setIsShowFilters} />
            {isShowFilters &&
            <View style={{ flexDirection: "column", gap: 8 }}>
              <HorizontalSelect id={cityId} setId={setCityId} items={cities} />
              <HorizontalSelect id={countryId} setId={setCountryId} items={countries} />
              <Button title='Дата' onPress={()=>setDateFilterShow(true)} />
              <InputText placeholder='Название турнира' value={title} setValue={setTitle} />
            </View>
            }
            {tournamentCreatedLogs.length && tournamentCreatedLogs.filter(filterPredicate).map((tournament, idx)=>(
              <TournamentCard
              key={idx}
              id={tournament.args.tournamentId}
              metadataCID={tournament.args.metadataCID}
              date={tournament.args.date}
              city={cities[Number(tournament.args.cityId)]}
              country={countries[Number(tournament.args.countryId)]}
              name={tournament.args.name}
              startTime={tournament.args.startTime}
              />
            ))}
          </ScrollView>
          }
        </View>
        <TournamentForm date={date} setDateShow={setDateShow} refreshCallback={mutate} />
    </TabSwitcher>
    <DatePicker
        isVisible={dateFilterShow}
        mode="range"
        onCancel={()=>setDateFilterShow(false)}
        onConfirm={onConfirmRange}
        colorOptions={colorOption}
      />
    {/* Для TournamentForm пришлось вынести поверх формы для нормального отображения */}
    <DatePicker
        isVisible={dateShow}
        mode='single'
        onCancel={()=>setDateShow(false)}
        onConfirm={onConfirmSingle}
        colorOptions={colorOption}
      />
    </>
  );
}