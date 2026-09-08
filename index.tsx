import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import TaskItem from '../components/TaskItem';
import { Task } from '../types/task';

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState('');const handleAddTask = () => {
    if (text.trim() === '') return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: text.trim(),
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setText('');
  };

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }; 
}