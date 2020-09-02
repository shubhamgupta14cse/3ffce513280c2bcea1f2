import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Text, StyleSheet, TouchableOpacity, Image, View, StatusBar, ScrollView } from "react-native";
import { Content, Input, Item } from "native-base";

import Button from "../../../components/button";

import Toast from "../../../utils/Toast";
import Validator from "../../../utils/ValidateUtil";

import { weatherService } from "../../../services";

import  { colors } from "../../../styles";

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.primaryBlue,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputContainer: {
    borderRadius: 16,
    backgroundColor: colors.white,
    padding: 10,
    marginVertical: 10
  },
  input: {
    marginVertical: 10,
    borderRadius: 16,
  },
  buttonContainer: {
    marginTop: 10
  },
  weatherInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

function Country({ navigation }) {
  const [isLoading, setIsLoading] = React.useState();
  const [ weather, setWeather] = React.useState({});
  const [ firstTime, setFirstTime] =  React.useState(false);

  const countries  = navigation.getParam('countries');

  function handleSubmit(capital) {
    setIsLoading(true);
    weatherService
      .getWeather(capital)
      .then(weather => {
        setWeather(weather);
        setFirstTime(true);
      })
      .catch(Toast.error)
      .finally(() => setIsLoading(false));
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.primaryBlue }}>
      <ScrollView contentContainerStyle={styles.root}>
        <StatusBar backgroundColor={colors.primaryBlue} barStyle='light-content' />

        {
          countries.map(({ name, capital, latlng, population, flag }) => (
            <View style={styles.inputContainer}>
              <Image source={flag} style={{ height: 50, width: 100 }}/>
              <Text> Name - {name}</Text>
              <Text> Capital - {capital}</Text>
              <Text> Population - {population}</Text>
              <Text> Latitude - {latlng[0]} </Text>
              <Text> Longitude - {latlng[1]} </Text>

              <View style={styles.buttonContainer}>
                <Button isLoading={isLoading} onPress={() => handleSubmit(capital)} buttonTitle='Capital Weather' />
              </View>

            </View>
          ))
        }
      </ScrollView>
      {
        firstTime
          ? (
          <View style={styles.weatherInfo}>
            <Text style={{ fontSize: 16 }}>Capitan name: {weather.name.substring(0, 25) + "..."}</Text>
            <Text style={{ fontSize: 16 }}> country : {weather.country}</Text>
            <Text style={{ fontSize: 12 }}> Temperature : {weather.temperature}</Text>
            <Text style={{ fontSize: 12 }}> Wind speed : {weather.wind_speed}</Text>
            <Text style={{ fontSize: 12 }}> Precip : {weather.precip}</Text>
          </View>
        ) : (
          <View style={styles.weatherInfo}>
            <Text> Select a country to view its state weather </Text>
          </View>
        )
      }
    </View>
  );
}

Country.propTypes = {
  navigation: PropTypes.object,
};

Country.defaultProps = {
  navigation: {},
};

module.exports = Country;
