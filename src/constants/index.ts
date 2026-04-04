import React from "react";
import { Get, Receive, Track, Type, assetIcon, avatarIcon } from "../assets/icons";
import {
  BuyandSell,
  faceCoin,
  Ligthening,
  QRCode,
  Stack,
  Payment1,
  Get1,
} from "../assets/images";
import { NavLink, TransactionDetailsProps } from "@/types";



// export interface SSDItems {
//   label: string;
//   icon: string;
//   text: string;
//   deg: number;
//   className?: string;
//   id: number
// }

// export interface Normal {
//   label: string;
//   icon: string;
//   text: string;
//   id?: number
// }

// export interface Transaction {
//   id: string;
//   amount: string;
//   date: string;
//   description: string;
//   liquidity: string;
// }

// export interface topTItems {
//   id: number;
//   label: string;
// }
// export interface testimonialsItems {
//   text: string;
//   name: string;
//   avatar: string;
// }


export const navLinks: NavLink[] = [
  { label: "Pay", link: "" },
  { label: "Features", link: "features" },
  { label: "Blog", link: "blog" },
];

export const TransactionDetails: TransactionDetailsProps[] = [
  { id: "txn-001", label: "Faiza", asseticon: assetIcon, amount: 251, net: 250, asset: "USDC", date: "18 Sep 2025", chain: "Solana", status: "completed", linkId: "link-001" },
  { id: "txn-002", label: "Sam", asseticon: assetIcon, amount: 57.50, net: 56, asset: "USDT", date: "18 Sep 2025", chain: "Ethereum", status: "completed", linkId: "link-001" },
  { id: "txn-003", label: "Tolu", asseticon: assetIcon, amount: 41.50, net: 40, asset: "USDT", date: "18 Sep 2025", chain: "Polygon", status: "pending", linkId: "link-002" },
  { id: "txn-004", label: "John Doe", asseticon: assetIcon, amount: 1500, net: 1480, asset: "USDC", date: "17 Sep 2025", chain: "Solana", status: "completed", linkId: "link-003" },
  { id: "txn-005", label: "Alice", asseticon: assetIcon, amount: 12.50, net: 12, asset: "USDC", date: "17 Sep 2025", chain: "Base", status: "failed", linkId: "link-004" },
  { id: "txn-006", label: "Bob Smith", asseticon: assetIcon, amount: 300, net: 298, asset: "SOL", date: "17 Sep 2025", chain: "Solana", status: "completed", linkId: "link-005" },
  { id: "txn-007", label: "Charlie", asseticon: assetIcon, amount: 89.99, net: 88, asset: "USDT", date: "16 Sep 2025", chain: "Ethereum", status: "pending", linkId: "link-006" },
  { id: "txn-008", label: "Diana", asseticon: assetIcon, amount: 450, net: 445, asset: "USDC", date: "16 Sep 2025", chain: "Polygon", status: "completed", linkId: "link-001" },
  { id: "txn-009", label: "Eve", asseticon: assetIcon, amount: 25.00, net: 24.5, asset: "SOL", date: "15 Sep 2025", chain: "Solana", status: "completed", linkId: "link-002" },
  { id: "txn-010", label: "Frank", asseticon: assetIcon, amount: 1200, net: 1190, asset: "USDT", date: "15 Sep 2025", chain: "Ethereum", status: "failed", linkId: "link-003" },
  { id: "txn-011", label: "Grace", asseticon: assetIcon, amount: 75.25, net: 74, asset: "USDC", date: "14 Sep 2025", chain: "Base", status: "completed", linkId: "link-004" },
  { id: "txn-012", label: "Hank", asseticon: assetIcon, amount: 10, net: 9.5, asset: "SOL", date: "14 Sep 2025", chain: "Solana", status: "completed", linkId: "link-005" },
  { id: "txn-013", label: "Ivy", asseticon: assetIcon, amount: 500, net: 495, asset: "USDC", date: "13 Sep 2025", chain: "Ethereum", status: "pending", linkId: "link-006" },
  { id: "txn-014", label: "Jack", asseticon: assetIcon, amount: 33.33, net: 32, asset: "USDT", date: "13 Sep 2025", chain: "Polygon", status: "completed", linkId: "link-001" },
  { id: "txn-015", label: "Karen", asseticon: assetIcon, amount: 800, net: 790, asset: "USDC", date: "12 Sep 2025", chain: "Solana", status: "completed", linkId: "link-002" },
  { id: "txn-016", label: "Leo", asseticon: assetIcon, amount: 55, net: 54, asset: "SOL", date: "12 Sep 2025", chain: "Solana", status: "failed", linkId: "link-003" },
  { id: "txn-017", label: "Mia", asseticon: assetIcon, amount: 125.75, net: 124, asset: "USDT", date: "11 Sep 2025", chain: "Base", status: "completed", linkId: "link-004" },
  { id: "txn-018", label: "Noah", asseticon: assetIcon, amount: 950, net: 940, asset: "USDC", date: "11 Sep 2025", chain: "Ethereum", status: "completed", linkId: "link-005" },
  { id: "txn-019", label: "Olivia", asseticon: assetIcon, amount: 42, net: 41.5, asset: "SOL", date: "10 Sep 2025", chain: "Solana", status: "pending", linkId: "link-006" },
  { id: "txn-020", label: "Paul", asseticon: assetIcon, amount: 210, net: 205, asset: "USDT", date: "10 Sep 2025", chain: "Polygon", status: "completed", linkId: "link-001" },
];

export const PaymentLinksDetails: import("@/types").LinkDetailsProps[] = [
  { id: "link-001", title: "Freelance Design Assets", amount: 150, asset: "USDC", status: "active", payments: 12, revenue: 1800, date: "12 Oct 2025" },
  { id: "link-002", title: "Consultation Call", amount: 50, asset: "USDT", status: "active", payments: 34, revenue: 1700, date: "10 Oct 2025" },
  { id: "link-003", title: "E-book: Web3 Basics", amount: 15, asset: "SOL", status: "active", payments: 128, revenue: 1920, date: "05 Oct 2025" },
  { id: "link-004", title: "Monthly Subscription", amount: 20, asset: "USDC", status: "inactive", payments: 45, revenue: 900, date: "28 Sep 2025" },
  { id: "link-005", title: "Conference Ticket", amount: 299, asset: "USDT", status: "active", payments: 8, revenue: 2392, date: "15 Sep 2025" },
  { id: "link-006", title: "Donation Fund", amount: 0, asset: "SOL", status: "active", payments: 56, revenue: 450, date: "01 Sep 2025" },
];

// export const SSD: SSDItems[] = [
//   {
//     label: "Type",
//     icon: Type,
//     text: "Open your Telegram and send a simple command to Obverse, like: generate $50 USDC payment link",
//     deg: 3,
//     id: 1

//   },
//   {
//     label: "Get",
//     icon: Get,
//     text: "Within seconds, you’ll receive a payment link and a QR code generated specifically for that request.",
//     deg: 2,
//     id: 2
//   },
//   {
//     label: "Receive",
//     icon: Receive,
//     text: "Once your customer completes the payment, the funds are delivered directly to your non-custodial wallet, like Phantom on Solana.",
//     deg: -2,
//     id: 3
//   },
//   {
//     label: "Track",
//     icon: Track,
//     text: "Once your customer completes the payment, the funds are delivered directly to your non-custodial wallet, like Phantom on Solana.",
//     deg: -3,
//     id: 4
//   },
// ];

// export const WhatMakes1: Normal[] = [
//   {
//     label: "Buy & Sell Instantly",
//     text: "Trade assets with ease. Whether it’s tokens, , or digital goods, buying and selling is seamless and lightning-fast.",
//     icon: BuyandSell,
//     id: 1
//   },
//   {
//     label: "Scan & Go with QR Code",
//     text: "Send and receive funds or access features instantly with smart QR code integration—no long addresses, just tap and go.",
//     icon: QRCode,
//     id: 2
//   },
// ];
// export const WhatMakes2: Normal[] = [
//   {
//     label: "Crowd Fund with Your Community",
//     text: "Launch, manage, or support crowdfunding campaigns with full transparency and smart contract protection.",
//     icon: faceCoin,
//     id: 1
//   },
//   {
//     label: "Track Everything in Real-Time",
//     text: "Keep an eye on your portfolio, transactions, and campaigns with live updates and clean dashboards.",
//     icon: Ligthening,
//     id: 2
//   },
//   {
//     label: "Seamless Integration",
//     text: "Plug-and-play for websites, SaaS platforms, or social storefronts",
//     icon: Stack,
//     id: 3
//   },
// ];

// export const PaymentAppItesm: Normal[] = [
//   {
//     label: "A Payment App Built for the Platforms You Already Use",
//     text: "Obverse doesn’t require customers to understand blockchain. It wraps powerful DeFi tools in a friendly social interface that works on",
//     icon: Payment1,
//   },
//   {
//     label: "A Payment App Built for the Platforms You Already Use",
//     text: "Obverse doesn’t require customers to understand blockchain. It wraps powerful DeFi tools in a friendly social interface that works on",
//     icon: Get1,
//   },
// ];

// export const transactions: Transaction[] = [
//   {
//     id: "Zxx2d7xyPfg1h...",
//     amount: "$2,045",
//     date: "14/05/2024",
//     description: "4D2E34F34DF34DF34DF23F3...",
//     liquidity: "$13.2",
//   },
//   {
//     id: "Zxx2d7xyPfg1h...",
//     amount: "$2,045",
//     date: "14/05/2024",
//     description: "4D2E34F34DF34DF34DF23F3...",
//     liquidity: "$13.2",
//   },
//   {
//     id: "Zxx2d7xyPfg1h...",
//     amount: "$2,045",
//     date: "14/05/2024",
//     description: "4D2E34F34DF34DF34DF23F3...",
//     liquidity: "$13.2",
//   },
//   {
//     id: "Zxx2d7xyPfg1h...",
//     amount: "$2,045",
//     date: "14/05/2024",
//     description: "4D2E34F34DF34DF34DF23F3...",
//     liquidity: "$13.2",
//   },
//   {
//     id: "Zxx2d7xyPfg1h...",
//     amount: "$2,045",
//     date: "14/05/2024",
//     description: "4D2E34F34DF34DF34DF23F3...",
//     liquidity: "$13.2",
//   },
// ];

// export const topT: topTItems[] = [
//   { id: 1, label: "4h" },
//   { id: 2, label: "1m" },
//   { id: 3, label: "1h" },
//   { id: 4, label: "4h" },
// ];

// export const topT2: topTItems[] = [
//   { id: 1, label: "Transcation ID" },
//   { id: 2, label: "Amount" },
//   { id: 3, label: "Date" },
//   { id: 4, label: "Description" },
//   { id: 5, label: "Liquidity" },
// ];




// export const testimonials: testimonialsItems[] = [
//         {
//             text: "I started with just one bundle of DeCharge Mini, mostly out of curiosity. We installed them near a college campus where there’s always EV traffic.",
//             name: "Cornel Isakiss",
//             avatar: avatarIcon
//         },
//         {
//             text: "It’s an amazing experience with reliable EV charging support everywhere.",
//             name: "Cornel Isakiss",
//             avatar: avatarIcon,
//         },
//         {
//             text: "Our sales increased by 40% after installing DeCharge stations.",
//             name: "Cornel Isakiss",
//             avatar: avatarIcon,
//         },
//         {
//             text: "The best EV charging solution we’ve ever tried!",
//             name: "Cornel Isakiss",
//             avatar: avatarIcon,
//         },
//         {
//             text: "Compact, reliable, and easy to use. Perfect for city locations.",
//             name: "Cornel Isakiss",
//             avatar: avatarIcon,
//         },
//     ];
