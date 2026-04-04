"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { toast } from "sonner";
import { QrCode, Link as LinkIcon, RotateCcw } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ScanPage() {
    const [scanResult, setScanResult] = useState<string | null>(null);
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);

    useEffect(() => {
        // Initialize HTML5 QR Code Scanner
        const scanner = new Html5QrcodeScanner(
            "reader",
            {
                fps: 10,
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1,
                showTorchButtonIfSupported: true
            },
            /* verbose= */ false
        );
        scannerRef.current = scanner;

        scanner.render(
            (decodedText) => {
                setScanResult(decodedText);
                toast.success("QR Code successfully spotted!");
            },
            (error) => {
                // Ignore general scanning errors naturally outputted per frame
            }
        );

        return () => {
            scanner.clear().catch(error => {
                console.error("Failed to clear html5QrcodeScanner. ", error);
            });
        };
    }, []);

    const resetScan = () => {
        setScanResult(null);
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col w-full pt-6 min-h-[75vh]"
        >
            <div className="flex items-center gap-3 mb-8">
                <QrCode className="w-5 h-5 text-[#e8ddd8]" strokeWidth={1.5} />
                <h2 className="text-[#e8ddd8] text-[20px] font-onest font-semibold">QR Scanner</h2>
            </div>

            <div className="w-full max-w-sm mx-auto bg-[#0a0a0a] border border-[#1e1e1e] rounded-[32px] p-2 sm:p-4 overflow-hidden shadow-2xl relative">
                <style dangerouslySetInnerHTML={{
                    __html: `
                    #reader__scan_region { background: #0a0a0a !important; border-radius: 24px; overflow: hidden; }
                    #reader__scan_region img { opacity: 0.3 !important; }
                    #reader__dashboard_section_csr button { background: #e8ddd8 !important; color: #0a0a0a !important; border-radius: 8px !important; border: none !important; padding: 6px 12px; font-weight: 500;}
                    #reader { border: none !important; width: 100% !important; }
                    #reader__dashboard_section_swaplink { display: none !important; }
                    #reader video { border-radius: 24px; object-fit: cover !important; }
                `}} />

                <div className={`${scanResult ? 'hidden' : 'block'}`}>
                    <div id="reader" className="w-full rounded-3xl overflow-hidden bg-black/50 aspect-square"></div>
                </div>

                {scanResult && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center p-6 text-center gap-4 bg-[#141414] rounded-3xl min-h-[300px]"
                    >
                        <div className="w-16 h-16 rounded-full bg-[#4ade80]/10 text-[#4ade80] flex items-center justify-center mb-2 shadow-[0_0_30px_rgb(74,222,128,0.2)]">
                            <QrCode className="w-8 h-8" />
                        </div>
                        <h3 className="text-[#e8ddd8] font-onest font-semibold text-lg">Scan Successful</h3>
                        <div className="w-full bg-[#0a0a0a] border border-[#1e1e1e] p-3 rounded-xl flex items-center justify-between">
                            <p className="text-[#4ade80] font-mono text-[12px] truncate max-w-[80%]">{scanResult}</p>
                            <button onClick={() => { navigator.clipboard.writeText(scanResult); toast.success("Copied"); }} className="text-[#666] hover:text-[#e8ddd8]">
                                <LinkIcon className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex gap-3 w-full mt-2">
                            <a
                                href={scanResult.startsWith("http") ? scanResult : "#"}
                                target="_blank"
                                rel="noreferrer"
                                className={`flex-1 px-4 py-2.5 bg-[#4ade80] text-[#0a0a0a] font-onest text-sm rounded-xl font-medium transition-all ${!scanResult.startsWith("http") && "opacity-50 pointer-events-none"}`}
                            >
                                Open Link
                            </a>
                            <button
                                className="px-4 py-2.5 bg-[#0a0a0a] border border-[#1e1e1e] hover:border-[#333] text-[#e8ddd8] font-onest text-sm rounded-xl transition-all"
                                onClick={resetScan}
                            >
                                <RotateCcw className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
            <p className="text-center font-onest text-[#666] text-xs mt-6 px-10">Point your camera at a compatible Obverse Payment Link or standard Web3 QR Code.</p>
        </motion.section>
    );
}
