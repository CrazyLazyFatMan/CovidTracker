/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import * as scale from 'd3-scale';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {
  StackedBarChart,
  StackedAreaChart,
  YAxis,
  XAxis,
  Grid,
} from 'react-native-svg-charts';
import * as dateFns from 'date-fns';

class Daily extends Component {
  url = 'https://api.covid19api.com/country/';
  state = {
    json: null,
    json_two: null,
    used: false,
    screenWidth: null,
    screenHeight: null,
    country: 'russia',
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
  countries = [
    {label: 'ALA Aland Islands', value: 'ala-aland-islands'},
    {
      label: 'Afghanistan',
      value: 'afghanistan',
    },
    {label: 'Albania', value: 'albania'},
    {label: 'Algeria', value: 'algeria'},
    {
      label: 'American Samoa',
      value: 'american-samoa',
    },
    {label: 'Andorra', value: 'andorra'},
    {label: 'Angola', value: 'angola'},
    {
      label: 'Anguilla',
      value: 'anguilla',
    },
    {label: 'Antarctica', value: 'antarctica'},
    {
      label: 'Antigua and Barbuda',
      value: 'antigua-and-barbuda',
    },
    {label: 'Argentina', value: 'argentina'},
    {label: 'Armenia', value: 'armenia'},
    {
      label: 'Aruba',
      value: 'aruba',
    },
    {label: 'Australia', value: 'australia'},
    {label: 'Austria', value: 'austria'},
    {
      label: 'Azerbaijan',
      value: 'azerbaijan',
    },
    {label: 'Bahamas', value: 'bahamas'},
    {label: 'Bahrain', value: 'bahrain'},
    {
      label: 'Bangladesh',
      value: 'bangladesh',
    },
    {label: 'Barbados', value: 'barbados'},
    {label: 'Belarus', value: 'belarus'},
    {
      label: 'Belgium',
      value: 'belgium',
    },
    {label: 'Belize', value: 'belize'},
    {label: 'Benin', value: 'benin'},
    {
      label: 'Bermuda',
      value: 'bermuda',
    },
    {label: 'Bhutan', value: 'bhutan'},
    {
      label: 'Bolivia',
      value: 'bolivia',
    },
    {label: 'Bosnia and Herzegovina', value: 'bosnia-and-herzegovina'},
    {
      label: 'Botswana',
      value: 'botswana',
    },
    {label: 'Bouvet Island', value: 'bouvet-island'},
    {
      label: 'Brazil',
      value: 'brazil',
    },
    {
      label: 'British Indian Ocean Territory',
      value: 'british-indian-ocean-territory',
    },
    {label: 'British Virgin Islands', value: 'british-virgin-islands'},
    {
      label: 'Brunei Darussalam',
      value: 'brunei',
    },
    {label: 'Bulgaria', value: 'bulgaria'},
    {
      label: 'Burkina Faso',
      value: 'burkina-faso',
    },
    {label: 'Burundi', value: 'burundi'},
    {label: 'Cambodia', value: 'cambodia'},
    {
      label: 'Cameroon',
      value: 'cameroon',
    },
    {label: 'Canada', value: 'canada'},
    {
      label: 'Cape Verde',
      value: 'cape-verde',
    },
    {label: 'Cayman Islands', value: 'cayman-islands'},
    {
      label: 'Central African Republic',
      value: 'central-african-republic',
    },
    {label: 'Chad', value: 'chad'},
    {label: 'Chile', value: 'chile'},
    {
      label: 'China',
      value: 'china',
    },
    {label: 'Christmas Island', value: 'christmas-island'},
    {
      label: 'Cocos (Keeling) Islands',
      value: 'cocos-keeling-islands',
    },
    {label: 'Colombia', value: 'colombia'},
    {
      label: 'Comoros',
      value: 'comoros',
    },
    {label: 'Congo (Brazzaville)', value: 'congo-brazzaville'},
    {
      label: 'Congo (Kinshasa)',
      value: 'congo-kinshasa',
    },
    {label: 'Cook Islands', value: 'cook-islands'},
    {
      label: 'Costa Rica',
      value: 'costa-rica',
    },
    {label: 'Croatia', value: 'croatia'},
    {label: 'Cuba', value: 'cuba'},
    {
      label: 'Cyprus',
      value: 'cyprus',
    },
    {label: 'Czech Republic', value: 'czech-republic'},
    {
      label: "Côte d'Ivoire",
      value: 'cote-divoire',
    },
    {label: 'Denmark', value: 'denmark'},
    {label: 'Djibouti', value: 'djibouti'},
    {
      label: 'Dominica',
      value: 'dominica',
    },
    {label: 'Dominican Republic', value: 'dominican-republic'},
    {
      label: 'Ecuador',
      value: 'ecuador',
    },
    {label: 'Egypt', value: 'egypt'},
    {
      label: 'El Salvador',
      value: 'el-salvador',
    },
    {label: 'Equatorial Guinea', value: 'equatorial-guinea'},
    {
      label: 'Eritrea',
      value: 'eritrea',
    },
    {label: 'Estonia', value: 'estonia'},
    {
      label: 'Ethiopia',
      value: 'ethiopia',
    },
    {label: 'Falkland Islands (Malvinas)', value: 'falkland-islands-malvinas'},
    {
      label: 'Faroe Islands',
      value: 'faroe-islands',
    },
    {label: 'Fiji', value: 'fiji'},
    {label: 'Finland', value: 'finland'},
    {
      label: 'France',
      value: 'france',
    },
    {label: 'French Guiana', value: 'french-guiana'},
    {
      label: 'French Polynesia',
      value: 'french-polynesia',
    },
    {
      label: 'French Southern Territories',
      value: 'french-southern-territories',
    },
    {
      label: 'Gabon',
      value: 'gabon',
    },
    {label: 'Gambia', value: 'gambia'},
    {label: 'Georgia', value: 'georgia'},
    {
      label: 'Germany',
      value: 'germany',
    },
    {label: 'Ghana', value: 'ghana'},
    {label: 'Gibraltar', value: 'gibraltar'},
    {
      label: 'Greece',
      value: 'greece',
    },
    {label: 'Greenland', value: 'greenland'},
    {label: 'Grenada', value: 'grenada'},
    {
      label: 'Guadeloupe',
      value: 'guadeloupe',
    },
    {label: 'Guam', value: 'guam'},
    {label: 'Guatemala', value: 'guatemala'},
    {
      label: 'Guernsey',
      value: 'guernsey',
    },
    {label: 'Guinea', value: 'guinea'},
    {label: 'Guinea-Bissau', value: 'guinea-bissau'},
    {
      label: 'Guyana',
      value: 'guyana',
    },
    {label: 'Haiti', value: 'haiti'},
    {
      label: 'Heard and Mcdonald Islands',
      value: 'heard-and-mcdonald-islands',
    },
    {
      label: 'Holy See (Vatican City State)',
      value: 'holy-see-vatican-city-state',
    },
    {
      label: 'Honduras',
      value: 'honduras',
    },
    {label: 'Hong Kong, SAR China', value: 'hong-kong-sar-china'},
    {
      label: 'Hungary',
      value: 'hungary',
    },
    {label: 'Iceland', value: 'iceland'},
    {label: 'India', value: 'india'},
    {
      label: 'Indonesia',
      value: 'indonesia',
    },
    {label: 'Iran, Islamic Republic of', value: 'iran'},
    {label: 'Iraq', value: 'iraq'},
    {
      label: 'Ireland',
      value: 'ireland',
    },
    {label: 'Isle of Man', value: 'isle-of-man'},
    {label: 'Israel', value: 'israel'},
    {
      label: 'Italy',
      value: 'italy',
    },
    {label: 'Jamaica', value: 'jamaica'},
    {label: 'Japan', value: 'japan'},
    {
      label: 'Jersey',
      value: 'jersey',
    },
    {label: 'Jordan', value: 'jordan'},
    {label: 'Kazakhstan', value: 'kazakhstan'},
    {
      label: 'Kenya',
      value: 'kenya',
    },
    {label: 'Kiribati', value: 'kiribati'},
    {
      label: 'Korea (North)',
      value: 'korea-north',
    },
    {label: 'Korea (South)', value: 'korea-south'},
    {
      label: 'Kuwait',
      value: 'kuwait',
    },
    {label: 'Kyrgyzstan', value: 'kyrgyzstan'},
    {label: 'Lao PDR', value: 'lao-pdr'},
    {
      label: 'Latvia',
      value: 'latvia',
    },
    {label: 'Lebanon', value: 'lebanon'},
    {label: 'Lesotho', value: 'lesotho'},
    {
      label: 'Liberia',
      value: 'liberia',
    },
    {label: 'Libya', value: 'libya'},
    {
      label: 'Liechtenstein',
      value: 'liechtenstein',
    },
    {label: 'Lithuania', value: 'lithuania'},
    {
      label: 'Luxembourg',
      value: 'luxembourg',
    },
    {label: 'Macao, SAR China', value: 'macao-sar-china'},
    {
      label: 'Macedonia, Republic of',
      value: 'macedonia',
    },
    {label: 'Madagascar', value: 'madagascar'},
    {label: 'Malawi', value: 'malawi'},
    {
      label: 'Malaysia',
      value: 'malaysia',
    },
    {label: 'Maldives', value: 'maldives'},
    {label: 'Mali', value: 'mali'},
    {
      label: 'Malta',
      value: 'malta',
    },
    {label: 'Marshall Islands', value: 'marshall-islands'},
    {
      label: 'Martinique',
      value: 'martinique',
    },
    {label: 'Mauritania', value: 'mauritania'},
    {
      label: 'Mauritius',
      value: 'mauritius',
    },
    {label: 'Mayotte', value: 'mayotte'},
    {
      label: 'Mexico',
      value: 'mexico',
    },
    {label: 'Micronesia, Federated States of', value: 'micronesia'},
    {
      label: 'Moldova',
      value: 'moldova',
    },
    {label: 'Monaco', value: 'monaco'},
    {label: 'Mongolia', value: 'mongolia'},
    {
      label: 'Montenegro',
      value: 'montenegro',
    },
    {label: 'Montserrat', value: 'montserrat'},
    {label: 'Morocco', value: 'morocco'},
    {
      label: 'Mozambique',
      value: 'mozambique',
    },
    {label: 'Myanmar', value: 'myanmar'},
    {label: 'Namibia', value: 'namibia'},
    {
      label: 'Nauru',
      value: 'nauru',
    },
    {label: 'Nepal', value: 'nepal'},
    {
      label: 'Netherlands',
      value: 'netherlands',
    },
    {label: 'Netherlands Antilles', value: 'netherlands-antilles'},
    {
      label: 'New Caledonia',
      value: 'new-caledonia',
    },
    {label: 'New Zealand', value: 'new-zealand'},
    {
      label: 'Nicaragua',
      value: 'nicaragua',
    },
    {label: 'Niger', value: 'niger'},
    {label: 'Nigeria', value: 'nigeria'},
    {
      label: 'Niue',
      value: 'niue',
    },
    {label: 'Norfolk Island', value: 'norfolk-island'},
    {
      label: 'Northern Mariana Islands',
      value: 'northern-mariana-islands',
    },
    {label: 'Norway', value: 'norway'},
    {label: 'Oman', value: 'oman'},
    {
      label: 'Pakistan',
      value: 'pakistan',
    },
    {label: 'Palau', value: 'palau'},
    {
      label: 'Palestinian Territory',
      value: 'palestine',
    },
    {label: 'Panama', value: 'panama'},
    {
      label: 'Papua New Guinea',
      value: 'papua-new-guinea',
    },
    {label: 'Paraguay', value: 'paraguay'},
    {label: 'Peru', value: 'peru'},
    {
      label: 'Philippines',
      value: 'philippines',
    },
    {label: 'Pitcairn', value: 'pitcairn'},
    {label: 'Poland', value: 'poland'},
    {
      label: 'Portugal',
      value: 'portugal',
    },
    {label: 'Puerto Rico', value: 'puerto-rico'},
    {
      label: 'Qatar',
      value: 'qatar',
    },
    {label: 'Republic of Kosovo', value: 'kosovo'},
    {
      label: 'Romania',
      value: 'romania',
    },
    {label: 'Russian Federation', value: 'russia'},
    {label: 'Rwanda', value: 'rwanda'},
    {
      label: 'Réunion',
      value: 'réunion',
    },
    {label: 'Saint Helena', value: 'saint-helena'},
    {
      label: 'Saint Kitts and Nevis',
      value: 'saint-kitts-and-nevis',
    },
    {label: 'Saint Lucia', value: 'saint-lucia'},
    {
      label: 'Saint Pierre and Miquelon',
      value: 'saint-pierre-and-miquelon',
    },
    {
      label: 'Saint Vincent and Grenadines',
      value: 'saint-vincent-and-the-grenadines',
    },
    {label: 'Saint-Barthélemy', value: 'saint-barthélemy'},
    {
      label: 'Saint-Martin (French part)',
      value: 'saint-martin-french-part',
    },
    {label: 'Samoa', value: 'samoa'},
    {
      label: 'San Marino',
      value: 'san-marino',
    },
    {label: 'Sao Tome and Principe', value: 'sao-tome-and-principe'},
    {
      label: 'Saudi Arabia',
      value: 'saudi-arabia',
    },
    {label: 'Senegal', value: 'senegal'},
    {label: 'Serbia', value: 'serbia'},
    {
      label: 'Seychelles',
      value: 'seychelles',
    },
    {label: 'Sierra Leone', value: 'sierra-leone'},
    {
      label: 'Singapore',
      value: 'singapore',
    },
    {label: 'Slovakia', value: 'slovakia'},
    {
      label: 'Slovenia',
      value: 'slovenia',
    },
    {label: 'Solomon Islands', value: 'solomon-islands'},
    {
      label: 'Somalia',
      value: 'somalia',
    },
    {label: 'South Africa', value: 'south-africa'},
    {
      label: 'South Georgia and the South Sandwich Islands',
      value: 'south-georgia-and-the-south-sandwich-islands',
    },
    {label: 'South Sudan', value: 'south-sudan'},
    {label: 'Spain', value: 'spain'},
    {
      label: 'Sri Lanka',
      value: 'sri-lanka',
    },
    {label: 'Sudan', value: 'sudan'},
    {
      label: 'Suriname',
      value: 'suriname',
    },
    {
      label: 'Svalbard and Jan Mayen Islands',
      value: 'svalbard-and-jan-mayen-islands',
    },
    {
      label: 'Swaziland',
      value: 'swaziland',
    },
    {label: 'Sweden', value: 'sweden'},
    {
      label: 'Switzerland',
      value: 'switzerland',
    },
    {label: 'Syrian Arab Republic (Syria)', value: 'syria'},
    {
      label: 'Taiwan, Republic of China',
      value: 'taiwan',
    },
    {label: 'Tajikistan', value: 'tajikistan'},
    {
      label: 'Tanzania, United Republic of',
      value: 'tanzania',
    },
    {label: 'Thailand', value: 'thailand'},
    {label: 'Timor-Leste', value: 'timor-leste'},
    {
      label: 'Togo',
      value: 'togo',
    },
    {label: 'Tokelau', value: 'tokelau'},
    {label: 'Tonga', value: 'tonga'},
    {
      label: 'Trinidad and Tobago',
      value: 'trinidad-and-tobago',
    },
    {label: 'Tunisia', value: 'tunisia'},
    {label: 'Turkey', value: 'turkey'},
    {
      label: 'Turkmenistan',
      value: 'turkmenistan',
    },
    {label: 'Turks and Caicos Islands', value: 'turks-and-caicos-islands'},
    {
      label: 'Tuvalu',
      value: 'tuvalu',
    },
    {label: 'US Minor Outlying Islands', value: 'us-minor-outlying-islands'},
    {
      label: 'Uganda',
      value: 'uganda',
    },
    {label: 'Ukraine', value: 'ukraine'},
    {
      label: 'United Arab Emirates',
      value: 'united-arab-emirates',
    },
    {label: 'United Kingdom', value: 'united-kingdom'},
    {
      label: 'United States of America',
      value: 'united-states',
    },
    {label: 'Uruguay', value: 'uruguay'},
    {label: 'Uzbekistan', value: 'uzbekistan'},
    {
      label: 'Vanuatu',
      value: 'vanuatu',
    },
    {label: 'Venezuela (Bolivarian Republic)', value: 'venezuela'},
    {
      label: 'Viet Nam',
      value: 'vietnam',
    },
    {label: 'Virgin Islands, US', value: 'virgin-islands'},
    {
      label: 'Wallis and Futuna Islands',
      value: 'wallis-and-futuna-islands',
    },
    {label: 'Western Sahara', value: 'western-sahara'},
    {label: 'Yemen', value: 'yemen'},
    {
      label: 'Zambia',
      value: 'zambia',
    },
    {label: 'Zimbabwe', value: 'zimbabwe'},
  ];

  constructor() {
    super();
    console.log('Hello from constructor');
  }

  getScreenDimensions() {
    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = Math.round(Dimensions.get('window').height);
    this.setState({screenWidth: screenWidth, screenHeight: screenHeight});
  }

  componentDidMount() {
    console.log('Hello from constructorDidMount');
  }

  getGraphData(flatData) {
    let data = [];
    flatData.forEach((item) => {
      data.push({
        date: item.Date,
        deaths: item.Deaths,
        confirmed: item.Confirmed,
        active: item.Active,
        recovered: item.Recovered,
      });
    });
    return data;
  }

  async getData(country) {
    try {
      this.setState({used: true});
      let response = await fetch(this.url + country);
      let json = await response.json();
      this.setState({json: json});
    } catch (error) {
      console.log('FAILED with ' + error.message);
    }
  }

  render() {
    let navigation = this.props.navigation;
    console.log('Hello from Render');
    if (!this.state.used) {
      this.getScreenDimensions();
      this.getData('russia');
    }
    let flatData = [];
    let json = {};
    if (this.state.json !== null) {
      json = this.state.json;
      json.forEach((item) => {
        flatData.push(item);
      });
      flatData = flatData.filter(Boolean);
    }
    if (flatData.length === 0) {
      return (
        <View style={styles.subContainer}>
          <RNPickerSelect
            onValueChange={(value) => {
              this.setState({country: value});
              this.getData(value);
            }}
            items={this.countries}
            value={this.state.country}
          />
          <Text>There is no data to show</Text>
        </View>
      );
    } else {
      const colors = ['#4682B4', '#228B22', '#FF8C00', '#FF0000'];
      const keys = ['active', 'recovered', 'confirmed', 'deaths'];
      let graphData = this.getGraphData(flatData);
      let YData = StackedAreaChart.extractDataPoints(graphData, keys);
      return (
        <View style={styles.mainContainer}>
          <RNPickerSelect
            onValueChange={(value) => {
              this.setState({country: value});
              this.getData(value);
            }}
            items={this.countries}
            value={this.state.country}
          />
          <View style={styles.legendGraphText}>
            <View style={{backgroundColor: '#FF8C00', width: 10, height: 10}}>
              <Text />
            </View>
            <Text style={styles.legendView}>Confirmed</Text>
            <View style={{backgroundColor: '#4682B4', width: 10, height: 10}}>
              <Text />
            </View>
            <Text style={styles.legendView}>Active</Text>
            <View style={{backgroundColor: '#228B22', width: 10, height: 10}}>
              <Text />
            </View>
            <Text style={styles.legendView}>Recovered</Text>
            <View style={{backgroundColor: 'red', width: 10, height: 10}}>
              <Text />
            </View>
            <Text style={styles.legendView}>Deaths</Text>
          </View>
          <ScrollView
            ref={(ref) => {
              this.scrollView = ref;
            }}
            onContentSizeChange={() =>
              this.scrollView.scrollToEnd({animated: true})
            }
            horizontal={true}
            contentContainerStyle={{alignItems: 'stretch'}}>
            <View
              style={{
                flex: 0.94,
                width: graphData.length * 50,
                paddingLeft: 0,
                paddingTop: 10,
                paddingBottom: 10,
              }}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <YAxis
                  contentInset={{top: 10, bottom: 5}}
                  style={{position: 'absolute', top: 0, bottom: 0}}
                  svg={{
                    fontSize: 10,
                    fill: 'black',
                    alignmentBaseline: 'baseline',
                  }}
                  formatLabel={(value) => (value === 0 ? '' : value)}
                  data={YData}
                />
                <StackedBarChart
                  style={{flex: 1, paddingLeft: 50, paddingTop: 15}}
                  keys={keys}
                  colors={colors}
                  xScale={scale.scaleTime}
                  data={graphData}
                  showGrid={true}
                  contentInset={{top: 30, bottom: 30}}>
                  <Grid />
                </StackedBarChart>
              </View>
              <XAxis
                style={{flex: 0.06, paddingLeft: 50}}
                data={graphData}
                scale={scale.scaleTime}
                contentInset={{left: 0, right: 30}}
                xAccessor={({item}) => new Date(item.date)}
                formatLabel={(value) => dateFns.format(value, 'dd MMM')}
                svg={{
                  fontSize: 10,
                  fill: 'black',
                  rotation: 50,
                  originY: 30,
                  y: 5,
                }}
              />
            </View>
          </ScrollView>
          <Button
            title="DETAILED INFORMATION"
            onPress={() =>
              navigation.navigate('Detailed', {
                country_data: this.state.json,
                country: this.state.country,
              })
            }
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1,
    backgroundColor: 'white',
  },
  subContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    backgroundColor: 'blue',
  },
  legendGraphText: {
    flexDirection: 'row',
    paddingTop: 10,
    borderTopWidth: 2,
    borderTopColor: 'grey',
    justifyContent: 'center',
  },
  legendView: {
    fontSize: 10,
    paddingLeft: 5,
    paddingRight: 10,
  },
  text: {
    fontSize: 32,
  },
});

export default Daily;
