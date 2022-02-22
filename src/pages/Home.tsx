import { Flex } from "@aircall/tractor";
import {  useEffect } from "react";
import { getCalls } from "../api";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import CallList from "../components/CallList";
import Header from "../components/Header";
import { useCallContext } from "../contexts/CallContext";
import CallDetail from "../components/CallDetail";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  let navigate = useNavigate();
  const { setCalls, page, perPage, setHasNextPage } = useCallContext();
  const {user} = useAuth();

  useEffect(() => {
    if(!user){
      return
    }

    let offset = (page - 1) * perPage;

    getCalls(offset, perPage)
      .then((res) => {
        setCalls(res.nodes);
        setHasNextPage(res.hasNextPage);
      });
  }, [page, navigate, setCalls, perPage, setHasNextPage, user]);

  return (
    <>
      <Flex flex="1">
        <Flex
          height="100vh"
          minWidth="350px"
          borderRightColor="secondary.light"
          borderRightWidth={1}
          borderRightStyle="solid"
          flexDirection="column"
          flex="1"
        >
          <Header />
          <CallList />
          <Pagination />
        </Flex>
        <Flex flex="3">
          <CallDetail />
        </Flex>
      </Flex>
    </>
  );
}
