import React from 'react';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import transalate from '../global-functions/transalate';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { Button, ScreenContainer, withTheme } from '@draftbit/ui';
import { Image, Text, View } from 'react-native';

const RechargeConfirmationScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      style={StyleSheet.applyWidth(
        { backgroundColor: theme.colors['Primary'], justifyContent: 'center' },
        dimensions.width
      )}
    >
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            backgroundColor: theme.colors['Background'],
            borderRadius: 12,
            justifyContent: 'space-between',
            marginLeft: 20,
            marginRight: 20,
            paddingBottom: 20,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 60,
          },
          dimensions.width
        )}
      >
        <Image
          resizeMode={'cover'}
          source={Images.PaymentSuccess}
          style={StyleSheet.applyWidth(
            { height: 100, position: 'absolute', top: -50, width: 100 },
            dimensions.width
          )}
        />
        {/* Messages */}
        <View>
          {/* Title */}
          <Text
            accessible={true}
            style={StyleSheet.applyWidth(
              {
                color: theme.colors['Strong'],
                fontFamily: 'Roboto_500Medium',
                fontSize: 16,
                lineHeight: 25,
                opacity: 0.95,
                paddingLeft: 25,
                paddingRight: 25,
                textAlign: 'center',
              },
              dimensions.width
            )}
          >
            {transalate(Variables, 'Recharge successful.')}
          </Text>
        </View>
        {/* Consumer details  */}
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center', marginBottom: 50, marginTop: 50 },
            dimensions.width
          )}
        >
          <Image
            resizeMode={'center'}
            source={Images.Uitilitycislogo}
            style={StyleSheet.applyWidth(
              {
                borderColor: 'rgb(217, 211, 211)',
                borderRadius: 12,
                borderWidth: 1,
                height: 76,
                marginBottom: 12,
                width: 76,
              },
              dimensions.width
            )}
          />
          {/* Name */}
          <Text
            accessible={true}
            style={StyleSheet.applyWidth(
              {
                color: theme.colors['Strong'],
                fontFamily: 'Roboto_500Medium',
                fontSize: 14,
                lineHeight: 25,
                opacity: 0.95,
                paddingLeft: 25,
                paddingRight: 25,
                textAlign: 'center',
              },
              dimensions.width
            )}
          >
            {props.route?.params?.Name ?? ''}
          </Text>
          {/* Service number */}
          <Text
            accessible={true}
            style={StyleSheet.applyWidth(
              {
                color: theme.colors['Strong'],
                fontFamily: 'Roboto_400Regular',
                lineHeight: 18,
                marginTop: 2,
                opacity: 0.6,
                paddingLeft: 25,
                paddingRight: 25,
                textAlign: 'center',
              },
              dimensions.width
            )}
          >
            {props.route?.params?.serviceConnectionNo ?? ''}
          </Text>
        </View>
        {/* Actions */}
        <View
          style={StyleSheet.applyWidth({ width: '100%' }, dimensions.width)}
        >
          {/* View receipt */}
          <Button
            iconPosition={'left'}
            onPress={() => {
              try {
                navigation.navigate('DashboardScreen');
              } catch (err) {
                console.error(err);
              }
            }}
            activeOpacity={0.8}
            disabledOpacity={0.8}
            style={StyleSheet.applyWidth(
              {
                backgroundColor: theme.colors['NFT_TIME_Dark_Gray'],
                borderRadius: 14,
                fontFamily: 'Roboto_400Regular',
                fontSize: 16,
                textAlign: 'center',
              },
              dimensions.width
            )}
            title={`${transalate(Variables, 'OK')}`}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(RechargeConfirmationScreen);
