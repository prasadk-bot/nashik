import React from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export function LineChartComponent({ prepaidBillingHistory }) {
  const screenWidth = Dimensions.get('window').width;
  let newData = [];
  let newBillDates = [];
  if (prepaidBillingHistory.length) {
    //console.log("details"+prepaidBillingHistory.length);
    // console.log("prepaidBillingHistory"+prepaidBillingHistory.length);
    newData = prepaidBillingHistory.map(item => item.lp_date);
    newBillDates = prepaidBillingHistory.map(item => item.kwh);
  }
  console.log('from custom code', prepaidBillingHistory);
  const data = {
    //lables: prepaidBillingHistory.BillIssueDate,
    labels: newData,
    //labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        data: newBillDates,
        //  data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      },
    ],
    legend: ['Billed Units(KWH / KVAH)'],
  };

  return (
    <View style={{ flex: 1 }}>
      <LineChart
        data={data}
        //width={400}
        width={screenWidth} // Set the width to the screen width
        height={400}
        verticalLabelRotation={60}
        chartConfig={{
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(26, 25, 16, ${opacity})`,
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
}
