import Welcome from "../components/kiosk/Welcome";
import Header from "../components/kiosk/Header";
import useToggle from "../hooks/useToggle";

export default function Home() {
  const [state, toggle] = useToggle(true);

  return(
    <>
    <Welcome isOpen={state} toggle={toggle}/>
    <Header toggle={toggle} />
    </>
  );
}