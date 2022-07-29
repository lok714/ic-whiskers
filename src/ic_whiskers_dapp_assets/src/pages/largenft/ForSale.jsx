import React from "react";
import {
  Button,
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
import {
  useAnvilSelector,
  nft_purchase,
} from "@vvv-interactive/nftanvil-react";
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

const ForSale = ({ Icp, tokenId, setConfetti }) => {
  return (
    <Flex bg={"gray.50"} rounded={"lg"}>
      <Container bg={"white"} boxShadow={"xl"} rounded={"lg"} p={4}>
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
            </Flex>
          </Heading>
          <Spacer />
          <BuyButton tokenId={tokenId} price={Icp} setConfetti={setConfetti} />
        </HStack>
      </Container>
    </Flex>
  );
};

const toast = createStandaloneToast();

const BuyButton = ({ tokenId, price, setConfetti }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const address = useAnvilSelector((state) => state.user.address);
  const dispatch = useAnvilDispatch();

  // 0.01icp= 001000000 e8s

  const PurchaseNft = async () => {
    onClose();
    let buyObj = {
      id: tokenId,
      amount: Number(price),
      affiliate: [
        {
          address: TextToArray(
            "a00dcee3d64e4daaa34ebfa7b95fba5f095e234d32a4770958e3f8e8818cafe1"
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
          tokenId.substring(0, 6) + "..." + tokenId.substring(15, 20)
        } bought for ${e8sToIcp(price)} ICP`
      );

      return setConfetti();
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
