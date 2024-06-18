import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DeviceVariables = {
  exi_acc: 'some exi_acc',
  LANGUAGE: 'en',
  new_acc: 'some new_acc',
  OTP_ACK_NUMBER: {},
  OTP_SERVICE_NUMBER: 'some OTP_SERVICE_NUMBER',
  passac: 'Account number',
  __env__: 'Development',
};
export const AppVariables = {
  accountno: '',
  'BD CateogryPicker': '',
  category: '',
  connectedLoad: '',
  consumerNo: '',
  consumerScNo: '',
  contractedLoad: '',
  data: '',
  email: '',
  emailValue: '',
  en: {
    OK: 'OK',
    on: 'on',
    FAQ: 'FAQ',
    KWH: 'KWH',
    UPI: 'UPI',
    Date: 'Date',
    Edit: 'Edit',
    Exit: 'Exit',
    Home: 'Home',
    Hour: 'Hour',
    KVAH: 'KVAH',
    MDKW: 'MDKW',
    Name: 'Name',
    View: 'View',
    '7Days': '7Days',
    Chart: 'Chart',
    Close: 'Close',
    Daily: 'Daily',
    Email: 'Email',
    Login: 'Login',
    Print: 'Print',
    Range: 'Range',
    Siwan: 'Siwan',
    Table: 'Table',
    Usage: 'Usage',
    '15Days': '15Days',
    '30Days': '30Days',
    Amount: 'Amount',
    Hourly: 'Hourly',
    Logout: 'Logout',
    Mobile: 'Mobile',
    Office: 'Office',
    Online: 'Online',
    Search: 'Search',
    Submit: 'Submit',
    Address: 'Address',
    Arrears: 'Arrears',
    Billing: 'Billing',
    Current: 'Current',
    Monthly: 'Monthly',
    'Paid on': 'Paid on',
    'Pay Now': 'Pay Now',
    Prepaid: 'Prepaid',
    Remarks: 'Remarks',
    Subject: 'Subject',
    Support: 'Support',
    Voltage: 'Voltage',
    Welcome: 'Welcome',
    'Bill Day': 'Bill Day',
    Category: 'Category',
    Continue: 'Continue',
    Division: 'Division',
    'Due date': 'Due date',
    Feedback: 'Feedback',
    Password: 'Password',
    Payments: 'Payments',
    Postpaid: 'Postpaid',
    Recharge: 'Recharge',
    Register: 'Register',
    Vaishali: 'Vaishali',
    'Bill date': 'Bill date',
    Complaint: 'Complaint',
    Downloads: 'Downloads',
    Gopaiganj: 'Gopaiganj',
    'New Email': 'New Email',
    'Old Email': 'Old Email',
    'Quick Pay': 'Quick Pay',
    'User name': 'User name',
    'View Bill': 'View Bill',
    'Account No': 'Account No',
    'Amount due': 'Amount due',
    'Bill Month': 'Bill Month',
    'Bill month': 'Bill month',
    'Contact Us': 'Contact Us',
    'My Details': 'My Details',
    'Resend OTP': 'Resend OTP',
    Samastipur: 'Samastipur',
    'Units(Kwh)': 'Units(Kwh)',
    'All Tickets': 'All Tickets',
    'Amount paid': 'Amount paid',
    'Bill Amount': 'Bill Amount',
    'Bill number': 'Bill number',
    'Charge List': 'Charge List',
    'Confirm OTP': 'Confirm OTP',
    'Current (A)': 'Current (A)',
    'Daily Usage': 'Daily Usage',
    Description: 'Description',
    'Energy Tips': 'Energy Tips',
    'Range Usage': 'Range Usage',
    'Voltage (V)': 'Voltage (V)',
    'Account type': 'Account type',
    'Back to Home': 'Back to Home',
    'Bill Payment': 'Bill Payment',
    'Bill details': 'Bill details',
    'Hourly Usage': 'Hourly Usage',
    'Load Pattern': 'Load Pattern',
    'Make Payment': 'Make Payment',
    'Meter Number': 'Meter Number',
    'New password': 'New password',
    'Old password': 'Old password',
    'Open Tickets': 'Open Tickets',
    'Payment mode': 'Payment mode',
    'Payment type': 'Payment type',
    'Power Factor': 'Power Factor',
    'Raise Ticket': 'Raise Ticket',
    'Recharge Now': 'Recharge Now',
    'Request Name': 'Request Name',
    'Request Type': 'Request Type',
    'Total Amount': 'Total Amount',
    'Update Email': 'Update Email',
    'Utility Name': 'Utility Name',
    'View Details': 'View Details',
    'View Receipt': 'View Receipt',
    'Enter details': 'Enter details',
    'Invalid email': 'Invalid email',
    'Ledger Amount': 'Ledger Amount',
    'Monthly Usage': 'Monthly Usage',
    Notifications: 'Notifications',
    'Power Quality': 'Power Quality',
    'Rebate amount': 'Rebate amount',
    'Send Feedback': 'Send Feedback',
    'Account Number': 'Account Number',
    'Complaint Type': 'Complaint Type',
    'Confirm Delete': 'Confirm Delete',
    'Load & Quality': 'Load & Quality',
    'Load Reduction': 'Load Reduction',
    'Login with OTP': 'Login with OTP',
    'Manage Account': 'Manage Account',
    'New Connection': 'New Connection',
    'Privacy Policy': 'Privacy Policy',
    'Request Nature': 'Request Nature',
    'Saran (Chapra)': 'Saran (Chapra)',
    'Select To Date': 'Select To Date',
    'Transaction ID': 'Transaction ID',
    'Account Summary': 'Account Summary',
    'Billing History': 'Billing History',
    'Change password': 'Change password',
    'Consumer number': 'Consumer number',
    'Contracted load': 'Contracted load',
    'Current Balance': 'Current Balance',
    'Current Reading': 'Current Reading',
    'Forgot password': 'Forgot password',
    'Last updated on': 'Last updated on',
    'Meter Connected': 'Meter Connected',
    'Otp is required': 'Otp is required',
    'Payment History': 'Payment History',
    'Payment Receipt': 'Payment Receipt',
    'Payment details': 'Payment details',
    'Present Reading': 'Present Reading',
    'Raise Complaint': 'Raise Complaint',
    'Reading Details': 'Reading Details',
    'Recharge Amount': 'Recharge Amount',
    'Select Language': 'Select Language',
    'Select the Date': 'Select the Date',
    'Service Request': 'Service Request',
    "Today's Reading": "Today's Reading",
    'Voltage Reading': 'Voltage Reading',
    'Available Amount': 'Available Amount',
    'Complaint Nature': 'Complaint Nature',
    'Confirm password': 'Confirm password',
    'Forgot password?': 'Forgot password?',
    'Last recharge of': 'Last recharge of',
    'Load Enhancement': 'Load Enhancement',
    'Load and Quality': 'Load and Quality',
    'NSC Registration': 'NSC Registration',
    'Our Service Area': 'Our Service Area',
    'Recharge History': 'Recharge History',
    'Select From Date': 'Select From Date',
    'Update  Password': 'Update  Password',
    'Available balance': 'Available balance',
    'Email is required': 'Email is required',
    'Enter Consumer No': 'Enter Consumer No',
    'New Mobile Number': 'New Mobile Number',
    'Old Mobile Number': 'Old Mobile Number',
    'Sub Category Name': 'Sub Category Name',
    'Amount is required': 'Amount is required',
    'Net payable amount': 'Net payable amount',
    'Add Account Process': 'Add Account Process',
    'Advance Payment Now': 'Advance Payment Now',
    'B Phase Current (A)': 'B Phase Current (A)',
    'B Phase Voltage (V)': 'B Phase Voltage (V)',
    'Check Ticket Status': 'Check Ticket Status',
    'Consumer Mobile App': 'Consumer Mobile App',
    'R Phase Current (A)': 'R Phase Current (A)',
    'R Phase Voltage (V)': 'R Phase Voltage (V)',
    'Ref Registration No': 'Ref Registration No',
    'Subject is required': 'Subject is required',
    'Update Phone Number': 'Update Phone Number',
    'Y Phase Current (A)': 'Y Phase Current (A)',
    'Y Phase Voltage (V)': 'Y Phase Voltage (V)',
    'Average Power Factor': 'Average Power Factor',
    'Parent Category Name': 'Parent Category Name',
    'Password is required': 'Password is required',
    'Recharge successful.': 'Recharge successful.',
    'Registration Process': 'Registration Process',
    'Username is required': 'Username is required',
    'Utility Self Service': 'Utility Self Service',
    'Login to Your Account': 'Login to Your Account',
    'Miscellaneous Payment': 'Miscellaneous Payment',
    'New Email is required': 'New Email is required',
    'Old Email is required': 'Old Email is required',
    'Powered by Fluentgrid': 'Powered by Fluentgrid',
    'Select Payment Method': 'Select Payment Method',
    'Service connection No': 'Service connection No',
    'Add Service Connection': 'Add Service Connection',
    'Current Reading (KVAH)': 'Current Reading (KVAH)',
    'Last Month Consumption': 'Last Month Consumption',
    'New Application Status': 'New Application Status',
    'New Connection Request': 'New Connection Request',
    'Primary Account Number': 'Primary Account Number',
    'Remarks does not exist': 'Remarks does not exist',
    'Account/Consumer number': 'Account/Consumer number',
    'Registration Successful': 'Registration Successful',
    'Show My Present Reading': 'Show My Present Reading',
    'Bihar Vidyut Smart Meter': 'Bihar Vidyut Smart Meter',
    'Bill payment successful.': 'Bill payment successful.',
    'Confirm OTP Raise Ticket': 'Confirm OTP Raise Ticket',
    'Don’t have an account?': 'Don’t have an account?',
    'Enter Service Connection': 'Enter Service Connection',
    'Permanent receipt number': 'Permanent receipt number',
    'View Application Payment': 'View Application Payment',
    'Bill Pay / Quick Recharge': 'Bill Pay / Quick Recharge',
    'Current Month Consumption': 'Current Month Consumption',
    'Delete Service Connection': 'Delete Service Connection',
    'Mobile number is required': 'Mobile number is required',
    'Please enter old password': 'Please enter old password',
    'Service connection number': 'Service connection number',
    'Email Changed Successfully': 'Email Changed Successfully',
    'Advanced payment successful.': 'Advanced payment successful.',
    'Confirm password is required': 'Confirm password is required',
    'Enter 10 digit mobile number': 'Enter 10 digit mobile number',
    'Password Changed Successfully': 'Password Changed Successfully',
    'Incorrect OTP. Please try again': 'Incorrect OTP. Please try again',
    'Enter Miscellaneous Reference No': 'Enter Miscellaneous Reference No',
    'Phone Number Changed Successfully': 'Phone Number Changed Successfully',
    'Please leave your feedback here...': 'Please leave your feedback here...',
    'Account / consumer number is required':
      'Account / consumer number is required',
    'Invalid mobile number(ex: 987XXXX789)':
      'Invalid mobile number(ex: 987XXXX789)',
    'Service connection number is required':
      'Service connection number is required',
    'Please enter service connection number':
      'Please enter service connection number',
    'Select the account number and continue':
      'Select the account number and continue',
    'Old Email And New Email should not be same':
      'Old Email And New Email should not be same',
    'Password and Confirm Password do not match':
      'Password and Confirm Password do not match',
    'Password and Confirm Password did not match':
      'Password and Confirm Password did not match',
    'Utility defined privacy policy to be updated':
      'Utility defined privacy policy to be updated',
    'Old Phone Number and New Phone Number not same':
      'Old Phone Number and New Phone Number not same',
    'Check the OTP sent to your registered phone number':
      'Check the OTP sent to your registered phone number',
    'Check the OTP sent to your registered Email Address':
      'Check the OTP sent to your registered Email Address',
    'Selected/EnteredAccount/SC Number Permanently Closed':
      'Selected/EnteredAccount/SC Number Permanently Closed',
    'Selected/EnteredAccount/SC Number Permanently Disconnected':
      'Selected/EnteredAccount/SC Number Permanently Disconnected',
    'Check the OTP sent to your registered phone number and email address':
      'Check the OTP sent to your registered phone number and email address',
    'Please enter your 12 digits Account No: provided in bill to View/Pay bill':
      'Please enter your 12 digits Account No: provided in bill to View/Pay bill',
    'Please enter your Miscellaneous Reference No: provided in Acknowledgement':
      'Please enter your Miscellaneous Reference No: provided in Acknowledgement',
    'Password must be at least characters one upper case one lower case, one digit, one special character.':
      'Password must be at least characters one upper case one lower case, one digit, one special character.',
    'We are dedicated to serving you with highest quality,most efficient and most reliable power supply in this districts mention below':
      'We are dedicated to serving you with highest quality,most efficient and most reliable power supply in this districts mention below',
    'You can track and view your service requests and switch between your prepaid and post paid Mobile numbers via the Bihar Vidyut smart Meter':
      'You can track and view your service requests and switch between your prepaid and post paid Mobile numbers via the Bihar Vidyut smart Meter',
  },
  ERROR_MESSAGE: '',
  hi: {
    OK: 'ठीक है',
    on: 'पर',
    FAQ: 'सामान्य प्रश्न',
    UPI: 'यूपीआई',
    Date: 'तारीख',
    Edit: 'संपादन करना',
    Exit: 'बाहर निकलें',
    Home: 'मुख्य पृष्ठ',
    Hour: 'घंटा',
    Name: 'नाम',
    View: 'देखें',
    '7Days': '7 दिन',
    Chart: 'चार्ट',
    Close: 'बंद करें',
    Daily: 'दैनिक',
    Email: 'ईमेल',
    Login: 'लॉगिन',
    Print: 'प्रिंट',
    Range: 'श्रेणी',
    Siwan: 'सिवान',
    Table: 'तालिका',
    Usage: 'उपयोग',
    '15Days': '15 दिन',
    '30Days': '30 दिन',
    Amount: 'मात्रा',
    Hourly: 'प्रति घंटा',
    Logout: 'लॉग आउट',
    Mobile: 'मोबाइल',
    Office: 'कार्यालय',
    Online: 'ऑनलाइन',
    Search: 'खोज',
    Submit: 'जमा करें',
    Address: 'पता',
    Arrears: 'बकाया राशि',
    Billing: 'बिलिंग',
    Current: 'करंट',
    Monthly: 'मासिक',
    'Paid on': 'भुगतान की तारीख',
    'Pay Now': 'अभी भुगतान करें',
    Prepaid: 'प्रीपेड',
    Remarks: 'टिप्पणी',
    Subject: 'विषय',
    Support: 'सहायता',
    Voltage: 'वोल्टेज',
    Welcome: 'स्वागत',
    'Bill Day': 'बिल दिन',
    Category: 'श्रेणी',
    Continue: 'जारी रखें',
    Division: 'विभाग',
    'Due date': 'नियत तारीख',
    Feedback: 'प्रतिक्रिया',
    Password: 'पासवर्ड',
    Payments: 'भुगतान',
    Postpaid: 'पोस्टपेड',
    Recharge: 'रिचार्ज करो',
    Register: 'पंजीकरण करें',
    Vaishali: 'वैशाली',
    'Bill date': 'बिल की तिथि',
    Complaint: 'शिकायत',
    Downloads: 'डाउनलोड',
    Gopaiganj: 'गोपीगंज',
    'New Email': 'नया ईमेल',
    'Old Email': 'पुराना ईमेल',
    'Quick Pay': 'त्वरित भुगतान',
    'User name': 'उपयोगकर्ता नाम',
    'View Bill': 'बिल देखें',
    'Account No': 'खाता नंबर',
    'Amount due': 'बकाया राशि',
    'Bill Month': 'बिल महीना',
    'Bill month': 'बिल महीना',
    'Contact Us': 'संपर्क करें',
    'My Details': 'मेरा विवरण',
    'Resend OTP': 'ओटीपी पुनः भेजें',
    Samastipur: 'समस्तीपुर',
    'Units(Kwh)': 'इकाइयाँ (किलोवाट-घंटा)',
    'All Tickets': 'सभी टिकट',
    'Amount paid': 'भुगतान की राशि',
    'Bill Amount': 'बिल राशि',
    'Bill number': 'बिल संख्या',
    'Charge List': 'आरोप सूची',
    'Confirm OTP': 'ओटीपी की पुष्टि करें',
    'Current (A)': 'करंट (A)',
    'Daily Usage': 'दैनिक उपयोग',
    Description: 'विवरण',
    'Energy Tips': 'ऊर्जा युक्तियाँ',
    'Range Usage': 'रेंज उपयोग',
    'Voltage (V)': 'वोल्टेज (V)',
    'Account type': 'खाते का प्रकार',
    'Back to Home': 'मुख्य पृष्ठ पर वापिस',
    'Bill Payment': 'बिल भुगतान',
    'Bill details': 'बिल विवरण',
    'Hourly Usage': 'प्रति घंटा उपयोग',
    'Load Pattern': 'भार पैटर्न',
    'Make Payment': 'भुगतान करें',
    'Meter Number': 'मीटर संख्या',
    'New password': 'नया पासवर्ड',
    'Old password': 'पुराना पासवर्ड',
    'Open Tickets': 'खुले टिकट',
    'Payment mode': 'भुगतान का मोड',
    'Payment type': 'भुगतान का प्रकार',
    'Power Factor': 'पॉवर फॅक्टर',
    'Raise Ticket': 'शिकायत पंजीकरण',
    'Recharge Now': 'अभी रिचार्ज करें',
    'Request Name': 'अनुरोध का नाम',
    'Request Type': 'अनुरोध प्रकार',
    'Total Amount': 'कुल राशि',
    'Update Email': 'ईमेल अपडेट करें',
    'Utility Name': 'यूटिलिटी नाम',
    'View Details': 'विवरण देखें',
    'View Receipt': 'रसीद देखें',
    'Enter details': 'विवरण दर्ज करें',
    'Invalid email': 'अमान्य ईमेल',
    'Ledger Amount': 'लेजर राशि',
    'Monthly Usage': 'मासिक उपयोग',
    Notifications: 'सूचनाएं',
    'Power Quality': 'विद्युत गुणवत्ता',
    'Rebate amount': 'छूट राशि',
    'Send Feedback': 'प्रतिक्रिया भेजें',
    'Account Number': 'खाता संख्या',
    'Complaint Type': 'शिकायत प्रकार',
    'Confirm Delete': 'हटाएं की पुष्टि करें',
    'Load & Quality': 'भार और गुणवत्ता',
    'Load Reduction': 'भार में कमी',
    'Login with OTP': 'ओटीपी से लॉगिन करें',
    'Manage Account': 'खाता प्रबंधित करें',
    'New Connection': 'नया कनेक्शन',
    'Privacy Policy': 'गोपनीयता नीति',
    'Request Nature': 'अनुरोध का प्रकृति',
    'Saran (Chapra)': 'सारण (छपरा)',
    'Select To Date': 'तारीख चुनें',
    'Transaction ID': 'लेनदेन आईडी',
    'Account Summary': 'खाता सारांश',
    'Billing History': 'बिलिंग इतिहास',
    'Change password': 'पासवर्ड बदलें',
    'Consumer number': 'उपभोक्ता संख्या',
    'Contracted load': 'अनुबंधित भार',
    'Current Balance': 'वर्तमान शेष',
    'Current Reading': 'वर्तमान रीडिंग',
    'Forgot password': 'पासवर्ड भूल गए',
    'Last updated on': 'अंतिम बार अद्यतन किया गया',
    'Meter Connected': 'मीटर कनेक्टेड',
    'Otp is required': 'ओटीपी आवश्यक है',
    'Payment History': 'भुगतान इतिहास',
    'Payment Receipt': 'भुगतान रसीद',
    'Payment details': 'भुगतान का विवरण',
    'Present Reading': 'वर्तमान पाठ',
    'Raise Complaint': 'शिकायत दर्ज करें',
    'Reading Details': 'पढ़ने का विवरण',
    'Recharge Amount': 'रिचार्ज राशि',
    'Select Language': 'भाषा चुने',
    'Select the Date': 'दिनांक चुनें',
    'Service Request': 'सेवा अनुरोध',
    "Today's Reading": 'आज की रीडिंग',
    'Voltage Reading': 'वोल्टेज रीडिंग',
    'Available Amount': 'उपलब्ध राशि',
    'Complaint Nature': 'सभी टिकट',
    'Confirm password': 'पासवर्ड की पुष्टि करें',
    'Forgot password?': 'पासवर्ड भूल गए?',
    'Last recharge of': 'का अंतिम रिचार्ज',
    'Load Enhancement': 'भार वृद्धि',
    'Load and Quality': 'भार और गुणवत्ता',
    'NSC Registration': 'एनएससी पंजीकरण',
    'Our Service Area': 'हमारा सेवा क्षेत्र',
    'Recharge History': 'रिचार्ज इतिहास',
    'Select From Date': 'दिनांक से चयन करें',
    'Update  Password': 'पासवर्ड अपडेट करें',
    'Available balance': 'उपलब्ध शेष राशि',
    'Email is required': 'ईमेल आवश्यक है',
    'Enter Consumer No': 'उपभोक्ता संख्या दर्ज करें',
    'New Mobile Number': 'नया मोबाइल नंबर',
    'Old Mobile Number': 'पुराना मोबाइल नंबर',
    'Sub Category Name': 'उप श्रेणी का नाम',
    'Amount is required': 'राशि आवश्यक है',
    'Net payable amount': 'शुद्ध देय राशि',
    'Add Account Process': 'खाता प्रक्रिया जोड़ें',
    'Advance Payment Now': 'अग्रिम भुगतान अब',
    'B Phase Current (A)': 'B फेज करंट (A)',
    'B Phase Voltage (V)': 'B फेज वोल्टेज (V)',
    'Check Ticket Status': 'टिकट की स्थिति जांचें',
    'Consumer Mobile App': 'उपभोक्ता मोबाइल ऐप',
    'R Phase Current (A)': 'R फेज करंट (A)',
    'R Phase Voltage (V)': 'R फेज वोल्टेज (V)',
    'Ref Registration No': 'संदर्भ पंजीकरण संख्या',
    'Subject is required': 'विषय आवश्यक है',
    'Update Phone Number': 'फ़ोन नंबर अपडेट करें',
    'Y Phase Current (A)': 'Y फेज करंट (A)',
    'Y Phase Voltage (V)': 'Y फेज वोल्टेज (V)',
    'Average Power Factor': 'औसत पावर फैक्टर',
    'Parent Category Name': 'मूल श्रेणी का नाम',
    'Password is required': 'पासवर्ड की आवश्यकता है',
    'Recharge successful.': 'रिचार्ज सफल.',
    'Registration Process': 'पंजीकरण प्रक्रिया',
    'Username is required': 'उपयोगकर्ता नाम आवश्यक है',
    'Utility Self Service': 'यूटिलिटी स्व-सेवा',
    'Login to Your Account': 'अपने अकाउंट में लॉग इन करें',
    'Miscellaneous Payment': 'विविध भुगतान',
    'New Email is required': 'नया ईमेल आवश्यक है',
    'Old Email is required': 'पुराना ईमेल आवश्यक है',
    'Powered by Fluentgrid': 'Fluentgrid द्वारा संचालित',
    'Select Payment Method': 'भुगतान का तरीका चुनें',
    'Service connection No': 'सेवा कनेक्शन नं',
    'Add Service Connection': 'सेवा कनेक्शन जोड़ें',
    'Current Reading (KVAH)': 'वर्तमान पाठ (केवीएएच)',
    'Last Month Consumption': 'पिछले महीने की खपत',
    'New Application Status': 'नई आवेदन स्थिति',
    'New Connection Request': 'नया कनेक्शन अनुरोध',
    'Primary Account Number': 'प्राथमिक खाता नंबर',
    'Remarks does not exist': 'टिप्पणियाँ मौजूद नहीं हैं',
    'Account/Consumer number': 'खाता/उपभोक्ता संख्या',
    'Registration Successful': 'पंजीकरण सफल',
    'Show My Present Reading': 'मेरा वर्तमान पाठ दिखाएं',
    'Bihar Vidyut Smart Meter': 'बिहार विद्युत स्मार्ट मीटर',
    'Bill payment successful.': 'बिल भुगतान सफल.',
    'Confirm OTP Raise Ticket': 'ओटीपी की पुष्टि करें टिकट खोलें',
    'Don’t have an account?': 'कोई खाता नहीं है?',
    'Enter Service Connection': 'सेवा कनेक्शन दर्ज करें',
    'Permanent receipt number': 'स्थायी रसीद क्रमांक',
    'View Application Payment': 'आवेदन भुगतान देखें',
    'Bill Pay / Quick Recharge': 'बिल भुगतान/त्वरित रिचार्ज',
    'Current Month Consumption': 'चालू माह की खपत',
    'Delete Service Connection': 'सेवा कनेक्शन हटाएं',
    'Mobile number is required': 'मोबाइल नंबर आवश्यक है',
    'Please enter old password': 'कृपया पुराना पासवर्ड दर्ज करें',
    'Service connection number': 'सेवा कनेक्शन संख्या',
    'Email Changed Successfully': 'ईमेल सफलतापूर्वक बदला गया',
    'Advanced payment successful.': 'अग्रिम भुगतान सफल.',
    'Confirm password is required': 'पुष्टि पासवर्ड आवश्यक है',
    'Enter 10 digit mobile number': '10 अंकीय मोबाइल नंबर दर्ज करें',
    'Password Changed Successfully': 'पासवर्ड सफलतापूर्वक बदला गया',
    'Incorrect OTP. Please try again': 'ग़लत ओटीपी. कृपया पुन: प्रयास करें',
    'Enter Miscellaneous Reference No': 'संदर्भ संख्या दर्ज करें',
    'Phone Number Changed Successfully': 'फ़ोन नंबर सफलतापूर्वक बदला गया',
    'Please leave your feedback here...':
      'कृपया अपनी प्रतिक्रिया यहां छोड़ें...',
    'Account / consumer number is required': 'खाता/उपभोक्ता संख्या आवश्यक है',
    'Invalid mobile number(ex: 987XXXX789)':
      'अमान्य मोबाइल नंबर (उदा: 987XXXX789)',
    'Service connection number is required': 'सेवा कनेक्शन संख्या आवश्यक है',
    'Please enter service connection number':
      'कृपया सेवा कनेक्शन नंबर दर्ज करें',
    'Select the account number and continue': 'खाता नंबर चुनें और जारी रखें',
    'Old Email And New Email should not be same':
      'पुराना ईमेल और नया ईमेल एक समान नहीं होना चाहिए',
    'Password and Confirm Password do not match':
      'पासवर्ड और कन्फर्म पासवर्ड मेल नहीं खाते',
    'Password and Confirm Password did not match':
      'पासवर्ड और पुष्टि पासवर्ड मेल नहीं खा रहे',
    'Utility defined privacy policy to be updated':
      'यूटिलिटी परिभाषित गोपनीयता नीति को अद्यतन किया जाएगा',
    'Old Phone Number and New Phone Number not same':
      'पुराना फ़ोन नंबर और नया फ़ोन नंबर समान नहीं है',
    'Check the OTP sent to your registered phone number':
      'अपने पंजीकृत फोन नंबर पर भेजे गए ओटीपी की जांच करें',
    'Check the OTP sent to your registered Email Address':
      'अपने पंजीकृत ईमेल पते पर भेजे गए ओटीपी की जांच करें',
    'Selected/EnteredAccount/SC Number Permanently Closed':
      'चयनित/प्रविष्ट खाता/एससी नंबर स्थायी रूप से बंद',
    'Selected/EnteredAccount/SC Number Permanently Disconnected':
      'चयनित/प्रविष्ट खाता/एससी नंबर स्थायी रूप से डिस्कनेक्ट हो गया',
    'Check the OTP sent to your registered phone number and email address':
      'अपने पंजीकृत फोन नंबर और ईमेल पते पर भेजे गए ओटीपी की जांच करें',
    'Please enter your 12 digits Account No: provided in bill to View/Pay bill':
      'कृपया बिल देखने/भुगतान करने के लिए बिल में दिया गया अपना 12 अंकों का खाता नंबर दर्ज करें',
    'Please enter your Miscellaneous Reference No: provided in Acknowledgement':
      'कृपया पावती में दिया गया अपना संदर्भ नंबर दर्ज करें',
    'Password must be at least characters one upper case one lower case, one digit, one special character.':
      'पासवर्ड में कम से कम एक अपरकेस, एक लोअरकेस, एक अंक, और एक विशेष अक्षर होना चाहिए।',
    'We are dedicated to serving you with highest quality,most efficient and most reliable power supply in this districts mention below':
      'हम आपको नीचे उल्लिखित जिलों में उच्चतम गुणवत्ता, सबसे कुशल और सबसे विश्वसनीय बिजली आपूर्ति प्रदान करने के लिए समर्पित हैं',
    'You can track and view your service requests and switch between your prepaid and post paid Mobile numbers via the Bihar Vidyut smart Meter':
      'आप बिहार विद्युत स्मार्ट मीटर के माध्यम से अपने सेवा अनुरोधों को ट्रैक और देख सकते हैं और अपने प्रीपेड और पोस्ट पेड मोबाइल नंबरों के बीच स्विच कर सकते हैं',
  },
  loadType: '',
  ma: {
    OK: 'ठीक आहे',
    on: 'चालू',
    FAQ: 'वारंवार विचारले जाणारे प्रश्न',
    UPI: 'UPI',
    Date: 'तारीख',
    Edit: 'संपादन करा',
    Exit: 'बाहेर पडा',
    Home: 'मुख्यपृष्ठ',
    Hour: 'तास',
    Name: 'नाव',
    View: 'पहा',
    '7Days': '७ दिवस',
    Chart: 'तक्ता',
    Close: 'बंद करा',
    Daily: 'दैनिक',
    Email: 'ईमेल',
    Login: 'लॉगिन',
    Print: 'छापा',
    Range: 'श्रेणी',
    Siwan: 'सिवान',
    Table: 'टेबल',
    Usage: 'वापर',
    '15Days': '१५ दिवस',
    '30Days': '30 दिवस',
    Amount: 'रक्कम',
    Hourly: 'प्रति तास',
    Logout: 'लॉगआऊट',
    Mobile: 'मोबाईल',
    Office: 'कार्यालय',
    Online: 'ऑनलाईन',
    Search: 'शोधा',
    Submit: 'सबमिट करा',
    Address: 'पत्ता',
    Arrears: 'थकबाकी',
    Billing: 'बिलिंग',
    Current: 'करंट',
    Monthly: 'मासिक',
    'Paid on': 'या तारखेला पैसे भरले',
    'Pay Now': 'रक्कम भरा',
    Prepaid: 'प्रीपेड',
    Remarks: 'शेरा',
    Subject: 'विषय',
    Support: 'मदत',
    Voltage: 'व्होल्टेज',
    Welcome: 'स्वागत आहे',
    'Bill Day': 'देयक तयार होण्याचा दिवस',
    Category: 'वर्ग',
    Continue: 'सुरू ठेवा',
    Division: 'विभाग',
    'Due date': 'देय तारीख',
    Feedback: 'अभिप्राय',
    Password: 'पासवर्ड',
    Payments: 'देयके',
    Postpaid: 'पोस्टपेड',
    Recharge: 'रिचार्ज करा',
    Register: 'नोंदणी करा',
    Vaishali: 'वैशाली',
    'Bill date': 'देयक तारीख',
    Complaint: 'तक्रार',
    Downloads: 'डाउनलोड्स',
    Gopaiganj: 'गोपाईगंज',
    'New Email': 'नवीन ई - मेल',
    'Old Email': 'जुना ईमेल',
    'Quick Pay': 'त्वरीत पैसे भरा',
    'User name': 'वापरकर्ता नाव',
    'View Bill': 'देयक पहा',
    'Account No': 'खाते क्रमांक',
    'Amount due': 'देय रक्कम',
    'Bill Month': 'खात्याचा प्रकार',
    'Bill month': 'देयक महिना',
    'Contact Us': 'आमच्याशी संपर्क साधा',
    'My Details': 'माझे तपशील',
    'Resend OTP': 'OTP पुन्हा पाठवा',
    Samastipur: 'समस्तीपूर',
    'Units(Kwh)': 'युनिट्स(Kwh)',
    'All Tickets': 'सर्व तक्रारी',
    'Amount paid': 'दिलेली रक्कम',
    'Bill Amount': 'देयकाची रक्कम',
    'Bill number': 'देयक क्रमांक',
    'Charge List': 'शुल्क सूची',
    'Confirm OTP': 'OTP ची पुष्टी करा',
    'Current (A)': 'करंट (A)',
    'Daily Usage': 'दैनंदिन वापर',
    Description: 'वर्णन',
    'Energy Tips': 'ऊर्जा वापरसंदर्भात टिप्स',
    'Range Usage': 'श्रेणी वापर',
    'Voltage (V)': 'वोल्टेज (V)',
    'Account type': 'खात्याचा प्रकार',
    'Back to Home': 'मुख्य पानावर परत',
    'Bill Payment': 'देयक रक्कम भरा',
    'Bill details': 'देयक तपशील',
    'Hourly Usage': 'प्रति तास वापर',
    'Load Pattern': 'विद्युतभाराचा आकृतीबंध',
    'Make Payment': 'पेमेंट करा',
    'Meter Number': 'मीटर क्रमांक',
    'New password': 'नवीन पासवर्ड',
    'Old password': 'जुना पासवर्ड',
    'Open Tickets': 'तक्रार बघा',
    'Payment mode': 'पेमेंटचा प्रकार',
    'Payment type': 'पैसे भरण्याची पध्दत',
    'Power Factor': 'पॉवर फॅक्टर',
    'Raise Ticket': 'तक्रार नोंदणी',
    'Recharge Now': 'आता रिचार्ज करा',
    'Request Name': 'विनंतीचे नाव',
    'Request Type': 'विनंती प्रकार',
    'Total Amount': 'एकूण रक्कम',
    'Update Email': 'ईमेल अपडेट करा',
    'Utility Name': 'यूटिलिटी नाव',
    'View Details': 'तपशील पहा',
    'View Receipt': 'पावती पहा',
    'Enter details': 'तपशील टाका',
    'Invalid email': 'अवैध ईमेल',
    'Ledger Amount': 'लेजर रक्कम',
    'Monthly Usage': 'मासिक वापर',
    Notifications: 'अधिसूचना',
    'Power Quality': 'विद्युतभाराची गुणवत्ता',
    'Rebate amount': 'सूट रक्कम',
    'Send Feedback': 'अभिप्राय पाठवा',
    'Account Number': 'खाते क्रमांक',
    'Complaint Type': 'तक्रारीचा प्रकार',
    'Confirm Delete': 'हटविण्याची पुष्टी करा',
    'Load & Quality': 'भार आणि गुणवत्ता',
    'Load Reduction': 'भार कमी करण्यासाठी',
    'Login with OTP': 'OTP ने लॉगिन करा',
    'Manage Account': 'खात्याचे व्यवस्थापन करा',
    'New Connection': 'नवीन जोडणी',
    'Privacy Policy': 'गोपनीयता धोरण',
    'Request Nature': 'विनंतीचे स्वरूप',
    'Saran (Chapra)': 'सारण (छापरा)',
    'Select To Date': 'टू डेट निवडा',
    'Transaction ID': 'व्यवहार नोंदणी क्रमांक',
    'Account Summary': 'खाते सारांश',
    'Billing History': 'देयकाचा इतिहास',
    'Change password': 'पासवर्ड बदला',
    'Consumer number': 'ग्राहक क्रमांक',
    'Contracted load': 'करारबद्ध भार',
    'Current Balance': 'चालू शिल्लक',
    'Current Reading': 'सध्याची रीडिंग',
    'Forgot password': 'पासवर्ड विसरला',
    'Last updated on': 'शेवटचे अद्यतन केले',
    'Meter Connected': 'मीटर जोडले',
    'Otp is required': 'OTP आवश्यक आहे',
    'Payment History': 'रक्कम भरल्याचा इतिहास',
    'Payment Receipt': 'पैसे भरल्याची पावती',
    'Payment details': 'देयक तपशील',
    'Present Reading': 'वर्तमान वाचन',
    'Raise Complaint': 'तक्रार नोंदवा',
    'Reading Details': 'वाचन तपशील',
    'Recharge Amount': 'रिचार्ज रक्कम',
    'Select Language': 'भाषा निवडा',
    'Select the Date': 'तारीख निवडा',
    'Service Request': 'सेवा विनंती',
    "Today's Reading": 'आजची रीडिंग',
    'Voltage Reading': 'व्होल्टेज रीडिंग',
    'Available Amount': 'उपलब्ध रक्कम',
    'Complaint Nature': 'तक्रारीचे स्वरूप',
    'Confirm password': 'पासवर्डची पुष्टी करा',
    'Forgot password?': 'पासवर्ड विसरलात का?',
    'Last recharge of': 'चे शेवटचे रिचार्ज',
    'Load Enhancement': 'भार वाढवण्यासाठी',
    'Load and Quality': 'भार आणि गुणवत्ता',
    'NSC Registration': 'नवीन जोडणीसाठी नोंदणी',
    'Our Service Area': 'आमचे सेवा क्षेत्र',
    'Recharge History': 'रिचार्ज इतिहास',
    'Select From Date': 'तारीख पासून निवडा',
    'Update  Password': 'पासवर्ड अपडेट करा',
    'Available balance': 'उपलब्ध शिल्लक',
    'Email is required': 'ईमेल आवश्यक आहे',
    'Enter Consumer No': 'ग्राहक क्रमांक प्रविष्ट करा',
    'New Mobile Number': 'नवीन मोबाईल नंबर',
    'Old Mobile Number': 'जुना मोबाईल नंबर',
    'Sub Category Name': 'उपवर्गाचे नाव',
    'Amount is required': 'रक्कम आवश्यक आहे',
    'Net payable amount': 'निव्वळ देय रक्कम',
    'Add Account Process': 'खाते वर्तवणुक जोडा',
    'Advance Payment Now': 'आता आगाऊ रक्कम भरा',
    'B Phase Current (A)': 'B फेज करंट (A)',
    'B Phase Voltage (V)': 'B फेज वोल्टेज (V)',
    'Check Ticket Status': 'तक्रारीची स्थिती तपासा',
    'Consumer Mobile App': 'ग्राहक मोबाइल अॅप',
    'R Phase Current (A)': 'R फेज करंट (A)',
    'R Phase Voltage (V)': 'R फेज वोल्टेज (V)',
    'Ref Registration No': 'संदर्भ नोंदणी क्र',
    'Subject is required': 'विषय आवश्यक आहे',
    'Update Phone Number': 'फोन नंबर अपडेट करा',
    'Y Phase Current (A)': 'Y फेज करंट (A)',
    'Y Phase Voltage (V)': 'Y फेज वोल्टेज (V)',
    'Average Power Factor': 'सरासरी शक्ति अंक',
    'Parent Category Name': 'मुळ वर्गाचे नाव',
    'Password is required': 'पासवर्ड आवश्यक आहे',
    'Recharge successful.': 'रिचार्ज यशस्वी.',
    'Registration Process': 'नोंदणी प्रक्रिया',
    'Username is required': 'वापरकर्ताचे नाव आवश्यक आहे',
    'Utility Self Service': 'यूटिलिटी स्व-सेवा',
    'Login to Your Account': 'आपल्या खात्यात लॉगिन करा',
    'Miscellaneous Payment': 'इतर रक्कम',
    'New Email is required': 'नवीन ईमेल आवश्यक आहे',
    'Old Email is required': 'जुना ईमेल आवश्यक आहे',
    'Powered by Fluentgrid': 'Fluentgrid द्वारा संचालित',
    'Select Payment Method': 'पेमेंट पद्धत निवडा',
    'Service connection No': 'जोडणी क्रमांक',
    'Add Service Connection': 'जोडणीचा अंतर्भाव करा',
    'Current Reading (KVAH)': 'वर्तमान वाचन (केव्हीएएच)',
    'Last Month Consumption': 'मागील महिन्याचा वापर',
    'New Application Status': 'नवीन अर्जाची स्थिती',
    'New Connection Request': 'नवीन जोडणी विनंती',
    'Primary Account Number': 'प्राथमिक खाते क्रमांक',
    'Remarks does not exist': 'टिप्पणी अस्तित्वात नाही',
    'Account/Consumer number': 'खाते/ग्राहक क्रमांक',
    'Registration Successful': 'नोंदणी यशस्वी',
    'Show My Present Reading': 'माझे वर्तमान वाचन दर्शवा',
    'Bill payment successful.': 'बिल भरण्याचा प्रयत्न सफल झाला.',
    'Confirm OTP Raise Ticket': 'ओटीपीची पुष्टी करा तक्रार नोंदवा',
    'Don’t have an account?': 'खाते नाही?',
    'Enter Service Connection': 'जोडणी क्रमांक टाका',
    'Permanent receipt number': 'कायमस्वरूपी पावती क्रमांक',
    'View Application Payment': 'अर्जासाठी लागणारी रक्कम पहा',
    'Bill Pay / Quick Recharge': 'बिल पे / क्विक रिचार्ज',
    'Current Month Consumption': 'चालू महिन्याचा वापर',
    'Delete Service Connection': 'जोडणी काढून टाका',
    'Mobile number is required': 'मोबाइल नंबर आवश्यक आहे',
    'Please enter old password': 'कृपया जुना पासवर्ड टाका',
    'Service connection number': 'जोडणी क्रमांक',
    'Email Changed Successfully': 'ईमेल यशस्वीरित्या बदलला',
    'Advanced payment successful.': 'आगाऊ रक्कम जमा झाली',
    'Confirm password is required': 'पासवर्ड पुष्टी आवश्यक आहे',
    'Enter 10 digit mobile number': '10 अंकीय मोबाइल नंबर प्रविष्ट करा',
    'Password Changed Successfully': 'पासवर्ड यशस्वीरित्या बदलला',
    'Incorrect OTP. Please try again': 'चुकीचा OTP. कृपया पुन्हा प्रयत्न करा',
    'Enter Miscellaneous Reference No': 'संदर्भ क्रमांक प्रविष्ट करा',
    'Phone Number Changed Successfully': 'फोन नंबर यशस्वीरित्या बदलला',
    'Please leave your feedback here...': 'कृपया तुमचा अभिप्राय इथे कळवा...',
    'Account / consumer number is required': 'खाते / ग्राहक क्रमांक आवश्यक आहे',
    'Invalid mobile number(ex: 987XXXX789)':
      'अवैध मोबाइल नंबर (उदा: 987XXXX789)',
    'Service connection number is required': 'जोडणी क्रमांक आवश्यक आहे',
    'Please enter service connection number':
      'कृपया जोडणी क्रमांक प्रविष्ट करा',
    'Select the account number and continue':
      'खाते क्रमांक निवडा आणि सुरू ठेवाs',
    'Old Email And New Email should not be same':
      'जुना ईमेल आणि नवीन ईमेल एकसारखे असू नये',
    'Password and Confirm Password do not match':
      'पासवर्ड आणि कन्फर्म पासवर्ड जुळत नाहीत',
    'Password and Confirm Password did not match':
      'पासवर्ड आणि कन्फर्म पासवर्ड जुळत नाहीत',
    'Utility defined privacy policy to be updated':
      'गोपनीयता धोरण अद्ययावत केले जाईल',
    'Old Phone Number and New Phone Number not same':
      'जुना फोन नंबर आणि नवीन फोन नंबर सारखा नाही',
    'Check the OTP sent to your registered phone number':
      'आपल्या नोंदणीकृत फोन नंबरवर पाठवलेला OTP तपासा',
    'Check the OTP sent to your registered Email Address':
      'तुमच्या नोंदणीकृत ईमेल पत्त्यावर पाठवलेला OTP तपासा',
    'Selected/EnteredAccount/SC Number Permanently Closed':
      'निवडलेला / प्रविष्ट केलेला खाते / एससी नंबर कायमचे बंद केले गेले आहे',
    'Selected/EnteredAccount/SC Number Permanently Disconnected':
      'निवडलेले/टाकलेले खाते क्रमांक/जोडणी क्रमांक कायमचे बंद केले',
    'Check the OTP sent to your registered phone number and email address':
      'तुमच्या नोंदणीकृत फोन नंबर आणि ईमेल पत्त्यावर पाठवलेला OTP तपासा',
    'Please enter your 12 digits Account No: provided in bill to View/Pay bill':
      'देयक पाहण्यासाठी / रक्कम भरण्यासाठी कृपया तुमचा 12 अंकी खाते क्रमांक प्रविष्ट करा.',
    'Please enter your Miscellaneous Reference No: provided in Acknowledgement':
      'कृपया पोचपावतीमध्ये दिलेला तुमचा संदर्भ क्रमांक प्रविष्ट करा.',
    'Password must be at least characters one upper case one lower case, one digit, one special character.':
      'पासवर्डमध्ये किमान अक्षर, एक अपरकेस, एक लोअरकेस, एक अंक, एक विशेष अक्षर असणे आवश्यक आहे।',
    'We are dedicated to serving you with highest quality,most efficient and most reliable power supply in this districts mention below':
      'आम्ही तुम्हाला या जिल्ह्यांमध्ये उच्च दर्जाचा, सर्वात कार्यक्षम आणि सर्वात विश्वासार्ह वीजपुरवठा देण्यासाठी समर्पित आहोत',
    'You can track and view your service requests and switch between your prepaid and post paid Mobile numbers via the Bihar Vidyut smart Meter':
      'तुम्ही तुमच्या सेवा विनंत्यांचा मागोवा घेऊ शकता आणि पाहू शकता आणि बिहार विद्युत स्मार्ट मीटरद्वारे तुमच्या प्रीपेड आणि पोस्ट पेड मोबाइल नंबरमध्ये स्विच करू शकता',
  },
  manageaccount_picker: '',
  mobileNumber: '',
  name: '',
  password1: '',
  payemntfinalurl: '',
  phonenumbercon: '',
  picker_option1: '',
  picker_option2: '',
  serviceconnectionNoMan: '',
  serviceConNo: '',
  serviceno: '',
  sub_category: '',
  sub_category2: '',
  uploadpic: '',
  userId: '',
  Viewbilldetailsjson: '',
};
const GlobalVariableContext = React.createContext();
const GlobalVariableUpdater = React.createContext();
const keySuffix = '';

// Attempt to parse a string as JSON. If the parse fails, return the string as-is.
// This is necessary to account for variables which are already present in local
// storage, but were not stored in JSON syntax (e.g. 'hello' instead of '"hello"').
function tryParseJson(str) {
  try {
    return JSON.parse(str);
  } catch {
    return str;
  }
}

class GlobalVariable {
  /**
   *  Filters an object of key-value pairs for those that should be
   *  persisted to storage, and persists them.
   *
   *  @param values Record<string, string>
   */
  static async syncToLocalStorage(values) {
    const update = Object.entries(values)
      .filter(([key]) => key in DeviceVariables)
      .map(([key, value]) => [key + keySuffix, JSON.stringify(value)]);

    if (update.length > 0) {
      await AsyncStorage.multiSet(update);
    }

    return update;
  }

  static async loadLocalStorage() {
    const keys = Object.keys(DeviceVariables);
    const entries = await AsyncStorage.multiGet(
      keySuffix ? keys.map(k => k + keySuffix) : keys
    );

    // If values isn't set, use the default. These will be written back to
    // storage on the next render.
    const withDefaults = entries.map(([key_, value]) => {
      // Keys only have the suffix appended in storage; strip the key
      // after they are retrieved
      const key = keySuffix ? key_.replace(keySuffix, '') : key_;
      return [key, value ? tryParseJson(value) : DeviceVariables[key]];
    });

    return Object.fromEntries(withDefaults);
  }
}

class State {
  static defaultValues = {
    ...AppVariables,
    ...DeviceVariables,
  };

  static reducer(state, { type, payload }) {
    switch (type) {
      case 'RESET':
        return { values: State.defaultValues, __loaded: true };
      case 'LOAD_FROM_ASYNC_STORAGE':
        return { values: { ...state.values, ...payload }, __loaded: true };
      case 'UPDATE':
        return state.__loaded
          ? {
              ...state,
              values: {
                ...state.values,
                [payload.key]: payload.value,
              },
            }
          : state;
      default:
        return state;
    }
  }

  static initialState = {
    __loaded: false,
    values: State.defaultValues,
  };
}

export function GlobalVariableProvider({ children }) {
  const [state, dispatch] = React.useReducer(State.reducer, State.initialState);

  React.useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
  }, []);

  // This effect runs on mount to overwrite the default value of any
  // key that has a local value.
  React.useEffect(() => {
    async function initialStorageLoader() {
      try {
        const payload = await GlobalVariable.loadLocalStorage();
        if (
          payload?.__env__ &&
          DeviceVariables.__env__ &&
          payload.__env__ !== DeviceVariables.__env__
        ) {
          console.log(
            `Publication Environment changed from ${payload.__env__} to ${DeviceVariables.__env__}. Refreshing variables`
          );
          dispatch({
            type: 'LOAD_FROM_ASYNC_STORAGE',
            payload: DeviceVariables,
          });
        } else {
          dispatch({ type: 'LOAD_FROM_ASYNC_STORAGE', payload });
        }
      } catch (err) {
        console.error(err);
      }
    }
    initialStorageLoader();
  }, []);

  // This effect runs on every state update after the initial load. Gives us
  // best of both worlds: React state updates sync, but current state made
  // durable next async tick.
  React.useEffect(() => {
    async function syncToAsyncStorage() {
      try {
        await GlobalVariable.syncToLocalStorage(state.values);
      } catch (err) {
        console.error(err);
      }
    }
    if (state.__loaded) {
      syncToAsyncStorage();
    }
  }, [state]);

  const onLayoutRootView = React.useCallback(async () => {
    if (state.__loaded) {
      await SplashScreen.hideAsync();
    }
  }, [state.__loaded]);

  // We won't want an app to read a default state when there might be one
  // incoming from storage.
  if (!state.__loaded) {
    return null;
  }

  return (
    <GlobalVariableUpdater.Provider
      value={dispatch}
      onLayout={onLayoutRootView}
    >
      <GlobalVariableContext.Provider value={state.values}>
        {children}
      </GlobalVariableContext.Provider>
    </GlobalVariableUpdater.Provider>
  );
}

// Hooks
export function useSetValue() {
  const dispatch = React.useContext(GlobalVariableUpdater);
  return ({ key, value }) => {
    dispatch({ type: 'UPDATE', payload: { key, value } });
    return value;
  };
}

export function useValues() {
  return React.useContext(GlobalVariableContext);
}
