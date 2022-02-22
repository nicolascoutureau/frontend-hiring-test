import { Box, Flex, Typography } from "@aircall/tractor";
import { groupBy } from "lodash";
import moment from "moment";
import { useMemo } from "react";
import { useCallContext } from "../contexts/CallContext";
import { ICall } from "../types";
import CallCard from "./CallCard";

interface iGroupedCall {
  0: string;
  1: ICall[];
}

export default function CallList() {
  const { calls, toggleSelected, selectedIds } = useCallContext();

  const groupedCalls: iGroupedCall[] = useMemo(() => {
    if (!calls) {
      return [];
    }

    const sortedCalls = calls.sort((a, b) =>
      a.created_at > b.created_at ? -1 : 1
    );

    return Object.entries(
      groupBy(sortedCalls, (node) =>
        moment(node.created_at).format("YYYY-MM-DD")
      )
    );
  }, [calls]);

  return (
    <Flex flex="1" overflow="scroll" flexDirection="column" py="10px">
      {groupedCalls.map((data) => (
        <Box key={data[0]}>
          <Flex flexDirection='row' my="20px" px="20px" justifyContent='space-between' alignItems="center" >
            <Typography variant="heading" color="gray">
              {data[0]} 
            </Typography>
            <Typography variant="caption">{data[1].length} Call(s)</Typography>
          </Flex>

          <Box mx="20px">
            {data[1].map((call) => (
              <CallCard
                call={call}
                key={call.id}
                onChange={toggleSelected}
                selected={selectedIds.includes(call.id)}
              />
            ))}
          </Box>
        </Box>
      ))}
    </Flex>
  );
}
