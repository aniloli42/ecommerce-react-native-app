import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";

import { EditProfile, ScreenHeader, ViewProfile } from "../components";
import { auth } from "../../firebase";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => setIsEdit((prev) => !prev);

  const navigation = useNavigation();

  return (
    <View>
      <ScreenHeader
        screenName={"Profile"}
        callback={() => navigation.goBack()}
      />

      {isEdit ? (
        <EditProfile handleEdit={handleEdit} />
      ) : (
        <ViewProfile handleEdit={handleEdit} />
      )}
    </View>
  );
};

export default Profile;
