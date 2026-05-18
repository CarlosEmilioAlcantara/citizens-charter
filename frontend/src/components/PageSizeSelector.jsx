import Dropdown from "./Dropdown";

export default function PageSizeSelector({ label, setValue }) {
  return(
    <Dropdown label={`${label} Rows`} small={true} items={[
      {
        "name": "10 Rows",
        "function": (e) => {setValue(value => 10)}
      },
      {
        "name": "20 Rows",
        "function": (e) => {setValue(value => 20)}
      },
      {
        "name": "30 Rows",
        "function": (e) => {setValue(value => 30)}
      },
      {
        "name": "40 Rows",
        "function": (e) => {setValue(value => 40)}
      },
      {
        "name": "50 Rows",
        "function": (e) => {setValue(value => 50)}
      },
      {
        "name": "60 Rows",
        "function": (e) => {setValue(value => 60)}
      },
      {
        "name": "70 Rows",
        "function": (e) => {setValue(value => 70)}
      },
      {
        "name": "80 Rows",
        "function": (e) => {setValue(value => 80)}
      },
      {
        "name": "90 Rows",
        "function": (e) => {setValue(value => 90)}
      },
      {
        "name": "100 Rows",
        "function": (e) => {setValue(value => 100)}
      },
    ]}/>
  );
}