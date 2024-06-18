import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as CustomCode from '../custom-files/CustomCode';
import transalate from '../global-functions/transalate';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { Touchable, withTheme } from '@draftbit/ui';
import { Text, View } from 'react-native';

const MainTabViewBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [mainselectedTab, setMainselectedTab] = React.useState('');
  const [prepaidFlag, setPrepaidFlag] = React.useState('');
  const manageAccountFun = ManageAccountDetails => {
    return ManageAccountDetails.map(team => {
      return { label: team.new_added_account, value: team.new_added_account };
    });
  };

  const buildBillingString = Scno => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */

    console.log(`billing/rest/getBillDataService/${Scno}`);
    return `billing/rest/getBillDataService/${Scno}`;
  };

  const convertDateTimeToDate = dateTime => {
    const date = dateTime.split(' ');
    console.log('date' + date);

    const str = date[0];

    return str;
  };

  const prepaidBillingString = meterNo => {
    console.log(
      `/SPM/getAllSpmMonthlyBillDetailsTByAccountNoOrMeterNumber?accountNoOrMeterNumber=${meterNo}`
    );
    return `/SPM/getAllSpmMonthlyBillDetailsTByAccountNoOrMeterNumber?accountNoOrMeterNumber=${meterNo}`;
  };

  const converDateTimeToDate = dateTime => {
    const date = dateTime.split(' ');
    console.log('date' + date);

    const str = date[0];

    return str;
  };

  const dailybillHistoryBuildString = meterNo => {
    //console.log(`/SPM/getAllSpmRechargeHistoryDetailsByMeterNumberOrAccountNo?meterNumberOrAccountNo=${meterNo}`)
    return `/SPM/getAllSpmBillDetailsByAccountNoOrMeterNumber?accountNoOrMeterNumber=${meterNo}`;

    //return `/SPM/getAllSpmRechargeHistoryDetailsByMeterNumberOrAccountNo?meterNumberOrAccountNo=${meterNo}`
  };

  const converDateTimeToDate2 = dateTime => {
    const date = dateTime.split(' ');
    console.log('date' + date);

    const str = date[0];

    return str;
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

  const buildString = Scno => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */

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

  return (
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
      {/* chart */}
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
        {/* prepaidchart */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: theme.colors['Community_Icon_BG_Color'],
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
                backgroundColor: theme.colors['Community_Icon_BG_Color'],
                borderBottomLeftRadius: 64,
                borderTopLeftRadius: 64,
              },
              dimensions.width
            )}
          >
            {/* selected */}
            <>
              {!(mainselectedTab === 'Prepaid daily bill') ? null : (
                <Touchable>
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        backgroundColor: theme.colors['Community_True_Option'],
                        borderBottomWidth: 2,
                        borderColor: theme.colors['Community_True_Option'],
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
                      {...GlobalStyles.TextStyles(theme)['Text'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'].style,
                          {
                            color: theme.colors['Community_Icon_BG_Color'],
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
                backgroundColor: theme.colors['Community_Icon_BG_Color'],
                borderBottomLeftRadius: 64,
                borderTopLeftRadius: 64,
              },
              dimensions.width
            )}
          >
            {/* unselected */}
            <>
              {!(mainselectedTab !== 'Prepaid daily bill') ? null : (
                <Touchable
                  onPress={() => {
                    try {
                      setMainselectedTab('Prepaid daily bill');
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
                        borderColor: theme.colors['Community_Icon_BG_Color'],
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
                      {transalate(Variables, 'Daily')}
                    </Text>
                  </View>
                </Touchable>
              )}
            </>
          </View>
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
            {
              backgroundColor: theme.colors['Community_Icon_BG_Color'],
              flex: 1,
            },
            dimensions.width
          )}
        >
          {/* selected */}
          <>
            {!(mainselectedTab === 'Prepaid View') ? null : (
              <Touchable>
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      backgroundColor: theme.colors['Community_True_Option'],
                      borderBottomWidth: 3,
                      borderColor: theme.colors['Community_Dark_UI'],
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
                    {...GlobalStyles.TextStyles(theme)['Text'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'].style,
                        {
                          color: theme.colors['Community_Icon_BG_Color'],
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
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: theme.colors['Community_Icon_BG_Color'],
                paddingBottom: 1,
                paddingTop: 1,
              },
              dimensions.width
            )}
          >
            {/* unselected */}
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
                        borderColor: theme.colors['Community_Icon_BG_Color'],
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
                      {transalate(Variables, 'Monthly')}
                    </Text>
                  </View>
                </Touchable>
              )}
            </>
          </View>
        </View>
      </View>
    </View>
  );
};

export default withTheme(MainTabViewBlock);
