import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { database } from "../../services/firebaseConnection";
import { get, ref, set } from "firebase/database";
import { useEffect, useRef, useState } from "react";

const TASK_TYPES = {VIEW: 'VIEW', EDIT: 'EDIT'}

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function Task({ item, uid }) {

  const { key, descricao } = item

  const [taskMode, setTaskMode] = useState(TASK_TYPES.VIEW)
  const [editInput, setEditInput] = useState('')

  const inputRef = useRef(null)

  function handleDelete() {
    const dbTasks = ref(database, `tasks/${uid}`)

    get(dbTasks).then(snapshot => {
      let currentTasks = snapshot.val()
      let updatedTasks = currentTasks.filter(item => item.key !== key)
      set(dbTasks, updatedTasks)
    })
  }

  function handleEdit() {
    setTaskMode(TASK_TYPES.EDIT)
    setEditInput(descricao)
  }

  function handleUpdate() {
    if (editInput === '') {
      setTaskMode(TASK_TYPES.VIEW)
      return
    }

    const dbTasks = ref(database, `tasks/${uid}`)

    get(dbTasks).then(snapshot => {
      let currentTasks = snapshot.val()

      let index = currentTasks.findIndex(item => item.key === key)
      currentTasks.splice(index, 1, {key: key, descricao: editInput})

      set(dbTasks, currentTasks)
    })

    setTaskMode(TASK_TYPES.VIEW)
  }

  return (
    <View style={styles.container}>
      {(taskMode === TASK_TYPES.VIEW) ?
        <>
          <TouchableWithoutFeedback onPress={handleEdit}>
            <View style={{flex: 1}}>
              <Text style={styles.text}>{descricao}</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableOpacity onPress={handleDelete}>
            <FontAwesome name="check" size={25} color="#30cd6cb7" />
          </TouchableOpacity>
        </>
      :
        <>
          <TextInput
            style={[styles.text, {flex: 1}]}
            value={editInput}
            onChangeText={currentText => setEditInput(currentText)}
            ref={inputRef}
            onLayout={() => inputRef.current.focus()}
          />

          <TouchableOpacity onPress={handleUpdate} style={{marginLeft: 5}}>
            <FontAwesome name="check" size={25} color="#333" />
          </TouchableOpacity>
        </>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    borderColor: '#DDD',
    borderWidth: 0.4,
  },
  text: {
    paddingRight: 10,
    fontSize: 15,
    color: '#333'
  }
})