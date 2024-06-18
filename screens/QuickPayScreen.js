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
  Icon,
  ScreenContainer,
  TextInput,
  Touchable,
  WebView,
  withTheme,
} from '@draftbit/ui';
import * as WebBrowser from 'expo-web-browser';
import { Image, Text, View } from 'react-native';

const QuickPayScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [availableBalance, setAvailableBalance] = React.useState('');
  const [checkboxRowValue, setCheckboxRowValue] = React.useState('');
  const [consumerName, setConsumerName] = React.useState('');
  const [consumerScNo, setConsumerScNo] = React.useState('');
  const [createDate, setCreateDate] = React.useState('');
  const [meterNumber, setMeterNumber] = React.useState('');
  const [meterStatus, setMeterStatus] = React.useState('');
  const [prepaidFlag, setPrepaidFlag] = React.useState('');
  const [rechargeAmount, setRechargeAmount] = React.useState('');
  const [scnoErrorMsg, setScnoErrorMsg] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');
  const [viewbilldetails, setViewbilldetails] = React.useState({});
  const validateScno = scNo => {
    var errorMessage = null;
    if (!scNo.trim()) {
      errorMessage = 'Service connection number is required';
    }
    return errorMessage;
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

  const buildString = Scno => {
    console.log(`billing/rest/getBillDataWss/${Scno}`);
    return `billing/rest/getBillDataWss/${Scno}`;
  };

  const prepaidmeterstatus = metetno => {
    console.log(`/SPM/getCurrentBalance?meterNumberOrAccountNo=${metetno}`);
    return `/SPM/getCurrentBalance?meterNumberOrAccountNo=${metetno}`;
  };

  return (
    <ScreenContainer scrollable={false} hasSafeArea={true}>
      {/* Header */}
      <View
        {...GlobalStyles.ViewStyles(theme)['Header 2'].props}
        style={StyleSheet.applyWidth(
          GlobalStyles.ViewStyles(theme)['Header 2'].style,
          dimensions.width
        )}
      >
        {/* Back Click */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              height: 48,
              justifyContent: 'center',
              width: 48,
            },
            dimensions.width
          )}
        >
          <Touchable
            onPress={() => {
              try {
                navigation.goBack();
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <Icon
              size={24}
              color={theme.colors['Custom Color_2']}
              name={'Ionicons/arrow-back-sharp'}
            />
          </Touchable>
        </View>
        {/* heading */}
        <Text
          accessible={true}
          style={StyleSheet.applyWidth(
            {
              color: theme.colors['Strong'],
              fontFamily: 'Roboto_700Bold',
              fontSize: 18,
              marginLeft: 12,
              textAlign: 'center',
            },
            dimensions.width
          )}
        >
          {transalate(Variables, 'Quick Pay')}
        </Text>
      </View>

      <View
        style={StyleSheet.applyWidth(
          {
            alignContent: 'flex-start',
            alignItems: 'stretch',
            alignSelf: 'stretch',
            flexWrap: 'nowrap',
            justifyContent: 'space-around',
            paddingBottom: 20,
            paddingLeft: 24,
            paddingRight: 24,
            paddingTop: 20,
          },
          dimensions.width
        )}
      >
        {/* Enter custmoer service number */}
        <View
          {...GlobalStyles.ViewStyles(theme)['user name'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.ViewStyles(theme)['user name'].style,
              { height: 50, marginTop: 20, paddingLeft: 20, paddingRight: 20 }
            ),
            dimensions.width
          )}
        >
          <Icon
            size={24}
            color={theme.colors['Medium']}
            name={'MaterialIcons/house'}
          />
          <View
            style={StyleSheet.applyWidth(
              { flex: 1, paddingLeft: 10, paddingRight: 10 },
              dimensions.width
            )}
          >
            <TextInput
              autoCapitalize={'none'}
              autoCorrect={true}
              changeTextDelay={500}
              onChangeText={newTextInputValue => {
                try {
                  setTextInputValue(newTextInputValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              webShowOutline={true}
              editable={true}
              placeholder={transalate(
                Variables,
                'Account/Consumer number'
              ).toString()}
              placeholderTextColor={theme.colors['Medium']}
              style={StyleSheet.applyWidth(
                {
                  borderRadius: 8,
                  fontFamily: 'Roboto_400Regular',
                  paddingBottom: 8,
                  paddingLeft: 8,
                  paddingRight: 8,
                  paddingTop: 8,
                },
                dimensions.width
              )}
              value={textInputValue}
            />
          </View>
        </View>
        {/* prepaid/post card */}
        <View
          {...GlobalStyles.ViewStyles(theme)['postpaid view 2'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.ViewStyles(theme)['postpaid view 2'].style,
              {
                marginBottom: 5,
                marginTop: 10,
                paddingLeft: 20,
                paddingRight: 20,
                width: '100%',
              }
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
        {/* Service connection error message */}
        <Text
          accessible={true}
          {...GlobalStyles.TextStyles(theme)['Text'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
              color: theme.colors['Error'],
              fontFamily: 'Roboto_400Regular',
              textAlign: 'left',
            }),
            dimensions.width
          )}
        >
          {transalate(Variables, scnoErrorMsg)}
        </Text>
        {/* Send OTP  Submit */}
        <Button
          iconPosition={'left'}
          onPress={() => {
            const handler = async () => {
              try {
                const scnoErrorMsg = validateScno(textInputValue);
                setScnoErrorMsg(scnoErrorMsg);
                if (scnoErrorMsg?.length) {
                  return;
                }
                const consumerDetailsJson = (
                  await CISAPPApi.consumerDetailsPOST(Constants, {
                    accno: textInputValue,
                  })
                )?.json;
                buildConsumerString(Constants['name']);
                const prepaidFlag = (
                  consumerDetailsJson && consumerDetailsJson[0]
                )?.data?.prepaidFlag;
                console.log(prepaidFlag);
                setPrepaidFlag(prepaidFlag);
                const meterNo = (consumerDetailsJson && consumerDetailsJson[0])
                  ?.data?.meterNumber;
                console.log(meterNo);
                setMeterNumber(meterNo);
                const Scno = (consumerDetailsJson && consumerDetailsJson[0])
                  ?.data?.scno;
                console.log(Scno);
                setGlobalVariableValue({
                  key: 'consumerScNo',
                  value: Scno,
                });
                const Name = (consumerDetailsJson && consumerDetailsJson[0])
                  ?.data?.name;
                setConsumerName(Name);
                const Viewbilldetailsjson = await (async () => {
                  if (prepaidFlag === 'N') {
                    return (
                      await CISAPPApi.viewBillDetailsPOST(Constants, {
                        action: buildString(textInputValue),
                      })
                    )?.json;
                  }
                })();
                buildString(textInputValue);

                const valueazl6MMx7 =
                  Viewbilldetailsjson &&
                  Viewbilldetailsjson[0].data.BillDataJson[0];
                setViewbilldetails(valueazl6MMx7);
                const Viewbilldetailslog = valueazl6MMx7;
                console.log(Viewbilldetailslog);
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
                const availableBalance2 = (
                  prepaiddetailsJson && prepaiddetailsJson[0]
                )?.data?.data[0]?.availBalance;
                console.log(availableBalance2);
                setAvailableBalance(availableBalance2);
                const rechargeAmountResult = (
                  prepaiddetailsJson && prepaiddetailsJson[0]
                )?.data?.data[0]?.rechargeAmount;
                setRechargeAmount(rechargeAmountResult);
                const createDateResult = (
                  prepaiddetailsJson && prepaiddetailsJson[0]
                )?.data?.data[0]?.createDate;
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
          style={StyleSheet.applyWidth(
            {
              backgroundColor: theme.colors['NFT_TIME_Dark_Gray'],
              borderRadius: 14,
              fontFamily: 'Roboto_400Regular',
              fontSize: 16,
              marginTop: 30,
              width: '100%',
            },
            dimensions.width
          )}
          title={`${transalate(Variables, 'View Details')}`}
        />
      </View>
      {/* prepaid card */}
      <>
        {!(prepaidFlag === 'Y') ? null : (
          <View
            {...GlobalStyles.ViewStyles(theme)['card'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.ViewStyles(theme)['card'].style, {
                backgroundColor: 'rgb(255, 255, 255)',
                borderColor: 'rgb(199, 198, 198)',
                borderRadius: 8,
                borderWidth: 1,
                justifyContent: 'space-evenly',
                marginBottom: 15,
                marginLeft: 20,
                marginRight: 20,
                marginTop: 5,
                paddingBottom: 10,
                paddingLeft: 20,
                paddingTop: 10,
              }),
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                { flexDirection: 'row', justifyContent: 'space-around' },
                dimensions.width
              )}
            >
              {/* Current Blance */}
              <View>
                <>
                  {!'Current Balance' ? null : (
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
                  )}
                </>
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
                    { flexDirection: 'row', justifyContent: 'space-between' },
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
                {/* Recharge Now */}
                <Button
                  iconPosition={'left'}
                  onPress={() => {
                    try {
                      console.log(textInputValue);
                      /* hidden 'Navigate' action */
                      /* hidden 'Open Browser' action */
                      /* hidden 'Navigate' action */
                      navigation.navigate('RechargeGuestScreen', {
                        serviceConNo: consumerScNo,
                        Name: consumerName,
                      });
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: theme.colors['NFT_Time_Green'],
                      borderRadius: 16,
                      fontFamily: 'Roboto_400Regular',
                      fontSize: 14,
                      height: 36,
                      marginTop: 10,
                      textAlign: 'center',
                    },
                    dimensions.width
                  )}
                  title={`${transalate(Variables, 'Recharge')}`}
                />
              </View>
            </View>
            {/* Update time View */}
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
                {rechargeAmount} {transalate(Variables, 'on')} {createDate}
              </Text>
            </View>
          </View>
        )}
      </>
      {/* Details fetaching */}
      <>
        {!viewbilldetails ? null : (
          <View>
            {/* card */}
            <>
              {!(prepaidFlag === 'N') ? null : (
                <View
                  {...GlobalStyles.ViewStyles(theme)['card'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ViewStyles(theme)['card'].style,
                      {
                        backgroundColor: theme.colors['Background'],
                        borderColor: 'rgb(199, 198, 198)',
                        borderRadius: 8,
                        borderWidth: 1,
                        marginLeft: 20,
                        marginRight: 20,
                        paddingBottom: 10,
                        paddingLeft: 20,
                        paddingTop: 10,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {/* Name */}
                  <Text
                    accessible={true}
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors.strong,
                        fontFamily: 'Roboto_700Bold',
                        fontSize: 16,
                      },
                      dimensions.width
                    )}
                  >
                    {(() => {
                      const e = viewbilldetails?.Name;
                      console.log(e);
                      return e;
                    })()}
                  </Text>
                  {/* Sub title */}
                  <Text
                    accessible={true}
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors.strong,
                        fontFamily: 'Roboto_700Bold',
                        fontSize: 12,
                        marginTop: 5,
                        opacity: 0.83,
                      },
                      dimensions.width
                    )}
                  >
                    {viewbilldetails?.AccNo}
                  </Text>
                </View>
              )}
            </>
            {/* card */}
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
                        marginLeft: 20,
                        marginRight: 20,
                        marginTop: 25,
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
                          fontFamily: 'Roboto_700Bold',
                          fontSize: 16,
                          opacity: 0.64,
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
                          fontSize: 16,
                          opacity: 0.96,
                        },
                        dimensions.width
                      )}
                    >
                      {viewbilldetails?.LEDGERAMT}
                    </Text>
                    {/* Sub title */}
                    <Text
                      accessible={true}
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors.strong,
                          fontFamily: 'Roboto_300Light',
                          fontSize: 12,
                          marginTop: 5,
                          opacity: 0.5,
                        },
                        dimensions.width
                      )}
                    >
                      {transalate(Variables, 'Due date')}
                      {': '}
                      {viewbilldetails?.BillDueDate}
                    </Text>
                  </View>
                </View>
              )}
            </>
          </View>
        )}
      </>
    </ScreenContainer>
  );
};

export default withTheme(QuickPayScreen);
