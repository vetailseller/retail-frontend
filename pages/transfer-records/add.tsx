"use client";

import { useState } from "react";
import { recordService } from "@/lib/api/records";
import { CreateRecordApiInput } from "@/common/types";
import { ROUTES } from "@/common/constants";
import Header from "@/components/Header";

import { InfoCard, RecordForm } from "@/components/pages/add-record";
import { toast } from "sonner";

export default function AddRecord() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (data: CreateRecordApiInput) => {
    try {
      setIsLoading(true);
      setError("");
      setSuccess(false);

      const record = await recordService.create(data);

      setIsLoading(false);
      console.log("Created record:", record);
    } catch (err: any) {
      toast.error(
        err?.message || "An error occurred while creating the record.",
      );
      setIsLoading(false);
      throw err;
    }
  };

  return (
    <div className="h-screen font-primary flex flex-col">
      <Header navLink={ROUTES.HOME} navLabel="စာရင်းမှတ်မည်" />
      <main className="w-full pt-4 flex-1 flex flex-col">
        <InfoCard />
        <RecordForm onSubmit={handleSubmit} isLoading={isLoading} />
      </main>
    </div>
  );
}
