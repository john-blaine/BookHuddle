const buildSchema = (db, knex) => new Promise((resolve, reject) => {
  db.knex.schema.hasTable('user').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('user', (t) => {
        t.increments('id').primary().unsigned();
        t.string('email', 100);
        t.string('password', 100);
        t.string('first_name', 100);
        t.string('last_name', 100);
        t.string('user_location', 100);
        t.string('profile_url', 300);
        t.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
      }).then((table) => {
        console.log('Created table user');
      });
    }
  }).then(() => {
    db.knex.schema.hasTable('club').then((exists) => {
      if (!exists) {
        return knex.schema.createTable('club', (t) => {
          t.increments('id').primary().unsigned();
          t.string('club_name', 100);
          t.string('club_location', 100);
          t.integer('club_admin_user_id', 100);
          t.text('club_description', 280);
          t.string('club_genre', 100);
          t.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
        }).then((table) => {
          console.log('Created table club');
        });
      }
    });
  }).then(() => {
    db.knex.schema.hasTable('meeting').then((exists) => {
      if (!exists) {
        return knex.schema.createTable('meeting', (t) => {
          t.increments('id').primary().unsigned();
          t.datetime('meeting_timestamp', 100);
          t.string('meeting_host', 100);
          t.string('meeting_street_address');
          t.text('meeting_notes', 280);
          t.timestamp('meeting_created_at').notNullable().defaultTo(knex.raw('now()'));
          t.string('meeting_book', 600);
          t.integer('club_id').references('club.id').unsigned();
          t.string('trivia_questions', 1000);
        }).then((table) => {
          console.log('Created table meeting');
        });
      }
    });
  })
    .then(() => {
      db.knex.schema.hasTable('book').then((exists) => {
        if (!exists) {
          return knex.schema.createTable('book', (t) => {
            t.increments('id').primary().unsigned();
            t.string('book_amazon_id', 100);
            t.text('book_title', 100);
            t.text('book_author', 100);
            t.text('book_genres', 100);
            t.text('book_image_url', 300);
          }).then((table) => {
            console.log('Created table books');
          });
        }
      });
    })
    .then(() => {
      db.knex.schema.hasTable('genre').then((exists) => {
        if (!exists) {
          return knex.schema.createTable('genre', (t) => {
            t.increments('id').primary().unsigned();
            t.string('name', 100);
            t.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
          });
        }
      });
    })
    .then(() => {
      db.knex.schema.hasTable('user_club').then((exists) => {
        if (!exists) {
          return knex.schema.createTable('user_club', (t) => {
            t.integer('user_id').references('id').inTable('user').notNull()
              .unsigned();
            t.integer('club_id').references('id').inTable('club').notNull()
              .unsigned();
            t.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
          });
        }
      });
    })
    .then(() => {
      db.knex.schema.hasTable('club_book').then((exists) => {
        if (!exists) {
          return knex.schema.createTable('club_book', (t) => {
            t.integer('club_id').references('club.id').unsigned();
            t.integer('book_id').references('book.id').unsigned();
            t.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
          });
        }
      });
    })
    .then(() => {
      db.knex.schema.hasTable('genre_club').then((exists) => {
        if (!exists) {
          return knex.schema.createTable('genre_club', (t) => {
            t.integer('genre_id').references('genre.id').unsigned();
            t.integer('club_id').references('club.id').unsigned();
            t.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
          });
        }
      });
    })
    .then(() => {
      db.knex.schema.hasTable('genre_book').then((exists) => {
        if (!exists) {
          return knex.schema.createTable('genre_book', (t) => {
            t.integer('genre_id').references('genre.id').unsigned();
            t.integer('book_id').references('book.id').unsigned();
            t.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
          })
            .then(() => {
              console.log('genre_book table created');
              console.log('All tables re-created');
              setTimeout(() => { resolve(); }, 2000);
            });
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
});


module.exports = buildSchema;
