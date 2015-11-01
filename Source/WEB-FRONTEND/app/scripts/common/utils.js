function appendValueToComponent(component,value)
{
  console.log($(component));
  var data = $(component)[0].val();
  if(data===null)
  {
    data = '';
  }
  data=data+' '+value;
  $(component)[0].val(data);
}
function changeStep(step,num)
{
  return step+num;
}
