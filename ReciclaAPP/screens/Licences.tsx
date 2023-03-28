import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import { theme as color } from '../constants/Colors';
import { NavigationScreenProp } from 'react-navigation';
// @ts-ignore
import Licences from '../constants/licenses.json';
import LicensesListItem from '../components/LicensesListItem';
import { FlatList } from 'react-native-gesture-handler';

type LicencesScreenProps = {
  navigation: NavigationScreenProp<any, any>
};

type iLicence = { 
  licenses: string; 
  repository: string; 
  licenseUrl: string; 
  parents: string; 
}

function extractNameFromGithubUrl(url: string) {
  if (!url) {
    return null;
  }

  const reg = /((https?:\/\/)?(www\.)?github\.com\/)?(@|#!\/)?([A-Za-z0-9_]{1,15})(\/([-a-z]{1,20}))?/i;
  const components = reg.exec(url);

  if (components && components.length > 5) {
    return components[5];
  }
  return null;
}

function sortDataByKey(data: any, key: string) {
  data.sort(function(a: any, b: any) {
    return a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0;
  });
  return data;
}

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

let licenses = Object.keys(Licences).map(key => {
  let { licenses, ...license } = Licences[key] as iLicence;
  if (licenses === 'UNKNOWN' ) {
    return
  }
  let [name, version] = key.split('@');

  const reg = /((https?:\/\/)?(www\.)?github\.com\/)?(@|#!\/)?([A-Za-z0-9_]{1,15})(\/([-a-z]{1,20}))?/i;
  let username =
    extractNameFromGithubUrl(license.repository) ||
    extractNameFromGithubUrl(license.licenseUrl);

  let userUrl;
  let image;
  if (username) {
    username = capitalizeFirstLetter(username)
    image = `http://github.com/${username}.png`;
    userUrl = `http://github.com/${username}`;
  }

  return {
    key,
    name,
    image,
    userUrl,
    username,
    licenses: licenses.slice(0, 405),
    version,
    ...license,
  };
});

sortDataByKey(licenses, 'username');

class Licenses extends PureComponent<{ licenses: any }> {
  renderItem = ({ item }: any) => <LicensesListItem {...item} />;
  render() {
    const { licenses } = this.props;
    if ( !licenses ) {
      return
    }
    return (
      <FlatList
        style={styles.list}
        keyExtractor={({ key }: any) => key}
        data={licenses}
        renderItem={this.renderItem}
      />
    );
  }
}

export default class LicencesScreen extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        {licenses != null && <Licenses licenses={licenses} />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  list: {
    flex: 1,
    padding: 15,
  },
})
