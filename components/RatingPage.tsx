import DataTable from '@/components/DataTable';
import { ACCENT, BG } from '@/constants';
import { useContractCache } from '@/hooks/useContractCache';
import { Rating, User } from '@/typings';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Loader from './Loader';
import Paginator from './Paginator';
import WeaponNominationSelect from './WeaponNominationSelect';

const RatingPage = () => {
  const [weaponId, setWeaponId] = useState<number>(0);
  const [nominationId, setNominationId] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const limit = 10;

  const { useContractQuery } = useContractCache("user");
  const { data, error, isLoading } = useContractQuery<{
    users: User[];
    ratings: Rating[];
  }>('getRatings', [weaponId, nominationId, page * limit, limit]);
  const { data: clubs = [] } = useContractQuery<string[]>("getClubs")

  const tableData = data?.users?.map((user, index) => [
    `${user.name}\n${clubs![Number(user.clubId)]}`,
    data.ratings[index]?.rating.toString() || '0',
  ]) || [];

  const headers = ['Name', 'Rating'];

  if (error) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: error.message
    })
  }

  return (
    <View style={styles.container}>
       <ScrollView
        keyboardShouldPersistTaps="handled"
       >
        <WeaponNominationSelect
        weaponId={weaponId}
        setWeaponId={setWeaponId}
        nominationId={nominationId}
        setNominationId={setNominationId}
        />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <DataTable data={tableData} headers={headers} scrollEnabled={false} />
          <Paginator page={page} setPage={setPage} isNext={data?.users.length !== limit} />
        </>
      )}
       </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: BG,
  },
  error: {
    color: ACCENT,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 32,
    fontFamily: 'IBMPlexSansRegular',
  }
});

export default RatingPage;