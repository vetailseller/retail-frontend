import { useState } from "react";
import { useRouter } from "next/router";
import { Card, CardContent } from "@/components/ui/card";
import { recordService } from "@/lib/api/records";
import { CreateRecordInput, UpdateRecordInput } from "@/common/types";
import { ROUTES } from "@/common/constants";
import Header from "@/components/Header";

import { InfoCard, RecordForm } from "@/components/pages/add-record";

export default function AddRecord() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (data: CreateRecordInput | UpdateRecordInput) => {
    setIsConfirming(true);
    try {
      setIsLoading(true);
      setError("");
      setSuccess(false);

      await recordService.create(data as CreateRecordInput);

      setSuccess(true);

      // Show success message and redirect after a short delay
      setTimeout(() => {
        router.push(ROUTES.VIEW_RECORDS);
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Failed to create record");
      console.error("Error creating record:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-primary flex flex-col">
      <Header navLink={ROUTES.HOME} navLabel="စာရင်းမှတ်မည်" />

      <main className="w-full pt-4 border-2 relative flex flex-col flex-1">
        <InfoCard />
        <RecordForm onSubmit={handleSubmit} isLoading={isLoading} />
      </main>
    </div>
  );
}
