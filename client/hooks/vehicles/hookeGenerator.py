def generate_hook_function(type_name, variables):
    # Create the TypeScript type definition
    type_definition = f"type {type_name} = {{\n"
    for variable in variables:
        type_definition += f"  {variable}: {get_type(variable)};\n"
    type_definition += "};\n\n"

    # Create the custom hook function
    hook_function = f"use client;\n"
    hook_function += f"import {{ apiRoutes }} from \"@/data/apiRoutes\";\n"
    hook_function += f"import {{ jwtToken }} from \"@/data/cookieNames\";\n"
    hook_function += f"import {{ message }} from \"antd\";\n"
    hook_function += f"import axios from \"axios\";\n"
    hook_function += f"import {{ useState }} from \"react\";\n"
    hook_function += f"import {{ getCookie }} from \"@/lib/cookieFunctions\";\n\n"
    hook_function += type_definition
    hook_function += f"export default function useGet{type_name.capitalize()}() {{\n"
    hook_function += f"  const [{type_name.lower()}Data, set{type_name.capitalize()}Data] = useState<{type_name}[]>([]);\n\n"
    hook_function += f"  async function getAll{type_name.capitalize()}() {{\n"
    hook_function += "    try {\n"
    hook_function += f"      const res = await axios.get(apiRoutes.{type_name.lower()}.create , {{\n"
    hook_function += "        headers: {\n"
    hook_function += f"          Authorization: `Bearer ${{await getCookie(jwtToken)}}`,\n"
    hook_function += "        },\n"
    hook_function += "      });\n"
    hook_function += f"      const All{type_name.capitalize()}: {type_name}[] = res.data.map(({type_name.lower()}: any) => ({{\n"
    for variable in variables:
        hook_function += f"        {variable}: {type_name.lower()}.{variable},\n"
    hook_function += "      }}));\n\n"
    hook_function += f"      set{type_name.capitalize()}Data(All{type_name.capitalize()});\n\n"
    hook_function += f"      return {type_name.lower()}Data;\n"
    hook_function += "    } catch (error: any) {\n"
    hook_function += "      message.error(error?.response?.data?.message + \"Error fetching landfill data... Are you authorized?\");\n"
    hook_function += "    }\n"
    hook_function += "  }\n\n"
    hook_function += f"  return {{ {type_name.lower()}Data, getAll{type_name.capitalize()} }};\n"
    hook_function += "}\n"

    return hook_function

# Helper function to get TypeScript type from Python type
def get_type(variable):
    if isinstance(variable, str):
        return "string"
    elif isinstance(variable, int):
        return "number"
    elif isinstance(variable, float):
        return "number"
    elif isinstance(variable, bool):
        return "boolean"
    else:
        return "any"  # Handle other types as 'any'

# Example usage
hook_code = generate_hook_function("Issue", ["issueType", "description", "latitude", "longitude", "isAnonymous"])
print(hook_code)
