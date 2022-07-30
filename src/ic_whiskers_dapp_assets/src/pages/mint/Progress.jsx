import React, { useState, useEffect } from "react";
import {
  Progress,
  Heading,
  Text,
  Box,
  Center,
  useBreakpointValue,
} from "@chakra-ui/react";
import { createItoActor } from "../../../../declarations/ito";
import { useAnvilDispatch } from "@vvv-interactive/nftanvil-react";
import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";

const Stats = () => async (dispatch, getState) => {
  let ito = createItoActor({
    agentOptions: authentication.getAgentOptions(),
  });

  let stats = await ito.stats();

  return stats;
};

const ProgressStats = () => {
  const anvilDispatch = useAnvilDispatch();
  const [stats, setStats] = useState({});
  const [loaded, setLoaded] = useState(false);

  const load = async () => {
    let data = await anvilDispatch(Stats());
    setStats({
      percent: Math.round(
        (Number(data.total - data.available) / Number(data.total)) * 100
      ),
      minted: data.total - data.available,
      total: data.total,
    });
    if (!loaded) {
      setLoaded(true);
    }
  };

  useEffect(() => {
    load();
    const interval = setInterval(() => {
      load();
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  });
  return (
    <Center>
      <Box p={10} maxW="1250px">
        <Text fontWeight={600} color="gray.600">
          {loaded ? stats.minted.toString() : "0"} /{" "}
          {loaded ? stats.total.toString() : "10000"}
        </Text>
        <Heading size={useBreakpointValue(["md", "lg"])} mb={2}>
          {loaded ? stats.percent.toString() : "0"}% of NFTs minted
        </Heading>
        <Progress
          width={useBreakpointValue([null, "5xl"])}
          hasStripe
          isAnimated
          colorScheme="pink"
          value={loaded ? stats.percent : 0}
          bg={"#f1c0da"}
          borderRadius="lg"
          height={10}
        />
      </Box>
    </Center>
  );
};

export default ProgressStats;
