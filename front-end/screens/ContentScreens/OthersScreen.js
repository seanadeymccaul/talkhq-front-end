import React from 'react';
import ResourceScrollView from '../../components/ResourceScrollView';


function OthersScreen({navigation}) {

  return (
    <ResourceScrollView
      navigationProp={navigation}
      navigationPath="Details"
      searchProp="all"
      filterProp="other"
    />
  )

}
export default OthersScreen;