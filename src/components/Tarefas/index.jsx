import { useEffect, useRef, useState } from "react";
import { FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Task from "../Task";

import { database } from "../../services/firebaseConnection";
import { get, onValue, push, ref, set } from "firebase/database";


export default function Tasks({user}) {

  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')

  const inputRef = useRef(null)

  useEffect(() => {
    const query = ref(database, `tasks/${user.uid}`)
    onValue(query, snapshot => {
      setTasks(snapshot.val())
    })
  }, [])

  function handleAddTask() {
    if (newTask === '') return

    const dbTasks = ref(database, `tasks/${user.uid}`)

    get(dbTasks).then(snapshot => {
      let currentTasks = snapshot.val()
      let newKey = push(dbTasks).key
      let task = {key: newKey, descricao: newTask}

      if (currentTasks) {
        set(dbTasks, [...currentTasks, task])
      } else {
        set(dbTasks, [task])
      }
    })

    Keyboard.dismiss()
    setNewTask('')
  }

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Qual a próxima tarefa?"
          value={newTask}
          onChangeText={currentText => setNewTask(currentText)}
          ref={inputRef}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddTask}>
          <Text style={styles.buttonText} >+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        renderItem={({ item }) => <Task item={item} uid={user.uid} />}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#BBB',
    height: 45,
  },
  button: {
    backgroundColor: '#3EA6F2',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
})