import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Text, StyleSheet, TouchableOpacity, Image, View, StatusBar } from "react-native";
import { Content, Input, Item } from "native-base";

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

function Register({ navigation, actions }) {
  const [isLoading, setIsLoading] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [confirmPassword, setConfirmPassword] = React.useState();

  function register() {
    // const validate = Validator.validateForm({ email, password });
    // if (validate !== true) return Toast.warning(validate);
    setIsLoading(true);
    authService
      .register(email, password)
      .then()
      .catch(Toast.error)
      .finally(() => setIsLoading(false));
  };

  return (
    <View style={styles.root}>
      <StatusBar backgroundColor={colors.primaryBlue} barStyle='light-content' />
      <Text style={styles.title}> Register screen </Text>
    </View>
  );
}

Register.propTypes = {
  navigation: PropTypes.object,
};

Register.defaultProps = {
  navigation: {},
};

module.exports = Register;
