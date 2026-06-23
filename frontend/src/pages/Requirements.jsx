import { useParams } from "react-router-dom";

export default function Requirements() {
  const { id } = useParams();
  return(
    <div>{id}</div>
  );
}