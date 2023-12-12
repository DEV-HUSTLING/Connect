import { StyleSheet, Text, View,useWindowDimensions, TouchableOpacity,Image,ScrollView, Button
    } from 'react-native'
import React,{useEffect, useState,useContext} from 'react'
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import {FIREBASE_DB} from '../FirebaseConfig';
import { AuthContext, AuthProvider } from '../AuthContext';
import Menu from './Menu';
import ChatBot from './ChatBot';
import { async } from '@firebase/util';
const ChatList = ({navigation,route}) => {

    const windowDimensions = useWindowDimensions()
    const { user} = useContext(AuthContext); // Corrected typo
    const [profilenames, setProfileNames] = useState([{
      'data':'',
      'id':''
    }]);
    const { userE, LgnuId} = route.params;
    

  
    const styles = StyleSheet.create({
        container: {
                    //  flex:1, 
            backgroundColor: '#fff',
            paddingHorizontal:4,
            // alignItems: 'center',
            // justifyContent:'center',
            height: windowDimensions.height, 
            width: windowDimensions.width 
        
          },
          card: {
            borderRadius: 8,
            borderBottomWidth:1,
            marginBottom:10,
            // backgroundColor:'#fff',
            borderBottomColor:'#DCDCDC',
            // borderColor:'#DCDCDC',
            height:80,
            alignItems:'center',
            display:'flex',
            padding:12,
            flexDirection:'row',
            justifyContent:'space-between'
          },
          shadowProp: {
            shadowColor: '#9747FF',
            shadowOffset: {width: 0, height: 0},
            shadowRadius: 1,
          },
    })
    const[friendId, setFriendsId] = useState([])
    const[frndNames, setFrndNames] = useState([{data:[],id:''}])
    useEffect(()=>{
      const fetchFriendsData = async () => {
        try {
          const FriendsProfiles = await getDoc(doc(FIREBASE_DB, 'users', LgnuId));
          if(FriendsProfiles.data().acceptList){
          setFriendsId(FriendsProfiles.data().acceptList);
      
          // const profilesPromises = 
          const profilesPromises = friendId.map(async (friendDoc) => {
            const friendProfile = await getDoc(doc(FIREBASE_DB, 'users', friendDoc));
            return { data: friendProfile.data(), id: friendProfile.id };
          });
    
          const profiles = await Promise.all(profilesPromises);
          setFrndNames(profiles);
          // await Promise.all(profilesPromises);
        }
        } 
        catch (error) {
          console.error("Error fetching friends' data:", error);
        }
          // setFrndNames([])

      };
      const fetchData = async()=>{
    const dbProfiles =  await getDocs(collection(FIREBASE_DB,'users'))
    const frndNamesSet = new Set(frndNames.map((friend) => friend.id));

    const filteredProfiles = dbProfiles.docs
      .filter((doc) => !frndNamesSet.has(doc.id))
      .map((doc) => ({ data: doc.data(), id: doc.id }));
    setProfileNames(filteredProfiles);

  
  }

  
  fetchData()
  // setProfileNames([])
  
  fetchFriendsData()

  },[user,profilenames])
  const[menu, setMenu] = useState(false)
  const[pendinglist, setPendingList] = useState([])
  // Send Friend Request
  const handleSendFriendRequest = async (friendUserId) => {
    try {
      const currentUserDocRef = doc(FIREBASE_DB, 'users', friendUserId);
      const currentUserDoc = await getDoc(currentUserDocRef);
  
      if (currentUserDoc.exists()) {
        const currentFriendRequests = currentUserDoc.data().Pending || [];
  
        if (!currentFriendRequests.includes(friendUserId)) {
          await updateDoc(currentUserDocRef, {
            Pending: [...currentFriendRequests, LgnuId],
          });
          console.log('Friend request sent successfully!');
          const sentList = currentUserDoc.data().sentReqList || [];
          if (!sentList.includes(friendUserId)) {
            await updateDoc(doc(FIREBASE_DB, 'users', LgnuId), {
              sentReqList: [...sentList, friendUserId],
            });

          }
          setPendingList([...sentList,friendUserId])

        } else {
          console.log('Friend request already sent.');
        }
      } else {
        console.log('Current user document not found.');
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };


  return (
    <View style={styles.container}>
      <View style={{top:50,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',position:'fixed'}}>
        <View></View>
        <Text style={{fontSize:'32',fontFamily:'Avenir',fontWeight:'bold'}}>Chat</Text>
        <TouchableOpacity onPress={()=>{
          setMenu(prevcheck=>!menu);
        }}>
        <Image source={require('../assets/menu.png')} />

        </TouchableOpacity>
      </View>
      
      {/* Friends List */}
      
      {/* Total List */}
      <ScrollView style={{marginTop:80}} >
      {frndNames ? frndNames.map((items)=>
        <TouchableOpacity 
        onPress={()=>navigation.navigate('MessageText',{uId:items.id,userE,LgnuId:LgnuId})} 
        style={[styles.card, styles.shadowProp]}>
<Image
  style={{ width: 55, height: 55,borderRadius:50 }}
  source={items.data.profileImage ? { uri: items.data.profileImage } : require('../assets/prf.png')}
/>
            <Text  style={{fontWeight:'500',shadowOpacity: 0,fontSize:18,fontFamily:'Avenir',color:'green'}}>{items.data.username}</Text>
            </TouchableOpacity>

      )
      :null}
            

      {profilenames ? profilenames.map((items)=>
        <View 
        // onPress={()=>navigation.navigate('MessageText',{uId:items.id,userE})} 
        style={[styles.card, styles.shadowProp]}>
<Image
  style={{ width: 55, height: 55,borderRadius:50 }}
  source={items.data.profileImage ? { uri: items.data.profileImage } : require('../assets/prf.png')}
/>
            <Text  style={{fontWeight:'500',shadowOpacity: 0,fontSize:18,fontFamily:'Avenir',color:'green'}}>{items.data.username}</Text>
            {pendinglist.includes(items.id)?<Button onPress={()=>handleSendFriendRequest(items.id)} title='Pending'/>:
            <Button onPress={()=>handleSendFriendRequest(items.id)} title='Add Friend'/>
            }
            
            </View>

      )
      :null}
                </ScrollView>

        {menu?
        <Menu navigation={navigation} LgnuId={LgnuId} />
      :null}
    </View>
  )
}

export default ChatList

