import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';

const popularBooks = [
  { 
    id: '1', 
    title: 'Fashionopolis', 
    author: 'Dana Thomas', 
    cover: require('../assets/book1.png'),
    price: '$24.00', 
    desc: 'Fashionopolis.' 
  },
  { 
    id: '2', 
    title: 'Chanel', 
    author: 'Patrick Mauriès', 
    cover: require('../assets/book2.png'), 
    price: '$55.00', 
    desc: 'Chanel Catwalk.' 
  },
  { 
    id: '3', 
    title: 'Calligraphy', 
    author: 'June & Lucy', 
    cover: require('../assets/book3.png'), 
    price: '$55.00', 
    desc: 'Calligraphy.' 
  },
];

const newestBooks = [
  { 
    id: '4', 
    title: 'Yves Saint Laurent', 
    author: 'Suzy Menkes', 
    cover: require('../assets/newbook1.png'), 
    price: '$46.99', 
    desc: 'A spectacular visual journey through 40 years of haute couture from one of the best-known and most trend-setting brands in fashion.' ,
    rating:4
  },
  { 
    id: '5', 
    title: 'The Book of Signs', 
    author: 'Rudolf Koch', 
    cover: require('../assets/newbook2.png'), 
    price: '$18.00', 
    desc: 'The Book of Signs.' ,
    rating:3
  },
  { 
    id: '6', 
    title: 'Stitched Up', 
    author: 'Tansy E. Hoskins', 
    cover: require('../assets/newbook3.png'), 
    price: '$55.00', 
    desc: 'Stitched Up.' ,
    rating:3
  },
];

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const renderStars = (rating) => {
    return (
      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((index) => (
          <Image
            key={index}
            source={
              index <= rating
                ? require('../assets/icon/starfilled.png')
                : require('../assets/icon/star.png')
            }
            style={styles.starIcon}
          />
        ))}
      </View>
    );
  };
  const renderBookItem = ({ item }) => (
    <TouchableOpacity style={styles.bookCard} onPress={() => router.push({ pathname: '/details', params: item })}>
      <Image source={item.cover} style={styles.coverImage} />
      {item.rating && renderStars(item.rating)}
      <Text style={styles.bookTitle} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.author}>{item.author}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setIsDrawerOpen(true)}>
          <Image source={require('../assets/icon/menu.png')} style={styles.customIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../assets/icon/search.png')} style={styles.customIcon} />
          </TouchableOpacity>
        </View>
      <ScrollView style={styles.container}>
        
        <Text style={styles.sectionTitle}>Popular Books</Text>
        <FlatList data={popularBooks} renderItem={renderBookItem} keyExtractor={item => item.id} horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }} />

        <Text style={styles.sectionTitle}>Newest</Text>
        <FlatList data={newestBooks} renderItem={renderBookItem} keyExtractor={item => item.id} horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }} />
        
        <View style={{ height: 40 }} />
      </ScrollView>

      {isDrawerOpen && (
        <View style={styles.drawerOverlay}>
          <View style={styles.drawerContent}>
            <Text style={styles.drawerTitle}>Menu</Text>
            
            <TouchableOpacity style={styles.drawerItemContainer}>
              <Image source={require('../assets/icon/home.png')} style={styles.drawerItemIcon} />
              <Text style={styles.drawerItemText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.drawerItemContainer}>
              <Image source={require('../assets/icon/account.png')} style={styles.drawerItemIcon} />
              <Text style={styles.drawerItemText}>Account</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.drawerItemContainer}>
              <Image source={require('../assets/icon/setting.png')} style={styles.drawerItemIcon} />
              <Text style={styles.drawerItemText}>Settings</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.drawerCloseArea} activeOpacity={1} onPress={() => setIsDrawerOpen(false)} />
        </View>
      )}

    <View style={styles.bottomBar}>
        
    <TouchableOpacity style={styles.tabItem}>
      <Image 
        source={require('../assets/icon/home.png')} 
        style={[styles.tabIcon, { tintColor: '#4A00E0' }]} 
      />
      <Text style={[styles.tabText, { color: '#4A00E0' }]}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.tabItem}>
      <Image 
        source={require('../assets/icon/bookmark.png')} 
        style={[styles.tabIcon, { tintColor: 'gray' }]} 
      />
      <Text style={styles.tabText}>Wishlist</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.tabItem}>
      <Image 
        source={require('../assets/icon/mybook.png')} 
        style={[styles.tabIcon, { tintColor: 'gray' }]} 
      />
      <Text style={styles.tabText}>My books</Text>
    </TouchableOpacity>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: { flex: 1, backgroundColor: '#fff' },
  header: { paddingTop: 20, paddingHorizontal: 16, paddingBottom: 10,flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'},
  hamburgerIcon: { fontSize: 30, color: '#333' },
  studentInfo: { fontSize: 14, color: 'gray', marginHorizontal: 16, marginTop: 10 },
  sectionTitle: { fontFamily: 'Roboto',fontSize: 24, fontWeight: 'bold', marginLeft: 16, marginTop: 20, marginBottom: 16 },
  bookCard: { marginRight: 16, width: 140 },
  coverImage: { width: 140, height: 200, borderRadius: 8, backgroundColor: '#eee', marginBottom: 8 },
  bookTitle: { fontFamily: 'Roboto',fontSize: 16, fontWeight: '600', marginBottom: 4 },
  author: { fontFamily: 'Roboto',fontSize: 12, color: '#666666' },
  drawerItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,    
  },
  drawerItemIcon: {
    width: 24,        
    height: 24,
    marginRight: 16,    
    resizeMode: 'contain',
  },
  drawerItemText: {
    fontSize: 20,
    color: '#333',
  },
  drawerOverlay: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, flexDirection: 'row' },
  drawerContent: { width: 250, backgroundColor: '#fff', paddingTop: 80, paddingHorizontal: 20, shadowColor: "#000", shadowOffset: { width: 2, height: 0 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 15 },
  drawerCloseArea: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  drawerTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 40 }, 
  bottomBar: {
    flexDirection: 'row',      
    justifyContent: 'space-around',
    alignItems: 'center',     
    backgroundColor: '#fff',
    paddingVertical: 10,         
              
    borderTopWidth: 1,           
    borderTopColor: '#eee',
  },
  tabItem: {
    alignItems: 'center', 
    flex : 1,      
  },
  tabText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 4,                
    fontWeight: '500',
  },
  starsRow: {
    flexDirection: 'row', 
    marginRight: 8,       
  },
  starIcon: {
    width: 20,            
    height: 20,
    marginRight: 4,     
    paddingBottom:  5,   
    resizeMode: 'contain',
  },
});