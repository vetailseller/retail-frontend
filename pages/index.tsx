import { ROUTES } from "@/common/constants";
import type { RecordItem } from "@/common/types";
import Header from "@/components/Header";
import { Envelope, QuickActions, RecentRecord } from "@/components/pages/home";

export const records: RecordItem[] = [
  {
    id: "1",
    phoneNo: "09791234567",
    amount: 1000000,
    fee: 10000,
    pay: "kbz",
    type: "pay",
    description: null,
    entryPerson: "Dave Mustaine",
    date: new Date(new Date().setDate(new Date().getDate() - 3)),
  },
  {
    id: "2",
    phoneNo: "09797654321",
    amount: 500000,
    fee: 5000,
    pay: "uab",
    type: "pay",
    description: null,
    entryPerson: "James Hetfield",
    date: new Date(new Date().setDate(new Date().getDate() - 2)),
  },
  {
    id: "3",
    phoneNo: "09790001111",
    amount: 200000,
    fee: 2000,
    pay: "aya",
    type: "pay",
    description: null,
    entryPerson: "Lars Ulrich",
    date: new Date(new Date().setDate(new Date().getDate() - 1)),
  },
  {
    id: "4",
    phoneNo: "09795552222",
    amount: 750000,
    fee: 7500,
    pay: "uab",
    type: "pay",
    description: null,
    entryPerson: "Kirk Hammett",
    date: new Date(new Date().setDate(new Date().getDate() - 3)),
  },
  {
    id: "5",
    phoneNo: "09795552222",
    amount: 300000,
    fee: 3000,
    pay: "kbz",
    type: "pay",
    description: null,
    entryPerson: "Robert Trujillo",
    date: new Date(new Date().setDate(new Date().getDate() - 6)),
  },
  {
    id: "6",
    phoneNo: "09793334444",
    amount: 450000,
    fee: 4500,
    pay: "other",
    type: "pay",
    description: "စိုင်းစိုင်းပေး",
    entryPerson: "Jason Newsted",
    date: new Date(new Date().setDate(new Date().getDate() - 5)),
  },
  {
    id: "7",
    phoneNo: "09793334444",
    amount: 450000,
    fee: 4500,
    pay: "other",
    type: "bank",
    description: "ဘဏ်ငွေလွှဲ",
    entryPerson: "Cliff Burton",
    date: new Date(new Date().setDate(new Date().getDate() - 7)),
  },
  {
    id: "8",
    phoneNo: "09793334444",
    amount: 450000,
    fee: 4500,
    pay: "other",
    type: "pay",
    description: "မင်းမင်းပေး",
    entryPerson: "Dave Lombardo",
    date: new Date(new Date().setDate(new Date().getDate() - 7)),
  },
  {
    id: "9",
    phoneNo: "09793322234",
    amount: 390000,
    fee: 3200,
    pay: "other",
    type: "bank",
    description: "ဘဏ်ငွေလွှဲ",
    entryPerson: "Tom Araya",
    date: new Date(new Date().setDate(new Date().getDate() - 3)),
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header navLabel="Kpay စာရင်းမှတ်တမ်း" navLink={ROUTES.HOME} longHeader />
      <Envelope />
      <main className="w-full flex flex-col flex-1 pt-4 gap-[25px]">
        <QuickActions />
        <RecentRecord />
      </main>
    </div>
  );
}
