module.exports = {
    getByUser: 'SELECT * FROM todolist WHERE user = ? ORDER BY position, updatedAt DESC;',
    delete: 'DELETE FROM todolist WHERE id = ?;',
  };