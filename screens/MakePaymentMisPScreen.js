import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as CISAPPApi from '../apis/CISAPPApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as CustomCode from '../custom-files/CustomCode';
import transalate from '../global-functions/transalate';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  AccordionGroup,
  Button,
  Icon,
  NumberInput,
  RadioButton,
  RadioButtonGroup,
  RadioButtonRow,
  ScreenContainer,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import * as WebBrowser from 'expo-web-browser';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const MakePaymentMisPScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [amount, setAmount] = React.useState('');
  const [amountErrorMsg, setAmountErrorMsg] = React.useState('');
  const [consumerId, setConsumerId] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [emailErrorMsg, setEmailErrorMsg] = React.useState('');
  const [mobileNumber, setMobileNumber] = React.useState('');
  const [mobilenoErrorMsg, setMobilenoErrorMsg] = React.useState('');
  const [numberInputValue, setNumberInputValue] = React.useState('');
  const [numberInputValue2, setNumberInputValue2] = React.useState('');
  const [office, setOffice] = React.useState('');
  const [officeId, setOfficeId] = React.useState('');
  const [radioButtonGroup2Value, setRadioButtonGroup2Value] =
    React.useState('');
  const [radioButtonGroupValue, setRadioButtonGroupValue] = React.useState('');
  const [radioButtonGroupValue2, setRadioButtonGroupValue2] =
    React.useState('');
  const [ucode, setUcode] = React.useState('');
  const validateAmount = amount => {
    var errorMessage = null;
    var amountValue = null;
    amountValue = amount.toString();
    console.log('amount' + amountValue);
    if (amountValue.length == 0) {
      errorMessage = 'Amount is required';
    }
    return errorMessage;
  };

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
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ];
    const monthName = monthNames[monthNo - 1];
    console.log(monthName);
    return monthName;
  };

  const validateEmail = email => {
    var errorMessage = null;
    if (!email.trim()) {
      errorMessage = 'Email is required';
    } else {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(email)) {
        errorMessage = 'Invalid email';
      }
    }
    return errorMessage;
  };

  const validateMobileNo = mobileNo => {
    var errorMessage = null;
    var mobileNumber = null;
    mobileNumber = mobileNo.toString();
    console.log('mobileNo' + mobileNumber);
    if (mobileNumber.length == 0) {
      // console.log("mobileNumber"+mobileNumber.length);
      errorMessage = 'Mobile number is required';
    } else if (mobileNumber.length == 10) {
      console.log('number' + mobileNumber.length);
      let regex = new RegExp(/(0|91)?[6-9][0-9]{9}/);
      if (!regex.test(mobileNumber)) {
        errorMessage = 'Invalid mobile number(ex: 987XXXX789)';
      }
    } else if (mobileNumber.length < 10) {
      console.log('less' + mobileNumber.length);
      errorMessage = 'Enter 10 digit mobile number';
    }
    return errorMessage;
  };

  return (
    <ScreenContainer scrollable={false} hasSafeArea={true}>
      {/* Header */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 12,
            paddingLeft: 16,
            paddingRight: 16,
          },
          dimensions.width
        )}
      >
        {/* Back btn */}
        <Touchable
          onPress={() => {
            try {
              navigation.goBack();
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                height: 44,
                justifyContent: 'center',
                width: 44,
              },
              dimensions.width
            )}
          >
            <Icon size={24} name={'AntDesign/arrowleft'} />
          </View>
        </Touchable>
        {/* View bill and make payment */}
        <Text
          accessible={true}
          style={StyleSheet.applyWidth(
            {
              color: theme.colors.strong,
              fontFamily: 'Roboto_700Bold',
              fontSize: 18,
              marginLeft: 10,
            },
            dimensions.width
          )}
        >
          {'Make Payment'}
        </Text>
      </View>

      <ScrollView
        bounces={true}
        horizontal={false}
        keyboardShouldPersistTaps={'never'}
        nestedScrollEnabled={false}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={StyleSheet.applyWidth(
          { paddingBottom: 20, paddingTop: 20 },
          dimensions.width
        )}
      >
        {/* Payment summary */}
        <View>
          {/* pr1 */}
          <View
            {...GlobalStyles.ViewStyles(theme)['pr1'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.ViewStyles(theme)['pr1'].style, {
                marginLeft: 20,
                marginRight: 20,
                paddingBottom: 3,
                paddingTop: 3,
              }),
              dimensions.width
            )}
          >
            {/* card */}
            <View
              {...GlobalStyles.ViewStyles(theme)['card'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ViewStyles(theme)['card'].style,
                  {
                    backgroundColor: 'rgb(255, 255, 255)',
                    borderColor: 'rgb(199, 198, 198)',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: 8,
                    paddingLeft: 8,
                    paddingRight: 8,
                    paddingTop: 8,
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
                    alignSelf: 'flex-start',
                    color: theme.colors.strong,
                    fontFamily: 'Roboto_500Medium',
                    fontSize: 14,
                    textAlign: 'left',
                  },
                  dimensions.width
                )}
              >
                {transalate(Variables, 'Name')}
              </Text>
              {/* cname */}
              <Text
                accessible={true}
                style={StyleSheet.applyWidth(
                  {
                    alignSelf: 'flex-start',
                    color: theme.colors.strong,
                    fontFamily: 'Roboto_500Medium',
                    fontSize: 14,
                    opacity: 1,
                    textAlign: 'auto',
                  },
                  dimensions.width
                )}
              >
                {props.route?.params?.Name ?? ''}
              </Text>
            </View>
            {/* card */}
            <View
              {...GlobalStyles.ViewStyles(theme)['card'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ViewStyles(theme)['card'].style,
                  {
                    backgroundColor: 'rgb(255, 255, 255)',
                    borderColor: 'rgb(199, 198, 198)',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: 8,
                    paddingLeft: 8,
                    paddingRight: 8,
                    paddingTop: 8,
                  }
                ),
                dimensions.width
              )}
            >
              {/* Service connection no */}
              <Text
                accessible={true}
                style={StyleSheet.applyWidth(
                  {
                    alignSelf: 'flex-start',
                    color: theme.colors.strong,
                    fontFamily: 'Roboto_500Medium',
                    fontSize: 14,
                    textAlign: 'left',
                  },
                  dimensions.width
                )}
              >
                {transalate(Variables, 'Service connection number')}
              </Text>

              <Text
                accessible={true}
                style={StyleSheet.applyWidth(
                  {
                    alignSelf: 'flex-start',
                    color: theme.colors.strong,
                    fontFamily: 'Roboto_500Medium',
                    fontSize: 14,
                    opacity: 1,
                    textAlign: 'right',
                  },
                  dimensions.width
                )}
              >
                {props.route?.params?.Scno ?? ''}
              </Text>
            </View>
            {/* card 2 */}
            <View
              {...GlobalStyles.ViewStyles(theme)['card'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ViewStyles(theme)['card'].style,
                  {
                    backgroundColor: 'rgb(255, 255, 255)',
                    borderColor: 'rgb(199, 198, 198)',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: 8,
                    paddingLeft: 8,
                    paddingRight: 8,
                    paddingTop: 8,
                  }
                ),
                dimensions.width
              )}
            >
              {/* Ref Registration No */}
              <Text
                accessible={true}
                style={StyleSheet.applyWidth(
                  {
                    alignSelf: 'flex-start',
                    color: theme.colors.strong,
                    fontFamily: 'Roboto_500Medium',
                    fontSize: 14,
                    textAlign: 'left',
                  },
                  dimensions.width
                )}
              >
                {transalate(Variables, 'Ref Registration No')}
              </Text>

              <Text
                accessible={true}
                style={StyleSheet.applyWidth(
                  {
                    alignSelf: 'flex-start',
                    color: theme.colors.strong,
                    fontFamily: 'Roboto_500Medium',
                    fontSize: 14,
                    opacity: 1,
                    textAlign: 'right',
                  },
                  dimensions.width
                )}
              >
                {props.route?.params?.RefRegisteredNo ?? ''}
              </Text>
            </View>
            {/* card 3 */}
            <View
              {...GlobalStyles.ViewStyles(theme)['card'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ViewStyles(theme)['card'].style,
                  {
                    backgroundColor: 'rgb(255, 255, 255)',
                    borderColor: 'rgb(199, 198, 198)',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: 8,
                    paddingLeft: 8,
                    paddingRight: 8,
                    paddingTop: 8,
                  }
                ),
                dimensions.width
              )}
            >
              {/* Office */}
              <Text
                accessible={true}
                style={StyleSheet.applyWidth(
                  {
                    alignSelf: 'flex-start',
                    color: theme.colors.strong,
                    fontFamily: 'Roboto_500Medium',
                    fontSize: 14,
                    textAlign: 'left',
                  },
                  dimensions.width
                )}
              >
                {transalate(Variables, 'Office')}
              </Text>

              <Text
                accessible={true}
                style={StyleSheet.applyWidth(
                  {
                    alignSelf: 'flex-start',
                    color: theme.colors.strong,
                    fontFamily: 'Roboto_500Medium',
                    fontSize: 14,
                    opacity: 1,
                    textAlign: 'right',
                  },
                  dimensions.width
                )}
              >
                {props.route?.params?.Office ?? ''}
              </Text>
            </View>
            {/* card 4 */}
            <View
              {...GlobalStyles.ViewStyles(theme)['card'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ViewStyles(theme)['card'].style,
                  {
                    backgroundColor: 'rgb(255, 255, 255)',
                    borderColor: 'rgb(199, 198, 198)',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: 8,
                    paddingLeft: 8,
                    paddingRight: 8,
                    paddingTop: 8,
                  }
                ),
                dimensions.width
              )}
            >
              {/* Parent Category Name */}
              <Text
                accessible={true}
                style={StyleSheet.applyWidth(
                  {
                    alignSelf: 'flex-start',
                    color: theme.colors.strong,
                    fontFamily: 'Roboto_500Medium',
                    fontSize: 14,
                    textAlign: 'left',
                  },
                  dimensions.width
                )}
              >
                {transalate(Variables, 'Parent Category Name')}
              </Text>

              <Text
                accessible={true}
                style={StyleSheet.applyWidth(
                  {
                    alignSelf: 'flex-start',
                    color: theme.colors.strong,
                    fontFamily: 'Roboto_500Medium',
                    fontSize: 14,
                    opacity: 1,
                    textAlign: 'right',
                  },
                  dimensions.width
                )}
              >
                {props.route?.params?.ParentCatoryName ?? ''}
              </Text>
            </View>
            {/* card 5 */}
            <View
              {...GlobalStyles.ViewStyles(theme)['card'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ViewStyles(theme)['card'].style,
                  {
                    backgroundColor: 'rgb(255, 255, 255)',
                    borderColor: 'rgb(199, 198, 198)',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: 8,
                    paddingLeft: 8,
                    paddingRight: 8,
                    paddingTop: 8,
                  }
                ),
                dimensions.width
              )}
            >
              {/* Sub Category Name */}
              <Text
                accessible={true}
                style={StyleSheet.applyWidth(
                  {
                    alignSelf: 'flex-start',
                    color: theme.colors.strong,
                    fontFamily: 'Roboto_500Medium',
                    fontSize: 14,
                    textAlign: 'left',
                  },
                  dimensions.width
                )}
              >
                {transalate(Variables, 'Sub Category Name')}
              </Text>

              <Text
                accessible={true}
                style={StyleSheet.applyWidth(
                  {
                    alignSelf: 'flex-start',
                    color: theme.colors.strong,
                    fontFamily: 'Roboto_500Medium',
                    fontSize: 14,
                    opacity: 1,
                    textAlign: 'right',
                  },
                  dimensions.width
                )}
              >
                {props.route?.params?.SubCatname ?? ''}
              </Text>
            </View>
            {/* card 6 */}
            <View
              {...GlobalStyles.ViewStyles(theme)['card'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ViewStyles(theme)['card'].style,
                  {
                    backgroundColor: 'rgb(255, 255, 255)',
                    borderColor: 'rgb(199, 198, 198)',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: 8,
                    paddingLeft: 8,
                    paddingRight: 8,
                    paddingTop: 8,
                  }
                ),
                dimensions.width
              )}
            >
              {/* Request Name */}
              <Text
                accessible={true}
                style={StyleSheet.applyWidth(
                  {
                    alignSelf: 'flex-start',
                    color: theme.colors.strong,
                    fontFamily: 'Roboto_500Medium',
                    fontSize: 14,
                    textAlign: 'left',
                  },
                  dimensions.width
                )}
              >
                {transalate(Variables, 'Request Name')}
              </Text>

              <Text
                accessible={true}
                style={StyleSheet.applyWidth(
                  {
                    alignSelf: 'flex-start',
                    color: theme.colors.strong,
                    fontFamily: 'Roboto_500Medium',
                    fontSize: 14,
                    opacity: 1,
                    textAlign: 'right',
                  },
                  dimensions.width
                )}
              >
                {props.route?.params?.RequestName ?? ''}
              </Text>
            </View>
            {/* card 7 */}
            <View
              {...GlobalStyles.ViewStyles(theme)['card'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ViewStyles(theme)['card'].style,
                  {
                    backgroundColor: 'rgb(255, 255, 255)',
                    borderColor: 'rgb(199, 198, 198)',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: 8,
                    paddingLeft: 8,
                    paddingRight: 8,
                    paddingTop: 8,
                  }
                ),
                dimensions.width
              )}
            >
              {/* Address */}
              <Text
                accessible={true}
                style={StyleSheet.applyWidth(
                  {
                    alignSelf: 'flex-start',
                    color: theme.colors.strong,
                    fontFamily: 'Roboto_500Medium',
                    fontSize: 14,
                    textAlign: 'left',
                  },
                  dimensions.width
                )}
              >
                {transalate(Variables, 'Address')}
              </Text>

              <Text
                accessible={true}
                style={StyleSheet.applyWidth(
                  {
                    alignSelf: 'flex-start',
                    color: theme.colors.strong,
                    fontFamily: 'Roboto_500Medium',
                    fontSize: 14,
                    opacity: 1,
                    textAlign: 'right',
                  },
                  dimensions.width
                )}
              >
                {props.route?.params?.Address ?? ''}
              </Text>
            </View>
          </View>
          {/* pr2 */}
          <View
            {...GlobalStyles.ViewStyles(theme)['accordion'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ViewStyles(theme)['accordion'].style,
                {
                  marginLeft: 20,
                  marginRight: 20,
                  paddingBottom: 3,
                  paddingLeft: 8,
                  paddingRight: 8,
                  paddingTop: 3,
                }
              ),
              dimensions.width
            )}
          >
            <AccordionGroup
              caretSize={24}
              iconSize={24}
              expanded={true}
              label={transalate(Variables, 'Charge List')}
              style={StyleSheet.applyWidth(
                {
                  alignSelf: 'stretch',
                  color: theme.colors['ShopAppBlue'],
                  fontFamily: 'Roboto_500Medium',
                  fontSize: 16,
                  paddingBottom: 8,
                  paddingTop: 8,
                },
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth(
                  {
                    borderColor: theme.colors['Divider'],
                    borderTopWidth: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    opacity: 0.8,
                    width: '100%',
                  },
                  dimensions.width
                )}
              >
                {/* chargename */}
                <Text
                  accessible={true}
                  style={StyleSheet.applyWidth(
                    {
                      alignSelf: 'flex-start',
                      color: theme.colors.strong,
                      fontFamily: 'Roboto_500Medium',
                      lineHeight: 20,
                    },
                    dimensions.width
                  )}
                >
                  {props.route?.params?.AppRegName ?? ''}
                </Text>
                {/* amount */}
                <Text
                  accessible={true}
                  style={StyleSheet.applyWidth(
                    {
                      alignSelf: 'stretch',
                      color: theme.colors.strong,
                      fontFamily: 'Roboto_500Medium',
                      lineHeight: 20,
                    },
                    dimensions.width
                  )}
                >
                  {'₹'}
                  {props.route?.params?.Amount ?? ''}
                </Text>
              </View>

              <View
                style={StyleSheet.applyWidth(
                  {
                    borderColor: theme.colors['Divider'],
                    borderTopWidth: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    opacity: 1,
                    width: '100%',
                  },
                  dimensions.width
                )}
              >
                {/* Net payable amount */}
                <Text
                  accessible={true}
                  style={StyleSheet.applyWidth(
                    {
                      alignSelf: 'flex-start',
                      color: theme.colors.strong,
                      fontFamily: 'Roboto_500Medium',
                      lineHeight: 20,
                    },
                    dimensions.width
                  )}
                >
                  {transalate(Variables, 'Net payable amount')}
                </Text>
                {/* amount */}
                <Text
                  accessible={true}
                  style={StyleSheet.applyWidth(
                    {
                      alignSelf: 'stretch',
                      color: theme.colors.strong,
                      fontFamily: 'Roboto_500Medium',
                      lineHeight: 20,
                    },
                    dimensions.width
                  )}
                >
                  {'₹'}
                  {props.route?.params?.NetPaybleAmount ?? ''}
                  {'\n'}
                </Text>
              </View>
            </AccordionGroup>
          </View>
          {/* Enter details */}
          <View
            {...GlobalStyles.ViewStyles(theme)['accordion'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ViewStyles(theme)['accordion'].style,
                {
                  paddingBottom: 3,
                  paddingLeft: 8,
                  paddingRight: 8,
                  paddingTop: 3,
                }
              ),
              dimensions.width
            )}
          >
            <AccordionGroup
              caretSize={24}
              iconSize={24}
              expanded={true}
              label={transalate(Variables, 'Enter details')}
              style={StyleSheet.applyWidth(
                {
                  alignSelf: 'stretch',
                  color: theme.colors['ShopAppBlue'],
                  fontFamily: 'Roboto_500Medium',
                  fontSize: 16,
                  paddingBottom: 8,
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 8,
                  width: '100%',
                },
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth(
                  {
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    opacity: 1,
                    paddingLeft: 20,
                    paddingRight: 20,
                    width: '100%',
                  },
                  dimensions.width
                )}
              >
                {/* Mobile */}
                <View
                  {...GlobalStyles.ViewStyles(theme)['uname'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ViewStyles(theme)['uname'].style,
                      {
                        borderBottomWidth: 1,
                        borderColor: theme.colors['Divider'],
                        borderLeftWidth: 1,
                        borderRadius: 16,
                        borderRightWidth: 1,
                        borderTopWidth: 1,
                        height: 57,
                        marginTop: 8,
                        paddingLeft: 20,
                        paddingRight: 20,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  <>
                    {!'+91' ? null : (
                      <Icon
                        size={24}
                        color={theme.colors['Medium']}
                        name={'Entypo/phone'}
                      />
                    )}
                  </>
                  <TextInput
                    autoCapitalize={'none'}
                    autoCorrect={true}
                    changeTextDelay={500}
                    webShowOutline={true}
                    disabled={true}
                    editable={false}
                    placeholder={'+91'}
                    placeholderTextColor={theme.colors['Medium']}
                    style={StyleSheet.applyWidth(
                      {
                        borderRadius: 8,
                        fontFamily: 'Roboto_400Regular',
                        paddingBottom: 8,
                        paddingLeft: 5,
                        paddingRight: 2,
                        paddingTop: 8,
                        width: '14%',
                      },
                      dimensions.width
                    )}
                  />
                  <View
                    style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
                  >
                    <NumberInput
                      changeTextDelay={500}
                      onChangeText={newNumberInputValue => {
                        const numberInputValue = newNumberInputValue;
                        try {
                          setMobileNumber(newNumberInputValue);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      webShowOutline={true}
                      {...GlobalStyles.NumberInputStyles(theme)['Number Input']
                        .props}
                      editable={true}
                      maxLength={10}
                      placeholder={'1234567890'}
                      placeholderTextColor={theme.colors['Medium']}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.NumberInputStyles(theme)['Number Input']
                            .style,
                          { fontFamily: 'Roboto_400Regular' }
                        ),
                        dimensions.width
                      )}
                      value={mobileNumber}
                    />
                  </View>
                </View>
                {/* Mobile valid message */}
                <Text
                  accessible={true}
                  {...GlobalStyles.TextStyles(theme)['Text'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Text'].style,
                      {
                        color: theme.colors['Error'],
                        fontFamily: 'Roboto_400Regular',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {mobilenoErrorMsg}
                </Text>
                {/* Mail */}
                <View
                  {...GlobalStyles.ViewStyles(theme)['uname'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ViewStyles(theme)['uname'].style,
                      {
                        borderBottomWidth: 1,
                        borderColor: theme.colors['Divider'],
                        borderLeftWidth: 1,
                        borderRadius: 16,
                        borderRightWidth: 1,
                        borderTopWidth: 1,
                        height: 57,
                        marginTop: 8,
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
                    name={'MaterialCommunityIcons/email'}
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
                          setEmail(newTextInputValue);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      webShowOutline={true}
                      editable={true}
                      placeholder={'abcdefgh@gmail.com'}
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
                    />
                  </View>
                </View>
                {/* Email Error message */}
                <Text
                  accessible={true}
                  {...GlobalStyles.TextStyles(theme)['Text'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Text'].style,
                      {
                        color: theme.colors['Error'],
                        fontFamily: 'Roboto_400Regular',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {emailErrorMsg}
                </Text>
              </View>
              {/* Section Header */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 12,
                    marginTop: 20,
                    paddingLeft: 20,
                    paddingRight: 20,
                  },
                  dimensions.width
                )}
              >
                {/* Heading */}
                <Text
                  accessible={true}
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.strong,
                      fontFamily: 'Roboto_500Medium',
                      fontSize: 14,
                    },
                    dimensions.width
                  )}
                >
                  {transalate(Variables, 'Select Payment Method')}
                </Text>
              </View>
              {/* Payment Methods */}
              <View
                style={StyleSheet.applyWidth(
                  { flexDirection: 'column' },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    { borderRadius: 12, overflow: 'hidden' },
                    dimensions.width
                  )}
                >
                  <RadioButtonGroup
                    onValueChange={newRadioButtonGroupValue => {
                      const radioButtonGroupValue = newRadioButtonGroupValue;
                      try {
                        setRadioButtonGroupValue(newRadioButtonGroupValue);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    value={radioButtonGroupValue}
                  >
                    {/* Payment Methods */}
                    <CISAPPApi.FetchPaymentGatewayPOST>
                      {({ loading, error, data, refetchPaymentGateway }) => {
                        const paymentMethodsData = data?.json;
                        if (loading) {
                          return <ActivityIndicator />;
                        }

                        if (
                          error ||
                          data?.status < 200 ||
                          data?.status >= 300
                        ) {
                          return <ActivityIndicator />;
                        }

                        return (
                          <FlashList
                            data={
                              paymentMethodsData && paymentMethodsData[0].data
                            }
                            estimatedItemSize={50}
                            horizontal={false}
                            inverted={false}
                            keyExtractor={(flashListData, index) =>
                              flashListData?.id
                            }
                            listKey={'NqtHFyRX'}
                            numColumns={1}
                            onEndReachedThreshold={0.5}
                            renderItem={({ item, index }) => {
                              const flashListData = item;
                              return (
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      flexDirection: 'row',
                                      height: 64,
                                      justifyContent: 'space-between',
                                      paddingBottom: 10,
                                      paddingLeft: 20,
                                      paddingRight: 20,
                                      paddingTop: 10,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  <Image
                                    resizeMode={'cover'}
                                    source={{
                                      uri: `${flashListData?.attachment}`,
                                    }}
                                    style={StyleSheet.applyWidth(
                                      { height: 18, width: 60 },
                                      dimensions.width
                                    )}
                                  />
                                  <View
                                    style={StyleSheet.applyWidth(
                                      { flex: 1 },
                                      dimensions.width
                                    )}
                                  >
                                    <RadioButtonRow
                                      color={theme.colors.primary}
                                      unselectedColor={theme.colors.primary}
                                      label={flashListData?.name}
                                      style={StyleSheet.applyWidth(
                                        { fontFamily: 'Inter_500Medium' },
                                        dimensions.width
                                      )}
                                      value={flashListData?.id}
                                    />
                                  </View>
                                </View>
                              );
                            }}
                            showsHorizontalScrollIndicator={true}
                            showsVerticalScrollIndicator={true}
                            contentContainerStyle={StyleSheet.applyWidth(
                              {
                                borderRadius: 12,
                                overflow: 'hidden',
                                paddingBottom: 10,
                                paddingTop: 10,
                              },
                              dimensions.width
                            )}
                          />
                        );
                      }}
                    </CISAPPApi.FetchPaymentGatewayPOST>
                  </RadioButtonGroup>
                </View>
              </View>
            </AccordionGroup>
          </View>
        </View>
        {/* Pay */}
        <Button
          iconPosition={'left'}
          onPress={() => {
            const handler = async () => {
              try {
                const mobilenoErrorMsg = validateMobileNo(mobileNumber);
                const emailErrorMsg = validateEmail(email);
                setMobilenoErrorMsg(mobilenoErrorMsg);
                setEmailErrorMsg(emailErrorMsg);
                if (mobilenoErrorMsg?.length) {
                  return;
                }
                if (emailErrorMsg?.length) {
                  return;
                }
                const consumerDetailsJson = (
                  await CISAPPApi.consumerDetailsPOST(Constants, {
                    accno: props.route?.params?.Scno ?? '',
                  })
                )?.json;
                buildConsumerString(props.route?.params?.Scno ?? '');
                console.log(consumerDetailsJson);
                const officeData = (
                  consumerDetailsJson && consumerDetailsJson[0]
                )?.data?.office;
                setOffice(officeData);
                const officeIdData = (
                  consumerDetailsJson && consumerDetailsJson[0]
                )?.data?.officeId;
                undefined;
                const ucodeData = (
                  consumerDetailsJson && consumerDetailsJson[0]
                )?.data?.ucode;
                setUcode(ucodeData);
                const consumerIdData = (
                  consumerDetailsJson && consumerDetailsJson[0]
                )?.data?.consumerId;
                setConsumerId(consumerIdData);
                const paymentJson = (
                  await CISAPPApi.miscPaymentServicePOST(Constants, {
                    accno: props.route?.params?.RefRegisteredNo ?? '',
                    amount: props.route?.params?.NetPaybleAmount ?? '',
                    billid: props.route?.params?.RefRegisteredNo ?? '',
                    consid: props.route?.params?.RefRegisteredNo ?? '',
                    email: (() => {
                      const e = email;
                      console.log(e);
                      return e;
                    })(),
                    from: (() => {
                      const e = 'MOBILE';
                      console.log(e);
                      return e;
                    })(),
                    gateway: (() => {
                      const e = radioButtonGroupValue;
                      console.log(e);
                      return e;
                    })(),
                    mid: 'M',
                    mobile: (() => {
                      const e = mobileNumber;
                      console.log(e);
                      return e;
                    })(),
                    name: (() => {
                      const e = props.route?.params?.Name ?? '';
                      console.log(e);
                      return e;
                    })(),
                    officeName: props.route?.params?.Office ?? '',
                    officeid: props.route?.params?.officeId ?? '',
                    scno: (() => {
                      const e = props.route?.params?.Scno ?? '';
                      console.log(e);
                      return e;
                    })(),
                    ucode: 'NA',
                  })
                )?.json;
                console.log(paymentJson);
                const url = setGlobalVariableValue({
                  key: 'payemntfinalurl',
                  value: (paymentJson && paymentJson[0].data)?.data,
                });
                console.log(url);
                await WebBrowser.openBrowserAsync(`${url}`);
                navigation.navigate('WelcomeScreen');
              } catch (err) {
                console.error(err);
              }
            };
            handler();
          }}
          style={StyleSheet.applyWidth(
            {
              backgroundColor: theme.colors['GetFit Orange'],
              borderRadius: 14,
              fontFamily: 'Roboto_400Regular',
              fontSize: 16,
              marginLeft: 20,
              marginRight: 20,
              marginTop: 35,
            },
            dimensions.width
          )}
          title={`${transalate(Variables, 'Make Payment')}`}
        />
      </ScrollView>
    </ScreenContainer>
  );
};

export default withTheme(MakePaymentMisPScreen);
