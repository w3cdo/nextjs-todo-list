import Image from "next/image";
import AddItemPanel from "./AddItemPanel";

export default function Home() {
  return (
    <main>
      <h1>
        Todo list
      </h1>
      <AddItemPanel />
    </main>
  );
}
