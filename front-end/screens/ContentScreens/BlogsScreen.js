import React from 'react';
import ResourceScrollView from '../../components/ResourceScrollView';



function BlogsScreen({navigation}) {

  return (
    <ResourceScrollView
      navigationProp={navigation}
      navigationPath="Details"
      searchProp="all"
      filterProp="blog"
    />
  )
}

export default BlogsScreen;