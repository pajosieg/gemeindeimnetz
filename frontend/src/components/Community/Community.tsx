import * as React from "react";
import { withAuthenticator } from "aws-amplify-react"; // or 'aws-amplify-react-native';
import Amplify, { Auth, Hub } from "aws-amplify";
import Authentication from "../../Stores/Authentication";
import aws_settings from "../../aws_settings";

Amplify.configure(aws_settings);

// You can get the current config object
// const currentConfig = Auth.configure(null);
// console.log(currentConfig);

Auth.currentAuthenticatedUser({
  bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
})
  .then(user => {
    console.log("auth user:", user);
    Authentication.authenticate(user);
  })
  .catch(err => {
    Authentication.logout();
  });

const authenticationListener = (data: any) => {
  switch (data.payload.event) {
    case "signIn":
      console.log("signIn event data:", data.payload);
      Authentication.authenticate(data.payload.data);
      break;
    case "signOut":
      console.log("signOut event data:", data.payload);
      Authentication.logout();
      break;
  }
};

interface IUserProps {}

export const Community = withAuthenticator(() => {
  Hub.listen("auth", authenticationListener);
  // React.useEffect(() => {
  //   Auth.currentAuthenticatedUser({
  //     bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  //   })
  //     .then(user => {
  //       console.log("auth user:", user);
  //       Authentication.authenticate(user);
  //     })
  //     .catch(err => {
  //       Authentication.logout();
  //     });
  // }, []);

  return <div>User</div>;
});
