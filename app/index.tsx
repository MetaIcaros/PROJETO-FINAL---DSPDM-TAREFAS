import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState('');

  // 1. Adicionar Tarefa + Validação + Limpeza + Feedback
  const handleAddTask = () => {
    if (text.trim() === '') {
      Alert.alert('Atenção', 'Não é possível adicionar uma tarefa vazia.');
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: text.trim(),
      completed: false,
    };

    setTasks((prev) => [newTask, ...prev]);
    setText('');
    Keyboard.dismiss();

    Alert.alert('Sucesso', 'Tarefa adicionada com sucesso!');
  };

  // 2. Alternar Concluída / Pendente
  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // 3. Excluir Tarefa com Confirmação (Alert)
  const handleDeleteTask = (id: string) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza de que deseja remover esta tarefa?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setTasks((prev) => prev.filter((task) => task.id !== id));
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Minhas Tarefas</Text>

      {/* ÁREA DE INPUT E BOTÃO ADICIONAR */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma nova tarefa..."
          placeholderTextColor="#9ca3af"
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleAddTask}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      {/* FLATLIST COM TODAS AS TAREFAS */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            {/* ÁREA CLICÁVEL DO ITEM (CHECKBOX + TEXTO) */}
            <TouchableOpacity
              style={styles.taskContent}
              onPress={() => handleToggleTask(item.id)}
              activeOpacity={0.7}
            >
              {/* CHECKBOX VISUAL */}
              <View
                style={[
                  styles.checkbox,
                  item.completed && styles.checkboxCompleted,
                ]}
              >
                <Text
                  style={[
                    styles.checkboxText,
                    item.completed && styles.checkboxTextCompleted,
                  ]}
                >
                  {item.completed ? '✓' : '○'}
                </Text>
              </View>

              {/* TEXTO DA TAREFA */}
              <Text
                style={[
                  styles.taskTitle,
                  item.completed && styles.taskTitleCompleted,
                ]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>

            {/* BOTÃO DE LIXEIRA */}
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteTask(item.id)}
            >
              <Text style={styles.deleteButtonText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma tarefa</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    fontSize: 16,
    marginRight: 10,
    color: '#1f2937',
  },
  addButton: {
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 40,
    fontSize: 16,
  },
  // ESTILOS DOS ITENS DA LISTA
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  taskContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#9ca3af',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxCompleted: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  checkboxText: {
    fontSize: 16,
    color: '#9ca3af',
    fontWeight: 'bold',
  },
  checkboxTextCompleted: {
    color: '#ffffff',
  },
  taskTitle: {
    fontSize: 16,
    color: '#1f2937',
    flex: 1,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  deleteButton: {
    padding: 6,
    marginLeft: 8,
  },
  deleteButtonText: {
    fontSize: 18,
  },
});