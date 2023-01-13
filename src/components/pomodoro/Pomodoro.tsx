import { VStack, Button, Icon, Box, Text } from "@chakra-ui/react";
import { ArrowClockwise, Pause, Play } from "phosphor-react";
import { usePomo } from "../../hooks/usePomo";
import { ConfigModal } from "../config-modal/ConfigModal";

export default function Pomodoro() {
  const {
    isCounting,
    startPomo,
    stopPomo,
    getClockLabel,
    setTypePomo,
    pomoType,
    restartPomo,
  } = usePomo();

  return (
    <VStack
      h="100vh"
      display={"flex"}
      alignItems="center"
      justifyContent={"center"}
    >
      <Box marginTop={2}>
        <Button
          marginRight={2}
          color="primary"
          variant={pomoType === "pomo" ? "solid" : "ghost"}
          onClick={() => setTypePomo("pomo")}
        >
          Pomodoro
        </Button>
        <Button
          marginRight={2}
          color="primary"
          variant={pomoType === "short-break" ? "solid" : "ghost"}
          onClick={() => setTypePomo("short-break")}
        >
          Short break
        </Button>
        <Button
          marginRight={2}
          color="primary"
          variant={pomoType === "long-break" ? "solid" : "ghost"}
          onClick={() => setTypePomo("long-break")}
        >
          Long break
        </Button>
      </Box>
      <Box>
        <Text fontSize="150px">{getClockLabel()}</Text>
      </Box>
      <Box paddingBottom={5}>
        {isCounting && (
          <Button
            leftIcon={<Icon as={Pause} />}
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
        <Button onClick={restartPomo} variant="link">
          <ArrowClockwise size={25} weight="light" />
        </Button>
      </Box>
    </VStack>
  );
}
