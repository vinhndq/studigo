function convertToWord(question)
{
  var word = {
    "video_path":'',
    "video_description":'',
    "word_content":'',
    "word_picture":'',
    "word_audio":''
  };
  word.word_audio = question.audio_path;
  word.word_content = question.question_content;
  word.word_picture = question.question_image;
  
  return word;
}
function convertToWordSound(question)
{
  var word = {
    "video_path":'',
    "question_content":''
  };
  word.video_path = question.video_path;
  word.question_content=question.question_content;
  return word;
}
function convertToConversation(question)
{
  var conversation = {
    "sentence":[
      {
        "text":"",
        "audio":"",
        "recording":""
      },
      {
        "text":"",
        "audio":"",
        "recording":""
      },
      {
        "text":"",
        "audio":"",
        "recording":""
      }
    ]
  };

  return conversation;
}
