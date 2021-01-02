const checkName=(name)=>{
    let nameRegex=RegExp('^[A-Z]{1}[a-zA-Z ]{2,}$');
    if(!nameRegex.test(name)) throw 'Name is Invalid';
}

const checkStartDate=(startDate)=>{
    let today=new Date();
    if(startDate>today) throw 'StartDate cannot be a future date';
    if(((today-startDate)/(60*60*24*1000))>30) throw "Startdate can't be more that 30 days before joining date";
}

window.addEventListener('DOMContentLoaded',(event)=>{
    let nameIsValid=false;
    let startDateIsValid=false;
    const submitButton=document.querySelector('#submitButton');
    submitButton.disabled=true;
    const name=document.querySelector('#name');
    const textError=document.querySelector('.text-error');
    name.addEventListener('input',function(){
        if(name.value.length==0){
            textError.textContent=="";
            return;
        }
        try{
            checkName(name.value);
            textError.textContent="";
            nameIsValid=true;
            if(nameIsValid && startDateIsValid){
                submitButton.disabled=false;
            }else{
                submitButton.disabled=true;
            }
        }catch(e){
            nameIsValid=false;
            textError.textContent=e;
        }
    });
    const salary=document.querySelector('#salary');
    const output=document.querySelector('.salary-output');
    salary.addEventListener('input',function(){
        output.textContent=salary.value;
    });
    const startDate=document.querySelector('#start_date')
    const dateError=document.querySelector('.date-error');
    startDate.addEventListener('input',function(){
        try{
            checkStartDate(new Date(Date.parse(startDate.value)));
            dateError.textContent="";
            startDateIsValid=true;
            if(nameIsValid && startDateIsValid){
                submitButton.disabled=false;
            }else{
                submitButton.disabled=true;
            }
        }catch(e){
            startDateIsValid=false;
            dateError.textContent=e;
        }
     });
});