'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')

class UserSeeder {
  async run () {
    await User.createMany([
        {
          username: "Admin",
          email: "admin@adonis",
          password: "123456"
        },
        {
          username: "User",
          email: "user@adonis",
          password: "123456"
        }
      ]
    )
  }
}

module.exports = UserSeeder
