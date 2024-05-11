import 'dart:convert';

class Issue {
  final String id;
  final String type;
  final String issuePic;
  final String description;
  final String latitude;
  final String longitude;
  final bool isAnonymous;

  Issue({
    required this.id,
    required this.type,
    required this.issuePic,
    required this.description,
    required this.latitude,
    required this.longitude,
    required this.isAnonymous,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'type': type,
      'issuePic': issuePic,
      'description': description,
      'latitude': latitude,
      'longitude': longitude,
      'isAnonymous': isAnonymous,
    };
  }

  factory Issue.fromMap(Map<String, dynamic> map) {
    return Issue(
      id: map['user']['id'] ?? '',
      type: map['user']['type'] ?? '',
      issuePic: map['user']['issuePic'] ?? '',
      description: map['user']['description'] ?? '',
      latitude: map['user']['latitude'] ?? '',
      longitude: map['user']['longitude'] ?? '',
      isAnonymous: map['user']['isAnonymous'] ?? '',
    );
  }

  String toJson() => json.encode(toMap());

  factory Issue.fromJson(String source) => Issue.fromMap(json.decode(source));

}

