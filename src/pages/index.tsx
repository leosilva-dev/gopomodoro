import Head from "next/head";
import Pomodoro from "../components/pomodoro/Pomodoro";
import { usePomoContext } from "../hooks/usePomoContext";

export default function Home() {
  const { timerPreview } = usePomoContext();
  return (
    <>
      <Head>
        <title>
          {timerPreview !== "-- --"
            ? `${timerPreview} - GoPomodoro`
            : "GoPomodoro"}
        </title>
        <link rel="shortcut icon" href="./favicon.png" />
      </Head>
      <Pomodoro />
    </>
  );
}
