"use client";

import { ROUTES } from "@/common/constants";
import Header from "@/components/Header";
import { InfoCard, RecordForm } from "@/components/pages/add-record";

export default function AddRecord() {
  return (
    <div className="rt-h-screen rt-font-primary rt-flex rt-flex-col">
      <Header navLink={ROUTES.HOME} navLabel="စာရင်းမှတ်မည်" />
      <main className="rt-w-full rt-pt-4 rt-flex-1 rt-flex rt-flex-col">
        <InfoCard />
        <RecordForm />
      </main>
    </div>
  );
}
