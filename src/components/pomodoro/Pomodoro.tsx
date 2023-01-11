import { VStack, Button, Icon, Box, Text } from "@chakra-ui/react";
import { Play, Stop } from "phosphor-react";
import { usePomo } from "../../hooks/usePomo";
import { ConfigModal } from "../config-modal/ConfigModal";

export default function Pomodoro() {
  const { isCounting, startPomo, stopPomo, getClockLabel, setTypePomo } =
    usePomo();

  return (
    <>
      <VStack>
        <Box marginTop={2}>
          <Button
            marginRight={2}
            color="primary"
            variant="ghost"
            onClick={() => setTypePomo("pomo")}
          >
            Pomodoro
          </Button>
          <Button
            marginRight={2}
            color="primary"
            variant="ghost"
            onClick={() => setTypePomo("short-break")}
          >
            Short break
          </Button>
          <Button
            marginRight={2}
            color="primary"
            variant="ghost"
            onClick={() => setTypePomo("long-break")}
          >
            Long break
          </Button>
        </Box>
        <Box>
          <Text fontSize="6xl">{getClockLabel()}</Text>
        </Box>
        <Box paddingBottom={5}>
          {isCounting && (
            <Button
              leftIcon={<Icon as={Stop} />}
              color="primary"
              variant="solid"
              onClick={stopPomo}
            >
              Stop Pomo
            </Button>
          )}
          {!isCounting && (
            <Button
              leftIcon={<Icon as={Play} />}
              color="primary"
              variant="solid"
              onClick={startPomo}
            >
              Start Pomo
            </Button>
          )}
        </Box>
        <Box>
          <ConfigModal />
        </Box>
      </VStack>
    </>
  );
}
