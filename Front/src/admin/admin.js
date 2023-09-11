import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css';
import BloqueDeCarga from './dataCarga';
import SessionExpiration from '../SesionExpired';

const AdminPage = () => {
  const [selectedTable, setSelectedTable] = useState('');
  const [tableData, setTableData] = useState([]);
  const [editedData, setEditedData] = useState([]);
  const [newRowData, setNewRowData] = useState({});
  const [sessionExpired, setSessionExpired] = useState(false);
  const [columns, setColumns] = useState([]);

  const requiredFields = {
    curso: ['idCurso', 'anio'],
    materias: ['idMateria', 'nombre'],
    usuario: [
      'idUsuario',
      'nombre',
      'dni',
      'fechaNac',
      'direccion',
      'telefono',
      'email',
      'password',
      'tipo',
      'curso',
    ],
  };

  useEffect(() => {
    // cargarTablas();
  }, []);

  useEffect(() => {
    if (selectedTable) {
      cargarDatos();
    }
  }, [selectedTable]);

  const tableInfo = {
    usuario: {
      name: 'Usuarios',
    },
    curso: {
      name: 'Cursos',
    },
    materias: {
      name: 'Materias',
    },
    // Agrega más tablas según tus necesidades
  };

  const autoGeneratedColumns = {
    curso: 'idCurso',
    materias: 'idMateria',
    usuario: 'idUsuario',
    // Agrega más tablas según tus necesidades
  };



  const cargarDatos = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/${selectedTable}`);
      const data = response.data;
console.log(data);
      setTableData(data);
      setColumns(Object.keys(data[0] || {}));
      setEditedData(data.map((row) => ({ ...row, isEditing: false })));
    } catch (error) {
      console.error(`Error al cargar datos de ${selectedTable}:`, error);
    }
  };

  const handleTableChange = (event) => {
    setSelectedTable(event.target.value);
  };

  const handleCellEdit = (e, rowIndex, columnName) => {
    const updatedData = editedData.map((row, index) => {
      if (index === rowIndex) {
        return { ...row, [columnName]: e.target.value };
      }
      return row;
    });
    setEditedData(updatedData);
  };

  const handleDeleteRow = async (rowIndex) => {
    try {
      let idFieldName = '';
      if (selectedTable === 'materias') {
      idFieldName = 'idMateria';
    } else if (selectedTable === 'usuario') {
      idFieldName = 'idUsuario';
    } else if (selectedTable === 'curso') {
      idFieldName = 'idCurso';
    }
      const id = editedData[rowIndex][idFieldName];
      const url = `http://localhost:3000/${selectedTable}/${id}`;
      await axios.delete(url);

      const updatedData = editedData.filter((row, index) => index !== rowIndex);
      setEditedData(updatedData);
    } catch (error) {
      console.error('Error al borrar una fila:', error);
    }
  };

  const handleSaveChanges = async (rowIndex) => {
    try {
      const { isEditing, ...updatedRow } = editedData[rowIndex];
      
      const idFieldName = requiredFields[selectedTable][0]; // El primer campo es el ID
      const id = updatedRow[idFieldName];
  
      const isDataValid = requiredFields[selectedTable].every(
        (field) => updatedRow[field] !== undefined && updatedRow[field] !== ''
      );
  
      if (!isDataValid) {
        console.error('Completa todos los campos requeridos.');
        return;
      }
  
      // Crear un objeto con los campos a actualizar
      const fieldsToUpdate = {};
      for (const field in updatedRow) {
        if (requiredFields[selectedTable].includes(field)) {
          fieldsToUpdate[field] = updatedRow[field];
        }
      }
  
      await axios.put(`http://localhost:3000/${selectedTable}/${id}`, fieldsToUpdate);
  
      const updatedData = [...editedData];
      updatedData[rowIndex] = updatedRow;
      setEditedData(updatedData);
    } catch (error) {
      console.error('Error al guardar cambios:', error);
    }
  };
  
  

  const handleEditRow = (rowIndex) => {
    const updatedRow = { ...editedData[rowIndex], isEditing: true };
    const updatedData = [...editedData];
    updatedData[rowIndex] = updatedRow;
    setEditedData(updatedData);
  };

  const handleAddRow = async () => {
    try {
    let requiredFields = [];
    if (selectedTable === 'materias') {
      requiredFields = ['idMateria', 'nombre'];
    } else if (selectedTable === 'curso') {
      requiredFields = ['idCurso', 'anio'];
    } else if (selectedTable === 'usuario') {
      requiredFields = [
        'nombre',
        'dni',
        'fechaNac',
        'direccion',
        'telefono',
        'email',
        'password',
        'tipo',
        'curso',
      ];
    }
    const isDataValid = requiredFields.every((field) => newRowData[field] !== undefined && newRowData[field] !== '');

    if (!isDataValid) {
      console.error('Completa todos los campos requeridos.');
      return;
    }

console.log(selectedTable)
    // Envía la nueva fila al servidor para su creación
    const response = await axios.post(`http://localhost:3000/${selectedTable}`, newRowData);
    const addedRow = response.data;

    // Agrega la fila completa al estado local
    setEditedData([...editedData, addedRow]);
    setNewRowData({}); // Restablece la nueva fila después de agregarla

    // Después de agregar la fila, puedes recargar los datos nuevamente desde el servidor para asegurarte de que estén actualizados
    cargarDatos(); // Llama a la función que carga los datos nuevamente
  } catch (error) {
    console.error('Error al agregar una nueva fila:', error);
  }
};
  
  

  const handleNewRowInputChange = (e, columnName) => {
    setNewRowData({ ...newRowData, [columnName]: e.target.value });
  };

  const isTableEmpty = tableData.length === 0;

  return (
    <div className="admin-page d-flex flex-column ">

      <div>
        <div className="d-flex justify-content-between align-items-center ">
          <select
            className="form-select m-3"
            style={{ maxWidth: '200px' }}
            onChange={handleTableChange}
            value={selectedTable}
          >
            <option value="">Seleccionar tabla</option>
            {Object.keys(tableInfo).map((tableName) => (
              <option key={tableName} value={tableName}>
                {tableInfo[tableName].name}
              </option>
            ))}
          </select>

        </div>
        {selectedTable && (
          <div>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  {requiredFields[selectedTable].map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {editedData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {requiredFields[selectedTable].map((column) => (
                      <td key={column}>
                        {autoGeneratedColumns[selectedTable] === column ? (
                          row[column]
                        ) : row.isEditing ? (
                          <input
                            type="text"
                            className="form-control"
                            value={row[column]}
                            onChange={(e) => handleCellEdit(e, rowIndex, column)}
                          />
                        ) : (
                          row[column]
                        )}
                      </td>
                    ))}

                    <td>
                      {row.isEditing ? (
                        <div className="btn-group">
                          <button className="btn btn-primary" onClick={() => handleSaveChanges(rowIndex)}>Guardar</button>
                          <button className="btn btn-danger" onClick={() => handleDeleteRow(rowIndex)}>Borrar</button>
                        </div>
                      ) : (
                        <div className="btn-group">
                          <button className="btn btn-warning" onClick={() => handleEditRow(rowIndex)}>Editar</button>
                          <button className="btn btn-danger" onClick={() => handleDeleteRow(rowIndex)}>Borrar</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {/* Agrega una fila vacía al final para agregar nuevos datos */}
                <tr>
                  {requiredFields[selectedTable].map((field) => (
                    <td key={field}>
                      {autoGeneratedColumns[selectedTable] === field ? (
                        'autocompletado'
                      ) : (
                        <input
                          type="text"
                          className="form-control"
                          value={newRowData[field] || ''}
                          onChange={(e) => handleNewRowInputChange(e, field)}
                        />
                      )}
                    </td>
                  ))}
                  <td>
                    <button className="btn btn-success" onClick={handleAddRow}>
                      Agregar
                    </button>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        )}
      </div>

      <BloqueDeCarga />
      <SessionExpiration />
    </div>
  );
};

export default AdminPage;
