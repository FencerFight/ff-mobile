import Button from '@/components/Button'
import DataTable from '@/components/DataTable'
import InputText from '@/components/InputText'
import Paginator from '@/components/Paginator'
import Section from '@/components/Section'
import TabSwitcher from '@/components/TabSwitcher'
import WeaponNominationSelect from '@/components/WeaponNominationSelect'
import { ACCENT, BG, FG, SURFACE, SURFACE_2 } from '@/constants'
import { useContractCache } from '@/hooks/useContractCache'
import { userDataAtom } from '@/store'
import { ProposalAddType, ProposalAdmin, ProposalType } from '@/typings'
import { useAtomValue } from 'jotai'
import { CircleMinus, CirclePlus } from 'lucide-react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Toast from 'react-native-toast-message'

const PAGE_SIZE = 10;

const VotingScreen = () => {
  const userData = useAtomValue(userDataAtom)
  const [activeTab, setActiveTab] = useState<'active' | 'past'>('active')
  const [proposals, setProposals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [weaponId, setWeaponId] = useState(0);
  const [nominationId, setNominationId] = useState(0);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const defaultProposal = {
    type: ProposalType.ADD_WEAPON,
    title: ''
  }
  const [newProposal, setNewProposal] = useState(defaultProposal)

  const { useContractQuery, mutateData } = useContractCache('governance')
  const { data: admins } = useContractQuery<{ addresses: string[], names: string[] }>('getAdmins')

  // Count queries for pagination
  const { data: activeAdminCount = 0 } =
    useContractQuery<bigint>('getActiveAdminProposalsCount', [], { shouldFetch: false })
  const { data: activeTypeCount = 0 } =
    useContractQuery<bigint>('getActiveTypeProposalsCount', [], { shouldFetch: false })
  const { data: pastAdminCount = 0 } =
    useContractQuery<bigint>('getPastAdminProposalsCount', [], { shouldFetch: false })
  const { data: pastTypeCount = 0 } =
    useContractQuery<bigint>('getPastTypeProposalsCount', [], { shouldFetch: false })

  const { data: activeAdminProps = [], mutate: mutateActiveAdminProposals } =
  useContractQuery<ProposalAdmin[]>('getActiveAdminProposals', [
    page * PAGE_SIZE,
    Math.min((page + 1) * PAGE_SIZE - 1, Math.max(Number(activeAdminCount) - 1, 0)) // Ensure we don't exceed bounds
  ]);

  const { data: activeTypeProps = [], mutate: mutateActiveTypeProposals } =
  useContractQuery<ProposalAddType[]>('getActiveTypeProposals', [
    page * PAGE_SIZE,
    Math.min((page + 1) * PAGE_SIZE - 1, Math.max(Number(activeTypeCount) - 1, 0))
  ]);

  const { data: pastAdminProps = [], mutate: mutatePastAdminProposals } =
  useContractQuery<ProposalAdmin[]>('getPastAdminProposals', [
    page * PAGE_SIZE,
    Math.min((page + 1) * PAGE_SIZE - 1, Math.max(Number(pastAdminCount) - 1, 0))
  ]);

  const { data: pastTypeProps = [], error: pastTypeError, mutate: mutatePastTypeProposals } =
  useContractQuery<ProposalAddType[]>('getPastTypeProposals', [
    page * PAGE_SIZE,
    Math.min((page + 1) * PAGE_SIZE - 1, Math.max(Number(pastTypeCount) - 1, 0))
  ]);

  if (pastTypeError) {
    console.error('Failed to load past type proposals:', pastTypeError);
    // Show error message to user
  }

  const { data: myVotes = [] } = useContractQuery<boolean[]>('getMyVotes', [], {
    shouldFetch: !!userData.wallet
  })

  const proposalTypes = [
    { label: 'Add Admin', value: ProposalType.ADD_ADMIN },
    { label: 'Remove Admin', value: ProposalType.REMOVE_ADMIN },
    { label: 'Add Weapon', value: ProposalType.ADD_WEAPON },
    { label: 'Remove Weapon', value: ProposalType.REMOVE_WEAPON },
    { label: 'Add Nomination', value: ProposalType.ADD_NOMINATION },
    { label: 'Remove Nomination', value: ProposalType.REMOVE_NOMINATION }
  ]

  useEffect(() => {
    setPage(0); // Reset page when tab changes
  }, [activeTab]); // Only run when activeTab changes

  useEffect(() => {
    if (!activeAdminProps.length || !activeTypeProps.length || !pastAdminProps.length || !pastTypeProps.length) return;

    const combinedProposals = activeTab === 'active'
      ? [...activeAdminProps, ...activeTypeProps]
      : [...pastAdminProps, ...pastTypeProps];

    const totalCount = activeTab === 'active'
      ? Math.max(Number(activeAdminCount), Number(activeTypeCount))
      : Math.max(Number(pastAdminCount), Number(pastTypeCount));

    setProposals(combinedProposals);
    setTotalPages(Math.max(0, Math.ceil(totalCount / PAGE_SIZE)));
  }, [
    activeTab,
    activeAdminProps,
    activeTypeProps,
    pastAdminProps,
    pastTypeProps
  ]);

  const createProposal = async () => {
    setLoading(true)
    try {
      if ([ProposalType.ADD_ADMIN, ProposalType.REMOVE_ADMIN].includes(defaultProposal.type)) {
        await mutateData('createProposalAdmin', [
          newProposal.title,
          newProposal.type
        ])
        Toast.show({
          type: "success",
          text1: "Опрос об админе создан!"
        })
      } else if ([ProposalType.ADD_WEAPON, ProposalType.REMOVE_WEAPON].includes(newProposal.type)) {
        await mutateData('createProposalTypes', [
          newProposal.title,
          weaponId,
          nominationId,
          newProposal.type
        ])
        Toast.show({
          type: "success",
          text1: "Опрос на тип оружия создан!"
        })
      } else if ([ProposalType.ADD_NOMINATION, ProposalType.REMOVE_NOMINATION].includes(newProposal.type)) {
        await mutateData('createProposalTypes', [
          newProposal.title,
          weaponId,
          nominationId,
          newProposal.type
        ])
        Toast.show({
          type: "success",
          text1: "Опрос на номинацию создан!"
        })
      }
      mutateActiveAdminProposals()
      mutateActiveTypeProposals()
      setNewProposal(defaultProposal)
    } catch (error) {
      console.error('Proposal creation failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const vote = async (id: number, support: boolean, isAdminProposal: boolean) => {
    setLoading(true)
    try {
      await mutateData('vote', [
        isAdminProposal ? 0 : 1, // ProposalCategory: 0 = ADMIN, 1 = TYPE
        id,
        support
      ])
      mutateActiveAdminProposals()
      mutateActiveTypeProposals()
    } catch (error) {
      console.error('Voting failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const execute = async (id: number, isAdminProposal: boolean) => {
    setLoading(true)
    try {
      if (isAdminProposal) {
        await mutateData('executeProposalAdmin', [id])
      } else {
        await mutateData('executeProposalType', [id])
      }
      mutatePastAdminProposals()
      mutatePastTypeProposals()
      mutateActiveAdminProposals()
      mutateActiveTypeProposals()
    } catch (error) {
      console.error('Execution failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const canVote = (proposal: any) => {
    return !proposal.executed && proposal.deadline * 1000 > Date.now()
  }

  const tableData = React.useMemo(() => {
    return proposals.map((p, index) => [
      p.description || p.title || `Proposal ${index}`,
      proposalTypes.find(pt => pt.value === p.pType)?.label || p.pType,
      `${p.votesYes} / ${p.votesNo} (${Math.round((Math.max(p.votesYes, p.votesNo) / (admins?.names.length || 0) * 100))}%)`,
      p.executed
        ? 'Executed'
        : canVote(p)
          ? 'Active until ' + new Date(p.deadline * 1000).toLocaleDateString()
          : 'Expired',
      !p.executed && canVote(p) ? (
        <View style={styles.actions}>
          <Button
            title="✓ Yes"
            onPress={() => vote(index, true, p.candidate !== undefined)}
            disabled={myVotes[index]}
            style={myVotes[index] ? styles.votedButton : undefined}
          />
          <Button
            title="✗ No"
            onPress={() => vote(index, false, p.candidate !== undefined)}
            disabled={myVotes[index]}
            style={myVotes[index] ? styles.votedButton : undefined}
          />
          {p.votesYes > p.votesNo && (
            <Button
              title="Execute"
              onPress={() => execute(index, p.candidate !== undefined)}
            />
          )}
        </View>
      ) : null
    ])
  }, [proposals, admins?.names.length, myVotes]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Section title={`Current Admins (${admins?.names.length})`}>
          <View style={styles.adminContainer}>
            {admins?.names.map((name, idx) => (
              <Text
                key={name}
                style={[
                  styles.adminText,
                  admins.addresses[idx] === userData.wallet && styles.currentAdmin
                ]}
              >
                {name}
              </Text>
            ))}
          </View>
        </Section>

        {/* Tabs */}
        <View style={styles.tabs}>
          <Button
            title='Active Proposals'
            onPress={() => setActiveTab('active')}
            stroke={activeTab !== 'active'}
          />
          <Button
            title='Past Proposals'
            onPress={() => setActiveTab('past')}
            stroke={activeTab !== 'past'}
          />
        </View>

        {loading ? (
          <></>
        ) : (
          <>
            <DataTable
              data={tableData}
              headers={['Description', 'Type', 'Votes', 'Status', 'Actions']}
              scrollEnabled={false}
            />

            <Paginator
              page={page}
              setPage={setPage}
              isNext={page >= totalPages - 1}
              totalPages={totalPages}
            />
          </>
        )}
            <Section title='Create New Proposal'>
              <TabSwitcher tabs={["Admins", "Weapon & nominations"]} containerStyle={{ backgroundColor: SURFACE, paddingHorizontal: 0 }} onPresses={[()=>setNewProposal(state=>({...state, type: ProposalType.ADD_ADMIN})), ()=>setNewProposal(state=>({...state, type: ProposalType.ADD_ADMIN}))]}>
                <>
                  <InputText
                    value={newProposal.title}
                    setValue={(text) => setNewProposal({...newProposal, title: text})}
                    placeholder="Candidate address: 0x..."
                  />
                </>
                <>
                  <View style={styles.tabs}>
                    <Button onPress={()=>setNewProposal(state=>({...state, type: ProposalType.ADD_WEAPON}))} stroke={![ProposalType.ADD_WEAPON, ProposalType.ADD_NOMINATION].includes(newProposal.type)}>
                      <CirclePlus color={FG} size={20} />
                    </Button>
                    <Button onPress={()=>setNewProposal(state=>({...state, type: ProposalType.REMOVE_WEAPON}))} stroke={newProposal.type !== ProposalType.REMOVE_WEAPON}>
                      <CircleMinus color={FG} size={20} />
                    </Button>
                  </View>
                  {newProposal.type === ProposalType.ADD_WEAPON || newProposal.type === ProposalType.ADD_NOMINATION ?
                  <TabSwitcher tabs={["Weapon", "Nomination"]} containerStyle={{ backgroundColor: SURFACE, paddingHorizontal: 0 }} onPresses={[()=>setNewProposal(state=>({...state, type: ProposalType.ADD_WEAPON})), ()=>setNewProposal(state=>({...state, type: ProposalType.ADD_NOMINATION}))]}>
                    <>
                    <InputText
                    placeholder='Weapon name'
                    value={newProposal.title}
                    setValue={(text) => setNewProposal({...newProposal, title: text})}
                    />
                    </>
                    <>
                    <InputText
                    placeholder='Nomination name'
                    value={newProposal.title}
                    setValue={(text) => setNewProposal({...newProposal, title: text})}
                    style={{ marginTop: 20 }}
                    />
                    <WeaponNominationSelect
                    weaponId={weaponId}
                    setWeaponId={setWeaponId}
                    nominationId={nominationId}
                    setNominationId={setNominationId}
                    isNomination={false}
                    />
                    </>
                  </TabSwitcher>
                  :
                  <WeaponNominationSelect
                  weaponId={weaponId}
                  setWeaponId={setWeaponId}
                  nominationId={nominationId}
                  setNominationId={setNominationId}
                  />
                  }
                </>
              </TabSwitcher>
              <Button
                onPress={createProposal}
                title='Submit Proposal'
              />
            </Section>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    marginTop: 30
  },
  scrollContainer: {
    padding: 16,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
    justifyContent: "center"
  },
  activeTab: {
    backgroundColor: ACCENT,
  },
  label: {
    color: FG,
    marginBottom: 8,
    fontFamily: 'IBMPlexSansRegular',
  },
  adminContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  adminText: {
    color: FG,
    padding: 8,
    backgroundColor: SURFACE_2,
    borderRadius: 8,
    fontFamily: 'IBMPlexSansRegular',
  },
  currentAdmin: {
    borderColor: ACCENT,
    borderWidth: 1,
  },
  actions: {
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'flex-end',
  },
  votedButton: {
    opacity: 0.7,
    backgroundColor: SURFACE_2,
  }
})

export default VotingScreen