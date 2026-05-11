import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, isSameDay } from 'date-fns';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  project: string;
  status: 'pending' | 'in-progress' | 'completed';
}

const CalendarComponent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete School Construction Phase 1',
      description: 'Foundation and structural work',
      dueDate: new Date(2026, 5, 15),
      priority: 'high',
      project: 'School Construction',
      status: 'in-progress'
    },
    {
      id: '2',
      title: 'Water Supply Installation',
      description: 'Install main water pipes and pumps',
      dueDate: new Date(2026, 5, 20),
      priority: 'high',
      project: 'Water Supply',
      status: 'pending'
    },
    {
      id: '3',
      title: 'Road Construction Survey',
      description: 'Complete land survey and planning',
      dueDate: new Date(2026, 5, 10),
      priority: 'medium',
      project: 'Road Construction',
      status: 'completed'
    },
    {
      id: '4',
      title: 'Healthcare Center Equipment',
      description: 'Install medical equipment and furniture',
      dueDate: new Date(2026, 5, 25),
      priority: 'medium',
      project: 'Healthcare Center',
      status: 'pending'
    },
    {
      id: '5',
      title: 'Solar Panel Installation',
      description: 'Install solar panels and battery systems',
      dueDate: new Date(2026, 6, 5),
      priority: 'low',
      project: 'Solar Power',
      status: 'pending'
    }
  ]);

  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: format(new Date(), 'yyyy-MM-dd'),
    priority: 'medium' as 'low' | 'medium' | 'high',
    project: '',
    status: 'pending' as 'pending' | 'in-progress' | 'completed'
  });

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => isSameDay(task.dueDate, date));
  };

  const getTileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view !== 'month') return null;
    
    const dayTasks = getTasksForDate(date);
    if (dayTasks.length === 0) return null;

    const hasHighPriority = dayTasks.some(task => task.priority === 'high');
    const hasOverdue = dayTasks.some(task => task.dueDate < new Date() && task.status !== 'completed');

    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '20px',
        marginTop: '2px'
      }}>
        {hasOverdue && (
          <div style={{
            width: '6px',
            height: '6px',
            backgroundColor: '#dc3545',
            borderRadius: '50%',
            margin: '0 1px'
          }} title="Overdue tasks" />
        )}
        {hasHighPriority && !hasOverdue && (
          <div style={{
            width: '6px',
            height: '6px',
            backgroundColor: '#ff6b35',
            borderRadius: '50%',
            margin: '0 1px'
          }} title="High priority tasks" />
        )}
        {!hasOverdue && !hasHighPriority && (
          <div style={{
            width: '6px',
            height: '6px',
            backgroundColor: '#28a745',
            borderRadius: '50%',
            margin: '0 1px'
          }} title="Normal priority tasks" />
        )}
      </div>
    );
  };

  const getTileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view !== 'month') return '';
    
    const dayTasks = getTasksForDate(date);
    if (dayTasks.length === 0) return '';
    
    const hasOverdue = dayTasks.some(task => task.dueDate < new Date() && task.status !== 'completed');
    const hasCompleted = dayTasks.every(task => task.status === 'completed');
    
    if (hasOverdue) return 'overdue-day';
    if (hasCompleted) return 'completed-day';
    return 'has-tasks';
  };

  const handleAddTask = () => {
    if (newTask.title && newTask.project) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title,
        description: newTask.description,
        dueDate: new Date(newTask.dueDate),
        priority: newTask.priority,
        project: newTask.project,
        status: newTask.status
      };
      setTasks([...tasks, task]);
      setNewTask({
        title: '',
        description: '',
        dueDate: format(new Date(), 'yyyy-MM-dd'),
        priority: 'medium',
        project: '',
        status: 'pending'
      });
      setShowAddTask(false);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleUpdateTaskStatus = (taskId: string, status: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status } : task
    ));
  };

  const selectedDateTasks = getTasksForDate(selectedDate);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#28a745';
      case 'in-progress': return '#007bff';
      case 'pending': return '#6c757d';
      default: return '#6c757d';
    }
  };

  return (
    <div style={{ 
      padding: '20px',
      backgroundColor: 'rgba(249, 249, 249, 0.95)',
      borderRadius: '8px',
      backdropFilter: 'blur(5px)'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <div style={{
          backgroundColor: '#2c3e50',
          color: 'white',
          padding: '15px 20px',
          fontSize: '20px',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          📅 Mukozangakulimu Project Calendar & Task Management
          <button
            onClick={() => setShowAddTask(!showAddTask)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            + Add Task
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '20px' }}>
          {/* Calendar */}
          <div>
            <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Calendar View</h3>
            <div>
              <Calendar
                onChange={(value) => setSelectedDate(value as Date)}
                value={selectedDate}
                tileContent={getTileContent}
                tileClassName={getTileClassName}
              />
            </div>
            
            <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#333' }}>Legend:</h4>
              <div style={{ display: 'flex', gap: '15px', fontSize: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <div style={{ width: '8px', height: '8px', backgroundColor: '#dc3545', borderRadius: '50%' }} />
                  <span>Overdue</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <div style={{ width: '8px', height: '8px', backgroundColor: '#ff6b35', borderRadius: '50%' }} />
                  <span>High Priority</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <div style={{ width: '8px', height: '8px', backgroundColor: '#28a745', borderRadius: '50%' }} />
                  <span>Normal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tasks for selected date */}
          <div>
            <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>
              Tasks for {format(selectedDate, 'MMMM d, yyyy')}
            </h3>
            
            {selectedDateTasks.length === 0 ? (
              <div style={{
                padding: '20px',
                textAlign: 'center',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
                color: '#666'
              }}>
                No tasks scheduled for this date
              </div>
            ) : (
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {selectedDateTasks.map(task => (
                  <div
                    key={task.id}
                    style={{
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      padding: '12px',
                      marginBottom: '10px',
                      backgroundColor: '#fff',
                      borderLeft: `4px solid ${getPriorityColor(task.priority)}`
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 5px 0', color: '#333', fontSize: '14px' }}>
                          {task.title}
                        </h4>
                        <p style={{ margin: '5px 0', fontSize: '12px', color: '#666' }}>
                          {task.description}
                        </p>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '8px', fontSize: '11px' }}>
                          <span style={{ color: '#666' }}>
                            📁 {task.project}
                          </span>
                          <span style={{ color: getPriorityColor(task.priority) }}>
                            ⚡ {task.priority.toUpperCase()}
                          </span>
                          <span style={{ color: getStatusColor(task.status) }}>
                            {task.status === 'completed' ? '✅' : task.status === 'in-progress' ? '🔄' : '⏳'} {task.status}
                          </span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <select
                          value={task.status}
                          onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value as Task['status'])}
                          style={{
                            padding: '2px 4px',
                            fontSize: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '2px'
                          }}
                        >
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          style={{
                            padding: '2px 6px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '2px',
                            cursor: 'pointer',
                            fontSize: '10px'
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '400px',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Add New Task</h3>
            
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', color: '#666' }}>Task Title *</label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
                placeholder="Enter task title"
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', color: '#666' }}>Description</label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                  minHeight: '60px'
                }}
                placeholder="Enter task description"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', color: '#666' }}>Due Date</label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', color: '#666' }}>Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({...newTask, priority: e.target.value as Task['priority']})}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', color: '#666' }}>Project *</label>
              <input
                type="text"
                value={newTask.project}
                onChange={(e) => setNewTask({...newTask, project: e.target.value})}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
                placeholder="Enter project name"
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowAddTask(false)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .react-calendar {
          width: 100% !important;
          border: none !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
          font-family: Arial, sans-serif !important;
        }
        
        .react-calendar__tile {
          position: relative !important;
        }
        
        .has-tasks {
          background-color: #e8f5e8 !important;
          border: 1px solid #c3e6c3 !important;
        }
        
        .overdue-day {
          background-color: #ffebee !important;
          border: 1px solid #ffcdd2 !important;
        }
        
        .completed-day {
          background-color: #e3f2fd !important;
          border: 1px solid #bbdefb !important;
        }
        
        .react-calendar__tile:enabled:hover,
        .react-calendar__tile:enabled:focus {
          background-color: #f0f0f0 !important;
        }
      `}</style>
    </div>
  );
};

export default CalendarComponent;
