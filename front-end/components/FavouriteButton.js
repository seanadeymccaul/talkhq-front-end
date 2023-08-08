import { useEffect, useState } from "react"
import { Button, Pressable, StyleSheet, Image } from "react-native"
import { useGlobalState, setGlobalState } from "../GlobalLoginState"
import { useGlobalState as useGlobalResourceState } from "../GlobalState"
import { myUrl } from "../myUrl"

const FavouriteButton = (props) => {

  if (props.Title !== undefined){
    var titlename = props.Title
  } else {
    var titlename = JSON.parse(JSON.stringify(useGlobalResourceState("title")[0]))
  }
  const username = JSON.parse(JSON.stringify(useGlobalState("email")[0]));

  // Function for toggling the favourite
  async function ManageFavourite(titlename){

    // Send a post request with username and favourite in the body
    const response = await fetch(`http://${myUrl}/resources/favourites/manage`,{
      method: 'post',
      mode: 'no-cors',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          name: username,
          resourceName: titlename
      })
    })

    // Wait for the response
    const data = await response.json()
    // set the state and then have a useEffect
    setGlobalState("favourites",data.favourites);
    return await data.status;
  }

  // Check if titlename is in the local favourites and initialise the state variable to that
  const globalFavourites = JSON.parse(JSON.stringify(useGlobalState("favourites")[0]));
  if (globalFavourites.includes(titlename)){
    return(
      <Pressable
        onPress={() => ManageFavourite(titlename)}
        style={scrollstyle.favbutton}
      >
        <Image
                source={require('../assets/favourites.png')} 
                style={scrollstyle.image}
        >
        </Image>
      </Pressable>
    )
  } else {
    return(
      <Pressable
        onPress={() => ManageFavourite(titlename)}
        style={scrollstyle.favbutton}
      >
        <Image
                source={require('../assets/unfavourite.png')} 
                style={scrollstyle.image}
        >
        </Image>
      </Pressable>
    )
  }

}


const scrollstyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    refreshMessage:{
      width:380,
      height:30,
      resizeMode: 'contain',
      alignSelf: 'center',
      marginTop:0
    },
    image: {
      marginTop:0,
      marginBottom:0,
      resizeMode: 'contain',
      alignSelf: 'center',
      width:40,
      height:40,
      zIndex:1
    },
    resources: {
      resizeMode: 'contain',
      alignSelf: 'center',
      marginTop:10,
      marginBottom:10,
      width:320,
      height:320
    },
    scroller: {
      width:360
    },
    favbutton: {
      height: 40,
      width: 40,
    }
  })

export default FavouriteButton;