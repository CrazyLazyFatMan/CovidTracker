/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

class Tracker extends Component {
  state = {
    json: null,
    used: false,
  };
  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  daysNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  constructor() {
    super();
    console.log('Hello from constructor');
  }

  componentDidMount() {
    console.log('Hello from constructorDidMount');
    // this.state = {label: 'Changed'};
  }

  renderFlatItem = ({item}) => {
    let date = new Date(item.Date);
    let day = this.daysNames[date.getDay()];
    let day_number = date.getDate();
    let month = this.monthNames[date.getMonth()];
    let year = date.getUTCFullYear();
    return (
      <View style={{borderBottomWidth: 2, borderBottomColor: '#228B22'}}>
        <View
          style={{
            justifyContent: 'center',
            width: this.state.screenWidth,
            height: 'auto',
            flexDirection: 'row',
            flex: 1,
          }}>
          <Text style={{fontWeight: 'bold', paddingTop: 5, color: '#4B0082'}}>
            {year} {month} {day} {day_number} {'\n'}
            {'\n'}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'space-around',
            height: 'auto',
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
          }}>
          <View style={styles.infoView}>
            <Text style={styles.activeInfoText}>Active:</Text>
            <Text style={styles.activeInfoText}>{item.Active}</Text>
          </View>
          <View style={styles.infoView}>
            <Text style={styles.recoveredInfoText}>Recovered:</Text>
            <Text style={styles.recoveredInfoText}>{item.Recovered}</Text>
          </View>
          <View style={styles.infoView}>
            <Text style={styles.confirmedInfoText}>Confirmed:</Text>
            <Text style={styles.confirmedInfoText}>{item.Confirmed}</Text>
          </View>
          <View style={styles.infoView}>
            <Text style={styles.deathsInfoText}>Deaths:</Text>
            <Text style={styles.deathsInfoText}>{item.Deaths}</Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    let arrayJson = this.props.route.params.country_data;
    let json;
    let flatData = [];
    if (arrayJson !== null) {
      json = arrayJson;
      json.forEach((item) => {
        flatData.push(item);
      });
      flatData = flatData.filter(Boolean);
    }
    return (
      <View style={styles.container}>
        <FlatList
          style={{height: '100%', width: '100%', flex: 1}}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          data={flatData.reverse()}
          renderItem={(item) => this.renderFlatItem(item)}
          keyExtractor={(i) => i.Date}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoView: {
    flex: 0.25,
    flexDirection: 'column',
    alignItems: 'center',
  },
  activeInfoText: {color: '#4682B4'},
  recoveredInfoText: {color: '#228B22'},
  confirmedInfoText: {color: '#FF8C00'},
  deathsInfoText: {color: '#FF0000'},
  header: {
    flex: 1,
    backgroundColor: 'blue',
  },
  separator: {
    height: 2,
    backgroundColor: 'blue',
  },

  text: {
    fontSize: 32,
  },
});

export default Tracker;
