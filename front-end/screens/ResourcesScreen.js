import React from 'react';
import { Text, View, Button } from 'react-native';
import { styles } from '../styles/styles';
import ResourceScrollView from '../components/ResourceScrollView';


function ResourcesScreen({navigation}) {
  
  return (
    <ResourceScrollView
      navigationProp={navigation}
      navigationPath="Details"
      searchProp="all"
      filterProp="all"
    />
  )

}
export default ResourcesScreen;
