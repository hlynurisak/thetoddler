import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useBoardsContext } from '@/hooks/useBoardsContext';
import { useListsContext } from '@/hooks/useListsContext';
import { useTasksContext } from '@/hooks/useTasksContext';
import AddListModal from '@/components/AddListModal';
import EditListModal from '@/components/EditListModal';
import AddTaskModal from '@/components/AddTaskModal';
import EditTaskModal from '@/components/EditTaskModal';
import TaskItem from '@/components/TaskItem';

// Main component for displaying a board with its lists and tasks
export default function Board() {
  // Define route prop types to extract boardId from navigation parameters
  type BoardRouteProp = RouteProp<{ Board: { boardId: number } }, 'Board'>;
  const route = useRoute<BoardRouteProp>();

  // Access boards, lists, and tasks from context
  const { boards } = useBoardsContext();
  const { lists, setLists } = useListsContext();
  const { tasks, setTasks } = useTasksContext();

  // State variables for modal visibility and selected items
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingList, setEditingList] = useState<{ id: number; name: string; color: string; boardId: number } | null>(null);
  const [addTaskModalVisible, setAddTaskModalVisible] = useState(false);
  const [editTaskModalVisible, setEditTaskModalVisible] = useState(false);
  const [selectedListId, setSelectedListId] = useState<number | null>(null);
  const [selectedTask, setSelectedTask] = useState<{ id: number; name: string; description: string; isFinished: boolean; listId: number } | null>(null);

  // Get the board ID from route parameters and find the corresponding board
  const BoardId = +(route.params?.boardId);
  const board = boards.find((b) => b.id === BoardId);

  // Functions to filter lists and tasks based on board or list IDs
  const getListsForBoard = (boardId: number) =>
    lists.filter((list) => list.boardId === boardId);

  const getTasksForList = (listId: number) =>
    tasks.filter((task) => task.listId === listId);

  // Handlers for adding, editing, and deleting lists
  const handleAddList = (newList: { id: number; name: string; color: string; boardId: number; }) => {
    setLists((prevLists) => [...prevLists, newList]);
  };

  const handleEditList = (updatedList: { id: number; name?: string; color?: string; boardId?: number; }) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === updatedList.id
          ? { ...list, ...updatedList }
          : list
      )
    );
  };

  const handleDeleteList = (listId: number) => {
    setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
  };

  // Handlers for adding, editing, and deleting tasks
  const handleAddTask = (newTask: { id: number; name: string; description: string; isFinished: boolean; listId: number; }) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setAddTaskModalVisible(false);
  };

  const handleEditTask = (updatedTask: { id: number; name?: string; description?: string; isFinished?: boolean; listId?: number; }) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
    );
  };
  
  const handleDeleteTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };
  
  // If the board is not found, display an error message
  if (!board) {
    return <Text style={styles.errorText}>Board not found. Please select a valid board.</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Render the lists for the board */}
      <FlatList
        style={styles.flatlist}
        data={getListsForBoard(BoardId)}
        keyExtractor={(list) => list.id.toString()}
        ListHeaderComponent={
          // Header component showing board details
          <View style={styles.boardDetails}>
            <Image source={{ uri: board.thumbnailPhoto }} style={styles.boardImage} />
            <Text style={styles.boardTitle}>{board.name}</Text>
            {board.description && <Text style={styles.boardDescription}>{board.description}</Text>}
          </View>
        }
        renderItem={({ item: list }) => (
          <View style={[styles.list, { borderColor: list.color }]}>
            <View style={styles.listHeader}>
              <Text style={[styles.listTitle, { color: 'black' }]}>
                {list.name}
              </Text>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* Button to add a new task to the list */}
                <TouchableOpacity
                  onPress={() => {
                    setAddTaskModalVisible(true);
                    setSelectedListId(list.id);
                  }}
                  style={{ marginRight: 10 }}
                >
                  <MaterialIcons name="add" size={24} color="black" />
                </TouchableOpacity>
                {/* Button to edit the list */}
                <TouchableOpacity
                  onPress={() => {
                    setEditingList(list);
                    setEditModalVisible(true);
                  }}
                >
                  <MaterialIcons name="more-vert" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            {/* Render the tasks within the list */}
            <FlatList
              data={getTasksForList(list.id)}
              keyExtractor={(task) => task.id.toString()}
              renderItem={({ item: task }) => (
                <TaskItem
                  name={task.name}
                  description={task.description}
                  isFinished={task.isFinished}
                  onPress={() => {
                    setSelectedTask(task);
                    setEditTaskModalVisible(true);
                  }}
                />
              )}
            />
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 50 }}
      />

      {/* Button to create a new list */}
      <TouchableOpacity style={styles.addButton} onPress={() => setAddModalVisible(true)}>
        <Text style={styles.addButtonText}>Create New List</Text>
      </TouchableOpacity>

      {/* Modals for adding and editing lists */}
      <AddListModal
        boardId={BoardId}
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onSave={handleAddList}
      />

      {editingList && (
        <EditListModal
          visible={editModalVisible}
          onClose={() => setEditModalVisible(false)}
          onEditList={() => {
            handleEditList({
              id: editingList.id,
              name: editingList.name,
              color: editingList.color,
              boardId: editingList.boardId,
            });
            setEditModalVisible(false);
          }}
          listName={editingList.name}
          setListName={(name) =>
            setEditingList((prev) => (prev ? { ...prev, name } : prev))
          }
          listColor={editingList.color}
          setListColor={(color) =>
            setEditingList((prev) => (prev ? { ...prev, color } : prev))
          }
          onDelete={() => {
            handleDeleteList(editingList.id);
            setEditModalVisible(false);
          }}
        />
      )}

      {/* Modals for adding and editing tasks */}
      {selectedListId && (
        <AddTaskModal
          visible={addTaskModalVisible}
          onClose={() => {
            setAddTaskModalVisible(false);
            setSelectedListId(null);
          }}
          onSave={handleAddTask}
          listId={selectedListId}
        />
      )}

      {selectedTask && (
        <EditTaskModal
          visible={editTaskModalVisible}
          onClose={() => setEditTaskModalVisible(false)}
          onEditTask={(updatedTask) => {
            handleEditTask(updatedTask);
            setEditTaskModalVisible(false);
            setSelectedTask(null);
          }}
          taskId={selectedTask?.id || 0}
          taskName={selectedTask?.name || ''}
          setTaskName={(name) =>
            setSelectedTask((prev) => (prev ? { ...prev, name } : prev))
          }
          taskDescription={selectedTask?.description || ''}
          setTaskDescription={(description) =>
            setSelectedTask((prev) => (prev ? { ...prev, description } : prev))
          }
          taskIsFinished={selectedTask?.isFinished || false}
          setTaskIsFinished={(isFinished) =>
            setSelectedTask((prev) => (prev ? { ...prev, isFinished } : prev))
          }
          selectedList={selectedTask?.listId || 0}
          setSelectedList={(listId) =>
            setSelectedTask((prev) => (prev ? { ...prev, listId } : prev))
          }
          lists={getListsForBoard(BoardId)}
          onDelete={() => {
            handleDeleteTask(selectedTask.id);
            setEditTaskModalVisible(false);
            setSelectedTask(null);
          }}
        />
      )}
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  flatlist: {
    paddingBottom: 50,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  boardDetails: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  boardImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  boardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  boardDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  list: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    borderWidth: 3,
    backgroundColor: '#f9f9f9',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 5,
    marginBottom: 5,
    borderRadius: 4,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    alignSelf: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
