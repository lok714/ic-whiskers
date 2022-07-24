import React from "react";
import {
  Button,
  useColorModeValue,
  Heading,
  Text,
  Container,
  Flex,
  Image as ChakraImage,
  Tooltip,
  useBreakpointValue,
  HStack,
  Spacer,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Center,
  createStandaloneToast,
} from "@chakra-ui/react";
import IcLogo from "../../../assets/ic-logo.png";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { useAnvilSelector, nft_purchase } from "@vvv-interactive/nftanvil-react";
import { useNavigate } from "react-router-dom";
import {
  SendingToast,
  SuccessToast,
  FailedToast,
} from "../../components/toasts/Toasts";
import {
  e8sToIcp,
  TextToArray,
} from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import { useAnvilDispatch } from "@vvv-interactive/nftanvil-react";

const ForSale = ({ Icp, tokenId }) => {
  return (
    <Flex bg={useColorModeValue("gray.50", "gray.800")} rounded={"lg"}>
      <Container
        bg={useColorModeValue("white", "whiteAlpha.100")}
        boxShadow={"xl"}
        rounded={"lg"}
        p={4}
      >
        <Text
          fontWeight={600}
          fontSize={{ base: "md", md: "lg" }}
          color="#b2b8be"
          mb={2}
        >
          Current Price
        </Text>
        <HStack>
          <Heading color={"#353840"} fontSize={{ base: "lg", md: "xl" }}>
            <Flex align="center">
              <Tooltip label="ICP">
                <ChakraImage
                  src={IcLogo}
                  h={["18px", null, "25px"]}
                  w={"auto"}
                />
              </Tooltip>
              &nbsp;
              {e8sToIcp(Icp)}
              &nbsp;
              <Text color={"#b2b8be"} fontSize="md">
                ($x.xx)
              </Text>
            </Flex>
          </Heading>
          <Spacer />
          <BuyButton tokenId={tokenId} price={Icp} />
        </HStack>
      </Container>
    </Flex>
  );
};

const toast = createStandaloneToast();

const BuyButton = ({ tokenId, price }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const address = useAnvilSelector((state) => state.user.address);
  const dispatch = useAnvilDispatch();
  const navigate = useNavigate();

  // 0.01icp= 001000000 e8s

  const PurchaseNft = async () => {
    onClose();
    let buyObj = {
      id: tokenId,
      amount: Number(price),
      affiliate: [
        {
          address: TextToArray(
            "a006b7308ff262c78c50b3a20059229d30b818034a9f5186eec8e93a1dc15f77"
          ),
          amount: 100000,
        },
      ],
    };

    try {
      SendingToast("Buying NFT...");
      await dispatch(nft_purchase(buyObj));
      toast.closeAll();
      SuccessToast(
        "Success",
        `${
          tokenToText(tokenId).substring(0, 6) +
          "..." +
          tokenToText(tokenId).substring(15, 20)
        } bought for ${e8sToIcp(price)} ICP`
      );

      return navigate("marketplace/nft/" + tokenToText(tokenId), {
        state: {
          prev: "/marketplace",
          showConfetti: true,
          totalNfts: 1,
        },
      });
    } catch (e) {
      console.log(e);
      toast.closeAll();
      FailedToast("Failed", e.toString());
    }
  };

  return (
    <>
      <Button
        leftIcon={<MdOutlineAccountBalanceWallet />}
        bg="pink.400"
        color="white"
        mt={2}
        size={useBreakpointValue(["md", "lg"])}
        colorScheme="pink.400"
        _hover={{ opacity: "0.8" }}
        disabled={address ? false : true}
        onClick={() => onOpen()}
      >
        Buy Now
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="white" mx="10%">
          <ModalHeader>
            <Center>Complete Checkout</Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Heading
              fontSize={{ base: "xs", sm: "xs", md: "md" }}
              fontWeight={600}
              color="#b2b8be"
              mb={2}
            >
              Item
              <Text casing={"uppercase"} color="#353840">
                {tokenId}
              </Text>
            </Heading>
            <Heading
              fontSize={{ base: "xs", sm: "xs", md: "md" }}
              fontWeight={600}
              color="#b2b8be"
            >
              Price
            </Heading>
            <Flex align="center" fontWeight={600}>
              <Tooltip label="ICP">
                <ChakraImage
                  src={IcLogo}
                  h={["18px", null, "25px"]}
                  w={"auto"}
                />
              </Tooltip>
              &nbsp;
              {e8sToIcp(price)}
              &nbsp;
              <Text color={"#b2b8be"} fontSize="md">
                ($x.xx)
              </Text>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              leftIcon={<MdOutlineAccountBalanceWallet />}
              bg="pink.400"
              color="white"
              mt={2}
              size={useBreakpointValue(["md", "lg"])}
              colorScheme="pink.400"
              _hover={{ opacity: "0.8" }}
              width="100%"
              onClick={() => PurchaseNft()}
            >
              Checkout
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ForSale;
