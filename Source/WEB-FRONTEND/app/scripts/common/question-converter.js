function convertToWord(question,sce)
{
  var word = {
    "video_path":'',
    "video_description":'',
    "word_content":'',
    "word_picture":'',
    "word_audio":''
  };
  word.word_audio = question.audio_path;
  //word.word_content = question.question_content;
  word.word_picture = question.img_path;
  console.log(question.questionattributes);
  for(i=0;i<question.questionattributes.length;i++)
  {
    var att = question.questionattributes[i];
    console.log("ATT"+i);
    console.log(att);
    if(att.att_code ===ATTR_QUESTION_CONTENT )
    {
      word.word_content=(word.word_content+"<br/>"+att.attribute_value);
    }
  }
  word.word_content = sce.trustAsHtml(word.word_content);
  return word;
}
function convertToWordSound(question)
{
  var word = {
    "video_path":'',
    "question_content":''
  };
  word.video_path = question.video_path;
  for(var i=0;i<question.questionattributes.length;i++)
  {
    var att = question.questionattributes[i];
    if(att.att_code ===ATTR_QUESTION_CONTENT )
    {
      word.question_content=att.attribute_value;
    }
  }

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
