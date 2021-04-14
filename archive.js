document.addEventListener("DOMContentLoaded", function(event) {
  var H = location.hash.substr(1);
  if (document.getElementById(H) || H == "") return;
  H=decodeURI(H.toLowerCase());
  
  var A = document.querySelectorAll("main section");
  var d = 0;
  for (i = 0; i < A.length; i++)
  {
    var S = A[i].getElementsByTagName("article");
    var c = 0;
    
    for (j = 0; j < S.length; j++)
    {
      if (checkStory(S[j], H))
        c++;
      else
        S[j].style.display="none";
    }
    d+=c;
    if (c==0)
      A[i].style.display="none";
  }
  if (d==0)
    displayAll();
});

function displayAll()
{
  var A = document.querySelectorAll("main section");
  A.forEach(e => e.style.display="");
  var S = document.querySelectorAll("main article");
  S.forEach(e => e.style.display="");
}

function checkStory(story, search)
{
  var tags = story.querySelector("article>span:last-of-type").parentElement.innerText.toLowerCase();
  return tags.includes(search);
}