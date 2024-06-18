import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as CustomCode from '../custom-files/CustomCode';
import transalate from '../global-functions/transalate';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { Button, Icon, Touchable, withTheme } from '@draftbit/ui';
import * as WebBrowser from 'expo-web-browser';
import { Text, View } from 'react-native';

const PrepaiddddBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [LateastDate, setLateastDate] = React.useState('');
  const [availableBalance, setAvailableBalance] = React.useState('');
  const [createDate, setCreateDate] = React.useState('');
  const [meterStatus, setMeterStatus] = React.useState('');
  const [prepaidFlag, setPrepaidFlag] = React.useState('');
  const [rechargeAmount, setRechargeAmount] = React.useState('');
  const buildString = Scno => {
    console.log(`billing/rest/getBillDataWss/${Scno}`);
    return `billing/rest/getBillDataWss/${Scno}`;
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

  return (
    <View
      {...GlobalStyles.ViewStyles(theme)['card'].props}
      style={StyleSheet.applyWidth(
        StyleSheet.compose(GlobalStyles.ViewStyles(theme)['card'].style, {
          backgroundColor: theme.colors['White'],
          borderColor: 'rgb(199, 198, 198)',
          borderRadius: 8,
          borderWidth: 1,
          justifyContent: 'space-evenly',
          marginTop: 10,
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
        {/* Current Balance */}
        <View>
          <Text
            accessible={true}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
                fontFamily: 'Roboto_400Regular',
              }),
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
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
                fontFamily: 'Roboto_700Bold',
                fontSize: 25,
                marginTop: 10,
              }),
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
              style={StyleSheet.applyWidth({ marginLeft: 5 }, dimensions.width)}
            >
              <>
                {!(meterStatus === 'CONNECTED') ? null : (
                  <Touchable>
                    <Icon
                      color={theme.colors['NFT_Time_Green']}
                      name={'Ionicons/ios-refresh'}
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
                      name={'Ionicons/ios-refresh'}
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
              const handler = async () => {
                try {
                  await WebBrowser.openBrowserAsync(
                    'https://www.nbpdcl.co.in/frmQuickBillPaymentAll.aspx'
                  );
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
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
            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
              fontFamily: 'Roboto_400Regular',
            }),
            dimensions.width
          )}
        >
          {'Last recharge of'}
          {' ₹'}
          {rechargeAmount} {'on'} {createDate}
        </Text>
      </View>
    </View>
  );
};

export default withTheme(PrepaiddddBlock);
