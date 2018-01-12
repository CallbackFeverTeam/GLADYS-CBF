module.exports = {
    getById: 'SELECT * FROM skin WHERE id = ?;',
    getBySkinId: 'SELECT * FROM skin WHERE skinId = ?;',
    delete: 'DELETE FROM skin WHERE id = ?;',
  };