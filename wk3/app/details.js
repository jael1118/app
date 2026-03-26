import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router'; 

export default function Details() {
  const book = useLocalSearchParams();
  
  // 將上一頁傳過來的分數轉成數字
  const rating = Number(book.rating);
  // 控制書籤是否被點擊的狀態
  const [isBookmarked, setIsBookmarked] = useState(false);

  // 自動畫星星的小工具
  const renderStars = (currentRating) => {
    return (
      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((index) => (
          <Image
            key={index}
            source={
              index <= currentRating
                ? require('../assets/icon/starfilled.png')
                : require('../assets/icon/star.png')
            }
            style={styles.starIcon}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Image source={require('../assets/icon/back.png')} style={styles.customIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsBookmarked(!isBookmarked)}>
          <Image 
            source={
              isBookmarked 
                ? require('../assets/icon/bookmarkfilled.png') 
                : require('../assets/icon/bookmark.png') 
            } 
            style={[styles.customIcon, isBookmarked && { tintColor: '#4A00E0' }]} 
          />
        </TouchableOpacity>
      </View>

      <Image source={Number(book.cover)} style={styles.coverImage} />
      
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>{book.author}</Text>
      
      {rating > 0 && (
        <View style={styles.ratingContainer}>
          {renderStars(rating)}
          <Text style={styles.ratingText}>{rating}.0 / 5.0</Text>
        </View>
      )}

      <Text style={styles.desc}>{book.desc}</Text>

      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyText}>BUY NOW FOR {book.price}</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 24,
    paddingTop: 20,
  },
  header: { 
    width: '100%', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 40,
  },
  customIcon: { 
    width: 28,            
    height: 28, 
    resizeMode: 'contain' 
  },
  ratingContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 16,
  },
  starsRow: {
    flexDirection: 'row', 
    marginRight: 8,       
  },
  starIcon: {
    width: 20,            
    height: 20,
    marginRight: 4,       
    resizeMode: 'contain',
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Roboto',
  },
  coverImage: { width: 200, height: 300, borderRadius: 8, marginBottom: 24 },
  title: { fontFamily: 'Roboto',fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  author: { fontFamily: 'Roboto',fontSize: 12, color: '#666', marginBottom: 12 },
  desc: { fontFamily: 'Roboto',fontSize: 14, color: '#333', textAlign: 'center', lineHeight: 24, marginBottom: 40 },
  buyButton: { backgroundColor: '#6200EE', paddingVertical: 16, paddingHorizontal: 32, borderRadius: 8, width: '70%', alignItems: 'center' },
  buyText: { fontFamily: 'Roboto',color: '#fff', fontSize: 16, fontWeight: 'bold' }
});