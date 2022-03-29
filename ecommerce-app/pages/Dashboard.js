import { SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native'
import { ProductCard } from '../components'

// Custom
import styles from '../styles/Dashboard.style'
import fonts from '../styles/fonts'

const Dashboard = () => {
  return (
    <SafeAreaView style={[styles.container]}>
      <View></View>
      <View>
        <Text style={[styles.brandTitle, fonts.medium]}>
          Elegant Collection
        </Text>

        {/* Search Box */}
        <TextInput
          placeholder='Search'
          style={[styles.searchBox, fonts.regular]}
        />
      </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.productContainer]}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Dashboard
