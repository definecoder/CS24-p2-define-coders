
import 'package:flutter/material.dart';

import 'package:waste_management/models/auth_model.dart';

class UserProvider extends ChangeNotifier{
  User _user = User(
    id: '',
    username: '',
    email: '',
    profileName: '',
    roleName: '',
    stsId: '',
    sts: '',
    landfillId: '',
    landfill:'',
    token: ''
  );

  User get user => _user; // karon eta private variable

  void setUser(User user){   // provider a save hoise log in data
    // Provider.of<UserProvider>(context, listen: false).setUser(res.body);
    _user = user; // User.fromJson(user);
    notifyListeners();
  }

}