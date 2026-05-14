import Dropdown from "./Dropdown";

export default function PageSizeSelector({ label, setValue }) {
  return(
    <Dropdown label={label} small={true} items={[
      {
        "name": "10",
        "function": (e) => {setValue(value => e.target.value)}
      },
      {
        "name": "20",
        "function": (e) => {setValue(value => e.target.value)}
      },
      {
        "name": "30",
        "function": (e) => {setValue(value => e.target.value)}
      },
      {
        "name": "40",
        "function": (e) => {setValue(value => e.target.value)}
      },
      {
        "name": "50",
        "function": (e) => {setValue(value => e.target.value)}
      },
      {
        "name": "60",
        "function": (e) => {setValue(value => e.target.value)}
      },
      {
        "name": "70",
        "function": (e) => {setValue(value => e.target.value)}
      },
      {
        "name": "80",
        "function": (e) => {setValue(value => e.target.value)}
      },
      {
        "name": "90",
        "function": (e) => {setValue(value => e.target.value)}
      },
      {
        "name": "100",
        "function": (e) => {setValue(value => e.target.value)}
      },
    ]}/>
  );
}