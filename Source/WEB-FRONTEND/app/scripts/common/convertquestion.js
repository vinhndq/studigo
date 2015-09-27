function getWord(question)
{
  var word = {
    "video_path":'',
    "video_description":'',
    "word":'',
    "spelling":'',
    "word_picture":'',
    "word_means":[{
        "mean":"",
        "egs":[{"eg":''},{"eg":''}]
    }],
    "word_audio":''
  };

  return word;
}
function getConversation(question)
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
