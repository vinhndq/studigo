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

function convertToListen(question)
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
    if(question.questionattributes[i].att_code===ATTR_QUESTION_CONTENT)
    {
      data.suggestList.push(question.questionattributes[i].attribute_value);

    }
    else if(question.questionattributes[i].att_code===ATTR_QUESTION_ANSWER)
    {
      data.right_answer.push(question.questionattributes[i].attribute_value);
    }
  }

  console.log(data.suggestList);
  return data;
}

function convertToReadParagraph(question)
{
  var data={
    "description":'',
    "question_content":''
  }

  data.description = question.question_name;
  if(question.questionattributes!=null && question.questionattributes.length>0)
  {
    data.question_content = question.questionattributes[0].attribute_value;
  }
  return data;
}

function convertToReadAndQuestion(question)
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
    if(question.questionattributes[i].att_code===ATTR_QUESTION_CHOICE)
    {
      data.choiceList.push(question.questionattributes[i].attribute_value);

    }
    else if(question.questionattributes[i].att_code===ATTR_QUESTION_ANSWER)
    {
      data.right_answer.push(question.questionattributes[i].attribute_value);
    }
    else if(question.questionattributes[i].att_code===ATTR_QUESTION_CONTENT)
    {
      data.question_content=question.questionattributes[i].attribute_value;
    }
  }
  console.log(data.choiceList);
  return data;
}
