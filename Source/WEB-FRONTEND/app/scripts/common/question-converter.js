function convertToWord(question)
{
  var word = {
    "video_path":'',
    "video_description":'',
    "word_content":'',
    "word_picture":'',
    "word_audio":''
  };

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
