"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { bitcoinImg } from "@/assets/images";
import { Button } from "@/components/ui/Button";
import { useAccount, useConnect, useDisconnect, useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits, encodeFunctionData } from "viem";
import { base } from "wagmi/chains";

// USDC contract on Base
const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as const;
const USDC_DECIMALS = 6;

// ERC-20 transfer ABI (minimal)
const ERC20_TRANSFER_ABI = [
  {
    name: "transfer",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;

type PaymentStep = "details" | "connecting" | "confirm" | "pending" | "success" | "error";

const Pay = () => {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const [step, setStep] = useState<PaymentStep>("details");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // --- Mock payment link data (will come from URL params / DB in production) ---
  const paymentData = {
    merchantName: "Coffee Shop",
    amount: "10.50",
    asset: "USDC",
    // Replace with real merchant wallet from payment link
    recipientAddress: "0x0000000000000000000000000000000000000000" as `0x${string}`,
  };

  const amountInUnits = parseUnits(paymentData.amount, USDC_DECIMALS);

  const { sendTransaction, data: txHash, isPending: isSending, error: sendError } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // Sync wagmi state into step
  useEffect(() => {
    if (isSuccess) setStep("success");
  }, [isSuccess]);

  useEffect(() => {
    if (sendError) {
      setErrorMsg(sendError.message.split("\n")[0]);
      setStep("error");
    }
  }, [sendError]);

  const handleProceed = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (!isConnected) {
      setStep("connecting");
      const connector = connectors[0];
      if (connector) {
        connect(
          { connector, chainId: base.id },
          {
            onSuccess: () => setStep("confirm"),
            onError: (err) => {
              setErrorMsg(err.message.split("\n")[0]);
              setStep("error");
            },
          }
        );
      }
    } else {
      setStep("confirm");
    }
  };

  const handlePay = () => {
    setStep("pending");
    sendTransaction({
      to: USDC_ADDRESS,
      data: encodeFunctionData({
        abi: ERC20_TRANSFER_ABI,
        functionName: "transfer",
        args: [paymentData.recipientAddress, amountInUnits],
      }),
      chainId: base.id,
    });
  };

  return (
    <section className="flex justify-center items-center bg-background min-h-screen px-4">
      <div className="relative w-full max-w-[380px]">
        {/* Stacked card shadow effect */}
        <div className="absolute bottom-2 left-2 w-full h-full z-1 rounded-[24px] bg-[#FFD1BE] border border-[#FFC7AF]" />
        <div className="absolute bottom-4 left-4 w-full h-full rounded-[24px] bg-[#FFDED0] border border-[#FFC7AF] z-0" />

        <div className="relative z-10 flex flex-col items-center gap-7 p-8 rounded-[16px] bg-[#FFF9F8] border border-[#E5E5E5]">
          {/* Header */}
          <div className="flex flex-col items-center gap-2">
            <Image className="w-14 h-14 rounded-xl" src={bitcoinImg} alt={paymentData.merchantName} />
            <h3 className="font-onest text-[14px] font-light text-[#131313]">{paymentData.merchantName}</h3>
            <p className="font-onest text-[12px] font-light text-[#131313] flex items-baseline gap-1">
              <span className="text-primary font-bold text-[26px]">${paymentData.amount}</span>
              <span className="text-[#888]">({paymentData.asset})</span>
            </p>
          </div>

          {/* Step: details */}
          {step === "details" && (
            <form onSubmit={handleProceed} className="space-y-5 w-full">
              <p className="font-onest text-[14px] text-center font-light text-[#555]">
                Almost there! Just a couple of details to complete your payment.
              </p>
              <div>
                <label htmlFor="name" className="block font-light text-[13px] font-onest text-[#131313] mb-1.5">
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter your name"
                  className="w-full p-3 border font-onest border-[#E5E5E5] rounded-[8px] focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder:font-onest text-[14px]"
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-light text-[13px] font-onest text-[#131313] mb-1.5">
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full p-3 border font-onest border-[#E5E5E5] rounded-[8px] focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder:font-onest text-[14px]"
                />
              </div>
              <Button variant="normal" size="normal" type="submit" className="w-full font-onest font-semibold py-3 rounded-xl">
                Connect Wallet &amp; Pay
              </Button>
            </form>
          )}

          {/* Step: connecting */}
          {step === "connecting" && (
            <div className="flex flex-col items-center gap-4 w-full py-4">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="font-onest text-[14px] text-[#555]">Connecting your wallet…</p>
            </div>
          )}

          {/* Step: confirm */}
          {step === "confirm" && (
            <div className="flex flex-col items-center gap-5 w-full">
              <div className="w-full bg-[#FFF3EF] border border-[#FFD1BE] rounded-xl p-4 flex flex-col gap-2">
                <div className="flex justify-between text-[13px] font-onest text-[#555]">
                  <span>Amount</span>
                  <span className="font-semibold text-[#131313]">${paymentData.amount} {paymentData.asset}</span>
                </div>
                <div className="flex justify-between text-[13px] font-onest text-[#555]">
                  <span>Network</span>
                  <span className="font-semibold text-[#131313]">Base</span>
                </div>
                <div className="flex justify-between text-[13px] font-onest text-[#555]">
                  <span>From</span>
                  <span className="font-semibold text-[#131313] truncate max-w-[160px]">
                    {address ? `${address.slice(0, 6)}…${address.slice(-4)}` : "—"}
                  </span>
                </div>
              </div>
              <Button
                variant="normal"
                size="normal"
                onClick={handlePay}
                className="w-full font-onest font-semibold py-3 rounded-xl"
              >
                Confirm &amp; Pay ${paymentData.amount}
              </Button>
              <button
                onClick={() => { disconnect(); setStep("details"); }}
                className="text-[#888] font-onest text-[12px] hover:text-[#555] transition-colors"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Step: pending */}
          {(step === "pending" || isSending || isConfirming) && (
            <div className="flex flex-col items-center gap-4 w-full py-4">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="font-onest text-[14px] text-[#555]">
                {isSending ? "Waiting for wallet approval…" : "Confirming on Base…"}
              </p>
              {txHash && (
                <p className="font-onest text-[11px] text-[#aaa] break-all text-center">
                  Tx: {txHash.slice(0, 10)}…{txHash.slice(-8)}
                </p>
              )}
            </div>
          )}

          {/* Step: success */}
          {step === "success" && (
            <div className="flex flex-col items-center gap-4 w-full py-2">
              <div className="w-14 h-14 rounded-full bg-[#4ade80]/15 flex items-center justify-center">
                <span className="text-[#4ade80] text-[28px]">✓</span>
              </div>
              <div className="text-center">
                <p className="font-onest text-[16px] font-semibold text-[#131313]">Payment sent!</p>
                <p className="font-onest text-[13px] text-[#555] mt-1">
                  ${paymentData.amount} {paymentData.asset} delivered to {paymentData.merchantName}
                </p>
              </div>
              {txHash && (
                <a
                  href={`https://basescan.org/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-onest text-[12px] text-primary underline underline-offset-2"
                >
                  View on Basescan
                </a>
              )}
            </div>
          )}

          {/* Step: error */}
          {step === "error" && (
            <div className="flex flex-col items-center gap-4 w-full py-2">
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-red-400 text-[28px]">✕</span>
              </div>
              <div className="text-center">
                <p className="font-onest text-[15px] font-semibold text-[#131313]">Payment failed</p>
                {errorMsg && (
                  <p className="font-onest text-[12px] text-[#888] mt-1 max-w-[260px]">{errorMsg}</p>
                )}
              </div>
              <Button
                variant="normal"
                size="normal"
                onClick={() => setStep("details")}
                className="w-full font-onest font-semibold py-3 rounded-xl"
              >
                Try again
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Pay;