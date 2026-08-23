"use client";
import { Button } from "@/components/ui/Button";
import { useSimulatePayment } from "../hooks/useSimulatePayment";
export function PaymentSimulateButton({ orderId, onSuccess }: { orderId: string; onSuccess: () => void }) { const simulateMutation = useSimulatePayment(); return <Button type="button" onClick={() => simulateMutation.mutate(orderId, { onSuccess: (response) => { if (response.data?.paymentStatus === "success") onSuccess(); } })} isLoading={simulateMutation.isPending} className="w-full">Simulasikan Pembayaran</Button>; }
