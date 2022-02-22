import { Button, Flex, Typography } from "@aircall/tractor";
import { useCallback } from "react";
import { useCallContext } from "../contexts/CallContext";

export default function Pagination() {
  const {hasNextPage, page, setPage} = useCallContext();

  const goNextPage = useCallback(() => {
    if (!hasNextPage) {
      return;
    }

    setPage(page + 1);
  },  [hasNextPage, page, setPage]);

  const goPrevPage = useCallback(() => {
    if ( page === 1) {
      return;
    }

    setPage(page - 1);
  }, [page, setPage]);

  return (
    <Flex
      height="80px"
      alignItems="center"
      px="20px"
      justifyContent="space-between"
      bg="primary.light"
    >
      <Button
        size="xSmall"
        variant="white"
        disabled={page === 1}
        onClick={goPrevPage}
      >
        Prev
      </Button>

      <Typography color="white">Page: {page}</Typography>
      <Button
        size="xSmall"
        variant="white"
        disabled={!hasNextPage}
        onClick={goNextPage}
      >
        Next
      </Button>
    </Flex>
  );
}
