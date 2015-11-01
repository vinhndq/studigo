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
    att.attribute_value = sce.trustAsHtml(att.attribute_value);
    if(att.att_code ===ATTR_QUESTION_CONTENT )
    {
      word.word_content=(word.word_content+"<br/>"+att.attribute_value);
    }
  }
  word.word_content = sce.trustAsHtml(word.word_content);
  return word;
}
function convertToWordSound(question,sce)
{
  var word = {
    "video_path":'',
    "question_content":''
  };
  word.video_path = question.video_path;
  for(var i=0;i<question.questionattributes.length;i++)
  {
    var att = question.questionattributes[i];
    att.attribute_value = sce.trustAsHtml(att.attribute_value);
    if(att.att_code ===ATTR_QUESTION_CONTENT )
    {
      word.question_content=att.attribute_value;
    }
  }

  return word;
}
function convertToConversation(question,sce)
{
  var conversation = [];
  for(i=0;i<question.questionattributes.length;i++)
  {
    var att = question.questionattributes[i];
    var sentence = {};
    sentence.audio_text = att.attribute_value;
    sentence.audio_path = att.audio_path;
    sentence.record="";
    sentence.wait_time = att.wait_time;
    sentence.playerid = att.playerid;
    sentence.answer = att.answer_text;
    conversation.push(sentence);
  }
  return conversation;
}

function convertToListen(question,sce)
{
  var data={
    "audio":'',
    "slow_audio":'',
    "description":'',
    "right_answer":[],
    "suggestList":[],

  };

  data.audio=question.audio_path;
  data.description = question.question_name;
  for(i=0;i<question.questionattributes.length;i++)
  {
    var att = question.questionattributes[i];
    att.attribute_value = sce.trustAsHtml(att.attribute_value);
    if(att.att_code===ATTR_QUESTION_CHOICE)
    {
      data.suggestList.push(att.attribute_value);

    }
    else if(att.att_code===ATTR_QUESTION_ANSWER)
    {
      data.right_answer.push(att.attribute_value);
    }
  }


  return data;
}

function convertToReadParagraph(question,sce)
{
  var data={
    "description":'',
    "question_content":''
  }

  data.description = question.question_name;
  if(question.questionattributes!=null && question.questionattributes.length>0)
  {
    var att = question.questionattributes[0];
    data.question_content = sce.trustAsHtml(att.attribute_value);
  }
  return data;
}

function convertToReadAndQuestion(question,sce)
{
  var data = {
    "question_content":'',
    "choiceList":[

    ],
    "right_answer":[

    ]
  }
  for(var i=0;i<question.questionattributes.length;i++)
  {
    var att = question.questionattributes[i];
    att.attribute_value = sce.trustAsHtml(att.attribute_value);
    if(att.att_code===ATTR_QUESTION_CHOICE)
    {
      data.choiceList.push(att.attribute_value);

    }
    else if(att.att_code===ATTR_QUESTION_ANSWER)
    {
      data.right_answer.push(att.attribute_value);
    }
    else if(att.att_code===ATTR_QUESTION_CONTENT)
    {
      data.question_content=att.attribute_value;
    }
  }

  return data;
}
