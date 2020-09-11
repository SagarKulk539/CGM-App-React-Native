import React from 'react';
import {View, Text, StyleSheet, StatusBar, Dimensions, ScrollView} from 'react-native';
import {LineChart, ProgressChart} from 'react-native-chart-kit';

import Header from '../components/Header';

const chartConfig = {
  backgroundGradientFrom: '#004da3',
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: '#004da3',
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const HomeScreen=()=>{
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Avg Glucose Level : 157 mg/dl</Text>
                </View>
                <Text style={styles.textNew}>Hourly Chart</Text>
                <View style={styles.level1}>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                        <LineChart
                            data={{
                                labels: ['0hr', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12hr'],
                                datasets: [
                                    {
                                        data: [163, 152, 155, 163, 134, 134, 134, 134, 134, 158, 170, 183, 196],
                                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                        strokeWidth: 2,
                                    }
                                ],
                            }}
                            width={360}
                            height={220}
                            chartConfig={chartConfig}
                            style={{ borderRadius: 15 }}
                            bezier
                        />
                    </ScrollView>
                </View>
                <Text style={styles.textNew}>Daily Chart</Text>
                <View style={styles.level1}>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                        <LineChart
                            data={{
                                labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                                datasets: [
                                    {
                                        data: [144, 153, 165, 138, 178, 250, 200],
                                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                        strokeWidth: 2,
                                    }
                                ],
                                //legend: ['Daily chart'],
                            }}
                            width={360}
                            height={220}
                            chartConfig={chartConfig}
                            style={{ borderRadius: 15 }}
                            bezier
                        />
                    </ScrollView>
                </View>
                <Text style={styles.textNew}>Weekly Chart</Text>
                <View style={styles.level1}>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                        <ProgressChart
                            data={{
                                labels: ['Week-1', 'Week-2', 'Week-3', 'Week-4'],
                                data: [0.4, 0.5, 0.7, 0.6]
                            }}
                            width={360}
                            height={220}
                            chartConfig={chartConfig}
                            style={{ borderRadius: 15 }}
                            strokeWidth={12}
                            radius={32}
                            hideLegend={false}
                        />
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
};

HomeScreen.navigationOptions={
    header:()=><Header title="Glucose"/>
};

const styles=StyleSheet.create({
    header:{
        height:50,
        alignItems:'center',
        paddingLeft:40,
        flexDirection:'row',
        backgroundColor: '#004da3',
        borderRadius:15
    },
    headerText:{
        fontSize:22,
        color:'#fff',
        marginRight:5,
        marginLeft:10
    },
    container:{
        margin:5
    },
    level1:{
        marginBottom:15,
        marginTop:3
    },
    innerText: {
        color: '#05375a',
        fontSize: 24,
        fontWeight: '600',
        paddingBottom:5,
        borderBottomWidth:1,
        borderBottomColor: '#626366'
    },
    textNew:{
        fontSize:18,
        marginTop:10,
        marginLeft:135
    }
});

export default HomeScreen;