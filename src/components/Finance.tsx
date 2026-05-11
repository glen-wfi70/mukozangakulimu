import React, { useState } from 'react';

interface Receipt {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  projectName: string;
  contributor?: string;
  approvedBy?: string;
}

interface ProjectFinance {
  projectId: string;
  projectName: string;
  totalBudget: number;
  totalReceived: number;
  totalSpent: number;
  remaining: number;
  receipts: Receipt[];
}

const Finance: React.FC = () => {
  const [projects] = useState<ProjectFinance[]>([
    {
      projectId: '1',
      projectName: 'School Construction',
      totalBudget: 50000,
      totalReceived: 35000,
      totalSpent: 22000,
      remaining: 13000,
      receipts: [
        {
          id: '1',
          date: new Date(2026, 4, 15),
          description: 'Foundation materials purchase',
          amount: 8000,
          type: 'expense',
          category: 'Materials',
          projectName: 'School Construction',
          approvedBy: 'Hassan'
        },
        {
          id: '2',
          date: new Date(2026, 4, 20),
          description: 'Community contribution',
          amount: 5000,
          type: 'income',
          category: 'Donation',
          projectName: 'School Construction',
          contributor: 'Local Business Council'
        },
        {
          id: '3',
          date: new Date(2026, 4, 25),
          description: 'Labor payment - foundation work',
          amount: 6000,
          type: 'expense',
          category: 'Labor',
          projectName: 'School Construction',
          approvedBy: 'Hassan'
        },
        {
          id: '4',
          date: new Date(2026, 5, 1),
          description: 'Government grant',
          amount: 15000,
          type: 'income',
          category: 'Grant',
          projectName: 'School Construction',
          contributor: 'Ministry of Education'
        },
        {
          id: '5',
          date: new Date(2026, 5, 5),
          description: 'Steel and cement purchase',
          amount: 8000,
          type: 'expense',
          category: 'Materials',
          projectName: 'School Construction',
          approvedBy: 'Hassan'
        }
      ]
    },
    {
      projectId: '2',
      projectName: 'Water Supply Project',
      totalBudget: 75000,
      totalReceived: 45000,
      totalSpent: 28000,
      remaining: 17000,
      receipts: [
        {
          id: '6',
          date: new Date(2026, 4, 18),
          description: 'Water pump purchase',
          amount: 12000,
          type: 'expense',
          category: 'Equipment',
          projectName: 'Water Supply Project',
          approvedBy: 'Hassan'
        },
        {
          id: '7',
          date: new Date(2026, 4, 22),
          description: 'NGO contribution',
          amount: 20000,
          type: 'income',
          category: 'Donation',
          projectName: 'Water Supply Project',
          contributor: 'WaterAid International'
        },
        {
          id: '8',
          date: new Date(2026, 5, 2),
          description: 'Pipe installation labor',
          amount: 8000,
          type: 'expense',
          category: 'Labor',
          projectName: 'Water Supply Project',
          approvedBy: 'Hassan'
        },
        {
          id: '9',
          date: new Date(2026, 5, 8),
          description: 'Community fundraising',
          amount: 10000,
          type: 'income',
          category: 'Donation',
          projectName: 'Water Supply Project',
          contributor: 'Community Members'
        },
        {
          id: '10',
          date: new Date(2026, 5, 10),
          description: 'Pipeline materials',
          amount: 8000,
          type: 'expense',
          category: 'Materials',
          projectName: 'Water Supply Project',
          approvedBy: 'Hassan'
        }
      ]
    }
  ]);

  const [selectedProject, setSelectedProject] = useState<string>('1');
  const [showAddReceipt, setShowAddReceipt] = useState(false);

  const currentProject = projects.find(p => p.projectId === selectedProject);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getBudgetStatus = (project: ProjectFinance) => {
    const percentage = (project.totalSpent / project.totalBudget) * 100;
    if (percentage > 90) return { color: 'text-red-600', status: 'Over Budget' };
    if (percentage > 75) return { color: 'text-yellow-600', status: 'Near Limit' };
    return { color: 'text-green-600', status: 'On Track' };
  };

  return (
    <div className="p-5 bg-white/95 backdrop-blur-sm rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Finance Management</h2>
        <button
          onClick={() => setShowAddReceipt(!showAddReceipt)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
        >
          + Add Receipt
        </button>
      </div>

      {/* Project Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Project:</label>
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {projects.map(project => (
            <option key={project.projectId} value={project.projectId}>
              {project.projectName}
            </option>
          ))}
        </select>
      </div>

      {currentProject && (
        <>
          {/* Project Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="text-sm font-medium text-blue-800 mb-1">Total Budget</h3>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(currentProject.totalBudget)}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="text-sm font-medium text-green-800 mb-1">Total Received</h3>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(currentProject.totalReceived)}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h3 className="text-sm font-medium text-red-800 mb-1">Total Spent</h3>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(currentProject.totalSpent)}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h3 className="text-sm font-medium text-purple-800 mb-1">Remaining</h3>
              <p className="text-2xl font-bold text-purple-600">{formatCurrency(currentProject.remaining)}</p>
            </div>
          </div>

          {/* Budget Status */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Budget Status</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getBudgetStatus(currentProject).color}`}>
                {getBudgetStatus(currentProject).status}
              </span>
            </div>
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((currentProject.totalSpent / currentProject.totalBudget) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {Math.round((currentProject.totalSpent / currentProject.totalBudget) * 100)}% of budget used
              </p>
            </div>
          </div>

          {/* Receipts Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-800 text-white px-6 py-4">
              <h3 className="text-lg font-semibold">Money Receipts & Expenditures</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contributor/Approved By</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentProject.receipts.map((receipt) => (
                    <tr key={receipt.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(receipt.date)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{receipt.description}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{receipt.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          receipt.type === 'income' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {receipt.type === 'income' ? 'Income' : 'Expense'}
                        </span>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        receipt.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {receipt.type === 'income' ? '+' : '-'}{formatCurrency(receipt.amount)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {receipt.contributor || receipt.approvedBy}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Add Receipt Modal */}
      {showAddReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Receipt</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddReceipt(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddReceipt(false)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Finance;
