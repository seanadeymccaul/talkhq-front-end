// const ResourceHandler = (props) => {
//   const [modalVisible, setModalVisible] = useState(false);
//   [title, setTitle] = useState('');
//   [description, setDescription] = useState('');
//   [content, setContent] = useState('');
//   [imageURL, setImageURL] = useState('');
//   [tags, setTags] = useState('');
//   [age, setAge] = useState('');
//   [type, setType] = useState('');

//   // another state with the object set (it is set when submit in clear forms before clearing)
//   [resource, setResource] = useState({
//     title:'',
//     type:'',
//     image:'',
//     content:''
//   })

//   // Function for clearing input forms
//   function ClearForms(){
//     setTitle('');
//     setDescription('');
//     setContent('');
//     setImageURL('');
//     setTags('');
//     setAge('');
//     setType('');
//     setModalVisible(true);
//   }


//     // Add resource function
//     const AddResource = (props) => {

//         const url = `http://${myUrl}/resources/new/`;
//         var currentDate = new Date();
//         currentDate= (currentDate.getDate() + "/" + (currentDate.getUTCMonth() + 1) + "/" +  currentDate.getFullYear()).toString();
//         var resourceType= "blog";
//         if (type == "3"){
//           resourceType = "other";
//         }
//         else if (type == "2"){
//           resourceType = "vlog"
//         }
//         else if (type != "1"){
//           return console.log("error")
//         }
      
//         const jsonObject = {
//           title:title,
//           description:description,
//           content:content,
//           img:imageURL,
//           tags:tags,
//           age:age,
//           date:currentDate,
//           type:resourceType,
//         };
//         // Get current date
//         fetch(url,{method:"post",
//         headers:
//         {'Content-type':'application/json'},
//         body:JSON.stringify({jsonObject
//           })
//         })
//         .then(res=>res.text())
//         .then(data=>{
//           console.log(data)
//          })
//         .then(setResource({
//             title:title,
//             type:resourceType,
//             image:imageURL,
//             content:content
//         }))
//         .then(ClearForms())
//         }

//       /*
//     // Delete resource function
//     function DeleteResource(){
//         const url = `http://${myUrl}/resources/del/`;
//         fetch(url,{method:"post",
//         headers:
//         {'Content-type':'application/json'},
//         body:JSON.stringify({title:props
//           })
//       })
//       .then(res=>res.text())
//       .then(data=>{
//         console.log(data)
//       }).then(ClearForms())
//       }*/

//     // Return
//     return(
//         <SafeAreaView
//         style={styles.container}>

//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={modalVisible}
//       onRequestClose={() => {
//         Alert.alert("Modal has been closed.");
//         setModalVisible(!modalVisible);
//       }}
//     >
//       <View style={styles.centeredView}>
//         <View style={styles.modalView}>

//           <ResourcesDisplay
//               title={resource.title}
//               type={resource.type}
//               content={resource.content}
//               image={resource.imageURL}
//           />

//           <Pressable
//             style={[styles.button, styles.buttonClose]}
//             onPress={() => setModalVisible(!modalVisible)}
//           >
//             <Text style={styles.textStyle}>Submit Resource</Text>
//           </Pressable>
//         </View>
//       </View>
//     </Modal>

//             <Text style={styles.text}>Title</Text>
//             <TextInput
//                 style={styles.input}
//                 onChangeText={setTitle}
//                 value={title}
//                 defaultValue=''
//             />
//             <Text style={styles.text}>Description</Text>
//             <TextInput
//                 style={styles.input}
//                 onChangeText={setDescription}
//                 value={description}
//                 defaultValue=''
//             />
//             <Text style={styles.text}>Content</Text>
//             <TextInput
//                 style={styles.input}
//                 onChangeText={setContent}
//                 value={content}
//                 defaultValue=''
//             />
//             <Text style={styles.text}>Image URL</Text>
//             <TextInput
//                 style={styles.input}
//                 onChangeText={setImageURL}
//                 value={imageURL}
//                 defaultValue=''
//             />
//             <Text style={styles.text}>Tags</Text>
//             <TextInput
//                 style={styles.input}
//                 onChangeText={setTags}
//                 value={tags}
//                 defaultValue=''
//             />
//             <Text style={styles.text}>Age Range</Text>
//             <TextInput
//                 style={styles.input}
//                 onChangeText={setAge}
//                 value={age}
//                 defaultValue=''
//             />
//             <Text style={styles.text}>Type (blog = 1, vlog = 2, other = 3)</Text>
//             <TextInput
//                 style={styles.input}
//                 onChangeText={setType}
//                 value={type}
//                 defaultValue=''
//             />

//             <Button title="Submit" onPress={AddResource}></Button>

//             <Button title="Delete"></Button>
            
//             <TouchableOpacity
//               style={styles.logoutBtn}
//               onPress={ManageLogoutNavigation}
//               underlayColor='#fff'
//             >
//             <Text style={styles.logoutText}>Logout</Text>
//             </TouchableOpacity>

//         </SafeAreaView>
//     )

  
// }

// const styles = StyleSheet.create({

//     image: {
//         marginTop:0,
//         marginBottom:0,
//         resizeMode: 'contain',
//         alignSelf: 'center',
//         width:50,
//         height:50
//       },
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         marginHorizontal: 16,
//       },
//     input: {
//       height: 40,
//       margin: 12,
//       borderWidth: 1,
//       padding: 10,
//     },
//     text:{
//         textAlign: 'center'
//     },
//     centeredView: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop: 22
//       },
//       modalView: {
//         margin: 20,
//         backgroundColor: "white",
//         borderRadius: 20,
//         padding: 35,
//         alignItems: "center",
//         shadowColor: "#000",
//         shadowOffset: {
//           width: 0,
//           height: 2
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5
//       },
//       button: {
//         borderRadius: 20,
//         padding: 10,
//         elevation: 2
//       },
//       buttonOpen: {
//         backgroundColor: "#F194FF",
//       },
//       buttonClose: {
//         backgroundColor: "#2196F3",
//       },
//       textStyle: {
//         color: "white",
//         fontWeight: "bold",
//         textAlign: "center"
//       },
//       modalText: {
//         marginBottom: 15,
//         textAlign: "center"
//       },
//       logoutBtn:{
//         marginRight:10,
//         marginLeft:10,
//         marginTop:10,
//         marginBottom:20,
//         paddingTop:10,
//         paddingBottom:10,
//         backgroundColor:COLOURS.darkGrey,
//         borderRadius:10,
//         borderWidth: 1,
//         borderColor: '#fff',
//       },
//       logoutText:{
//         color:'#fff',
//         textAlign:'center',
//         paddingLeft : 10,
//         paddingRight : 10,
//         fontFamily:'Quicksand_400Regular',
//         fontSize:20,
//       },
//   });

// export default ResourceHandler;