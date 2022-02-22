import {
  Box,
  Button,
  CallInboundFilled,
  CallOutboundFilled,
  Flex,
  Spacer,
  Typography,
} from "@aircall/tractor";
import { useCallContext } from "../contexts/CallContext";

export default function CallDetail() {
  const { currentCall, archiveIds } = useCallContext();

  if (!currentCall) {
    return <></>;
  }

  return (
    <>
      <Flex
        flexDirection="column"
        pt="10px"
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Spacer direction="vertical" alignItems="center">
          <Typography variant="displayS">Infos:</Typography>
          {currentCall.direction === "outbound" ? (
            <CallOutboundFilled />
          ) : (
            <CallInboundFilled />
          )}
          <Typography>From: {currentCall.from}</Typography>
          <Typography>To: {currentCall.to}</Typography>
          <Typography>Via: {currentCall.via}</Typography>
          <Typography>Duration: {currentCall.duration}</Typography>
          <Typography>CallType: {currentCall.call_type}</Typography>
          <Typography>
            Archived: {currentCall.is_archived ? "yes" : "no"}
          </Typography>

          {currentCall.notes.length > 0 && (
            <Box>
              <Typography mt="10px" variant="displayS">
                Notes:
              </Typography>
              ,
              {currentCall.notes.map((note) => (
                <Box key={note.id} bg="primary">
                  <Typography>{note.content}</Typography>
                </Box>
              ))}
            </Box>
          )}

            <Button
              size="xSmall"
              variant="destructive"
              onClick={() => archiveIds([currentCall.id])}
            >
              Archive
            </Button>
        </Spacer>
      </Flex>
    </>
  );
}
