import 'dart:convert';

class User{
  final String id;
  final String username;
  final String email;
  final String profileName;
  final String roleName;
  final String stsId;
  final String landfillId;
  final String sts;
  final String landfill;
  final String token;

  User({
    required this.id,
    required this.username,
    required this.email,
    required this.profileName,
    required this.roleName,
    required this.stsId,
    required this.sts,
    required this.landfillId,
    required this.landfill,
    required this.token});

// json serialization (parameter gula select kore bulb icon a click korar por option ashbe)
  Map<String,dynamic> toMap(){
    return{
      'id': id,
      'username': username,
      'email': email,
      'profileName': profileName,
      'roleName': roleName,
      'stsId': stsId,
      'sts': sts,
      'landfillId': landfillId,
      'landfill': landfill,
      'token': token
    };
  }
  factory User.fromMap(Map<String,dynamic>map){
    return User(
      id: map['user']['_id'] ?? '',
      username: map['user']['username'] ?? '',
      email: map['user']['email'] ?? '',
      profileName: map['user']['profileName'] ?? '',
      roleName: map['user']['roleName'] ?? '',
      stsId: map['user']['stsId'] ?? '',
      sts: map['user']['sts'] ?? '',
      landfillId: map['user']['landfillId'] ?? '',
      landfill: map['user']['landfill'] ?? '',
      token: map['token'] ?? '',
    );
  }

  String toJson() => json.encode(toMap());

  factory User.fromJson(String source) => User.fromMap(json.decode(source));


}