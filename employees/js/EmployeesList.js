let employeePayrollList;
window.addEventListener('DOMContentLoaded',(event)=>{
    if(site_properties.use_local_storage.match("true")){
        getEmployeePayrollDataFromStorage();
    }else{
        getEmployeePayrollDataFromServer();
    }
});
const processEmployeePayrollDataResponse=()=>{
    document.querySelector('.emp-count').textContent=employeePayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
}

const getEmployeePayrollDataFromServer=()=>{
    makeServiceCall("GET",site_properties.server_url,true)
        .then(responseText=>{
            employeePayrollList=JSON.parse(responseText);
            processEmployeePayrollDataResponse();
        }).catch(error=>{
            console.log("GET error :"+error);
            employeePayrollList=[];
            processEmployeePayrollDataResponse();
        });
    return employeePayrollList;
}
const getEmployeePayrollDataFromStorage=()=>{
    const employeePayrollListString=localStorage.getItem('EmployeePayrollList');
    employeePayrollList= employeePayrollListString?JSON.parse(employeePayrollListString):[];
    processEmployeePayrollDataResponse();
}

const createInnerHtml=()=>{
    const headerHtml="<tr><th></th><th>Name</th><th>Gender</th><th>Department</th>"+
                    "<th>Salary</th><th>Start Date</th><th>Actions</th></tr>";
    let innerHtml=`${headerHtml}`;
    if(employeePayrollList.length==0) {
        document.querySelector('#table-display').innerHTML=innerHtml;
        return;
    }
    for(const employeePayrollData of employeePayrollList){
        if(employeePayrollData==null) continue;
        innerHtml=`${innerHtml}
            <tr>
                <td>
                    <img class="profile" alt="" src="${employeePayrollData.profilePic}">
                </td>
                <td>${employeePayrollData.name}</td>
                <td>${employeePayrollData.gender}</td>
                <td>${getDeptHtml(employeePayrollData.department)}</td>
                <td>${employeePayrollData.salary}</td>
                <td>${stringifyDate(new Date(employeePayrollData.startDate))}</td>
                <td>
                    <img id="${employeePayrollData.id}"  alt="delete" onclick="remove(this)" src="../assets/icons/delete-black-18dp.svg">
                    <img id="${employeePayrollData.id}"  alt="edit" onclick="update(this)" src="../assets/icons/create-black-18dp.svg">
                </td>
            </tr>
        `;
    }
    document.querySelector('#table-display').innerHTML=innerHtml;
}

const getDeptHtml=(deptList)=>{
    let deptHtml=``;
    for(let dept of deptList){
        deptHtml=`${deptHtml}<div class='dept-label'>${dept}</div>`;
    }
    return deptHtml;
}

function update(node){
    let employeePayrollData=employeePayrollList.find(empData=>empData.id==node.id);
    if(!employeePayrollData) return;
    localStorage.setItem('editEmp',JSON.stringify(employeePayrollData));
    window.location.replace(site_properties.add_emp_payroll_page);
}

function remove(node){
    let employeePayrollData=employeePayrollList.find(empData=>empData.id==node.id);
    if(!employeePayrollData) return;
    const index=employeePayrollList.map(empData => empData.id).indexOf(employeePayrollData.id);
    employeePayrollList.splice(index,1);
    if(site_properties.use_local_storage.match("true")){
        localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
        document.querySelector('.emp-count').textContent=employeePayrollList.length;
        createInnerHtml();
    }else{
        const deleteURL=site_properties.server_url+employeePayrollData.id.toString();
        makeServiceCall("DELETE",deleteURL,true)
            .then(responseText=>{
                document.querySelector('.emp-count').textContent=employeePayrollList.length;
                createInnerHtml();
            })
            .catch(error=>{
                console.log("Delete error status: "+JSON.stringify(error));
            });
    }
}