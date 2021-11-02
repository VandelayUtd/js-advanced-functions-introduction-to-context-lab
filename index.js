// Your code here

const createEmployeeRecord = function(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeArray){
    return employeeArray.map(function(employee){
        return createEmployeeRecord(employee)
    })
}

function createTimeInEvent(employee, dateTime){
    let [date, hour] = dateTime.split(" ")

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date 
    })
    return employee
}

function createTimeOutEvent(employee, dateTime){
    let [date, hour] = dateTime.split(" ")
    employee.timeOutEvents.push({
        type: "TimeOut", 
        hour: parseInt(hour, 10), 
        date: date 
    })

    return employee
}

function hoursWorkedOnDate(employee, dateForm){
    let start = employee.timeInEvents.find(function(element){
        return element.date === dateForm
    })

    let end = employee.timeOutEvents.find(function(e){
        return e.date === dateForm
    })

    return (end.hour - start.hour) / 100
}

function wagesEarnedOnDate(employee, dateForm){
    return hoursWorkedOnDate(employee, dateForm) * employee.payPerHour
}

function allWagesFor(employee){
    let validDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = validDates.reduce(function(memo, date){
        return memo + wagesEarnedOnDate(employee, date)
    }, 0)

    return payable 
}

function calculatePayroll(employees){
    let wages = employees.map(function(e){
        return allWagesFor(e)
    })

    let total = wages.reduce(function(previousValue, currentValue){
        return previousValue + currentValue 
    })

    return total
}

function findEmployeeByFirstName(employees, name){
    return employees.find(function(e){
        return e.firstName === name
    })
}