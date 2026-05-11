import React, { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'manager' | 'developer' | 'volunteer';
}

interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  assignedTo: string[];
  createdBy: string;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'critical';
  startDate: Date;
  dueDate: Date;
  completedDate?: Date;
  estimatedDuration: number; // in days
  actualDuration?: number; // in days
  progress: number; // 0-100 percentage
  dependencies: string[]; // task IDs that must be completed first
  tags: string[];
}

interface Project {
  id: string;
  name: string;
  description: string;
  budget: number;
  location: string;
  startDate: Date;
  targetCompletionDate: Date;
  status: 'planning' | 'active' | 'on-hold' | 'completed';
  teamMembers: string[];
  tasks: string[];
}

const ProjectStructure: React.FC = () => {
  const [users] = useState<User[]>([
    { id: '1', name: 'Hassan', email: 'hassan@mukozangakulimu.org', role: 'manager' },
    { id: '2', name: 'Hussein', email: 'hussein@mukozangakulimu.org', role: 'developer' },
    { id: '3', name: 'Rema', email: 'rema@mukozangakulimu.org', role: 'developer' },
    { id: '4', name: 'Shamin', email: 'shamin@mukozangakulimu.org', role: 'volunteer' },
    { id: '5', name: 'Nema', email: 'nema@mukozangakulimu.org', role: 'volunteer' },
    { id: '6', name: 'Bashir', email: 'bashir@mukozangakulimu.org', role: 'developer' },
    { id: '7', name: 'Madina', email: 'madina@mukozangakulimu.org', role: 'volunteer' },
    { id: '8', name: 'Hakim', email: 'hakim@mukozangakulimu.org', role: 'developer' },
    { id: '9', name: 'Ssedin', email: 'ssedin@mukozangakulimu.org', role: 'volunteer' }
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'School Construction',
      description: 'Build primary schools in rural areas',
      budget: 50000,
      location: 'Kampala',
      startDate: new Date(2026, 4, 1),
      targetCompletionDate: new Date(2026, 7, 31),
      status: 'active',
      teamMembers: ['1', '2', '3'],
      tasks: ['1', '2', '3']
    },
    {
      id: '2',
      name: 'Water Supply Project',
      description: 'Install clean water systems',
      budget: 75000,
      location: 'Gulu',
      startDate: new Date(2026, 4, 15),
      targetCompletionDate: new Date(2026, 8, 15),
      status: 'active',
      teamMembers: ['1', '3', '4'],
      tasks: ['4', '5']
    }
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Foundation Work',
      description: 'Excavation and concrete foundation for school building',
      projectId: '1',
      assignedTo: ['2'],
      createdBy: '1',
      status: 'completed',
      priority: 'high',
      startDate: new Date(2026, 4, 1),
      dueDate: new Date(2026, 4, 15),
      completedDate: new Date(2026, 4, 12),
      estimatedDuration: 14,
      actualDuration: 11,
      progress: 100,
      dependencies: [],
      tags: ['construction', 'foundation']
    },
    {
      id: '2',
      title: 'Wall Construction',
      description: 'Build main walls and structural elements',
      projectId: '1',
      assignedTo: ['2', '3'],
      createdBy: '1',
      status: 'in-progress',
      priority: 'high',
      startDate: new Date(2026, 4, 16),
      dueDate: new Date(2026, 5, 15),
      estimatedDuration: 30,
      progress: 65,
      dependencies: ['1'],
      tags: ['construction', 'walls']
    },
    {
      id: '3',
      title: 'Roof Installation',
      description: 'Install roofing materials and waterproofing',
      projectId: '1',
      assignedTo: ['3'],
      createdBy: '1',
      status: 'pending',
      priority: 'medium',
      startDate: new Date(2026, 5, 16),
      dueDate: new Date(2026, 6, 15),
      estimatedDuration: 30,
      progress: 0,
      dependencies: ['2'],
      tags: ['construction', 'roofing']
    },
    {
      id: '4',
      title: 'Water Source Survey',
      description: 'Identify and test water sources for the community',
      projectId: '2',
      assignedTo: ['4'],
      createdBy: '1',
      status: 'completed',
      priority: 'high',
      startDate: new Date(2026, 4, 15),
      dueDate: new Date(2026, 5, 1),
      completedDate: new Date(2026, 4, 28),
      estimatedDuration: 16,
      actualDuration: 13,
      progress: 100,
      dependencies: [],
      tags: ['survey', 'water']
    },
    {
      id: '5',
      title: 'Pipe Installation',
      description: 'Install main water distribution pipes',
      projectId: '2',
      assignedTo: ['4', '5'],
      createdBy: '1',
      status: 'in-progress',
      priority: 'high',
      startDate: new Date(2026, 5, 2),
      dueDate: new Date(2026, 6, 30),
      estimatedDuration: 59,
      progress: 40,
      dependencies: ['4'],
      tags: ['installation', 'pipes']
    }
  ]);

  const [activeView, setActiveView] = useState<'overview' | 'tasks' | 'team' | 'completed' | 'pending'>('overview');
  const [selectedProject, setSelectedProject] = useState<string>('1');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showSuggestionModal, setShowSuggestionModal] = useState(false);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    projectId: '1',
    assignedTo: [] as string[],
    priority: 'medium' as Task['priority'],
    dueDate: '',
    estimatedDuration: 7,
    tags: [] as string[]
  });

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(task => task.status === status);
  };

  const getTasksByProject = (projectId: string) => {
    return tasks.filter(task => task.projectId === projectId);
  };

  const getTasksByAssignee = (userId: string) => {
    return tasks.filter(task => task.assignedTo.includes(userId));
  };

  const getUserById = (userId: string) => {
    return users.find(user => user.id === userId);
  };

  const getProjectById = (projectId: string) => {
    return projects.find(project => project.id === projectId);
  };

  const getTaskSuggestions = () => {
    const suggestions: {
      type: string;
      title: string;
      description: string;
      priority: Task['priority'];
      projectId: string;
    }[] = [];
    
    // Suggest tasks for blocked items
    const blockedTasks = tasks.filter(task => task.status === 'blocked');
    blockedTasks.forEach(task => {
      suggestions.push({
        type: 'unblock',
        title: `Resolve blockers for "${task.title}"`,
        description: `This task is blocked and needs attention`,
        priority: 'high',
        projectId: task.projectId
      });
    });

    // Suggest follow-up tasks for completed items
    const completedTasks = tasks.filter(task => task.status === 'completed');
    completedTasks.forEach(task => {
      const dependentTasks = tasks.filter(t => t.dependencies.includes(task.id));
      if (dependentTasks.length > 0) {
        suggestions.push({
          type: 'follow-up',
          title: `Start "${dependentTasks[0].title}"`,
          description: `Prerequisite task "${task.title}" is now complete`,
          priority: dependentTasks[0].priority,
          projectId: dependentTasks[0].projectId
        });
      }
    });

    // Suggest overdue tasks
    const overdueTasks = tasks.filter(task => 
      task.dueDate < new Date() && task.status !== 'completed'
    );
    overdueTasks.forEach(task => {
      suggestions.push({
        type: 'overdue',
        title: `Complete overdue task "${task.title}"`,
        description: `This task was due on ${task.dueDate.toLocaleDateString()}`,
        priority: 'critical',
        projectId: task.projectId
      });
    });

    return suggestions;
  };

  const handleAddTask = () => {
    if (newTask.title && newTask.projectId && newTask.assignedTo.length > 0) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title,
        description: newTask.description,
        projectId: newTask.projectId,
        assignedTo: newTask.assignedTo,
        createdBy: '1', // Current user
        status: 'pending',
        priority: newTask.priority,
        startDate: new Date(),
        dueDate: new Date(newTask.dueDate),
        estimatedDuration: newTask.estimatedDuration,
        progress: 0,
        dependencies: [],
        tags: newTask.tags
      };

      setTasks([...tasks, task]);
      
      // Update project tasks
      setProjects(projects.map(p => 
        p.id === newTask.projectId 
          ? { ...p, tasks: [...p.tasks, task.id] }
          : p
      ));

      setNewTask({
        title: '',
        description: '',
        projectId: '1',
        assignedTo: [],
        priority: 'medium',
        dueDate: '',
        estimatedDuration: 7,
        tags: []
      });
      setShowTaskModal(false);
    }
  };

  const handleUpdateTaskStatus = (taskId: string, status: Task['status']) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const updatedTask = { ...task, status };
        if (status === 'completed') {
          updatedTask.completedDate = new Date();
          updatedTask.progress = 100;
          if (task.startDate) {
            updatedTask.actualDuration = Math.ceil(
              (new Date().getTime() - task.startDate.getTime()) / (1000 * 60 * 60 * 24)
            );
          }
        }
        return updatedTask;
      }
      return task;
    }));
  };

  const handleUpdateTaskProgress = (taskId: string, progress: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, progress } : task
    ));
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return '#28a745';
    if (progress >= 75) return '#17a2b8';
    if (progress >= 50) return '#ffc107';
    if (progress >= 25) return '#fd7e14';
    return '#dc3545';
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'critical': return '#dc3545';
      case 'high': return '#fd7e14';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed': return '#28a745';
      case 'in-progress': return '#007bff';
      case 'pending': return '#6c757d';
      case 'blocked': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const renderTaskCard = (task: Task) => {
    const project = getProjectById(task.projectId);
    const assignees = task.assignedTo.map(id => getUserById(id)).filter(Boolean);

    return (
      <div
        key={task.id}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
          e.currentTarget.style.transition = 'all 0.3s ease';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }}
        style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '10px',
          backgroundColor: '#fff',
          borderLeft: `4px solid ${getPriorityColor(task.priority)}`,
          transition: 'all 0.3s ease',
          transform: 'translateY(0)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          cursor: 'pointer'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#333', fontSize: '15px' }}>
              {task.title}
            </h4>
            <p style={{ margin: '5px 0', fontSize: '13px', color: '#666' }}>
              {task.description}
            </p>
            
            <div style={{ display: 'flex', gap: '10px', margin: '8px 0', fontSize: '11px' }}>
              <span style={{ color: '#666' }}>
                📁 {project?.name}
              </span>
              <span style={{ color: getPriorityColor(task.priority) }}>
                ⚡ {task.priority.toUpperCase()}
              </span>
              <span style={{ color: getStatusColor(task.status) }}>
                {task.status === 'completed' ? '✅' : task.status === 'in-progress' ? '🔄' : task.status === 'blocked' ? '🚫' : '⏳'} {task.status}
              </span>
            </div>

            {/* Progress Bar */}
            <div style={{ margin: '8px 0' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontSize: '11px', 
                color: '#666',
                marginBottom: '3px'
              }}>
                <span>Progress: {task.progress}%</span>
                <span>{task.estimatedDuration} days estimated</span>
              </div>
              <div style={{
                width: '100%',
                height: '6px',
                backgroundColor: '#e9ecef',
                borderRadius: '3px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${task.progress}%`,
                  height: '100%',
                  backgroundColor: getProgressColor(task.progress),
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>

            {/* Assignees */}
            <div style={{ margin: '8px 0' }}>
              <div style={{ fontSize: '11px', color: '#666', marginBottom: '3px' }}>
                👥 Assigned to:
              </div>
              <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                {assignees.map(user => (
                  <span
                    key={user!.id}
                    style={{
                      padding: '2px 6px',
                      backgroundColor: '#e3f2fd',
                      color: '#1976d2',
                      borderRadius: '3px',
                      fontSize: '10px'
                    }}
                  >
                    {user!.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Dates */}
            <div style={{ display: 'flex', gap: '15px', fontSize: '10px', color: '#666' }}>
              <span>📅 Start: {task.startDate.toLocaleDateString()}</span>
              <span>⏰ Due: {task.dueDate.toLocaleDateString()}</span>
              {task.completedDate && (
                <span>✅ Completed: {task.completedDate.toLocaleDateString()}</span>
              )}
            </div>

            {/* Tags */}
            {task.tags.length > 0 && (
              <div style={{ marginTop: '8px' }}>
                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                  {task.tags.map(tag => (
                    <span
                      key={tag}
                      style={{
                        padding: '2px 6px',
                        backgroundColor: '#f5f5f5',
                        color: '#666',
                        borderRadius: '3px',
                        fontSize: '9px'
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginLeft: '10px' }}>
            <select
              value={task.status}
              onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value as Task['status'])}
              style={{
                padding: '4px 6px',
                fontSize: '10px',
                border: '1px solid #ddd',
                borderRadius: '3px'
              }}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="blocked">Blocked</option>
              <option value="completed">Completed</option>
            </select>
            
            <input
              type="number"
              min="0"
              max="100"
              value={task.progress}
              onChange={(e) => handleUpdateTaskProgress(task.id, parseInt(e.target.value) || 0)}
              style={{
                width: '60px',
                padding: '4px 6px',
                fontSize: '10px',
                border: '1px solid #ddd',
                borderRadius: '3px',
                textAlign: 'center'
              }}
              placeholder="%"
            />
          </div>
        </div>
      </div>
    );
  };

  const currentProject = getProjectById(selectedProject);
  const projectTasks = getTasksByProject(selectedProject);
  const completedTasks = getTasksByStatus('completed');
  const pendingTasks = getTasksByStatus('pending');
  const suggestions = getTaskSuggestions();

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: 'rgba(249, 249, 249, 0.95)', 
      borderRadius: '8px',
      backdropFilter: 'blur(5px)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: '#333', margin: 0, fontSize: '1.6rem' }}>Project Structure</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setShowTaskModal(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#218838';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(40, 167, 69, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#28a745';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.3s ease',
              transform: 'translateY(0)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            + Add Task
          </button>
          <button
            onClick={() => setShowSuggestionModal(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#138496';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(23, 162, 184, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#17a2b8';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.3s ease',
              transform: 'translateY(0)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            💡 Suggestions
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #ddd' }}>
          {['overview', 'tasks', 'team', 'completed', 'pending'].map(view => (
            <button
              key={view}
              onClick={() => setActiveView(view as any)}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: activeView === view ? '#007bff' : 'transparent',
                color: activeView === view ? 'white' : '#333',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeView === view ? 'bold' : 'normal'
              }}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
              {view === 'completed' && ` (${completedTasks.length})`}
              {view === 'pending' && ` (${pendingTasks.length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        {activeView === 'overview' && currentProject && (
          <div>
            <h3 style={{ color: '#333', marginBottom: '15px' }}>
              {currentProject.name}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <h4 style={{ color: '#555', fontSize: '14px', marginBottom: '10px' }}>Project Details</h4>
                <p style={{ margin: '5px 0', fontSize: '13px', color: '#666' }}>
                  {currentProject.description}
                </p>
                <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
                  <div>📍 Location: {currentProject.location}</div>
                  <div>💰 Budget: ${currentProject.budget.toLocaleString()}</div>
                  <div>📅 Started: {currentProject.startDate.toLocaleDateString()}</div>
                  <div>🎯 Target: {currentProject.targetCompletionDate.toLocaleDateString()}</div>
                  <div>📊 Status: {currentProject.status}</div>
                </div>
              </div>
              <div>
                <h4 style={{ color: '#555', fontSize: '14px', marginBottom: '10px' }}>Task Summary</h4>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  <div>📋 Total Tasks: {projectTasks.length}</div>
                  <div>✅ Completed: {projectTasks.filter(t => t.status === 'completed').length}</div>
                  <div>🔄 In Progress: {projectTasks.filter(t => t.status === 'in-progress').length}</div>
                  <div>⏳ Pending: {projectTasks.filter(t => t.status === 'pending').length}</div>
                  <div>🚫 Blocked: {projectTasks.filter(t => t.status === 'blocked').length}</div>
                </div>
              </div>
            </div>
            
            <div style={{ marginTop: '20px' }}>
              <h4 style={{ color: '#555', fontSize: '14px', marginBottom: '10px' }}>Recent Tasks</h4>
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {projectTasks.slice(0, 3).map(renderTaskCard)}
              </div>
            </div>
          </div>
        )}

        {activeView === 'tasks' && (
          <div>
            <h3 style={{ color: '#333', marginBottom: '15px' }}>All Tasks</h3>
            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
              {tasks.map(renderTaskCard)}
            </div>
          </div>
        )}

        {activeView === 'team' && (
          <div>
            <h3 style={{ color: '#333', marginBottom: '15px' }}>Team Overview</h3>
            <div style={{ display: 'grid', gap: '15px' }}>
              {users.map(user => {
                const userTasks = getTasksByAssignee(user.id);
                const completedUserTasks = userTasks.filter(t => t.status === 'completed');
                const inProgressUserTasks = userTasks.filter(t => t.status === 'in-progress');
                
                return (
                  <div
                    key={user.id}
                    style={{
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      padding: '15px',
                      backgroundColor: '#fff'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>{user.name}</h4>
                        <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>
                          {user.email} • {user.role}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right', fontSize: '12px', color: '#666' }}>
                        <div>📋 Total: {userTasks.length}</div>
                        <div>✅ Done: {completedUserTasks.length}</div>
                        <div>🔄 Active: {inProgressUserTasks.length}</div>
                      </div>
                    </div>
                    
                    {userTasks.length > 0 && (
                      <div style={{ marginTop: '10px' }}>
                        <div style={{ fontSize: '11px', color: '#666', marginBottom: '5px' }}>
                          Current Tasks:
                        </div>
                        {userTasks.slice(0, 2).map(task => (
                          <div key={task.id} style={{ 
                            padding: '5px', 
                            backgroundColor: '#f8f9fa', 
                            borderRadius: '4px',
                            fontSize: '11px',
                            marginBottom: '3px'
                          }}>
                            <span style={{ color: getPriorityColor(task.priority) }}>
                              ●
                            </span> {task.title} ({task.status})
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeView === 'completed' && (
          <div>
            <h3 style={{ color: '#333', marginBottom: '15px' }}>
              Completed Tasks ({completedTasks.length})
            </h3>
            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
              {completedTasks.length > 0 ? (
                completedTasks.map(renderTaskCard)
              ) : (
                <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                  No completed tasks yet
                </div>
              )}
            </div>
          </div>
        )}

        {activeView === 'pending' && (
          <div>
            <h3 style={{ color: '#333', marginBottom: '15px' }}>
              Pending Tasks ({pendingTasks.length})
            </h3>
            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
              {pendingTasks.length > 0 ? (
                pendingTasks.map(renderTaskCard)
              ) : (
                <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                  No pending tasks
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      {showTaskModal && (
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
            width: '500px',
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
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', color: '#666' }}>Project</label>
                <select
                  value={newTask.projectId}
                  onChange={(e) => setNewTask({...newTask, projectId: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                >
                  {projects.map(project => (
                    <option key={project.id} value={project.id}>{project.name}</option>
                  ))}
                </select>
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
                  <option value="critical">Critical</option>
                </select>
              </div>
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
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', color: '#666' }}>Duration (days)</label>
                <input
                  type="number"
                  min="1"
                  value={newTask.estimatedDuration}
                  onChange={(e) => setNewTask({...newTask, estimatedDuration: parseInt(e.target.value) || 1})}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', color: '#666' }}>Assign to *</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {users.map(user => (
                  <label key={user.id} style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
                    <input
                      type="checkbox"
                      checked={newTask.assignedTo.includes(user.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewTask({...newTask, assignedTo: [...newTask.assignedTo, user.id]});
                        } else {
                          setNewTask({...newTask, assignedTo: newTask.assignedTo.filter(id => id !== user.id)});
                        }
                      }}
                      style={{ marginRight: '5px' }}
                    />
                    {user.name} ({user.role})
                  </label>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowTaskModal(false)}
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

      {/* Task Suggestions Modal */}
      {showSuggestionModal && (
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
            width: '500px',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>💡 Task Suggestions</h3>
            
            {suggestions.length > 0 ? (
              <div>
                <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#666' }}>
                  Based on current project status, here are some suggested actions:
                </p>
                <div style={{ display: 'grid', gap: '10px' }}>
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      style={{
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        padding: '12px',
                        backgroundColor: '#f8f9fa',
                        borderLeft: `4px solid ${getPriorityColor(suggestion.priority as Task['priority'])}`
                      }}
                    >
                      <h4 style={{ margin: '0 0 5px 0', color: '#333', fontSize: '14px' }}>
                        {suggestion.title}
                      </h4>
                      <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>
                        {suggestion.description}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ 
                          fontSize: '11px', 
                          color: getPriorityColor(suggestion.priority as Task['priority']),
                          fontWeight: 'bold'
                        }}>
                          {suggestion.priority.toUpperCase()}
                        </span>
                        <button
                          onClick={() => {
                            setNewTask({
                              ...newTask,
                              title: suggestion.title.replace(/^(Start |Complete |Resolve )/, ''),
                              description: suggestion.description,
                              projectId: suggestion.projectId,
                              priority: suggestion.priority as Task['priority']
                            });
                            setShowSuggestionModal(false);
                            setShowTaskModal(true);
                          }}
                          style={{
                            padding: '4px 8px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '3px',
                            cursor: 'pointer',
                            fontSize: '11px'
                          }}
                        >
                          Create Task
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                No suggestions at this time. All tasks are on track!
              </div>
            )}
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button
                onClick={() => setShowSuggestionModal(false)}
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
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectStructure;
