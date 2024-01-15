import ChipInput from "./components/ChipInput";
import { mockChipsData } from "./models/User/mockData";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ChipInput users={mockChipsData} />
    </main>
  );
}
