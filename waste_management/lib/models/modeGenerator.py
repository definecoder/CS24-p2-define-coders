import json

def generate_model_code(fields):
    class_name = "User"
    code = f"class {class_name} {{\n"

    # Generate class fields
    for field in fields:
        code += f"  final String {field};\n"

    # Generate constructor
    code += f"\n  {class_name}({{\n"
    for field in fields:
        code += f"    required this.{field},\n"
    code += "  });\n"

    # Generate toMap method
    code += "\n  Map<String, dynamic> toMap() {\n"
    code += "    return {\n"
    for field in fields:
        code += f"      '{field}': {field},\n"
    code += "    };\n"
    code += "  }\n"

    # Generate fromMap method
    code += f"\n  factory {class_name}.fromMap(Map<String, dynamic> map) {{\n"
    code += f"    return {class_name}(\n"
    for field in fields:
        code += f"      {field}: map['user']['{field}'] ?? '',\n"
    code += "    );\n"
    code += "  }\n"

    # Generate toJson method
    code += "\n  String toJson() => json.encode(toMap());\n"

    # Generate fromJson method
    code += f"\n  factory {class_name}.fromJson(String source) => {class_name}.fromMap(json.decode(source));\n"

    code += "\n}"

    return code

# Example usage
userArr = ["id", "username", "email", "profileName", "roleName", "stsId", "landfillId", "sts", "landfill", "token"]
dart_code = generate_model_code(userArr)
print(dart_code)
