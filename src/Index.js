import React, { useState, useRef,  useEffect } from 'react'
import { View, TextInput , StyleSheet, SafeAreaView, Platform, TouchableOpacity, FlatList, Image, Text, Modal} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 
import { EvilIcons } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';

//<FontAwesome name="sort-alpha-desc" size={24} color="black" /> // sort in descending order

const Index= () => {
    const [search, setSearch] = useState('')
    const [ind, setInd] = useState(0)
    const [data, setData] = useState([])
    const [prevData, setPrevData] = useState([])
    const [sort, setSort] = useState([])
    const [toggle, setToggle] = useState(true)
    const listRef = useRef()

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(response => {
            setData(response);
            setPrevData(response);
        });

    }, []);
    const onSearch = (text) => {
        if (text == '') {
            setData(prevData)
        } else {
            let searchList = data.filter((item) => {
                return item.title.toLowerCase().indexOf(text.toLowerCase()) >-1
             })
             setData(searchList)
        }
        
    }
    return (
        <SafeAreaView style={styles.container}>
            <View //style={styles.header}
            >
            <LinearGradient
                colors={['#448AFF','#4c669f', '#3b5998', '#192f6a']}
                style={styles.header}
                >
                     <Text style={styles.headerText}>"Quality products for half the price"</Text>
            </LinearGradient>
                
            </View>
            <View style={styles.inputWrapper}>
                <View style={styles.leftWrapper}>
                    {/* Search icon imported from expo icon library */}
                    <FontAwesome name="search" size={24} color="black" style={styles.searchIcon} />
                    <TextInput
                    style={styles.textInput}
                    value={search}
                    placeholder='Search '
                    onChangeText={text => {
                        onSearch(text);
                        setSearch(text);
                    }}
                    />
                    {search == '' ? null : (
                        <TouchableOpacity style={styles.close}
                        onPress={() => {
                            onSearch('');
                            setSearch('');
                        }}
                        >
                            <EvilIcons name="close" size={16} color="black" />
                        </TouchableOpacity>
                    
                    )}
                    </View>

                {toggle == true ? <TouchableOpacity style={styles.rightWrapper}
                onPress={() => {
                    let sortList = data.sort((a,b) => a.title> b.title ? 1 : -1);
                     setSort(sortList);
                    listRef.current.scrollToIndex({animated: true, index: 0});
                    setToggle(false)
                }}>
                    <FontAwesome name="sort-alpha-asc" size={24} color="black" />
                </TouchableOpacity> :
                <TouchableOpacity style={styles.rightWrapper}
                onPress={() => {
                    let sortList = data.sort((a,b) => b.title> a.title ? 1 : -1);
                     setSort(sortList);
                    listRef.current.scrollToIndex({animated: true, index: 0});
                    setToggle(true)
                }}>
                    <FontAwesome name="sort-alpha-desc" size={24} color="black" />
                </TouchableOpacity>}
            </View>
            <FlatList
            data={data}
            initialScrollIndex={ind}
            ref={listRef}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
                return (
                    <View style={[styles.itemContainer, {marginBottom: index == data.length - 1 ? 20 : 0}]}>
                        <Image
                        source={{uri: item.image}}
                        style={styles.itemImage}
                        />
                        <View style={styles.itemRightWrapper}>
                           <Text style={styles.itemTitle}>
                            {item.title.substring(0,32)}
                           </Text>
                           <Text style={styles.itemDescription}>
                            {item.description.substring(0,200)}
                           </Text>
                           <Text style={styles.itemPrice}>
                            {'$ ' + item.price}
                           </Text>
                        </View>
                    </View>
                )
            }}
            />
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      ...Platform.select({
        android: {
          paddingTop: 35,
        
        },
    })
    },
    header:{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 100
    },
    headerText: {
        color: 'white',
        fontStyle: 'italic',
        fontSize: 14, 
        fontWeight: '600',
    },
    inputWrapper: {
        width: '100%',
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        justifyContent: 'space-between',
    },
    leftWrapper: {
        width: '80%',
        height: 50, 
        borderRadius: 10,
        borderWidth: 0.3,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
    },
    searchIcon:{
        marginLeft: 15
    },
    textInput: {
        width: '76%',
        height: 60,
        marginLeft: 15
    },
    close: {
        marginRight: 20,
    },
    rightWrapper: {
        marginRight: 15,
    },
    itemContainer: {
        width: '95%',
        borderRadius: 10,
        borderWidth: 1,
        alignSelf: 'center',
        marginTop: 20,
        //marginBottom: index == data.length - 1 ? 20 : 0,
        alignItems: 'center',
        flexDirection: 'row',
    },
    itemImage:{
        width: 80,
        
        height:'90%',
        marginLeft: 10,
        borderRadius: 12,
    },
    itemRightWrapper:{
        width: '80%',
    },
    itemTitle: {
        fontWeight: '600',
        fontSize: 14,
        marginLeft: 10,
        marginTop: 10,
    },
    itemDescription:{
        fontSize: 12,
        margin: 10
    },
    itemPrice:{
        marginLeft: 10,
        fontSize: 18,
        color: '#A7F007',
        fontWeight: '600',
        marginBottom: 20,
        
    }


  });
export default Index
