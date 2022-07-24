import React, { useState, useEffect } from "react";
import {
  SimpleGrid,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  Button,
  Center,
  Stack,
  Flex,
  Spacer,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import { SingleNft } from "../../components/";
import { FailedToast } from "../../components/toasts/Toasts";

const address =
  "a004f41ea1a46f5b7e9e9639fbed84e037d9ce66b75d392d2c1640bb7a559cda"; // this is badbot address

const Marketplace = () => {
  const [Loaded, setLoaded] = useState(false);
  const [tokensForSale, setTokensForSale] = useState([]);
  const [author, setAuthor] = useState({});
  const [sortBy, setSort] = useState("All");
  const [page, setPage] = useState(0);
  const [pricingFilter, setPricingFilter] = useState("Low to High");

  // author fetch - only runs if author changes
  const fetchAuthorData = async () => {
    let meta;
    let prices;
    await Promise.all([
      (async () => {
        try {
          meta = await fetch(
            "https://nftpkg.com/api/v1/author/" + address
          ).then((x) => x.json());
        } catch (e) {
          FailedToast("Failed", "Error fetching author data");
        }
      })(),
      (async () => {
        try {
          prices = await fetch(
            "https://nftpkg.com/api/v1/prices/" + address
          ).then((x) => x.json());
        } catch (e) {
          FailedToast("Failed", "Error fetching author data");
        }
      })(),
    ]);
    setAuthor({ meta: meta, prices: prices });
    setLoaded(true);
  };

  // helper function for matching rarity to number
  const getNumFromRarity = (rarity) => {
    switch (rarity) {
      case "Common":
        return 1;
      case "Uncommon":
        return 2;
      case "Rare":
        return 3;
      case "Epic":
        return 4;
      case "Legendary":
        return 5;
      case "Artifact":
        return 6;
      case "All":
        return "All";
    }
  };

  // helper function for sorting rarities
  const sortRarity = async (allTokens, rarity) => {
    if (rarity === "All") {
      return allTokens;
    }
    let rarityFiltered = [];
    for (let i = 0; i < author.meta.length; i++) {
      if (author.meta[i][1] == rarity) {
        rarityFiltered.push(author.meta[i][0]);
      }
    }
    let filtered = [];
    for (let i = 0; i < allTokens.length; i++) {
      if (rarityFiltered.includes(allTokens[i])) {
        filtered.push(allTokens[i]);
      }
    }

    return filtered;
  };

  // sort nfts accordingly - prices are retrieved from NFT meta data
  const LoadSale = async () => {
    if (Loaded) {
      let forSale = [];

      let prices = author.prices;

      if (pricingFilter === "Low to High") {
        prices.sort((a, b) => a[2] - b[2]);
      } else if (pricingFilter === "High to Low") {
        prices.sort((a, b) => b[2] - a[2]);
      }

      for (let i = 0; i < prices.length; i++) {
        if (prices[i][2] > 0) {
          forSale.push(prices[i][0]);
        }
      }
      if (sortBy === "0") {
        setTokensForSale(forSale.slice(page * 12, (page + 1) * 12));
      } else {
        let filtered = await sortRarity(forSale, getNumFromRarity(sortBy));
        setTokensForSale(filtered.slice(page * 12, (page + 1) * 12));
      }
    }
  };

  useEffect(() => {
    LoadSale();
  }, [page, sortBy, pricingFilter, Loaded]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAuthorData();
  }, []);

  return (
    <div>
      <FilteringOptions
        pricingFilter={pricingFilter}
        setPricingFilter={setPricingFilter}
        sortBy={sortBy}
        setSort={setSort}
      />
      {Loaded ? (
        <>
          <Center my={2}>
            <PaginationButtons
              setPage={setPage}
              page={page}
              tokensLength={tokensForSale.length}
            />
          </Center>
          <Center mt={1}>
            <SimpleGrid
              columns={{ base: 2, md: 2, lg: 4 }}
              pb={5}
              gap={2}
              mx={2}
              maxW="1250px"
            >
              {tokensForSale.map((item) => (
                <SingleNft tokenId={item} key={item} />
              ))}
            </SimpleGrid>
          </Center>
          <Center mb={2} mt={-2}>
            <PaginationButtons
              setPage={setPage}
              page={page}
              tokensLength={tokensForSale.length}
            />
          </Center>
        </>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

// put below in a seperate file
const FilteringOptions = ({
  pricingFilter,
  setPricingFilter,
  sortBy,
  setSort,
}) => {
  return (
    <Container maxWidth="1250px">
      <Flex>
        <Spacer />
        <RarityFilter sortBy={sortBy} setSort={setSort} />
        <LtoH
          pricingFilter={pricingFilter}
          setPricingFilter={setPricingFilter}
        />
      </Flex>
    </Container>
  );
};

const RarityFilter = ({ sortBy, setSort }) => {
  return (
    <Menu>
      <MenuButton
        border={"2px"}
        borderColor={"#e5e8eb"}
        as={Button}
        boxShadow="base"
        bg={useColorModeValue("white", "whiteAlpha.100")}
      >
        {sortBy}
      </MenuButton>
      <MenuList minWidth="240px">
        <MenuOptionGroup defaultValue="All" title="Rarity">
          <MenuItemOption value={"All"} onClick={() => setSort("All")}>
            All
          </MenuItemOption>
          <MenuItemOption value={"Common"} onClick={() => setSort("Common")}>
            Common
          </MenuItemOption>
          <MenuItemOption
            value={"Uncommon"}
            onClick={() => setSort("Uncommon")}
          >
            Uncommon
          </MenuItemOption>
          <MenuItemOption value={"Rare"} onClick={() => setSort("Rare")}>
            Rare
          </MenuItemOption>
          <MenuItemOption value={"Epic"} onClick={() => setSort("Epic")}>
            Epic
          </MenuItemOption>
          <MenuItemOption
            value={"Legendary"}
            onClick={() => setSort("Legendary")}
          >
            Legendary
          </MenuItemOption>
          <MenuItemOption
            value={"Artifact"}
            onClick={() => setSort("Artifact")}
          >
            Artifact
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

const LtoH = ({ pricingFilter, setPricingFilter }) => {
  return (
    <Menu>
      <MenuButton
        ms={2}
        border={"2px"}
        borderColor={"#e5e8eb"}
        as={Button}
        boxShadow="base"
        bg={useColorModeValue("white", "whiteAlpha.100")}
      >
        {pricingFilter}
      </MenuButton>
      <MenuList minWidth="240px">
        <MenuOptionGroup defaultValue="Low to High" title="Price">
          <MenuItemOption
            value={"Common"}
            onClick={() => setPricingFilter("Low to High")}
          >
            Low to High
          </MenuItemOption>
          <MenuItemOption
            value={"Uncommon"}
            onClick={() => setPricingFilter("High to Low")}
          >
            High to Low
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};
const PaginationButtons = ({ setPage, page, tokensLength }) => {
  return (
    <Stack
      direction={"row"}
      spacing={3}
      align={"center"}
      alignSelf={"center"}
      position={"relative"}
    >
      <Button
        border={"2px"}
        borderColor={"#e5e8eb"}
        boxShadow="base"
        bg={useColorModeValue("white", "whiteAlpha.100")}
        _hover={{ opacity: "0.8" }}
        isDisabled={page === 0}
        onClick={() => {
          setPage(page - 1);
        }}
      >
        Prev Page
      </Button>
      <Button
        border={"2px"}
        borderColor={"#e5e8eb"}
        boxShadow="base"
        bg={useColorModeValue("white", "whiteAlpha.100")}
        px={6}
        _hover={{ opacity: "0.8" }}
        isDisabled={tokensLength < 12}
        onClick={() => {
          setPage(page + 1);
        }}
      >
        Next Page
      </Button>
    </Stack>
  );
};

export default Marketplace;
