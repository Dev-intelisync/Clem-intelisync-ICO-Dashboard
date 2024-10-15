import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import HomeLayout from "./layouts/HomeLayout";
import LoginLayout from "./layouts/LoginLayout";

export const routes = [
  // {
  //   exact: true,
  //   path: "/",
  //   component: lazy(() => import("./views/auth/Main")),
  // },
  {
    exact: true,
    path: "/",
    layout: LoginLayout,
    component: lazy(() => import("./views/auth/LogIn")),
  },
  {
    exact: true,
    path: "/signup",
    layout: LoginLayout,
    component: lazy(() => import("./views/auth/signup/signup")),
  },

  {
    exact: true,
    path: "/dashboard",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("./views/pages/Dashboard")),
  },
  {
    exact: true,
    path: "/welcome",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("./views/pages/Welcome")),
  },
  {
    exact: true,
    path: "/edit-profile",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("./views/pages/Editprofile/index")),
  },

  {
    exact: true,
    path: "/roadmap",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("./views/auth/Main/Roadmap")),
  },
  {
    exact: true,
    path: "/contactUsForm",
    // guard:true,
    // layout: HomeLayout,
    component: lazy(() => import("./views/auth/Main/ContactUs")),
  },
  {
    exact: true,
    path: "/feedback",
    // guard:true,
    // layout: HomeLayout,
    component: lazy(() => import("./views/auth/Main/FeedBack")),
  },
  // {
  //   exact: true,
  //   path: "/payment-gateway",
  //   // guard:true,
  //   layout: DashboardLayout,
  //   component: lazy(() => import("./views/pages/PaymentGateWay/index")),
  // },
  // {
  //   exact: true,
  //   path: "/trade",
  //   // guard:true,
  //   layout: DashboardLayout,
  //   component: lazy(() => import("./views/pages/Trade/")),
  // },
  {
    exact: true,
    path: "/bank-details",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("./views/pages/BankDetails")),
  },
  {
    exact: true,
    path: "/my-wallet",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("./views/pages/Dashboard/index")),
  },
  {
    exact: true,
    path: "/transaction-history",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("./views/pages/TransactionHistory/")),
  },
  {
    exact: true,
    path: "/login-history",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("./views/pages/LoginHistory/")),
  },
  {
    exact: true,
    path: "/refferal-points",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("./views/pages/RefferalPoints")),
  },
  {
    exact: true,
    path: "/my-wallet/approve",
    // guard:true,
    // layout: DashboardLayout,
    component: lazy(() => import("./views/pages/MyWallet/Approve")),
  },
  {
    exact: true,
    path: "/dashboard/approve",

    component: lazy(() => import("./views/pages/MyWallet/Approve")),
  },
  {
    exact: true,
    path: "/token/approve",
    component: lazy(() => import("./views/pages/MyWallet/Approve")),
  },
  {
    exact: true,
    path: "/notifications",
    layout: DashboardLayout,
    component: lazy(() => import("./views/pages/notifications/index")),
  },
  {
    exact: true,
    path: "/notification-detail",
    layout: DashboardLayout,
    component: lazy(() =>
      import("./views/pages/notifications/NotificationDetails")
    ),
  },
  {
    exact: true,
    path: "/faq",
    component: lazy(() => import("./views/pages/faq/index")),
  },
  {
    exact: true,
    path: "/faqs",
    // layout: HomeLayout,
    component: lazy(() => import("./views/pages/FaqsMain")),
  },
  {
    exact: true,
    path: "/Fauth",
    layout: DashboardLayout,
    component: lazy(() => import("./views/pages/2FA/index")),
  },
  {
    exact: true,
    path: "/add-kyc",
    layout: DashboardLayout,
    component: lazy(() => import("./views/pages/KYC")),
  },
  {
    exact: true,
    path: "/kyc",
    layout: DashboardLayout,
    component: lazy(() => import("./views/pages/KYC/KycList")),
  },
  {
    exact: true,
    path: "/white-paper",
    layout: DashboardLayout,
    component: lazy(() => import("./views/pages/White Paper/WhitePaper")),
  },
  {
    exact:true,
    path:"/airdrop",
    layout:DashboardLayout,
    component:lazy(() => import("./views/pages/AirDropModule/index"))
  },
  {
    exact: true,
    path: "/token",
    layout: DashboardLayout,
    component: lazy(() => import("./views/pages/Token/")),
  },
  {
    exact: true,
    path: "/p2p",
    layout: DashboardLayout,
    component: lazy(() => import("./views/pages/P2Psection/")),
  },
  {
    exact: true,
    path: "/viewstake",
    layout: DashboardLayout,
    component: lazy(() => import("./views/pages/P2Psection/ViewStake")),
  },
  {
    exact: true,
    path: "/postyouradd",
    layout: DashboardLayout,
    component: lazy(() => import("./views/pages/P2Psection/Postyouradd")),
  },
  {
    exact: true,
    path: "/Addpost",
    layout: DashboardLayout,
    component: lazy(() => import("./views/pages/P2Psection/SteperAdvertise")),
  },
  {
    exact: true,
    path: "/sell",
    layout: DashboardLayout,
    component: lazy(() => import("./views/pages/P2Psection/BuySection")),
  },
  {
    exact: true,
    path: "/sellbnb",
    layout: DashboardLayout,
    component: lazy(() => import("./views/pages/P2Psection/SellBNBAccount")),
  },
  {
    exact: true,
    path: "/buyUSDT",
    layout: DashboardLayout,
    component: lazy(() => import("./views/pages/P2Psection/BuyUSDTAccount")),
  },
  {
    exact: true,
    path: "/banking",
    layout: DashboardLayout,
    component: lazy(() => import("./views/pages/Banking/index")),
  },
  {
    exact: true,
    path: "/orderComplete",
    layout: DashboardLayout,
    component: lazy(() => import("./views/pages/P2Psection/OrderComleted")),
  },
  {
    exact: true,
    path: "/viewbank",
    layout: DashboardLayout,
    component: lazy(() =>
      import("./views/pages/Banking/LeftTab/ViewBankList")
    ),
  },
  {
    exact: true,
    path: "/upiList",
    layout: DashboardLayout,
    component: lazy(() =>
      import("./views/pages/Banking/LeftTab/UpiDataList")
    ),
  },
  {
    exact: true,
    path: "/buy",
    layout: DashboardLayout,
    component: lazy(() => import("./views/pages/P2Psection/BuyFlow")),
  },
  {
    exact: true,
    path: "/editAdds",
    layout: DashboardLayout,
    component: lazy(() => import("./views/pages/P2Psection/EditAdds")),
  },
  // {
  //   exact: true,
  //   path: "/Allorderdata",
  //   layout: DashboardLayout,
  //   component: lazy(() => import("./views/pages/P2Psection/AllOrder&Adds")),
  // },
  {
    exact: true,
    path: "/orderCancel",
    layout: DashboardLayout,
    component: lazy(() => import("./views/pages/P2Psection/OrderCancel")),
  },

  // {
  //   exact: true,
  //   path: "/Buytoken",
  //   layout: DashboardLayout,
  //   component: lazy(() => import("./views/pages/Token/BuyToken/BuyToken")),
  // },
  {
    exact: true,
    path: "/terms",
    // layout: HomeLayout,
    component: lazy(() => import("./views/pages/termsmain")),
  },
  {
    exact: true,
    path: "/aboutus",
    // layout: HomeLayout,
    component: lazy(() => import("./views/pages/AboutUsmain")),
  },
  {
    exact: true,
    path: "/privacy-policy",
    // layout: DashboardLayout,
    component: lazy(() => import("./views/pages/privacymain")),
  },
  {
    exact: true,
    path: "/staking-main",
    // layout: DashboardLayout,
    component: lazy(() => import("./views/pages/Stakingmain")),
  },
  {
    exact: true,
    path: "/About-Us",
    // layout: DashboardLayout,
    component: lazy(() => import("./views/auth/Main/Virtual")),
  },
  {
    exact: true,
    path: "/disclaimer",
    // layout: DashboardLayout,
    component: lazy(() => import("./views/pages/DisclaimerMain")),
  },
  {
    exact: true,
    path: "/user-info",

    layout: DashboardLayout,
    component: lazy(() => import("./views/pages/user-info/index")),
  },
  {
    exact: true,
    path: "/forget-password",

    layout: LoginLayout,
    component: lazy(() => import("./views/auth/forget-password/index")),
  },
  {
    exact: true,
    path: "/instrauctions",

    component: lazy(() => import("./views/auth/forget-password-link/index")),
  },
  {
    exact: true,
    path: "/verify-otp",

    layout: LoginLayout,
    component: lazy(() =>
      import("./views/auth/forget-password-link/OtpVerify")
    ),
  },
  {
    exact: true,
    path: "/verify-email-otp",

    layout: LoginLayout,
    component: lazy(() => import("./views/auth/signup/VerifyEmailOtp")),
  },
  {
    exact: true,
    path: "/reset-password",

    layout: LoginLayout,
    component: lazy(() => import("./views/auth/reset-password/index")),
  },

  {
    exact: true,
    path: "/buy",
    component: lazy(() => import("./views/pages/Trade/Buy/")),
  },
  {
    exact: true,
    path: "/changePassword",
    layout: DashboardLayout,
    component: lazy(() => import("./views/pages/Change Password/Index")),
  },
  {
    exact: true,
    path: "/security",
    layout: DashboardLayout,
    component: lazy(() => import("./views/pages/Security/Index")),
  },
  {
    exact: true,
    path: "/referral",
    layout: DashboardLayout,
    component: lazy(() => import("./views/pages/Referal/Index")),
  },
  {
    exact: true,
    path: "/stakeCrypto",
    layout: DashboardLayout,
    component: lazy(() => import("./views/pages/Stake Crypto/Index")),
  },
  {
    exact: true,
    path: "/echangeCrypto",
    layout: DashboardLayout,
    component: lazy(() => import("./views/pages/Crypto Exchange/index")),
  },
  {
    exact: true,
    path: "/sell",
    component: lazy(() => import("./views/pages/Trade/Sell/")),
  },
  {
    exact: true,
    path: "/contact-us",

    layout: LoginLayout,
    component: lazy(() => import("./views/pages/ContactUs")),
  },
  {
    exact: true,
    path: "/news-letter",

    layout: DashboardLayout,

    component: lazy(() => import("./views/pages/NewsLetter")),
  },
  {
    exact: true,
    path: "/view-kyc",

    layout: DashboardLayout,

    component: lazy(() => import("./views/pages/KYC/KycView")),
  },

  {
    exact: true,
    path: "/404",
    component: lazy(() => import("./views/errors/NotFound")),
  },
  {
    component: () => <Redirect to="/404" />,
  },
];
