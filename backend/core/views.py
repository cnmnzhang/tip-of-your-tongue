import os
import sys

import openai
from flask import Flask, redirect, render_template, request, url_for
from core import app
from datetime import datetime
import re
import json

openai.api_key = os.getenv("OPENAI_API_KEY")

similar_word_prompt = 'Please enter a similar/related word to the one you are thinking of:'
prefix_prompt = "Can you enter letter(s) the word starts with? Enter '?' if you are unsure."
definition_prompt = "Can you briefly attempt to define the word? Enter '?' if you are unsure."
part_of_speech_prompt = "Can you enter the part of speech? Enter '?' if you are unsure."
confirm_word_prompt = "Are any of these words what you were thinking of?"
next_next_prompt = ''
reset_prompt = 'We will try to reset. Please enter a similar/related word to the one you are thinking of:'

rude_requests = ['stfu', 'shut up', 'dumb', "you're dumb"]


prev_input = ''
next_prompt = definition_prompt

related_to_string = ''
starts_with_string = ''
definition_string = ''
part_of_speech_string = ''

similar_word_count = 0


@app.route("/<query>")
def index(query):

    response = openai.Completion.create(
        model="text-davinci-002",
        prompt=generate_completion_prompt(query),
        temperature=0.6,
    )
    # return json.dumps(response.choices[0]["text"])
    message = json.dumps(response.choices[0]["text"])[5:-1]
    next = json.dumps(next_prompt)[1:-1]
    string = {"message": message, "next": next}
    return string



def generate_completion_prompt(user_input):

    global next_prompt
    global related_to_string
    global starts_with_string
    global similar_word_count
    global definition_string
    global part_of_speech_string
    global next_next_prompt

    if user_input == 'reset':
        similar_word_count = 0
        related_to_string = ''
        starts_with_string = ''
        definition_string = ''
        part_of_speech_string = ''
        next_prompt = definition_prompt
        return 'Say something about starting over.'


    if user_input in rude_requests:
        next_prompt = "That wasn't very nice."
        return 'Say something rude.'

    if next_prompt == similar_word_prompt:
        next_prompt = confirm_word_prompt

        if related_to_string != '':
            related_to_string += ' and '

        similar_word_count += 1

        related_to_string += user_input
        if similar_word_count == 1:
            next_next_prompt = prefix_prompt
        else:
            next_next_prompt = similar_word_prompt

        return "Can you tell me" + part_of_speech_string + "s" + "similar to " + related_to_string + \
               " that start with " + starts_with_string + \
               " and means " + definition_string + "?"

    if next_prompt == confirm_word_prompt:
        if user_input == 'no':
            if similar_word_count >= 4:
                similar_word_count = 0
                related_to_string = ''
                starts_with_string = ''
                definition_string = ''
                part_of_speech_string = ''

                next_prompt = reset_prompt
                return "Pretend you're a cat."

            next_prompt = next_next_prompt

            return 'Tell me something encouraging.'
        if user_input == 'yes':
            next_prompt = 'Would you like to look for another word?'
            related_to_string = ''
            starts_with_string = ''
            definition_string = ''
            part_of_speech_string = ''
            similar_word_count = 0
            return 'Say something celebratory'

    if next_prompt == 'Would you like to look for another word?' or next_prompt == \
            "It was a yes or no question. Would you like to look for another word?":
        if user_input == 'no':
            next_prompt = "Why are you still here?"
            return "Tell me to leave now."
        if user_input == 'yes' or user_input == 'yeah':
            next_prompt = similar_word_prompt
            return 'Say something about starting over.'
        else:
            next_prompt = "It was a yes or no question. Would you like to look for another word?"
            return 'Say something about being confused.'

    if next_prompt == prefix_prompt:
        next_next_prompt = part_of_speech_prompt

        if user_input == '?':
            next_prompt = part_of_speech_prompt
            return "Pretend you're a cat."
        else:
            starts_with_string = user_input
            next_prompt = confirm_word_prompt
            return "Can you tell me words similar to " + related_to_string + " that start with " + starts_with_string + \
                   "?"

    if next_prompt == definition_prompt or next_prompt == reset_prompt:
        next_next_prompt = similar_word_prompt

        if user_input == '?':
            next_prompt = similar_word_prompt
            return "Pretend you're a cat."
        else:
            definition_string = user_input
            next_prompt = confirm_word_prompt
            return "Can you tell me words similar to " + related_to_string + " that start with " + starts_with_string + \
                   " and means " + definition_string + "?"

    if next_prompt == part_of_speech_prompt:
        next_next_prompt = similar_word_prompt

        if user_input == '?':
            next_prompt = similar_word_prompt
            return "Pretend you're a cat."
        else:
            part_of_speech_string = user_input
            next_prompt = confirm_word_prompt
            return "Can you tell me" + part_of_speech_string + "s" + "similar to " + related_to_string + \
                   " that start with " + starts_with_string + \
                   " and means " + definition_string + "?"

    if user_input == 'no':
        return '.'

    global prev_input
    double_input = prev_input
    prev_input = user_input

    return 'Tell me the code is broken.'

#return """Can you tell me words similar to """ + prompt + "and " + double_input + '.'


def generate_prompt(animal):
    return """Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: {}
Names:""".format(
        animal.capitalize()
    )


@app.route("/hello/<name>")
def hello_there(name):
    now = datetime.now()
    formatted_now = now.strftime("%A, %d %B, %Y at %X")


    # Filter the name argument to letters only using regular expressions. URL arguments
    # can contain arbitrary text, so we restrict to safe characters only.
    match_object = re.match("[a-zA-Z]+", name)

    if match_object:
        clean_name = match_object.group(0)
    else:
        clean_name = "Friend"

    content = "Hello there, " + clean_name + "! It's " + formatted_now
    print(content, file=sys.stderr)
    app.logger.warning("sd")
    app.logger.error("sd")
    app.logger.info("sd")

    return content