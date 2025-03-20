import React from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native"
import { FontAwesome } from "@expo/vector-icons"

const EquipmentCard = ({ equipment, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Equipment Image */}
      <Image source={{ uri: equipment.imageUrl }} style={styles.image} />

      {/* Details Section */}
      <View style={styles.details}>
        <View style={styles.info}>
            <Text style={styles.name}>{equipment.name}</Text>
            <Text style={styles.price}>{equipment.price} جنيه</Text>
            <Text style={styles.location}>{equipment.location}</Text>
        </View>

        {/* Buttons Row */}
        <View style={styles.actions}>

        {/* Favorite Button */}
        <TouchableOpacity style={styles.favoriteButton}>
            <FontAwesome name="heart-o" size={20} color="red" />
        </TouchableOpacity>

          {/* Call Button */}
          <TouchableOpacity style={styles.callButton}>
            <FontAwesome name="phone" size={20} color="white" />
            <Text style={styles.callText}>اتصل الآن</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    overflow: "hidden",
    marginBottom: 15,
    /*elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,*/
    flexDirection: "row-reverse",
  },
  image: {
    width: '40%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    resizeMode: "cover",
  },
  details: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
    textAlign: 'right'
  },
  info: {
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    fontSize: 14,
    color: "#ff5733",
    fontWeight: "bold",
  },
  location: {
    fontSize: 12,
    color: "#666",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  callButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#28a745",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  callText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 14,
  },
  favoriteButton: {
    padding: 5,
  },
})

export default EquipmentCard
