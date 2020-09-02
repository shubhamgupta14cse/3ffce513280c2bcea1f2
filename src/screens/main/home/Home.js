import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Text, StyleSheet, TouchableOpacity, Image, View, StatusBar } from "react-native";
import { Content, Input, Item } from "native-base";

import Button from "../../../components/button";

import Toast from "../../../utils/Toast";
import Validator from "../../../utils/ValidateUtil";

import { countryService } from "../../../services";

import  { colors } from "../../../styles";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.primaryBlue,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputContainer: {
    borderRadius: 16,
    backgroundColor: colors.white,
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    width: '80%',
    height: '60%'
  },
  input: {
    marginVertical: 10,
    borderRadius: 16,
  },
  buttonContainer: {
    marginTop: 200
  }
});

function Home({ navigation }) {
  const [isLoading, setIsLoading] = React.useState();
  const [country, setCountry]= React.useState();

  function handleSubmit() {
    if (!Validator.validateFeild(country)) return Toast.warning("please fill the Country");
    setIsLoading(true);
    countryService
      .getCountry(country)
      .then(countries => {
        navigation.navigate('Country', { countries: countries });
      })
      .catch(Toast.error)
      .finally(() => setIsLoading(false));
  };

  return (
    <View style={styles.root}>
      <StatusBar backgroundColor={colors.primaryBlue} barStyle='light-content' />

      <View style={styles.inputContainer}>

        <Item rounded style={styles.input} >
          <Input
            placeholder='Enter country'
            placeholderTextColor={colors.warmGrey}
            value={country}
            onChangeText={setCountry}
          />
        </Item>
        <View style={styles.buttonContainer}>
          <Button isLoading={isLoading} onPress={handleSubmit} buttonTitle='SUBMIT' />
        </View>

      </View>

    </View>
  );
}

Home.propTypes = {
  navigation: PropTypes.object,
};

Home.defaultProps = {
  navigation: {},
};

module.exports = Home;
