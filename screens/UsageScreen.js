import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as CISAPPApi from '../apis/CISAPPApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as CustomCode from '../custom-files/CustomCode';
import * as PrepaidMonthlyUsage from '../custom-files/PrepaidMonthlyUsage';
import * as Usage from '../custom-files/Usage';
import * as prepaidDailyUsage from '../custom-files/prepaidDailyUsage';
import * as prepaidHourlyUsage from '../custom-files/prepaidHourlyUsage';
import * as prepaidRangeUsage from '../custom-files/prepaidRangeUsage';
import transalate from '../global-functions/transalate';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Checkbox,
  Circle,
  CircleImage,
  DatePicker,
  Icon,
  Picker,
  ScreenContainer,
  SimpleStyleFlatList,
  Surface,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import * as WebBrowser from 'expo-web-browser';
import { FlatList, Image, ScrollView, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const UsageScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [ShowNav, setShowNav] = React.useState(false);
  const [availableBalance, setAvailableBalance] = React.useState('');
  const [billingHistoryScreen, setBillingHistoryScreen] = React.useState({});
  const [currentYear, setCurrentYear] = React.useState('');
  const [datePicker2Value, setDatePicker2Value] = React.useState(new Date());
  const [datePickerValue, setDatePickerValue] = React.useState(new Date());
  const [datePickerValue2, setDatePickerValue2] = React.useState(new Date());
  const [datePickerValue3, setDatePickerValue3] = React.useState(new Date());
  const [datesplit, setDatesplit] = React.useState('');
  const [finalFormate, setFinalFormate] = React.useState('');
  const [finalformate1, setFinalformate1] = React.useState('');
  const [finalformate2, setFinalformate2] = React.useState('');
  const [hiddenHindi, setHiddenHindi] = React.useState(true);
  const [mainselectedTab, setMainselectedTab] = React.useState('Prepaid Daily');
  const [meterNumber, setMeterNumber] = React.useState('');
  const [pickerValue, setPickerValue] = React.useState('');
  const [pickerValue2, setPickerValue2] = React.useState('');
  const [prepaidBillingHistory, setPrepaidBillingHistory] = React.useState({});
  const [prepaidDailyConsumption, setPrepaidDailyConsumption] = React.useState(
    {}
  );
  const [prepaidFlag, setPrepaidFlag] = React.useState('');
  const [prepaidHourlyConsumption, setPrepaidHourlyConsumption] =
    React.useState({});
  const [prepaidRangeConsumption, setPrepaidRangeConsumption] = React.useState(
    {}
  );
  const [selectedTab, setSelectedTab] = React.useState('Dashboard');
  const [selectedTab2, setSelectedTab2] = React.useState('prepaidchart');
  const [selecteddailyTab, setSelecteddailyTab] =
    React.useState('prepaiddailychart');
  const [selectedhourlyTab, setSelectedhourlyTab] =
    React.useState('prepaidhourlychart');
  const [selectedrangeTab, setSelectedrangeTab] =
    React.useState('prepaidrangechart');
  const [serviceConNumber, setServiceConNumber] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');
  const [visibleHindi, setVisibleHindi] = React.useState(false);
  const [year, setYear] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const buildConsumerString = Scno => {
    console.log(`billing/rest/AccountInfo/${Scno}`);
    return `billing/rest/AccountInfo/${Scno}`;
  };

  const convertMonthNoToMonthName = monthNo => {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const monthName = monthNames[monthNo - 1];
    console.log(monthName);
    return monthName;
  };

  const manageAccountFun = ManageAccountDetails => {
    return ManageAccountDetails.map(team => {
      return { label: team.new_added_account, value: team.new_added_account };
    });
  };

  const buildBillingString = Scno => {
    console.log(`billing/rest/getBillDataService/${Scno}`);
    return `billing/rest/getBillDataService/${Scno}`;
  };

  const prepaidBillingString = meterNo => {
    console.log(
      `/SPM/getAllSpmMonthlyBillDetailsTByAccountNoOrMeterNumber?accountNoOrMeterNumber=${meterNo}`
    );
    return `/SPM/getAllSpmMonthlyBillDetailsTByAccountNoOrMeterNumber?accountNoOrMeterNumber=${meterNo}`;
  };

  const convertDateTimeToDate = dateTime => {
    const date = dateTime.split(' ');
    console.log('date' + date);

    const str = date[0];

    return str;
  };

  const valueFix = val => {
    return val.toFixed(2);
  };

  const CurrentYear = () => {
    return new Date().getFullYear();
  };

  const convertDateTimeSplit = dateTime => {
    var date = new Date(dateTime);
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    console.log('date' + dateTime);
    let monthIndex = date.getMonth(); // Get the month index (0-11)
    let day = ('0' + date.getDate()).slice(-2); // Get the day and pad it
    let year = date.getFullYear(); // Get the year

    console.log(monthNames[monthIndex]); // Log the month name
    console.log(monthIndex + 1); // Log the month number (1-12)

    return [day, monthNames[monthIndex], year].join('-');
  };
  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        setTextInputValue(Constants['name']);
        const consumerDetailsJson = (
          await CISAPPApi.consumerDetailsPOST(Constants, {
            accno: Constants['name'],
          })
        )?.json;
        console.log(consumerDetailsJson);
        buildConsumerString(Constants['name']);
        const prepaidFlag = (consumerDetailsJson && consumerDetailsJson[0])
          ?.data?.prepaidFlag;
        setPrepaidFlag(prepaidFlag);
        console.log(prepaidFlag);
        const meterNo = (consumerDetailsJson && consumerDetailsJson[0])?.data
          ?.meterNumber;
        setMeterNumber(meterNo);
        console.log(meterNo);
        const BillingHistoryJson = await (async () => {
          if (prepaidFlag === 'N') {
            return (
              await CISAPPApi.billingHistoryPOST(Constants, {
                action: buildBillingString(Constants['name']),
              })
            )?.json;
          }
        })();
        console.log(BillingHistoryJson);
        buildBillingString(Constants['name']);

        const valuekXSe5qlZ =
          BillingHistoryJson && BillingHistoryJson[0].data.BillDataJson;
        setBillingHistoryScreen(valuekXSe5qlZ);
        const billHistory = valuekXSe5qlZ;
        const prepaidBillingHistoryJson = await (async () => {
          if (prepaidFlag === 'Y') {
            return (
              await CISAPPApi.consumptionPatternMonthsPOST(Constants, {
                accountno: (() => {
                  const e = Constants['name'];
                  console.log(e);
                  return e;
                })(),
                days: (() => {
                  const e = 12;
                  console.log(e);
                  return e;
                })(),
                mtrno: meterNo,
                year: (() => {
                  const e = CurrentYear(currentYear);
                  console.log(e);
                  return e;
                })(),
              })
            )?.json;
          }
        })();
        /* hidden 'Run a Custom Function' action */
        /* hidden 'Log to Console' action */
        const prepaidBillingHistoryResult = (() => {
          const e =
            prepaidBillingHistoryJson && prepaidBillingHistoryJson[0].data;
          console.log(e);
          return e;
        })();
        setPrepaidBillingHistory(prepaidBillingHistoryResult);
        /* hidden 'Log to Console' action */
        const prepaidconsumptiondailyJson = await (async () => {
          if (prepaidFlag === 'Y') {
            return (
              await CISAPPApi.consumptionPatternDaysPOST(Constants, {
                accountno: Constants['name'],
                action: 'consumptionPatternDays',
                days: '30',
                mtrno: (() => {
                  const e = meterNo;
                  console.log(e);
                  return e;
                })(),
              })
            )?.json;
          }
        })();
        /* hidden 'Log to Console' action */
        const prepaidconsumptionResult = JSON.parse(
          prepaidconsumptiondailyJson &&
            prepaidconsumptiondailyJson[0].data.data
        );
        /* hidden 'Log to Console' action */
        setPrepaidDailyConsumption(prepaidconsumptionResult);
        /* hidden 'Log to Console' action */
        const ManageAccountDetails = (
          await CISAPPApi.manageAccountsPOST(Constants, {
            accountNumber: Constants['name'],
          })
        )?.json;
        console.log(ManageAccountDetails);
        const result = setGlobalVariableValue({
          key: 'manageaccount_picker',
          value: manageAccountFun(
            ManageAccountDetails && ManageAccountDetails[0].data[0].data
          ),
        });
        console.log(result);
        setTextInputValue(Constants['name']);
        const prepaidconsumptionrangeJson = await (async () => {
          if (prepaidFlag === 'Y') {
            return (
              await CISAPPApi.consumptionPatternRangePOST(Constants, {
                accountno: Constants['name'],
                action: 'consumptionPatternDaysRange',
                days: 'range',
                fromdate: finalformate1,
                mtrno: meterNo,
                todate: finalformate2,
              })
            )?.json;
          }
        })();
        const prepaidrangeconsumptionResult = JSON.parse(
          prepaidconsumptionrangeJson &&
            prepaidconsumptionrangeJson[0].data.data
        );
        setPrepaidRangeConsumption(prepaidrangeconsumptionResult);
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      hasTopSafeArea={false}
      style={StyleSheet.applyWidth(
        { flex: 1, flexDirection: 'column' },
        dimensions.width
      )}
    >
      {/* Drawer */}
      <>
        {!ShowNav ? null : (
          <Surface
            elevation={0}
            style={StyleSheet.applyWidth(
              {
                backgroundColor: '"rgba(0, 0, 0, 0)"',
                flex: 2,
                flexDirection: 'row',
                height: '100%',
                position: 'absolute',
                top: 0,
                width: '100%',
                zIndex: 5,
              },
              dimensions.width
            )}
          >
            {/* View 2 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: theme.colors['Surface'],
                  paddingTop: 40,
                  width: '80%',
                },
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth(
                  { flex: 1, paddingBottom: 16, paddingTop: 16 },
                  dimensions.width
                )}
              >
                {/* Home */}
                <Touchable
                  onPress={() => {
                    try {
                      undefined;
                      navigation.navigate('DashboardScreen');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingBottom: 12,
                        paddingLeft: 24,
                        paddingRight: 24,
                        paddingTop: 12,
                      },
                      dimensions.width
                    )}
                  >
                    <Icon size={24} name={'Feather/home'} />
                    <Text
                      accessible={true}
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors['Strong'],
                          fontFamily: 'Roboto_400Regular',
                          fontSize: 16,
                          marginLeft: 8,
                        },
                        dimensions.width
                      )}
                    >
                      {transalate(Variables, 'Home')}
                    </Text>
                  </View>
                </Touchable>
                {/* Manage Account */}
                <Touchable
                  onPress={() => {
                    try {
                      undefined;
                      navigation.navigate('ManageAccountScreen');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingBottom: 12,
                        paddingLeft: 24,
                        paddingRight: 24,
                        paddingTop: 12,
                      },
                      dimensions.width
                    )}
                  >
                    <Icon
                      size={24}
                      name={
                        'MaterialCommunityIcons/account-arrow-right-outline'
                      }
                    />
                    <Text
                      accessible={true}
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors['Strong'],
                          fontFamily: 'Roboto_400Regular',
                          fontSize: 16,
                          marginLeft: 8,
                        },
                        dimensions.width
                      )}
                    >
                      {transalate(Variables, 'Manage Account')}
                    </Text>
                  </View>
                </Touchable>
                {/* Notifications */}
                <Touchable
                  onPress={() => {
                    try {
                      undefined;
                      navigation.navigate('NotificationsScreen');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingBottom: 12,
                        paddingLeft: 24,
                        paddingRight: 24,
                        paddingTop: 12,
                      },
                      dimensions.width
                    )}
                  >
                    <Icon
                      size={24}
                      name={'Ionicons/ios-notifications-circle-outline'}
                    />
                    <Text
                      accessible={true}
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors['Strong'],
                          fontFamily: 'Roboto_400Regular',
                          fontSize: 16,
                          marginLeft: 8,
                        },
                        dimensions.width
                      )}
                    >
                      {transalate(Variables, 'Notifications')}
                    </Text>
                  </View>
                </Touchable>
                {/* Load and Quality */}
                <>
                  {!(prepaidFlag === 'Y') ? null : (
                    <Touchable
                      onPress={() => {
                        try {
                          navigation.navigate('LoadQualityScreen');
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            flexDirection: 'row',
                            paddingBottom: 12,
                            paddingLeft: 24,
                            paddingRight: 24,
                            paddingTop: 12,
                          },
                          dimensions.width
                        )}
                      >
                        <Icon size={24} name={'Feather/loader'} />
                        <Text
                          accessible={true}
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors['Strong'],
                              fontFamily: 'Roboto_400Regular',
                              fontSize: 16,
                              marginLeft: 8,
                            },
                            dimensions.width
                          )}
                        >
                          {transalate(Variables, 'Load & Quality')}
                        </Text>
                      </View>
                    </Touchable>
                  )}
                </>
                {/* Load Enhancement */}
                <>
                  {!(prepaidFlag === 'N') ? null : (
                    <Touchable
                      onPress={() => {
                        const handler = async () => {
                          try {
                            /* hidden 'Navigate' action */
                            await WebBrowser.openBrowserAsync(
                              `https://nccprodcp.quantumtechnologiesltd.com/cportal/#/bltLec/${Constants['name']}`
                            );
                          } catch (err) {
                            console.error(err);
                          }
                        };
                        handler();
                      }}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            flexDirection: 'row',
                            paddingBottom: 12,
                            paddingLeft: 24,
                            paddingRight: 24,
                            paddingTop: 12,
                          },
                          dimensions.width
                        )}
                      >
                        <Icon
                          size={24}
                          name={'MaterialCommunityIcons/alert-outline'}
                        />
                        <Text
                          accessible={true}
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors['Strong'],
                              fontFamily: 'Roboto_400Regular',
                              fontSize: 16,
                              marginLeft: 8,
                            },
                            dimensions.width
                          )}
                        >
                          {transalate(Variables, 'Load Enhancement')}
                        </Text>
                      </View>
                    </Touchable>
                  )}
                </>
                {/* Load Reduction */}
                <>
                  {!(prepaidFlag === 'N') ? null : (
                    <Touchable
                      onPress={() => {
                        const handler = async () => {
                          try {
                            /* hidden 'Navigate' action */
                            await WebBrowser.openBrowserAsync(
                              `https://nccprodcp.quantumtechnologiesltd.com/cportal/#/bltLrc/${Constants['name']}`
                            );
                          } catch (err) {
                            console.error(err);
                          }
                        };
                        handler();
                      }}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            flexDirection: 'row',
                            paddingBottom: 12,
                            paddingLeft: 24,
                            paddingRight: 24,
                            paddingTop: 12,
                          },
                          dimensions.width
                        )}
                      >
                        <Icon
                          size={24}
                          name={'FontAwesome/exclamation-triangle'}
                        />
                        <Text
                          accessible={true}
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors['Strong'],
                              fontFamily: 'Roboto_400Regular',
                              fontSize: 16,
                              marginLeft: 8,
                            },
                            dimensions.width
                          )}
                        >
                          {transalate(Variables, 'Load Reduction')}
                        </Text>
                      </View>
                    </Touchable>
                  )}
                </>
                {/* Downloads */}
                <Touchable
                  onPress={() => {
                    try {
                      navigation.navigate('DownloadsScreen');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingBottom: 12,
                        paddingLeft: 24,
                        paddingRight: 24,
                        paddingTop: 12,
                      },
                      dimensions.width
                    )}
                  >
                    <Icon size={24} name={'Feather/download'} />
                    <Text
                      accessible={true}
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors['Strong'],
                          fontFamily: 'Roboto_400Regular',
                          fontSize: 16,
                          marginLeft: 8,
                        },
                        dimensions.width
                      )}
                    >
                      {transalate(Variables, 'Downloads')}
                    </Text>
                  </View>
                </Touchable>
                {/* FAQ */}
                <Touchable
                  onPress={() => {
                    try {
                      navigation.navigate('FAQScreen');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingBottom: 12,
                        paddingLeft: 24,
                        paddingRight: 24,
                        paddingTop: 12,
                      },
                      dimensions.width
                    )}
                  >
                    <Icon size={24} name={'Feather/help-circle'} />
                    <Text
                      accessible={true}
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors['Strong'],
                          fontFamily: 'Roboto_400Regular',
                          fontSize: 16,
                          marginLeft: 8,
                        },
                        dimensions.width
                      )}
                    >
                      {transalate(Variables, 'FAQ')}
                    </Text>
                  </View>
                </Touchable>
                {/* Feedback */}
                <Touchable
                  onPress={() => {
                    try {
                      navigation.navigate('FeedbackScreen');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingBottom: 12,
                        paddingLeft: 24,
                        paddingRight: 24,
                        paddingTop: 12,
                      },
                      dimensions.width
                    )}
                  >
                    <Icon size={24} name={'MaterialIcons/feedback'} />
                    <Text
                      accessible={true}
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors['Strong'],
                          fontFamily: 'Roboto_400Regular',
                          fontSize: 16,
                          marginLeft: 8,
                        },
                        dimensions.width
                      )}
                    >
                      {transalate(Variables, 'Feedback')}
                    </Text>
                  </View>
                </Touchable>
                {/* Contact Us */}
                <Touchable
                  onPress={() => {
                    try {
                      navigation.navigate('ContactUsScreen');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingBottom: 12,
                        paddingLeft: 24,
                        paddingRight: 24,
                        paddingTop: 12,
                      },
                      dimensions.width
                    )}
                  >
                    <Icon size={24} name={'Ionicons/md-help-buoy-outline'} />
                    <Text
                      accessible={true}
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors['Strong'],
                          fontFamily: 'Roboto_400Regular',
                          fontSize: 16,
                          marginLeft: 8,
                        },
                        dimensions.width
                      )}
                    >
                      {transalate(Variables, 'Contact Us')}
                    </Text>
                  </View>
                </Touchable>
                {/* Energy Tips */}
                <Touchable
                  onPress={() => {
                    try {
                      navigation.navigate('EnergyTipsScreen');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingBottom: 12,
                        paddingLeft: 24,
                        paddingRight: 24,
                        paddingTop: 12,
                      },
                      dimensions.width
                    )}
                  >
                    <Icon size={24} name={'SimpleLineIcons/energy'} />
                    <Text
                      accessible={true}
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors['Strong'],
                          fontFamily: 'Roboto_400Regular',
                          fontSize: 16,
                          marginLeft: 8,
                        },
                        dimensions.width
                      )}
                    >
                      {transalate(Variables, 'Energy Tips')}
                    </Text>
                  </View>
                </Touchable>
                {/* Privacy Policy */}
                <Touchable
                  onPress={() => {
                    try {
                      navigation.navigate('PrivacyPolicyScreen');
                      /* hidden 'Open Browser' action */
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingBottom: 12,
                        paddingLeft: 24,
                        paddingRight: 24,
                        paddingTop: 12,
                      },
                      dimensions.width
                    )}
                  >
                    <Icon size={24} name={'MaterialCommunityIcons/security'} />
                    <Text
                      accessible={true}
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors['Strong'],
                          fontFamily: 'Roboto_400Regular',
                          fontSize: 16,
                          marginLeft: 8,
                        },
                        dimensions.width
                      )}
                    >
                      {transalate(Variables, 'Privacy Policy')}
                    </Text>
                  </View>
                </Touchable>
              </View>

              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: theme.colors['Background'],
                    marginTop: -20,
                    paddingBottom: 24,
                    paddingLeft: 24,
                    paddingRight: 24,
                  },
                  dimensions.width
                )}
              ></View>
            </View>

            <View
              style={StyleSheet.applyWidth(
                { backgroundColor: '"rgba(0, 0, 0, 0)"', flex: 1 },
                dimensions.width
              )}
            >
              <Touchable
                onPress={() => {
                  try {
                    setShowNav(!ShowNav);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={StyleSheet.applyWidth(
                  { height: '100%', width: '100%' },
                  dimensions.width
                )}
              />
            </View>
          </Surface>
        )}
      </>
      {/* Header */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 30,
            paddingBottom: 20,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 20,
          },
          dimensions.width
        )}
      >
        <Checkbox
          onPress={newCheckboxValue => {
            try {
              setShowNav(newCheckboxValue);
            } catch (err) {
              console.error(err);
            }
          }}
          checkedIcon={'Feather/x'}
          color={theme.colors['Custom Color_22']}
          size={32}
          status={ShowNav}
          uncheckedColor={theme.colors['Custom Color_22']}
          uncheckedIcon={'Feather/menu'}
        />
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center', flex: 1, flexDirection: 'row' },
            dimensions.width
          )}
        >
          <Text
            accessible={true}
            style={StyleSheet.applyWidth(
              {
                flex: 1,
                fontFamily: 'Roboto_700Bold',
                fontSize: 18,
                marginLeft: 6,
                textAlign: 'center',
              },
              dimensions.width
            )}
          >
            {transalate(Variables, 'Usage')}
          </Text>
          <Picker
            autoDismissKeyboard={true}
            dropDownBackgroundColor={theme.colors.background}
            dropDownTextColor={theme.colors.strong}
            iconSize={24}
            leftIconMode={'inset'}
            mode={'native'}
            onValueChange={newPickerValue => {
              const pickerValue = newPickerValue;
              try {
                setGlobalVariableValue({
                  key: 'LANGUAGE',
                  value: newPickerValue,
                });
                setPickerValue2(newPickerValue);
              } catch (err) {
                console.error(err);
              }
            }}
            selectedIconColor={theme.colors.strong}
            selectedIconName={'Feather/check'}
            selectedIconSize={20}
            dropDownBorderColor={theme.colors['White']}
            dropDownBorderRadius={0}
            dropDownBorderWidth={0}
            options={[
              { label: 'English', value: 'en' },
              { label: 'Hindi', value: 'hi' },
              { label: 'Marathi', value: 'ma' },
            ]}
            placeholder={''}
            style={StyleSheet.applyWidth(
              { backgroundColor: theme.colors['White'], width: '21%' },
              dimensions.width
            )}
            type={'underline'}
            value={pickerValue2}
          />
          <Touchable
            onPress={() => {
              try {
                navigation.navigate('NotificationsScreen');
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <Icon
              size={24}
              color={theme.colors['Community_Light_Black']}
              name={'Ionicons/md-notifications-circle-outline'}
            />
          </Touchable>

          <Touchable
            onPress={() => {
              try {
                navigation.navigate('ProfileOptionsScreen');
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <Icon
              size={24}
              color={theme.colors['Community_Light_Black']}
              name={'Ionicons/person-circle-outline'}
            />
          </Touchable>
        </View>
      </View>
      {/* Content */}
      <View
        style={StyleSheet.applyWidth(
          { flex: 1, justifyContent: 'space-around' },
          dimensions.width
        )}
      >
        <ScrollView
          bounces={true}
          horizontal={false}
          keyboardShouldPersistTaps={'never'}
          nestedScrollEnabled={false}
          showsHorizontalScrollIndicator={true}
          showsVerticalScrollIndicator={true}
        >
          {/* Body */}
          <View
            style={StyleSheet.applyWidth(
              { flex: 1, justifyContent: 'space-around' },
              dimensions.width
            )}
          >
            {/* amblock */}
            <View
              style={StyleSheet.applyWidth(
                { flex: 1, paddingLeft: 20, paddingRight: 20 },
                dimensions.width
              )}
            >
              {/* Service connection number */}
              <View
                {...GlobalStyles.ViewStyles(theme)['category'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ViewStyles(theme)['category'].style,
                    {
                      borderBottomWidth: 1,
                      borderColor: theme.colors['Divider'],
                      borderLeftWidth: 1,
                      borderRadius: 16,
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      marginBottom: 30,
                      paddingLeft: 20,
                      paddingRight: 20,
                    }
                  ),
                  dimensions.width
                )}
              >
                <Icon
                  size={24}
                  color={theme.colors['Medium']}
                  name={'MaterialIcons/house'}
                />
                <Picker
                  autoDismissKeyboard={true}
                  dropDownBackgroundColor={theme.colors.background}
                  dropDownBorderColor={theme.colors.divider}
                  dropDownBorderRadius={8}
                  dropDownBorderWidth={1}
                  dropDownTextColor={theme.colors.strong}
                  iconSize={24}
                  leftIconMode={'inset'}
                  mode={'native'}
                  onValueChange={newPickerValue => {
                    const handler = async () => {
                      try {
                        setTextInputValue(newPickerValue);
                        const consumerDetailsJson = (
                          await CISAPPApi.consumerDetailsPOST(Constants, {
                            accno: newPickerValue,
                          })
                        )?.json;
                        console.log(consumerDetailsJson);
                        buildConsumerString(newPickerValue);
                        const prepaidFlag = (
                          consumerDetailsJson && consumerDetailsJson[0]
                        )?.data?.prepaidFlag;
                        setPrepaidFlag(prepaidFlag);
                        console.log(prepaidFlag);
                        const meterNo = (
                          consumerDetailsJson && consumerDetailsJson[0]
                        )?.data?.meterNumber;
                        setMeterNumber(meterNo);
                        console.log(meterNo);
                        const BillingHistoryJson = await (async () => {
                          if (prepaidFlag === 'N') {
                            return (
                              await CISAPPApi.billingHistoryPOST(Constants, {
                                action: buildBillingString(newPickerValue),
                              })
                            )?.json;
                          }
                        })();
                        console.log(BillingHistoryJson);
                        buildBillingString(newPickerValue);

                        const valueGPtJRbkT =
                          BillingHistoryJson &&
                          BillingHistoryJson[0].data.BillDataJson;
                        setBillingHistoryScreen(valueGPtJRbkT);
                        const billHistory = valueGPtJRbkT;
                        const prepaidBillingHistoryJson = await (async () => {
                          if (prepaidFlag === 'Y') {
                            return (
                              await CISAPPApi.consumptionPatternMonthsPOST(
                                Constants,
                                {
                                  accountno: (() => {
                                    const e = Constants['name'];
                                    console.log(e);
                                    return e;
                                  })(),
                                  days: (() => {
                                    const e = 12;
                                    console.log(e);
                                    return e;
                                  })(),
                                  mtrno: meterNo,
                                  year: (() => {
                                    const e = CurrentYear(currentYear);
                                    console.log(e);
                                    return e;
                                  })(),
                                }
                              )
                            )?.json;
                          }
                        })();
                        /* hidden 'Run a Custom Function' action */
                        console.log(prepaidBillingHistoryJson);
                        const prepaidBillingHistoryResult = (() => {
                          const e =
                            prepaidBillingHistoryJson &&
                            prepaidBillingHistoryJson[0].data;
                          console.log(e);
                          return e;
                        })();
                        setPrepaidBillingHistory(prepaidBillingHistoryResult);
                        console.log(prepaidBillingHistoryResult);
                        const prepaidconsumptiondailyJson = await (async () => {
                          if (prepaidFlag === 'Y') {
                            return (
                              await CISAPPApi.consumptionPatternDaysPOST(
                                Constants,
                                {
                                  accountno: Constants['name'],
                                  action: 'consumptionPatternDays',
                                  days: '30',
                                  mtrno: meterNo,
                                }
                              )
                            )?.json;
                          }
                        })();
                        console.log(prepaidconsumptiondailyJson);
                        const prepaidconsumptionResult = JSON.parse(
                          prepaidconsumptiondailyJson &&
                            prepaidconsumptiondailyJson[0].data.data
                        );
                        setPrepaidDailyConsumption(prepaidconsumptionResult);
                      } catch (err) {
                        console.error(err);
                      }
                    };
                    handler();
                  }}
                  placeholder={'Select an option'}
                  selectedIconColor={theme.colors.strong}
                  selectedIconName={'Feather/check'}
                  selectedIconSize={20}
                  type={'solid'}
                  iconColor={theme.colors['Medium']}
                  options={Constants['manageaccount_picker']}
                  rightIconName={'Feather/chevron-down'}
                  style={StyleSheet.applyWidth(
                    {
                      borderColor: theme.colors['Background'],
                      borderWidth: 1,
                      fontFamily: 'Roboto_400Regular',
                      width: '95%',
                    },
                    dimensions.width
                  )}
                  value={textInputValue}
                />
              </View>

              <View
                {...GlobalStyles.ViewStyles(theme)['postpaid view 3'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ViewStyles(theme)['postpaid view 3'].style,
                    { marginTop: -20 }
                  ),
                  dimensions.width
                )}
              >
                {/* Prepaid */}
                <>
                  {!(prepaidFlag === 'Y') ? null : (
                    <Text
                      accessible={true}
                      {...GlobalStyles.TextStyles(theme)['Text'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'].style,
                          {
                            fontFamily: 'Roboto_400Regular',
                            textAlign: 'right',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {transalate(Variables, 'Prepaid')}
                    </Text>
                  )}
                </>
                {/* Postpaid */}
                <>
                  {!(prepaidFlag === 'N') ? null : (
                    <Text
                      accessible={true}
                      {...GlobalStyles.TextStyles(theme)['Text'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'].style,
                          {
                            fontFamily: 'Roboto_400Regular',
                            textAlign: 'right',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {transalate(Variables, 'Postpaid')}
                    </Text>
                  )}
                </>
              </View>
              {/* Main Tab View */}
              <>
                {!(prepaidFlag === 'Y') ? null : (
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        paddingLeft: 12,
                        paddingRight: 12,
                      },
                      dimensions.width
                    )}
                  >
                    {/* Daily */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingBottom: 12,
                          paddingTop: 12,
                        },
                        dimensions.width
                      )}
                    >
                      {/* PrepaidDaily */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Community_Icon_BG_Color'],
                            borderBottomLeftRadius: 64,
                            borderTopLeftRadius: 64,
                            flex: 1,
                          },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              backgroundColor:
                                theme.colors['Community_Icon_BG_Color'],
                              borderBottomLeftRadius: 64,
                              borderTopLeftRadius: 64,
                            },
                            dimensions.width
                          )}
                        >
                          {/* Selected */}
                          <>
                            {!(mainselectedTab === 'Prepaid Daily') ? null : (
                              <Touchable>
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      backgroundColor:
                                        theme.colors['Community_True_Option'],
                                      borderBottomWidth: 2,
                                      borderColor:
                                        theme.colors['Community_True_Option'],
                                      borderLeftWidth: 2,
                                      borderRadius: 64,
                                      borderRightWidth: 2,
                                      borderTopWidth: 2,
                                      paddingBottom: 9,
                                      paddingLeft: 9,
                                      paddingRight: 9,
                                      paddingTop: 9,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  <Text
                                    accessible={true}
                                    {...GlobalStyles.TextStyles(theme)['Text']
                                      .props}
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.TextStyles(theme)['Text']
                                          .style,
                                        {
                                          color:
                                            theme.colors[
                                              'Community_Icon_BG_Color'
                                            ],
                                          fontFamily: 'Roboto_400Regular',
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    {transalate(Variables, 'Daily')}
                                  </Text>
                                </View>
                              </Touchable>
                            )}
                          </>
                        </View>
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              backgroundColor:
                                theme.colors['Community_Icon_BG_Color'],
                              borderBottomLeftRadius: 64,
                              borderTopLeftRadius: 64,
                            },
                            dimensions.width
                          )}
                        >
                          {/* Unselected */}
                          <>
                            {!(mainselectedTab !== 'Prepaid Daily') ? null : (
                              <Touchable
                                onPress={() => {
                                  try {
                                    setMainselectedTab('Prepaid Daily');
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                              >
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      backgroundColor:
                                        theme.colors['Community_Icon_BG_Color'],
                                      borderBottomWidth: 2,
                                      borderColor:
                                        theme.colors['Community_Icon_BG_Color'],
                                      borderLeftWidth: 2,
                                      borderRadius: 64,
                                      borderRightWidth: 2,
                                      borderTopWidth: 2,
                                      paddingBottom: 9,
                                      paddingLeft: 9,
                                      paddingRight: 9,
                                      paddingTop: 9,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  <Text
                                    accessible={true}
                                    {...GlobalStyles.TextStyles(theme)['Text']
                                      .props}
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.TextStyles(theme)['Text']
                                          .style,
                                        {
                                          color:
                                            theme.colors['Community_Dark_UI'],
                                          fontFamily: 'Roboto_400Regular',
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    {transalate(Variables, 'Daily')}
                                  </Text>
                                </View>
                              </Touchable>
                            )}
                          </>
                        </View>
                      </View>
                    </View>
                    {/* Hourly */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingBottom: 12,
                          paddingTop: 12,
                        },
                        dimensions.width
                      )}
                    >
                      {/* PrepaidHourly */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Community_Icon_BG_Color'],
                            borderBottomLeftRadius: 64,
                            borderTopLeftRadius: 64,
                            flex: 1,
                          },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              backgroundColor:
                                theme.colors['Community_Icon_BG_Color'],
                              borderBottomLeftRadius: 64,
                              borderTopLeftRadius: 64,
                            },
                            dimensions.width
                          )}
                        >
                          {/* Selected */}
                          <>
                            {!(mainselectedTab === 'Prepaid Hourly') ? null : (
                              <Touchable>
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      backgroundColor:
                                        theme.colors['Community_True_Option'],
                                      borderBottomWidth: 2,
                                      borderColor:
                                        theme.colors['Community_True_Option'],
                                      borderLeftWidth: 2,
                                      borderRadius: 64,
                                      borderRightWidth: 2,
                                      borderTopWidth: 2,
                                      paddingBottom: 9,
                                      paddingLeft: 9,
                                      paddingRight: 9,
                                      paddingTop: 9,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  <Text
                                    accessible={true}
                                    {...GlobalStyles.TextStyles(theme)['Text']
                                      .props}
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.TextStyles(theme)['Text']
                                          .style,
                                        {
                                          color:
                                            theme.colors[
                                              'Community_Icon_BG_Color'
                                            ],
                                          fontFamily: 'Roboto_400Regular',
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    {transalate(Variables, 'Hourly')}
                                  </Text>
                                </View>
                              </Touchable>
                            )}
                          </>
                        </View>
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              backgroundColor:
                                theme.colors['Community_Icon_BG_Color'],
                              borderBottomLeftRadius: 64,
                              borderTopLeftRadius: 64,
                            },
                            dimensions.width
                          )}
                        >
                          {/* Unselected */}
                          <>
                            {!(mainselectedTab !== 'Prepaid Hourly') ? null : (
                              <Touchable
                                onPress={() => {
                                  try {
                                    setMainselectedTab('Prepaid Hourly');
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                              >
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      backgroundColor:
                                        theme.colors['Community_Icon_BG_Color'],
                                      borderBottomWidth: 2,
                                      borderColor:
                                        theme.colors['Community_Icon_BG_Color'],
                                      borderLeftWidth: 2,
                                      borderRadius: 64,
                                      borderRightWidth: 2,
                                      borderTopWidth: 2,
                                      paddingBottom: 9,
                                      paddingLeft: 9,
                                      paddingRight: 9,
                                      paddingTop: 9,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  <Text
                                    accessible={true}
                                    {...GlobalStyles.TextStyles(theme)['Text']
                                      .props}
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.TextStyles(theme)['Text']
                                          .style,
                                        {
                                          color:
                                            theme.colors['Community_Dark_UI'],
                                          fontFamily: 'Roboto_400Regular',
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    {transalate(Variables, 'Hourly')}
                                  </Text>
                                </View>
                              </Touchable>
                            )}
                          </>
                        </View>
                      </View>
                    </View>
                    {/* Monthly */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingBottom: 12,
                          paddingTop: 12,
                        },
                        dimensions.width
                      )}
                    >
                      {/* PrepaidMonthly */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Community_Icon_BG_Color'],
                            borderBottomLeftRadius: 64,
                            borderTopLeftRadius: 64,
                            flex: 1,
                          },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              backgroundColor:
                                theme.colors['Community_Icon_BG_Color'],
                              borderBottomLeftRadius: 64,
                              borderTopLeftRadius: 64,
                            },
                            dimensions.width
                          )}
                        >
                          {/* Selected */}
                          <>
                            {!(mainselectedTab === 'Prepaid View') ? null : (
                              <Touchable>
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      backgroundColor:
                                        theme.colors['Community_True_Option'],
                                      borderBottomWidth: 2,
                                      borderColor:
                                        theme.colors['Community_True_Option'],
                                      borderLeftWidth: 2,
                                      borderRadius: 64,
                                      borderRightWidth: 2,
                                      borderTopWidth: 2,
                                      paddingBottom: 9,
                                      paddingLeft: 9,
                                      paddingRight: 9,
                                      paddingTop: 9,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  <Text
                                    accessible={true}
                                    {...GlobalStyles.TextStyles(theme)['Text']
                                      .props}
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.TextStyles(theme)['Text']
                                          .style,
                                        {
                                          color:
                                            theme.colors[
                                              'Community_Icon_BG_Color'
                                            ],
                                          fontFamily: 'Roboto_400Regular',
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    {transalate(Variables, 'Monthly')}
                                  </Text>
                                </View>
                              </Touchable>
                            )}
                          </>
                        </View>
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              backgroundColor:
                                theme.colors['Community_Icon_BG_Color'],
                              borderBottomLeftRadius: 64,
                              borderTopLeftRadius: 64,
                            },
                            dimensions.width
                          )}
                        >
                          {/* Unselected */}
                          <>
                            {!(mainselectedTab !== 'Prepaid View') ? null : (
                              <Touchable
                                onPress={() => {
                                  try {
                                    setMainselectedTab('Prepaid View');
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                              >
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      backgroundColor:
                                        theme.colors['Community_Icon_BG_Color'],
                                      borderBottomWidth: 2,
                                      borderColor:
                                        theme.colors['Community_Icon_BG_Color'],
                                      borderLeftWidth: 2,
                                      borderRadius: 64,
                                      borderRightWidth: 2,
                                      borderTopWidth: 2,
                                      paddingBottom: 9,
                                      paddingLeft: 9,
                                      paddingRight: 9,
                                      paddingTop: 9,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  <Text
                                    accessible={true}
                                    {...GlobalStyles.TextStyles(theme)['Text']
                                      .props}
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.TextStyles(theme)['Text']
                                          .style,
                                        {
                                          color:
                                            theme.colors['Community_Dark_UI'],
                                          fontFamily: 'Roboto_400Regular',
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    {transalate(Variables, 'Monthly')}
                                  </Text>
                                </View>
                              </Touchable>
                            )}
                          </>
                        </View>
                      </View>
                    </View>
                    {/* Range */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingBottom: 12,
                          paddingTop: 12,
                        },
                        dimensions.width
                      )}
                    >
                      {/* Prepaidrange */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Community_Icon_BG_Color'],
                            borderBottomLeftRadius: 64,
                            borderTopLeftRadius: 64,
                            flex: 1,
                          },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              backgroundColor:
                                theme.colors['Community_Icon_BG_Color'],
                              borderBottomLeftRadius: 64,
                              borderTopLeftRadius: 64,
                            },
                            dimensions.width
                          )}
                        >
                          {/* Selected */}
                          <>
                            {!(mainselectedTab === 'Range View') ? null : (
                              <Touchable>
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      backgroundColor:
                                        theme.colors['Community_True_Option'],
                                      borderBottomWidth: 2,
                                      borderColor:
                                        theme.colors['Community_True_Option'],
                                      borderLeftWidth: 2,
                                      borderRadius: 64,
                                      borderRightWidth: 2,
                                      borderTopWidth: 2,
                                      paddingBottom: 9,
                                      paddingLeft: 9,
                                      paddingRight: 9,
                                      paddingTop: 9,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  <Text
                                    accessible={true}
                                    {...GlobalStyles.TextStyles(theme)['Text']
                                      .props}
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.TextStyles(theme)['Text']
                                          .style,
                                        {
                                          color:
                                            theme.colors[
                                              'Community_Icon_BG_Color'
                                            ],
                                          fontFamily: 'Roboto_400Regular',
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    {transalate(Variables, 'Range')}
                                  </Text>
                                </View>
                              </Touchable>
                            )}
                          </>
                        </View>
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              backgroundColor:
                                theme.colors['Community_Icon_BG_Color'],
                              borderBottomLeftRadius: 64,
                              borderTopLeftRadius: 64,
                            },
                            dimensions.width
                          )}
                        >
                          {/* Unselected */}
                          <>
                            {!(mainselectedTab !== 'Range View') ? null : (
                              <Touchable
                                onPress={() => {
                                  try {
                                    setMainselectedTab('Range View');
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                              >
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      backgroundColor:
                                        theme.colors['Community_Icon_BG_Color'],
                                      borderBottomWidth: 2,
                                      borderColor:
                                        theme.colors['Community_Icon_BG_Color'],
                                      borderLeftWidth: 2,
                                      borderRadius: 64,
                                      borderRightWidth: 2,
                                      borderTopWidth: 2,
                                      paddingBottom: 9,
                                      paddingLeft: 9,
                                      paddingRight: 9,
                                      paddingTop: 9,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  <Text
                                    accessible={true}
                                    {...GlobalStyles.TextStyles(theme)['Text']
                                      .props}
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.TextStyles(theme)['Text']
                                          .style,
                                        {
                                          color:
                                            theme.colors['Community_Dark_UI'],
                                          fontFamily: 'Roboto_400Regular',
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    {transalate(Variables, 'Range')}
                                  </Text>
                                </View>
                              </Touchable>
                            )}
                          </>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              </>
              {/* Prepaid Daily */}
              <>
                {!(mainselectedTab === 'Prepaid Daily') ? null : (
                  <View>
                    {/* Prepaid Section header */}
                    <>
                      {!(prepaidFlag === 'Y') ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              flexDirection: 'row',
                              justifyContent: 'center',
                              paddingBottom: 12,
                              paddingLeft: 20,
                              paddingRight: 20,
                            },
                            dimensions.width
                          )}
                        >
                          {/* Heading */}
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['Text'].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Text'].style,
                                {
                                  alignSelf: 'center',
                                  color: theme.colors['ShopAppBlue'],
                                  fontFamily: 'Roboto_400Regular',
                                  fontSize: 16,
                                  textAlign: 'center',
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {transalate(Variables, 'Daily Usage')}
                          </Text>
                        </View>
                      )}
                    </>
                    {/* prepaiddailytabs */}
                    <>
                      {!(prepaidFlag === 'Y') ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            },
                            dimensions.width
                          )}
                        >
                          {/* chart */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              },
                              dimensions.width
                            )}
                          >
                            {/* prepaiddailychart */}
                            <View
                              style={StyleSheet.applyWidth(
                                { flex: 1 },
                                dimensions.width
                              )}
                            >
                              {/* selected */}
                              <>
                                {!(
                                  selecteddailyTab === 'prepaiddailychart'
                                ) ? null : (
                                  <Touchable>
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          borderBottomWidth: 3,
                                          borderColor: theme.colors['Primary'],
                                          height: 25,
                                          justifyContent: 'center',
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Text
                                        accessible={true}
                                        {...GlobalStyles.TextStyles(theme)[
                                          'Text'
                                        ].props}
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(
                                            GlobalStyles.TextStyles(theme)[
                                              'Text'
                                            ].style,
                                            {
                                              color:
                                                theme.colors['Custom Color'],
                                              fontFamily: 'Roboto_400Regular',
                                            }
                                          ),
                                          dimensions.width
                                        )}
                                      >
                                        {transalate(Variables, 'Chart')}
                                      </Text>
                                    </View>
                                  </Touchable>
                                )}
                              </>
                              {/* unselected */}
                              <>
                                {!(
                                  selecteddailyTab !== 'prepaiddailychart'
                                ) ? null : (
                                  <Touchable
                                    onPress={() => {
                                      try {
                                        setSelecteddailyTab(
                                          'prepaiddailychart'
                                        );
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                  >
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          borderBottomWidth: 2,
                                          borderColor: theme.colors['Light'],
                                          height: 25,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Text
                                        accessible={true}
                                        {...GlobalStyles.TextStyles(theme)[
                                          'Text'
                                        ].props}
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(
                                            GlobalStyles.TextStyles(theme)[
                                              'Text'
                                            ].style,
                                            {
                                              color: theme.colors['Light'],
                                              fontFamily: 'Roboto_400Regular',
                                            }
                                          ),
                                          dimensions.width
                                        )}
                                      >
                                        {transalate(Variables, 'Chart')}
                                      </Text>
                                    </View>
                                  </Touchable>
                                )}
                              </>
                            </View>
                          </View>
                          {/* table */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              },
                              dimensions.width
                            )}
                          >
                            {/* prepaiddailytable */}
                            <View
                              style={StyleSheet.applyWidth(
                                { flex: 1 },
                                dimensions.width
                              )}
                            >
                              {/* selected */}
                              <>
                                {!(
                                  selecteddailyTab === 'prepaiddailytable'
                                ) ? null : (
                                  <Touchable>
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          borderBottomWidth: 3,
                                          borderColor: theme.colors['Primary'],
                                          height: 25,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Text
                                        accessible={true}
                                        {...GlobalStyles.TextStyles(theme)[
                                          'Text'
                                        ].props}
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(
                                            GlobalStyles.TextStyles(theme)[
                                              'Text'
                                            ].style,
                                            {
                                              color:
                                                theme.colors['Custom Color'],
                                              fontFamily: 'Roboto_400Regular',
                                            }
                                          ),
                                          dimensions.width
                                        )}
                                      >
                                        {transalate(Variables, 'Table')}
                                      </Text>
                                    </View>
                                  </Touchable>
                                )}
                              </>
                              {/* unselected */}
                              <>
                                {!(
                                  selecteddailyTab !== 'prepaiddailytable'
                                ) ? null : (
                                  <Touchable
                                    onPress={() => {
                                      try {
                                        setSelecteddailyTab(
                                          'prepaiddailytable'
                                        );
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                  >
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          borderBottomWidth: 2,
                                          borderColor: theme.colors['Light'],
                                          height: 25,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Text
                                        accessible={true}
                                        {...GlobalStyles.TextStyles(theme)[
                                          'Text'
                                        ].props}
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(
                                            GlobalStyles.TextStyles(theme)[
                                              'Text'
                                            ].style,
                                            {
                                              color: theme.colors['Light'],
                                              fontFamily: 'Roboto_400Regular',
                                            }
                                          ),
                                          dimensions.width
                                        )}
                                      >
                                        {transalate(Variables, 'Table')}
                                      </Text>
                                    </View>
                                  </Touchable>
                                )}
                              </>
                            </View>
                          </View>
                        </View>
                      )}
                    </>
                    {/* prepaiddailychart */}
                    <>
                      {!(selecteddailyTab === 'prepaiddailychart') ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            { flex: 1 },
                            dimensions.width
                          )}
                        >
                          <>
                            {!prepaidDailyConsumption?.length ? null : (
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignItems: 'center',
                                    flex: 1,
                                    justifyContent: 'center',
                                    paddingRight: 10,
                                    width: '100%',
                                  },
                                  dimensions.width
                                )}
                              >
                                <>
                                  {!(prepaidFlag === 'Y') ? null : (
                                    <Utils.CustomCodeErrorBoundary>
                                      <prepaidDailyUsage.LineChartComponent
                                        prepaidDailyConsumption={
                                          prepaidDailyConsumption
                                        }
                                      />
                                    </Utils.CustomCodeErrorBoundary>
                                  )}
                                </>
                              </View>
                            )}
                          </>
                        </View>
                      )}
                    </>
                    {/* prepaiddailytable */}
                    <>
                      {!(selecteddailyTab === 'prepaiddailytable') ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              backgroundColor: 'rgb(211, 211, 211)',
                              borderBottomWidth: 1,
                              borderColor: 'rgb(211, 211, 211)',
                              borderLeftWidth: 1,
                              borderRightWidth: 1,
                              borderTopLeftRadius: 5,
                              borderTopRightRadius: 5,
                              borderTopWidth: 1,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              width: '100%',
                            },
                            dimensions.width
                          )}
                        >
                          {/* Bill Month */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                borderColor: theme.colors['White'],
                                borderRightWidth: 1,
                                flex: 1,
                              },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor: theme.colors['ViewBG'],
                                  height: 40,
                                  justifyContent: 'center',
                                },
                                dimensions.width
                              )}
                            >
                              <Text
                                accessible={true}
                                {...GlobalStyles.TextStyles(theme)['Text']
                                  .props}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)['Text']
                                      .style,
                                    {
                                      color: 'rgb(42, 42, 42)',
                                      fontFamily: 'Roboto_700Bold',
                                      textAlign: 'center',
                                      textTransform: 'capitalize',
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {transalate(Variables, 'Date')}
                              </Text>
                            </View>
                          </View>
                          {/* Units */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                borderColor: theme.colors['White'],
                                borderRightWidth: 1,
                                flex: 1,
                              },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor: theme.colors['ViewBG'],
                                  height: 40,
                                  justifyContent: 'center',
                                },
                                dimensions.width
                              )}
                            >
                              <Text
                                accessible={true}
                                {...GlobalStyles.TextStyles(theme)['Text']
                                  .props}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)['Text']
                                      .style,
                                    {
                                      color: 'rgb(42, 42, 42)',
                                      fontFamily: 'Roboto_700Bold',
                                      textAlign: 'center',
                                      textTransform: 'capitalize',
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {transalate(Variables, 'Units(Kwh)')}
                              </Text>
                            </View>
                          </View>
                        </View>
                      )}
                    </>
                    {/* prepaid list */}
                    <FlatList
                      data={prepaidDailyConsumption}
                      horizontal={false}
                      inverted={false}
                      keyExtractor={(prepaidListData, index) =>
                        prepaidListData?.id ??
                        prepaidListData?.uuid ??
                        index.toString()
                      }
                      keyboardShouldPersistTaps={'never'}
                      listKey={'VUb74fw4'}
                      nestedScrollEnabled={false}
                      numColumns={1}
                      onEndReachedThreshold={0.5}
                      renderItem={({ item, index }) => {
                        const prepaidListData = item;
                        return (
                          <>
                            {/* prepaiddailytable */}
                            <>
                              {!(
                                selecteddailyTab === 'prepaiddailytable'
                              ) ? null : (
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      borderBottomWidth: 1,
                                      borderColor: 'rgb(211, 211, 211)',
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
                                      paddingBottom: 10,
                                      paddingLeft: 20,
                                      paddingRight: 20,
                                      paddingTop: 10,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {/* Bill Month */}
                                  <View>
                                    {/* text */}
                                    <Text
                                      accessible={true}
                                      {...GlobalStyles.TextStyles(theme)['Text']
                                        .props}
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.TextStyles(theme)['Text']
                                            .style,
                                          {
                                            color: 'rgb(42, 42, 42)',
                                            fontFamily: 'Roboto_400Regular',
                                            fontSize: 16,
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                    >
                                      {prepaidListData?.lpDate}{' '}
                                    </Text>
                                  </View>
                                  {/* Units */}
                                  <View>
                                    <Text
                                      accessible={true}
                                      {...GlobalStyles.TextStyles(theme)['Text']
                                        .props}
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.TextStyles(theme)['Text']
                                            .style,
                                          {
                                            color: 'rgb(42, 42, 42)',
                                            fontFamily: 'Roboto_400Regular',
                                            fontSize: 16,
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                    >
                                      {prepaidListData?.kWImp}
                                    </Text>
                                  </View>
                                </View>
                              )}
                            </>
                          </>
                        );
                      }}
                      showsHorizontalScrollIndicator={true}
                      showsVerticalScrollIndicator={true}
                    />
                  </View>
                )}
              </>
              {/* Prepaid Hourly */}
              <>
                {!(mainselectedTab === 'Prepaid Hourly') ? null : (
                  <View>
                    <View>
                      <Text
                        accessible={true}
                        {...GlobalStyles.TextStyles(theme)['Text'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text'].style,
                            { fontFamily: 'Roboto_400Regular', marginTop: 2 }
                          ),
                          dimensions.width
                        )}
                      >
                        {transalate(Variables, 'Select the Date')}
                      </Text>
                      <DatePicker
                        autoDismissKeyboard={true}
                        disabled={false}
                        hideLabel={false}
                        label={'Date'}
                        leftIconMode={'inset'}
                        mode={'date'}
                        onDateChange={newDatePickerValue => {
                          const handler = async () => {
                            const date = newDatePickerValue;
                            try {
                              const valuesHUkrVnt = newDatePickerValue;
                              setDatePickerValue(valuesHUkrVnt);
                              const DateResult = valuesHUkrVnt;
                              const finalformate =
                                convertDateTimeSplit(DateResult);
                              setFinalFormate(finalformate);
                              /* hidden 'Log to Console' action */
                              const prepaidconsumptionhourlyJson = (
                                await CISAPPApi.consumptioPatternHoursPOST(
                                  Constants,
                                  {
                                    accountno: Constants['name'],
                                    action: 'consumptionPatternInnerDrilldown',
                                    date: finalformate,
                                    mtrno: meterNumber,
                                  }
                                )
                              )?.json;
                              /* hidden 'Log to Console' action */
                              const prepaidhourlyconsumptionResult = JSON.parse(
                                prepaidconsumptionhourlyJson &&
                                  prepaidconsumptionhourlyJson[0].data.data
                              );
                              setPrepaidHourlyConsumption(
                                prepaidhourlyconsumptionResult
                              );
                            } catch (err) {
                              console.error(err);
                            }
                          };
                          handler();
                        }}
                        type={'solid'}
                        date={datePickerValue}
                        leftIconName={'MaterialIcons/date-range'}
                        style={StyleSheet.applyWidth(
                          { marginTop: 5 },
                          dimensions.width
                        )}
                      />
                    </View>
                    {/* Prepaid Section header */}
                    <>
                      {!(prepaidFlag === 'Y') ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              flexDirection: 'row',
                              justifyContent: 'center',
                              marginTop: 10,
                              paddingBottom: 12,
                              paddingLeft: 20,
                              paddingRight: 20,
                            },
                            dimensions.width
                          )}
                        >
                          {/* Heading */}
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['Text'].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Text'].style,
                                {
                                  alignSelf: 'center',
                                  color: theme.colors['ShopAppBlue'],
                                  fontFamily: 'Roboto_400Regular',
                                  fontSize: 16,
                                  textAlign: 'center',
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {transalate(Variables, 'Hourly Usage')}
                          </Text>
                        </View>
                      )}
                    </>
                    {/* prepaidhourlytabs */}
                    <>
                      {!(prepaidFlag === 'Y') ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            },
                            dimensions.width
                          )}
                        >
                          {/* chart */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              },
                              dimensions.width
                            )}
                          >
                            {/* prepaidhourlychart */}
                            <View
                              style={StyleSheet.applyWidth(
                                { flex: 1 },
                                dimensions.width
                              )}
                            >
                              {/* selected */}
                              <>
                                {!(
                                  selectedhourlyTab === 'prepaidhourlychart'
                                ) ? null : (
                                  <Touchable>
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          borderBottomWidth: 3,
                                          borderColor: theme.colors['Primary'],
                                          height: 25,
                                          justifyContent: 'center',
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Text
                                        accessible={true}
                                        {...GlobalStyles.TextStyles(theme)[
                                          'Text'
                                        ].props}
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(
                                            GlobalStyles.TextStyles(theme)[
                                              'Text'
                                            ].style,
                                            {
                                              color:
                                                theme.colors['Custom Color'],
                                              fontFamily: 'Roboto_400Regular',
                                            }
                                          ),
                                          dimensions.width
                                        )}
                                      >
                                        {transalate(Variables, 'Chart')}
                                      </Text>
                                    </View>
                                  </Touchable>
                                )}
                              </>
                              {/* unselected */}
                              <>
                                {!(
                                  selectedhourlyTab !== 'prepaidhourlychart'
                                ) ? null : (
                                  <Touchable
                                    onPress={() => {
                                      try {
                                        setSelectedhourlyTab(
                                          'prepaidhourlychart'
                                        );
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                  >
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          borderBottomWidth: 2,
                                          borderColor: theme.colors['Light'],
                                          height: 25,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Text
                                        accessible={true}
                                        {...GlobalStyles.TextStyles(theme)[
                                          'Text'
                                        ].props}
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(
                                            GlobalStyles.TextStyles(theme)[
                                              'Text'
                                            ].style,
                                            {
                                              color: theme.colors['Light'],
                                              fontFamily: 'Roboto_400Regular',
                                            }
                                          ),
                                          dimensions.width
                                        )}
                                      >
                                        {transalate(Variables, 'Chart')}
                                      </Text>
                                    </View>
                                  </Touchable>
                                )}
                              </>
                            </View>
                          </View>
                          {/* table */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              },
                              dimensions.width
                            )}
                          >
                            {/* prepaidhourlytable */}
                            <View
                              style={StyleSheet.applyWidth(
                                { flex: 1 },
                                dimensions.width
                              )}
                            >
                              {/* selected */}
                              <>
                                {!(
                                  selectedhourlyTab === 'prepaidhourlytable'
                                ) ? null : (
                                  <Touchable>
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          borderBottomWidth: 3,
                                          borderColor: theme.colors['Primary'],
                                          height: 25,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Text
                                        accessible={true}
                                        {...GlobalStyles.TextStyles(theme)[
                                          'Text'
                                        ].props}
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(
                                            GlobalStyles.TextStyles(theme)[
                                              'Text'
                                            ].style,
                                            {
                                              color:
                                                theme.colors['Custom Color'],
                                              fontFamily: 'Roboto_400Regular',
                                            }
                                          ),
                                          dimensions.width
                                        )}
                                      >
                                        {transalate(Variables, 'Table')}
                                      </Text>
                                    </View>
                                  </Touchable>
                                )}
                              </>
                              {/* unselected */}
                              <>
                                {!(
                                  selectedhourlyTab !== 'prepaidhourlytable'
                                ) ? null : (
                                  <Touchable
                                    onPress={() => {
                                      try {
                                        setSelectedhourlyTab(
                                          'prepaidhourlytable'
                                        );
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                  >
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          borderBottomWidth: 2,
                                          borderColor: theme.colors['Light'],
                                          height: 25,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Text
                                        accessible={true}
                                        {...GlobalStyles.TextStyles(theme)[
                                          'Text'
                                        ].props}
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(
                                            GlobalStyles.TextStyles(theme)[
                                              'Text'
                                            ].style,
                                            {
                                              color: theme.colors['Light'],
                                              fontFamily: 'Roboto_400Regular',
                                            }
                                          ),
                                          dimensions.width
                                        )}
                                      >
                                        {transalate(Variables, 'Table')}
                                      </Text>
                                    </View>
                                  </Touchable>
                                )}
                              </>
                            </View>
                          </View>
                        </View>
                      )}
                    </>
                    {/* prepaidhourlychart */}
                    <>
                      {!(selectedhourlyTab === 'prepaidhourlychart') ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            { flex: 1 },
                            dimensions.width
                          )}
                        >
                          <>
                            {!prepaidHourlyConsumption?.length ? null : (
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignItems: 'center',
                                    flex: 1,
                                    justifyContent: 'center',
                                    paddingRight: 10,
                                    width: '100%',
                                  },
                                  dimensions.width
                                )}
                              >
                                <>
                                  {!(prepaidFlag === 'Y') ? null : (
                                    <Utils.CustomCodeErrorBoundary>
                                      <prepaidHourlyUsage.LineChartComponent
                                        prepaidHourlyConsumption={
                                          prepaidHourlyConsumption
                                        }
                                      />
                                    </Utils.CustomCodeErrorBoundary>
                                  )}
                                </>
                              </View>
                            )}
                          </>
                        </View>
                      )}
                    </>
                    {/* prepaidhourlytable */}
                    <>
                      {!(selectedhourlyTab === 'prepaidhourlytable') ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              backgroundColor: 'rgb(211, 211, 211)',
                              borderBottomWidth: 1,
                              borderColor: 'rgb(211, 211, 211)',
                              borderLeftWidth: 1,
                              borderRightWidth: 1,
                              borderTopLeftRadius: 5,
                              borderTopRightRadius: 5,
                              borderTopWidth: 1,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              width: '100%',
                            },
                            dimensions.width
                          )}
                        >
                          {/* Bill Month */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                borderColor: theme.colors['White'],
                                borderRightWidth: 1,
                                flex: 1,
                              },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor: theme.colors['ViewBG'],
                                  height: 40,
                                  justifyContent: 'center',
                                },
                                dimensions.width
                              )}
                            >
                              <Text
                                accessible={true}
                                {...GlobalStyles.TextStyles(theme)['Text']
                                  .props}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)['Text']
                                      .style,
                                    {
                                      color: 'rgb(42, 42, 42)',
                                      fontFamily: 'Roboto_700Bold',
                                      textAlign: 'center',
                                      textTransform: 'capitalize',
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {transalate(Variables, 'Hour')}
                              </Text>
                            </View>
                          </View>
                          {/* Units */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                borderColor: theme.colors['White'],
                                borderRightWidth: 1,
                                flex: 1,
                              },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor: theme.colors['ViewBG'],
                                  height: 40,
                                  justifyContent: 'center',
                                },
                                dimensions.width
                              )}
                            >
                              <Text
                                accessible={true}
                                {...GlobalStyles.TextStyles(theme)['Text']
                                  .props}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)['Text']
                                      .style,
                                    {
                                      color: 'rgb(42, 42, 42)',
                                      fontFamily: 'Roboto_700Bold',
                                      textAlign: 'center',
                                      textTransform: 'capitalize',
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {transalate(Variables, 'Units(Kwh)')}
                              </Text>
                            </View>
                          </View>
                        </View>
                      )}
                    </>
                    {/* prepaid list */}
                    <FlatList
                      data={prepaidHourlyConsumption}
                      horizontal={false}
                      inverted={false}
                      keyExtractor={(prepaidListData, index) =>
                        prepaidListData?.id ??
                        prepaidListData?.uuid ??
                        index.toString()
                      }
                      keyboardShouldPersistTaps={'never'}
                      listKey={'Wb081ntz'}
                      nestedScrollEnabled={false}
                      numColumns={1}
                      onEndReachedThreshold={0.5}
                      renderItem={({ item, index }) => {
                        const prepaidListData = item;
                        return (
                          <>
                            {/* prepaidhourlytable */}
                            <>
                              {!(
                                selectedhourlyTab === 'prepaidhourlytable'
                              ) ? null : (
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      borderBottomWidth: 1,
                                      borderColor: 'rgb(211, 211, 211)',
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
                                      paddingBottom: 10,
                                      paddingLeft: 20,
                                      paddingRight: 20,
                                      paddingTop: 10,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {/* Bill Month */}
                                  <View>
                                    {/* text */}
                                    <Text
                                      accessible={true}
                                      {...GlobalStyles.TextStyles(theme)['Text']
                                        .props}
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.TextStyles(theme)['Text']
                                            .style,
                                          {
                                            color: 'rgb(42, 42, 42)',
                                            fontFamily: 'Roboto_400Regular',
                                            fontSize: 16,
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                    >
                                      {prepaidListData?.time}{' '}
                                    </Text>
                                  </View>
                                  {/* Units */}
                                  <View>
                                    <Text
                                      accessible={true}
                                      {...GlobalStyles.TextStyles(theme)['Text']
                                        .props}
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.TextStyles(theme)['Text']
                                            .style,
                                          {
                                            color: 'rgb(42, 42, 42)',
                                            fontFamily: 'Roboto_400Regular',
                                            fontSize: 16,
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                    >
                                      {prepaidListData?.kWImp}
                                    </Text>
                                  </View>
                                </View>
                              )}
                            </>
                          </>
                        );
                      }}
                      showsHorizontalScrollIndicator={true}
                      showsVerticalScrollIndicator={true}
                    />
                  </View>
                )}
              </>
              {/* Prepaid View */}
              <>
                {!(mainselectedTab === 'Prepaid View') ? null : (
                  <View>
                    {/* Prepaid Section header */}
                    <>
                      {!(prepaidFlag === 'Y') ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              flexDirection: 'row',
                              justifyContent: 'center',
                              paddingBottom: 12,
                              paddingLeft: 20,
                              paddingRight: 20,
                            },
                            dimensions.width
                          )}
                        >
                          {/* Heading */}
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['Text'].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Text'].style,
                                {
                                  alignSelf: 'center',
                                  color: theme.colors['ShopAppBlue'],
                                  fontFamily: 'Roboto_400Regular',
                                  fontSize: 16,
                                  textAlign: 'center',
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {transalate(Variables, 'Monthly Usage')}
                          </Text>
                        </View>
                      )}
                    </>
                    {/* prepaidtabs */}
                    <>
                      {!(prepaidFlag === 'Y') ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            },
                            dimensions.width
                          )}
                        >
                          {/* chart */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              },
                              dimensions.width
                            )}
                          >
                            {/* prepaidchart */}
                            <View
                              style={StyleSheet.applyWidth(
                                { flex: 1 },
                                dimensions.width
                              )}
                            >
                              {/* selected */}
                              <>
                                {!(selectedTab2 === 'prepaidchart') ? null : (
                                  <Touchable>
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          borderBottomWidth: 3,
                                          borderColor: theme.colors['Primary'],
                                          height: 25,
                                          justifyContent: 'center',
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Text
                                        accessible={true}
                                        {...GlobalStyles.TextStyles(theme)[
                                          'Text'
                                        ].props}
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(
                                            GlobalStyles.TextStyles(theme)[
                                              'Text'
                                            ].style,
                                            {
                                              color:
                                                theme.colors['Custom Color'],
                                              fontFamily: 'Roboto_400Regular',
                                            }
                                          ),
                                          dimensions.width
                                        )}
                                      >
                                        {transalate(Variables, 'Chart')}
                                      </Text>
                                    </View>
                                  </Touchable>
                                )}
                              </>
                              {/* unselected */}
                              <>
                                {!(selectedTab2 !== 'prepaidchart') ? null : (
                                  <Touchable
                                    onPress={() => {
                                      try {
                                        setSelectedTab2('prepaidchart');
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                  >
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          borderBottomWidth: 2,
                                          borderColor: theme.colors['Light'],
                                          height: 25,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Text
                                        accessible={true}
                                        {...GlobalStyles.TextStyles(theme)[
                                          'Text'
                                        ].props}
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(
                                            GlobalStyles.TextStyles(theme)[
                                              'Text'
                                            ].style,
                                            {
                                              color: theme.colors['Light'],
                                              fontFamily: 'Roboto_400Regular',
                                            }
                                          ),
                                          dimensions.width
                                        )}
                                      >
                                        {transalate(Variables, 'Chart')}
                                      </Text>
                                    </View>
                                  </Touchable>
                                )}
                              </>
                            </View>
                          </View>
                          {/* table */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              },
                              dimensions.width
                            )}
                          >
                            {/* prepaidtable */}
                            <View
                              style={StyleSheet.applyWidth(
                                { flex: 1 },
                                dimensions.width
                              )}
                            >
                              {/* selected */}
                              <>
                                {!(selectedTab2 === 'prepaidtable') ? null : (
                                  <Touchable>
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          borderBottomWidth: 3,
                                          borderColor: theme.colors['Primary'],
                                          height: 25,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Text
                                        accessible={true}
                                        {...GlobalStyles.TextStyles(theme)[
                                          'Text'
                                        ].props}
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(
                                            GlobalStyles.TextStyles(theme)[
                                              'Text'
                                            ].style,
                                            {
                                              color:
                                                theme.colors['Custom Color'],
                                              fontFamily: 'Roboto_400Regular',
                                            }
                                          ),
                                          dimensions.width
                                        )}
                                      >
                                        {transalate(Variables, 'Table')}
                                      </Text>
                                    </View>
                                  </Touchable>
                                )}
                              </>
                              {/* unselected */}
                              <>
                                {!(selectedTab2 !== 'prepaidtable') ? null : (
                                  <Touchable
                                    onPress={() => {
                                      try {
                                        setSelectedTab2('prepaidtable');
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                  >
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          borderBottomWidth: 2,
                                          borderColor: theme.colors['Light'],
                                          height: 25,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Text
                                        accessible={true}
                                        {...GlobalStyles.TextStyles(theme)[
                                          'Text'
                                        ].props}
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(
                                            GlobalStyles.TextStyles(theme)[
                                              'Text'
                                            ].style,
                                            {
                                              color: theme.colors['Light'],
                                              fontFamily: 'Roboto_400Regular',
                                            }
                                          ),
                                          dimensions.width
                                        )}
                                      >
                                        {transalate(Variables, 'Table')}
                                      </Text>
                                    </View>
                                  </Touchable>
                                )}
                              </>
                            </View>
                          </View>
                        </View>
                      )}
                    </>
                    {/* prepaidchart */}
                    <>
                      {!(selectedTab2 === 'prepaidchart') ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            { flex: 1 },
                            dimensions.width
                          )}
                        >
                          <>
                            {!prepaidBillingHistory ? null : (
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignItems: 'center',
                                    flex: 1,
                                    justifyContent: 'center',
                                    paddingRight: 10,
                                    width: '100%',
                                  },
                                  dimensions.width
                                )}
                              >
                                <>
                                  {!(prepaidFlag === 'Y') ? null : (
                                    <Utils.CustomCodeErrorBoundary>
                                      <PrepaidMonthlyUsage.LineChartComponent
                                        prepaidBillingHistory={
                                          prepaidBillingHistory
                                        }
                                      />
                                    </Utils.CustomCodeErrorBoundary>
                                  )}
                                </>
                              </View>
                            )}
                          </>
                        </View>
                      )}
                    </>
                    {/* prepaidtable */}
                    <>
                      {!(selectedTab2 === 'prepaidtable') ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              backgroundColor: 'rgb(211, 211, 211)',
                              borderBottomWidth: 1,
                              borderColor: 'rgb(211, 211, 211)',
                              borderLeftWidth: 1,
                              borderRightWidth: 1,
                              borderTopLeftRadius: 5,
                              borderTopRightRadius: 5,
                              borderTopWidth: 1,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              width: '100%',
                            },
                            dimensions.width
                          )}
                        >
                          {/* Bill Month */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                borderColor: theme.colors['White'],
                                borderRightWidth: 1,
                                flex: 1,
                              },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor: theme.colors['ViewBG'],
                                  height: 40,
                                  justifyContent: 'center',
                                },
                                dimensions.width
                              )}
                            >
                              <Text
                                accessible={true}
                                {...GlobalStyles.TextStyles(theme)['Text']
                                  .props}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)['Text']
                                      .style,
                                    {
                                      color: 'rgb(42, 42, 42)',
                                      fontFamily: 'Roboto_700Bold',
                                      textAlign: 'center',
                                      textTransform: 'capitalize',
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {transalate(Variables, 'Bill month')}
                              </Text>
                            </View>
                          </View>
                          {/* Units */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                borderColor: theme.colors['White'],
                                borderRightWidth: 1,
                                flex: 1,
                              },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor: theme.colors['ViewBG'],
                                  height: 40,
                                  justifyContent: 'center',
                                },
                                dimensions.width
                              )}
                            >
                              <Text
                                accessible={true}
                                {...GlobalStyles.TextStyles(theme)['Text']
                                  .props}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)['Text']
                                      .style,
                                    {
                                      color: 'rgb(42, 42, 42)',
                                      fontFamily: 'Roboto_700Bold',
                                      textAlign: 'center',
                                      textTransform: 'capitalize',
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {transalate(Variables, 'Units(Kwh)')}
                              </Text>
                            </View>
                          </View>
                        </View>
                      )}
                    </>
                    {/* prepaid list */}
                    <FlatList
                      data={prepaidBillingHistory}
                      horizontal={false}
                      inverted={false}
                      keyExtractor={(prepaidListData, index) =>
                        prepaidListData?.id ??
                        prepaidListData?.uuid ??
                        index.toString()
                      }
                      keyboardShouldPersistTaps={'never'}
                      listKey={'XhsxSbaz'}
                      nestedScrollEnabled={false}
                      numColumns={1}
                      onEndReachedThreshold={0.5}
                      renderItem={({ item, index }) => {
                        const prepaidListData = item;
                        return (
                          <>
                            {/* prepaidtable */}
                            <>
                              {!(selectedTab2 === 'prepaidtable') ? null : (
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      borderBottomWidth: 1,
                                      borderColor: 'rgb(211, 211, 211)',
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
                                      paddingBottom: 10,
                                      paddingLeft: 20,
                                      paddingRight: 20,
                                      paddingTop: 10,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {/* Bill Month */}
                                  <View>
                                    {/* text */}
                                    <Text
                                      accessible={true}
                                      {...GlobalStyles.TextStyles(theme)['Text']
                                        .props}
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.TextStyles(theme)['Text']
                                            .style,
                                          {
                                            color: 'rgb(42, 42, 42)',
                                            fontFamily: 'Roboto_400Regular',
                                            fontSize: 16,
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                    >
                                      {prepaidListData?.lp_date}
                                    </Text>
                                  </View>
                                  {/* Units */}
                                  <View>
                                    <Text
                                      accessible={true}
                                      {...GlobalStyles.TextStyles(theme)['Text']
                                        .props}
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.TextStyles(theme)['Text']
                                            .style,
                                          {
                                            color: 'rgb(42, 42, 42)',
                                            fontFamily: 'Roboto_400Regular',
                                            fontSize: 16,
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                    >
                                      {valueFix(prepaidListData?.kwh)}
                                    </Text>
                                  </View>
                                </View>
                              )}
                            </>
                          </>
                        );
                      }}
                      showsHorizontalScrollIndicator={true}
                      showsVerticalScrollIndicator={true}
                    />
                  </View>
                )}
              </>
              {/* Range View */}
              <>
                {!(mainselectedTab === 'Range View') ? null : (
                  <View>
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        },
                        dimensions.width
                      )}
                    >
                      {/* From date */}
                      <View>
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['Text'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'].style,
                              { fontFamily: 'Roboto_400Regular' }
                            ),
                            dimensions.width
                          )}
                        >
                          {transalate(Variables, 'Select From Date')}
                        </Text>
                        <DatePicker
                          autoDismissKeyboard={true}
                          disabled={false}
                          hideLabel={false}
                          label={'Date'}
                          leftIconMode={'inset'}
                          onDateChange={newDatePickerValue => {
                            const handler = async () => {
                              const date = newDatePickerValue;
                              try {
                                const valueuR9ljjY5 = newDatePickerValue;
                                setDatePickerValue2(valueuR9ljjY5);
                                const DateResult1 = valueuR9ljjY5;
                                const finalformate1 =
                                  convertDateTimeSplit(DateResult1);
                                setFinalformate1(finalformate1);
                                /* hidden 'Log to Console' action */
                                const prepaidconsumptionrangeJson =
                                  await (async () => {
                                    if (prepaidFlag === 'Y') {
                                      return (
                                        await CISAPPApi.consumptionPatternRangePOST(
                                          Constants,
                                          {
                                            accountno: Constants['name'],
                                            action:
                                              'consumptionPatternDaysRange',
                                            days: 'range',
                                            fromdate: finalformate1,
                                            mtrno: meterNumber,
                                            todate: finalformate2,
                                          }
                                        )
                                      )?.json;
                                    }
                                  })();
                                const prepaidrangeconsumptionResult =
                                  JSON.parse(
                                    prepaidconsumptionrangeJson &&
                                      prepaidconsumptionrangeJson[0].data.data
                                  );
                                setPrepaidRangeConsumption(
                                  prepaidrangeconsumptionResult
                                );
                              } catch (err) {
                                console.error(err);
                              }
                            };
                            handler();
                          }}
                          type={'solid'}
                          date={datePickerValue2}
                          leftIconName={'MaterialIcons/date-range'}
                          mode={'date'}
                        />
                      </View>
                      {/* To date */}
                      <View>
                        {/* Text 2 */}
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['Text'].props}
                          style={StyleSheet.applyWidth(
                            GlobalStyles.TextStyles(theme)['Text'].style,
                            dimensions.width
                          )}
                        >
                          {transalate(Variables, 'Select To Date')}
                        </Text>
                        {/* Date Picker 2 */}
                        <DatePicker
                          autoDismissKeyboard={true}
                          disabled={false}
                          hideLabel={false}
                          label={'Date'}
                          leftIconMode={'inset'}
                          mode={'date'}
                          onDateChange={newDatePicker2Value => {
                            const handler = async () => {
                              const date = newDatePicker2Value;
                              try {
                                const valueNqd9wnxV = newDatePicker2Value;
                                setDatePicker2Value(valueNqd9wnxV);
                                const DateResult2 = valueNqd9wnxV;
                                const finalformate2 =
                                  convertDateTimeSplit(DateResult2);
                                setFinalformate2(finalformate2);
                                console.log(finalformate2);
                                const prepaidconsumptionrangeJson =
                                  await (async () => {
                                    if (prepaidFlag === 'Y') {
                                      return (
                                        await CISAPPApi.consumptionPatternRangePOST(
                                          Constants,
                                          {
                                            accountno: Constants['name'],
                                            action:
                                              'consumptionPatternDaysRange',
                                            days: 'range',
                                            fromdate: finalformate1,
                                            mtrno: meterNumber,
                                            todate: finalformate2,
                                          }
                                        )
                                      )?.json;
                                    }
                                  })();
                                const prepaidrangeconsumptionResult =
                                  JSON.parse(
                                    prepaidconsumptionrangeJson &&
                                      prepaidconsumptionrangeJson[0].data.data
                                  );
                                setPrepaidRangeConsumption(
                                  prepaidrangeconsumptionResult
                                );
                              } catch (err) {
                                console.error(err);
                              }
                            };
                            handler();
                          }}
                          type={'solid'}
                          date={datePicker2Value}
                          leftIconName={'MaterialIcons/date-range'}
                        />
                      </View>
                    </View>
                    {/* Prepaid Section header */}
                    <>
                      {!(prepaidFlag === 'Y') ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              flexDirection: 'row',
                              justifyContent: 'center',
                              marginTop: 10,
                              paddingBottom: 12,
                              paddingLeft: 20,
                              paddingRight: 20,
                            },
                            dimensions.width
                          )}
                        >
                          {/* Heading */}
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['Text'].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Text'].style,
                                {
                                  alignSelf: 'center',
                                  color: theme.colors['ShopAppBlue'],
                                  fontFamily: 'Roboto_400Regular',
                                  fontSize: 16,
                                  textAlign: 'center',
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {transalate(Variables, 'Range Usage')}
                          </Text>
                        </View>
                      )}
                    </>
                    {/* prepaidtabs */}
                    <>
                      {!(prepaidFlag === 'Y') ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            },
                            dimensions.width
                          )}
                        >
                          {/* chart */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              },
                              dimensions.width
                            )}
                          >
                            {/* prepaidrangechart */}
                            <View
                              style={StyleSheet.applyWidth(
                                { flex: 1 },
                                dimensions.width
                              )}
                            >
                              {/* selected */}
                              <>
                                {!(
                                  selectedrangeTab === 'prepaidrangechart'
                                ) ? null : (
                                  <Touchable>
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          borderBottomWidth: 3,
                                          borderColor: theme.colors['Primary'],
                                          height: 25,
                                          justifyContent: 'center',
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Text
                                        accessible={true}
                                        {...GlobalStyles.TextStyles(theme)[
                                          'Text'
                                        ].props}
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(
                                            GlobalStyles.TextStyles(theme)[
                                              'Text'
                                            ].style,
                                            {
                                              color:
                                                theme.colors['Custom Color'],
                                              fontFamily: 'Roboto_400Regular',
                                            }
                                          ),
                                          dimensions.width
                                        )}
                                      >
                                        {transalate(Variables, 'Chart')}
                                      </Text>
                                    </View>
                                  </Touchable>
                                )}
                              </>
                              {/* unselected */}
                              <>
                                {!(
                                  selectedrangeTab !== 'prepaidrangechart'
                                ) ? null : (
                                  <Touchable
                                    onPress={() => {
                                      try {
                                        setSelectedrangeTab(
                                          'prepaidrangechart'
                                        );
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                  >
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          borderBottomWidth: 2,
                                          borderColor: theme.colors['Light'],
                                          height: 25,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Text
                                        accessible={true}
                                        {...GlobalStyles.TextStyles(theme)[
                                          'Text'
                                        ].props}
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(
                                            GlobalStyles.TextStyles(theme)[
                                              'Text'
                                            ].style,
                                            {
                                              color: theme.colors['Light'],
                                              fontFamily: 'Roboto_400Regular',
                                            }
                                          ),
                                          dimensions.width
                                        )}
                                      >
                                        {transalate(Variables, 'Chart')}
                                      </Text>
                                    </View>
                                  </Touchable>
                                )}
                              </>
                            </View>
                          </View>
                          {/* table */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              },
                              dimensions.width
                            )}
                          >
                            {/* prepaidrangetable */}
                            <View
                              style={StyleSheet.applyWidth(
                                { flex: 1 },
                                dimensions.width
                              )}
                            >
                              {/* selected */}
                              <>
                                {!(
                                  selectedrangeTab === 'prepaidrangetable'
                                ) ? null : (
                                  <Touchable>
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          borderBottomWidth: 3,
                                          borderColor: theme.colors['Primary'],
                                          height: 25,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Text
                                        accessible={true}
                                        {...GlobalStyles.TextStyles(theme)[
                                          'Text'
                                        ].props}
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(
                                            GlobalStyles.TextStyles(theme)[
                                              'Text'
                                            ].style,
                                            {
                                              color:
                                                theme.colors['Custom Color'],
                                              fontFamily: 'Roboto_400Regular',
                                            }
                                          ),
                                          dimensions.width
                                        )}
                                      >
                                        {transalate(Variables, 'Table')}
                                      </Text>
                                    </View>
                                  </Touchable>
                                )}
                              </>
                              {/* unselected */}
                              <>
                                {!(
                                  selectedrangeTab !== 'prepaidrangetable'
                                ) ? null : (
                                  <Touchable
                                    onPress={() => {
                                      try {
                                        setSelectedrangeTab(
                                          'prepaidrangetable'
                                        );
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                  >
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          borderBottomWidth: 2,
                                          borderColor: theme.colors['Light'],
                                          height: 25,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Text
                                        accessible={true}
                                        {...GlobalStyles.TextStyles(theme)[
                                          'Text'
                                        ].props}
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(
                                            GlobalStyles.TextStyles(theme)[
                                              'Text'
                                            ].style,
                                            {
                                              color: theme.colors['Light'],
                                              fontFamily: 'Roboto_400Regular',
                                            }
                                          ),
                                          dimensions.width
                                        )}
                                      >
                                        {transalate(Variables, 'Table')}
                                      </Text>
                                    </View>
                                  </Touchable>
                                )}
                              </>
                            </View>
                          </View>
                        </View>
                      )}
                    </>
                    {/* prepaidrangechart */}
                    <>
                      {!(selectedrangeTab === 'prepaidrangechart') ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            { flex: 1 },
                            dimensions.width
                          )}
                        >
                          <>
                            {!prepaidRangeConsumption?.length ? null : (
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignItems: 'center',
                                    flex: 1,
                                    justifyContent: 'center',
                                    paddingRight: 10,
                                    width: '100%',
                                  },
                                  dimensions.width
                                )}
                              >
                                <>
                                  {!(prepaidFlag === 'Y') ? null : (
                                    <Utils.CustomCodeErrorBoundary>
                                      <prepaidRangeUsage.LineChartComponent
                                        prepaidRangeConsumption={
                                          prepaidRangeConsumption
                                        }
                                      />
                                    </Utils.CustomCodeErrorBoundary>
                                  )}
                                </>
                              </View>
                            )}
                          </>
                        </View>
                      )}
                    </>
                    {/* prepaidrangetable */}
                    <>
                      {!(selectedrangeTab === 'prepaidrangetable') ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              backgroundColor: 'rgb(211, 211, 211)',
                              borderBottomWidth: 1,
                              borderColor: 'rgb(211, 211, 211)',
                              borderLeftWidth: 1,
                              borderRightWidth: 1,
                              borderTopLeftRadius: 5,
                              borderTopRightRadius: 5,
                              borderTopWidth: 1,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              width: '100%',
                            },
                            dimensions.width
                          )}
                        >
                          {/* Bill Month */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                borderColor: theme.colors['White'],
                                borderRightWidth: 1,
                                flex: 1,
                              },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor: theme.colors['ViewBG'],
                                  height: 40,
                                  justifyContent: 'center',
                                },
                                dimensions.width
                              )}
                            >
                              <Text
                                accessible={true}
                                {...GlobalStyles.TextStyles(theme)['Text']
                                  .props}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)['Text']
                                      .style,
                                    {
                                      color: 'rgb(42, 42, 42)',
                                      fontFamily: 'Roboto_700Bold',
                                      textAlign: 'center',
                                      textTransform: 'capitalize',
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {transalate(Variables, 'Date')}
                              </Text>
                            </View>
                          </View>
                          {/* Units */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                borderColor: theme.colors['White'],
                                borderRightWidth: 1,
                                flex: 1,
                              },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor: theme.colors['ViewBG'],
                                  height: 40,
                                  justifyContent: 'center',
                                },
                                dimensions.width
                              )}
                            >
                              <Text
                                accessible={true}
                                {...GlobalStyles.TextStyles(theme)['Text']
                                  .props}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)['Text']
                                      .style,
                                    {
                                      color: 'rgb(42, 42, 42)',
                                      fontFamily: 'Roboto_700Bold',
                                      textAlign: 'center',
                                      textTransform: 'capitalize',
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {transalate(Variables, 'Units(Kwh)')}
                              </Text>
                            </View>
                          </View>
                        </View>
                      )}
                    </>
                    <SimpleStyleFlatList
                      data={prepaidRangeConsumption}
                      horizontal={false}
                      inverted={false}
                      keyExtractor={(listData, index) =>
                        listData?.id ?? listData?.uuid ?? index.toString()
                      }
                      keyboardShouldPersistTaps={'never'}
                      listKey={'ES9TGbfq'}
                      nestedScrollEnabled={false}
                      numColumns={1}
                      onEndReachedThreshold={0.5}
                      renderItem={({ item, index }) => {
                        const listData = item;
                        return (
                          <>
                            {/* prepaidrangetable */}
                            <>
                              {!(
                                selectedrangeTab === 'prepaidrangetable'
                              ) ? null : (
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      borderBottomWidth: 1,
                                      borderColor: 'rgb(216, 211, 211)',
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
                                      paddingBottom: 10,
                                      paddingLeft: 20,
                                      paddingRight: 20,
                                      paddingTop: 10,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  <View>
                                    <Text
                                      accessible={true}
                                      {...GlobalStyles.TextStyles(theme)['Text']
                                        .props}
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.TextStyles(theme)['Text']
                                            .style,
                                          {
                                            color: 'rgb(46, 45, 45)',
                                            fontFamily: 'Roboto_400Regular',
                                            fontSize: 16,
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                    >
                                      {listData?.lpDate}
                                    </Text>
                                  </View>
                                  {/* View 2 */}
                                  <View>
                                    <Text
                                      accessible={true}
                                      {...GlobalStyles.TextStyles(theme)['Text']
                                        .props}
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.TextStyles(theme)['Text']
                                            .style,
                                          {
                                            color: 'rgb(46, 45, 45)',
                                            fontFamily: 'Roboto_400Regular',
                                            fontSize: 16,
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                    >
                                      {listData?.kWImp}
                                    </Text>
                                  </View>
                                </View>
                              )}
                            </>
                          </>
                        );
                      }}
                      showsHorizontalScrollIndicator={true}
                      showsVerticalScrollIndicator={true}
                    />
                  </View>
                )}
              </>
              {/* Postpaid View */}
              <>
                {!(prepaidFlag === 'N') ? null : (
                  <View>
                    {/* section header */}
                    <>
                      {!(prepaidFlag === 'N') ? null : (
                        <View
                          {...GlobalStyles.ViewStyles(theme)['section header 2']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ViewStyles(theme)['section header 2']
                                .style,
                              { justifyContent: 'center', paddingBottom: 12 }
                            ),
                            dimensions.width
                          )}
                        >
                          {/* Heading */}
                          <Text
                            accessible={true}
                            style={StyleSheet.applyWidth(
                              {
                                alignSelf: 'center',
                                color: theme.colors['ShopAppBlue'],
                                fontFamily: 'Roboto_400Regular',
                                fontSize: 16,
                                textAlign: 'center',
                              },
                              dimensions.width
                            )}
                          >
                            {transalate(Variables, 'Usage')}
                          </Text>
                        </View>
                      )}
                    </>
                    {/* Tabs */}
                    <>
                      {!(prepaidFlag === 'N') ? null : (
                        <View
                          {...GlobalStyles.ViewStyles(theme)['Tabs'].props}
                          style={StyleSheet.applyWidth(
                            GlobalStyles.ViewStyles(theme)['Tabs'].style,
                            dimensions.width
                          )}
                        >
                          {/* tab1 */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              },
                              dimensions.width
                            )}
                          >
                            {/* Dashboard */}
                            <View
                              style={StyleSheet.applyWidth(
                                { flex: 1 },
                                dimensions.width
                              )}
                            >
                              {/* selected */}
                              <>
                                {!(selectedTab === 'Dashboard') ? null : (
                                  <Touchable>
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          borderBottomWidth: 3,
                                          borderColor:
                                            theme.colors['Custom Color'],
                                          height: 25,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Text
                                        accessible={true}
                                        style={StyleSheet.applyWidth(
                                          {
                                            color: theme.colors['Custom Color'],
                                            fontFamily: 'Roboto_400Regular',
                                            fontSize: 14,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {transalate(Variables, 'Chart')}
                                      </Text>
                                    </View>
                                  </Touchable>
                                )}
                              </>
                              {/* unselected */}
                              <>
                                {!(selectedTab !== 'Dashboard') ? null : (
                                  <Touchable
                                    onPress={() => {
                                      try {
                                        setSelectedTab('Dashboard');
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                  >
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          borderBottomWidth: 2,
                                          borderColor: theme.colors['Light'],
                                          height: 25,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Text
                                        accessible={true}
                                        style={StyleSheet.applyWidth(
                                          {
                                            color: theme.colors['Light'],
                                            fontFamily: 'Roboto_400Regular',
                                            fontSize: 14,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {transalate(Variables, 'Chart')}
                                      </Text>
                                    </View>
                                  </Touchable>
                                )}
                              </>
                            </View>
                          </View>
                          {/* tab2 */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              },
                              dimensions.width
                            )}
                          >
                            {/* Content */}
                            <View
                              style={StyleSheet.applyWidth(
                                { flex: 1 },
                                dimensions.width
                              )}
                            >
                              {/* selected */}
                              <>
                                {!(selectedTab === 'content') ? null : (
                                  <Touchable>
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          borderBottomWidth: 3,
                                          borderColor:
                                            theme.colors['Custom Color'],
                                          height: 25,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Text
                                        accessible={true}
                                        style={StyleSheet.applyWidth(
                                          {
                                            color: theme.colors['Custom Color'],
                                            fontFamily: 'Roboto_400Regular',
                                            fontSize: 14,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {transalate(Variables, 'Table')}
                                      </Text>
                                    </View>
                                  </Touchable>
                                )}
                              </>
                              {/* unselected */}
                              <>
                                {!(selectedTab !== 'content') ? null : (
                                  <Touchable
                                    onPress={() => {
                                      try {
                                        setSelectedTab('content');
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                  >
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          borderBottomWidth: 2,
                                          borderColor: theme.colors['Light'],
                                          height: 25,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Text
                                        accessible={true}
                                        style={StyleSheet.applyWidth(
                                          {
                                            color: theme.colors['Light'],
                                            fontFamily: 'Roboto_400Regular',
                                            fontSize: 14,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {transalate(Variables, 'Table')}
                                      </Text>
                                    </View>
                                  </Touchable>
                                )}
                              </>
                            </View>
                          </View>
                        </View>
                      )}
                    </>
                    {/* Details */}
                    <>
                      {!(selectedTab === 'content') ? null : (
                        <View
                          {...GlobalStyles.ViewStyles(theme)['Details'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ViewStyles(theme)['Details'].style,
                              {
                                backgroundColor: 'rgb(211, 211, 211)',
                                borderBottomWidth: 1,
                                borderColor: theme.colors['White'],
                                borderLeftWidth: 1,
                                borderRightWidth: 1,
                                borderTopLeftRadius: 5,
                                borderTopRightRadius: 5,
                                borderTopWidth: 1,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {/* Bill Month */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                borderColor: theme.colors['White'],
                                borderRightWidth: 1,
                                flex: 1,
                              },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor: theme.colors.viewBG,
                                  height: 40,
                                  justifyContent: 'center',
                                },
                                dimensions.width
                              )}
                            >
                              <Text
                                accessible={true}
                                style={StyleSheet.applyWidth(
                                  {
                                    color: 'rgb(42, 42, 42)',
                                    fontFamily: 'Roboto_700Bold',
                                    fontSize: 14,
                                    textAlign: 'center',
                                    textTransform: 'capitalize',
                                  },
                                  dimensions.width
                                )}
                              >
                                {transalate(Variables, 'Bill month')}
                              </Text>
                            </View>
                          </View>
                          {/* Units */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                borderColor: theme.colors['White'],
                                borderRightWidth: 1,
                                flex: 1,
                              },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor: theme.colors.viewBG,
                                  height: 40,
                                  justifyContent: 'center',
                                },
                                dimensions.width
                              )}
                            >
                              <Text
                                accessible={true}
                                style={StyleSheet.applyWidth(
                                  {
                                    color: 'rgb(42, 42, 42)',
                                    fontFamily: 'Roboto_700Bold',
                                    fontSize: 14,
                                    textAlign: 'center',
                                    textTransform: 'capitalize',
                                  },
                                  dimensions.width
                                )}
                              >
                                {'{'}
                                {transalate(Variables, 'Units(Kwh)')}
                              </Text>
                            </View>
                          </View>
                          {/* Cost */}
                          <View
                            style={StyleSheet.applyWidth(
                              { flex: 1 },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor: theme.colors.viewBG,
                                  height: 40,
                                  justifyContent: 'center',
                                },
                                dimensions.width
                              )}
                            >
                              <Text
                                accessible={true}
                                style={StyleSheet.applyWidth(
                                  {
                                    color: 'rgb(42, 42, 42)',
                                    fontFamily: 'Roboto_700Bold',
                                    fontSize: 14,
                                    textAlign: 'center',
                                    textTransform: 'capitalize',
                                  },
                                  dimensions.width
                                )}
                              >
                                {transalate(Variables, 'Bill Amount')}
                              </Text>
                            </View>
                          </View>
                        </View>
                      )}
                    </>
                    {/* postpaidList */}
                    <FlatList
                      data={billingHistoryScreen}
                      horizontal={false}
                      inverted={false}
                      keyExtractor={(postpaidListData, index) =>
                        postpaidListData?.id ??
                        postpaidListData?.uuid ??
                        index.toString()
                      }
                      keyboardShouldPersistTaps={'never'}
                      listKey={'FLmDdNKZ'}
                      nestedScrollEnabled={false}
                      numColumns={1}
                      onEndReachedThreshold={0.5}
                      renderItem={({ item, index }) => {
                        const postpaidListData = item;
                        return (
                          <>
                            {/* Details */}
                            <>
                              {!(selectedTab === 'content') ? null : (
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      borderBottomWidth: 1,
                                      borderColor: 'rgb(194, 190, 190)',
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
                                      paddingBottom: 10,
                                      paddingLeft: 20,
                                      paddingRight: 20,
                                      paddingTop: 10,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {/* Bill Month */}
                                  <View>
                                    {/* text */}
                                    <Text
                                      accessible={true}
                                      {...GlobalStyles.TextStyles(theme)['Text']
                                        .props}
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.TextStyles(theme)['Text']
                                            .style,
                                          {
                                            color: 'rgb(42, 42, 42)',
                                            fontFamily: 'Roboto_400Regular',
                                            fontSize: 16,
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                    >
                                      {convertMonthNoToMonthName(
                                        postpaidListData?.billmonth
                                      )}{' '}
                                    </Text>
                                  </View>
                                  {/* Units */}
                                  <View>
                                    <Text
                                      accessible={true}
                                      {...GlobalStyles.TextStyles(theme)['Text']
                                        .props}
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.TextStyles(theme)['Text']
                                            .style,
                                          {
                                            color: 'rgb(42, 42, 42)',
                                            fontFamily: 'Roboto_400Regular',
                                            fontSize: 16,
                                            textAlign: 'right',
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                    >
                                      {postpaidListData?.BILLuNITS}
                                    </Text>
                                  </View>
                                  {/* Cost */}
                                  <View>
                                    <Text
                                      accessible={true}
                                      {...GlobalStyles.TextStyles(theme)['Text']
                                        .props}
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.TextStyles(theme)['Text']
                                            .style,
                                          {
                                            alignSelf: 'flex-start',
                                            color: 'rgb(42, 42, 42)',
                                            fontFamily: 'Roboto_400Regular',
                                            fontSize: 16,
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                    >
                                      {'₹'}
                                      {postpaidListData?.BillAmount}
                                    </Text>
                                  </View>
                                </View>
                              )}
                            </>
                          </>
                        );
                      }}
                      showsHorizontalScrollIndicator={true}
                      showsVerticalScrollIndicator={true}
                    />
                  </View>
                )}
              </>
            </View>
          </View>
        </ScrollView>
      </View>
      {/* botem tab1 */}
      <View
        {...GlobalStyles.ViewStyles(theme)['botem tab'].props}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.ViewStyles(theme)['botem tab'].style,
            {
              alignItems: 'stretch',
              paddingBottom: 10,
              paddingLeft: 20,
              paddingRight: 20,
            }
          ),
          dimensions.width
        )}
      >
        {/* Home */}
        <Touchable
          onPress={() => {
            try {
              setServiceConNumber(props.route?.params?.Name ?? '');
              navigation.navigate('DashboardScreen', {
                name: Constants['name'],
              });
            } catch (err) {
              console.error(err);
            }
          }}
          activeOpacity={0.8}
          disabledOpacity={0.8}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                height: 48,
                justifyContent: 'center',
                width: 50,
              },
              dimensions.width
            )}
          >
            <Icon
              size={24}
              color={theme.colors['Community_Light_Black']}
              name={'Entypo/home'}
            />
            <Text
              accessible={true}
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  {
                    color: theme.colors['Community_Light_Black'],
                    fontFamily: 'Roboto_400Regular',
                  }
                ),
                dimensions.width
              )}
            >
              {transalate(Variables, 'Home')}
            </Text>
          </View>
        </Touchable>
        {/* Usage */}
        <Touchable
          onPress={() => {
            try {
              setServiceConNumber(props.route?.params?.Name ?? '');
              navigation.navigate('UsageScreen', { name: Constants['name'] });
            } catch (err) {
              console.error(err);
            }
          }}
          activeOpacity={0.8}
          disabledOpacity={0.8}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                height: 48,
                justifyContent: 'center',
                width: 50,
              },
              dimensions.width
            )}
          >
            <Icon
              size={24}
              color={theme.colors['Community_Dark_UI']}
              name={'FontAwesome/bar-chart-o'}
            />
            <Text
              accessible={true}
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  {
                    color: theme.colors['Community_Dark_UI'],
                    fontFamily: 'Roboto_400Regular',
                  }
                ),
                dimensions.width
              )}
            >
              {transalate(Variables, 'Usage')}
            </Text>
          </View>
        </Touchable>
        {/* Billing */}
        <Touchable
          onPress={() => {
            try {
              setServiceConNumber(props.route?.params?.Name ?? '');
              navigation.navigate('BillingScreen', { name: Constants['name'] });
            } catch (err) {
              console.error(err);
            }
          }}
          activeOpacity={0.8}
          disabledOpacity={0.8}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                height: 48,
                justifyContent: 'center',
                width: 50,
              },
              dimensions.width
            )}
          >
            <Icon
              size={24}
              color={theme.colors['Community_Light_Black']}
              name={'Entypo/text-document-inverted'}
            />
            <Text
              accessible={true}
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  {
                    color: theme.colors['Community_Light_Black'],
                    fontFamily: 'Roboto_400Regular',
                  }
                ),
                dimensions.width
              )}
            >
              {transalate(Variables, 'Billing')}
            </Text>
          </View>
        </Touchable>
        {/* Payments */}
        <Touchable
          onPress={() => {
            try {
              setServiceConNumber(props.route?.params?.Name ?? '');
              navigation.navigate('PaymentsScreen', {
                name: Constants['name'],
              });
            } catch (err) {
              console.error(err);
            }
          }}
          activeOpacity={0.8}
          disabledOpacity={0.8}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                height: 48,
                justifyContent: 'center',
                width: 65,
              },
              dimensions.width
            )}
          >
            <Icon
              size={24}
              color={theme.colors['Community_Light_Black']}
              name={'MaterialIcons/payments'}
            />
            <Text
              accessible={true}
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  {
                    color: theme.colors['Community_Light_Black'],
                    fontFamily: 'Roboto_400Regular',
                  }
                ),
                dimensions.width
              )}
            >
              {transalate(Variables, 'Payments')}
            </Text>
          </View>
        </Touchable>
        {/* Support */}
        <>
          {!(prepaidFlag === 'N') ? null : (
            <Touchable
              onPress={() => {
                try {
                  navigation.navigate('CheckTicketStatusScreen');
                } catch (err) {
                  console.error(err);
                }
              }}
              activeOpacity={0.8}
              disabled={false}
              disabledOpacity={0.8}
            >
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    height: 48,
                    justifyContent: 'center',
                    width: 55,
                  },
                  dimensions.width
                )}
              >
                <Icon
                  size={24}
                  color={theme.colors['Community_Light_Black']}
                  name={'MaterialIcons/support-agent'}
                />
                <Text
                  accessible={true}
                  {...GlobalStyles.TextStyles(theme)['Text'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Text'].style,
                      {
                        color: theme.colors['Community_Light_Black'],
                        fontFamily: 'Roboto_400Regular',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {transalate(Variables, 'Support')}
                </Text>
              </View>
            </Touchable>
          )}
        </>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(UsageScreen);
