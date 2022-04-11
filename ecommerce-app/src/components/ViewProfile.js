import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { buttonOpacity, spacing } from '../styles/utils';
import colors from '../styles/colors';
import { useUserContext } from '../context/UserContext';

const ViewProfile = ({ handleEdit }) => {
  const { user } = useUserContext();
  return (
    <View style={styles.viewWrapper}>
      <View style={styles.sectionWrapper}>
        <Text style={[fonts.regular, styles.sectionTitle]}>Profile Name</Text>
        <Text style={[fonts.light, styles.sectionText]}>{user?.name}</Text>
      </View>

      <View style={styles.sectionWrapper}>
        <Text style={[fonts.regular, styles.sectionTitle]}>Email Address</Text>
        <Text style={[fonts.light, styles.sectionText]}>{user?.email}</Text>
      </View>

      <View style={styles.sectionWrapper}>
        <Text style={[fonts.regular, styles.sectionTitle]}>Phone Number</Text>
        <Text style={[fonts.light, styles.sectionText]}>
          {user?.phoneNumber}
        </Text>
      </View>

      <TouchableOpacity
        activeOpacity={buttonOpacity.active}
        onPress={handleEdit}
        style={styles.editProfileButton}
      >
        <Text style={styles.editProfileButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ViewProfile;

const styles = StyleSheet.create({
  viewWrapper: {
    margin: spacing.min,
  },

  // section
  sectionWrapper: {
    marginBottom: spacing.min * 0.75,
  },
  sectionTitle: {
    fontSize: 14,
    color: colors.mediumGray,
  },
  sectionText: {
    fontSize: 18,
  },

  // button section
  editProfileButton: {
    alignSelf: 'flex-start',
  },

  editProfileButtonText: {
    backgroundColor: colors.tintBrown,
    paddingHorizontal: spacing.min,
    paddingVertical: spacing.min * 0.5,
    borderRadius: 50,
    color: colors.white,
  },
});
