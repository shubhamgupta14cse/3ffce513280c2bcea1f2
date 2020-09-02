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
    // paddingHorizontal: 40,
    // width: '80%',
    // height: '40%',
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
    height: '40%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  }
});

function Country({ navigation }) {
  const [isLoading, setIsLoading] = React.useState();
  const [country, setCountry]= React.useState();
  const [ weather, setWeatherData] = React.useState({});

  const countries  = navigation.getParam('countries');

  function handleSubmit(capital) {
    setIsLoading(true);
    weatherService
      .getWeather(capital)
      .then(setWeather)
      .catch(Toast.error)
      .finally(() => setIsLoading(false));
  };

  return (
    <>
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
    <View style={styles.weatherInfo}>
      <Text> Temperature {weather.Temperature}</Text>
      <Text> Wind speed {weather.wind_speed}</Text>
      <Text> Precip {weather.precip}</Text>
    </View>
    </>
  );
}

Country.propTypes = {
  navigation: PropTypes.object,
};

Country.defaultProps = {
  navigation: {},
};

module.exports = Country;
