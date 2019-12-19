'use strict'

const Hash = use("Hash");
const User = use("App/Models/User");
const {validate} = use('Validator');

class UserController {

  async index({request, response}) {
    try {
      const users = await User.all();
      response.json({users})
    }
    catch (error) {
      console.error(error)
    }
  }
  async show({request, params, response}) {
    try {
      const user = await User.find(params.id)
      response.json({user})
    }
    catch (error) {
      console.error(error)
    }
  }

  async create({request, params, response}) {
    try {
      const rules = {
        username: 'required|unique:users',
        email: 'required|email|unique:users',
        password: 'required'
      }
      const validation = await validate(request.all(), rules)
      if (validation.fails()) {
        //console.log(validation._errorMessages)
        response.status(200).json({
          message: validation._errorMessages
        });
      }
      const {username, email, password} = request.all()
      const newUser = new User();
      newUser.username = username;
      newUser.email = email;
      newUser.password = password;
      await newUser.save();
      response.status(200).json({
        message: "Новый пользователь успешно добавлен"
      });
    }
    catch (error) {
      console.error(error)
    }
  }

  async update({request, params, response}) {
    try {
      const userData = request.all()
      const rules = {
        username: 'required|unique:users'
      }
      const validation = await validate(request.all(), rules)
      if (validation.fails()) {
        response.status(200).json({
          message: validation._errorMessages
        });
      }
      const currentUser = await User.find(params.id);
      currentUser.merge(userData)
      await currentUser.save();
      response.status(200).json({
        message: "Пользователь успешно отредактирован"
      });
    }
    catch (error) {
      console.error(error)
    }
  }

  async delete({request, params, response}) {
    try {

    }
    catch (error) {
      console.error(error)
    }
  }

}

module.exports = UserController
