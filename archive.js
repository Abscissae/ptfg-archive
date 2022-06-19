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
  
  var A = document.querySelectorAll(document.getElementById("sortedstories").hasChildNodes()?"#sortedstories":"main section");
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
  document.getElementById("numstories").innerText = d+"/";
}

function displayAll()
{
  document.querySelectorAll("main section, main article, #sortedstories").forEach(e => e.style.display="");
  document.getElementById("numstories").innerText = "";
}

function checkStory(story, search)
{
  return story.innerText.toLowerCase().includes(search);
}

function sortBy(v)
{
	var N = document.getElementById("sortedstories");
	var M = document.getElementById("storiesbyauthor");
	N.replaceChildren();
	if (v=="Author")
	{
		M.style.display="";
		search(document.getElementById("storysearch").value);
		return;
	}
	
	var s = document.querySelectorAll("#storiesbyauthor article");
	M.style.display="none";

	if (v=="Old")
		[...s].sort((a,b)=>a.querySelector("time").innerText>b.querySelector("time").innerText?1:-1).forEach(n=>N.appendChild(n.cloneNode(true)));
	else if (v=="New")
		[...s].sort((a,b)=>a.querySelector("time").innerText<b.querySelector("time").innerText?1:-1).forEach(n=>N.appendChild(n.cloneNode(true)));
	search(document.getElementById("storysearch").value);
}