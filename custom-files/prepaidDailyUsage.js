import React from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export function LineChartComponent({ prepaidDailyConsumption }) {
  const screenWidth = Dimensions.get('window').width;
  let newData = [];
  let newBillDates = [];
  if (prepaidDailyConsumption.length) {
    //console.log("details"+prepaidDailyConsumption.length);
    // console.log("prepaidDailyConsumption"+prepaidDailyConsumption.length);
    newData = prepaidDailyConsumption.map(item => item.lpDate);
    newBillDates = prepaidDailyConsumption.map(item => item.kWImp);
  }
  console.log('from custom code', prepaidDailyConsumption);
  const data = {
    //lables: prepaidDailyConsumption.BillIssueDate,
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
