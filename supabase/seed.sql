-- Delete existing data from the table
DELETE FROM questionnaire;

INSERT INTO
  questionnaire (id, question)
VALUES
  (1, 'What is your name?'),
  (
    2,
    'If you were a travel guide for an alien visiting Earth, what''s the first place you''d take them?'
  ),
  (
    3,
    'If you got arrested today what would it be for?'
  ),
  (
    4,
    'If an ex got to roast you but could only use 1 word, what would it be?'
  ),
  (
    5,
    'You pissed off an evil sorcerer and they are going to turn you into a vampire, werewolf, or a consultant but they’re into consent culture so they let you pick…'
  );
