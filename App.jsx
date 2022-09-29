import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';
import Login from './src/components/Login';
import Tasks from './src/components/Tarefas';


export default function App() {

  const [user, setUser] = useState(null)

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={styles.container.backgroundColor} barStyle='dark-content' />
      <SafeAreaView>
        { (!user) ? <Login setUser={setUser} /> : <Tasks user={user}/> }
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 10,
    backgroundColor: '#F2F6FC',
  },
});
