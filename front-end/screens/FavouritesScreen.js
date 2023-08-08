import React, { useState } from 'react';
import { Text, View, Button, SafeAreaView } from 'react-native';
import { styles } from '../styles/styles';
import ResourceScrollViewFavourites from '../components/ResourceScrollViewFavourites';
import { myUrl } from '../myUrl';
import { useGlobalState } from '../GlobalLoginState';


function FavouritesScreen({navigation}) {

// Function to filter the scrollview by favourites

  return (
        <ResourceScrollViewFavourites
                navigationProp={navigation}
                navigationPath="Details"
                searchProp="all"
                filterProp="favourites"
        />


  )

}
export default FavouritesScreen;