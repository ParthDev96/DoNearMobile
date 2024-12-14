import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Components from '.';
import config from '../config';
import moment from 'moment';

const DatePickerComponent = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setOpen(true)}
        style={styles.expiryButton}>
        <Components.NestedTextComponent
          valueText={moment(date).format('MMMM Do YYYY')}
          titleText="Expiry date: "
        />
      </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        minimumDate={new Date()}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  expiryTitle: {},
  expiryButton: {
    backgroundColor: config.colors.COLOR_TRANSPARENT,
    alignItems: 'flex-start',
  },
  container: {
    justifyContent: 'center',
    margin: 20,
  },
  dateText: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default DatePickerComponent;
