import React, { useState } from "react";
import { createItoActor } from "../../../../declarations/ito.js";
import { base58ToBytes } from "@vvv-interactive/nftanvil-tools/cjs/data.js";
import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";
import * as AccountIdentifier from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import {
  useAnvilDispatch,
  useAnvilSelector,
} from "@vvv-interactive/nftanvil-react";
import { tokenToText } from "@vvv-interactive/nftanvil-tools/cjs/token.js";
import {
  Text,
  Button,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  createStandaloneToast,
  useDisclosure,
  Heading,
  Input,
  Center,
} from "@chakra-ui/react";
import { GiConfirmed } from "react-icons/gi";
import {
  FailedToast,
  SendingToast,
  SuccessToast,
} from "../../components/toasts/Toasts";
import { useNavigate } from "react-router-dom";

const toast = createStandaloneToast();

const Airdrop = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const address = useAnvilSelector((state) => state.user.address);
  const dispatch = useAnvilDispatch();
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const airdrop_use = (key) => async (dispatch, getState) => {
    const s = getState();

    let address = AccountIdentifier.TextToArray(s.user.address);

    let ito = createItoActor({
      agentOptions: authentication.getAgentOptions(),
    });

    let brez = await ito.airdrop_use(address, base58ToBytes(key));

    console.log("airdrop_use", brez);
    if ("err" in brez) throw new Error(brez.err);

    return navigate(
      "/marketplace/nft/" + tokenToText(brez.ok.map((x) => Number(x))[0]),
      {
        state: {
          prev: "/mint",
          showConfetti: true,
          totalNfts: 1,
        },
      }
    ); // returns the claimed token
  };

  const send_code = async (code) => {
    if (code.length < 1) {
      return FailedToast("Failed", "Airdrop code Invalid");
    }
    onClose();
    SendingToast("Claiming NFT...");

    try {
      await dispatch(airdrop_use(code));
      toast.closeAll();
      SuccessToast("Success", "Congratulations! You got 1 NFT");
    } catch (e) {
      toast.closeAll();
      return FailedToast("Failed", e.toString());
    }
  };

  return (
    <Center>
      <Button
        bg="pink.400"
        color="white"
        mt={2}
        size={useBreakpointValue(["md", "lg"])}
        colorScheme="pink.400"
        _hover={{ opacity: "0.8" }}
        mb={3}
        onClick={onOpen}
        isDisabled={address ? false : true}
      >
        <Text as="kbd">Use Airdrop Code</Text>
      </Button>
      {/* modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="white" mx="10%">
          <ModalHeader>
            <Center>Enter Airdrop Code</Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading
              fontSize={{ base: "xs", sm: "xs", md: "md" }}
              color={"white"}
            >
              <FormControl>
                <Input
                  color="#000"
                  placeholder="2q3yzvCiraWf2vAR..."
                  onChange={(event) => setCode(event.target.value)}
                />
              </FormControl>
            </Heading>
          </ModalBody>
          <ModalFooter>
            <Button
              bg="pink.400"
              color="white"
              colorScheme="pink.400"
              width="100%"
              rightIcon={<GiConfirmed />}
              _hover={{ opacity: "0.8" }}
              onClick={() => send_code(code)}
            >
              Confirm Airdrop
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
};

export default Airdrop;
