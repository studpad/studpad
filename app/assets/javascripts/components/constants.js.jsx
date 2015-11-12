const PostTypes = {
  text:      'text',
  photo:     'photo',
  file:      'filegroup',
  link:      'link',
  quotation: 'quotation',
  video:     'video'
};

const ElementTypes = {
  text:    'text',
  image:   'image',
  divider: 'divider'
};

CI = function(){
  console.info.apply(console, arguments);
}
CW = function(){
  console.warn.apply(console, arguments);
}
CE = function(){
  console.error.apply(console, arguments);
}
CL = function(){
  console.log.apply(console, arguments);
}
