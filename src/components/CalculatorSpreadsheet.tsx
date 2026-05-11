import React, { useState } from 'react';

interface ExpenditureItem {
  id: string;
  category: string;
  description: string;
  estimatedCost: number;
  actualCost: number;
  quantity: number;
  unit: string;
}

const CalculatorSpreadsheet: React.FC = () => {
  const [expenditures, setExpenditures] = useState<ExpenditureItem[]>([
    {
      id: '1',
      category: 'Labor',
      description: 'Construction Workers',
      estimatedCost: 15000,
      actualCost: 0,
      quantity: 10,
      unit: 'workers'
    },
    {
      id: '2',
      category: 'Materials',
      description: 'Cement',
      estimatedCost: 5000,
      actualCost: 0,
      quantity: 100,
      unit: 'bags'
    }
  ]);

  const [newItem, setNewItem] = useState({
    category: '',
    description: '',
    estimatedCost: '',
    actualCost: '',
    quantity: '',
    unit: ''
  });

  const handleAddItem = () => {
    if (newItem.category && newItem.description && newItem.estimatedCost && newItem.quantity) {
      const item: ExpenditureItem = {
        id: Date.now().toString(),
        category: newItem.category,
        description: newItem.description,
        estimatedCost: parseFloat(newItem.estimatedCost),
        actualCost: parseFloat(newItem.actualCost) || 0,
        quantity: parseFloat(newItem.quantity),
        unit: newItem.unit
      };
      setExpenditures([...expenditures, item]);
      setNewItem({ category: '', description: '', estimatedCost: '', actualCost: '', quantity: '', unit: '' });
    }
  };

  const handleUpdateItem = (id: string, field: keyof ExpenditureItem, value: string | number) => {
    setExpenditures(expenditures.map(item => 
      item.id === id 
        ? { ...item, [field]: field === 'description' || field === 'category' || field === 'unit' ? value : parseFloat(value as string) || 0 }
        : item
    ));
  };

  const handleDeleteItem = (id: string) => {
    setExpenditures(expenditures.filter(item => item.id !== id));
  };

  const calculateTotals = () => {
    const totalEstimated = expenditures.reduce((sum, item) => sum + (item.estimatedCost * item.quantity), 0);
    const totalActual = expenditures.reduce((sum, item) => sum + (item.actualCost * item.quantity), 0);
    const variance = totalActual - totalEstimated;
    const variancePercent = totalEstimated > 0 ? (variance / totalEstimated) * 100 : 0;

    return { totalEstimated, totalActual, variance, variancePercent };
  };

  const totals = calculateTotals();

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: 'rgba(249, 249, 249, 0.95)', 
      borderRadius: '8px',
      backdropFilter: 'blur(5px)'
    }}>
      <h2 style={{ color: '#333', marginBottom: '20px', fontSize: '1.6rem' }}>Mukozangakulimu Project Expenditure Calculator</h2>
      
      {/* Add New Item Form */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ color: '#555', marginBottom: '15px' }}>Add Expenditure Item</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr auto', gap: '10px', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', color: '#666' }}>Category</label>
            <input
              type="text"
              placeholder="Category"
              value={newItem.category}
              onChange={(e) => setNewItem({...newItem, category: e.target.value})}
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
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', color: '#666' }}>Description</label>
            <input
              type="text"
              placeholder="Description"
              value={newItem.description}
              onChange={(e) => setNewItem({...newItem, description: e.target.value})}
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
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', color: '#666' }}>Unit Cost ($)</label>
            <input
              type="number"
              placeholder="Cost"
              value={newItem.estimatedCost}
              onChange={(e) => setNewItem({...newItem, estimatedCost: e.target.value})}
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
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', color: '#666' }}>Quantity</label>
            <input
              type="number"
              placeholder="Qty"
              value={newItem.quantity}
              onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
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
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', color: '#666' }}>Unit</label>
            <input
              type="text"
              placeholder="Unit"
              value={newItem.unit}
              onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>
          <button
            onClick={handleAddItem}
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Add
          </button>
        </div>
      </div>

      {/* Spreadsheet Table */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6', fontSize: '14px' }}>Category</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6', fontSize: '14px' }}>Description</th>
                <th style={{ padding: '12px', textAlign: 'right', borderBottom: '2px solid #dee2e6', fontSize: '14px' }}>Unit Cost ($)</th>
                <th style={{ padding: '12px', textAlign: 'right', borderBottom: '2px solid #dee2e6', fontSize: '14px' }}>Quantity</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6', fontSize: '14px' }}>Unit</th>
                <th style={{ padding: '12px', textAlign: 'right', borderBottom: '2px solid #dee2e6', fontSize: '14px' }}>Est. Total ($)</th>
                <th style={{ padding: '12px', textAlign: 'right', borderBottom: '2px solid #dee2e6', fontSize: '14px' }}>Actual Cost ($)</th>
                <th style={{ padding: '12px', textAlign: 'right', borderBottom: '2px solid #dee2e6', fontSize: '14px' }}>Actual Total ($)</th>
                <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #dee2e6', fontSize: '14px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenditures.map((item, index) => (
                <tr key={item.id} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                  <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6' }}>
                    <input
                      type="text"
                      value={item.category}
                      onChange={(e) => handleUpdateItem(item.id, 'category', e.target.value)}
                      style={{ width: '100%', padding: '4px', border: '1px solid #ddd', borderRadius: '2px' }}
                    />
                  </td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6' }}>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                      style={{ width: '100%', padding: '4px', border: '1px solid #ddd', borderRadius: '2px' }}
                    />
                  </td>
                  <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #dee2e6' }}>
                    <input
                      type="number"
                      value={item.estimatedCost}
                      onChange={(e) => handleUpdateItem(item.id, 'estimatedCost', e.target.value)}
                      style={{ width: '80px', padding: '4px', border: '1px solid #ddd', borderRadius: '2px', textAlign: 'right' }}
                    />
                  </td>
                  <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #dee2e6' }}>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleUpdateItem(item.id, 'quantity', e.target.value)}
                      style={{ width: '60px', padding: '4px', border: '1px solid #ddd', borderRadius: '2px', textAlign: 'right' }}
                    />
                  </td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6' }}>
                    <input
                      type="text"
                      value={item.unit}
                      onChange={(e) => handleUpdateItem(item.id, 'unit', e.target.value)}
                      style={{ width: '60px', padding: '4px', border: '1px solid #ddd', borderRadius: '2px' }}
                    />
                  </td>
                  <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #dee2e6', fontWeight: 'bold' }}>
                    ${(item.estimatedCost * item.quantity).toLocaleString()}
                  </td>
                  <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #dee2e6' }}>
                    <input
                      type="number"
                      value={item.actualCost}
                      onChange={(e) => handleUpdateItem(item.id, 'actualCost', e.target.value)}
                      style={{ width: '80px', padding: '4px', border: '1px solid #ddd', borderRadius: '2px', textAlign: 'right' }}
                    />
                  </td>
                  <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #dee2e6', fontWeight: 'bold' }}>
                    ${(item.actualCost * item.quantity).toLocaleString()}
                  </td>
                  <td style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '2px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ backgroundColor: '#e9ecef', fontWeight: 'bold' }}>
                <td colSpan={5} style={{ padding: '12px', textAlign: 'right', borderBottom: '2px solid #dee2e6' }}>TOTALS:</td>
                <td style={{ padding: '12px', textAlign: 'right', borderBottom: '2px solid #dee2e6', color: '#28a745' }}>
                  ${totals.totalEstimated.toLocaleString()}
                </td>
                <td style={{ padding: '12px', textAlign: 'right', borderBottom: '2px solid #dee2e6' }}>-</td>
                <td style={{ padding: '12px', textAlign: 'right', borderBottom: '2px solid #dee2e6', color: totals.variance > 0 ? '#dc3545' : '#28a745' }}>
                  ${totals.totalActual.toLocaleString()}
                </td>
                <td style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #dee2e6' }}>-</td>
              </tr>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <td colSpan={8} style={{ padding: '10px', textAlign: 'right', fontSize: '14px' }}>
                  Variance: 
                </td>
                <td style={{ 
                  padding: '10px', 
                  textAlign: 'right', 
                  fontSize: '14px',
                  color: totals.variance > 0 ? '#dc3545' : '#28a745',
                  fontWeight: 'bold'
                }}>
                  ${totals.variance.toLocaleString()} ({totals.variancePercent.toFixed(1)}%)
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CalculatorSpreadsheet;
