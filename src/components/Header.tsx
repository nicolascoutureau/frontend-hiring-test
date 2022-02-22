import { Button, Flex, Typography } from "@aircall/tractor";
import { useAuth } from "../contexts/AuthContext";
import { useCallContext } from "../contexts/CallContext";

export default function Header(){

    const {archiveIds, selectedIds} = useCallContext();
    const { user } = useAuth()

    return (
        <Flex
          height="80px"
          alignItems="center"
          px="20px"
          justifyContent="space-between"
          bg="primary.light"
        >
          {user && <Typography variant="displayS" color="white">
            {user.id}
          </Typography>}
          {selectedIds.length > 0 && (
            <Button
              size="xSmall"
              variant="destructive"
              onClick={() => archiveIds(selectedIds)}
            >
              Archive ({selectedIds.length})
            </Button>
          )}
        </Flex>
    )
}