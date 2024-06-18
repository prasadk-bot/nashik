import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Button,
  Icon,
  LinearProgress,
  Picker,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { ActivityIndicator, Text, View } from 'react-native';

const CardsScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const [icon1, setIcon1] = React.useState(false);
  const [icon2, setIcon2] = React.useState(false);
  const [pickerValue, setPickerValue] = React.useState('');
  const [upIcon3, setUpIcon3] = React.useState(true);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <View
        style={StyleSheet.applyWidth(
          {
            backgroundColor: theme.colors['White'],
            borderColor: theme.colors['White'],
            borderRadius: 8,
            borderWidth: 1,
            justifyContent: 'space-evenly',
            paddingBottom: 10,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10,
          },
          dimensions.width
        )}
      >
        <Text
          accessible={true}
          {...GlobalStyles.TextStyles(theme)['Text'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
              fontFamily: 'Roboto_400Regular',
              paddingLeft: 5,
            }),
            dimensions.width
          )}
        >
          {'Welcome'}
        </Text>
        {/* Text 2 */}
        <Text
          accessible={true}
          {...GlobalStyles.TextStyles(theme)['Text'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
              color: theme.colors['NFT_Time_Green'],
              fontFamily: 'Roboto_400Regular',
              fontSize: 20,
              paddingLeft: 5,
            }),
            dimensions.width
          )}
        >
          {'Vasanth kumar'}
        </Text>
        <Picker
          autoDismissKeyboard={true}
          dropDownBackgroundColor={theme.colors.background}
          dropDownTextColor={theme.colors.strong}
          iconSize={24}
          mode={'native'}
          onValueChange={newPickerValue => {
            const pickerValue = newPickerValue;
            try {
              setPickerValue(newPickerValue);
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
          leftIconMode={'inset'}
          options={[
            { label: '1101087405', value: '1101087405' },
            { label: '1101087406', value: '1101087406' },
          ]}
          placeholder={''}
          rightIconName={'Entypo/chevron-small-down'}
          style={StyleSheet.applyWidth(
            {
              backgroundColor: theme.colors['White'],
              fontFamily: 'Roboto_400Regular',
              width: '50%',
            },
            dimensions.width
          )}
          type={'underline'}
          value={pickerValue}
        />
      </View>
      {/* Current Balance Card */}
      <View
        style={StyleSheet.applyWidth(
          {
            backgroundColor: theme.colors['White'],
            borderColor: theme.colors['White'],
            borderRadius: 8,
            borderWidth: 1,
            justifyContent: 'space-evenly',
            paddingBottom: 10,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10,
          },
          dimensions.width
        )}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: theme.colors['White'],
              flexDirection: 'row',
              justifyContent: 'space-around',
            },
            dimensions.width
          )}
        >
          {/* Current Balance  */}
          <View>
            <Text
              accessible={true}
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  { fontFamily: 'Roboto_400Regular', fontSize: 14 }
                ),
                dimensions.width
              )}
            >
              {'Current Balance'}
            </Text>
            {/* Text 2 */}
            <Text
              accessible={true}
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  { fontFamily: 'Roboto_700Bold', fontSize: 20, marginTop: 20 }
                ),
                dimensions.width
              )}
            >
              {'₹61551.78'}
            </Text>
          </View>
          {/* Meter Connected */}
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
                    {
                      color: theme.colors['Strong'],
                      fontFamily: 'Roboto_400Regular',
                      fontSize: 14,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Meter Connected'}
              </Text>

              <View>
                <Touchable>
                  <Icon
                    color={theme.colors['NFT_Time_Green']}
                    name={'Ionicons/ios-refresh'}
                    size={20}
                  />
                </Touchable>
              </View>
            </View>
            {/* Recharge */}
            <Button
              iconPosition={'left'}
              {...GlobalStyles.ButtonStyles(theme)['Submit 2'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ButtonStyles(theme)['Submit 2'].style,
                  {
                    backgroundColor: theme.colors['NFT_Time_Green'],
                    borderRadius: 14,
                    height: 36,
                    marginTop: 10,
                  }
                ),
                dimensions.width
              )}
              title={'Recharge'}
            />
          </View>
        </View>
        {/* View 2 */}
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center', marginTop: 10 },
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
            {'Last recharge of ₹ 5 on 2024-04-18'}
          </Text>
        </View>
      </View>
      {/* Main View */}
      <View
        style={StyleSheet.applyWidth(
          {
            backgroundColor: theme.colors['Custom Color_24'],
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: '20%',
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
            { justifyContent: 'space-between' },
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
                    setIcon2(true);
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
            { alignContent: 'center' },
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
                    { fontFamily: 'Roboto_700Bold', fontSize: 17 }
                  ),
                  dimensions.width
                )}
              >
                {'1011 KVH'}
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
                    { fontFamily: 'Roboto_700Bold', fontSize: 17 }
                  ),
                  dimensions.width
                )}
              >
                {'1134 KWH'}
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
                    { fontFamily: 'Roboto_700Bold', fontSize: 17 }
                  ),
                  dimensions.width
                )}
              >
                {'2101KVAH'}
              </Text>
            )}
          </>
        </View>
        <View />
      </View>
      {/* View 2 */}
      <View
        style={StyleSheet.applyWidth({ marginTop: '20%' }, dimensions.width)}
      >
        <LinearProgress
          animationDuration={500}
          color={theme.colors.primary}
          indeterminate={false}
          isAnimated={true}
          showTrack={true}
          thickness={10}
          trackColor={theme.colors.divider}
          trackLineCap={'round'}
          lineCap={'round'}
          maximumValue={50}
          minimumValue={100}
        />
        <ActivityIndicator
          hidesWhenStopped={true}
          size={'small'}
          {...GlobalStyles.ActivityIndicatorStyles(theme)['Activity Indicator']
            .props}
          animating={true}
          style={StyleSheet.applyWidth(
            GlobalStyles.ActivityIndicatorStyles(theme)['Activity Indicator']
              .style,
            dimensions.width
          )}
        />
      </View>
    </ScreenContainer>
  );
};

export default withTheme(CardsScreen);
