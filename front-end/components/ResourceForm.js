import React, { useState, useEffect } from 'react';
import { Text, View, Button, TextInput, StyleSheet} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { styles } from '../styles/styles';
import { myUrl } from '../myUrl';
import { useForm, Controller } from "react-hook-form";


const AddResource = (navProps) => {
    const submitData = (props)=>{
        const url = `http://${myUrl}/resources/new/`;
        var currentDate = new Date();
        currentDate= (currentDate.getDate() + "/" + (currentDate.getUTCMonth() + 1) + "/" +  currentDate.getFullYear()).toString();
        var resourceType= "blog";
        if (props.type == "3"){
          resourceType = "other";
        }
        else if (props.type == "2"){
          resourceType = "vlog"
        }
        else if (props.type != "1"){
          return console.log("error")
        }
      
        const jsonObject = {
          title:props.title,
          description:props.description,
          content:props.content,
          img:props.img,
          tags:props.tags,
          age:props.age,
          date:currentDate,
          type:resourceType,
            };
        //get current date function
        
        fetch(url,{method:"post",
        headers:
        {'Content-type':'application/json'},
        body:JSON.stringify({jsonObject
          })
      })
      .then(res=>res.text())
      .then(data=>{
        console.log(data)
      })
      .then(navProps.navigationProp.navigate("Home"))
      }

      const deleteData = (props)=>{
        const url = `http://${myUrl}/resources/del/`;
        fetch(url,{method:"post",
        headers:
        {'Content-type':'application/json'},
        body:JSON.stringify({title:props
          })
      })
      .then(res=>res.text())
      .then(data=>{
        console.log(data)
      })
      }
    const { control, handleSubmit, errors } = useForm();
return (
  <KeyboardAwareScrollView 
  resetScrollToCoords={{ x: 0, y: 0 }}
  contentContainerStyle={styles.createPage}
  scrollEnabled={true}
  >
    <Text style={{textAlign:'center'}}>Title</Text>
    <Controller
      control={control}
      render={({field: {onChange,onBlur,value}}) =>(
        <TextInput
        style={sty.input}
        onBlur={onBlur}
        onChangeText={value => onChange(value)}
        value={value}
        />
      )}
      name="title"
      rules={{required: true}}
      defaultValue=""
      />
      <Text style={{textAlign:'center'}}>Description</Text>
      <Controller
      control={control}
      render={({field: {onChange,onBlur,value}}) =>(
        <TextInput
        style={sty.input}
        onBlur={onBlur}
        onChangeText={value => onChange(value)}
        value={value}
        />
      )}
      name="description"
      rules={{required: true}}
      defaultValue=""
      />
      <Text style={{textAlign:'center'}}>Content</Text>
      <Controller
      control={control}
      render={({field: {onChange,onBlur,value}}) =>(
        <TextInput
        style={sty.input}
        onBlur={onBlur}
        onChangeText={value => onChange(value)}
        value={value}
        />
      )}
      name="content"
      rules={{required: true}}
      defaultValue=""
      />
      <Text style={{textAlign:'center'}}>Image URL</Text>
      <Controller
      control={control}
      render={({field: {onChange,onBlur,value}}) =>(
        <TextInput
        style={sty.input}
        onBlur={onBlur}
        onChangeText={value => onChange(value)}
        value={value}
        />
      )}
      name="img"
      rules={{required: true}}
      defaultValue=""
      />
      <Text style={{textAlign:'center'}}>Tags</Text>
      <Controller
      control={control}
      render={({field: {onChange,onBlur,value}}) =>(
        <TextInput
        style={sty.input}
        onBlur={onBlur}
        onChangeText={value => onChange(value)}
        value={value}
        />
      )}
      name="tags"
      rules={{required: true}}
      defaultValue=""
      />
      <Text style={{textAlign:'center'}}>Age Range</Text>
      <Controller
      control={control}
      render={({field: {onChange,onBlur,value}}) =>(
        <TextInput
        style={sty.input}
        onBlur={onBlur}
        onChangeText={value => onChange(value)}
        value={value}
        />
      )}
      name="age"
      rules={{required: true}}
      defaultValue=""
      />
      <Text style={{textAlign:'center'}}>Resource Type: write 1 for Blog, 2 for Vlog, or 3 for Other</Text>
      <Controller
      control={control}
      render={({field: {onChange,onBlur,value}}) =>(
        <TextInput
        style={sty.input}
        onBlur={onBlur}
        onChangeText={value => onChange(value)}
        value={value}
        />
      )}
      name="type"
      rules={{required: true}}
      defaultValue=""
      />
      <Button title="Submit" onPress= {handleSubmit((data) => submitData(data))}/>
  </KeyboardAwareScrollView>
);
}
export default AddResource;
const sty = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
