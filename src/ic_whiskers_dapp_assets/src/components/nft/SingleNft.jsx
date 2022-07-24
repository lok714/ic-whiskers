import React, { useState, useEffect } from "react";
import {
  useAnvilDispatch,
  useAnvilSelector,
  nft_fetch,
} from "@vvv-interactive/nftanvil-react";
import {
  tokenUrl,
  tokenToText,
} from "@vvv-interactive/nftanvil-tools/cjs/token.js";
import { itemQuality } from "@vvv-interactive/nftanvil-tools/cjs/items.js";
import { e8sToIcp } from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import {
  Box,
  Heading,
  Text,
  Stack,
  GridItem,
  Skeleton,
  HStack,
  Tooltip,
  Flex,
  Hide,
  Image as ChakraImage,
} from "@chakra-ui/react";
import icLogo from "../../../assets/ic-logo.png";
import { Image as ChakraImage } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SingleNft = ({ tokenId }) => {
  let isMounted = true;
  const map = useAnvilSelector((state) => state.user.map);
  const dispatch = useAnvilDispatch();

  const [img, setImg] = useState();
  const [nft, setNft] = useState({});
  const [loaded, setLoaded] = useState(false);

  const token = tokenToText(tokenId);

  const load = async () => {
    try {
      const meta = await dispatch(nft_fetch(token));
      if (isMounted) {
        setNft({
          id: token,
          name: meta.name,
          color: itemQuality.light[meta.quality].color,
          quality: meta.quality,
          filter: meta.tags[0],
          price: meta.price.amount,
        });
        setLoaded(true);
      }
    } catch (e) {
      console.log("Error, Certified state not ready");
    }
  };

  const loadImg = async () => {
    let src = await tokenUrl(map.space, tokenId, "thumb");
    if (isMounted) {
      setImg(src);
    }
  };

  useEffect(() => {
    load();
    loadImg();
    const interval = setInterval(() => {
      load();
    }, 3000);
    return () => {
      clearInterval(interval);
      isMounted = false;
    };
  }, []);

  return (
    <Link
      to={"/marketplace/nft/" + token}
      state={{
        prev: "/marketplace",
        showConfetti: true,
        totalNfts: 1,
      }}
    >
      <GridItem>
        <Box
          role={"group"}
          minW={["150px", null, "280px"]}
          w={"full"}
          backgroundColor={"#fff"}
          rounded={"lg"}
          border={"2px"}
          borderColor={"#e5e8eb"}
          boxShadow="sm"
        >
          <Box rounded={"lg"} pos={"relative"} overflow="hidden">
            <ChakraImage
              transform="scale(1.0)"
              bg="#fff"
              rounded={"lg"}
              height={["150px", null, "280px"]}
              width={"auto"}
              objectFit={"cover"}
              src={img}
              fallback={<Skeleton height={["150px", null, "280px"]} />}
              transition="0.3s ease-in-out"
              _hover={{
                transform: "scale(1.05)",
              }}
            />
          </Box>
          <HStack pt={3} px={3} align={"start"} justify={"space-between"}>
            {loaded ? (
              <>
                <Hide below="md">
                  <Text
                    color={"gray.500"}
                    casing={"uppercase"}
                    fontSize={{ base: "6pt", sm: "xs", md: "xs" }}
                  >
                    Price
                  </Text>
                </Hide>
                {nft.price > 0 ? (
                  <Tooltip label="Amount in ICP">
                    <Flex align="center">
                      <ChakraImage src={icLogo} h={"18px"} w={"auto"} />
                      &nbsp;
                      <Text
                        as="kbd"
                        color={"#414141"}
                        fontSize={{ base: "7pt", sm: "xs", md: "xs" }}
                      >
                        {e8sToIcp(nft.price)}
                      </Text>
                    </Flex>
                  </Tooltip>
                ) : isMarketplace ? (
                  <Text
                    as="kbd"
                    bgGradient="linear(to-r, #ed1f79, #f15b25)"
                    bgClip="text"
                    fontSize={{ base: "7pt", sm: "xs", md: "xs" }}
                  >
                    Sold
                  </Text>
                ) : null}
              </>
            ) : (
              <>
                <Skeleton height="12px" width={"70px"} />
              </>
            )}
          </HStack>
          <Stack
            px={3}
            pb={2}
            direction={"row"}
            align={"center"}
            justify="space-between"
          >
            {loaded ? (
              <Heading
                fontSize={{ base: "7pt", sm: "xs", md: "sm" }}
                color={nft.color}
              >
                {nft.name}
              </Heading>
            ) : (
              <Skeleton height="12px" width={"100px"} my={2} />
            )}
          </Stack>
        </Box>
      </GridItem>
    </Link>
  );
};

export default SingleNft;
