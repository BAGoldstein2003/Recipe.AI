import openai
import os
import json

api_key=os.environ.get("OPENAI_API_KEY")

client = openai.OpenAI(api_key=api_key)

def makeRecipe(data):
   message= f"Find/create a {data['adjective']} {data['mealType']} recipe without {', '.join(data['allergies'])}. return an EXACT copy of a json object with 'title': 'string', 'ingredients': 'array', and instructions: 'array'. start with the opening bracket.'"
   response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "user", "content": message}
        ]
    )
   recipe = response.choices[0].message.content
   #convert response to JSON format
   try:
        recipe_json = json.loads(recipe)
        return recipe_json
   except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {str(e)}")
        return