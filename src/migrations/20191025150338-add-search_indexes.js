const vectorName = '_search'

const searchObjects = {
  posts: ['texto'],
  users: ['curso', 'ies'],
  questions: ['text']
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t =>
      Promise.all(
        Object.keys(searchObjects).map(table =>
          queryInterface.sequelize
            .query(`ALTER TABLE ${table} ADD COLUMN ${vectorName} TSVECTOR;`, {
              transaction: t
            })
            .then(() =>
              queryInterface.sequelize.query(
                `UPDATE ${table} SET ${vectorName} = to_tsvector('Portuguese', ${searchObjects[
                  table
                ].join(" || ' ' || ")});`,
                { transaction: t }
              )
            )
            .then(() =>
              queryInterface.sequelize.query(
                `CREATE TRIGGER ${table}_vector_update
                BEFORE INSERT OR UPDATE ON ${table}
                FOR EACH ROW EXECUTE PROCEDURE tsvector_update_trigger(${vectorName}, 'pg_catalog.Portuguese', ${searchObjects[
                  table
                ].join(', ')});`,
                { transaction: t }
              )
            )
            .error(console.log)
        )
      )
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t =>
      Promise.all(
        Object.keys(searchObjects).map(table =>
          queryInterface.sequelize
            .query(`DROP TRIGGER ${table}_vector_update ON ${table};`, {
              transaction: t
            })
            .then(() =>
              queryInterface.sequelize.query(`DROP INDEX ${table}_search;`, {
                transaction: t
              })
            )
            .then(() =>
              queryInterface.sequelize.query(
                `ALTER TABLE ${table} DROP COLUMN ${vectorName};`,
                { transaction: t }
              )
            )
        )
      )
    )
  }
}
