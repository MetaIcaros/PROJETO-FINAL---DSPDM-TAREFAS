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
  const [text, setText] = useState('');