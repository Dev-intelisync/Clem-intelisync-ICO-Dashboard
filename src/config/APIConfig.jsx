// local vishnu
// export const socketNotification = "ws://http://172.16.1.132:1952";
// const url = "http://172.16.1.132:1952/api/v1";
// export const baseUrl = "http://172.16.1.132:1952";

// local subhra
// export const socketNotification = "ws://http://172.16.1.172:1952";
// const url = "http://172.16.1.172:1952/api/v1";
// export const baseUrl = "http://172.16.1.172:1952";

// stagging
// const url = "https://node-digitalbank.mobiloitte.com/api/v1";
// export const socketNotification = "ws://node-digitalbank.mobiloitte.com";
// export const baseUrl = "https://node-digitalbank.mobiloitte.com";

// Live
// const url = "http://192.168.0.103:3027/api/v1";
const url = "http://localhost:1952/api/v1"
export const socketNotification = "ws://node.vdbcoin.com/";
export const baseUrl = "https://node.vdbcoin.com";

const user = `${url}/user`;
const wallet = `${url}/wallet`;
const static1 = `${url}/static`;
const admin = `${url}/admin`;
const notification = `${url}/notification`;
const p2pSubscription = `${url}/p2pAdvertisement`;
const paymentMethod = `${url}/payment`;
const contactUsForm = `${url}/contactUs`;
const chat = `${url}/chat`;
const faqs = `${url}/faq`;
const cmc = `${url}/cmc`;
const notificationAll = `${url}/listNotification`;
const appel = `${url}/appeal`;
const ApiConfig = {
  writeUserReferralPoints:  `${url}/payment/buy`,
  userRefferalData: `${url}/user/viewReffredData`,
  userLogin: `${user}/login`,
  SettlementStatusListTable: `${user}/SettlementStatusList`,
  getCoinList: `${url}/wallet/coin/get-coin-list`,
  userSignUp: `${user}/signup`,
  verifyOTP: `${user}/verifyOTP`,
  resendOTP: `${user}/resendOTP`,
  forgotPassword: `${user}/forgotPassword`, ///verify-sms-code-mobile-app
  // forgotPassword: `${user}/forget-password/mobiloitApp`, ///verify-sms-code-mobile-app
  verifyOTPSMS: `${user}/verify-sms-code-mobile-app`, //verify-sms-code-mobile-app
  resetPassword: `${user}/resetPassword`,
  editKYC: `${user}/editKYC`,
  // editUserProfile: `${user}/profile-update`,
  getCountryList: `${user}/get-country-list`,
  getTransactionHistory: `${url}/wallet/wallet/get-all-transaction-history`,
  // transactionHistoyList: `${user}/transactionList`,
  addSubscribe: `${user}/add-subscribe`,
  // account
  myAccount: `${user}/profile`,
  saveKycDetails: `${user}/addKYC`,
  uploadFile: `${user}/uploadImage`,
  getKycList: `${user}/viewKyc`,
  editUserProfile: `${user}/editProfile`,
  cmcData: `${cmc}/cmc`,
  userRefferalDashboard: `${user}/userRefferalDashboard`,
  // wallet
  wallateGenerator: `${user}/wallateGenerator`,
  myWallet: `${user}/listMyWallet`,
  getVirtualDinero: `${user}/getrehnanceValue`,
  // static
  contactUS: `${contactUsForm}/contactUs`,
  addFeedback: `${contactUsForm}/addFeedback`,
  postnewsLetter: `${static1}/post-news-letter-to-user`,
  StaticData: `${static1}/static`,
  faqList: `${faqs}/faq`,
  subscribeToNewsLetter: `${user}/subscribeToNewsLetter`,
  term: `${static1}/get-static-page-data-by-page-key`,
  Aboutus: `${static1}/get-all-static-content-data`,
  policy: `${static1}/get-all-static-content-details-for-web`,
  // policy: `${static1}/get-static-page-data-by-page-key?pageKey=Privacy_Policy`,
  getCurrentprice: `${wallet}/wallet/get-price?`,
  toaddress: `${wallet}/wallet/get-all-coin-with-wallet-address`,
  myAddress: `${user}/viewMyWallet`,
  approveWithdraw: `${user}/sendMoney`,
  cancelMoney: `${user}/cancelMoney`,
  deposits: `${user}/receiveMoney`,
  buyToken: `${wallet}/basic-exchange/buy-token`,
  buyTokenBtc: `${wallet}/wallet/buy-token`,
  minimumfee: `${wallet}/wallet/coin/get-coin-list`,

  // admin /wallet/coin/get-coin-list
  transactionHistoy: `${wallet}/get-all-transaction-history`,

  // notification
  getNotification: `${notification}/get-notification-data`,
  // <<<<<<< HEAD
  clearNotification: `${notification}/clear-notification`,
  sendNotificationForP2pExchange: `${notification}/send-notification-for-p2p-exchange`,
  getChatData: `${notification}/get-chat-data`,
  // getChatData: `${notification}/get-chating-data`,
  // =======
  // deleteNotification: `${notification}/delete-notification`,
  // >>>>>>> b005bf469e4657fca4930aa3cff6eeb9be4bf5f3

  // account
  activeStake: `${wallet}/get-list-by-active-status`,

  walletBalance: `${wallet}/wallet/get-all-user-balance-and-coinlist `,

  viewfixedDeposit: `${wallet}/view-fixed-deposit-code`,
  unstake: `${wallet}/set-status-staking-stop`,

  userTransactionHistoy: `${wallet}/get-user-transaction-history`,

  //p2p-exchange
  addAdvertisment: `${p2pSubscription}/p2pAdvertisement`,

  searchAdvertiseFilter: `${p2pSubscription}/search-and-filters-advertisement`,

  p2pAdvertisementList: `${p2pSubscription}/p2pAdvertisement`,
  p2pBlockunblock: `${p2pSubscription}/p2pAdvertisement`,
  DeleteAdvertisement: `${p2pSubscription}/p2pAdvertisement`,
  TradeAdvertisement: `${p2pSubscription}/p2pAdvertisementTrades`,

  showInterestP2PAdvertisement: `${p2pSubscription}/showInterestP2PAdvertisement`,

  getDetailsAfterPressBuyButton: `${p2pSubscription}/get-details-after-press-buy-button`,
  getDetailsAfterPressSellButton: `${p2pSubscription}/get-details-after-press-sell-button`,
  sendMessageAfterCancelTradeButton: `${p2pSubscription}/send-message-after-cancel-trade-button`,
  sendTradeRequest: `${p2pSubscription}/send-trade-request`,
  sendMessageAfterPaidButton: `${p2pSubscription}/send-message-after-paid-button`,
  getCompletedTradeList: `${p2pSubscription}/get-completed-trade-list`,
  viewP2pByUserId: `${p2pSubscription}/view-p2p-by-user-id`,
  searchAndFiltersTradeList: `${p2pSubscription}/search-and-filters-trade-list`,
  searchAndFiltersAdvertisement: `${p2pSubscription}/search-and-filters-advertisement`,
  // DeleteAdvertisement: `${p2pSubscription}/Delete-advertisement`,
  afterPressDisputeButton: `${p2pSubscription}/after-press-dispute-button`,
  confirmP2PAdvertisementPayment: `${p2pSubscription}/confirmP2PAdvertisementPayment`,
  confirmP2PAdvertisementMoneyPaid: `${p2pSubscription}/confirmP2PAdvertisementMoneyPaid`,
  p2pAdvertisementOrders: `${p2pSubscription}/p2pAdvertisementOrders`,

  // change-password

  changepassword: `${user}/changePassword`,
  // bank-controller
  listBank: `${user}/listBank`,
  addBank: `${user}/addBank`,
  deleteBank: `${user}/deleteBank`,
  viewBank: `${user}/viewBank`,

  // verification-otp

  googleauth: `${user}/addAuthentication`,

  verifygooglecode: `${user}/verifyTwoAuthentication`,
  twoFadisbaled: `${user}/googleAuthenticationDisable`,

  enableDisableEmailMobileNumberAuth: `${user}/enableDisableEmailMobileNumberAuth`,

  // socket

  // staking
  earnstake: `${wallet}/get-Earnd-details`,
  earnstakeAmount: `${wallet}/get-Earnd-Stake-Amount-details`,
  addStake: `${user}/addStake`,
  // viewfixedDeposit: `${user}/listStake`,
  emergencyWithdraw: `${user}/stakeRequest`,
  stakeInterestList: `${admin}/stakeInterestList`,
  stakeDashboard: `${user}/stakeDashboard`,

  // send money and recieve money
  sendMoney: `${user}/sendMoneyEmail`,
  receiveMoney: `${user}/receiveMoney`,

  // Notification List

  listNotificationAll: `${notification}/listNotification`,
  readNotification: `${notification}/readNotification`,

  deleteNotificationList: `${notification}/notification`,

  //Payment method

  payment: `${paymentMethod}/payment`,
  // chating
  chatList: `${chat}/chatList`,
  chat: `${chat}/chat/`,
  // appeal
  appel: `${appel}/appeal`,
  appelList: `${appel}/appeal`,
  appelDelete: `${appel}/appeal`,

  payWithCrypto: `${user}/payWithCrypto`,

  // swapping
  transferCoinChangely: `${user}/transferCoinChangely`,
  loginHistory:`${admin}/logHistoryByUser`,
  userRefferalList:`${user}/userRefferalList`

};

export default ApiConfig;
