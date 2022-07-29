import React from "react";
import {
  Text,
  Heading,
  Button,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormHelperText,
  FormControl,
  Center,
  createStandaloneToast,
} from "@chakra-ui/react";
import { GiConfirmed } from "react-icons/gi";
import { createItoActor } from "../../../../declarations/ito.js";
import {
  user_pwr_transfer,
  user_refresh_balances,
  useAnvilDispatch,
  useAnvilSelector,
} from "@vvv-interactive/nftanvil-react";
import {
  principalToAccountIdentifier,
  tokenToText,
} from "@vvv-interactive/nftanvil-tools/cjs/token.js";
import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";
import * as AccountIdentifier from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import {
  SendingToast,
  SuccessToast,
  FailedToast,
} from "../../components/toasts/Toasts";
import { useNavigate } from "react-router-dom";

const toast = createStandaloneToast();

// purchase component used in Launhpad for inital offering

const Purchase = ({ nfts, amount }) => {
  const dispatch = useAnvilDispatch();
  const address = useAnvilSelector((state) => state.user.address);
  const navigate = useNavigate();

  const buy = (amount) => async (dispatch, getState) => {
    SendingToast("Transferring ICP...");

    const s = getState();

    let address = AccountIdentifier.TextToArray(s.user.address);

    let subaccount = [
      AccountIdentifier.TextToArray(s.user.subaccount) || null,
    ].filter(Boolean);

    let destination = principalToAccountIdentifier(
      process.env.REACT_APP_ITO_CANISTER_ID
    );

    let dres;
    try {
      dres = await dispatch(
        user_pwr_transfer({ to: destination, amount, memo: [] }) // traps on error so we use catch
      );
    } catch (err) {
      toast.closeAll();
      return FailedToast("Failed", err.toString());
    }

    toast.closeAll();

    // make pwr transfer and get tx
    console.log("user_pwr_transfer", dres);

    let txid = dres.ok.transactionId;

    let collection = createItoActor({
      agentOptions: authentication.getAgentOptions(),
    });

    SendingToast("Purchasing NFT(s)...");

    // send tx_id to our custom collection.mo contract
    let brez = await collection.buy_tx(txid, subaccount);
    console.log("buy_tx", brez);

    dispatch(user_refresh_balances());

    if ("err" in brez) {
      toast.closeAll();
      return FailedToast("Failed", brez.err.toString());
    }

    toast.closeAll();
    SuccessToast("Success", "Congratulations! You got " + nfts + " NFT(s)");

    return navigate(
      "/marketplace/nft/" + tokenToText(brez.ok.map((x) => Number(x))[0]),
      {
        state: {
          prev: "/mint",
          showConfetti: true,
          totalNfts: nfts,
        },
      }
    ); // returns the claimed token
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        fontSize={{ base: "sm", sm: "sm", md: "md" }}
        w="full"
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
        <Text as="kbd">Mint</Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="white" mx="10%">
          <ModalHeader>
            <Center>
              Price:&nbsp;
              <Text fontWeight={600}>
                {AccountIdentifier.e8sToIcp(amount)} ICP
              </Text>
            </Center>
            <FormControl>
              <FormHelperText>
                + 0.0001 ICP in transfer fees paid to IC
              </FormHelperText>
            </FormControl>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {" "}
            <Heading fontSize={{ base: "xs", sm: "xs", md: "md" }}>
              You will be randomly allocated {nfts} NFT(s) from the collection!
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
              onClick={async () => {
                onClose();
                dispatch(buy(amount));
              }}
            >
              Confirm Payment
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Purchase;
