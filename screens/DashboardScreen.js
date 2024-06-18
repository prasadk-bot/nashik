import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as CISAPPApi from '../apis/CISAPPApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as CustomCode from '../custom-files/CustomCode';
import transalate from '../global-functions/transalate';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Button,
  Checkbox,
  Circle,
  CircleImage,
  Icon,
  LinearProgress,
  Picker,
  ScreenContainer,
  Surface,
  Swiper,
  SwiperItem,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Fetch } from 'react-request';

const DashboardScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [Currentload, setCurrentload] = React.useState('');
  const [Currentread, setCurrentread] = React.useState('');
  const [LateastDate, setLateastDate] = React.useState('');
  const [Todayusage, setTodayusage] = React.useState('');
  const [accountno, setAccountno] = React.useState('');
  const [availableBalance, setAvailableBalance] = React.useState('');
  const [consumerName, setConsumerName] = React.useState('');
  const [consumerScNo, setConsumerScNo] = React.useState('');
  const [createDate, setCreateDate] = React.useState('');
  const [hiddenHindi, setHiddenHindi] = React.useState(true);
  const [icon1, setIcon1] = React.useState(false);
  const [icon2, setIcon2] = React.useState(false);
  const [meterNumber, setMeterNumber] = React.useState('');
  const [meterStatus, setMeterStatus] = React.useState('');
  const [password1, setPassword1] = React.useState('');
  const [pickerValue, setPickerValue] = React.useState('');
  const [pickerValue2, setPickerValue2] = React.useState('');
  const [pickerValue3, setPickerValue3] = React.useState('');
  const [prepaidFlag, setPrepaidFlag] = React.useState('');
  const [rechargeAmount, setRechargeAmount] = React.useState('');
  const [showNav, setShowNav] = React.useState(false);
  const [textInputValue, setTextInputValue] = React.useState('');
  const [upIcon3, setUpIcon3] = React.useState(true);
  const [viewPrepaidDetails, setViewPrepaidDetails] = React.useState({});
  const [viewbilldetails, setViewbilldetails] = React.useState({});
  const [visibleHindi, setVisibleHindi] = React.useState(false);
  const buildString = Scno => {
    console.log(`billing/rest/getBillDataWss/${Scno}`);
    return `billing/rest/getBillDataWss/${Scno}`;
  };

  const manageAccountFun = ManageAccountDetails => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */

    return ManageAccountDetails.map(team => {
      return { label: team.new_added_account, value: team.new_added_account };
    });
  };

  const buildConsumerString = Scno => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */

    console.log(`billing/rest/AccountInfo/${Scno}`);
    return `billing/rest/AccountInfo/${Scno}`;
  };

  const prepaidmeterstatus = metetno => {
    console.log(`/SPM/getCurrentBalance?meterNumberOrAccountNo=${metetno}`);
    return `/SPM/getCurrentBalance?meterNumberOrAccountNo=${metetno}`;
  };

  const valueFix = val => {
    return val.toFixed(2);
  };
  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        console.log(Constants['name']);
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
        console.log(prepaidFlag);
        setPrepaidFlag(prepaidFlag);
        const meterNo = (consumerDetailsJson && consumerDetailsJson[0])?.data
          ?.meterNumber;
        console.log(meterNo);
        setMeterNumber(meterNo);
        const Scno = (consumerDetailsJson && consumerDetailsJson[0])?.data
          ?.scno;
        setGlobalVariableValue({
          key: 'consumerScNo',
          value: Scno,
        });
        console.log(Scno);
        const Name = (consumerDetailsJson && consumerDetailsJson[0])?.data
          ?.name;
        setConsumerName(Name);
        const Billdetailsjson = await (async () => {
          if (prepaidFlag === 'N') {
            return (
              await CISAPPApi.viewBillDetailsPOST(Constants, {
                action: buildString(Constants['name']),
              })
            )?.json;
          }
        })();
        buildString(Constants['name']);

        const valueRLLbos15 =
          Billdetailsjson && Billdetailsjson[0].data.BillDataJson[0];
        setViewbilldetails(valueRLLbos15);
        const Billdetailslog = valueRLLbos15;
        const prepaiddetailsJson = await (async () => {
          if (prepaidFlag === 'Y') {
            return (
              await CISAPPApi.prepaidMeterStatuesPOST(Constants, {
                action: prepaidmeterstatus(meterNo),
              })
            )?.json;
          }
        })();
        console.log(prepaiddetailsJson);
        const availableBalance2 = (prepaiddetailsJson && prepaiddetailsJson[0])
          ?.data?.data[0]?.availBalance;
        const avb = valueFix(availableBalance2);
        setAvailableBalance(avb);
        if (prepaidFlag === 'Y') {
          console.log(availableBalance2);
        }
        const rechargeAmountResult = (
          prepaiddetailsJson && prepaiddetailsJson[0]
        )?.data?.data[0]?.rechargeAmount;
        setRechargeAmount(rechargeAmountResult);
        const createDateResult = (prepaiddetailsJson && prepaiddetailsJson[0])
          ?.data?.data[0]?.createDate;
        setCreateDate(createDateResult);
        const meterStatusResult = (prepaiddetailsJson && prepaiddetailsJson[0])
          ?.data?.data[0]?.meterStatus;
        setMeterStatus(meterStatusResult);
        const TodayDetailsJson = (
          await CISAPPApi.todayDetailsPOST(Constants, { mtrno: meterNo })
        )?.json;
        console.log(TodayDetailsJson);
        const LateastDate = (TodayDetailsJson && TodayDetailsJson[0])?.data[0]
          ?.READ_DATE;
        setLateastDate(LateastDate);
        const Todayusage = (TodayDetailsJson && TodayDetailsJson[0])?.data[0]
          ?.KWH_IMP;
        setTodayusage(Todayusage);
        const Currentload = (TodayDetailsJson && TodayDetailsJson[0])?.data[0]
          ?.KVA_IMP;
        setCurrentload(Currentload);
        const Currentread = (TodayDetailsJson && TodayDetailsJson[0])?.data[0]
          ?.MAX_KW;
        setCurrentread(Currentread);
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
        {!showNav ? null : (
          <Surface
            elevation={0}
            style={StyleSheet.applyWidth(
              {
                alignSelf: 'center',
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
                      setShowNav(false);
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
                      setShowNav(false);
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
                      setShowNav(false);
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
                    setShowNav(!showNav);
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
          status={showNav}
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
            {transalate(Variables, 'Home')}
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
                setPickerValue3(newPickerValue);
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
            value={pickerValue3}
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
          { flex: 1, flexBasis: 1, justifyContent: 'flex-start' },
          dimensions.width
        )}
      >
        {/* Welcome View */}
        <View
          style={StyleSheet.applyWidth(
            { paddingLeft: 20, paddingRight: 20 },
            dimensions.width
          )}
        >
          {/* Welcome Text */}
          <Text
            accessible={true}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
                fontFamily: 'Roboto_400Regular',
                fontSize: 16,
              }),
              dimensions.width
            )}
          >
            {transalate(Variables, 'Welcome')}
          </Text>
          {/* Name Text */}
          <Text
            accessible={true}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
                color: theme.colors['Strong'],
                fontFamily: 'Roboto_700Bold',
                fontSize: 20,
                marginTop: 5,
              }),
              dimensions.width
            )}
          >
            {consumerName}
          </Text>
        </View>
        {/* Body */}
        <View
          style={StyleSheet.applyWidth(
            { justifyContent: 'flex-start', marginTop: 10 },
            dimensions.width
          )}
        >
          {/* amblock */}
          <View
            style={StyleSheet.applyWidth(
              { paddingLeft: 20, paddingRight: 20 },
              dimensions.width
            )}
          >
            {/* viewbilldetails */}
            <View
              {...GlobalStyles.ViewStyles(theme)['viewbilldetails'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ViewStyles(theme)['viewbilldetails'].style,
                  { justifyContent: 'flex-start' }
                ),
                dimensions.width
              )}
            >
              {/* Enter customer service number */}
              <View
                {...GlobalStyles.ViewStyles(theme)['user name'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ViewStyles(theme)['user name'].style,
                    { paddingLeft: 20, paddingRight: 20 }
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
                        const Scno = (
                          consumerDetailsJson && consumerDetailsJson[0]
                        )?.data?.scno;
                        setGlobalVariableValue({
                          key: 'consumerScNo',
                          value: Scno,
                        });
                        console.log(Scno);
                        const Name = (
                          consumerDetailsJson && consumerDetailsJson[0]
                        )?.data?.name;
                        setConsumerName(Name);
                        const Billdetailsjson = await (async () => {
                          if (prepaidFlag === 'N') {
                            return (
                              await CISAPPApi.viewBillDetailsPOST(Constants, {
                                action: buildString(newPickerValue),
                              })
                            )?.json;
                          }
                        })();
                        buildString(newPickerValue);

                        const valueGjvi3qdF =
                          Billdetailsjson &&
                          Billdetailsjson[0].data.BillDataJson[0];
                        setViewbilldetails(valueGjvi3qdF);
                        const Billdetailslog = valueGjvi3qdF;
                        const prepaiddetailsJson = await (async () => {
                          if (prepaidFlag === 'Y') {
                            return (
                              await CISAPPApi.prepaidApiPOST(Constants, {
                                mtrno: meterNo,
                              })
                            )?.json;
                          }
                        })();
                        console.log(prepaiddetailsJson);
                        const availableBalance = (
                          prepaiddetailsJson && prepaiddetailsJson[0]
                        )?.data[0]?.avail_balance;
                        console.log(availableBalance);
                        setAvailableBalance(availableBalance);
                        const TodayDetailsJson = (
                          await CISAPPApi.todayDetailsPOST(Constants, {
                            mtrno: meterNo,
                          })
                        )?.json;
                        console.log(TodayDetailsJson);
                        const LateastDate = (
                          TodayDetailsJson && TodayDetailsJson[0]
                        )?.data[0]?.READ_DATE;
                        setLateastDate(LateastDate);
                        const Todayusage = (
                          TodayDetailsJson && TodayDetailsJson[0]
                        )?.data[0]?.KWH_IMP;
                        setTodayusage(Todayusage);
                        const Currentload = (
                          TodayDetailsJson && TodayDetailsJson[0]
                        )?.data[0]?.KVA_IMP;
                        setCurrentload(Currentload);
                        const Currentread = (
                          TodayDetailsJson && TodayDetailsJson[0]
                        )?.data[0]?.MAX_KW;
                        setCurrentread(Currentread);
                        const prepaiddeatailsJson = await (async () => {
                          if (prepaidFlag === 'Y') {
                            return (
                              await CISAPPApi.prepaidMeterStatuesPOST(
                                Constants,
                                { action: prepaidmeterstatus(meterNo) }
                              )
                            )?.json;
                          }
                        })();
                        const availableBalance2 = (
                          prepaiddetailsJson && prepaiddetailsJson[0]
                        )?.data?.data[0]?.availBalance;
                        const avb = valueFix(availableBalance2);
                        setAvailableBalance(avb);
                        const rechargeAmountResult = (
                          prepaiddetailsJson && prepaiddetailsJson[0]
                        )?.data?.data[0]?.rechargeAmount;
                        setRechargeAmount(rechargeAmountResult);
                        const createDateResult = (
                          prepaiddetailsJson && prepaiddetailsJson[0]
                        )?.data?.data[0]?.createdBy;
                        setCreateDate(createDateResult);
                        const meterStatusResult = (
                          prepaiddetailsJson && prepaiddetailsJson[0]
                        )?.data?.data[0]?.meterStatus;
                        setMeterStatus(meterStatusResult);
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
                      fontFamily: 'Roboto_400Regular',
                      width: '95%',
                    },
                    dimensions.width
                  )}
                  value={textInputValue}
                />
              </View>
            </View>

            <View
              {...GlobalStyles.ViewStyles(theme)['postpaid view 2'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ViewStyles(theme)['postpaid view 2'].style,
                  { marginBottom: 5, marginTop: 15 }
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
                        { fontFamily: 'Roboto_400Regular', textAlign: 'right' }
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
                        { fontFamily: 'Roboto_400Regular', textAlign: 'right' }
                      ),
                      dimensions.width
                    )}
                  >
                    {transalate(Variables, 'Postpaid')}
                  </Text>
                )}
              </>
            </View>
            {/* postpaid */}
            <>
              {!(prepaidFlag === 'N') ? null : (
                <View
                  {...GlobalStyles.ViewStyles(theme)['card'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ViewStyles(theme)['card'].style,
                      {
                        backgroundColor: 'rgb(255, 255, 255)',
                        borderColor: 'rgb(199, 198, 198)',
                        borderRadius: 8,
                        borderWidth: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 15,
                        marginTop: 5,
                        paddingBottom: 10,
                        paddingLeft: 20,
                        paddingTop: 10,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      { alignSelf: 'auto' },
                      dimensions.width
                    )}
                  >
                    {/* Amount due */}
                    <Text
                      accessible={true}
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors.strong,
                          fontFamily: 'Roboto_400Regular',
                          fontSize: 14,
                          opacity: 1,
                        },
                        dimensions.width
                      )}
                    >
                      {transalate(Variables, 'Amount due')}
                    </Text>
                    {/* Amount  */}
                    <Text
                      accessible={true}
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors.strong,
                          fontFamily: 'Roboto_700Bold',
                          fontSize: 14,
                          opacity: 1,
                        },
                        dimensions.width
                      )}
                    >
                      {'₹'}
                      {viewbilldetails?.LEDGERAMT}
                    </Text>
                    {/* Sub title */}
                    <Text
                      accessible={true}
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors.strong,
                          fontFamily: 'Roboto_400Regular',
                          fontSize: 12,
                          marginTop: 5,
                          opacity: 1,
                        },
                        dimensions.width
                      )}
                    >
                      {transalate(Variables, 'Due date')}
                      {': '}
                      {viewbilldetails?.BillDueDate}
                    </Text>
                  </View>
                  {/* View */}
                  <Button
                    iconPosition={'left'}
                    onPress={() => {
                      try {
                        navigation.navigate('ViewBillScreen', {
                          billYear: viewbilldetails?.BillYear,
                          BillIssueDate: viewbilldetails?.BillIssueDate,
                          netcurrbill: viewbilldetails?.netcurrbill,
                          ledgerAmt: viewbilldetails?.LEDGERAMT,
                          BillDame: viewbilldetails?.BillIssueDate,
                          BillMonth: viewbilldetails?.BillMonth,
                          Scno: viewbilldetails?.Scno,
                          Name: viewbilldetails?.Name,
                          RebateGiven: viewbilldetails?.RebateGiven,
                          Arrear: viewbilldetails?.Arrear,
                          BillAmount: viewbilldetails?.BillAmount,
                          BillDueDate: viewbilldetails?.BillDueDate,
                          BillNo: viewbilldetails?.BillNo,
                        });
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: theme.colors['GetFit Orange'],
                        borderRadius: 14,
                        fontFamily: 'Roboto_400Regular',
                        fontSize: 16,
                        height: 36,
                        marginTop: 5,
                        textAlign: 'center',
                        width: '23%',
                      },
                      dimensions.width
                    )}
                    title={`${transalate(Variables, 'View')}`}
                  />
                  {/* Pay Now */}
                  <Button
                    iconPosition={'left'}
                    onPress={() => {
                      try {
                        navigation.navigate('MakePaymentScreen', {
                          BillDame: viewbilldetails?.BillIssueDate,
                          BillDueDate: viewbilldetails?.BillDueDate,
                          BillAmount: viewbilldetails?.BillAmount,
                          Arrear: viewbilldetails?.Arrear,
                          RebateGiven: viewbilldetails?.RebateGiven,
                          netcurrbill: viewbilldetails?.netcurrbill,
                          BillIssueDate: viewbilldetails?.BillIssueDate,
                          Billid: viewbilldetails?.BillDetailsId,
                          accno: viewbilldetails?.AccNo,
                          BillNo: viewbilldetails?.BillNo,
                          ledgerAmt: viewbilldetails?.LEDGERAMT,
                          billYear: viewbilldetails?.BillYear,
                          Name: viewbilldetails?.Name,
                          Scno: viewbilldetails?.Scno,
                          BillMonth: viewbilldetails?.BillMonth,
                        });
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: theme.colors['GetFit Orange'],
                        borderRadius: 14,
                        fontFamily: 'Roboto_400Regular',
                        fontSize: 16,
                        height: 36,
                        marginTop: 5,
                        textAlign: 'center',
                        width: '30%',
                      },
                      dimensions.width
                    )}
                    title={`${transalate(Variables, 'Pay Now')}`}
                  />
                </View>
              )}
            </>
            {/* Prepaid  */}
            <>
              {!(prepaidFlag === 'Y') ? null : (
                <View
                  {...GlobalStyles.ViewStyles(theme)['card'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ViewStyles(theme)['card'].style,
                      {
                        backgroundColor: theme.colors['White'],
                        borderColor: 'rgb(199, 198, 198)',
                        borderRadius: 8,
                        borderWidth: 1,
                        justifyContent: 'space-evenly',
                        marginTop: 10,
                        paddingBottom: 10,
                        paddingLeft: 20,
                        paddingTop: 10,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      { flexDirection: 'row', justifyContent: 'space-around' },
                      dimensions.width
                    )}
                  >
                    {/* Current Balance */}
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
                        {transalate(Variables, 'Current Balance')}
                      </Text>
                      {/* Text 2 */}
                      <Text
                        accessible={true}
                        {...GlobalStyles.TextStyles(theme)['Text'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text'].style,
                            {
                              fontFamily: 'Roboto_700Bold',
                              fontSize: 25,
                              marginTop: 10,
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {' ₹'}
                        {availableBalance}
                      </Text>
                    </View>
                    {/* Meter Connected  */}
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
                          {transalate(Variables, 'Meter Connected')}
                        </Text>
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { marginLeft: 5 },
                            dimensions.width
                          )}
                        >
                          <>
                            {!(meterStatus === 'CONNECTED') ? null : (
                              <Touchable>
                                <Icon
                                  color={theme.colors['NFT_Time_Green']}
                                  name={'FontAwesome/check-circle'}
                                  size={20}
                                />
                              </Touchable>
                            )}
                          </>
                          {/* Touchable 2 */}
                          <>
                            {!(meterStatus !== 'CONNECTED') ? null : (
                              <Touchable>
                                <Icon
                                  color={theme.colors['NFT_TIME_Red']}
                                  name={'FontAwesome/minus-circle'}
                                  size={20}
                                />
                              </Touchable>
                            )}
                          </>
                        </View>
                      </View>
                      <Button
                        iconPosition={'left'}
                        onPress={() => {
                          try {
                            /* hidden 'Open Browser' action */
                            navigation.navigate('RechargeScreen', {
                              serviceConNo: consumerScNo,
                              Name: consumerName,
                            });
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        {...GlobalStyles.ButtonStyles(theme)['Submit 2'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ButtonStyles(theme)['Submit 2'].style,
                            {
                              backgroundColor: theme.colors['NFT_Time_Green'],
                              borderRadius: 16,
                              height: 36,
                              marginTop: 10,
                            }
                          ),
                          dimensions.width
                        )}
                        title={`${transalate(Variables, 'Recharge')}`}
                      />
                    </View>
                  </View>
                  {/* Updated Time View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center', marginTop: 15 },
                      dimensions.width
                    )}
                  >
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
                      {transalate(Variables, 'Last recharge of')}
                      {' ₹'}
                      {rechargeAmount} {transalate(Variables, 'on')}{' '}
                      {createDate}
                    </Text>
                  </View>
                </View>
              )}
            </>
            {/* Todays details  On change Value */}
            <>
              {!(prepaidFlag === 'Y') ? null : (
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: theme.colors['01987a'],
                      borderColor: 'rgb(247, 246, 246)',
                      borderRadius: 8,
                      borderStyle: 'dashed',
                      borderWidth: 1,
                      justifyContent: 'space-around',
                      marginTop: 20,
                    },
                    dimensions.width
                  )}
                >
                  {/* On change value Card */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        borderColor: 'rgb(255, 255, 255)',
                        flexDirection: 'row',
                        height: 81,
                        justifyContent: 'space-between',
                        paddingBottom: 10,
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingTop: 10,
                      },
                      dimensions.width
                    )}
                  >
                    {/* Arrow View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { marginTop: 10 },
                        dimensions.width
                      )}
                    >
                      {/* Up Touchable-1 */}
                      <>
                        {!icon1 ? null : (
                          <Touchable
                            onPress={() => {
                              try {
                                setIcon1(false);
                                setIcon2(true);
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            <Icon size={24} name={'AntDesign/caretup'} />
                          </Touchable>
                        )}
                      </>
                      {/* Up Touchable-2 */}
                      <>
                        {!icon2 ? null : (
                          <Touchable
                            onPress={() => {
                              try {
                                setIcon2(false);
                                setUpIcon3(true);
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            <Icon size={24} name={'AntDesign/caretup'} />
                          </Touchable>
                        )}
                      </>
                      {/* Up Touchable-3 */}
                      <>
                        {!upIcon3 ? null : (
                          <Touchable disabled={upIcon3}>
                            <Icon size={24} name={'AntDesign/caretup'} />
                          </Touchable>
                        )}
                      </>
                      {/* Down Touchable-1 */}
                      <>
                        {!icon1 ? null : (
                          <Touchable
                            onPress={() => {
                              try {
                                setIcon1(false);
                                setIcon2(false);
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            disabled={icon1}
                          >
                            <Icon size={24} name={'AntDesign/caretdown'} />
                          </Touchable>
                        )}
                      </>
                      {/* Down Touchable-2 */}
                      <>
                        {!icon2 ? null : (
                          <Touchable
                            onPress={() => {
                              try {
                                setIcon2(false);
                                setIcon1(true);
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            <Icon size={24} name={'AntDesign/caretdown'} />
                          </Touchable>
                        )}
                      </>
                      {/* Down Touchable-3 */}
                      <>
                        {!upIcon3 ? null : (
                          <Touchable
                            onPress={() => {
                              try {
                                setUpIcon3(false);
                                setIcon2(true);
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            <Icon size={24} name={'AntDesign/caretdown'} />
                          </Touchable>
                        )}
                      </>
                    </View>
                    {/* Text View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { alignItems: 'center', marginTop: 18 },
                        dimensions.width
                      )}
                    >
                      <>
                        {!icon1 ? null : (
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['Text'].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Text'].style,
                                {
                                  fontFamily: 'Roboto_400Regular',
                                  fontSize: 22,
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {Todayusage}
                          </Text>
                        )}
                      </>
                      {/* Text 2 */}
                      <>
                        {!icon2 ? null : (
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['Text'].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Text'].style,
                                {
                                  fontFamily: 'Roboto_400Regular',
                                  fontSize: 22,
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {Currentload}
                          </Text>
                        )}
                      </>
                      {/* Text 3 */}
                      <>
                        {!upIcon3 ? null : (
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['Text'].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Text'].style,
                                {
                                  fontFamily: 'Roboto_400Regular',
                                  fontSize: 22,
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {Currentread}
                          </Text>
                        )}
                      </>
                    </View>
                    {/* Value text */}
                    <View
                      style={StyleSheet.applyWidth(
                        { marginTop: 18 },
                        dimensions.width
                      )}
                    >
                      <>
                        {!icon1 ? null : (
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
                            {'KWH'}
                          </Text>
                        )}
                      </>
                      {/* Text 2 */}
                      <>
                        {!icon2 ? null : (
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
                            {'KVAH'}
                          </Text>
                        )}
                      </>
                      {/* Text 3 */}
                      <>
                        {!upIcon3 ? null : (
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
                            {'MDKW'}
                          </Text>
                        )}
                      </>
                    </View>
                  </View>
                </View>
              )}
            </>
          </View>
          {/* Consumption View */}
          <>
            {!(prepaidFlag === 'Y') ? null : (
              <View
                {...GlobalStyles.ViewStyles(theme)['Promotions'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ViewStyles(theme)['Promotions'].style,
                    {
                      height: 81,
                      justifyContent: 'center',
                      marginTop: 20,
                      paddingLeft: 16,
                      paddingRight: 16,
                    }
                  ),
                  dimensions.width
                )}
              >
                {/* Last Month Consumption */}
                <View
                  style={StyleSheet.applyWidth(
                    { flexDirection: 'row', justifyContent: 'space-between' },
                    dimensions.width
                  )}
                >
                  {/* Last Month consumption View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { width: '70%' },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      {...GlobalStyles.TextStyles(theme)['Text'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'].style,
                          {
                            color: theme.colors['Strong'],
                            fontFamily: 'Roboto_400Regular',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {transalate(Variables, 'Last Month Consumption')}
                      {':'}
                    </Text>
                    <LinearProgress
                      animationDuration={500}
                      color={theme.colors.primary}
                      indeterminate={false}
                      isAnimated={true}
                      lineCap={'round'}
                      showTrack={true}
                      trackColor={theme.colors.divider}
                      trackLineCap={'round'}
                      thickness={22}
                      value={Todayusage}
                    />
                  </View>

                  <View
                    style={StyleSheet.applyWidth(
                      { justifyContent: 'center' },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      {...GlobalStyles.TextStyles(theme)['Text'].props}
                      style={StyleSheet.applyWidth(
                        GlobalStyles.TextStyles(theme)['Text'].style,
                        dimensions.width
                      )}
                    >
                      {Todayusage}
                      {' Units'}
                    </Text>
                  </View>
                </View>
                {/* Current Month Consumption */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    },
                    dimensions.width
                  )}
                >
                  {/* Current Month consumption View  */}
                  <View
                    style={StyleSheet.applyWidth(
                      { width: '70%' },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      {...GlobalStyles.TextStyles(theme)['Text'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'].style,
                          {
                            color: theme.colors['Strong'],
                            fontFamily: 'Roboto_400Regular',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {transalate(Variables, 'Current Month Consumption')}
                      {':'}
                    </Text>
                    <LinearProgress
                      animationDuration={500}
                      color={theme.colors.primary}
                      indeterminate={false}
                      isAnimated={true}
                      lineCap={'round'}
                      showTrack={true}
                      trackColor={theme.colors.divider}
                      trackLineCap={'round'}
                      thickness={22}
                      value={Currentload}
                    />
                  </View>

                  <View
                    style={StyleSheet.applyWidth(
                      { justifyContent: 'center' },
                      dimensions.width
                    )}
                  >
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
                      {Currentload}
                      {' Units'}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </>
        </View>
      </View>
      {/* botem tab1 */}
      <View
        style={StyleSheet.applyWidth(
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 10,
            paddingLeft: 20,
            paddingRight: 20,
          },
          dimensions.width
        )}
      >
        {/* Home */}
        <Touchable
          onPress={() => {
            try {
              setTextInputValue(Constants['name']);
              navigation.navigate('DashboardScreen', {
                Name: props.route?.params?.Name ?? '',
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
              color={theme.colors['Community_Dark_UI']}
              name={'Entypo/home'}
            />
            <Text
              accessible={true}
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  { color: 'rgb(0,0,0)', fontFamily: 'Roboto_400Regular' }
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
              setTextInputValue(Constants['name']);
              navigation.navigate('UsageScreen', {
                name: Constants['name'],
                Name: props.route?.params?.Name ?? '',
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
              name={'FontAwesome/bar-chart-o'}
            />
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
              {transalate(Variables, 'Usage')}
            </Text>
          </View>
        </Touchable>
        {/* Billing */}
        <Touchable
          onPress={() => {
            try {
              setTextInputValue(Constants['name']);
              navigation.navigate('BillingScreen', {
                name: Constants['name'],
                Name: props.route?.params?.Name ?? '',
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
              name={'Entypo/text-document-inverted'}
            />
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
              {transalate(Variables, 'Billing')}
            </Text>
          </View>
        </Touchable>
        {/* Payments */}
        <Touchable
          onPress={() => {
            try {
              setTextInputValue(Constants['name']);
              navigation.navigate('PaymentsScreen', {
                name: Constants['name'],
                Name: props.route?.params?.Name ?? '',
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
                  { fontFamily: 'Roboto_400Regular' }
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
                      { fontFamily: 'Roboto_400Regular' }
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

export default withTheme(DashboardScreen);
