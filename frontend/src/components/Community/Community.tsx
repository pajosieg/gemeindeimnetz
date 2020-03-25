import * as React from "react";
import { withAuthenticator } from "aws-amplify-react"; // or 'aws-amplify-react-native';
import Amplify, { Auth } from "aws-amplify";
import aws_settings from "../../aws_settings";
import Authentication from "../../Stores/Authentication";

Amplify.configure(aws_settings);

// You can get the current config object
// const currentConfig = Auth.configure(null);
// console.log(currentConfig);

interface IUserProps {}

export const Community = withAuthenticator(() => {
  React.useEffect(() => {
    Auth.currentAuthenticatedUser({
      bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then(user => {
        Authentication.authenticate(user);
      })
      .catch(err => {
        Authentication.logout();
      });
  }, []);

  return <div>User</div>;
});
