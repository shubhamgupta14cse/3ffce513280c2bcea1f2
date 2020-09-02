import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Text, StyleSheet, TouchableOpacity, Image, View, StatusBar } from "react-native";

import Button from "../../../components/button";
import TouchableWithNavigation from "../../../components/touchableWithNavigation";

import { authService } from "../../../services";

import  { colors, images } from "../../../styles";

import Constants from "../../../utils/Constants";
import Toast from "../../../utils/Toast";
import Validator from "../../../utils/ValidateUtil";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.primaryBlue,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: colors.white,
    fontSize: 28,
    fontWeight: 'bold'
  },
});

function Login({ navigation }) {
  const [isLoading, setIsLoading] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  function login() {
    setIsLoading(true);
    authService
      .login(email, password)
      .then()
      .catch(Toast.error)
      .finally(() => setIsLoading(false));
  };

  return (
    <View style={styles.root}>
      <StatusBar backgroundColor={colors.primaryBlue} barStyle='light-content' />
      <Text style={styles.title}> Login screen </Text>
    </View>
  );
}

Login.propTypes = {
  navigation: PropTypes.object,
};

Login.defaultProps = {
  navigation: {},
};

module.exports = Login;
