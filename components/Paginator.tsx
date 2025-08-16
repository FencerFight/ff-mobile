import { FG, SURFACE, SURFACE_2 } from "@/constants";
import { StepBack, StepForward } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import Button from "./Button";

interface PaginatorProps {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    isNext: boolean;
    totalPages?: number;
}

export default function Paginator({ page, setPage, isNext, totalPages }:PaginatorProps) {
    return (
    <View style={styles.pagination}>
        <Button
            style={styles.pageButton}
            disabled={page === 0}
            onPress={() => setPage(Math.max(0, page - 1))}
        >
            <StepBack size={20} color={FG} />
        </Button>
        <Text style={styles.pageNumber}>{totalPages ? `${page + 1}/${totalPages}` : (page + 1)}</Text>
        <Button
            style={styles.pageButton}
            disabled={isNext}
            onPress={() => setPage(page + 1)}
        >
            <StepForward size={20} color={FG} />
        </Button>
    </View>
    )
}

const styles = StyleSheet.create({
      pagination: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: SURFACE,
    borderRadius: 8,
    paddingVertical: 12,
  },
  pageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    backgroundColor: SURFACE_2,
    borderRadius: 4,
    color: FG,
    fontFamily: 'IBMPlexSansRegular',
    fontSize: 14,
  },
  pageNumber: {
    marginHorizontal: 8,
    fontSize: 14,
    color: FG,
    fontFamily: 'IBMPlexSansBold',
  }
})