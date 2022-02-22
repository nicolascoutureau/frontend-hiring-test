import {
  Box,
  Button,
  CallInboundFilled,
  CallOutboundFilled,
  Checkbox,
  Flex,
  InformationOutlined,
  Spacer,
  Typography,
} from "@aircall/tractor";
import { useCallContext } from "../contexts/CallContext";
import { ICall } from "../types";

interface Props{
  call: ICall;
  onChange: (call: ICall) => void;
  selected: boolean;
}

export default function CallCard({ call, onChange, selected } : Props) {

  const {setCurrentCall} = useCallContext();

  return (
    <Box
      borderRadius={8}
      mt="10px"
      boxShadow={3}
      py="20px"
      width="100%"
      border="1px solid #eee"
      bg={selected ? "primary.light" : "#fff"}
    >
      <Flex
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
        px="20px"
        opacity={call.is_archived ? 0.2 : 1}
      >
        <Checkbox
          size="regular"
          onChange={() => onChange(call)}
          checked={selected}
        ></Checkbox>

        <Spacer space="s" alignItems="center">
          {call.direction === "outbound" ? (
            <CallOutboundFilled />
          ) : (
            <CallInboundFilled />
          )}

          <Flex flexDirection="column">
            <Typography>From: {call.from}</Typography>
            <Typography>To: {call.to}</Typography>
          </Flex>
        </Spacer>

          <Button mode="link" onClick={() => setCurrentCall(call)}>
            <InformationOutlined />
          </Button>
      </Flex>
    </Box>
  );
}
