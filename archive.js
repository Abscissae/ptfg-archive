document.addEventListener("DOMContentLoaded", function(event) {
  var H = location.hash.substr(1);
  if (document.getElementById(H) || H.trim() == "") return;
  H=decodeURI(H);  
  document.getElementById("storysearch").value = H;
  search(H);
});

function search(H)
{
  H = H.trim().toLowerCase();
  if (H.length == 0)
  {
    displayAll();
    return;
  }
  
  var A = document.querySelectorAll("main section");
  var d = 0;
  for (i = 0; i < A.length; i++)
  {
    var S = A[i].getElementsByTagName("article");
    var c = 0;
    
    for (j = 0; j < S.length; j++)
    {
      if (checkStory(S[j], H))
      {
        c++;
        S[j].style.display="";
      }
      else
        S[j].style.display="none";
    }
    d+=c;
    A[i].style.display=(c==0)?"none":"";
  }
  if (d==0)
    displayAll();
}

function displayAll()
{
  var A = document.querySelectorAll("main section");
  A.forEach(e => e.style.display="");
  var S = document.querySelectorAll("main article");
  S.forEach(e => e.style.display="");
}

function checkStory(story, search)
{
  return story.innerText.toLowerCase().includes(search);
}