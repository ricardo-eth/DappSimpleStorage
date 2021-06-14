import { useContext, useEffect, useState } from "react";
import { SimpleStorageContext } from "./App";
import { Web3Context } from "web3-hooks";

import {
  Input,
  Flex,
  AlertIcon,
  AlertTitle,
  Alert,
  Button,
  Text,
  HStack,
  Box,
  Stack,
} from "@chakra-ui/react";

function Dapp() {
  const simpleStorage = useContext(SimpleStorageContext);
  const [value, setValue] = useState(0);
  const [inputValue, SetInputValue] = useState("");

  const [web3State] = useContext(Web3Context);
  const [error, setError] = useState("");

  // Get storage value when component is mounted
  useEffect(() => {
    if (simpleStorage) {
      const getValue = async () => {
        try {
          const _value = await simpleStorage.getData();
          setValue(_value);
        } catch (e) {
          console.log(e);
          setError(`${e.message}`);
        }
      };
      getValue();
    }
  }, [simpleStorage]);

  // Listen to DataSet event and react with a state change
  useEffect(() => {
    // si simpleStorage est pas null alors
    if (simpleStorage) {
      const cb = (account, str) => {
        setValue(str);
      };
      // ecouter sur l'event DataSet
      simpleStorage.on("DataSet", cb);
      return () => {
        // arreter d'ecouter lorsque le component sera unmount
        simpleStorage.off("DataSet", cb);
      };
    }
  }, [simpleStorage]);

  const handleClickSetStorage = async () => {
    try {
      await simpleStorage.setData(inputValue);
    } catch (e) {
      console.log(e);
      setError(`${e.message}`);
    }
  };

  return (
    <>
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Flex direction="column" p={12} rounded={6}>
          <Stack spacing={3}>
            <HStack spacing="24px">
              <Box>
                <Text fontSize="2xl">Account:</Text>
              </Box>
              <Box>
                <Text color="gray.500" isTruncated>
                  {web3State.account}
                </Text>
              </Box>
            </HStack>
            <HStack spacing="24px">
              <Box>
                <Text fontSize="2xl">Network name:</Text>
              </Box>
              <Box>
                <Text color="gray.500" isTruncated>
                  {web3State.networkName}
                </Text>
              </Box>
            </HStack>
            <HStack spacing="24px">
              <Box>
                <Text fontSize="2xl">Value:</Text>
              </Box>
              <Box>
                <Text color="gray.500" isTruncated>
                  {value}
                </Text>
              </Box>
            </HStack>
            <Input
              variant="filled"
              mb={3}
              value={inputValue}
              onChange={(event) => SetInputValue(event.target.value)}
            />
            <Button colorScheme="blue" onClick={handleClickSetStorage}>
              Set storage
            </Button>
            {error && (
              <>
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle mr={2}>{error}</AlertTitle>
                </Alert>
              </>
            )}
          </Stack>
        </Flex>
      </Flex>
    </>
  );
}

export default Dapp;
