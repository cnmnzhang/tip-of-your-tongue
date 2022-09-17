import spacy
import numpy as np
from PyDictionary import PyDictionary
import nltk
from nltk.corpus import stopwords


nlp = spacy.load('en_core_web_lg')


def get_most_similar_words(word, num_words):
    """
    Gets the top n (num_words) most similar words to an input word and their
    similarity scores.

    :param word: Input word (string)
    :param num_words: Number of words (int).
    :return: List containing the most similar words and then the list of corresponding scores.

    """
    ms = nlp.vocab.vectors.most_similar(
        np.asarray([nlp.vocab.vectors[nlp.vocab.strings[word]]]), n=num_words)
    words = [nlp.vocab.strings[w] for w in ms[0][0]]
    distances = ms[2]
    return [words, distances[0]]


def modify_by_prefix(guess_to_scores, prefix):
    """
    Updates the scores for words in the guesses to scores dictionary
    if they begin with a specified string (prefix). Modification
    is in-place.

    :param guess_to_scores: Dictionary containing the guesses and their
    cooresponding relevance scores.
    :param prefix: The sequence of characters representing a prefix.
    :return: None.
    """

    for key in guess_to_scores.keys():
        if prefix == key[0:len(prefix)]:
            print(key)
            guess_to_scores[key] += 0.5


def compare_definition_similarity(def1, def_set):
    """
    Compares a user-input definition def1 to a set of possible definitions for
    a word (def-set), and returns the score representing the highest similarity
    between def1 and any of the definitions in def_set.

    :param def1: The user-input word definition.
    :param def_set: A set of possible definitions for a word.
    :return: The highest possible similarity score.
    """

    doc1 = nlp(def1)

    curr_max = -20

    for def2 in def_set:
        doc2 = nlp(def2)
        simil = doc1.similarity(doc2)
        if simil > curr_max:
            curr_max = simil

    return curr_max


def modify_by_syn(words_to_scores, prefix, syn_word):
    """
    Modifies the words_to_scores dictionary given a user-input similar word (modification is in-place).

    :param words_to_scores: The dictionary of words and their associated scores.
    :param prefix: The user-specified prefix.
    :param syn_word: The user-specified similar word.
    :return:
    """

    stop_words = set(stopwords.words('english'))

    given = get_most_similar_words(syn_word, 40)

    for i in range(1, 25):
        true_word = given[0][i].casefold().replace("-","")

        if true_word in stop_words:
            continue

        if true_word not in words_to_scores:
            words_to_scores[true_word] = given[1][i]
        else:
            words_to_scores[true_word] += given[1][i]

        if prefix in true_word:
            words_to_scores[true_word] += 1


def modify_by_definition(words_to_scores, prefix):
    """
    Modifies the words_to_scores dictionary given a user-input definition (modification is in-place).

    :param words_to_scores: The dictionary of words and their associated scores.
    :param prefix: The user-specified prefix.
    :return: None
    """

    stop_words = set(stopwords.words('english'))

    user_definition = input("Please enter your best guess at a definition:" )

    definition_words = user_definition.split(" ")

    dictionary=PyDictionary()

    for definition_word in definition_words:
        if definition_word.casefold() not in stop_words:
            print(definition_word)
            modify_by_syn(words_to_scores, prefix, definition_word)
            print(words_to_scores)

            # Modify word scores by their definition's similarity with the input definition.
    new = sorted(words_to_scores, key=words_to_scores.get, reverse=True)[:20]

    for word in new:
        meaning = dictionary.meaning(word)
        if meaning is not None:
            vals = meaning.values()
            val = ''
            for item in vals:
                val = item

            words_to_scores[word] += compare_definition_similarity(user_definition, val)


def new_and_improved_program():
    """
    Mimics a web app using user input and print statements.
    :return: None
    """

    stop_words = set(stopwords.words('english'))
    words_to_scores = {}
    prefix = '---------'

    user_input = input("Please enter your next input type. Choose definition, prefix, or similar word. ")

    while user_input != 'QUIT':
        if user_input == 'definition':
            modify_by_definition(words_to_scores, prefix)
        elif user_input == 'prefix':
            prefix = input("Please enter a prefix: ")
            modify_by_prefix(words_to_scores, prefix)
        elif user_input == 'similar word':
            syn_word = input("Please enter a similar word: ")
            modify_by_syn(words_to_scores, prefix, syn_word)

        new = sorted(words_to_scores, key=words_to_scores.get, reverse=True)[:8]
        print("Here are my best guesses for you: ")
        print(new)

        user_input = input('Were any of these correct? ')

        if user_input == 'yes':
            break
        else:
            for bad_word in new:
                words_to_scores[bad_word] = -100

        user_input = input("Please enter your next input type. Choose definition, prefix, or similar word. ")

    print("YAY!")






#sample_program()
new_and_improved_program()

#dictionary=PyDictionary()
#print (dictionary.meaning("indentation"))

