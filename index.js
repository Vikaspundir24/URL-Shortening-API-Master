const clickBtn = document.querySelector(".clickBtn")
const inputForm = document.querySelector(".inp")
const shortenLinks = document.querySelector(".shortenLinks")
let newBox = "";
const menu = document.querySelector(".menu")
const disp = document.querySelector(".navBarLater")


menu.addEventListener("click",() =>{
  if(disp.style.display == "flex"){
    disp.style.display = "none"
  }
  else{
    disp.style.display = "flex"
  }
 
})

clickBtn.addEventListener("click", () => {
  const oldLink = inputForm.value;
  //console.log(oldLink)






  document.querySelector(".inp").classList.remove("redBorder");
  document.querySelector(".error1").style.display = "none";
  document.querySelector(".clickBtn").style.backgroundColor = "hsl(180, 66%, 49%)";
  document.querySelector(".clickBtn").style.marginTop = "0px";




  fetch(`https://api.shrtco.de/v2/shorten?url=${oldLink}`)
    .then((response) => {
      return response.json();
    }).then((data) => {
      // console.log(data);


      const finalData = data;

      if (finalData.error_code === 1) {
        document.querySelector(".inp").classList.add("redBorder");
        document.querySelector(".error1").style.display = "flex";
        document.querySelector(".error2").style.display = "none";
        document.querySelector(".error3").style.display = "none";
        document.querySelector(".clickBtn").style.backgroundColor = "hsl(180, 66%, 79%)";
        document.querySelector(".clickBtn").style.marginTop = "2px";
        inputForm.value = "";
      } else if (finalData.error_code === 2) {
        document.querySelector(".error1").style.display = "none";
        document.querySelector(".inp").classList.add("redBorder");
        document.querySelector(".error2").style.display = "flex";
        document.querySelector(".clickBtn").style.backgroundColor = "hsl(180, 66%, 79%)";
        document.querySelector(".clickBtn").style.marginTop = "2px";
        inputForm.value = "";
      } else if (!finalData.ok) {

        document.querySelector(".error1").style.display = "none";
        document.querySelector(".error2").style.display = "none";
        document.querySelector(".inp").classList.add("redBorder");
        document.querySelector(".error3").style.display = "flex";
        document.querySelector(".clickBtn").style.backgroundColor = "hsl(180, 66%, 79%)";
        document.querySelector(".clickBtn").style.marginTop = "2px";
        inputForm.value = "";
      } else {
        // console.log(finalData);

        document.querySelector(".error1").style.display = "none";
        document.querySelector(".error2").style.display = "none";
        document.querySelector(".error3").style.display = "none";

        const newshortLink = finalData.result.full_share_link;
        // console.log(newshortLink);


        let newLink = `<div class="links">
                         <div class="link-left">
                               <p>${oldLink}</p>
                         </div>
                           <div class="link-right">
                                <div class="copyThis">${newshortLink}</div>
                                <button type="button" id="copyBtn">Copy</button>
                               
                           </div>
                       </div>`;

        newBox += newLink;
        inputForm.value = "";


      }
      shortenLinks.innerHTML = newBox;

      const link = document.querySelectorAll("#copyBtn");
      const copyThis = document.querySelectorAll(".copyThis")
      link.forEach((copyBtn, i) => {

        copyBtn.addEventListener("click", (e) => {
          console.log("fired");
          navigator.clipboard.writeText(copyThis[i].innerText);
          copyBtn.style.backgroundColor = "hsl(257, 27%, 26%)";
          copyBtn.style.pointerEvents = "none";
          copyBtn.innerText = "Copied!";
        })
      })





    })



})