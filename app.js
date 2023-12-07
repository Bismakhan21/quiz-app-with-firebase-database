var firebaseConfig = {
    apiKey: "AIzaSyBwTF4eZQYZb0DrVLuTWXIvK_kiG8f8ShU",
    authDomain: "quiz-app-c9d35.firebaseapp.com",
    databaseURL: "https://quiz-app-c9d35-default-rtdb.firebaseio.com",
    projectId: "quiz-app-c9d35",
    storageBucket: "quiz-app-c9d35.appspot.com",
    messagingSenderId: "720591426432",
    appId: "1:720591426432:web:8aab0b5cde91e01e736765",
    measurementId: "G-1FGCRX1H01"
  };

 // Initialize Firebase
 var app = firebase.initializeApp(firebaseConfig);

//  console.log(firebase.database);

 function startQuiz(){
     window.location.href = "index2.html";

 }

 var questions = [
    {
        question:"HTML stands for",
        option1:"Hyper Text markup language",
        option2:"Hyper Link markup language",
        option3:"Hyper Text makeup language",
        correctAns:"Hyper Text markup language"
    },
    
 {
    question: "What is JavaScript primarily used for?",
    option1: "Styling web pages",
    option2: "Creating interactive web applications",
    option3: "Storing data on a server",
    correctAns: "Creating interactive web applications",
},        
{               
   question: " How do you comment a single line in JavaScript?",
   option1: "<!-- This is a comment --> ",
   option3: " // This is a comment",
   option4: "** This is a comment ** ",
   correctAns: " // This is a comment",
},
{
   question: "Which of the following is not a valid JavaScript data type? ",
   option1: "string ",
   option2: "undefined ",
   option3: "character",
   correctAns: "character",
},         
{
   question: "Which keyword is used to declare a variable in JavaScript?",
   option1: "define",
   option2: "var",
   option3: "int",
   correctAns: "var",
},
{
    question:"CSS stands for",
    option1:"Cascading Style sheet",
    option2:"Cascading Styling sheet",
    option3:"Cascading super sheet",
    correctAns:"Cascading Style sheet"
},
{
    question:"In how many ways can CSS be written in?",
    option1:"1",
    option2:"2",
    option3:"3",
    correctAns:"3"
},
{
    question:"Which tag gives your the largest heading in html",
    option1:"<h6>",
    option2:"<h2>",
    option3:"<h1>",
    correctAns:"<h1>"
},
{
    question:"how many data types in js?",
    option1:"6",
    option2:"7",
    option3:"8",
    correctAns:"8"
}
,
{
    question:"how many days in febuary",
    option1:"30",
    option2:"28",
    option3:"29",
    correctAns:"28"
}
]
     
    var para = document.getElementById("ques");
    var opt1 = document.getElementById("opt1");
    var opt2 = document.getElementById("opt2");
    var opt3 = document.getElementById("opt3");
    var button = document.getElementById("btn");
    var timer = document.getElementById("timer");
    var index = 0;
    var score = 0;
    var min = 1;
    var sec = 59;
  
    setInterval(function(){
        timer.innerHTML = `${min}:${sec}`;
        sec--
        if(sec<0){
            min--;
            sec = 59    
        }
        if(min<0){
            min= 1;
            sec = 59;
            nextQuestion()
        }
    },1000)

    
    function nextQuestion(){
    
        var getOptions = document.getElementsByName("options");
    
        for(var i = 0;i < getOptions.length; i++)
        {
            if(getOptions[i].checked){
                var selectedValue = getOptions[i].value;
                var selectedAns = questions[index-1][`option${selectedValue}`]
                var correctAns = questions[index - 1]["correctAns"]
                if(selectedAns == correctAns){
                    score++
                }
            }
            getOptions[i].checked = false;
        
        }

        button.disabled = true;
        min = 1;
        sec = 59;

        
        if(index > questions.length - 1){
 
            if((score / questions.length)*100 <= 100){
                Swal.fire({
                    title: "Good job!",
                    text: `Your percentage is ${((score / questions.length)*100).toFixed(2)}`,
                    icon: "success"
                  });
        }

            if((score / questions.length)*100 <= 70){
            Swal.fire(
                'Work hard!',
            `Your percentage is ${((score / questions.length)*100).toFixed(2)}`,
                'warning'
              )
            }
        
            if((score / questions.length)*100 <= 40){
    
                Swal.fire(
                    'Fail!',
                `Your percentage is ${((score / questions.length)*100).toFixed(2)}`,
                    'error'
                  )
            }
            timer = 0;
            
        }
        
        else{
            para.innerHTML = questions[index].question;
            opt1.innerText = questions[index].option1;
            opt2.innerText = questions[index].option2;
            opt3.innerText = questions[index].option3;
            index++
        }
    }
    
    function clicked()
    {
        button.disabled = false;
        
        // for database//
        
     var getOptions = document.getElementsByName("options");
     var score = 0;

     for(var i = 0;i < getOptions.length; i++)
        {
            if(getOptions[i].checked){
                var selectedValue = getOptions[i].value;
                var selectedQues = questions[index - 1]["question"];
                var selectedAns = questions[index-1][`option${selectedValue}`]
                var correctAns = questions[index - 1]["correctAns"] 
                if(selectedAns == correctAns){
                    score++ 

       }

       if(index > questions.length - 1){
           
       }



     var obj = {
        selectedQues: selectedQues,
        selectedAns: selectedAns,
        correctAns: correctAns,
        score: score++
    }
         console.log(obj);    
    }   
}
        firebase.database().ref("quiz/key" + score).push(obj);
    }
