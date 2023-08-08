import React from 'react';
import ResourceScrollView from '../../components/ResourceScrollView';


function VlogsScreen({navigation}) {

  return (
    <ResourceScrollView
      navigationProp={navigation}
      navigationPath="Details"
      searchProp="all"
      filterProp="vlog"
    />
  )

}
export default VlogsScreen;