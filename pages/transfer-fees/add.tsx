/**
 * Add Fee Page
 * Page for creating new fees
 */

import { useState } from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FeeForm, FeeCalculator } from "@/components/pages/add-fee";
import { feeService } from "@/lib/api/fees";
import { CreateFeeInput, UpdateFeeInput } from "@/common/types";
import { ROUTES, TOAST_MESSAGES } from "@/common/constants";
import Header from "@/components/Header";

export default function AddFee() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (data: CreateFeeInput | UpdateFeeInput) => {
    try {
      setIsLoading(true);
      setError("");
      setSuccess(false);

      await feeService.create(data as CreateFeeInput);

      setSuccess(true);

      // Show success message for a moment
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Failed to create fee");
      console.error("Error creating fee:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen font-primary flex flex-col">
      <Header
        navLink={ROUTES.HOME}
        navLabel="လွှဲခထည့်မည်"
        enableInstructionModal
      />
    </div>
  );
}
